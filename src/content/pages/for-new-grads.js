const page = {
  slug: 'for-new-grads',
  path: '/for-new-grads',
  kind: 'audience',
  label: 'For New Grads',
  seo: {
    title: 'AI Job Search for New Grads | JobHunter',
    description:
      'New grad job search, made simpler: see how your resume fits each role, send a note for every application and practice your first interviews out loud.',
  },
  hero: {
    eyebrow: 'New grads',
    tagline: 'Find your first role on LinkedIn, Indeed and Dice, see how your resume fits each job and rehearse your first interviews out loud.',
    h1: [
      ['AI Job Search for ', { mark: 'New Grads' }, ':'],
      ['Find Your First Role ', { chip: 'mic', eq: true }],
      ['and ', { grad: 'Practice the Interview', swoosh: true }],
    ],
    compact: true,
    lead: 'A job search for new grads usually starts with a short resume and almost no interview practice. JobHunter by SuperMIA searches LinkedIn, Indeed and Dice in one go, shows how your resume fits each role, and lets you rehearse your first interviews out loud, with hints, until the answers feel natural.',
    points: [
      'LinkedIn, Indeed and Dice in one search',
      'A match score out of 100 for each job',
      'Guided practice mode with hints',
    ],
    visual: 'jobs',
  },
  sections: [
    {
      id: 'why-it-feels-harder',
      eyebrow: 'The problem',
      h2: [['Why the ', { mark: 'Job Search for New Grads' }], ['Feels Harder']],
      intro:
        'You finished the degree, the projects and maybe an internship. Then every listing seems to want experience you do not have yet, and the applications go out with no reply.',
      blocks: [
        {
          type: 'cards',
          columns: 2,
          items: [
            {
              title: 'Entry roles still ask for experience',
              text: 'Plenty of postings labeled entry level list prior experience anyway. It is hard to tell a real stretch from a role worth trying.',
              icon: 'briefcase',
            },
            {
              title: 'Three tabs open, a hundred listings',
              text: 'Every board shows a different list. Without a way to sort them by fit, you either apply everywhere or freeze.',
              icon: 'search',
            },
            {
              title: 'One resume for everything',
              text: 'Sending the same resume everywhere is the easy option. It also brings rejection emails with no feedback and no idea what you are doing wrong.',
              icon: 'doc',
            },
            {
              title: 'No interview reps yet',
              text: 'Class presentations are not interviews. If "tell me about yourself" always trips you up, that is normal before you have sat in front of a real panel.',
              icon: 'chat',
            },
          ],
        },
        {
          type: 'p',
          text: 'Some new grad job search tips help before you open any app:',
        },
        {
          type: 'list',
          style: 'check',
          items: [
            'Send fewer, better applications instead of one resume to every listing.',
            'Count everything real: internships, class projects, campus jobs, volunteering and part-time work all show skills.',
            'Use the words from the job description where they honestly describe what you did.',
            'Practice your answers out loud. Saying them is a different skill from thinking them.',
          ],
        },
      ],
    },
    {
      id: 'entry-roles',
      eyebrow: 'Find roles',
      h2: [['Entry Level Job Search:'], ['Find Roles That ', { grad: 'Fit Your Resume', swoosh: true }]],
      intro:
        'Upload your resume once. [JobHunter](/) reads your skills, experience and level, then runs one search across LinkedIn, Indeed and Dice. Each role comes back ranked by how well it fits your resume, with the recruiter contact when it is public. Here is how [AI job match](/ai-job-match) ranks the results.',
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: 'Upload your resume',
              text: 'Add one or more versions. Your skills, experience and level are read for you from each one.',
            },
            {
              title: 'Search three boards at once',
              text: 'One search covers LinkedIn, Indeed and Dice, so you stop switching between tabs.',
            },
            {
              title: 'Check the match score',
              text: 'Pick a job and see an ATS match score for that specific job, out of 100, with the reasoning, the skills you are missing and what to fix first.',
            },
            {
              title: 'Spend your effort where it counts',
              text: 'Apply where the fit is real. Add a missing skill to your resume only if you actually have it.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Little experience? The score still helps.',
          text: 'The [resume match score](/resume-job-match) compares what your resume shows with what the job asks for, so list your projects, internships and coursework clearly. The reasoning behind each score shows which skills you can already show, not just the ones you are missing. It is a guide to where to focus, not a prediction of a hiring decision.',
        },
      ],
    },
    {
      id: 'first-interview',
      eyebrow: 'Practice',
      visual: 'voice',
      h2: [[{ chip: 'mic', eq: true }, 'Practice Your ', { mark: 'First Interview' }], ['With Hints']],
      intro:
        'First job interview practice works best out loud. JobHunter runs a live voice mock interview set to your level, your resume and the job you picked. The AI interviewer asks follow-up questions, the part that is hardest to rehearse alone.',
      blocks: [
        {
          type: 'cards',
          columns: 2,
          items: [
            {
              title: 'Guided practice',
              text: 'The AI interviewer gives you hints. Start here while answering out loud still feels awkward.',
              icon: 'compass',
            },
            {
              title: 'Real simulation',
              text: 'A strict run of the round you picked. Switch to it when you want to test yourself.',
              icon: 'target',
            },
          ],
        },
        {
          type: 'p',
          text: 'Choose one of four rounds: HR & Introduction, Role & Knowledge, Practical & Behavioral, or Managerial & Final. HR & Introduction is a sensible first pick, since early screening calls usually cover who you are and why you want the role. Prepare a short answer for each of these common questions:',
        },
        {
          type: 'questions',
          items: [
            {
              q: 'Tell me about yourself.',
              hint: 'Tests whether you can give a short, focused summary. Try present, past, future: what you do now, what led you here, why this role.',
            },
            {
              q: 'Why do you want this job?',
              hint: 'Tests whether you read the posting. Name one or two details about the role and connect them to something you have done.',
            },
            {
              q: 'Tell me about a time you worked on a team.',
              hint: 'Tests how you work with others. A class project or part-time job counts. Describe your part, the problem and the result.',
            },
            {
              q: 'What do you expect for salary?',
              hint: 'Tests whether you have done your homework. Look up a typical range for the role and location before the call, and say it calmly.',
            },
          ],
        },
        {
          type: 'p',
          text: 'After each session your scorecard shows an overall readiness score from 0 to 10, scores for clarity, confidence and technical depth, your strengths, your gaps and the topics to practice next. Try an [AI mock interview](/ai-mock-interview) for the job you want most, and for a weekly routine read [how to practice for an interview](/blog/how-to-practice-for-an-interview).',
        },
      ],
    },
    {
      id: 'application-note',
      eyebrow: 'Apply',
      h2: [['Apply With a ', { grad: 'Note Written', swoosh: true }], ['for the Role']],
      intro:
        'A short, specific note tells a recruiter you read the posting. That counts for more when your resume is still short.',
      blocks: [
        {
          type: 'p',
          text: 'For each role, JobHunter drafts a short application email from your resume, written for that job and that recruiter. You copy it, edit it so it sounds like you, and send it yourself. It never applies or sends anything without you. See how the [job application email writer](/job-application-email) works.',
        },
        {
          type: 'list',
          style: 'check',
          items: [
            'Name the role and one detail from the posting.',
            'Point to one project, internship or class experience that fits.',
            'Keep it short enough to read on a phone.',
          ],
        },
      ],
    },
  ],
  faqs: {
    h2: [['New Grad ', { mark: 'FAQs' }]],
    items: [
      {
        q: 'Can JobHunter help me find my first job?',
        a: 'Yes. JobHunter searches LinkedIn, Indeed and Dice in one go and ranks each role by how well it fits your resume. It shows a match score with the skills you are missing, drafts an application email you send yourself, and lets you practice the interview out loud. It helps you prepare; it does not promise an offer.',
      },
      {
        q: 'I have little work experience. Will the match score still work?',
        a: 'Yes. The match score compares the skills and experience on your resume with what a specific job asks for, so list your projects, internships and coursework clearly. The reasoning shows which skills you can already show and which are missing. Treat it as a guide to where to focus, not a prediction of a hiring decision.',
      },
      {
        q: 'How do I practice for my first interview?',
        a: 'Practice out loud, not in your head. Pick the round you are preparing for, start in guided practice so the AI interviewer gives you hints, and answer the follow-up questions as you would on the real call. Then review your scorecard, work on the gaps and try the strict real simulation.',
      },
    ],
  },
  cta: {
    h2: [['Your First Role Starts With'], [{ grad: 'One Search', swoosh: true }, ' and One Practice Round']],
    text: 'Upload your resume once, see how it fits each role, and rehearse your first interview with hints before the real one. It never applies or sends anything without you.',
    secondary: { label: 'Watch the 47-second demo', href: '/#demo' },
  },
  related: [
    {
      href: '/ai-job-match',
      title: 'AI Job Match',
      text: 'How one search across three job boards ranks roles by fit.',
    },
    {
      href: '/ai-mock-interview',
      title: 'AI Mock Interview',
      text: 'The four rounds, both practice modes and the scorecard in detail.',
    },
    {
      href: '/blog/how-to-practice-for-an-interview',
      title: 'How to Practice for an Interview',
      text: 'A practice routine you can start before your first screening call.',
    },
  ],
};

export default page;
