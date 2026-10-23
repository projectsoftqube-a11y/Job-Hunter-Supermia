import CreativeHeading from '@/components/CreativeHeading';
import Rich from '@/components/Rich';

/*
 * Shared pieces for the resume-job-match story ("The Scanner"): the chapter eyebrow (a homepage-style
 * pill with the chapter number and four progress dots) and the section header (eyebrow, H2, intro).
 */

export const H2_CLASS = 'font-display text-[clamp(2rem,1.25rem+2.6vw,4rem)] font-extrabold leading-[1.04] tracking-[-0.035em]';

/** "02 · The score" pill with four dots showing how far through the scan the story is. */
export function Eyebrow({ n, total = 4, label, tone = 'light' }) {
  const dark = tone === 'dark';
  return (
    <p className={`inline-flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-4 text-xs font-bold uppercase tracking-[0.16em] ${dark ? 'bg-white/[0.07] text-gold-300 ring-1 ring-white/10' : 'border border-brand-200 bg-white text-brand-600'}`}>
      <span aria-hidden="true" className={`flex h-7 min-w-7 items-center justify-center rounded-full px-1.5 font-display text-[12px] font-extrabold tracking-normal ${dark ? 'bg-gold-400 text-ink-950' : 'bg-brand-950 text-gold-400'}`}>
        {String(n).padStart(2, '0')}
      </span>
      {label}
      <span aria-hidden="true" className="flex gap-1">
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className={`h-1.5 w-1.5 rounded-full ${i < n ? (dark ? 'bg-gold-400' : 'bg-gold-500') : dark ? 'bg-white/20' : 'bg-brand-200'}`} />
        ))}
      </span>
    </p>
  );
}

/** Eyebrow + H2 on the left, intro on the right. */
export function Header({ s, n, tone = 'light', className = '' }) {
  const dark = tone === 'dark';
  return (
    <div className={`grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-12 lg:items-end lg:gap-12 ${className}`}>
      <div className="min-w-0 lg:col-span-7">
        <Eyebrow n={n} label={s.eyebrow} tone={tone} />
        <CreativeHeading id={`${s.id}-title`} lines={s.h2} tone={tone} className={`mt-6 ${H2_CLASS} ${dark ? 'text-white' : 'text-ink-950'}`} />
      </div>
      <p className={`min-w-0 text-lead font-medium lg:col-span-5 lg:pb-2 ${dark ? 'text-brand-100' : 'text-ink-900/70'}`}>
        <Rich text={s.intro} tone={tone} />
      </p>
    </div>
  );
}

/** Tiny inline glyphs used by the mocks (decorative). */
export function Glyph({ name, className = 'h-3.5 w-3.5', strokeWidth = 2.6 }) {
  const paths = {
    plus: <path d="M12 5v14M5 12h14" />,
    up: <path d="M12 19V5M6 11l6-6 6 6" />,
    x: <path d="M6 6l12 12M18 6 6 18" />,
    check: <path d="M4 12.5l5 5L20 6.5" />,
    dash: <path d="M6 12h12" />,
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      {paths[name]}
    </svg>
  );
}
