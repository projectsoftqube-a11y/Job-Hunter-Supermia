/*
 * Shared pieces for the "Interview Room" story: the broadcast slate that marks each segment of the
 * session (the page's chapter device) and the heading styles for dark stage bands and light sections.
 */

export const TOTAL = 7;

export const H2_DARK = 'font-display text-[clamp(2rem,1.25rem+2.6vw,4.25rem)] font-extrabold leading-[1.04] tracking-[-0.035em] text-white';
export const H2_LIGHT = 'font-display text-[clamp(2rem,1.25rem+2.6vw,4.25rem)] font-extrabold leading-[1.04] tracking-[-0.035em] text-ink-950';

/** Segment slate: REC tag with the segment number, the eyebrow, and tally lights for the 7 segments. */
export function Slate({ n, eyebrow, dark = false }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span aria-hidden="true" className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-rose-500 px-2 py-1 font-mono text-[11px] font-bold tracking-[0.12em] text-white shadow-[0_8px_20px_-8px_rgba(244,63,94,0.9)]">
        <span className="h-1.5 w-1.5 rounded-full bg-white" />
        SEG {String(n).padStart(2, '0')}
      </span>
      <p className={`shrink-0 text-xs font-bold uppercase tracking-[0.18em] ${dark ? 'text-gold-300' : 'text-brand-600'}`}>{eyebrow}</p>
      <span aria-hidden="true" className={`h-px min-w-6 flex-1 ${dark ? 'bg-white/15' : 'bg-hairline'}`} />
      <span aria-hidden="true" className="hidden shrink-0 items-center gap-1 sm:flex">
        {Array.from({ length: TOTAL }, (_, i) => (
          <span
            key={i}
            className={`h-2.5 w-1.5 rounded-[2px] ${i + 1 === n ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.9)]' : i + 1 < n ? (dark ? 'bg-gold-400' : 'bg-brand-600') : dark ? 'bg-white/15' : 'bg-brand-100'}`}
          />
        ))}
        <span className={`ml-2 font-mono text-[11px] font-bold tracking-[0.1em] ${dark ? 'text-white/50' : 'text-ink-900/45'}`}>
          {n}/{TOTAL}
        </span>
      </span>
    </div>
  );
}

/** Corner brackets of a broadcast safe area, for monitors and stage frames. */
export function SafeArea({ className = 'border-gold-400/70' }) {
  const base = `pointer-events-none absolute h-5 w-5 ${className}`;
  return (
    <span aria-hidden="true">
      <span className={`${base} left-3 top-3 rounded-tl-md border-l-2 border-t-2`} />
      <span className={`${base} right-3 top-3 rounded-tr-md border-r-2 border-t-2`} />
      <span className={`${base} bottom-3 left-3 rounded-bl-md border-b-2 border-l-2`} />
      <span className={`${base} bottom-3 right-3 rounded-br-md border-b-2 border-r-2`} />
    </span>
  );
}

// Deterministic bar heights for code-drawn waveforms (same on server and client)
export const wave = (count, seed = 1) =>
  Array.from({ length: count }, (_, i) => {
    const center = 1 - Math.abs(i - count / 2) / (count / 2);
    const v = 0.22 + 0.78 * Math.abs(Math.sin((i + seed) * 1.7) * Math.cos((i + seed) * 0.55)) * (0.45 + 0.55 * center);
    return Math.round(v * 1000) / 10;
  });
