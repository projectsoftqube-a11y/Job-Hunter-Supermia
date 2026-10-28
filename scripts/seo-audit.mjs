#!/usr/bin/env node
/*
 * SEO / AEO / GEO checks against a running build (CI or local):
 *   npm run build && npx next start -p 3301 &
 *   SEO_BASE=http://localhost:3301 node scripts/seo-audit.mjs
 *
 * Reads every URL in /sitemap.xml and checks status, titles, descriptions, canonicals, headings,
 * JSON-LD (parses, no empty values, every @id reference resolves), FAQ schema text against the rendered
 * FAQ, internal links, a sign-up CTA per page, the machine-readable files and real 404s for unknown
 * URLs. Failures exit 1; warnings (copy phrases, thin pages) are printed for a human to review.
 */

const BASE = (process.env.SEO_BASE || 'http://localhost:3000').replace(/\/$/, '');
const SITE = 'https://jobhunter.supermia.ai';
const SIGNUP = 'https://app.jobhunter.supermia.ai/signup';
const BANNED = ["in today's fast-paced", 'unlock', 'elevate', 'delve', 'game-changer', 'game changer', 'seamless', 'revolutionize', 'supercharge'];

const fails = [];
const warns = [];
const fail = (where, msg) => fails.push(`${where}: ${msg}`);
const warn = (where, msg) => warns.push(`${where}: ${msg}`);

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;|&#160;/g, ' ');
const text = (html) => decode(html.replace(/<!-- -->/g, '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const meta = (head, attr, name) => {
  const tag = head.match(new RegExp(`<meta[^>]*${attr}="${name}"[^>]*>`, 'i'))?.[0];
  return tag ? decode(tag.match(/content="([^"]*)"/)?.[1] ?? '') : null;
};
const get = (path, opts = {}) => fetch(BASE + path, { redirect: 'manual', ...opts });

// Every value in a JSON-LD tree, with its path, to catch empty or placeholder values
function* walk(node, path = '') {
  if (Array.isArray(node)) for (const [i, v] of node.entries()) yield* walk(v, `${path}[${i}]`);
  else if (node && typeof node === 'object') for (const [k, v] of Object.entries(node)) yield* walk(v, `${path}.${k}`);
  else yield [path, node];
}

async function main() {
  // 1. Machine-readable files
  for (const [path, type] of [
    ['/sitemap.xml', 'xml'],
    ['/robots.txt', 'text/plain'],
    ['/llms.txt', 'text/plain'],
    ['/llms-full.txt', 'text/markdown'],
    ['/manifest.webmanifest', 'manifest+json'],
  ]) {
    const r = await get(path);
    if (r.status !== 200) fail(path, `status ${r.status}`);
    else if (!(r.headers.get('content-type') || '').includes(type)) fail(path, `content-type ${r.headers.get('content-type')}`);
  }
  const robots = await (await get('/robots.txt')).text();
  if (!robots.includes(`Sitemap: ${SITE}/sitemap.xml`)) fail('/robots.txt', 'no Sitemap line');
  if (/Disallow:\s*\/\s*$/m.test(robots)) fail('/robots.txt', 'a group disallows the whole site');

  // 2. Unknown URLs must answer 404 on the first request (no soft 404s)
  const nonce = Date.now().toString(36);
  for (const path of [`/zz-${nonce}`, `/features/zz-${nonce}`, `/blog/zz-${nonce}`, `/blog/category/zz-${nonce}`]) {
    const r = await get(path);
    if (r.status !== 404) fail(path, `unknown URL returned ${r.status}, expected 404`);
  }

  const sitemap = await (await get('/sitemap.xml')).text();
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).filter((u) => !u.includes('/opengraph-image'));
  const paths = urls.map((u) => u.replace(SITE, '') || '/');
  const llms = await (await get('/llms.txt')).text();

  const pages = [];
  for (const path of paths) {
    const r = await get(path);
    if (r.status !== 200) {
      fail(path, `sitemap URL returned ${r.status}`);
      continue;
    }
    pages.push({ path, html: await r.text() });
    if (!llms.includes(`(${SITE}${path === '/' ? '/' : path})`)) fail(path, 'missing from /llms.txt');
  }

  const titles = {};
  const descs = {};
  const linkTargets = new Set();
  const inbound = Object.fromEntries(paths.map((p) => [p, 0]));

  for (const { path, html } of pages) {
    const [head, rest = ''] = html.split('</head>');
    const body = rest.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');

    // 3. Title, description, canonical, robots, social cards
    const title = decode(head.match(/<title[^>]*>([^<]*)<\/title>/)?.[1] || '');
    const desc = meta(head, 'name', 'description') || '';
    if (title.length < 15 || title.length > 60) fail(path, `title is ${title.length} chars: "${title}"`);
    if (desc.length < 70 || desc.length > 155) fail(path, `description is ${desc.length} chars`);
    (titles[title] ||= []).push(path);
    (descs[desc] ||= []).push(path);
    const canonical = head.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/)?.[1];
    if (canonical !== SITE + (path === '/' ? '' : path) && canonical !== SITE + path) fail(path, `canonical is ${canonical}`);
    const robotsMeta = meta(head, 'name', 'robots') || '';
    if (/noindex/.test(robotsMeta)) fail(path, 'sitemap URL is noindex');
    if (!/max-snippet:-1/.test(robotsMeta)) warn(path, 'robots meta lacks max-snippet:-1');
    for (const p of ['og:title', 'og:description', 'og:url', 'og:image', 'og:image:alt', 'og:site_name']) if (!meta(head, 'property', p)) fail(path, `missing ${p}`);
    if (meta(head, 'name', 'twitter:card') !== 'summary_large_image') fail(path, 'twitter:card is not summary_large_image');

    // 4. Headings: one H1, no skipped levels; content present in the raw HTML
    const levels = [...body.matchAll(/<h([1-6])[\s>]/g)].map((m) => +m[1]);
    const h1s = levels.filter((l) => l === 1).length;
    if (h1s !== 1) fail(path, `${h1s} <h1> elements`);
    for (let i = 1; i < levels.length; i++) if (levels[i] > levels[i - 1] + 1) fail(path, `heading skips h${levels[i - 1]} to h${levels[i]}`);
    const main = body.match(/<main[\s\S]*<\/main>/)?.[0] || '';
    const words = text(main).split(' ').filter((w) => /[a-z0-9]/i.test(w)).length;
    if (words < 300) warn(path, `thin page: ${words} words`);
    if (path.startsWith('/blog/') && !path.startsWith('/blog/category/') && !/data-speakable/.test(main)) fail(path, 'post has no answer block (data-speakable)');

    // 5. Images
    for (const img of body.match(/<img\b[^>]*>/g) || []) {
      if (!/\balt=/.test(img)) fail(path, `image without alt: ${img.slice(0, 80)}`);
      if (!/\bwidth=/.test(img) && !/data-nimg="fill"/.test(img)) fail(path, `image without dimensions: ${img.slice(0, 80)}`);
    }

    // 6. Links: internal targets, a sign-up CTA, descriptive anchors
    const anchors = [...body.matchAll(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g)];
    if (!anchors.some(([, href]) => decode(href).startsWith(SIGNUP))) fail(path, 'no sign-up CTA');
    const seen = new Set();
    for (const [, rawHref, inner] of anchors) {
      const href = decode(rawHref);
      if (/^(click here|read more|learn more|here)$/i.test(text(inner))) warn(path, `generic anchor text "${text(inner)}" → ${href}`);
      if (!href.startsWith('/') || href.startsWith('//')) continue;
      const target = href.split(/[?#]/)[0].replace(/(.)\/$/, '$1') || '/';
      linkTargets.add(target);
      if (target in inbound && target !== path && !seen.has(target)) {
        inbound[target]++;
        seen.add(target);
      }
    }

    // 7. Copy phrases for human review
    const copy = text(main).toLowerCase();
    for (const phrase of BANNED) if (new RegExp(`\\b${phrase}`).test(copy)) warn(path, `copy uses "${phrase}"`);

    // 8. JSON-LD
    const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
    const nodes = [];
    for (const [, json] of blocks) {
      try {
        const data = JSON.parse(json);
        nodes.push(...(data['@graph'] || [data]));
        for (const [where, value] of walk(data)) {
          if (value === null || value === undefined || value === '' || /undefined|TODO|lorem|example\.com|placeholder/i.test(String(value))) fail(path, `JSON-LD ${where} is "${value}"`);
        }
      } catch (e) {
        fail(path, `JSON-LD does not parse: ${e.message}`);
      }
    }
    // An object with only an @id is a reference; it must point at a node defined on the same page
    const defined = new Set();
    const refs = [];
    const scan = (v) => {
      if (Array.isArray(v)) return v.forEach(scan);
      if (!v || typeof v !== 'object') return;
      if (v['@id'] && Object.keys(v).length === 1) refs.push(v['@id']);
      else if (v['@id']) defined.add(v['@id']);
      Object.values(v).forEach(scan);
    };
    nodes.forEach(scan);
    for (const id of new Set(refs)) if (!defined.has(id)) fail(path, `@id reference does not resolve: ${id}`);
    const types = nodes.map((n) => [n['@type']].flat().join('/'));
    for (const t of ['Organization', 'WebSite', 'SoftwareApplication']) if (!types.includes(t)) fail(path, `missing sitewide ${t}`);
    if (path !== '/' && !types.includes('BreadcrumbList')) fail(path, 'no BreadcrumbList');
    for (const n of nodes) {
      if (n['@type'] === 'BlogPosting') for (const k of ['headline', 'datePublished', 'dateModified', 'author', 'publisher', 'image']) if (!n[k]) fail(path, `BlogPosting lacks ${k}`);
      if (/aggregateRating|"Review"/.test(JSON.stringify(n))) fail(path, 'review or rating markup present');
    }

    // 9. FAQ schema text must match the rendered FAQ exactly
    const rendered = new Map(
      [...main.matchAll(/<details[\s\S]*?<summary[^>]*>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g)].map(([, q, a]) => [text(q), text(a)])
    );
    const faq = nodes.find((n) => n['@type'] === 'FAQPage');
    for (const q of faq?.mainEntity || []) {
      if (!rendered.has(q.name)) fail(path, `FAQ schema question not on the page: "${q.name}"`);
      else if (rendered.get(q.name) !== q.acceptedAnswer.text.replace(/\s+/g, ' ').trim()) fail(path, `FAQ schema answer differs from the page: "${q.name}"`);
    }
    if (rendered.size > 0 && !faq && path !== '/') warn(path, `${rendered.size} visible FAQs but no FAQPage (all answered on /faq?)`);
  }

  // 10. Duplicates, broken internal links, orphans
  for (const [t, ps] of Object.entries(titles)) if (ps.length > 1) fail(ps.join(', '), `duplicate title "${t}"`);
  for (const [d, ps] of Object.entries(descs)) if (ps.length > 1) fail(ps.join(', '), `duplicate description "${d.slice(0, 50)}…"`);
  for (const target of linkTargets) {
    if (paths.includes(target) || /\.(pdf|mp4|png|jpg|webp|svg|txt|xml)$/.test(target)) continue;
    const r = await get(target);
    if (r.status >= 400) fail(target, `broken internal link (${r.status})`);
    else if (r.status >= 300) {
      const next = r.headers.get('location');
      const r2 = await get(next.replace(/^https?:\/\/[^/]+/, ''));
      if (r2.status >= 300 && r2.status < 400) fail(target, 'redirect chain');
      warn(target, `internal link redirects to ${next}`);
    }
  }
  for (const [p, n] of Object.entries(inbound)) if (n === 0 && p !== '/') fail(p, 'orphan: no internal link from another sitemap page');

  console.log(`Checked ${pages.length} sitemap URLs on ${BASE}\n`);
  console.log(fails.length ? `FAIL (${fails.length})\n  ${fails.join('\n  ')}` : 'FAIL (0)');
  console.log(warns.length ? `\nWARN (${warns.length})\n  ${warns.join('\n  ')}` : '\nWARN (0)');
  process.exit(fails.length ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
