// /features: the hub that introduces the four features, in the order of a job hunt (find → apply → practice)
export const FEATURES_HUB = {
  path: '/features',
  label: 'Features',
  seo: {
    title: 'JobHunter Features: Job Search, Resume Match, Interviews',
    description:
      'Every JobHunter feature in one place: one search across LinkedIn, Indeed and Dice, a resume match score, email drafts and live AI mock interviews.',
  },
  hero: {
    eyebrow: '4 features · one plan',
    h1: [
      ['JobHunter ', { mark: 'Features' }],
      ['From First Search to ', { grad: 'Final Round', swoosh: true }],
    ],
    tagline: 'Find the right jobs, apply with a resume that fits and practice the interview out loud, all in one place.',
    lead: 'JobHunter by SuperMIA brings your job search into one place. It searches LinkedIn, Indeed and Dice in one go, scores your resume against each job out of 100, drafts an application email you edit and send yourself, and runs live voice mock interviews with a scorecard. It never applies or sends anything without you. Every feature is on every plan, including the Free plan; see [JobHunter pricing](/pricing) for the monthly limits.',
    points: ['One search across LinkedIn, Indeed and Dice', 'A match score out of 100 for each job', 'Live voice mock interviews with a scorecard'],
  },
  // Tour order and the stage each feature belongs to
  tour: [
    { slug: 'ai-job-match', stage: 'Find', icon: 'search' },
    { slug: 'resume-job-match', stage: 'Apply', icon: 'target' },
    { slug: 'job-application-email', stage: 'Apply', icon: 'mail' },
    { slug: 'ai-mock-interview', stage: 'Practice', icon: 'mic' },
  ],
  cta: {
    h2: [['Four Features, ', { mark: 'One Job Hunt' }]],
    text: 'Upload your resume once, search three boards, see your match and practice the interview before it counts.',
  },
};
