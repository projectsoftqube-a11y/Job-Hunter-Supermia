# Blockers: facts needed from you

Each has my best guess, so you can just answer "yes" or correct it. Nothing here is published until confirmed.

| # | Question | Best guess (INFERRED) | Where it goes |
|---|---|---|---|
| B2 | SuperMIA founding year, support phone, and is `https://supermia.ai/images/logo.svg` the official logo? | 2024 (listings disagree: 2024 / 2025); no public phone | `BRAND` in `src/content/site.js` → Organization `foundingDate`, `contactPoint`, logo |
| B6 | Who fact-checks competitor prices on publish day for the alternatives pages? | Owner or marketing lead | `seo-engine/briefs/alternatives-pages.md` |
| B7 | Do you want a free, no-sign-up resume match checker on the site (needs an API from the app)? | Later | new route `/tools/resume-match-checker` |
| B8 | Site launch date (for `datePublished` on non-blog pages)? | 2026-10-22 (first content date in the repo) | `SEO` in `src/content/site.js` → `pageNode` |
| B9 | Any real, permissioned testimonials, user counts or results? | None yet | trust blocks near CTAs; review schema only with real reviews |

## Resolved 2026-10-28

- B1 Blog author: **not needed**; posts stay credited to the JobHunter team at SuperMIA (Organization author).
- B3 G2 + Capterra: **confirmed**, added to `BRAND.sameAs`.
- B4 Credit card: **required at sign-up, not shown on the site.** Never write "no credit card".
- B5 Analytics: **GA4 `G-9B18R75HTF` added 2026-10-29** (gtag.js via `@next/third-parties`, production builds only). Lead events go straight to GA4.

Note: Semrush returned **no_api_units**. Add units at https://www.semrush.com/mcp-access to get real search volumes into `research/keywords.csv`.
