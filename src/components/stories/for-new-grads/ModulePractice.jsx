'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { ModuleHead, PAD, Tick, Sample, mod, of } from './shared';

/*
 * Module 3 · Practice (the dark band). The two modes are "what you'll get" lesson cards beside the round
 * picker; then the signature scene: the four questions are a practice worksheet (each hint is a tutor's
 * note in the margin) and every question is one rep. On desktop the scene pins and one scrubbed timeline
 * works down the sheet: the active question lights up, its tutor's note slides in, its rep card records a
 * waveform that is smoother each time, and the 10-block confidence strip fills from Awkward through
 * Getting there to Natural. Then the sample scorecard (bars, no dials). Markup is the finished state.
 */

const ROUNDS = ['HR & Introduction', 'Role & Knowledge', 'Practical & Behavioral', 'Managerial & Final'];

// Deterministic "noise" so the server and client render the same bars
const NOISE = [0.62, 0.18, 0.91, 0.35, 0.77, 0.08, 0.54, 0.97, 0.27, 0.69, 0.12, 0.84, 0.41, 0.95, 0.22, 0.58, 0.03, 0.73, 0.88, 0.31, 0.66, 0.15, 0.49, 0.92, 0.26, 0.71, 0.38, 0.81];
const BARS = NOISE.length;
const REPS = [
  { rough: 0.9, gaps: [6, 7, 16, 17, 23], conf: 3, status: 'Awkward', mode: 'Guided · hints on', bar: 'bg-brand-300/70', chip: 'bg-white/10 text-white/70' },
  { rough: 0.6, gaps: [16, 17], conf: 5, status: 'Getting there', mode: 'Guided · hints on', bar: 'bg-brand-300', chip: 'bg-brand-300/20 text-brand-100' },
  { rough: 0.3, gaps: [], conf: 7, status: 'Getting there', mode: 'Guided', bar: 'bg-linear-to-t from-brand-300 to-gold-300', chip: 'bg-brand-300/20 text-brand-100' },
  { rough: 0.06, gaps: [], conf: 10, status: 'Natural', mode: 'Real simulation', bar: 'bg-linear-to-t from-gold-500 to-gold-300', chip: 'bg-gold-400 text-ink-950' },
];
const waveOf = (rep) =>
  NOISE.map((nz, i) => {
    if (rep.gaps.includes(i)) return 8;
    const env = 0.3 + 0.7 * Math.sin((Math.PI * (i + 0.5)) / BARS);
    return Math.round(Math.min(1, Math.max(0.1, env * (1 - rep.rough) + rep.rough * nz)) * 100);
  });
const WAVES = REPS.map(waveOf);
const CONF_LABELS = [
  { t: 'Awkward', span: 'col-span-3', from: 0 },
  { t: 'Getting there', span: 'col-span-4', from: 3 },
  { t: 'Natural', span: 'col-span-3 text-right', from: 7 },
];
const BARS_CARD = [
  ['Clarity', 82],
  ['Confidence', 74],
  ['Technical depth', 66],
];

