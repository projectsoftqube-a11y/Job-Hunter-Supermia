'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { Block } from '@/components/page/Blocks';
import { MAYA, SectionHeading, Intro } from './shared';

/*
 * Chapter 4, "Saying it out loud": the confident outcome, on the page's dark band. Jordan answers the
 * "why are you switching" question in a live voice interview, and her example answer runs as captions.
 * Pinned on desktop: each caption line lights up in turn with a gold sweep while the matching part of
 * the three-part answer lights on the left; then the interviewer's follow-up arrives, because the second
 * answer is the one to practice. Below, the rounds where the question comes up and the guided-to-strict
 * path with a sample scorecard. The interview frame, rounds strip and scorecard are decorative.
 */

const LINE_PART = [0, 1, 2, 2];
const PART_TAG = ['Pride', 'The moment', 'Why this role', 'Closing the gaps'];
const ROUNDS = [
  { name: 'HR & Introduction', note: 'The why question', on: true },
  { name: 'Role & Knowledge', note: 'Where gaps show', on: true },
  { name: 'Practical & Behavioral' },
  { name: 'Managerial & Final' },
];
const READY = 7;

function Bars() {
  return (
    <span aria-hidden="true" className="flex h-5 items-center gap-[3px]">
      {[0.5, 0.9, 0.65, 1, 0.55, 0.8, 0.4].map((h, i) => (
        <span key={i} className={`w-[3px] origin-center rounded-full bg-gold-400 ${i < 5 ? 'animate-[eq_1.1s_ease-in-out_infinite]' : ''}`} style={{ height: `${h * 100}%`, animationDelay: `${i * -0.17}s` }} />
      ))}
    </span>
  );
}

