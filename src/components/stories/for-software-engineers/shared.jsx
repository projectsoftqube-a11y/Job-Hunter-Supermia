import CreativeHeading from '@/components/CreativeHeading';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';

/*
 * Shared pieces of the "Built for engineers" story. One sample engineer, Sam, carries the page: Sam's
 * search across three boards, Sam's match for one Platform Engineer role, Sam's Role & Knowledge session
 * and Sam's scorecard. Every chapter opens with the same chapter tag and closes with a hand-off bar that
 * passes Sam's progress to the next chapter. Sam, the companies, scores and quotes are illustrative
 * sample data and appear only inside decorative (aria-hidden) product UI.
 */

export const SAM = { name: 'Sam Rivera', initials: 'SR', role: 'Backend engineer', years: '5 yrs' };

export const TARGET = { title: 'Platform Engineer', company: 'Brightpath Software', board: 'Dice', score: 78 };

// The narrative arc, one beat per chapter (decorative labels)
export const ARC = [
  { word: 'The search', done: 'Sam ran one search and picked Platform Engineer at Brightpath, found on Dice.' },
  { word: 'The fit', done: 'Match in: 78/100, one wording fix and one study topic for the prep list.' },
  { word: 'The round', done: 'Four prompts answered out loud, each with a follow-up on the same decision.' },
  { word: 'The proof', done: 'Scorecard in. Next topics set, then the round again in real simulation.' },
];

export const JOURNEY = ['Search', 'Match', 'Practice', 'Scorecard'];

export const BOARDS = {
  LinkedIn: { letter: 'L', shape: 'rounded-[6px]', bg: 'bg-brand-400', fg: 'text-white' },
  Indeed: { letter: 'I', shape: 'rounded-full', bg: 'bg-gold-400', fg: 'text-ink-950' },
  Dice: { letter: 'D', shape: 'rounded-[3px] rotate-45', bg: 'bg-brand-200', fg: 'text-brand-950' },
};

/** A board's mark: a one-colour shape carrying the board's initial (not the board's own logo). */
export function BoardMark({ board, size = 'h-6 w-6', text = 'text-[11px]' }) {
  const b = BOARDS[board];
  return (
    <span aria-hidden="true" className={`relative inline-flex shrink-0 items-center justify-center ${size} ${b.fg}`}>
      <span className={`absolute ${board === 'Dice' ? 'inset-[15%]' : 'inset-0'} ${b.shape} ${b.bg}`} />
      <span className={`relative font-display font-extrabold leading-none ${text}`}>{b.letter}</span>
    </span>
  );
}

export function Avatar({ className = 'h-9 w-9 text-[12px]', tone = 'gold' }) {
  const t = tone === 'gold' ? 'bg-gradient-to-br from-gold-300 to-gold-500 text-ink-950' : 'bg-gradient-to-br from-brand-400 to-brand-700 text-white';
  return <span className={`flex shrink-0 items-center justify-center rounded-full font-display font-extrabold ${t} ${className}`}>{SAM.initials}</span>;
}

export const h2Class = 'font-display text-[clamp(2.05rem,1.1rem+2.5vw,4rem)] font-extrabold leading-[1.03] tracking-[-0.04em]';

/** Chapter tag: the chapter number, a four-step progress bar and the section's eyebrow. */
export function ChapterTag({ n, eyebrow, tone = 'light' }) {
  const dark = tone === 'dark';
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
      <p className={`inline-flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-4 text-xs font-bold uppercase tracking-[0.16em] ring-1 ${dark ? 'bg-white/[0.06] text-gold-300 ring-white/12' : 'bg-white text-brand-600 ring-brand-200 shadow-[0_10px_24px_-18px_rgba(26,15,51,0.6)]'}`}>
        <span aria-hidden="true" className={`flex items-center gap-2 rounded-full px-2.5 py-1 font-display text-[12px] font-extrabold tracking-normal ${dark ? 'bg-gold-400 text-ink-950' : 'bg-brand-950 text-gold-300'}`}>
          {String(n).padStart(2, '0')}/04
        </span>
        {eyebrow}
      </p>
      <span aria-hidden="true" className={`inline-flex items-center gap-2.5 text-[13px] font-semibold ${dark ? 'text-brand-200' : 'text-brand-500'}`}>
        <span className="flex items-center gap-1">
          {ARC.map((a, i) => (
            <span key={a.word} className={`h-1.5 rounded-full ${i + 1 === n ? 'w-6 bg-gold-400' : i + 1 < n ? `w-3 ${dark ? 'bg-brand-300' : 'bg-brand-400'}` : `w-3 ${dark ? 'bg-white/15' : 'bg-brand-200'}`}`} />
          ))}
        </span>
        {ARC[n - 1].word}
      </span>
    </div>
  );
}

