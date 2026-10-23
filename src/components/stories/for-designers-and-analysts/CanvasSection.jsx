'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { Header, Handles, DOTS_DARK } from './shared';

/*
 * Frame 3, "Resumes" (dark band): an infinite design canvas. The versions table becomes four artboards,
 * one per resume version, each keeping the table's header labels beside its values (real text). On
 * desktop the canvas pins: it zooms in while the artboards fly from a scattered drag-and-drop mess into
 * a tidy grid one by one, each selected (handles) as it lands, with its layer lit in the layers panel.
 * The first paragraph sits on the canvas as a text layer; the email paragraph closes as an export bar.
 */

const ART = [
  { head: 'bg-brand-500', swatch: 'bg-brand-500' },
  { head: 'bg-gold-400', swatch: 'bg-gold-400' },
  { head: 'bg-emerald-500', swatch: 'bg-emerald-500' },
  { head: 'bg-ink-950', swatch: 'bg-rose-400' },
];
// Where each artboard starts in the scattered state (desktop motion only)
const SCATTER = [
  { x: -90, y: 70, rotation: -8 },
  { x: 120, y: -50, rotation: 6 },
  { x: -60, y: 110, rotation: 5 },
  { x: 100, y: -80, rotation: -7 },
];

function Illustration({ i }) {
  if (i === 0)
    return (
      <span className="flex h-full items-center justify-center gap-2">
        <span className="flex h-[52px] w-[30px] flex-col gap-1 rounded-[6px] bg-white p-1">
          <span className="h-2 rounded-[2px] bg-brand-300" />
          <span className="h-3 rounded-[2px] bg-gold-300" />
          <span className="h-1.5 rounded-[2px] bg-brand-100" />
          <span className="mt-auto h-2 rounded-full bg-brand-600" />
        </span>
        <span className="grid grid-cols-2 gap-1">
          {['bg-white', 'bg-gold-300', 'bg-brand-200', 'bg-white/60'].map((c) => (
            <span key={c} className={`h-5 w-7 rounded-[4px] ${c}`} />
          ))}
        </span>
      </span>
    );
  if (i === 1)
    return (
      <span className="flex h-full items-center justify-center gap-1.5">
        {['bg-white rotate-[-6deg]', 'bg-rose-200 rotate-[4deg]', 'bg-brand-100 rotate-[-2deg]'].map((c) => (
          <span key={c} className={`h-9 w-9 rounded-[4px] p-1 shadow-[0_6px_10px_-6px_rgba(0,0,0,0.5)] ${c}`}>
            <span className="block h-1 w-full rounded-full bg-ink-950/25" />
            <span className="mt-1 block h-1 w-2/3 rounded-full bg-ink-950/25" />
          </span>
        ))}
      </span>
    );
  if (i === 2)
    return (
      <span className="flex h-full items-end justify-center gap-1.5 pb-3">
        {[40, 65, 50, 85, 70, 95].map((h, k) => (
          <span key={k} className="w-3 rounded-t-[3px] bg-white" style={{ height: `${h * 0.42}px` }} />
        ))}
      </span>
    );
  return (
    <svg viewBox="0 0 120 50" className="h-full w-full p-2">
      {[
        [10, 40],
        [22, 34],
        [30, 38],
        [42, 27],
        [55, 30],
        [63, 21],
        [75, 18],
        [86, 22],
        [98, 11],
        [108, 9],
      ].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="2.6" fill="#fda4af" />
      ))}
      <path d="M6 42 L114 8" stroke="#f9c320" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export default function CanvasSection({ s }) {
  const root = useRef(null);
  const paras = s.blocks.filter((b) => b.type === 'p');
  const table = s.blocks.find((b) => b.type === 'table');
  const [h0, h1, h2] = table?.head || [];
  const rows = table?.rows || [];

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      // Pinned only where the whole canvas fits on screen
      mm.add(`(min-width: 1280px) and (min-height: 760px) and ${MOTION_OK}`, () => {
        const boards = q('[data-board]');
        const layers = q('[data-layer]');
        let active = -2;
        const setActive = (i) => {
          if (i === active) return;
          active = i;
          [boards, layers].forEach((set) => set.forEach((el, k) => (k === i ? el.setAttribute('data-active', '') : el.removeAttribute('data-active'))));
        };

        const tl = gsap.timeline({
          defaults: { ease: 'power3.inOut' },
          scrollTrigger: {
            trigger: q('[data-pin]')[0],
            start: 'center 55%',
            end: '+=200%',
            pin: true,
            scrub: 0.4,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => setActive(self.progress < 0.12 ? -1 : Math.min(3, Math.floor((self.progress - 0.12) / 0.2))),
          },
        });
        tl.fromTo(q('[data-zoom]'), { scale: 0.86 }, { scale: 1, duration: 0.8, ease: 'power2.out' }, 0);
        boards.forEach((b, i) => {
          tl.fromTo(b, { ...SCATTER[i], scale: 0.84 }, { x: 0, y: 0, rotation: 0, scale: 1, duration: 0.9 }, 0.4 + i * 0.8);
        });
        tl.to({}, { duration: 0.5 });

        return () => [...boards, ...layers].forEach((el) => el.removeAttribute('data-active'));
      });

      mm.add(`(max-width: 1279px) and ${MOTION_OK}, (max-height: 759px) and ${MOTION_OK}`, () => {
        const boards = q('[data-board]');
        gsap.set(boards, { y: 50, opacity: 0 });
        ScrollTrigger.batch(boards, { start: 'top 92%', once: true, onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, stagger: 0.12, duration: 1.1, ease: 'expo.out', overwrite: true }) });
      });

      mm.add(MOTION_OK, () => {
        gsap.from(q('[data-export] > *'), { y: 30, opacity: 0, stagger: 0.1, duration: 1.1, scrollTrigger: { trigger: q('[data-export]')[0], start: 'top 90%', once: true } });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id={s.id} aria-labelledby={`${s.id}-title`} className="grain relative scroll-mt-24 overflow-hidden bg-brand-950 py-16 text-white sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_40%_at_15%_0%,rgba(109,76,176,0.5),transparent),radial-gradient(40%_40%_at_85%_70%,rgba(244,180,0,0.1),transparent)]" />
      <div className="container-x relative z-[2]">
        <Header s={s} n={3} tone="dark" />
      </div>

      {/* The canvas */}
      <div data-pin className="relative z-[2] pt-12 sm:pt-14">
        <div className="container-x">
          <div className={`relative overflow-hidden rounded-[30px] bg-brand-900 ring-1 ring-white/10 lg:rounded-[36px] ${DOTS_DARK}`}>
            {/* Rulers */}
            <div aria-hidden="true" className="hidden h-7 items-center justify-between border-b border-white/10 bg-brand-950/70 pl-12 pr-6 text-[10px] font-semibold text-white/35 lg:flex">
              {[0, 200, 400, 600, 800, 1000, 1200, 1400].map((n) => (
                <span key={n}>{n}</span>
              ))}
            </div>
            <div aria-hidden="true" className="absolute bottom-0 left-0 top-7 hidden w-7 border-r border-white/10 bg-brand-950/70 lg:block" />

            <div data-zoom className="relative grid grid-cols-[minmax(0,1fr)] gap-6 p-4 sm:p-7 lg:grid-cols-12 lg:gap-8 lg:py-7 lg:pl-14 lg:pr-8">
              {/* Text layer + layers panel */}
              <div className="flex min-w-0 flex-col gap-4 lg:col-span-4">
                {paras[0] && (
                  <div className="relative rounded-[22px] bg-white/[0.07] p-5 ring-1 ring-white/15 sm:p-6">
                    <span aria-hidden="true" className="mb-3 inline-flex items-center gap-1.5 rounded-md bg-white/10 px-2 py-1 text-[11px] font-bold text-white/70">
                      <span className="font-display text-[13px] leading-none">T</span>
                      Text layer
                    </span>
                    <p className="text-[16.5px] leading-relaxed text-white/90">
                      <Rich text={paras[0].text} tone="dark" />
                    </p>
                  </div>
                )}
                <ul aria-hidden="true" className="rounded-[22px] bg-brand-950/70 p-3 ring-1 ring-white/10">
                  <li className="px-2 pb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white/45">Layers</li>
                  {rows.map((r, i) => (
                    <li key={r[0]} data-layer className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-[13.5px] font-semibold text-white/75 transition-colors duration-300 data-active:bg-white/10 data-active:text-white">
                      <span className={`h-3 w-3 shrink-0 rounded-[3px] ${ART[i % 4].swatch}`} />
                      <span className="truncate">{r[0]}</span>
                      <Icon name="doc" className="ml-auto h-3.5 w-3.5 shrink-0 text-white/40" />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Artboards: one per version, each value beside its header label */}
              <ol className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-5 sm:grid-cols-2 lg:col-span-8">
                {rows.map((r, i) => (
                  <li key={r[0]} data-board className="group relative flex min-w-0 flex-col">
                    <span aria-hidden="true" className="mb-1.5 flex items-center gap-1.5 px-1 text-[11.5px] font-bold text-white/55">
                      <span className="text-gold-300">#</span>
                      Resume version {i + 1}
                    </span>
                    <div className="relative flex flex-1 flex-col rounded-[18px] bg-white text-ink-950 shadow-[0_12px_22px_-14px_rgba(0,0,0,0.7)]">
                      <Handles className="rounded-[22px] border-gold-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-data-active:opacity-100" color="bg-white border-gold-400" />
                      <div aria-hidden="true" className={`h-[64px] overflow-hidden rounded-t-[18px] ${ART[i % 4].head}`}>
                        <Illustration i={i % 4} />
                      </div>
                      <div className="flex flex-1 flex-col p-4">
                        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand-500">{h0}</p>
                        <h3 className="mt-0.5 font-display text-[1.2rem] font-bold leading-snug tracking-[-0.02em]">{r[0]}</h3>
                        <div className="mt-2.5 grid grid-cols-[minmax(0,1fr)] gap-2 border-t border-hairline pt-2.5">
                          <p className="text-[14.5px] leading-snug text-ink-900/80">
                            <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-brand-500">{h1}</span>
                            <Rich text={String(r[1])} />
                          </p>
                          <p className="text-[14.5px] leading-snug text-ink-900/80">
                            <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-brand-500">{h2}</span>
                            <Rich text={String(r[2])} />
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Export: the application email */}
      {paras[1] && (
        <div className="container-x relative z-[2] pt-5 lg:pt-6">
          <div data-export className="grid grid-cols-[minmax(0,1fr)] items-center gap-5 rounded-[28px] bg-white p-6 text-ink-950 sm:p-8 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-10 lg:px-10">
            <span aria-hidden="true" className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-400 text-ink-950">
              <Icon name="mail" className="h-6 w-6" />
            </span>
            <p className="min-w-0 text-[16.5px] leading-relaxed text-ink-900/85 sm:text-[17.5px]">
              <Rich text={paras[1].text} />
            </p>
            <span aria-hidden="true" className="flex flex-wrap items-center gap-2 text-[13px] font-bold">
              <span className="rounded-lg bg-light-lavender px-3.5 py-2 text-brand-700">Version</span>
              <Icon name="arrow" className="h-4 w-4 text-ink-900/40" />
              <span className="rounded-lg bg-light-lavender px-3.5 py-2 text-brand-700">+ Portfolio link</span>
              <Icon name="arrow" className="h-4 w-4 text-ink-900/40" />
              <span className="rounded-lg bg-brand-950 px-3.5 py-2 text-gold-300">You send</span>
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
