'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useLenis } from 'lenis/react';
import { gsap, useGSAP, INTRO_EVENT } from '@/lib/gsap';

// Cards land on the pile as loading progresses; the offer card is held back until 100
// Loader-only photos, so none of them repeat elsewhere on the page
const CARDS = [
  { src: '/images/loader-1.jpg', step: 0, from: [-1, -0.4], pose: [-9, -7, 3] },
  { src: '/images/loader-2.jpg', step: 0, from: [1, -0.8], pose: [8, 6, -4] },
  { src: '/images/loader-3.jpg', step: 1, from: [-0.8, 1], pose: [-6, 4, -5] },
  { src: '/images/loader-4.jpg', step: 1, from: [1, 0.5], pose: [10, -4, 4] },
  { src: '/images/loader-5.jpg', step: 2, from: [0, 1], pose: [0, 0, 0] },
];
const LAST = CARDS.length - 1;
const STEPS = ['Find the role', 'Practice the interview', 'Land the offer'];
// Assets the loader and hero need; the counter only reaches 100 once these are ready
const CRITICAL = [...CARDS.map((c) => c.src), '/brand/favicon.png', '/images/hero-face-1.jpg', '/images/hero-face-2.jpg', '/images/hero-face-3.jpg'];

function waitForAssets() {
  const images = CRITICAL.map(
    (src) =>
      new Promise((resolve) => {
        const img = new window.Image();
        img.onload = resolve;
        img.onerror = resolve;
        img.src = src;
      })
  );
  const fonts = document.fonts?.ready ?? Promise.resolve();
  const timeout = new Promise((resolve) => setTimeout(resolve, 6000)); // never block the site for long
  return Promise.race([Promise.all([...images, fonts]), timeout]);
}

/**
 * Light-theme entry: a photo stack burst. Product photos fly in from every side and pile up over an
 * oversized wordmark while a real-progress odometer counts up. At 100 the offer photo lands square on
 * top, the whole pile fans out like a dealt hand, the cards are thrown up off the screen from the centre
 * outwards, and the sheet lifts away to reveal the hero.
 */
