/**
 * /faq content (FAQ v3, fact-checked 22 Oct 2026). The only page with FAQPage markup: the JSON-LD is
 * built from these exact strings, so the visible answers and the schema always match word for word.
 */

export const FAQ_PAGE = {
  path: '/faq',
  seo: {
    title: 'JobHunter FAQ: How It Works, Privacy and More',
    description: 'JobHunter FAQ: which job boards it searches, how the match score and mock interviews work, what it never does and what happens to your data.',
  },
  h1: [
    [{ mark: 'JobHunter FAQ:' }, ' Job Search,'],
    ['Resume Match, ', { chip: 'chat' }, ' Mock Interviews ', { grad: 'and Privacy', swoosh: true }],
  ],
  tagline: 'Straight answers about how JobHunter works, what it never does and what happens to your data.',
  lead: 'JobHunter is an AI job search and interview practice app built by SuperMIA and operated by Botfinity Inc. Here are straight answers about how it works, what it never does and what happens to your data. It never applies or sends anything without you.',
  groups: [
    {
      id: 'about',
      title: 'About JobHunter',
      icon: 'spark',
      intro: 'The basics: what JobHunter is, who makes it and how to start. For job search and interview advice, read the [JobHunter blog](/blog).',
      items: [
        { q: 'What is JobHunter?', a: 'JobHunter is an AI job search and interview practice app from SuperMIA. It searches LinkedIn, Indeed and Dice in one go, scores your resume for each job and drafts the application email. It also runs live voice mock interviews with a scorecard, and you approve every step.' },
        { q: 'Is Job Hunter the same as JobHunter from SuperMIA?', a: 'Yes. Job Hunter, Job Hunter AI and JobHunter are the same app, built by SuperMIA and operated by Botfinity Inc. in Grapevine, Texas. You sign in at app.jobhunter.supermia.ai.' },
        { q: 'Is JobHunter legit, and who makes it?', a: 'Yes, there is a real company behind it. JobHunter is built by SuperMIA (supermia.ai) and operated by Botfinity Inc., the company named in its terms and privacy policy, at 2451 W Grapevine Mills Cir #547, Grapevine, Texas. You can reach the team at hello@supermia.ai.' },
        { q: 'Who is JobHunter for?', a: 'JobHunter is built for new grads, career switchers, engineers, designers, analysts and people returning to work. The match score, application email and mock interview work from your own resume and the job you choose.' },
        { q: 'Can I see how it works before I sign up?', a: 'Yes. Watch the 47-second product demo on the JobHunter homepage, or download the 8-page brochure (PDF), which walks through how it works. Neither needs a sign-up.' },
        { q: 'How do I get started?', a: 'Sign up at app.jobhunter.supermia.ai and upload your resume once. JobHunter reads your skills, experience and level, then uses them for the job search, the match score, the application email and the mock interview.' },
        { q: 'How old do I need to be to use JobHunter?', a: 'You need to be at least 16 years old to use JobHunter, as set out in the terms and conditions.' },
      ],
    },
    {
      id: 'job-search',
      title: 'Job search',
      icon: 'search',
      intro: 'JobHunter searches three job boards at once and ranks every role by how well it fits your resume. Here is how [AI job match](/features/ai-job-match) works.',
      items: [
        { q: 'Which job boards does JobHunter search?', a: 'JobHunter searches LinkedIn, Indeed and Dice in a single search. Each role comes back ranked by how well it fits your resume, with the recruiter contact when it is public. The job boards are third-party services, and their own terms and privacy policies apply when you use them.' },
        { q: 'How are jobs ranked?', a: 'Each job is ranked by how well it fits your resume. You see a score out of 100, the reasoning behind it and the skills you are missing, so you can decide which roles deserve your time first.' },
        { q: 'Does JobHunter apply to jobs for me?', a: 'No. JobHunter never applies to jobs or sends emails without you. It finds matching roles, scores your resume and drafts the email, and you decide which jobs to apply for, edit the email and send it yourself.' },
        { q: "Does JobHunter show the recruiter's contact?", a: 'Yes, when the recruiter contact for a role is public, JobHunter shows it with the job. You decide whether to use it for your application email.' },
        { q: 'Who runs the job boards JobHunter searches?', a: 'LinkedIn, Indeed and Dice are third-party services. Botfinity Inc. does not control them, their job listings or the employers that post on them, and their own terms and privacy policies apply when you use them.' },
      ],
    },
    {
      id: 'resume-match',
      title: 'Resume match score',
      icon: 'target',
      intro: 'The match score compares your resume with one specific job. Read more about the [resume match score](/features/resume-job-match).',
      items: [
        { q: 'How does the resume match score work?', a: 'Pick a job and JobHunter scores your resume against it out of 100. It explains the reasoning, lists the skills you are missing and shows what to fix first.' },
        { q: 'Is the match score the same as an ATS score?', a: "It is an ATS match score for one specific job. It shows how your resume reads against that job description, with the reasoning and the skills you are missing, so you can judge it yourself. Use it to decide where to focus. It does not predict how an employer's own system will rank you or whether you will be hired." },
        { q: 'Can I use more than one resume?', a: 'Yes. You can upload more than one version of your resume, for example one for engineering roles and one for product roles. JobHunter reads the skills, experience and level in each version.' },
      ],
    },
    {
      id: 'application-emails',
      title: 'Application emails',
      icon: 'mail',
      intro: 'Each draft is written for one role and its recruiter, and you send it yourself. See the [job application email writer](/features/job-application-email).',
      items: [
        { q: 'Does JobHunter send the application email for me?', a: 'No. JobHunter drafts a short, specific email for the role and the recruiter, written from your resume. You copy it, edit it if you want, and send it yourself.' },
        { q: 'What goes into the application email?', a: 'The draft is written from your resume for the role you picked, so it is specific to that job rather than a generic cover note. AI drafts can miss things, so check it and change any line before you send it.' },
      ],
    },
    {
      id: 'mock-interviews',
      title: 'AI mock interviews',
      icon: 'mic',
      intro: 'The mock interview is a spoken practice round with follow-up questions and a scorecard. Try an [AI mock interview](/features/ai-mock-interview).',
      items: [
        { q: 'How does the AI mock interview work?', a: 'You pick one of four rounds: HR & Introduction, Role & Knowledge, Practical & Behavioral, or Managerial & Final. Then you answer out loud. The AI interviewer asks follow-up questions based on your level, your resume and the job, and gives you a readiness score with the topics to practice next.' },
        { q: 'Which interview rounds can I practice?', a: 'You can practice four rounds: HR & Introduction, Role & Knowledge, Practical & Behavioral, and Managerial & Final. Pick the round you are preparing for and answer out loud.' },
        { q: 'What is the difference between guided practice and real simulation?', a: 'Guided practice gives you hints, which helps if answering out loud feels awkward at first. Real simulation is the strict mode, closer to the real interview, for when you want to test yourself. Either way, each session ends with a scorecard and a readiness score from 0 to 10.' },
        { q: 'What does the interview scorecard show?', a: 'After each session you get an overall readiness score from 0 to 10, scores for clarity, confidence and technical depth, your strengths, your gaps and the topics to practice next.' },
        { q: 'Do I answer out loud or in writing?', a: 'You answer out loud. The mock interview is a live voice session with an AI interviewer, the way you would answer in a real interview.' },
      ],
    },
    {
      id: 'privacy',
      title: 'Privacy and your account',
      icon: 'shield',
      intro: 'The [privacy policy](/privacy-policy) and [terms and conditions](/terms-and-conditions) set out the full details. Here are the short answers.',
      items: [
        { q: 'What happens to my resume and interview recordings?', a: 'Your resume, preferences, mock interview audio and transcripts are used to provide the service, give you feedback and improve the product, and are processed by the AI and speech providers that perform these tasks. If you delete your account, your data is deleted or anonymized within a reasonable period, unless some of it must be kept to meet legal obligations, resolve disputes or enforce agreements.' },
        { q: 'Are my mock interview answers recorded?', a: 'Yes. The privacy policy lists the audio of your mock interview answers, the transcripts, the hints shown and your scores among the data used to run the service and give you feedback.' },
        { q: 'What happens if I delete my account?', a: 'Your personal information is deleted or anonymized within a reasonable period. The exception is anything that must be kept to meet legal obligations, resolve disputes or enforce agreements.' },
      ],
    },
  ],
  cta: {
    h2: [['Start With ', { mark: 'One Search' }], ['and ', { chip: 'mic', eq: true }, ' ', { grad: 'One Practice Round', swoosh: true }]],
    text: 'Upload your resume once, see your match score for each role, and hear the follow-up questions before your interview does.',
    secondary: { label: 'Email the team', href: 'mailto:hello@supermia.ai' },
  },
};
