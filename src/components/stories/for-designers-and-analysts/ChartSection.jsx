'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { Header, Glyph } from './shared';

/*
 * Frame 2, "Match score": an analyst's dashboard. A dark panel holds a bar chart of a sample shortlist
 * ranked by match; as you scroll the bars grow, their values count up, a "worth tailoring" line draws
 * across and two annotations pin themselves to the chart. Beside it, the paragraphs and the callout as a
 * comment pinned to the board. Below, the missing-skills table as a colour-coded data table (a real
 * table; on phones each value shows its header label). Chart data is sample only (aria-hidden).
 */

const BARS = [
  { role: 'Product designer', co: 'Lumen Studio', v: 88, kind: 'design' },
  { role: 'Data analyst', co: 'Northwind Labs', v: 82, kind: 'data' },
  { role: 'UX designer', co: 'Northwind Labs', v: 74, kind: 'design' },
  { role: 'UX researcher', co: 'Brightpath', v: 63, kind: 'design' },
  { role: 'BI analyst', co: 'Lumen Studio', v: 51, kind: 'data' },
];
const LINE = 75;
const ROW_TONE = [
  { dot: 'bg-gold-400', pill: 'bg-gold-100 text-gold-800' },
  { dot: 'bg-brand-500', pill: 'bg-brand-100 text-brand-800' },
  { dot: 'bg-rose-500', pill: 'bg-rose-100 text-rose-800' },
];

