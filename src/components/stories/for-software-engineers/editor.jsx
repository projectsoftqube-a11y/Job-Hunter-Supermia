import CreativeHeading from '@/components/CreativeHeading';
import Rich from '@/components/Rich';

/*
 * The "Editor" kit for the software engineers story: editor windows, file tabs, line-numbered code, and
 * the commit header each chapter opens with. The editor is only a visual frame for the page's real copy;
 * JobHunter has no CLI, API or IDE plugin, and every code-looking sample here is decorative and hidden
 * from assistive tech.
 */

export const GUTTER_LEFT = 'calc(clamp(16px, 4.2vw, 96px) / -2 - 1px)';

/** Syntax token colours: brand purple for keys, gold for values, muted for comments. */
export const T = {
  k: 'text-brand-300',
  s: 'text-gold-300',
  c: 'text-white/35',
  t: 'text-white/85',
  p: 'text-brand-400',
  g: 'text-gold-400',
};

/** One line of decorative code: [[tokenType, text], ...]. */
export function Line({ n, parts = [], className = '', ...rest }) {
  return (
    <div className={`relative grid grid-cols-[2.4rem_minmax(0,1fr)] ${className}`} {...rest}>
      <span className="select-none pr-3 text-right text-white/25">{n}</span>
      <span className="relative min-w-0 truncate whitespace-pre">
        {parts.map(([type, text], i) => (
          <span key={i} className={T[type] || T.t}>
            {text}
          </span>
        ))}
      </span>
    </div>
  );
}

/** Editor window: title bar with traffic lights and file tabs, a body and an optional status bar. */
export function Window({ tabs = [], active = 0, className = '', bodyClass = '', status, children, ...rest }) {
  return (
    <div className={`relative overflow-hidden rounded-[22px] bg-[#17122b] text-white shadow-[0_50px_100px_-50px_rgba(10,6,24,0.9)] ring-1 ring-white/10 ${className}`} {...rest}>
      <div aria-hidden="true" className="flex h-11 items-stretch border-b border-white/10 bg-[#120e22]">
        <span className="flex shrink-0 items-center gap-1.5 px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        </span>
        <span className="flex min-w-0 overflow-hidden">
          {tabs.map((t, i) => (
            <span
              key={t}
              className={`flex shrink-0 items-center gap-2 border-r border-white/[0.06] px-3.5 font-mono text-[12px] ${i === active ? 'border-t-2 border-t-gold-400 bg-[#17122b] text-white' : 'text-white/40'}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${i === active ? 'bg-gold-400' : 'bg-brand-400/60'}`} />
              {t}
            </span>
          ))}
        </span>
      </div>
      <div className={bodyClass}>{children}</div>
      {status && (
        <div aria-hidden="true" className="flex h-7 items-center justify-between gap-3 bg-brand-600 px-3 font-mono text-[11px] text-white/90">
          {status}
        </div>
      )}
    </div>
  );
}

const h2Class = 'font-display text-[clamp(1.95rem,1.2rem+2.2vw,3.6rem)] font-extrabold leading-[1.05] tracking-[-0.035em]';

/**
 * Chapter header: a commit line (decorative) with the git-graph node in the page gutter, the eyebrow
 * shown as a file tab, then the H2.
 */
export function ChapterHead({ s, n, total, file, commit, tone = 'light', className = '' }) {
  const dark = tone === 'dark';
  return (
    <div className={`relative ${className}`}>
      <span
        data-git-node
        aria-hidden="true"
        className="absolute top-[3px] z-[4] hidden h-3.5 w-3.5 -translate-x-[6px] rounded-full border-2 border-brand-300 bg-white transition-colors duration-300 data-[on=true]:border-gold-400 data-[on=true]:bg-gold-400 lg:block"
        style={{ left: GUTTER_LEFT }}
      />
      <p aria-hidden="true" className={`flex items-center gap-2 font-mono text-[12px] ${dark ? 'text-brand-300' : 'text-brand-500'}`}>
        <span className="text-gold-500">commit</span>
        <span>{commit.hash}</span>
        <span className={dark ? 'text-white/30' : 'text-ink-900/30'}>·</span>
        <span className="truncate">{commit.msg}</span>
        <span className={`ml-1 shrink-0 rounded px-1.5 py-px text-[10.5px] ${dark ? 'bg-white/10 text-white/60' : 'bg-brand-50 text-brand-600'}`}>
          {String(n).padStart(2, '0')}/{String(total).padStart(2, '0')}
        </span>
      </p>
      <p className="mt-4 inline-flex max-w-full items-stretch font-mono text-[13px]">
        <span aria-hidden="true" className={`flex items-center gap-2 rounded-l-lg px-3 py-1.5 ${dark ? 'bg-white/[0.08] text-white' : 'bg-[#17122b] text-white'}`}>
          <span className="h-2 w-2 rounded-full bg-gold-400" />
          {file}
        </span>
        <span className={`flex items-center rounded-r-lg px-3 py-1.5 font-sans text-xs font-bold uppercase tracking-[0.16em] ${dark ? 'bg-gold-400 text-ink-950' : 'bg-gold-300 text-ink-950'}`}>
          <span aria-hidden="true" className="mr-1.5 font-mono normal-case tracking-normal opacity-60">
            {'//'}
          </span>
          {s.eyebrow}
        </span>
      </p>
      <CreativeHeading id={`${s.id}-title`} lines={s.h2} tone={tone} className={`mt-5 ${h2Class} ${dark ? 'text-white' : 'text-ink-950'}`} />
    </div>
  );
}

export function Prose({ text, tone = 'light', className = '', ...rest }) {
  if (!text) return null;
  return (
    <p className={`text-[17px] leading-[1.75] ${tone === 'dark' ? 'text-brand-100' : 'text-ink-900/75'} ${className}`} {...rest}>
      <Rich text={text} tone={tone} />
    </p>
  );
}
