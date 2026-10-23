'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { Block } from '@/components/page/Blocks';
import { ChapterHead, Prose, Window } from './editor';

/*
 * Chapter 4, "Scorecard": scorecard.md open in the editor, its four parts as panes with meters that fill
 * as the window scrolls into place (one scrubbed timeline; the readiness number counts with it). On the
 * left, the "not generic advice" callout is a commit graph that draws itself: a session, the flagged
 * topics on a study branch, then the round again in real simulation. Meter values are sample data.
 */

const READY = 7.4;
const GRAPH = [
  { y: 24, label: 'session · guided practice', side: 0 },
  { y: 74, label: 'scorecard · gaps flagged', side: 0 },
  { y: 124, label: 'study · next topics', side: 1 },
  { y: 174, label: 'session · real simulation', side: 0 },
  { y: 224, label: 'scorecard · compare', side: 0 },
];

function Meter({ label, value, tone = 'brand' }) {
  return (
    <div aria-hidden="true">
      <p className="flex items-center justify-between font-mono text-[11px] text-white/50">
        <span>{label}</span>
      </p>
      <span className="mt-1.5 block h-2 overflow-hidden rounded-full bg-white/10">
        <span className="block h-full rounded-full" style={{ width: `${value}%` }}>
          <span data-meter className={`block h-full w-full origin-left rounded-full ${tone === 'gold' ? 'bg-gradient-to-r from-gold-500 to-gold-300' : 'bg-gradient-to-r from-brand-500 to-brand-300'}`} />
        </span>
      </span>
    </div>
  );
}

function Visual({ i }) {
  if (i === 0)
    return (
      <div aria-hidden="true" className="flex items-end gap-2">
        <span className="font-display text-[2.6rem] font-extrabold leading-none tracking-[-0.04em] text-white">
          <span data-ready>{READY.toFixed(1)}</span>
        </span>
        <span className="pb-1 font-mono text-[12px] text-white/45">/ 10 readiness</span>
      </div>
    );
  if (i === 1) return <Meter label="technical depth" value={64} tone="gold" />;
  if (i === 2)
    return (
      <div className="space-y-2.5">
        <Meter label="clarity" value={78} />
        <Meter label="confidence" value={70} />
      </div>
    );
  return (
    <div aria-hidden="true" className="flex flex-wrap gap-1.5 font-mono text-[11px]">
      <span className="rounded bg-emerald-400/15 px-1.5 py-0.5 text-emerald-300">+ trade-offs</span>
      <span className="rounded bg-gold-400/20 px-1.5 py-0.5 text-gold-300">− caching depth</span>
      <span className="rounded bg-brand-500/30 px-1.5 py-0.5 text-brand-200">next: queues</span>
    </div>
  );
}

