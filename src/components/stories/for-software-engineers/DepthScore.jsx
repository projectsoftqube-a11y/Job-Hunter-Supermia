'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { Avatar, ChapterHead, Handoff, SAM, TARGET } from './shared';

/*
 * Chapter 4, "The proof". Sam's scorecard from the chapter 3 session: a dark scorecard tile with the
 * 0-10 readiness numeral and a segmented bar, clarity, confidence and technical depth as separate bars
 * (depth flagged as scored on its own), and the strengths, gaps and next topics that point back to the
 * study topic from chapter 2. The scorecard is always shown finished; as you scroll, a spotlight steps
 * through its parts and the matching card beside it lights up while that part replays a short refill. Then the loop closes: run the round again in real simulation.
 * Scores are illustrative sample data; the markup is the finished scorecard.
 */

const READINESS = 7.4;
const SEGMENTS = 20;
const BARS = [
  { key: 'depth', label: 'Technical depth', value: 6.3, part: 1, grad: 'from-gold-400 to-gold-300' },
  { key: 'clarity', label: 'Clarity', value: 8.2, part: 2, grad: 'from-brand-400 to-brand-300' },
  { key: 'confidence', label: 'Confidence', value: 7.6, part: 2, grad: 'from-brand-400 to-brand-300' },
];
const NOTES = [
  ['Strengths', 'text-emerald-300', ['Clear structure', 'Owned the rollout']],
  ['Gaps', 'text-rose-300', ['Thin on failure modes', 'Kubernetes basics']],
  ['Next topics', 'text-gold-300', ['Kubernetes basics', 'Consumer lag alerts', 'Queue trade-offs']],
];
const BADGES = [`${READINESS}/10`, '6.3 depth', '8.2 · 7.6', '3 topics'];

