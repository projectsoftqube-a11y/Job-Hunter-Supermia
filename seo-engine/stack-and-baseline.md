# Stack and technical baseline

## Stack (evidence: package.json, next.config.mjs, src/app)

- Next.js 16.4.2 App Router, React 19.3, JavaScript, Tailwind v4, GSAP + Lenis, framer-motion (3 components)
- `cacheComponents: true`, `partialPrefetching: true`; every route is prerendered (Static / SSG / Partial Prerender). **No client-rendered primary content**: H1, body, FAQ answers (`<details>`) and JSON-LD are all in the raw HTML.
- Content lives in JS modules: `src/content/site.js`, `pages/*`, `blog/*`, `faq.js`, `features-hub.js`
- SEO assets: metadata per route, `sitemap.js`, `robots.js`, `manifest.js`, `opengraph-image.js` per route, `llms.txt` + `llms-full.txt` route handlers, `src/lib/schema.js`, redirects + security headers in `next.config.mjs`
- Commands: `npm run lint`, `npm run build`, `npx next start`, `node scripts/seo-audit.mjs`
- Analytics: **none** (no GA4, GTM, pixel, PostHog)
- Conversion points: every CTA links to `https://app.jobhunter.supermia.ai/signup` (sign-up happens on the app domain); log-in → app; brochure PDF; `mailto:hello@supermia.ai`

## Route audit (production build, 2026-10-28, after fixes)

| route | title | desc | canonical | OG | H1 | skips | JSON-LD (page) | FAQ w/o FAQPage | words | in/out | status | CTA | rendering |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| / | 52 | 145 | self | ✓ | 1 | – | WebPage, VideoObject | preview of /faq (by design) | 3072 | 24/22 | 200 | ✓ | static |
| /features | 56 | 147 | self | ✓ | 1 | – | CollectionPage, ItemList | – | 719 | 24/21 | 200 | ✓ | static |
| /features/ai-mock-interview | 50 | 153 | self | ✓ | 1 | – | WebPage, FAQPage(4) | – | 2057 | 24/23 | 200 | ✓ | SSG |
| /features/resume-job-match | 51 | 155 | self | ✓ | 1 | – | WebPage, FAQPage | – | 1623 | 24/22 | 200 | ✓ | SSG |
| /features/job-application-email | 55 | 152 | self | ✓ | 1 | – | WebPage, FAQPage | – | 1376 | 24/22 | 200 | ✓ | SSG |
| /features/ai-job-match | 55 | 150 | self | ✓ | 1 | – | WebPage, FAQPage | – | 1576 | 24/22 | 200 | ✓ | SSG |
| /for-new-grads | 39 | 149 | self | ✓ | 1 | – | WebPage, ItemList, FAQPage | – | 1839 | 24/22 | 200 | ✓ | SSG |
| /for-career-switchers | 44 | 144 | self | ✓ | 1 | – | WebPage, FAQPage | – | 1939 | 24/22 | 200 | ✓ | SSG |
| /for-software-engineers | 48 | 155 | self | ✓ | 1 | – | WebPage, ItemList, FAQPage | – | 1945 | 24/22 | 200 | ✓ | SSG |
| /for-designers-and-analysts | 49 | 152 | self | ✓ | 1 | – | WebPage, ItemList, FAQPage | – | 1883 | 24/22 | 200 | ✓ | SSG |
| /for-people-returning-to-work | 50 | 155 | self | ✓ | 1 | – | WebPage, ItemList, FAQPage | – | 2073 | 24/22 | 200 | ✓ | SSG |
| /interview-questions | 54 | 155 | self | ✓ | 1 | – | WebPage, ItemList, FAQPage | – | 3134 | 24/23 | 200 | ✓ | SSG |
| /faq | 45 | 140 | self | ✓ | 1 | – | WebPage, FAQPage(26) | – | 1443 | 24/21 | 200 | ✓ | static |
| /pricing | 46 | 148 | self | ✓ | 1 | – | WebPage, OfferCatalog, FAQPage | – | 619 | 24/21 | 200 | ✓ | static |
| /blog | 44 | 142 | self | ✓ | 1 | – | CollectionPage, ItemList | – | 632 | 24/27 | 200 | ✓ | static |
| /blog/category/job-search | 32 | 120 | self | ✓ | 1 | – | CollectionPage, ItemList | – | 337 | 24/24 | 200 | ✓ | static |
| /blog/* (6 posts) | 41–52 | 142–151 | self | ✓ | 1 | – | BlogPosting, FAQPage, speakable | – | 2087–2730 | 4–9/24 | 200 | ✓ | SSG |
| /privacy-policy, /terms-and-conditions | 38, 44 | 134, 144 | self | ✓ | 1 | – | WebPage | – | ~1000 | 24/21 | 200 | ✓ | static |
| /blog/category/interview-prep | 36 | 124 | self | ✓ | 1 | – | CollectionPage | – | 261 | – | 200 | ✓ | **noindex by design** (< 3 posts) |

## Issues found and status

| Issue | Status |
|---|---|
| Unknown URLs returned **200 on the first request** (soft 404), e.g. /FAQ, /site.webmanifest, /blog/nope | **Fixed**: `ensureStatic='navigation'`; verified 404 on first hit |
| `/faqFAQ`, `/pricingPricing` 404s in Search Console (React list keys read as links) | **Fixed + 308 redirects** (committed by owner) |
| Inner pages lacked `og:site_name` / `og:locale` (page openGraph replaces root) | **Fixed**: shared `OG_BASE` |
| FAQ content without FAQPage on 18 pages | **Fixed**, deduplicated against /faq |
| /pricing had no OfferCatalog | **Fixed** |
| /features description 158 chars | **Fixed** (147) |
| No web manifest / apple-touch-icon | **Fixed** |
| `max-snippet` etc. only for Googlebot | **Fixed**: all engines |
| llms.txt hand-written, missing a category | **Fixed**: generated |
| Site origin hard-coded | **Fixed**: `NEXT_PUBLIC_SITE_URL` override |
| Host: http→https 308, trailing slash 308, `www` has no DNS | OK (checked live) |

## Performance (Phase 9), production build on localhost

| route | HTML (gzip) | JS files | JS raw | JS gzip |
|---|---|---|---|---|
| / | 63 KB | 13 | 1042 KB | 327 KB |
| /features/ai-mock-interview | 44 KB | 13 | 1294 KB | 355 KB |
| /pricing | 29 KB | 12 | 782 KB | 252 KB |

- Outlier: `/features/ai-mock-interview` ships a 527 KB (raw) chunk of its own client-side story components. Recommendation: move the non-interactive story sections to Server Components (a refactor, not done here).
- Hashed assets: `Cache-Control: public, max-age=31536000, immutable`. HTML: `s-maxage=31536000` (rebuilt on deploy).
- Fonts: next/font (self-hosted), `display: swap`. Images: next/image with width/height, quality 90.
- **Not measured**: Lighthouse / Core Web Vitals (no headless browser was allowed in this session). Run PageSpeed Insights on the live URL; see `owner-actions.md`.
