'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { ModuleHead, PAD, Tick, Sample, mod, of } from './shared';

/*
 * Module 2 · Find roles. The four steps are lesson rows on one track. On desktop a single scrubbed
 * timeline fills the track as you read and ticks each lesson off, while the sample match board beside it
 * builds in step: resume read, three boards searched, roles scored out of 100, the decision. The callout
 * becomes an "office hours" note. Markup is the finished state; only transforms and opacity move.
 */

const TAGS = ['Once', 'One search', 'Per job', 'Your call'];
const SKILLS = ['SQL', 'Python', 'Excel', 'Capstone', 'Internship'];
const BOARDS = ['LinkedIn', 'Indeed', 'Dice'];
const ROLES = [
  { co: 'Northwind Labs', title: 'Junior Data Analyst', board: 'LinkedIn', score: 86, tag: 'Real fit', tone: 'bg-emerald-100 text-emerald-800' },
  { co: 'Brightpath Software', title: 'Associate Analyst', board: 'Indeed', score: 74, tag: 'Worth a try', tone: 'bg-gold-100 text-gold-800' },
  { co: 'Lumen Studio', title: 'Analyst · asks 3 yrs', board: 'Dice', score: 58, tag: 'Stretch', tone: 'bg-brand-100 text-brand-700' },
];

