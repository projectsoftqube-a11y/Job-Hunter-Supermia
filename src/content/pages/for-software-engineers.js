const page = {
  slug: 'for-software-engineers',
  path: '/for-software-engineers',
  kind: 'audience',
  label: 'For Software Engineers',
  seo: {
    title: 'AI Job Search for Software Engineers | JobHunter',
    description:
      'Search LinkedIn, Indeed and Dice for engineering roles at once, see your match score per job and practice role and knowledge rounds with an AI interviewer.',
  },
  hero: {
    eyebrow: 'Engineers',
    tagline: 'Search LinkedIn, Indeed and Dice in one go, score your resume for each engineering role and practice the Role & Knowledge round out loud.',
    h1: [
      ['AI Job Search for ', { mark: 'Software Engineers' }, ':'],
      ['LinkedIn, Indeed and Dice'],
      ['in ', { grad: 'One Search', swoosh: true }],
    ],
    lead: 'AI job search for software engineers should include the tech boards, not just the general ones. JobHunter by SuperMIA searches LinkedIn, Indeed and Dice in one go, scores your resume for each engineering role, and lets you practice the Role & Knowledge round out loud, with a technical depth score on your scorecard.',
    points: [
      'Dice included alongside LinkedIn and Indeed',
      'A match score out of 100 for each role',
      'Technical depth scored after every session',
    ],
    visual: 'report',
  },
  sections: [
    {
      id: 'three-boards',
      eyebrow: 'Job boards',
      visual: 'jobs',
      h2: [['AI Job Search for Software Engineers'], ['Across ', { mark: 'Three Boards' }]],
      intro:
        'Engineering roles are spread across general boards and tech-focused ones. Checking each one on its own is how you end up with three tabs open, a hundred listings and no clear sense of which roles fit.',
      blocks: [
        {
          type: 'p',
          text: '[JobHunter](/) runs one search across LinkedIn, Indeed and Dice. Dice tech jobs come back in the same search as LinkedIn and Indeed roles, each ranked by how well it fits your resume. Here is how [AI job match](/features/ai-job-match) ranks them.',
        },
        {
          type: 'cards',
          columns: 3,
          items: [
            {
              title: 'Ranked by fit',
              text: 'Roles are ranked by how well they fit your resume, so the strongest matches are easy to spot.',
              icon: 'target',
            },
            {
              title: 'Recruiter contact',
              text: 'Shown with the job when it is public, so you know who to write to.',
              icon: 'mail',
            },
            {
              title: 'Third-party listings',
              text: 'The boards are third-party services with their own terms. JobHunter shows and links to their listings.',
              icon: 'shield',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Targeting two tracks?',
          text: 'If you are applying for both backend and platform roles, keep a resume version for each. JobHunter reads the skills, experience and level in every version you upload.',
        },
      ],
    },
    {
      id: 'skills-each-role-expects',
      eyebrow: 'Match score',
      h2: [['Software Engineer Job Search:'], ['See Which ', { grad: 'Skills Each Role Expects', swoosh: true }]],
      intro:
        'Two postings with the same title can want very different engineers. One leans on a specific stack, another on scale, another on owning a product area end to end. Reading every description closely takes time you would rather spend preparing.',
      blocks: [
        {
          type: 'p',
          text: 'Pick a role and the [resume match score](/features/resume-job-match) gives you an ATS match score for that specific job, out of 100, with the reasoning, the skills you are missing and what to fix first. Use it to decide which roles deserve a tailored resume and which to skip. It is a guide to where to focus, not a prediction of a hiring decision.',
        },
        {
          type: 'list',
          style: 'check',
          items: [
            'Separate tools from concepts. A missing tool you have used under another name is a wording fix. A missing concept is a study topic.',
            'Put specifics from your own work on the resume: what you built, what you changed and what improved. Specifics read better than adjectives.',
            'Only list skills you can defend. Engineering interviews tend to dig into anything on your resume.',
            'Keep the gaps for interview prep. They are often what the technical round probes first.',
          ],
        },
      ],
    },
    {
      id: 'role-and-knowledge',
      eyebrow: 'Practice',
      h2: [[{ chip: 'mic', eq: true }, 'Practice the ', { mark: 'Role and Knowledge' }, ' Round']],
      intro:
        'A software engineer mock interview is most useful when it feels like the real one. JobHunter runs a live voice interview set to your level, your resume and the job, and the AI interviewer asks follow-up questions. That is where engineering interviews get hard: the second and third question about the same decision.',
      blocks: [
        {
          type: 'p',
          text: 'Role & Knowledge rounds usually test the skills and tools in the job description. In engineering interviews, that often means explaining how something works, why you chose one approach over another and what you would do differently. Prompts like these come up often, so have an answer ready:',
        },
        {
          type: 'questions',
          items: [
            {
              q: 'Walk me through a project you are proud of.',
              hint: 'Tests depth and ownership. Cover the problem, your part, the trade-offs you made and what you would change now.',
            },
            {
              q: 'Why did you choose that approach?',
              hint: 'Tests reasoning, not memory. Name the alternatives you considered and the constraint that decided it.',
            },
            {
              q: 'How would you track down this bug if it showed up in production?',
              hint: 'Tests method under pressure. Talk through how you would narrow it down, step by step, before naming a fix.',
            },
            {
              q: 'What would you do differently with more time?',
              hint: 'Tests judgment and honesty. Pick one real limitation and explain the better design.',
            },
          ],
        },
        {
          type: 'p',
          text: 'The other three rounds are there too: HR & Introduction, Practical & Behavioral, and Managerial & Final. For the behavioral side, read this guide to [behavioral interview practice](/blog/behavioral-interview-practice). Start an [AI mock interview](/features/ai-mock-interview) in guided practice, where the AI interviewer gives you hints, then switch to the strict real simulation when you want a true test.',
        },
      ],
    },
    {
      id: 'technical-depth',
      eyebrow: 'Scorecard',
      h2: [['Your ', { grad: 'Technical Depth', swoosh: true }, ' Score']],
      intro:
        'Getting through an answer is not the same as showing depth. After each session, your scorecard rates them separately.',
      blocks: [
        {
          type: 'cards',
          columns: 2,
          items: [
            {
              title: 'Overall readiness',
              text: 'A score from 0 to 10 for the whole session, so you can see whether you are getting closer.',
              icon: 'target',
            },
            {
              title: 'Technical depth',
              text: 'Scored on its own, apart from clarity and confidence, so a smooth answer and a deep one are not confused.',
              icon: 'layers',
            },
            {
              title: 'Clarity and confidence',
              text: 'How clearly and confidently you came across, which matters when you are explaining a system out loud.',
              icon: 'chat',
            },
            {
              title: 'Strengths, gaps, next topics',
              text: 'What went well, what was thin and the topics to practice next. Treat that last list as your study plan.',
              icon: 'book',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Not generic advice',
          text: 'The interview is set to your resume and the job you picked, so each session reflects your own background and the role in front of you. Work on the topics it flags, run the round again in real simulation and see how the next scorecard reads.',
        },
      ],
    },
  ],
  faqs: {
    h2: [['Software Engineer ', { mark: 'FAQs' }]],
    items: [
      {
        q: 'Does JobHunter search tech job boards?',
        a: 'Yes. JobHunter searches Dice, a job board focused on tech roles, together with LinkedIn and Indeed in a single search. Each role comes back ranked by how well it fits your resume, with the recruiter contact when it is public. Those three are the boards it searches; other job boards are not included.',
      },
      {
        q: 'Can I practice technical interview rounds?',
        a: 'Yes. You can practice the Role & Knowledge round, which in engineering interviews usually tests the skills and tools in the job description. It runs as a live voice interview with follow-up questions, set to your level, your resume and the job. You answer out loud, the way you would explain your work on a real call.',
      },
      {
        q: 'Does the scorecard rate technical depth?',
        a: 'Yes. After each mock interview session, the scorecard includes a technical depth score alongside clarity and confidence, plus an overall readiness score from 0 to 10. It also lists your strengths, your gaps and the topics to practice next, so you know what to study before the real round.',
      },
    ],
  },
  cta: {
    h2: [['Search Three Boards,'], ['Then ', { grad: 'Practice the Round', swoosh: true }]],
    text: 'Upload your resume once, see your match score for each engineering role, and hear the follow-up questions before your interviewer asks them. Nothing is applied or sent without you.',
    secondary: { label: 'Watch the 47-second demo', href: '/#demo' },
  },
  related: [
    {
      href: '/features/ai-job-match',
      title: 'AI Job Match',
      text: 'How one search ranks roles from LinkedIn, Indeed and Dice.',
    },
    {
      href: '/features/ai-mock-interview',
      title: 'AI Mock Interview',
      text: 'All four rounds, both practice modes and the full scorecard.',
    },
    {
      href: '/blog/behavioral-interview-practice',
      title: 'Behavioral Interview Practice',
      text: 'Prepare the Practical & Behavioral side of the loop too.',
    },
  ],
};

export default page;
