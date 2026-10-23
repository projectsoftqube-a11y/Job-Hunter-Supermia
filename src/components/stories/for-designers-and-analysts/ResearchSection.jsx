'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { Block } from '@/components/page/Blocks';
import { RunningHead, Numeral, Title, Lead, Para, Handoff } from './shared';

/*
 * Chapter 02, "The research", on the gold field. Noa's sample shortlist becomes a clean annotated bar
 * chart: on desktop the bars grow and the scores count up with the scroll, the "worth tailoring" line
 * drops in at 70, and three numbered annotations land on the bars. Those numbers carry straight into the
 * missing-skills table below, which is set as a dark diagnosis slab (each value keeps its column label).
 * The callout closes as a large "a guide, not a verdict" statement. Chart data is sample data, decorative.
 */

const LINE = 70;
const ROLES = [
  { title: 'Product Designer', company: 'Lumen Studio', score: 88, kind: 'd', note: 2 },
  { title: 'UX Researcher', company: 'Brightpath Software', score: 81, kind: 'd' },
  { title: 'Product Analyst', company: 'Northwind Labs', score: 74, kind: 'a', note: 1 },
  { title: 'UI Designer', company: 'Kestrel Health', score: 63, kind: 'd' },
  { title: 'BI Analyst', company: 'Harbor Analytics', score: 58, kind: 'a' },
  { title: 'Data Scientist', company: 'Atlas Freight', score: 41, kind: 'a', note: 3 },
];
const NOTES = [
  { n: 1, skill: 'Tableau', text: 'Used on two projects, never listed' },
  { n: 2, skill: 'Usability testing', text: 'Run every sprint, never named' },
  { n: 3, skill: 'Machine learning', text: 'Not on the resume, not yet a skill' },
];
const TICKS = [0, 25, 50, 75, 100];

function barTone(r) {
  const strong = r.score >= LINE;
  if (r.kind === 'd') return strong ? 'bg-gold-400 text-ink-950' : 'bg-gold-200 text-ink-950';
  return strong ? 'bg-brand-600 text-white' : 'bg-brand-200 text-ink-950';
}

