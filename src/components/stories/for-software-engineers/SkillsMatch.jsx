'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { Avatar, BoardMark, ChapterHead, Handoff, TARGET } from './shared';

/*
 * Chapter 2, "The fit". Sam opens the Platform Engineer role from chapter 1. One compact dark match
 * panel, always shown finished: on the left the 78/100 match with its segmented bar and the two things to
 * fix first; on the right each skill the job asks for sits in a row beside the resume skill that answers
 * it, joined by a short connector (solid for a match, dashed gold for the same idea under another tool,
 * a rose break for a concept the resume lacks). As you scroll, a spotlight steps down the rows: the
 * active pair lights up and a pulse runs along its connector. The tips below map onto the same legend.
 */

const PAIRS = [
  { job: 'Go', res: 'Go', kind: 'match' },
  { job: 'Kubernetes', res: null, kind: 'missing' },
  { job: 'Terraform', res: 'Pulumi', kind: 'fix' },
  { job: 'gRPC', res: 'gRPC', kind: 'match' },
  { job: 'PostgreSQL', res: 'Postgres', kind: 'match' },
  { job: 'Observability', res: 'Prometheus', kind: 'match' },
  { job: 'CI/CD', res: 'GH Actions', kind: 'match' },
];
const STATUS = {
  match: ['Match', 'bg-emerald-400/15 text-emerald-200 ring-emerald-400/30'],
  fix: ['Wording fix', 'bg-gold-400/15 text-gold-200 ring-gold-400/40'],
  missing: ['Study topic', 'bg-rose-500/15 text-rose-200 ring-rose-400/40'],
};
const SEGMENTS = 20;
const TAGS = ['Tool or concept', 'Specifics', 'Defensible', 'Prep list'];

function Connector({ kind }) {
  if (kind === 'missing')
    return (
      <span className="relative flex items-center">
        <span className="h-0 flex-1 border-t-2 border-dashed border-rose-400/70" />
        <span className="ml-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-500 font-display text-[11px] font-extrabold text-white">?</span>
      </span>
    );
  return (
    <span data-conn className="relative flex items-center">
      <span className="absolute left-0 h-2 w-2 -translate-x-1/2 rounded-full bg-brand-300" />
      {kind === 'fix' ? <span className="h-0 w-full border-t-2 border-dashed border-gold-400" /> : <span className="h-[2px] w-full rounded-full bg-gradient-to-r from-brand-300 to-gold-400" />}
      <span className="absolute right-0 h-2 w-2 translate-x-1/2 rounded-full bg-gold-400" />
      <span data-pulse className="absolute left-0 h-3 w-3 -translate-x-1/2 rounded-full bg-white opacity-0 shadow-[0_0_0_4px_rgba(249,195,32,0.35)]" />
    </span>
  );
}

function SkillChip({ label, kind, side }) {
  const tone =
    kind === 'missing' && side === 'r'
      ? 'border border-dashed border-rose-400/60 bg-transparent text-rose-200'
      : kind === 'missing'
        ? 'bg-rose-500/15 text-white ring-1 ring-rose-400/50'
        : kind === 'fix'
          ? 'bg-gold-400/15 text-white ring-1 ring-gold-400/60'
          : 'bg-gradient-to-r from-brand-500/40 to-brand-400/20 text-white ring-1 ring-brand-300/40';
  return <span data-chip className={`inline-flex max-w-full items-center rounded-xl px-2 py-1.5 text-[11.5px] font-bold sm:px-3 sm:text-[14px] ${tone}`}>{label}</span>;
}