function Chart() {
  return (
    <div aria-hidden="true" className="relative min-w-0 overflow-hidden rounded-[32px] bg-brand-950 p-5 text-white shadow-[0_40px_70px_-40px_rgba(26,15,51,0.85)] sm:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_45%_at_20%_0%,rgba(109,76,176,0.55),transparent),radial-gradient(40%_40%_at_100%_100%,rgba(16,185,129,0.16),transparent)]" />
      <div className="relative flex flex-wrap items-start justify-between gap-3">
        <span>
          <span className="block font-display text-[1.15rem] font-bold tracking-[-0.02em] sm:text-[1.35rem]">Your shortlist, ranked by match</span>
          <span className="mt-1 block text-[12.5px] font-medium text-white/55">One search across LinkedIn, Indeed and Dice · sample</span>
        </span>
        <span className="flex gap-3 text-[12px] font-semibold text-white/75">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-[3px] bg-brand-400" />
            Design
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-[3px] bg-emerald-400" />
            Analytics
          </span>
        </span>
      </div>

      {/* Plot */}
      <div className="relative mt-8 h-[250px] sm:h-[300px]">
        {[25, 50, 75, 100].map((g) => (
          <span key={g} className="absolute inset-x-0 border-t border-white/[0.07]" style={{ bottom: `${g}%` }}>
            <span className="absolute -top-2.5 right-0 text-[10px] font-semibold text-white/30">{g}</span>
          </span>
        ))}
        {/* The "worth tailoring" line */}
        <span className="absolute inset-x-0 z-[2]" style={{ bottom: `${LINE}%` }}>
          <span data-threshold className="block origin-left border-t-2 border-dashed border-gold-400" />
          <span data-note className="absolute -top-8 left-0 rounded-full bg-gold-400 px-2.5 py-1 text-[11px] font-bold text-ink-950">Worth tailoring</span>
        </span>
        <div className="absolute inset-0 flex items-end gap-2 pr-6 sm:gap-4">
          {BARS.map((b) => (
            <div key={b.role} className="relative flex h-full min-w-0 flex-1 items-end">
              <div data-bar className={`relative w-full origin-bottom rounded-t-[10px] ${b.kind === 'design' ? 'bg-gradient-to-t from-brand-600 to-brand-400' : 'bg-gradient-to-t from-emerald-700 to-emerald-400'} ${b.v < LINE ? 'opacity-55' : ''}`} style={{ height: `${b.v}%` }}>
                <span className="absolute inset-x-0 top-2 text-center font-display text-[15px] font-extrabold sm:text-[20px]">
                  <span data-val={b.v}>{b.v}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Axis labels */}
      <div className="relative mt-3 flex gap-2 pr-6 sm:gap-4">
        {BARS.map((b) => (
          <span key={b.role} className="min-w-0 flex-1">
            <span className="block truncate text-[10.5px] font-bold text-white/85 sm:text-[12.5px]">{b.role}</span>
            <span className="block truncate text-[9.5px] font-medium text-white/45 sm:text-[11px]">{b.co}</span>
          </span>
        ))}
      </div>

      {/* Annotations */}
      <div className="relative mt-6 grid grid-cols-[minmax(0,1fr)] gap-2.5 sm:grid-cols-2">
        <span data-note className="flex items-center gap-2.5 rounded-2xl bg-white/[0.07] p-3 ring-1 ring-white/10">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-400 text-ink-950">
            <Glyph name="check" className="h-4 w-4" strokeWidth={3.2} />
          </span>
          <span className="min-w-0 text-[12.5px] font-semibold leading-snug text-white/85">Product designer at Lumen Studio: tailor this one first</span>
        </span>
        <span data-note className="flex items-center gap-2.5 rounded-2xl bg-white/[0.07] p-3 ring-1 ring-white/10">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-400 text-ink-950">
            <Glyph name="x" className="h-4 w-4" strokeWidth={3.2} />
          </span>
          <span className="min-w-0 text-[12.5px] font-semibold leading-snug text-white/85">BI analyst: a real gap for now, skip or plan to learn</span>
        </span>
      </div>
    </div>
  );
}

export default function ChartSection({ s }) {
  const root = useRef(null);
  const paras = s.blocks.filter((b) => b.type === 'p');
  const table = s.blocks.find((b) => b.type === 'table');
  const callout = s.blocks.find((b) => b.type === 'callout');
  const head = table?.head || [];

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const vals = q('[data-val]');
        const counter = { p: 0 };
        const paint = () => vals.forEach((el) => (el.textContent = Math.round(Number(el.dataset.val) * counter.p)));
        gsap.set(q('[data-note]'), { opacity: 0, y: 12 });

        // One scrubbed scene: bars grow, values count, the line draws, then the notes pin on
        const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: q('[data-chart]')[0], start: 'top 80%', end: 'center 45%', scrub: 0.4 } });
        tl.fromTo(q('[data-bar]'), { scaleY: 0 }, { scaleY: 1, stagger: 0.08, duration: 0.7, ease: 'power2.out' }, 0)
          .fromTo(counter, { p: 0 }, { p: 1, duration: 1, ease: 'power2.out', onUpdate: paint }, 0)
          .fromTo(q('[data-threshold]'), { scaleX: 0 }, { scaleX: 1, duration: 0.4 }, 0.7)
          .to(q('[data-note]'), { opacity: 1, y: 0, stagger: 0.12, duration: 0.25 }, 0.95);

        gsap.from(q('[data-copy] > *'), { y: 30, opacity: 0, stagger: 0.1, duration: 1.1, scrollTrigger: { trigger: q('[data-copy]')[0], start: 'top 85%', once: true } });
        const rows = q('[data-row]');
        gsap.set(rows, { y: 30, opacity: 0 });
        ScrollTrigger.batch(rows, { start: 'top 92%', once: true, onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'expo.out', overwrite: true }) });

        return () => vals.forEach((el) => (el.textContent = el.dataset.val));
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id={s.id} aria-labelledby={`${s.id}-title`} className="relative scroll-mt-24 overflow-hidden bg-white py-16 sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_30%_at_95%_15%,rgba(196,179,234,0.35),transparent),radial-gradient(35%_30%_at_0%_80%,rgba(16,185,129,0.08),transparent)]" />
      <div className="container-x relative">
        <Header s={s} n={2} />

        <div className="mt-12 grid grid-cols-[minmax(0,1fr)] items-center gap-10 sm:mt-16 lg:grid-cols-12 lg:gap-12">
          <div data-copy className="min-w-0 space-y-5 lg:col-span-5">
            {paras.map((p) => (
              <p key={p.text.slice(0, 24)} className="text-[17px] leading-[1.75] text-ink-900/80 sm:text-[18px]">
                <Rich text={p.text} />
              </p>
            ))}
            {callout && (
              <aside className="relative rounded-[24px] rounded-tl-md bg-light-lavender p-5 ring-1 ring-brand-200 sm:p-6">
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-white ring-4 ring-white">
                    <Icon name="chat" className="h-4 w-4" />
                  </span>
                  <p className="font-display text-[1.15rem] font-bold text-ink-950">{callout.title}</p>
                </div>
                <p className="mt-3 text-[16px] leading-relaxed text-ink-900/80">
                  <Rich text={callout.text} />
                </p>
              </aside>
            )}
          </div>
          <div data-chart className="min-w-0 lg:col-span-7">
            <Chart />
          </div>
        </div>

        {/* The missing-skills table, colour coded */}
        {table && (
          <div className="mt-12 overflow-hidden rounded-[28px] bg-white shadow-[0_30px_60px_-44px_rgba(26,15,51,0.6)] ring-1 ring-brand-100 lg:mt-16">
            <table className="w-full border-collapse text-left max-lg:block">
              <thead className="max-lg:sr-only">
                <tr className="bg-ink-950 text-white">
                  {head.map((h) => (
                    <th key={h} scope="col" className="px-7 py-4 font-display text-[14px] font-bold uppercase tracking-[0.1em]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="max-lg:block">
                {table.rows.map((r, i) => {
                  const t = ROW_TONE[i] || ROW_TONE[0];
                  return (
                    <tr key={r[0]} data-row className="border-t border-hairline align-middle first:border-t-0 max-lg:block max-lg:p-5 lg:hover:bg-light-lavender/60">
                      <td data-label={head[0]} className="px-7 py-5 max-lg:block max-lg:p-0 max-lg:before:mb-1 max-lg:before:block max-lg:before:text-[11px] max-lg:before:font-bold max-lg:before:uppercase max-lg:before:tracking-[0.12em] max-lg:before:text-brand-500 max-lg:before:content-[attr(data-label)]">
                        <span className="flex items-center gap-3 font-display text-[1.05rem] font-bold text-ink-950">
                          <span aria-hidden="true" className={`h-3 w-3 shrink-0 rounded-[3px] ${t.dot}`} />
                          <Rich text={String(r[0])} />
                        </span>
                      </td>
                      <td data-label={head[1]} className="px-7 py-5 max-lg:mt-3 max-lg:block max-lg:p-0 max-lg:before:mb-1 max-lg:before:block max-lg:before:text-[11px] max-lg:before:font-bold max-lg:before:uppercase max-lg:before:tracking-[0.12em] max-lg:before:text-brand-500 max-lg:before:content-[attr(data-label)]">
                        <span className={`inline-block rounded-full px-3 py-1 text-[14px] font-bold ${t.pill}`}>
                          <Rich text={String(r[1])} />
                        </span>
                      </td>
                      <td data-label={head[2]} className="px-7 py-5 max-lg:mt-3 max-lg:block max-lg:p-0 max-lg:before:mb-1 max-lg:before:block max-lg:before:text-[11px] max-lg:before:font-bold max-lg:before:uppercase max-lg:before:tracking-[0.12em] max-lg:before:text-brand-500 max-lg:before:content-[attr(data-label)]">
                        <span className="flex items-center gap-2.5 text-[16px] text-ink-900/80">
                          <Glyph name="arrow" className="h-4 w-4 shrink-0 text-brand-500" strokeWidth={2.6} />
                          <Rich text={String(r[2])} />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