function Scorecard() {
  const lit = Math.round((READINESS / 10) * SEGMENTS);
  return (
    <div aria-hidden="true" className="relative h-full rounded-[32px] bg-gradient-to-br from-gold-300/50 via-brand-400/30 to-brand-300/40 p-px shadow-[0_60px_120px_-60px_rgba(26,15,51,0.9)]">
      <div className="relative flex h-full flex-col gap-6 overflow-hidden rounded-[31px] bg-[#140b2c] p-5 sm:gap-7 sm:p-7 lg:p-9">
        <span className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(244,180,0,0.2),transparent)]" />
        <span className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgba(109,76,176,0.45),transparent)]" />

        <div className="relative flex flex-wrap items-center gap-3">
          <Avatar />
          <span className="min-w-0">
            <span className="block text-[14px] font-bold text-white">Session scorecard · {SAM.name}</span>
            <span className="block text-[12px] text-brand-300">
              Role & Knowledge · {TARGET.title}, {TARGET.company}
            </span>
          </span>
          <span className="ml-auto rounded-full bg-white/[0.06] px-2.5 py-1 text-[11px] font-semibold text-brand-200 ring-1 ring-white/10">Guided practice</span>
        </div>

        {/* Overall readiness */}
        <div data-part="0" className="relative grid transition-[background-color,box-shadow] duration-500 data-[on=true]:bg-white/[0.08] data-[on=true]:ring-gold-400/60 grid-cols-[minmax(0,1fr)] items-end gap-4 rounded-[24px] bg-white/[0.04] p-4 ring-1 ring-white/10 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-7 sm:p-5">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-brand-300">Overall readiness</p>
            <p className="mt-1 font-display font-extrabold leading-none text-white">
              <span data-ready className="text-[72px] tracking-[-0.05em] sm:text-[96px]">
                {READINESS.toFixed(1)}
              </span>
              <span className="text-[22px] text-brand-300">/10</span>
            </p>
          </div>
          <div className="min-w-0 pb-2">
            <span className="flex gap-[3px]">
              {Array.from({ length: SEGMENTS }, (_, i) => (
                <span key={i} className="relative h-3 flex-1 rounded-[3px] bg-white/10">
                  {i < lit && <span data-seg className="absolute inset-0 rounded-[3px] bg-gradient-to-r from-brand-400 to-gold-400" />}
                </span>
              ))}
            </span>
            <span className="mt-2 flex justify-between text-[11px] font-semibold text-brand-300">
              <span>0</span>
              <span>whole session</span>
              <span>10</span>
            </span>
          </div>
        </div>

        {/* The three criteria, depth on its own row */}
        <div className="relative space-y-3">
          {BARS.map((b) => (
            <div key={b.key} data-part={b.part} className={`rounded-2xl px-4 py-3 transition-[background-color,box-shadow] duration-500 data-[on=true]:bg-white/[0.08] data-[on=true]:ring-gold-400/70 ${b.key === 'depth' ? 'bg-gold-400/10 ring-1 ring-gold-400/50' : 'bg-white/[0.03] ring-1 ring-white/8'}`}>
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-[13.5px] font-bold text-white">{b.label}</span>
                {b.key === 'depth' && <span className="rounded-full bg-gold-400 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.06em] text-ink-950">scored on its own</span>}
                <span data-val={b.value} className="ml-auto font-display text-[18px] font-extrabold text-white">
                  {b.value.toFixed(1)}
                </span>
              </p>
              <span className="mt-2 block h-2 overflow-hidden rounded-full bg-white/10">
                <span className="block h-full" style={{ width: `${b.value * 10}%` }}>
                  <span data-bar={b.part} className={`block h-full w-full origin-left rounded-full bg-gradient-to-r ${b.grad}`} />
                </span>
              </span>
            </div>
          ))}
        </div>

        {/* Strengths, gaps, next topics */}
        <div className="relative mt-auto grid grid-cols-[minmax(0,1fr)] gap-3 sm:grid-cols-3">
          {NOTES.map(([h, tone, items]) => (
            <div key={h} data-part="3" className="rounded-2xl transition-[background-color,box-shadow] duration-500 data-[on=true]:bg-white/[0.08] data-[on=true]:ring-gold-400/60 bg-white/[0.03] p-3.5 ring-1 ring-white/8">
              <p className={`text-[11.5px] font-bold uppercase tracking-[0.12em] ${tone}`}>{h}</p>
              <ul className="mt-2 space-y-1.5">
                {items.map((t) => (
                  <li key={t} data-note className="flex items-start gap-2 text-[13px] font-semibold leading-snug text-brand-100">
                    <span className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-60" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DepthScore({ s, n, next }) {
  const root = useRef(null);
  const cards = s.blocks.find((b) => b.type === 'cards')?.items || [];
  const callout = s.blocks.find((b) => b.type === 'callout');

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const items = q('[data-card]');
        const board = q('[data-board]')[0];
        const parts = q('[data-part]');
        const tick = (el, from, to) => {
          const o = { v: from };
          return gsap.fromTo(o, { v: from }, { v: to, duration: 0.8, ease: 'power2.out', onUpdate: () => (el.textContent = o.v.toFixed(1)) });
        };
        // Each replay ends on the finished scorecard already in the markup
        const replays = [
          () => gsap.timeline().add(tick(q('[data-ready]')[0], READINESS - 0.6, READINESS)).fromTo(q('[data-seg]').slice(-4), { opacity: 0.3 }, { opacity: 1, stagger: 0.08, duration: 0.3 }, 0),
          () => gsap.timeline().fromTo(q('[data-bar="1"]'), { scaleX: 0.75 }, { scaleX: 1, duration: 0.8 }).add(tick(q('[data-val]')[0], BARS[0].value - 0.5, BARS[0].value), 0),
          () => gsap.timeline().fromTo(q('[data-bar="2"]'), { scaleX: 0.75 }, { scaleX: 1, stagger: 0.12, duration: 0.8 }).add(q('[data-val]').slice(1).map((el, i) => tick(el, BARS[i + 1].value - 0.5, BARS[i + 1].value)), 0),
          () => gsap.timeline().fromTo(q('[data-note]'), { x: -8 }, { x: 0, stagger: 0.05, duration: 0.5, ease: 'back.out(2)' }),
        ];
        let active = -1;
        let running;
        const setActive = (i) => {
          if (i === active) return;
          active = i;
          items.forEach((c, k) => (c.dataset.active = k === i ? 'true' : 'false'));
          parts.forEach((el) => (el.dataset.on = el.dataset.part === String(i) ? 'true' : 'false'));
          if (running) running.progress(1).kill();
          running = replays[i]();
        };

        gsap.from(q('[data-card]'), { y: 30, stagger: 0.08, duration: 0.9, scrollTrigger: { trigger: board, start: 'top 85%', once: true } });
        ScrollTrigger.create({
          trigger: board,
          start: 'top 60%',
          end: 'bottom 55%',
          onUpdate: (self) => setActive(Math.min(items.length - 1, Math.floor(self.progress * items.length))),
        });

        return () => {
          if (running) running.progress(1).kill();
          items.forEach((c) => delete c.dataset.active);
          parts.forEach((el) => delete el.dataset.on);
        };
      });
    },
    { scope: root }
  );

  return (
    <section id={s.id} ref={root} aria-labelledby={`${s.id}-title`} className="relative scroll-mt-24 overflow-hidden bg-light-lavender py-16 sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_30%_at_10%_0%,rgba(196,179,234,0.6),transparent),radial-gradient(30%_30%_at_100%_90%,rgba(252,211,77,0.2),transparent)]" />
      <div className="container-x relative">
        <ChapterHead s={s} n={n} />

        <div data-board className="group/board mt-10 grid grid-cols-[minmax(0,1fr)] gap-4 lg:mt-14 lg:gap-5 xl:grid-cols-12">
          <div className="min-w-0 xl:col-span-6">
            <Scorecard />
          </div>

          <div className="flex min-w-0 flex-col gap-4 lg:gap-5 xl:col-span-6">
            <ul className="grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2 lg:gap-5">
              {cards.map((c, i) => (
                <li
                  key={c.title}
                  data-card
                  className="relative overflow-hidden rounded-[24px] bg-white p-5 shadow-[0_24px_50px_-40px_rgba(26,15,51,0.55)] ring-1 ring-hairline transition-[translate,box-shadow] duration-500 hover:-translate-y-1 data-[active=true]:ring-2 data-[active=true]:ring-brand-400 sm:p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-900 text-gold-300">
                      <Icon name={c.icon || 'spark'} className="h-5 w-5" />
                    </span>
                    <span aria-hidden="true" className="rounded-full bg-light-lavender px-2.5 py-1 text-[12px] font-bold text-brand-600 ring-1 ring-hairline">
                      {BADGES[i]}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-[1.2rem] font-bold leading-snug tracking-[-0.02em] text-ink-950">{c.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-900/70">
                    <Rich text={c.text} />
                  </p>
                </li>
              ))}
            </ul>

            {callout && (
              <aside className="relative flex-1 overflow-hidden rounded-[24px] bg-brand-950 p-5 text-white shadow-[0_30px_60px_-40px_rgba(26,15,51,0.9)] sm:p-6">
                <span aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(closest-side,rgba(16,185,129,0.25),transparent)]" />
                <p className="relative flex items-center gap-2.5 font-display text-[1.2rem] font-bold">
                  <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500 text-white">
                    <Icon name="check" className="h-4 w-4" strokeWidth={3} />
                  </span>
                  {callout.title}
                </p>
                <p className="relative mt-2.5 text-[15.5px] leading-relaxed text-brand-100">
                  <Rich text={callout.text} tone="dark" />
                </p>
                <span aria-hidden="true" className="relative mt-4 flex flex-wrap items-center gap-2 text-[12px] font-bold">
                  <span className="rounded-full bg-white/10 px-3 py-1.5 text-brand-100">Guided practice</span>
                  <Icon name="arrow" className="h-4 w-4 text-gold-300" strokeWidth={2.4} />
                  <span className="rounded-full bg-gold-400 px-3 py-1.5 text-ink-950">Real simulation</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-brand-100">
                    <Icon name="refresh" className="h-3.5 w-3.5" strokeWidth={2.4} />
                    Run the round again
                  </span>
                </span>
              </aside>
            )}
          </div>
        </div>

        <Handoff n={n} next={next} />
      </div>
    </section>
  );
}