function Player({ ex }) {
  return (
    <div data-player className="relative min-w-0 overflow-hidden rounded-[32px] bg-[#120a26] shadow-[0_60px_120px_-50px_rgba(0,0,0,0.85)] ring-1 ring-white/10">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(109,76,176,0.45),transparent),radial-gradient(40%_30%_at_100%_100%,rgba(244,180,0,0.12),transparent)]" />

      {/* Interview frame */}
      <div aria-hidden="true" className="relative flex flex-wrap items-center gap-2 border-b border-white/10 px-4 py-3 sm:px-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-gold-400 px-3 py-1 text-[11.5px] font-bold text-ink-950">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-ink-950/50" />
            <span className="relative h-2 w-2 rounded-full bg-ink-950" />
          </span>
          Live voice interview
        </span>
        <span className="rounded-full bg-white/[0.08] px-3 py-1 text-[11.5px] font-bold text-white/80 ring-1 ring-white/10">HR &amp; Introduction</span>
        <span className="ml-auto rounded-full bg-white/[0.08] px-3 py-1 text-[11.5px] font-bold text-brand-200 ring-1 ring-white/10">Guided practice · sample</span>
      </div>

      <div className="relative px-4 pb-5 pt-5 sm:px-6 sm:pb-6 lg:pb-5 lg:pt-4">
        <div aria-hidden="true" className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-500 text-white">
            <Icon name="mic" className="h-5 w-5" />
          </span>
          <div className="min-w-0 rounded-2xl rounded-tl-md bg-white/[0.08] px-4 py-2.5 ring-1 ring-white/10">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-300">AI interviewer</p>
            <p className="mt-0.5 font-display text-[16px] font-semibold text-white sm:text-[17px]">So, why are you switching careers?</p>
          </div>
        </div>

        {/* The captions: the example answer, line by line */}
        <div className="mt-4 rounded-[22px] bg-black/30 p-4 ring-1 ring-white/10 sm:p-5 lg:p-4 xl:p-5">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {ex.label && <span className="rounded-full bg-gold-400 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-950">{ex.label}</span>}
            {ex.meta && <span className="text-[13px] font-medium text-white/60">{ex.meta}</span>}
            <span aria-hidden="true" className="ml-auto inline-flex items-center gap-2">
              <span className="relative flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full font-display text-[11px] font-extrabold text-white">
                <span className="absolute inset-y-0 left-0 w-1/2 bg-brand-600" />
                <span className="absolute inset-y-0 right-0 w-1/2 bg-gold-500" />
                <span className="relative">{MAYA.initial}</span>
              </span>
              <span className="text-[12px] font-bold text-white/70">{MAYA.name} is answering</span>
              <Bars />
            </span>
          </p>
          <div className="mt-3 space-y-2 xl:space-y-2.5">
            {ex.lines.map((l, i) => (
              <p key={i} data-cap className="relative grid grid-cols-[minmax(0,1fr)] gap-1 rounded-xl px-3 py-2 min-[1600px]:py-2 xl:py-1.5 sm:grid-cols-[96px_minmax(0,1fr)] sm:gap-3 lg:max-xl:grid-cols-[minmax(0,1fr)]">
                <span data-cap-hl aria-hidden="true" className="pointer-events-none absolute inset-0 origin-left rounded-xl bg-gold-400/[0.13] opacity-0 ring-1 ring-inset ring-gold-400/40" />
                <span aria-hidden="true" className="relative pt-[3px] text-[11px] font-bold uppercase tracking-[0.12em] text-gold-300 lg:max-xl:hidden">
                  {LINE_PART[i] + 1} · {PART_TAG[i]}
                </span>
                <span className="relative font-display text-[16px] font-medium leading-[1.5] text-white sm:text-[17px] lg:text-[16px] xl:text-[17px] min-[1600px]:text-[18.5px]">
                  <Rich text={l} tone="dark" />
                </span>
              </p>
            ))}
          </div>
        </div>

        <div data-follow aria-hidden="true" className="mt-4 flex xl:mt-3 items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-500 text-white">
            <Icon name="chat" className="h-5 w-5" />
          </span>
          <div className="min-w-0 rounded-2xl rounded-tl-md bg-white px-4 py-2.5 text-ink-950">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-600">Follow-up</p>
            <p className="mt-0.5 font-display text-[15px] font-semibold sm:text-[16px]">What has the data course covered so far?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Rounds() {
  return (
    <ol aria-hidden="true" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {ROUNDS.map((r, i) => (
        <li key={r.name} data-round className={`relative min-w-0 rounded-2xl px-3.5 py-3 ring-1 ${r.on ? 'bg-gold-400 text-ink-950 ring-gold-300' : 'bg-white/[0.05] text-white/70 ring-white/10'}`}>
          <span className={`font-display text-[12px] font-extrabold ${r.on ? 'text-ink-950/55' : 'text-white/40'}`}>Round {i + 1}</span>
          <span className="mt-0.5 block font-display text-[14px] font-bold leading-snug">{r.name}</span>
          {r.note && <span className="mt-1.5 inline-block rounded-md bg-ink-950 px-1.5 py-0.5 text-[11px] font-bold text-gold-300">{r.note}</span>}
        </li>
      ))}
    </ol>
  );
}

function Scorecard() {
  return (
    <div aria-hidden="true" className="mt-5 rounded-2xl bg-white p-4 text-ink-950">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-light-lavender px-2.5 py-1 text-[11.5px] font-bold text-brand-700 ring-1 ring-brand-200">Guided practice</span>
        <span className="text-brand-400">→</span>
        <span className="rounded-full bg-brand-950 px-2.5 py-1 text-[11.5px] font-bold text-gold-300">Real simulation</span>
        <span className="ml-auto text-[11px] font-bold uppercase tracking-[0.14em] text-ink-900/50">Sample scorecard</span>
      </div>
      <div className="mt-4 flex items-end gap-3">
        <p className="font-display leading-none">
          <span className="text-[2.6rem] font-extrabold tracking-[-0.04em]">{READY}</span>
          <span className="text-[1rem] font-bold text-ink-900/40">/10</span>
        </p>
        <p className="pb-1 text-[12px] font-bold uppercase tracking-[0.14em] text-brand-600">Readiness</p>
      </div>
      <div className="mt-2 grid grid-cols-10 gap-1">
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} className="h-2.5 overflow-hidden rounded-[3px] bg-brand-100">
            {i < READY && <span data-ready className={`block h-full w-full origin-left ${i < 4 ? 'bg-brand-500' : 'bg-gold-400'}`} />}
          </span>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5 text-[11.5px] font-bold">
        <span className="rounded-md bg-brand-50 px-2 py-1 text-brand-700">Strength: a clear why</span>
        <span className="rounded-md bg-gold-100 px-2 py-1 text-gold-800">Gap: SQL depth</span>
        <span className="rounded-md bg-light-lavender px-2 py-1 text-ink-900/70">Next: Role &amp; Knowledge</span>
      </div>
    </div>
  );
}

