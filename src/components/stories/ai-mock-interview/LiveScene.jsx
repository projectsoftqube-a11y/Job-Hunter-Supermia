'use client';

import { useRef } from 'react';
import CreativeHeading from '@/components/CreativeHeading';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';
import { Slate, SafeArea, H2_DARK, wave } from './shared';

/*
 * Segment 1, "On air". A live session monitor beside the comparison table. On desktop the stage pins
 * and scrolling plays one exchange: the interviewer asks, you answer out loud, the follow-up lands,
 * the session ends with a scorecard and the mode flips to the strict run. Each beat lights the table
 * row it proves, a gold cursor moves down the rows and the session clock runs with the scroll.
 * The transcript is illustrative sample content; the table is the page copy and is always visible.
 */

const LINES = [
  { who: 'ai', tag: 'Question', text: 'Walk me through how you would cut the load time of a slow React dashboard.' },
  { who: 'you', tag: 'You, out loud', text: 'First I would measure it. I would profile the bundle and the slowest renders before changing anything, then split the heaviest route.' },
  { who: 'ai', tag: 'Follow-up', text: 'Good. How would you prove the change actually worked?' },
];
const BARS = wave(30, 3);

function Monitor() {
  return (
    <div data-monitor aria-hidden="true" className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,#2a1650_0%,#160c2c_100%)] shadow-[0_40px_80px_-50px_rgba(0,0,0,0.9)]">
      <div className="absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_0%,rgba(155,127,212,0.35),transparent)]" />
      <SafeArea className="border-gold-400/50" />

      {/* Top bar */}
      <div className="relative flex flex-wrap items-center gap-2 border-b border-white/10 px-5 py-3.5 sm:px-6">
        <span className="flex items-center gap-1.5 rounded-full bg-rose-500 px-2.5 py-1 text-[11px] font-bold text-white">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          LIVE
        </span>
        <span className="text-[12px] font-semibold text-brand-100">Role &amp; Knowledge</span>
        <span className="relative ml-auto inline-grid">
          <span data-mode-a className="col-start-1 row-start-1 rounded-full bg-gold-400/15 px-2.5 py-1 text-center text-[11px] font-bold text-gold-300 ring-1 ring-gold-400/30">Guided practice</span>
          <span data-mode-b className="col-start-1 row-start-1 rounded-full bg-white/10 px-2.5 py-1 text-center text-[11px] font-bold text-white opacity-0 ring-1 ring-white/20">Real simulation</span>
        </span>
        <span className="rounded-md bg-black/40 px-2 py-1 font-mono text-[12px] font-bold tabular-nums text-white">
          <span data-timer>00:00</span>
        </span>
      </div>

      <div className="relative px-5 pb-6 pt-5 sm:px-6">
        {/* Who is speaking */}
        <div className="flex items-center gap-3">
          <span className="relative flex h-11 w-11 shrink-0 items-center justify-center">
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-gold-400/40" />
            <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-300 to-brand-600 font-display text-sm font-extrabold text-white">AI</span>
          </span>
          <span className="min-w-0">
            <span className="block text-[13px] font-bold text-white">AI interviewer</span>
            <span className="relative inline-grid text-[12px] font-semibold">
              <span data-status-a className="col-start-1 row-start-1 text-gold-300">is asking a question</span>
              <span data-status-b className="col-start-1 row-start-1 text-brand-200 opacity-0">is listening to you</span>
            </span>
          </span>
          <span className="ml-auto flex items-center gap-1.5 rounded-full bg-white/[0.06] px-2.5 py-1 text-[11px] font-bold text-white/70 ring-1 ring-white/10">
            <Icon name="mic" className="h-3.5 w-3.5 text-gold-300" />
            Mic on
          </span>
        </div>

        {/* Waveform: violet while the interviewer talks, gold while you do */}
        <div data-wave className="relative mt-4 h-14 origin-center">
          {[
            ['data-wave-ai', 'bg-brand-300', ''],
            ['data-wave-you', 'bg-gold-400', 'opacity-0'],
          ].map(([attr, color, extra]) => (
            <div key={attr} {...{ [attr]: '' }} className={`absolute inset-0 flex items-center justify-between ${extra}`}>
              {BARS.map((h, i) => (
                <span key={i} className={`w-[5px] rounded-full ${color}`} style={{ height: `${h}%` }} />
              ))}
            </div>
          ))}
        </div>

        {/* Transcript */}
        <div className="mt-5 space-y-3">
          {LINES.map((l, i) => (
            <div key={i} data-line className={`flex ${l.who === 'you' ? 'justify-end' : ''}`}>
              <div className={`max-w-[88%] rounded-2xl px-4 py-3 ${l.who === 'you' ? 'rounded-tr-md bg-gradient-to-br from-gold-400 to-gold-500 text-ink-950' : 'rounded-tl-md bg-white text-ink-950'}`}>
                <span className={`mb-1 block text-[10.5px] font-bold uppercase tracking-[0.14em] ${l.who === 'you' ? 'text-ink-950/60' : i === 2 ? 'text-rose-500' : 'text-brand-600'}`}>{l.tag}</span>
                <span data-line-text className="block text-[14px] font-medium leading-relaxed">
                  {l.text}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Session end */}
        <div data-end className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3">
          <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[conic-gradient(#f9c320_0_78%,rgba(255,255,255,0.12)_78%_100%)]">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-950 font-display text-[13px] font-extrabold text-white">7.8</span>
          </span>
          <span className="min-w-0">
            <span className="block text-[13px] font-bold text-white">Session ended · scorecard ready</span>
            <span className="block text-[12px] font-medium text-brand-200">Readiness out of 10 · sample session</span>
          </span>
          <Icon name="chart" className="ml-auto h-5 w-5 shrink-0 text-gold-300" />
        </div>
      </div>
    </div>
  );
}

export default function LiveScene({ s, n }) {
  const root = useRef(null);
  const table = s.blocks.find((b) => b.type === 'table');
  const paras = s.blocks.filter((b) => b.type === 'p');

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        const lines = q('[data-line]');
        const rows = q('[data-row]');
        const marks = q('[data-row-mark]');
        const glow = q('[data-glow]')[0];
        const timer = q('[data-timer]')[0];
        const cursor = q('[data-cursor]')[0];
        gsap.from(q('[data-side]'), { y: 30, opacity: 0, duration: 1.2, scrollTrigger: { trigger: q('[data-side]')[0], start: 'top 88%', once: true } });
        const fmt = (sec) => `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`;

        gsap.set(lines, { autoAlpha: 0, y: 34, scale: 0.97 });
        gsap.set(q('[data-line-text]')[1], { opacity: 0, x: -14 });
        gsap.set(q('[data-end]'), { autoAlpha: 0, y: 24 });
        gsap.set(q('[data-wave]'), { scaleY: 0.3 });
        gsap.set(marks, { scale: 0, rotate: -40 });
        // Cursor and glow are 100px tall in CSS; each row is reached with y + scaleY (transform only)
        const rowY = (i) => () => rows[i].offsetTop;
        const rowS = (i) => () => rows[i].offsetHeight / 100;
        gsap.set([cursor, glow], { autoAlpha: 0, y: rowY(0), scaleY: rowS(0), transformOrigin: '50% 0%' });

        const tl = gsap.timeline({
          defaults: { ease: 'power2.out', duration: 0.45 },
          scrollTrigger: {
            trigger: q('[data-pin]')[0],
            start: 'center center',
            end: '+=210%',
            pin: true,
            scrub: 0.4,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (timer) timer.textContent = fmt(Math.round(self.progress * 252));
            },
          },
        });

        const light = (i, at) => {
          tl.to([cursor, glow], { autoAlpha: 1, y: rowY(i), scaleY: rowS(i), duration: 0.35, ease: 'power3.inOut' }, at).to(marks[i], { scale: 1, rotate: 0, duration: 0.35, ease: 'back.out(2)' }, at + 0.1);
        };

        // 1. The interviewer asks
        tl.to(q('[data-wave]'), { scaleY: 1, duration: 0.3 }, 0.05).to(lines[0], { autoAlpha: 1, y: 0, scale: 1 }, 0.1);
        // 2. You answer out loud
        tl.to(q('[data-status-a]'), { opacity: 0, duration: 0.2 }, 0.75)
          .to(q('[data-status-b]'), { opacity: 1, duration: 0.2 }, 0.75)
          .to(q('[data-wave-ai]'), { opacity: 0, duration: 0.25 }, 0.75)
          .to(q('[data-wave-you]'), { opacity: 1, duration: 0.25 }, 0.75)
          .to(lines[1], { autoAlpha: 1, y: 0, scale: 1 }, 0.85)
          .to(q('[data-line-text]')[1], { opacity: 1, x: 0, duration: 0.6 }, 1.0);
        light(0, 1.1);
        // 3. The follow-up lands
        tl.to(q('[data-status-b]'), { opacity: 0, duration: 0.2 }, 2.0)
          .to(q('[data-status-a]'), { opacity: 1, duration: 0.2 }, 2.0)
          .to(q('[data-wave-you]'), { opacity: 0, duration: 0.25 }, 2.0)
          .to(q('[data-wave-ai]'), { opacity: 1, duration: 0.25 }, 2.0)
          .to(lines[2], { autoAlpha: 1, y: 0, scale: 1 }, 2.1);
        light(1, 2.25);
        // 4. Session ends with a scorecard
        tl.to(q('[data-wave]'), { scaleY: 0.18, duration: 0.3 }, 2.95).to(q('[data-end]'), { autoAlpha: 1, y: 0 }, 3.0);
        light(2, 3.1);
        // 5. Next time: the strict run
        tl.to(q('[data-mode-a]'), { opacity: 0, duration: 0.2 }, 3.75).to(q('[data-mode-b]'), { opacity: 1, duration: 0.2 }, 3.75);
        light(3, 3.8);
        tl.to({}, { duration: 0.5 });
      });

      mm.add(`(max-width: 1023px) and ${MOTION_OK}`, () => {
        gsap.from(q('[data-line]'), { y: 30, opacity: 0, stagger: 0.25, duration: 1, scrollTrigger: { trigger: q('[data-monitor]')[0], start: 'top 75%', once: true } });
        gsap.from(q('[data-row]'), { y: 26, opacity: 0, stagger: 0.12, duration: 1, scrollTrigger: { trigger: q('[data-table]')[0], start: 'top 85%', once: true } });
        gsap.from(q('[data-side]'), { y: 30, opacity: 0, duration: 1.2, scrollTrigger: { trigger: q('[data-side]')[0], start: 'top 88%', once: true } });
      });

    },
    { scope: root }
  );

  return (
    <section ref={root} id={s.id} aria-labelledby={`${s.id}-title`} className="grain relative scroll-mt-24 overflow-hidden bg-brand-950 text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_35%_at_15%_0%,rgba(109,76,176,0.45),transparent),radial-gradient(35%_35%_at_95%_70%,rgba(244,180,0,0.1),transparent)]" />

      <div className="container-x relative z-[2] pt-[72px] sm:pt-24 lg:pt-28">
        <Slate n={n} eyebrow={s.eyebrow} dark />
        <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="min-w-0 lg:col-span-7">
            <CreativeHeading id={`${s.id}-title`} lines={s.h2} tone="dark" className={H2_DARK} />
            {s.intro && (
              <p className="mt-6 max-w-[46rem] text-lead font-medium text-brand-100">
                <Rich text={s.intro} tone="dark" />
              </p>
            )}
          </div>
          <div data-side className="min-w-0 lg:col-span-5">
            <div className="relative rounded-[24px] border border-white/10 bg-white/[0.04] p-6 sm:p-7">
              <span aria-hidden="true" className="absolute -top-3 left-6 rounded-md bg-gold-400 px-2 py-0.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-ink-950">Producer note</span>
              {paras.map((b, i) => (
                <p key={i} className="text-[16.5px] leading-[1.75] text-white/80">
                  <Rich text={b.text} tone="dark" />
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div data-pin className="relative z-[2]">
        <div className="container-x grid w-full grid-cols-[minmax(0,1fr)] gap-6 pb-[72px] pt-12 sm:pb-24 sm:pt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:items-center lg:gap-12 lg:pb-28 lg:pt-14">
          <Monitor />

          {table && (
            <div data-table className="relative min-w-0">
              <div aria-hidden="true" className="mb-4 hidden items-center gap-3 lg:flex">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-white/45">Same question, two ways to prepare</span>
                <span className="h-px flex-1 bg-white/10" />
              </div>
              <div className="relative">
                <span data-glow aria-hidden="true" className="absolute inset-x-0 top-0 hidden h-[100px] bg-gradient-to-r from-gold-400/[0.10] to-gold-400/[0.04] lg:block lg:opacity-0" />
                <span data-cursor aria-hidden="true" className="absolute -left-3 top-0 hidden h-[100px] w-[3px] rounded-full bg-gold-400 lg:block lg:opacity-0" />
                <table className="relative block w-full border-collapse text-left lg:table">
                  <thead className="hidden lg:table-header-group">
                    <tr>
                      {table.head.map((h, j) => (
                        <th key={j} scope="col" className={`px-4 pb-3 align-bottom font-display text-[13px] font-bold uppercase tracking-[0.1em] ${j === 2 ? 'text-gold-300' : 'text-white/55'}`}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="block space-y-3 lg:table-row-group lg:space-y-0">
                    {table.rows.map((r, i) => (
                      <tr key={i} data-row className="grid grid-cols-[minmax(0,1fr)] gap-3 rounded-[20px] border border-white/10 bg-white/[0.03] p-4 lg:table-row lg:rounded-none lg:border-x-0 lg:border-b-0 lg:bg-white/[0.02] lg:p-0">
                        <th scope="row" className="block text-left font-display text-[1.05rem] font-bold text-white lg:table-cell lg:w-[24%] lg:px-4 lg:py-5 lg:align-top">
                          {r[0]}
                        </th>
                        <td className="block lg:table-cell lg:w-[33%] lg:px-4 lg:py-5 lg:align-top">
                          <span className="mb-1 block text-[11px] font-bold uppercase tracking-[0.12em] text-white/45 lg:hidden">{table.head[1]}</span>
                          <span className="flex gap-2.5 text-[15px] leading-relaxed text-white/60">
                            <span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
                            <span className="min-w-0">
                              <Rich text={String(r[1])} tone="dark" />
                            </span>
                          </span>
                        </td>
                        <td className="block rounded-2xl bg-gold-400/[0.07] p-3 ring-1 ring-gold-400/20 lg:table-cell lg:rounded-none lg:bg-transparent lg:px-4 lg:py-5 lg:align-top lg:ring-0">
                          <span className="mb-1 block text-[11px] font-bold uppercase tracking-[0.12em] text-gold-300 lg:hidden">{table.head[2]}</span>
                          <span className="flex gap-2.5 text-[15px] font-medium leading-relaxed text-white">
                            <span data-row-mark aria-hidden="true" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-400 text-ink-950">
                              <Icon name="check" className="h-3 w-3" strokeWidth={3.2} />
                            </span>
                            <span className="min-w-0">
                              <Rich text={String(r[2])} tone="dark" />
                            </span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
