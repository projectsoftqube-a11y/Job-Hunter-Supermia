import CreativeHeading from '@/components/CreativeHeading';
import Rich from '@/components/Rich';

/*
 * Shared pieces of "The Translator": a career switch read as a translation from your old field's
 * language (deep brand purple) into the new field's language (warm gold). One fictional switcher, Jordan,
 * carries the story through every chapter, built from the page's own example answer (six years in
 * hospital administration, aiming at an Operations Analyst role at Northwind Labs). Everything about
 * Jordan is sample data and decorative (aria-hidden).
 */

export const MAYA = {
  initial: 'J',
  name: 'Jordan',
  from: 'Hospital administration',
  to: 'Operations analysis',
  role: 'Operations Analyst',
  company: 'Northwind Labs',
};

// The four chapters of the arc; the bar under each tag fills from purple (old field) to gold (new field)
export const CHAPTERS = ['Lost in translation', 'The translation', 'One story, three dialects', 'Saying it out loud'];
const SEG = ['bg-brand-500', 'bg-brand-300', 'bg-gold-300', 'bg-gold-500'];

export function ChapterTag({ n, eyebrow, tone = 'light' }) {
  const dark = tone === 'dark';
  return (
    <p className={`inline-flex max-w-full flex-wrap items-center gap-x-3 gap-y-1.5 rounded-[22px] py-1.5 pl-1.5 pr-4 text-xs font-bold uppercase tracking-[0.16em] ring-1 ${dark ? 'bg-white/[0.06] text-gold-300 ring-white/10' : 'bg-white text-brand-600 ring-brand-200 shadow-[0_10px_24px_-18px_rgba(26,15,51,0.6)]'}`}>
      <span aria-hidden="true" className={`flex items-center gap-2 rounded-full px-2.5 py-1 font-display tracking-[0.08em] ${dark ? 'bg-gold-400 text-ink-950' : 'bg-brand-950 text-gold-400'}`}>
        {String(n).padStart(2, '0')}
        <span className="flex items-center gap-[3px]">
          {SEG.map((c, i) => (
            <span key={c} className={`h-1.5 rounded-full ${i + 1 === n ? 'w-4' : 'w-1.5'} ${i + 1 <= n ? c : dark ? 'bg-ink-950/25' : 'bg-white/25'}`} />
          ))}
        </span>
      </span>
      <span>{eyebrow}</span>
      <span aria-hidden="true" className={`normal-case tracking-normal ${dark ? 'text-white/55' : 'text-ink-900/45'}`}>
        Chapter {n} · {CHAPTERS[n - 1]}
      </span>
    </p>
  );
}

export const h2Class = 'font-display text-[clamp(2rem,1.2rem+2.3vw,3.75rem)] font-extrabold leading-[1.04] tracking-[-0.035em]';

export function SectionHeading({ s, n, tone = 'light', className = '' }) {
  return (
    <div className={className}>
      <ChapterTag n={n} eyebrow={s.eyebrow} tone={tone} />
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

/** Jordan's badge: the recurring sample switcher. */
export function Persona({ tone = 'light', note, className = '' }) {
  const dark = tone === 'dark';
  return (
    <div aria-hidden="true" className={`inline-flex max-w-full items-center gap-3 rounded-full py-1.5 pl-1.5 pr-4 ring-1 ${dark ? 'bg-white/[0.06] ring-white/10' : 'bg-white ring-hairline shadow-[0_12px_28px_-20px_rgba(26,15,51,0.6)]'} ${className}`}>
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full font-display text-[15px] font-extrabold text-white">
        <span className="absolute inset-y-0 left-0 w-1/2 bg-brand-600" />
        <span className="absolute inset-y-0 right-0 w-1/2 bg-gold-500" />
        <span className="relative">{MAYA.initial}</span>
      </span>
      <span className="min-w-0 leading-tight">
        <span className={`block text-[13px] font-bold ${dark ? 'text-white' : 'text-ink-950'}`}>
          {MAYA.name} <span className={`font-semibold ${dark ? 'text-white/50' : 'text-ink-900/45'}`}>· sample switcher</span>
        </span>
        <span className={`block text-[12px] font-medium ${dark ? 'text-brand-200' : 'text-ink-900/60'}`}>{note || `${MAYA.from} → ${MAYA.to}`}</span>
      </span>
    </div>
  );
}

/**
 * Chapter hand-off: closes a section on where Jordan stands now (old-field purple) and what the next
 * chapter does about it (new-field gold). Decorative; the section headings carry the real structure.
 */
export function Handoff({ now, next, n, tone = 'light', className = '' }) {
  const dark = tone === 'dark';
  return (
    <div aria-hidden="true" data-handoff className={`grid grid-cols-[minmax(0,1fr)] items-stretch overflow-hidden rounded-[26px] sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] ${dark ? 'ring-1 ring-white/10' : 'shadow-[0_30px_60px_-44px_rgba(26,15,51,0.7)]'} ${className}`}>
      <div className="flex min-w-0 items-center gap-3 bg-brand-900 px-5 py-4 text-white sm:px-6">
        <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-300">Now</span>
        <span className="min-w-0 font-display text-[15px] font-bold leading-snug sm:text-[16px]">{now}</span>
      </div>
      <div className="relative flex items-center justify-center bg-[linear-gradient(180deg,var(--color-brand-900)_50%,var(--color-gold-400)_50%)] px-2 py-1 sm:bg-[linear-gradient(90deg,var(--color-brand-900)_50%,var(--color-gold-400)_50%)] sm:py-0">
        <span data-handoff-arrow className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-700 shadow-[0_10px_24px_-10px_rgba(26,15,51,0.7)] max-sm:rotate-90">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
      <div className="flex min-w-0 items-center gap-3 bg-gold-400 px-5 py-4 text-ink-950 sm:px-6">
        <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-950/60">Chapter {n}</span>
        <span className="min-w-0 font-display text-[15px] font-bold leading-snug sm:text-[16px]">{next}</span>
      </div>
    </div>
  );
}
