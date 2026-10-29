# Conversion plan

## Lead actions on the site

| Action | Where | Destination | GA4 event |
|---|---|---|---|
| Sign up ("Start your job hunt" etc.) | every page: nav, hero, sticky CTA, CTA bands, blog sidebar, footer | app.jobhunter.supermia.ai/signup | `lead_click` lead_type=signup |
| Log in | nav | app.jobhunter.supermia.ai | `lead_click` lead_type=login |
| Brochure PDF | home, footer | /brochure/job-hunter-brochure.pdf | `lead_click` lead_type=brochure |
| Email | footer, legal | mailto:hello@supermia.ai | `lead_click` lead_type=email |
| Visit from an AI assistant | any landing | – | `ai_referral` ai_source=chatgpt/perplexity/claude/gemini/copilot/… |

Each `lead_click` carries `link_text`, `link_location` (nearest labelled landmark), `page_path` and the session's `utm_*`.
`scripts/seo-audit.mjs` checks that every indexable page has at least one sign-up CTA (all 24 pass).

## Attribution

`src/components/LeadTracking.jsx` keeps the landing page's UTM tags for the session. When there are none and the visitor came from an AI assistant, it uses `utm_source=<assistant>` and `utm_medium=ai_referral`. These are appended to the sign-up URL on click, so the app can store the source of each new account.

## CTA by stage

- **BOFU** (features, pricing, audiences): sign-up is primary, above the fold and repeated.
- **TOFU** (blog): contextual links to the matching feature page, plus the sidebar/inline sign-up.
- CTA copy follows `OFFER.cta` ("Start your job hunt"). Sign-up asks for a card; per the owner the site doesn't mention cards, and it must never say "no credit card".

## Not on this site (owner/app work)

- **The conversion itself (account created) happens in the app.** Fire `sign_up` there, read the `utm_*` params, and send the event to the same GA4 property.
- Thank-you page: n/a on the marketing site (sign-up completes in the app). The app's post-sign-up screen should be `noindex`.
- **Consent:** GA4 loads for every visitor. If you target the EU/UK, add a consent banner with Google Consent Mode v2 before relying on the data there.
- **Trust near CTAs:** there are no real testimonials, logos or ratings yet (B9). The only trust line used is the true statement "It never applies or sends anything without you."
