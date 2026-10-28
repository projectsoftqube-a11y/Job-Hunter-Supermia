import { cacheLife } from 'next/cache';
import { PRICING, SIGNUP_URL } from '@/content/site';

/*
 * Billing plans from the JobHunter billing API (GET /api/v1/billing/plans), mapped into the shape the
 * pricing cards, the comparison table, the FAQ copy, the Offer schema and /llms.txt all read, so they
 * never disagree. The origin comes from the server-only BILLING_API_BASE_URL (see .env.example). On
 * any failure the static FALLBACK_PLANS render instead, so the pricing never shows empty.
 *
 * Plan shape: { id, code, name, price, planDays, currency, blurb, fit, cta, href, featured, limits }
 * where limits has one number per PRICING.rows key.
 */

const DEFAULT_API_BASE_URL = 'https://api.jobhunter.supermia.ai';
const PLANS_PATH = '/api/v1/billing/plans';

// Abort a hung upstream so a slow API cannot stall the render
const REQUEST_TIMEOUT_MS = 8000;
// The real payload is ~3 KB; refuse anything absurd before parsing it
const MAX_RESPONSE_BYTES = 256 * 1024;
const MAX_PLANS = 8;

/** API feature keys behind each PRICING.rows key. */
const LIMIT_KEYS = {
  resume: 'resume_upload',
  ats: 'ats_scoring',
  jobs: 'job_discovery',
  perSearch: 'job_discovery_per_search_cap',
  emails: 'email_draft',
  interviews: 'interview',
  minutes: 'interview_minutes',
};

/** Shown when the API is unavailable: the live payload as of 28 Oct 2026. */
const FALLBACK_API_PLANS = [
  {
    plan_name: 'Free Plan',
    plan_code: 'free_plan',
    monthly_cost: '0.00',
    currency: 'USD',
    plan_days: 7,
    is_popular: false,
    order_no: 1,
    features: { resume_upload: 1, ats_scoring: 2, job_discovery: 5, job_discovery_per_search_cap: 5, email_draft: 5, interview: 1, interview_minutes: 30 },
  },
  {
    plan_name: 'Essential Plan',
    plan_code: 'plan_1',
    monthly_cost: '15.00',
    currency: 'USD',
    plan_days: 30,
    is_popular: false,
    order_no: 2,
    features: { resume_upload: 15, ats_scoring: 15, job_discovery: 200, job_discovery_per_search_cap: 60, email_draft: 200, interview: 6, interview_minutes: 180 },
  },
  {
    plan_name: 'Premium Plan',
    plan_code: 'plan_2',
    monthly_cost: '30.00',
    currency: 'USD',
    plan_days: 30,
    is_popular: true,
    order_no: 3,
    features: { resume_upload: 30, ats_scoring: 30, job_discovery: 800, job_discovery_per_search_cap: 60, email_draft: 800, interview: 10, interview_minutes: 300 },
  },
];

/** A finite, non-negative number from a number or a numeric string ("15.00"), else 0. */
function toNumber(value) {
  const n = typeof value === 'string' ? Number(value.trim()) : value;
  return typeof n === 'number' && Number.isFinite(n) && n >= 0 ? n : 0;
}

/** Trimmed text without control characters, capped so a bad value cannot break the layout. */
function toText(value, max = 200) {
  return typeof value === 'string' ? value.replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max) : '';
}

// "Essential Plan" reads as "the Essential Plan plan" in copy, so the cards say "Essential"
const displayName = (name) => toText(name, 60).replace(/\s+plan$/i, '');
const slug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** Sign-up link carrying the plan code, so the app can preselect the plan. */
function signupHref(code) {
  return code ? `${SIGNUP_URL}${SIGNUP_URL.includes('?') ? '&' : '?'}plan=${encodeURIComponent(code)}` : SIGNUP_URL;
}

function isValidPlan(plan) {
  return Boolean(plan) && typeof plan === 'object' && typeof plan.plan_name === 'string' && displayName(plan.plan_name).length > 0;
}

/** Map one API plan into the display plan. */
function toPlan(plan) {
  const name = displayName(plan.plan_name);
  const code = toText(plan.plan_code, 60);
  const price = toNumber(plan.monthly_cost);
  const copy = PRICING.copy[code] || {};
  const features = plan.features && typeof plan.features === 'object' ? plan.features : {};

  return {
    id: slug(name),
    code,
    name,
    price,
    // Length of the plan in days: 30 for the monthly plans, 7 for the Free plan
    planDays: Math.min(Math.floor(toNumber(plan.plan_days)), 366),
    currency: /^[A-Z]{3}$/.test(plan.currency ?? '') ? plan.currency : 'USD',
    blurb: toText(plan.description, 300) || copy.blurb || '',
    fit: copy.fit || '',
    cta: price === 0 ? 'Start free' : `Choose ${name}`,
    href: signupHref(code),
    featured: plan.is_popular === true,
    limits: Object.fromEntries(Object.entries(LIMIT_KEYS).map(([key, apiKey]) => [key, Math.floor(toNumber(features[apiKey]))])),
  };
}

/** Sort, map and keep only the first "popular" plan highlighted, so the badge stays meaningful. */
function toPlans(apiPlans) {
  let highlighted = false;
  return apiPlans
    .filter(isValidPlan)
    .slice(0, MAX_PLANS)
    .sort((a, b) => toNumber(a.order_no) - toNumber(b.order_no))
    .map(toPlan)
    .map((plan) => {
      if (!plan.featured) return plan;
      if (highlighted) return { ...plan, featured: false };
      highlighted = true;
      return plan;
    });
}

export const FALLBACK_PLANS = toPlans(FALLBACK_API_PLANS);

/** The plans URL, or null when the configured origin is not a well-formed http(s) URL. */
function endpoint() {
  try {
    const url = new URL((process.env.BILLING_API_BASE_URL || DEFAULT_API_BASE_URL).trim());
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
    return new URL(PLANS_PATH, url.origin).toString();
  } catch {
    return null;
  }
}

/**
 * Display-ready plans, sorted by order_no. Cached and revalidated every minute ('minutes' profile), so
 * the prices stay in the prerendered HTML and a plan change in the database shows within about a minute.
 */
export async function getBillingPlans() {
  'use cache';
  cacheLife('minutes');

  const url = endpoint();
  if (!url) return FALLBACK_PLANS;

  // The endpoint is public. Set BILLING_API_KEY only if the backend starts requiring an X-API-Key header.
  const apiKey = process.env.BILLING_API_KEY?.trim();

  try {
    const res = await fetch(url, {
      headers: { Accept: 'application/json', ...(apiKey ? { 'X-API-Key': apiKey } : {}) },
      // The endpoint never redirects; following one could send the request to an unexpected host
      redirect: 'error',
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (!res.ok) return FALLBACK_PLANS;
    if (Number(res.headers.get('content-length') ?? 0) > MAX_RESPONSE_BYTES) return FALLBACK_PLANS;

    const raw = await res.text();
    if (raw.length > MAX_RESPONSE_BYTES) return FALLBACK_PLANS;

    const json = JSON.parse(raw);
    // The API reports success with status 1; anything else is a backend error
    if (json?.status !== 1 || !Array.isArray(json.data)) return FALLBACK_PLANS;

    const plans = toPlans(json.data);
    return plans.length > 0 ? plans : FALLBACK_PLANS;
  } catch {
    // Network error, timeout, redirect or malformed JSON. Not logged: the error can echo the request headers.
    return FALLBACK_PLANS;
  }
}