function Chart() {
  return (
    <div data-chart aria-hidden="true" className="relative min-w-0 overflow-hidden rounded-[32px] bg-white p-4 text-ink-950 shadow-[0_70px_120px_-60px_rgba(90,55,0,0.75)] sm:p-7 lg:p-8">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div className="min-w-0">
          <p className="font-display text-[clamp(1.3rem,1.1rem+0.6vw,1.75rem)] font-extrabold leading-tight tracking-[-0.02em]">Noa&apos;s shortlist</p>
          <p className="mt-1 text-[13px] font-medium text-ink-900/55">One search, six roles · match score out of 100 · sample</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12.5px] font-bold">
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-[4px] bg-gold-400" /> Design roles
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-[4px] bg-brand-600" /> Analyst roles
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.7fr)] gap-x-3 sm:grid-cols-[minmax(150px,0.7fr)_minmax(0,2fr)] sm:gap-x-5">
        {/* Labels */}
        <ul className="space-y-2 pt-10">
          {ROLES.map((r) => (
            <li key={r.title} className="flex h-12 flex-col justify-center">
              <span className="block text-[12.5px] font-bold leading-tight sm:text-[14px]">{r.title}</span>
              <span className="mt-0.5 hidden text-[11.5px] font-medium leading-tight text-ink-900/50 sm:block">{r.company}</span>
            </li>
          ))}
        </ul>

        {/* Bars */}
        <div className="relative min-w-0 pt-10">
          {TICKS.map((t) => (
            <span key={t} className="absolute bottom-7 top-10 w-px bg-ink-950/[0.07]" style={{ left: `${t}%` }} />
          ))}
          <div data-line className="absolute bottom-7 top-1 origin-top" style={{ left: `${LINE}%` }}>
            <span className="absolute inset-y-0 -left-px w-[2px] bg-[repeating-linear-gradient(to_bottom,var(--color-ink-950)_0_6px,transparent_6px_11px)]" />
            <span data-line-tag className="absolute right-1.5 top-0 whitespace-nowrap rounded-full bg-ink-950 px-2.5 py-1 text-[10.5px] font-bold text-gold-300 sm:text-[11.5px]">
              {LINE}+ worth tailoring
            </span>
          </div>
          <ul className="relative space-y-2">
            {ROLES.map((r) => (
              <li key={r.title} className="relative h-12 overflow-hidden rounded-xl bg-ink-950/[0.05]">
                <span className="absolute inset-y-0 left-0" style={{ width: `${r.score}%` }}>
                  <span data-bar className={`flex h-full w-full origin-left items-center justify-end gap-1.5 rounded-xl pr-2 sm:pr-3 ${barTone(r)}`}>
                    {r.note && (
                      <span data-mark className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink-950 font-display text-[12px] font-extrabold text-gold-300 ring-2 ring-white">
                        {r.note}
                      </span>
                    )}
                    <span data-num data-to={r.score} className="font-display text-[15px] font-extrabold leading-none sm:text-[18px]">
                      {r.score}
                    </span>
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <div className="relative mt-2 h-5">
            {TICKS.map((t) => (
              <span key={t} className={`absolute top-0 text-[11px] font-bold text-ink-900/45 ${t === 0 ? '' : t === 100 ? '-translate-x-full' : '-translate-x-1/2'}`} style={{ left: `${t}%` }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <ol className="mt-6 grid gap-2.5 sm:grid-cols-3 sm:gap-3">
        {NOTES.map((n) => (
          <li key={n.n} data-note className="flex items-start gap-3 rounded-2xl bg-gold-50 p-3 ring-1 ring-gold-200">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink-950 font-display text-[12px] font-extrabold text-gold-300">{n.n}</span>
            <span className="min-w-0">
              <span className="block text-[13.5px] font-bold leading-tight">{n.skill}</span>
              <span className="mt-0.5 block text-[12.5px] font-medium leading-snug text-ink-900/60">{n.text}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

const ROW_GRID = 'sm:grid-cols-[52px_minmax(0,1.15fr)_minmax(0,0.85fr)_minmax(0,1fr)]';

function Diagnosis({ intro, table }) {
  const [h0, h1, h2] = table.head;
  return (
    <div data-diag className="grain relative mt-14 overflow-hidden rounded-[34px] bg-brand-950 p-5 text-white shadow-[0_60px_120px_-60px_rgba(26,15,51,0.9)] sm:mt-20 sm:p-8 lg:p-11">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_50%_at_0%_0%,rgba(109,76,176,0.55),transparent),radial-gradient(30%_40%_at_100%_100%,rgba(244,180,0,0.16),transparent)]" />
      <div className="relative z-[2] grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="min-w-0 lg:col-span-4">
          <p className="font-display text-[clamp(1.3rem,1rem+1vw,1.9rem)] font-bold leading-[1.25] tracking-[-0.02em]">
            <Rich text={intro} tone="dark" />
          </p>
          <p className="mt-6 flex items-center gap-3 text-[14.5px] font-medium leading-snug text-brand-100">
            <span aria-hidden="true" className="flex shrink-0 gap-1">
              {[1, 2, 3].map((n) => (
                <span key={n} className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-400 font-display text-[12px] font-extrabold text-ink-950">
                  {n}
                </span>
              ))}
            </span>
            The numbers match the notes on Noa&apos;s chart.
          </p>
        </div>

        <div className="min-w-0 lg:col-span-8">
          <div aria-hidden="true" className={`hidden gap-5 px-5 pb-3 text-[12px] font-bold uppercase tracking-[0.16em] text-white/50 sm:grid ${ROW_GRID}`}>
            <span />
            <span>{h0}</span>
            <span>{h1}</span>
            <span>{h2}</span>
          </div>
          <ul data-rows className="space-y-3">
            {table.rows.map((r, i) => (
              <li key={r[0]} data-row className={`grid grid-cols-[minmax(0,1fr)] items-center gap-3 rounded-[24px] bg-white/[0.06] p-4 ring-1 ring-white/10 transition-[translate] duration-500 hover:translate-x-1 sm:gap-5 sm:p-5 ${ROW_GRID}`}>
                <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-400 font-display text-[1.2rem] font-extrabold text-ink-950">
                  {i + 1}
                </span>
                <p className="min-w-0">
                  <span className="mb-1 block text-[11.5px] font-bold uppercase tracking-[0.14em] text-white/50 sm:sr-only">{h0}</span>
                  <span className="block font-display text-[1.08rem] font-bold leading-snug tracking-[-0.01em] text-white">
                    <Rich text={String(r[0])} tone="dark" />
                  </span>
                </p>
                <p className="min-w-0">
                  <span className="mb-1.5 block text-[11.5px] font-bold uppercase tracking-[0.14em] text-white/50 sm:sr-only">{h1}</span>
                  <span className="inline-block rounded-2xl px-3 py-1.5 text-[14px] font-bold leading-snug text-gold-200 ring-1 ring-gold-400/60">
                    <Rich text={String(r[1])} tone="dark" />
                  </span>
                </p>
                <p className="min-w-0">
                  <span className="mb-1 block text-[11.5px] font-bold uppercase tracking-[0.14em] text-white/50 sm:sr-only">{h2}</span>
                  <span className="flex items-start gap-2 text-[15px] font-medium leading-snug text-brand-50">
                    <Icon name="arrow" className="mt-[3px] h-4 w-4 shrink-0 text-gold-400" strokeWidth={2.4} />
                    <span className="min-w-0">
                      <Rich text={String(r[2])} tone="dark" />
                    </span>
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Verdict({ title, text }) {
  return (
    <div data-verdict className="mt-14 grid grid-cols-[minmax(0,1fr)] items-center gap-8 sm:mt-20 lg:grid-cols-12 lg:gap-12">
      <div aria-hidden="true" className="flex flex-wrap items-center gap-3 lg:col-span-5 lg:flex-col lg:items-start">
        <span data-stamp className="inline-flex -rotate-2 items-center gap-3 rounded-[22px] bg-brand-950 px-5 py-3 font-display text-[clamp(2rem,1.4rem+2.2vw,3.6rem)] font-extrabold leading-none tracking-[-0.04em] text-gold-300 shadow-[0_30px_60px_-30px_rgba(26,15,51,0.9)]">
          <Icon name="compass" className="h-[0.75em] w-[0.75em]" strokeWidth={2.2} />A guide
        </span>
        <span data-stamp className="relative inline-flex rotate-1 items-center rounded-[22px] bg-white/45 px-5 py-3 font-display text-[clamp(2rem,1.4rem+2.2vw,3.6rem)] font-extrabold leading-none tracking-[-0.04em] text-ink-950/45 lg:ml-16">
          A verdict
          <span data-strike className="absolute inset-x-4 top-1/2 h-[0.09em] origin-left -rotate-3 rounded-full bg-brand-950" />
        </span>
      </div>
      <div className="min-w-0 lg:col-span-7">
        {title && <h3 className="font-display text-[clamp(1.5rem,1.1rem+1.2vw,2.3rem)] font-extrabold leading-tight tracking-[-0.03em] text-ink-950">{title}</h3>}
        <p className="mt-3 text-[clamp(1.05rem,0.95rem+0.35vw,1.3rem)] font-medium leading-relaxed text-ink-950/80">
          <Rich text={text} />
        </p>
      </div>
    </div>
  );
}

export default function ResearchSection({ s }) {
  const root = useRef(null);
  const ps = s.blocks.filter((b) => b.type === 'p');
  const table = s.blocks.find((b) => b.type === 'table');
  const callout = s.blocks.find((b) => b.type === 'callout');
  const [lead, beforeTable] = ps;
  const others = s.blocks.filter((b) => b !== table && b !== callout && !ps.includes(b));

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const desktop = window.matchMedia('(min-width: 1024px)').matches;
        const chart = q('[data-chart]')[0];
        const nums = q('[data-num]');

        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: 'top 75%', once: true } })
          .from(q('[data-numeral]'), { yPercent: 40, opacity: 0, duration: 1.3 }, 0)
          .from(q('[data-lead], [data-copy]'), { y: 30, opacity: 0, stagger: 0.12, duration: 1.1 }, 0.2)
          .from(chart, { y: 60, opacity: 0, duration: 1.3 }, 0.15);

        // The chart builds: scrubbed with the scroll on desktop, once on arrival on phones
        const tl = gsap.timeline({
          defaults: { ease: desktop ? 'none' : 'power3.out' },
          scrollTrigger: desktop ? { trigger: chart, start: 'top 70%', end: 'bottom 75%', scrub: true } : { trigger: chart, start: 'top 80%', once: true },
        });
        q('[data-bar]').forEach((bar, i) => {
          const num = nums[i];
          const to = Number(num.dataset.to);
          const c = { v: 0 };
          let shown = -1;
          tl.from(bar, { scaleX: 0, duration: 0.6 }, i * 0.14).fromTo(
            c,
            { v: 0 },
            {
              v: to,
              duration: 0.6,
              onUpdate: () => {
                const v = Math.round(c.v);
                if (v !== shown) num.textContent = shown = v;
              },
            },
            i * 0.14
          );
        });
        tl.from(q('[data-line]'), { scaleY: 0, duration: 0.4 }, 0.75)
          .from(q('[data-line-tag]'), { y: -10, opacity: 0, duration: 0.25 }, 1)
          .from(q('[data-mark]'), { scale: 0, rotation: -120, stagger: 0.1, duration: 0.3, ease: desktop ? 'none' : 'back.out(2.4)' }, 1.1)
          .from(q('[data-note]'), { y: 24, opacity: 0, stagger: 0.1, duration: 0.35 }, 1.25);

        gsap.set(q('[data-row]'), { x: 60, opacity: 0 });
        ScrollTrigger.batch(q('[data-row]'), { start: 'top 90%', once: true, onEnter: (els) => gsap.to(els, { x: 0, opacity: 1, stagger: 0.12, duration: 1.1 }) });
        gsap
          .timeline({ scrollTrigger: { trigger: q('[data-verdict]')[0], start: 'top 85%', once: true } })
          .from(q('[data-stamp]'), { y: 40, scale: 0.9, opacity: 0, stagger: 0.15, duration: 1, ease: 'back.out(1.6)' })
          .from(q('[data-strike]'), { scaleX: 0, duration: 0.6, ease: 'power3.inOut' }, 0.6);
        gsap.from(q('[data-handoff]'), { y: 40, opacity: 0, duration: 1.1, scrollTrigger: { trigger: q('[data-handoff]')[0], start: 'top 92%', once: true } });

        return () => nums.forEach((n) => (n.textContent = n.dataset.to));
      });
    },
    { scope: root }
  );

  return (
    <section id={s.id} ref={root} aria-labelledby={`${s.id}-title`} className="relative scroll-mt-24 overflow-clip bg-gold-400 py-16 text-ink-950 sm:py-24 lg:py-28 [&_a:focus-visible]:outline-brand-950">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_40%_at_100%_0%,rgba(255,243,196,0.75),transparent),radial-gradient(40%_40%_at_0%_100%,rgba(217,154,0,0.45),transparent)]" />
      <div className="container-x relative">
        <RunningHead n={2} eyebrow={s.eyebrow} tone="gold" />

        <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-10 lg:mt-14 lg:grid-cols-12 lg:items-center lg:gap-12 xl:gap-16">
          <div className="min-w-0 lg:col-span-5">
            <Numeral n={2} tone="gold" className="text-[clamp(6rem,3rem+8vw,12rem)]" />
            <Title s={s} tone="gold" className="mt-6" />
            <Lead text={s.intro} tone="gold" className="mt-6" />
            {lead && (
              <div data-copy className="mt-5">
                <Para text={lead.text} tone="gold" />
              </div>
            )}
          </div>
          <div className="min-w-0 lg:col-span-7">
            <Chart />
          </div>
        </div>

        {table && <Diagnosis intro={beforeTable?.text || ''} table={table} />}
        {callout && <Verdict title={callout.title} text={callout.text} />}
        {others.length > 0 && (
          <div className="mt-8 space-y-5">
            {others.map((b, i) => (
              <Block key={i} b={b} />
            ))}
          </div>
        )}
        <Handoff next={2} tone="gold" line="Three roles clear the line. Each asks for a different story, so Noa keeps a version for each one." />
      </div>
    </section>
  );
}
