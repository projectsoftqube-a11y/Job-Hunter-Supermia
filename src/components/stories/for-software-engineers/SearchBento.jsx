'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { BoardMark, ChapterHead, Handoff, tileOuter, tileInner, TARGET } from './shared';

/*
 * Chapter 1, "The search" (dark band). Sam swaps three tabs for one search. Two balanced columns: the
 * section's copy as five compact cards on the left, a bento of five finished mini-UIs on the right (one
 * search across LinkedIn, Indeed and Dice; roles ranked by fit; the recruiter contact; the original
 * listing; the two resume versions). Every tile is complete and readable at all times. On desktop the
 * row pins while you scroll and a spotlight walks through the five beats: the active copy card and its
 * tile light up together and the tile replays a short micro-animation that ends on its finished state.
 * A progress bar above the bento tracks the walk. Phones and reduced motion get the same finished grid.
 */

const TOGGLES = [
  ['LinkedIn', 24],
  ['Indeed', 22],
  ['Dice', 18],
];
const TABS = [
  ['LinkedIn', 41],
  ['Indeed', 37],
  ['Dice', 26],
];
const RANKED = [
  { title: TARGET.title, company: TARGET.company, board: 'Dice', score: 78 },
  {
    title: 'Backend Engineer',
    company: 'Northwind Labs',
    board: 'LinkedIn',
    score: 74,
  },
  {
    title: 'Reliability Engineer',
    company: 'Lumen Studio',
    board: 'Indeed',
    score: 61,
  },
];
// Where each row starts before the re-sort replays (in rows)
const SHUFFLE = [2, -1, -1];
const TRACKS = {
  backend: ['Go', 'gRPC', 'Postgres', 'Kafka'],
  platform: ['Go', 'Pulumi', 'CI/CD', 'Prometheus'],
};
const STEPS = ['Search', 'Rank', 'Contact', 'Listing', 'Resume'];

function TileHead({ icon, label, note }) {
  return (
    <p className="flex items-center gap-2.5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/[0.07] text-gold-300 ring-1 ring-white/10 transition-colors duration-500 group-data-[active=true]/tile:bg-gold-400 group-data-[active=true]/tile:text-ink-950">
        <Icon name={icon} className="h-4 w-4" strokeWidth={2.2} />
      </span>
      <span className="text-[14px] font-bold text-white">{label}</span>
      {note && <span className="ml-auto rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[11px] font-semibold text-brand-200">{note}</span>}
    </p>
  );
}

function Tile({ children, className = '' }) {
  return (
    <div data-tile className={`group/tile ${tileOuter} ${className}`}>
      <span className="pointer-events-none absolute inset-0 rounded-[24px] bg-gradient-to-br from-gold-300 via-brand-400/70 to-gold-500 opacity-0 transition-opacity duration-500 group-data-[active=true]/tile:opacity-100" />
      <div className={`${tileInner} flex flex-col`}>
        <span className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[80%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(249,195,32,0.24),transparent)] opacity-0 transition-opacity duration-500 group-data-[active=true]/tile:opacity-100" />
        <div className="relative flex flex-1 flex-col p-4 sm:p-5">{children}</div>
      </div>
    </div>
  );
}

