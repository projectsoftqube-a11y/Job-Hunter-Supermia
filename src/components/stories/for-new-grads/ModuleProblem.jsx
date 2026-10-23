'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { ModuleHead, PAD, Tick, mod, of } from './shared';

/*
 * Module 1 · The problem. The four reasons it feels harder are lesson cards, each pointing ahead to the
 * module that deals with it, beside a dark "pre-course checklist" whose boxes tick off as it scrolls in.
 */

// Which later module picks up each problem (decorative cross-reference, links to that section)
const AHEAD = [1, 1, 3, 2];

export default function ModuleProblem({ s, index, total, sections }) {
  const root = useRef(null);
  const m = mod(index);
  const cards = of(s, 'cards');
  const lead = of(s, 'p');
  const list = of(s, 'list');

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const cardsEls = q('[data-lesson-card]');
        gsap.set(cardsEls, { y: 46, opacity: 0 });
        ScrollTrigger.batch(cardsEls, {
          start: 'top 90%',
          once: true,
          onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, stagger: 0.1, duration: 1.1, overwrite: true }),
        });

        const box = q('[data-checklist]')[0];
        if (!box) return;
        const count = q('[data-check-count]')[0];
        const n = { v: 0 };
        gsap
          .timeline({ scrollTrigger: { trigger: box, start: 'top 78%', once: true } })
          .from(box, { y: 40, opacity: 0, duration: 1 })
          .from(q('[data-check-row]'), { x: 26, opacity: 0, stagger: 0.12, duration: 0.8 }, 0.2)
          .fromTo(q('[data-check-row] [data-tick-fill]'), { scale: 0 }, { scale: 1, stagger: 0.2, duration: 0.45, ease: 'back.out(2.2)' }, 0.55)
          .fromTo(q('[data-check-row] [data-tick-path]'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, stagger: 0.2, duration: 0.4, ease: 'power2.out' }, 0.7)
          .fromTo(
            n,
            { v: 0 },
            {
              v: list.items.length,
              duration: 0.8,
              ease: 'none',
              onUpdate: () => {
                if (count) count.textContent = String(Math.round(n.v));
              },
            },
            0.6
          );
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id={s.id} data-module={index} aria-labelledby={`${s.id}-title`} className="relative scroll-mt-24 overflow-clip bg-light-lavender py-16 sm:py-20 lg:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_40%_at_100%_0%,rgba(109,76,176,0.12),transparent),radial-gradient(40%_35%_at_0%_100%,rgba(249,195,32,0.12),transparent)]" />
      <div className="container-x relative">
        <div className={PAD}>
          <ModuleHead s={s} index={index} total={total} meta={`${cards.items.length} lessons · 1 checklist`} />

          <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-5 sm:mt-14 xl:grid-cols-12 xl:gap-6">
            <ul className="grid grid-cols-[minmax(0,1fr)] gap-5 sm:grid-cols-2 xl:col-span-8 xl:gap-6">
              {cards.items.map((c, i) => {
                const ahead = sections[AHEAD[i]];
                return (
                  <li
                    key={c.title}
                    data-lesson-card
                    className="group relative flex min-w-0 flex-col overflow-hidden rounded-[26px] bg-white p-6 ring-1 ring-brand-100 shadow-[0_26px_60px_-42px_rgba(26,15,51,0.55)] transition-[translate] duration-500 hover:-translate-y-1.5 sm:p-7"
                  >
                    <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 via-brand-400 to-gold-400 opacity-80" />
                    <div className="flex items-center gap-3">
                      <span className={`flex h-11 w-11 items-center justify-center rounded-[14px] transition-transform duration-500 group-hover:-rotate-6 ${i % 2 ? 'bg-brand-950 text-gold-300' : `${m.badge}`}`}>
                        <Icon name={c.icon || 'spark'} className="h-5 w-5" />
                      </span>
                      <span aria-hidden="true" className={`font-display text-[12px] font-extrabold uppercase tracking-[0.16em] ${m.label}`}>
                        Lesson {index + 1}.{i + 1}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-[1.25rem] font-bold leading-snug tracking-[-0.02em] text-ink-950">{c.title}</h3>
                    <p className="mt-2.5 text-[15.5px] leading-relaxed text-ink-900/70">
                      <Rich text={c.text} />
                    </p>
                    {ahead && (
                      <a
                        href={`#${ahead.id}`}
                        className="mt-auto inline-flex w-fit items-center gap-2 pt-5 text-[13px] font-bold text-brand-600 transition-colors hover:text-brand-800"
                      >
                        <span className={`h-2 w-2 rounded-full ${mod(AHEAD[i]).fill}`} />
                        Covered in Module {AHEAD[i] + 1}: {ahead.eyebrow}
                        <Icon name="arrow" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>

            <div data-checklist className="grain relative flex min-w-0 flex-col overflow-hidden rounded-[28px] bg-brand-950 p-6 text-white shadow-[0_40px_80px_-50px_rgba(26,15,51,0.9)] sm:p-8 xl:col-span-4">
              <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(249,195,32,0.22),transparent_65%)]" />
              <div className="relative z-[2] flex h-full flex-col">
                <div aria-hidden="true" className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-gold-300">
                    <Icon name="list" className="h-4 w-4" />
                    Pre-course checklist
                  </span>
                  <span className="rounded-full bg-white/10 px-2.5 py-1 font-display text-[12px] font-bold tabular-nums text-white/80">
                    <span data-check-count>{list.items.length}</span>/{list.items.length}
                  </span>
                </div>
                <p className="mt-5 font-display text-[1.3rem] font-bold leading-snug tracking-[-0.015em] text-white">
                  <Rich text={lead.text} tone="dark" />
                </p>
                <ul className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-3 md:grid-cols-2 xl:grid-cols-1">
                  {list.items.map((t) => (
                    <li key={t} data-check-row className="flex min-w-0 items-start gap-3.5 rounded-[18px] bg-white/[0.06] p-4 ring-1 ring-white/10">
                      <Tick m={{ tick: 'bg-gold-400', check: 'text-ink-950' }} dark size="h-7 w-7" className="mt-0.5" />
                      <span className="min-w-0 text-[15px] leading-relaxed text-white/85">
                        <Rich text={t} tone="dark" />
                      </span>
                    </li>
                  ))}
                </ul>
                {sections[index + 1] && (
                  <a
                    href={`#${sections[index + 1].id}`}
                    className="group/next mt-auto flex items-center justify-between gap-3 border-t border-white/10 pt-5 text-[14px] font-bold text-white transition-colors hover:text-gold-300 xl:mt-8"
                  >
                    <span>
                      <span className="block text-[10.5px] font-bold uppercase tracking-[0.18em] text-white/45">Up next</span>
                      Module {index + 2}: {sections[index + 1].eyebrow}
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-400 text-ink-950 transition-transform duration-300 group-hover/next:translate-x-1">
                      <Icon name="arrow" className="h-4 w-4" />
                    </span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
