import { JobsMock, AtsMock, MailMock, VoiceMock, ReportMock } from '@/components/mocks';

const MOCKS = { jobs: JobsMock, ats: AtsMock, mail: MailMock, voice: VoiceMock, report: ReportMock };

const CAPTIONS = {
  jobs: 'One search across LinkedIn, Indeed and Dice',
  ats: 'Match score out of 100 for one job',
  mail: 'An email draft you edit and send',
  voice: 'Live voice mock interview',
  report: 'Scorecard after every session',
};

/**
 * A product mock (drawn in code, sample data) on the brand's dark gradient card, with a caption.
 * Decorative illustration: the facts it shows are also stated in the page copy.
 */
export default function MockFrame({ name, className = '', caption = true, tone = 'light' }) {
  const dark = tone === 'dark';
  const Mock = MOCKS[name];
  if (!Mock) return null;
  return (
    <figure className={`relative ${className}`}>
      <div aria-hidden="true" className="absolute -inset-6 rounded-[48px] bg-[radial-gradient(closest-side,rgba(155,127,212,0.38),transparent)]" />
      <div className={`relative overflow-hidden rounded-[30px] p-4 ring-1 sm:p-8 ${dark ? 'bg-white/[0.05] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)] ring-white/12' : 'bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 shadow-[0_50px_100px_-40px_rgba(26,15,51,0.8)] ring-white/10'}`}>
        <div aria-hidden="true" className="absolute inset-0 opacity-40" style={{ background: 'radial-gradient(circle at 80% 10%, rgba(244,180,0,0.5), transparent 55%)' }} />
        <div className="relative mx-auto w-full max-w-[500px]">
          <Mock />
        </div>
      </div>
      {caption && (
        <figcaption className={`mt-4 flex items-center justify-center gap-2 text-[13px] font-semibold ${dark ? 'text-white/50' : 'text-ink-900/55'}`}>
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold-500" />
          {CAPTIONS[name]} · sample data
        </figcaption>
      )}
    </figure>
  );
}
