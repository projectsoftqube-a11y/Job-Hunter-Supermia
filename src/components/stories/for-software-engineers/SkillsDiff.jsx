'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap';
import Rich from '@/components/Rich';
import { Block } from '@/components/page/Blocks';
import { ChapterHead, Prose, Window } from './editor';

/*
 * Chapter 2, "Match score": resume.md and job.md side by side, like a diff. On desktop the diff is sticky
 * and one scrubbed timeline sweeps a scan line down both files while the highlights draw in: purple for
 * skills the resume already shows, gold for what the job asks for that it does not. The tips read as
 * review comments; as each one passes, the line it points at lights up. The diff is a decorative sample.
 */

const RESUME = [
  { t: [['p', '# '], ['t', 'Backend Engineer, 5 yrs']] },
  { t: [['p', '## '], ['t', 'Skills']] },
  { t: [['t', '• Go, Python, PostgreSQL']], hl: 'match' },
  { t: [['t', '• Kafka event pipelines']], hl: 'match' },
  { t: [['t', '• Docker, CI/CD']] },
  { t: [['p', '## '], ['t', 'Experience']] },
  { t: [['t', '• Cut p95 latency on checkout API']], hl: 'match' },
  { t: [['t', '• Owned on-call for payments']] },
];

const JOB = [
  { t: [['p', '# '], ['t', 'Senior Backend Engineer']] },
  { t: [['p', '## '], ['t', 'Must have']] },
  { t: [['t', '• Go or Java']], hl: 'match' },
  { t: [['t', '• PostgreSQL at scale']], hl: 'match' },
  { t: [['t', '• Kubernetes']], hl: 'miss' },
  { t: [['t', '• Event streaming (Kafka)']], hl: 'match' },
  { t: [['p', '## '], ['t', 'Nice to have']] },
  { t: [['t', '• Terraform']], hl: 'miss' },
];

// Which diff line each tip points at: [pane, line index]
const TIP_REFS = [
  ['job', 4],
  ['resume', 6],
  ['resume', 2],
  ['job', 7],
];

const TOKEN = { p: 'text-brand-400', t: 'text-white/85' };

