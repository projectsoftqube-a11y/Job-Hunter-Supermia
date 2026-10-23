'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap';
import CreativeHeading from '@/components/CreativeHeading';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { Block } from '@/components/page/Blocks';
import { Dawn, h2Class } from './for-people-returning-to-work/parts';

/*
 * "The Gentle Restart": the returning-to-work page told as one slow sunrise.
 *   1. The break: a career line with a gap in it, and a bridge that draws itself across the gap as you
 *      scroll; the four things that feel hard sit underneath as stepping stones.
 *   2. Guided practice: a pinned practice room. As the four steps pass, a ten-step confidence strip
 *      fills, the scorecard arrives and the switch moves from guided practice (hints) to real simulation.
 *   3. Your gap: the three-part answer and the example beside a breathing circle (practice at your own
 *      pace), then the follow-up questions as soft speech bubbles.
 *   4. Skills that still match: a dusk band where the sun rises and your skills meet today's postings.
 * Everything is code-drawn (no photos). Every string comes from the page module and is server
 * rendered. Motion is slow and soft, transform/opacity only, one trigger per scene, and only with
 * prefers-reduced-motion: no-preference; the pinned scene runs on wide, tall screens only.
 */

const PIN = `(min-width: 1024px) and (min-height: 800px) and ${MOTION_OK}`;
const SOFT = 'power2.out';
const pick = (s, type, n = 0) => (s.blocks || []).filter((b) => b.type === type)[n];
const others = (s, types) => (s.blocks || []).filter((b) => !types.includes(b.type));

/** Heading row used by every chapter: marker and h2 on the left, the intro on the right. */
function HeadRow({ s, n, dark = false }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] items-end gap-8 lg:grid-cols-12 lg:gap-14 xl:gap-20">
      <div data-rise className="min-w-0 lg:col-span-7">
        <Dawn n={n} eyebrow={s.eyebrow} dark={dark} />
        <CreativeHeading id={`${s.id}-title`} lines={s.h2} tone={dark ? 'dark' : 'light'} className={`mt-7 ${dark ? 'text-white' : 'text-ink-950'} ${h2Class}`} />
      </div>
      {s.intro && (
        <p data-rise className={`min-w-0 border-l-2 border-gold-400 pl-5 text-[clamp(1.05rem,0.95rem+0.35vw,1.25rem)] font-medium leading-relaxed lg:col-span-5 ${dark ? 'text-brand-100' : 'text-ink-900/70'}`}>
          <Rich text={s.intro} tone={dark ? 'dark' : 'light'} />
        </p>
      )}
    </div>
  );
}

