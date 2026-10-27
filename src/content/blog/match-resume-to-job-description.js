const post = {
  slug: 'match-resume-to-job-description',
  category: 'resume',
  title: 'How to Match Your Resume to a Job Description, Step by Step',
  seo: {
    title: 'How to Match Your Resume to a Job Description',
    description:
      'Match your resume to a job description in six steps: pull the key skills, mirror the wording honestly, reorder your bullets and check what is missing.',
  },
  excerpt:
    'Six steps to match your resume to a job description honestly: pull the key skills, mirror the wording, reorder your bullets and find the gaps.',
  published: '2026-10-22',
  updated: '2026-10-22',
  answer:
    'To match your resume to a job description, pull out the skills and duties the posting repeats, mark which ones you really have, use the employer\'s wording for them, move your most relevant bullets to the top, update your summary and skills list, then check what is still missing. Never add a skill you do not have.',
  takeaways: [
    'The skills and duties a posting repeats or lists first are the ones the employer cares about most.',
    'Mirror the employer\'s wording for skills you really have, and move those bullets to the top of each job.',
    'Update your summary and skills section for each role, starting from the closest version of your resume.',
    'Never add a skill, tool or title you cannot explain with a real example.',
  ],
  body: [
    {
      type: 'p',
      text: 'Sending the same resume everywhere feels efficient, but a generic resume makes the recruiter do the matching for you. When you match your resume to a job description, you do that work for them: the skills they asked for show up in their words, near the top, backed by proof. This guide walks through six steps, a short worked example and the one rule that matters most: tailor honestly.',
    },

    { type: 'h2', id: 'why-it-matters', text: 'Why matching your resume to the job matters' },
    {
      type: 'p',
      text: 'A recruiter reading your resume is checking one thing: does this person have what the job needs? If the answer is buried in the fourth bullet of your second job, or described in different words, it is easy to miss. Many employers also search applications for the skills and job titles in the posting, so your words matter.',
    },
    {
      type: 'p',
      text: 'Matching your resume does not mean pretending to be someone else or starting from scratch. Most of the work is choosing, reordering and rewording what you already have, so your real, relevant experience is easy to find.',
    },

    { type: 'h2', id: 'six-steps', text: 'How to match your resume to a job description in 6 steps' },
    { type: 'h3', text: 'Step 1: Pull the key skills and duties from the posting' },
    {
      type: 'p',
      text: 'Copy the job description into a document and highlight three things: hard skills and tools (SQL, Figma, Excel), duties (the verbs: build, manage, report, present) and anything repeated or listed first. Repetition and order are the employer telling you what matters most. Then split the "required" items from the "nice to have" ones.',
    },
    { type: 'h3', text: 'Step 2: Mark what you really have' },
    {
      type: 'p',
      text: 'Next to each item, write one of three labels. **Have it:** you can point to where you used it. **Partly have it:** you have used something close, or used it briefly. **Do not have it.** Be strict. This list decides what you can honestly claim, and it doubles as your interview prep list.',
    },
    { type: 'h3', text: 'Step 3: Mirror the employer\'s wording, honestly' },
    {
      type: 'p',
      text: 'Where you have the skill, use their words for it. If the posting says "stakeholder management" and your resume says "worked with other teams", change it. If they say "customer success" and you wrote "account support" for the same work, use their term. Mirror the label, not the claim: the work underneath must stay true. Spell out acronyms once, for example "search engine optimization (SEO)", so both forms appear.',
    },
    { type: 'h3', text: 'Step 4: Reorder and rewrite your bullets' },
    {
      type: 'p',
      text: 'Under each job, move the bullets that match the posting to the top. Then rewrite the weak ones with a simple pattern: action verb, what you did, the skill or tool the job asks for, and the result. Add a real number when you have one, such as team size, volume or time saved. Shorten or cut bullets that support nothing in this posting.',
    },
    { type: 'h3', text: 'Step 5: Update your summary and skills section' },
    {
      type: 'p',
      text: 'Rewrite the short summary at the top so it names the target job title (if it honestly fits your experience) and your strongest matches. Then reorder your skills section so the required skills you have come first. If the list is long, remove skills that are dated or unrelated to this role.',
    },
    { type: 'h3', text: 'Step 6: Check what is still missing' },
    {
      type: 'p',
      text: 'Read the job description once more against your new resume. For each gap, ask: is this a real gap, or something I have but forgot to show? Add the forgotten ones and leave real gaps off. If a required skill is missing but you cover most of the rest, you can still apply.',
    },

    { type: 'h2', id: 'worked-example', text: 'A worked example: before and after' },
    {
      type: 'p',
      text: 'Here is a short, fictional example. The posting is for a Marketing Analyst at Fernway. The candidate writes SQL, builds dashboards in Power BI and has run email tests, but has never used Tableau or worked on marketing attribution.',
    },
    {
      type: 'example',
      label: 'Job description excerpt',
      meta: 'Marketing Analyst, Fernway (fictional)',
      lines: [
        'Write SQL to pull and clean campaign data.',
        'Build and maintain dashboards in Tableau for the growth team.',
        'Run A/B tests and report results to stakeholders.',
        'Present findings clearly to non-technical audiences.',
        'Experience with marketing attribution is a plus.',
      ],
    },
    {
      type: 'table',
      head: ['What the posting asks for', 'Does the candidate have it?', 'What to do'],
      rows: [
        ['SQL for campaign data', 'Have it', 'Name SQL and campaign data in a top bullet'],
        ['Dashboards in Tableau', 'Partly: builds dashboards in Power BI', 'Describe the dashboard work and name Power BI. Do not claim Tableau'],
        ['A/B tests reported to stakeholders', 'Have it (email tests)', 'Use "A/B tests" and "stakeholders" in the bullet'],
        ['Presenting to non-technical audiences', 'Have it', 'Say who the results were presented to'],
        ['Marketing attribution (a plus)', 'Do not have it', 'Leave it off and be ready to discuss it honestly'],
      ],
    },
    {
      type: 'example',
      label: 'Before',
      meta: 'Three bullets from the current resume',
      lines: [
        'Responsible for weekly reporting for the marketing team.',
        'Created dashboards and pulled data as needed.',
        'Helped with email tests.',
      ],
    },
    {
      type: 'example',
      label: 'After',
      meta: 'The same experience, matched to the posting',
      lines: [
        'Wrote SQL queries to pull and clean campaign data for the weekly marketing report used by the marketing leadership team.',
        'Built and maintained Power BI dashboards that track signups and campaign spend for the growth team.',
        'Designed and ran A/B tests on email subject lines and presented the results to non-technical stakeholders each month.',
      ],
    },
    {
      type: 'p',
      text: 'Nothing in the "after" version is new. What changed is the order, the verbs and the wording, which now match the posting. Tableau and attribution stay off, because the candidate has not used them. If you have used a tool only in a course or side project, say exactly that: "Tableau (course project)".',
    },

    { type: 'h2', id: 'honest-tailoring', text: 'Tailor honestly: never add skills you do not have' },
    {
      type: 'callout',
      tone: 'warn',
      title: 'The one rule',
      text: 'Only claim skills, tools, titles and results you can explain with a real example. A matched resume gets you into a conversation, and that conversation will test every line. If a skill is on your resume, expect to be asked about it.',
    },
    {
      type: 'p',
      text: 'Honest tailoring also means no tricks. Do not paste the job description in white text, change past job titles to match the posting or list a tool you once watched a video about. These leave you exposed in the interview. Role and knowledge rounds usually test the skills and tools in the job description, so the list you made in Step 2 tells you what to prepare.',
    },
    {
      type: 'product',
      text: 'For a second check before you apply, the [resume match score](/features/resume-job-match) in JobHunter by SuperMIA compares your resume with one job. It scores your resume out of 100 as an ATS match score for a specific job, with the reasoning, the skills you are missing and what to fix first. Treat it as a guide to where to focus, not a prediction of a hiring decision, and only add the missing skills you really have.',
    },

    { type: 'h2', id: 'how-much', text: 'How much should you tailor for each application?' },
    {
      type: 'p',
      text: '"I can\'t keep tailoring a resume for every application" is a fair complaint. You do not have to rewrite everything each time. Split the work into two levels:',
    },
    {
      type: 'list',
      ordered: false,
      items: [
        '**Every application (quick match):** reorder your skills, adjust the summary and move the most relevant bullets to the top of each job.',
        '**Roles you really want (full match):** go through all six steps, rewrite your bullets in the posting\'s wording, then [email the recruiter](/blog/how-to-email-a-recruiter) with a short, specific note.',
      ],
    },
    {
      type: 'p',
      text: 'It also helps to keep a base version for each kind of role you apply for most, and start each application from the closest one. Fewer, better applications take more care each, but every one of them is worth sending.',
    },

    { type: 'h2', id: 'mistakes', text: 'Mistakes that make a tailored resume worse' },
    {
      type: 'list',
      ordered: false,
      items: [
        '**Keyword stuffing.** Repeating a term over and over reads badly to a person. Use each key term where it is true.',
        '**Copying sentences from the posting.** Use their terms, not their sentences. "Responsible for driving cross-functional alignment" says nothing about you.',
        '**Changing facts.** Job titles, dates, employers and degrees stay exactly as they were. Change the wording, not the history.',
        '**Burying the match.** If your most relevant job is an older one, add a "Relevant experience" section so it is not lost at the bottom.',
        '**Skipping the final read.** Check the finished version once against the posting and once for typos.',
      ],
    },
    {
      type: 'p',
      text: 'If you are tailoring every resume and still hearing nothing, read [what to do when you have applied to jobs and got no response](/blog/applied-to-jobs-no-response). For more resume guides, see the [resume advice](/blog/category/resume) section of the blog.',
    },
  ],
  faqs: [
    {
      q: 'Should I tailor my resume for every job?',
      a: 'Yes, but it does not have to take long. For most applications, a quick match is enough: reorder your skills, adjust your summary and move the most relevant bullets to the top. Save the full six-step rewrite for the roles you want most, and start each one from the closest version of your resume.',
    },
    {
      q: 'Can I copy keywords straight from the job description?',
      a: 'Yes, for skills and tools you really have. Using the employer\'s exact term, such as "stakeholder management" instead of "worked with other teams", makes your match easy to see. Do not copy whole sentences, repeat terms over and over, or add keywords for skills you lack. Each term should sit inside a true example.',
    },
    {
      q: 'What if I do not have a skill the job asks for?',
      a: 'Leave it off your resume. If the skill is listed as a "nice to have", you can still apply with confidence. If it is required, apply when you match most of the rest, and mention briefly how you are building that skill in your email or cover letter. Be ready to talk about the gap honestly in the interview.',
    },
    {
      q: 'How many versions of my resume should I keep?',
      a: 'Keep one master resume with everything you have done, plus one version for each type of role you apply for often, such as data analyst and marketing analyst roles. Start each application from the closest version and make a quick match from there. That is faster than starting from scratch and keeps your facts consistent.',
    },
  ],
  related: ['how-to-email-a-recruiter', 'applied-to-jobs-no-response', 'best-ai-job-search-tools'],
};

export default post;