function Panel() {
  const lit = Math.round((TARGET.score / 100) * SEGMENTS);
  return (
    <div data-panel aria-hidden="true" className="relative rounded-[32px] bg-gradient-to-br from-brand-300/45 via-white/10 to-gold-400/45 p-px shadow-[0_60px_120px_-60px_rgba(26,15,51,0.9)]">
      <div className="relative grid grid-cols-[minmax(0,1fr)] gap-4 overflow-hidden rounded-[31px] bg-[#130a29] p-4 sm:gap-5 sm:p-6 lg:p-7 xl:grid-cols-12">
        <span className="pointer-events-none absolute -left-24 -top-32 h-80 w-[50%] rounded-full bg-[radial-gradient(closest-side,rgba(109,76,176,0.5),transparent)]" />
        <span className="pointer-events-none absolute -bottom-40 right-0 h-72 w-[45%] rounded-full bg-[radial-gradient(closest-side,rgba(244,180,0,0.14),transparent)]" />

        {/* The match */}
        <div className="relative flex min-w-0 flex-col gap-4 rounded-[24px] bg-white/[0.04] p-4 ring-1 ring-white/10 sm:p-5 xl:col-span-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] py-1 pl-1 pr-3 ring-1 ring-white/10">
              <Avatar className="h-7 w-7 text-[10px]" />
              <span className="text-[13px] font-bold text-white">Platform resume</span>
            </span>
            <Icon name="arrow" className="h-4 w-4 text-gold-300" strokeWidth={2.4} />
            <span className="inline-flex min-w-0 items-center gap-2 rounded-2xl bg-white/[0.06] py-1 pl-1.5 pr-3 ring-1 ring-white/10">
              <BoardMark board="Dice" size="h-6 w-6" text="text-[10px]" />
              <span className="min-w-0 text-[13px] font-bold leading-snug text-white">
                {TARGET.title}, {TARGET.company}
              </span>
            </span>
          </div>

          <div className="flex flex-wrap items-end gap-x-5 gap-y-3">
            <p className="font-display font-extrabold leading-none text-white">
              <span data-num className="text-[64px] tracking-[-0.05em] sm:text-[80px]">
                {TARGET.score}
              </span>
              <span className="text-[22px] text-brand-300">/100</span>
            </p>
            <p className="pb-2 text-[14px] font-semibold leading-snug text-brand-100">
              Match for this role
              <span className="block text-brand-300">5 of 7 required skills shown</span>
            </p>
          </div>
          <span className="flex gap-[3px]">
            {Array.from({ length: SEGMENTS }, (_, i) => (
              <span key={i} className={`h-2.5 flex-1 rounded-[3px] ${i < lit ? 'bg-gradient-to-r from-brand-400 to-gold-400' : 'bg-white/10'}`} />
            ))}
          </span>

          <div className="mt-auto space-y-2">
            <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-gold-300">Fix first</p>
            <div data-fix className="flex items-start gap-3 rounded-2xl bg-gold-400/10 p-3 ring-1 ring-gold-400/35">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gold-400 text-ink-950">
                <Icon name="pen" className="h-4 w-4" />
              </span>
              <span className="min-w-0 text-[13px] leading-snug text-brand-100">
                <span className="block font-bold text-white">Wording fix: Terraform</span>
                You use Pulumi for the same job. Name the infrastructure work.
              </span>
            </div>
            <div data-fix className="flex items-start gap-3 rounded-2xl bg-rose-500/10 p-3 ring-1 ring-rose-400/35">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-rose-500 text-white">
                <Icon name="book" className="h-4 w-4" />
              </span>
              <span className="min-w-0 text-[13px] leading-snug text-brand-100">
                <span className="block font-bold text-white">Study topic: Kubernetes</span>A concept, not a wording gap. It goes on the interview prep list.
              </span>
            </div>
          </div>
        </div>

        {/* Required skills beside the resume skills that answer them */}
        <div className="relative min-w-0 xl:col-span-7">
          <div className="grid grid-cols-[minmax(0,1fr)_28px_minmax(0,1fr)] gap-x-2 px-2 pb-2 sm:grid-cols-[minmax(0,1fr)_72px_minmax(0,1fr)_96px] sm:gap-x-3 sm:px-3">
            <span className="text-right text-[11px] font-bold uppercase tracking-[0.12em] text-brand-300 sm:text-[12px]">The job asks for</span>
            <span />
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand-300 sm:text-[12px]">Your resume shows</span>
          </div>
          <ol className="space-y-1.5">
            {PAIRS.map((p) => (
              <li
                key={p.job}
                data-pair
                className="grid grid-cols-[minmax(0,1fr)_28px_minmax(0,1fr)] items-center gap-x-2 rounded-2xl bg-white/[0.03] px-2 py-1.5 ring-1 ring-white/[0.07] transition-[background-color,box-shadow] duration-500 data-[active=true]:bg-white/[0.08] data-[active=true]:ring-gold-400/60 sm:grid-cols-[minmax(0,1fr)_72px_minmax(0,1fr)_96px] sm:gap-x-3 sm:px-3 sm:py-2"
              >
                <span className="flex justify-end">
                  <SkillChip label={p.job} kind={p.kind} side="l" />
                </span>
                <Connector kind={p.kind} />
                <span className="flex">
                  <SkillChip label={p.res || 'Not on resume'} kind={p.kind} side="r" />
                </span>
                <span className={`hidden justify-self-end rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 sm:inline-block ${STATUS[p.kind][1]}`}>{STATUS[p.kind][0]}</span>
              </li>
            ))}
          </ol>
          <p className="mt-3 px-2 text-[12.5px] font-semibold text-brand-300 sm:px-3">
            Also on the resume: <span className="text-brand-100">Kafka</span>, not asked for by this role
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SkillsMatch({ s, n, next }) {
  const root = useRef(null);
  const para = s.blocks.find((b) => b.type === 'p');
  const list = s.blocks.find((b) => b.type === 'list');

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const panel = q('[data-panel]')[0];
        const rows = q('[data-pair]');

        // Entrance: the finished panel rises in, its rows settle in turn
        gsap
          .timeline({ scrollTrigger: { trigger: panel, start: 'top 85%', once: true } })
          .from(panel, { y: 40, duration: 1 })
          .from(rows, { x: 16, stagger: 0.05, duration: 0.6, ease: 'power3.out' }, 0.15)
          .from(q('[data-fix]'), { y: 14, stagger: 0.1, duration: 0.6, ease: 'power3.out' }, 0.3);

        // Spotlight: one pair at a time while the panel crosses the screen
        let active = -1;
        let pulse;
        const setActive = (i) => {
          if (i === active) return;
          active = i;
          rows.forEach((r, k) => (r.dataset.active = k === i ? 'true' : 'false'));
          if (pulse) pulse.progress(1).kill();
          const row = rows[i];
          const dot = row.querySelector('[data-pulse]');
          const tl = gsap.timeline().fromTo(row.querySelectorAll('[data-chip]'), { scale: 0.94 }, { scale: 1, duration: 0.5, ease: 'back.out(3)', stagger: 0.12 });
          if (dot) tl.fromTo(dot, { x: 0, opacity: 1 }, { x: () => dot.parentElement.clientWidth, duration: 0.55, ease: 'power2.inOut' }, 0).to(dot, { opacity: 0, duration: 0.2 });
          pulse = tl;
        };
        ScrollTrigger.create({
          trigger: panel,
          start: 'top 62%',
          end: 'bottom 52%',
          onUpdate: (self) => setActive(Math.min(rows.length - 1, Math.floor(self.progress * rows.length))),
          onLeaveBack: () => {
            active = -1;
            rows.forEach((r) => (r.dataset.active = 'false'));
          },
        });

        ScrollTrigger.batch(q('[data-tip]'), {
          start: 'top 88%',
          once: true,
          onEnter: (els) => gsap.from(els, { y: 30, opacity: 0, stagger: 0.08, duration: 0.9, clearProps: 'opacity,transform' }),
        });

        return () => {
          if (pulse) pulse.progress(1).kill();
          rows.forEach((r) => delete r.dataset.active);
        };
      });
    },
    { scope: root }
  );

  return (
    <section id={s.id} ref={root} aria-labelledby={`${s.id}-title`} className="relative scroll-mt-24 overflow-hidden bg-white py-16 sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_30%_at_90%_0%,rgba(196,179,234,0.45),transparent),radial-gradient(30%_25%_at_0%_100%,rgba(252,211,77,0.16),transparent)]" />
      <div className="container-x relative">
        <ChapterHead s={s} n={n} />

        <div className="mt-10 lg:mt-14">
          <Panel />
        </div>

        <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-8 lg:mt-16 xl:grid-cols-12 xl:gap-12">
          {para && (
            <div className="min-w-0 xl:col-span-5">
              <p className="text-[18px] leading-[1.75] text-ink-900/75 sm:text-[19px]">
                <Rich text={para.text} />
              </p>
            </div>
          )}
          {list && (
            <ul className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2 xl:col-span-7">
              {list.items.map((t, i) => (
                <li key={i} data-tip className="group relative rounded-[24px] bg-light-lavender p-5 ring-1 ring-hairline transition-[translate] duration-500 hover:-translate-y-1 sm:p-6">
                  <span aria-hidden="true" className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-950 font-display text-[13px] font-extrabold text-gold-300">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-brand-500">{TAGS[i]}</span>
                  </span>
                  <p className="mt-4 text-[16px] leading-relaxed text-ink-900/80">
                    <Rich text={t} />
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Handoff n={n} next={next} />
      </div>
    </section>
  );
}