function Rest({ blocks }) {
  if (!blocks.length) return null;
  return (
    <div className="mt-10 space-y-6">
      {blocks.map((b, i) => (
        <Block key={i} b={b} />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ 1. The break */

const CARD_TINTS = ['bg-[#fff4e0] text-gold-800', 'bg-[#f3eefe] text-brand-600', 'bg-[#ffeef0] text-rose-600', 'bg-[#e9f7f1] text-emerald-700'];
const REASONS = ['children', 'caring', 'health', 'study', 'a move', 'a layoff'];

function WhatFeelsHard({ s, n }) {
  const ref = useRef(null);
  const cards = pick(s, 'cards');
  const paras = (s.blocks || []).filter((b) => b.type === 'p');
  const rest = others(s, ['cards', 'p']);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(q('[data-rise]'), { y: 36, opacity: 0, stagger: 0.14, duration: 1.6, ease: SOFT, scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true } });
        ScrollTrigger.batch(q('[data-stone]'), {
          start: 'top 88%',
          once: true,
          onEnter: (els) => gsap.from(els, { y: 40, opacity: 0, stagger: 0.12, duration: 1.6, ease: SOFT }),
        });
        gsap.from(q('[data-calm]'), { y: 30, opacity: 0, duration: 1.6, ease: SOFT, scrollTrigger: { trigger: q('[data-calm]')[0], start: 'top 90%', once: true } });

        // The bridge draws across the gap; a small walker crosses it and the far side warms up
        const bridge = q('[data-bridge]')[0];
        const walker = q('[data-walker]')[0];
        if (!bridge || !walker) return;
        const len = bridge.getTotalLength();
        const state = { p: 0 };
        const place = () => {
          const pt = bridge.getPointAtLength(state.p * len);
          walker.setAttribute('transform', `translate(${pt.x - 820} ${pt.y - 180})`);
        };
        gsap
          .timeline({
            defaults: { ease: 'none' },
            scrollTrigger: { trigger: q('[data-break]')[0], start: 'top 72%', end: 'bottom 38%', scrub: true },
          })
          .fromTo(bridge, { strokeDashoffset: 1.02 }, { strokeDashoffset: 0, duration: 1 }, 0)
          .fromTo(state, { p: 0 }, { p: 1, duration: 1, onUpdate: place }, 0)
          .fromTo(q('[data-far]'), { opacity: 0.35 }, { opacity: 1, duration: 0.3 }, 0.7)
          .fromTo(q('[data-sun]'), { y: 30, opacity: 0.4 }, { y: 0, opacity: 1, duration: 0.45 }, 0.55)
          .fromTo(q('[data-label-far]'), { opacity: 0.4 }, { opacity: 1, duration: 0.2 }, 0.85);
        place();
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id={s.id} aria-labelledby={`${s.id}-title`} className="relative scroll-mt-24 overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#fff8ec_42%,#faf6ff_100%)] pb-16 pt-20 sm:pb-20 sm:pt-24">
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-10 h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(closest-side,rgba(252,211,77,0.28),transparent)]" />

      <div className="container-x relative">
        <HeadRow s={s} n={n} />

        {/* The career line, the gap and the bridge */}
        <div data-break aria-hidden="true" className="relative mt-12 rounded-[36px] bg-white/80 p-5 shadow-[0_24px_44px_-34px_rgba(138,90,0,0.45)] ring-1 ring-gold-200/70 sm:p-8 lg:mt-16 lg:p-10">
          <svg viewBox="0 0 1200 230" className="block h-auto w-full overflow-visible [transform:translateZ(0)]">
            <defs>
              <linearGradient id="rtwBridge" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#9b7fd4" />
                <stop offset="100%" stopColor="#f4b400" />
              </linearGradient>
              <linearGradient id="rtwFar" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#fcd34d" />
                <stop offset="100%" stopColor="#f4b400" />
              </linearGradient>
              <radialGradient id="rtwMist">
                <stop offset="0%" stopColor="#ede9fe" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ede9fe" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="rtwSunGlow">
                <stop offset="0%" stopColor="#fcd34d" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#fcd34d" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Before the break */}
            <path d="M40 180H380" stroke="#4b2e83" strokeWidth="6" strokeLinecap="round" />
            {[100, 190, 280].map((x) => (
              <circle key={x} cx={x} cy="180" r="7" fill="#fff" stroke="#4b2e83" strokeWidth="3" />
            ))}
            {/* The gap */}
            <ellipse cx="600" cy="186" rx="250" ry="40" fill="url(#rtwMist)" />
            <path d="M398 180H802" stroke="#c4b3ea" strokeWidth="3" strokeDasharray="2 12" strokeLinecap="round" />
            {/* Back at work */}
            <g data-far>
              <path d="M820 180H1160" stroke="url(#rtwFar)" strokeWidth="6" strokeLinecap="round" />
              {[900, 990, 1080].map((x) => (
                <circle key={x} cx={x} cy="180" r="7" fill="#fff" stroke="#f4b400" strokeWidth="3" />
              ))}
            </g>
            <g data-sun>
              <circle cx="1110" cy="96" r="58" fill="url(#rtwSunGlow)" />
              <circle cx="1110" cy="96" r="24" fill="#f9c320" />
            </g>
            {/* The bridge and the walker crossing it */}
            <path data-bridge d="M380 180C470 30 730 30 820 180" pathLength="1" strokeDasharray="1 2" fill="none" stroke="url(#rtwBridge)" strokeWidth="5" strokeLinecap="round" />
            <g data-walker>
              <circle cx="820" cy="180" r="13" fill="#fff" stroke="#f4b400" strokeWidth="4" />
              <circle cx="820" cy="180" r="4.5" fill="#4b2e83" />
            </g>
          </svg>

          <div className="mt-4 grid grid-cols-[0.95fr_1.1fr_0.95fr] gap-3 text-center sm:mt-6">
            <div className="min-w-0">
              <p className="font-display text-[13px] font-bold text-brand-700 sm:text-[15px]">Before the break</p>
              <p className="mt-1 hidden text-[13px] text-ink-900/55 sm:block">Skills and experience</p>
            </div>
            <div className="min-w-0">
              <p className="font-display text-[13px] font-bold text-ink-900/60 sm:text-[15px]">The time away</p>
              <p className="mt-2 hidden flex-wrap justify-center gap-1.5 sm:flex">
                {REASONS.map((r) => (
                  <span key={r} className="rounded-full bg-light-lavender px-2.5 py-0.5 text-[12px] font-semibold text-brand-600 ring-1 ring-brand-100">
                    {r}
                  </span>
                ))}
              </p>
            </div>
            <div data-label-far className="min-w-0">
              <p className="font-display text-[13px] font-bold text-gold-800 sm:text-[15px]">Back at work</p>
              <p className="mt-1 hidden text-[13px] text-ink-900/55 sm:block">Same skills, a fresh habit</p>
            </div>
          </div>
        </div>

        {/* The four things that feel hard, as stepping stones under the bridge */}
        {cards && (
          <ul className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2 lg:mt-8 lg:grid-cols-4 lg:gap-5">
            {cards.items.map((c, i) => (
              <li key={i} data-stone className="group relative min-w-0 rounded-[30px] bg-white p-6 shadow-[0_18px_34px_-28px_rgba(26,15,51,0.45)] ring-1 ring-ink-900/[0.06] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5">
                <span aria-hidden="true" className={`flex h-12 w-12 items-center justify-center rounded-full ${CARD_TINTS[i % CARD_TINTS.length]} transition-transform duration-700 group-hover:scale-110`}>
                  <Icon name={c.icon || 'spark'} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-[1.15rem] font-bold leading-snug tracking-[-0.02em] text-ink-950">{c.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-900/70">
                  <Rich text={c.text} />
                </p>
                <span aria-hidden="true" className="absolute right-6 top-6 font-display text-[13px] font-bold text-ink-900/25">0{i + 1}</span>
              </li>
            ))}
          </ul>
        )}

        {paras.map((b, i) => (
          <div key={i} data-calm className="mt-6 flex items-center gap-5 rounded-[30px] bg-[linear-gradient(90deg,#fff3d6,#f6f0ff)] p-6 ring-1 ring-gold-200/60 sm:p-8 lg:mt-8">
            <span aria-hidden="true" className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-gold-600 shadow-[0_10px_20px_-14px_rgba(138,90,0,0.6)] sm:flex">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-7 w-7">
                <path d="M3 17h18M7 17a5 5 0 0 1 10 0M12 7V5M5.6 10.6 4.2 9.2M18.4 10.6l1.4-1.4" />
              </svg>
            </span>
            <p className="font-display text-[clamp(1.1rem,0.95rem+0.55vw,1.5rem)] font-semibold leading-[1.45] tracking-[-0.015em] text-ink-950">
              <Rich text={b.text} />
            </p>
          </div>
        ))}

        <Rest blocks={rest} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 2. Guided practice */

const SEGMENTS = 10;
const STATIC_LIT = 8;
const SCORE_BARS = [
  { label: 'Clarity', w: 74 },
  { label: 'Confidence', w: 68 },
  { label: 'Technical depth', w: 62 },
];
const ROUNDS = ['HR & Introduction', 'Role & Knowledge', 'Practical & Behavioral', 'Managerial & Final'];

function PracticeRoom() {
  return (
    <div aria-hidden="true" className="relative rounded-[34px] bg-white p-5 shadow-[0_30px_50px_-34px_rgba(26,15,51,0.5)] ring-1 ring-ink-900/[0.07] sm:p-7">
      {/* Header: session and mode switch */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-900/45">AI mock interview</p>
          <p className="mt-1 inline-flex items-center gap-2 rounded-full bg-light-lavender px-3 py-1 text-[12.5px] font-bold text-brand-700">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            {ROUNDS[0]}
          </p>
        </div>
        <div className="relative grid grid-cols-2 rounded-full bg-[#f6f2ea] p-1 text-[12px] font-bold">
          <span data-knob className="absolute bottom-1 left-1 top-1 w-[calc(50%-4px)] rounded-full bg-white shadow-[0_4px_10px_-6px_rgba(26,15,51,0.5)] ring-1 ring-gold-300" />
          <span className="relative px-3 py-1.5 text-center text-ink-950">Guided practice</span>
          <span className="relative px-3 py-1.5 text-center text-ink-900/60">Real simulation</span>
        </div>
      </div>

      {/* The question, and the hint that only guided practice gives */}
      <div className="mt-6 flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-950 text-gold-300">
          <Icon name="mic" className="h-4 w-4" />
        </span>
        <p className="rounded-[20px] rounded-tl-[6px] bg-light-lavender px-4 py-3 text-[14.5px] font-semibold leading-snug text-ink-950">Can you walk me through the gap on your resume?</p>
      </div>
      <div className="relative ml-[52px] mt-3 min-h-[64px]">
        <p data-hint className="rounded-[16px] border border-dashed border-gold-400 bg-gold-50 px-4 py-2.5 text-[13px] leading-snug text-ink-900/80">
          <span className="font-bold text-gold-800">Hint · </span>
          Give the short version, then move to what you are ready to do now.
        </p>
        <p data-strict className="absolute inset-x-0 top-0 flex items-center gap-2 rounded-[16px] bg-ink-950 px-4 py-2.5 text-[13px] font-semibold text-white opacity-0">
          <Icon name="shield" className="h-4 w-4 text-gold-400" />
          Strict mode: no hints, just you
        </p>
      </div>

      {/* Your answer, out loud */}
      <div className="mt-5 flex items-center gap-3 rounded-[18px] bg-[#fbf8f2] px-4 py-3">
        <span className="text-[12px] font-bold text-ink-900/55">You</span>
        <span className="flex h-7 flex-1 items-center gap-[3px]">
          {Array.from({ length: 34 }, (_, i) => (
            <span key={i} className="flex-1 rounded-full bg-gradient-to-t from-brand-400 to-gold-400" style={{ height: `${28 + ((i * 37) % 64)}%` }} />
          ))}
        </span>
      </div>

      {/* Confidence: ten soft steps that fill as practice goes on */}
      <div className="mt-6">
        <div className="flex items-end justify-between">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-900/45">How it feels</p>
          <p className="text-[12px] font-semibold text-ink-900/50">
            Rusty <span className="mx-1 text-gold-600">→</span> Steady
          </p>
        </div>
        <div className="mt-2.5 flex gap-1.5">
          {Array.from({ length: SEGMENTS }, (_, i) => (
            <span key={i} className="relative h-3 flex-1 overflow-hidden rounded-full bg-brand-100">
              <span data-seg className={`absolute inset-0 rounded-full bg-gradient-to-r from-gold-300 to-gold-500 ${i < STATIC_LIT ? '' : 'opacity-0'}`} />
            </span>
          ))}
        </div>
      </div>

      {/* Scorecard (sample) */}
      <div data-score className="mt-6 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-5 rounded-[22px] bg-[linear-gradient(135deg,#fff8e8,#f6f0ff)] p-4 ring-1 ring-gold-200/70 sm:p-5">
        <div className="text-center">
          <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-ink-900/45">Readiness</p>
          <p className="font-display text-[2.6rem] font-extrabold leading-none tracking-[-0.04em] text-ink-950">
            <span data-count>7.2</span>
            <span className="text-[1rem] text-ink-900/45">/10</span>
          </p>
          <p className="mt-1 text-[10.5px] font-semibold text-ink-900/40">sample</p>
        </div>
        <div className="min-w-0 space-y-2">
          {SCORE_BARS.map((b) => (
            <div key={b.label}>
              <p className="text-[11.5px] font-semibold text-ink-900/60">{b.label}</p>
              <span className="mt-1 block h-1.5 rounded-full bg-white">
                <span data-bar className="block h-full origin-left rounded-full bg-gradient-to-r from-brand-400 to-gold-400" style={{ width: `${b.w}%` }} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GuidedPractice({ s, n }) {
  const ref = useRef(null);
  const steps = pick(s, 'steps');
  const paras = (s.blocks || []).filter((b) => b.type === 'p');
  const rest = others(s, ['steps', 'p']);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(q('[data-rise]'), { y: 36, opacity: 0, stagger: 0.14, duration: 1.6, ease: SOFT, scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true } });
        gsap.from(q('[data-rounds]'), { y: 30, opacity: 0, duration: 1.6, ease: SOFT, scrollTrigger: { trigger: q('[data-rounds]')[0], start: 'top 90%', once: true } });
      });

      // Desktop: the room is pinned while the four steps pass
      mm.add(PIN, () => {
        const items = q('[data-step]');
        const segs = q('[data-seg]');
        const counter = q('[data-count]')[0];
        const score = { v: 0 };
        const span = Math.max(1, items.length);

        gsap.set(items, { opacity: 0.35 });
        gsap.set(q('[data-step-on]'), { opacity: 0, scale: 0.6 });
        gsap.set(q('[data-step-fill]'), { scaleY: 0 });
        gsap.set(segs, { opacity: 0 });
        gsap.set(q('[data-score]'), { y: 30, opacity: 0 });
        gsap.set(q('[data-bar]'), { scaleX: 0 });
        gsap.set(q('[data-hint]'), { opacity: 0, y: 8 });

        const tl = gsap.timeline({
          defaults: { ease: 'sine.inOut' },
          scrollTrigger: { trigger: q('[data-pin]')[0], start: 'top top', end: '+=240%', pin: true, scrub: true, anticipatePin: 1, invalidateOnRefresh: true },
        });

        items.forEach((item, i) => {
          const at = i;
          tl.to(item, { opacity: 1, duration: 0.35 }, at).to(item.querySelector('[data-step-on]'), { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(1.6)' }, at);
          const fill = item.querySelector('[data-step-fill]');
          if (fill) tl.to(fill, { scaleY: 1, duration: 0.9, ease: 'none' }, at + 0.1);
        });

        // Step 1: the hint arrives. Steps 1-4: the confidence strip fills, nine of ten by the end
        tl.to(q('[data-hint]'), { opacity: 1, y: 0, duration: 0.4 }, 0.2);
        segs.slice(0, 9).forEach((seg, i) => tl.to(seg, { opacity: 1, duration: 0.12, ease: 'none' }, 0.25 + (i * (span - 0.6)) / 9));

        // Step 3: the scorecard lands, the number counts up and the bars grow
        const s3 = Math.min(2, span - 1);
        tl.to(q('[data-score]'), { y: 0, opacity: 1, duration: 0.45, ease: SOFT }, s3 + 0.05)
          .fromTo(score, { v: 0 }, { v: 7.2, duration: 0.6, ease: SOFT, onUpdate: () => counter && (counter.textContent = score.v.toFixed(1)) }, s3 + 0.15)
          .to(q('[data-bar]'), { scaleX: 1, stagger: 0.08, duration: 0.5, ease: SOFT }, s3 + 0.2);

        // Step 4: the switch moves to real simulation and the hint gives way
        const s4 = span - 1;
        tl.to(q('[data-knob]'), { xPercent: 100, duration: 0.35 }, s4 + 0.1)
          .to(q('[data-hint]'), { opacity: 0, y: -6, duration: 0.25 }, s4 + 0.15)
          .to(q('[data-strict]'), { opacity: 1, duration: 0.3 }, s4 + 0.3)
          .to({}, { duration: 0.5 });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id={s.id} aria-labelledby={`${s.id}-title`} className="relative scroll-mt-24 overflow-clip bg-[linear-gradient(180deg,#faf6ff_0%,#fff7e6_100%)] pt-16 sm:pt-20">
      <div className="container-x relative">
        <HeadRow s={s} n={n} />
      </div>

      <div data-pin className="relative pb-12 pt-10 sm:pt-12 lg:flex lg:min-h-[100svh] lg:items-center lg:pb-10 lg:pt-[96px]">
        <div aria-hidden="true" className="pointer-events-none absolute right-[6%] top-[20%] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(closest-side,rgba(252,211,77,0.25),transparent)]" />
        <div className="container-x relative grid w-full grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16 xl:gap-24">
          {steps && (
            <ol className="relative min-w-0">
              {steps.items.map((st, i) => {
                const last = i === steps.items.length - 1;
                return (
                  <li key={i} data-step className={`relative grid grid-cols-[44px_minmax(0,1fr)] gap-x-5 ${last ? '' : 'pb-7 sm:pb-8'}`}>
                    {/* Path to the next step: from this circle's centre to the next one's */}
                    {!last && (
                      <span aria-hidden="true" className="absolute left-[21px] top-[22px] -bottom-[22px] w-[2px] rounded-full bg-brand-100">
                        <span data-step-fill className="block h-full w-full origin-top rounded-full bg-gradient-to-b from-brand-400 to-gold-400" />
                      </span>
                    )}
                    <span aria-hidden="true" className="relative z-[1] flex h-11 w-11 items-center justify-center rounded-full bg-white font-display text-[15px] font-extrabold text-brand-600 shadow-[0_0_0_5px_#fbf6f4] ring-1 ring-brand-200">
                      <span data-step-on className="absolute inset-0 rounded-full bg-gold-400" />
                      <span className="relative">{i + 1}</span>
                    </span>
                    <div className="min-w-0 pt-1.5">
                      <h3 className="font-display text-[1.2rem] font-bold leading-snug tracking-[-0.02em] text-ink-950">{st.title}</h3>
                      <p className="mt-1.5 text-[15.5px] leading-relaxed text-ink-900/70">
                        <Rich text={st.text} />
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
          <div className="min-w-0">
            <PracticeRoom />
          </div>
        </div>
      </div>

      {(paras.length > 0 || rest.length > 0) && (
        <div className="container-x relative pb-16 sm:pb-20">
          <div data-rounds className="grid grid-cols-[minmax(0,1fr)] items-center gap-5 rounded-[30px] bg-white/80 p-6 ring-1 ring-brand-100 sm:p-8 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-10">
            <ul aria-hidden="true" className="flex flex-wrap gap-2">
              {ROUNDS.map((r, i) => (
                <li key={r} className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-bold ${i === 0 ? 'bg-gold-400 text-ink-950' : 'bg-light-lavender text-brand-700 ring-1 ring-brand-100'}`}>
                  {i + 1} · {r}
                </li>
              ))}
            </ul>
            <div className="min-w-0 space-y-3">
              {paras.map((b, i) => (
                <p key={i} className="text-[17px] leading-relaxed text-ink-900/75">
                  <Rich text={b.text} />
                </p>
              ))}
            </div>
          </div>
          <Rest blocks={rest} />
        </div>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ 3. Your gap */

const PART_LABELS = ['What you did', 'What you kept up', 'Why now'];

function Breath() {
  return (
    <div aria-hidden="true" className="relative mx-auto flex aspect-square w-full max-w-[460px] items-center justify-center">
      <span data-breath className="absolute inset-0 rounded-full bg-[radial-gradient(closest-side,rgba(252,211,77,0.45),rgba(252,211,77,0.12)_60%,transparent)] will-change-transform" />
      <span data-breath-ring className="absolute inset-[9%] rounded-full border-2 border-dashed border-gold-400/50 will-change-transform" />
      <span className="absolute inset-[22%] rounded-full bg-[radial-gradient(closest-side,#ffffff,#fff6e3)] shadow-[0_24px_44px_-30px_rgba(138,90,0,0.6)]" />
      <div className="relative flex flex-col items-center text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-950 text-gold-300">
          <Icon name="mic" className="h-6 w-6" />
        </span>
        <span className="relative mt-4 block h-6 w-40">
          <span data-in className="absolute inset-0 font-display text-[1.15rem] font-bold text-ink-950">Breathe in</span>
          <span data-out className="absolute inset-0 font-display text-[1.15rem] font-bold text-ink-950 opacity-0">Say it once more</span>
        </span>
        <span className="mt-1 text-[12.5px] font-semibold text-ink-900/50">Practice at your own pace</span>
      </div>
      {/* The three parts orbit the circle */}
      {PART_LABELS.map((p, i) => (
        <span
          key={p}
          className={`absolute inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[12px] font-bold text-ink-950 shadow-[0_10px_20px_-14px_rgba(26,15,51,0.6)] ring-1 ring-gold-200 ${['left-[2%] top-[18%]', 'right-0 top-[44%]', 'bottom-[10%] left-[10%]'][i]}`}
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold-400 text-[10.5px] font-extrabold">{i + 1}</span>
          {p}
        </span>
      ))}
    </div>
  );
}

function ExplainTheGap({ s, n }) {
  const ref = useRef(null);
  const blocks = s.blocks || [];
  const listIdx = blocks.findIndex((b) => b.type === 'list');
  const exIdx = blocks.findIndex((b) => b.type === 'example');
  const qIdx = blocks.findIndex((b) => b.type === 'questions');
  const list = blocks[listIdx];
  const ex = blocks[exIdx];
  const questions = blocks[qIdx];
  // Paragraphs before the list lead into it; the paragraph before the questions leads into them
  const lead = blocks.filter((b, i) => b.type === 'p' && (listIdx < 0 || i < listIdx));
  const bridge = blocks.filter((b, i) => b.type === 'p' && listIdx >= 0 && i > listIdx);
  const rest = others(s, ['p', 'list', 'example', 'questions']);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(q('[data-rise]'), { y: 36, opacity: 0, stagger: 0.14, duration: 1.6, ease: SOFT, scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true } });
        gsap
          .timeline({ scrollTrigger: { trigger: q('[data-answer]')[0], start: 'top 80%', once: true } })
          .from(q('[data-part]'), { y: 30, opacity: 0, stagger: 0.16, duration: 1.4, ease: SOFT })
          .from(q('[data-example]'), { y: 40, opacity: 0, duration: 1.6, ease: SOFT }, 0.4)
          .from(q('[data-ex-line]'), { x: -16, opacity: 0, stagger: 0.2, duration: 1.2, ease: SOFT }, 0.8);
        ScrollTrigger.batch(q('[data-bubble]'), {
          start: 'top 90%',
          once: true,
          onEnter: (els) => gsap.from(els, { y: 30, scale: 0.97, opacity: 0, stagger: 0.12, duration: 1.4, ease: SOFT }),
        });

        // The breathing circle: slow in, slow out, paused whenever it is off screen
        const breath = q('[data-breath]');
        if (breath.length) {
          gsap.set(breath, { scale: 0.9 });
          gsap
            .timeline({ repeat: -1, scrollTrigger: { trigger: q('[data-breathe-scene]')[0], start: 'top bottom', end: 'bottom top', toggleActions: 'play pause resume pause' } })
            .to(breath, { scale: 1.06, duration: 4, ease: 'sine.inOut' }, 0)
            .to(q('[data-breath-ring]'), { scale: 1.04, rotation: 20, duration: 4, ease: 'sine.inOut' }, 0)
            .to(q('[data-in]'), { opacity: 0, duration: 0.6 }, 3.4)
            .to(q('[data-out]'), { opacity: 1, duration: 0.6 }, 3.6)
            .to(breath, { scale: 0.9, duration: 4, ease: 'sine.inOut' }, 4)
            .to(q('[data-breath-ring]'), { scale: 1, rotation: 0, duration: 4, ease: 'sine.inOut' }, 4)
            .to(q('[data-out]'), { opacity: 0, duration: 0.6 }, 7.4)
            .to(q('[data-in]'), { opacity: 1, duration: 0.6 }, 7.6);
        }
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id={s.id} aria-labelledby={`${s.id}-title`} className="relative scroll-mt-24 overflow-clip bg-[linear-gradient(180deg,#fff7e6_0%,#ffffff_30%,#ffffff_70%,#f8f4ff_100%)] py-16 sm:py-20 lg:py-24">
      <div className="container-x relative">
        <HeadRow s={s} n={n} />

        <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-14 xl:gap-20">
          {/* The answer: three parts and the example */}
          <div data-answer className="min-w-0 lg:col-span-7">
            {lead.map((b, i) => (
              <p key={i} className="font-display text-[1.25rem] font-bold tracking-[-0.02em] text-ink-950">
                <Rich text={b.text} />
              </p>
            ))}
            {list && (
              <ol className="mt-5 grid grid-cols-[minmax(0,1fr)] gap-3 sm:grid-cols-3">
                {list.items.map((t, i) => (
                  <li key={i} data-part className="relative min-w-0 rounded-[26px] bg-[#fffaf0] p-5 ring-1 ring-gold-200/80">
                    <span aria-hidden="true" className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-400 font-display text-[13px] font-extrabold text-ink-950">{i + 1}</span>
                      <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-gold-800">{PART_LABELS[i] || 'Part'}</span>
                    </span>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink-900/80">
                      <Rich text={t} />
                    </p>
                  </li>
                ))}
              </ol>
            )}

            {ex && (
              <figure data-example className="relative mt-6 overflow-hidden rounded-[30px] bg-white shadow-[0_24px_44px_-32px_rgba(26,15,51,0.5)] ring-1 ring-ink-900/[0.07]">
                <figcaption className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-gold-100 bg-[linear-gradient(90deg,#fff6e0,#f7f2ff)] px-6 py-3.5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11.5px] font-bold uppercase tracking-[0.14em] text-brand-600 ring-1 ring-brand-100">
                    <Icon name="chat" className="h-3.5 w-3.5" />
                    {ex.label}
                  </span>
                  {ex.meta && <span className="text-[13.5px] font-semibold text-ink-900/60">{ex.meta}</span>}
                </figcaption>
                <div className="space-y-4 px-6 py-6 sm:px-8">
                  {(ex.lines || []).map((l, i) => (
                    <div key={i} data-ex-line className="grid grid-cols-[28px_minmax(0,1fr)] gap-3">
                      <span aria-hidden="true" className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-gold-100 font-display text-[12px] font-extrabold text-gold-800">
                        {i + 1}
                      </span>
                      <p className={`text-[16.5px] leading-relaxed text-ink-900/85 ${l === '' ? 'h-1' : ''}`}>
                        <Rich text={l} />
                      </p>
                    </div>
                  ))}
                </div>
              </figure>
            )}
          </div>

          {/* Practice at your own pace: the breathing circle */}
          <div data-breathe-scene className="min-w-0 lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Breath />
            </div>
          </div>
        </div>

        {/* The follow-up questions */}
        {(bridge.length > 0 || questions) && (
          <div className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-8 lg:mt-20 lg:grid-cols-12 lg:gap-14 xl:gap-20">
            <div className="min-w-0 lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <span aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-950 text-gold-300">
                  <Icon name="question" className="h-5 w-5" />
                </span>
                {bridge.map((b, i) => (
                  <p key={i} className="mt-5 font-display text-[clamp(1.15rem,1rem+0.5vw,1.45rem)] font-semibold leading-[1.45] tracking-[-0.015em] text-ink-950">
                    <Rich text={b.text} />
                  </p>
                ))}
              </div>
            </div>
            {questions && (
              <ol className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2 lg:col-span-8">
                {questions.items.map((it, i) => (
                  <li key={i} data-bubble className={`relative min-w-0 rounded-[28px] p-6 ring-1 ${i % 2 ? 'rounded-br-[8px] bg-[#f7f2ff] ring-brand-100' : 'rounded-bl-[8px] bg-[#fff8ec] ring-gold-200/80'}`}>
                    <span aria-hidden="true" className={`flex h-8 w-8 items-center justify-center rounded-full font-display text-[13px] font-extrabold ${i % 2 ? 'bg-brand-600 text-white' : 'bg-gold-400 text-ink-950'}`}>{i + 1}</span>
                    <h3 className="mt-4 font-display text-[1.1rem] font-bold leading-snug tracking-[-0.015em] text-ink-950">{it.q}</h3>
                    {it.hint && (
                      <p className="mt-2 text-[14.5px] leading-relaxed text-ink-900/70">
                        <Rich text={it.hint} />
                      </p>
                    )}
                  </li>
                ))}
              </ol>
            )}
          </div>
        )}

        <Rest blocks={rest} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 4. Skills that still match */

// Sample data for the decorative match strip: your resume (then) against a job posted now
const RESUME = ['Bookkeeping', 'Reconciliations', 'Vendor invoices', 'Spreadsheets', 'Month-end close'];
const JOB = ['Accounts payable', 'Reconciliations', 'Invoice processing', 'Excel', 'Accounting software'];
const PAIRS = [
  [0, 0],
  [1, 1],
  [2, 2],
  [3, 3],
];

function MatchStrip() {
  return (
    <div aria-hidden="true" className="relative rounded-[32px] bg-white p-5 text-ink-950 shadow-[0_30px_50px_-30px_rgba(0,0,0,0.7)] sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-900/45">Resume match · sample</p>
          <p className="mt-1 font-display text-[1.05rem] font-bold">Accounts Payable Specialist · Northwind Labs</p>
        </div>
        <p className="flex items-baseline gap-1 rounded-2xl bg-[linear-gradient(135deg,#fff3d1,#f3edff)] px-4 py-2">
          <span data-match-count className="font-display text-[2rem] font-extrabold leading-none tracking-[-0.04em]">4</span>
          <span className="text-[13px] font-bold text-ink-900/55">of 5 carry over</span>
        </p>
      </div>

      {/* Phones: the same pairs as rows */}
      <ul className="mt-5 space-y-2 sm:hidden">
        {JOB.map((j, i) => {
          const pair = PAIRS.find(([, b]) => b === i);
          return (
            <li key={j} className="grid grid-cols-[minmax(0,1fr)_20px_minmax(0,1fr)] items-center gap-2 text-[12.5px] font-bold">
              <span className={`rounded-xl px-2.5 py-2 text-center ${pair ? 'bg-light-lavender text-brand-800' : 'border-2 border-dashed border-ink-900/10 text-ink-900/40'}`}>{pair ? RESUME[pair[0]] : 'Not yet'}</span>
              <span className={`h-[3px] rounded-full ${pair ? 'bg-gradient-to-r from-brand-400 to-gold-400' : 'bg-ink-900/10'}`} />
              <span className={`rounded-xl px-2.5 py-2 text-center ${pair ? 'bg-gold-100 text-gold-800' : 'border-2 border-dashed border-rose-200 text-rose-600'}`}>{j}</span>
            </li>
          );
        })}
      </ul>

      <div className="relative mt-6 hidden sm:block">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-600">Your resume</p>
        <ul className="mt-2 grid grid-cols-5 gap-2">
          {RESUME.map((r) => (
            <li key={r} data-then className="flex min-h-[52px] items-center justify-center rounded-2xl bg-light-lavender px-1.5 text-center text-[11.5px] font-bold leading-tight [overflow-wrap:anywhere] text-brand-800 ring-1 ring-brand-100">
              {r}
            </li>
          ))}
        </ul>
        {/* The links between matched pairs */}
        <div className="relative grid h-14 grid-cols-5 gap-2">
          {RESUME.map((r, i) => {
            const matched = PAIRS.some(([a]) => a === i);
            return (
              <span key={r} className="relative flex justify-center">
                {matched ? <span data-link className="h-full w-[3px] origin-top rounded-full bg-gradient-to-b from-brand-400 to-gold-400" /> : <span className="h-full w-0 border-l-2 border-dashed border-ink-900/15" />}
              </span>
            );
          })}
        </div>
        <ul className="grid grid-cols-5 gap-2">
          {JOB.map((j, i) => {
            const matched = PAIRS.some(([, b]) => b === i);
            return (
              <li key={j} data-now className={`flex min-h-[52px] items-center justify-center rounded-2xl px-1.5 text-center text-[11.5px] font-bold leading-tight [overflow-wrap:anywhere] ${matched ? 'bg-gold-100 text-gold-800 ring-1 ring-gold-300' : 'border-2 border-dashed border-rose-200 text-rose-600'}`}>
                {j}
              </li>
            );
          })}
        </ul>
        <p className="mt-2 text-right text-[11px] font-bold uppercase tracking-[0.16em] text-gold-700">The job today</p>
      </div>

      <div className="mt-5 grid grid-cols-[minmax(0,1fr)] gap-2 rounded-[20px] bg-[#fbf8f2] p-4 text-[13px] sm:grid-cols-2">
        <p className="flex items-start gap-2">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <Icon name="check" className="h-3 w-3" strokeWidth={3} />
          </span>
          <span>
            <span className="font-bold">Carries over:</span> bookkeeping reads as accounts payable today
          </span>
        </p>
        <p className="flex items-start gap-2">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
            <Icon name="refresh" className="h-3 w-3" strokeWidth={2.6} />
          </span>
          <span>
            <span className="font-bold">To refresh:</span> the accounting software named in the post
          </span>
        </p>
      </div>
    </div>
  );
}

function SkillsStillMatch({ s, n }) {
  const ref = useRef(null);
  const paras = (s.blocks || []).filter((b) => b.type === 'p');
  const list = pick(s, 'list');
  const callouts = (s.blocks || []).filter((b) => b.type === 'callout');
  const rest = others(s, ['p', 'list', 'callout']);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(q('[data-rise]'), { y: 36, opacity: 0, stagger: 0.14, duration: 1.6, ease: SOFT, scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true } });
        gsap
          .timeline({ scrollTrigger: { trigger: q('[data-copy]')[0], start: 'top 82%', once: true } })
          .from(q('[data-copy] > *'), { y: 30, opacity: 0, stagger: 0.14, duration: 1.5, ease: SOFT })
          .from(q('[data-check]'), { scale: 0, stagger: 0.14, duration: 0.9, ease: 'back.out(2)' }, 0.5);

        // The match strip: chips settle, then the matched pairs connect and the count climbs
        const count = q('[data-match-count]')[0];
        const c = { v: 0 };
        gsap
          .timeline({ scrollTrigger: { trigger: q('[data-strip]')[0], start: 'top 78%', once: true } })
          .from(q('[data-strip]'), { y: 50, opacity: 0, duration: 1.6, ease: SOFT })
          .from(q('[data-then]'), { y: -14, opacity: 0, stagger: 0.08, duration: 1, ease: SOFT }, 0.4)
          .from(q('[data-now]'), { y: 14, opacity: 0, stagger: 0.08, duration: 1, ease: SOFT }, 0.5)
          .from(q('[data-link]'), { scaleY: 0, stagger: 0.15, duration: 0.8, ease: 'power2.inOut' }, 1.1)
          .fromTo(c, { v: 0 }, { v: 4, duration: 1.2, ease: 'power1.inOut', onUpdate: () => count && (count.textContent = String(Math.round(c.v))) }, 1.1);

        // The sun rises over the band as you scroll through it
        gsap.fromTo(q('[data-sunrise]'), { y: 160 }, { y: 0, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom bottom', scrub: true } });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id={s.id} aria-labelledby={`${s.id}-title`} className="grain relative scroll-mt-24 overflow-hidden bg-brand-950 text-white">
      {/* Dusk to dawn: a gold sun rising from the bottom of the band */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_45%_at_8%_10%,rgba(109,76,176,0.45),transparent)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] overflow-hidden">
        <div data-sunrise className="absolute bottom-[-55%] left-1/2 h-[900px] w-[1300px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(244,180,0,0.32),rgba(244,180,0,0.1)_55%,transparent)] will-change-transform" />
      </div>

      <div className="container-x relative z-[2] py-16 sm:py-20 lg:py-24">
        <HeadRow s={s} n={n} dark />

        <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-12 lg:mt-16 lg:grid-cols-12 lg:items-center lg:gap-14 xl:gap-20">
          <div data-copy className="min-w-0 lg:col-span-5">
            {paras.map((b, i) => (
              <p key={i} className="text-[17px] leading-relaxed text-white/80">
                <Rich text={b.text} tone="dark" />
              </p>
            ))}
            {list && (
              <ul className="mt-7 space-y-3">
                {list.items.map((t, i) => (
                  <li key={i} className="flex gap-4 rounded-[22px] bg-white/[0.05] p-4 ring-1 ring-white/10">
                    <span data-check aria-hidden="true" className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-400 text-ink-950">
                      <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    <span className="min-w-0 text-[15.5px] leading-relaxed text-white/85">
                      <Rich text={t} tone="dark" />
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div data-strip className="min-w-0 lg:col-span-7">
            <MatchStrip />
          </div>
        </div>

        {callouts.map((c, i) => (
          <aside key={i} className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-4 rounded-[30px] bg-[linear-gradient(90deg,rgba(244,180,0,0.16),rgba(255,255,255,0.04))] p-6 ring-1 ring-gold-400/25 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center sm:gap-6 sm:p-8 lg:mt-14">
            <span aria-hidden="true" className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-400 text-ink-950">
              <Icon name="compass" className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <p className="font-display text-[1.2rem] font-bold text-white">{c.title}</p>
              <p className="mt-1.5 text-[16px] leading-relaxed text-brand-100">
                <Rich text={c.text} tone="dark" />
              </p>
            </div>
          </aside>
        ))}

        <Rest blocks={rest} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Fallback for any other section */

function Plain({ s, n }) {
  return (
    <section id={s.id} aria-labelledby={`${s.id}-title`} className="relative scroll-mt-24 bg-white py-16 sm:py-20">
      <div className="container-x">
        <HeadRow s={s} n={n} />
        <Rest blocks={s.blocks || []} />
      </div>
    </section>
  );
}

const SCENES = { 'what-feels-hard': WhatFeelsHard, 'guided-practice': GuidedPractice, 'explain-the-gap': ExplainTheGap, 'skills-still-match': SkillsStillMatch };

export default function ReturningToWorkStory({ page }) {
  return (page.sections || []).map((s, i) => {
    const Scene = SCENES[s.id] || Plain;
    return <Scene key={s.id} s={s} n={i + 1} />;
  });
}
