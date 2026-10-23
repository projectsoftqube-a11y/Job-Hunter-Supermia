'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { Header, Glyph } from './shared';

/*
 * Chapter 4, "Versions" (dark band). Six resume versions are dealt out as three pairs, one pair above
 * each item of the list it illustrates, so every list item sits under its own two cards. On desktop the
 * stage pins: the six cards start as one stack in the middle, then each pair is dealt to its column and
 * fans open in turn while its list item lights up. Phones get the dealt layout with simple reveals. The
 * gold note closes the story with the hand-off to the application email. Cards are decorative sample
 * data; the list and paragraphs are real text. Transforms and opacity only.
 */

const PAIRS = [
  {
    tone: { tag: 'bg-brand-100 text-brand-800', dot: 'bg-brand-300' },
    cards: [
      { tag: 'Engineering', lead: 'Systems and APIs shipped', chips: ['TypeScript', 'APIs'] },
      { tag: 'Product', lead: 'Launches and what they moved', chips: ['Roadmaps', 'Research'] },
    ],
  },
  {
    tone: { tag: 'bg-emerald-100 text-emerald-800', dot: 'bg-emerald-400' },
    cards: [
      { tag: 'Current field', lead: 'Wins in your field today', chips: ['Operations', 'Budgets'] },
      { tag: 'Career change', lead: 'Transferable skills first', chips: ['Stakeholders', 'Analysis'] },
    ],
  },
  {
    tone: { tag: 'bg-gold-100 text-gold-800', dot: 'bg-gold-400' },
    cards: [
      { tag: 'Design', lead: 'Shipped work and systems', chips: ['Prototyping', 'UI'] },
      { tag: 'Analyst', lead: 'Dashboards and decisions', chips: ['SQL', 'Dashboards'] },
    ],
  },
];
// Where each card rests inside its column (left card, right card)
const REST = [
  { xPercent: -24, rotation: -7 },
  { xPercent: 24, rotation: 6 },
];
// Slight jitter while all six sit in one stack
const STACK = [-4, 3, -2, 4, -3, 2];

function VersionCard({ v, tone }) {
  return (
    <div className="h-full rounded-[18px] bg-white p-3.5 text-ink-950 shadow-[0_12px_22px_-14px_rgba(0,0,0,0.7)] sm:rounded-[22px] sm:p-4">
      <span className={`inline-block max-w-full truncate rounded-full px-2.5 py-0.5 text-[10px] font-bold sm:text-[11px] ${tone.tag}`}>{v.tag}</span>
      <div className="mt-3 flex items-center gap-2">
        <span className="h-7 w-7 shrink-0 rounded-full bg-brand-950" />
        <span className="min-w-0 flex-1 space-y-1">
          <span className="block h-1.5 w-[75%] rounded-full bg-brand-300" />
          <span className="block h-1.5 w-[50%] rounded-full bg-brand-100" />
        </span>
      </div>
      <span className="mt-3 block text-[9px] font-bold uppercase tracking-[0.12em] text-brand-500 sm:text-[10px]">Leads with</span>
      <span className="mt-0.5 block font-display text-[12.5px] font-bold leading-snug sm:text-[14px]">{v.lead}</span>
      <span className="mt-2.5 block space-y-1.5">
        <span className="block h-1.5 w-full rounded-full bg-brand-100" />
        <span className="block h-1.5 w-[88%] rounded-full bg-brand-100" />
        <span className="block h-1.5 w-[70%] rounded-full bg-brand-100" />
      </span>
      <span className="mt-2.5 flex flex-wrap gap-1">
        {v.chips.map((c) => (
          <span key={c} className="rounded-full bg-light-lavender px-2 py-0.5 text-[9.5px] font-bold text-brand-700 sm:text-[10.5px]">
            {c}
          </span>
        ))}
      </span>
      <span className="mt-2.5 flex items-center justify-between border-t border-hairline pt-2 text-[9.5px] font-bold text-ink-900/55 sm:text-[10.5px]">
        <span>Skills · level read</span>
        <span className="flex items-center gap-1 text-emerald-600">
          <Glyph name="check" className="h-2.5 w-2.5" strokeWidth={3.4} />
          Ready
        </span>
      </span>
    </div>
  );
}

