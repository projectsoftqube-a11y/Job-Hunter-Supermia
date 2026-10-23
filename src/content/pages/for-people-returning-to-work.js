const page = {
  slug: 'for-people-returning-to-work',
  path: '/for-people-returning-to-work',
  kind: 'audience',
  label: 'For People Returning to Work',
  seo: {
    title: 'Returning to Work After a Career Break | JobHunter',
    description:
      'Returning to work after a career break? Rebuild interview confidence with guided practice, rehearse your gap answer and see which skills still match roles.',
  },
  hero: {
    eyebrow: 'Returning to work',
    tagline: 'Rebuild your interview confidence at your own pace, rehearse the career-gap question and find roles that fit your skills today.',
    h1: [
      ['Returning to Work'],
      ['After a ', { mark: 'Career Break' }, ':'],
      [{ chip: 'mic', eq: true }, 'Rebuild Your'],
      [{ grad: 'Interview Confidence', swoosh: true }],
    ],
    compact: true,
    lead: 'Returning to work after a career break is often about confidence, not ability. JobHunter by SuperMIA lets you rebuild it at your own pace: practice interviews out loud with hints, rehearse the question about your gap, and see which of your skills still match the roles posted on LinkedIn, Indeed and Dice today.',
    points: [
      'Guided practice with hints, then strict mode',
      'Rehearse the gap question out loud',
      'LinkedIn, Indeed and Dice in one search',
    ],
    visual: 'voice',
  },
  sections: [
    {
      id: 'what-feels-hard',
      eyebrow: 'The problem',
      h2: [['What Makes a ', { mark: 'Job Search After a Career Gap' }], ['Feel Hard']],
      intro:
        'People step away for many reasons: children, caring for a family member, health, study, a move or a long layoff. The skills are still there. What has gone quiet is the habit of talking about them.',
      blocks: [
        {
          type: 'cards',
          columns: 2,
          items: [
            {
              title: 'Interview answers feel rusty',
              text: 'Answers that used to come easily now stall, and a blank moment on the follow-up feels like a real risk.',
              icon: 'chat',
            },
            {
              title: 'The gap question looms',
              text: 'You know someone will ask about the time away, and not having an answer ready makes the whole call feel heavier.',
              icon: 'clock',
            },
            {
              title: 'Postings have moved on',
              text: 'Titles, tools and listed skills may have changed while you were away. It is hard to tell what still fits.',
              icon: 'search',
            },
            {
              title: 'Three tabs open, a hundred listings',
              text: 'Every board shows a different list, and without a way to sort by fit, starting feels bigger than it is.',
              icon: 'layers',
            },
          ],
        },
        {
          type: 'p',
          text: 'None of this means you are less capable. It means you need practice rounds, a clear answer about your break and a view of where your resume fits now.',
        },
      ],
    },
    {
      id: 'guided-practice',
      eyebrow: 'Practice',
      visual: 'report',
      h2: [[{ chip: 'compass' }, 'Rebuild Confidence With'], [{ grad: 'Guided Practice', swoosh: true }, ' First']],
      intro:
        'Interview practice after a career break works best in small, low-pressure steps. The [AI mock interview](/ai-mock-interview) is a live voice interview set to your level, your resume and the job you picked. You answer out loud, and the AI interviewer asks follow-up questions.',
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: 'Start in guided practice',
              text: 'The AI interviewer gives you hints. Lean on them while answering out loud still feels awkward.',
            },
            {
              title: 'Begin with HR & Introduction',
              text: 'Screening calls usually cover who you are and what you have been doing lately, which is where the gap question tends to land.',
            },
            {
              title: 'Read your scorecard',
              text: 'Each session ends with a readiness score from 0 to 10, scores for clarity, confidence and technical depth, your strengths, your gaps and the topics to practice next.',
            },
            {
              title: 'Switch to real simulation',
              text: 'When you stop needing the hints, run the strict mode to see whether the confidence holds.',
            },
          ],
        },
        {
          type: 'p',
          text: 'Role & Knowledge, Practical & Behavioral, and Managerial & Final are there when you are ready. For a weekly routine, read [how to practice for an interview](/blog/how-to-practice-for-an-interview).',
        },
      ],
    },
    {
      id: 'explain-the-gap',
      eyebrow: 'Your gap',
      h2: [['How to Explain a ', { mark: 'Career Gap' }], ['in an Interview']],
      intro:
        'Interviewers usually ask about a gap to learn two things: what happened, and whether you are ready now. A short, honest answer that ends on the present tends to land better than a long defense.',
      blocks: [
        {
          type: 'p',
          text: 'A clear answer has three parts:',
        },
        {
          type: 'list',
          style: 'number',
          items: [
            'What you did, in one or two plain sentences. You do not owe more detail than you want to share.',
            'What you kept up or learned, if anything: a course, volunteering or freelance work.',
            'Why you are coming back now, and why this role in particular.',
          ],
        },
        {
          type: 'example',
          label: 'Example',
          meta: 'A career gap answer (fictional details)',
          lines: [
            'I stepped away for three years to care for a family member. That chapter is settled, and I am ready to be back full time.',
            'I kept my bookkeeping skills current by doing the accounts for a local nonprofit, and I took a refresher course on accounting software.',
            'The Accounts Payable Specialist role at Northwind Labs is close to my work before the break, and I am ready to do it on a team again.',
          ],
        },
        {
          type: 'p',
          text: 'Say it out loud until it sounds settled, not apologetic. The follow-up is the real test. Prepare for questions like these, then browse more [practice interview questions](/interview-questions) by round:',
        },
        {
          type: 'questions',
          items: [
            {
              q: 'Can you walk me through the gap on your resume?',
              hint: 'Tests composure. Give the short version, then move to what you are ready to do now.',
            },
            {
              q: 'How have you kept your skills current?',
              hint: 'Tests readiness. Name one or two specific things, even small ones.',
            },
            {
              q: 'Why are you returning to work now?',
              hint: 'Tests motivation. Keep it about the future: what you want to do next and why this job fits.',
            },
            {
              q: 'Are you comfortable with the tools we use?',
              hint: 'Tests current fit. Be honest about what you know and what you are learning.',
            },
          ],
        },
      ],
    },
    {
      id: 'skills-still-match',
      eyebrow: 'Match score',
      h2: [['Returning to Work After a Career Break:'], ['See Which ', { grad: 'Skills Still Match', swoosh: true }]],
      intro:
        'Your experience did not expire during your break. Some skills carry straight over; others need a refresh or a newer name. Compare your resume with the jobs posted now to find out which.',
      blocks: [
        {
          type: 'p',
          text: 'Upload your resume once and [JobHunter](/) runs one search across LinkedIn, Indeed and Dice, ranking each role by how well it fits. Pick a job and the [resume match score](/resume-job-match) gives you an ATS match score for that specific job, out of 100, with the reasoning, the skills you are missing and what to fix first.',
        },
        {
          type: 'list',
          style: 'check',
          items: [
            'Read the reasoning to see what carries over, then make those skills easy to spot.',
            'Treat each missing skill as a question: do you have it under an older name, can you refresh it soon, or is it a real gap for now?',
            'Keep a second resume version if you are open to a related role that uses your experience in a new way.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'What the score is for',
          text: 'The match score is a guide to where to focus, not a prediction of a hiring decision. When you find a role worth applying for, JobHunter drafts a short [application email](/job-application-email) for it, which you edit and send yourself. It never applies or sends anything without you.',
        },
      ],
    },
  ],
  faqs: {
    h2: [['Returning to Work ', { mark: 'FAQs' }]],
    items: [
      {
        q: 'Can JobHunter help me return to work after a career break?',
        a: 'Yes, with the practical parts. JobHunter searches LinkedIn, Indeed and Dice in one go, scores your resume for each job and lists the skills you are missing. You can practice interviews out loud with hints in guided practice, including your answer about the gap. It helps you prepare; it does not promise an offer.',
      },
      {
        q: 'How do I explain a career gap in an interview?',
        a: 'Keep it short and honest. Say what you did in one or two sentences, mention anything you kept up or learned, then explain why you are ready to return now and why this role fits. You do not owe more detail than you want to share. Practice it out loud until it sounds settled.',
      },
      {
        q: 'Can I practice interviews before I apply anywhere?',
        a: 'Yes. Pick a role you are interested in and run a mock interview for it, starting in guided practice so the AI interviewer gives you hints. Each session ends with a readiness score from 0 to 10 and the topics to practice next, so you can build confidence before a real call.',
      },
    ],
  },
  cta: {
    h2: [['Your Return Starts With'], [{ grad: 'One Practice Round', swoosh: true }]],
    text: 'Practice with hints until your answers feel steady, then see which roles fit you now. You approve every step.',
    secondary: { label: 'Watch the 47-second demo', href: '/#demo' },
  },
  related: [
    {
      href: '/ai-mock-interview',
      title: 'AI Mock Interview',
      text: 'The four rounds, both practice modes and the scorecard in detail.',
    },
    {
      href: '/resume-job-match',
      title: 'Resume Job Match',
      text: 'See how your resume reads against a specific job today.',
    },
    {
      href: '/blog/how-to-practice-for-an-interview',
      title: 'How to Practice for an Interview',
      text: 'A step-by-step routine to rebuild your interview habits.',
    },
  ],
};

export default page;
