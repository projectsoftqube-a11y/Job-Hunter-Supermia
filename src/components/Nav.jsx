'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { gsap, useGSAP, onIntroDone } from '@/lib/gsap';
import { NAV, APP_URL, OFFER } from '@/content/site';

const ease = [0.16, 1, 0.3, 1];

function Logo({ light }) {
  return (
    <a href="#top" aria-label="Job Hunter home" className="group flex items-center">
      {light ? (
        <Image
          src="/brand/logo.png"
          alt="Job Hunter"
          width={2172}
          height={724}
          preload
          className="h-12 w-auto transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] sm:h-14 lg:h-[60px]"
        />
      ) : (
        <span className="flex items-center gap-3">
          <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-[0_10px_30px_-8px_rgba(244,180,0,0.55)]">
            <Image src="/brand/favicon.png" alt="" width={34} height={34} className="h-8 w-8 object-contain" />
          </span>
          <span className="font-display text-[1.375rem] font-extrabold leading-none tracking-[-0.03em] text-white">
            Job<span className="text-gold-400">Hunter</span>
          </span>
        </span>
      )}
    </a>
  );
}

export default function Nav() {
  const bar = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [active, setActive] = useState(null);
  const lenis = useLenis();
  const lastY = useRef(0);

  const sections = useRef([]);
  const hidden = useRef(false);
  const frame = useRef(0);

  useEffect(() => {
    sections.current = NAV.map((item) => [item.href, document.querySelector(item.href)]);
  }, []);

  useLenis(({ scroll }) => {
    // Only touch React state when something actually changes, and read layout at most every 6th frame
    const isScrolled = scroll > 60;
    setScrolled((v) => (v === isScrolled ? v : isScrolled));

    frame.current = (frame.current + 1) % 6;
    if (frame.current === 0) {
      const line = scroll + window.innerHeight * 0.35;
      let current = null;
      sections.current.forEach(([href, el]) => {
        if (el && el.offsetTop <= line) current = href;
      });
      setActive((v) => (v === current ? v : current));
    }

    if (!bar.current || open) return;
    const delta = scroll - lastY.current;
    lastY.current = scroll;
    const shouldHide = delta > 2 && scroll > 600 ? true : delta < -2 ? false : hidden.current;
    if (shouldHide !== hidden.current) {
      hidden.current = shouldHide;
      gsap.to(bar.current, { yPercent: shouldHide ? -140 : 0, duration: 0.7, ease: 'expo.out', overwrite: 'auto' });
    }
  });

  useGSAP(() => {
    gsap.set(bar.current, { yPercent: -140 });
    return onIntroDone(() => gsap.to(bar.current, { yPercent: 0, duration: 1.4, delay: 0.5, ease: 'expo.out' }));
  });

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);

  // Light styling everywhere (transparent over the hero, white glass once scrolled); dark only with the mobile menu open
  const light = !open;

  return (
    <>
      <header ref={bar} className="fixed inset-x-0 top-0 z-50">
        <div className="container-x pt-3 sm:pt-5">
          <nav
            aria-label="Main"
            className={`relative mx-auto grid h-[68px] grid-cols-[1fr_auto] items-center gap-4 rounded-[22px] transition-[max-width,background-color,border-color,padding,box-shadow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:grid-cols-[1fr_auto_1fr] ${
              open
                ? 'max-w-[1240px] border border-white/12 bg-brand-950/70 pl-3 pr-2 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.85)] backdrop-blur-2xl'
                : scrolled
                  ? 'max-w-[1240px] border border-brand-200/70 bg-white/80 pl-3 pr-2 shadow-[0_24px_60px_-30px_rgba(26,15,51,0.45)] backdrop-blur-2xl'
                  : 'max-w-[1920px] border border-transparent px-0'
            }`}
          >
            <Logo light={light} />

            {/* Centre capsule with a sliding hover highlight and an active-section dot */}
            <ul
              onMouseLeave={() => setHovered(null)}
              className="hidden items-center gap-1 lg:flex"
            >
              {NAV.map((item) => {
                const isActive = active === item.href;
                return (
                  <li key={item.href} className="relative">
                    <a
                      href={item.href}
                      onMouseEnter={() => setHovered(item.href)}
                      className={`relative z-[1] flex items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-2.5 text-[14px] font-semibold xl:px-5 xl:text-[15px] transition-colors duration-500 ${light ? 'text-ink-900' : 'text-white'}`}
                    >
                      {(hovered ?? active) === item.href && (
                        <motion.span layoutId="nav-pill" transition={{ duration: 0.5, ease }} className={`absolute inset-0 -z-[1] rounded-full ${light ? 'bg-white shadow-sm ring-1 ring-brand-200/70' : 'bg-white/[0.12] ring-1 ring-white/10'}`} />
                      )}
                      <span className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${isActive ? `scale-100 ${light ? 'bg-brand-600' : 'bg-gold-400'}` : 'scale-0 bg-transparent'}`} aria-hidden="true" />
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center justify-end gap-2">
              <a
                href={APP_URL}
                className="group relative hidden h-12 items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-gold-400 to-gold-500 pl-5 pr-1.5 text-[15px] font-bold text-ink-900 shadow-[0_10px_30px_-10px_rgba(244,180,0,0.8),inset_0_1px_0_rgba(255,255,255,0.5)] sm:flex"
              >
                <span aria-hidden="true" className="absolute inset-y-0 -left-1/2 w-1/3 skew-x-[-20deg] bg-white/50 blur-md transition-transform duration-1000 ease-out group-hover:translate-x-[420%]" />
                <span className="relative">{OFFER.cta}</span>
                <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-ink-900 text-gold-400 transition-transform duration-500 group-hover:rotate-[-45deg]" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? 'Close menu' : 'Open menu'}
                className={`relative flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur lg:hidden ${light ? 'border-brand-200 bg-white/70 text-ink-950' : 'border-white/15 bg-white/10 text-white'}`}
              >
                <span className={`absolute h-[2px] w-5 rounded bg-current transition-transform duration-500 ${open ? 'rotate-45' : '-translate-y-[4px]'}`} />
                <span className={`absolute h-[2px] w-5 rounded bg-current transition-transform duration-500 ${open ? '-rotate-45' : 'translate-y-[4px]'}`} />
              </button>
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: 'circle(0% at 92% 6%)' }}
            animate={{ clipPath: 'circle(150% at 92% 6%)' }}
            exit={{ clipPath: 'circle(0% at 92% 6%)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="grain fixed inset-0 z-40 flex flex-col justify-between overflow-hidden bg-brand-950 px-[clamp(16px,4.2vw,96px)] pb-10 pt-32 lg:hidden"
          >
            <div aria-hidden="true" className="pointer-events-none absolute -right-1/3 -top-1/3 h-[100vh] w-[100vh] bg-[radial-gradient(closest-side,rgba(75,46,131,0.7),transparent)]" />
            <ul className="relative z-[2] space-y-1">
              {NAV.map((item, i) => (
                <li key={item.href} className="overflow-hidden border-b border-white/10">
                  <motion.a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '110%' }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.07, ease }}
                    className="flex items-center justify-between py-4 font-display text-[clamp(2rem,8vw,3.5rem)] font-bold leading-tight text-white"
                  >
                    {item.label}
                    <span className="font-sans text-sm font-semibold text-gold-300">0{i + 1}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
              className="relative z-[2] grid gap-3"
            >
              <a href={APP_URL} className="flex h-14 items-center justify-center rounded-full bg-gold-500 font-bold text-ink-900">
                {OFFER.ctaLong}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
