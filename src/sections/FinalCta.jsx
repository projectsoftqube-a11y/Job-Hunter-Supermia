'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap';
import { SplitHeading } from '@/components/Reveal';
import { APP_URL, OFFER } from '@/content/site';

/*
 * Closing call to action as a departures board. Split-flap letters spin through random characters
 * and settle on the rows; the last row is your next role, now boarding. A boarding pass then prints
 * out of a slot under the board, and its tear-off stub is the sign-up button.
 * The board rows are illustrative.
 */

const COLS = [
  { key: 'time', label: 'Time', w: 5, hideSm: true },
  { key: 'dest', label: 'Destination', w: 17 },
  { key: 'gate', label: 'Step', w: 2, hideSm: true },
  { key: 'status', label: 'Status', w: 8, hideSm: true },
];
const ROWS = [
  { time: '09:00', dest: 'FRONTEND ENGINEER', destSm: 'FRONTEND DEV', gate: '01', status: 'PRACTICE' },
  { time: '10:30', dest: 'PRODUCT DESIGNER', destSm: 'PRODUCT DESIGN', gate: '02', status: 'TAILORED' },
  { time: '13:15', dest: 'DATA ANALYST', gate: '03', status: 'APPLIED' },
  { time: 'NOW', dest: 'YOUR NEXT ROLE', gate: '04', status: 'BOARDING', live: true },
];
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:';
const PLANE = 'M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z';

function Flaps({ text, width, live }) {
  const chars = text.padEnd(width, ' ').slice(0, width).split('');
  return (
    <span className="flex gap-[3px]">
      {chars.map((c, i) => (
        <span
          key={i}
          className={`relative flex h-[1.7em] w-[1.2em] items-center justify-center overflow-hidden rounded-[4px] bg-[linear-gradient(180deg,#2c1b52_0%,#2c1b52_49.5%,#120a24_49.5%,#120a24_51%,#25163f_51%,#25163f_100%)] font-display text-[1em] font-bold leading-none shadow-[0_2px_3px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.06)] ${live ? 'text-gold-400' : 'text-white'}`}
        >
          <span data-flap data-final={c} className="relative block origin-center">
            {c === ' ' ? ' ' : c}
          </span>
          {/* hinge pins */}
          <span aria-hidden="true" className="absolute left-0 top-1/2 h-[3px] w-[2px] -translate-y-1/2 rounded-r-sm bg-black/70" />
          <span aria-hidden="true" className="absolute right-0 top-1/2 h-[3px] w-[2px] -translate-y-1/2 rounded-l-sm bg-black/70" />
        </span>
      ))}
    </span>
  );
}

function Barcode() {
  const bars = [2, 1, 3, 1, 1, 2, 4, 1, 2, 1, 1, 3, 2, 1, 2, 4, 1, 1, 3, 1, 2, 2, 1, 3, 1, 2, 1, 4, 2, 1];
  return (
    <span aria-hidden="true" className="flex h-10 items-stretch gap-[2px]">
      {bars.map((w, i) => (
        <span key={i} className={i % 2 ? 'bg-transparent' : 'bg-ink-950'} style={{ width: w * 1.5 }} />
      ))}
    </span>
  );
}

