/**
 * Sitewide facts, navigation and the homepage copy, kept in one place.
 *
 * Source: the approved Fact Sheet and the homepage v2 content (22 Oct 2026). Honesty rules: no invented
 * results, counts, ratings or deadlines. The numbers in PRODUCT_FACTS describe the product itself.
 * Never say: guaranteed, auto-apply, beat the ATS, ATS-proof, free forever (see the Fact Sheet).
 */

export const APP_URL = 'https://app.jobhunter.supermia.ai';
// Every "Start your job hunt" style button goes to sign-up; Log in keeps APP_URL
export const SIGNUP_URL = 'https://app.jobhunter.supermia.ai/signup';
export const PRIVACY_URL = '/privacy-policy';
export const TERMS_URL = '/terms-and-conditions';
export const PARENT_URL = 'https://supermia.ai';
// Canonical origin. A staging or preview host sets NEXT_PUBLIC_SITE_URL so it never emits production canonicals.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://jobhunter.supermia.ai').replace(/\/$/, '');
export const BROCHURE_URL = '/brochure/job-hunter-brochure.pdf';
// Google Analytics 4 measurement ID (public by design: it ships in every page's HTML)
export const GA_ID = 'G-DC7KCBY4XD';
// Google Tag Manager container (public). GA4 stays on gtag.js above, so the container must not also hold a
// GA4 Google tag for GA_ID, or every page view is counted twice.
export const GTM_ID = 'GTM-PCMC5P48';

// How search engines should name the product and its publisher
export const BRAND = {
  name: 'JobHunter',
  siteName: 'JobHunter by SuperMIA',
  alternateNames: ['Job Hunter', 'JobHunter AI'],
  parent: 'SuperMIA',
  company: 'Botfinity Inc.',
  email: 'hello@supermia.ai',
  address: { street: '2451 W Grapevine Mills Cir #547', city: 'Grapevine', region: 'TX', postalCode: '76051', country: 'US' },
  // Profiles confirmed on 28 Oct 2026: the first three and the Google Maps listing are linked from the
  // supermia.ai footer, the DEV profile links back to supermia.ai, and the owner confirmed G2 and Capterra.
  sameAs: [
    'https://www.linkedin.com/showcase/mia-my-intelligent-assistant',
    'https://www.youtube.com/@MIAMyIntelligentAssistant',
    'https://twitter.com/supermia_ai',
    'https://maps.google.com/?cid=10850915260473186586',
    'https://dev.to/supermia',
    'https://www.g2.com/products/supermia',
    'https://www.capterra.com/p/10039381/SuperMIA/',
  ],
  // The one-paragraph answer to "what is JobHunter?", shared by /llms.txt and /llms-full.txt
  summary:
    'JobHunter (also called Job Hunter, JobHunter AI) is an AI job search and interview practice app from SuperMIA, operated by Botfinity Inc. in Grapevine, Texas. It searches LinkedIn, Indeed and Dice in one search, scores your resume for each job out of 100 with the reasoning and missing skills, drafts an application email for the role that you edit and send, and runs live voice mock interviews with a 0-10 readiness score. It never applies to jobs or sends anything without the user.',
};

// Shared by every page's openGraph metadata: Next.js replaces, not merges, the root layout's openGraph
export const OG_BASE = { siteName: BRAND.siteName, locale: 'en_US' };

export const SEO = {
  title: 'JobHunter: AI Job Search and Live Interview Practice',
  description: 'AI job search across LinkedIn, Indeed and Dice at once. See your resume match for every job, draft the email and rehearse the interview out loud.',
  ogImageAlt: 'JobHunter: AI job search, resume match score and live interview practice',
  updated: '2026-10-22',
};

