'use client';

import { useRef } from 'react';
import CreativeHeading from '@/components/CreativeHeading';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap';
import { Slate, H2_DARK } from './shared';

/*
 * Segment 3, "The corridor". The four rounds are four doors down one corridor. On desktop the
 * section pins and the scroll walks you along it: the track slides left, the floor lines drift
 * slower for depth, each door swings open as it reaches the middle of the screen and the round
 * counter ticks over. The last panel is the exit, with the reading links. Phones get the same doors
 * stacked, already open.
 */

function Door({ i, icon }) {
  return (
    <div aria-hidden="true" className="relative h-full overflow-hidden rounded-t-[26px] bg-[linear-gradient(180deg,#2a1650_0%,#1d1039_100%)]">
      {/* Wall light */}
      <div className="absolute inset-0 bg-[radial-gradient(45%_60%_at_50%_100%,rgba(244,180,0,0.18),transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
      {/* Room plate */}
      <span className="absolute left-1/2 top-4 -translate-x-1/2 rounded-md border border-gold-400/40 bg-brand-950/80 px-2.5 py-1 font-mono text-[11px] font-bold tracking-[0.18em] text-gold-300">
        ROOM {String(i + 1).padStart(2, '0')}
      </span>
      {/* Doorway */}
      <div className="absolute bottom-0 left-1/2 h-[74%] w-[min(58%,230px)] -translate-x-1/2 [perspective:900px]">
        <div className="absolute -inset-x-2.5 -top-2.5 bottom-0 rounded-t-[16px] border-x-[10px] border-t-[10px] border-brand-700/90" />
        {/* The lit room beyond */}
        <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(180deg,#fde68a_0%,#f9c320_45%,#d99a00_100%)]">
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(180deg,transparent,rgba(26,15,51,0.35))]" />
          <span className="absolute inset-0 flex items-center justify-center font-display text-[clamp(4rem,3rem+3vw,6.5rem)] font-extrabold leading-none tracking-[-0.06em] text-brand-950/85">
            {i + 1}
          </span>
          <span className="absolute bottom-3 left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-xl bg-brand-950 text-gold-300">
            <Icon name={icon} className="h-4 w-4" />
          </span>
        </div>
        {/* Door leaf, hinged on the left */}
        <div data-leaf className="absolute inset-0 origin-left bg-[linear-gradient(90deg,#3e2670,#311e59)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] [backface-visibility:hidden]" style={{ transform: 'rotateY(-74deg)' }}>
          <span className="absolute inset-x-[14%] top-[10%] h-[34%] rounded-md border border-white/10" />
          <span className="absolute inset-x-[14%] bottom-[10%] h-[38%] rounded-md border border-white/10" />
          <span className="absolute right-[12%] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-gold-400 shadow-[0_0_10px_rgba(249,195,32,0.8)]" />
        </div>
      </div>
    </div>
  );
}

