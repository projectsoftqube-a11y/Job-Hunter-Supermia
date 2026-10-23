'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { Block } from '@/components/page/Blocks';
import { ChapterHead, Prose, Window, Line } from './editor';

/*
 * Chapter 1, "Job boards": an editor open on ranked.md, with the three boards as folders in the explorer
 * and the merged, ranked list in the main pane. Lines write themselves in when the window arrives. The
 * three cards become editor panes, and the two-tracks callout is drawn as resume versions branching off
 * main. All code-looking content is sample data and decorative.
 */

const FILES = [
  { dir: 'linkedin', files: ['senior-backend.md', 'backend-dev.md'] },
  { dir: 'indeed', files: ['infra-engineer.md'] },
  { dir: 'dice', files: ['platform-eng.md', 'go-developer.md'] },
];

const RANKED = [
  { role: 'Senior Backend Engineer', co: 'Northwind Labs', board: 'LinkedIn', score: 92 },
  { role: 'Platform Engineer', co: 'Brightpath Software', board: 'Dice', score: 87 },
  { role: 'Infrastructure Engineer', co: 'Lumen Studio', board: 'Indeed', score: 81 },
  { role: 'Go Developer', co: 'Harbor Analytics', board: 'Dice', score: 74 },
  { role: 'Backend Developer', co: 'Kestrel Health', board: 'LinkedIn', score: 66 },
];

const CARD_TAGS = ['rank', 'contact', 'source'];

function RankedEditor() {
  return (
    <Window data-editor tabs={['ranked.md', 'search.md', 'README.md']} status={[<span key="a">⎇ main · 3 boards searched</span>, <span key="b">sample data</span>]} bodyClass="grid grid-cols-[minmax(0,1fr)] sm:grid-cols-[170px_minmax(0,1fr)]">
      <div aria-hidden="true" className="hidden border-r border-white/10 bg-[#130f24] px-3 py-4 font-mono text-[12px] sm:block">
        <p className="px-1 text-[10.5px] font-bold uppercase tracking-[0.18em] text-white/35">Explorer</p>
        <ul className="mt-3 space-y-2.5">
          {FILES.map((f) => (
            <li key={f.dir} data-tree>
              <p className="flex items-center gap-1.5 text-brand-200">
                <span className="text-white/35">▾</span>
                {f.dir}/
              </p>
              <ul className="mt-1 space-y-1 border-l border-white/10 pl-3 ml-1.5">
                {f.files.map((x) => (
                  <li key={x} className="truncate text-white/50">
                    {x}
                  </li>
                ))}
              </ul>
            </li>
          ))}
          <li data-tree className="flex items-center gap-1.5 rounded bg-white/[0.07] px-1 py-0.5 text-gold-300">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
            ranked.md
          </li>
        </ul>
      </div>

      <div aria-hidden="true" className="min-w-0 py-4 pr-3 font-mono text-[12px] leading-[1.9] sm:text-[12.5px]">
        <Line data-code n={1} parts={[['p', '# '], ['t', 'Backend Engineer · Remote, US']]} />
        <Line data-code n={2} parts={[['c', '<!-- one search: LinkedIn + Indeed + Dice -->']]} />
        <Line data-code n={3} parts={[]} />
        <Line data-code n={4} parts={[['p', '## '], ['t', 'Ranked by fit with your resume']]} />
        {RANKED.map((r, i) => (
          <div key={r.role} data-code className={`relative grid grid-cols-[2.4rem_minmax(0,1fr)] ${i === 0 ? 'bg-gold-400/[0.08]' : ''}`}>
            {i === 0 && <span className="absolute inset-y-0 left-0 w-[2px] bg-gold-400" />}
            <span className="select-none pr-3 text-right text-white/25">{i + 5}</span>
            <span className="flex min-w-0 items-center gap-2">
              <span className="text-brand-400">{i + 1}.</span>
              <span className="min-w-0 flex-1 truncate">
                <span className="text-white/90">{r.role}</span>
                <span className="text-white/35"> · {r.co}</span>
              </span>
              <span className="hidden shrink-0 rounded border border-white/15 px-1.5 text-[10.5px] leading-[1.6] text-brand-200 md:inline">{r.board}</span>
              <span className={`shrink-0 rounded px-1.5 text-[11px] font-bold leading-[1.6] ${r.score >= 85 ? 'bg-gold-400 text-ink-950' : 'bg-brand-500/40 text-white'}`}>{r.score}</span>
            </span>
          </div>
        ))}
        <Line data-code n={10} parts={[]} />
        <Line data-code n={11} parts={[['k', 'recruiter'], ['t', ': '], ['s', 'shown when public']]} />
        <Line data-code n={12} parts={[['k', 'applied'], ['t', ': '], ['s', 'never without you']]} />
        <div data-code className="grid grid-cols-[2.4rem_minmax(0,1fr)]">
          <span className="select-none pr-3 text-right text-white/25">13</span>
          <span className="flex items-center">
            <span className="h-[1.1em] w-[0.55em] bg-gold-400" />
          </span>
        </div>
      </div>
    </Window>
  );
}

