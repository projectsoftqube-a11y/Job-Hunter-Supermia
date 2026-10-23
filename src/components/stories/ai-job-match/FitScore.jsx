'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { Block } from '@/components/page/Blocks';
import { BoardMark, SectionHeading, Intro } from './shared';

/*
 * Chapter 3, "Fit score": one role pulled out of the list and put on a score card. The card on the left is
 * sticky; scrolling the section counts the score up, fills a 20-block bar and links the job's
 * requirements to the skills your resume shows (the two it does not show stay gold). Each of the three
 * reasons to use a score lights the part of the card it relies on (rank, reasoning, missing skills). The
 * callout closes with what the score is not. The card is sample data, decorative.
 */

const SCORE = 92;
const BLOCKS = 20;
const LIT = Math.round((SCORE / 100) * BLOCKS);
const PAIRS = [
  { skill: 'React', ok: true },
  { skill: 'TypeScript', ok: true },
  { skill: 'Design systems', ok: true },
  { skill: 'Senior level', ok: true },
  { skill: 'GraphQL', ok: false },
  { skill: 'Storybook', ok: false },
];
const REASONS = [
  { ok: true, t: 'React and TypeScript match the core stack' },
  { ok: true, t: 'Senior level fits the role' },
  { ok: false, t: 'GraphQL is not on your resume' },
];

