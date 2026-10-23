/*
 * Shared pieces of "The Gentle Restart" story: the sunrise chapter marker and type scale.
 * The marker's sun sits a little higher in each chapter, so the page reads as one slow sunrise.
 */

export const TOTAL = 4;

export const h2Class = 'font-display text-[clamp(2rem,1.25rem+2.4vw,3.7rem)] font-extrabold leading-[1.05] tracking-[-0.035em]';

export function Dawn({ n, eyebrow, dark = false }) {
  const sunY = 27 - (n / TOTAL) * 15;
  return (
    <div data-dawn className="flex items-center gap-4">
      <svg aria-hidden="true" viewBox="0 0 64 36" className="h-11 w-[78px] shrink-0 overflow-visible">
        <defs>
          <radialGradient id={`dawn-glow-${n}`}>
            <stop offset="0%" stopColor="#fcd34d" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#fcd34d" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="32" cy={sunY} r="17" fill={`url(#dawn-glow-${n})`} />
        <circle cx="32" cy={sunY} r="8" fill="#f4b400" />
        {[-50, -25, 0, 25, 50].map((a) => (
          <line
            key={a}
            x1={32 + Math.sin((a * Math.PI) / 180) * 12}
            y1={sunY - Math.cos((a * Math.PI) / 180) * 12}
            x2={32 + Math.sin((a * Math.PI) / 180) * 15.5}
            y2={sunY - Math.cos((a * Math.PI) / 180) * 15.5}
            stroke="#f4b400"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}
        <rect x="0" y="27" width="64" height="9" fill={dark ? '#1a0f33' : '#ffffff'} fillOpacity={dark ? 1 : 0} />
        <line x1="2" y1="27" x2="62" y2="27" stroke={dark ? 'rgba(255,255,255,0.35)' : '#c4b3ea'} strokeWidth="2" strokeLinecap="round" />
      </svg>
      <div className="min-w-0">
        <p aria-hidden="true" className={`flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] ${dark ? 'text-white/45' : 'text-ink-900/45'}`}>
          Restart · {n} of {TOTAL}
          <span className="flex gap-1">
            {Array.from({ length: TOTAL }, (_, i) => (
              <span key={i} className={`h-[6px] w-[6px] rounded-full ${i < n ? 'bg-gold-500' : dark ? 'bg-white/20' : 'bg-brand-200'}`} />
            ))}
          </span>
        </p>
        {eyebrow && <p className={`mt-1 text-[13px] font-extrabold uppercase tracking-[0.18em] ${dark ? 'text-gold-300' : 'text-brand-600'}`}>{eyebrow}</p>}
      </div>
    </div>
  );
}
