'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { Block } from '@/components/page/Blocks';
import { MAYA, SectionHeading, Intro, Persona, Handoff } from './shared';

/*
 * Chapter 2, "The translation": the turning point and the method.
 * (1) Translation coverage: Jordan scores her resume against one job. The skills read from her resume fly
 *     out of it and slot into two lanes, what already carries over (purple) and the gaps (gold), while
 *     the score counts up and a 20-block bar fills. Scrubbed with the scroll on desktop.
 * (2) The translator (pinned on desktop): the four steps play on a split-screen translator. Gaps are
 *     sorted, then three of Jordan's phrases translate segment by segment from hospital-admin terms into
 *     operations terms, proof lines attach, and the phrasebook carries to the next job. The step list
 *     follows along with class toggles. Markup is the final state (phones, reduced motion, no JS).
 * All translator and score data is fictional and decorative.
 */

const SCORE = 68;
const BLOCKS = 20;
const LIT = Math.round((SCORE / 100) * BLOCKS);
const CARRY = ['Scheduling', 'Reporting', 'Stakeholder updates', 'Process improvement', 'Budget tracking'];
const GAPS = [
  { skill: 'SQL', tag: 'learn soon' },
  { skill: 'Dashboards', tag: 'learn soon' },
  { skill: 'Forecasting', tag: 'real gap for now' },
];
const TRIAGE = [
  { skill: 'Onboarding', tag: 'Have it, another name', cls: 'bg-brand-600 text-white', tagCls: 'text-brand-100' },
  { skill: 'SQL', tag: 'Learn soon', cls: 'bg-gold-300 text-ink-950', tagCls: 'text-ink-950/65' },
  { skill: 'Forecasting', tag: 'Real gap for now', cls: 'bg-white text-ink-950 ring-1 ring-ink-950/15', tagCls: 'text-ink-900/55' },
];
// Each row: [old-field words, new-field words] segments that translate one after another
const PHRASES = [
  {
    segs: [
      ['Kept volunteering for', 'Led'],
      ['the scheduling', 'workforce scheduling'],
      ['and reporting projects', 'and operational reporting'],
    ],
    proof: 'Rebuilt the shift planning process',
  },
  {
    segs: [
      ['Trained', 'Ran'],
      ['new staff', 'onboarding and enablement'],
      ['at the front desk', 'for a frontline team'],
    ],
    proof: 'New hires settled in sooner',
  },
  {
    segs: [
      ['Took over', 'Owned'],
      ['department reporting', 'recurring KPI reporting'],
      ['for the unit', 'for operations leads'],
    ],
  },
];
const NEXT_JOBS = ['Brightpath Software · Operations Analyst', 'Lumen Studio · Business Operations'];

function SwapIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8h14l-3-3M20 16H6l3 3" />
    </svg>
  );
}

