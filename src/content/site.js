/**
 * All landing page copy lives here so it can be edited in one place.
 *
 * Honesty rules: no invented results, counts, ratings or deadlines.
 * The numbers in PRODUCT_FACTS describe the product itself (they are true by design).
 * TESTIMONIALS are sample copy: replace them with real customer quotes before launch.
 */

// Where every "get started" button goes (the portal sign-up page)
export const APP_URL = 'https://app.jobhunter.supermia.ai';
export const PRIVACY_URL = '/privacy-policy';
export const TERMS_URL = '/terms-and-conditions';
export const PARENT_URL = 'https://supermia.ai';

// Single source for offer wording. Only switch a flag on when it is really true.
export const OFFER = {
  cta: 'Get started',
  ctaLong: 'Start your job hunt',
  noCreditCard: false, // set true only if sign-up really needs no card
  freePlan: false, // set true only if a free plan exists
};

export const NAV = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how' },
  { label: 'Mock interviews', href: '#interview' },
  { label: 'FAQ', href: '#faq' },
];

export const HERO = {
  eyebrow: 'AI career platform',
  lines: ['Find the role.', 'Practice the interview.', 'Land the offer.'],
  sub: 'Job Hunter searches LinkedIn, Indeed and Dice for you, scores your resume against every job, writes the application email, and lets you rehearse the real interview out loud with an AI interviewer.',
};

export const CHANNELS = [
  { name: 'LinkedIn', logo: '/logos/linkedin.png' },
  { name: 'Indeed', logo: '/logos/indeed.png' },
  { name: 'Dice', logo: '/logos/dice.png' },
];

export const PROBLEM = {
  label: 'The problem',
  text: 'You send the same resume everywhere. You hear back from almost no one. You prepare alone, guess what they will ask, and walk into the interview hoping it goes well.',
  turn: 'Job Hunter turns guessing into a plan.',
};

export const FEATURES = [
  {
    id: 'discover',
    index: '01',
    title: 'Every matching job, in one search',
    body: 'Search LinkedIn, Indeed and Dice at once. Each role comes back ranked by how well it fits your resume, with the recruiter contact when it is public.',
    image: '/images/discovery-cafe.jpg',
    alt: 'Product designer browsing matched jobs on her laptop in a sunny cafe',
    mock: 'jobs',
  },
  {
    id: 'ats',
    index: '02',
    title: 'Know your resume score before you apply',
    body: 'See how an applicant tracking system reads your resume for a specific job: your match score, the skills you are missing, and what to fix first.',
    image: '/images/resume-editing.jpg',
    alt: 'Man editing his resume on a laptop next to a highlighted printed copy',
    mock: 'ats',
  },
  {
    id: 'mail',
    index: '03',
    title: 'An application email written for that job',
    body: 'Job Hunter drafts a short, specific email for the role and the recruiter, ready to copy, edit and send in a minute.',
    image: null,
    alt: '',
    mock: 'mail',
  },
  {
    id: 'interview',
    index: '04',
    title: 'Rehearse out loud with an AI interviewer',
    body: 'A live voice interview tuned to your level, your resume and the job. Pick a round, answer naturally, and get follow-up questions like the real thing.',
    image: '/images/feature-interview.jpg',
    alt: 'Woman practising a mock interview answer at her laptop at golden hour',
    mock: 'voice',
  },
  {
    id: 'report',
    index: '05',
    title: 'A scorecard that tells you what to fix',
    body: 'After each session you get an overall readiness score, clarity and confidence scores, strengths, gaps and the topics to practice next.',
    image: null,
    alt: '',
    mock: 'report',
  },
];

export const STEPS = [
  { n: '1', title: 'Upload your resume', body: 'Add one or more versions. Job Hunter reads your skills, experience and level.' },
  { n: '2', title: 'Find and tailor', body: 'Search three job boards at once, check your match score and send a tailored application email.' },
  { n: '3', title: 'Practice and get hired', body: 'Rehearse the exact round with an AI interviewer, review your scorecard and walk in ready.' },
];

export const ROUNDS = [
  { name: 'HR & Introduction', body: 'Background, motivation and culture fit' },
  { name: 'Role & Knowledge', body: 'Deep technical knowledge and tools' },
  { name: 'Practical & Behavioral', body: 'Scenarios, case studies and STAR answers' },
  { name: 'Managerial & Final', body: 'Leadership, ownership and strategy' },
];

export const MODES = [
  { name: 'AI Guided Practice', sub: 'Real-Time Coaching & Hints', best: 'Best for learning, practice & confidence' },
  { name: 'Real Interview Simulation', sub: 'Hiring Manager Simulation', best: 'Best for final practice & readiness assessment' },
];

// Facts about the product itself, not customer results
export const PRODUCT_FACTS = [
  { value: 3, suffix: '', label: 'job boards searched in one go' },
  { value: 4, suffix: '', label: 'interview rounds to rehearse' },
  { value: 2, suffix: '', label: 'practice modes, guided or strict' },
  { value: 10, suffix: '', prefix: '0-', label: 'readiness score after every session' },
];

// SAMPLE COPY: replace with real, approved customer quotes before launch
export const TESTIMONIALS = [
  {
    sample: true,
    quote: 'The mock interview asked the same follow-ups my real panel did. I stopped freezing on the second question.',
    role: 'Backend engineer',
    place: 'Chicago, IL',
    image: '/images/testimonial-1.jpg',
  },
  {
    sample: true,
    quote: 'Seeing my resume score per job showed me exactly which keywords I was missing. I rewrote one section and started getting replies.',
    role: 'Data analyst',
    place: 'Denver, CO',
    image: '/images/testimonial-2.jpg',
  },
  {
    sample: true,
    quote: 'One search across LinkedIn, Indeed and Dice saved me an hour every morning, and the email drafts were actually specific.',
    role: 'UX designer',
    place: 'Portland, OR',
    image: '/images/testimonial-3.jpg',
  },
  {
    sample: true,
    quote: 'As a new grad I had no idea what a behavioral round felt like. Practicing it out loud made the real one feel familiar.',
    role: 'Recent graduate',
    place: 'Austin, TX',
    image: '/images/testimonial-4.jpg',
  },
];

export const FAQS = [
  {
    q: 'What is Job Hunter?',
    a: 'An AI career platform that brings your job search into one place: it finds matching roles, scores your resume for each one, drafts application emails, and runs live voice mock interviews with a scorecard after each session.',
  },
  {
    q: 'Which job boards does it search?',
    a: 'LinkedIn, Indeed and Dice. You choose the channels, the job title, location, job type and how recent the postings should be.',
  },
  {
    q: 'How does the AI mock interview work?',
    a: 'You pick your level, one of four rounds, your resume and the target job. The AI interviewer then talks with you in real time and asks follow-up questions. When you finish, you get a scorecard with your readiness score, strengths, gaps and topics to practice.',
  },
  {
    q: 'What is the difference between the two practice modes?',
    a: 'AI Guided Practice gives you live coaching and hints while you answer, which is best for learning. Real Interview Simulation behaves like a hiring manager with no hints, which is best for a final check before the real interview.',
  },
  {
    q: 'Is it only for software jobs?',
    a: 'No. The job search, resume score and application email work for any role. The interview questions are tuned to the job title, the job description, your resume and your experience level.',
  },
  {
    q: 'Can I use more than one resume?',
    a: 'Yes. Keep several versions, see the score of each one against a job, and choose which resume to use for each mock interview.',
  },
];
