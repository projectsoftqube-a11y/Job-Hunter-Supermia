import { BRAND, PRICING, SITE_URL, SIGNUP_URL } from '@/content/site';
import { FEATURES_HUB } from '@/content/features-hub';
import { FAQ_PAGE } from '@/content/faq';
import { PAGES } from '@/content/pages';
import { POSTS } from '@/content/blog';
import { headingText } from '@/lib/text';

/*
 * /llms-full.txt: the whole site as one plain-Markdown document for AI assistants and answer engines
 * (the short index is /llms.txt). Built from the same content modules as the pages, so it can never
 * drift from what visitors read. Relative links become absolute so quotes keep their source.
 */

const abs = (text = '') => String(text).replace(/\]\((\/[^)]*)\)/g, (_, p) => `](${SITE_URL}${p})`);

function block(b) {
  switch (b.type) {
    case 'p':
      return abs(b.text);
    case 'h2':
      return `### ${b.text}`;
    case 'h3':
      return `#### ${b.text}`;
    case 'list':
      return b.items.map((t, i) => (b.ordered || b.style === 'number' ? `${i + 1}. ${abs(t)}` : `- ${abs(t)}`)).join('\n');
    case 'steps':
      return b.items.map((s, i) => `${i + 1}. **${s.title}**: ${abs(s.text)}`).join('\n');
    case 'cards':
      return b.items.map((c) => `- **${c.title}**: ${abs(c.text)}`).join('\n');
    case 'table':
      return [`| ${b.head.join(' | ')} |`, `| ${b.head.map(() => '---').join(' | ')} |`, ...b.rows.map((r) => `| ${r.map((c) => abs(String(c))).join(' | ')} |`)].join('\n');
    case 'callout':
      return `> ${b.title ? `**${b.title}** ` : ''}${abs(b.text)}`;
    case 'example':
      return [`Example: ${b.label}${b.meta ? ` (${b.meta})` : ''}`, ...b.lines.filter(Boolean).map((l) => `> ${abs(l)}`)].join('\n');
    case 'questions':
      return b.items.map((q) => `- ${q.q}${q.hint ? `\n  - ${abs(q.hint)}` : ''}`).join('\n');
    case 'product':
      return abs(b.text);
    default:
      return '';
  }
}

const blocks = (list = []) => list.map(block).filter(Boolean).join('\n\n');
const faqs = (items = []) => items.map((f) => `**${f.q}**\n${abs(f.a)}`).join('\n\n');

function contentPage(p) {
  const out = [`## ${headingText(p.hero.h1)}`, `URL: ${SITE_URL}${p.path}`, abs(p.hero.lead)];
  if (p.hero.points?.length) out.push(p.hero.points.map((t) => `- ${t}`).join('\n'));
  for (const s of p.sections || []) out.push(`### ${headingText(s.h2)}`, abs(s.intro || ''), blocks(s.blocks));
  if (p.faqs?.items?.length) out.push(`### ${headingText(p.faqs.h2)}`, faqs(p.faqs.items));
  return out.filter(Boolean).join('\n\n');
}

function post(p) {
  const out = [`## ${p.title}`, `URL: ${SITE_URL}${p.path}`, `Published ${p.published}${p.updated !== p.published ? `, updated ${p.updated}` : ''}`, `Quick answer: ${abs(p.answer)}`];
  if (p.takeaways?.length) out.push('Key takeaways:\n' + p.takeaways.map((t) => `- ${abs(t)}`).join('\n'));
  out.push(blocks(p.body));
  if (p.faqs?.length) out.push('### FAQs', faqs(p.faqs));
  return out.filter(Boolean).join('\n\n');
}

function pricing() {
  const rows = PRICING.rows.map((r) => `| ${r.label} | ${PRICING.plans.map((p) => p.limits[r.key]).join(' | ')} |`);
  return [
    '## JobHunter pricing',
    `URL: ${SITE_URL}${PRICING.path}`,
    PRICING.plans.map((p) => `- **${p.name}**: ${p.price === 0 ? '$0' : `$${p.price} a month`}. ${p.blurb}`).join('\n'),
    'Monthly limits per plan (all plans include all four tools; prices in US dollars):',
    [`| Each month | ${PRICING.plans.map((p) => p.name).join(' | ')} |`, `| --- | ${PRICING.plans.map(() => '---').join(' | ')} |`, ...rows].join('\n'),
    faqs(PRICING.faqs),
  ].join('\n\n');
}

export function GET() {
  const features = PAGES.filter((p) => p.kind === 'feature');
  const others = PAGES.filter((p) => p.kind !== 'feature');
  const doc = [
    `# ${BRAND.siteName}`,
    `> ${BRAND.name} (also called ${BRAND.alternateNames.join(', ')}) is an AI job search and interview practice app from ${BRAND.parent}, operated by ${BRAND.company} in Grapevine, Texas. It searches LinkedIn, Indeed and Dice in one search, scores your resume for each job out of 100 with the reasoning and missing skills, drafts an application email for the role that you edit and send, and runs live voice mock interviews with a 0-10 readiness score. It never applies to jobs or sends anything without the user.`,
    `Website: ${SITE_URL}/ · Sign up: ${SIGNUP_URL} · Contact: ${BRAND.email}`,
    '# Features',
    [`## ${headingText(FEATURES_HUB.hero.h1)}`, `URL: ${SITE_URL}${FEATURES_HUB.path}`, FEATURES_HUB.hero.lead].join('\n\n'),
    ...features.map(contentPage),
    '# Pricing',
    pricing(),
    '# Who JobHunter is for, and interview questions',
    ...others.map(contentPage),
    '# Frequently asked questions',
    `URL: ${SITE_URL}${FAQ_PAGE.path}`,
    ...FAQ_PAGE.groups.map((g) => [`## ${g.title}`, faqs(g.items)].join('\n\n')),
    '# Blog',
    ...POSTS.map(post),
  ].join('\n\n');

  return new Response(doc, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}
