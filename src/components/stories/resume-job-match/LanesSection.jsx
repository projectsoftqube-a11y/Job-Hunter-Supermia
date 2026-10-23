'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { Header, Glyph } from './shared';

/*
 * Chapter 3, "Missing skills": the table becomes three full-colour lanes (emerald, brand purple, ink),
 * each keeping the table's header labels beside its values (real text). On desktop, sample skill chips
 * start in the dark "missing skills" tray and fly into their lanes as you scroll (scrubbed); on phones
 * the lanes simply rise in. The closing paragraph sits beside a resume line that holds up in interview.
 */

const LANES = [
  { glyph: 'plus', action: 'Add it', skills: ['GraphQL', 'Accessibility'], bg: 'bg-emerald-700', chip: 'text-emerald-800', icon: 'text-emerald-700' },
  { glyph: 'up', action: 'Move it up', skills: ['Design systems', 'Mentoring'], bg: 'bg-brand-600', chip: 'text-brand-700', icon: 'text-brand-600' },
  { glyph: 'x', action: 'Leave it off', skills: ['Kubernetes', 'Rust'], bg: 'bg-ink-950', chip: 'text-ink-900/45 line-through decoration-ink-900/40', icon: 'text-ink-950' },
];
const ALL = LANES.flatMap((l) => l.skills);

