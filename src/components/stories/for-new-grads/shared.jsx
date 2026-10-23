import CreativeHeading from '@/components/CreativeHeading';
import Rich from '@/components/Rich';

/*
 * Shared pieces of "The First-Job Syllabus" (for-new-grads): the module palette, the module header
 * bar with its whole-syllabus progress track, the section heading row and the tick-off checkbox.
 */

export const H2 = 'font-display text-[clamp(2rem,1rem+2.2vw,3.9rem)] font-extrabold leading-[1.04] tracking-[-0.035em]';

// Room for the sticky syllabus rail (compact at lg, full at xl)
export const PAD = 'lg:pl-[104px] xl:pl-[228px]';

// One accent per module. Full literal class strings so Tailwind picks them up.
export const MODS = [
  {
    fill: 'bg-brand-500',
    label: 'text-brand-600',
    badge: 'bg-brand-500 text-white',
    tick: 'bg-brand-500',
    check: 'text-white',
    border: 'border-brand-400',
    railOn: 'group-data-[state=active]:bg-brand-400 group-data-[state=active]:text-white',
  },
  {
    fill: 'bg-gold-500',
    label: 'text-gold-700',
    badge: 'bg-gold-400 text-ink-950',
    tick: 'bg-gold-400',
    check: 'text-ink-950',
    border: 'border-gold-400',
    railOn: 'group-data-[state=active]:bg-gold-400 group-data-[state=active]:text-ink-950',
  },
  {
    fill: 'bg-brand-300',
    label: 'text-brand-300',
    badge: 'bg-brand-300 text-ink-950',
    tick: 'bg-brand-300',
    check: 'text-ink-950',
    border: 'border-brand-300',
    railOn: 'group-data-[state=active]:bg-brand-300 group-data-[state=active]:text-ink-950',
  },
  {
    fill: 'bg-emerald-500',
    label: 'text-emerald-700',
    badge: 'bg-emerald-500 text-white',
    tick: 'bg-emerald-500',
    check: 'text-white',
    border: 'border-emerald-500',
    railOn: 'group-data-[state=active]:bg-emerald-500 group-data-[state=active]:text-white',
  },
];

export const mod = (i) => MODS[i % MODS.length];
export const of = (s, type, n = 0) => (s.blocks || []).filter((b) => b.type === type)[n];
export const pad2 = (n) => String(n).padStart(2, '0');

/* Tick-off checkbox. Static markup is the checked state; scenes animate [data-tick-fill] / [data-tick-path]. */
export function Tick({ m = MODS[0], dark = false, size = 'h-8 w-8', className = '' }) {
  return (
    <span aria-hidden="true" className={`relative inline-flex ${size} shrink-0 items-center justify-center rounded-[10px] ring-2 ${dark ? 'bg-brand-950 ring-white/20' : 'bg-white ring-brand-200'} ${className}`}>
      <span data-tick-fill className={`absolute -inset-[2px] rounded-[10px] ${m.tick}`} />
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" className={`relative h-[58%] w-[58%] ${m.check}`}>
        <path data-tick-path d="M5 12.5l4.5 4.5L19 7.5" pathLength="1" strokeDasharray="1" />
      </svg>
    </span>
  );
}

/* Module header bar: number, eyebrow, a four-segment track for the whole syllabus and a short meta label. */
export function ModuleBar({ s, index, total, dark = false, meta }) {
  const m = mod(index);
  return (
    <div
      data-modbar
      className={`flex flex-wrap items-center gap-x-4 gap-y-3 rounded-[20px] py-2.5 pl-2.5 pr-4 sm:flex-nowrap ${
        dark ? 'bg-white/[0.06] ring-1 ring-white/10' : 'bg-white ring-1 ring-brand-100 shadow-[0_18px_40px_-30px_rgba(26,15,51,0.4)]'
      }`}
    >
      <span aria-hidden="true" className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] font-display text-[15px] font-extrabold ${m.badge}`}>
        {pad2(index + 1)}
      </span>
      <div className="min-w-0">
        <span aria-hidden="true" className={`block text-[10.5px] font-bold uppercase tracking-[0.18em] ${dark ? 'text-white/50' : 'text-ink-900/45'}`}>
          Module {index + 1} of {total}
        </span>
        <p className={`font-display text-[15.5px] font-bold leading-tight ${dark ? 'text-white' : 'text-ink-950'}`}>{s.eyebrow}</p>
      </div>
      <div aria-hidden="true" className="ml-auto flex min-w-0 items-center gap-3">
        {meta && (
          <span className={`hidden rounded-full px-3 py-1 text-[12px] font-bold md:inline-flex ${dark ? 'bg-white/[0.07] text-white/70' : 'bg-light-lavender text-ink-900/60'}`}>{meta}</span>
        )}
        <span className={`hidden text-[10.5px] font-bold uppercase tracking-[0.18em] sm:inline ${dark ? 'text-white/45' : 'text-ink-900/40'}`}>Syllabus</span>
        <span className="flex gap-1.5">
          {Array.from({ length: total }, (_, i) => (
            <span key={i} className={`relative h-1.5 w-7 overflow-hidden rounded-full sm:w-11 ${dark ? 'bg-white/10' : 'bg-brand-100'}`}>
              {i <= index && <span data-modseg={i === index ? '' : undefined} className={`absolute inset-0 origin-left rounded-full ${mod(i).fill}`} />}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}

/* Module bar + heading row (heading left, intro right from xl). */
export function ModuleHead({ s, index, total, dark = false, meta }) {
  const m = mod(index);
  const tone = dark ? 'dark' : 'light';
  return (
    <>
      <ModuleBar s={s} index={index} total={total} dark={dark} meta={meta} />
      <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-6 sm:mt-12 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.6fr)] xl:items-end xl:gap-10">
        <CreativeHeading id={`${s.id}-title`} lines={s.h2} tone={tone} className={`${H2} ${dark ? 'text-white' : 'text-ink-950'}`} />
        <p data-rise className={`max-w-[48rem] text-[1.0625rem] font-medium leading-relaxed xl:mb-1 xl:text-[1.125rem] ${m.border} ${dark ? 'text-white/75' : 'text-ink-900/70'}`}>
          <Rich text={s.intro} tone={tone} />
        </p>
      </div>
    </>
  );
}

/* Sample label for decorative mocks */
export function Sample({ dark = false, children = 'Sample' }) {
  return (
    <span className={`rounded-full px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.14em] ${dark ? 'bg-white/10 text-white/60' : 'bg-white text-ink-900/50 ring-1 ring-hairline'}`}>{children}</span>
  );
}
