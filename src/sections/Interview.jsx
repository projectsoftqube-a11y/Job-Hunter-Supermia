'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { LayoutGroup, motion } from 'framer-motion';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';
import { Waveform } from '@/components/mocks';
import { ROUNDS, MODES } from '@/content/site';
import CreativeHeading from '@/components/CreativeHeading';

/*
 * One video-call window with everything layered on it. Picking a round or a mode replays a short
 * exchange in the subtitles: question, your answer, follow-up. Guided mode adds a hint card and a
 * live score card. Questions, answers and scores are illustrative sample content.
 */
const SCRIPT = [
  {
    q: 'Tell me about yourself, and why this role at this point in your career?',
    hint: 'Present, past, then why this role. Two minutes.',
    a: 'I have spent six years building React products, most recently leading a design system…',
    f: 'What made you start looking now?',
    scores: [82, 74, 68],
  },
  {
    q: 'How would you cut the load time of a slow React dashboard?',
    hint: 'Say how you would measure it before you fix anything.',
    a: 'First I would profile it to see where the time goes, then split the bundle…',
    f: 'Good. How would you prove the change actually worked?',
    scores: [78, 85, 80],
  },
  {
    q: 'Describe a time you disagreed with a teammate. What did you do?',
    hint: 'Use STAR: situation, task, action, result.',
    a: 'On a checkout redesign I suggested we test both versions instead of arguing…',
    f: 'What was the result, and what would you do differently?',
    scores: [84, 88, 72],
  },
  {
    q: 'How would you set the technical direction for a new team in your first 90 days?',
    hint: 'Talk about people, priorities and how you measure success.',
    a: 'I would spend the first month listening: one-to-ones, past incidents, the roadmap…',
    f: 'How would you know whether it is working?',
    scores: [80, 76, 83],
  },
];
const CRITERIA = ['Clarity', 'Structure', 'Depth'];
const ease = [0.16, 1, 0.3, 1];

