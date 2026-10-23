'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap';
import Rich from '@/components/Rich';
import { Block } from '@/components/page/Blocks';
import { SectionHeading, Intro, Persona, Handoff } from './shared';

/*
 * Chapter 3, "One story, three dialects": the same facts from Jordan's career, translated three ways. On
 * desktop the three resume versions fan out of one source card as you scroll (scrubbed) and the
 * threads that feed them grow in: the current-field version in purple, the new-field version in gold
 * and the bridge-role version half and half, the two languages side by side. The table becomes three
 * colour-keyed version rows, each value next to its column label. Resume content is fictional.
 */

const DOCS = [
  { key: 'current', title: 'Patient Access Supervisor', lines: ['Led the front-desk team', 'Ran the rota and bed board'], chips: ['Patient flow', 'Rota'], tone: 'purple' },
  { key: 'bridge', title: 'Healthcare Operations Coordinator', lines: ['Scheduling for clinical teams', 'Reporting for unit leads'], chips: ['Scheduling', 'Healthcare ops'], tone: 'bridge' },
  { key: 'new', title: 'Operations Analyst', lines: ['Workforce scheduling', 'Operational reporting'], chips: ['Reporting', 'Process improvement'], tone: 'gold' },
];
// Left to right on the fan: current field, bridge role (centre), new field
const ORDER = ['current', 'bridge', 'new'];
const LABEL = { current: ['Current field', 'text-brand-300'], bridge: ['Bridge role', 'text-white/85'], new: ['New field', 'text-gold-300'] };
const SWATCH = {
  purple: 'bg-brand-700',
  gold: 'bg-gold-400',
  bridge: 'bg-[linear-gradient(90deg,var(--color-brand-700)_50%,var(--color-gold-400)_50%)]',
};
const ROW_TONE = ['purple', 'gold', 'bridge'];

