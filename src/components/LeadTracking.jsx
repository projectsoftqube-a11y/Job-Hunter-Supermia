'use client';

import { useEffect } from 'react';
import { APP_URL, BROCHURE_URL } from '@/content/site';

/*
 * Lead events for GA4 (the gtag.js tag is added in the root layout):
 * - lead_click: sign-up, log-in, brochure and email clicks, with the page and where the link sits.
 * - ai_referral: a visit that arrives from an AI assistant (ChatGPT, Perplexity, Claude, Gemini, Copilot).
 * The landing page's UTM tags (or the AI source) are kept for the session and added to the sign-up URL,
 * so the app can record where each new account came from.
 */

const AI_SOURCES = {
  'chatgpt.com': 'chatgpt',
  'chat.openai.com': 'chatgpt',
  'perplexity.ai': 'perplexity',
  'claude.ai': 'claude',
  'gemini.google.com': 'gemini',
  'copilot.microsoft.com': 'copilot',
  'chat.deepseek.com': 'deepseek',
  'grok.com': 'grok',
};
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
const STORE = 'jh-attribution';

// Sends a GA4 event. gtag.js loads after hydration, so an event raised before it exists (the AI referral
// on landing) waits for it, for up to 10 seconds. Nothing is sent where GA isn't loaded (development).
function send(name, params, tries = 0) {
  if (typeof window.gtag === 'function') window.gtag('event', name, params);
  else if (tries < 50) setTimeout(() => send(name, params, tries + 1), 200);
}

function aiSource(referrer) {
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, '');
    return Object.entries(AI_SOURCES).find(([h]) => host === h || host.endsWith(`.${h}`))?.[1] || null;
  } catch {
    return null;
  }
}

// Session attribution: the first landing's UTM tags, else the AI assistant that referred the visit
function readAttribution() {
  try {
    const saved = sessionStorage.getItem(STORE);
    if (saved) return JSON.parse(saved);
  } catch {}
  const params = new URLSearchParams(window.location.search);
  const utm = Object.fromEntries(UTM_KEYS.filter((k) => params.get(k)).map((k) => [k, params.get(k)]));
  const ai = aiSource(document.referrer);
  const found = Object.keys(utm).length ? utm : ai ? { utm_source: ai, utm_medium: 'ai_referral' } : {};
  try {
    sessionStorage.setItem(STORE, JSON.stringify(found));
  } catch {}
  if (ai) send('ai_referral', { ai_source: ai, page_path: window.location.pathname });
  return found;
}

function kindOf(href) {
  if (href.startsWith('mailto:')) return 'email';
  if (href.includes(BROCHURE_URL)) return 'brochure';
  if (href.startsWith(`${APP_URL}/signup`)) return 'signup';
  if (href.startsWith(APP_URL)) return 'login';
  return null;
}

// Where the link sits: the nearest labelled landmark or section
function locationOf(el) {
  const area = el.closest('nav, header, footer, section, aside, [id]');
  if (!area) return 'page';
  return area.getAttribute('aria-label') || area.id || area.tagName.toLowerCase();
}

export default function LeadTracking() {
  useEffect(() => {
    const attribution = readAttribution();

    const onClick = (e) => {
      const a = e.target.closest?.('a[href]');
      if (!a) return;
      const kind = kindOf(a.href);
      if (!kind) return;
      if (kind === 'signup' && Object.keys(attribution).length) {
        const url = new URL(a.href);
        for (const [k, v] of Object.entries(attribution)) if (!url.searchParams.has(k)) url.searchParams.set(k, v);
        a.href = url.toString();
      }
      send('lead_click', {
        lead_type: kind,
        link_text: a.textContent.trim().slice(0, 80),
        link_location: locationOf(a),
        page_path: window.location.pathname,
        ...attribution,
      });
    };

    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}