function Branches() {
  return (
    <svg aria-hidden="true" viewBox="0 0 300 120" className="h-auto w-full max-w-[340px]">
      <path d="M10 60 H290" fill="none" stroke="rgba(196,179,234,0.35)" strokeWidth="3" strokeLinecap="round" />
      <path data-branch d="M60 60 C95 60 95 22 135 22 H290" pathLength="1" fill="none" stroke="#f9c320" strokeWidth="3" strokeLinecap="round" />
      <path data-branch d="M60 60 C95 60 95 98 135 98 H290" pathLength="1" fill="none" stroke="#9b7fd4" strokeWidth="3" strokeLinecap="round" />
      {[
        [60, 60, '#c4b3ea'],
        [180, 22, '#f9c320'],
        [250, 22, '#f9c320'],
        [180, 98, '#9b7fd4'],
        [250, 98, '#9b7fd4'],
      ].map(([x, y, c]) => (
        <circle key={`${x}-${y}`} data-dot cx={x} cy={y} r="6" fill="#17122b" stroke={c} strokeWidth="3" />
      ))}
      <text x="12" y="50" fill="rgba(255,255,255,0.45)" fontSize="10" fontFamily="ui-monospace, monospace">
        main
      </text>
      <text x="140" y="13" fill="#fcd34d" fontSize="10" fontFamily="ui-monospace, monospace">
        resume/backend
      </text>
      <text x="140" y="117" fill="#c4b3ea" fontSize="10" fontFamily="ui-monospace, monospace">
        resume/platform
      </text>
    </svg>
  );
}

