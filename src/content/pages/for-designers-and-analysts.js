const page = {
  slug: 'for-designers-and-analysts',
  path: '/for-designers-and-analysts',
  kind: 'audience',
  label: 'For Designers and Analysts',
  seo: {
    title: 'Job Search for Designers and Analysts | JobHunter',
    description:
      'Job search for designers and analysts: see your match score and missing skills for each role, keep a resume per direction and practice your walkthrough.',
  },
  hero: {
    eyebrow: 'Designers & analysts',
    tagline: 'Score your resume against each design or analyst job, see the missing tools and practice talking through your work.',
    h1: [
      ['Job Search for'],
      [{ mark: 'Designers and Analysts' }, ':'],
      ['See Your Match Score'],
      [{ chip: 'target' }, { grad: 'Before You Apply', swoosh: true }],
    ],
    compact: true,
    lead: 'A job search for designers and analysts runs on details: the tools, methods and kind of work each posting names. JobHunter by SuperMIA scores your resume against a specific job before you apply, lists the skills you are missing, keeps a resume version for each direction and lets you practice talking through your work out loud.',
    points: [
      'A match score out of 100 for each job',
      'Missing skills listed with the reasoning',
      'Resume versions for design, research or data',
    ],
    visual: 'ats',
  },
  sections: [
    {
      id: 'same-title-different-job',
      eyebrow: 'The problem',
      h2: [['Same Title, ', { mark: 'Different Job' }], ['in Every Posting']],
      intro:
        'Design and analytics titles cover very different work. One product designer role is mostly research, another mostly visual systems. One data analyst lives in dashboards, another writes SQL and runs experiments.',
      blocks: [
        {
          type: 'cards',
          columns: 3,
          items: [
            {
              title: 'One title, many jobs',
              text: 'UX designer, product designer and UX researcher overlap. So do data analyst, BI analyst and data scientist.',
              icon: 'layers',
            },
            {
              title: 'Tool lists that run long',
              text: 'Postings name specific tools and methods. At a glance, it is hard to tell which ones your resume already shows and which ones it skips.',
              icon: 'search',
            },
            {
              title: 'Strong work, wrong framing',
              text: 'A resume built for a research role can read thin for a UI role. Sending the same resume everywhere hides your best work.',
              icon: 'doc',
            },
          ],
        },
        {
          type: 'p',
          text: 'The answer is not more applications. It is fewer, better ones, sent where your resume already shows most of what the job asks for.',
        },
      ],
    },
    {
      id: 'match-score-first',
      eyebrow: 'Match score',
      h2: [['Job Search for Designers and Analysts:'], ['Check the ', { grad: 'Match Score First', swoosh: true }]],
      intro:
        'Before you spend an evening tailoring a resume, check how it reads against the job. In a UX designer job search or a data analyst job search, that one check tells you whether the role deserves the effort.',
      blocks: [
        {
          type: 'p',
          text: 'Start with one search across LinkedIn, Indeed and Dice. [JobHunter](/) ranks each role by how well it fits your resume; here is how [AI job match](/ai-job-match) does it. Pick a role and the [resume match score](/resume-job-match) gives you an ATS match score for that specific job, out of 100, with the reasoning, the skills you are missing and what to fix first.',
        },
        {
          type: 'p',
          text: 'When a posting names tools and methods, the missing skills list tells you which ones your resume leaves out. Read each one before you change anything:',
        },
        {
          type: 'table',
          head: ['If a missing skill is', 'It often means', 'What to do'],
          rows: [
            ['A tool you have used but never listed', 'A wording gap', 'Add it, with the project where you used it'],
            ['A method you use, like usability testing or A/B testing', 'Results shown, method missing', 'Name the method next to the project'],
            ['A skill you do not have yet', 'A real gap for this role', 'Skip the role for now, or plan to learn it'],
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'A guide, not a verdict',
          text: 'The score is a guide to where to focus, not a prediction of a hiring decision. Only add skills you can talk about in an interview. For a full method, see how to [match your resume to a job description](/blog/match-resume-to-job-description).',
        },
      ],
    },
    {
      id: 'resume-versions',
      eyebrow: 'Resumes',
      h2: [['A Resume Version for'], [{ mark: 'Every Direction' }, ' You Want']],
      intro:
        'You might apply for product design and UX research roles in the same month, or split your time between analytics and data science. Each direction asks for a different story.',
      blocks: [
        {
          type: 'p',
          text: 'Upload one or more resume versions for different roles. JobHunter reads the skills, experience and level in each one, so you keep a few focused versions instead of rewriting one file for every application.',
        },
        {
          type: 'table',
          head: ['Version', 'Lead with', 'Use it for'],
          rows: [
            ['Product or UI design', 'Shipped work and design systems', 'Product designer and UI roles'],
            ['UX research', 'Methods and what changed because of them', 'Researcher and research-heavy UX roles'],
            ['Analytics', 'SQL, dashboards and the decisions they informed', 'Data analyst and BI roles'],
            ['Data science', 'Modeling, experiments and statistics', 'Data scientist and advanced analytics roles'],
          ],
        },
        {
          type: 'p',
          text: 'When the version and the role line up, JobHunter drafts a short application email from your resume, written for that job and that recruiter. You edit it, add your portfolio link if you have one, and send it yourself. See the [job application email writer](/job-application-email).',
        },
      ],
    },
    {
      id: 'talk-through-your-work',
      eyebrow: 'Practice',
      visual: 'voice',
      h2: [[{ chip: 'mic', eq: true }, 'Practice How You'], [{ grad: 'Talk Through Your Work', swoosh: true }]],
      intro:
        'Design and analytics interviews often ask you to walk through your work: a portfolio piece, a study, a dashboard or an analysis. You have to explain it clearly, out loud, while someone keeps asking why.',
      blocks: [
        {
          type: 'p',
          text: 'JobHunter does not review your portfolio or dashboards. It gives you practice at the talking part. The [AI mock interview](/ai-mock-interview) is a live voice interview set to your level, your resume and the job you picked, with follow-up questions: the part that catches people off guard.',
        },
        {
          type: 'p',
          text: 'For a product designer interview or an analyst interview, two rounds deserve extra reps. Role & Knowledge rounds usually test the skills and tools in the job description. Practical & Behavioral rounds usually ask how you worked with stakeholders and teammates. Prepare for prompts like these:',
        },
        {
          type: 'questions',
          items: [
            {
              q: 'Walk me through one project from start to finish.',
              hint: 'Tests structure and ownership. Cover the problem, your part, the key decision and the result.',
            },
            {
              q: 'Why did you choose that design, or that metric?',
              hint: 'Tests reasoning. Name the option you ruled out and what made you decide.',
            },
            {
              q: 'Tell me about a time a stakeholder pushed back on your work.',
              hint: 'Tests collaboration. Show how you listened, what evidence you used and how it ended.',
            },
            {
              q: 'What would you change if you did it again?',
              hint: 'Tests judgment. Pick one real limitation and say what you learned from it.',
            },
          ],
        },
        {
          type: 'p',
          text: 'Start in guided practice, where the AI interviewer gives you hints, then switch to the strict real simulation. Each scorecard gives an overall readiness score from 0 to 10, rates clarity, confidence and technical depth, and lists your strengths, gaps and topics to practice next. For more prompts grouped by round, browse these [mock interview questions](/interview-questions).',
        },
      ],
    },
  ],
  faqs: {
    h2: [['Designer and Analyst ', { grad: 'FAQs' }]],
    items: [
      {
        q: 'Does JobHunter work for design and analyst roles?',
        a: 'Yes. JobHunter is built for designers and analysts as well as engineers, new grads, career switchers and people returning to work. It searches LinkedIn, Indeed and Dice in one go, scores your resume for the specific job you pick and lists the skills you are missing, so you see your fit before you apply.',
      },
      {
        q: 'Does JobHunter review my portfolio or dashboards?',
        a: 'No. JobHunter works from your resume and the job you pick, not from your portfolio, case studies or dashboards. What it does help with is the talking part: you can practice walking through your work out loud in a mock interview, with follow-up questions and a scorecard at the end.',
      },
      {
        q: 'How do I practice for a product designer or data analyst interview?',
        a: 'Pick two or three projects and practice explaining each one out loud: the problem, your part, the key decision and the result. Then run a mock interview for the job you want, starting in guided practice, and answer the follow-up questions as you would on a real call. Review your scorecard and go again.',
      },
    ],
  },
  cta: {
    h2: [['See the Fit First,'], ['Then ', { grad: 'Practice the Walkthrough', swoosh: true }]],
    text: 'Check your match score for each role, then practice explaining your work before an interviewer asks why. Nothing is applied or sent without you.',
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
      text: 'A repeatable method for tailoring each resume version.',
    },
  ],
};

export default page;
