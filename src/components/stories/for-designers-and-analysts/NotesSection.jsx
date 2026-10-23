'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { Header, DOTS_LIGHT } from './shared';

/*
 * Frame 4, "Practice": a portfolio review board. A case-study artboard sits on the canvas with numbered
 * comment pins, and the four interview prompts are the sticky notes those pins point to (real text: the
 * question is the H3, the hint below it). Beside the board, the paragraphs and a live walkthrough call;
 * below, the practice paragraph with a sample scorecard whose bars fill as you scroll. Decorative mocks
 * are aria-hidden sample data.
 */

const NOTE = [
  { bg: 'bg-gold-200', tilt: -2, pin: 'bg-gold-500' },
  { bg: 'bg-emerald-100', tilt: 1.5, pin: 'bg-emerald-500' },
  { bg: 'bg-rose-100', tilt: 1, pin: 'bg-rose-500' },
  { bg: 'bg-brand-100', tilt: -1.5, pin: 'bg-brand-600' },
];
// Where the numbered comment pins sit on the case-study artboard (percent)
const PINS = [
  ['12%', '22%'],
  ['58%', '18%'],
  ['30%', '64%'],
  ['80%', '58%'],
];
const SCORES = [
  ['Clarity', 78],
  ['Confidence', 70],
  ['Technical depth', 64],
];

function CaseStudy() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[560px] rounded-[20px] bg-white p-4 shadow-[0_24px_44px_-28px_rgba(26,15,51,0.6)] ring-1 ring-brand-100 sm:p-5">
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-bold text-ink-900/55">Case study · Checkout redesign</span>
        <span className="flex gap-1">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-gold-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
        </span>
      </div>
      <div className="mt-3 grid grid-cols-[1.2fr_1fr] gap-3">
        <div className="rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 p-3">
          <span className="block h-2 w-2/3 rounded-full bg-white/70" />
          <span className="mt-1.5 block h-2 w-1/2 rounded-full bg-white/40" />
          <span className="mt-4 flex gap-1.5">
            <span className="h-8 flex-1 rounded-md bg-white/20" />
            <span className="h-8 flex-1 rounded-md bg-gold-300" />
          </span>
        </div>
        <div className="flex items-end gap-1.5 rounded-xl bg-emerald-50 p-3">
          {[35, 55, 45, 80, 65].map((h, i) => (
            <span key={i} className="flex-1 rounded-t-[3px] bg-emerald-500" style={{ height: `${h * 0.7}px` }} />
          ))}
        </div>
      </div>
      <div className="mt-3 space-y-1.5">
        <span className="block h-2 w-full rounded-full bg-brand-100" />
        <span className="block h-2 w-[80%] rounded-full bg-brand-100" />
      </div>
      {PINS.map(([l, t], i) => (
        <span key={i} data-pin-dot className={`absolute flex h-7 w-7 items-center justify-center rounded-full rounded-bl-[4px] text-[12px] font-extrabold text-white shadow-[0_6px_12px_-6px_rgba(0,0,0,0.6)] ring-2 ring-white ${NOTE[i].pin}`} style={{ left: l, top: t }}>
          {i + 1}
        </span>
      ))}
    </div>
  );
}