export default function ThreeBoards({ s, n, total }) {
  const root = useRef(null);
  const ps = s.blocks.filter((b) => b.type === 'p');
  const cards = s.blocks.find((b) => b.type === 'cards');
  const callout = s.blocks.find((b) => b.type === 'callout');
  const others = s.blocks.filter((b) => b.type !== 'p' && b !== cards && b !== callout);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ scrollTrigger: { trigger: q('[data-editor]')[0], start: 'top 80%', once: true } })
          .from(q('[data-lead]'), { y: 30, opacity: 0, stagger: 0.1, duration: 1.1 }, 0)
          .from(q('[data-editor]'), { y: 70, opacity: 0, duration: 1.3 }, 0.05)
          .from(q('[data-tree]'), { x: -16, opacity: 0, stagger: 0.08, duration: 0.6 }, 0.4)
          .from(q('[data-code]'), { x: -14, opacity: 0, stagger: 0.07, duration: 0.5, ease: 'power3.out' }, 0.5);
        gsap
          .timeline({ scrollTrigger: { trigger: q('[data-panes]')[0], start: 'top 85%', once: true } })
          .from(q('[data-pane]'), { y: 50, opacity: 0, stagger: 0.1, duration: 1.1 }, 0)
          .from(q('[data-tracks]'), { y: 40, opacity: 0, duration: 1.1 }, 0.3)
          .fromTo(q('[data-branch]'), { strokeDasharray: '1 1', strokeDashoffset: 1 }, { strokeDashoffset: 0, stagger: 0.2, duration: 1.2, ease: 'power2.inOut' }, 0.6)
          .from(q('[data-dot]'), { scale: 0, transformOrigin: '50% 50%', stagger: 0.1, duration: 0.5, ease: 'back.out(2.4)' }, 0.9);
      });
    },
    { scope: root }
  );

  return (
    <section id={s.id} ref={root} aria-labelledby={`${s.id}-title`} className="relative scroll-mt-24 overflow-hidden bg-[#f6f4fc] py-[60px] sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(75,46,131,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(75,46,131,0.06) 1px, transparent 1px)', backgroundSize: '28px 28px', maskImage: 'linear-gradient(to bottom, black, transparent 85%)' }} />
      <div className="container-x relative">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="min-w-0 lg:col-span-5">
            <ChapterHead s={s} n={n} total={total} file="three-boards.md" commit={{ hash: '3b1d0a7', msg: 'search: LinkedIn + Indeed + Dice' }} />
            {s.intro && <Prose data-lead text={s.intro} className="mt-6 text-lead! font-medium text-ink-900/75" />}
            {ps.map((b, i) => (
              <Prose key={i} data-lead text={b.text} className="mt-4" />
            ))}
          </div>
          <div className="min-w-0 lg:col-span-7">
            <RankedEditor />
          </div>
        </div>

        {cards && (
          <ul data-panes className={`mt-12 grid gap-3 sm:mt-16 ${cards.items.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
            {cards.items.map((c, i) => (
              <li key={c.title} data-pane>
                <div className="group grid h-full grid-cols-[2.2rem_minmax(0,1fr)] overflow-hidden rounded-[16px] bg-white ring-1 ring-hairline shadow-[0_24px_50px_-40px_rgba(26,15,51,0.5)] transition-transform duration-500 hover:-translate-y-1">
                  <span aria-hidden="true" className="flex flex-col items-end gap-[0.62rem] border-r border-hairline bg-light-lavender py-5 pr-2 font-mono text-[11px] text-brand-300">
                    {[1, 2, 3, 4, 5].map((k) => (
                      <span key={k}>{k}</span>
                    ))}
                  </span>
                  <div className="min-w-0 p-5">
                    <p aria-hidden="true" className="flex items-center gap-2 font-mono text-[12px] text-brand-500">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#17122b] text-gold-300 transition-transform duration-500 group-hover:-rotate-6">
                        <Icon name={c.icon || 'spark'} className="h-4 w-4" />
                      </span>
                      {`/* ${CARD_TAGS[i] || 'note'} */`}
                    </p>
                    <h3 className="mt-3 font-display text-[1.2rem] font-bold leading-snug tracking-[-0.02em] text-ink-950">{c.title}</h3>
                    <p className="mt-1.5 text-[15.5px] leading-relaxed text-ink-900/70">
                      <Rich text={c.text} />
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {callout && (
          <aside data-tracks className="relative mt-4 grid grid-cols-[minmax(0,1fr)] items-center gap-6 overflow-hidden rounded-[22px] bg-[#17122b] p-6 text-white ring-1 ring-white/10 sm:p-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12">
            <div aria-hidden="true" className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(124,92,214,0.35),transparent)]" />
            <div className="relative min-w-0">
              <Branches />
            </div>
            <div className="relative min-w-0">
              {callout.title && <p className="font-display text-[1.35rem] font-bold tracking-[-0.02em] text-white">{callout.title}</p>}
              <p className="mt-2 text-[16.5px] leading-relaxed text-brand-100">
                <Rich text={callout.text} tone="dark" />
              </p>
            </div>
          </aside>
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
