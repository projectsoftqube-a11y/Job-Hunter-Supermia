const page = {
  slug: 'job-application-email',
  path: '/features/job-application-email',
  kind: 'feature',
  label: 'Application Email Writer',
  seo: {
    title: 'Job Application Email Writer for Every Role | JobHunter',
    description:
      'Get a short, specific job application email for each role, drafted from your resume and the job post. Edit it, copy it and send it yourself in a minute.',
  },
  hero: {
    eyebrow: 'Application email',
    tagline: 'Draft a short application email for each role from your resume, then edit it and send it yourself.',
    h1: [
      ['Job Application Email Writer:', { chip: 'mail' }],
      ['A Note for Every Role, ', { grad: 'Ready to Send', swoosh: true }],
    ],
    lead:
      'A good job application email is short, specific and written for one role. JobHunter by SuperMIA drafts that note from your resume, for the job and the recruiter you picked. Think of it as an AI email to recruiter draft that you finish: you edit it, copy it and send it yourself.',
    points: [
      'Drafted from your resume for that exact role',
      'Short and specific, not a generic cover note',
      'You edit, copy and send it yourself',
    ],
    visual: 'mail',
  },
  sections: [
    {
      id: 'what-to-include',
      eyebrow: 'The basics',
      h2: [['What a good ', { mark: 'job application email' }], ['includes']],
      intro:
        'Recruiters read a lot of messages. The ones that get read to the end are short and clearly about one role. Here is what a strong application email for a job usually contains.',
      blocks: [
        {
          type: 'list',
          style: 'number',
          items: [
            '**A clear subject line** that names the role, so the recruiter knows what it is before opening it',
            '**One line on why you are writing:** the role you applied for, or want to apply for',
            '**Two or three facts from your resume** that match what the job post asks for',
            '**A short, specific reason** you want this role at this company',
            '**One easy next step,** such as a short call, and a polite sign-off',
          ],
        },
        {
          type: 'p',
          text: 'What to leave out: your whole career story, a pasted copy of your resume and any line that could go to any company. For more on tone and structure, read our guide on [how to email a recruiter](/blog/how-to-email-a-recruiter).',
        },
      ],
    },
    {
      id: 'how-it-drafts',
      eyebrow: 'How it works',
      h2: [['How ', { grad: 'JobHunter', swoosh: true }, ' drafts'], ['your email']],
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: 'Start from your resume',
              text: 'Upload it once. JobHunter reads your skills, experience and level, so the draft draws on what you have actually done.',
            },
            {
              title: 'Pick the role',
              text: 'Choose the job you want to write about. Check your [resume match score](/features/resume-job-match) first, so you only write to roles worth your time.',
            },
            {
              title: 'Get a short draft',
              text: 'JobHunter writes a short, role-specific email for that job and its recruiter. When the recruiter contact is public, it is shown with the job.',
            },
            {
              title: 'Edit, copy and send',
              text: 'Read it, change any line, add a personal detail, then copy it into your own email and send it yourself.',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Why one email per role works better',
          text: 'A note that names the role and points to the right parts of your resume shows you read the job post. A generic note shows the opposite. Writing a new one for every role is the step most people skip, so JobHunter drafts it and you check it.',
        },
      ],
    },
    {
      id: 'example',
      eyebrow: 'Example',
      h2: [['Example: ', { mark: 'a tailored email' }], ['for one role']],
      intro:
        'Here is the kind of short draft JobHunter writes. This one is an email to recruiter Dana Ruiz for a Senior Frontend Engineer role. The candidate, the company and the recruiter are all made up. Notice how each line ties back to the job.',
      blocks: [
        {
          type: 'example',
          label: 'Example draft (fictional)',
          meta: 'Subject: Senior Frontend Engineer role at Northwind Labs',
          lines: [
            'Hi Dana,',
            'I applied for the Senior Frontend Engineer role at Northwind Labs and wanted to introduce myself directly.',
            'Your posting asks for React, TypeScript and design system experience. At Fabrikam, I led the move of our customer dashboard to a shared React component library and wrote the TypeScript guidelines the team still uses.',
            'I would welcome a short call to talk about the role. My resume is attached.',
            'Thanks for your time,',
            'Sam Patel',
          ],
        },
        {
          type: 'list',
          style: 'check',
          items: [
            'It names the role in the subject line and the first sentence',
            'It matches the skills the job post asks for with proof from the resume',
            'It stays short and asks for one simple next step',
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: 'Check every line before you send',
          text: 'AI drafts can miss things. Make sure each fact is true, fix anything that does not sound like you, and add what only you know.',
        },
      ],
    },
    {
      id: 'you-send-it',
      eyebrow: 'You stay in control',
      h2: [[{ chip: 'shield' }, 'You send it, ', { grad: 'not the AI', swoosh: true }]],
      intro:
        'JobHunter never sends anything without you. It drafts the email. You decide whether it goes out, who gets it and what changes first.',
      blocks: [
        {
          type: 'cards',
          columns: 3,
          items: [
            {
              title: 'It drafts',
              text: 'The writer prepares the note for that role and recruiter. It does not send it for you.',
              icon: 'mail',
            },
            {
              title: 'You edit',
              text: 'Change the tone, cut a line, add a detail. The final words are yours.',
              icon: 'doc',
            },
            {
              title: 'You send',
              text: 'Copy the email and send it yourself, when you are ready.',
              icon: 'check',
            },
          ],
        },
        {
          type: 'p',
          text: 'The same rule runs through the whole app: [JobHunter](/) never applies to jobs or sends anything without you. It does the searching, scoring and drafting, and you make every decision.',
        },
      ],
    },
  ],
  faqs: {
    h2: [['Job application email ', { mark: 'FAQs' }]],
    items: [
      {
        q: 'What should a job application email say?',
        a: 'A job application email should name the role, say in one line why you are writing, point to two or three things in your resume that match the job, and ask for one simple next step. Keep it short and specific to that company, with a subject line that names the role.',
      },
      {
        q: 'Does JobHunter send the email for me?',
        a: 'No. JobHunter drafts a short, specific email for the role and the recruiter, written from your resume. You copy it, edit it if you want, and send it yourself. It never applies to jobs or sends anything without you, so nothing goes out until you decide it should.',
      },
      {
        q: 'Where does the recruiter contact come from?',
        a: 'Jobs come from LinkedIn, Indeed and Dice. When the recruiter contact for a role is public, JobHunter shows it with the job, so you can see who to write to. If no contact is public, none is shown, and you decide where your note goes. The job boards are third-party services with their own terms.',
      },
      {
        q: 'Can I edit the email before sending?',
        a: 'Yes, and you should. The draft is a starting point written from your resume for that role. Change any line, adjust the tone, add a personal detail and check that every fact is right. AI drafts can miss things, and you are the one who sends it, so the final version is always yours.',
      },
    ],
  },
  cta: {
    h2: [['A note for ', { grad: 'every role you pick', swoosh: true }]],
    text: 'Upload your resume once, pick a role and get a short draft you can edit and send yourself.',
    secondary: { label: 'Watch the 47-second demo', href: '/#demo' },
  },
  related: [
    {
      href: '/blog/how-to-email-a-recruiter',
      title: 'How to Email a Recruiter About a Job',
      text: 'Short examples you can adapt when you write to a recruiter.',
    },
    {
      href: '/features/resume-job-match',
      title: 'Resume Job Match',
      text: 'See how well your resume fits a role before you write to the recruiter.',
    },
    {
      href: '/features/ai-job-match',
      title: 'AI Job Match',
      text: 'Find roles across LinkedIn, Indeed and Dice, ranked by how well they fit your resume.',
    },
  ],
};

export default page;