export default function VersionsSection({ s }) {
  const root = useRef(null);
  const list = s.blocks.find((b) => b.type === 'list');
  const para = s.blocks.find((b) => b.type === 'p');

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      // Desktop: one stack in the middle, dealt to the three columns pair by pair, pinned and scrubbed
      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        const grid = q('[data-pairs]')[0];
        const items = q('[data-item]');
        let active = -2;
        const setActive = (i) => {
          if (i === active) return;
          active = i;
          items.forEach((el, k) => (k === i ? el.setAttribute('data-active', '') : el.removeAttribute('data-active')));
        };
        // Horizontal distance from a column's centre to the middle of the grid (offsets ignore transforms;
        // the list and its items share the pinned wrapper as offset parent)
        const toMiddle = (col) => grid.offsetLeft + grid.offsetWidth / 2 - (col.parentElement.offsetLeft + col.offsetLeft + col.offsetWidth / 2);

        const tl = gsap.timeline({
          defaults: { ease: 'power2.inOut' },
          scrollTrigger: {
            trigger: q('[data-pin]')[0],
            start: 'center 55%',
            end: '+=170%',
            pin: true,
            scrub: 0.4,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => setActive(self.progress < 0.08 ? -1 : Math.min(2, Math.floor((self.progress - 0.08) / 0.29))),
          },
        });
        q('[data-col]').forEach((col, p) => {
          col.querySelectorAll('[data-card]').forEach((card, k) => {
            const n = p * 2 + k;
            tl.fromTo(
              card,
              { x: () => toMiddle(col), y: -n * 3, xPercent: 0, rotation: STACK[n] },
              { x: 0, y: 0, xPercent: REST[k].xPercent, rotation: REST[k].rotation, duration: 1 },
              0.25 + p * 1.1 + k * 0.12
            );
          });
        });
        tl.to({}, { duration: 0.4 });

        return () => items.forEach((el) => el.removeAttribute('data-active'));
      });

      mm.add(`(max-width: 1023px) and ${MOTION_OK}`, () => {
        const items = q('[data-item]');
        gsap.set(items, { y: 50, opacity: 0 });
        ScrollTrigger.batch(items, { start: 'top 90%', once: true, onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, stagger: 0.12, duration: 1.1, ease: 'expo.out', overwrite: true }) });
      });

      mm.add(MOTION_OK, () => {
        gsap.from(q('[data-next] > *'), { y: 30, opacity: 0, stagger: 0.1, duration: 1.1, scrollTrigger: { trigger: q('[data-next]')[0], start: 'top 90%', once: true } });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id={s.id} aria-labelledby={`${s.id}-title`} className="grain relative scroll-mt-24 overflow-hidden bg-brand-950 py-16 text-white sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_45%_at_50%_55%,rgba(109,76,176,0.5),transparent),radial-gradient(30%_30%_at_90%_95%,rgba(244,180,0,0.12),transparent),radial-gradient(35%_30%_at_0%_100%,rgba(155,127,212,0.25),transparent)]" />

      <div className="container-x relative z-[2]">
        <Header s={s} n={4} tone="dark" />
      </div>

      {/* The stage: three columns, each a pair of resume versions over the list item it illustrates */}
      <div data-pin className="relative z-[2] pt-12 sm:pt-14">
        <div className="container-x">
          {list && (
            <ul data-pairs className="grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-3 lg:gap-6">
              {list.items.map((t, p) => {
                const pair = PAIRS[p] || PAIRS[0];
                return (
                  <li
                    key={t}
                    data-item
                    className="group relative flex min-w-0 flex-col gap-3 rounded-[28px] bg-white/[0.04] p-4 sm:flex-row sm:items-center lg:flex-col lg:items-stretch ring-1 ring-white/10 transition-[background-color,box-shadow] duration-500 data-active:bg-white/[0.09] data-active:ring-gold-400/60 sm:p-5"
                  >
                    {/* The pair of cards */}
                    <div data-col aria-hidden="true" className="relative h-[250px] shrink-0 sm:w-[300px] lg:h-[280px] lg:w-auto xl:h-[320px]">
                      {pair.cards.map((v, k) => (
                        <div key={v.tag} className="absolute left-1/2 top-1/2 h-[205px] w-[150px] -translate-x-1/2 -translate-y-1/2 lg:h-[228px] lg:w-[168px] xl:h-[270px] xl:w-[200px]" style={{ zIndex: 10 + p * 2 + k }}>
                          <div data-card className="h-full w-full" style={{ transform: `translateX(${REST[k].xPercent}%) rotate(${REST[k].rotation}deg)` }}>
                            <div className="h-full transition-[translate] duration-500 group-hover:-translate-y-3">
                              <VersionCard v={v} tone={pair.tone} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* The list item it illustrates */}
                    <div className="flex flex-1 gap-3.5 rounded-[20px] bg-brand-950/60 p-4 ring-1 ring-white/10 sm:p-5">
                      <span aria-hidden="true" className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-400 text-ink-950">
                        <Icon name="check" className="h-4 w-4" strokeWidth={3} />
                      </span>
                      <span className="min-w-0 flex-1 text-[16px] leading-relaxed text-white/90 sm:text-[16.5px]">
                        <Rich text={t} tone="dark" />
                      </span>
                      <span aria-hidden="true" className="mt-2 flex shrink-0 gap-1">
                        <span className={`h-2.5 w-2.5 rounded-full ${pair.tone.dot}`} />
                        <span className={`h-2.5 w-2.5 rounded-full ${pair.tone.dot} opacity-50`} />
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* The hand-off: the application email */}
      {para && (
        <div className="container-x relative z-[2] pt-5 lg:pt-6">
          <div data-next className="grid grid-cols-[minmax(0,1fr)] items-center gap-5 rounded-[28px] bg-gold-400 p-6 text-ink-950 sm:p-8 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-10 lg:px-10">
            <span aria-hidden="true" className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ink-950 text-gold-400">
              <Icon name="mail" className="h-6 w-6" />
            </span>
            <p className="min-w-0 text-[16.5px] font-medium leading-relaxed sm:text-[17.5px]">
              <Rich text={para.text} />
            </p>
            <span aria-hidden="true" className="flex flex-wrap items-center gap-2 text-[13px] font-bold">
              <span className="rounded-full bg-ink-950/10 px-3.5 py-2">Draft</span>
              <Icon name="arrow" className="h-4 w-4" />
              <span className="rounded-full bg-ink-950/10 px-3.5 py-2">You edit</span>
              <Icon name="arrow" className="h-4 w-4" />
              <span className="rounded-full bg-ink-950 px-3.5 py-2 text-gold-300">You send</span>
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
