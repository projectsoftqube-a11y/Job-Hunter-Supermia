import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/icons';
import { FOOTER, OFFER, PRIVACY_URL, TERMS_URL, PARENT_URL, BROCHURE_URL, SIGNUP_URL } from '@/content/site';

const OFFICE = {
  street: '2451 W Grapevine Mills Cir #547',
  city: 'Grapevine, TX 76051',
  site: 'supermia.ai',
  email: 'hello@supermia.ai',
};
// Job boards searched, drawn as simple one-colour marks
const BOARDS = [
  {
    name: 'LinkedIn',
    icon: (
      <path
        fill="currentColor"
        d="M4 9h3.6v11H4zM5.8 3.6a2.1 2.1 0 1 1 0 4.2 2.1 2.1 0 0 1 0-4.2zM9.8 9h3.4v1.6c.5-.9 1.7-1.9 3.5-1.9 3.6 0 4.3 2.4 4.3 5.4V20h-3.6v-5.3c0-1.3 0-2.9-1.8-2.9s-2.1 1.4-2.1 2.8V20H9.8z"
      />
    ),
  },
  {
    name: 'Indeed',
    icon: (
      <>
        <path d="M5.5 9.5C8.5 5 13.5 3.2 18.5 4.6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="12" cy="10.6" r="2.2" fill="currentColor" />
        <rect x="10.4" y="14" width="3.2" height="7" rx="1.6" fill="currentColor" />
      </>
    ),
  },
  {
    name: 'Dice',
    icon: <path fill="currentColor" fillRule="evenodd" d="M5 4h6.5a8 8 0 0 1 0 16H5zm3.6 3.5v9h2.8a4.5 4.5 0 0 0 0-9z" />,
  },
];

