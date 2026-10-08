'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap';
import { SplitHeading } from '@/components/Reveal';
import { STEPS } from '@/content/site';

/*
 * Scroll journey: a curved gold path is drawn through the three step markers (built from their real
 * positions, so it fits any layout) while a glowing comet travels along it. Reaching a marker lights
 * the step: the marker turns gold, its big number fills and the floating UI on its photo pops in.
 * The UI chips show illustrative sample data.
 */

const BULLETS = [
  ['Keep several versions for different roles', 'Skills, experience and level read for you', 'Used to score every job you see'],
  ['LinkedIn, Indeed and Dice in one search', 'A match score on every job', 'A tailored application email, ready to send'],
  ['Four interview rounds to rehearse', 'Guided practice or a strict simulation', 'A readiness score after every session'],
];

const PHOTOS = [
  { src: '/images/how-upload.jpg', alt: 'Job seeker uploading a resume file to a laptop' },
  { src: '/images/how-find.jpg', alt: 'Job seeker browsing matched roles on a laptop at home' },
  { src: '/images/how-practice.jpg', alt: 'Job seeker rehearsing an interview answer with a headset on' },
];

const chip = 'absolute z-[2] rounded-2xl bg-white p-3 text-ink-950 shadow-[0_24px_50px_-20px_rgba(26,15,51,0.55)] ring-1 ring-ink-900/5';

function UploadChips() {
  return (
    <>
      <div data-chip className={`${chip} right-3 top-3 w-[min(250px,70%)] lg:-right-8 lg:top-10`}>
        <p className="flex items-center gap-2.5 text-sm font-bold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5" />
            </svg>
          </span>
          <span className="min-w-0 flex-1 truncate">resume_v3.pdf</span>
          <span className="text-xs font-bold text-emerald-600">Ready</span>
        </p>
        <span className="mt-2.5 block h-1.5 overflow-hidden rounded-full bg-brand-100">
          <span data-fill className="block h-full w-full origin-left rounded-full bg-gradient-to-r from-brand-500 to-gold-400" />
        </span>
      </div>
      <div data-chip className={`${chip} bottom-3 left-3 w-[min(270px,78%)] lg:-left-8 lg:bottom-12`}>
        <p className="text-[11px] font-bold text-brand-600">Skills found</p>
        <p className="mt-2 flex flex-wrap gap-1.5">
          {['React', 'TypeScript', 'Design systems', 'Leadership'].map((t) => (
            <span key={t} className="rounded-md bg-brand-50 px-2 py-0.5 text-xs font-bold text-brand-700">
              {t}
            </span>
          ))}
        </p>
      </div>
    </>
  );
}

