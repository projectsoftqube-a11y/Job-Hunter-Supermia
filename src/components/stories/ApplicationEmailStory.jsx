'use client';

import { useRef, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap';
import CreativeHeading from '@/components/CreativeHeading';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { Block } from '@/components/page/Blocks';
import { Airmail, Chapter, Postmark, PlaneIcon, Tile, h2Class } from './job-application-email/parts';

/*
 * "The Draft Desk": the application email page told as one letter being written on a desk.
 *   1. The blank letter: the five things a good email holds, written down a sheet as ink runs the margin.
 *   2. The route: four steps as stops on an airmail route, an envelope travelling between them.
 *   3. The draft: a pinned composer where the example email types itself as you scroll, while leader
 *      lines run from each check-list note to the part of the email it describes.
 *   4. The handoff: on the dark band the draft passes from JobHunter's side of the desk into the
 *      visitor's hands and stops at a big Send button only they press (decorative, it does nothing).
 * Every string comes from the page module and is server-rendered. Motion only runs with
 * prefers-reduced-motion: no-preference, the pinned scene only on wide, tall screens, and every
 * animation is transform/opacity (plus stroke offsets on small SVG paths), one trigger per scene.
 */

const PIN = `(min-width: 1024px) and (min-height: 700px) and ${MOTION_OK}`;
const pick = (s, type, n = 0) => (s.blocks || []).filter((b) => b.type === type)[n];

/* ------------------------------------------------------------------ 1. The blank letter */

const PART_TAGS = [
  { tag: 'Subject', icon: 'pen' },
  { tag: 'Opening', icon: 'chat' },
  { tag: 'Proof', icon: 'doc' },
  { tag: 'Why here', icon: 'target' },
  { tag: 'The ask', icon: 'check' },
];

const LEAVE_OUT = ['My whole career story, from the start…', '[ entire resume pasted here ]', 'To whom it may concern, I am a hard worker…'];

function WhatToInclude({ s, n }) {
  const ref = useRef(null);
  const list = pick(s, 'list');
  const notes = (s.blocks || []).filter((b) => b.type === 'p');
  const extra = (s.blocks || []).filter((b) => b.type !== 'list' && b.type !== 'p');

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Entrance: heading, intro and the sheet in one timeline
        gsap
          .timeline({ scrollTrigger: { trigger: ref.current, start: 'top 72%', once: true } })
          .from(q('[data-copy]'), { y: 40, opacity: 0, stagger: 0.12, duration: 1.2 })
          .from(q('[data-stamp]'), { y: -30, rotation: 40, scale: 1.4, opacity: 0, duration: 0.9, ease: 'back.out(1.8)' }, 0.7);

        // The tray: slips land, then each one is crossed through
        gsap
          .timeline({ scrollTrigger: { trigger: q('[data-tray]')[0], start: 'top 85%', once: true } })
          .from(q('[data-tray]'), { y: 40, opacity: 0, duration: 1.1 })
          .from(q('[data-slip]'), { y: 20, opacity: 0, rotation: (i) => [-6, 4, -3][i % 3], stagger: 0.1, duration: 0.8 }, 0.2)
          .fromTo(q('[data-strike]'), { scaleX: 0 }, { scaleX: 1, stagger: 0.22, duration: 0.6, ease: 'power3.inOut' }, 0.6);

        // Ink runs down the margin, segment by segment, and lights each part as it arrives
        const rows = q('[data-row]');
        const inks = q('[data-ink]');
        const states = rows.map((row) =>
          gsap
            .timeline({ paused: true })
            .fromTo(row.querySelector('[data-num]'), { scale: 0.7, opacity: 0.35 }, { scale: 1, opacity: 1, duration: 0.55, ease: 'back.out(2.4)' })
            .fromTo(row.querySelector('[data-hl]'), { scaleY: 0 }, { scaleY: 1, duration: 0.7, ease: 'expo.out' }, 0)
            .fromTo(row.querySelector('[data-tag]'), { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(2)' }, 0.1)
        );
        const on = rows.map(() => false);
        const ink = gsap.timeline({
          scrollTrigger: {
            trigger: q('[data-rows]')[0],
            start: 'top 66%',
            end: 'bottom 60%',
            scrub: true,
            onUpdate: (self) => {
              const t = self.progress * Math.max(1, rows.length - 1);
              rows.forEach((_, i) => {
                const next = self.progress > 0.002 && t >= i - 0.08;
                if (next !== on[i]) {
                  on[i] = next;
                  if (next) states[i].play();
                  else states[i].reverse();
                }
              });
            },
          },
        });
        ink.fromTo(inks, { scaleY: 0 }, { scaleY: 1, ease: 'none', duration: 1, stagger: 1 });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id={s.id} aria-labelledby={`${s.id}-title`} className="relative scroll-mt-24 overflow-clip bg-[#fbf8f1] pb-16 pt-20 sm:pb-20 sm:pt-36">
      {/* A white lead-in under the shared overview card, then the airmail edge of the envelope */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-12 bg-white sm:h-16" />
      <Airmail className="absolute inset-x-0 top-12 sm:top-16" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-24 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(closest-side,rgba(196,179,234,0.4),transparent)]" />

      <div className="container-x relative grid grid-cols-[minmax(0,1fr)] gap-x-14 gap-y-10 lg:grid-cols-12 lg:gap-y-14 xl:gap-x-20">
        {/* Heading row */}
        <div data-copy className="min-w-0 lg:col-span-7">
          <Chapter n={n} eyebrow={s.eyebrow} />
          <CreativeHeading id={`${s.id}-title`} lines={s.h2} className={`mt-7 text-ink-950 ${h2Class}`} />
        </div>
        {s.intro && (
          <div data-copy className="min-w-0 lg:col-span-5 lg:self-end">
            <p className="text-[clamp(1.05rem,0.95rem+0.35vw,1.25rem)] font-medium leading-relaxed text-ink-900/70">
              <Rich text={s.intro} />
            </p>
          </div>
        )}

        {/* The "leave out" tray */}
        <div className="order-last min-w-0 lg:order-none lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            {notes.length > 0 && (
              <div data-tray className="relative rounded-[26px] border border-dashed border-brand-300 bg-white/70 p-5 sm:p-6">
                <p aria-hidden="true" className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-rose-600/80">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-50 text-rose-500 ring-1 ring-rose-200">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" className="h-3 w-3">
                      <path d="M6 6l12 12M18 6 6 18" />
                    </svg>
                  </span>
                  The out tray
                </p>
                <ul aria-hidden="true" className="mt-4 flex flex-wrap gap-2.5">
                  {LEAVE_OUT.map((t) => (
                    <li key={t} data-slip className="relative rounded-xl bg-[#fffdf8] px-3.5 py-2 text-[13.5px] font-medium text-ink-900/45 shadow-[0_8px_20px_-14px_rgba(26,15,51,0.5)] ring-1 ring-ink-900/[0.06]">
                      {t}
                      <span data-strike className="absolute inset-x-2 top-1/2 h-[2px] origin-left -rotate-2 rounded-full bg-rose-500/80" />
                    </li>
                  ))}
                </ul>
                <div className="mt-5 space-y-3 text-[16px] leading-relaxed text-ink-900/75">
                  {notes.map((b, i) => (
                    <p key={i}>
                      <Rich text={b.text} />
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* The sheet: the email, written as its five parts */}
        <div className="relative min-w-0 lg:col-span-7">
          <div data-sheet className="relative">
            {/* Stamp and postmark on the corner of the sheet */}
            <div aria-hidden="true" className="pointer-events-none absolute -top-12 right-16 z-[3] hidden sm:block">
              <Postmark id="pm-sheet" center="1 ROLE" className="w-[170px] opacity-40" />
            </div>
            <span data-stamp aria-hidden="true" className="pointer-events-none absolute -top-7 right-5 z-[4] hidden h-[70px] w-[58px] rotate-6 border-[5px] border-dotted border-[#fbf8f1] bg-gradient-to-br from-gold-300 to-gold-500 shadow-[0_10px_20px_-8px_rgba(179,124,0,0.7)] sm:block">
              <span className="m-[3px] flex h-[calc(100%-6px)] items-center justify-center border border-ink-950/20 text-ink-950">
                <PlaneIcon className="h-6 w-6" />
              </span>
            </span>
            <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rounded-[30px] bg-white/70 ring-1 ring-ink-900/[0.05]" />
            <div aria-hidden="true" className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-[30px] bg-white ring-1 ring-ink-900/[0.05]" />
            <div className="relative overflow-hidden rounded-[30px] bg-[#fffdf8] shadow-[0_24px_40px_-28px_rgba(26,15,51,0.45)] ring-1 ring-ink-900/[0.07]">
              {/* Composer header */}
              <div aria-hidden="true" className="flex items-center gap-3 border-b border-[#efe7d6] bg-[#fbf6ea] px-5 py-3.5 sm:px-8">
                <span className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-gold-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                </span>
                <span className="text-[12px] font-bold uppercase tracking-[0.16em] text-ink-900/45">New message · the anatomy</span>
              </div>

              <div className="relative px-4 pb-8 pt-4 sm:px-8 sm:pb-10 sm:pt-6">
                {list && (
                  <ol data-rows className="relative">
                    {list.items.map((t, i) => {
                      const part = PART_TAGS[i] || PART_TAGS[PART_TAGS.length - 1];
                      const last = i === list.items.length - 1;
                      return (
                        <li key={i} data-row className="relative grid grid-cols-[36px_minmax(0,1fr)] gap-x-4 border-b border-dashed border-[#e9e0f5] py-5 last:border-b-0 sm:gap-x-6 sm:py-6">
                          {/* Margin rule from this circle's centre to the next one's, and the ink that fills it */}
                          {!last && (
                            <span aria-hidden="true" className="absolute left-[17px] top-[38px] -bottom-[38px] w-[2px] rounded-full bg-brand-100 sm:top-[42px] sm:-bottom-[42px]">
                              <span data-ink className="block h-full w-full origin-top rounded-full bg-gradient-to-b from-brand-600 to-gold-500" />
                            </span>
                          )}
                          <span data-num aria-hidden="true" className="relative z-[1] flex h-9 w-9 items-center justify-center rounded-full bg-brand-950 font-display text-[14px] font-extrabold text-gold-400 shadow-[0_0_0_5px_#fffdf8]">
                            {i + 1}
                          </span>
                          <div className="flex min-w-0 flex-col gap-3 pt-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                            <p className="relative min-w-0 pl-4 text-[16.5px] leading-[1.6] text-ink-900/85 sm:text-[18px]">
                              <span data-hl aria-hidden="true" className="absolute bottom-1 left-0 top-1 w-[3px] origin-top rounded-full bg-gradient-to-b from-gold-400 to-gold-200" />
                              <Rich text={t} />
                            </p>
                            <span data-tag aria-hidden="true" className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full bg-light-lavender px-3 py-1.5 text-[12px] font-bold text-brand-700 ring-1 ring-brand-100">
                              <Icon name={part.icon} className="h-3.5 w-3.5" />
                              {part.tag}
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                )}

                {/* Sign-off flourish */}
                <div aria-hidden="true" className="mt-4 flex items-center gap-3 pl-[52px] sm:pl-[60px]">
                  <svg viewBox="0 0 160 40" className="h-8 w-32 text-brand-600" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                    <path d="M4 28c10-18 22-22 24-12s-8 18-2 14 14-20 20-16-4 16 2 14 12-12 18-10 2 8 8 8 14-6 24-6 20 2 34-4" />
                  </svg>
                  <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-ink-900/35">short · specific · one role</span>
                </div>
              </div>
            </div>
          </div>

          {extra.length > 0 && (
            <div className="mt-8 space-y-6">
              {extra.map((b, i) => (
                <Block key={i} b={b} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 2. The route */

const STEP_ICONS = ['doc', 'target', 'mail', 'pen'];
const STEP_MARKS = ['READ', 'PICKED', 'DRAFTED', 'YOURS'];

function HowItDrafts({ s, n }) {
  const ref = useRef(null);
  const steps = pick(s, 'steps');
  const callouts = (s.blocks || []).filter((b) => b.type === 'callout');
  const rest = (s.blocks || []).filter((b) => b.type !== 'steps' && b.type !== 'callout');

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ scrollTrigger: { trigger: ref.current, start: 'top 72%', once: true } })
          .from(q('[data-head] > *'), { y: 40, opacity: 0, stagger: 0.1, duration: 1.2 })
          .from(q('[data-postcard]'), { y: 60, rotation: 5, opacity: 0, duration: 1.3 }, 0.15)
          .from(q('[data-card]'), { y: 70, opacity: 0, stagger: 0.1, duration: 1.2 }, 0.3);

        const track = q('[data-route]')[0];
        const svg = q('[data-route-svg]')[0];
        const line = q('[data-route-line]')[0];
        const plane = q('[data-plane]')[0];
        const stops = q('[data-stop]');
        const cards = q('[data-card]');
        if (!track || !line || !stops.length) return undefined;

        let len = 1;
        let marks = [];
        let progress = 0;
        let last = -1;
        const lit = cards.map(() => false);
        gsap.set(q('[data-mark]'), { scale: 1.8, opacity: 0, rotation: -30 });
        gsap.set(plane, { display: 'flex' });

        const light = (i, on) => {
          if (lit[i] === on) return;
          lit[i] = on;
          gsap.to(cards[i].querySelector('[data-mark]'), { scale: on ? 1 : 1.8, opacity: on ? 1 : 0, rotation: on ? -12 : -30, duration: on ? 0.55 : 0.3, ease: on ? 'back.out(2.2)' : 'power2.in' });
          gsap.to(stops[i].querySelector('[data-stop-on]'), { opacity: on ? 1 : 0, duration: 0.35 });
          gsap.to(stops[i], { scale: on ? 1.12 : 1, duration: 0.45, ease: 'back.out(2)' });
        };

        const build = () => {
          const box = track.getBoundingClientRect();
          const pts = stops.map((el) => {
            const r = el.getBoundingClientRect();
            return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top };
          });
          const wide = box.width > 900;
          const first = wide ? { x: 0, y: pts[0].y + 60 } : { x: pts[0].x, y: 0 };
          const all = [first, ...pts];
          let d = `M${all[0].x},${all[0].y}`;
          for (let i = 0; i < all.length - 1; i += 1) {
            const a = all[i];
            const b = all[i + 1];
            if (wide) {
              const dx = b.x - a.x;
              const lift = i % 2 ? 70 : -70;
              d += ` C${a.x + dx * 0.45},${a.y + lift} ${b.x - dx * 0.45},${b.y + lift} ${b.x},${b.y}`;
            } else {
              const dy = b.y - a.y;
              d += ` C${a.x + 24},${a.y + dy * 0.4} ${b.x + 24},${b.y - dy * 0.4} ${b.x},${b.y}`;
            }
          }
          svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
          line.setAttribute('d', d);
          len = line.getTotalLength();
          // Distance along the path at which each stop is reached (measured once per layout)
          marks = pts.map((p) => {
            let best = 0;
            let bestD = Infinity;
            for (let t = 0; t <= len; t += 6) {
              const pt = line.getPointAtLength(t);
              const dd = (pt.x - p.x) ** 2 + (pt.y - p.y) ** 2;
              if (dd < bestD) {
                bestD = dd;
                best = t;
              }
            }
            return best;
          });
          last = -1;
          render();
        };

        const px = gsap.quickSetter(plane, 'x', 'px');
        const py = gsap.quickSetter(plane, 'y', 'px');
        const pr = gsap.quickSetter(plane, 'rotation', 'deg');
        function render() {
          const at = Math.max(0.001, progress * len);
          if (Math.abs(at - last) < 0.5) return;
          last = at;
          const pt = line.getPointAtLength(at);
          const ahead = line.getPointAtLength(Math.min(len, at + 4));
          px(pt.x);
          py(pt.y);
          pr((Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180) / Math.PI);
          marks.forEach((m, i) => light(i, at >= m - 2));
        }

        const state = { p: 0 };
        gsap.to(state, {
          p: 1,
          ease: 'none',
          scrollTrigger: { trigger: track, start: 'top 70%', end: 'bottom 55%', scrub: 0.4 },
          onUpdate: () => {
            progress = state.p;
            render();
          },
        });
        ScrollTrigger.addEventListener('refresh', build);
        build();
        return () => ScrollTrigger.removeEventListener('refresh', build);
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id={s.id} aria-labelledby={`${s.id}-title`} className="relative scroll-mt-24 overflow-hidden bg-light-lavender py-16 sm:py-20 lg:pb-16">

      <div className="container-x relative">
        <div className="grid grid-cols-[minmax(0,1fr)] items-end gap-10 lg:grid-cols-12 lg:gap-14">
          <div data-head className="min-w-0 lg:col-span-7">
            <Chapter n={n} eyebrow={s.eyebrow} edge="border-light-lavender" />
            <CreativeHeading id={`${s.id}-title`} lines={s.h2} className={`mt-7 text-ink-950 ${h2Class}`} />
            {s.intro && (
              <p className="mt-6 max-w-[40rem] text-lead font-medium text-ink-900/70">
                <Rich text={s.intro} />
              </p>
            )}
          </div>

          {/* The callout as a postcard pinned to the board */}
          {callouts.map((c, i) => (
            <aside key={i} data-postcard className="relative min-w-0 lg:col-span-5">
              <div className="relative rotate-[1.2deg] rounded-[24px] bg-white p-6 shadow-[0_36px_70px_-40px_rgba(26,15,51,0.6)] ring-1 ring-ink-900/[0.06] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:rotate-0 sm:p-7">
                <Airmail className="absolute inset-x-0 top-0 h-1.5 rounded-t-[24px]" />
                <span aria-hidden="true" className="absolute -top-3 left-10 h-6 w-16 -rotate-6 rounded-sm bg-gold-200/80 shadow-sm" />
                <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-5">
                  <div className="min-w-0">
                    <p className="font-display text-[1.2rem] font-bold leading-snug tracking-[-0.02em] text-ink-950">{c.title}</p>
                    <p className="mt-2.5 text-[15.5px] leading-relaxed text-ink-900/75">
                      <Rich text={c.text} />
                    </p>
                  </div>
                  <div aria-hidden="true" className="hidden w-[92px] flex-col items-center gap-3 border-l border-dashed border-brand-200 pl-5 sm:flex">
                    <span className="flex h-[66px] w-[56px] rotate-3 items-center justify-center border-[5px] border-dotted border-white bg-brand-600 text-gold-300">
                      <Icon name="target" className="h-6 w-6" />
                    </span>
                    <span className="space-y-1.5">
                      <span className="block h-1 w-14 rounded-full bg-ink-900/10" />
                      <span className="block h-1 w-10 rounded-full bg-ink-900/10" />
                      <span className="block h-1 w-12 rounded-full bg-ink-900/10" />
                    </span>
                  </div>
                </div>
              </div>
            </aside>
          ))}
        </div>

        {steps && (
          <div data-route className="relative mt-14 lg:mt-20">
            <svg data-route-svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="jaeRoute" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#9b7fd4" />
                  <stop offset="60%" stopColor="#4b2e83" />
                  <stop offset="100%" stopColor="#f4b400" />
                </linearGradient>
              </defs>
                            <path data-route-line fill="none" stroke="url(#jaeRoute)" strokeWidth="2.5" strokeDasharray="2 10" strokeLinecap="round" />
            </svg>
            <span data-plane aria-hidden="true" className="pointer-events-none absolute left-0 top-0 z-[3] -ml-5 -mt-5 hidden h-10 w-10 items-center justify-center rounded-full bg-brand-950 text-gold-400 shadow-[0_0_0_6px_rgba(244,180,0,0.18)] will-change-transform">
              <PlaneIcon className="h-[18px] w-[18px] rotate-45" />
            </span>

            <ol className="relative grid grid-cols-[minmax(0,1fr)] gap-6 pl-14 sm:grid-cols-2 sm:pl-0 lg:grid-cols-4 lg:gap-6">
              {steps.items.map((st, i) => (
                <li key={i} className={`relative min-w-0 ${['lg:mt-0', 'lg:mt-24', 'lg:mt-6', 'lg:mt-28'][i % 4]}`}>
                  <span data-stop aria-hidden="true" className="absolute -left-14 top-7 z-[2] flex h-10 w-10 items-center justify-center rounded-full bg-white font-display text-[14px] font-extrabold text-brand-500 shadow-[0_0_0_5px_#f5f3ff] ring-1 ring-brand-200 sm:left-1/2 sm:top-0 sm:-ml-5 sm:-mt-5">
                    <span data-stop-on className="absolute inset-0 rounded-full bg-gold-400 opacity-0" />
                    <span className="relative">{i + 1}</span>
                  </span>
                  <div data-card className="group relative h-full overflow-hidden rounded-[26px] bg-white p-6 pt-8 shadow-[0_18px_34px_-26px_rgba(26,15,51,0.45)] ring-1 ring-ink-900/[0.06] sm:mt-6">
                    <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[5px] bg-[repeating-linear-gradient(135deg,#4b2e83_0_10px,transparent_10px_16px,#f4b400_16px_26px,transparent_26px_32px)] opacity-80" />
                    <span data-mark aria-hidden="true" className="absolute right-4 top-5 rounded-full border-2 border-brand-600/70 px-2.5 py-1 font-display text-[10.5px] font-extrabold tracking-[0.18em] text-brand-600/80">
                      {STEP_MARKS[i] || 'DONE'}
                    </span>
                    <Tile icon={STEP_ICONS[i] || 'spark'} className={`transition-transform duration-500 group-hover:-rotate-6 ${i === 3 ? 'bg-gold-400 text-ink-950' : 'bg-brand-950 text-gold-300'}`} />
                    <h3 className="mt-5 font-display text-[1.25rem] font-bold leading-snug tracking-[-0.02em] text-ink-950">{st.title}</h3>
                    <p className="mt-2.5 text-[15.5px] leading-relaxed text-ink-900/70">
                      <Rich text={st.text} />
                    </p>
                    <span aria-hidden="true" className="pointer-events-none absolute -bottom-8 -right-2 font-display text-[7rem] font-extrabold leading-none tracking-[-0.06em] text-brand-50 transition-colors duration-500 group-hover:text-gold-100">
                      {i + 1}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}

        {rest.length > 0 && (
          <div className="mt-10 space-y-6">
            {rest.map((b, i) => (
              <Block key={i} b={b} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 3. The draft */

// Which check-list note points at which part of the example: note 1 → subject and first sentence,
// note 2 → the proof paragraph, note 3 → the ask. Keys: 'meta' or the line index.
const ANCHORS = { meta: 0, 1: 0, 2: 1, 3: 2 };

// Annotation badge shown next to a part of the email
function PinBadge({ k }) {
  if (!(k in ANCHORS)) return null;
  return (
    <span data-pin-badge aria-hidden="true" className="absolute -left-7 top-[0.2em] flex h-5 w-5 items-center justify-center rounded-full bg-gold-400 font-display text-[10.5px] font-extrabold text-ink-950 shadow-[0_0_0_3px_#fff] sm:-left-9">
      {ANCHORS[k] + 1}
    </span>
  );
}

// Visual lines of an element's text, merged from its client rects, relative to `box`
function textLines(el, box) {
  const range = document.createRange();
  range.selectNodeContents(el);
  const lines = [];
  [...range.getClientRects()].forEach((r) => {
    if (r.width < 1) return;
    const line = lines.find((l) => Math.abs(l.top - r.top) < 4);
    if (line) {
      line.left = Math.min(line.left, r.left);
      line.right = Math.max(line.right, r.right);
      line.bottom = Math.max(line.bottom, r.bottom);
    } else lines.push({ top: r.top, bottom: r.bottom, left: r.left, right: r.right });
  });
  range.detach?.();
  return lines.map((l) => ({ x: l.left - box.left, y: l.top - box.top, w: l.right - l.left, h: l.bottom - l.top }));
}

function Example({ s, n }) {
  const ref = useRef(null);
  const ex = pick(s, 'example');
  const checks = pick(s, 'list');
  const callouts = (s.blocks || []).filter((b) => b.type === 'callout');
  const rest = (s.blocks || []).filter((b) => !['example', 'list', 'callout'].includes(b.type));
  const notes = checks?.items || [];

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();

      // Leader lines from each note to the part of the email it describes
      const wire = () => {
        const stage = q('[data-stage]')[0];
        const svg = q('[data-leaders]')[0];
        if (!stage || !svg) return;
        const box = stage.getBoundingClientRect();
        svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
        const wide = box.width > 900;
        q('[data-leader]').forEach((path) => {
          const from = q(`[data-anno="${path.dataset.from}"]`)[0];
          const to = q(`[data-target="${path.dataset.to}"]`)[0];
          if (!from || !to || !wide) {
            path.setAttribute('d', '');
            return;
          }
          const a = from.getBoundingClientRect();
          const b = to.getBoundingClientRect();
          const x1 = a.right - box.left + 4;
          const y1 = a.top + a.height / 2 - box.top;
          const x2 = b.left - box.left - 40;
          const y2 = b.top + 12 - box.top;
          const dx = (x2 - x1) * 0.55;
          path.setAttribute('d', `M${x1},${y1} C${x1 + dx},${y1} ${x2 - dx},${y2} ${x2},${y2}`);
          const dot = q(`[data-leader-dot="${path.dataset.to}"]`)[0];
          if (dot) {
            dot.setAttribute('cx', x2);
            dot.setAttribute('cy', y2);
          }
        });
      };

      // Desktop: pinned typewriter. The text stays real and static; strips the colour of the page
      // cover each visual line and shrink away (transform only) in typing steps, with a caret riding
      // their edge. Rebuilt when the width changes, since line breaks move.
      mm.add(PIN, (context) => {
        const pinEl = q('[data-pin]')[0];
        const body = q('[data-body]')[0];
        const caret = q('[data-caret]')[0];
        let scene = null;
        let covers = [];

        const build = () => {
          scene = gsap.context(() => {
            wire();
            const bb = body.getBoundingClientRect();
            const leaders = q('[data-leader]');
            const dots = q('[data-leader-dot]');
            gsap.set(leaders, { strokeDashoffset: 1.05 });
            gsap.set(dots, { scale: 0, transformOrigin: '50% 50%' });
            gsap.set(q('[data-anno]'), { opacity: 0.35 });
            gsap.set(q('[data-badge]'), { scale: 0.75 });
            gsap.set(q('[data-tick]'), { scale: 0 });
            gsap.set(q('[data-pin-badge]'), { scale: 0 });
            gsap.set(caret, { display: 'block', x: 0, y: 0 });

            const tl = gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: { trigger: pinEl, start: 'top top', end: '+=230%', pin: true, scrub: true, anticipatePin: 1, invalidateOnRefresh: true },
            });

            const STEP = 0.012;
            let t = 0.15;
            let first = true;
            const activate = (anno, target, at) => {
              const path = leaders.find((p) => p.dataset.to === target);
              const dot = dots.find((d) => d.dataset.leaderDot === target);
              const note = q(`[data-anno="${anno}"]`)[0];
              if (note) {
                tl.to(note, { opacity: 1, duration: 0.2 }, at)
                  .to(note.querySelector('[data-badge]'), { scale: 1, duration: 0.2, ease: 'back.out(2.5)' }, at)
                  .to(note.querySelector('[data-tick]'), { scale: 1, duration: 0.2, ease: 'back.out(2.5)' }, at + 0.05);
              }
              if (path) tl.to(path, { strokeDashoffset: 0, duration: 0.45, ease: 'power2.inOut' }, at);
              if (dot) tl.to(dot, { scale: 1, duration: 0.15, ease: 'back.out(3)' }, at + 0.4);
              tl.to(q(`[data-target="${target}"] [data-pin-badge]`), { scale: 1, duration: 0.2, ease: 'back.out(2.5)' }, at + 0.35);
            };

            q('[data-type]').forEach((el) => {
              const text = el.textContent || '';
              const lines = textLines(el, bb);
              const total = lines.reduce((a, l) => a + l.w, 0) || 1;
              const bg = el.dataset.cover || '#ffffff';
              lines.forEach((l) => {
                const chars = Math.max(2, Math.round((text.length * l.w) / total));
                const cover = document.createElement('span');
                cover.setAttribute('aria-hidden', 'true');
                Object.assign(cover.style, { position: 'absolute', left: `${l.x - 1}px`, top: `${l.y - 2}px`, width: `${l.w + 4}px`, height: `${l.h + 4}px`, background: bg, transformOrigin: '100% 50%', pointerEvents: 'none' });
                body.appendChild(cover);
                covers.push(cover);
                const d = chars * STEP;
                const ease = `steps(${chars})`;
                tl.fromTo(cover, { scaleX: 1 }, { scaleX: 0, duration: d, ease }, t);
                tl.fromTo(caret, { x: l.x, y: l.y + l.h / 2 - 10 }, { x: l.x + l.w, y: l.y + l.h / 2 - 10, duration: d, ease, immediateRender: first }, t);
                first = false;
                t += d;
              });
              const key = el.dataset.type;
              if (key in ANCHORS) activate(ANCHORS[key], key, t);
              t += 0.18;
            });

            tl.fromTo(q('[data-sticky-note]'), { y: 40, rotation: 10, opacity: 0 }, { y: 0, rotation: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.6)' }, t)
              .fromTo(q('[data-wait]'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3 }, t + 0.2)
              .to({}, { duration: 0.6 });
          }, ref);
        };

        const clear = () => {
          scene?.revert();
          covers.forEach((c) => c.remove());
          covers = [];
        };

        build();

        let width = window.innerWidth;
        let timer;
        const onResize = context.add(() => {
          if (window.innerWidth === width) return;
          width = window.innerWidth;
          clearTimeout(timer);
          timer = setTimeout(() => {
            clear();
            build();
            ScrollTrigger.refresh();
          }, 250);
        });
        window.addEventListener('resize', onResize);
        return () => {
          window.removeEventListener('resize', onResize);
          clearTimeout(timer);
          clear();
        };
      });

      // Reduced motion on desktop: the leader lines are simply drawn
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: reduce)', () => {
        wire();
        gsap.set(q('[data-leader]'), { strokeDashoffset: 0 });
        const onResize = () => wire();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
      });

      // Without the pin (phones, short screens): one simple reveal
      mm.add(`(max-width: 1023px) and ${MOTION_OK}, (max-height: 699px) and ${MOTION_OK}`, () => {
        gsap
          .timeline({ scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true } })
          .from(q('[data-left] > *'), { y: 36, opacity: 0, stagger: 0.08, duration: 1.1 })
          .from(q('[data-composer]'), { y: 60, opacity: 0, duration: 1.2 }, 0.3);
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id={s.id} aria-labelledby={`${s.id}-title`} className="relative scroll-mt-24 bg-white">
      <div data-pin className="relative overflow-hidden py-16 sm:py-20 lg:flex lg:min-h-[100svh] lg:items-center lg:py-0 lg:pb-8 lg:pt-[88px]">
        {/* Desk blotter: a faint dot grid and a warm lamp glow */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(75,46,131,0.11)_1px,transparent_1.2px)] [background-size:22px_22px] opacity-60" />
        <div aria-hidden="true" className="pointer-events-none absolute right-[10%] top-[16%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(closest-side,rgba(252,211,77,0.18),transparent)]" />

        <div data-stage className="container-x relative grid w-full grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-20 xl:gap-28">
          <svg data-leaders aria-hidden="true" className="pointer-events-none absolute inset-0 z-[3] hidden h-full w-full overflow-visible lg:block">
            {Object.keys(ANCHORS).map((k) => (
              <g key={k}>
                <path data-leader data-from={ANCHORS[k]} data-to={k} pathLength="1" strokeDasharray="1 2" fill="none" stroke="#6d4cb0" strokeWidth="1.6" strokeLinecap="round" />
                <circle data-leader-dot={k} r="4" fill="#6d4cb0" stroke="#fff" strokeWidth="2" />
              </g>
            ))}
          </svg>

          {/* Notes */}
          <div data-left className="relative min-w-0 lg:self-center">
            <Chapter n={n} eyebrow={s.eyebrow} edge="border-white" />
            <CreativeHeading id={`${s.id}-title`} lines={s.h2} className="mt-6 font-display text-[clamp(2rem,1.25rem+2.2vw,3.5rem)] font-extrabold leading-[1.04] tracking-[-0.035em] text-ink-950" />
            {s.intro && (
              <p className="mt-5 text-[clamp(1rem,0.95rem+0.25vw,1.15rem)] font-medium leading-relaxed text-ink-900/70">
                <Rich text={s.intro} />
              </p>
            )}
            {notes.length > 0 && (
              <ul className="mt-7 space-y-3">
                {notes.map((t, i) => (
                  <li key={i} data-anno={i} className="relative flex items-start gap-3.5 rounded-2xl border border-hairline bg-white p-3.5 pr-4 shadow-[0_14px_30px_-24px_rgba(26,15,51,0.6)]">
                    <span data-badge aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-400 font-display text-[12.5px] font-extrabold text-ink-950">
                      {i + 1}
                    </span>
                    <span className="min-w-0 flex-1 text-[15.5px] font-medium leading-snug text-ink-900/85">
                      <Rich text={t} />
                    </span>
                    <span data-tick aria-hidden="true" className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200">
                      <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* The composer */}
          <div className="relative min-w-0 lg:self-center">
            {ex && (
              <figure data-composer className="relative overflow-hidden rounded-[26px] bg-white shadow-[0_30px_50px_-30px_rgba(26,15,51,0.45)] ring-1 ring-ink-900/[0.08]">
                <figcaption className="flex items-center gap-3 border-b border-hairline bg-[#faf9ff] px-5 py-3">
                  <span className="flex gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-gold-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                  </span>
                  <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-brand-600">{ex.label}</span>
                  <span aria-hidden="true" className="ml-auto hidden items-center gap-1.5 text-[11.5px] font-semibold text-ink-900/45 sm:inline-flex">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                    Draft
                  </span>
                </figcaption>

                <div aria-hidden="true" className="flex items-center gap-3 border-b border-hairline px-5 py-2.5 text-[13px] sm:px-7">
                  <span className="w-14 shrink-0 font-semibold text-ink-900/45">To</span>
                  <span className="inline-flex min-w-0 items-center gap-2 rounded-full bg-light-lavender py-0.5 pl-0.5 pr-3 font-semibold text-ink-900/80">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white">D</span>
                    <span className="truncate">Dana Ruiz · Northwind Labs</span>
                  </span>
                </div>

                <div data-body className="relative px-5 pb-6 pt-4 sm:px-7 sm:pb-7">
                  <span data-caret aria-hidden="true" className="pointer-events-none absolute left-0 top-0 z-[2] hidden h-5 w-[2px] bg-brand-600 will-change-transform" />
                  {ex.meta && (
                    <div data-target="meta" className="relative ml-7 sm:ml-9">
                      <PinBadge k="meta" />
                      <p data-type="meta" data-cover="#f5f3ff" className="rounded-xl bg-brand-50 px-3.5 py-2 text-[14.5px] font-semibold text-brand-800">
                        <Rich text={ex.meta} />
                      </p>
                    </div>
                  )}
                  <div className="ml-7 mt-4 space-y-3 text-[15.5px] leading-relaxed text-ink-900/85 sm:ml-9">
                    {(ex.lines || []).map((l, i) => (
                      <div key={i} data-target={i} className="relative">
                        <PinBadge k={String(i)} />
                        <p data-type={l === '' ? undefined : i} className={l === '' ? 'h-1' : i === ex.lines.length - 1 ? 'font-display font-bold text-brand-700' : ''}>
                          <Rich text={l} />
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Composer toolbar: the Send button waits */}
                <div aria-hidden="true" className="flex items-center gap-3 border-t border-hairline bg-[#faf9ff] px-5 py-3 sm:px-7">
                  <span className="flex gap-1 text-ink-900/35">
                    {['B', 'I', 'U'].map((x) => (
                      <span key={x} className="flex h-7 w-7 items-center justify-center rounded-md font-display text-[12px] font-extrabold">
                        {x}
                      </span>
                    ))}
                  </span>
                  <span data-wait className="ml-auto text-[12px] font-semibold text-ink-900/50">Waits for you</span>
                  <span className="inline-flex items-center gap-1.5 rounded-xl bg-gold-400 px-4 py-2 text-[13px] font-bold text-ink-950 shadow-[0_6px_0_#d99a00]">
                    Send
                    <PlaneIcon className="h-3.5 w-3.5" />
                  </span>
                </div>
              </figure>
            )}

            {/* The warning as a sticky note on the desk */}
            {callouts.map((c, i) => (
              <aside key={i} data-sticky-note className="relative z-[4] mx-auto -mt-5 w-[min(100%,440px)] rotate-[-2deg] rounded-[6px] bg-gold-100 p-5 shadow-[0_18px_30px_-20px_rgba(138,90,0,0.55)] ring-1 ring-gold-300/60 sm:ml-6 lg:-ml-8 lg:-mt-8 lg:mr-auto">
                <span aria-hidden="true" className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-2 bg-white/70 shadow-sm ring-1 ring-ink-900/5" />
                <p className="flex items-center gap-2 font-display text-[1.02rem] font-bold text-ink-950">
                  <Icon name="shield" className="h-4 w-4 text-gold-700" />
                  {c.title}
                </p>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-900/80">
                  <Rich text={c.text} />
                </p>
              </aside>
            ))}
          </div>
        </div>
      </div>

      {rest.length > 0 && (
        <div className="container-x space-y-6 pb-16">
          {rest.map((b, i) => (
            <Block key={i} b={b} />
          ))}
        </div>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ 4. The handoff */

/** The big tactile Send key. Decorative: hidden from assistive tech, it presses but sends nothing. */
function SendButton() {
  const [count, setCount] = useState(0);
  const btn = useRef(null);
  const key = useRef(null);
  const plane = useRef(null);
  const burst = useRef(null);
  const calm = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const tilt = (e) => {
    const el = btn.current;
    if (!el || e.pointerType !== 'mouse' || calm()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) / r.width;
    const y = (e.clientY - (r.top + r.height / 2)) / r.height;
    gsap.to(el, { rotationY: x * 16, rotationX: -y * 18, x: x * 12, y: y * 8, duration: 0.6, ease: 'power3.out', transformPerspective: 900, overwrite: 'auto' });
  };
  const release = () => gsap.to(key.current, { y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)', overwrite: 'auto' });
  const leave = () => {
    release();
    if (btn.current) gsap.to(btn.current, { rotationY: 0, rotationX: 0, x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.45)', overwrite: 'auto' });
  };
  const press = () => {
    setCount((c) => c + 1);
    gsap.to(key.current, { y: 10, duration: 0.08, ease: 'power2.out', overwrite: 'auto' });
    if (calm()) return;
    gsap.fromTo(plane.current, { rotation: -25, x: -6, y: 4 }, { rotation: 0, x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)' });
    gsap.fromTo(burst.current, { scale: 0.8, opacity: 0.9 }, { scale: 1.35, opacity: 0, duration: 0.8, ease: 'expo.out' });
  };

  return (
    <div aria-hidden="true" className="relative flex flex-col items-center">
      <div ref={btn} onPointerMove={tilt} onPointerLeave={leave} onPointerDown={press} onPointerUp={release} className="group relative cursor-pointer select-none [touch-action:manipulation]">
        <span data-halo className="pointer-events-none absolute inset-0 -m-5 rounded-[40px] border-2 border-gold-400/35" />
        <span ref={burst} className="pointer-events-none absolute inset-0 rounded-[30px] border-[3px] border-gold-300 opacity-0" />
        {/* The base the key sits in */}
        <span className="absolute inset-x-0 -bottom-3 top-3 rounded-[30px] bg-gold-800" />
        <span
          ref={key}
          className="relative flex h-[96px] w-[min(72vw,300px)] items-center justify-center gap-4 rounded-[30px] bg-gradient-to-b from-gold-300 via-gold-400 to-gold-500 font-display text-[2.5rem] font-extrabold tracking-[-0.04em] text-ink-950 shadow-[inset_0_2px_0_rgba(255,255,255,0.7),inset_0_-6px_0_rgba(179,124,0,0.45)] sm:h-[108px] sm:text-[2.9rem]"
        >
          <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-[30px]">
            <span className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 animate-[sweep_3.6s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent motion-reduce:hidden" />
          </span>
          <span className="relative">Send</span>
          <span ref={plane} className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-ink-950 text-gold-400 transition-transform duration-300 group-hover:-rotate-6">
            <PlaneIcon className="h-7 w-7" strokeWidth={2.4} />
          </span>
        </span>
      </div>
      <p className="mt-7 flex min-h-[40px] max-w-[320px] items-center gap-2 rounded-full bg-white/[0.07] px-4 py-2 text-center text-[12.5px] font-semibold leading-snug text-brand-100 ring-1 ring-white/10">
        <span className={`h-2 w-2 shrink-0 rounded-full ${count ? 'bg-emerald-400' : 'bg-gold-400'}`} />
        {count ? 'That press was yours. (Nothing sends from this page.)' : 'Waits for your press. Try it.'}
      </p>
    </div>
  );
}

// The three stages of the handoff, left to right across the desk
const OWNER = [
  { side: "JobHunter's side", tag: 'JobHunter', icon: 'spark' },
  { side: 'Your side', tag: 'You', icon: 'user' },
  { side: 'Your side · final say', tag: 'You', icon: 'user' },
];

function DraftSheet() {
  return (
    <div className="relative w-[min(100%,270px)] rotate-[-3deg] rounded-[18px] bg-white p-4 text-ink-950 shadow-[0_24px_40px_-24px_rgba(0,0,0,0.8)]">
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-light-lavender px-2.5 py-1 text-[10.5px] font-bold text-brand-700">
          <Icon name="spark" className="h-3 w-3" />
          Drafted
        </span>
        <span className="text-[10.5px] font-semibold text-ink-900/45">Northwind Labs</span>
      </div>
      <p className="mt-2.5 text-[12.5px] font-bold">Senior Frontend Engineer</p>
      <span className="mt-2.5 block space-y-1.5">
        {[100, 92, 96, 70].map((w, i) => (
          <span key={i} data-bar className="block h-1.5 origin-left rounded-full bg-brand-100" style={{ width: `${w}%` }} />
        ))}
      </span>
    </div>
  );
}

function EditedSheet() {
  return (
    <div className="relative w-[min(100%,270px)] rotate-[2deg] rounded-[18px] bg-white p-4 text-ink-950 shadow-[0_24px_40px_-24px_rgba(0,0,0,0.8)]">
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-100 px-2.5 py-1 text-[10.5px] font-bold text-gold-800">
          <Icon name="pen" className="h-3 w-3" />
          Your edits
        </span>
        <span className="text-[10.5px] font-semibold text-ink-900/45">3 changes</span>
      </div>
      <p className="mt-2.5 text-[12.5px] font-bold">Senior Frontend Engineer</p>
      <span className="mt-2.5 block space-y-1.5">
        <span className="block h-1.5 w-full rounded-full bg-ink-900/10" />
        <span className="relative block h-1.5 w-[88%] rounded-full bg-ink-900/10">
          <span data-cross className="absolute -inset-x-1 top-1/2 h-[2px] origin-left -translate-y-1/2 rounded-full bg-rose-500" />
        </span>
        <span data-insert className="inline-block origin-left rounded-md bg-gold-200 px-1.5 py-0.5 text-[10.5px] font-bold text-ink-950">+ a detail only you know</span>
        <span className="block h-1.5 w-[64%] rounded-full bg-ink-900/10" />
      </span>
      <span data-pen className="absolute -right-4 -top-4 flex h-10 w-10 items-center justify-center rounded-full bg-gold-400 text-ink-950 shadow-[0_8px_16px_-6px_rgba(0,0,0,0.6)]">
        <Icon name="pen" className="h-4 w-4" strokeWidth={2.4} />
      </span>
    </div>
  );
}

function YouSendIt({ s, n }) {
  const ref = useRef(null);
  const cards = pick(s, 'cards');
  const paras = (s.blocks || []).filter((b) => b.type === 'p');
  const rest = (s.blocks || []).filter((b) => b.type !== 'cards' && b.type !== 'p');

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ scrollTrigger: { trigger: ref.current, start: 'top 72%', once: true } })
          .from(q('[data-copy]'), { y: 40, opacity: 0, stagger: 0.1, duration: 1.2 })
          .from(q('[data-stage]'), { y: 60, opacity: 0, stagger: 0.12, duration: 1.2 }, 0.25);
        gsap.from(q('[data-footer]'), { y: 30, opacity: 0, duration: 1.1, scrollTrigger: { trigger: q('[data-footer]')[0], start: 'top 92%', once: true } });

        // The halo around Send breathes while it waits, only while it is on screen
        gsap.fromTo(q('[data-halo]'), { scale: 0.97, opacity: 0.9 }, { scale: 1.06, opacity: 0.25, duration: 1.8, ease: 'sine.inOut', repeat: -1, yoyo: true, scrollTrigger: { trigger: q('[data-desk]')[0], start: 'top bottom', end: 'bottom top', toggleActions: 'play pause resume pause' } });
      });

      // Desktop: the envelope travels across the desk, from JobHunter's side into your hands
      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        const desk = q('[data-desk]')[0];
        const token = q('[data-token]')[0];
        const dots = q('[data-dot]');
        if (!desk || !token || dots.length < 2) return;
        // Layout offsets (not screen rects), so entrance transforms on the stages do not skew them
        const at = (i) => {
          let el = dots[i];
          let x = el.offsetWidth / 2;
          let y = el.offsetHeight / 2;
          while (el && el !== desk) {
            x += el.offsetLeft;
            y += el.offsetTop;
            el = el.offsetParent;
          }
          return { x, y };
        };
        const lastDot = dots.length - 1;
        gsap.set(token, { display: 'flex' });
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: desk, start: 'top 65%', end: 'bottom 70%', scrub: true, invalidateOnRefresh: true },
        });
        tl.fromTo(token, { x: () => at(0).x, y: () => at(0).y }, { x: () => at(lastDot).x, y: () => at(lastDot).y, duration: 1 }, 0)
          .fromTo(q('[data-token-draft]'), { opacity: 1 }, { opacity: 0, duration: 0.05 }, 0.24)
          .fromTo(q('[data-token-yours]'), { opacity: 0 }, { opacity: 1, duration: 0.05 }, 0.24)
          .fromTo(q('[data-handoff]'), { scale: 1 }, { scale: 1.12, duration: 0.06, yoyo: true, repeat: 1 }, 0.22);
        dots.forEach((d, i) => tl.fromTo(d.querySelector('[data-dot-on]'), { opacity: 0 }, { opacity: 1, duration: 0.04 }, (i / lastDot) * 0.98));
        tl.fromTo(q('[data-bar]'), { scaleX: 0 }, { scaleX: 1, stagger: 0.03, duration: 0.12 }, 0)
          .fromTo(q('[data-cross]'), { scaleX: 0 }, { scaleX: 1, duration: 0.08 }, 0.42)
          .fromTo(q('[data-insert]'), { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.08, ease: 'back.out(2)' }, 0.5)
          .fromTo(q('[data-pen]'), { rotation: -40, scale: 0.6 }, { rotation: 0, scale: 1, duration: 0.12, ease: 'back.out(2)' }, 0.38);
      });
    },
    { scope: ref }
  );

  const items = cards?.items || [];

  return (
    <section ref={ref} id={s.id} aria-labelledby={`${s.id}-title`} className="grain relative scroll-mt-24 overflow-hidden bg-brand-950 text-white">
      <Airmail className="absolute inset-x-0 top-0 z-[2]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_55%_at_80%_70%,rgba(244,180,0,0.14),transparent),radial-gradient(40%_50%_at_5%_15%,rgba(109,76,176,0.45),transparent),radial-gradient(30%_30%_at_60%_100%,rgba(155,127,212,0.22),transparent)]" />

      <div className="container-x relative z-[2] py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-[minmax(0,1fr)] items-end gap-8 lg:grid-cols-12 lg:gap-14 xl:gap-20">
          <div data-copy className="min-w-0 lg:col-span-7">
            <Chapter n={n} eyebrow={s.eyebrow} dark />
            <CreativeHeading id={`${s.id}-title`} lines={s.h2} tone="dark" className={`mt-7 text-white ${h2Class}`} />
          </div>
          {s.intro && (
            <p data-copy className="min-w-0 text-lead font-medium text-brand-100 lg:col-span-5">
              <Rich text={s.intro} tone="dark" />
            </p>
          )}
        </div>

        {/* The desk: JobHunter's side on the left, yours from the handoff line on */}
        {items.length > 0 && (
          <div data-desk className="relative mt-12 lg:mt-16">
            <ol className="relative grid grid-cols-[minmax(0,1fr)] overflow-hidden rounded-[32px] ring-1 ring-white/10 lg:grid-cols-3 lg:rounded-[40px]">
              {items.map((c, i) => {
                const owner = OWNER[i] || OWNER[OWNER.length - 1];
                const theirs = i === 0;
                const finale = i === items.length - 1;
                return (
                  <li
                    key={i}
                    data-stage
                    className={`relative flex min-w-0 flex-col px-6 pb-8 pt-7 sm:px-8 lg:px-9 lg:pb-10 ${
                      theirs ? 'bg-brand-500/[0.1]' : finale ? 'bg-[radial-gradient(90%_70%_at_50%_30%,rgba(244,180,0,0.2),rgba(255,255,255,0.03))]' : 'bg-white/[0.03]'
                    } ${i === 1 ? 'border-t-2 border-dashed border-gold-400/60 lg:border-l-2 lg:border-t-0' : ''} ${i > 1 ? 'border-t border-white/10 lg:border-l lg:border-t-0' : ''}`}
                  >
                    {i === 1 && (
                      <span data-handoff aria-hidden="true" className="absolute left-1/2 top-0 z-[2] inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-gold-400 px-3 py-1 text-[10.5px] font-extrabold uppercase tracking-[0.14em] text-ink-950 lg:left-0 lg:top-9 lg:translate-y-0">
                        <Icon name="shield" className="h-3.5 w-3.5" strokeWidth={2.4} />
                        Handoff
                      </span>
                    )}
                    <p aria-hidden="true" className={`flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] ${theirs ? 'text-brand-300' : 'text-gold-300'} ${i === 1 ? 'mt-3 lg:mt-0 lg:pl-16' : ''}`}>
                      <Icon name={owner.icon} className="h-3.5 w-3.5" />
                      {owner.side}
                    </p>

                    {/* The scene for this stage */}
                    <div aria-hidden="true" className="flex min-h-[220px] items-center justify-center py-6 lg:min-h-[250px]">
                      {finale ? <SendButton /> : theirs ? <DraftSheet /> : <EditedSheet />}
                    </div>

                    {/* The rail the envelope travels on (desktop) */}
                    <span aria-hidden="true" className="relative mb-6 hidden h-6 items-center lg:flex">
                      <span className="absolute inset-x-[-36px] top-1/2 h-px -translate-y-1/2 border-t-2 border-dashed border-white/15" />
                      <span data-dot className="relative mx-auto h-4 w-4 rounded-full bg-brand-900 ring-2 ring-white/25">
                        <span data-dot-on className="absolute inset-0 rounded-full bg-gold-400 opacity-0" />
                      </span>
                    </span>

                    <div className="mt-auto flex items-start gap-4">
                      <Tile icon={c.icon || 'spark'} className={finale ? 'bg-gold-400 text-ink-950' : theirs ? 'bg-white/10 text-brand-200 ring-1 ring-white/10' : 'bg-brand-500 text-white'} />
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <h3 className="font-display text-[1.3rem] font-bold leading-snug tracking-[-0.02em] text-white">{c.title}</h3>
                          <span aria-hidden="true" className={`rounded-full px-2 py-0.5 text-[10.5px] font-extrabold uppercase tracking-[0.14em] ${theirs ? 'bg-white/10 text-brand-200' : 'bg-gold-400 text-ink-950'}`}>
                            {owner.tag}
                          </span>
                        </div>
                        <p className="mt-1.5 text-[15.5px] leading-relaxed text-brand-100/90">
                          <Rich text={c.text} tone="dark" />
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>

            {/* The envelope that travels the rail */}
            <span data-token aria-hidden="true" className="pointer-events-none absolute left-0 top-0 z-[3] hidden h-9 -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full bg-white pl-1.5 pr-3 text-[12px] font-bold text-ink-950 shadow-[0_8px_18px_-8px_rgba(0,0,0,0.7)] will-change-transform">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-950 text-gold-400">
                <Icon name="mail" className="h-3.5 w-3.5" />
              </span>
              <span className="relative">
                <span data-token-draft>Draft</span>
                <span data-token-yours className="absolute inset-0 opacity-0">Yours</span>
              </span>
            </span>
          </div>
        )}
      </div>

      {(paras.length > 0 || rest.length > 0) && (
        <div className="relative z-[2] border-t border-white/10">
          <div data-footer className="container-x grid grid-cols-[minmax(0,1fr)] items-center gap-6 py-10 sm:py-12 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-10">
            <Postmark id="pm-footer" center="YOURS" label="JOBHUNTER · NEVER SENDS · " color="#f9c320" className="hidden w-[180px] opacity-80 lg:block" />
            <div className="min-w-0 space-y-4">
              {paras.map((b, i) => (
                <p key={i} className="max-w-[60rem] font-display text-[clamp(1.15rem,0.95rem+0.7vw,1.6rem)] font-semibold leading-[1.45] tracking-[-0.015em] text-white/90">
                  <Rich text={b.text} tone="dark" />
                </p>
              ))}
              {rest.map((b, i) => (
                <Block key={i} b={b} />
              ))}
            </div>
          </div>
          <Airmail />
        </div>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ Fallback for any other section */

function Plain({ s, n }) {
  return (
    <section id={s.id} aria-labelledby={`${s.id}-title`} className="relative scroll-mt-24 bg-[#fbf8f1] py-16 sm:py-20">
      <div className="container-x grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-5">
          <Chapter n={n} eyebrow={s.eyebrow} />
          <CreativeHeading id={`${s.id}-title`} lines={s.h2} className={`mt-7 text-ink-950 ${h2Class}`} />
          {s.intro && (
            <p className="mt-6 text-lead font-medium text-ink-900/70">
              <Rich text={s.intro} />
            </p>
          )}
        </div>
        <div className="min-w-0 space-y-6 lg:col-span-7">
          {(s.blocks || []).map((b, i) => (
            <Block key={i} b={b} />
          ))}
        </div>
      </div>
    </section>
  );
}

const SCENES = { 'what-to-include': WhatToInclude, 'how-it-drafts': HowItDrafts, example: Example, 'you-send-it': YouSendIt };

export default function ApplicationEmailStory({ page }) {
  return (page.sections || []).map((s, i) => {
    const Scene = SCENES[s.id] || Plain;
    return <Scene key={s.id} s={s} n={i + 1} />;
  });
}
