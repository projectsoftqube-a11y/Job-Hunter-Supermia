'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { Block } from '@/components/page/Blocks';
import { AppMark, Head, SampleTag, Who, pick } from './shared';

/*
 * Step 2, "Practice": the signature scene on the deep brand stage. A finished JobHunter mock-interview
 * screen: the live call (interviewer, question, hint, your answer) beside an already-filled session
 * scorecard (readiness out of 10 as big numerals and a ten-block strip, clarity / confidence / technical
 * depth bars, strength, gap, practice next). On desktop the scene pins and the four steps advance the
 * screen: guided practice with a hint, the HR & Introduction round asking about the break, the
 * scorecard lit up, then the mode switch slides to real simulation and the hint gives way to strict
 * mode. Every phase is a complete screen; phases swap by one data attribute (CSS transitions on
 * opacity/transform). Phones, reduced motion and no-JS show phase 1 complete. The rounds strip below
 * carries the closing paragraph. The screen is decorative sample data (aria-hidden).
 */

const PIN = `(min-width: 1024px) and (min-height: 700px) and ${MOTION_OK}`;

// Stacked alternates: each shows only in its phases (the literal classes keep Tailwind's scanner happy)
const BASE = 'col-start-1 row-start-1 opacity-0 translate-y-2 transition-[opacity,transform] duration-500';
const SHOW = {
  1: 'group-data-[phase=1]/scr:opacity-100 group-data-[phase=1]/scr:translate-y-0',
  23: 'group-data-[phase=2]/scr:opacity-100 group-data-[phase=2]/scr:translate-y-0 group-data-[phase=3]/scr:opacity-100 group-data-[phase=3]/scr:translate-y-0',
  123: 'group-data-[phase=1]/scr:opacity-100 group-data-[phase=1]/scr:translate-y-0 group-data-[phase=2]/scr:opacity-100 group-data-[phase=2]/scr:translate-y-0 group-data-[phase=3]/scr:opacity-100 group-data-[phase=3]/scr:translate-y-0',
  12: 'group-data-[phase=1]/scr:opacity-100 group-data-[phase=1]/scr:translate-y-0 group-data-[phase=2]/scr:opacity-100 group-data-[phase=2]/scr:translate-y-0',
  3: 'group-data-[phase=3]/scr:opacity-100 group-data-[phase=3]/scr:translate-y-0',
  4: 'group-data-[phase=4]/scr:opacity-100 group-data-[phase=4]/scr:translate-y-0',
};
const Alt = ({ show, as: Tag = 'div', className = '', children }) => <Tag className={`${BASE} ${SHOW[show]} ${className}`}>{children}</Tag>;

const QUESTIONS = [
  ['1', 'Tell me a little about yourself.'],
  ['23', 'What have you been doing since your last role?'],
  ['4', 'And why this role, and why now?'],
];
const ANSWERS = [
  ['1', 'I spent six years in accounts payable at Brightpath Software, most recently running vendor invoices end to end.'],
  ['23', 'I took three years out to care for a family member, and kept my bookkeeping current with a local nonprofit.'],
  ['4', 'It is close to the work I did before the break, and I am ready to do it on a team again.'],
];
const HINTS = [
  ['1', 'Start with your last role, then one line about your break.'],
  ['23', 'One or two plain sentences, then what you kept up. End on now.'],
];
const BARS = [
  ['Clarity', 7.8, 'from-brand-400 to-brand-600'],
  ['Confidence', 6.9, 'from-gold-300 to-gold-500'],
  ['Technical depth', 7.1, 'from-emerald-300 to-emerald-500'],
];
const READY = 7.4;
const WAVE = [0.35, 0.6, 0.9, 0.55, 1, 0.7, 0.4, 0.8, 0.5, 0.95, 0.6, 0.3, 0.7, 0.45, 0.85, 0.5, 0.3, 0.65];

