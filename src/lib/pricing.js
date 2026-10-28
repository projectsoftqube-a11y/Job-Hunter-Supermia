import { PRICING } from '@/content/site';

/*
 * Pricing copy built from the billing plans (see lib/billing.js). Every sentence that names a plan, a
 * price or a limit is generated here, so the page, the FAQs, the metadata, the schema and /llms.txt
 * change together when a plan changes in the billing API.
 */

/** "A, B and C" (or "A, B or C") */
export const listNames = (names, joiner = 'and') => (names.length <= 1 ? names.join('') : `${names.slice(0, -1).join(', ')} ${joiner} ${names[names.length - 1]}`);

const fmt = (n) => n.toLocaleString('en-US');

export function money(plan) {
  const decimals = Number.isInteger(plan.price) ? 0 : 2;
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: plan.currency, minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(plan.price);
  } catch {
    return `$${plan.price.toFixed(decimals)}`;
  }
}

const isMonthly = (plan) => plan.planDays === 30 || plan.planDays === 31;

/** What the price covers, next to the big number: "/ month" or "for 7 days". */
export const periodLabel = (plan) => (isMonthly(plan) ? '/ month' : plan.planDays > 0 ? `for ${plan.planDays} days` : '');

/** Heading over a plan's limits: "Each month" or "For 7 days". */
export const limitsLabel = (plan) => (isMonthly(plan) ? 'Each month' : plan.planDays > 0 ? `For ${plan.planDays} days` : 'Included');

/** Price for prose: "$15 a month", "$0 for 7 days". */
export const pricePhrase = (plan) => `${money(plan)}${isMonthly(plan) ? ' a month' : plan.planDays > 0 ? ` for ${plan.planDays} days` : ''}`;

/** Limits for prose: "1 resume upload, 2 ATS match scores, … and 30 minutes of interview practice". */
export const limitsPhrase = (plan) => listNames(PRICING.rows.filter((r) => r.inProse !== false).map((r) => `${fmt(plan.limits[r.key])} ${plan.limits[r.key] === 1 ? r.one : r.unit}`));

export const freePlan = (plans) => plans.find((p) => p.price === 0);
export const paidPlans = (plans) => plans.filter((p) => p.price > 0);
const currencyName = (plans) => (plans.every((p) => p.currency === 'USD') ? 'US dollars' : plans[0]?.currency || 'US dollars');

/** "Essential at $15 a month and Premium at $30 a month" */
const paidPhrase = (plans) => listNames(paidPlans(plans).map((p) => `${p.name} at ${pricePhrase(p)}`));

export function pricingTitle(plans) {
  const title = `JobHunter Pricing: ${listNames(plans.map((p) => p.name))} Plans`;
  // Keep it within 60 characters so search results don't cut it off
  return title.length > 60 ? 'JobHunter Pricing: Plans and Limits Compared' : title;
}

export function pricingDescription(plans) {
  const free = freePlan(plans);
  const offer = [free ? `${free.name} ${free.planDays > 0 && !isMonthly(free) ? `for ${free.planDays} days` : 'at $0'}` : '', paidPhrase(plans)].filter(Boolean).join(', ');
  const full = `JobHunter pricing: ${offer}. Compare job matches, match scores, email drafts and mock interviews.`;
  return full.length <= 155 ? full : `JobHunter pricing: ${offer}.`;
}

const COUNT_WORDS = ['no', 'one', 'two', 'three', 'four', 'five'];

/** "a Free plan at $0 for 7 days and two paid plans: Essential at $15 a month and Premium at $30 a month" */
export function offerPhrase(plans) {
  const free = freePlan(plans);
  const paid = paidPlans(plans);
  const paidCount = `${COUNT_WORDS[paid.length] ?? paid.length} paid plan${paid.length === 1 ? '' : 's'}`;
  if (!free) return `${paidCount}: ${paidPhrase(plans)}`;
  return `a ${free.name} plan at ${pricePhrase(free)}${paid.length ? ` and ${paidCount}: ${paidPhrase(plans)}` : ''}`;
}

/** The /faq answer to "How much does JobHunter cost?". */
export function costAnswer(plans) {
  return `JobHunter has ${offerPhrase(plans)}, in ${currencyName(plans)}. Every plan includes all four tools: job search, ATS match scores, application email drafts and live voice mock interviews. The plans differ in how much you can use.`;
}

/** Pricing FAQs, rendered on /pricing and marked up as FAQPage from the same strings. */
export function pricingFaqs(plans) {
  const free = freePlan(plans);
  const paid = paidPlans(plans);
  const names = listNames(plans.map((p) => p.name));
  const pick = [
    free ? `Start with ${free.name} to try the whole loop on a real job.` : '',
    ...paid.map((p) => `${p.name} ${p.fit ? `suits ${p.fit}, with` : 'includes'} ${fmt(p.limits.jobs)} job matches and ${fmt(p.limits.interviews)} mock interviews ${isMonthly(p) ? 'a month' : `for ${p.planDays} days`}.`),
  ].filter(Boolean);

  return [
    free && { q: 'Is there a free plan?', a: `Yes. The ${free.name} plan costs ${pricePhrase(free)} and includes every tool: ${limitsPhrase(free)}.` },
    plans.length > 1 && {
      q: `What is the difference between ${names}?`,
      a: `All ${plans.length === 3 ? 'three' : plans.length} plans include the same four tools: job search across LinkedIn, Indeed and Dice, ATS match scores, application email drafts and live voice mock interviews. The plans differ in how much you can use. ${paid.map((p) => `${p.name} is ${pricePhrase(p)}.`).join(' ')}`.trim(),
    },
    { q: 'Which plan should I pick?', a: pick.join(' ') },
    { q: 'What currency are the prices in?', a: `Prices are in ${currencyName(plans)}.${paid.length && paid.every(isMonthly) ? ' Paid plans are billed per month.' : ''}` },
    { q: 'Does any plan apply to jobs for me?', a: 'No. On every plan, JobHunter never applies to a job or sends an email without you. It drafts, scores and prepares; you decide and send.' },
  ].filter(Boolean);
}

/** One-line summary for /llms.txt. */
export function pricingSummary(plans) {
  const per = PRICING.rows.map((r) => `${r.unit} ${plans.map((p) => fmt(p.limits[r.key])).join(' / ')}`).join(', ');
  return `${plans.map((p) => `${p.name} (${pricePhrase(p)})`).join(', ')}, prices in ${currencyName(plans)}. Every plan includes all four tools; plans differ in limits. ${plans.map((p) => p.name).join(' / ')}: ${per}.`;
}
