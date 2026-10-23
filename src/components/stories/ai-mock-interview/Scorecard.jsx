'use client';

import { useRef } from 'react';
import CreativeHeading from '@/components/CreativeHeading';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';
import { Slate, H2_DARK } from './shared';

/*
 * Segment 5, "The read-out". The scorecard as a report card handed over after the take: the readiness
 * score as a huge numeral with a ten-block bar that fills in, a "Sample" stamp, three labelled bars
 * for clarity, confidence and technical depth that grow while their numbers count up, and the
 * strengths / gaps / next-topic notes written underneath. All values are an illustrative sample
 * session. The page's list sits beside it as the legend; the card stays in view (sticky) on desktop.
 */

const READY = 7.8;
const BARS = [
  ['Clarity', 8.1, 'from-brand-400 to-brand-600'],
  ['Confidence', 7.4, 'from-brand-500 to-gold-400'],
  ['Technical depth', 7.9, 'from-gold-400 to-gold-500'],
];
const LOG = [
  ['Strength', 'Structured answers, clear order', 'bg-emerald-100 text-emerald-800'],
  ['Gap', 'Caching trade-offs stayed vague', 'bg-rose-100 text-rose-700'],
  ['Practice next', 'Measuring a performance fix', 'bg-gold-100 text-gold-800'],
];

