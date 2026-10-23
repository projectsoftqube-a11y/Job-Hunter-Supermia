'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap';
import CreativeHeading from '@/components/CreativeHeading';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { ScoreRing } from '@/components/mocks';
import { Block } from '@/components/page/Blocks';
import { Crossing, TwoShores, SameResume, MatchCard, BridgeScene, BridgeList, Venn, MiniResume, RoundsPath } from './for-career-switchers/parts';

/*
 * "The Bridge" (for-career-switchers). Two worlds: the field you are leaving (cool lavender) and the
 * field you are moving into (warm gold), joined by a brand-purple bridge. Part 2 pins a scene where your
 * skills cross the bridge and are renamed in the new field's words; part 3 slides two circles together
 * to show what carries over; part 4 pins a teleprompter that reads the "why are you switching" example
 * line by line. All copy comes from the page module; the visuals are decorative with fictional data.
 */

const H2 = 'font-display text-[clamp(2rem,1.25rem+2.6vw,4rem)] font-extrabold leading-[1.04] tracking-[-0.035em]';
const of = (s, type, n = 0) => (s.blocks || []).filter((b) => b.type === type)[n];

/* ---------------- Part 1 · The old shore ---------------- */
function OldShore({ s }) {
  const cards = of(s, 'cards');
  const p = of(s, 'p');
  return (
    <section id={s.id} aria-labelledby={`${s.id}-title`} className="relative scroll-mt-24 overflow-clip bg-[linear-gradient(100deg,#ede9fe_0%,#f5f3ff_46%,#fffbeb_100%)] py-20 sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_460px_at_0%_0%,rgba(196,179,234,0.45),transparent),radial-gradient(640px_420px_at_100%_30%,rgba(252,211,77,0.28),transparent)]" />
      <div className="container-x relative">
        <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-6">
            <Crossing n={1} label="The old shore" eyebrow={s.eyebrow} />
            <CreativeHeading id={`${s.id}-title`} lines={s.h2} className={`${H2} text-ink-950`} />
            <p data-rise className="mt-6 max-w-[38rem] text-lead font-medium text-ink-900/70">
              <Rich text={s.intro} />
            </p>
          </div>
          <div data-shores className="min-w-0 lg:col-span-6">
            <TwoShores />
          </div>
        </div>

        <ol data-stalls className="mt-16 grid grid-cols-[minmax(0,1fr)] gap-4 sm:mt-20 md:grid-cols-3 md:gap-5">
          {cards.items.map((c, i) => (
            <li key={c.title} data-stall className="group relative min-w-0 overflow-hidden rounded-[26px] bg-white shadow-[0_30px_60px_-44px_rgba(26,15,51,0.6)] ring-1 ring-brand-100 transition-transform duration-500 hover:-translate-y-1.5">
              <div aria-hidden="true" className={`relative flex h-14 items-center justify-between px-6 ${['bg-brand-100', 'bg-[linear-gradient(90deg,#ede9fe,#fde68a)]', 'bg-gold-200'][i % 3]}`}>
                <span className="font-display text-[12px] font-extrabold uppercase tracking-[0.16em] text-ink-950/70">Stall {String(i + 1).padStart(2, '0')}</span>
                <svg viewBox="0 0 60 20" className="h-5 w-16 text-ink-950/50">
                  <path d="M0 10 H18 L24 3 L30 17 L36 6 L40 10 H60" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="p-6">
                <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-950 text-gold-300 transition-transform duration-500 group-hover:-rotate-6">
                  <Icon name={c.icon || 'spark'} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-[1.25rem] font-bold leading-snug tracking-[-0.02em] text-ink-950">{c.title}</h3>
                <p className="mt-2 text-[15.5px] leading-relaxed text-ink-900/70">
                  <Rich text={c.text} />
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div data-same className="grain relative mt-6 overflow-hidden rounded-[32px] bg-brand-950 p-6 text-white sm:mt-8 sm:p-10 xl:p-12">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(520px_360px_at_100%_100%,rgba(244,63,94,0.16),transparent),radial-gradient(520px_360px_at_0%_0%,rgba(109,76,176,0.5),transparent)]" />
          <div className="relative z-[2] grid grid-cols-[minmax(0,1fr)] items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="min-w-0 lg:col-span-6">
              <span aria-hidden="true" className="inline-flex -rotate-2 items-center gap-2 rounded-full bg-rose-500 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.14em] text-white">
                <Icon name="refresh" className="h-3.5 w-3.5" /> The usual workaround
              </span>
              <p data-rise className="mt-5 font-display text-[clamp(1.35rem,1.05rem+1vw,2.1rem)] font-bold leading-[1.25] tracking-[-0.02em]">
                <Rich text={p.text} tone="dark" />
              </p>
            </div>
            <div className="min-w-0 lg:col-span-6">
              <SameResume />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Part 2 · Crossing over ---------------- */
function CrossingOver({ s }) {
  const p = of(s, 'p');
  const steps = of(s, 'steps');
  const callout = of(s, 'callout');
  return (
    <section id={s.id} aria-labelledby={`${s.id}-title`} className="relative scroll-mt-24 overflow-clip bg-white pt-20 sm:pt-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[900px] bg-[radial-gradient(600px_420px_at_0%_10%,rgba(196,179,234,0.35),transparent),radial-gradient(600px_420px_at_100%_40%,rgba(252,211,77,0.22),transparent)]" />
      <div className="container-x relative">
        <div className="grid grid-cols-[minmax(0,1fr)] items-end gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-7">
            <Crossing n={2} label="Crossing over" eyebrow={s.eyebrow} />
            <CreativeHeading id={`${s.id}-title`} lines={s.h2} className={`${H2} text-ink-950`} />
          </div>
          <p data-rise className="min-w-0 border-l-4 border-brand-500 pl-5 text-lead font-medium text-ink-900/70 lg:col-span-5">
            <Rich text={s.intro} />
          </p>
        </div>

        <div className="mt-12 grid grid-cols-[minmax(0,1fr)] items-center gap-10 sm:mt-14 lg:grid-cols-12 lg:gap-12">
          <p data-rise className="min-w-0 text-[clamp(1.05rem,0.98rem+0.35vw,1.3rem)] leading-[1.7] text-ink-900/80 lg:col-span-7">
            <Rich text={p.text} />
          </p>
          <div className="min-w-0 lg:col-span-5">
            <MatchCard />
          </div>
        </div>
      </div>

      {/* Pinned on desktop: the skills cross the bridge and pick up the new field's words */}
      <div data-bridge-pin className="grain relative mt-16 bg-brand-950 py-14 text-white sm:mt-20 sm:py-20 lg:flex lg:h-[100svh] lg:min-h-[800px] lg:flex-col lg:justify-center lg:pb-8 lg:pt-[88px]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(520px_420px_at_0%_40%,rgba(155,127,212,0.35),transparent),radial-gradient(520px_420px_at_100%_40%,rgba(244,180,0,0.18),transparent)]" />
        <div className="container-x relative z-[2]">
          <p aria-hidden="true" className="mb-5 flex flex-wrap items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.16em]">
            <span className="rounded-full bg-brand-300 px-3 py-1 text-ink-950">Old field</span>
            <span className="h-[2px] w-10 bg-brand-500" />
            <span className="text-white/70">Your skills, crossing over</span>
            <span className="h-[2px] w-10 bg-gold-500" />
            <span className="rounded-full bg-gold-400 px-3 py-1 text-ink-950">New field</span>
          </p>
          <BridgeScene />
          <BridgeList />
          <ol className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-3 sm:grid-cols-2 lg:mt-7 lg:grid-cols-4 lg:gap-4">
            {steps.items.map((st, i) => (
              <li key={st.title} data-xstep className="relative min-w-0 overflow-hidden rounded-[22px] bg-white/[0.06] p-5 ring-1 ring-white/10">
                <span data-xstep-bar aria-hidden="true" className="absolute inset-x-0 top-0 h-1 origin-left bg-gradient-to-r from-brand-400 to-gold-400" />
                <span aria-hidden="true" className="font-display text-[12px] font-extrabold text-gold-300">Step {String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-1.5 font-display text-[1.12rem] font-bold leading-snug tracking-[-0.02em] text-white">{st.title}</h3>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-brand-100/85 [@media(min-width:1024px)_and_(max-height:860px)]:text-[13.5px]">
                  <Rich text={st.text} tone="dark" />
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="container-x relative py-16 sm:py-20">
        <aside data-rise className="grid grid-cols-[minmax(0,1fr)] items-center gap-8 rounded-[30px] bg-light-lavender p-6 ring-1 ring-brand-200 sm:p-8 lg:grid-cols-12 lg:gap-10 xl:p-10">
          <div className="flex min-w-0 gap-4 lg:col-span-7">
            <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-600 text-gold-300">
              <Icon name="shield" className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <p className="font-display text-[1.35rem] font-bold leading-snug tracking-[-0.02em] text-ink-950">{callout.title}</p>
              <p className="mt-2 text-[16px] leading-relaxed text-ink-900/80">
                <Rich text={callout.text} />
              </p>
            </div>
          </div>
          <ul aria-hidden="true" className="space-y-2 rounded-[22px] bg-white p-4 shadow-[0_24px_50px_-36px_rgba(26,15,51,0.6)] lg:col-span-5">
            <li className="pb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-500">Your to-do list · sample</li>
            <li data-todo className="flex items-center gap-2.5 rounded-xl bg-emerald-50 px-3 py-2 text-[13.5px] font-bold text-emerald-800">
              <Icon name="check" className="h-4 w-4 shrink-0" strokeWidth={2.6} /> Say “onboarding”: you did this work
            </li>
            <li data-todo className="flex items-center gap-2.5 rounded-xl bg-gold-100 px-3 py-2 text-[13.5px] font-bold text-gold-800">
              <Icon name="clock" className="h-4 w-4 shrink-0" /> Process mapping: learn it, then add it
            </li>
            <li data-todo className="flex items-center gap-2.5 rounded-xl bg-rose-50 px-3 py-2 text-[13.5px] font-bold text-rose-700">
              <Icon name="question" className="h-4 w-4 shrink-0" /> SQL: not on the resume yet
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
}

/* ---------------- Part 3 · Both sides ---------------- */
const VERSION_TONE = [
  { tone: 'old', card: 'bg-brand-100', ring: 'ring-brand-200', tag: 'bg-brand-600 text-white', order: 'lg:order-1' },
  { tone: 'now', card: 'bg-gold-200', ring: 'ring-gold-300', tag: 'bg-gold-500 text-ink-950', order: 'lg:order-3' },
  { tone: 'both', card: 'bg-[linear-gradient(90deg,#c4b3ea,#fcd34d)]', ring: 'ring-brand-300', tag: 'bg-brand-950 text-gold-300', order: 'lg:order-2' },
];

function BothSides({ s }) {
  const p = of(s, 'p');
  const table = of(s, 'table');
  return (
    <section id={s.id} aria-labelledby={`${s.id}-title`} className="relative scroll-mt-24 overflow-clip bg-[linear-gradient(180deg,#f5f3ff,#fffbeb)] py-20 sm:py-28 lg:bg-[linear-gradient(90deg,#f5f3ff_0%,#f5f3ff_50%,#fffbeb_50%,#fffbeb_100%)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-[3px] -translate-x-1/2 bg-[repeating-linear-gradient(180deg,#6d4cb0_0_10px,transparent_10px_22px)] opacity-40 lg:block" />
      <div className="container-x relative">
        <div className="grid grid-cols-[minmax(0,1fr)] items-end gap-8 lg:grid-cols-2 lg:gap-24">
          <div className="min-w-0">
            <Crossing n={3} label="Both sides" eyebrow={s.eyebrow} />
            <CreativeHeading id={`${s.id}-title`} lines={s.h2} className={`${H2} text-ink-950`} />
          </div>
          <div className="min-w-0">
            <p data-rise className="text-[clamp(1.05rem,0.98rem+0.35vw,1.3rem)] font-medium leading-[1.65] text-ink-900/80">
              <Rich text={s.intro} />
            </p>
            <p data-rise className="mt-4 text-[16px] leading-[1.75] text-ink-900/70">
              <Rich text={p.text} />
            </p>
          </div>
        </div>

        <div className="mt-12 sm:mt-14">
          <Venn />
        </div>

        <ul className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-4 sm:mt-16 md:grid-cols-3 md:gap-5">
          {table.rows.map((row, i) => {
            const t = VERSION_TONE[i % 3];
            return (
              <li key={row[0]} data-version className={`group min-w-0 overflow-hidden rounded-[24px] bg-white shadow-[0_30px_60px_-44px_rgba(26,15,51,0.6)] ring-1 ${t.ring} ${t.order} transition-transform duration-500 hover:-translate-y-1.5`}>
                <div className={t.card}>
                  <MiniResume tone={t.tone} />
                </div>
                <div className="p-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-900/50">{table.head[0]}</p>
                  <h3 className="mt-1 flex items-center gap-2 font-display text-[1.3rem] font-bold tracking-[-0.02em] text-ink-950">
                    {row[0]}
                    {t.tone === 'both' && (
                      <span aria-hidden="true" className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.12em] ${t.tag}`}>
                        Overlap
                      </span>
                    )}
                  </h3>
                  <dl className="mt-4 space-y-3">
                    {[1, 2].map((k) => (
                      <div key={k} className="rounded-2xl bg-light-lavender/70 p-3.5">
                        <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-500">{table.head[k]}</dt>
                        <dd className="mt-1 text-[15px] font-semibold leading-snug text-ink-950">
                          <Rich text={String(row[k])} />
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- Part 4 · The landing ---------------- */
const BEAT_OF_LINE = [0, 1, 2, 2];

function Landing({ s }) {
  const lead = of(s, 'p', 0);
  const list = of(s, 'list');
  const ex = of(s, 'example');
  const rehearse = of(s, 'p', 1);
  const callout = of(s, 'callout');
  const lines = (ex?.lines || []).filter((l) => l !== '');
  return (
    <section id={s.id} aria-labelledby={`${s.id}-title`} className="grain relative scroll-mt-24 overflow-clip bg-brand-950 pt-20 text-white sm:pt-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_520px_at_85%_0%,rgba(109,76,176,0.45),transparent),radial-gradient(1000px_420px_at_50%_100%,rgba(244,180,0,0.16),transparent)]" />
      <div className="container-x relative z-[2]">
        <div className="grid grid-cols-[minmax(0,1fr)] items-end gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-7">
            <Crossing n={4} label="The landing" eyebrow={s.eyebrow} dark />
            <CreativeHeading id={`${s.id}-title`} tone="dark" lines={s.h2} className={H2} />
          </div>
          <p data-rise className="min-w-0 border-l-4 border-gold-400 pl-5 text-lead font-medium text-brand-100 lg:col-span-5">
            <Rich text={s.intro} tone="dark" />
          </p>
        </div>
      </div>

      {/* Pinned on desktop: the example answer runs like a teleprompter, beat by beat */}
      <div data-prompter-pin className="relative z-[2] mt-14 sm:mt-16 lg:flex lg:h-[100svh] lg:min-h-[720px] lg:flex-col lg:justify-center lg:pb-8 lg:pt-[88px]">
        <div className="container-x">
          <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className="min-w-0 lg:col-span-4">
              <p data-rise className="font-display text-[1.35rem] font-bold leading-snug tracking-[-0.02em] text-white">
                <Rich text={lead.text} tone="dark" />
              </p>
              <ol className="mt-5 space-y-3">
                {list.items.map((t, i) => (
                  <li key={i} data-beat className="relative flex gap-4 overflow-hidden rounded-[20px] bg-white/[0.06] p-4 pl-5 ring-1 ring-white/10">
                    <span data-beat-bar aria-hidden="true" className="absolute inset-y-0 left-0 w-1 origin-top bg-gold-400" />
                    <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-400 font-display text-[13px] font-extrabold text-ink-950">
                      {i + 1}
                    </span>
                    <span className="min-w-0 pt-0.5 text-[15.5px] font-medium leading-relaxed text-brand-50">
                      <Rich text={t} tone="dark" />
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <figure className="relative min-w-0 overflow-hidden rounded-[30px] bg-[#120a26] ring-1 ring-white/10 shadow-[0_60px_100px_-50px_rgba(0,0,0,0.9)] lg:col-span-8">
              <figcaption className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-white/10 px-5 py-3.5 sm:px-7">
                <span className="flex items-center gap-2.5">
                  <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                  <span className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-gold-300">{ex.label}</span>
                  <span aria-hidden="true" className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white/70">Teleprompter</span>
                </span>
                <span className="text-[13px] font-semibold text-white/65">{ex.meta}</span>
              </figcaption>
              <div data-tp-window className="relative overflow-hidden px-5 py-8 sm:px-10 sm:py-10">
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[32%] z-[1] hidden -translate-y-1/2 lg:block">
                  <span className="absolute left-2 top-0 h-0 w-0 -translate-y-1/2 border-y-[9px] border-l-[12px] border-y-transparent border-l-gold-400" />
                  <span className="absolute right-2 top-0 h-0 w-0 -translate-y-1/2 border-y-[9px] border-r-[12px] border-y-transparent border-r-gold-400" />
                </div>
                <div data-tp-track className="relative space-y-6 will-change-transform sm:space-y-7">
                  {lines.map((l, i) => (
                    <p key={i} data-tp-line data-beat-of={BEAT_OF_LINE[i] ?? 2} className="font-display text-[clamp(1.2rem,0.95rem+0.95vw,1.95rem)] font-semibold leading-[1.38] tracking-[-0.015em] text-white">
                      <Rich text={l} tone="dark" />
                    </p>
                  ))}
                </div>
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 hidden h-16 bg-gradient-to-b from-[#120a26] to-transparent lg:block" />
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-20 bg-gradient-to-t from-[#120a26] to-transparent lg:block" />
              </div>
            </figure>
          </div>
        </div>
      </div>

      <div className="container-x relative z-[2] pb-20 pt-16 sm:pb-28 sm:pt-20 lg:pt-12">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="min-w-0 rounded-[30px] bg-white/[0.05] p-6 ring-1 ring-white/10 sm:p-8 lg:col-span-7">
            <p data-rise className="text-[16.5px] leading-[1.75] text-brand-50">
              <Rich text={rehearse.text} tone="dark" />
            </p>
            <div className="mt-6">
              <RoundsPath />
            </div>
          </div>
          <aside data-rise className="relative flex min-w-0 flex-col overflow-hidden rounded-[30px] bg-gold-400 p-6 text-ink-950 sm:p-8 lg:col-span-5">
            <span aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.55),transparent)]" />
            <span aria-hidden="true" className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-ink-950 text-gold-300">
              <Icon name="mic" className="h-5 w-5" />
            </span>
            <p className="relative mt-4 font-display text-[1.35rem] font-bold leading-snug tracking-[-0.02em]">{callout.title}</p>
            <p className="relative mt-2 text-[16px] leading-relaxed text-ink-950/85">
              <Rich text={callout.text} />
            </p>
            <div aria-hidden="true" className="relative mt-auto flex items-center gap-4 pt-6">
              <span className="rounded-full bg-white/70 p-1.5">
                <ScoreRing value={7.1} max={10} size={64} stroke={6} tone="brand" label="Readiness 7.1 out of 10" />
              </span>
              <span className="text-[13px] font-bold leading-snug">
                Sample scorecard
                <span className="block text-[12px] font-semibold text-ink-950/65">Readiness out of 10, after a guided round</span>
              </span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Fallback({ s }) {
  return (
    <section id={s.id} aria-labelledby={`${s.id}-title`} className="relative scroll-mt-24 bg-white py-20">
      <div className="container-x space-y-6">
        <CreativeHeading id={`${s.id}-title`} lines={s.h2} className={`${H2} text-ink-950`} />
        {s.intro && (
          <p className="text-lead text-ink-900/70">
            <Rich text={s.intro} />
          </p>
        )}
        {(s.blocks || []).map((b, i) => (
          <Block key={i} b={b} />
        ))}
      </div>
    </section>
  );
}

const SECTIONS = {
  'where-switchers-get-stuck': OldShore,
  'skills-match': CrossingOver,
  'resume-versions': BothSides,
  'why-switching': Landing,
};

export default function CareerSwitchersStory({ page }) {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      /* Desktop scenes: two pins, one scrubbed timeline each */
      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        // Scene 1: the skills cross the bridge and are renamed on the way
        const chips = q('[data-chip]');
        const ghosts = q('[data-ghost]');
        const off = (i, axis) => {
          const c = chips[i].getBoundingClientRect();
          const g = ghosts[i].getBoundingClientRect();
          const cur = gsap.getProperty(chips[i], axis);
          return axis === 'x' ? g.left - (c.left - cur) : g.top - (c.top - cur);
        };
        const bars = q('[data-xstep-bar]');
        gsap.set(bars, { scaleX: 0, transformOrigin: '0% 50%' });
        const bridge = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: q('[data-bridge-pin]')[0], start: 'top top', end: '+=240%', scrub: true, pin: true, anticipatePin: 1, refreshPriority: 2, invalidateOnRefresh: true },
        });
        bridge
          .fromTo(q('[data-bridge]'), { strokeDasharray: '1 1', strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6 }, 0)
          .fromTo(q('[data-hanger]'), { opacity: 0 }, { opacity: 1, stagger: 0.05, duration: 0.2 }, 0.3)
          .to(bars[0], { scaleX: 1, duration: 0.3 }, 0.3)
          .fromTo(q('[data-ghost-tag]'), { opacity: 0, x: -10 }, { opacity: 1, x: 0, stagger: 0.08, duration: 0.25 }, 0.4)
          .fromTo(q('[data-gapslot]'), { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, stagger: 0.12, duration: 0.3, ease: 'back.out(2)' }, 0.6)
          .to(bars[1], { scaleX: 1, duration: 0.3 }, 1.1);
        chips.forEach((chip, i) => {
          const t = 1.2 + i * 0.32;
          bridge
            .fromTo(chip, { x: () => off(i, 'x'), y: () => off(i, 'y') }, { x: () => off(i, 'x') / 2, y: () => off(i, 'y') / 2 - 70, duration: 0.45, ease: 'power1.in', immediateRender: true }, t)
            .to(chip, { x: 0, y: 0, duration: 0.45, ease: 'power1.out' }, t + 0.45)
            .fromTo(chip.querySelector('[data-chip-old]'), { opacity: 1 }, { opacity: 0, duration: 0.12 }, t + 0.4);
        });
        bridge
          .to(bars[2], { scaleX: 1, duration: 0.3 }, 2.75)
          .fromTo(q('[data-proof]'), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, stagger: 0.1, duration: 0.25, ease: 'back.out(2.5)' }, 2.8)
          .to(bars[3], { scaleX: 1, duration: 0.3 }, 3.3)
          .fromTo(q('[data-carry]'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.35 }, 3.35)
          .to({}, { duration: 0.5 });

        // Scene 3: the teleprompter reads the example, beat by beat
        const win = q('[data-tp-window]')[0];
        const track = q('[data-tp-track]')[0];
        const lines = q('[data-tp-line]');
        const beatBars = q('[data-beat-bar]');
        const guide = () => win.clientHeight * 0.32;
        const centre = (i) => track.offsetTop + lines[i].offsetTop + lines[i].offsetHeight / 2;
        const prompter = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: q('[data-prompter-pin]')[0], start: 'top top', end: '+=200%', scrub: true, pin: true, anticipatePin: 1, refreshPriority: 1, invalidateOnRefresh: true },
        });
        prompter
          .fromTo(track, { y: () => guide() - centre(0) }, { y: () => guide() - centre(0), duration: 0.3 }, 0)
          .fromTo(lines, { opacity: (i) => (i === 0 ? 1 : 0.22) }, { opacity: (i) => (i === 0 ? 1 : 0.22), duration: 0.01 }, 0)
          .fromTo(beatBars, { scaleY: (i) => (i === 0 ? 1 : 0) }, { scaleY: (i) => (i === 0 ? 1 : 0), duration: 0.01 }, 0);
        for (let i = 1; i < lines.length; i += 1) {
          const t = 0.3 + (i - 1) * 1.1;
          const beat = BEAT_OF_LINE[i] ?? 2;
          prompter
            .to(track, { y: () => guide() - centre(i), duration: 0.8, ease: 'power1.inOut' }, t)
            .to(lines[i - 1], { opacity: 0.22, duration: 0.3 }, t + 0.25)
            .to(lines[i], { opacity: 1, duration: 0.3 }, t + 0.25);
          if (beat !== (BEAT_OF_LINE[i - 1] ?? 2) && beatBars[beat]) prompter.to(beatBars[beat], { scaleY: 1, duration: 0.3 }, t + 0.3);
        }
        prompter.to({}, { duration: 0.5 });
      });

      /* Every size: Venn scrub, reveals (batched) and once-only micro scenes */
      mm.add(MOTION_OK, () => {
        const desktop = window.matchMedia('(min-width: 1024px)').matches;
        const once = (trigger, start = 'top 82%') => ({ trigger, start, once: true });

        gsap.set(q('[data-rise]'), { y: 34, opacity: 0 });
        ScrollTrigger.batch(q('[data-rise]'), { start: 'top 90%', once: true, onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, stagger: 0.08, duration: 1.1 }) });
        gsap.set(q('[data-stall], [data-version]'), { y: 70, opacity: 0 });
        ScrollTrigger.batch(q('[data-stall], [data-version]'), { start: 'top 88%', once: true, onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, stagger: 0.12, duration: 1.1, ease: 'expo.out' }) });

        // Part 1: the two worlds slide in, the bridge reaches out but does not meet
        const shores = q('[data-shores]')[0];
        gsap
          .timeline({ scrollTrigger: once(shores) })
          .from(q('[data-shore="old"]'), { x: -60, opacity: 0, duration: 1.1 }, 0)
          .from(q('[data-shore="new"]'), { x: 60, opacity: 0, duration: 1.1 }, 0.1)
          .from(q('[data-shift]'), { scale: 0, stagger: { each: 0.015, from: 'random' }, duration: 0.4, ease: 'back.out(2)' }, 0.4)
          .from(q('[data-bar]'), { scaleY: 0, stagger: 0.06, duration: 0.7, ease: 'expo.out' }, 0.5)
          .fromTo(q('[data-span]'), { strokeDasharray: '1 1', strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.out' }, 0.6)
          .from(q('[data-gap]'), { scale: 0, duration: 0.6, ease: 'back.out(2.4)' }, 1.3)
          .to(q('[data-gap]'), { rotation: 4, duration: 0.08, repeat: 5, yoyo: true, ease: 'sine.inOut' }, 1.9);
        const same = q('[data-same]')[0];
        gsap
          .timeline({ scrollTrigger: once(same, 'top 78%') })
          .from(q('[data-same-stack]'), { y: 30, rotation: -8, opacity: 0, duration: 0.9 }, 0)
          .from(q('[data-same-row]'), { x: -40, opacity: 0, stagger: 0.15, duration: 0.8 }, 0.3)
          .from(q('[data-same-status]'), { scale: 0, stagger: 0.15, duration: 0.5, ease: 'back.out(2.6)' }, 0.8);

        // Part 2 (phones): the pairs and to-do list tick in
        if (!desktop) gsap.from(q('[data-pair]'), { x: -30, opacity: 0, stagger: 0.1, duration: 0.8, scrollTrigger: once(q('[data-pair]')[0], 'top 90%') });
        gsap.from(q('[data-todo]'), { x: 30, opacity: 0, stagger: 0.12, duration: 0.8, scrollTrigger: once(q('[data-todo]')[0], 'top 90%') });

        // Part 3: the two circles slide together and the overlap appears
        const venn = q('[data-venn]')[0];
        gsap
          .timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: venn, start: 'top 85%', end: 'center 50%', scrub: true, invalidateOnRefresh: true } })
          .fromTo(q('[data-venn-a]'), { x: () => -venn.offsetWidth * 0.17 }, { x: 0, duration: 1 }, 0)
          .fromTo(q('[data-venn-b]'), { x: () => venn.offsetWidth * 0.17 }, { x: 0, duration: 1 }, 0)
          .fromTo(q('[data-venn-lens]'), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.3 }, 0.8)
          .fromTo(q('[data-venn-both]'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, stagger: 0.05, duration: 0.15 }, 0.95)
          .fromTo(q('[data-venn-gap]'), { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, stagger: 0.06, duration: 0.2 }, 1)
          .fromTo(q('[data-venn-only]'), { opacity: 0.25 }, { opacity: 1, stagger: 0.06, duration: 0.2 }, 0.9);
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} className="relative">
      {(page.sections || []).map((s) => {
        const Section = SECTIONS[s.id] || Fallback;
        return <Section key={s.id} s={s} />;
      })}
    </div>
  );
}