export default function FinalCta() {
  const root = useRef(null);
  const clock = useRef(null);

  // Live clock on the board
  useEffect(() => {
    const tick = () => {
      if (clock.current) clock.current.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const flaps = q('[data-flap]');
        const rand = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

        gsap.set(q('[data-ticket]'), { yPercent: -95, rotation: 0 });
        gsap.set(q('[data-board]'), { y: 60, opacity: 0 });

        // Every flap spins through random characters, row by row, then lands on its letter
        const spin = () => {
          flaps.forEach((el, i) => {
            const final = el.dataset.final;
            const row = Number(el.closest('[data-row]').dataset.row);
            const steps = 6 + Math.floor(Math.random() * 10);
            const tl = gsap.timeline({ delay: row * 0.22 + (i % 30) * 0.012 });
            for (let k = 0; k < steps; k += 1) {
              tl.call(() => (el.textContent = rand())).fromTo(el, { yPercent: -40, scaleY: 0.4 }, { yPercent: 0, scaleY: 1, duration: 0.055, ease: 'none' });
            }
            tl.call(() => (el.textContent = final === ' ' ? ' ' : final)).fromTo(el, { yPercent: -40, scaleY: 0.4 }, { yPercent: 0, scaleY: 1, duration: 0.12, ease: 'back.out(3)' });
          });
        };

        const intro = gsap.timeline({ paused: true });
        intro
          .to(q('[data-board]'), { y: 0, opacity: 1, duration: 1, ease: 'expo.out' })
          .add(spin, 0.3)
          ;

        ScrollTrigger.create({ trigger: q('[data-board]')[0], start: 'top 80%', once: true, onEnter: () => intro.play() });

        // The boarding pass prints out of the board as you scroll, and slides back in if you scroll up
        gsap
          .timeline({ scrollTrigger: { trigger: q('[data-board]')[0], start: 'top 65%', end: 'top 15%', scrub: 0.6 } })
          .to(q('[data-ticket]'), { yPercent: 0, rotation: -1.5, ease: 'power1.out' })
          .fromTo(q('[data-stub-cta]'), { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, ease: 'back.out(2)', duration: 0.3 }, 0.65);
        gsap.from(q('[data-head] > *'), { y: 36, opacity: 0, stagger: 0.08, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: root.current, start: 'top 80%', once: true } });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} aria-labelledby="cta-title" className="relative overflow-hidden bg-light-lavender pb-[156px] pt-[60px] sm:pb-52 sm:pt-32 lg:pb-60 lg:pt-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_40%_at_50%_45%,rgba(196,179,234,0.6),transparent),radial-gradient(35%_30%_at_15%_90%,rgba(252,211,77,0.2),transparent)]" />

      <div className="container-x relative">
        {/* Heading */}
        <div data-head className="mx-auto max-w-4xl text-center">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold-500" />
            Your next step
          </p>
          <SplitHeading id="cta-title" className="font-display text-hero font-extrabold text-ink-950">
            Your next offer starts with practice.
          </SplitHeading>
          <p className="mx-auto mt-6 max-w-xl text-lead font-medium text-ink-900/65">Search smarter, apply with a resume that fits, and rehearse until the real interview feels familiar.</p>
        </div>

        <div className="relative mx-auto mt-10 w-full sm:mt-14 sm:w-fit sm:max-w-full lg:mt-16">
          {/* Departures board */}
          <div data-board className="relative z-[2] rounded-[28px] bg-brand-950 p-4 shadow-[0_60px_120px_-50px_rgba(26,15,51,0.9)] ring-1 ring-white/5 sm:p-7">
            <div className="mb-5 flex items-center justify-between gap-4 px-1 text-white">
              <span className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-400 text-ink-950" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 -rotate-45">
                    <path d={PLANE} />
                  </svg>
                </span>
                <span>
                  <span className="block font-display text-base font-extrabold tracking-[0.12em] sm:text-lg">DEPARTURES</span>
                  <span className="block text-[11px] font-semibold text-brand-200">To your next offer</span>
                </span>
              </span>
              <span ref={clock} className="whitespace-nowrap font-mono text-base font-bold tabular-nums text-gold-300 sm:text-2xl">
                --:--
              </span>
            </div>

            <div role="table" aria-label="Job hunt departures" className="text-[min(1.2rem,calc((100vw-120px)/18))] sm:text-[clamp(0.5rem,0.3rem+0.85vw,1.2rem)]">
              <div role="row" className="mb-2 flex gap-[0.9em] px-1 sm:gap-[1.4em]">
                {COLS.map((c) => (
                  <span key={c.key} role="columnheader" className={`shrink-0 ${c.hideSm ? 'hidden sm:block' : ''}`} style={{ width: `calc(${c.w * 1.2}em + ${(c.w - 1) * 3}px)` }}>
                    <span className="block whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.12em] text-brand-300 sm:text-xs">{c.label}</span>
                  </span>
                ))}
              </div>
              <div className="space-y-[0.4em]">
                {ROWS.map((r, ri) => (
                  <div key={r.dest} role="row" data-row={ri} className={`flex gap-[0.9em] rounded-lg p-1 sm:gap-[1.4em] ${r.live ? 'bg-gold-400/10 ring-1 ring-gold-400/30' : ''}`}>
                    {COLS.map((c) => (
                      <span key={c.key} role="cell" aria-label={r[c.key]} className={c.hideSm ? 'hidden sm:block' : ''}>
                        {c.key === 'dest' ? (
                          <>
                            <span className="sm:hidden">
                              <Flaps text={r.destSm || r.dest} width={14} live={r.live} />
                            </span>
                            <span className="hidden sm:block">
                              <Flaps text={r.dest} width={c.w} live={r.live} />
                            </span>
                          </>
                        ) : (
                          <Flaps text={r[c.key]} width={c.w} live={r.live && c.key === 'status'} />
                        )}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-5 flex items-center gap-2 px-1 text-xs font-semibold text-brand-200">
              <span className="h-2 w-2 animate-pulse rounded-full bg-gold-400" />
              Final call: your next role is boarding now.
            </p>
          </div>

          {/* Boarding pass: slides down from behind the board */}
          <div className="relative z-[1] mx-auto -mt-10 w-[min(820px,94%)]">
            <div data-ticket className="relative pt-10">
              <div className="relative grid overflow-hidden rounded-[22px] bg-white shadow-[0_40px_80px_-40px_rgba(26,15,51,0.6),0_0_0_1px_rgba(26,15,51,0.05)] sm:grid-cols-[1fr_250px]">
                {/* Main part */}
                <div className="relative p-5 sm:p-7">
                  <p className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.18em] text-brand-600">
                    Boarding pass
                    <span className="text-ink-900/40">Job Hunter</span>
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    <span>
                      <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-ink-900/45">From</span>
                      <span className="block font-display text-[clamp(1.4rem,1rem+2vw,2.75rem)] font-extrabold leading-none tracking-[-0.04em] text-ink-950">SEARCH</span>
                    </span>
                    <span className="flex flex-1 items-center gap-2" aria-hidden="true">
                      <span className="h-px flex-1 border-t-2 border-dashed border-brand-200" />
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 rotate-45 text-brand-600">
                        <path d={PLANE} />
                      </svg>
                      <span className="h-px flex-1 border-t-2 border-dashed border-brand-200" />
                    </span>
                    <span className="text-right">
                      <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-ink-900/45">To</span>
                      <span className="block font-display text-[clamp(1.4rem,1rem+2vw,2.75rem)] font-extrabold leading-none tracking-[-0.04em] text-brand-600">OFFER</span>
                    </span>
                  </div>
                  <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-dashed border-ink-900/15 pt-4 text-xs">
                    {[
                      ['Passenger', 'You'],
                      ['Class', 'Prepared'],
                      ['Seat', '1A'],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-[10px] font-bold uppercase tracking-[0.06em] text-ink-900/45 sm:text-xs sm:tracking-[0.12em]">{k}</dt>
                        <dd className="mt-1 font-display text-sm font-extrabold text-ink-950 sm:text-base">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                {/* Stub: the sign-up button, lifts like it is being torn off */}
                <a
                  href={APP_URL}
                                    className="group relative flex flex-col items-center justify-center gap-4 border-t-2 border-dashed border-ink-900/20 bg-gold-400 p-6 text-ink-950 transition-colors duration-300 hover:bg-gold-300 sm:border-l-2 sm:border-t-0"
                >
                  <span data-stub-cta className="flex flex-col items-center gap-3 text-center">
                    <span className="text-[11px] font-bold uppercase tracking-[0.16em]">Gate open</span>
                    <span className="whitespace-nowrap font-display text-lg font-extrabold leading-tight tracking-[-0.02em]">{OFFER.ctaLong}</span>
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink-950 text-gold-400 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                      →
                    </span>
                  </span>
                  <Barcode />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