function Screen() {
  return (
    <div data-screen data-phase="1" aria-hidden="true" className="group/scr relative min-w-0 overflow-hidden rounded-[30px] bg-white text-ink-950 shadow-[0_70px_140px_-60px_rgba(0,0,0,0.85)] ring-1 ring-white/15">
      {/* Top bar */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2.5 border-b border-hairline px-4 py-3 sm:px-5">
        <span className="flex items-center gap-2.5">
          <AppMark />
          <span className="leading-tight">
            <span className="block font-display text-[14px] font-extrabold tracking-[-0.02em]">Mock interview</span>
            <span className="-mx-1 block rounded-md px-1 text-[11.5px] font-semibold text-ink-900/60 transition-colors duration-500 group-data-[phase=2]/scr:bg-gold-300 group-data-[phase=2]/scr:text-ink-950">HR &amp; Introduction · Round 1 of 4</span>
          </span>
        </span>
        {/* Mode switch: the knob slides to real simulation in the last step */}
        <span className="relative ml-auto grid grid-cols-2 rounded-full bg-light-lavender p-1 text-[11.5px] font-bold ring-1 ring-brand-100">
          <span className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-brand-950 shadow-[0_6px_14px_-8px_rgba(26,15,51,0.8)] transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-data-[phase=4]/scr:translate-x-full" />
          <span className="relative px-3 py-1.5 text-center text-gold-300 transition-colors duration-500 group-data-[phase=4]/scr:text-ink-900/60">Guided practice</span>
          <span className="relative px-3 py-1.5 text-center text-ink-900/60 transition-colors duration-500 group-data-[phase=4]/scr:text-gold-300">Real simulation</span>
        </span>
        <span className="hidden xl:inline-flex">
          <Who />
        </span>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)] sm:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        {/* The live call */}
        <div className="relative bg-brand-950 p-4 text-white sm:p-5">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_30%_0%,rgba(109,76,176,0.55),transparent)]" />
          <div className="relative flex items-center gap-3">
            <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 font-display text-[13px] font-extrabold ring-4 ring-gold-400/25">AI</span>
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] font-bold">AI interviewer</span>
              <span className="grid text-[11.5px] font-semibold">
                <Alt as="span" show={12} className="flex items-center gap-1.5 text-rose-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                  Live · voice
                </Alt>
                <Alt as="span" show={3} className="flex items-center gap-1.5 text-emerald-300">
                  <Icon name="check" className="h-3 w-3" strokeWidth={3} />
                  Session complete
                </Alt>
                <Alt as="span" show={4} className="flex items-center gap-1.5 text-rose-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                  Live · strict mode
                </Alt>
              </span>
            </span>
            <span className="grid text-[11px] font-bold">
              <Alt as="span" show={123} className="rounded-full bg-gold-400 px-2.5 py-1 text-center text-ink-950">Hints on</Alt>
              <Alt as="span" show={4} className="rounded-full bg-rose-500 px-2.5 py-1 text-center text-white">Hints off</Alt>
            </span>
          </div>

          <span className="relative mt-4 flex h-9 items-center gap-[3px]">
            {WAVE.map((h, i) => (
              <span key={i} className="w-[5px] flex-1 rounded-full bg-gradient-to-t from-brand-400 to-gold-300" style={{ height: `${h * 100}%`, opacity: 0.55 + h * 0.45 }} />
            ))}
          </span>

          <div className="relative mt-4 space-y-2.5">
            <div className="grid">
              {QUESTIONS.map(([sh, t]) => (
                <Alt key={t} show={sh}>
                  <p className="max-w-[94%] rounded-2xl rounded-tl-md bg-white px-3.5 py-2.5 text-[13.5px] font-semibold leading-snug text-ink-950">{t}</p>
                </Alt>
              ))}
            </div>
            <div className="grid">
              {HINTS.map(([sh, t]) => (
                <Alt key={t} show={sh}>
                  <p className="flex gap-2 rounded-2xl bg-gold-400 px-3.5 py-2.5 text-[13px] font-semibold leading-snug text-ink-950">
                    <Icon name="spark" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <span>
                      <span className="font-extrabold">Hint: </span>
                      {t}
                    </span>
                  </p>
                </Alt>
              ))}
              <Alt show={4}>
                <p className="flex gap-2 rounded-2xl bg-rose-500/15 px-3.5 py-2.5 text-[13px] font-semibold leading-snug text-rose-100 ring-1 ring-rose-300/40">
                  <Icon name="shield" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-300" />
                  <span>
                    <span className="font-extrabold text-white">Real simulation: </span>
                    no hints. Follow-ups come the way they would on a real call.
                  </span>
                </p>
              </Alt>
            </div>
            <div className="grid">
              {ANSWERS.map(([sh, t]) => (
                <Alt key={t} show={sh} className="flex justify-end">
                  <p className="max-w-[92%] rounded-2xl rounded-tr-md bg-gradient-to-br from-brand-500 to-brand-700 px-3.5 py-2.5 text-[13px] font-medium leading-snug text-white">
                    <span className="mb-1 flex items-center gap-1.5 text-[11px] font-bold text-gold-300">
                      <Icon name="mic" className="h-3 w-3" />
                      You, answering out loud
                    </span>
                    {t}
                  </p>
                </Alt>
              ))}
            </div>
          </div>
        </div>

        {/* The scorecard, already filled; it lights up in step 3 */}
        <div className="relative isolate p-4 sm:p-5">
          <span className="pointer-events-none absolute inset-2 -z-[1] rounded-[22px] bg-gold-50 opacity-0 ring-2 ring-gold-400 transition-opacity duration-500 group-data-[phase=3]/scr:opacity-100" />
          <div className="flex items-center justify-between gap-2">
            <span className="text-[13px] font-bold">Session scorecard</span>
            <SampleTag tone="light" />
          </div>
          <div className="mt-3 flex items-end gap-3">
            <span className="font-display leading-none">
              <span className="text-[clamp(2.8rem,2rem+1.6vw,3.6rem)] font-extrabold tracking-[-0.05em]">{READY}</span>
              <span className="ml-1 text-[15px] font-bold text-ink-900/45">/10</span>
            </span>
            <span className="pb-1.5 text-[12px] font-bold leading-tight text-brand-600">
              Readiness
              <br />
              score
            </span>
          </div>
          <span className="mt-2.5 grid grid-cols-10 gap-[3px]">
            {Array.from({ length: 10 }, (_, i) => (
              <span key={i} className={`h-2.5 rounded-[3px] ${i < 7 ? 'bg-gradient-to-r from-brand-500 to-brand-600' : i === 7 ? 'bg-gradient-to-r from-gold-400 to-brand-100' : 'bg-brand-100'}`} />
            ))}
          </span>
          <div className="mt-4 space-y-2.5">
            {BARS.map(([l, v, g]) => (
              <div key={l}>
                <span className="flex justify-between text-[12px] font-semibold">
                  <span>{l}</span>
                  <span className="font-display font-extrabold">{v}</span>
                </span>
                <span className="mt-1 block h-2 overflow-hidden rounded-full bg-brand-50">
                  <span className={`block h-full rounded-full bg-gradient-to-r ${g}`} style={{ width: `${v * 10}%` }} />
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-1.5 text-[12px] font-semibold">
            <span className="flex items-center gap-2 rounded-xl bg-emerald-50 px-2.5 py-2 text-emerald-800">
              <Icon name="check" className="h-3.5 w-3.5 shrink-0" strokeWidth={3} />
              Strength: clear, structured story
            </span>
            <span className="flex items-center gap-2 rounded-xl bg-rose-50 px-2.5 py-2 text-rose-800">
              <Icon name="clock" className="h-3.5 w-3.5 shrink-0" />
              Gap: rushed the break answer
            </span>
            <span className="flex items-center gap-2 rounded-xl bg-gold-100 px-2.5 py-2 text-gold-800">
              <Icon name="target" className="h-3.5 w-3.5 shrink-0" />
              Practice next: why this role, now
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const ROUNDS = ['HR & Introduction', 'Role & Knowledge', 'Practical & Behavioral', 'Managerial & Final'];

export default function PracticeSection({ s, n }) {
  const root = useRef(null);
  const steps = pick(s, 'steps')?.items || [];
  const close = pick(s, 'p');
  const others = (s.blocks || []).filter((b) => b.type !== 'steps' && b !== close);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: 'top 70%', once: true } })
          .from(q('[data-intro]'), { y: 30, opacity: 0, duration: 1.1 }, 0.1)
          .from(q('[data-screen]'), { y: 80, scale: 0.95, opacity: 0, duration: 1.4 }, 0.2);
        const items = q('[data-round]');
        gsap.from(items, { y: 40, opacity: 0, stagger: 0.08, duration: 1, scrollTrigger: { trigger: q('[data-rounds]')[0], start: 'top 90%', once: true } });
      });

      // Desktop: pin, and let the four steps drive the screen (one data attribute, no React state)
      mm.add(PIN, () => {
        const screen = q('[data-screen]')[0];
        const cards = q('[data-step]');
        let phase = 0;
        const setPhase = (p) => {
          if (p === phase) return;
          phase = p;
          screen.dataset.phase = String(p);
          cards.forEach((c, i) => (c.dataset.on = i + 1 === p ? 'true' : 'false'));
        };
        setPhase(1);

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: q('[data-pin]')[0],
            start: 'top top',
            end: '+=320%',
            pin: true,
            scrub: 0.4,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => setPhase(Math.min(4, 1 + Math.floor(self.progress * 4))),
          },
        });
        // Each rail segment fills on the same axis as it runs to the next step
        q('[data-seg-fill]').forEach((f, i) => tl.fromTo(f, { scaleY: 0 }, { scaleY: 1, duration: 1 }, i + 0.5));
        q('[data-step-bar]').forEach((b, i) => tl.fromTo(b, { scaleX: 0 }, { scaleX: 1, duration: 1 }, i));

        return () => {
          screen.dataset.phase = '1';
          cards.forEach((c) => delete c.dataset.on);
        };
      });

      mm.add(`(max-width: 1023px) and ${MOTION_OK}`, () => {
        const els = q('[data-step]');
        gsap.set(els, { y: 30, opacity: 0 });
        ScrollTrigger.batch(els, { start: 'top 92%', once: true, onEnter: (b) => gsap.to(b, { y: 0, opacity: 1, stagger: 0.08, duration: 1, overwrite: true }) });
      });
    },
    { scope: root }
  );

  return (
    <section id={s.id} ref={root} aria-labelledby={`${s.id}-title`} className="grain relative scroll-mt-24 overflow-hidden bg-brand-950 text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_40%_at_80%_20%,rgba(109,76,176,0.55),transparent),radial-gradient(35%_30%_at_5%_60%,rgba(124,92,214,0.3),transparent),radial-gradient(30%_25%_at_90%_100%,rgba(244,180,0,0.14),transparent)]" />

      <div className="container-x relative z-[2] pt-16 sm:pt-24 lg:pt-28">
        <Head s={s} n={n} tone="dark" />
      </div>

      <div data-pin className="relative z-[2] pt-10 sm:pt-14 lg:flex lg:h-[100svh] lg:min-h-[700px] lg:items-center lg:pt-[84px] lg:pb-6">
        <div className="container-x grid w-full grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-center lg:gap-12 xl:gap-16">
          {/* The four steps. Rail geometry: circles and line share one fixed 44px column outside the cards;
              circle centre x = 22px, line 2px wide at left 21px; each segment runs from its circle's centre
              (top 36px) to the next circle's centre (its li height + the 10px gap). */}
          <ol className="relative min-w-0 space-y-2.5">
            {steps.map((st, i) => (
              <li key={st.title} data-step className="group/step relative grid grid-cols-[44px_minmax(0,1fr)] gap-3 sm:gap-4">
                {i < steps.length - 1 && (
                  <span aria-hidden="true" data-seg className="absolute left-[21px] top-[36px] h-[calc(100%+10px)] w-[2px] overflow-hidden rounded-full bg-white/15">
                    <span data-seg-fill className="block h-full w-full origin-top bg-gradient-to-b from-gold-400 to-emerald-400" />
                  </span>
                )}
                <span aria-hidden="true" data-dot className="relative z-[1] mt-[14px] flex h-11 w-11 items-center justify-center self-start rounded-full bg-brand-700 font-display text-[14px] font-extrabold text-white shadow-[0_0_0_5px_var(--color-brand-950)] ring-1 ring-white/20 transition-colors duration-500 group-data-[on=true]/step:bg-gold-400 group-data-[on=true]/step:text-ink-950">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="relative min-w-0 overflow-hidden rounded-[22px] bg-white/[0.05] p-4 ring-1 ring-white/10 transition-[background-color,transform] duration-500 group-data-[on=true]/step:translate-x-1.5 group-data-[on=true]/step:bg-white/[0.11] xl:p-5">
                  <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[22px] opacity-0 ring-2 ring-inset ring-gold-400/80 transition-opacity duration-500 group-data-[on=true]/step:opacity-100" />
                  <h3 className="relative font-display text-[1.15rem] font-bold leading-snug tracking-[-0.02em] text-white xl:text-[1.25rem]">{st.title}</h3>
                  <p className="relative mt-1 text-[15px] leading-relaxed text-white/75 xl:text-[15.5px]">
                    <Rich text={st.text} tone="dark" />
                  </p>
                  <span aria-hidden="true" className="absolute inset-x-0 bottom-0 hidden h-[3px] bg-white/[0.06] lg:block">
                    <span data-step-bar className="block h-full w-full origin-left bg-gradient-to-r from-gold-400 to-emerald-400" />
                  </span>
                </div>
              </li>
            ))}
          </ol>

          <Screen />
        </div>
      </div>

      {/* The other three rounds, for when you are ready */}
      {close && (
        <div className="container-x relative z-[2] pb-16 pt-12 sm:pb-24 sm:pt-16 lg:pb-28 lg:pt-14">
          <div data-rounds className="grid grid-cols-[minmax(0,1fr)] items-center gap-6 rounded-[30px] bg-white/[0.05] p-5 ring-1 ring-white/10 sm:p-7 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-10 lg:p-8">
            <p className="min-w-0 text-[clamp(1.02rem,0.95rem+0.3vw,1.2rem)] font-medium leading-relaxed text-brand-100">
              <Rich text={close.text} tone="dark" />
            </p>
            <ol aria-hidden="true" className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-2.5 min-[460px]:grid-cols-2 xl:grid-cols-4">
              {ROUNDS.map((r, i) => (
                <li key={r} data-round className={`flex min-w-0 flex-col justify-between gap-4 rounded-[20px] p-4 ${i === 0 ? 'bg-gold-400 text-ink-950' : 'bg-white/[0.07] text-white ring-1 ring-white/10'}`}>
                  <span className="flex items-center justify-between gap-2">
                    <span className={`font-display text-[13px] font-extrabold ${i === 0 ? 'text-ink-950' : 'text-gold-300'}`}>Round {i + 1}</span>
                    <Icon name={i === 0 ? 'check' : 'arrow'} className="h-4 w-4" strokeWidth={2.6} />
                  </span>
                  <span>
                    <span className="block font-display text-[15.5px] font-bold leading-snug">{r}</span>
                    <span className={`mt-1 block text-[12px] font-semibold ${i === 0 ? 'text-ink-950/70' : 'text-white/60'}`}>{i === 0 ? 'Start here, with hints' : 'When you are ready'}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          {others.length > 0 && (
            <div className="mt-8 space-y-5">
              {others.map((b, i) => (
                <Block key={i} b={b} />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
