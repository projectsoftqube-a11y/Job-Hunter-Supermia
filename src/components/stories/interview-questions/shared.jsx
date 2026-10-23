import Rich from '@/components/Rich';

/*
 * Shared pieces of "The Question Library": heading styles, the chapter numeral, the left gutter the
 * sticky navigator sits in, and the margin note that carries each question's hint.
 */

export const PAPER = 'bg-[#fbf9f4]';
// Leaves room for the sticky navigator column on desktop
export const GUTTER = 'lg:pl-[calc(clamp(16px,4.2vw,96px)+268px)] xl:pl-[calc(clamp(16px,4.2vw,96px)+316px)]';

export const H2 = 'font-display text-[clamp(2rem,1.3rem+2.4vw,4rem)] font-extrabold leading-[1.04] tracking-[-0.035em] text-ink-950';
export const H2_DARK = 'font-display text-[clamp(2rem,1.3rem+2.4vw,4rem)] font-extrabold leading-[1.04] tracking-[-0.035em] text-white';

export const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

/** Huge outlined chapter numeral, drifting slower than the page (decorative). */
export function Numeral({ n, dark = false }) {
  return (
    <span
      data-numeral
      aria-hidden="true"
      className={`block select-none font-display text-[clamp(6rem,4rem+9vw,13rem)] font-extrabold leading-[0.8] tracking-[-0.07em] ${dark ? 'text-transparent [-webkit-text-stroke:2px_rgba(249,195,32,0.6)]' : 'text-transparent [-webkit-text-stroke:2px_var(--color-brand-600)]'}`}
    >
      {String(n).padStart(2, '0')}
    </span>
  );
}

/** Running head above each chapter title: "Chapter 01 · HR & Introduction · 9 questions". */
export function RunningHead({ n, eyebrow, meta, dark = false }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 border-b pb-3 ${dark ? 'border-white/15' : 'border-ink-950/15'}`}>
      <span aria-hidden="true" className={`font-mono text-[11px] font-bold uppercase tracking-[0.18em] ${dark ? 'text-white/55' : 'text-ink-900/50'}`}>
        Chapter {roman[n - 1] || n}
      </span>
      <span aria-hidden="true" className={`h-1 w-1 rounded-full ${dark ? 'bg-gold-400' : 'bg-gold-500'}`} />
      <p className={`text-xs font-bold uppercase tracking-[0.18em] ${dark ? 'text-gold-300' : 'text-brand-600'}`}>{eyebrow}</p>
      {meta && (
        <span aria-hidden="true" className={`ml-auto font-mono text-[11px] font-bold uppercase tracking-[0.14em] ${dark ? 'text-white/55' : 'text-ink-900/50'}`}>
          {meta}
        </span>
      )}
    </div>
  );
}

const SPLIT = 'Likely follow-up:';

/** A question's hint as a margin note: what the interviewer checks, then the likely follow-up. */
export function MarginNote({ hint }) {
  const at = hint.indexOf(SPLIT);
  const check = at >= 0 ? hint.slice(0, at).trim() : hint;
  const follow = at >= 0 ? hint.slice(at + SPLIT.length).trim() : '';
  return (
    <div className="relative min-w-0 border-l-2 border-gold-400 pl-4 sm:pl-5">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gold-700">What the interviewer checks</p>
      <p className="mt-1.5 text-[15px] italic leading-[1.65] text-ink-900/80">
        <Rich text={check} />
      </p>
      {follow && (
        <p className="mt-2.5 text-[14.5px] leading-[1.6] text-ink-900/75">
          <span className="mr-1.5 inline-flex items-center rounded-full bg-brand-950 px-2 py-0.5 text-[10.5px] font-bold uppercase not-italic tracking-[0.1em] text-gold-300">{SPLIT}</span>
          <Rich text={follow} />
        </p>
      )}
    </div>
  );
}
