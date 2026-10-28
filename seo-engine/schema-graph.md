# Schema graph (Checkpoint 3; implemented 2026-10-28)

## Root entities (sitewide, `siteSchema` in the root layout)

| @id | Type | Notes |
|---|---|---|
| https://supermia.ai/#organization | Organization | name SuperMIA, legalName Botfinity Inc., address, email, logo, `sameAs` (7 confirmed profiles; code filters out anything that isn't an https URL) |
| https://jobhunter.supermia.ai/#website | WebSite | publisher → Organization. No SearchAction (the site has no internal search) |
| https://jobhunter.supermia.ai/#software | SoftwareApplication | offers: 3 Offers with `@id` `/pricing#plan-{free,starter,pro}`, publisher/provider → Organization |

## Per page

Every page has a WebPage (or CollectionPage) node `{url}#webpage`, plus:
- `isPartOf` → WebSite
- `about` → SoftwareApplication
- `breadcrumb` → `{url}#breadcrumb`
- `primaryImageOfPage` → its 1200×630 share image
- `dateModified`, `inLanguage`

| Route | Page-specific nodes |
|---|---|
| / | VideoObject (demo, Clip chapters). No FAQPage: all 5 preview questions belong to /faq |
| /features | CollectionPage + ItemList |
| /features/* (4) | FAQPage (questions answered on /faq are left out: ai-mock-interview 4 of 6) |
| /for-* (5), /interview-questions | FAQPage; ItemList where the page has question lists |
| /faq | FAQPage (26) is the single home for shared questions |
| /pricing | OfferCatalog `/pricing#plans` → the 3 Offer @ids (WebPage mainEntity); FAQPage (5) |
| /blog/* posts | BlogPosting (headline, dates, section, wordCount, image, author/publisher → Organization); FAQPage; `speakable` → `[data-speakable]` (quick answer + key takeaways) |
| /blog, categories | CollectionPage + ItemList |
| legal pages | WebPage |

## Guarantees (enforced by `scripts/seo-audit.mjs`)

- FAQ schema question + answer text === rendered `<details>` text, so the build fails on drift.
- Every `{"@id"}` reference resolves to a node on the same page.
- No empty, `undefined` or placeholder values; no Review or aggregateRating markup.

## Omitted fields (blockers)

| Field | Why | Blocker |
|---|---|---|
| BlogPosting.author as Person | owner chose Organization authorship | decision |
| Organization.foundingDate | sources conflict (2024 vs 2025) | B2 |
| Organization.contactPoint (phone) | no confirmed phone | B2 |
| Organization.logo width/height | logo is an SVG on supermia.ai; dimensions unconfirmed | B2 |
| WebPage.datePublished (non-blog) | launch dates unknown | B8 |
| HowTo | retired as a rich result; steps stay as HTML lists | decision |
