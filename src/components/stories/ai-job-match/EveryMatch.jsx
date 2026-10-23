'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { Block } from '@/components/page/Blocks';
import { BoardMark, SectionHeading } from './shared';

/*
 * Chapter 4, "Every match": the anatomy of one result. The five things you see for every match are real
 * buttons; hovering, focusing or pressing one lights the matching part of the sample match card, and on
 * desktop scrolling past the list walks through them in turn until you pick one yourself. The closing
 * paragraph sits on a hand-off strip that ends with you. The match card is sample data, decorative.
 */

const STEPS_AFTER = [
  { icon: 'doc', t: 'Add skills you have' },
  { icon: 'mail', t: 'Draft the email' },
  { icon: 'user', t: 'You send it' },
];

function Region({ i, className = '', children }) {
  return (
    <div
      data-region
      data-on={i === 0 ? 'true' : 'false'}
      className={`group/region relative isolate rounded-2xl bg-white p-3 opacity-60 ring-1 ring-hairline transition-[opacity,transform] duration-500 data-[on=true]:z-[2] data-[on=true]:scale-[1.02] data-[on=true]:opacity-100 sm:p-3.5 ${className}`}
    >
      <span className="pointer-events-none absolute inset-0 -z-[1] rounded-2xl bg-gold-50 opacity-0 ring-2 ring-gold-400 transition-opacity duration-500 group-data-[on=true]/region:opacity-100" />
      <span className="absolute -left-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-950 font-display text-[11px] font-extrabold text-gold-300 group-data-[on=true]/region:bg-gold-400 group-data-[on=true]/region:text-ink-950">{i + 1}</span>
      {children}
    </div>
  );
}

function MatchCard() {
  const r = 24;
  const c = 2 * Math.PI * r;
  return (
    <div data-tilt className="relative rounded-[30px] bg-white/70 p-3 shadow-[0_60px_120px_-60px_rgba(26,15,51,0.7)] ring-1 ring-brand-200 sm:p-4">
      <div aria-hidden="true" className="space-y-3 rounded-[24px] bg-light-lavender p-3 sm:p-4">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
          <Region i={0}>
            <div className="flex items-center gap-3">
              <BoardMark board="LinkedIn" size="h-10 w-10" text="text-[14px]" />
              <span className="min-w-0">
                <span className="block truncate text-[14.5px] font-bold text-ink-950">Senior Frontend Engineer</span>
                <span className="block truncate text-[12px] font-medium text-ink-900/60">Northwind Labs · Austin, TX</span>
              </span>
            </div>
            <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-brand-950 px-2.5 py-1 text-[11px] font-bold text-gold-300">
              Open listing on LinkedIn
              <Icon name="arrow" className="h-3 w-3 -rotate-45" strokeWidth={2.6} />
            </span>
          </Region>
          <Region i={1} className="flex flex-col items-center justify-center">
            <span className="relative block h-[60px] w-[60px]">
              <svg viewBox="0 0 60 60" className="h-full w-full -rotate-90">
                <circle cx="30" cy="30" r={r} fill="none" strokeWidth="6" className="stroke-brand-100" />
                <circle cx="30" cy="30" r={r} fill="none" strokeWidth="6" strokeLinecap="round" stroke="#10b981" strokeDasharray={c.toFixed(2)} strokeDashoffset={(c * 0.08).toFixed(2)} />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-display text-[16px] font-extrabold text-ink-950">92</span>
            </span>
            <span className="mt-1 text-[10.5px] font-bold uppercase tracking-[0.12em] text-ink-900/50">of 100</span>
          </Region>
        </div>

        <Region i={2}>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-600">Why it scored 92</p>
          <ul className="mt-2 space-y-1.5 text-[13px] font-medium text-ink-900/80">
            <li className="flex gap-2">
              <span className="mt-[3px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700">✓</span>
              Six years of React and TypeScript match the core stack
            </li>
            <li className="flex gap-2">
              <span className="mt-[3px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700">✓</span>
              Design system work lines up with the team&apos;s focus
            </li>
          </ul>
        </Region>

        <div className="grid gap-3 sm:grid-cols-2">
          <Region i={3}>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-600">Missing skills</p>
            <p className="mt-2 flex flex-wrap gap-1.5">
              {['GraphQL', 'Storybook'].map((t) => (
                <span key={t} className="rounded-lg bg-gold-100 px-2 py-0.5 text-[12px] font-bold text-gold-800">
                  {t}
                </span>
              ))}
            </p>
          </Region>
          <Region i={4}>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-600">Recruiter, public</p>
            <p className="mt-2 flex items-center gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 font-display text-[11px] font-bold text-white">SK</span>
              <span className="min-w-0">
                <span className="block truncate text-[13px] font-bold text-ink-950">Sarah K.</span>
                <span className="block truncate text-[11.5px] font-medium text-ink-900/55">Technical Recruiter</span>
              </span>
            </p>
          </Region>
        </div>
      </div>
    </div>
  );
}