/** Chapter header: tag + H2 on the left, intro on the right from xl up (stacked below that). */
export function ChapterHead({ s, n, tone = 'light', className = '' }) {
  const dark = tone === 'dark';
  return (
    <header className={`grid grid-cols-[minmax(0,1fr)] gap-6 xl:grid-cols-12 xl:items-end xl:gap-12 ${className}`}>
      <div className="min-w-0 xl:col-span-8">
        <ChapterTag n={n} eyebrow={s.eyebrow} tone={tone} />
        <CreativeHeading id={`${s.id}-title`} lines={s.h2} tone={tone} className={`mt-6 ${h2Class} ${dark ? 'text-white' : 'text-ink-950'}`} />
      </div>
      {s.intro && (
        <p data-intro className={`min-w-0 max-w-[46rem] text-lead font-medium xl:col-span-4 xl:pb-2 ${dark ? 'text-brand-100' : 'text-ink-900/70'}`}>
          <Rich text={s.intro} tone={tone} />
        </p>
      )}
    </header>
  );
}

/**
 * Hand-off bar at the end of a chapter: Sam's progress so far, the four-step journey, and a real link
 * to the next chapter (or the questions after the story).
 */
export function Handoff({ n, next, tone = 'light' }) {
  const dark = tone === 'dark';
  const href = next ? `#${next.id}` : '#faqs';
  const label = next ? next.eyebrow : 'Questions';
  return (
    <div data-handoff className={`relative mt-12 grid grid-cols-[minmax(0,1fr)] items-center gap-4 rounded-[24px] p-3 ring-1 sm:mt-14 sm:p-4 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:gap-6 ${dark ? 'bg-white/[0.04] ring-white/10' : 'bg-white ring-hairline shadow-[0_24px_50px_-40px_rgba(26,15,51,0.55)]'}`}>
      <div aria-hidden="true" className="flex min-w-0 items-center gap-3">
        <Avatar />
        <p className={`min-w-0 text-[14px] leading-snug ${dark ? 'text-brand-100' : 'text-ink-900/70'}`}>
          <span className={`font-bold ${dark ? 'text-white' : 'text-ink-950'}`}>{SAM.name}</span>
          <span className={dark ? 'text-brand-300' : 'text-ink-900/45'}> · {SAM.role}, {SAM.years}</span>
          <span className="block">{ARC[n - 1].done}</span>
        </p>
      </div>
      <ol aria-hidden="true" className="hidden items-center gap-1.5 md:flex">
        {JOURNEY.map((j, i) => {
          const done = i < n;
          return (
            <li key={j} className="flex items-center gap-1.5">
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-bold ${done ? (dark ? 'bg-gold-400 text-ink-950' : 'bg-brand-950 text-gold-300') : dark ? 'bg-white/[0.06] text-brand-200' : 'bg-light-lavender text-brand-500'}`}>
                {done && <Icon name="check" className="h-3 w-3" strokeWidth={3} />}
                {j}
              </span>
              {i < JOURNEY.length - 1 && <span className={`h-px w-4 ${done ? 'bg-gold-400' : dark ? 'bg-white/15' : 'bg-brand-200'}`} />}
            </li>
          );
        })}
      </ol>
      <a
        href={href}
        className={`group inline-flex h-12 items-center justify-between gap-3 rounded-full pl-5 pr-1.5 text-[14px] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${dark ? 'bg-white text-ink-950 hover:bg-gold-300 focus-visible:outline-gold-300' : 'bg-brand-950 text-white hover:bg-brand-800 focus-visible:outline-brand-500'}`}
      >
        <span>
          <span className={dark ? 'text-brand-600' : 'text-gold-300'}>Up next:</span> {label}
        </span>
        <span aria-hidden="true" className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-y-0.5 ${dark ? 'bg-brand-950 text-gold-400' : 'bg-gold-400 text-ink-950'}`}>
          <Icon name="arrow" className="h-4 w-4 rotate-90" strokeWidth={2.4} />
        </span>
      </a>
    </div>
  );
}

/** Gradient-bordered dark tile used across the bento grids. */
export const tileOuter = 'relative rounded-[24px] bg-gradient-to-br from-white/[0.16] via-white/[0.05] to-brand-400/25 p-px';
export const tileInner = 'relative h-full overflow-hidden rounded-[23px] bg-[#170d30]';
