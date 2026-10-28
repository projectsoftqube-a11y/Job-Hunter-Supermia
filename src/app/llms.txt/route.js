import { BRAND, PRICING, SITE_URL, SIGNUP_URL, APP_URL, PARENT_URL, BROCHURE_URL, DEMO, SEO, PRIVACY_URL, TERMS_URL } from '@/content/site';
import { FEATURES_HUB } from '@/content/features-hub';
import { FAQ_PAGE } from '@/content/faq';
import { getBillingPlans } from '@/lib/billing';
import { pricingSummary } from '@/lib/pricing';
import { PAGES } from '@/content/pages';
import { POSTS, CATEGORIES, BLOG_HUB, categoryIndexable } from '@/content/blog';

/*
 * /llms.txt: the short index for AI assistants (llmstxt.org), with /llms-full.txt as the long form. The
 * link lists are built from the same registries as the sitemap, so a new page or post appears here as
 * soon as it is live.
 */

const link = (name, path, note) => `- [${name}](${path.startsWith('http') ? path : SITE_URL + path})${note ? `: ${note}` : ''}`;

export async function GET() {
  const plans = await getBillingPlans();
  const byKind = (kind) => PAGES.filter((p) => p.kind === kind);
  const doc = [
    `# ${BRAND.siteName}`,
    `> ${BRAND.summary}`,
    [
      '## Product',
      link('Full site content for AI assistants', '/llms-full.txt', 'every page, plan, FAQ and blog post as one Markdown document.'),
      link(`${BRAND.name} home`, '/', SEO.description),
      `- [Sign up](${SIGNUP_URL}) or [log in](${APP_URL}): the ${BRAND.name} web app.`,
      link('Brochure (PDF)', BROCHURE_URL, 'the product story, no sign-up needed.'),
      link(`Demo video (${Math.floor(DEMO.seconds)} seconds)`, DEMO.src, DEMO.description),
      link('FAQ', FAQ_PAGE.path, FAQ_PAGE.seo.description),
      link('Pricing', PRICING.path, pricingSummary(plans)),
    ].join('\n'),
    ['## Features', link('All features', FEATURES_HUB.path, FEATURES_HUB.seo.description), ...byKind('feature').map((p) => link(p.label, p.path, p.seo.description))].join('\n'),
    ['## Who it is for', ...byKind('audience').map((p) => link(p.label, p.path, p.seo.description))].join('\n'),
    [
      '## Resources',
      ...byKind('resource').map((p) => link(p.label, p.path, p.seo.description)),
      link('Blog', BLOG_HUB.path, BLOG_HUB.seo.description),
      ...CATEGORIES.filter((c) => categoryIndexable(c.slug)).map((c) => link(c.h1, `/blog/category/${c.slug}`, c.seo.description)),
      ...POSTS.map((p) => link(p.title, p.path, p.excerpt)),
    ].join('\n'),
    [
      '## Key facts',
      '- Job boards searched: LinkedIn, Indeed, Dice (third-party services; their own terms and privacy policies apply when you use them).',
      '- Mock interview rounds: HR & Introduction; Role & Knowledge; Practical & Behavioral; Managerial & Final.',
      '- Practice modes: guided practice (with hints) and real simulation (strict).',
      '- Scorecard: readiness score 0-10, clarity, confidence, technical depth, strengths, gaps, topics to practice.',
      '- Users can keep several resume versions.',
      `- Minimum age: 16. Contact: ${BRAND.email}`,
    ].join('\n'),
    ['## Company', link(BRAND.parent, `${PARENT_URL}/`, 'conversational AI platform and AI agents.'), link(`${BRAND.name} on ${BRAND.parent}`, `${PARENT_URL}/ai-job-search-assistant/`)].join('\n'),
    ['## Legal', link('Privacy Policy', PRIVACY_URL), link('Terms and Conditions', TERMS_URL)].join('\n'),
  ].join('\n\n');

  return new Response(doc + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