/* ---------- Scene 1: translation coverage ---------- */
function Coverage() {
  return (
    <div data-cov aria-hidden="true" className="relative overflow-hidden rounded-[30px] bg-white shadow-[0_60px_120px_-60px_rgba(26,15,51,0.7)] ring-1 ring-brand-200/80">
      <div className="grain relative bg-brand-950 p-5 text-white sm:p-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_100%_0%,rgba(244,180,0,0.18),transparent),radial-gradient(50%_80%_at_0%_100%,rgba(109,76,176,0.5),transparent)]" />
        <div className="relative flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gold-300">Translation coverage</p>
            <p className="mt-1 font-display text-[17px] font-bold">
              {MAYA.role} <span className="font-medium text-white/55">· {MAYA.company} · sample</span>
            </p>
          </div>
          <span data-src className="relative inline-flex items-center gap-2 rounded-full bg-white/10 py-1.5 pl-1.5 pr-3.5 text-[12px] font-bold ring-1 ring-white/15">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-500 text-white">
              <Icon name="doc" className="h-3.5 w-3.5" />
            </span>
            Jordan&apos;s resume
          </span>
        </div>
        <div className="relative mt-4 flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
          <p className="font-display leading-none">
            <span data-cov-num className="text-[clamp(3.6rem,2.8rem+2.6vw,5.6rem)] font-extrabold tracking-[-0.05em]">
              {SCORE}
            </span>
            <span className="ml-1 text-[1.2rem] font-bold text-white/45">/100</span>
          </p>
          <p className="pb-2 text-[12px] font-bold uppercase tracking-[0.16em] text-white/60">Match score for this job</p>
        </div>
        <div className="relative mt-3 grid grid-cols-[repeat(20,minmax(0,1fr))] gap-[3px]">
          {Array.from({ length: BLOCKS }, (_, i) => (
            <span key={i} className="relative h-3 overflow-hidden rounded-[3px] bg-white/10">
              {i < LIT && <span data-block className={`absolute inset-0 ${i < 9 ? 'bg-brand-400' : 'bg-gold-400'}`} />}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)] sm:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="bg-brand-50 p-5 sm:p-6">
          <p className="flex items-center justify-between gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-700">
            <span>Carries over</span>
            <span className="rounded-full bg-brand-600 px-2 py-0.5 text-white">6</span>
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {CARRY.map((c) => (
              <span key={c} data-chip className="rounded-xl bg-brand-600 px-3 py-1.5 text-[13px] font-bold text-white shadow-[0_8px_16px_-10px_rgba(75,46,131,0.9)]">
                ✓ {c}
              </span>
            ))}
          </div>
          <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-700/70">Under another name</p>
          <span data-chip className="mt-2 inline-flex max-w-full flex-wrap overflow-hidden rounded-xl bg-gold-400 text-[13px] font-bold shadow-[0_8px_16px_-10px_rgba(26,15,51,0.7)]">
            <span className="bg-brand-700 px-3 py-1.5 text-white">Training new staff</span>
            <span className="flex items-center bg-gold-400 px-3 py-1.5 text-ink-950">→ Onboarding</span>
          </span>
        </div>
        <div className="bg-gold-50 p-5 sm:p-6">
          <p className="flex items-center justify-between gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-gold-800">
            <span>Gaps to close</span>
            <span className="rounded-full bg-gold-500 px-2 py-0.5 text-ink-950">3</span>
          </p>
          <div className="mt-3 flex flex-col items-start gap-2">
            {GAPS.map((g) => (
              <span key={g.skill} data-chip className="inline-flex flex-wrap items-center gap-x-2 rounded-xl border-2 border-dashed border-gold-400 bg-white px-3 py-1.5 text-[13px] font-bold text-ink-950">
                {g.skill}
                <span className="text-[11.5px] font-semibold text-gold-800">{g.tag}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-start gap-3 border-t border-hairline px-5 py-4 sm:px-6">
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-950 text-gold-300">
          <Icon name="target" className="h-3.5 w-3.5" />
        </span>
        <p className="text-[13.5px] font-medium leading-snug text-ink-900/75">
          <span className="font-bold text-ink-950">Fix first:</span> say &ldquo;onboarding&rdquo; where the resume says &ldquo;training&rdquo;, then start on SQL.
        </p>
      </div>
    </div>
  );
}

/* ---------- Scene 2: the translator ---------- */
function Translator() {
  return (
    <div data-device aria-hidden="true" className="relative min-w-0 overflow-hidden rounded-[32px] bg-white shadow-[0_60px_120px_-60px_rgba(26,15,51,0.75)] ring-1 ring-brand-200/80">
      {/* App bar */}
      <div className="flex flex-wrap items-center gap-2 px-4 py-3 sm:px-5">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-900 px-3 py-1.5 text-[12px] font-bold text-white">{MAYA.from}</span>
        <span data-swap className="flex h-7 w-7 items-center justify-center rounded-full bg-light-lavender text-brand-600">
          <SwapIcon />
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-400 px-3 py-1.5 text-[12px] font-bold text-ink-950">{MAYA.to}</span>
        <span className="ml-auto hidden items-center gap-2 text-[12px] font-bold text-ink-900/55 sm:inline-flex">
          <span className="relative flex h-6 w-6 items-center justify-center overflow-hidden rounded-full font-display text-[11px] font-extrabold text-white">
            <span className="absolute inset-y-0 left-0 w-1/2 bg-brand-600" />
            <span className="absolute inset-y-0 right-0 w-1/2 bg-gold-500" />
            <span className="relative">{MAYA.initial}</span>
          </span>
          Jordan&apos;s experience
        </span>
      </div>

      {/* 1. Sort the gaps */}
      <div className="flex flex-wrap items-center gap-2 border-y border-hairline bg-light-lavender px-4 py-3 sm:px-5">
        <span className="mr-1 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-600">Sorted</span>
        {TRIAGE.map((t) => (
          <span key={t.skill} data-tri className={`inline-flex flex-wrap items-center gap-x-1.5 rounded-xl px-2.5 py-1.5 text-[12.5px] font-bold ${t.cls}`}>
            {t.skill}
            <span className={`text-[11px] font-semibold ${t.tagCls}`}>{t.tag}</span>
          </span>
        ))}
      </div>

      {/* 2-3. Phrases translate, proof attaches */}
      <div className="grid grid-cols-[minmax(0,1fr)] sm:grid-cols-2">
        <p className="hidden bg-brand-900 px-5 pb-0 pt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-300 sm:block sm:px-6">Hospital-admin terms</p>
        <p className="hidden bg-gold-400 px-5 pb-0 pt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-950/60 sm:block sm:px-6">Operations terms</p>
        {PHRASES.map((ph, i) => (
          <div key={i} data-row className="contents">
            <div className="relative bg-brand-900 px-5 py-4 text-white sm:px-6 sm:py-5 lg:py-3.5 xl:py-5">
              <p className="font-display text-[16px] font-semibold leading-[1.45] sm:text-[17px] lg:text-[15.5px] xl:text-[17.5px] min-[1600px]:text-[19px]">
                {ph.segs.map(([from], j) => (
                  <span key={j} className="relative mr-[0.3em] inline">
                    <span data-src-seg className="relative">
                      {from}
                      <span data-src-bar className="absolute inset-x-0 -bottom-[2px] h-[3px] origin-left rounded-full bg-gold-400/80" />
                    </span>
                  </span>
                ))}
              </p>
              {i < PHRASES.length - 1 && <span className="absolute inset-x-5 bottom-0 h-px bg-white/10 sm:inset-x-6" />}
            </div>
            <div className="relative bg-gold-400 px-5 py-4 text-ink-950 sm:px-6 sm:py-5 lg:py-3.5 xl:py-5">
              <p className="font-display text-[16px] font-bold leading-[1.45] sm:text-[17px] lg:text-[15.5px] xl:text-[17.5px] min-[1600px]:text-[19px]">
                {ph.segs.map(([, to], j) => (
                  <span key={j} data-tgt-seg className="mr-[0.3em] inline-block">
                    {to}
                  </span>
                ))}
              </p>
              {ph.proof && (
                <p data-proof className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-ink-950 px-2.5 py-1 text-[12px] font-bold text-gold-200">
                  <span className="text-gold-400">+</span> Proof: {ph.proof}
                </p>
              )}
              {i < PHRASES.length - 1 && <span className="absolute inset-x-5 bottom-0 h-px bg-ink-950/10 sm:inset-x-6" />}
            </div>
          </div>
        ))}
      </div>

      {/* 4. Carry it to the next job */}
      <div data-carry className="flex flex-wrap items-center gap-2 bg-brand-950 px-4 py-3.5 sm:px-5">
        <span className="mr-1 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-gold-300">
          <Icon name="book" className="h-4 w-4" />
          Phrasebook reused for
        </span>
        {NEXT_JOBS.map((j) => (
          <span key={j} data-job className="rounded-lg bg-white/10 px-2.5 py-1 text-[12px] font-semibold text-white ring-1 ring-white/10">
            {j}
          </span>
        ))}
      </div>
    </div>
  );
}

function OnlyReal({ title, text }) {
  return (
    <aside data-only className="relative overflow-hidden rounded-[28px] bg-gold-50 p-6 ring-1 ring-gold-300 sm:p-8 lg:p-10">
      <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-6 lg:grid-cols-12 lg:gap-10">
        <div className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] items-start gap-4 lg:col-span-7">
          <span aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-950 text-gold-300">
            <Icon name="shield" className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            {title && <p className="font-display text-[clamp(1.2rem,1rem+0.6vw,1.6rem)] font-bold leading-snug tracking-[-0.02em] text-ink-950">{title}</p>}
            <p className="mt-2 text-[16px] leading-relaxed text-ink-900/80">
              <Rich text={text} />
            </p>
          </div>
        </div>
        <div aria-hidden="true" className="min-w-0 lg:col-span-5">
          <div className="rounded-2xl bg-white p-4 shadow-[0_24px_50px_-36px_rgba(26,15,51,0.6)] ring-1 ring-gold-200">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gold-800">Jordan&apos;s to-do list, not a script</p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-center gap-2.5 rounded-xl bg-brand-50 px-3 py-2 text-[13px] font-semibold text-ink-950">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-brand-600 text-[11px] text-white">✓</span>
                Onboarding: on the resume, I can explain it
              </li>
              <li className="flex items-center gap-2.5 rounded-xl bg-gold-50 px-3 py-2 text-[13px] font-semibold text-ink-950">
                <span className="h-5 w-5 shrink-0 rounded-md border-2 border-gold-500" />
                SQL: add it once I can talk it through
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default function Translation({ s, n }) {
  const root = useRef(null);
  const p = s.blocks.find((b) => b.type === 'p');
  const steps = s.blocks.find((b) => b.type === 'steps')?.items || [];
  const callout = s.blocks.find((b) => b.type === 'callout');
  const others = s.blocks.filter((b) => b !== p && b.type !== 'steps' && b !== callout);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      // Scene 1, both sizes: chips leave the resume and slot into their lane while the score counts
      mm.add(MOTION_OK, () => {
        gsap.from(q('[data-intro], [data-cov-copy]'), { y: 30, opacity: 0, stagger: 0.12, duration: 1.1, scrollTrigger: { trigger: root.current, start: 'top 75%', once: true } });

        const panel = q('[data-cov]')[0];
        const src = q('[data-src]')[0];
        const num = q('[data-cov-num]')[0];
        const desktop = window.matchMedia('(min-width: 1024px)').matches;
        const box = (el) => {
          let x = 0;
          let y = 0;
          let e = el;
          while (e && e !== panel) {
            x += e.offsetLeft;
            y += e.offsetTop;
            e = e.offsetParent;
          }
          return { x: x + el.offsetWidth / 2, y: y + el.offsetHeight / 2 };
        };
        const counter = { v: 0 };
        let shown = -1;
        const tl = gsap.timeline({
          defaults: { ease: desktop ? 'none' : 'expo.out' },
          scrollTrigger: desktop ? { trigger: panel, start: 'top 80%', end: 'center 45%', scrub: true, invalidateOnRefresh: true } : { trigger: panel, start: 'top 80%', once: true },
        });
        tl.from(panel, { y: 50, opacity: 0, duration: 0.5, ease: desktop ? 'power2.out' : 'expo.out' }, 0)
          .from(src, { scale: 0.7, duration: 0.3, ease: 'back.out(2)' }, 0.2)
          .fromTo(
            counter,
            { v: 0 },
            {
              v: SCORE,
              duration: desktop ? 1.4 : 2,
              onUpdate: () => {
                const v = Math.round(counter.v);
                if (v !== shown) num.textContent = shown = v;
              },
            },
            0.35
          )
          .from(q('[data-block]'), { opacity: 0, scaleY: 0.3, stagger: 0.05, duration: 0.2 }, 0.35);
        q('[data-chip]').forEach((chip, i) => {
          tl.fromTo(
            chip,
            { x: () => box(src).x - box(chip).x, y: () => box(src).y - box(chip).y, scale: 0.4, opacity: 0 },
            { x: 0, y: 0, scale: 1, opacity: 1, duration: desktop ? 0.45 : 1, ease: desktop ? 'power3.out' : 'expo.out' },
            0.45 + i * 0.1
          );
        });
        return () => {
          num.textContent = SCORE;
        };
      });

      // Scene 2, desktop: the pinned translator
      mm.add({ pin: `(min-width: 1280px) and (min-height: 700px) and ${MOTION_OK}`, reveal: MOTION_OK }, (ctx) => {
        if (!ctx.conditions.pin) {
          gsap
            .timeline({ scrollTrigger: { trigger: q('[data-steps]')[0], start: 'top 85%', once: true } })
            .from(q('[data-step]'), { y: 34, opacity: 0, stagger: 0.08, duration: 1 })
            .from(q('[data-device]'), { y: 50, opacity: 0, duration: 1 }, 0.3)
            .from(q('[data-tgt-seg]'), { y: 10, opacity: 0, stagger: 0.05, duration: 0.6 }, 0.7);
          return;
        }
        const list = q('[data-steps]')[0];
        const items = q('[data-step-card]');
        const bars = q('[data-step-bar]');
        list.dataset.run = 'true';

        const PHASES = [0, 1, 3.3, 4.4];
        let active = -1;
        const setActive = (t) => {
          const a = PHASES.filter((ph) => t >= ph).length - 1;
          if (a === active) return;
          active = a;
          items.forEach((li, i) => (li.dataset.active = i === a ? 'true' : 'false'));
        };

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: q('[data-pin]')[0], start: 'top top', end: '+=300%', scrub: 0.4, pin: true, anticipatePin: 1, invalidateOnRefresh: true },
          onUpdate() {
            setActive(this.time());
          },
        });
        [1, 2.3, 1.1, 1].forEach((d, i) => bars[i] && tl.fromTo(bars[i], { scaleX: 0 }, { scaleX: 1, duration: d }, PHASES[i]));

        // 1. Sort the gaps
        tl.from(q('[data-tri]'), { y: 16, scale: 0.8, opacity: 0, stagger: 0.18, duration: 0.35, ease: 'back.out(2)' }, 0.15);

        // 2. Rename: each phrase translates segment by segment
        tl.to(q('[data-swap]'), { rotation: 180, duration: 0.4, ease: 'power2.inOut' }, 1);
        q('[data-row]').forEach((row, i) => {
          const srcBars = row.querySelectorAll('[data-src-bar]');
          const tgt = row.querySelectorAll('[data-tgt-seg]');
          srcBars.forEach((b, j) => {
            const at = 1.15 + i * 0.7 + j * 0.2;
            tl.from(b, { scaleX: 0, duration: 0.2, ease: 'power2.out' }, at).from(tgt[j], { y: 14, opacity: 0, duration: 0.25, ease: 'power2.out' }, at + 0.06);
          });
        });

        // 3. Proof lines attach
        tl.from(q('[data-proof]'), { x: -20, opacity: 0, stagger: 0.3, duration: 0.4, ease: 'back.out(1.8)' }, 3.4);

        // 4. The phrasebook carries to the next job
        tl.from(q('[data-carry]'), { y: 30, opacity: 0, duration: 0.35, ease: 'power3.out' }, 4.45)
          .from(q('[data-job]'), { x: 24, opacity: 0, stagger: 0.15, duration: 0.3, ease: 'back.out(2)' }, 4.6)
          .to({}, { duration: 0.6 }, 5);

        setActive(0);
        return () => {
          delete list.dataset.run;
          items.forEach((li) => delete li.dataset.active);
        };
      });

      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ scrollTrigger: { trigger: q('[data-only]')[0], start: 'top 85%', once: true } })
          .from(q('[data-only]'), { y: 40, opacity: 0, duration: 1 })
          .from(q('[data-handoff]'), { y: 30, opacity: 0, duration: 1 }, 0.25)
          .from(q('[data-handoff-arrow]'), { x: -16, duration: 0.8, ease: 'back.out(2)' }, 0.5);
      });
    },
    { scope: root }
  );

  return (
    <section id={s.id} ref={root} aria-labelledby={`${s.id}-title`} className="relative scroll-mt-24 overflow-clip bg-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(35%_25%_at_100%_5%,rgba(252,211,77,0.18),transparent),radial-gradient(35%_25%_at_0%_45%,rgba(196,179,234,0.4),transparent)]" />

      <div className="container-x relative pt-16 sm:pt-24 lg:pt-28">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <SectionHeading s={s} n={n} className="min-w-0 lg:col-span-7" />
          <Intro text={s.intro} className="min-w-0 lg:col-span-5 lg:pb-2" />
        </div>

        <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-8 sm:mt-14 lg:grid-cols-12 lg:items-center lg:gap-12 xl:gap-16">
          <div data-cov-copy className="min-w-0 lg:col-span-5">
            <Persona note={`Scoring against ${MAYA.role} · ${MAYA.company}`} />
            {p && (
              <p className="mt-6 text-[17px] leading-relaxed text-ink-900/80 sm:text-[18px]">
                <Rich text={p.text} />
              </p>
            )}
            <ul aria-hidden="true" className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-2 sm:grid-cols-3 lg:grid-cols-[minmax(0,1fr)] xl:grid-cols-3">
              {[
                ['bg-brand-600', 'Carries over', 'Say it louder'],
                ['bg-[linear-gradient(90deg,var(--color-brand-700)_50%,var(--color-gold-400)_50%)]', 'Another name', 'Use their word'],
                ['border-2 border-dashed border-gold-500 bg-white', 'Gap', 'Close it or wait'],
              ].map(([sw, t, d]) => (
                <li key={t} className="flex items-center gap-3 rounded-2xl bg-light-lavender px-3 py-2.5 ring-1 ring-hairline">
                  <span className={`h-5 w-5 shrink-0 rounded-md ${sw}`} />
                  <span className="min-w-0 leading-tight">
                    <span className="block text-[13px] font-bold text-ink-950">{t}</span>
                    <span className="block text-[12px] font-medium text-ink-900/55">{d}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0 lg:col-span-7">
            <Coverage />
          </div>
        </div>
      </div>

      <div data-pin className="relative pt-12 sm:pt-16 xl:flex xl:min-h-[max(100svh,720px)] xl:items-center xl:pb-4 xl:pt-[84px]">
        <div className="container-x grid w-full grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12 xl:gap-16">
          <ol data-steps className="group/steps relative min-w-0 space-y-2.5">
            {steps.map((st, i) => (
              <li key={st.title} data-step>
                <div className="group/card relative overflow-hidden rounded-[22px] bg-white p-4 shadow-[0_24px_50px_-40px_rgba(26,15,51,0.6)] ring-1 ring-hairline transition-[opacity,transform] duration-500 group-data-[run=true]/steps:opacity-45 data-[active=true]:translate-x-2 data-[active=true]:opacity-100! sm:p-5" data-step-card>
                  <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[22px] opacity-0 ring-2 ring-inset ring-gold-400 transition-opacity duration-500 group-data-[active=true]/card:opacity-100" />
                  <div className="relative flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-950 font-display text-sm font-extrabold text-gold-400">{String(i + 1).padStart(2, '0')}</span>
                    <div className="min-w-0">
                      <h3 className="font-display text-[1.15rem] font-bold leading-snug tracking-[-0.02em] text-ink-950">{st.title}</h3>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-ink-900/70">
                        <Rich text={st.text} />
                      </p>
                    </div>
                  </div>
                  <span aria-hidden="true" className="mt-4 block h-1.5 overflow-hidden rounded-full bg-brand-50">
                    <span data-step-bar className="block h-full w-full origin-left bg-gradient-to-r from-brand-600 to-gold-400" />
                  </span>
                </div>
              </li>
            ))}
          </ol>
          <Translator />
        </div>
      </div>

      <div className="container-x relative pb-16 pt-8 sm:pb-24 lg:pb-28 lg:pt-6">
        {callout && <OnlyReal title={callout.title} text={callout.text} />}
        {others.length > 0 && (
          <div className="mt-6 space-y-5">
            {others.map((b, i) => (
              <Block key={i} b={b} />
            ))}
          </div>
        )}
        <Handoff n={3} now="Jordan can say her work in operations terms" next="Keep one resume per direction she is testing" className="mt-6" />
      </div>
    </section>
  );
}