// Single source for offer wording. Only switch a flag on when it is really true.
export const OFFER = {
  cta: 'Start your job hunt',
  ctaLong: 'Start your job hunt',
  demo: 'Watch the 47-second demo',
  control: 'It never applies or sends anything without you.',
  noCreditCard: false, // sign-up asks for a card (owner, 2026-10-28); the site doesn't mention cards either way
  freePlan: true, // Free plan confirmed by the client (pricing sheet, 2026-10-22)
};

/* ------------------------------------------------------------------ */
/* Navigation (Navigation and Menu Spec v2). Labels are the anchor text. */
/* ------------------------------------------------------------------ */

export const MENU = {
  features: {
    label: 'Features',
    columns: [
      {
        title: 'Find jobs',
        items: [{ label: 'AI Job Match', desc: 'LinkedIn, Indeed and Dice in one search, ranked by fit', href: '/features/ai-job-match', icon: 'search' }],
      },
      {
        title: 'Apply',
        items: [
          { label: 'Resume Job Match', desc: 'Your match score and missing skills for one job', href: '/features/resume-job-match', icon: 'target' },
          { label: 'Application Email Writer', desc: 'A note for every role, ready for you to send', href: '/features/job-application-email', icon: 'mail' },
        ],
      },
      {
        title: 'Practice',
        items: [
          { label: 'AI Mock Interview', desc: 'Four rounds, out loud, with follow-up questions', href: '/features/ai-mock-interview', icon: 'mic' },
          { label: 'Interview Scorecard', desc: 'Readiness score 0-10 and what to practice next', href: '/features/ai-mock-interview#scorecard', icon: 'chart' },
        ],
      },
    ],
    footer: [
      { label: 'All features', href: '/features' },
      { label: 'How it works', href: '/#how' },
      { label: 'Watch the 47-second demo', href: '/#demo' },
    ],
  },
  audiences: {
    label: "Who It's For",
    items: [
      { label: 'New Grads', desc: 'Find a first role and practice the interview', href: '/for-new-grads', icon: 'cap' },
      { label: 'Career Switchers', desc: 'Show how your skills carry over', href: '/for-career-switchers', icon: 'refresh' },
      { label: 'Software Engineers', desc: 'LinkedIn, Indeed and Dice in one search', href: '/for-software-engineers', icon: 'code' },
      { label: 'Designers and Analysts', desc: 'See your match score before you apply', href: '/for-designers-and-analysts', icon: 'pen' },
      { label: 'Returning to Work', desc: 'Rebuild interview confidence', href: '/for-people-returning-to-work', icon: 'compass' },
    ],
    // Side note in the dropdown
    aside: { title: 'Designers, analysts and people returning to work', text: 'The same plan works for any role: find the right jobs, apply with a resume that fits, practice until you are ready.', link: { label: 'Read the FAQ', href: '/faq' } },
  },
  blog: {
    label: 'Blog',
    items: [
      { label: 'All Articles', desc: 'Job search, resume and interview tips', href: '/blog', icon: 'book' },
      { label: 'Job Search Tips', desc: 'Get noticed and get replies', href: '/blog/category/job-search', icon: 'briefcase' },
      { label: 'Resume Tips', desc: 'Match your resume to the job', href: '/blog/category/resume', icon: 'doc' },
      { label: 'Interview Prep', desc: 'Practice answers out loud', href: '/blog/category/interview-prep', icon: 'mic' },
      { label: 'Interview Questions', desc: 'Common questions by round and role', href: '/interview-questions', icon: 'question' },
    ],
    // Featured guide in the dropdown (newest post)
    featured: { kicker: 'Latest guide', title: 'How to Email a Recruiter About a Job (With 5 Short Examples)', href: '/blog/how-to-email-a-recruiter', tag: 'Job Search' },
  },
  faq: { label: 'FAQ', href: '/faq' },
  login: { label: 'Log in', href: APP_URL },
};

