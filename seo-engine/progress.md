# Progress

Mode: **AUTOPILOT** (the MODE box was blank). Folder type: **A, existing website code** (Next.js 16.4.2 App Router).
Started 2026-10-27, last updated 2026-10-28.

## Phase status

| Phase | Status | Notes |
|---|---|---|
| 0 Business | Done | `fact-sheet.md`. Brand search finds SuperMIA listings, not JobHunter itself. |
| 1 Stack + baseline | Done | `stack-and-baseline.md`. Lint + production build pass. |
| 2 Research | Done (partial data) | Semrush returned `no_api_units`, so there are no volume or difficulty numbers; web SERP research only. `research/` |
| CP1 Strategy | Done | `strategy.md` |
| 3 Page plan | Done | `page-plan.csv`, `briefs/` |
| CP2 Page plan | Done | 4 new pages planned, none built yet (batch 1 below). |
| 4 Conversion | Done | GA4 `G-9B18R75HTF` (root layout, production only). `LeadTracking.jsx` sends `lead_click` and `ai_referral` events + UTM/AI-source carry-over. |
| 5 Technical | Done | soft-404 fix, manifest, apple icon, robots directives, OG_BASE, env-overridable origin |
| 6 Schema | Done | `schema-graph.md`. FAQPage (deduplicated), OfferCatalog, primaryImageOfPage, speakable, sameAs |
| CP3 Schema | Done | |
| 7 Content | **Next** | Batch 1 = the 3rd Interview Prep post + About page (see page-plan) |
| 8 Crawler access | Done | Every route prerendered; robots names all AI crawlers; llms.txt generated |
| 9 Performance | Measured | JS payload table in `stack-and-baseline.md`; Lighthouse not run (no headless browser in this session) |
| 10 Verification | Done | `scripts/seo-audit.mjs`: 0 fail, 0 warn on the production build |
| 11 Growth loop | Done | `owner-actions.md` |

## Decisions (recommend, don't survey)

- 2026-10-27 **Soft 404s**: `ensureStatic = 'navigation'` on the 4 dynamic routes. Next 16 docs: Cache Components + Partial Prefetching otherwise send the App Shell with 200 before `notFound()`.
- 2026-10-27 **FAQPage on every page with visible FAQs.** A question that `/faq` also answers is marked up on `/faq` only. The home page FAQ is a preview of `/faq`, so it has none. Google limits FAQ rich results to government/health sites, so this is for AI answer engines, not rich results.
- 2026-10-27 **No HowTo markup**: Google retired HowTo rich results, and the steps are already plain HTML lists.
- 2026-10-28 **Blog author stays the organisation**: owner says no named author is needed.
- 2026-10-28 **No visible "Last updated" on feature/audience pages**: three feature pages are frozen by the owner. Dates stay in schema and the sitemap only.
- 2026-10-29 **GA4 via gtag.js** (`@next/third-parties/google`, the Next.js docs' recommendation), measurement ID from the owner. No GTM, so there is one analytics stack. GA4 enhanced measurement records page views on client-side navigation.
- 2026-10-28 **Credit card**: sign-up asks for one; owner wants it not mentioned. No "no credit card" copy anywhere.
- 2026-10-28 **G2 + Capterra** confirmed by owner and added to `sameAs`.
- 2026-10-28 **Comparison/alternative pages are planned, not built**: they need dated, sourced competitor facts checked by a person (rules 3 and 5).
- 2026-10-28 **No free on-site resume checker**: it would need a backend. The real tool lives in the app behind sign-up. Recorded as a product decision for the owner.

## Next

Batch 1 (Interview Prep hub): write `/blog/how-to-answer-tell-me-about-yourself` (brief ready). That is the category's 3rd post, which makes `/blog/category/interview-prep` indexable automatically. Then the `/about` page.
