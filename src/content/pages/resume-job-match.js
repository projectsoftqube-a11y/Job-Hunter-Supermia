const page = {
  slug: 'resume-job-match',
  path: '/features/resume-job-match',
  kind: 'feature',
  label: 'Resume Job Match',
  seo: {
    title: 'Resume Job Match Score Before You Apply | JobHunter',
    description:
      'Check how well your resume fits a specific job. Get a match score out of 100, the skills you are missing and what to fix first, then apply with confidence.',
  },
  hero: {
    eyebrow: 'Resume match',
    tagline: 'Score your resume against one job out of 100, see the missing skills and fix what matters before you apply.',
    h1: [
      ['Resume Job Match:', { chip: 'doc' }],
      ['See Your ', { mark: 'Score' }, ' Before You Apply'],
    ],
    lead:
      'Resume job match shows how well your resume fits one specific job before you apply. JobHunter by SuperMIA gives you a resume match score out of 100, explains the reasoning, lists the skills you are missing and tells you what to fix first. So you stop sending the same resume everywhere and hoping.',
    points: [
      'A match score out of 100 for each job',
      'The reasoning behind every score',
      'Missing skills and what to fix first',
    ],
    visual: 'ats',
  },
  sections: [
    {
      id: 'check-one-job',
      eyebrow: 'Start here',
      h2: [['Check your resume against ', { grad: 'one job description', swoosh: true }]],
      intro:
        'Everyone tells you to tailor your resume. The hard part is knowing what to change for this job, today. A resume job description match does that work one role at a time: it reads your resume against that job and shows where they line up and where they do not.',
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: 'Upload your resume',
              text: 'Add the version you want to use. JobHunter reads your skills, experience and level for you.',
            },
            {
              title: 'Pick a job',
              text: 'Choose the role you are considering. The match is always for that one job, never a general grade for your resume.',
            },
            {
              title: 'Read the score and the reasoning',
              text: 'See your match score out of 100, why it landed there and which skills the job asks for that your resume does not show.',
            },
            {
              title: 'Fix what matters first',
              text: 'Start with the top fix. Add skills you really have but left out, then decide whether the role is worth your application.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: "Can't keep rewriting your resume for every application?",
          text: 'You do not need to start over each time. The score points to the few changes that matter for this job, so your effort goes where it counts. For a method you can use on any posting, read how to [match your resume to a job description](/blog/match-resume-to-job-description).',
        },
      ],
    },
    {
      id: 'match-score',
      eyebrow: 'The score',
      h2: [['What your ', { mark: 'resume match score' }], ['shows']],
      intro:
        'The score is a number out of 100, and on its own the number is the least useful part. What makes it useful is everything that comes with it.',
      blocks: [
        {
          type: 'cards',
          columns: 3,
          items: [
            {
              title: 'A score out of 100',
              text: 'How well your resume fits this one job. Use it to compare roles and decide where to spend your effort.',
              icon: 'target',
            },
            {
              title: 'The reasoning',
              text: 'Why the score landed where it did, so you can judge it yourself instead of trusting a bare number.',
              icon: 'search',
            },
            {
              title: 'What to fix first',
              text: 'The change most worth making for this job, so you start with the edit that matters most.',
              icon: 'check',
            },
          ],
        },
        {
          type: 'p',
          text: 'We describe it as an ATS match score for a specific job. It shows how your resume reads against that job description, so you can see the gaps before a recruiter does. It is part of [JobHunter](/), which also searches LinkedIn, Indeed and Dice in one go and ranks every role by fit.',
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'A guide, not a verdict',
          text: "Your match score is a guide to where to focus, not a prediction of a hiring decision. It does not tell you how an employer's own system will rank you or whether you will get an interview.",
        },
      ],
    },
    {
      id: 'missing-skills',
      eyebrow: 'Missing skills',
      h2: [[{ chip: 'check' }, 'The skills you are missing,'], [{ grad: 'listed for you', swoosh: true }]],
      intro:
        'The list of skills missing from your resume is often the most useful part of the match. The job asks for something, and your resume does not show it. That gap usually falls into one of three cases.',
      blocks: [
        {
          type: 'table',
          head: ['If the missing skill is...', 'What to do'],
          rows: [
            ['Something you have but left out', 'Add it, using the words the job post uses, with a line of proof from your experience'],
            ['Something you have but buried', 'Move it up, into your summary or the first bullets of the most relevant role'],
            ['Something you do not have yet', 'Leave it off. Decide whether the role is still worth it, or note it as a skill to build'],
          ],
        },
        {
          type: 'p',
          text: 'Never add a skill you do not have just to raise a number. The point is to apply with a resume that is honest and complete for the job, so every line holds up when an interviewer asks about it.',
        },
      ],
    },
    {
      id: 'resume-versions',
      eyebrow: 'Versions',
      h2: [['Keep ', { mark: 'several resume versions' }]],
      intro:
        'If you apply for more than one kind of role, one resume will not fit them all. Upload one or more resume versions for different roles, and JobHunter reads the skills, experience and level in each.',
      blocks: [
        {
          type: 'list',
          style: 'check',
          items: [
            'An engineering version and a product version, each leading with the projects that matter for that track',
            'A version for your current field and one that leads with transferable skills, if you are changing careers',
            'A version for design roles and one for analyst roles, if your work spans both',
          ],
        },
        {
          type: 'p',
          text: 'When the match looks strong, the next step is the note that goes with your application. JobHunter drafts a [job application email](/features/job-application-email) for that role from your resume, and you edit it and send it yourself.',
        },
      ],
    },
  ],
  faqs: {
    h2: [['Resume job match ', { grad: 'FAQs' }]],
    items: [
      {
        q: 'How is the resume match score calculated?',
        a: 'JobHunter reads the skills, experience and level in your resume and scores how well they fit the specific job you picked, out of 100. Every score comes with its reasoning and the skills you are missing, so you can see what drove the number and judge it for yourself.',
      },
      {
        q: 'Is this the same as an ATS score?',
        a: "It is an ATS match score for one specific job. It shows how your resume reads against that job description, with the reasoning and the skills you are missing, so you can judge it yourself. Use it to decide where to focus. It does not predict how an employer's own system will rank you or whether you will be hired.",
      },
      {
        q: 'What should I do with the missing skills list?',
        a: 'Sort it into three groups. Add skills you really have but left out, using the job post wording and a line of proof. Move buried skills higher. Leave off anything you do not have, and treat it as a reason to rethink the role or a skill to build. Then make the fix the score shows first.',
      },
      {
        q: 'Can I check one resume against several jobs?',
        a: 'Yes. Each match score is for one specific job, so every role you look at gets its own score, reasoning and list of missing skills. That lets you compare roles and spend your effort where your resume already fits best, instead of sending the same file everywhere and hoping.',
      },
    ],
  },
  cta: {
    h2: [['See your score ', { mark: 'before you apply' }]],
    text: 'Upload your resume once, pick a job and see what to fix first. Fewer, better applications start here.',
    secondary: { label: 'Watch the 47-second demo', href: '/#demo' },
  },
  related: [
    {
      href: '/features/ai-job-match',
      title: 'AI Job Match',
      text: 'Search LinkedIn, Indeed and Dice at once and see every role ranked by fit.',
    },
    {
      href: '/blog/match-resume-to-job-description',
      title: 'How to Match Your Resume to a Job Description',
      text: 'A step-by-step method for tailoring your resume to any posting.',
    },
    {
      href: '/features/ai-mock-interview',
      title: 'AI Mock Interview',
      text: 'Once the resume fits, rehearse the interview out loud and get a readiness score.',
    },
  ],
};

export default page;