function Pane({ name, meta, lines, pane }) {
  return (
    <div className="min-w-0 py-3">
      <p className="flex items-center justify-between gap-2 px-4 pb-2 font-mono text-[11px] text-white/40">
        <span className="truncate">{name}</span>
        <span className="shrink-0">{meta}</span>
      </p>
      <div className="font-mono text-[12px] leading-[2] sm:text-[12.5px]">
        {lines.map((l, i) => (
          <div key={i} data-dline={`${pane}-${i}`} className="relative grid grid-cols-[2.2rem_1rem_minmax(0,1fr)]">
            {l.hl && <span data-hl className={`absolute inset-0 origin-left ${l.hl === 'match' ? 'bg-brand-500/30' : 'bg-gold-400/20'}`} />}
            <span data-focus className="pointer-events-none absolute inset-0 opacity-0 ring-1 ring-inset ring-gold-300" />
            <span className="relative select-none pr-2 text-right text-white/25">{i + 1}</span>
            <span className={`relative font-bold ${l.hl === 'match' ? 'text-brand-200' : 'text-gold-300'}`}>{l.hl === 'match' ? '+' : l.hl === 'miss' ? '−' : ''}</span>
            <span className="relative min-w-0 truncate pr-3">
              {l.t.map(([k, txt], j) => (
                <span key={j} className={TOKEN[k]}>
                  {txt}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Diff() {
  return (
    <Window
      data-diff
      tabs={['resume.md ⟷ job.md', 'notes.md']}
      status={[<span key="a">3 matched · 2 missing</span>, <span key="b">sample diff</span>]}
      bodyClass="relative"
    >
      <div aria-hidden="true" className="relative grid grid-cols-[minmax(0,1fr)] divide-y divide-white/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        <Pane name="resume.md" meta="your resume" lines={RESUME} pane="resume" />
        <Pane name="job.md" meta="Northwind Labs" lines={JOB} pane="job" />
        <span data-scan className="pointer-events-none absolute inset-x-0 top-0 hidden h-10 bg-gradient-to-b from-transparent via-gold-300/15 to-transparent opacity-0 lg:block" />
      </div>
      <div aria-hidden="true" className="flex flex-wrap items-center gap-4 border-t border-white/10 px-4 py-3 font-mono text-[11.5px] text-white/60">
        <span className="flex items-center gap-2">
          <span className="h-3 w-5 rounded-sm bg-brand-500/50" />
          on your resume
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-5 rounded-sm bg-gold-400/40" />
          missing from it
        </span>
      </div>
    </Window>
  );
}

export default function SkillsDiff({ s, n, total }) {
  const root = useRef(null);
  const ps = s.blocks.filter((b) => b.type === 'p');
  const list = s.blocks.find((b) => b.type === 'list');
  const others = s.blocks.filter((b) => b.type !== 'p' && b !== list);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(q('[data-lead]'), { y: 30, opacity: 0, stagger: 0.1, duration: 1.1, scrollTrigger: { trigger: q('[data-lead]')[0], start: 'top 88%', once: true } });
        gsap.set(q('[data-tip]'), { y: 40, opacity: 0 });
        ScrollTrigger.batch(q('[data-tip]'), { start: 'top 90%', once: true, onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, stagger: 0.1, duration: 1 }) });
      });

      // Desktop: the diff sweeps in with the scroll, and each tip lights the line it points at
      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        const diff = q('[data-diff]')[0];
        const body = diff.querySelector('[data-scan]').parentElement;
        const hls = q('[data-hl]');
        const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: root.current, start: 'top 55%', end: 'center 50%', scrub: true } });
        tl.fromTo(q('[data-scan]'), { y: 0, opacity: 1 }, { y: () => body.offsetHeight - 40, duration: 1 }, 0).to(q('[data-scan]'), { opacity: 0, duration: 0.08 }, 0.95);
        // Lines light in reading order, alternating panes so both sides fill together
        const order = [...hls].sort((a, b) => a.parentElement.offsetTop - b.parentElement.offsetTop);
        order.forEach((h) => {
          const at = (h.parentElement.offsetTop / body.offsetHeight) * 0.9;
          tl.fromTo(h, { scaleX: 0 }, { scaleX: 1, duration: 0.12 }, at);
        });

        const tips = q('[data-tip-card]');
        const focus = TIP_REFS.map(([pane, i]) => q(`[data-dline="${pane}-${i}"] [data-focus]`)[0]);
        let lit = -1;
        const light = (i) => {
          if (i === lit) return;
          lit = i;
          tips.forEach((t, k) => (t.dataset.on = k === i ? 'true' : 'false'));
          focus.forEach((f, k) => f && (f.style.opacity = k === i ? '1' : '0'));
        };
        ScrollTrigger.create({
          trigger: q('[data-tips]')[0],
          start: 'top 60%',
          end: 'bottom 45%',
          onUpdate: (self) => light(Math.min(tips.length - 1, Math.floor(self.progress * tips.length))),
          onLeave: () => light(-1),
          onLeaveBack: () => light(-1),
        });
        return () => {
          tips.forEach((t) => delete t.dataset.on);
          focus.forEach((f) => f && (f.style.opacity = ''));
        };
      });

      mm.add(`(max-width: 1023px) and ${MOTION_OK}`, () => {
        gsap.from(q('[data-hl]'), { scaleX: 0, stagger: 0.12, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: q('[data-diff]')[0], start: 'top 75%', once: true } });
      });
    },
    { scope: root }
  );

  return (
    <section id={s.id} ref={root} aria-labelledby={`${s.id}-title`} className="grain relative scroll-mt-24 overflow-clip bg-brand-950 py-[60px] text-white sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_40%_at_85%_25%,rgba(109,76,176,0.5),transparent),radial-gradient(35%_35%_at_0%_90%,rgba(244,180,0,0.12),transparent)]" />
      <div className="container-x relative z-[2]">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-12 lg:items-end lg:gap-14">
          <ChapterHead s={s} n={n} total={total} file="match-score.diff" commit={{ hash: '8c42f19', msg: 'diff: resume.md vs job.md' }} tone="dark" className="min-w-0 lg:col-span-7" />
          {s.intro && <Prose data-lead text={s.intro} tone="dark" className="min-w-0 text-lead! font-medium lg:col-span-5 lg:pb-2" />}
        </div>
        <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-10 sm:mt-14 lg:grid-cols-12 lg:items-start lg:gap-14">
          <div className="min-w-0 lg:col-span-5">
            {ps.map((b, i) => (
              <Prose key={i} data-lead text={b.text} tone="dark" className={i ? 'mt-4' : ''} />
            ))}

            {list && (
              <ul data-tips className="mt-8 space-y-3">
                {list.items.map((t, i) => (
                  <li key={i} data-tip>
                    <div data-tip-card className="group/tip relative isolate overflow-hidden rounded-[16px] bg-white/[0.04] p-4 ring-1 ring-white/10 sm:p-5">
                      <span aria-hidden="true" className="pointer-events-none absolute inset-0 -z-[1] bg-gradient-to-r from-gold-400/15 to-transparent opacity-0 transition-opacity duration-500 group-data-[on=true]/tip:opacity-100" />
                      <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[3px] bg-brand-400 transition-colors duration-500 group-data-[on=true]/tip:bg-gold-400" />
                      <p aria-hidden="true" className="flex items-center gap-2 font-mono text-[11.5px] text-brand-300">
                        <span className="rounded bg-white/10 px-1.5 text-white/70">review</span>
                        {TIP_REFS[i] ? `${TIP_REFS[i][0]}.md L${TIP_REFS[i][1] + 1}` : 'note'}
                      </p>
                      <p className="mt-2 text-[16px] leading-relaxed text-white/90">
                        <Rich text={t} tone="dark" />
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="min-w-0 lg:sticky lg:top-28 lg:col-span-7">
            <Diff />
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
