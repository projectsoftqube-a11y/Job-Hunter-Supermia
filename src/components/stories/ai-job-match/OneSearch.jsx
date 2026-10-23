'use client';

import { useRef, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { Block } from '@/components/page/Blocks';
import { BoardMark, BOARD_NAMES, BOARDS, RANKED, SectionHeading, Intro } from './shared';

/*
 * Chapter 2, "Three boards": the dark command-centre band. A ticker runs across the top, the console holds
 * one search across the three boards with real filter chips over a sample feed, the comparison table
 * becomes four lanes that a gold beam converts row by row as you scroll (one scrubbed timeline), and the
 * "where the jobs come from" note closes the band. Feed rows are illustrative sample data.
 */

const ROW_ICONS = ['search', 'list', 'target', 'spark'];
const FILTERS = ['All boards', ...BOARD_NAMES];

function Ticker() {
  const words = ['One search', 'LinkedIn', 'Indeed', 'Dice', 'Ranked by fit', 'Score out of 100', 'Skills you are missing'];
  return (
    <div aria-hidden="true" className="relative z-[2] overflow-hidden border-b border-white/10 py-3.5">
      <div className="flex w-max animate-marquee items-center [--marquee-duration:40s]">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {[...words, ...words].map((w, i) => (
              <span key={i} className="flex items-center gap-8 pr-8 font-display text-[13px] font-bold uppercase tracking-[0.2em] text-white/45">
                {w}
                <span className="h-1.5 w-1.5 rotate-45 bg-gold-400/70" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Console() {
  const [filter, setFilter] = useState('All boards');
  const count = RANKED.filter((r) => filter === 'All boards' || r.board === filter).length;

  return (
    <div data-console className="relative grid min-w-0 grid-cols-[minmax(0,1fr)] gap-4 rounded-[28px] bg-white/[0.045] p-3.5 ring-1 ring-white/10 sm:p-5 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] lg:gap-6 lg:p-6">
      <div className="min-w-0">
        <p className="flex min-w-0 items-center gap-2.5 rounded-2xl bg-white/[0.06] p-2 pr-3 text-[13px] font-semibold text-white ring-1 ring-white/10">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gold-400 text-ink-950" aria-hidden="true">
            <Icon name="search" className="h-4 w-4" strokeWidth={2.4} />
          </span>
          <span className="min-w-0 truncate">Frontend Engineer · Remote, US</span>
        </p>
        <div aria-hidden="true" className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 px-1">
          {BOARD_NAMES.map((b) => (
            <span key={b} className="flex items-center gap-1.5 text-[11.5px] font-bold text-white/70">
              <span className={`h-2 w-2 rounded-full ${BOARDS[b].dot}`} />
              {b} searched
            </span>
          ))}
        </div>

        <p className="mt-5 px-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white/45">Filter the list</p>
        <div role="group" aria-label="Filter the sample roles by job board" className="mt-2.5 grid grid-cols-2 gap-2">
          {FILTERS.map((f) => {
            const on = filter === f;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(f)}
                className={`inline-flex h-10 min-w-0 items-center gap-2 rounded-full pl-1.5 pr-3.5 text-[12.5px] font-bold transition-[background-color,color,transform] duration-300 hover:-translate-y-0.5 ${on ? 'bg-gold-400 text-ink-950' : 'bg-white/[0.07] text-white ring-1 ring-white/15 hover:bg-white/[0.12]'}`}
              >
                {f === 'All boards' ? (
                  <span aria-hidden="true" className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${on ? 'bg-ink-950 text-gold-400' : 'bg-white/10 text-white'}`}>
                    <Icon name="layers" className="h-3.5 w-3.5" />
                  </span>
                ) : (
                  <BoardMark board={f} size="h-7 w-7" text="text-[11px]" />
                )}
                <span className="truncate">{f}</span>
              </button>
            );
          })}
        </div>
        <p className="mt-4 px-1 text-[12.5px] font-semibold text-white/55" aria-live="polite">
          Showing {count} sample {count === 1 ? 'role' : 'roles'}
          {filter === 'All boards' ? ' from all three boards' : ` from ${filter}`}
        </p>
      </div>

      <ul aria-label="Sample results, for illustration" className="grid min-w-0 content-start gap-2 sm:grid-cols-2">
        {RANKED.map((r, i) => {
          const on = filter === 'All boards' || r.board === filter;
          return (
            <li key={r.key} data-feed>
              <div className={`flex items-center gap-3 rounded-2xl px-3 py-3 ring-1 transition-[opacity,transform] duration-500 ${on ? 'bg-white/[0.07] ring-white/10' : 'translate-x-2 bg-white/[0.02] opacity-30 ring-white/5'}`}>
                <span className="w-5 shrink-0 font-display text-[12px] font-extrabold text-gold-300">{i + 1}</span>
                <BoardMark board={r.board} size="h-8 w-8" text="text-[12px]" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13.5px] font-bold text-white">{r.title}</span>
                  <span className="block truncate text-[11.5px] font-medium text-white/55">
                    {r.company} · {r.board}
                  </span>
                  <span className="mt-1.5 block h-1 overflow-hidden rounded-full bg-white/10">
                    <span className="block h-full rounded-full bg-gradient-to-r from-brand-400 to-gold-400" style={{ width: `${r.score}%` }} />
                  </span>
                </span>
                <span className="w-9 shrink-0 text-right font-display text-[16px] font-extrabold text-white">{r.score}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const LANE_GRID = 'lg:grid-cols-[minmax(150px,0.55fr)_minmax(0,1fr)_64px_minmax(0,1.15fr)]';

function Lanes({ head, rows }) {
  return (
    <div className="relative">
      <div className={`hidden items-end gap-4 px-3 pb-4 lg:grid ${LANE_GRID}`}>
        <span />
        <p className="flex items-center gap-2.5 font-display text-[13px] font-bold uppercase tracking-[0.14em] text-white/55">
          <span aria-hidden="true" className="flex gap-0.5">
            {[0, 1, 2].map((k) => (
              <span key={k} className="h-3 w-4 rounded-t-[4px] border border-b-0 border-white/30" />
            ))}
          </span>
          {head[1]}
        </p>
        <span />
        <p className="flex items-center gap-2.5 font-display text-[13px] font-bold uppercase tracking-[0.14em] text-gold-300">
          <span aria-hidden="true" className="flex h-5 w-5 items-center justify-center rounded-md bg-gold-400 text-ink-950">
            <Icon name="spark" className="h-3 w-3" />
          </span>
          {head[2]}
        </p>
      </div>
      {head[0] ? <p className="sr-only">{head[0]}</p> : null}

      <ul data-lanes className="space-y-3">
        {rows.map((r, i) => (
          <li key={r[0]} data-lanerow className={`relative grid grid-cols-[minmax(0,1fr)] gap-2.5 overflow-hidden rounded-[22px] bg-white/[0.03] p-3 ring-1 ring-white/10 sm:p-4 lg:items-center lg:gap-4 lg:p-3 ${LANE_GRID}`}>
            <p className="flex items-center gap-3 px-1 font-display text-[1.15rem] font-bold tracking-[-0.02em] text-white lg:px-2">
              <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-500/30 text-brand-100 ring-1 ring-brand-300/30">
                <Icon name={ROW_ICONS[i % ROW_ICONS.length]} className="h-4 w-4" />
              </span>
              <Rich text={String(r[0])} tone="dark" />
            </p>
            <div className="flex min-w-0 items-start gap-3 rounded-2xl bg-white/[0.03] p-3.5 ring-1 ring-white/[0.07]">
              <span aria-hidden="true" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-[12px] font-bold text-white/55">
                ×
              </span>
              <p className="min-w-0 text-[15.5px] leading-snug text-white/70">
                <span className="mb-1 block text-[11px] font-bold uppercase tracking-[0.14em] text-white/40 lg:sr-only">{head[1]}</span>
                <Rich text={String(r[1])} tone="dark" />
              </p>
            </div>
            <svg aria-hidden="true" viewBox="0 0 64 24" className="hidden h-6 w-16 lg:block">
              <path d="M2 12h54" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" strokeDasharray="2 5" strokeLinecap="round" />
              <path data-lane-arrow d="M2 12h54M48 5l8 7-8 7" pathLength="1" fill="none" stroke="#f9c320" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="relative flex min-w-0 items-start gap-3 overflow-hidden rounded-2xl p-3.5 ring-1 ring-gold-400/35">
              <span data-lane-lit aria-hidden="true" className="absolute inset-0 origin-left bg-gradient-to-r from-brand-500/45 via-brand-600/30 to-gold-500/15" />
              <span data-lane-check aria-hidden="true" className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-400 text-ink-950">
                <Icon name="check" className="h-3 w-3" strokeWidth={3.2} />
              </span>
              <p className="relative min-w-0 text-[15.5px] font-semibold leading-snug text-white">
                <span className="mb-1 block text-[11px] font-bold uppercase tracking-[0.14em] text-gold-300 lg:sr-only">{head[2]}</span>
                <Rich text={String(r[2])} tone="dark" />
              </p>
            </div>
            <span data-beam aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-transparent via-gold-300/20 to-transparent opacity-0 lg:block" />
          </li>
        ))}
      </ul>
    </div>
  );
}

function SourceNote({ text }) {
  return (
    <div data-note className="relative mt-5 grid grid-cols-[minmax(0,1fr)] items-center gap-6 overflow-hidden rounded-[26px] bg-gradient-to-r from-white/[0.07] to-white/[0.02] p-5 ring-1 ring-white/10 sm:p-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10">
      <div className="min-w-0">
        <p className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em] text-gold-300">
          <Icon name="shield" className="h-4 w-4" />
          Where the jobs come from
        </p>
        <div aria-hidden="true" className="mt-4 flex flex-wrap items-center gap-2.5">
          {BOARD_NAMES.map((b) => (
            <span key={b} className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] py-1 pl-1 pr-3 ring-1 ring-white/10">
              <BoardMark board={b} size="h-6 w-6" text="text-[10px]" />
              <span className="text-[12.5px] font-bold text-white">{b}</span>
              <span className="text-[10.5px] font-semibold text-white/50">own terms</span>
            </span>
          ))}
          <svg viewBox="0 0 40 12" className="h-3 w-10 text-gold-400">
            <path d="M1 6h34M30 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-400 px-3 py-1.5 text-[12px] font-bold text-ink-950">
            <Icon name="arrow" className="h-3.5 w-3.5 -rotate-45" strokeWidth={2.4} />
            JobHunter shows and links
          </span>
        </div>
      </div>
      <p className="min-w-0 text-[16.5px] leading-relaxed text-brand-100">
        <Rich text={text} tone="dark" />
      </p>
    </div>
  );
}

export default function OneSearch({ s, n }) {
  const root = useRef(null);
  const table = s.blocks.find((b) => b.type === 'table');
  const note = s.blocks.find((b) => b.type === 'p');
  const others = s.blocks.filter((b) => b !== table && b !== note);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ scrollTrigger: { trigger: q('[data-console]')[0], start: 'top 85%', once: true } })
          .from(q('[data-intro]'), { y: 30, opacity: 0, duration: 1.1 }, 0)
          .from(q('[data-console]'), { y: 60, opacity: 0, duration: 1.3 }, 0.1)
          .from(q('[data-feed]'), { x: 40, opacity: 0, stagger: 0.07, duration: 1 }, 0.35);
        gsap.from(q('[data-note]'), { y: 40, opacity: 0, duration: 1.2, scrollTrigger: { trigger: q('[data-note]')[0], start: 'top 92%', once: true } });
      });

      // One scrubbed timeline converts the lanes in turn: beam sweeps, arrow draws, the new way lights up
      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: q('[data-lanes]')[0], start: 'top 78%', end: 'bottom 55%', scrub: 0.3 } });
        q('[data-lanerow]').forEach((row, i) => {
          const sel = (k) => row.querySelector(k);
          const t = i * 0.8;
          tl.fromTo(sel('[data-beam]'), { xPercent: 0, opacity: 1 }, { xPercent: 1400, duration: 1 }, t)
            .to(sel('[data-beam]'), { opacity: 0, duration: 0.1 }, t + 0.9)
            .fromTo(sel('[data-lane-arrow]'), { strokeDasharray: '1 1', strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.45 }, t + 0.3)
            .from(sel('[data-lane-lit]'), { scaleX: 0, duration: 0.5 }, t + 0.45)
            .from(sel('[data-lane-check]'), { scale: 0, rotation: -90, duration: 0.3, ease: 'back.out(2.4)' }, t + 0.7);
        });
      });

      mm.add(`(max-width: 1023px) and ${MOTION_OK}`, () => {
        gsap.set(q('[data-lanerow]'), { y: 40, opacity: 0 });
        ScrollTrigger.batch(q('[data-lanerow]'), { start: 'top 90%', once: true, onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, stagger: 0.1, duration: 1 }) });
      });
    },
    { scope: root }
  );

  return (
    <section id={s.id} ref={root} aria-labelledby={`${s.id}-title`} className="grain relative scroll-mt-24 overflow-hidden bg-brand-950 text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_40%_at_80%_15%,rgba(109,76,176,0.55),transparent),radial-gradient(35%_30%_at_5%_60%,rgba(124,92,214,0.3),transparent),radial-gradient(30%_30%_at_90%_95%,rgba(244,180,0,0.14),transparent)]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '56px 56px', maskImage: 'radial-gradient(ellipse 80% 60% at 70% 30%, black 10%, transparent 75%)' }}
      />
      <Ticker />

      <div className="container-x relative z-[2] py-[60px] sm:py-24">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <SectionHeading s={s} n={n} tone="dark" className="min-w-0 lg:col-span-7" />
          <Intro text={s.intro} tone="dark" className="min-w-0 lg:col-span-5 lg:pb-2" />
        </div>

        <div className="mt-10 sm:mt-12">
          <Console />
        </div>

        {table && (
          <div className="mt-14 sm:mt-20">
            <Lanes head={table.head} rows={table.rows} />
          </div>
        )}
        {note && <SourceNote text={note.text} />}
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