export default function EveryMatch({ s, n }) {
  const root = useRef(null);
  const touched = useRef(false);
  const shown = useRef(0);
  const list = s.blocks.find((b) => b.type === 'list');
  const after = s.blocks.find((b) => b.type === 'p');
  const others = s.blocks.filter((b) => b !== list && b !== after);
  // Highlight one part: DOM attributes only, so scrolling never re-renders React
  const show = (i) => {
    if (i === shown.current || !root.current) return;
    shown.current = i;
    root.current.querySelectorAll('[data-pick-btn]').forEach((b, k) => {
      b.dataset.on = k === i ? 'true' : 'false';
      b.setAttribute('aria-pressed', k === i ? 'true' : 'false');
    });
    root.current.querySelectorAll('[data-region]').forEach((r, k) => (r.dataset.on = k === i ? 'true' : 'false'));
  };
  const pick = (i) => {
    touched.current = true;
    show(i);
  };

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ scrollTrigger: { trigger: q('[data-items]')[0], start: 'top 85%', once: true } })
          .from(q('[data-item]'), { x: -40, opacity: 0, stagger: 0.08, duration: 1.1 }, 0)
          .from(q('[data-card]'), { y: 70, opacity: 0, duration: 1.4 }, 0.1);
        gsap
          .timeline({ scrollTrigger: { trigger: q('[data-handoff]')[0], start: 'top 88%', once: true } })
          .from(q('[data-handoff] > *'), { y: 40, opacity: 0, stagger: 0.1, duration: 1.1 }, 0)
          .from(q('[data-flow-step]'), { scale: 0.6, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'back.out(2)' }, 0.3);
      });
      // Desktop: scrolling past the list walks the card through its five parts until a visitor picks one
      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        ScrollTrigger.create({
          trigger: q('[data-items]')[0],
          start: 'top 65%',
          end: 'bottom 45%',
          onUpdate: (self) => {
            if (!touched.current) show(Math.min(4, Math.floor(self.progress * 5)));
          },
        });
      });
    },
    { scope: root }
  );

  // A gentle tilt toward the pointer on the match card
  useEffect(() => {
    const el = root.current?.querySelector('[data-tilt]');
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!el || !fine || reduce) return undefined;
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.8, ease: 'power3.out' });
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.8, ease: 'power3.out' });
    gsap.set(el, { transformPerspective: 1400 });
    const move = (e) => {
      const b = el.getBoundingClientRect();
      ry(((e.clientX - b.left) / b.width - 0.5) * 8);
      rx(-((e.clientY - b.top) / b.height - 0.5) * 8);
    };
    const reset = () => {
      rx(0);
      ry(0);
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', reset);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', reset);
    };
  }, []);

  return (
    <section id={s.id} ref={root} aria-labelledby={`${s.id}-title`} className="relative scroll-mt-24 overflow-clip bg-light-lavender py-[60px] sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_40%_at_90%_20%,rgba(196,179,234,0.55),transparent),radial-gradient(30%_30%_at_5%_95%,rgba(252,211,77,0.16),transparent)]" />
      <div className="container-x relative">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-14 xl:gap-20">
          <div className="min-w-0">
            <SectionHeading s={s} n={n} />
            {s.intro && (
              <p className="mt-6 text-lead font-medium text-ink-900/70">
                <Rich text={s.intro} />
              </p>
            )}
            {list && (
              <ul data-items className="mt-9 space-y-2.5">
                {list.items.map((t, i) => (
                  <li key={i} data-item>
                    <button
                      type="button"
                      data-pick-btn
                      data-on={i === 0 ? 'true' : 'false'}
                      aria-pressed={i === 0}
                      onClick={() => pick(i)}
                      onMouseEnter={() => pick(i)}
                      onFocus={() => pick(i)}
                      className="group/btn relative isolate flex w-full items-start gap-4 rounded-[20px] bg-white/55 p-4 text-left text-[16.5px] leading-snug text-ink-900/85 ring-1 ring-hairline transition-transform duration-500 data-[on=true]:translate-x-1 sm:p-5"
                    >
                      <span aria-hidden="true" className="pointer-events-none absolute inset-0 -z-[1] rounded-[20px] bg-white opacity-0 shadow-[0_24px_50px_-30px_rgba(75,46,131,0.55)] ring-2 ring-gold-400 transition-opacity duration-500 group-data-[on=true]/btn:opacity-100" />
                      <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-950 font-display text-[13px] font-extrabold text-gold-300 group-data-[on=true]/btn:bg-gold-400 group-data-[on=true]/btn:text-ink-950">
                        {i + 1}
                      </span>
                      <span className="min-w-0 pt-1">
                        <Rich text={t} />
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div data-card className="min-w-0 lg:sticky lg:top-28">
            <MatchCard />
          </div>
        </div>

        {after && (
          <div data-handoff className="grain relative mt-12 grid grid-cols-[minmax(0,1fr)] items-center gap-8 overflow-hidden rounded-[30px] bg-brand-950 p-6 text-white shadow-[0_50px_100px_-50px_rgba(26,15,51,0.85)] sm:mt-16 sm:p-9 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 lg:p-11">
            <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgba(244,180,0,0.22),transparent)]" />
            <p className="relative z-[2] min-w-0 text-[clamp(1.05rem,0.95rem+0.4vw,1.3rem)] font-medium leading-relaxed text-brand-100">
              <Rich text={after.text} tone="dark" />
            </p>
            <ol aria-hidden="true" className="relative z-[2] flex min-w-0 flex-wrap items-center gap-2 sm:flex-nowrap">
              {STEPS_AFTER.map((st, i) => (
                <li key={st.t} data-flow-step className="flex min-w-0 items-center gap-2">
                  <span className={`inline-flex items-center gap-2 rounded-2xl px-3 py-2.5 text-[13px] font-bold ${i === STEPS_AFTER.length - 1 ? 'bg-gold-400 text-ink-950' : 'bg-white/[0.07] text-white ring-1 ring-white/10'}`}>
                    <Icon name={st.icon} className="h-4 w-4 shrink-0" />
                    <span className="whitespace-nowrap">{st.t}</span>
                  </span>
                  {i < STEPS_AFTER.length - 1 && (
                    <svg viewBox="0 0 24 12" className="h-3 w-6 shrink-0 text-gold-400/70">
                      <path d="M1 6h18M15 2l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </li>
              ))}
            </ol>
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
