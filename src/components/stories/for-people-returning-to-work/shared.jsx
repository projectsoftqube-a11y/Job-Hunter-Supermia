import CreativeHeading from '@/components/CreativeHeading';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';

/*
 * Shared pieces of "Your restart, inside JobHunter": the four steps of the restart (the chapter pill every
 * section opens with), the section header, the app chrome the product screens share and the sample
 * returner who appears in the mock data. Elena is fictional, shown only inside decorative (aria-hidden)
 * product screens and always labelled as a sample; her details follow the page's own example answer.
 */

export const STEPS = ['Your plan', 'Practice', 'Your gap', 'Your match'];

export const SAMPLE = {
  name: 'Elena R.',
  initial: 'E',
  role: 'Accounts payable',
  target: 'Accounts Payable Specialist',
  company: 'Northwind Labs',
};

export const pick = (s, type, n = 0) => (s.blocks || []).filter((b) => b.type === type)[n];

export const h2Class = 'font-display text-[clamp(2rem,1.2rem+2.4vw,3.9rem)] font-extrabold leading-[1.04] tracking-[-0.035em]';

/** The restart step this section covers: number, the section eyebrow and a four-part progress rail. */
export function StepPill({ n, eyebrow, tone = 'light' }) {
  const dark = tone === 'dark';
  return (
    <p className={`inline-flex max-w-full items-center gap-3 rounded-full py-1.5 pl-1.5 pr-4 text-xs font-bold uppercase tracking-[0.16em] ${dark ? 'bg-white/[0.07] text-gold-300 ring-1 ring-white/10' : 'bg-white text-brand-600 shadow-[0_10px_24px_-18px_rgba(26,15,51,0.6)] ring-1 ring-brand-200'}`}>
      <span aria-hidden="true" className={`flex h-7 min-w-7 items-center justify-center rounded-full px-1.5 font-display text-[12px] font-extrabold tracking-normal ${dark ? 'bg-gold-400 text-ink-950' : 'bg-brand-950 text-gold-400'}`}>
        {String(n).padStart(2, '0')}
      </span>
      <span className="min-w-0">{eyebrow}</span>
      <span aria-hidden="true" className="flex shrink-0 items-center gap-[3px]">
        {STEPS.map((st, i) => (
          <span key={st} className={`h-1.5 rounded-full ${i + 1 === n ? 'w-5' : 'w-1.5'} ${i < n ? (dark ? 'bg-gold-400' : 'bg-gold-500') : dark ? 'bg-white/20' : 'bg-brand-200'}`} />
        ))}
      </span>
    </p>
  );
}

/** Eyebrow pill and H2 on the left, intro on the right (stacked on small screens). */
export function Head({ s, n, tone = 'light', className = '' }) {
  const dark = tone === 'dark';
  return (
    <div data-head className={`grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-12 lg:items-end lg:gap-12 ${className}`}>
      <div className="min-w-0 lg:col-span-7">
        <StepPill n={n} eyebrow={s.eyebrow} tone={tone} />
        <CreativeHeading id={`${s.id}-title`} lines={s.h2} tone={tone} className={`mt-6 ${h2Class} ${dark ? 'text-white' : 'text-ink-950'}`} />
      </div>
      {s.intro && (
        <p data-intro className={`min-w-0 text-lead font-medium lg:col-span-5 lg:pb-2 ${dark ? 'text-brand-100' : 'text-ink-900/70'}`}>
          <Rich text={s.intro} tone={tone} />
        </p>
      )}
    </div>
  );
}

const STEP_LINKS = [
  { href: '#what-feels-hard', icon: 'compass', note: 'What feels hard, and what handles it' },
  { href: '#guided-practice', icon: 'mic', note: 'Out loud, with hints first' },
  { href: '#explain-the-gap', icon: 'chat', note: 'A short, settled answer' },
  { href: '#skills-still-match', icon: 'target', note: 'Which skills carry over' },
];