function Bento() {
  return (
    <div data-bento aria-hidden="true" className="flex h-full flex-col gap-3">
      {/* Spotlight progress */}
      <div className="flex items-center gap-3 rounded-2xl bg-white/[0.04] px-4 py-2 ring-1 ring-white/10">
        <span className="text-[12px] font-bold text-white">Sam&apos;s search</span>
        <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
          <span data-prog className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-brand-400 to-gold-400" />
        </span>
        <span className="hidden gap-1.5 sm:flex">
          {STEPS.map((s, i) => (
            <span key={s} data-step={i} className="rounded-full px-2 py-0.5 text-[11px] font-bold text-brand-200 transition-colors duration-300 data-[on=true]:bg-gold-400 data-[on=true]:text-ink-950">
              {s}
            </span>
          ))}
        </span>
      </div>

      <div className="grid flex-1 grid-cols-[minmax(0,1fr)] gap-3 sm:grid-cols-2">
        {/* A. One search across three boards, replacing three tabs */}
        <Tile className="sm:col-span-2">
          <TileHead icon="search" label="One search, three boards" note="Remote, US" />
          <div className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-3 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
            <div className="flex min-w-0 flex-col justify-between gap-3">
              <div className="flex items-center gap-2 rounded-2xl bg-white/[0.06] py-1.5 pl-3.5 pr-1.5 ring-1 ring-white/12">
                <Icon name="search" className="h-4 w-4 shrink-0 text-brand-300" />
                <span className="min-w-0 flex-1 text-[13px] font-semibold leading-snug text-white sm:text-[14px]">Backend or platform engineer</span>
                <span className="shrink-0 rounded-xl bg-gold-400 px-3.5 py-2 text-[12px] font-bold text-ink-950">Search</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {TOGGLES.map(([b, n]) => (
                  <span key={b} className="flex min-w-0 flex-col items-start gap-1.5 rounded-xl bg-white/[0.04] px-2.5 py-2 ring-1 ring-white/10 min-[440px]:flex-row min-[440px]:items-center min-[440px]:gap-2">
                    <BoardMark board={b} size="h-6 w-6" text="text-[11px]" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[12.5px] font-bold text-white">{b}</span>
                      <span className="block text-[11px] text-brand-300">
                        <span data-count={n}>{n}</span> roles
                      </span>
                    </span>
                    <span className="relative hidden h-4 w-7 shrink-0 rounded-full bg-gold-400 min-[440px]:block">
                      <span data-knob className="absolute right-0.5 top-0.5 h-3 w-3 rounded-full bg-white" />
                    </span>
                  </span>
                ))}
              </div>
            </div>
            {/* Before and after */}
            <div className="grid grid-cols-[minmax(0,1fr)] gap-2 min-[560px]:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-xl bg-rose-500/[0.08] px-3 py-2.5 ring-1 ring-rose-400/25">
                <span className="block text-[11px] font-bold uppercase tracking-[0.1em] text-rose-300">Before</span>
                <span className="mt-1.5 flex flex-wrap gap-1">
                  {TABS.map(([b, r]) => (
                    <span key={b} data-tab className="inline-flex items-center gap-1 rounded-md bg-white/[0.06] px-1.5 py-0.5 text-[11px] font-semibold text-brand-100">
                      <BoardMark board={b} size="h-3.5 w-3.5" text="text-[8px]" />
                      {r}
                    </span>
                  ))}
                </span>
                <span className="mt-1.5 block text-[12px] font-semibold text-brand-200">104 listings in three tabs, unsorted</span>
              </div>
              <div className="rounded-xl bg-gold-400/[0.1] px-3 py-2.5 ring-1 ring-gold-400/35">
                <span className="block text-[11px] font-bold uppercase tracking-[0.1em] text-gold-300">Now</span>
                <span className="mt-1 flex items-baseline gap-2">
                  <span data-total className="font-display text-[26px] font-extrabold leading-none text-white">
                    64
                  </span>
                  <span className="text-[12px] font-semibold leading-snug text-brand-100">roles in one list, ranked by fit</span>
                </span>
              </div>
            </div>
          </div>
        </Tile>

        {/* B. Ranked by fit */}
        <Tile>
          <TileHead icon="target" label="Ranked by fit" note="out of 100" />
          <ol className="mt-4 space-y-1.5">
            {RANKED.map((r, i) => (
              <li key={r.title} data-rank={SHUFFLE[i]} className={`relative flex h-[56px] items-center gap-2.5 rounded-xl px-2.5 ${i === 0 ? 'bg-white/[0.09] ring-1 ring-gold-400/70' : 'bg-white/[0.04] ring-1 ring-white/10'}`}>
                <BoardMark board={r.board} size="h-6 w-6" text="text-[10px]" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[12.5px] font-bold leading-tight text-white">{r.title}</span>
                  <span className="block truncate text-[11px] leading-tight text-brand-300">{r.company}</span>
                </span>
                <span className="w-11 shrink-0 text-right">
                  <span data-score={r.score} className={`block font-display text-[16px] font-extrabold leading-none ${i === 0 ? 'text-gold-300' : 'text-white'}`}>
                    {r.score}
                  </span>
                  <span className="mt-1 block h-[3px] overflow-hidden rounded-full bg-white/10">
                    <span className="block h-full" style={{ width: `${r.score}%` }}>
                      <span data-bar className="block h-full origin-left rounded-full bg-gradient-to-r from-brand-400 to-gold-400" />
                    </span>
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </Tile>

        {/* C. Recruiter contact */}
        <Tile>
          <TileHead icon="mail" label="Recruiter contact" note="Public" />
          <div className="mt-4 flex items-center gap-3 rounded-xl bg-white/[0.04] p-2.5 ring-1 ring-white/10">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-300 to-brand-500 font-display text-[14px] font-extrabold text-brand-950">JL</span>
            <span className="min-w-0">
              <span className="block text-[14px] font-bold text-white">Jordan Lee</span>
              <span className="block text-[11.5px] leading-snug text-brand-300">Technical recruiter, {TARGET.company}</span>
            </span>
          </div>
          <div data-contact className="mt-2 flex items-center justify-between gap-2 rounded-xl bg-white/[0.04] px-2.5 py-2 ring-1 ring-white/10">
            <span className="flex min-w-0 items-center gap-2 text-[12px] font-semibold text-brand-100">
              <Icon name="check" className="h-3.5 w-3.5 shrink-0 text-emerald-300" strokeWidth={3} />
              Shown on the listing
            </span>
            <span data-mail className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-gold-400 px-2 py-1 text-[11.5px] font-bold text-ink-950">
              <Icon name="pen" className="h-3 w-3" />
              You write
            </span>
          </div>
          <div className="mt-2 rounded-xl bg-white/[0.04] px-3 py-2 ring-1 ring-white/10">
            <span className="block text-[11px] font-bold uppercase tracking-[0.1em] text-gold-300">Draft, not sent</span>
            <span className="mt-0.5 block text-[12px] leading-snug text-brand-100">Hi Jordan, I saw the {TARGET.title} role and wanted to reach out…</span>
          </div>
        </Tile>

        {/* D. Third-party listings */}
        <Tile>
          <TileHead icon="shield" label="Third-party listing" />
          <div className="mt-4 flex items-center gap-3 rounded-xl bg-white/[0.04] p-2.5 ring-1 ring-white/10">
            <BoardMark board="Dice" size="h-10 w-10" text="text-[15px]" />
            <span className="min-w-0">
              <span className="block text-[14px] font-bold text-white">{TARGET.title}</span>
              <span className="block text-[11.5px] text-brand-300">Listed on Dice, under Dice&apos;s terms</span>
            </span>
          </div>
          <div data-link className="mt-2 flex items-center justify-between gap-2 rounded-xl bg-white/[0.04] px-2.5 py-2 ring-1 ring-white/10">
            <span className="text-[12px] font-semibold text-brand-100">Open the original listing</span>
            <span data-arrow className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-brand-700">
              <Icon name="arrow" className="h-3.5 w-3.5 -rotate-45" strokeWidth={2.6} />
            </span>
          </div>
        </Tile>

        {/* E. Two tracks, two resume versions */}
        <Tile>
          <TileHead icon="doc" label="Resume versions" note="2 tracks" />
          <div className="relative mt-4 grid grid-cols-2 rounded-xl bg-white/[0.05] p-1 ring-1 ring-white/10">
            <span data-pill className="absolute inset-y-1 right-1 w-[calc(50%_-_4px)] rounded-lg bg-white" />
            <span className="relative py-1.5 text-center text-[11.5px] font-bold text-brand-200">Backend</span>
            <span className="relative py-1.5 text-center text-[11.5px] font-bold text-brand-800">Platform</span>
          </div>
          <div className="relative mt-3">
            <span data-set="backend" className="absolute inset-0 flex flex-wrap content-start gap-1.5 opacity-0">
              {TRACKS.backend.map((t) => (
                <span key={t} className="rounded-md bg-white/[0.07] px-2 py-1 text-[11.5px] font-bold text-brand-100">
                  {t}
                </span>
              ))}
            </span>
            <span data-set="platform" className="flex flex-wrap gap-1.5">
              {TRACKS.platform.map((t) => (
                <span key={t} className="rounded-md bg-gold-400/15 px-2 py-1 text-[11.5px] font-bold text-gold-200 ring-1 ring-gold-400/30">
                  {t}
                </span>
              ))}
            </span>
          </div>
          <p className="mt-auto pt-3 text-[11.5px] font-semibold text-brand-300">Skills, experience and level read from each version</p>
        </Tile>
      </div>
    </div>
  );
}

const card = 'group/beat rounded-[22px] bg-white/[0.04] p-4 ring-1 ring-white/10 transition-[background-color,box-shadow] duration-500 data-[active=true]:bg-white/[0.08] data-[active=true]:ring-gold-400/70 sm:p-5';
const badge =
  'flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/[0.08] text-gold-300 ring-1 ring-white/10 transition-colors duration-500 group-data-[active=true]/beat:bg-gold-400 group-data-[active=true]/beat:text-ink-950';

export default function SearchBento({ s, n, next }) {
  const root = useRef(null);
  const para = s.blocks.find((b) => b.type === 'p');
  const cards = s.blocks.find((b) => b.type === 'cards')?.items || [];
  const callout = s.blocks.find((b) => b.type === 'callout');

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(
        {
          pin: '(min-width: 1024px) and (min-height: 820px)',
          desk: '(min-width: 1024px)',
          motion: MOTION_OK,
        },
        (ctx) => {
          const { pin, desk, motion } = ctx.conditions;
          if (!motion) return;
          if (!desk) {
            ScrollTrigger.batch(q('[data-beat], [data-tile]'), {
              start: 'top 88%',
              once: true,
              onEnter: (els) =>
                gsap.from(els, {
                  y: 30,
                  opacity: 0,
                  stagger: 0.07,
                  duration: 0.9,
                  clearProps: 'opacity,transform',
                }),
            });
            return;
          }

          const beats = q('[data-beat]');
          const tiles = q('[data-tile]');
          const steps = q('[data-step]');

          // A short replay per tile; each one ends on the finished state already in the markup
          const tick = (el, from, to) => {
            const o = { v: from };
            return gsap.fromTo(
              o,
              { v: from },
              {
                v: to,
                duration: 0.7,
                ease: 'power2.out',
                onUpdate: () => (el.textContent = Math.round(o.v)),
              },
            );
          };
          const replays = [
            () =>
              gsap
                .timeline()
                .fromTo(
                  q('[data-tab]'),
                  { x: 0 },
                  {
                    x: 6,
                    yoyo: true,
                    repeat: 1,
                    stagger: 0.06,
                    duration: 0.18,
                  },
                )
                .fromTo(q('[data-knob]'), { x: -12 }, { x: 0, stagger: 0.1, duration: 0.35, ease: 'back.out(2)' }, 0.1)
                .add(
                  q('[data-count]').map((el) => tick(el, Number(el.textContent) - 6, Number(el.dataset.count))),
                  0.1,
                )
                .add(tick(q('[data-total]')[0], 46, 64), 0.25),
            () =>
              gsap
                .timeline()
                .fromTo(q('[data-rank]'), { y: (i, el) => Number(el.dataset.rank) * 62 }, { y: 0, duration: 0.7, ease: 'power3.inOut' })
                .fromTo(q('[data-bar]'), { scaleX: 0.6 }, { scaleX: 1, duration: 0.7 }, 0.2)
                .add(
                  q('[data-score]').map((el) => tick(el, Number(el.dataset.score) - 12, Number(el.dataset.score))),
                  0.2,
                ),
            () => gsap.timeline().fromTo(q('[data-contact]'), { y: 10 }, { y: 0, duration: 0.5, ease: 'back.out(2)' }).fromTo(q('[data-mail]'), { scale: 0.7 }, { scale: 1, duration: 0.45, ease: 'back.out(3)' }, 0.15),
            () => gsap.timeline().fromTo(q('[data-link]'), { y: 10 }, { y: 0, duration: 0.5, ease: 'back.out(2)' }).fromTo(q('[data-arrow]'), { x: -6, y: 6 }, { x: 0, y: 0, duration: 0.45, ease: 'back.out(3)' }, 0.15),
            () =>
              gsap
                .timeline()
                .fromTo(q('[data-pill]'), { xPercent: -100 }, { xPercent: 0, duration: 0.5, ease: 'power3.inOut' })
                .fromTo(q('[data-set="backend"]'), { opacity: 1 }, { opacity: 0, duration: 0.3 }, 0)
                .fromTo(q('[data-set="platform"]'), { opacity: 0 }, { opacity: 1, duration: 0.35 }, 0.2),
          ];

          let active = -1;
          let running;
          const setActive = (i) => {
            if (i === active) return;
            active = i;
            beats.forEach((b, k) => (b.dataset.active = k === i ? 'true' : 'false'));
            tiles.forEach((t, k) => (t.dataset.active = k === i ? 'true' : 'false'));
            steps.forEach((t, k) => (t.dataset.on = k <= i ? 'true' : 'false'));
            if (running) running.progress(1).kill();
            running = replays[i]();
          };

          const prog = q('[data-prog]')[0];
          gsap.fromTo(
            prog,
            { scaleX: 0.2 },
            {
              scaleX: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: q('[data-row]')[0],
                ...(pin
                  ? {
                      start: 'center center',
                      end: '+=150%',
                      pin: true,
                      anticipatePin: 1,
                    }
                  : { start: 'top 60%', end: 'bottom 40%' }),
                scrub: true,
                invalidateOnRefresh: true,
                onUpdate: (self) => setActive(Math.min(beats.length - 1, Math.floor(self.progress * beats.length))),
              },
            },
          );
          setActive(0);

          return () => {
            if (running) running.progress(1).kill();
            [...beats, ...tiles].forEach((el) => delete el.dataset.active);
            steps.forEach((el) => delete el.dataset.on);
          };
        },
      );
    },
    { scope: root },
  );

  return (
    <section id={s.id} ref={root} aria-labelledby={`${s.id}-title`} className="grain relative scroll-mt-24 overflow-hidden bg-brand-950 py-16 text-white sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(42%_30%_at_80%_8%,rgba(109,76,176,0.5),transparent),radial-gradient(35%_28%_at_8%_70%,rgba(244,180,0,0.1),transparent)]" />
      <div className="container-x relative z-[2]">
        <ChapterHead s={s} n={n} tone="dark" />

        <div data-row className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-6 lg:mt-14 lg:grid-cols-12 lg:items-stretch lg:gap-8 xl:gap-10">
          <div className="flex min-w-0 flex-col gap-3 lg:col-span-5 2xl:col-span-4">
            {para && (
              <div data-beat className={card}>
                <div className="flex gap-4">
                  <span aria-hidden="true" className={badge}>
                    <Icon name="search" className="h-5 w-5" />
                  </span>
                  <p className="min-w-0 text-[16px] leading-[1.65] text-brand-100 sm:text-[17px]">
                    <Rich text={para.text} tone="dark" />
                  </p>
                </div>
              </div>
            )}
            <ul className="flex flex-col gap-3 lg:flex-1 lg:justify-between">
              {cards.map((c) => (
                <li key={c.title} data-beat className={card}>
                  <div className="flex gap-4">
                    <span aria-hidden="true" className={badge}>
                      <Icon name={c.icon || 'spark'} className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-[1.15rem] font-bold leading-snug tracking-[-0.02em] text-white">{c.title}</h3>
                      <p className="mt-1 text-[15px] leading-relaxed text-brand-100/85">
                        <Rich text={c.text} tone="dark" />
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {callout && (
              <aside data-beat className={card}>
                <div className="flex gap-4">
                  <span aria-hidden="true" className={badge}>
                    <Icon name="layers" className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-[1.15rem] font-bold leading-snug text-white">{callout.title}</p>
                    <p className="mt-1 text-[15px] leading-relaxed text-brand-100/85">
                      <Rich text={callout.text} tone="dark" />
                    </p>
                  </div>
                </div>
              </aside>
            )}
          </div>

          <div className="min-w-0 lg:col-span-7 2xl:col-span-8">
            <Bento />
          </div>
        </div>

        <Handoff n={n} next={next} tone="dark" />
      </div>
    </section>
  );
}