function MatchBoard() {
  return (
    <div aria-hidden="true" className="relative overflow-hidden rounded-[30px] bg-light-lavender p-4 ring-1 ring-brand-100 shadow-[0_50px_100px_-60px_rgba(26,15,51,0.6)] sm:p-5">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 opacity-60" style={{ backgroundImage: 'radial-gradient(rgba(109,76,176,0.14) 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
      <div className="relative flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-brand-600">
          <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
          Match board
        </p>
        <Sample />
      </div>

      {/* 1 · resume read */}
      <div data-st="0" className="relative mt-4 flex items-center gap-3 rounded-[18px] bg-brand-950 p-3 text-white">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-400 text-ink-950">
          <Icon name="doc" className="h-[18px] w-[18px]" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13px] font-bold">resume_new-grad.pdf</span>
          <span className="mt-1 flex flex-wrap gap-1">
            {SKILLS.map((t) => (
              <span key={t} data-skill className="rounded-md bg-white/10 px-1.5 py-[1px] text-[10.5px] font-bold text-brand-100">
                {t}
              </span>
            ))}
          </span>
        </span>
        <span className="hidden shrink-0 rounded-full bg-white/10 px-2 py-1 text-[10.5px] font-bold text-gold-300 sm:inline">Entry level</span>
      </div>

      {/* 2 · one search, three boards */}
      <div data-st="1" className="relative mt-2.5 flex flex-wrap items-center gap-2 rounded-[18px] bg-white p-2.5 ring-1 ring-hairline">
        <span className="flex min-w-0 flex-1 items-center gap-2 pl-1">
          <Icon name="search" className="h-4 w-4 shrink-0 text-brand-500" />
          <span className="truncate text-[13px] font-semibold text-ink-950">Junior Data Analyst · Remote</span>
        </span>
        <span className="flex gap-1.5">
          {BOARDS.map((b) => (
            <span key={b} data-boardchip className="rounded-lg bg-light-lavender px-2 py-1 text-[11px] font-bold text-brand-700 ring-1 ring-brand-100">
              {b}
            </span>
          ))}
        </span>
      </div>

      {/* 3 · scored for this resume */}
      <ol data-st="2" className="relative mt-2.5 space-y-2">
        {ROLES.map((r, i) => (
          <li key={r.co} data-role className={`rounded-[18px] bg-white p-3 ring-1 ${i === 0 ? 'ring-gold-300 shadow-[0_14px_30px_-20px_rgba(244,180,0,0.7)]' : 'ring-hairline'}`}>
            <div className="flex items-center gap-3">
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-display text-[13px] font-extrabold ${i === 0 ? 'bg-gold-400 text-ink-950' : 'bg-brand-100 text-brand-700'}`}>{r.co[0]}</span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-bold text-ink-950">{r.title}</span>
                <span className="block truncate text-[11.5px] font-medium text-ink-900/55">
                  {r.co} · {r.board}
                </span>
              </span>
              <span className="shrink-0 text-right">
                <span className="font-display text-[1.6rem] font-extrabold leading-none tracking-[-0.03em] text-ink-950">
                  <span data-score={r.score}>{r.score}</span>
                </span>
                <span className="text-[11px] font-bold text-ink-900/40">/100</span>
              </span>
            </div>
            <div className="mt-2.5 flex items-center gap-2.5">
              <span className="grid flex-1 grid-cols-10 gap-[3px]">
                {Array.from({ length: 10 }, (_, b) => (
                  <span key={b} data-blk className={`h-1.5 rounded-full ${b < Math.round(r.score / 10) ? (i === 0 ? 'bg-gold-500' : 'bg-brand-400') : 'bg-brand-100'}`} />
                ))}
              </span>
              <span data-verdict className={`shrink-0 rounded-full px-2 py-0.5 text-[10.5px] font-extrabold ${r.tone}`}>{r.tag}</span>
            </div>
          </li>
        ))}
      </ol>

      {/* 4 · where the effort goes */}
      <div data-st="3" className="relative mt-2.5 grid grid-cols-[minmax(0,1fr)] gap-2 rounded-[18px] bg-brand-950 p-3 text-[12px] text-white sm:grid-cols-3">
        {[
          ['You can show', 'SQL, Python, dashboards', 'text-emerald-300'],
          ['Missing', 'Tableau', 'text-gold-300'],
          ['Fix first', 'Add capstone results', 'text-brand-200'],
        ].map(([k, v, c]) => (
          <span key={k} className="min-w-0 rounded-xl bg-white/[0.06] px-2.5 py-2">
            <span className={`block text-[10px] font-extrabold uppercase tracking-[0.14em] ${c}`}>{k}</span>
            <span className="mt-0.5 block truncate font-semibold text-white/85">{v}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ModuleRoles({ s, index, total }) {
  const root = useRef(null);
  const m = mod(index);
  const steps = of(s, 'steps');
  const callout = of(s, 'callout');

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        const list = q('[data-lessons]')[0];
        const rows = q('[data-lesson]');
        const fills = q('[data-lesson] [data-tick-fill]');
        const paths = q('[data-lesson] [data-tick-path]');
        const scores = q('[data-score]');
        scores.forEach((el) => (el.textContent = '0'));

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: list, start: 'top 68%', end: 'bottom 58%', scrub: 0.3, invalidateOnRefresh: true },
        });
        q('[data-track-fill]').forEach((f, i) => tl.fromTo(f, { scaleY: 0 }, { scaleY: 1, duration: 0.6 }, i + 0.75));
        rows.forEach((row, i) => {
          tl.from(row.querySelector('[data-lesson-body]'), { opacity: 0.35, x: 14, duration: 0.35, ease: 'power2.out' }, i)
            .fromTo(fills[i], { scale: 0 }, { scale: 1, duration: 0.2, ease: 'back.out(2)' }, i + 0.6)
            .fromTo(paths[i], { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.2 }, i + 0.68);
        });

        // The board builds in step with the lessons
        tl.from(q('[data-st="0"]'), { opacity: 0.2, y: 16, duration: 0.4, ease: 'power2.out' }, 0)
          .from(q('[data-skill]'), { opacity: 0, scale: 0.6, stagger: 0.05, duration: 0.2 }, 0.25)
          .from(q('[data-st="1"]'), { opacity: 0.2, y: 16, duration: 0.4, ease: 'power2.out' }, 1)
          .from(q('[data-boardchip]'), { opacity: 0, y: -8, stagger: 0.1, duration: 0.2 }, 1.25)
          .from(q('[data-role]'), { opacity: 0.2, y: 18, stagger: 0.12, duration: 0.4, ease: 'power2.out' }, 2)
          .from(q('[data-blk]'), { opacity: 0, scaleX: 0.3, stagger: 0.008, duration: 0.1 }, 2.2);
        scores.forEach((el) => {
          const end = Number(el.dataset.score);
          const v = { v: 0 };
          tl.fromTo(
            v,
            { v: 0 },
            {
              v: end,
              duration: 0.6,
              onUpdate: () => {
                el.textContent = String(Math.round(v.v));
              },
            },
            2.2
          );
        });
        tl.from(q('[data-verdict]'), { opacity: 0, scale: 0.6, stagger: 0.08, duration: 0.2, ease: 'back.out(2)' }, 2.85).from(
          q('[data-st="3"]'),
          { opacity: 0.2, y: 16, duration: 0.4, ease: 'power2.out' },
          3
        );
        return () => scores.forEach((el) => (el.textContent = el.dataset.score));
      });

      mm.add(`(max-width: 1023px) and ${MOTION_OK}`, () => {
        const rows = q('[data-lesson]');
        gsap.set(rows, { y: 30, opacity: 0 });
        ScrollTrigger.batch(rows, {
          start: 'top 88%',
          once: true,
          onEnter: (els) => {
            gsap.to(els, { y: 0, opacity: 1, stagger: 0.12, duration: 0.9, overwrite: true });
            gsap.fromTo(
              els.map((e) => e.querySelector('[data-tick-fill]')),
              { scale: 0 },
              { scale: 1, stagger: 0.12, duration: 0.45, delay: 0.3, ease: 'back.out(2)' }
            );
          },
        });
      });

      mm.add(MOTION_OK, () => {
        const note = q('[data-office]')[0];
        if (!note) return;
        gsap
          .timeline({ scrollTrigger: { trigger: note, start: 'top 86%', once: true } })
          .from(note, { y: 40, opacity: 0, duration: 1.1 })
          .from(q('[data-office-pin]'), { scale: 0, rotation: -30, duration: 0.7, ease: 'back.out(2.2)' }, 0.35);
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id={s.id} data-module={index} aria-labelledby={`${s.id}-title`} className="relative scroll-mt-24 overflow-clip bg-white py-16 sm:py-20 lg:py-24">
      <div className="container-x relative">
        <div className={PAD}>
          <ModuleHead s={s} index={index} total={total} meta={`${steps.items.length} lessons · office hours`} />

          <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-10 sm:mt-14 lg:grid-cols-2 lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] xl:gap-14">
            <ol data-lessons className="relative min-w-0">
              {steps.items.map((st, i) => (
                <li key={st.title} data-lesson className="relative grid grid-cols-[40px_minmax(0,1fr)] gap-x-5 border-b border-hairline py-6 last:border-0 sm:gap-x-6">
                  {i < steps.items.length - 1 && (
                    <span aria-hidden="true" className="absolute -bottom-[22px] left-[19px] top-[70px] w-[2px] overflow-hidden rounded-full bg-hairline">
                      <span data-track-fill className={`absolute inset-0 origin-top ${m.fill}`} />
                    </span>
                  )}
                  <span className="relative pt-0.5">
                    <Tick m={m} size="h-10 w-10" />
                  </span>
                  <div data-lesson-body className="min-w-0">
                    <div aria-hidden="true" className="flex items-center gap-3">
                      <span className={`font-display text-[12px] font-extrabold uppercase tracking-[0.16em] ${m.label}`}>
                        Lesson {index + 1}.{i + 1}
                      </span>
                      <span className="h-px flex-1 bg-hairline" />
                      <span className="rounded-full bg-light-lavender px-2.5 py-0.5 text-[11.5px] font-bold text-ink-900/55">{TAGS[i] || 'Lesson'}</span>
                    </div>
                    <h3 className="mt-2 font-display text-[1.3rem] font-bold leading-snug tracking-[-0.02em] text-ink-950">{st.title}</h3>
                    <p className="mt-1.5 text-[15.5px] leading-relaxed text-ink-900/70">
                      <Rich text={st.text} />
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="min-w-0 lg:sticky lg:top-28">
              <MatchBoard />
            </div>
          </div>

          {callout && (
            <aside data-office className="mt-12 grid grid-cols-[minmax(0,1fr)] overflow-hidden rounded-[28px] ring-1 ring-gold-200 sm:mt-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.7fr)]">
              <div className="relative flex flex-col justify-between gap-6 overflow-hidden bg-gold-400 p-6 text-ink-950 sm:p-8">
                <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 -right-10 h-48 w-48 rounded-full border-[18px] border-gold-300/80" />
                <div className="relative flex items-center gap-3">
                  <span data-office-pin aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-950 text-gold-300">
                    <Icon name="chat" className="h-5 w-5" />
                  </span>
                  <span aria-hidden="true">
                    <span className="block text-[11px] font-extrabold uppercase tracking-[0.18em] text-ink-950/60">Office hours</span>
                    <span className="block font-display text-[14px] font-bold">A question new grads ask</span>
                  </span>
                </div>
                <h3 className="relative font-display text-[1.45rem] font-extrabold leading-tight tracking-[-0.02em] sm:text-[1.65rem]">{callout.title}</h3>
              </div>
              <div className="flex items-center bg-gold-50 p-6 sm:p-8 lg:p-10">
                <p className="text-[1.0625rem] leading-relaxed text-ink-900/80 xl:text-[1.125rem]">
                  <Rich text={callout.text} />
                </p>
              </div>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
