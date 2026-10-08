'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { onIntroDone } from '@/lib/gsap';
import { DEMO, APP_URL, OFFER } from '@/content/site';

/*
 * Demo video popup. A few seconds after the intro it opens on tablets and desktops; on phones a small
 * playing preview slides in above the sticky button instead (a full-screen popup on phones gets in the way
 * and search engines penalise it), and tapping it opens the full popup. It shows once per visit and is
 * skipped while the demo section itself is on screen. Built as a fixed layer (not <dialog>) so the
 * custom cursor stays above it; focus stays inside while open and Escape closes it.
 */

const KEY = 'jh:demo-popup-seen';
const DELAY = 4500;
const ease = [0.16, 1, 0.3, 1];

const wasSeen = () => {
  try {
    return sessionStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
};
const markSeen = () => {
  try {
    sessionStorage.setItem(KEY, '1');
  } catch {
    /* private mode: it can show again next visit */
  }
};

const POINTS = ['Upload your resume once', 'Search LinkedIn, Indeed and Dice at once', 'A fit score and a drafted email for every role'];

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true" className="h-5 w-5">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export default function DemoPopup() {
  const [open, setOpen] = useState(false);
  const [peek, setPeek] = useState(false);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const panel = useRef(null);
  const video = useRef(null);
  const bar = useRef(null);
  const lastFocus = useRef(null);
  const heardSound = useRef(false);
  const lenis = useLenis();

  // Schedule the popup once the intro curtain has lifted
  useEffect(() => {
    let timer;
    const stop = onIntroDone(() => {
      timer = setTimeout(() => {
        if (wasSeen()) return;
        const demo = document.getElementById('demo')?.getBoundingClientRect();
        if (demo && demo.top < window.innerHeight && demo.bottom > 0) return;
        if (window.matchMedia('(min-width: 768px)').matches) {
          lastFocus.current = document.activeElement;
          setOpen(true);
        } else {
          setPeek(true);
        }
      }, DELAY);
    });
    return () => {
      clearTimeout(timer);
      stop();
    };
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setPeek(false);
    markSeen();
  }, []);

  const expand = () => {
    lastFocus.current = document.activeElement;
    setPeek(false);
    setOpen(true);
  };

  // While open: lock page scroll, start the video, keep focus inside, Escape closes
  useEffect(() => {
    if (!open) return undefined;
    lenis?.stop();
    const v = video.current;
    v?.play().catch(() => {});
    panel.current?.querySelector('[data-close]')?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key !== 'Tab' || !panel.current) return;
      const items = [...panel.current.querySelectorAll('a[href], button:not([tabindex="-1"])')];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      lenis?.start();
      lastFocus.current?.focus?.();
    };
  }, [open, lenis, close]);

  const toggle = () => {
    const v = video.current;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  const toggleSound = () => {
    const v = video.current;
    if (v.muted && !heardSound.current) {
      // First time with sound: start the voiceover from the top
      heardSound.current = true;
      v.currentTime = 0;
    }
    v.muted = !v.muted;
    v.play().catch(() => {});
  };

  const toDemo = () => {
    close();
    setTimeout(() => lenis?.scrollTo('#demo', { offset: -80 }), 50);
  };

  return (
    <>
      {/* Phones: small playing preview */}
      <AnimatePresence>
        {peek && (
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, ease }}
            className="fixed bottom-[92px] right-3 z-[45] w-[108px] md:hidden"
          >
            <button type="button" onClick={expand} aria-label="Watch the 47-second JobHunter AI demo" className="block w-full overflow-hidden rounded-[20px] bg-brand-950 p-1 shadow-[0_24px_50px_-16px_rgba(26,15,51,0.8)] ring-1 ring-white/10">
              <span className="relative block aspect-[9/16] overflow-hidden rounded-[16px]">
                <video className="absolute inset-0 h-full w-full object-cover" src={DEMO.src} poster={DEMO.poster} muted loop playsInline autoPlay preload="metadata" aria-hidden="true" />
                <span className="absolute inset-x-0 bottom-0 flex items-center gap-1.5 bg-gradient-to-t from-brand-950/90 to-transparent px-2 pb-2 pt-6 text-left text-[11px] font-bold text-white">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-500 text-ink-950">
                    <svg viewBox="0 0 24 24" className="ml-0.5 h-2.5 w-2.5" fill="currentColor" aria-hidden="true">
                      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.6-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
                    </svg>
                  </span>
                  Watch demo
                </span>
              </span>
            </button>
            <button type="button" onClick={close} aria-label="Close demo preview" className="absolute -left-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-ink-950 shadow-md ring-1 ring-brand-200">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true" className="h-3.5 w-3.5">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            data-lenis-prevent
          >
            <div aria-hidden="true" onClick={close} className="absolute inset-0 bg-brand-950/75 backdrop-blur-md" />

            <motion.div
              ref={panel}
              role="dialog"
              aria-modal="true"
              aria-labelledby="demo-popup-title"
              initial={{ y: 60, scale: 0.94, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 40, scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.7, ease }}
              className="grain relative grid max-h-full w-full max-w-[940px] grid-cols-1 overflow-y-auto rounded-[28px] bg-brand-950 text-white shadow-[0_60px_120px_-40px_rgba(0,0,0,0.9)] ring-1 ring-white/10 md:grid-cols-[auto_1fr] md:overflow-hidden md:rounded-[36px]"
            >
              <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgba(244,180,0,0.22),transparent)]" />

              <button
                type="button"
                data-close
                onClick={close}
                aria-label="Close the demo"
                className="absolute right-3 top-3 z-[3] flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/15 backdrop-blur transition-colors hover:bg-white/20"
              >
                <CloseIcon />
              </button>

              {/* Video */}
              <div className="relative z-[2] flex justify-center p-3 pb-0 md:p-4 md:pr-0">
                <div className="relative aspect-[9/16] h-[min(62svh,560px)] overflow-hidden rounded-[22px] bg-brand-900 md:h-[min(78svh,620px)] md:rounded-[26px]">
                  <video
                    ref={video}
                    className="absolute inset-0 h-full w-full cursor-pointer object-cover"
                    poster={DEMO.poster}
                    width={720}
                    height={1280}
                    preload="metadata"
                    muted
                    loop={muted}
                    playsInline
                    aria-label={DEMO.name}
                    onClick={toggle}
                    onPlay={() => setPlaying(true)}
                    onPause={() => setPlaying(false)}
                    onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
                    onTimeUpdate={(e) => {
                      if (bar.current) bar.current.style.transform = `scaleX(${e.currentTarget.currentTime / DEMO.seconds})`;
                    }}
                  >
                    <source src={DEMO.src} type="video/mp4" />
                  </video>

                  {!playing && (
                    <button type="button" onClick={toggle} aria-label="Play the demo" className="absolute inset-0 flex items-center justify-center bg-brand-950/30">
                      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-500 text-ink-950 shadow-lg">
                        <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" fill="currentColor" aria-hidden="true">
                          <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.6-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
                        </svg>
                      </span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={toggleSound}
                    aria-pressed={!muted}
                    aria-label={muted ? 'Play with sound' : 'Mute'}
                    className={`absolute left-3 top-3 flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-bold shadow-md transition-colors ${muted ? 'bg-gold-500 text-ink-950 hover:bg-gold-300' : 'bg-white/90 text-brand-700 hover:bg-white'}`}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4">
                      <path d="M11 5 6 9H3v6h3l5 4V5z" fill="currentColor" />
                      {muted ? <path d="m22 9-6 6M16 9l6 6" /> : <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />}
                    </svg>
                    {muted ? 'Sound on' : 'Mute'}
                  </button>

                  <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 bg-white/15">
                    <span ref={bar} className="block h-full origin-left scale-x-0 bg-gradient-to-r from-brand-400 to-gold-400 transition-transform duration-300 ease-linear" />
                  </span>
                </div>
              </div>

              {/* Copy */}
              <div className="relative z-[2] flex flex-col justify-center p-6 pt-5 sm:p-8 md:p-10 md:pl-9 lg:p-12">
                <p className="inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-gold-300">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold-400" />
                  47-second demo
                </p>
                <h2 id="demo-popup-title" className="mt-4 font-display text-[clamp(1.6rem,1.1rem+1.8vw,2.75rem)] font-extrabold leading-[1.06] tracking-[-0.035em]">
                  See{' '}
                  <span className="relative isolate inline-block">
                    JobHunter AI
                    <span aria-hidden="true" className="absolute inset-x-[-0.06em] bottom-[0.1em] -z-[1] h-[0.3em] -skew-x-6 rounded-[0.06em] bg-brand-500" />
                  </span>{' '}
                  find your next{' '}
                  <span className="relative inline-block bg-gradient-to-r from-gold-300 via-gold-400 to-brand-300 bg-clip-text pr-[0.04em] text-transparent">
                    role.
                    <svg viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true" className="absolute left-0 top-[88%] h-[0.2em] w-[92%] overflow-visible text-gold-400">
                      <path d="M4 17C70 7 160 4 296 13" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
                    </svg>
                  </span>
                </h2>
                <ul className="mt-6 hidden space-y-2.5 sm:block">
                  {POINTS.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-[15px] font-semibold text-brand-100">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-400 text-[11px] font-bold text-ink-950">✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <a href={APP_URL} className="group flex h-13 items-center gap-3 rounded-full bg-gold-500 pl-6 pr-1.5 text-[15px] font-bold text-ink-950 transition-colors hover:bg-gold-300">
                    {OFFER.ctaLong}
                    <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-950 text-gold-400 transition-transform duration-500 group-hover:-rotate-45">
                      →
                    </span>
                  </a>
                  <button type="button" onClick={toDemo} className="text-sm font-bold text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-gold-400">
                    See the chapters
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
