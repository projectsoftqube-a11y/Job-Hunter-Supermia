const page = {
  slug: 'interview-questions',
  path: '/interview-questions',
  kind: 'resource',
  label: 'Interview Questions',
  seo: {
    title: 'Mock Interview Questions by Round and Role | JobHunter',
    description:
      'Common interview questions grouped by HR, role and knowledge, behavioral and final rounds, with a way to practice each one out loud with an AI interviewer.',
  },
  hero: {
    eyebrow: 'Interview questions',
    tagline: 'Common mock interview questions for four rounds and by role, each with what the interviewer is checking and the follow-up to expect.',
    h1: [
      ['Mock Interview ', { mark: 'Questions' }],
      ['by ', { grad: 'Round and Role', swoosh: true }, { chip: 'mic', eq: true }],
    ],
    lead:
      'These mock interview questions are the ones candidates hear again and again, grouped by four common interview rounds and by role. Every round question comes with a hint on what the interviewer is checking and the follow-up to expect. Read them, then practice interview questions out loud, because an answer that sounds fine in your head often falls apart on the follow-up.',
    points: [
      'Grouped by four interview rounds',
      'Each round question has a hint and a follow-up',
      'Typical questions for six roles and career paths',
    ],
    visual: 'voice',
  },
  sections: [
    {
      id: 'hr-introduction',
      eyebrow: 'HR & Introduction',
      h2: [[{ chip: 'chat' }, 'HR and ', { mark: 'Introduction' }, ' Questions']],
      intro:
        'HR and introduction rounds usually check the basics: who you are, why you want this job, whether your expectations fit and how clearly you communicate. These HR interview questions sound simple, which is why people under-prepare them. If "tell me about yourself" always trips you up, start here.',
      blocks: [
        {
          type: 'questions',
          items: [
            {
              q: 'Tell me about yourself.',
              hint: 'They want a short, relevant summary: what you do now, one result you are proud of and why this job is the next step. Likely follow-up: "Why are you looking for a new role right now?"',
            },
            {
              q: 'Walk me through your resume.',
              hint: 'This checks whether your experience tells a clear story, so focus on the parts that match the job description. Likely follow-up: "Why did you move from that role to the next one?"',
            },
            {
              q: 'Why do you want to work here?',
              hint: 'This tests whether you did your homework: name something specific about the company or team and connect it to your goals. Likely follow-up: "What do you know about our competitors?"',
            },
            {
              q: 'Why are you interested in this role?',
              hint: 'They want to see that you understand the job itself, so link a few responsibilities from the posting to your experience. Likely follow-up: "Which part of the role would be new to you?"',
            },
            {
              q: 'Why are you leaving your current job?',
              hint: 'This checks your motivation and how you talk about past employers: stay positive and focus on what you are moving toward. Likely follow-up: "What would make you stay?"',
            },
            {
              q: 'What are your salary expectations?',
              hint: 'They are checking whether your expectations fit the budget, so research the typical range for the role and location and give a range, not a single number. Likely follow-up: "Is that range flexible?"',
            },
            {
              q: 'What are your greatest strengths?',
              hint: 'Choose strengths the job actually needs and back each with a short story. Likely follow-up: "Can you give me an example of that?"',
            },
            {
              q: 'What is a weakness you are working on?',
              hint: 'This tests self-awareness: name a real but manageable weakness and what you are doing about it. Likely follow-up: "How do you know it is improving?"',
            },
            {
              q: 'Where do you see yourself in five years?',
              hint: 'They want to know whether this role fits your direction, so describe the skills you want to build on the path this job offers. Likely follow-up: "How does this role help you get there?"',
            },
          ],
        },
      ],
    },
    {
      id: 'role-knowledge',
      eyebrow: 'Role & Knowledge',
      h2: [['Role and ', { grad: 'Knowledge', swoosh: true }, ' Questions']],
      intro:
        'Role and knowledge rounds usually test the skills and tools in the job description and how deeply you understand them. Expect to explain concepts, compare options and connect your past work to their needs. Before this round, reread the posting and list the skills it names more than once.',
      blocks: [
        {
          type: 'questions',
          items: [
            {
              q: 'Which skills from this job description are you strongest in?',
              hint: 'They want you to map your experience to their needs, with a concrete example for each skill. Likely follow-up: "How would you rate yourself on the others?"',
            },
            {
              q: 'Walk me through a project where you used one of the main tools in this role.',
              hint: 'This checks hands-on experience: explain the problem, the choices you made and the result. Likely follow-up: "What would you do differently next time?"',
            },
            {
              q: 'How would you explain a core concept in your field to someone outside your team?',
              hint: 'This checks understanding and communication, so use plain words and one example. Likely follow-up: a deeper question on the same topic to find where your knowledge ends.',
            },
            {
              q: 'How do you decide between two approaches to the same problem?',
              hint: 'This tests judgment: name the factors you weigh, such as time, cost, quality and risk, and use a real decision. Likely follow-up: "What did you give up by choosing that option?"',
            },
            {
              q: 'What tools and methods do you use day to day, and why those?',
              hint: 'They want to see that your choices are deliberate, including one limitation of each tool. Likely follow-up: "Have you used the tools we use?"',
            },
            {
              q: 'How do you check the quality of your own work?',
              hint: 'This checks whether you catch problems before others do: describe your real review steps and a mistake you caught early. Likely follow-up: "What slipped through anyway?"',
            },
            {
              q: 'Which skill in this job description are you still building?',
              hint: 'This tests honesty about gaps: name one real gap and what you are doing to close it. Likely follow-up: "How quickly could you get up to speed?"',
            },
            {
              q: 'What do you know about our product, customers or industry?',
              hint: 'They want evidence you can apply your skills to their context, so share what your research found and one idea it raised. Likely follow-up: "What would you change first?"',
            },
          ],
        },
      ],
    },
    {
      id: 'practical-behavioral',
      eyebrow: 'Practical & Behavioral',
      h2: [['Practical and ', { mark: 'Behavioral' }], ['Questions', { chip: 'users' }]],
      intro:
        'Practical and behavioral rounds look at how you actually work: how you solve a problem in front of someone, and how you handled real situations in the past. Behavioral interview questions usually start with "Tell me about a time". Answer with one real example in a clear order: the situation, the task, what you did and the result (often called the STAR method). For a full walkthrough, read the [behavioral interview practice guide](/blog/behavioral-interview-practice).',
      blocks: [
        {
          type: 'questions',
          items: [
            {
              q: 'Tell me about a time you disagreed with a teammate.',
              hint: 'This checks how you handle conflict: show that you listened, made your case with evidence and reached an outcome. Likely follow-up: "Looking back, who was right?"',
            },
            {
              q: 'Tell me about a time you made a mistake.',
              hint: 'This tests ownership: own a real mistake plainly and spend most of the answer on the fix. Likely follow-up: "What do you do differently now?"',
            },
            {
              q: 'Describe a time you had to meet a tight deadline.',
              hint: 'This shows how you prioritize under pressure: what you cut, what you protected and how you kept people informed. Likely follow-up: "What would you have done if you could not make it?"',
            },
            {
              q: 'Tell me about a time you had to learn something new quickly.',
              hint: 'This checks how you learn, so describe your approach step by step and what you delivered with the new skill. Likely follow-up: "How would you learn our tools?"',
            },
            {
              q: 'Give an example of how you handled a difficult stakeholder or customer.',
              hint: 'They want patience and problem solving, so focus on how you understood the concern and what you did about it. Likely follow-up: "How is that relationship now?"',
            },
            {
              q: 'Tell me about a time you took the lead without being asked.',
              hint: 'This tests initiative: show what you noticed, why you acted and the result. Likely follow-up: "How did the rest of the team react?"',
            },
            {
              q: 'Describe a time you received critical feedback.',
              hint: 'This checks whether you are coachable: show that you listened, made a specific change and can point to the improvement. Likely follow-up: "How do you give feedback to others?"',
            },
            {
              q: 'Here is a problem we faced recently. How would you approach it?',
              hint: 'This practical question tests how you think, not whether you know the perfect answer, so ask clarifying questions and think out loud. Likely follow-up: "What if we had half the time?"',
            },
          ],
        },
      ],
    },
    {
      id: 'managerial-final',
      eyebrow: 'Managerial & Final',
      h2: [['Managerial and ', { grad: 'Final Round' }, ' Questions', { chip: 'briefcase' }]],
      intro:
        'Managerial and final rounds are often with the hiring manager or a senior leader. They test team fit, decision making, ownership and whether you understand what the job really needs. Expect more open conversation, and bring your own questions: this round is also your chance to judge the team.',
      blocks: [
        {
          type: 'questions',
          items: [
            {
              q: 'What would you focus on in your first few months in this role?',
              hint: 'This shows whether you can plan: talk about learning first, then early contributions tied to the team\'s goals. Likely follow-up: "How would you know it is working?"',
            },
            {
              q: 'How do you like to be managed?',
              hint: 'This checks fit with the manager\'s style: be honest about what helps you, such as clear goals or regular check-ins, and show you can adapt. Likely follow-up: "Tell me about a manager you found hard to work with."',
            },
            {
              q: 'How do you make a decision when you do not have all the information?',
              hint: 'This tests judgment under uncertainty: explain how you gather what you can, decide and adjust, with one real example. Likely follow-up: "When did that go wrong?"',
            },
            {
              q: 'Tell me about a time you had to deliver bad news.',
              hint: 'This tests honesty and communication: show that you raised it early, came with options and stayed calm. Likely follow-up: "What happened next?"',
            },
            {
              q: 'What kind of team helps you do your best work?',
              hint: 'This is a culture and fit question, so describe how you like to collaborate and connect it to what you know about this team. Likely follow-up: "How do you handle a team that works differently?"',
            },
            {
              q: 'What does success in this role look like to you?',
              hint: 'They want to see whether your idea of success matches theirs, so tie it to the outcomes in the job description. Likely follow-up: "How would you measure that?"',
            },
            {
              q: 'Why should we hire you?',
              hint: 'This is your closing argument: summarize the strengths that match the job most closely, with one example. Likely follow-up: "What concerns do you think we might have?"',
            },
            {
              q: 'Do you have any questions for us?',
              hint: 'They are checking interest and preparation, so ask about the team, early challenges or how success is measured. Likely follow-up: they may turn your question back to you and ask how you would handle it.',
            },
          ],
        },
      ],
    },
    {
      id: 'by-role',
      eyebrow: 'By role',
      h2: [['Interview Questions ', { mark: 'by Role' }]],
      intro:
        'The rounds stay much the same across jobs, but the questions change with the work. Here are typical questions for six common roles and career paths. Use them alongside the round lists above.',
      blocks: [
        {
          type: 'cards',
          columns: 3,
          items: [
            {
              title: 'Software engineer',
              icon: 'layers',
              text: 'Walk me through a system you designed or built end to end. How do you debug a problem you cannot reproduce? Tell me about a trade-off you made between speed and quality.',
            },
            {
              title: 'Data analyst',
              icon: 'search',
              text: 'How do you check that a dataset is clean before you analyze it? Tell me about an analysis that changed a decision. Which metric would you track for this product, and why?',
            },
            {
              title: 'Product or UX designer',
              icon: 'spark',
              text: 'Walk me through a project in your portfolio from problem to final design. Tell me about a time user feedback changed your design. How do you handle pushback from engineers or stakeholders?',
            },
            {
              title: 'New grad or entry level',
              icon: 'book',
              text: 'Tell me about a class, internship or personal project you are proud of. What did you learn from your most recent internship or job? Why do you want to start your career in this field?',
            },
            {
              title: 'Career switcher',
              icon: 'compass',
              text: 'Why are you changing careers now? Which skills from your previous field carry over to this role? What have you done to learn the new field?',
            },
            {
              title: 'Returning to work',
              icon: 'clock',
              text: 'Can you tell me about the gap in your resume? What did you do to keep your skills current while you were away? What makes now the right time to return?',
            },
          ],
        },
        {
          type: 'p',
          text: 'Preparing for a specific path? See how JobHunter helps [new grads looking for a first role](/for-new-grads), [career switchers](/for-career-switchers) and [software engineers](/for-software-engineers).',
        },
      ],
    },
    {
      id: 'practice-out-loud',
      eyebrow: 'Practice',
      h2: [
        ['Practice These ', { mark: 'Mock Interview Questions' }],
        [{ grad: 'Out Loud', swoosh: true }, { chip: 'mic', eq: true }],
      ],
      intro:
        'A list stops you guessing what they will ask, but it does not prepare you to answer. Rehearse only in your head and your mind can go blank on the follow-up. Saying your answers out loud closes that gap.',
      visual: 'report',
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: 'Say every answer out loud',
              text: 'Speak as if the interviewer were in the room. You will hear the rambling and the missing example that silent rehearsal hides.',
            },
            {
              title: 'Time yourself',
              text: 'Use a timer. If an answer runs long, cut the background and get to what you did and the result sooner.',
            },
            {
              title: 'Expect the follow-up',
              text: 'Each hint above names a likely follow-up. After every answer, ask yourself the next question and answer that too.',
            },
            {
              title: 'Review and repeat',
              text: 'Note which answers felt weak, rework them and run the round again until they sound natural, not memorized.',
            },
          ],
        },
        {
          type: 'p',
          text: 'Practicing alone has one problem: nobody asks the follow-up. An [AI mock interview in JobHunter](/ai-mock-interview) does. You pick one of four rounds (HR & Introduction, Role & Knowledge, Practical & Behavioral, or Managerial & Final) and answer out loud in a live voice session. The AI interviewer asks follow-up questions based on your level, your resume and the job.',
        },
        {
          type: 'list',
          style: 'check',
          items: [
            '**Guided practice** gives you hints, which helps if you felt awkward practicing out loud at first.',
            '**Real simulation** is the strict mode, closer to the real interview, for when you want to test yourself.',
            'After each session you get an overall readiness score from 0 to 10, scores for clarity, confidence and technical depth, your strengths, your gaps and the topics to practice next.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'This page is a study list',
          text: 'These are common examples to study. Your practice session is tuned to your level, your resume and the job you choose, so expect its own questions, not this exact list. Upload your resume once in [JobHunter](/) and the job search, match score, application email and mock interview all work from it.',
        },
      ],
    },
  ],
  faqs: {
    h2: [['Interview Prep ', { grad: 'FAQs', swoosh: true }]],
    items: [
      {
        q: 'What are the most common interview questions?',
        a: 'The most common interview questions include "Tell me about yourself", "Why do you want to work here?", "What are your strengths and weaknesses?", "Tell me about a time you faced a challenge" and "Do you have any questions for us?" Most interviews also include role-specific questions about the skills in the job description.',
      },
      {
        q: 'How do I practice interview questions out loud?',
        a: 'Pick one round, read each question, then answer it out loud as if the interviewer were in the room. Time yourself, ask yourself the likely follow-up and answer that too. Note which answers felt weak, rework them and repeat the round. Recording yourself or practicing with a friend or an AI interviewer shows what silent rehearsal misses.',
      },
      {
        q: 'How many questions should I prepare?',
        a: 'There is no fixed number. Prepare strong answers to the common questions in each round, then build a small set of real stories you can adapt to many behavioral questions: a conflict, a mistake, a deadline, a win and a time you led. Add the role questions that match the skills named in the job description.',
      },
      {
        q: 'Will a JobHunter mock interview ask these exact questions?',
        a: 'Not necessarily. This page is a general list of common questions to study. A JobHunter mock interview is tuned to your level, your resume and the job you choose, and the AI interviewer asks follow-up questions based on them. So your session has questions of its own, in the round you pick.',
      },
    ],
  },
  cta: {
    h2: [
      ['Hear the ', { mark: 'Follow-Up' }, ' Before'],
      ['Your Interview Does', { chip: 'mic', eq: true }],
    ],
    text: 'Pick a round, answer out loud and get a readiness score with the topics to practice next. Nothing is applied or sent without you.',
    secondary: { label: 'Watch the 47-second demo', href: '/#demo' },
  },
  related: [
    {
      href: '/ai-mock-interview',
      title: 'AI Mock Interview',
      text: 'Rehearse any of the four rounds out loud and get a 0-10 readiness score.',
    },
    {
      href: '/blog/behavioral-interview-practice',
      title: 'Behavioral Interview Practice',
      text: 'Prepare real examples for "Tell me about a time" questions.',
    },
    {
      href: '/blog/how-to-practice-for-an-interview',
      title: 'How to Practice for an Interview',
      text: 'Practical ways to rehearse your answers before the real interview.',
    },
  ],
};

export default page;
