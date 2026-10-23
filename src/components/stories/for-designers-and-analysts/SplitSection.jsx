'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { Header, Handles, Glyph } from './shared';

/*
 * Frame 1, "The problem": a split stage. On the left a brand-purple designer board, on the right an
 * emerald analyst board, each showing one title split into two very different postings. As you scroll
 * the two boards slide together and lock at a gold seam. Below, the three problems as artboards with
 * frame names and selection handles on hover, then the answer as a dark statement band. Boards and
 * mini drawings are decorative sample data (aria-hidden).
 */

function Posting({ company, focus, chips, selected, children, tone }) {
  return (
    <div className="relative rounded-[18px] bg-white p-4 text-ink-950 shadow-[0_16px_30px_-20px_rgba(0,0,0,0.6)] sm:p-5">
      {selected && <Handles className="rounded-[22px] border-gold-400" color="bg-white border-gold-400" />}
      <div className="flex items-center justify-between gap-3">
        <span className="min-w-0">
          <span className="block truncate text-[12px] font-semibold text-ink-900/55">{company}</span>
          <span className="block truncate font-display text-[15px] font-bold tracking-[-0.01em] sm:text-[17px]">{focus}</span>
        </span>
        {children}
      </div>
      <span className="mt-3 flex flex-wrap gap-1.5">
        {chips.map((c) => (
          <span key={c} className={`rounded-full px-2.5 py-1 text-[11.5px] font-bold ${tone}`}>
            {c}
          </span>
        ))}
      </span>
    </div>
  );
}

function Board({ side }) {
  const designer = side === 'designer';
  return (
    <div
      data-board={side}
      aria-hidden="true"
      className={`relative min-w-0 overflow-hidden p-6 text-white sm:p-8 lg:p-10 xl:p-12 ${designer ? 'rounded-t-[30px] bg-brand-600 lg:rounded-l-[36px] lg:rounded-tr-none' : 'rounded-b-[30px] bg-emerald-700 lg:rounded-r-[36px] lg:rounded-bl-none'}`}
    >
      <span className={`pointer-events-none absolute -top-24 h-72 w-72 rounded-full ${designer ? '-left-20 bg-[radial-gradient(closest-side,rgba(196,179,234,0.45),transparent)]' : '-right-20 bg-[radial-gradient(closest-side,rgba(252,211,77,0.3),transparent)]'}`} />
      <div className="relative flex items-center justify-between gap-3">
        <span className="rounded-full bg-white/15 px-3 py-1 text-[12px] font-bold uppercase tracking-[0.14em]">{designer ? 'Design' : 'Analytics'}</span>
        <span className="text-[12px] font-semibold text-white/65">Same title, 2 postings</span>
      </div>
      <p className="relative mt-5 font-display text-[clamp(1.8rem,1.3rem+1.6vw,2.8rem)] font-extrabold leading-none tracking-[-0.04em]">{designer ? 'Product designer' : 'Data analyst'}</p>
      <div className="relative mt-6 space-y-3">
        {designer ? (
          <>
            <Posting company="Lumen Studio" focus="Mostly research" chips={['User interviews', 'Usability testing', 'Synthesis']} tone="bg-brand-50 text-brand-700">
              <span className="flex shrink-0 -space-x-2">
                {['bg-gold-300', 'bg-rose-300', 'bg-brand-300'].map((c) => (
                  <span key={c} className={`h-7 w-7 rounded-full ring-2 ring-white ${c}`} />
                ))}
              </span>
            </Posting>
            <Posting company="Northwind Labs" focus="Mostly visual systems" chips={['Design systems', 'UI craft', 'Prototyping']} tone="bg-brand-50 text-brand-700" selected>
              <span className="grid shrink-0 grid-cols-3 gap-1">
                {Array.from({ length: 6 }, (_, i) => (
                  <span key={i} className={`h-3 w-3 rounded-[3px] ${['bg-brand-500', 'bg-gold-400', 'bg-emerald-400', 'bg-rose-300', 'bg-brand-300', 'bg-ink-950'][i]}`} />
                ))}
              </span>
            </Posting>
          </>
        ) : (
          <>
            <Posting company="Brightpath Software" focus="Lives in dashboards" chips={['Dashboards', 'Reporting', 'BI']} tone="bg-emerald-50 text-emerald-800">
              <span className="flex h-8 shrink-0 items-end gap-1">
                {[45, 70, 55, 90, 65].map((h, i) => (
                  <span key={i} className="w-2 rounded-t-[2px] bg-emerald-500" style={{ height: `${h}%` }} />
                ))}
              </span>
            </Posting>
            <Posting company="Northwind Labs" focus="SQL and experiments" chips={['SQL', 'A/B testing', 'Statistics']} tone="bg-emerald-50 text-emerald-800" selected>
              <svg viewBox="0 0 60 30" className="h-8 w-14 shrink-0">
                <path d="M2 24 L14 18 L24 21 L36 10 L46 13 L58 4" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Posting>
          </>
        )}
      </div>
    </div>
  );
}

