import { Icon } from '@/components/icons';

/*
 * Shared pieces of "The Draft Desk" story: the postage-stamp chapter marker, the airmail edge, the
 * postmark and the paper-plane glyph. All decorative pieces are hidden from assistive tech; the
 * chapter marker's eyebrow is real text.
 */

export const TOTAL = 4;

export const h2Class = 'font-display text-[clamp(2rem,1.25rem+2.5vw,3.9rem)] font-extrabold leading-[1.04] tracking-[-0.035em]';

/** Airmail envelope edge: diagonal purple and gold stripes. */
export function Airmail({ className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none block h-2 bg-[repeating-linear-gradient(135deg,#4b2e83_0_16px,transparent_16px_26px,#f4b400_26px_42px,transparent_42px_52px)] ${className}`}
    />
  );
}

/** Perforated postage stamp with the chapter number. `edge` is the page colour behind it. */
export function Stamp({ n, edge = 'border-[#fbf8f1]', tone = 'gold', className = '' }) {
  const face = tone === 'gold' ? 'bg-gold-400 text-ink-950' : 'bg-brand-600 text-gold-300';
  return (
    <span aria-hidden="true" className={`relative inline-flex h-[62px] w-[52px] shrink-0 rotate-[-4deg] border-[5px] border-dotted ${edge} ${face} ${className}`}>
      <span className="m-[3px] flex flex-1 flex-col items-center justify-center border border-current/25">
        <span className="font-display text-[19px] font-extrabold leading-none tracking-[-0.04em]">{String(n).padStart(2, '0')}</span>
        <span className="mt-1 text-[7px] font-extrabold uppercase tracking-[0.2em] opacity-70">Draft</span>
      </span>
    </span>
  );
}

/** Chapter marker: stamp, "Draft desk n / 4" with a four-envelope progress row, and the real eyebrow. */
export function Chapter({ n, eyebrow, dark = false, edge }) {
  return (
    <div data-chapter className="flex items-center gap-4">
      <Stamp n={n} edge={edge || (dark ? 'border-brand-950' : 'border-[#fbf8f1]')} tone={dark ? 'gold' : 'gold'} />
      <div className="min-w-0">
        <p aria-hidden="true" className={`flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] ${dark ? 'text-white/45' : 'text-ink-900/45'}`}>
          Draft desk · {n} / {TOTAL}
          <span className="flex gap-1">
            {Array.from({ length: TOTAL }, (_, i) => (
              <span key={i} className={`h-[7px] w-[11px] rounded-[2px] ${i < n ? 'bg-gold-500' : dark ? 'bg-white/15' : 'bg-brand-200'}`} />
            ))}
          </span>
        </p>
        {eyebrow && <p className={`mt-1 text-[13px] font-extrabold uppercase tracking-[0.18em] ${dark ? 'text-gold-300' : 'text-brand-600'}`}>{eyebrow}</p>}
      </div>
    </div>
  );
}

/** Round postmark with wavy cancellation lines. */
export function Postmark({ id = 'pm', label = 'JOBHUNTER · DRAFT DESK ·', center = 'DRAFT', className = '', color = '#4b2e83' }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 200 120" className={className} fill="none" stroke={color}>
      <defs>
        <path id={id} d="M60 60 m-40 0 a40 40 0 1 1 80 0 a40 40 0 1 1 -80 0" />
      </defs>
      <circle cx="60" cy="60" r="52" strokeWidth="2.5" />
      <circle cx="60" cy="60" r="31" strokeWidth="1.5" />
      <text fill={color} stroke="none" fontSize="11.5" fontWeight="800" letterSpacing="2.4" fontFamily="var(--font-lexend), sans-serif">
        <textPath href={`#${id}`}>{label}</textPath>
      </text>
      <text x="60" y="64" textAnchor="middle" fill={color} stroke="none" fontSize="12" fontWeight="800" letterSpacing="1.5" fontFamily="var(--font-lexend), sans-serif">
        {center}
      </text>
      {[38, 52, 66, 80].map((y) => (
        <path key={y} d={`M118 ${y} q10 -7 20 0 t20 0 t20 0 t20 0`} strokeWidth="2.5" strokeLinecap="round" />
      ))}
    </svg>
  );
}

export function PlaneIcon({ className = 'h-5 w-5', strokeWidth = 2.2 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21.5 2.5 10.5 13.5M21.5 2.5l-7 19-4-8-8-4z" />
    </svg>
  );
}

/** Small icon tile used on the cards and steps. */
export function Tile({ icon, className = '' }) {
  return (
    <span aria-hidden="true" className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${className}`}>
      <Icon name={icon} className="h-5 w-5" />
    </span>
  );
}
