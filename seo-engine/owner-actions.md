# Owner actions (off-site, in plain English)

## This week: setup

1. **Deploy** the latest code. Then, in Google Search Console:
   - Pages → "Not found (404)" → **Validate fix**.
   - URL inspection → **Request indexing** for `/faq`, `/pricing`, `/features/ai-mock-interview` and `/features/job-application-email`.
   - Sitemaps → resubmit `https://jobhunter.supermia.ai/sitemap.xml`.
2. **Bing Webmaster Tools**: add the site ("Import from Google Search Console" is fastest) and submit the same sitemap. Bing also feeds Copilot and ChatGPT search.
3. **Analytics**:
   - GA4 is installed (G-DC7KCBY4XD). After deploy, check Reports → Realtime while you click a sign-up button.
   - In GA4, mark `lead_click` with `lead_type = signup` as a **key event**.
   - Create an "AI referrals" segment: session source matches `chatgpt|perplexity|claude|gemini|copilot`.
4. **In the app**: when an account is created, fire `sign_up` to the same GA4 property and save the `utm_source` / `utm_medium` from the sign-up URL.
5. **Speed check**: run https://pagespeed.web.dev on `/`, `/features/ai-mock-interview` and `/pricing`. Note LCP, CLS and INP, and send me anything red.
6. **Edge check**: if the host or CDN has bot protection (e.g. Cloudflare "Block AI bots"), make sure it does **not** block GPTBot, ClaudeBot, PerplexityBot or OAI-SearchBot.

## Weeks 2–4: get listed where AI engines look

Always use the exact name **"JobHunter by SuperMIA"** and the same one-line description:
> JobHunter by SuperMIA searches LinkedIn, Indeed and Dice in one search, scores your resume for each job, drafts the email and runs voice mock interviews.

7. Product Hunt launch (prepare a gallery from the 47-second demo).
8. Directories: There's An AI For That, Futurepedia, AlternativeTo (list as an alternative to Jobscan, Teal, Huntr and Final Round AI), topai.tools, SaaSHub.
9. On your G2 and Capterra listings (now linked from the site's schema), add JobHunter as a product.

## Weeks 4–8: mentions and reviews

10. Email the authors of these roundups and offer a free Pro account to review JobHunter:
    - best AI job search tools: hackajob, careery.pro, skillscouter, theaicareerlab
    - AI mock interview tools: fast.io, codersera, favtutor, prachub
11. Ask real users for honest reviews on G2/Capterra after their first mock interview. Never pay for or script reviews.
12. Reddit (r/jobs, r/resumes, r/cscareerquestions): answer questions helpfully. Mention JobHunter only where it truly answers the question, and disclose that you work on it.
13. Post 3–4 short demo clips on the SuperMIA YouTube channel, one per feature, each linking to the matching feature page.

## Weeks 8–12: content and refresh

14. Answer blocker B6 (competitor fact-check) so the alternatives pages can go live.
15. Monthly (first Monday):
    - Search Console: find queries with impressions but few clicks and send them to me to rewrite titles; also send pages ranking in positions 5–20.
    - Re-run the 20 prompts in `research/ai-visibility.md` and record whether JobHunter is mentioned.
    - GA4: leads by page and by source, including AI referrals.

## 90-day content calendar

| Week | Publish / refresh |
|---|---|
| 1 | /blog/how-to-answer-tell-me-about-yourself (unlocks the Interview Prep category) |
| 2 | /about |
| 3–4 | /blog/final-round-ai-alternatives (after B6) |
| 5–6 | /blog/jobscan-alternatives (after B6) |
| 7 | a 3rd Resume post (unlocks the Resume category), e.g. "how to tailor a resume for each job" |
| 8 | refresh /blog/best-ai-job-search-tools: re-check every price and update the "Checked" dates |
| 9–12 | refresh the page with the most GSC impressions each week |

## What code cannot do

- **Rankings and citations aren't guaranteed by on-page work.** Links from other sites and mentions on listicles, review sites, Reddit and YouTube matter more for AI answers than our own markup.
- **Review stars need real reviews** first.
- **People searching for "JobHunter by SuperMIA" by name** is a strong signal; it grows from marketing outside search.
- **New pages usually take weeks to months to settle in rankings.**
