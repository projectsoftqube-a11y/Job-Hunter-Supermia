import CreativeHeading from '@/components/CreativeHeading';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';

/*
 * Shared pieces of "The Case Study": the four chapters, the colour field each one sits on, the running
 * head (chapter marker + eyebrow), the huge editorial numerals, the section title, and the chapter
 * hand-off strip that passes the story to the next section. Noa is a sample job seeker the page follows;
 * every number and posting tied to her is illustrative sample data.
 */

export const CHAPTERS = [
  { id: 'same-title-different-job', name: 'The brief' },
  { id: 'match-score-first', name: 'The research' },
  { id: 'resume-versions', name: 'The iterations' },
  { id: 'talk-through-your-work', name: 'The critique' },
];

// One colour field per chapter: brand purple, gold, ink, lavender
export const TONES = {
  purple: {
    heading: 'dark',
    title: 'text-white [&_[data-ch-mark]]:bg-brand-800',
    sub: 'text-brand-100',
    pill: 'bg-gold-400 text-ink-950',
    eyebrow: 'text-gold-300',
    on: 'bg-white text-brand-700',
    off: 'bg-white/10 text-white/65',
    numeral: 'text-gold-400',
    link: 'dark',
  },
  gold: {
    heading: 'light',
    title: 'text-ink-950 [&_[data-ch-mark]]:bg-white [&_.bg-clip-text]:from-brand-800 [&_.bg-clip-text]:via-brand-600 [&_.bg-clip-text]:to-brand-950 [&_[data-ch-swoosh]]:stroke-brand-950',
    sub: 'text-ink-950/80',
    pill: 'bg-brand-950 text-gold-300',
    eyebrow: 'text-brand-900',
    on: 'bg-brand-950 text-gold-300',
    off: 'bg-ink-950/10 text-ink-950/65',
    numeral: 'text-brand-950',
    link: 'light',
  },
  ink: {
    heading: 'dark',
    title: 'text-white',
    sub: 'text-brand-100',
    pill: 'bg-gold-400 text-ink-950',
    eyebrow: 'text-gold-300',
    on: 'bg-gold-400 text-ink-950',
    off: 'bg-white/[0.08] text-white/60',
    numeral: 'text-gold-400',
    link: 'dark',
  },
  lavender: {
    heading: 'light',
    title: 'text-ink-950',
    sub: 'text-ink-900/75',
    pill: 'bg-brand-950 text-gold-300',
    eyebrow: 'text-brand-600',
    on: 'bg-brand-600 text-white',
    off: 'bg-white text-brand-500',
    numeral: 'text-brand-600',
    link: 'light',
  },
};

export const h2Class = 'font-display text-[clamp(2rem,1.2rem+2.3vw,3.75rem)] font-extrabold leading-[1.04] tracking-[-0.035em]';

/** Chapter marker: "01 / 04" + the section eyebrow, with the four chapter names on wide screens. */
export function RunningHead({ n, eyebrow, tone }) {
  const t = TONES[tone];
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
      <p className="inline-flex items-center gap-3">
        <span className={`rounded-full px-3 py-1.5 font-display text-[13px] font-extrabold tracking-[0.04em] ${t.pill}`}>
          {String(n).padStart(2, '0')}
          <span className="opacity-60"> / 04</span>
        </span>
        <span className={`text-[13px] font-bold uppercase tracking-[0.18em] ${t.eyebrow}`}>{eyebrow}</span>
      </p>
      <ol aria-hidden="true" className="hidden items-center gap-1.5 lg:flex">
        {CHAPTERS.map((c, i) => (
          <li key={c.id} className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-bold ${i + 1 === n ? t.on : t.off}`}>
            <span className="font-display">{String(i + 1).padStart(2, '0')}</span> {c.name}
          </li>
        ))}
      </ol>
    </div>
  );
}

/** The chapter's huge editorial numeral (decorative). */
export function Numeral({ n, tone, className = '' }) {
  return (
    <span aria-hidden="true" data-numeral className={`block font-display font-extrabold leading-[0.78] tracking-[-0.07em] ${TONES[tone].numeral} ${className}`}>
      {String(n).padStart(2, '0')}
    </span>
  );
}

export function Title({ s, tone, className = '' }) {
  const t = TONES[tone];
  return <CreativeHeading id={`${s.id}-title`} lines={s.h2} tone={t.heading} className={`${h2Class} ${t.title} ${className}`} />;
}

export function Lead({ text, tone, className = '' }) {
  if (!text) return null;
  return (
    <p data-lead className={`text-lead font-medium ${TONES[tone].sub} ${className}`}>
      <Rich text={text} tone={TONES[tone].link} />
    </p>
  );
}

export function Para({ text, tone, className = '' }) {
  if (!text) return null;
  return (
    <p className={`text-[17px] leading-relaxed ${TONES[tone].sub} ${className}`}>
      <Rich text={text} tone={TONES[tone].link} />
    </p>
  );
}

const HANDOFF = {
  purple: { box: 'bg-brand-950 text-white', num: 'text-gold-400', label: 'text-gold-300', line: 'text-white', btn: 'bg-gold-400 text-ink-950' },
  gold: { box: 'bg-brand-950 text-white', num: 'text-gold-400', label: 'text-gold-300', line: 'text-white', btn: 'bg-gold-400 text-ink-950' },
  ink: { box: 'bg-gold-400 text-ink-950', num: 'text-brand-950', label: 'text-brand-900', line: 'text-ink-950', btn: 'bg-brand-950 text-gold-300' },
};

/** Chapter transition: the next chapter's number, name and one story beat, linking down the page. */
export function Handoff({ next, line, tone }) {
  const c = CHAPTERS[next];
  const h = HANDOFF[tone];
  return (
    <div data-handoff className="mt-14 sm:mt-16">
      <a
        href={`#${c.id}`}
        className={`group relative grid grid-cols-[minmax(0,1fr)_auto] items-center gap-5 overflow-hidden rounded-[30px] p-5 shadow-[0_40px_80px_-50px_rgba(26,15,51,0.9)] transition-[translate] duration-500 hover:-translate-y-1 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-7 sm:p-7 lg:px-10 ${h.box}`}
      >
        <span aria-hidden="true" className={`hidden font-display text-[clamp(3.5rem,2rem+3vw,5.5rem)] font-extrabold leading-[0.8] tracking-[-0.06em] sm:block ${h.num}`}>
          {String(next + 1).padStart(2, '0')}
        </span>
        <span className="min-w-0">
          <span className={`block text-[12.5px] font-bold uppercase tracking-[0.18em] ${h.label}`}>Next chapter · {c.name}</span>
          <span className={`mt-1.5 block font-display text-[clamp(1.1rem,0.9rem+0.8vw,1.65rem)] font-bold leading-snug tracking-[-0.02em] ${h.line}`}>{line}</span>
        </span>
        <span aria-hidden="true" className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-[translate] duration-500 group-hover:translate-y-1 sm:h-14 sm:w-14 ${h.btn}`}>
          <Icon name="arrow" className="h-5 w-5 rotate-90" strokeWidth={2.4} />
        </span>
      </a>
    </div>
  );
}

/** Noa's initials disc (decorative). */
export function Avatar({ className = 'h-12 w-12 text-[15px]', tone = 'bg-gold-400 text-ink-950' }) {
  return (
    <span aria-hidden="true" className={`flex shrink-0 items-center justify-center rounded-full font-display font-extrabold ${tone} ${className}`}>
      NR
    </span>
  );
}

/** Deterministic pseudo-random in [-1, 1] for decorative scatter (same on server and client). */
export function jitter(i, salt = 1) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
}