export default function NotesSection({ s }) {
  const root = useRef(null);
  const paras = s.blocks.filter((b) => b.type === 'p');
  const questions = s.blocks.find((b) => b.type === 'questions')?.items || [];
  const [p1, p2, p3] = paras;

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Notes stick onto the board, pins drop onto the case study
        const notes = q('[data-note]');
        gsap.set(notes, { y: -36, rotation: (i) => (i % 2 ? 6 : -6), opacity: 0, scale: 1.06 });
        ScrollTrigger.batch(notes, { start: 'top 92%', once: true, onEnter: (els) => gsap.to(els, { y: 0, rotation: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.9, ease: 'back.out(1.6)', overwrite: true }) });
        gsap.from(q('[data-pin-dot]'), { scale: 0, stagger: 0.12, duration: 0.6, ease: 'back.out(2.4)', scrollTrigger: { trigger: q('[data-board]')[0], start: 'top 75%', once: true } });
        gsap.from(q('[data-copy] > *'), { y: 30, opacity: 0, stagger: 0.1, duration: 1.1, scrollTrigger: { trigger: q('[data-copy]')[0], start: 'top 85%', once: true } });

        // Scorecard bars fill and the readiness score counts as the strip scrolls in
        const num = q('[data-ready]')[0];
        const counter = { v: 0 };
        num.textContent = '0.0';
        gsap
          .timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: q('[data-score]')[0], start: 'top 85%', end: 'center 55%', scrub: 0.4 } })
          .fromTo(q('[data-fill]'), { scaleX: 0 }, { scaleX: 1, stagger: 0.12, duration: 0.8 }, 0)
          .to(counter, { v: 7.6, duration: 1, onUpdate: () => (num.textContent = counter.v.toFixed(1)) }, 0);
        return () => {
          num.textContent = '7.6';
        };
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id={s.id} aria-labelledby={`${s.id}-title`} className="relative scroll-mt-24 overflow-hidden bg-light-lavender py-16 sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_35%_at_90%_10%,rgba(196,179,234,0.6),transparent),radial-gradient(35%_35%_at_5%_95%,rgba(252,211,77,0.16),transparent)]" />
      <div className="container-x relative">
        <Header s={s} n={4} wide />

        <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-10 sm:mt-16 lg:grid-cols-12 lg:gap-12">
          {/* Copy and the live walkthrough */}
          <div data-copy className="flex min-w-0 flex-col gap-5 lg:col-span-5">
            {[p1, p2].filter(Boolean).map((p) => (
              <p key={p.text.slice(0, 24)} className="text-[17px] leading-[1.75] text-ink-900/80 sm:text-[18px]">
                <Rich text={p.text} />
              </p>
            ))}
            <div aria-hidden="true" className="relative mt-auto overflow-hidden rounded-[26px] bg-brand-950 p-5 text-white sm:p-6">
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,rgba(109,76,176,0.6),transparent)]" />
              <div className="relative flex items-center justify-between">
                <span className="flex items-center gap-2 text-[12px] font-bold">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-400 text-ink-950">
                    <Icon name="mic" className="h-3.5 w-3.5" />
                  </span>
                  Live walkthrough
                </span>
                <span className="flex gap-1.5 text-[11px] font-bold">
                  <span className="rounded-full bg-white/10 px-2.5 py-1">Role &amp; Knowledge</span>
                  <span className="hidden rounded-full bg-gold-400 px-2.5 py-1 text-ink-950 sm:inline">Practical &amp; Behavioral</span>
                </span>
              </div>
              <span className="relative mt-4 flex h-8 items-center gap-[3px]">
                {Array.from({ length: 34 }, (_, i) => (
                  <span key={i} className="flex-1 rounded-full bg-gradient-to-t from-brand-400 to-gold-400" style={{ height: `${25 + ((i * 37) % 75)}%` }} />
                ))}
              </span>
              <span className="relative mt-4 block rounded-2xl rounded-tl-md bg-white/10 px-4 py-3 text-[14px] font-semibold">“Why that metric, and not conversion rate?”</span>
              <span className="relative mt-2 block text-right text-[12px] font-semibold text-white/55">Follow-up question</span>
            </div>
          </div>

          {/* The review board */}
          <div data-board className={`relative min-w-0 rounded-[32px] bg-white/80 p-4 ring-1 ring-brand-200 sm:p-7 lg:col-span-7 ${DOTS_LIGHT}`}>
            <CaseStudy />
            <ol className="relative mt-5 grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2 sm:gap-5">
              {questions.map((it, i) => {
                const n = NOTE[i % 4];
                return (
                  <li key={it.q} data-note className="min-w-0">
                    <div className={`relative h-full rounded-[6px] p-5 pt-7 shadow-[0_14px_24px_-16px_rgba(26,15,51,0.55)] sm:p-6 sm:pt-8 ${n.bg}`} style={{ transform: `rotate(${n.tilt}deg)` }}>
                      <span aria-hidden="true" className="absolute left-1/2 top-0 h-5 w-16 -translate-x-1/2 -translate-y-1/2 rotate-[-3deg] rounded-[3px] bg-white/70 shadow-[0_2px_4px_rgba(0,0,0,0.08)]" />
                      <span aria-hidden="true" className={`absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full rounded-bl-[4px] text-[12px] font-extrabold text-white ${n.pin}`}>
                        {i + 1}
                      </span>
                      <h3 className="pr-9 font-display text-[1.15rem] font-bold leading-snug tracking-[-0.015em] text-ink-950">{it.q}</h3>
                      {it.hint && (
                        <p className="mt-2.5 text-[15px] leading-relaxed text-ink-950/75">
                          <Rich text={it.hint} />
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* Practice, then the scorecard */}
        {p3 && (
          <div data-score className="mt-12 grid grid-cols-[minmax(0,1fr)] items-center gap-8 rounded-[32px] bg-brand-950 p-7 text-white sm:p-10 lg:mt-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14 lg:p-12">
            <p className="text-[17px] leading-[1.75] text-white/85 sm:text-[18px]">
              <Rich text={p3.text} tone="dark" />
            </p>
            <div aria-hidden="true" className="rounded-[26px] bg-white p-6 text-ink-950 sm:p-7">
              <div className="flex items-end justify-between gap-4">
                <span>
                  <span className="block text-[11.5px] font-bold uppercase tracking-[0.14em] text-brand-500">Readiness · sample</span>
                  <span className="mt-1 flex items-baseline font-display font-extrabold leading-none tracking-[-0.05em]">
                    <span data-ready className="text-[clamp(3rem,2.2rem+2.4vw,4.5rem)] text-brand-700">
                      7.6
                    </span>
                    <span className="ml-1 text-[1.3rem] tracking-normal text-ink-900/35">/10</span>
                  </span>
                </span>
                <span className="flex flex-col items-end gap-1.5 text-[11.5px] font-bold">
                  <span className="rounded-full bg-light-lavender px-2.5 py-1 text-brand-700">Guided practice</span>
                  <span className="rounded-full bg-ink-950 px-2.5 py-1 text-gold-300">Real simulation next</span>
                </span>
              </div>
              <div className="mt-5 space-y-3.5">
                {SCORES.map(([l, v]) => (
                  <div key={l}>
                    <span className="flex justify-between text-[13px] font-bold">
                      <span>{l}</span>
                      <span className="text-ink-900/55">{v}%</span>
                    </span>
                    <span className="mt-1.5 block h-2.5 overflow-hidden rounded-full bg-brand-100">
                      <span data-fill className="block h-full origin-left rounded-full bg-gradient-to-r from-brand-500 to-emerald-400" style={{ width: `${v}%` }} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