function ModeVisual({ guided }) {
  if (guided)
    return (
      <div aria-hidden="true" className="mt-auto space-y-2 pt-6">
        <div className="w-fit max-w-[90%] rounded-2xl rounded-bl-md bg-white/10 px-3 py-2 text-[12.5px] font-semibold text-white/85">Tell me about yourself.</div>
        <div className="ml-auto flex w-fit max-w-[92%] items-center gap-2 rounded-2xl rounded-br-md border border-dashed border-gold-300/60 bg-gold-400/10 px-3 py-2 text-[12.5px] font-semibold text-gold-200">
          <Icon name="spark" className="h-3.5 w-3.5 shrink-0" />
          Hint: present, past, future
        </div>
      </div>
    );
  return (
    <div aria-hidden="true" className="mt-auto pt-6">
      <div className="flex items-center gap-3 rounded-2xl bg-white/[0.07] px-3 py-2.5 ring-1 ring-white/10">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inset-0 animate-ping rounded-full bg-gold-400/60" />
          <span className="relative h-2.5 w-2.5 rounded-full bg-gold-400" />
        </span>
        <span className="text-[12.5px] font-bold text-white">Strict run · no hints</span>
        <span className="ml-auto font-display text-[13px] font-bold tabular-nums text-white/60">02:00</span>
      </div>
      <div className="mt-2 flex h-6 items-center gap-[3px] px-1">
        {WAVES[3].slice(0, 24).map((h, i) => (
          <span key={i} className="flex-1 rounded-full bg-white/25" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

function Tracker() {
  return (
    <div aria-hidden="true" className="relative overflow-hidden rounded-[28px] bg-[#211640] p-5 ring-1 ring-white/10 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-gold-300">Practice reps</p>
          <p className="mt-1 text-[13px] font-semibold text-white/60">Confidence after each rep</p>
        </div>
        <p className="font-display text-[2.75rem] font-extrabold leading-none tracking-[-0.04em] text-white">
          <span data-conf-num>10</span>
          <span className="text-[1.25rem] text-white/40">/10</span>
        </p>
      </div>
      <div className="mt-4 grid grid-cols-10 gap-1.5">
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} data-conf-blk className={`h-4 origin-bottom rounded-[5px] ${i < 3 ? 'bg-brand-300/60' : i < 7 ? 'bg-brand-300' : 'bg-gold-400'}`} />
        ))}
      </div>
      <div className="mt-2 grid grid-cols-10 gap-1.5 text-[11.5px] font-bold">
        {CONF_LABELS.map((l) => (
          <span key={l.t} data-conf-lbl className={`${l.span} border-t-2 border-white/25 pt-1.5 text-white/80`}>
            {l.t}
          </span>
        ))}
      </div>
      <ol className="mt-5 space-y-2.5">
        {REPS.map((r, i) => (
          <li key={i} data-rep className="relative overflow-hidden rounded-[18px] bg-[#2a1f4d] px-3.5 py-3 ring-1 ring-white/10">
            <span data-rep-glow className="pointer-events-none absolute inset-0 rounded-[18px] opacity-0 ring-2 ring-inset ring-gold-400" />
            <div className="flex items-center justify-between gap-2 text-[12px]">
              <span className="min-w-0 truncate font-bold text-white">
                Rep {i + 1} <span className="font-semibold text-white/45">· Q{i + 1} · {r.mode}</span>
              </span>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10.5px] font-extrabold ${r.chip}`}>{r.status}</span>
            </div>
            <div className="relative mt-2 flex h-8 items-center gap-[3px]">
              {WAVES[i].map((h, b) => (
                <span key={b} className={`flex-1 rounded-full ${r.bar}`} style={{ height: `${h}%` }} />
              ))}
              <span data-rep-cover className="absolute -inset-y-1 -right-1 left-0 origin-right scale-x-0 bg-[#2a1f4d]" />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Scorecard() {
  return (
    <div aria-hidden="true" data-scorecard className="relative overflow-hidden rounded-[28px] bg-white p-5 text-ink-950 shadow-[0_60px_120px_-60px_rgba(0,0,0,0.8)] sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-brand-600">
          <Icon name="chart" className="h-4 w-4" />
          Scorecard · HR & Introduction
        </p>
        <Sample />
      </div>
      <div className="mt-5 grid grid-cols-[minmax(0,1fr)] gap-6 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:gap-8">
        <div className="min-w-0 rounded-[22px] bg-brand-950 p-5 text-white">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/55">Readiness</p>
          <p className="mt-2 font-display text-[3.5rem] font-extrabold leading-none tracking-[-0.05em]">
            <span data-ready>7.6</span>
            <span className="text-[1.3rem] text-white/40">/10</span>
          </p>
          <div className="mt-4 grid grid-cols-10 gap-1">
            {Array.from({ length: 10 }, (_, i) => (
              <span key={i} data-ready-blk className={`h-2.5 rounded-[4px] ${i < 7 ? 'bg-gold-400' : i < 8 ? 'bg-gold-400/50' : 'bg-white/15'}`} />
            ))}
          </div>
        </div>
        <ul className="min-w-0 space-y-4 self-center">
          {BARS_CARD.map(([k, v]) => (
            <li key={k}>
              <div className="flex items-baseline justify-between text-[13px] font-bold">
                <span>{k}</span>
                <span className="font-display tabular-nums text-ink-900/60">{(v / 10).toFixed(1)}</span>
              </div>
              <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-brand-100">
                <span data-sc-bar className="block h-full origin-left rounded-full bg-linear-to-r from-brand-500 to-brand-400" style={{ transform: `scaleX(${v / 100})` }} />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-2.5 sm:grid-cols-3">
        {[
          ['Strengths', 'Clear structure', 'bg-emerald-50 text-emerald-800 ring-emerald-100'],
          ['Gaps', 'Salary range', 'bg-gold-50 text-gold-800 ring-gold-200'],
          ['Practice next', 'Team example', 'bg-brand-50 text-brand-700 ring-brand-100'],
        ].map(([k, v, c]) => (
          <span key={k} data-sc-chip className={`rounded-2xl px-3.5 py-2.5 ring-1 ${c}`}>
            <span className="block text-[10.5px] font-extrabold uppercase tracking-[0.14em] opacity-70">{k}</span>
            <span className="mt-0.5 block text-[13.5px] font-bold">{v}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ModulePractice({ s, index, total }) {
  const root = useRef(null);
  const m = mod(index);
  const cards = of(s, 'cards');
  const rounds = of(s, 'p', 0);
  const qs = of(s, 'questions');
  const after = of(s, 'p', 1);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      // Reveals for the mode cards, round picker and scorecard
      mm.add(MOTION_OK, () => {
        const modes = q('[data-mode]');
        gsap.set(modes, { y: 50, opacity: 0 });
        ScrollTrigger.batch(modes, { start: 'top 90%', once: true, onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, stagger: 0.12, duration: 1.1, overwrite: true }) });
        gsap.from(q('[data-round]'), { x: -20, opacity: 0, stagger: 0.08, duration: 0.8, scrollTrigger: { trigger: q('[data-rounds]')[0], start: 'top 85%', once: true } });

        const card = q('[data-scorecard]')[0];
        const ready = q('[data-ready]')[0];
        const r = { v: 0 };
        gsap
          .timeline({ scrollTrigger: { trigger: card, start: 'top 80%', once: true } })
          .from(card, { y: 60, opacity: 0, rotation: 1.5, duration: 1.2 })
          .from(q('[data-ready-blk]'), { scaleY: 0, opacity: 0, stagger: 0.05, duration: 0.5, ease: 'back.out(2)' }, 0.4)
          .fromTo(r, { v: 0 }, { v: 7.6, duration: 1.2, ease: 'power2.out', onUpdate: () => ready && (ready.textContent = r.v.toFixed(1)) }, 0.4)
          .from(q('[data-sc-bar]'), { scaleX: 0, stagger: 0.12, duration: 1.1, ease: 'expo.out' }, 0.5)
          .from(q('[data-sc-chip]'), { y: 16, opacity: 0, stagger: 0.08, duration: 0.7 }, 0.8);
      });

      // Signature scene: the worksheet and the reps level up together
      const build = (tl, sheet = true) => {
        const rows = q('[data-ws-row]');
        const notes = q('[data-ws-note]');
        const fills = q('[data-ws-row] [data-tick-fill]');
        const paths = q('[data-ws-row] [data-tick-path]');
        const reps = q('[data-rep]');
        const glows = q('[data-rep-glow]');
        const covers = q('[data-rep-cover]');
        const blks = q('[data-conf-blk]');
        const lbls = q('[data-conf-lbl]');
        const num = q('[data-conf-num]')[0];
        if (num) num.textContent = '0';
        const c = { v: 0 };
        const setNum = () => num && (num.textContent = String(Math.round(c.v)));

        let prev = 0;
        REPS.forEach((rep, i) => {
          const t = i * 1.1;
          if (sheet)
            tl.from(rows[i], { opacity: 0.35, duration: 0.3 }, t)
              .from(notes[i], { opacity: 0, x: 28, duration: 0.4, ease: 'power3.out' }, t + 0.1)
              .fromTo(fills[i], { scale: 0 }, { scale: 1, duration: 0.18, ease: 'back.out(2)' }, t + 0.8)
              .fromTo(paths[i], { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.18 }, t + 0.86);
          tl.from(reps[i], { opacity: 0.3, duration: 0.25 }, t)
            .to(glows[i], { opacity: 1, duration: 0.2 }, t)
            .fromTo(covers[i], { scaleX: 1 }, { scaleX: 0, duration: 0.6, ease: 'none' }, t + 0.15)
            .fromTo(blks.slice(prev, rep.conf), { opacity: 0.12, scaleY: 0.5 }, { opacity: 1, scaleY: 1, stagger: 0.06, duration: 0.2 }, t + 0.45)
            .fromTo(c, { v: prev }, { v: rep.conf, duration: 0.35, ease: 'none', onUpdate: setNum }, t + 0.45);
          if (i < REPS.length - 1) tl.to(glows[i], { opacity: 0, duration: 0.2 }, t + 1.05);
          CONF_LABELS.forEach((l, k) => {
            if (l.from >= prev && l.from < rep.conf) tl.from(lbls[k], { opacity: 0.3, duration: 0.2 }, t + 0.5);
          });
          prev = rep.conf;
        });
        return () => num && (num.textContent = String(REPS[REPS.length - 1].conf));
      };

      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        const scene = q('[data-scene]')[0];
        const navGap = 96;
        const fits = scene.offsetHeight < window.innerHeight - navGap - 24;
        const top = () => Math.max(navGap, Math.round((window.innerHeight - scene.offsetHeight) / 2 + 36));
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: fits
            ? { trigger: scene, start: () => `top ${top()}px`, end: '+=230%', scrub: 0.4, pin: true, anticipatePin: 1, invalidateOnRefresh: true }
            : { trigger: scene, start: 'top 70%', end: 'bottom 45%', scrub: 0.4, invalidateOnRefresh: true },
        });
        const undo = build(tl);
        tl.to({}, { duration: 0.4 });
        return undo;
      });

      mm.add(`(max-width: 1023px) and ${MOTION_OK}`, () => {
        // Phones: the worksheet rows simply rise in; the rep tracker plays its level-up once it is in view
        const rows = q('[data-ws-row]');
        gsap.set(rows, { y: 26, opacity: 0 });
        ScrollTrigger.batch(rows, { start: 'top 90%', once: true, onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, stagger: 0.1, duration: 0.9, overwrite: true }) });
        const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: q('[data-tracker-wrap]')[0], start: 'top 75%', once: true } });
        const undo = build(tl, false);
        tl.timeScale(1.4);
        return undo;
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id={s.id} data-module={index} aria-labelledby={`${s.id}-title`} className="grain relative scroll-mt-24 overflow-clip bg-brand-950 py-16 text-white sm:py-20 lg:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_40%_at_85%_0%,rgba(109,76,176,0.5),transparent),radial-gradient(45%_35%_at_0%_70%,rgba(244,180,0,0.12),transparent)]" />
      <div className="container-x relative z-[2]">
        <div className={PAD}>
          <ModuleHead s={s} index={index} total={total} dark meta={`${cards.items.length} modes · ${qs.items.length} practice reps`} />

          {/* What you'll get: the two modes, and the round picker */}
          <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-5 sm:mt-14 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
            {cards.items.map((c, i) => (
              <article
                key={c.title}
                data-mode
                className="group relative flex min-w-0 flex-col overflow-hidden rounded-[26px] bg-white/[0.05] p-6 ring-1 ring-white/10 transition-[translate] duration-500 hover:-translate-y-1.5 sm:p-7"
              >
                <div className="flex items-center gap-3">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-[14px] ${i === 0 ? m.badge : 'bg-gold-400 text-ink-950'}`}>
                    <Icon name={c.icon || 'spark'} className="h-5 w-5" />
                  </span>
                  <span aria-hidden="true" className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/50">
                    What you&apos;ll get · Mode {i + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-[1.35rem] font-bold tracking-[-0.02em] text-white">{c.title}</h3>
                <p className="mt-2 text-[15.5px] leading-relaxed text-white/70">
                  <Rich text={c.text} tone="dark" />
                </p>
                <ModeVisual guided={i === 0} />
              </article>
            ))}
            {rounds && (
              <div data-mode className="relative flex min-w-0 flex-col overflow-hidden rounded-[26px] bg-white p-6 text-ink-950 sm:p-7 md:col-span-2 xl:col-span-1">
                <p aria-hidden="true" className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-brand-600">
                  Pick a round
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-900/75">
                  <Rich text={rounds.text} />
                </p>
                <ol data-rounds aria-hidden="true" className="mt-auto grid grid-cols-[minmax(0,1fr)] gap-2 pt-5 md:grid-cols-2 xl:grid-cols-1">
                  {ROUNDS.map((r, i) => (
                    <li key={r} data-round className={`flex items-center gap-3 rounded-2xl px-3 py-2 text-[13px] font-bold ${i === 0 ? 'bg-brand-950 text-white' : 'bg-light-lavender text-ink-900/70'}`}>
                      <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-display text-[11px] ${i === 0 ? 'bg-gold-400 text-ink-950' : 'bg-white text-brand-600'}`}>{i + 1}</span>
                      <span className="min-w-0 truncate">{r}</span>
                      {i === 0 && <span className="ml-auto shrink-0 rounded-full bg-gold-400/15 px-2 py-0.5 text-[10.5px] text-gold-300">Start here</span>}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          {/* Signature scene: worksheet + reps */}
          <div data-scene className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-5 sm:mt-16 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-start xl:gap-6">
            <div className="min-w-0 overflow-hidden rounded-[28px] bg-white text-ink-950 shadow-[0_60px_120px_-60px_rgba(0,0,0,0.85)]">
              <div className="flex items-center justify-between gap-3 border-b border-hairline px-5 py-3.5 sm:px-6">
                <p aria-hidden="true" className="flex items-center gap-2 font-display text-[12.5px] font-extrabold uppercase tracking-[0.16em] text-brand-600">
                  <Icon name="pen" className="h-4 w-4" />
                  Practice worksheet
                </p>
                <span aria-hidden="true" className="rounded-full bg-brand-50 px-3 py-1 text-[11.5px] font-bold text-brand-600">
                  Say each answer out loud
                </span>
              </div>
              <div aria-hidden="true" className="hidden grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] px-6 pt-3 text-[10.5px] font-extrabold uppercase tracking-[0.16em] text-ink-900/40 sm:grid">
                <span>Question</span>
                <span className="pl-5">Tutor&apos;s note</span>
              </div>
              <ol>
                {qs.items.map((it, i) => (
                  <li key={it.q} data-ws-row className="grid grid-cols-[minmax(0,1fr)] gap-3 border-b border-hairline px-5 py-4 last:border-0 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] sm:gap-0 sm:px-6">
                    <div className="flex min-w-0 gap-3 sm:pr-5">
                      <Tick m={m} size="h-7 w-7" className="mt-0.5" />
                      <div className="min-w-0">
                        <span aria-hidden="true" className="block text-[11px] font-extrabold tracking-[0.14em] text-brand-500">
                          Q{i + 1} · Rep {i + 1}
                        </span>
                        <h3 className="mt-0.5 font-display text-[1.125rem] font-bold leading-snug tracking-[-0.015em]">{it.q}</h3>
                      </div>
                    </div>
                    <div data-ws-note className="min-w-0 rounded-2xl bg-gold-50 px-4 py-3 sm:rounded-none sm:border-l-2 sm:border-dashed sm:border-gold-300 sm:bg-transparent sm:py-0.5 sm:pl-5 sm:pr-0">
                      <span aria-hidden="true" className="flex items-center gap-1.5 text-[10.5px] font-extrabold uppercase tracking-[0.16em] text-gold-700">
                        <Icon name="chat" className="h-3.5 w-3.5" />
                        Tutor&apos;s note
                      </span>
                      <p className="mt-1 text-[14px] leading-relaxed text-ink-900/75">
                        <Rich text={it.hint} />
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div data-tracker-wrap className="min-w-0">
              <Tracker />
            </div>
          </div>

          {/* After the session */}
          {after && (
            <div className="mt-14 grid grid-cols-[minmax(0,1fr)] items-center gap-8 sm:mt-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:gap-14">
              <div className="min-w-0">
                <p aria-hidden="true" className="inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-gold-300 ring-1 ring-white/10">
                  <Icon name="check" className="h-3.5 w-3.5" />
                  After every session
                </p>
                <p data-rise className="mt-5 text-[1.125rem] leading-relaxed text-white/80 xl:text-[1.25rem]">
                  <Rich text={after.text} tone="dark" />
                </p>
              </div>
              <Scorecard />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