const MAPS =`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${OFFICE.street}, ${OFFICE.city}`)}`;

/*
 * Dark footer that rises over the light final section with a rounded top, closing on a giant faint
 * wordmark. No scroll animation: it is simply there when you reach it.
 */
export default function Footer() {
  const link = 'group/l inline-flex items-center gap-2 text-[15px] font-medium text-white/80 transition-colors hover:text-gold-300';
  const arrow = (
    <span aria-hidden="true" className="-translate-x-1 opacity-0 transition-all duration-300 group-hover/l:translate-x-0 group-hover/l:opacity-100">
      →
    </span>
  );

  return (
    <footer className="relative -mt-24 overflow-hidden rounded-t-[clamp(28px,4vw,64px)] bg-brand-950 pt-16 text-white sm:-mt-32 sm:pt-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_40%_at_15%_0%,rgba(109,76,176,0.5),transparent),radial-gradient(40%_35%_at_90%_100%,rgba(244,180,0,0.14),transparent)]" />

      <div className="container-x relative">
        {/* Top band: the pitch on the left, an action card (CTA, boards, control promise) on the right */}
        <div className="grid items-center gap-10 border-b border-white/10 pb-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16 lg:pb-16">
          <div className="min-w-0">
            <Image
              src="/brand/logo.png"
              alt="JobHunter by SuperMIA"
              width={1086}
              height={362}
              className="h-14 w-auto brightness-0 invert sm:h-16"
            />
            <p className="mt-7 max-w-[42rem] font-display text-[clamp(1.8rem,1rem+2.6vw,3.6rem)] font-bold leading-[1.08] tracking-[-0.035em]">
              Find the role, practice the interview, <span className="text-gold-400">land the offer.</span>
            </p>
          </div>

          <div className="relative min-w-0 overflow-hidden rounded-[28px] bg-white/[0.05] p-6 ring-1 ring-white/10 sm:p-8">
            <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,rgba(244,180,0,0.2),transparent)]" />
            <p className="relative flex items-center gap-3 text-[16px] font-semibold text-white">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold-400 text-ink-950" aria-hidden="true">
                <Icon name="shield" className="h-[18px] w-[18px]" />
              </span>
              {OFFER.control}
            </p>
            <p className="relative mt-5 flex flex-wrap items-center gap-2.5 text-sm font-semibold text-white/60">
              One search across
              {BOARDS.map(({ name, icon }) => (
                <span key={name} className="inline-flex items-center gap-2 rounded-full bg-white/[0.07] py-1 pl-1 pr-3 text-white/85 ring-1 ring-white/10">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-gold-300" aria-hidden="true">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5">
                      {icon}
                    </svg>
                  </span>
                  {name}
                </span>
              ))}
            </p>
            <div className="relative mt-6 flex flex-wrap gap-3 border-t border-white/10 pt-6">
              <a href={SIGNUP_URL} className="group inline-flex h-14 items-center gap-3 rounded-full bg-gold-500 pl-6 pr-2 font-bold text-ink-950 transition-colors hover:bg-gold-300">
                {OFFER.ctaLong}
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-950 text-gold-400 transition-transform duration-500 group-hover:-rotate-45" aria-hidden="true">
                  →
                </span>
              </a>
              <a href={BROCHURE_URL} download="JobHunter-by-SuperMIA-brochure.pdf" className="inline-flex h-14 items-center gap-2 rounded-full border border-white/20 px-6 font-semibold text-white transition-colors hover:bg-white/10">
                Brochure (PDF)
              </a>
            </div>
          </div>
        </div>

        {/* Links (Navigation and Menu Spec, section 6) */}
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 md:grid-cols-3 lg:grid-cols-[1fr_0.9fr_1fr_1.5fr]">
          {FOOTER.map((col) => (
            <div key={col.title}>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-gold-300">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    {l.href.startsWith('/') && !l.download ? (
                      <Link href={l.href} className={link}>
                        {l.label}
                        {arrow}
                      </Link>
                    ) : (
                      <a href={l.href} className={link} {...(l.external ? { target: '_blank', rel: 'noopener' } : {})} {...(l.download ? { download: 'JobHunter-by-SuperMIA-brochure.pdf' } : {})}>
                        {l.label}
                        {arrow}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {/* Office */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-gold-300">Office</p>
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]">
              <a href={MAPS} target="_blank" rel="noopener noreferrer" className="group/a flex items-start gap-4 p-5 transition-colors hover:bg-white/[0.05]">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gold-400 text-ink-950" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
                    <circle cx="12" cy="9.5" r="2.5" />
                  </svg>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-semibold leading-snug text-white">{OFFICE.street}</span>
                  <span className="block text-[15px] font-medium text-white/70">{OFFICE.city}</span>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-gold-300">
                    Get directions
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover/a:translate-x-1">→</span>
                  </span>
                </span>
              </a>
              <div className="grid border-t border-white/10 sm:grid-cols-2 lg:grid-cols-1">
                <a href={`mailto:${OFFICE.email}`} className="group/a flex items-center gap-3 p-4 transition-colors hover:bg-white/[0.05] sm:border-r sm:border-white/10 lg:border-b lg:border-r-0">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-gold-300" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-4 w-4">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3 7 9 6 9-6" />
                    </svg>
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/45">Email</span>
                    <span className="block truncate text-sm font-semibold text-white group-hover/a:text-gold-300">{OFFICE.email}</span>
                  </span>
                </a>
                <a href={`https://${OFFICE.site}`} target="_blank" rel="noopener noreferrer" className="group/a flex items-center gap-3 border-t border-white/10 p-4 transition-colors hover:bg-white/[0.05] sm:border-t-0">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-gold-300" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-4 w-4">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
                    </svg>
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/45">Website</span>
                    <span className="block truncate text-sm font-semibold text-white group-hover/a:text-gold-300">{OFFICE.site} ↗</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </nav>

        <div className="flex flex-col items-start justify-between gap-5 border-t border-white/10 py-6 text-sm font-medium text-white/55 lg:flex-row lg:items-center">
          <p>© 2026 JobHunter by SuperMIA. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href={PRIVACY_URL} className="transition-colors hover:text-gold-300">
              Privacy Policy
            </Link>
            <Link href={TERMS_URL} className="transition-colors hover:text-gold-300">
              Terms and Conditions
            </Link>
            <span aria-hidden="true" className="hidden h-5 w-px bg-white/15 sm:block" />
            <span>
              by{' '}
              <a href={PARENT_URL} target="_blank" rel="noopener noreferrer" className="font-bold text-white transition-colors hover:text-gold-300">
                SuperMIA
              </a>
              <span className="mx-2 text-white/30">·</span>
              Botfinity Inc.
            </span>
            <span aria-hidden="true" className="hidden h-5 w-px bg-white/15 sm:block" />
            <span>
              Design &amp; Develop by{' '}
              <a href="https://softqubes.com/" target="_blank" rel="noopener noreferrer" className="font-bold text-white transition-colors hover:text-gold-300">
                Softqube Technologies LLC
              </a>
            </span>
            <a href="#main" className="group inline-flex items-center gap-3 font-semibold text-white transition-colors hover:text-gold-300">
              Back to top
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-transform duration-500 group-hover:-translate-y-1" aria-hidden="true">
                ↑
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Wordmark: a quiet, unfilled backdrop to close the page */}
      <div aria-hidden="true" className="relative select-none overflow-hidden whitespace-nowrap text-center font-display text-[min(17.5vw,19rem)] font-extrabold leading-[0.8] tracking-[-0.055em]">
        <span className="block text-white/[0.06]">JobHunter</span>
      </div>
    </footer>
  );
}
