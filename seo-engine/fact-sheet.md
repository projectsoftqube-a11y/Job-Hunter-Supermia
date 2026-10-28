# Fact sheet

Tags: **CONFIRMED** = from the repo, live site or owner. **INFERRED** = my reasoning, never used in published copy.

## Product

| Fact | Tag | Source |
|---|---|---|
| JobHunter (also "Job Hunter", "JobHunter AI") is an AI job search and interview practice web app | CONFIRMED | `src/content/site.js` BRAND, live site |
| Made by SuperMIA, operated by Botfinity Inc., 2451 W Grapevine Mills Cir #547, Grapevine, TX 76051, US | CONFIRMED | BRAND.address; supermia.ai footer links a Google Maps listing |
| Contact: hello@supermia.ai | CONFIRMED | BRAND.email, supermia.ai |
| Searches LinkedIn, Indeed and Dice in one search, ranked by fit with the resume | CONFIRMED | PRODUCT_FACTS, /features/ai-job-match |
| Resume match score out of 100 per job, with reasoning and missing skills | CONFIRMED | /features/resume-job-match |
| Drafts an application email per role; the user edits and sends it | CONFIRMED | /features/job-application-email |
| Live voice mock interviews: 4 rounds (HR & Introduction; Role & Knowledge; Practical & Behavioral; Managerial & Final) | CONFIRMED | /features/ai-mock-interview |
| 2 practice modes: guided (hints) and real simulation (strict) | CONFIRMED | same |
| Scorecard: readiness 0-10, clarity, confidence, technical depth, strengths, gaps, topics | CONFIRMED | llms.txt key facts |
| Never applies to jobs or sends anything without the user | CONFIRMED | OFFER.control |
| Minimum age 16 | CONFIRMED | terms / llms.txt |
| Pricing (USD/month): Free $0, Starter $15, Pro $30; all plans include all 4 tools | CONFIRMED | PRICING (client sheet, 2026-10-22) |
| Monthly limits Free/Starter/Pro: resumes 1/15/30, ATS scores 2/15/30, searches 5/200/800, emails 5/200/800, interviews 1/6/10 | CONFIRMED | PRICING.plans |
| Sign-up asks for a credit card | CONFIRMED | owner, 2026-10-28. **Not mentioned on the site** (owner's choice); never claim "no credit card" |
| Demo video 47 s, uploaded 2026-10-08 | CONFIRMED | DEMO |

## Must not say (owner rules in `site.js`)

guaranteed · auto-apply · beat the ATS · ATS-proof · free forever · any invented result, count, rating or deadline.

## Company presence (checked 2026-10-28)

| Profile | Tag | Evidence |
|---|---|---|
| linkedin.com/showcase/mia-my-intelligent-assistant | CONFIRMED | linked from the supermia.ai footer |
| youtube.com/@MIAMyIntelligentAssistant | CONFIRMED | supermia.ai footer |
| twitter.com/supermia_ai | CONFIRMED | supermia.ai footer |
| Google Maps listing (cid 10850915260473186586) | CONFIRMED | supermia.ai footer |
| dev.to/supermia | CONFIRMED | profile links to supermia.ai |
| g2.com/products/supermia, capterra.com/p/10039381/SuperMIA | CONFIRMED | owner, 2026-10-28 (in `sameAs`) |
| hackernoon.com/u/supermia, designrush, goodfirms | INFERRED | found by search, not verified |
| Founding year | INFERRED / conflicting | third-party listings say 2024 or 2025. Not published. Blocker B2 |
| "50+ enterprise clients, 120M+ conversations, 12 countries" | INFERRED | company-supplied figures on kustiq.com, unverified. **Never publish** |

## Buyer profiles (INFERRED from site audiences + SERP research)

1. **Active job seeker, high volume** (new grads, software engineers). Searches: "AI job search", "jobs matching my resume", "best AI job search tools". Fears wasted applications and no replies. Wants proof the tool saves time and won't spam on their behalf. Action: free sign-up.
2. **Interview-anxious candidate** (career switchers, people returning to work). Searches: "AI mock interview", "practice interview out loud", "tell me about yourself answer". Fears blanking on follow-ups. Wants realistic practice and honest feedback. Action: one free mock interview.
3. **Resume tailorer** (designers/analysts, switchers). Searches: "match resume to job description", "resume match score", "Jobscan alternative". Fears ATS rejection. Wants a score with the specific missing skills. Action: free match score.

Brand voice (5 pages read): plain, second person, short sentences, calm and practical, honest about limits ("you edit and send"), no hype.
