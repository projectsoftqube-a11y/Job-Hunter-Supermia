import CreativeHeading from '@/components/CreativeHeading';
import Rich from '@/components/Rich';

/*
 * Shared pieces for the designers-and-analysts story ("The Canvas"): the chapter tag (a design-tool
 * frame tab with a colour swatch and four frame squares) and the section header.
 */

export const H2_CLASS = 'font-display text-[clamp(2rem,1.25rem+2.6vw,4rem)] font-extrabold leading-[1.04] tracking-[-0.035em]';

const SWATCH = ['from-brand-500 to-brand-700', 'from-gold-300 to-gold-500', 'from-emerald-400 to-emerald-600', 'from-rose-300 to-brand-500'];

/** "Frame 02 · Match score" tab; the four squares show where the story is. */
export function FrameTag({ n, total = 4, label, tone = 'light' }) {
  const dark = tone === 'dark';
  return (
    <p className={`inline-flex items-center gap-3 rounded-xl py-1.5 pl-1.5 pr-3.5 text-xs font-bold uppercase tracking-[0.14em] shadow-[0_10px_24px_-16px_rgba(26,15,51,0.6)] ${dark ? 'bg-white/[0.08] text-white ring-1 ring-white/15' : 'bg-white text-ink-950 ring-1 ring-brand-200'}`}>
      <span aria-hidden="true" className={`h-7 w-7 rounded-lg bg-gradient-to-br ${SWATCH[(n - 1) % 4]}`} />
      <span aria-hidden="true" className={dark ? 'text-white/60' : 'text-brand-500'}>
        Frame {String(n).padStart(2, '0')}
      </span>
      {label}
      <span aria-hidden="true" className="flex gap-1">
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className={`h-2 w-2 rounded-[2px] ${i < n ? 'bg-gold-400' : dark ? 'bg-white/20' : 'bg-brand-200'}`} />
        ))}
      </span>
    </p>
  );
}

// `wide` gives long headings (with an unbreakable highlighted phrase) more room and a slightly smaller size
export function Header({ s, n, tone = 'light', wide = false, className = '' }) {
  const dark = tone === 'dark';
  const h2 = wide ? 'font-display text-[clamp(2rem,1.2rem+2.2vw,3.5rem)] font-extrabold leading-[1.05] tracking-[-0.035em]' : H2_CLASS;
  return (
    <div className={`grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-12 lg:items-end lg:gap-12 ${className}`}>
      <div className={`min-w-0 ${wide ? 'lg:col-span-8' : 'lg:col-span-7'}`}>
        <FrameTag n={n} label={s.eyebrow} tone={tone} />
        <CreativeHeading id={`${s.id}-title`} lines={s.h2} tone={tone} className={`mt-6 ${h2} ${dark ? 'text-white' : 'text-ink-950'}`} />
      </div>
      <p className={`min-w-0 text-lead font-medium lg:pb-2 ${wide ? 'lg:col-span-4' : 'lg:col-span-5'} ${dark ? 'text-brand-100' : 'text-ink-900/70'}`}>
        <Rich text={s.intro} tone={tone} />
      </p>
    </div>
  );
}

/** Selection handles around a selected frame, like a design tool (decorative). */
export function Handles({ className = '', color = 'bg-white border-brand-500' }) {
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute -inset-[5px] rounded-[inherit] border-2 border-brand-500 ${className}`}>
      {['-left-[6px] -top-[6px]', '-right-[6px] -top-[6px]', '-left-[6px] -bottom-[6px]', '-right-[6px] -bottom-[6px]'].map((p) => (
        <span key={p} className={`absolute h-2.5 w-2.5 rounded-[2px] border-2 ${color} ${p}`} />
      ))}
    </span>
  );
}

export function Glyph({ name, className = 'h-3.5 w-3.5', strokeWidth = 2.6 }) {
  const paths = {
    plus: <path d="M12 5v14M5 12h14" />,
    check: <path d="M4 12.5l5 5L20 6.5" />,
    x: <path d="M6 6l12 12M18 6 6 18" />,
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    cursor: <path d="M5 3l14 7-6 2-2 6z" />,
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      {paths[name]}
    </svg>
  );
}

// Dot grid of an infinite canvas (static background)
export const DOTS_LIGHT = '[background-image:radial-gradient(rgba(75,46,131,0.16)_1.2px,transparent_1.2px)] [background-size:22px_22px]';
export const DOTS_DARK = '[background-image:radial-gradient(rgba(255,255,255,0.12)_1.2px,transparent_1.2px)] [background-size:22px_22px]';