// Plans, prices and limits come from the billing API (lib/billing.js); every sentence naming them is
// built in lib/pricing.js. This holds only what the API does not: the limit rows, in display order, and
// the copy for each plan keyed by its API plan_code.
export const PRICING = {
  path: '/pricing',
  rows: [
    { key: 'resume', one: 'resume upload', unit: 'resume uploads', label: 'Resume uploads', hint: 'Read and parsed into your profile', icon: 'doc' },
    { key: 'ats', one: 'ATS match score', unit: 'ATS match scores', label: 'ATS match scores', hint: 'A score out of 100 for one job', icon: 'target' },
    { key: 'jobs', one: 'job match', unit: 'job matches', label: 'Job matches', hint: 'Jobs found on LinkedIn, Indeed and Dice', icon: 'search' },
    { key: 'perSearch', one: 'job per search', unit: 'jobs per search', label: 'Jobs per search', hint: 'The most jobs one search returns', icon: 'briefcase', inProse: false },
    { key: 'emails', one: 'application email draft', unit: 'application email drafts', label: 'Application email drafts', hint: 'Written from your resume, sent by you', icon: 'mail' },
    { key: 'interviews', one: 'AI mock interview', unit: 'AI mock interviews', label: 'AI mock interviews', hint: 'Live voice, with a scorecard', icon: 'mic' },
    { key: 'minutes', one: 'minute of interview practice', unit: 'minutes of interview practice', label: 'Interview practice minutes', hint: 'Total live voice practice time', icon: 'clock' },
  ],
  // A plan the API adds later still renders, just without a blurb
  copy: {
    free_plan: { blurb: 'Try the whole loop on a real job before you pay anything.' },
    plan_1: { blurb: 'For an active search: apply to the right roles every week and practice the rounds.', fit: 'an active search' },
    plan_2: { blurb: 'For a full-time search across several roles, with more interview practice.', fit: 'a full-time search across several roles' },
  },
};

