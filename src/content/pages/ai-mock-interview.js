const page = {
  slug: 'ai-mock-interview',
  path: '/ai-mock-interview',
  kind: 'feature',
  label: 'AI Mock Interview',
  seo: {
    title: 'AI Mock Interview With Live Follow-Ups | JobHunter',
    description:
      'Practice four real interview rounds out loud with an AI interviewer that asks follow-ups, then get a 0-10 readiness score and a list of what to fix next.',
  },
  hero: {
    eyebrow: 'Interview practice',
    tagline: 'Practice a live voice AI mock interview set to your resume and the job, with follow-up questions and a scorecard after every round.',
    h1: [
      ['AI Mock Interview: ', { mark: 'Practice Out Loud,' }],
      ['Get Scored, ', { chip: 'mic', eq: true }, ' ', { grad: 'Fix What Matters', swoosh: true }],
    ],
    lead:
      'An AI mock interview lets you answer the real round out loud before it counts. JobHunter by SuperMIA runs a voice mock interview set to your level, your resume and the job. It asks the kind of follow-up questions a real panel asks, then scores how you answered and shows you what to fix next.',
    points: [
      'Four rounds, from HR & Introduction to Final',
      'Guided practice with hints, or a strict simulation',
      'A 0 to 10 readiness score after every session',
    ],
    visual: 'voice',
  },
  sections: [
    {
      id: 'what-it-is',
      eyebrow: 'The basics',
      h2: [['What an ', { mark: 'AI mock interview' }, ' is']],
      intro:
        'Most people prepare for interviews in their head. Then the first follow-up question lands and the answer falls apart. An AI mock interview closes that gap: you speak your answers, an AI interviewer asks what comes next, and you get feedback while there is still time to act on it.',
      blocks: [
        {
          type: 'table',
          head: ['', 'Rehearsing alone', 'A JobHunter mock interview'],
          rows: [
            ['How you answer', 'In your head, or in written notes', 'Out loud, in a live voice session'],
            ['Follow-up questions', 'None, unless a friend thinks of one', 'Asked the way a real panel would, set to your level, resume and the job'],
            ['Feedback', 'A feeling that it went fine', 'A readiness score, your strengths, your gaps and topics to practice next'],
            ['Pressure', 'Low, so it feels easier than it is', 'Your choice: hints in guided practice, or a strict real simulation'],
          ],
        },
        {
          type: 'p',
          text: 'This is mock interview AI that works from your own material, not a generic question list. You answer the way you will on the day: out loud, in full sentences, without a script. It is one part of [JobHunter](/), which also finds roles, scores your resume and drafts the application email.',
        },
      ],
    },
    {
      id: 'how-it-works',
      eyebrow: 'How it works',
      h2: [['How ', { grad: 'AI interview practice', swoosh: true }], ['works in four steps']],
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: 'Upload your resume',
              text: 'JobHunter reads your skills, experience and level, so the interview starts at the right level.',
            },
            {
              title: 'Pick the job and the round',
              text: 'Choose the role you are preparing for and one of four rounds, from HR & Introduction to Managerial & Final.',
            },
            {
              title: 'Choose a mode and answer out loud',
              text: 'Pick guided practice for hints or the strict real simulation. The AI interviewer asks, listens and follows up.',
            },
            {
              title: 'Read your scorecard',
              text: 'See your readiness score from 0 to 10, your scores for clarity, confidence and technical depth, and the topics to practice next.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Your mind went blank on the follow-up?',
          text: 'That is the moment worth rehearsing. A practice interview with AI puts you there without the stakes. Not sure which jobs to rehearse for yet? Check your [resume match score](/resume-job-match) for a role first, then practice for the ones that fit.',
        },
      ],
    },
    {
      id: 'rounds',
      eyebrow: 'Four rounds',
      h2: [['The ', { mark: 'four interview rounds' }], ['you can rehearse']],
      intro:
        'Hiring usually happens in stages, and each stage tests something different. Here is what each kind of round typically covers.',
      blocks: [
        {
          type: 'cards',
          columns: 2,
          items: [
            {
              title: 'HR & Introduction',
              text: 'Usually the first screen. Expect questions about your background and why you want this role. "Tell me about yourself" lives here, and often salary too.',
              icon: 'chat',
            },
            {
              title: 'Role & Knowledge',
              text: 'These rounds usually test the skills and tools in the job description. Expect to explain how you would do the work, not just that you have done it.',
              icon: 'book',
            },
            {
              title: 'Practical & Behavioral',
              text: 'Often hands-on problems plus questions about past situations: a conflict, a deadline, a mistake. Interviewers want a specific story with a clear result.',
              icon: 'target',
            },
            {
              title: 'Managerial & Final',
              text: 'Typically with a hiring manager or senior leader, about how you work with others and how you would fit the team.',
              icon: 'briefcase',
            },
          ],
        },
        {
          type: 'p',
          text: 'A vague behavioral story feels fine in your head and falls flat out loud. For a method, read our guide to [behavioral interview practice](/blog/behavioral-interview-practice). To see the kinds of questions each round tends to bring, browse our [mock interview questions by round and role](/interview-questions).',
        },
      ],
    },
    {
      id: 'modes',
      eyebrow: 'Two modes',
      h2: [[{ chip: 'compass' }, 'Guided practice vs ', { grad: 'real simulation' }]],
      intro:
        'Talking to an AI feels awkward at first. That is normal, and it is why there are two modes.',
      blocks: [
        {
          type: 'table',
          head: ['', 'Guided practice', 'Real simulation'],
          rows: [
            ['What happens', 'The AI interviewer gives you hints', 'A strict run of the round you picked'],
            ['Best for', 'Learning a round and building confidence', 'Testing yourself when you are ready'],
            ['When to use it', 'Early on, or when a round is new to you', 'In the run-up to the real interview'],
          ],
        },
        {
          type: 'p',
          text: 'A simple plan: start each new round in guided practice. Both modes end with a scorecard. Once the hints feel unnecessary, switch to real simulation and see whether your readiness score holds up without them.',
        },
      ],
    },
    {
      id: 'scorecard',
      eyebrow: 'Scorecard',
      h2: [['Your interview ', { mark: 'scorecard' }]],
      intro:
        'Every session ends with a scorecard, so you know what to work on instead of guessing. The headline number is your interview readiness score, from 0 to 10.',
      visual: 'report',
      blocks: [
        {
          type: 'list',
          style: 'check',
          items: [
            '**Overall readiness:** a score from 0 to 10 for the session as a whole',
            '**Clarity:** how clearly your answers came across',
            '**Confidence:** how confidently you answered',
            '**Technical depth:** how far your answers went into the substance of the role',
            '**Strengths:** what worked, so you keep doing it',
            '**Gaps:** where your answers fell short',
            '**Topics to practice next:** your short list for the next session',
          ],
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Treat it as a practice plan',
          text: 'Pick one gap, practice the round again and compare. The score measures this practice session. It is not a prediction of how a real interviewer will decide.',
        },
      ],
    },
    {
      id: 'who-its-for',
      eyebrow: 'Who it is for',
      h2: [['Who should practice with ', { grad: 'an AI interviewer', swoosh: true }]],
      blocks: [
        {
          type: 'list',
          style: 'check',
          items: [
            '[New grads](/for-new-grads) without much interview experience, who want to hear the questions before a panel does',
            '[Career switchers](/for-career-switchers) who need to explain, briefly and out loud, how their skills carry over',
            '[Software engineers](/for-software-engineers) preparing for role and knowledge rounds',
            'Designers and analysts who want to practice talking through their work clearly',
            'People returning to work who want to rebuild interview confidence',
          ],
        },
        {
          type: 'p',
          text: 'If "tell me about yourself" always trips you up, start there. Mock interview practice works because the opener gets easier every time you say it out loud.',
        },
      ],
    },
    {
      id: 'privacy',
      eyebrow: 'Privacy',
      h2: [[{ chip: 'shield' }, 'Your ', { mark: 'recordings' }, ' and privacy']],
      intro: 'Mock interviews are spoken, so they create recordings. Here is what happens to them, in plain terms.',
      blocks: [
        {
          type: 'list',
          style: 'dot',
          items: [
            '**What is kept:** the audio of your answers, transcripts, the hints shown, your scores and feedback.',
            '**Why:** to run the service, give you feedback and improve the product. The AI and speech providers that perform the service process it too.',
            '**If you delete your account:** your personal information is deleted or anonymized within a reasonable period, except anything that must be kept to meet legal obligations, resolve disputes or enforce agreements.',
          ],
        },
        {
          type: 'p',
          text: 'The full details are in the [privacy policy](/privacy-policy).',
        },
      ],
    },
  ],
  faqs: {
    h2: [[{ mark: 'AI mock interview' }, ' FAQs']],
    items: [
      {
        q: 'How does an AI mock interview work?',
        a: 'You upload your resume, pick the job and one of four rounds, and choose guided practice or real simulation. Then you answer out loud. The AI interviewer asks follow-up questions based on your level, your resume and the job, and the session ends with a scorecard and a readiness score from 0 to 10.',
      },
      {
        q: 'Is practicing with an AI interviewer as good as a real mock interview?',
        a: 'It is a different kind of practice, and it works well alongside a human mock. A person who knows your field can give feedback no tool can. An AI interviewer lets you rehearse a round out loud without booking anyone, with follow-up questions set to the job and a scorecard after each session.',
      },
      {
        q: 'What is the difference between guided practice and real simulation?',
        a: 'Guided practice gives you hints, which helps when a round is new or answering out loud feels awkward at first. Real simulation is the strict mode, closer to the real interview, for when you want to test yourself. Either way, each session ends with a scorecard and a readiness score from 0 to 10.',
      },
      {
        q: 'Which interview rounds can I practice?',
        a: 'You can practice four rounds: HR & Introduction, Role & Knowledge, Practical & Behavioral, and Managerial & Final. Pick the one that matches your next conversation, choose guided practice or real simulation, and answer out loud. The interview is set to your level, your resume and the job you are going for.',
      },
      {
        q: 'What does the interview scorecard measure?',
        a: 'After each session you get an overall readiness score from 0 to 10, plus scores for clarity, confidence and technical depth. The scorecard also lists your strengths, your gaps and the topics to practice next, so you know what to work on before you run the round again.',
      },
      {
        q: 'Are my interview answers recorded?',
        a: 'Yes. The privacy policy lists the audio of your answers, the transcripts, the hints shown, your scores and feedback among the data used to run the service, give you feedback and improve the product. If you delete your account, that data is deleted or anonymized within a reasonable period, apart from anything that must be kept for legal reasons.',
      },
    ],
  },
  cta: {
    h2: [['Hear the follow-up ', { grad: 'questions first', swoosh: true }]],
    text: 'Your next interview will ask follow-up questions. Upload your resume, pick a round and practice it out loud before the real one.',
    secondary: { label: 'Watch the 47-second demo', href: '/#demo' },
  },
  related: [
    {
      href: '/interview-questions',
      title: 'Mock Interview Questions by Round and Role',
      text: 'See the kinds of questions each round tends to bring, then rehearse them out loud.',
    },
    {
      href: '/blog/how-to-practice-for-an-interview',
      title: 'How to Practice for an Interview Out Loud',
      text: 'A practical routine for rehearsing answers, even when you practice alone.',
    },
    {
      href: '/resume-job-match',
      title: 'Resume Job Match',
      text: 'Check how well your resume fits a job before you spend time preparing for it.',
    },
  ],
};

export default page;