export default function Interview() {
  const root = useRef(null);
  const stage = useRef(null);
  const clock = useRef(null);
  const [round, setRound] = useState(1);
  const [mode, setMode] = useState(0);
  const guided = mode === 0;
  const S = SCRIPT[round];
  const interviewer = guided ? 'AI interviewer' : 'Hiring manager';

  // Recording clock
  useEffect(() => {
    let s = 0;
    const id = setInterval(() => {
      s += 1;
      if (clock.current) clock.current.textContent = `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // Entrance: controls rise, the window opens like a curtain
  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const st = { trigger: q('[data-window]')[0], start: 'top 82%', once: true };
        gsap.fromTo(q('[data-window]'), { clipPath: 'inset(100% 0% 0% 0% round 32px)' }, { clipPath: 'inset(0% 0% 0% 0% round 32px)', duration: 1.5, ease: 'expo.inOut', clearProps: 'clipPath', scrollTrigger: st });
        gsap.from(q('[data-photo]'), { scale: 1.2, duration: 2, ease: 'expo.out', scrollTrigger: st });
        gsap.from(q('[data-controls] > *'), { y: 24, opacity: 0, stagger: 0.08, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: q('[data-controls]')[0], start: 'top 88%', once: true } });
      });
    },
    { scope: root }
  );

  // The exchange, rebuilt whenever the round or mode changes; plays only while on screen
  useGSAP(
    () => {
      const q = gsap.utils.selector(stage);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const caption = q('[data-caption]')[0];
        const who = q('[data-caption-who]')[0];
        const hint = q('[data-hint]')[0];
        const fills = q('[data-score-fill]');
        const nums = q('[data-score-num]');
        const speak = (w) => q('[data-tile]').forEach((t) => (t.dataset.on = t.dataset.tile === w ? 'true' : 'false'));
        const say = (name) => () => {
          who.textContent = `${name}:`;
          caption.textContent = '';
        };
        const type = (text, duration) => {
          const s = { n: 0 };
          return gsap.to(s, { n: text.length, duration, ease: 'none', onUpdate: () => (caption.textContent = text.slice(0, Math.round(s.n))) });
        };

        caption.textContent = '';
        if (hint) gsap.set(hint, { autoAlpha: 0, y: 12 });
        gsap.set(fills, { scaleX: 0 });
        nums.forEach((el) => (el.textContent = '0'));

        const tl = gsap.timeline({
          repeat: -1,
          repeatDelay: 0.6,
          scrollTrigger: { trigger: stage.current, start: 'top 85%', end: 'bottom 15%', toggleActions: 'play pause resume pause' },
        });
        tl.add(() => speak('ai'), 0).add(say(interviewer), 0).add(type(S.q, 2.2), 0.2);
        if (hint) tl.to(hint, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'back.out(1.6)' }, 2.6);
        tl.add(() => speak('you'), 3.6).add(say('You'), 3.6).add(type(S.a, 2.6), 3.7);
        if (hint) tl.to(hint, { autoAlpha: 0, y: -8, duration: 0.4 }, 4.2);
        tl.add(() => speak('ai'), 6.8).add(say(interviewer), 6.8).add(type(S.f, 1.5), 6.9);
        if (fills.length) {
          tl.to(fills, { scaleX: 1, stagger: 0.12, duration: 1.2, ease: 'expo.out' }, 7.2);
          nums.forEach((el, i) => {
            const s = { v: 0 };
            tl.fromTo(s, { v: 0 }, { v: S.scores[i], duration: 1.2, ease: 'expo.out', onUpdate: () => (el.textContent = Math.round(s.v)) }, 7.2 + i * 0.12);
          });
        }
        tl.to({}, { duration: 2.4 }).to(fills, { scaleX: 0, duration: 0.4, ease: 'power2.in' });
      });
    },
    { scope: stage, dependencies: [round, mode], revertOnUpdate: true }
  );

  return (
    <section id="interview" ref={root} aria-labelledby="interview-title" className="relative overflow-hidden bg-brand-950 py-[60px] text-white sm:py-28 lg:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_35%_at_50%_0%,rgba(109,76,176,0.45),transparent),radial-gradient(40%_30%_at_85%_100%,rgba(244,180,0,0.12),transparent)]" />

      <div className="container-x relative">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-gold-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-500" />
            AI mock interviews
          </p>
          <CreativeHeading
            id="interview-title"
            tone="dark"
            className="font-display text-display font-extrabold"
            lines={[
              ['Rehearse the ', { mark: 'real interview,' }],
              [{ grad: 'out loud.', swoosh: true }, ' ', { chip: 'mic', eq: true }],
            ]}
          />
          <p className="mx-auto mt-5 max-w-[34rem] text-lead font-medium text-brand-100">Pick a round, answer out loud, and the AI follows up and scores you.</p>
        </div>

        {/* Controls: one row */}
        <div data-controls className="mx-auto mt-10 flex max-w-[1180px] flex-col items-center gap-3 lg:mt-12 lg:flex-row lg:justify-between">
          <LayoutGroup id="rounds">
            <div role="radiogroup" aria-label="Interview round" className="flex max-w-full gap-1 overflow-x-auto rounded-full border border-white/10 bg-white/[0.04] p-1 [scrollbar-width:none]">
              {ROUNDS.map((r, i) => (
                <button
                  key={r.name}
                  type="button"
                  role="radio"
                  aria-checked={round === i}
                  title={r.body}
                  onClick={() => setRound(i)}
                  className="relative shrink-0 whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-bold sm:text-sm"
                >
                  {round === i && <motion.span layoutId="round-pill" transition={{ duration: 0.5, ease }} className="absolute inset-0 rounded-full bg-white" aria-hidden="true" />}
                  <span className={`relative ${round === i ? 'text-brand-700' : 'text-white/75'}`}>{r.name}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>

          <LayoutGroup id="modes">
            <div role="radiogroup" aria-label="Practice mode" className="inline-flex shrink-0 rounded-full border border-white/10 bg-white/[0.04] p-1">
              {MODES.map((m, i) => (
                <button key={m.name} type="button" role="radio" aria-checked={mode === i} title={m.best} onClick={() => setMode(i)} className="relative whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-bold sm:text-sm">
                  {mode === i && <motion.span layoutId="mode-pill" transition={{ duration: 0.5, ease }} className="absolute inset-0 rounded-full bg-gold-500" aria-hidden="true" />}
                  <span className={`relative ${mode === i ? 'text-ink-950' : 'text-white/75'}`}>{i === 0 ? 'Guided practice' : 'Real simulation'}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>
        </div>

        {/* The window */}
        <div data-window className="relative mx-auto mt-5 max-w-[1180px] overflow-hidden rounded-[32px] border border-white/10 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.85)]">
          <div ref={stage} className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/9]">
            <div data-tile="you" data-on="false" className="group absolute inset-0">
              <div data-photo className="absolute inset-0">
                <Image src="/images/mock-interview-practice.jpg" alt="Candidate answering in a mock interview" fill sizes="(max-width: 1200px) 100vw, 1180px" className="object-cover object-[35%_center]" />
              </div>
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-black/30" />
              <span aria-hidden="true" className="absolute inset-0 rounded-[32px] ring-0 ring-inset ring-gold-400 transition-[box-shadow] duration-300 group-data-[on=true]:ring-4" />

              {/* Top left: recording and you */}
              <div className="absolute left-4 top-4 flex items-center gap-2 sm:left-6 sm:top-6">
                <span className="flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 text-xs font-bold text-rose-300">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-400" />
                  REC <span ref={clock} className="tabular-nums">00:00</span>
                </span>
                <span className="hidden items-center gap-2 rounded-full bg-black/50 px-3 py-1.5 text-xs font-bold sm:flex">
                  You
                  <span className="flex h-3.5 items-end gap-[2px]" aria-hidden="true">
                    {[0, 1, 2, 3].map((b) => (
                      <span key={b} className="w-[3px] origin-bottom rounded-full bg-gold-400 opacity-40 group-data-[on=true]:animate-[eq_0.9s_ease-in-out_infinite] group-data-[on=true]:opacity-100" style={{ height: `${50 + b * 15}%`, animationDelay: `${b * -0.2}s` }} />
                    ))}
                  </span>
                </span>
              </div>
            </div>

            {/* Interviewer picture-in-picture */}
            <div data-tile="ai" data-on="true" className="group absolute right-4 top-4 w-[min(240px,46%)] overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-brand-600 to-brand-900 p-3 shadow-2xl sm:right-6 sm:top-6">
              <span aria-hidden="true" className="absolute inset-0 rounded-2xl ring-0 ring-inset ring-gold-400 transition-[box-shadow] duration-300 group-data-[on=true]:ring-2" />
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-9 w-9 shrink-0 items-center justify-center">
                  <span className="absolute inset-0 rounded-full bg-gold-400/40 opacity-0 group-data-[on=true]:animate-pulse-ring group-data-[on=true]:opacity-100" />
                  <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-300 to-brand-600 font-display text-xs font-extrabold">AI</span>
                </span>
                <span className="min-w-0 truncate text-xs font-bold">{interviewer}</span>
              </div>
              <div className="mt-2 h-7">
                <Waveform bars={20} />
              </div>
            </div>

            {/* Guided extras */}
            {guided && (
              <>
                <p data-hint className="absolute bottom-[clamp(5.5rem,16%,8rem)] left-4 max-w-[min(340px,80%)] rounded-2xl border border-gold-400/40 bg-brand-950/85 px-4 py-3 text-[13px] font-semibold leading-snug text-gold-100 sm:left-6">
                  <span className="text-gold-300">Hint: </span>
                  {S.hint}
                </p>
                <div className="absolute right-6 top-1/2 hidden w-[220px] -translate-y-1/2 rounded-2xl bg-white/95 p-4 text-ink-950 shadow-2xl md:block">
                  <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-brand-600">Live score</p>
                  <div className="space-y-2">
                    {CRITERIA.map((c, i) => (
                      <div key={c} className="grid grid-cols-[64px_1fr_24px] items-center gap-2 text-xs font-semibold">
                        <span>{c}</span>
                        <span className="h-1.5 overflow-hidden rounded-full bg-brand-100">
                          <span data-score-fill className="block h-full origin-left rounded-full bg-gradient-to-r from-brand-500 to-gold-400" style={{ width: `${S.scores[i]}%` }} />
                        </span>
                        <span data-score-num className="text-right font-display font-extrabold text-brand-700">
                          {S.scores[i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Subtitles */}
            <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6">
              <p className="mx-auto min-h-[3.4em] max-w-[680px] rounded-2xl bg-black/60 px-4 py-3 text-center text-sm font-semibold leading-relaxed sm:text-base" aria-live="polite">
                <span data-caption-who className="mr-2 text-gold-300">
                  {interviewer}:
                </span>
                <span key={`${round}-${mode}`} data-caption>
                  {S.q}
                </span>
              </p>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-5 max-w-[1180px] text-center text-sm font-medium text-brand-200">{guided ? MODES[0].best : MODES[1].best}.</p>
      </div>
    </section>
  );
}