function Doc({ d }) {
  const head = d.tone === 'purple' ? 'bg-brand-800 text-white' : d.tone === 'gold' ? 'bg-gold-400 text-ink-950' : 'bg-[linear-gradient(90deg,var(--color-brand-800)_50%,var(--color-gold-400)_50%)] text-white';
  const chip = d.tone === 'purple' ? 'bg-brand-100 text-brand-800' : d.tone === 'gold' ? 'bg-gold-100 text-gold-800' : 'bg-light-lavender text-brand-700 ring-1 ring-gold-300';
  return (
    <div className="overflow-hidden rounded-[18px] bg-white shadow-[0_30px_60px_-30px_rgba(26,15,51,0.65)] ring-1 ring-brand-200/70">
      <div className={`px-3 py-2.5 sm:px-4 sm:py-3 ${head}`}>
        <p className={`text-[9.5px] font-bold uppercase tracking-[0.14em] sm:text-[10.5px] ${d.tone === 'gold' ? 'text-ink-950/60' : 'text-white/70'}`}>Jordan · resume</p>
        <p className={`mt-0.5 font-display text-[12px] font-bold leading-tight sm:text-[14px] xl:text-[15px] ${d.tone === 'bridge' ? '[text-shadow:0_1px_2px_rgba(26,15,51,0.7)]' : ''}`}>{d.title}</p>
      </div>
      <div className="space-y-1.5 px-3 py-3 sm:px-4">
        {d.lines.map((l) => (
          <p key={l} className="flex items-start gap-1.5 text-[10.5px] font-medium leading-snug text-ink-900/75 sm:text-[12px]">
            <span className="mt-[0.45em] h-1 w-1 shrink-0 rounded-full bg-brand-400" />
            {l}
          </p>
        ))}
        <div className="flex flex-wrap gap-1 pt-1">
          {d.chips.map((c) => (
            <span key={c} className={`rounded-md px-1.5 py-0.5 text-[9.5px] font-bold sm:text-[10.5px] ${chip}`}>
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Fan() {
  return (
    <div data-fan aria-hidden="true" className="relative overflow-hidden rounded-[32px] bg-brand-950 p-4 shadow-[0_60px_120px_-60px_rgba(26,15,51,0.9)] sm:p-7">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_45%_at_50%_0%,rgba(109,76,176,0.6),transparent),radial-gradient(40%_40%_at_100%_100%,rgba(244,180,0,0.2),transparent),radial-gradient(40%_40%_at_0%_100%,rgba(155,127,212,0.25),transparent)]" />
      <div data-source className="relative mx-auto flex w-fit max-w-full flex-col items-center text-center">
        <Persona tone="dark" note="One career, one set of true facts" />
      </div>

      {/* Connectors: a stem down from Jordan, a bar across the three column centres, a stem into each card */}
      <div aria-hidden="true" className="relative hidden h-10 sm:block">
        <span data-stem className="absolute left-1/2 top-0 h-5 w-[2px] -translate-x-1/2 origin-top bg-gold-200" />
        <span data-bar className="absolute left-[16.6667%] right-[16.6667%] top-5 h-[2px] bg-gradient-to-r from-brand-300 via-gold-200 to-gold-400" />
        {[['16.6667%', 'bg-brand-300'], ['50%', 'bg-gold-200'], ['83.3333%', 'bg-gold-400']].map(([x, c]) => (
          <span key={x} data-stem className={`absolute top-5 h-5 w-[2px] -translate-x-1/2 origin-top ${c}`} style={{ left: x }} />
        ))}
      </div>

      <div className="relative mt-5 grid grid-cols-1 gap-4 sm:mt-0 sm:grid-cols-3 sm:gap-0">
        {ORDER.map((k) => {
          const d = DOCS.find((x) => x.key === k);
          return (
            <div key={k} className="min-w-0 sm:px-1.5 lg:px-2">
              <div data-doc={k} className={k === 'bridge' ? 'rounded-[18px] ring-2 ring-gold-300' : ''}>
                <Doc d={d} />
              </div>
              <p className={`mt-2.5 text-center text-[10.5px] font-bold uppercase tracking-[0.12em] sm:text-[11.5px] ${LABEL[k][1]}`}>{LABEL[k][0]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Dialects({ s, n }) {
  const root = useRef(null);
  const p = s.blocks.find((b) => b.type === 'p');
  const table = s.blocks.find((b) => b.type === 'table');
  const others = s.blocks.filter((b) => b !== p && b !== table);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(q('[data-intro], [data-vcopy]'), { y: 30, opacity: 0, stagger: 0.12, duration: 1.1, scrollTrigger: { trigger: root.current, start: 'top 75%', once: true } });

        const desktop = window.matchMedia('(min-width: 1024px)').matches;
        const fan = q('[data-fan]')[0];
        const trigger = desktop ? { trigger: fan, start: 'top 85%', end: 'center 45%', scrub: true } : { trigger: fan, start: 'top 80%', once: true };
        const ease = desktop ? 'none' : 'expo.out';
        const tl = gsap.timeline({ defaults: { ease }, scrollTrigger: trigger });
        tl.from(fan, { y: 50, opacity: 0, duration: 0.4 }, 0)
          .from(q('[data-source]'), { y: 20, scale: 0.9, opacity: 0, duration: 0.3 }, 0.1)
          .from(q('[data-stem]'), { scaleY: 0, duration: 0.25, stagger: 0.04 }, 0.3)
          .from(q('[data-bar]'), { scaleX: 0, duration: 0.35 }, 0.35);
        // The three versions drop into their columns, the bridge role in the centre first
        tl.from(q('[data-doc]'), { y: 36, opacity: 0, duration: desktop ? 0.6 : 1.2, stagger: 0.1 }, 0.5);

        gsap.set(q('[data-vrow]'), { y: 40, opacity: 0 });
        ScrollTrigger.batch(q('[data-vrow]'), { start: 'top 88%', once: true, onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, stagger: 0.12, duration: 1 }) });

        gsap
          .timeline({ scrollTrigger: { trigger: q('[data-handoff]')[0], start: 'top 92%', once: true } })
          .from(q('[data-handoff]'), { y: 30, opacity: 0, duration: 1 })
          .from(q('[data-handoff-arrow]'), { x: -16, duration: 0.8, ease: 'back.out(2)' }, 0.3);
      });
    },
    { scope: root }
  );

  const [hVersion, hLead, hUse] = table?.head || [];

  return (
    <section id={s.id} ref={root} aria-labelledby={`${s.id}-title`} className="relative scroll-mt-24 overflow-clip bg-light-lavender py-16 sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(35%_30%_at_100%_0%,rgba(196,179,234,0.6),transparent),radial-gradient(30%_30%_at_0%_100%,rgba(252,211,77,0.18),transparent)]" />
      <div className="container-x relative">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <SectionHeading s={s} n={n} className="min-w-0 lg:col-span-7" />
          <Intro text={s.intro} className="min-w-0 lg:col-span-5 lg:pb-2" />
        </div>

        <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-8 sm:mt-14 lg:grid-cols-12 lg:items-start lg:gap-12 xl:gap-16">
          <div className="min-w-0 lg:sticky lg:top-28 lg:col-span-7">
            <Fan />
          </div>

          <div className="min-w-0 lg:col-span-5">
            {p && (
              <p data-vcopy className="text-[17px] leading-relaxed text-ink-900/80 sm:text-[18px]">
                <Rich text={p.text} />
              </p>
            )}
            {table && (
              <ul className="mt-7 space-y-3">
                {table.rows.map((r, i) => (
                  <li key={r[0]} data-vrow>
                    <div className="group relative grid grid-cols-[auto_minmax(0,1fr)] gap-4 overflow-hidden rounded-[24px] bg-white p-5 shadow-[0_24px_50px_-40px_rgba(26,15,51,0.6)] ring-1 ring-hairline transition-transform duration-500 hover:-translate-y-1 sm:p-6">
                      <span aria-hidden="true" className="relative mt-0.5 h-14 w-11 overflow-hidden rounded-lg shadow-[0_10px_20px_-12px_rgba(26,15,51,0.8)] transition-transform duration-500 group-hover:-rotate-6">
                        <span className={`absolute inset-0 ${SWATCH[ROW_TONE[i] || 'purple']}`} />
                        <span className="absolute left-2 right-3 top-3 h-1.5 rounded bg-white/90" />
                        <span className="absolute left-2 right-4 top-6 h-1 rounded bg-white/70" />
                        <span className="absolute left-2 right-5 top-8 h-1 rounded bg-white/70" />
                        <span className="absolute left-2 right-3 top-10 h-1 rounded bg-white/70" />
                      </span>
                      <div className="min-w-0">
                        {hVersion && <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-500">{hVersion}</p>}
                        <h3 className="mt-0.5 font-display text-[1.25rem] font-bold leading-snug tracking-[-0.02em] text-ink-950">{r[0]}</h3>
                        <dl className="mt-3 grid grid-cols-[minmax(0,1fr)] gap-3 sm:grid-cols-2">
                          {[
                            [hLead, r[1]],
                            [hUse, r[2]],
                          ].map(([dt, dd], j) => (
                            <div key={j} className={`min-w-0 rounded-2xl px-3.5 py-2.5 ${j === 0 ? 'bg-brand-50' : 'bg-gold-50'}`}>
                              <dt className={`text-[11px] font-bold uppercase tracking-[0.14em] ${j === 0 ? 'text-brand-600' : 'text-gold-800'}`}>{dt}</dt>
                              <dd className="mt-1 text-[14.5px] font-medium leading-snug text-ink-950">
                                <Rich text={dd} />
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {others.length > 0 && (
              <div className="mt-6 space-y-5">
                {others.map((b, i) => (
                  <Block key={i} b={b} />
                ))}
              </div>
            )}
          </div>
        </div>

        <Handoff n={4} now="Three resume versions, one set of true facts" next="Say why she is switching, out loud" className="mt-8 lg:mt-12" />
      </div>
    </section>
  );
}
