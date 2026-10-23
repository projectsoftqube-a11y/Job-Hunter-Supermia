'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { Block } from '@/components/page/Blocks';
import CreativeHeading from '@/components/CreativeHeading';
import { AppMark, BoardMark, SampleTag, StepPill, StepRail, Who, h2Class, pick } from './shared';

/*
 * Step 1, "Your plan": what feels hard, answered inside the product. One finished "Restart plan" board
 * from the JobHunter app: each worry (the real cards, h3 + text) sits on the left of its row and the
 * feature that handles it on the right as a small, complete product panel (guided practice with a hint,
 * the gap question in the HR round, a resume match score, one search across three boards). The closing
 * paragraph is the gold footer of the board. Panels are decorative sample data (aria-hidden).
 * Motion: the board rises in, then each row lands as it scrolls into view: worry from the left, the
 * connector draws, the panel slides in and its status pops (one batch, transform/opacity only).
 */

function PanelHead({ icon, title, tag }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-gold-400 text-ink-950">
        <Icon name={icon} className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1 text-[14px] font-bold text-white">{title}</span>
      <span data-status className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-400/15 px-2.5 py-1 text-[11px] font-bold text-emerald-300 ring-1 ring-emerald-300/30">
        <Icon name="check" className="h-3 w-3" strokeWidth={3} />
        {tag}
      </span>
    </div>
  );
}

const panelCls = 'relative h-full min-w-0 overflow-hidden rounded-[22px] bg-brand-950 p-4 text-white shadow-[0_30px_60px_-36px_rgba(26,15,51,0.9)] sm:p-5';

