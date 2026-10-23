'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';
import Rich from '@/components/Rich';
import { Block } from '@/components/page/Blocks';
import { ChapterHead, Prose, Window } from './editor';

/*
 * Chapter 3, "Practice": the Role & Knowledge round as a session transcript. The four prompts are the
 * real question list, set as interviewer turns with their hint underneath; decorative "you" turns and
 * follow-up markers sit between them. On desktop the transcript writes itself line by line as you scroll
 * (one scrubbed timeline) with a cursor riding the newest line. Below, the round tabs and modes frame the
 * paragraph about the other rounds. The live interview is voice; this transcript styling is only a frame.
 */

const ROUNDS = ['HR & Introduction', 'Role & Knowledge', 'Practical & Behavioral', 'Managerial & Final'];
const BARS = [0.4, 0.75, 0.55, 0.95, 0.6, 0.8, 0.35, 0.7, 0.5, 0.9, 0.45, 0.65, 0.3, 0.55];

function YouTurn({ follow }) {
  return (
    <div aria-hidden="true" className="space-y-2">
      <p data-tl className="flex items-center gap-3 font-mono text-[12px] text-white/45">
        <span className="text-emerald-300">you ▸</span>
        <span className="flex h-4 items-center gap-[3px]">
          {BARS.map((h, i) => (
            <span key={i} className="w-[3px] rounded-full bg-emerald-300/60" style={{ height: `${h * 100}%` }} />
          ))}
        </span>
        <span>answering out loud</span>
      </p>
      {follow && (
        <p data-tl className="font-mono text-[12px] text-brand-300">
          <span className="text-gold-400">interviewer ▸</span> follow-up on the decision you just named
        </p>
      )}
    </div>
  );
}

function Transcript({ items }) {
  return (
    <Window data-term tabs={['role-and-knowledge.transcript', 'scorecard.md']} status={[<span key="a">● live voice · guided practice</span>, <span key="b">sample transcript</span>]} bodyClass="relative bg-[#110d20] px-4 py-5 sm:px-6 sm:py-6">
      <p aria-hidden="true" data-tl className="font-mono text-[12px] text-white/40">
        <span className="text-brand-300">session</span> · Role & Knowledge · set to your level, resume and the job
      </p>
      <ol className="mt-5 space-y-6">
        {items.map((it, i) => (
          <li key={it.q} className="relative space-y-2.5 border-l border-white/10 pl-4 sm:pl-5">
            <span aria-hidden="true" className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-gold-400" />
            <p aria-hidden="true" data-tl className="font-mono text-[11.5px] text-gold-400">
              [{String(i + 1).padStart(2, '0')}] interviewer ▸
            </p>
            <h3 data-tl className="font-display text-[1.15rem] font-bold leading-snug tracking-[-0.01em] text-white sm:text-[1.25rem]">
              {it.q}
            </h3>
            {it.hint && (
              <p data-tl className="text-[15px] leading-relaxed text-white/65">
                <span aria-hidden="true" className="mr-1.5 font-mono text-[12px] text-brand-300">
                  # hint
                </span>
                <Rich text={it.hint} tone="dark" />
              </p>
            )}
            <YouTurn follow={i < 2} />
          </li>
        ))}
      </ol>
      <p aria-hidden="true" data-tl className="mt-6 flex items-center gap-2 font-mono text-[12px] text-white/50">
        <span className="text-gold-400">▸</span>
        <span data-cursor className="h-[1.1em] w-[0.55em] animate-pulse bg-gold-400" />
      </p>
    </Window>
  );
}

export default function RoundTerminal({ s, n, total }) {
  const root = useRef(null);
  const ps = s.blocks.filter((b) => b.type === 'p');
  const first = ps[0];
  const rest = ps.slice(1);
  const qs = s.blocks.find((b) => b.type === 'questions');
  const others = s.blocks.filter((b) => b.type !== 'p' && b !== qs);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: 'top 70%', once: true } })
          .from(q('[data-lead]'), { y: 30, opacity: 0, stagger: 0.1, duration: 1.1 }, 0)
          .from(q('[data-term]'), { y: 60, opacity: 0, duration: 1.3 }, 0.1);
        gsap
          .timeline({ scrollTrigger: { trigger: q('[data-rounds]')[0], start: 'top 88%', once: true } })
          .from(q('[data-rounds] > *'), { y: 36, opacity: 0, stagger: 0.1, duration: 1.1 }, 0)
          .from(q('[data-round-tab]'), { y: 14, opacity: 0, stagger: 0.08, duration: 0.6 }, 0.2);
      });

      // Desktop: the transcript builds line by line with the scroll
      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        const lines = q('[data-tl]');
        const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: q('[data-term]')[0], start: 'top 70%', end: 'center 45%', scrub: true } });
        lines.forEach((l, i) => tl.from(l, { opacity: 0, x: -14, duration: 0.6 }, i * 0.5));
      });
    },
    { scope: root }
  );

  return (
    <section id={s.id} ref={root} aria-labelledby={`${s.id}-title`} className="relative scroll-mt-24 overflow-clip bg-white py-[60px] sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(35%_30%_at_100%_10%,rgba(196,179,234,0.35),transparent),radial-gradient(30%_30%_at_0%_100%,rgba(252,211,77,0.12),transparent)]" />
      <div className="container-x relative">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
          <div className="min-w-0 lg:sticky lg:top-28 lg:col-span-5">
            <ChapterHead s={s} n={n} total={total} file="practice.transcript" commit={{ hash: 'e07a5b2', msg: 'practice: Role & Knowledge round' }} />
            {s.intro && <Prose data-lead text={s.intro} className="mt-6 text-lead! font-medium" />}
            {first && <Prose data-lead text={first.text} className="mt-4" />}
          </div>
          <div className="min-w-0 lg:col-span-7">{qs && <Transcript items={qs.items} />}</div>
        </div>

        {rest.length > 0 && (
          <div data-rounds className="mt-12 grid grid-cols-[minmax(0,1fr)] items-center gap-6 rounded-[22px] bg-light-lavender p-5 ring-1 ring-hairline sm:mt-16 sm:p-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
            <div aria-hidden="true" className="min-w-0">
              <div className="flex flex-wrap gap-2">
                {ROUNDS.map((r, i) => (
                  <span key={r} data-round-tab className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 font-mono text-[12px] ${i === 1 ? 'bg-[#17122b] text-white' : 'bg-white text-ink-900/70 ring-1 ring-hairline'}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${i === 1 ? 'bg-gold-400' : 'bg-brand-300'}`} />
                    {r}
                  </span>
                ))}
              </div>
              <p className="mt-4 flex flex-wrap items-center gap-2 font-mono text-[12px] text-ink-900/60">
                <span>mode:</span>
                <span className="rounded-md bg-brand-100 px-2 py-1 font-bold text-brand-700">guided practice · hints</span>
                <span className="text-gold-600">→</span>
                <span className="rounded-md bg-gold-300 px-2 py-1 font-bold text-ink-950">real simulation · strict</span>
              </p>
            </div>
            <div className="min-w-0 space-y-4">
              {rest.map((b, i) => (
                <Prose key={i} text={b.text} />
              ))}
            </div>
          </div>
        )}
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
