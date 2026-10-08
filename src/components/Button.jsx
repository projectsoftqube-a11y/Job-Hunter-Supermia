import Magnetic from './Magnetic';

const ARROW = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * Pill button with a sliding fill on hover. Variants: gold (primary), light (on dark), outline-dark, ink.
 */
export default function Button({ href, children, variant = 'gold', size = 'lg', magnetic = true, arrow = true, className = '', ...rest }) {
  const variants = {
    gold: 'bg-gold-500 text-ink-900 [--fill:#ffffff]',
    light: 'bg-white text-brand-900 [--fill:var(--color-gold-400)]',
    ink: 'bg-brand-600 text-white [--fill:var(--color-brand-900)]',
    'outline-light': 'border border-white/35 text-white [--fill:rgba(255,255,255,0.12)]',
    'outline-dark': 'border border-brand-600/30 text-brand-700 [--fill:var(--color-brand-100)]',
  };
  const sizes = {
    lg: 'h-14 px-7 text-[15px] sm:h-16 sm:px-9 sm:text-base',
    md: 'h-12 px-6 text-[15px]',
    sm: 'h-10 px-5 text-sm',
  };

  const inner = (
    <a
      href={href}
      className={`group relative isolate inline-flex items-center justify-center gap-3 overflow-hidden rounded-full font-semibold tracking-tight transition-colors duration-500 ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {/* sliding fill */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 translate-y-full rounded-full bg-[var(--fill)] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
      />
      <span className="relative">{children}</span>
      {arrow && (
        <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-current/10">
          <span className="flex transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-[150%]">{ARROW}</span>
          <span className="absolute flex -translate-x-[150%] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-0">{ARROW}</span>
        </span>
      )}
    </a>
  );

  return magnetic ? <Magnetic>{inner}</Magnetic> : inner;
}