function PracticePanel() {
  return (
    <div className={panelCls}>
      <PanelHead icon="mic" title="AI mock interview" tag="Guided practice" />
      <div className="mt-4 grid gap-3 sm:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <div className="space-y-2">
          <p className="max-w-[92%] rounded-2xl rounded-tl-md bg-white px-3.5 py-2.5 text-[13px] font-semibold leading-snug text-ink-950">Tell me a little about yourself.</p>
          <p className="flex gap-2 rounded-2xl bg-gold-400 px-3.5 py-2.5 text-[12.5px] font-semibold leading-snug text-ink-950">
            <Icon name="spark" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            Hint: start with your last role, then one line about your break.
          </p>
        </div>
        <div className="flex flex-col justify-between gap-3 rounded-2xl bg-white/[0.06] p-3 ring-1 ring-white/10">
          <span className="text-[11.5px] font-semibold text-white/60">Round 1 of 4</span>
          <span className="text-[13px] font-bold leading-snug">HR &amp; Introduction</span>
          <span className="flex items-center justify-between rounded-full bg-white/10 p-1 text-[11px] font-bold">
            <span className="rounded-full bg-gold-400 px-2.5 py-1 text-ink-950">Hints on</span>
            <span className="px-2 text-white/60">Strict</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function GapPanel() {
  const parts = ['What you did', 'What you kept up', 'Why now'];
  return (
    <div className={panelCls}>
      <PanelHead icon="chat" title="HR & Introduction round" tag="Gap question" />
      <p className="mt-4 rounded-2xl rounded-tl-md bg-white px-3.5 py-2.5 text-[13px] font-semibold leading-snug text-ink-950">Can you walk me through the gap on your resume?</p>
      <div className="mt-3 grid grid-cols-[minmax(0,1fr)] gap-2 sm:grid-cols-3">
        {parts.map((p, i) => (
          <span key={p} className="flex items-center gap-2 rounded-xl bg-white/[0.07] px-2.5 py-2 text-[12px] font-bold ring-1 ring-white/10">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-400 font-display text-[10.5px] font-extrabold text-white">{i + 1}</span>
            {p}
          </span>
        ))}
      </div>
      <p className="mt-3 flex items-center gap-2 text-[12px] font-semibold text-white/65">
        <Icon name="mic" className="h-3.5 w-3.5 text-gold-300" />
        Answered out loud, with follow-up questions
      </p>
    </div>
  );
}

function MatchPanel() {
  return (
    <div className={panelCls}>
      <PanelHead icon="target" title="Resume match score" tag="One job" />
      <div className="mt-4 grid items-center gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
        <span className="flex min-w-0 items-center gap-2.5">
          <BoardMark board="Indeed" className="h-8 w-8 text-[12px]" />
          <span className="min-w-0">
            <span className="block text-[13.5px] font-bold leading-tight">Accounts Payable Specialist</span>
            <span className="block text-[11.5px] font-medium text-white/55">Northwind Labs · Indeed</span>
          </span>
        </span>
        <span className="font-display leading-none">
          <span className="text-[2.1rem] font-extrabold tracking-[-0.04em]">84</span>
          <span className="ml-0.5 text-[13px] font-bold text-white/45">/100</span>
        </span>
      </div>
      <span className="mt-2.5 grid grid-cols-[repeat(20,minmax(0,1fr))] gap-[3px]">
        {Array.from({ length: 20 }, (_, i) => (
          <span key={i} className={`h-2 rounded-[2px] ${i < 17 ? (i < 12 ? 'bg-brand-400' : 'bg-gold-400') : 'bg-white/15'}`} />
        ))}
      </span>
      <span className="mt-3 flex flex-wrap gap-1.5 text-[11.5px] font-bold">
        <span className="rounded-lg bg-emerald-400/15 px-2 py-1 text-emerald-200">✓ Invoice processing</span>
        <span className="rounded-lg bg-emerald-400/15 px-2 py-1 text-emerald-200">✓ Reconciliation</span>
        <span className="rounded-lg bg-gold-400 px-2 py-1 text-ink-950">Refresh: NetSuite</span>
      </span>
    </div>
  );
}

function SearchPanel() {
  const rows = [
    ['Accounts Payable Specialist', 'Northwind Labs', 'Indeed', 84],
    ['AP & Billing Coordinator', 'Lumen Studio', 'LinkedIn', 78],
    ['Bookkeeper, part time', 'Brightpath Software', 'Dice', 71],
  ];
  return (
    <div className={panelCls}>
      <PanelHead icon="search" title="One search, three boards" tag="Ranked by fit" />
      <div className="mt-4 grid gap-3 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="space-y-2">
          <span className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-[12.5px] font-semibold text-ink-950">
            <Icon name="search" className="h-3.5 w-3.5 shrink-0 text-brand-500" />
            Accounts payable · Remote
          </span>
          <span className="flex flex-wrap items-center gap-1.5">
            {['LinkedIn', 'Indeed', 'Dice'].map((b) => (
              <span key={b} className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.07] py-0.5 pl-0.5 pr-2 text-[11px] font-bold ring-1 ring-white/10">
                <BoardMark board={b} className="h-5 w-5 text-[9px]" />
                {b}
              </span>
            ))}
          </span>
        </div>
        <ol className="space-y-1.5">
          {rows.map(([t, c, b, sc], i) => (
            <li key={t} className={`flex items-center gap-2.5 rounded-xl px-2.5 py-1.5 ${i === 0 ? 'bg-white/[0.12] ring-1 ring-gold-400/60' : 'bg-white/[0.05]'}`}>
              <BoardMark board={b} className="h-6 w-6 text-[10px]" />
              <span className="min-w-0 flex-1">
                <span className="block text-[12px] font-bold leading-tight">{t}</span>
                <span className="block text-[10.5px] font-medium text-white/55">{c}</span>
              </span>
              <span className="font-display text-[14px] font-extrabold">{sc}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

const PANELS = [PracticePanel, GapPanel, MatchPanel, SearchPanel];

export default function PlanSection({ s, n }) {
  const root = useRef(null);
  const cards = pick(s, 'cards');
  const close = pick(s, 'p');
  const others = (s.blocks || []).filter((b) => b !== cards && b !== close);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: 'top 72%', once: true } })
          .from(q('[data-intro]'), { y: 30, opacity: 0, duration: 1.1 }, 0.1)
          .from(q('[data-rail] li'), { y: 24, opacity: 0, stagger: 0.07, duration: 0.9 }, 0.2)
          .from(q('[data-board]'), { y: 70, opacity: 0, duration: 1.3 }, 0.3)
          .from(q('[data-chrome] > *'), { y: 14, opacity: 0, stagger: 0.06, duration: 0.8 }, 0.5);

        const rows = q('[data-row]');
        rows.forEach((r) => gsap.set([r.querySelector('[data-worry]'), r.querySelector('[data-panel]')], { opacity: 0 }));
        ScrollTrigger.batch(rows, {
          start: 'top 86%',
          once: true,
          onEnter: (els) =>
            els.forEach((row, k) => {
              gsap
                .timeline({ delay: k * 0.12 })
                .fromTo(row.querySelector('[data-worry]'), { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, 0)
                .fromTo(row.querySelectorAll('[data-wire]'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' }, 0.2)
                .fromTo(row.querySelector('[data-panel]'), { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 1.1 }, 0.35)
                .from(row.querySelector('[data-status]'), { scale: 0.4, opacity: 0, duration: 0.6, ease: 'back.out(2.4)' }, 0.8);
            }),
        });

        gsap.from(q('[data-close] > *'), { y: 30, opacity: 0, stagger: 0.1, duration: 1.1, scrollTrigger: { trigger: q('[data-close]')[0], start: 'top 92%', once: true } });
      });
    },
    { scope: root }
  );

  return (
    <section id={s.id} ref={root} aria-labelledby={`${s.id}-title`} className="relative scroll-mt-24 overflow-clip bg-light-lavender py-16 sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_35%_at_90%_10%,rgba(196,179,234,0.6),transparent),radial-gradient(30%_30%_at_5%_90%,rgba(252,211,77,0.18),transparent)]" />
      <div className="container-x relative">
        {/* The heading's marked phrase is long, so it gets the full width; the intro sits beside the four-step rail */}
        <div data-head className="min-w-0">
          <StepPill n={n} eyebrow={s.eyebrow} />
          <CreativeHeading id={`${s.id}-title`} lines={s.h2} className={`mt-6 max-w-[64rem] text-ink-950 ${h2Class}`} />
        </div>
        <div className="mt-7 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-12 lg:items-center lg:gap-12">
          {s.intro && (
            <p data-intro className="min-w-0 text-lead font-medium text-ink-900/70 lg:col-span-6">
              <Rich text={s.intro} />
            </p>
          )}
          <div data-rail className="min-w-0 lg:col-span-6">
            <StepRail />
          </div>
        </div>

        <div data-board className="relative mt-12 overflow-hidden rounded-[32px] bg-white shadow-[0_60px_120px_-60px_rgba(26,15,51,0.6)] ring-1 ring-brand-200/80 sm:mt-14">
          {/* App chrome */}
          <div data-chrome aria-hidden="true" className="flex flex-wrap items-center gap-x-4 gap-y-3 border-b border-hairline bg-white px-4 py-3.5 sm:px-6">
            <span className="flex items-center gap-2.5">
              <AppMark />
              <span className="font-display text-[15px] font-extrabold tracking-[-0.02em] text-ink-950">JobHunter</span>
            </span>
            <span className="hidden items-center gap-1 rounded-full bg-light-lavender p-1 text-[12.5px] font-bold md:flex">
              <span className="rounded-full bg-brand-950 px-3 py-1.5 text-gold-300">Restart plan</span>
              <span className="px-3 py-1.5 text-ink-900/60">Practice</span>
              <span className="px-3 py-1.5 text-ink-900/60">Matches</span>
              <span className="px-3 py-1.5 text-ink-900/60">Emails</span>
            </span>
            <span className="ml-auto flex items-center gap-3">
              <span className="hidden items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[12px] font-bold text-emerald-700 ring-1 ring-emerald-200 sm:inline-flex">
                <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />4 of 4 planned
              </span>
              <SampleTag />
              <Who />
            </span>
          </div>

          <div className="bg-[linear-gradient(180deg,#faf8ff,#ffffff)] p-3 sm:p-5 lg:p-7">
            <div aria-hidden="true" className="hidden px-1 pb-4 lg:grid lg:grid-cols-[minmax(0,0.85fr)_88px_minmax(0,1.15fr)]">
              <p className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em] text-brand-600">
                <span className="h-2 w-2 rounded-full bg-brand-400" />
                What feels hard
              </p>
              <span />
              <p className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em] text-brand-600">
                <span className="h-2 w-2 rounded-full bg-gold-500" />
                What JobHunter gives you
              </p>
            </div>

            {cards && (
              <ul className="space-y-3 sm:space-y-4">
                {cards.items.map((c, i) => {
                  const Panel = PANELS[i % PANELS.length];
                  return (
                    <li key={c.title} data-row className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,0.85fr)_88px_minmax(0,1.15fr)] lg:items-stretch">
                      <div data-worry className="group relative flex min-w-0 flex-col justify-center rounded-[22px] bg-light-lavender p-5 ring-1 ring-brand-100 transition-transform duration-500 hover:-translate-y-1 sm:p-6 lg:p-7">
                        <div className="flex items-center gap-3">
                          <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-950 text-gold-300 transition-transform duration-500 group-hover:-rotate-6">
                            <Icon name={c.icon || 'spark'} className="h-5 w-5" />
                          </span>
                          <span aria-hidden="true" className="font-display text-[13px] font-extrabold text-brand-400">{String(i + 1).padStart(2, '0')}</span>
                        </div>
                        <h3 className="mt-4 font-display text-[clamp(1.2rem,1.05rem+0.45vw,1.5rem)] font-bold leading-snug tracking-[-0.02em] text-ink-950">{c.title}</h3>
                        <p className="mt-2 text-[16px] leading-relaxed text-ink-900/75">
                          <Rich text={c.text} />
                        </p>
                      </div>

                      {/* Connector: worry → feature */}
                      <span aria-hidden="true" className="relative flex h-10 items-center justify-center lg:h-auto">
                        <svg viewBox="0 0 88 24" className="hidden h-6 w-[88px] overflow-visible lg:block">
                          <path d="M6 12h70" fill="none" stroke="#ded5f5" strokeWidth="2" strokeDasharray="2 6" strokeLinecap="round" />
                          <path data-wire d="M6 12h70M68 5l8 7-8 7" pathLength="1" strokeDasharray="1 1" fill="none" stroke="#f4b400" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="6" cy="12" r="4.5" fill="#1a0f33" />
                        </svg>
                        <svg viewBox="0 0 24 40" className="h-10 w-6 lg:hidden">
                          <path data-wire d="M12 4v28M5 25l7 7 7-7" pathLength="1" strokeDasharray="1 1" fill="none" stroke="#f4b400" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>

                      <div data-panel aria-hidden="true" className="min-w-0">
                        <Panel />
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {close && (
            <div data-close className="relative grid grid-cols-[minmax(0,1fr)] items-center gap-5 overflow-hidden bg-gold-400 px-5 py-6 text-ink-950 sm:px-8 sm:py-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10 lg:px-10">
              <span aria-hidden="true" className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.5),transparent)]" />
              <p className="relative min-w-0 font-display text-[clamp(1.1rem,0.95rem+0.55vw,1.5rem)] font-bold leading-snug tracking-[-0.015em]">
                <Rich text={close.text} />
              </p>
              <ul aria-hidden="true" className="relative flex min-w-0 flex-wrap gap-2 lg:justify-end">
                {['Practice rounds', 'A clear gap answer', 'Where you fit now'].map((t) => (
                  <li key={t} className="inline-flex items-center gap-2 rounded-full bg-ink-950 px-3.5 py-2 text-[13px] font-bold text-gold-300">
                    <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {others.length > 0 && (
          <div className="mt-8 space-y-5">
            {others.map((b, i) => (
              <Block key={i} b={b} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