export default function Scorecard({ s, n }) {
  const root = useRef(null);
  const list = s.blocks.find((b) => b.type === 'list');
  const callouts = s.blocks.filter((b) => b.type === 'callout');

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const consoleEl = q('[data-console]')[0];
        const st = { trigger: consoleEl, start: 'top 72%', once: true };
        gsap.from(consoleEl, { y: 60, opacity: 0, duration: 1.3, scrollTrigger: { trigger: consoleEl, start: 'top 90%', once: true } });

        const tl = gsap.timeline({ scrollTrigger: st, delay: 0.2, defaults: { ease: 'expo.out' } });
        const g = { v: 0 };
        const num = q('[data-gnum]')[0];
        tl.fromTo(g, { v: 0 }, { v: READY, duration: 1.8, onUpdate: () => num && (num.textContent = g.v.toFixed(1)) }, 0)
          .from(q('[data-block]'), { scaleY: 0.25, opacity: 0.15, stagger: 0.09, duration: 0.5, ease: 'back.out(2)' }, 0.1)
          .from(q('[data-stamp]'), { scale: 1.9, rotate: -30, opacity: 0, duration: 0.7, ease: 'back.out(2.2)' }, 0.9);
        q('[data-bar]').forEach((bar, i) => {
          const out = bar.querySelector('[data-bnum]');
          const o = { v: 0 };
          tl.from(bar.querySelector('[data-fill]'), { scaleX: 0, duration: 1.4 }, 0.35 + i * 0.15).fromTo(o, { v: 0 }, { v: BARS[i][1], duration: 1.4, onUpdate: () => out && (out.textContent = o.v.toFixed(1)) }, 0.35 + i * 0.15);
        });
        tl.from(q('[data-log]'), { x: 30, opacity: 0, stagger: 0.12, duration: 0.8 }, 1.2);

        gsap.from(q('[data-legend] > li'), { x: -30, opacity: 0, stagger: 0.07, duration: 1, scrollTrigger: { trigger: q('[data-legend]')[0], start: 'top 85%', once: true } });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id={s.id} aria-labelledby={`${s.id}-title`} className="grain relative scroll-mt-24 overflow-hidden bg-brand-950 py-[72px] text-white sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_40%_at_75%_35%,rgba(244,180,0,0.12),transparent),radial-gradient(40%_40%_at_10%_90%,rgba(109,76,176,0.35),transparent)]" />
      <div className="container-x relative z-[2]">
        <Slate n={n} eyebrow={s.eyebrow} dark />
        <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="min-w-0 lg:col-span-5">
            <CreativeHeading id={`${s.id}-title`} lines={s.h2} tone="dark" className={H2_DARK} />
            {s.intro && (
              <p className="mt-6 text-lead font-medium text-brand-100">
                <Rich text={s.intro} tone="dark" />
              </p>
            )}
            {list && (
              <ul data-legend className="mt-8 divide-y divide-white/10 border-y border-white/10">
                {list.items.map((t, i) => (
                  <li key={i} className="flex gap-4 py-3.5 text-[16px] leading-[1.6] text-white/80">
                    <span aria-hidden="true" className="mt-0.5 w-7 shrink-0 font-mono text-[12px] font-bold text-gold-300/80">CH{i + 1}</span>
                    <span className="min-w-0">
                      <Rich text={t} tone="dark" />
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="min-w-0 lg:col-span-7">
            <div className="lg:sticky lg:top-28">
              <div data-console aria-hidden="true" className="relative overflow-hidden rounded-[10px] bg-[#fffdf6] p-6 text-ink-950 shadow-[0_24px_50px_-30px_rgba(0,0,0,0.9)] sm:p-8" style={{ backgroundImage: 'repeating-linear-gradient(180deg, transparent 0 31px, rgba(75,46,131,0.06) 31px 32px)' }}>
                <span className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brand-600 via-brand-500 to-gold-500" />
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink-950/10 pb-4">
                  <span className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-brand-600">
                    <Icon name="chart" className="h-4 w-4" />
                    Interview scorecard
                  </span>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-ink-900/50">Role &amp; Knowledge · Take 3</span>
                </div>

                <div className="relative mt-6 grid grid-cols-[minmax(0,1fr)] gap-7 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:gap-9">
                  <div className="min-w-0">
                    <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-ink-900/55">Overall readiness</p>
                    <p className="mt-1 font-display text-[clamp(4.5rem,3.5rem+3vw,6.5rem)] font-extrabold leading-[0.9] tracking-[-0.06em] text-ink-950">
                      <span data-gnum>{READY.toFixed(1)}</span>
                      <span className="text-[0.32em] tracking-[-0.02em] text-ink-900/40"> / 10</span>
                    </p>
                    <div className="mt-4 flex gap-1">
                      {Array.from({ length: 10 }, (_, k) => (
                        <span key={k} data-block className={`h-3 flex-1 origin-bottom rounded-[3px] ${k < Math.round(READY) ? (k < 5 ? 'bg-brand-500' : 'bg-gold-400') : 'bg-ink-950/10'}`} />
                      ))}
                    </div>
                    <span data-stamp className="mt-5 inline-flex rotate-[-8deg] items-center rounded-md border-2 border-rose-500/70 px-2.5 py-1 font-mono text-[11px] font-extrabold uppercase tracking-[0.16em] text-rose-500/85">
                      Sample session
                    </span>
                  </div>
                  <div className="min-w-0 space-y-4 sm:pt-1">
                    {BARS.map(([label, v, grad]) => (
                      <div key={label} data-bar>
                        <div className="mb-1.5 flex items-baseline justify-between gap-2">
                          <span className="text-[14px] font-semibold text-ink-900/80">{label}</span>
                          <span data-bnum className="font-display text-[1.2rem] font-extrabold text-ink-950">
                            {v.toFixed(1)}
                          </span>
                        </div>
                        <div className="h-3 overflow-hidden rounded-full bg-brand-50 ring-1 ring-brand-100">
                          <div data-fill className={`h-full origin-left rounded-full bg-gradient-to-r ${grad}`} style={{ width: `${v * 10}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <ul className="mt-7 space-y-2 border-t border-ink-950/10 pt-5">
                  {LOG.map(([k, v, cls]) => (
                    <li key={k} data-log className="flex flex-wrap items-center gap-3">
                      <span className={`w-28 shrink-0 rounded-md px-2 py-1 text-center text-[10.5px] font-bold uppercase tracking-[0.12em] ${cls}`}>{k}</span>
                      <span className="min-w-0 text-[14.5px] font-medium italic text-ink-900/80">{v}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {callouts.map((c, i) => (
                <aside key={i} className="mt-5 flex gap-4 rounded-[24px] border border-emerald-400/25 bg-emerald-400/[0.07] p-5 sm:p-6">
                  <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white">
                    <Icon name="refresh" className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    {c.title && <p className="font-display text-[1.1rem] font-bold text-white">{c.title}</p>}
                    <p className="mt-1 text-[15.5px] leading-relaxed text-white/75">
                      <Rich text={c.text} tone="dark" />
                    </p>
                  </div>
                </aside>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
