'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap';
import { NAV, APP_URL, OFFER, PRIVACY_URL, TERMS_URL, PARENT_URL } from '@/content/site';

const PDF = '/brochure/job-hunter-brochure.pdf';
const OFFICE = {
  street: '2451 W Grapevine Mills Cir #547',
  city: 'Grapevine, TX 76051',
  site: 'supermia.ai',
  email: 'hello@supermia.ai',
};
const MAPS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${OFFICE.street}, ${OFFICE.city}`)}`;

/*
 * Dark footer that rises over the light final section with a rounded top. A giant outlined wordmark
 * fills with gold from the bottom as you reach the end of the page.
 */
export default function Footer() {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Fills once the wordmark is in view, so it always completes even at the very end of the page
        const fill = gsap.fromTo(q('[data-fill]'), { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut', paused: true });
        ScrollTrigger.create({ trigger: q('[data-wordmark]')[0], start: 'top 98%', onEnter: () => fill.play(), onLeaveBack: () => fill.reverse() });
        gsap.from(q('[data-col]'), { y: 30, opacity: 0, stagger: 0.08, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: root.current, start: 'top 85%', once: true } });
      });
    },
    { scope: root }
  );

  const link = 'group/l inline-flex items-center gap-2 text-[15px] font-medium text-white/80 transition-colors hover:text-gold-300';
  const arrow = (
    <span aria-hidden="true" className="-translate-x-1 opacity-0 transition-all duration-300 group-hover/l:translate-x-0 group-hover/l:opacity-100">
      →
    </span>
  );

  return (
    <footer ref={root} className="relative -mt-24 overflow-hidden rounded-t-[clamp(28px,4vw,64px)] bg-brand-950 pt-16 text-white sm:-mt-32 sm:pt-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_40%_at_15%_0%,rgba(109,76,176,0.5),transparent),radial-gradient(40%_35%_at_90%_100%,rgba(244,180,0,0.14),transparent)]" />

      <div className="container-x relative">
        {/* Top band: pitch and the two main actions */}
        <div data-col className="flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-12 lg:flex-row lg:items-end">
          <div>
            <Image
              src="/brand/logo.png"
              alt="Job Hunter"
              width={2172}
              height={724}
              className="h-14 w-auto brightness-0 invert sm:h-16"
            />
            <p className="mt-6 max-w-md font-display text-[clamp(1.5rem,1rem+1.6vw,2.5rem)] font-bold leading-[1.15] tracking-[-0.03em]">
              Find the role, practice the interview, <span className="text-gold-400">land the offer.</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={APP_URL} className="group inline-flex h-14 items-center gap-3 rounded-full bg-gold-500 pl-6 pr-2 font-bold text-ink-950 transition-colors hover:bg-gold-300">
              {OFFER.ctaLong}
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-950 text-gold-400 transition-transform duration-500 group-hover:-rotate-45" aria-hidden="true">
                →
              </span>
            </a>
            <a href={PDF} download="JobHunter-AI-by-SuperMIA-brochure.pdf" className="inline-flex h-14 items-center gap-2 rounded-full border border-white/20 px-6 font-semibold text-white transition-colors hover:bg-white/10">
              Brochure (PDF)
            </a>
          </div>
        </div>

        {/* Links */}
        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 py-12 md:grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_1.6fr]">
          <div data-col>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-gold-300">Product</p>
            <ul className="space-y-3">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={`/${n.href}`} className={link}>
                    {n.label}
                    {arrow}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div data-col>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-gold-300">Account</p>
            <ul className="space-y-3">
              <li>
                <a href={APP_URL} className={link}>
                  Sign up or log in{arrow}
                </a>
              </li>
              <li>
                <Link href="/#brochure" className={link}>
                  Brochure{arrow}
                </Link>
              </li>
            </ul>
          </div>
          <div data-col>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-gold-300">Searches</p>
            <ul className="space-y-3">
              {['LinkedIn', 'Indeed', 'Dice'].map((c) => (
                <li key={c} className="flex items-center gap-2.5 text-[15px] font-medium text-white/80">
                  <span className="flex h-5 w-5 items-center justify-center rounded-[5px] bg-white">
                    <Image src={`/logos/${c.toLowerCase()}.png`} alt="" width={14} height={14} className="h-3.5 w-3.5 object-contain" />
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
          {/* Office */}
          <div data-col className="col-span-2 md:col-span-3 lg:col-span-1">
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
              <div className="grid border-t border-white/10 sm:grid-cols-2">
                <a href={`mailto:${OFFICE.email}`} className="group/a flex items-center gap-3 p-4 transition-colors hover:bg-white/[0.05] sm:border-r sm:border-white/10">
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
          <p>© 2026 Job Hunter. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href={PRIVACY_URL} className="transition-colors hover:text-gold-300">
              Privacy Policy
            </Link>
            <Link href={TERMS_URL} className="transition-colors hover:text-gold-300">
              Terms &amp; Conditions
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
            <a href="#top" className="group inline-flex items-center gap-3 font-semibold text-white transition-colors hover:text-gold-300">
              Back to top
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-transform duration-500 group-hover:-translate-y-1" aria-hidden="true">
                ↑
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Wordmark: outline, filled with gold from the bottom on scroll */}
      <div data-wordmark aria-hidden="true" className="relative select-none overflow-hidden whitespace-nowrap text-center font-display text-[min(17.5vw,19rem)] font-extrabold leading-[0.8] tracking-[-0.055em]">
        <span className="block text-white/[0.06]">JobHunter</span>
        <span data-fill className="absolute inset-0 block bg-gradient-to-b from-gold-300 via-gold-400 to-brand-500 bg-clip-text text-transparent">
          JobHunter
        </span>
      </div>
    </footer>
  );
}
