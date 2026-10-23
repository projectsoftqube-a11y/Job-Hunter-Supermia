import CreativeHeading from '@/components/CreativeHeading';
import Rich from '@/components/Rich';

/*
 * Shared pieces of the "Three Boards, One List" story: the one-colour board marks (simple shapes with an
 * initial, not the boards' own logos), the sample roles every scene reuses, and the pipeline marker that
 * ties the sections together. All job data here is illustrative sample data and decorative only.
 */

export const BOARDS = {
  LinkedIn: { letter: 'L', shape: 'rounded-[7px]', bg: 'bg-brand-500', fg: 'text-white', dot: 'bg-brand-500', ring: 'ring-brand-300/60', text: 'text-brand-600' },
  Indeed: { letter: 'I', shape: 'rounded-full', bg: 'bg-gold-400', fg: 'text-ink-950', dot: 'bg-gold-400', ring: 'ring-gold-300/70', text: 'text-gold-700' },
  Dice: { letter: 'D', shape: 'rounded-[3px] rotate-45', bg: 'bg-brand-300', fg: 'text-brand-950', dot: 'bg-brand-300', ring: 'ring-brand-200', text: 'text-brand-500' },
};

export const BOARD_NAMES = ['LinkedIn', 'Indeed', 'Dice'];

/** A board's mark: a single-colour shape carrying the board's initial. */
export function BoardMark({ board, size = 'h-7 w-7', text = 'text-[12px]' }) {
  const b = BOARDS[board];
  const diamond = board === 'Dice';
  return (
    <span aria-hidden="true" className={`relative inline-flex shrink-0 items-center justify-center ${size} ${b.fg}`}>
      <span className={`absolute ${diamond ? 'inset-[14%]' : 'inset-0'} ${b.shape} ${b.bg}`} />
      <span className={`relative font-display font-extrabold leading-none ${text}`}>{b.letter}</span>
    </span>
  );
}

// Arrival order (how the three boards return them); `rank` is the order once sorted by fit
export const ROLES = [
  { key: 'kestrel', title: 'Frontend Developer', company: 'Kestrel Health', board: 'LinkedIn', score: 61, missing: 'Next.js' },
  { key: 'brightpath', title: 'React Developer', company: 'Brightpath Software', board: 'Indeed', score: 86, missing: 'Storybook' },
  { key: 'harbor', title: 'Full-Stack Engineer', company: 'Harbor Analytics', board: 'Dice', score: 71, missing: 'Node.js' },
  { key: 'northwind', title: 'Senior Frontend Engineer', company: 'Northwind Labs', board: 'LinkedIn', score: 92, missing: 'GraphQL' },
  { key: 'atlas', title: 'Web Engineer', company: 'Atlas Freight', board: 'Indeed', score: 54, missing: 'Vue' },
  { key: 'lumen', title: 'UI Engineer', company: 'Lumen Studio', board: 'Dice', score: 79, missing: 'WebGL' },
];

export const RANKED = [...ROLES].sort((a, b) => b.score - a.score);

const STAGES = 4;

/** Chapter marker: where this section sits in the pipeline, plus the section's eyebrow. */
export function StageTag({ n, eyebrow, tone = 'light' }) {
  const dark = tone === 'dark';
  return (
    <p className={`inline-flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-4 text-xs font-bold uppercase tracking-[0.16em] ring-1 ${dark ? 'bg-white/[0.06] text-gold-300 ring-white/10' : 'bg-white text-brand-600 ring-brand-200 shadow-[0_10px_24px_-18px_rgba(26,15,51,0.6)]'}`}>
      <span aria-hidden="true" className={`flex items-center gap-2 rounded-full px-2.5 py-1 font-display tracking-[0.08em] ${dark ? 'bg-gold-400 text-ink-950' : 'bg-brand-950 text-gold-400'}`}>
        {String(n).padStart(2, '0')}
        <span className="flex items-center gap-[3px]">
          {Array.from({ length: STAGES }, (_, i) => (
            <span key={i} className={`h-1.5 rounded-full ${i + 1 === n ? 'w-4' : 'w-1.5'} ${i + 1 <= n ? (dark ? 'bg-ink-950' : 'bg-gold-400') : dark ? 'bg-ink-950/30' : 'bg-white/30'}`} />
          ))}
        </span>
      </span>
      {eyebrow}
    </p>
  );
}

export const h2Class = 'font-display text-[clamp(2rem,1.2rem+2.3vw,3.75rem)] font-extrabold leading-[1.04] tracking-[-0.035em]';

/** Eyebrow + H2 for a section; the intro is placed by each scene. */
export function SectionHeading({ s, n, tone = 'light', className = '' }) {
  return (
    <div className={className}>
      <StageTag n={n} eyebrow={s.eyebrow} tone={tone} />
      <CreativeHeading id={`${s.id}-title`} lines={s.h2} tone={tone} className={`mt-6 ${h2Class} ${tone === 'dark' ? 'text-white' : 'text-ink-950'}`} />
    </div>
  );
}

export function Intro({ text, tone = 'light', className = '' }) {
  if (!text) return null;
  return (
    <p data-intro className={`text-lead font-medium ${tone === 'dark' ? 'text-brand-100' : 'text-ink-900/70'} ${className}`}>
      <Rich text={text} tone={tone} />
    </p>
  );
}