function CommitGraph() {
  return (
    <svg aria-hidden="true" viewBox="0 0 320 250" className="h-auto w-full max-w-[420px]">
      <path d="M24 24 V224" fill="none" stroke="rgba(75,46,131,0.15)" strokeWidth="3" strokeLinecap="round" />
      <path data-gpath d="M24 24 V224" pathLength="1" fill="none" stroke="#4b2e83" strokeWidth="3" strokeLinecap="round" />
      <path data-gpath d="M24 74 C24 100 64 100 64 124 C64 148 24 148 24 174" pathLength="1" fill="none" stroke="#f4b400" strokeWidth="3" strokeLinecap="round" />
      {GRAPH.map((g) => {
        const x = g.side ? 64 : 24;
        return (
          <g key={g.label} data-gnode>
            <circle cx={x} cy={g.y} r="8" fill="#fff" stroke={g.side ? '#f4b400' : '#4b2e83'} strokeWidth="3.5" />
            <text x={x + 22} y={g.y + 4} fill={g.side ? '#8a5a00' : '#1e1b2e'} fontSize="13" fontWeight="600" fontFamily="ui-monospace, SFMono-Regular, Consolas, monospace">
              {g.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function DepthScorecard({ s, n, total }) {
  const root = useRef(null);
  const cards = s.blocks.find((b) => b.type === 'cards');
  const callout = s.blocks.find((b) => b.type === 'callout');
  const others = s.blocks.filter((b) => b !== cards && b !== callout);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const desktop = window.matchMedia('(min-width: 1024px)').matches;
        const num = q('[data-ready]')[0];
        const c = { v: 0 };
        let shown = '';
        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: 'top 72%', once: true } })
          .from(q('[data-lead]'), { y: 30, opacity: 0, stagger: 0.1, duration: 1.1 }, 0)
          .from(q('[data-card-window]'), { y: 60, opacity: 0, duration: 1.3 }, 0.1)
          .from(q('[data-sc]'), { y: 30, opacity: 0, stagger: 0.08, duration: 0.9 }, 0.35);

        // Meters and the readiness number move with the scroll on desktop, once on phones
        const meters = gsap.timeline({
          defaults: { ease: desktop ? 'none' : 'expo.out' },
          scrollTrigger: desktop ? { trigger: q('[data-card-window]')[0], start: 'top 75%', end: 'center 45%', scrub: true } : { trigger: q('[data-card-window]')[0], start: 'top 80%', once: true },
        });
        meters
          .fromTo(c, { v: 0 }, {
            v: READY,
            duration: desktop ? 1 : 2,
            onUpdate: () => {
              const t = c.v.toFixed(1);
              if (t !== shown) num.textContent = shown = t;
            },
          }, 0)
          .from(q('[data-meter]'), { scaleX: 0, stagger: 0.12, duration: desktop ? 0.7 : 1.6 }, 0.1);

        gsap
          .timeline({ scrollTrigger: { trigger: q('[data-graph]')[0], start: 'top 80%', end: 'bottom 55%', scrub: desktop ? true : false, once: !desktop } })
          .fromTo(q('[data-gpath]'), { strokeDasharray: '1 1', strokeDashoffset: 1 }, { strokeDashoffset: 0, stagger: 0.25, duration: 1, ease: 'none' }, 0)
          .from(q('[data-gnode]'), { opacity: 0, x: -10, stagger: 0.2, duration: 0.3 }, 0.05);

        return () => {
          num.textContent = READY.toFixed(1);
        };
      });
    },
    { scope: root }
  );

  return (
    <section id={s.id} ref={root} aria-labelledby={`${s.id}-title`} className="relative scroll-mt-24 overflow-clip bg-light-lavender py-[60px] sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_40%_at_90%_15%,rgba(196,179,234,0.55),transparent),radial-gradient(30%_30%_at_5%_95%,rgba(252,211,77,0.14),transparent)]" />
      <div className="container-x relative">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
          <div className="min-w-0 lg:col-span-5">
            <ChapterHead s={s} n={n} total={total} file="scorecard.md" commit={{ hash: 'f9d1c63', msg: 'scorecard: technical depth' }} />
            {s.intro && <Prose data-lead text={s.intro} className="mt-6 text-lead! font-medium" />}

            {callout && (
              <aside data-graph className="mt-8 overflow-hidden rounded-[22px] bg-white p-5 ring-1 ring-hairline shadow-[0_30px_60px_-45px_rgba(26,15,51,0.6)] sm:p-6">
                <CommitGraph />
                <div className="mt-4 border-t border-hairline pt-4">
                  {callout.title && (
                    <p className="flex items-center gap-2 font-display text-[1.15rem] font-bold text-ink-950">
                      <span aria-hidden="true" className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500 text-white">
                        <Icon name="check" className="h-4 w-4" strokeWidth={3} />
                      </span>
                      {callout.title}
                    </p>
                  )}
                  <p className="mt-2 text-[16px] leading-relaxed text-ink-900/75">
                    <Rich text={callout.text} />
                  </p>
                </div>
              </aside>
            )}
          </div>

          <div className="min-w-0 lg:sticky lg:top-28 lg:col-span-7">
            {cards && (
              <Window data-card-window tabs={['scorecard.md', 'transcript.md']} status={[<span key="a">session complete · Role & Knowledge</span>, <span key="b">sample scorecard</span>]} bodyClass="p-3 sm:p-4">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {cards.items.map((c, i) => (
                    <li key={c.title} data-sc className="flex flex-col gap-4 rounded-[16px] bg-white/[0.04] p-4 ring-1 ring-white/10 sm:p-5">
                      <div className="min-w-0">
                        <p aria-hidden="true" className="flex items-center gap-2 font-mono text-[11.5px] text-brand-300">
                          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/10 text-gold-300">
                            <Icon name={c.icon || 'spark'} className="h-3.5 w-3.5" />
                          </span>
                          {`## ${String(i + 1).padStart(2, '0')}`}
                        </p>
                        <h3 className="mt-2.5 font-display text-[1.15rem] font-bold leading-snug tracking-[-0.02em] text-white">{c.title}</h3>
                        <p className="mt-1.5 text-[15px] leading-relaxed text-white/70">
                          <Rich text={c.text} tone="dark" />
                        </p>
                      </div>
                      <div className="mt-auto">
                        <Visual i={i} />
                      </div>
                    </li>
                  ))}
                </ul>
              </Window>
            )}
          </div>
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