export const FOOTER = [
  {
    title: 'Product',
    links: [
      { label: 'All Features', href: '/features' },
      { label: 'AI Job Match', href: '/features/ai-job-match' },
      { label: 'Resume Job Match', href: '/features/resume-job-match' },
      { label: 'Application Email Writer', href: '/features/job-application-email' },
      { label: 'AI Mock Interview', href: '/features/ai-mock-interview' },
      { label: 'How It Works', href: '/#how' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Start your job hunt', href: SIGNUP_URL },
    ],
  },
  {
    title: "Who It's For",
    links: [
      { label: 'New Grads', href: '/for-new-grads' },
      { label: 'Career Switchers', href: '/for-career-switchers' },
      { label: 'Software Engineers', href: '/for-software-engineers' },
      { label: 'Designers and Analysts', href: '/for-designers-and-analysts' },
      { label: 'People Returning to Work', href: '/for-people-returning-to-work' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Job Search Tips', href: '/blog/category/job-search' },
      { label: 'Resume Tips', href: '/blog/category/resume' },
      { label: 'Interview Prep', href: '/blog/category/interview-prep' },
      { label: 'Interview Questions', href: '/interview-questions' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Homepage copy (Home v2 content)                                     */
/* ------------------------------------------------------------------ */

export const HERO = {
  h1: 'JobHunter: AI Job Search and Live Interview Practice',
  lines: ['Find the role.', 'Practice the interview.', 'Land the offer.'],
  sub: 'JobHunter is an AI job search app that searches LinkedIn, Indeed and Dice at once and shows how well your resume matches every job. Get an application email written for the role you pick, then rehearse the interview out loud with an AI interviewer that asks follow-up questions.',
  sub2: 'Built by SuperMIA for new grads, career switchers and anyone tired of sending the same resume everywhere.',
};

export const CHANNELS = [
  { name: 'LinkedIn', logo: '/logos/linkedin.png' },
  { name: 'Indeed', logo: '/logos/indeed.png' },
  { name: 'Dice', logo: '/logos/dice.png' },
];

export const PROBLEM = {
  label: 'The problem',
  h2: 'Why You Hear Nothing Back: Same Resume, No Feedback, No Practice',
  intro: 'Applied to hundreds of jobs and heard nothing back? It is usually not a talent problem. The resume does not match the job, rejections carry no feedback, and the interview only gets rehearsed in your head.',
  beats: [
    {
      title: 'You send the same resume everywhere',
      why: 'One file goes to every company. One resume rarely matches every job description, and you cannot see which parts are missing.',
      fix: 'See a match score for each job and the skills to add before you apply.',
    },
    {
      title: 'Rejections come with no feedback',
      why: 'When a reply comes at all, it often says nothing about why. So you keep sending more of the same and hope the numbers work out.',
      fix: 'Every match score shows its reasoning and the skills you are missing.',
    },
    {
      title: 'You guess what they will ask',
      why: '"Tell me about yourself." "What do you expect for salary?" When you practice alone, nobody asks the follow-up or tells you which answer fell flat.',
      fix: 'An AI interviewer asks the follow-ups out loud, then scores your answers.',
    },
  ],
  turn: 'JobHunter turns guessing into a plan.',
};

export const FEATURES_INTRO = {
  h2: 'Five AI Job Search Tools That Work Together',
  sub: 'Upload your resume once. The search, the match score, the email and the mock interview all work from it.',
};

export const FEATURES = [
  {
    id: 'discover',
    index: '01',
    title: '1. Three job boards, one search',
    body: 'Search LinkedIn, Indeed and Dice at once. Each role comes back ranked by how well it fits your resume, with the recruiter contact when it is public. See how [AI job match](/features/ai-job-match) works.',
    image: '/images/discovery-cafe.jpg',
    alt: 'Job seeker reviewing matched jobs from LinkedIn, Indeed and Dice in a cafe',
    mock: 'jobs',
  },
  {
    id: 'ats',
    index: '02',
    title: '2. Know your match score before you apply',
    body: "See how your resume reads against a specific job: an ATS match score out of 100, the skills you are missing, and what to fix first. It is a guide to where to focus for that job, not a prediction of how an employer's system will rank you. Here is how the [resume match score](/features/resume-job-match) works.",
    image: '/images/resume-editing.jpg',
    alt: 'Job seeker editing a resume next to a highlighted printed copy',
    mock: 'ats',
  },
  {
    id: 'mail',
    index: '03',
    title: '3. An application email written for that job',
    body: 'JobHunter drafts a short, specific email for the role and the recruiter, ready for you to copy, edit and send yourself. See the [job application email writer](/features/job-application-email).',
    image: null,
    alt: '',
    mock: 'mail',
  },
  {
    id: 'interview',
    index: '04',
    title: '4. Rehearse out loud with an AI interviewer',
    body: 'A live voice interview set to your level, your resume and the job. Pick a round, answer naturally, and get the kind of follow-up questions a real panel asks. Try an [AI mock interview](/features/ai-mock-interview).',
    image: '/images/feature-interview.jpg',
    alt: 'Candidate answering a practice interview question out loud at a laptop',
    mock: 'voice',
  },
  {
    id: 'report',
    index: '05',
    title: '5. A scorecard that tells you what to fix',
    body: 'After each session you get an overall readiness score from 0 to 10, scores for clarity, confidence and technical depth, your strengths, your gaps and the topics to practice next.',
    image: null,
    alt: '',
    mock: 'report',
  },
];

// The product reel. Chapter times match the video; captions are burned into the picture.
export const DEMO = {
  label: 'Watch the demo',
  h2: 'See JobHunter Work in 47 Seconds',
  sub: 'One resume, one search, a match score for every role and an email draft you edit and send. You stay in control the whole way.',
  src: '/video/jobhunter-ai-demo.mp4',
  poster: '/video/jobhunter-ai-demo-poster.jpg',
  name: 'JobHunter demo: AI job search in 47 seconds',
  description: 'One resume, one search across LinkedIn, Indeed and Dice, a match score for every role and an email draft you edit and send.',
  uploadDate: '2026-10-08T16:30:00+05:30',
  duration: 'PT47S',
  seconds: 47.6,
  chapters: [
    { start: 0, title: 'Three tabs, a hundred listings', body: 'Reading every listing and guessing your fit by hand.' },
    { start: 12, title: 'Meet JobHunter', body: 'AI job search and interview practice from SuperMIA.' },
    { start: 17, title: 'Upload once', body: 'It reads your role, skills and experience.' },
    { start: 21, title: 'Search once', body: 'Live jobs from LinkedIn, Indeed and Dice in a single run.' },
    { start: 27, title: 'Your fit, scored', body: 'A score out of 100, the reasoning and the skills you are missing.' },
    { start: 33, title: 'Your email, drafted', body: 'Outreach written from your resume for that exact role.' },
    { start: 37, title: 'You review. You apply.', body: 'It never applies or sends anything without you.' },
  ],
};

export const HOW = {
  h2: 'How JobHunter Works in Three Steps',
  sub: 'Set up once, then go from search to interview in one place.',
  leadIn: 'Upload your resume once. Everything else builds on it.',
};

export const STEPS = [
  { n: '1', title: 'Step 1: Upload your resume', body: 'Add one or more versions. JobHunter reads your skills, experience and level, and uses them to score every job you see.' },
  { n: '2', title: 'Step 2: Find roles and apply with a stronger resume', body: 'Search three job boards at once, check your match score, add the missing skills you really have, and send an application email written for that role.' },
  { n: '3', title: 'Step 3: Practice and walk in ready', body: 'Rehearse the round you are preparing for out loud, review your scorecard and work on the gaps before the real conversation.' },
];

export const INTERVIEW = {
  h2: 'Rehearse the Real Interview Out Loud',
  sub: 'Your next interview will ask follow-up questions. Hear them first. The AI interviewer asks the kind of follow-ups a real panel asks, then scores how you answered.',
  reassure: 'Feel awkward practicing out loud? Start in guided practice with hints, then switch to the strict simulation when you are ready.',
};

// Round names only: what each round covers is still to be confirmed by SuperMIA
export const ROUNDS = [
  { name: 'HR & Introduction', body: 'Choose this round and answer out loud' },
  { name: 'Role & Knowledge', body: 'Choose this round and answer out loud' },
  { name: 'Practical & Behavioral', body: 'Choose this round and answer out loud' },
  { name: 'Managerial & Final', body: 'Choose this round and answer out loud' },
];

export const MODES = [
  { name: 'Guided practice', sub: 'The AI interviewer gives you hints', best: 'Best for learning and building confidence' },
  { name: 'Real simulation', sub: 'A strict run of the round you picked', best: 'Best for testing yourself when you are ready' },
];

// Facts about the product itself, not customer results
export const PRODUCT_FACTS = [
  { value: 3, suffix: '', label: 'job boards searched in one go' },
  { value: 4, suffix: '', label: 'interview rounds to rehearse' },
  { value: 2, suffix: '', label: 'practice modes, guided or strict' },
  { value: 10, suffix: '', prefix: '0-', label: 'readiness score after every session' },
];

export const AUDIENCE = {
  h2: 'Who JobHunter Is Built For',
  sub: 'JobHunter is an AI job hunter for people who want fewer, better applications. For a first role or your next one, the plan is the same. Find the right jobs, apply with a resume that fits, and practice until you are ready.',
  items: [
    { label: 'New grads', text: 'Looking for a first role without much interview experience.', href: '/for-new-grads', icon: 'cap' },
    { label: 'Career switchers', text: 'Need to show how their skills carry over to a new field.', href: '/for-career-switchers', icon: 'refresh' },
    { label: 'Engineers', text: 'Preparing for role and knowledge rounds.', href: '/for-software-engineers', icon: 'code' },
    { label: 'Designers and analysts', text: 'Want to see their match score before they apply.', href: '/for-designers-and-analysts', icon: 'pen' },
    { label: 'People returning to work', text: 'Want to rebuild interview confidence.', href: '/for-people-returning-to-work', icon: 'compass' },
  ],
};

export const CONTROL = {
  h2: 'You Stay in Control of Every Application',
  sub: 'JobHunter does the searching, scoring and drafting. You make every decision.',
  points: [
    'It never applies to a job for you.',
    'It never sends an email without you.',
    'Each match score shows its reasoning, so you can judge it yourself. Use it to decide where to spend your effort, not as a prediction of a hiring decision.',
  ],
  boards: 'Jobs come from LinkedIn, Indeed and Dice, which are third-party services with their own terms. JobHunter shows and links to their listings.',
};

export const PRIVACY = {
  h2: 'What Happens to Your Resume and Recordings',
  paras: [
    'Your resume, job preferences, mock interview audio and transcripts are used to run the service, give you feedback and improve the product. The AI and speech providers that perform these tasks process them too.',
    'If you delete your account, your personal information is deleted or anonymized within a reasonable period. The exception is anything that must be kept to meet legal obligations, resolve disputes or enforce agreements.',
    'Read the full [privacy policy](/privacy-policy) and [terms and conditions](/terms-and-conditions).',
  ],
};

export const BROCHURE = {
  h2: 'Take the 8-Page Brochure With You',
  sub: 'The brochure walks through the hidden challenges of job hunting, how JobHunter works and what makes it different. Read it later, print it, or share it with a friend who is job hunting. No sign-up needed.',
};

// Homepage preview only (no FAQPage markup here; the full list and its schema live on /faq)
export const FAQ_PREVIEW = {
  h2: 'JobHunter FAQs',
  sub: 'Five quick answers. The full list, from match scores to privacy, is on the [JobHunter FAQ page](/faq).',
};

export const FAQS = [
  {
    q: 'What is JobHunter?',
    a: 'JobHunter is an AI job search and interview practice app from SuperMIA. It searches LinkedIn, Indeed and Dice in one go, scores your resume for each job and drafts the application email. It also runs live voice mock interviews with a scorecard, and you approve every step.',
  },
  {
    q: 'Does JobHunter apply to jobs for me?',
    a: 'No. JobHunter never applies to jobs or sends emails without you. It finds matching roles, scores your resume and drafts the email, and you decide which jobs to apply for, edit the email and send it yourself.',
  },
  {
    q: 'Which job boards does JobHunter search?',
    a: 'JobHunter searches LinkedIn, Indeed and Dice in a single search. Each role comes back ranked by how well it fits your resume, with the recruiter contact when it is public. The job boards are third-party services, and their own terms and privacy policies apply when you use them.',
  },
  {
    q: 'How does the AI mock interview work?',
    a: 'You pick one of four rounds: HR & Introduction, Role & Knowledge, Practical & Behavioral, or Managerial & Final. Then you answer out loud. The AI interviewer asks follow-up questions based on your level, your resume and the job, and gives you a readiness score with the topics to practice next.',
  },
  {
    q: 'What happens to my resume and interview recordings?',
    a: 'Your resume, preferences, mock interview audio and transcripts are used to provide the service, give you feedback and improve the product, and are processed by the AI and speech providers that perform these tasks. If you delete your account, your data is deleted or anonymized within a reasonable period, unless some of it must be kept to meet legal obligations, resolve disputes or enforce agreements.',
  },
];

export const FINAL_CTA = {
  h2: 'Start Your Next Job Hunt With One Search and One Practice Round',
  sub: 'Search three job boards, see your match score for each role, and hear the follow-up questions before your interview does. For more job search and interview advice, read the [JobHunter blog](/blog).',
  note: 'Nothing is applied or sent without you.',
};
