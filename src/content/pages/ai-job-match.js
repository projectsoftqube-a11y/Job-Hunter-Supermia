const page = {
  slug: 'ai-job-match',
  path: '/features/ai-job-match',
  kind: 'feature',
  label: 'AI Job Match',
  seo: {
    title: 'AI Job Match Across LinkedIn, Indeed & Dice | JobHunter',
    description:
      'Search LinkedIn, Indeed and Dice at once and see every role ranked by how well it fits your resume, with the reasoning and the skills you are missing.',
  },
  hero: {
    eyebrow: 'Job search',
    tagline: 'Search LinkedIn, Indeed and Dice in one go and see every job ranked by how well it fits your resume.',
    h1: [
      [{ mark: 'AI Job Match:' }, ' Jobs From LinkedIn,'],
      ['Indeed and Dice, ', { grad: 'Ranked by Fit', swoosh: true }],
    ],
    lead:
      'Three tabs open, a hundred listings, and no idea which ones fit? AI job match from JobHunter by SuperMIA searches LinkedIn, Indeed and Dice in one search and ranks every role by how well it fits your resume. You get jobs matched to your resume, each with a score out of 100, the reasoning and the skills you are missing.',
    points: [
      'LinkedIn, Indeed and Dice in one search',
      'Every role ranked by fit with your resume',
      'Recruiter contact shown when it is public',
    ],
    visual: 'jobs',
  },
  sections: [
    {
      id: 'how-it-works',
      eyebrow: 'How it works',
      h2: [['How ', { mark: 'AI job match' }, ' works']],
      intro:
        'AI job matching starts with you, not with the listings. Upload your resume once, run one search and read the results in order of fit. It is the first step in [JobHunter](/), and everything after it builds on the same resume.',
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: 'Upload your resume',
              text: 'Add one or more versions. Your skills, experience and level are read for you, so the ranking starts from your real background.',
            },
            {
              title: 'Search once',
              text: 'Run a single search. JobHunter looks across LinkedIn, Indeed and Dice for you.',
            },
            {
              title: 'See roles ranked by fit',
              text: 'Each role comes back ranked by how well it fits your resume, with a score out of 100 and the reasoning.',
            },
            {
              title: 'Decide what to do next',
              text: 'Open the listing, check what is missing, draft an email or move on. Nothing is applied or sent without you.',
            },
          ],
        },
      ],
    },
    {
      id: 'one-search',
      eyebrow: 'Three boards',
      h2: [['One search across', { chip: 'layers' }], [{ grad: 'LinkedIn, Indeed and Dice', swoosh: true }]],
      intro:
        'Job search across multiple sites usually means the same routine: open each board, type the same search, scroll, and try to remember which listing you saw where. Search LinkedIn, Indeed and Dice at once instead, and see every role ranked by fit in one place.',
      blocks: [
        {
          type: 'table',
          head: ['', 'Searching board by board', 'AI job match'],
          rows: [
            ['Searches', 'One board at a time', 'LinkedIn, Indeed and Dice in one search'],
            ['Order', "Each board's own sort order", 'Ranked by how well each role fits your resume'],
            ['Fit', 'You read every listing and guess', 'A score out of 100, with the reasoning'],
            ['Gaps', 'Hard to spot until a rejection', 'The skills you are missing, listed for each role'],
          ],
        },
        {
          type: 'p',
          text: 'LinkedIn, Indeed and Dice are third-party services with their own terms. JobHunter shows and links to their listings, but it does not control those boards or the employers that post on them.',
        },
      ],
    },
    {
      id: 'fit-score',
      eyebrow: 'Fit score',
      h2: [['Why each job gets ', { mark: 'a fit score' }]],
      intro:
        'A long list of jobs is not the problem. Knowing which ones deserve your time is. An AI job finder is only useful if it tells you why a role fits, so every match comes with a score and its reasoning. That way you can send fewer, better applications.',
      blocks: [
        {
          type: 'cards',
          columns: 3,
          items: [
            {
              title: 'Prioritize',
              text: 'Start with the roles where your resume already fits, instead of reading every listing in full.',
              icon: 'target',
            },
            {
              title: 'Judge it yourself',
              text: 'Every score shows its reasoning, so you can agree, disagree or spot something it missed.',
              icon: 'search',
            },
            {
              title: 'Plan your edits',
              text: 'The missing skills show what to add, if you really have them, before you apply.',
              icon: 'doc',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'What the score is not',
          text: 'The fit score is a guide to where to focus, not a prediction of a hiring decision. For the full breakdown on one job, see how the [resume match score](/features/resume-job-match) works.',
        },
      ],
    },
    {
      id: 'every-match',
      eyebrow: 'Every match',
      h2: [[{ chip: 'check' }, 'What you see for ', { grad: 'every match' }]],
      blocks: [
        {
          type: 'list',
          style: 'check',
          items: [
            '**The listing:** the role from LinkedIn, Indeed or Dice, with a link to it',
            '**A fit score out of 100:** how well the role fits your resume',
            '**The reasoning:** why the score landed where it did',
            '**The skills you are missing:** what the job asks for that your resume does not show',
            '**The recruiter contact, when it is public:** so you know who to write to',
          ],
        },
        {
          type: 'p',
          text: 'From there, the next step is yours. Add the missing skills you really have, or draft a [job application email](/features/job-application-email) for the role and send it yourself. JobHunter never applies to a job for you.',
        },
      ],
    },
  ],
  faqs: {
    h2: [['AI job match ', { mark: 'FAQs' }]],
    items: [
      {
        q: 'Which job boards does AI job match search?',
        a: 'AI job match searches LinkedIn, Indeed and Dice in a single search. Each role comes back ranked by how well it fits your resume, with the recruiter contact when it is public. The job boards are third-party services, and their own terms and privacy policies apply when you use them.',
      },
      {
        q: 'How are jobs ranked by fit?',
        a: 'JobHunter reads the skills, experience and level in your resume, and each job is ranked by how well it fits. You see a score out of 100, the reasoning behind it and the skills you are missing, so you can decide which roles deserve your time first.',
      },
      {
        q: 'Does it show the recruiter contact?',
        a: 'Yes, when the recruiter contact for a role is public, JobHunter shows it with the job. You decide whether to use it. If you want to reach out, JobHunter can draft a short application email for that role and recruiter, which you edit and send yourself.',
      },
      {
        q: 'Does JobHunter apply to the jobs for me?',
        a: 'No. JobHunter never applies to jobs or sends emails without you. It finds matching roles, scores your resume and drafts the email, and you decide which jobs to apply for, edit the email and send it yourself. Every application stays your decision.',
      },
    ],
  },
  cta: {
    h2: [['One search, ', { grad: 'every role ranked by fit', swoosh: true }]],
    text: 'Close the extra tabs. Upload your resume once and see which roles are worth your time.',
    secondary: { label: 'Watch the 47-second demo', href: '/#demo' },
  },
  related: [
    {
      href: '/features/resume-job-match',
      title: 'Resume Job Match',
      text: 'Go deeper on one role: the score, the reasoning and what to fix first.',
    },
    {
      href: '/features/job-application-email',
      title: 'Application Email Writer',
      text: 'Get a short, role-specific email draft that you edit and send yourself.',
    },
    {
      href: '/blog/applied-to-jobs-no-response',
      title: 'Applied to Jobs and Heard Nothing Back?',
      text: 'A fix list for when applications go out and nothing comes back.',
    },
  ],
};

export default page;