/** The whole restart in four steps, each a link to its section (opens the page body). */
export function StepRail() {
  return (
    <nav aria-label="Your restart in four steps" className="min-w-0">
      <ol className="grid grid-cols-[minmax(0,1fr)] gap-2 min-[520px]:grid-cols-2">
        {STEPS.map((st, i) => {
          const l = STEP_LINKS[i];
          return (
            <li key={st} className="min-w-0">
              <a href={l.href} className={`group flex h-full items-center gap-3 rounded-[18px] p-2.5 pr-3.5 ring-1 transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${i === 0 ? 'bg-brand-950 text-white ring-brand-950' : 'bg-white text-ink-950 ring-brand-200'}`}>
                <span aria-hidden="true" className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] ${i === 0 ? 'bg-gold-400 text-ink-950' : 'bg-light-lavender text-brand-600'}`}>
                  <Icon name={l.icon} className="h-[18px] w-[18px]" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-[14.5px] font-bold leading-tight">
                    <span className={i === 0 ? 'text-gold-300' : 'text-brand-500'}>{String(i + 1).padStart(2, '0')}</span> {st}
                  </span>
                  <span className={`mt-0.5 block text-[12.5px] font-medium leading-snug ${i === 0 ? 'text-white/70' : 'text-ink-900/60'}`}>{l.note}</span>
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** The JobHunter app mark used in the screen chrome (decorative). */
export function AppMark({ className = 'h-8 w-8' }) {
  return (
    <span className={`flex shrink-0 items-center justify-center rounded-[10px] bg-brand-950 text-gold-400 ${className}`}>
      <Icon name="spark" className="h-[55%] w-[55%]" />
    </span>
  );
}

/** "Sample" tag every mock screen carries. */
export function SampleTag({ tone = 'gold', className = '' }) {
  const tones = {
    gold: 'bg-gold-400 text-ink-950',
    light: 'bg-brand-50 text-brand-700 ring-1 ring-brand-200',
    dark: 'bg-white/10 text-gold-300 ring-1 ring-white/15',
  };
  return <span className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-[11px] font-bold ${tones[tone]} ${className}`}>Sample</span>;
}

/** The sample returner's avatar chip. */
export function Who({ tone = 'light' }) {
  const dark = tone === 'dark';
  return (
    <span className="inline-flex min-w-0 items-center gap-2">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 font-display text-[12px] font-extrabold text-white">{SAMPLE.initial}</span>
      <span className="hidden min-w-0 sm:block">
        <span className={`block text-[12.5px] font-bold leading-tight ${dark ? 'text-white' : 'text-ink-950'}`}>{SAMPLE.name}</span>
        <span className={`block text-[11px] font-medium leading-tight ${dark ? 'text-white/55' : 'text-ink-900/55'}`}>{SAMPLE.role}</span>
      </span>
    </span>
  );
}

const BOARDS = {
  LinkedIn: { letter: 'L', cls: 'rounded-[6px] bg-brand-500 text-white' },
  Indeed: { letter: 'I', cls: 'rounded-full bg-gold-400 text-ink-950' },
  Dice: { letter: 'D', cls: 'rounded-[6px] bg-brand-300 text-brand-950' },
};

/** A job board's one-colour mark with its initial (not the board's own logo). */
export function BoardMark({ board, className = 'h-6 w-6 text-[10px]' }) {
  const b = BOARDS[board];
  return <span className={`flex shrink-0 items-center justify-center font-display font-extrabold leading-none ${b.cls} ${className}`}>{b.letter}</span>;
}

/** Small round status glyph (decorative). */
export function Tick({ kind = 'ok', className = 'h-5 w-5' }) {
  const map = {
    ok: ['bg-emerald-500 text-white', 'M5 12.5l4.5 4.5L19 7.5'],
    old: ['bg-brand-500 text-white', 'M4 12a8 8 0 0 1 14-5.3M20 4v4h-4M20 12a8 8 0 0 1-14 5.3M4 20v-4h4'],
    soon: ['bg-gold-400 text-ink-950', 'M12 7v5l3 2'],
    gap: ['bg-rose-500 text-white', 'M12 7v6M12 17h.01'],
  };
  const [cls, d] = map[kind];
  return (
    <span className={`flex shrink-0 items-center justify-center rounded-full ${cls} ${className}`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-[62%] w-[62%]">
        <path d={d} />
      </svg>
    </span>
  );
}
