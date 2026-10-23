const page = {
  slug: 'for-career-switchers',
  path: '/for-career-switchers',
  kind: 'audience',
  label: 'For Career Switchers',
  seo: {
    title: 'Career Change Job Search With AI | JobHunter',
    description:
      'Changing careers? See how your resume fits roles in a new field, find the skills to add, and rehearse the questions about why you are switching.',
  },
  hero: {
    eyebrow: 'Career switchers',
    tagline: 'See how your skills carry over to a new field, find the gaps for each job and practice the "why are you switching" answer.',
    h1: [
      ['Changing Careers?'],
      ['Find Roles That ', { mark: 'Fit Your Skills' }],
      ['and ', { grad: 'Practice the Switch', swoosh: true }],
    ],
    lead: 'A career change job search comes down to one worry: will a new kind of employer see what you bring? JobHunter by SuperMIA shows how your resume fits roles in a new field, lists the skills you are missing for each job, and lets you rehearse the "why are you switching" answer out loud.',
    points: [
      'Missing skills listed for every job you score',
      'Several resume versions, one per direction',
      'Four interview rounds to rehearse out loud',
    ],
    visual: 'ats',
  },
  sections: [
    {
      id: 'where-switchers-get-stuck',
      eyebrow: 'The problem',
      h2: [['Where a ', { mark: 'Career Change Job Search' }], ['Gets Stuck']],
      intro:
        'You have real work experience behind you. It was just written for a different kind of employer. Switchers tend to stall in three places.',
      blocks: [
        {
          type: 'cards',
          columns: 3,
          items: [
            {
              title: 'Your resume speaks the old language',
              text: 'Titles and jargon from your last field tell a new hiring team very little. Strong work can read as unrelated.',
              icon: 'doc',
            },
            {
              title: 'You cannot tell which gaps matter',
              text: 'Some missing skills take a short course. Others take much longer. From the outside, every listing looks equally out of reach.',
              icon: 'search',
            },
            {
              title: 'The "why" question lands hard',
              text: 'Interviewers will ask why you are leaving your field. A vague answer makes the switch sound like an escape instead of a plan.',
              icon: 'chat',
            },
          ],
        },
        {
          type: 'p',
          text: 'The usual workaround, sending the same resume everywhere, makes all three worse. You collect rejection emails with no feedback and no idea what is not landing.',
        },
      ],
    },
    {
      id: 'skills-match',
      eyebrow: 'Skills',
      h2: [['See How Your ', { grad: 'Skills Match', swoosh: true }], ['a New Field']],
      intro:
        'Your transferable skills are real, but a hiring team only notices them when your resume names them in the new field\'s terms. A good transferable skills resume translates what you did into the words the new role uses.',
      blocks: [
        {
          type: 'p',
          text: 'Pick a job and the [resume match score](/resume-job-match) rates your resume against it out of 100, as an ATS match score for that specific job. You see the reasoning, the skills you are missing and what to fix first. That shows which of your skills already carry over and which gaps to close before you apply. It is a guide to where to focus, not a prediction of a hiring decision.',
        },
        {
          type: 'steps',
          items: [
            {
              title: 'Sort the gaps',
              text: 'For each missing skill, ask: do I have this under another name, can I learn it soon, or is it a real gap for now?',
            },
            {
              title: 'Rename what you already have',
              text: 'Training new staff may be called onboarding or enablement in the new field. Use their word when it honestly describes your work.',
            },
            {
              title: 'Back each skill with proof',
              text: 'Add one line of evidence for every transferable skill: what you did and what changed because of it.',
            },
            {
              title: 'Carry it to the next job',
              text: 'What you fix for one listing usually helps with the next one in the same field.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Only add skills you really have',
          text: 'The missing skills list is a to-do list, not a script. Add a skill when you can talk about it in an interview, because the follow-up questions will test it. For a full method, see how to [match your resume to a job description](/blog/match-resume-to-job-description).',
        },
      ],
    },
    {
      id: 'resume-versions',
      eyebrow: 'Resumes',
      h2: [['Keep a ', { mark: 'Career Change Resume' }], ['for Each Direction']],
      intro:
        'Many switchers test more than one path at once. You might be weighing operations and product roles, or keeping a fallback in your current field. One resume cannot speak to all of them.',
      blocks: [
        {
          type: 'p',
          text: '[JobHunter](/) lets you upload one or more resume versions for different roles. It reads the skills, experience and level in each one, so a version for the new field can sit next to the one for the field you know. If you have ever thought "I can\'t keep tailoring a resume for every application", this is the middle ground: a few focused versions instead of one per job.',
        },
        {
          type: 'table',
          head: ['Version', 'Lead with', 'Use it for'],
          rows: [
            ['Current field', 'Your title and results in the work you know', 'Roles close to what you do now'],
            ['New field', 'Transferable skills, in the new field\'s words', 'The roles you are switching into'],
            ['Bridge role', 'The overlap between both fields', 'Hybrid roles that value both backgrounds'],
          ],
        },
      ],
    },
    {
      id: 'why-switching',
      eyebrow: 'Interview',
      visual: 'voice',
      h2: [[{ chip: 'mic' }, 'Rehearse the Question'], ['About ', { grad: 'Why You Are Switching', swoosh: true }]],
      intro:
        'Career change interview questions circle one theme: why now, why this field, why you. The answer sounds easy in your head. Out loud, with a follow-up coming, it is easy to ramble or apologize for your past.',
      blocks: [
        {
          type: 'p',
          text: 'A strong answer usually has three parts:',
        },
        {
          type: 'list',
          style: 'number',
          items: [
            'What you did before, stated with pride, not apology.',
            'The moment or pattern that pointed you to the new field.',
            'Why this role, and what you are already doing to close the gaps.',
          ],
        },
        {
          type: 'example',
          label: 'Example',
          meta: 'A "why are you switching" answer (fictional details)',
          lines: [
            'In my six years in hospital administration, I kept volunteering for the scheduling and reporting projects nobody else wanted.',
            'Rebuilding our shift planning process is when I realized operations analysis is the work I want to do full time.',
            'That is why the Operations Analyst role at Northwind Labs stood out: it is the same kind of problem, with a team that solves it every day.',
            'I have been closing the gaps with a data course and by taking over more of our department reporting.',
          ],
        },
        {
          type: 'p',
          text: 'Rehearse it in an [AI mock interview](/ai-mock-interview). The live voice interview is set to your level, your resume and the job, and the AI interviewer asks follow-up questions, so you practice the second answer, not just the first. Start with the HR & Introduction round, where the why question usually comes up. Then try Role & Knowledge, which typically tests the skills and tools in the job description, right where the gaps show.',
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Felt awkward practicing out loud at first?',
          text: 'Begin in guided practice, where the AI interviewer gives you hints. Switch to the strict real simulation when you are ready. Each scorecard shows a readiness score from 0 to 10, your strengths, your gaps and the topics to practice next.',
        },
      ],
    },
  ],
  faqs: {
    h2: [['Career Switcher ', { grad: 'FAQs' }]],
    items: [
      {
        q: 'Can JobHunter help me change careers?',
        a: 'Yes, with the practical side of a career change. JobHunter searches LinkedIn, Indeed and Dice in one go, scores your resume for each job and lists the skills you are missing. You can keep separate resume versions and rehearse the interview out loud. You still decide where to apply and what to send.',
      },
      {
        q: 'How do I show transferable skills to a new field?',
        a: 'Name each transferable skill in the words the new field uses, then back it with one concrete example of what you did and what changed. Check the match score for a specific job to see which skills already read as relevant and which are missing, then practice explaining them out loud.',
      },
      {
        q: 'Can I keep a separate resume for the new field?',
        a: 'Yes. You can upload more than one version of your resume, for example one for your current field and one for the field you are moving into. JobHunter reads the skills, experience and level in each version, so you can keep every version focused on a single direction.',
      },
    ],
  },
  cta: {
    h2: [['Show What Carries Over,'], ['Then ', { grad: 'Practice the Why', swoosh: true }]],
    text: 'Upload your resume once, see which skills carry over for each role, and rehearse your switching story before an interviewer hears it. You approve every step.',
    secondary: { label: 'Watch the 47-second demo', href: '/#demo' },
  },
  related: [
    {
      href: '/resume-job-match',
      title: 'Resume Job Match',
      text: 'How the match score, reasoning and missing skills list work.',
    },
    {
      href: '/ai-mock-interview',
      title: 'AI Mock Interview',
      text: 'Practice all four rounds out loud, guided or strict.',
    },
    {
      href: '/blog/match-resume-to-job-description',
      title: 'Match Your Resume to a Job Description',
      text: 'A step-by-step method you can repeat for each application.',
    },
  ],
};

export default page;