export default function Preloader() {
  const root = useRef(null);
  const [gone, setGone] = useState(false);
  const lenis = useLenis();
  const lenisRef = useRef(null);

  useEffect(() => {
    lenisRef.current = lenis;
    if (lenis && !window.__jhIntroDone) lenis.stop();
  }, [lenis]);

  useGSAP(
    () => {
      if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);

      const finish = () => {
        window.__jhIntroDone = true;
        window.dispatchEvent(new Event(INTRO_EVENT));
        lenisRef.current?.start();
      };

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        finish();
        setGone(true);
        return;
      }

      const q = gsap.utils.selector(root);
      const cards = q('[data-card]');
      const imgs = q('[data-card-img]');
      const stepEls = q('[data-step]');
      const hundreds = q('[data-digit]')[0];
      const digitTo = q('[data-digit]').map((el) => gsap.quickTo(el, 'yPercent', { duration: 0.75, ease: 'power3.out' }));

      gsap.set(q('[data-stage]'), { visibility: 'visible' });
      gsap.set(cards, { autoAlpha: 0 });

      // Each card flies in from its own side, spinning, and settles into its place on the pile
      let shown = -1;
      const land = (i) => {
        const { from, pose } = CARDS[i];
        const final = i === LAST;
        gsap.fromTo(
          cards[i],
          { autoAlpha: 1, xPercent: from[0] * 260, yPercent: from[1] * 220, rotation: from[0] * 70 + from[1] * 25, scale: 1.25 },
          { xPercent: pose[0], yPercent: pose[1], rotation: pose[2], scale: 1, duration: final ? 1.1 : 1.25, ease: final ? 'expo.out' : 'power4.out' }
        );
        gsap.fromTo(imgs[i], { scale: 1.4 }, { scale: 1, duration: 1.6, ease: 'expo.out' });
        // The pile reacts to each landing with a small settle
        if (i > 0) gsap.fromTo(q('[data-pile]'), { scale: 0.985 }, { scale: 1, duration: 0.6, ease: 'back.out(3)', delay: 0.35 });
      };

      const progress = { p: 0 };
      const render = () => {
        const p = progress.p;
        const v = Math.round(p);
        String(v).padStart(3, '0').split('').forEach((d, i) => digitTo[i](-Number(d) * 10));
        hundreds.style.opacity = v >= 100 ? '1' : '0.14';
        gsap.set(q('[data-bar]'), { scaleX: p / 100 });

        const target = p >= 100 ? LAST : Math.min(LAST - 1, Math.floor((p / 100) * LAST));
        while (shown < target) land(++shown);

        const step = p >= 100 ? 2 : CARDS[Math.max(0, target)].step;
        stepEls.forEach((el, i) => el.setAttribute('data-state', i < step ? 'done' : i === step ? 'on' : 'off'));
      };

      // 1. Entrance
      const intro = gsap.timeline();
      intro
        .from(q('[data-char]'), { yPercent: 118, rotate: 6, stagger: { each: 0.04, from: 'center' }, duration: 1.3, ease: 'expo.out' }, 0.1)
        .from(q('[data-ui]'), { y: 18, opacity: 0, stagger: 0.06, duration: 1, ease: 'expo.out' }, 0.5)
        .from(q('[data-rule]'), { scaleX: 0, duration: 1.4, ease: 'expo.inOut' }, 0.4)
        .add(render, 0.45);

      // Pointer: the pile tilts in 3D, the wordmark drifts the other way (desktop)
      const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      gsap.set(q('[data-pile]'), { transformPerspective: 1000 });
      const rx = gsap.quickTo(q('[data-pile]'), 'rotationX', { duration: 1.2, ease: 'power3.out' });
      const ry = gsap.quickTo(q('[data-pile]'), 'rotationY', { duration: 1.2, ease: 'power3.out' });
      const wx = gsap.quickTo(q('[data-word]'), 'x', { duration: 1.4, ease: 'power3.out' });
      const move = (e) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        ry(nx * 16);
        rx(-ny * 14);
        wx(nx * -30);
      };
      if (fine) window.addEventListener('pointermove', move);

      // 2. Progress eases towards 90 on its own, the last stretch waits for the real assets
      const creep = gsap.to(progress, { p: 90, duration: 3, ease: 'power1.out', delay: 0.45, onUpdate: render });
      const minTime = new Promise((resolve) => setTimeout(resolve, 3500));

      // 3. Exit
      let exit;
      let cancelled = false;
      Promise.all([waitForAssets(), minTime]).then(() => {
        if (cancelled) return;
        creep.kill();

        // Fan positions: spread across the screen in an arc, sized to fit the viewport
        const cardW = cards[0].offsetWidth || 1;
        const spread = Math.min(70, ((window.innerWidth * 0.42) / cardW) * 100 / (LAST / 2));
        // The offer card takes the centre slot, the others fill in either side of it
        const fan = (i) => {
          const slot = i === LAST ? LAST / 2 : i < LAST / 2 ? i : i + 1;
          const k = slot - LAST / 2;
          return { x: k * spread, y: Math.abs(k) * Math.abs(k) * 2.2, r: k * 7 };
        };

        exit = gsap.timeline({ onComplete: () => setGone(true) });
        exit
          .to(progress, { p: 100, duration: 0.7, ease: 'power2.inOut', onUpdate: render })
          .addLabel('out', '+=0.75')
          .add(() => {
            window.removeEventListener('pointermove', move);
            gsap.killTweensOf(q('[data-pile]'));
            gsap.to(q('[data-pile]'), { rotationX: 0, rotationY: 0, scale: 1, duration: 0.6, ease: 'power3.out' });
          }, 'out-=0.3')
          // The pile fans out like a dealt hand while the wordmark lifts away
          .to(
            cards,
            {
              xPercent: (i) => fan(i).x,
              yPercent: (i) => fan(i).y,
              rotation: (i) => fan(i).r,
              scale: 0.92,
              duration: 0.9,
              ease: 'expo.inOut',
            },
            'out'
          )
          .to(q('[data-char]'), { yPercent: -118, stagger: { each: 0.025, from: 'edges' }, duration: 0.75, ease: 'expo.in' }, 'out')
          .to(q('[data-ui]'), { y: -14, opacity: 0, stagger: 0.03, duration: 0.5, ease: 'power3.in' }, 'out')
          .to(q('[data-rule]'), { scaleX: 0, transformOrigin: '100% 50%', duration: 0.6, ease: 'expo.in' }, 'out')
          .to(q('[data-bar]'), { opacity: 0, duration: 0.4 }, 'out')
          // Then the cards are thrown up and off the screen, from the centre outwards
          .to(
            cards,
            {
              yPercent: (i) => fan(i).y - 520,
              rotation: (i) => fan(i).r * 2.4,
              duration: 0.85,
              stagger: { each: 0.06, from: 'center' },
              ease: 'expo.in',
            },
            'out+=1'
          )
          // Sheet lifts and the hero plays in underneath
          .add(finish, 'out+=1.6')
          .to(root.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.1, ease: 'expo.inOut' }, 'out+=1.55');
      });

      return () => {
        cancelled = true;
        window.removeEventListener('pointermove', move);
        intro.kill();
        creep.kill();
        exit?.kill();
      };
    },
    { scope: root }
  );

  if (gone) return null;

  const chars = (text, className = '') =>
    text.split('').map((ch, i) => (
      <span key={i} className="inline-block overflow-hidden pb-[0.06em] align-bottom">
        <span data-char className={`inline-block ${className}`}>
          {ch === ' ' ? ' ' : ch}
        </span>
      </span>
    ));

  return (
    <div ref={root} className="grain-ink fixed inset-0 z-[90] overflow-hidden bg-[#faf9ff] text-ink-950" style={{ clipPath: 'inset(0% 0% 0% 0%)' }} aria-hidden="true">
      {/* Soft light */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[20%] -top-[30%] h-[85vmax] w-[85vmax] bg-[radial-gradient(closest-side,rgba(196,179,234,0.45),transparent)]" />
        <div className="absolute -bottom-[35%] -right-[15%] h-[80vmax] w-[80vmax] bg-[radial-gradient(closest-side,rgba(252,211,77,0.24),transparent)]" />
      </div>

      {/* Hidden until the timeline has set its starting states, so nothing flashes before hydration */}
      <div data-stage className="invisible absolute inset-0">
        {/* Corners */}
        <div className="container-x absolute inset-x-0 top-0 z-[3] flex items-center justify-between pt-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-900/60 sm:pt-8 sm:text-xs">
          <p data-ui className="flex items-center gap-2.5 text-ink-950">
            <span className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-white shadow-[0_6px_16px_-6px_rgba(26,15,51,0.45)]">
              <Image src="/brand/favicon.png" alt="" width={40} height={40} className="h-5 w-5 object-contain" />
            </span>
            Job Hunter
          </p>
          <p data-ui className="hidden sm:block">AI career platform</p>
          <p data-ui>Loading</p>
        </div>

        {/* Wordmark behind the pile */}
        <div className="absolute inset-0 flex items-center justify-center">
          <p data-word className="whitespace-nowrap font-display text-[clamp(3.25rem,0.6rem+11.5vw,17rem)] font-extrabold leading-none tracking-[-0.055em]">
            {chars('Job ')}
            {chars('Hunter', 'text-brand-600')}
          </p>
        </div>

        {/* The pile */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div data-pile className="relative aspect-[4/5] w-[clamp(118px,13vw,240px)]">
            {CARDS.map((c, i) => (
              <div
                key={c.src}
                data-card
                className="absolute inset-0 rounded-[clamp(14px,1.4vw,22px)] bg-white p-[clamp(5px,0.45vw,8px)] shadow-[0_40px_70px_-30px_rgba(26,15,51,0.55),0_0_0_1px_rgba(26,15,51,0.05)]"
                style={{ zIndex: i + 1 }}
              >
                <div data-card-inner className="relative h-full w-full overflow-hidden rounded-[clamp(10px,1vw,16px)]">
                  <div data-card-img className="absolute inset-0">
                    <Image src={c.src} alt="" fill sizes="(max-width: 768px) 60vw, 100vw" loading="eager" className="object-cover" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="absolute inset-x-0 bottom-0 z-[3]">
          <div className="container-x">
            <div data-rule className="h-px w-full origin-left bg-ink-900/12" />
            <div className="flex items-end justify-between gap-6 pb-5 pt-5 sm:pb-8">
              <ol data-ui className="flex flex-col gap-1.5 text-xs font-semibold sm:flex-row sm:gap-8 sm:text-sm">
                {STEPS.map((s, i) => (
                  <li
                    key={s}
                    data-step
                    data-state="off"
                    className="group flex items-center gap-2.5 text-ink-900/30 transition-colors duration-500 data-[state=done]:text-ink-900/55 data-[state=on]:text-ink-950"
                  >
                    <span className="font-display tabular-nums text-brand-600/50 transition-colors duration-500 group-data-[state=on]:text-brand-600">0{i + 1}</span>
                    <span className="relative">
                      {s}
                      <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-gold-500 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-data-[state=on]:scale-x-100" />
                    </span>
                  </li>
                ))}
              </ol>

              <div data-ui className="flex items-start font-display text-[clamp(2.75rem,1.6rem+4.5vw,7rem)] font-light leading-none tracking-[-0.06em] text-ink-950">
                {[0, 1, 2].map((c) => (
                  <span key={c} className={`relative inline-block h-[1em] overflow-hidden tabular-nums ${c === 0 ? 'transition-opacity duration-500' : ''}`}>
                    <span data-digit className="block">
                      {Array.from({ length: 10 }, (_, d) => (
                        <span key={d} className="block h-[1em]">
                          {d}
                        </span>
                      ))}
                    </span>
                  </span>
                ))}
                <span className="ml-[0.06em] mt-[0.12em] text-[0.36em] font-semibold text-brand-600">%</span>
              </div>
            </div>
          </div>
          <div className="h-[2px] w-full">
            <div data-bar className="h-full origin-left scale-x-0 bg-gradient-to-r from-brand-600 via-brand-500 to-gold-500" />
          </div>
        </div>

      </div>
    </div>
  );
}