function Art({ i }) {
  if (i === 0)
    return (
      <div aria-hidden="true" className="grid h-full grid-cols-2 gap-2 p-4">
        {[
          ['UX designer', 'Product designer', 'UX researcher', 'bg-brand-600'],
          ['Data analyst', 'BI analyst', 'Data scientist', 'bg-emerald-600'],
        ].map(([a, b, c, dot]) => (
          <div key={a} className="flex flex-col justify-center gap-1.5">
            {[a, b, c].map((t, k) => (
              <span key={t} className="flex items-center gap-2 rounded-lg bg-white px-2.5 py-1.5 text-[11.5px] font-bold text-ink-950 shadow-[0_6px_12px_-10px_rgba(26,15,51,0.6)]" style={{ marginLeft: `${k * 8}px` }}>
                <span className={`h-2 w-2 shrink-0 rounded-[2px] ${dot}`} />
                <span className="truncate">{t}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    );
  if (i === 1)
    return (
      <div aria-hidden="true" className="flex h-full flex-wrap content-center gap-1.5 p-4">
        {[
          ['Prototyping', true],
          ['Usability testing', true],
          ['SQL', true],
          ['Python', false],
          ['Experimentation', false],
          ['Design tokens', true],
          ['Data modeling', false],
          ['Accessibility', true],
        ].map(([t, ok]) => (
          <span key={t} className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11.5px] font-bold ${ok ? 'bg-ink-950 text-white' : 'border border-dashed border-gold-600 bg-white text-gold-800'}`}>
            {ok ? <Glyph name="check" className="h-3 w-3 text-gold-400" strokeWidth={3.2} /> : <span className="text-[12px] leading-none">?</span>}
            {t}
          </span>
        ))}
      </div>
    );
  return (
    <div aria-hidden="true" className="flex h-full items-center justify-center gap-3 p-4">
      {[
        ['Research resume', 'bg-emerald-500', true],
        ['UI role', 'bg-rose-400', false],
      ].map(([t, c, strong], k) => (
        <div key={t} className="contents">
          {k === 1 && <Glyph name="arrow" className="h-5 w-5 shrink-0 text-ink-900/40" strokeWidth={2.4} />}
          <div className="w-[42%] rounded-xl bg-white p-2.5 shadow-[0_8px_16px_-12px_rgba(26,15,51,0.6)]">
            <span className="block truncate text-[10.5px] font-bold text-ink-950">{t}</span>
            <span className="mt-2 block space-y-1">
              {[100, 80, 90, 60].map((w, j) => (
                <span key={j} className={`block h-1.5 rounded-full ${strong && j < 3 ? c : j === 0 ? c : 'bg-brand-100'}`} style={{ width: `${w}%` }} />
              ))}
            </span>
            <span className={`mt-2 inline-block rounded-full px-1.5 py-0.5 text-[9.5px] font-bold ${strong ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-700'}`}>{strong ? 'Strong here' : 'Reads thin'}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

const ART_BG = ['bg-brand-100', 'bg-gold-100', 'bg-emerald-100'];
const FRAME = ['Titles', 'Tool lists', 'Framing'];

export default function SplitSection({ s }) {
  const root = useRef(null);
  const cards = s.blocks.find((b) => b.type === 'cards')?.items || [];
  const para = s.blocks.find((b) => b.type === 'p');

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      // Desktop: the two boards slide together and lock at the seam
      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        gsap
          .timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: q('[data-split]')[0], start: 'top 85%', end: 'center 55%', scrub: 0.4 } })
          .fromTo(q('[data-board="designer"]'), { xPercent: -9, rotation: -2.5 }, { xPercent: 0, rotation: 0, duration: 1 }, 0)
          .fromTo(q('[data-board="analyst"]'), { xPercent: 9, rotation: 2.5 }, { xPercent: 0, rotation: 0, duration: 1 }, 0)
          .fromTo(q('[data-seam]'), { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'back.out(2)' }, 0.8);
      });

      mm.add(MOTION_OK, () => {
        const frames = q('[data-frame]');
        gsap.set(frames, { y: 50, opacity: 0 });
        ScrollTrigger.batch(frames, { start: 'top 90%', once: true, onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, stagger: 0.12, duration: 1.1, ease: 'expo.out', overwrite: true }) });
        gsap.from(q('[data-answer] > *'), { y: 30, opacity: 0, stagger: 0.12, duration: 1.1, scrollTrigger: { trigger: q('[data-answer]')[0], start: 'top 88%', once: true } });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id={s.id} aria-labelledby={`${s.id}-title`} className="relative scroll-mt-24 overflow-hidden bg-light-lavender py-16 sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_35%_at_10%_10%,rgba(196,179,234,0.55),transparent),radial-gradient(35%_35%_at_95%_40%,rgba(16,185,129,0.1),transparent)]" />
      <div className="container-x relative">
        <Header s={s} n={1} />

        {/* Designer | analyst: one title, different jobs */}
        <div data-split className="relative mt-12 grid grid-cols-[minmax(0,1fr)] sm:mt-16 lg:grid-cols-2">
          <Board side="designer" />
          <Board side="analyst" />
          <span aria-hidden="true" className="absolute left-1/2 top-1/2 z-[2] hidden -translate-x-1/2 -translate-y-1/2 lg:block">
            <span data-seam className="flex items-center gap-2 whitespace-nowrap rounded-full bg-gold-400 px-5 py-2.5 font-display text-[15px] font-extrabold text-ink-950 shadow-[0_16px_30px_-14px_rgba(0,0,0,0.6)] ring-4 ring-light-lavender">
              <Icon name="layers" className="h-4 w-4" />
              Same title, different work
            </span>
          </span>
        </div>

        {/* The three problems as artboards */}
        <ul className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-6 md:grid-cols-3 lg:mt-16 lg:gap-7">
          {cards.map((c, i) => (
            <li key={c.title} data-frame className="group flex min-w-0 flex-col">
              <span aria-hidden="true" className="mb-2 flex items-center gap-2 px-1 text-[12px] font-bold text-ink-900/55">
                <span className="text-brand-500">#</span>
                {FRAME[i]}
              </span>
              <div className="relative flex flex-1 flex-col rounded-[24px] bg-white shadow-[0_24px_44px_-32px_rgba(26,15,51,0.6)] ring-1 ring-brand-100">
                <Handles className="rounded-[28px] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className={`h-[170px] overflow-hidden rounded-t-[24px] ${ART_BG[i]}`}>
                  <Art i={i} />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-950 text-gold-400">
                    <Icon name={c.icon || 'spark'} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-[1.3rem] font-bold leading-snug tracking-[-0.02em] text-ink-950">{c.title}</h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-ink-900/75">
                    <Rich text={c.text} />
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* The answer */}
        {para && (
          <div data-answer className="mt-12 grid grid-cols-[minmax(0,1fr)] items-center gap-8 rounded-[32px] bg-brand-950 p-7 text-white sm:p-10 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-14 lg:p-14">
            <p className="font-display text-[clamp(1.35rem,1rem+1.2vw,2.2rem)] font-bold leading-[1.3] tracking-[-0.025em]">
              <Rich text={para.text} tone="dark" />
            </p>
            <div aria-hidden="true" className="flex items-center gap-4">
              <span className="relative h-24 w-24">
                {[0, 1, 2, 3, 4].map((k) => (
                  <span key={k} className="absolute h-20 w-16 rounded-lg bg-white/10 ring-1 ring-white/10" style={{ left: `${k * 5}px`, top: `${k * 3}px`, transform: `rotate(${(k - 2) * 4}deg)` }} />
                ))}
              </span>
              <Glyph name="arrow" className="h-7 w-7 text-gold-400" strokeWidth={2.4} />
              <span className="flex gap-2">
                {[0, 1].map((k) => (
                  <span key={k} className="flex h-20 w-16 flex-col gap-1.5 rounded-lg bg-white p-2.5 shadow-[0_12px_24px_-14px_rgba(244,180,0,0.8)]">
                    <span className="h-1.5 w-full rounded-full bg-gold-400" />
                    <span className="h-1.5 w-[80%] rounded-full bg-brand-200" />
                    <span className="h-1.5 w-[90%] rounded-full bg-brand-200" />
                    <span className="mt-auto flex h-4 w-4 items-center justify-center self-end rounded-full bg-emerald-500 text-white">
                      <Glyph name="check" className="h-2.5 w-2.5" strokeWidth={3.6} />
                    </span>
                  </span>
                ))}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