function MatchChips() {
  const r = 17;
  const c = 2 * Math.PI * r;
  return (
    <>
      <div data-chip className={`${chip} left-3 top-3 flex w-[min(290px,80%)] items-center gap-3 lg:-left-8 lg:top-10`}>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 font-display font-extrabold text-brand-600">N</span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-bold">Senior Frontend Engineer</span>
          <span className="block truncate text-xs font-medium text-ink-900/60">Northwind Labs · LinkedIn</span>
        </span>
        <span className="relative h-11 w-11 shrink-0">
          <svg viewBox="0 0 40 40" className="h-full w-full -rotate-90" aria-hidden="true">
            <circle cx="20" cy="20" r={r} fill="none" strokeWidth="4" className="stroke-brand-100" />
            <circle data-ring cx="20" cy="20" r={r} fill="none" strokeWidth="4" strokeLinecap="round" stroke="#10b981" strokeDasharray={c} strokeDashoffset={c * 0.08} data-c={c} />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center font-display text-[11px] font-extrabold">92%</span>
        </span>
      </div>
      <div data-chip className={`${chip} bottom-3 right-3 flex items-center gap-2 bg-gold-400! px-4 text-sm font-bold lg:-right-8 lg:bottom-12`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="h-4 w-4" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
        Application email ready
      </div>
    </>
  );
}

function PracticeChips() {
  return (
    <>
      <div data-chip className={`${chip} right-3 top-3 w-[min(250px,72%)] bg-brand-950! text-white lg:-right-8 lg:top-10`}>
        <p className="flex items-center justify-between text-xs font-bold">
          <span>AI interviewer</span>
          <span className="flex items-center gap-1.5 rounded-full bg-rose-500 px-2 py-0.5 text-[10px]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            Live
          </span>
        </p>
        <span className="mt-3 flex h-8 items-center gap-[3px]" aria-hidden="true">
          {Array.from({ length: 22 }, (_, i) => (
            <span key={i} className="w-[4px] flex-1 origin-center animate-[eq_1.1s_ease-in-out_infinite] rounded-full bg-gradient-to-t from-brand-400 to-gold-400" style={{ animationDelay: `${(i % 7) * -0.15}s`, height: `${30 + ((i * 37) % 70)}%` }} />
          ))}
        </span>
      </div>
      <div data-chip className={`${chip} bottom-3 left-3 w-[min(230px,66%)] lg:-left-8 lg:bottom-12`}>
        <p className="flex items-end justify-between">
          <span className="text-[11px] font-bold text-brand-600">Interview readiness</span>
          <span className="font-display text-xl font-extrabold leading-none text-ink-950">
            7.8<span className="text-xs text-ink-900/50">/10</span>
          </span>
        </p>
        <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-brand-100">
          <span data-fill className="block h-full w-[78%] origin-left rounded-full bg-gradient-to-r from-brand-500 to-gold-400" />
        </span>
      </div>
    </>
  );
}

const CHIPS = [UploadChips, MatchChips, PracticeChips];

export default function HowItWorks() {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const track = q('[data-track]')[0];
        const svg = q('[data-path-svg]')[0];
        const base = q('[data-path-base]')[0];
        const line = q('[data-path-line]')[0];
        const comet = q('[data-comet]')[0];
        const nodes = q('[data-node]');
        const rows = q('[data-row]');
        let len = 1;
        let nodeY = [];
        let progress = 0;
        let lastAt = -1;
        const lit = rows.map(() => false);

        gsap.set(q('[data-chip]'), { scale: 0.7, opacity: 0, y: 16 });
        gsap.set(q('[data-fill]'), { scaleX: 0 });
        q('[data-ring]').forEach((el) => gsap.set(el, { strokeDashoffset: Number(el.dataset.c) }));
        gsap.set(q('[data-num-fill]'), { clipPath: 'inset(100% 0% 0% 0%)' });

        // Build a smooth path that passes through the centre of every marker
        const build = () => {
          const box = track.getBoundingClientRect();
          const pts = nodes.map((n) => {
            const r = n.getBoundingClientRect();
            return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top };
          });
          nodeY = pts.map((p) => p.y);
          const wide = box.width > 900;
          const swing = wide ? 90 : 26;
          const all = [{ x: pts[0].x, y: 0 }, ...pts, { x: pts[pts.length - 1].x, y: box.height }];
          let d = `M${all[0].x},${all[0].y}`;
          for (let i = 0; i < all.length - 1; i += 1) {
            const a = all[i];
            const b = all[i + 1];
            const dy = b.y - a.y;
            const s = (i % 2 ? -1 : 1) * swing;
            d += ` C${a.x + s},${a.y + dy * 0.4} ${b.x + s},${b.y - dy * 0.4} ${b.x},${b.y}`;
          }
          svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
          base.setAttribute('d', d);
          line.setAttribute('d', d);
          len = line.getTotalLength();
          line.style.strokeDasharray = `${len}`;
          lastAt = -1;
          render();
        };

        // Light up a step once the comet reaches its marker
        const light = (i, on) => {
          if (lit[i] === on) return;
          lit[i] = on;
          const row = rows[i];
          const node = nodes[i];
          gsap.to(node, { backgroundColor: on ? '#f4b400' : '#ffffff', color: on ? '#15121f' : '#9b7fd4', scale: on ? 1.12 : 1, duration: 0.5, ease: 'back.out(2)' });
          node.dataset.on = on ? 'true' : 'false';
          gsap.to(row.querySelector('[data-num-fill]'), { clipPath: on ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)', duration: 0.9, ease: 'expo.out' });
          gsap.to(row.querySelectorAll('[data-chip]'), { scale: on ? 1 : 0.7, opacity: on ? 1 : 0, y: on ? 0 : 16, stagger: 0.12, duration: on ? 0.8 : 0.3, ease: on ? 'back.out(1.8)' : 'power2.in' });
          gsap.to(row.querySelectorAll('[data-fill]'), { scaleX: on ? 1 : 0, duration: 1.2, delay: on ? 0.3 : 0, ease: 'expo.out' });
          row.querySelectorAll('[data-ring]').forEach((el) => {
            const c = Number(el.dataset.c);
            gsap.to(el, { strokeDashoffset: on ? c * 0.08 : c, duration: 1.4, delay: on ? 0.35 : 0, ease: 'expo.out' });
          });
          gsap.to(row.querySelectorAll('[data-bullet]'), { opacity: on ? 1 : 0.35, x: on ? 0 : -6, stagger: 0.07, duration: 0.5 });
        };

        const cx = gsap.quickSetter(comet, 'x', 'px');
        const cy = gsap.quickSetter(comet, 'y', 'px');
        // Skip frames where the comet has not visibly moved
        function render() {
          const at = Math.max(0.001, progress * len);
          if (Math.abs(at - lastAt) < 0.5) return;
          lastAt = at;
          line.style.strokeDashoffset = `${len - at}`;
          const pt = line.getPointAtLength(at);
          cx(pt.x);
          cy(pt.y);
          nodeY.forEach((y, i) => light(i, pt.y >= y - 4));
        }

        // Progress is a scrubbed tween, so the comet glides on GSAP's ticker instead of jumping with scroll events
        const state = { p: 0 };
        gsap.to(state, {
          p: 1,
          ease: 'none',
          scrollTrigger: { trigger: track, start: 'top 62%', end: 'bottom 62%', scrub: 0.5 },
          onUpdate: () => {
            progress = state.p;
            render();
          },
        });
        ScrollTrigger.addEventListener('refresh', build);
        build();

        // Photo cards swing in from their side, and the photo drifts inside its frame
        rows.forEach((row, i) => {
          const card = row.querySelector('[data-visual]');
          const side = i % 2 ? 1 : -1;
          gsap.from(card, {
            x: () => (window.innerWidth >= 1024 ? side * 120 : 0),
            y: 60,
            rotationY: () => (window.innerWidth >= 1024 ? side * -14 : 0),
            opacity: 0,
            transformPerspective: 1200,
            duration: 1.4,
            ease: 'expo.out',
            scrollTrigger: { trigger: row, start: 'top 82%', once: true },
          });
          gsap.fromTo(row.querySelector('[data-photo]'), { yPercent: -7 }, { yPercent: 7, ease: 'none', scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: 0.4 } });
          gsap.from(row.querySelectorAll('[data-text] > *'), { y: 40, opacity: 0, stagger: 0.08, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: row, start: 'top 78%', once: true } });
        });

        return () => ScrollTrigger.removeEventListener('refresh', build);
      });
    },
    { scope: root }
  );

  return (
    <section id="how" ref={root} aria-labelledby="how-title" className="relative overflow-hidden bg-white py-[60px] sm:py-32 lg:py-40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_30%_at_15%_20%,rgba(196,179,234,0.35),transparent),radial-gradient(40%_30%_at_85%_60%,rgba(252,211,77,0.16),transparent),radial-gradient(40%_30%_at_20%_95%,rgba(196,179,234,0.3),transparent)]" />

      <div className="container-x relative">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
            How it works
          </p>
          <SplitHeading id="how-title" className="font-display text-display font-extrabold text-ink-950">
            From resume to offer in three steps.
          </SplitHeading>
          <p className="mx-auto mt-6 max-w-[38rem] text-lead font-medium text-ink-900/65">Set up once, then go from search to interview in one place.</p>
        </div>

        <div data-track className="relative mx-auto mt-10 max-w-[1320px] sm:mt-24">
          {/* The path and the comet */}
          <svg data-path-svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible will-change-transform [transform:translateZ(0)]" preserveAspectRatio="none">
            <defs>
              <linearGradient id="howPath" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f4b400" />
                <stop offset="55%" stopColor="#9b7fd4" />
                <stop offset="100%" stopColor="#4b2e83" />
              </linearGradient>
            </defs>
            <path data-path-base fill="none" stroke="#e8e1f5" strokeWidth="2.5" strokeDasharray="2 10" strokeLinecap="round" />
            <path data-path-line fill="none" stroke="url(#howPath)" strokeWidth="4" strokeLinecap="round" />
          </svg>
          <span data-comet aria-hidden="true" className="pointer-events-none absolute left-0 top-0 z-[3] -ml-3 -mt-3 hidden h-6 w-6 rounded-full bg-gold-400 will-change-transform shadow-[0_0_0_6px_rgba(244,180,0,0.25),0_0_30px_8px_rgba(244,180,0,0.55)] [@media(prefers-reduced-motion:no-preference)]:block" />

          <ol className="relative space-y-[60px] sm:space-y-28 lg:space-y-36">
            {STEPS.map((s, i) => {
              const Chips = CHIPS[i];
              const flip = i % 2 === 1;
              return (
                <li key={s.n} data-row className="relative grid grid-cols-[44px_1fr] gap-x-5 gap-y-8 lg:grid-cols-[1fr_120px_1fr] lg:items-center lg:gap-x-6">
                  {/* Marker */}
                  <span className="relative row-span-2 flex justify-center lg:col-start-2 lg:row-span-1 lg:row-start-1">
                    <span
                      data-node
                      className="group relative z-[2] flex h-11 w-11 items-center justify-center rounded-full bg-white font-display text-lg font-extrabold text-brand-400 shadow-[0_0_0_6px_#fff,0_12px_30px_-10px_rgba(75,46,131,0.5)] ring-1 ring-brand-200 lg:h-16 lg:w-16 lg:text-2xl"
                    >
                      <span aria-hidden="true" className="absolute inset-0 hidden animate-pulse-ring rounded-full bg-gold-400/40 group-data-[on=true]:block" />
                      <span className="relative">{s.n}</span>
                    </span>
                  </span>

                  {/* Text */}
                  <div data-text className={`min-w-0 lg:row-start-1 ${flip ? 'lg:col-start-1 lg:text-right' : 'lg:col-start-3'}`}>
                    <p aria-hidden="true" className={`relative inline-block font-display text-[clamp(4rem,2.5rem+6vw,9rem)] font-extrabold leading-[0.85] tracking-[-0.06em] ${flip ? 'lg:ml-auto' : ''}`}>
                      <span className="text-transparent [-webkit-text-stroke:1.5px_#c4b3ea]">0{s.n}</span>
                      <span data-num-fill className="absolute inset-0 bg-gradient-to-b from-gold-300 to-gold-500 bg-clip-text text-transparent">
                        0{s.n}
                      </span>
                    </p>
                    <h3 className="mt-4 font-display text-[clamp(1.6rem,1.1rem+1.6vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink-950">{s.title}</h3>
                    <p className={`mt-4 max-w-[34rem] text-lead font-medium text-ink-900/65 ${flip ? 'lg:ml-auto' : ''}`}>{s.body}</p>
                    <ul className={`mt-6 space-y-2.5 ${flip ? 'lg:flex lg:flex-col lg:items-end' : ''}`}>
                      {BULLETS[i].map((b) => (
                        <li key={b} data-bullet className="flex items-center gap-3 text-[15px] font-semibold text-ink-900/80">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[11px] font-bold text-brand-600">✓</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Photo card with live UI */}
                  <div className={`col-start-2 lg:row-start-1 ${flip ? 'lg:col-start-3' : 'lg:col-start-1'}`}>
                    <div data-visual className="relative mx-auto w-full max-w-[560px]">
                      <div className="relative aspect-[5/4] overflow-hidden rounded-[30px] shadow-[0_40px_80px_-40px_rgba(26,15,51,0.6)] ring-1 ring-ink-900/5">
                        <div data-photo className="absolute -inset-y-[8%] inset-x-0 will-change-transform">
                          <Image src={PHOTOS[i].src} alt={PHOTOS[i].alt} fill sizes="(max-width: 1024px) 90vw, 560px" className="object-cover" />
                        </div>
                        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-950/35 via-transparent to-transparent" />
                      </div>
                      <Chips />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