export default function LanesSection({ s }) {
  const root = useRef(null);
  const table = s.blocks.find((b) => b.type === 'table');
  const para = s.blocks.find((b) => b.type === 'p');
  const [h0, h1] = table?.head || [];

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      // Desktop: chips fly from their tray slot into their lane, scrubbed with scroll
      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        const slots = q('[data-slot]');
        const delta = (chip, axis) => {
          const slot = slots[Number(chip.dataset.chip)];
          const a = slot.getBoundingClientRect();
          const b = chip.getBoundingClientRect();
          const cur = Number(gsap.getProperty(chip, axis)) || 0;
          return axis === 'x' ? a.left + a.width / 2 - (b.left + b.width / 2 - cur) : a.top + a.height / 2 - (b.top + b.height / 2 - cur);
        };
        gsap
          .timeline({ scrollTrigger: { trigger: q('[data-lanes]')[0], start: 'top 85%', end: 'top 25%', scrub: 0.4, invalidateOnRefresh: true } })
          .from(q('[data-chip]'), { x: (_, el) => delta(el, 'x'), y: (_, el) => delta(el, 'y'), rotation: (i) => (i % 2 ? 8 : -8), stagger: 0.09, duration: 1, ease: 'power2.inOut' }, 0)
          .from(q('[data-ghost]'), { opacity: 0, duration: 0.01 }, 0.2)
          .from(q('[data-action]'), { scale: 0.7, opacity: 0, stagger: 0.15, duration: 0.4, ease: 'back.out(2)' }, 1);
      });

      mm.add(`(max-width: 1023px) and ${MOTION_OK}`, () => {
        const lanes = q('[data-lane]');
        gsap.set(lanes, { y: 50, opacity: 0 });
        ScrollTrigger.batch(lanes, { start: 'top 92%', once: true, onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, stagger: 0.12, duration: 1.1, ease: 'expo.out', overwrite: true }) });
      });

      mm.add(MOTION_OK, () => {
        gsap.from(q('[data-honest] > *'), { y: 40, opacity: 0, stagger: 0.12, duration: 1.2, scrollTrigger: { trigger: q('[data-honest]')[0], start: 'top 85%', once: true } });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id={s.id} aria-labelledby={`${s.id}-title`} className="relative scroll-mt-24 overflow-hidden bg-light-lavender py-16 sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_40%_at_10%_20%,rgba(196,179,234,0.5),transparent),radial-gradient(35%_35%_at_95%_90%,rgba(252,211,77,0.16),transparent)]" />
      <div className="container-x relative">
        <Header s={s} n={3} />

        {/* The tray of missing skills the chips sort out of */}
        <div aria-hidden="true" className="mt-12 flex flex-col gap-4 rounded-[28px] bg-brand-950 p-5 text-white shadow-[0_24px_44px_-30px_rgba(26,15,51,0.8)] sm:mt-14 lg:flex-row lg:items-center lg:gap-6 lg:p-6">
          <span className="flex shrink-0 items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-400 text-ink-950">
              <Icon name="search" className="h-5 w-5" />
            </span>
            <span>
              <span className="block font-display text-[1.05rem] font-bold">Missing from your resume</span>
              <span className="block text-[13px] font-medium text-white/60">{ALL.length} skills this job asks for, sorted into 3 lanes</span>
            </span>
          </span>
          <span className="flex flex-wrap gap-2 lg:ml-auto">
            {ALL.map((k, i) => (
              <span key={k} data-slot={i} className="flex h-9 min-w-[7rem] items-center justify-center rounded-full border border-dashed border-white/20 px-3">
                <span data-ghost className="text-[12.5px] font-semibold text-white/35">{k}</span>
              </span>
            ))}
          </span>
        </div>

        {/* Lanes: one per table row, each value beside its header label */}
        <ol data-lanes className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-4 lg:mt-5 lg:grid-cols-3 lg:gap-5">
          {(table?.rows || []).map((row, i) => {
            const lane = LANES[i] || LANES[0];
            let offset = 0;
            for (let k = 0; k < i; k += 1) offset += LANES[k].skills.length;
            return (
              <li key={row[0]} data-lane className={`relative flex min-w-0 flex-col rounded-[30px] p-6 text-white shadow-[0_24px_44px_-30px_rgba(26,15,51,0.8)] sm:p-8 ${lane.bg}`}>
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[30px] bg-[radial-gradient(60%_50%_at_100%_0%,rgba(255,255,255,0.16),transparent)]" />
                <div className="relative flex items-center justify-between gap-3">
                  <span aria-hidden="true" data-action className="flex items-center gap-3">
                    <span className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-white ${lane.icon}`}>
                      <Glyph name={lane.glyph} className="h-6 w-6" strokeWidth={3} />
                    </span>
                    <span className="font-display text-[1.3rem] font-extrabold tracking-[-0.02em]">{lane.action}</span>
                  </span>
                  <span aria-hidden="true" className="font-display text-[2.6rem] font-extrabold leading-none tracking-[-0.05em] text-white/15">
                    0{i + 1}
                  </span>
                </div>

                <p className="relative mt-7 text-[12px] font-bold uppercase tracking-[0.14em] text-white/70">{h0}</p>
                <h3 className="relative mt-1.5 font-display text-[1.45rem] font-bold leading-snug tracking-[-0.02em] sm:text-[1.6rem]">{row[0]}</h3>

                {/* Drop zone */}
                <div aria-hidden="true" className="relative mt-5 flex min-h-[64px] flex-wrap items-center gap-2 rounded-2xl bg-black/15 p-3 ring-1 ring-white/15">
                  {lane.skills.map((k, j) => (
                    <span key={k} data-chip={offset + j} className={`relative z-[2] flex h-9 items-center gap-1.5 rounded-full bg-white px-3.5 text-[13px] font-bold shadow-[0_6px_12px_-8px_rgba(0,0,0,0.6)] ${lane.chip}`}>
                      {i < 2 && <Glyph name={lane.glyph} className="h-3.5 w-3.5" strokeWidth={3} />}
                      {k}
                    </span>
                  ))}
                </div>

                <p className="relative mt-6 text-[12px] font-bold uppercase tracking-[0.14em] text-white/70">{h1}</p>
                <p className="relative mt-1.5 text-[16.5px] leading-relaxed text-white/90">
                  <Rich text={row[1]} tone="dark" />
                </p>
              </li>
            );
          })}
        </ol>

        {/* Honesty check */}
        {para && (
          <div data-honest className="mt-5 grid grid-cols-[minmax(0,1fr)] items-center gap-8 rounded-[30px] bg-white p-7 shadow-[0_24px_44px_-34px_rgba(26,15,51,0.6)] sm:p-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14 lg:p-12">
            <div className="flex min-w-0 flex-col gap-5 sm:flex-row">
              <span aria-hidden="true" className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-white">
                <Icon name="shield" className="h-7 w-7" />
              </span>
              <p className="font-display text-[clamp(1.2rem,1rem+0.7vw,1.6rem)] font-semibold leading-[1.45] tracking-[-0.015em] text-ink-950">
                <Rich text={para.text} />
              </p>
            </div>
            <div aria-hidden="true" className="relative min-w-0 rounded-[24px] bg-brand-950 p-5 text-white sm:p-6">
              <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-gold-300">On your resume</span>
              <span className="mt-2.5 flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 text-[14px] font-semibold text-ink-950">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <Glyph name="check" className="h-3.5 w-3.5" strokeWidth={3.2} />
                </span>
                <span className="truncate">Built the GraphQL layer for checkout</span>
              </span>
              <span className="mt-3 flex w-fit max-w-full items-center gap-2 rounded-2xl rounded-bl-md bg-white/10 px-4 py-3 text-[14px] font-semibold">
                <Icon name="mic" className="h-4 w-4 shrink-0 text-gold-300" />
                <span className="truncate">“Walk me through that project.”</span>
              </span>
              <span className="mt-3 flex items-center justify-end gap-2 text-[12px] font-bold text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Every line holds up
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