export default function Captions({ s, n }) {
  const root = useRef(null);
  const ps = s.blocks.filter((b) => b.type === 'p');
  const lead = ps[0];
  const after = ps[1];
  const list = s.blocks.find((b) => b.type === 'list');
  const ex = s.blocks.find((b) => b.type === 'example');
  const callout = s.blocks.find((b) => b.type === 'callout');
  const others = s.blocks.filter((b) => b !== lead && b !== after && b !== list && b !== ex && b !== callout);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add({ pin: `(min-width: 1280px) and (min-height: 700px) and ${MOTION_OK}`, reveal: MOTION_OK }, (ctx) => {
        if (!ctx.conditions.pin) {
          gsap
            .timeline({ scrollTrigger: { trigger: q('[data-player]')[0], start: 'top 85%', once: true } })
            .from(q('[data-player]'), { y: 50, opacity: 0, duration: 1 })
            .from(q('[data-cap]'), { y: 16, opacity: 0, stagger: 0.12, duration: 0.8 }, 0.3)
            .from(q('[data-follow]'), { y: 16, opacity: 0, duration: 0.8 }, 0.8);
          return;
        }
        const caps = q('[data-cap]');
        const hls = q('[data-cap-hl]');
        const parts = q('[data-part]');
        gsap.set(caps, { opacity: 0.32 });
        let lit = -2;
        const light = (i) => {
          if (i === lit) return;
          lit = i;
          parts.forEach((p, k) => (p.dataset.on = i >= 0 && LINE_PART[i] === k ? 'true' : 'false'));
        };
        const T = [0.3, 1.3, 2.3, 3.3];
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: q('[data-pin]')[0], start: 'top top', end: '+=260%', scrub: 0.4, pin: true, anticipatePin: 1, invalidateOnRefresh: true },
          onUpdate() {
            const t = this.time();
            light(T.filter((x) => t >= x).length - 1);
          },
        });
        tl.from(q('[data-player]'), { y: 16, duration: 0.3, ease: 'power2.out' }, 0);
        caps.forEach((c, i) => {
          tl.to(c, { opacity: 1, duration: 0.2 }, T[i]).fromTo(hls[i], { opacity: 1, scaleX: 0 }, { scaleX: 1, duration: 0.75, ease: 'power1.inOut' }, T[i]);
          if (i < caps.length - 1) tl.to(c, { opacity: 0.6, duration: 0.2 }, T[i + 1]).to(hls[i], { opacity: 0, duration: 0.2 }, T[i + 1]);
        });
        tl.from(q('[data-follow]'), { y: 24, opacity: 0, duration: 0.35, ease: 'back.out(1.6)' }, 4.25).to({}, { duration: 0.6 }, 4.6);

        light(-1);
        return () => {
          parts.forEach((p) => delete p.dataset.on);
        };
      });

      mm.add(MOTION_OK, () => {
        gsap.from(q('[data-intro], [data-lead]'), { y: 30, opacity: 0, stagger: 0.12, duration: 1.1, scrollTrigger: { trigger: root.current, start: 'top 75%', once: true } });
        gsap
          .timeline({ scrollTrigger: { trigger: q('[data-after]')[0], start: 'top 85%', once: true } })
          .from(q('[data-after]'), { y: 40, opacity: 0, duration: 1 })
          .from(q('[data-round]'), { y: 20, opacity: 0, stagger: 0.08, duration: 0.8 }, 0.2)
          .from(q('[data-calm]'), { y: 40, opacity: 0, duration: 1 }, 0.15)
          .from(q('[data-ready]'), { scaleX: 0, stagger: 0.06, duration: 0.5 }, 0.6)
          .from(q('[data-outcome]'), { y: 30, opacity: 0, duration: 1 }, 0.5);
      });
    },
    { scope: root }
  );

  return (
    <section id={s.id} ref={root} aria-labelledby={`${s.id}-title`} className="grain relative scroll-mt-24 overflow-clip bg-brand-950 text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_30%_at_0%_0%,rgba(109,76,176,0.55),transparent),radial-gradient(35%_25%_at_100%_55%,rgba(244,180,0,0.12),transparent),radial-gradient(40%_25%_at_20%_100%,rgba(109,76,176,0.35),transparent)]" />

      <div className="container-x relative pt-16 sm:pt-24 lg:pt-28">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <SectionHeading s={s} n={n} tone="dark" className="min-w-0 lg:col-span-7" />
          <Intro text={s.intro} tone="dark" className="min-w-0 lg:col-span-5 lg:pb-2" />
        </div>
      </div>

      <div data-pin className="relative pt-10 sm:pt-14 xl:flex xl:min-h-[max(100svh,720px)] xl:items-center xl:pb-4 xl:pt-[84px]">
        <div className="container-x grid w-full grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] xl:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-center lg:gap-12 xl:gap-16">
          <div data-lead className="min-w-0">
            {lead && (
              <p className="font-display text-[clamp(1.3rem,1rem+0.9vw,1.9rem)] font-semibold leading-snug tracking-[-0.015em] text-white">
                <Rich text={lead.text} tone="dark" />
              </p>
            )}
            {list && (
              <ol className="mt-6 space-y-3">
                {list.items.map((it, i) => (
                  <li key={i} data-part className="group/part relative grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4 overflow-hidden rounded-[22px] bg-white/[0.05] p-4 ring-1 ring-white/10 transition-[background-color,transform,opacity] duration-500 data-[on=false]:opacity-60 data-[on=true]:translate-x-2 data-[on=true]:bg-white/[0.1] sm:p-5">
                    <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[22px] opacity-0 ring-2 ring-inset ring-gold-400 transition-opacity duration-500 group-data-[on=true]/part:opacity-100" />
                    <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gold-400 font-display text-[15px] font-extrabold text-ink-950">{i + 1}</span>
                    <span className="min-w-0 pt-1.5 text-[16px] font-medium leading-relaxed text-white/90 sm:text-[17px]">
                      <Rich text={it} tone="dark" />
                    </span>
                  </li>
                ))}
              </ol>
            )}
          </div>
          {ex && <Player ex={ex} />}
        </div>
      </div>

      <div className="container-x relative pb-16 pt-10 sm:pb-24 lg:pb-28 lg:pt-6">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-12 lg:gap-8">
          {after && (
            <div data-after className="min-w-0 rounded-[28px] bg-white/[0.05] p-6 ring-1 ring-white/10 sm:p-8 lg:col-span-7">
              <p className="text-[17px] leading-relaxed text-brand-100 sm:text-[18px]">
                <Rich text={after.text} tone="dark" />
              </p>
              <div className="mt-6">
                <Rounds />
              </div>
            </div>
          )}
          {callout && (
            <aside data-calm className="min-w-0 rounded-[28px] bg-gradient-to-br from-brand-700 to-brand-900 p-6 ring-1 ring-white/10 sm:p-8 lg:col-span-5">
              <div className="flex items-start gap-3">
                <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gold-400 text-ink-950">
                  <Icon name="check" className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  {callout.title && <p className="font-display text-[1.2rem] font-bold leading-snug text-white">{callout.title}</p>}
                  <p className="mt-2 text-[15.5px] leading-relaxed text-brand-100">
                    <Rich text={callout.text} tone="dark" />
                  </p>
                </div>
              </div>
              <Scorecard />
            </aside>
          )}
        </div>
        {others.length > 0 && (
          <div className="mt-6 space-y-5">
            {others.map((b, i) => (
              <Block key={i} b={b} />
            ))}
          </div>
        )}

        {/* The arc closes: the translation is complete */}
        <div data-outcome aria-hidden="true" className="mt-6 overflow-hidden rounded-[26px] ring-1 ring-white/10 lg:mt-8">
          <div className="grid grid-cols-[minmax(0,1fr)] sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="flex items-center gap-3 bg-brand-700 px-5 py-4 sm:px-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-200">Was</span>
              <span className="font-display text-[15px] font-bold sm:text-[16px]">Six years in {MAYA.from.toLowerCase()}, &ldquo;unrelated&rdquo;</span>
            </div>
            <div className="flex items-center gap-3 bg-gold-400 px-5 py-4 text-ink-950 sm:px-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-950/60">Now</span>
              <span className="font-display text-[15px] font-bold sm:text-[16px]">Translated, versioned and said out loud</span>
              <span className="ml-auto hidden h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink-950 text-gold-300 sm:flex">
                <Icon name="check" className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