function Instrument() {
  return (
    <div data-scorecard aria-hidden="true" className="relative overflow-hidden rounded-[32px] bg-brand-950 p-5 text-white shadow-[0_60px_120px_-60px_rgba(26,15,51,0.9)] sm:p-7">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_30%,rgba(109,76,176,0.55),transparent),radial-gradient(40%_30%_at_90%_100%,rgba(244,180,0,0.16),transparent)]" />
      <div className="relative flex items-center gap-3 rounded-2xl bg-white/[0.06] p-2.5 ring-1 ring-white/10">
        <BoardMark board="LinkedIn" size="h-9 w-9" text="text-[13px]" />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14px] font-bold">Senior Frontend Engineer</span>
          <span className="block truncate text-[12px] font-medium text-white/55">Northwind Labs · LinkedIn</span>
        </span>
        <span className="shrink-0 rounded-full bg-gold-400 px-2.5 py-1 text-[11px] font-bold text-ink-950">Sample</span>
      </div>

      <div className="relative mt-5 flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
        <p className="font-display leading-none">
          <span data-score className="text-[clamp(4.2rem,3rem+3.2vw,6.4rem)] font-extrabold tracking-[-0.05em]">
            {SCORE}
          </span>
          <span className="ml-1 text-[1.3rem] font-bold text-white/45">/100</span>
        </p>
        <p className="pb-2 text-[12px] font-bold uppercase tracking-[0.18em] text-gold-300">Fit with your resume</p>
      </div>
      <div className="relative mt-3 grid grid-cols-[repeat(20,minmax(0,1fr))] gap-[3px]">
        {Array.from({ length: BLOCKS }, (_, i) => (
          <span key={i} className="relative h-3 overflow-hidden rounded-[3px] bg-white/10">
            {i < LIT && <span data-block className={`absolute inset-0 ${i < 12 ? 'bg-brand-400' : 'bg-gold-400'}`} />}
          </span>
        ))}
      </div>

      <div data-facet="2" className="group/facet relative isolate mt-5 rounded-2xl bg-white/[0.04] p-3 ring-1 ring-white/10">
        <span className="pointer-events-none absolute inset-0 -z-[1] rounded-2xl bg-gold-400/10 opacity-0 ring-2 ring-inset ring-gold-400/70 transition-opacity duration-500 group-data-[on=true]/facet:opacity-100" />
        <p className="flex items-center justify-between px-0.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white/55">
          <span>Job asks for</span>
          <span className="text-gold-300">4 of 6 on your resume</span>
        </p>
        <div className="mt-2.5 grid grid-cols-3 gap-x-2 gap-y-3">
          {PAIRS.map((p) => (
            <div key={p.skill} className="flex min-w-0 flex-col items-stretch">
              <span className={`truncate rounded-lg px-2 py-1 text-center text-[11.5px] font-bold ${p.ok ? 'bg-brand-500/40 text-white' : 'bg-gold-400 text-ink-950'}`}>{p.skill}</span>
              <span className="mx-auto h-3 w-[2px] overflow-hidden">
                {p.ok && <span data-link className="block h-full w-full origin-top bg-brand-300" />}
              </span>
              {p.ok ? (
                <span data-have className="truncate rounded-lg border border-brand-300/50 px-2 py-1 text-center text-[11.5px] font-semibold text-brand-100">
                  ✓ {p.skill}
                </span>
              ) : (
                <span className="truncate rounded-lg border border-dashed border-gold-300/60 px-2 py-1 text-center text-[11.5px] font-semibold text-gold-200">not shown</span>
              )}
            </div>
          ))}
        </div>
        <p className="mt-2.5 px-0.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white/55">Your resume shows</p>
      </div>

      <div className="relative mt-5 grid gap-2.5">
        <div data-facet="0" className="flex items-center justify-between gap-3 rounded-2xl bg-white/[0.05] px-3.5 py-2.5 ring-1 ring-white/10 group/facet relative isolate">
          <span className="pointer-events-none absolute inset-0 -z-[1] rounded-2xl bg-gold-400/15 opacity-0 ring-2 ring-inset ring-gold-400/70 transition-opacity duration-500 group-data-[on=true]/facet:opacity-100" />
          <span className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] text-white/60">
            <Icon name="target" className="h-4 w-4 text-gold-300" />
            Your list
          </span>
          <span className="font-display text-[14px] font-extrabold">Rank 1 of 6</span>
        </div>
        <div data-facet="1" className="rounded-2xl bg-white/[0.05] px-3.5 py-3 ring-1 ring-white/10 group/facet relative isolate">
          <span className="pointer-events-none absolute inset-0 -z-[1] rounded-2xl bg-gold-400/15 opacity-0 ring-2 ring-inset ring-gold-400/70 transition-opacity duration-500 group-data-[on=true]/facet:opacity-100" />
          <span className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] text-white/60">
            <Icon name="search" className="h-4 w-4 text-gold-300" />
            Reasoning
          </span>
          <ul className="mt-2 space-y-1.5">
            {REASONS.map((r) => (
              <li key={r.t} className="flex items-center gap-2 text-[13px] font-medium text-white/85">
                <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${r.ok ? 'bg-emerald-400/20 text-emerald-300' : 'bg-gold-400 text-ink-950'}`}>{r.ok ? '✓' : '!'}</span>
                {r.t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ScoreNot({ title, text }) {
  return (
    <aside data-callout className="relative mt-5 grid grid-cols-[minmax(0,1fr)] items-center gap-5 overflow-hidden rounded-[26px] border border-gold-300 bg-gold-50 p-5 sm:grid-cols-[auto_minmax(0,1fr)] sm:p-6">
      <div aria-hidden="true" className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-950 px-3 py-1.5 text-[12px] font-bold text-gold-300">
          <Icon name="compass" className="h-4 w-4" />
          A guide
        </span>
        <span className="relative inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[12px] font-bold text-ink-900/45 ring-1 ring-gold-300">
          A prediction
          <span className="absolute inset-x-2 top-1/2 h-[2px] -rotate-6 rounded bg-gold-600" />
        </span>
      </div>
      <div className="min-w-0">
        {title && <p className="font-display text-[1.1rem] font-bold text-ink-950">{title}</p>}
        <p className="mt-1 text-[16px] leading-relaxed text-ink-900/80">
          <Rich text={text} />
        </p>
      </div>
    </aside>
  );
}

export default function FitScore({ s, n }) {
  const root = useRef(null);
  const cards = s.blocks.find((b) => b.type === 'cards');
  const callout = s.blocks.find((b) => b.type === 'callout');
  const others = s.blocks.filter((b) => b !== cards && b !== callout);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const card = q('[data-scorecard]')[0];
        const num = q('[data-score]')[0];
        const counter = { v: 0 };
        const desktop = window.matchMedia('(min-width: 1024px)').matches;
        // Desktop: the score counts and the bar fills with the scroll; phones: once on arrival
        const trigger = desktop ? { trigger: root.current, start: 'top 65%', end: 'center 45%', scrub: true } : { trigger: card, start: 'top 80%', once: true };
        let shown = -1;
        gsap
          .timeline({ defaults: { ease: desktop ? 'none' : 'expo.out', duration: desktop ? 1 : 2 }, scrollTrigger: trigger })
          .fromTo(
            counter,
            { v: 0 },
            {
              v: SCORE,
              onUpdate: () => {
                const v = Math.round(counter.v);
                if (v !== shown) num.textContent = shown = v;
              },
            },
            0
          )
          .from(q('[data-block]'), { opacity: 0, scaleY: 0.3, stagger: desktop ? 0.045 : 0.05, duration: desktop ? 0.15 : 0.4 }, 0)
          .from(q('[data-link]'), { scaleY: 0, stagger: 0.1, duration: desktop ? 0.2 : 0.5 }, desktop ? 0.45 : 0.4)
          .from(q('[data-have]'), { y: 10, opacity: 0, stagger: 0.1, duration: desktop ? 0.2 : 0.6 }, desktop ? 0.55 : 0.5);

        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: 'top 75%', once: true } })
          .from(q('[data-intro]'), { y: 30, opacity: 0, duration: 1.1 }, 0)
          .from(card, { y: 60, scale: 0.94, opacity: 0, duration: 1.3 }, 0.1);
        gsap.set(q('[data-reason], [data-callout]'), { y: 50, opacity: 0 });
        ScrollTrigger.batch(q('[data-reason], [data-callout]'), { start: 'top 90%', once: true, onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, stagger: 0.12, duration: 1.1 }) });

        // Each reason lights the part of the instrument it relies on: one trigger over the list, DOM toggles only
        const facets = q('[data-facet]').sort((x, y) => Number(x.dataset.facet) - Number(y.dataset.facet));
        const cardsEl = q('[data-reason-card]');
        let lit = -1;
        const light = (i) => {
          if (i === lit) return;
          lit = i;
          facets.forEach((f, k) => (f.dataset.on = k === i ? 'true' : 'false'));
          cardsEl.forEach((c, k) => (c.dataset.on = k === i ? 'true' : 'false'));
        };
        ScrollTrigger.create({
          trigger: q('[data-reasons]')[0],
          start: 'top 62%',
          end: 'bottom 38%',
          onUpdate: (self) => light(Math.min(cardsEl.length - 1, Math.floor(self.progress * cardsEl.length))),
          onLeave: () => light(-1),
          onLeaveBack: () => light(-1),
        });

        return () => {
          num.textContent = SCORE;
          facets.forEach((f) => delete f.dataset.on);
          cardsEl.forEach((c) => delete c.dataset.on);
        };
      });
    },
    { scope: root }
  );

  return (
    <section id={s.id} ref={root} aria-labelledby={`${s.id}-title`} className="relative scroll-mt-24 overflow-clip bg-white py-[60px] sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(35%_35%_at_0%_30%,rgba(196,179,234,0.35),transparent),radial-gradient(30%_30%_at_100%_85%,rgba(252,211,77,0.14),transparent)]" />
      <div className="container-x relative grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-14 xl:gap-20">
        <div className="min-w-0 lg:col-start-2 lg:row-start-1">
          <SectionHeading s={s} n={n} />
          <Intro text={s.intro} className="mt-6" />

          {cards && (
            <ul data-reasons className="mt-10 space-y-3">
              {cards.items.map((c, i) => (
                <li key={c.title} data-reason>
                  <div
                    data-reason-card
                    className="group relative grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4 overflow-hidden rounded-[24px] border border-hairline bg-white p-5 shadow-[0_24px_50px_-40px_rgba(26,15,51,0.55)] transition-transform duration-500 hover:-translate-y-1 sm:p-6"
                  >
                    <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[24px] opacity-0 ring-2 ring-inset ring-brand-300 transition-opacity duration-500 group-hover:opacity-60 group-data-[on=true]:opacity-100" />
                  <span aria-hidden="true" className="pointer-events-none absolute -right-2 -top-5 font-display text-[6rem] font-extrabold leading-none tracking-[-0.06em] text-brand-50">
                    {i + 1}
                  </span>
                  <span aria-hidden="true" className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-900 text-gold-300 shadow-[0_12px_24px_-12px_rgba(75,46,131,0.8)] transition-transform duration-500 group-hover:-rotate-6">
                    <Icon name={c.icon || 'spark'} className="h-5 w-5" />
                  </span>
                  <div className="relative min-w-0">
                    <h3 className="font-display text-[1.25rem] font-bold leading-snug tracking-[-0.02em] text-ink-950">{c.title}</h3>
                    <p className="mt-1.5 max-w-[36rem] text-[15.5px] leading-relaxed text-ink-900/70">
                      <Rich text={c.text} />
                    </p>
                  </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {callout && <ScoreNot title={callout.title} text={callout.text} />}
          {others.length > 0 && (
            <div className="mt-6 space-y-5">
              {others.map((b, i) => (
                <Block key={i} b={b} />
              ))}
            </div>
          )}
        </div>

        <div className="min-w-0 lg:sticky lg:top-28 lg:col-start-1 lg:row-start-1">
          <Instrument />
        </div>
      </div>
    </section>
  );
}