export default function Corridor({ s, n }) {
  const root = useRef(null);
  const cards = s.blocks.find((b) => b.type === 'cards');
  const paras = s.blocks.filter((b) => b.type === 'p');
  const total = cards?.items.length || 0;

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        const pin = q('[data-cpin]')[0];
        const track = q('[data-ctrack]')[0];
        const count = q('[data-count]')[0];
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
        const doors = q('[data-door]');
        // Where each door is when the track has not moved yet; a door opens as its left edge travels
        // from 92% to 42% of the screen, expressed as timeline progress (track moves linearly)
        const lefts = doors.map((d) => d.getBoundingClientRect().left);
        const D = distance() || 1;
        const W = window.innerWidth;
        const at = (L, f) => Math.min(1, Math.max(0, (L - f * W) / D));

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: pin,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.4,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const r = Math.min(total, 1 + Math.floor(self.progress * total * 0.999));
              if (count && count.textContent !== String(r)) count.textContent = String(r);
            },
          },
        });
        tl.fromTo(track, { x: 0 }, { x: () => -distance(), duration: 1 }, 0)
          .fromTo(q('[data-cbar]'), { scaleX: 0.04 }, { scaleX: 1, duration: 1 }, 0)
          .fromTo(q('[data-floor]'), { xPercent: 0 }, { xPercent: -18, duration: 1 }, 0);
        doors.forEach((door, i) => {
          const s0 = at(lefts[i], 0.92);
          const s1 = Math.max(s0 + 0.04, at(lefts[i], 0.42));
          tl.fromTo(door.querySelector('[data-leaf]'), { rotateY: -4 }, { rotateY: -76, ease: 'power1.inOut', duration: s1 - s0, immediateRender: true }, s0);
        });
      });

      mm.add(`(max-width: 1023px) and ${MOTION_OK}`, () => {
        ScrollTrigger.batch(q('[data-door], [data-exit]'), {
          start: 'top 88%',
          once: true,
          onEnter: (els) => gsap.from(els, { y: 60, opacity: 0, stagger: 0.12, duration: 1.1 }),
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id={s.id} aria-labelledby={`${s.id}-title`} className="grain relative scroll-mt-24 overflow-hidden bg-brand-950 text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_30%_at_80%_0%,rgba(109,76,176,0.4),transparent)]" />

      <div className="container-x relative z-[2] pt-[72px] sm:pt-24 lg:pt-28">
        <Slate n={n} eyebrow={s.eyebrow} dark />
        <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <CreativeHeading id={`${s.id}-title`} lines={s.h2} tone="dark" className={`${H2_DARK} lg:col-span-7`} />
          {s.intro && (
            <p className="min-w-0 text-lead font-medium text-brand-100 lg:col-span-5">
              <Rich text={s.intro} tone="dark" />
            </p>
          )}
        </div>
      </div>

      <div data-cpin className="relative z-[2] overflow-hidden pb-[72px] pt-10 sm:pb-24 sm:pt-12 lg:flex lg:h-[100svh] lg:flex-col lg:justify-center lg:pb-0 lg:pt-0">
        {/* Corridor floor: converging lines, drifting slower than the doors */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-[34%] overflow-hidden lg:block">
          <svg data-floor viewBox="0 0 2400 300" preserveAspectRatio="none" className="absolute inset-y-0 left-0 h-full w-[160%]">
            {Array.from({ length: 25 }, (_, k) => (
              <line key={k} x1={k * 100} y1="0" x2={k * 100 - 600 + k * 50} y2="300" stroke="rgba(196,179,234,0.12)" strokeWidth="1.5" />
            ))}
            {[40, 110, 200].map((y) => (
              <line key={y} x1="0" y1={y} x2="2400" y2={y} stroke="rgba(196,179,234,0.08)" strokeWidth="1" />
            ))}
          </svg>
          <div className="absolute inset-0 bg-gradient-to-b from-brand-950 via-transparent to-brand-950/40" />
        </div>

        <ul data-ctrack className="container-x relative flex lg:will-change-transform flex-col gap-5 lg:w-max lg:max-w-none lg:flex-row lg:items-stretch lg:gap-8">
          {cards?.items.map((c, i) => (
            <li key={i} data-door className="group flex min-w-0 flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#21133e] shadow-[0_20px_40px_-30px_rgba(0,0,0,0.9)] transition-colors duration-500 hover:border-gold-400/40 lg:w-[min(32vw,500px)]">
              <div className="h-60 shrink-0 sm:h-72 lg:h-[clamp(260px,40svh,400px)]">
                <Door i={i} icon={c.icon || 'spark'} />
              </div>
              <div className="relative flex-1 p-6 sm:p-7">
                <p aria-hidden="true" className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-gold-300">
                  Round {i + 1} of {total}
                </p>
                <h3 className="mt-2 font-display text-[clamp(1.35rem,1.1rem+0.7vw,1.75rem)] font-bold leading-tight tracking-[-0.02em] text-white">{c.title}</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-brand-100">
                  <Rich text={c.text} tone="dark" />
                </p>
              </div>
            </li>
          ))}
          {paras.length > 0 && (
            <li data-exit className="relative flex min-w-0 flex-col justify-between gap-8 overflow-hidden rounded-[28px] border border-dashed border-gold-400/40 bg-[#21133e] bg-gradient-to-br from-gold-400/[0.14] via-transparent to-transparent p-6 sm:p-8 lg:w-[min(34vw,520px)]">
              <div>
                <span aria-hidden="true" className="inline-flex items-center gap-2 rounded-full bg-gold-400 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-ink-950">
                  <Icon name="book" className="h-3.5 w-3.5" />
                  Before you walk in
                </span>
                <div className="mt-6 space-y-4">
                  {paras.map((b, i) => (
                    <p key={i} className="text-[clamp(1.05rem,0.98rem+0.3vw,1.25rem)] font-medium leading-[1.7] text-white/85">
                      <Rich text={b.text} tone="dark" />
                    </p>
                  ))}
                </div>
              </div>
              <div aria-hidden="true" className="flex items-end justify-between gap-4">
                <span className="font-display text-[clamp(3.5rem,2.5rem+3vw,6rem)] font-extrabold leading-none tracking-[-0.06em] text-gold-400/20">EXIT</span>
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-400 text-ink-950 transition-transform duration-500 group-hover:translate-x-1">
                  <Icon name="arrow" className="h-6 w-6" strokeWidth={2.4} />
                </span>
              </div>
            </li>
          )}
        </ul>

        <div className="container-x relative mt-8 hidden items-center gap-5 lg:flex" aria-hidden="true">
          <span className="shrink-0 font-mono text-[12px] font-bold uppercase tracking-[0.16em] text-white/60">
            Room <span data-count className="text-gold-300">1</span> / {total}
          </span>
          <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/10">
            <div data-cbar className="h-full origin-left rounded-full bg-gradient-to-r from-brand-400 to-gold-400" />
          </div>
        </div>
      </div>
    </section>
  );
}
