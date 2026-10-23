import howToEmailARecruiter from './how-to-email-a-recruiter';
import matchResumeToJobDescription from './match-resume-to-job-description';
import behavioralInterviewPractice from './behavioral-interview-practice';
import howToPracticeForAnInterview from './how-to-practice-for-an-interview';
import appliedToJobsNoResponse from './applied-to-jobs-no-response';
import bestAiJobSearchTools from './best-ai-job-search-tools';

/*
 * Blog registry. Post URLs are flat (/blog/slug) so a post never moves when its category changes.
 * Indexing rule (Navigation spec 4.3): the hub and each category stay "noindex, follow" until they hold
 * at least three Final posts; only indexable listings go in the sitemap.
 */

export const MIN_POSTS_TO_INDEX = 3;

// Big tag on each post's cover art, taken from the post itself: [big figure, word under it]
const COVER_TAGS = {
  'how-to-email-a-recruiter': ['5', 'examples'],
  'match-resume-to-job-description': ['6', 'steps'],
  'behavioral-interview-practice': ['STAR', 'method'],
  'how-to-practice-for-an-interview': ['7', 'day plan'],
  'applied-to-jobs-no-response': ['7', 'fixes'],
  'best-ai-job-search-tools': ['2026', 'compared'],
};

// Newest first; posts published the same day keep the plan's order
export const POSTS = [howToEmailARecruiter, matchResumeToJobDescription, behavioralInterviewPractice, howToPracticeForAnInterview, appliedToJobsNoResponse, bestAiJobSearchTools]
  .map((p, i) => ({ ...p, path: `/blog/${p.slug}`, order: i, coverTag: COVER_TAGS[p.slug] }))
  .sort((a, b) => b.published.localeCompare(a.published) || a.order - b.order);

export const POST_BY_SLUG = Object.fromEntries(POSTS.map((p) => [p.slug, p]));

export const CATEGORIES = [
  {
    slug: 'job-search',
    name: 'Job Search',
    menu: 'Job Search Tips',
    icon: 'briefcase',
    h1: 'Job Search Tips',
    seo: { title: 'Job Search Tips | JobHunter Blog', description: 'Practical job search guides from JobHunter by SuperMIA: clear steps, real examples and what to do next in your job hunt.' },
    hub: 'Applied everywhere and heard nothing back? Learn where to look, how to get noticed in a recruiter\'s inbox and what to do when applications go quiet. Browse [job search tips](/blog/category/job-search).',
    intro: [
      'Job search tips for the part of the hunt that happens before anyone calls you back: choosing which roles deserve an application, writing to a recruiter so the note gets read, and working out what to change when weeks go by without a reply.',
      'Every guide here is built to be used on your next application, not saved for later. You get the steps, short examples you can adapt, and a clear next move. Start with the fix list if your applications have gone quiet, or the recruiter email guide if you are about to write one.',
    ],
  },
  {
    slug: 'resume',
    name: 'Resume',
    menu: 'Resume Tips',
    icon: 'doc',
    h1: 'Resume Tips',
    seo: { title: 'Resume Tips | JobHunter Blog', description: 'Practical resume guides from JobHunter by SuperMIA: clear steps, real examples and what to do next in your job hunt.' },
    hub: 'Not sure your resume fits the job? Learn to read a job description, match your resume to it honestly and fix the gaps that matter most. Browse [resume tips](/blog/category/resume).',
    intro: [
      'Resume tips for one job at a time. A resume that tries to fit every posting usually fits none of them well, so these guides show you how to read a job description, find the skills it really asks for and bring the matching parts of your experience to the top.',
      'The rule throughout is honesty: mirror the wording where it is true, reorder and sharpen what you have, and never add a skill you cannot talk about in an interview.',
    ],
  },
  {
    slug: 'interview-prep',
    name: 'Interview Prep',
    menu: 'Interview Prep',
    icon: 'mic',
    h1: 'Interview Prep Tips',
    seo: { title: 'Interview Prep Tips | JobHunter Blog', description: 'Practical interview prep guides from JobHunter by SuperMIA: clear steps, real examples and what to do next in your job hunt.' },
    hub: 'Did your mind go blank on the follow-up question? Learn to practice your answers out loud and think through what the interviewer will ask next, round by round. Browse [interview tips](/blog/category/interview-prep).',
    intro: [
      'Interview prep tips for the moment the follow-up question lands. Most people rehearse in their head, then find out in the room that the answer does not hold together when spoken. These guides help you practice out loud, structure stories with the STAR method and expect the next question before it comes.',
      'You will find practice plans you can run alone, examples of strong and weak answers, and checklists for reviewing yourself after each session.',
    ],
  },
];

export const CATEGORY_BY_SLUG = Object.fromEntries(CATEGORIES.map((c) => [c.slug, c]));

export const postsIn = (slug) => POSTS.filter((p) => p.category === slug);
export const categoryIndexable = (slug) => postsIn(slug).length >= MIN_POSTS_TO_INDEX;
export const hubIndexable = () => POSTS.length >= MIN_POSTS_TO_INDEX;

export const BLOG_HUB = {
  path: '/blog',
  seo: {
    title: 'Job Search & Interview Tips | JobHunter Blog',
    description: 'Job search and interview tips: find roles that fit, match your resume to a job description, email recruiters and practice interviews out loud.',
  },
  h1: [
    ['JobHunter Blog: ', { mark: 'Job Search,' }],
    ['Resume and ', { chip: 'book' }, ' ', { grad: 'Interview Tips', swoosh: true }],
  ],
  lead: 'Job search and interview tips you can use on your next application: finding roles that fit, matching your resume to the job, writing to recruiters and practicing the interview out loud.',
  latestH2: 'Latest Job Search and Interview Tips',
  cta: {
    h2: [['Put the Advice to ', { mark: 'Work' }], ['on Your ', { grad: 'Next Application', swoosh: true }]],
    text: 'Reading about it helps. Doing it on a real job helps more. Upload your resume once, see your match score for each role, and practice the interview before it counts. Have a question first? Read the [JobHunter FAQ](/faq).',
  },
};

export const AUTHOR = { name: 'JobHunter team at SuperMIA', url: 'https://supermia.ai/' };
