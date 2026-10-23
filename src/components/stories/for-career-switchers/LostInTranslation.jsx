'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { Block } from '@/components/page/Blocks';
import { MAYA, SectionHeading, Intro, Persona, Handoff } from './shared';

/*
 * Chapter 1, "Lost in translation": the starting problem. Jordan's experience sits in the translator
 * untranslated: on the purple side, three things in hospital-admin terms; on the gold side, how each one
 * lands with a new kind of employer. Each of the three numbered pins points at one of the three ways a
 * switch stalls (the cards). A dark band then shows the usual workaround: one resume sent everywhere,
 * replies with no feedback. The panel and the replies are fictional sample data, decorative.
 */

const MISREAD = [
  { said: 'Patient access supervisor · rota and bed board', reads: 'An unrelated field' },
  { said: 'Job ad asks: SQL · dashboards · forecasting', reads: 'Every gap looks the same size' },
  { said: 'Interviewer: "Why leave healthcare?"', reads: 'An escape, not a plan' },
];
const REPLIES = ['Northwind Labs', 'Brightpath Software', 'Lumen Studio'];

function MisreadPanel() {
  return (
    <div data-misread aria-hidden="true" className="relative h-full overflow-hidden rounded-[30px] bg-white shadow-[0_60px_120px_-60px_rgba(26,15,51,0.7)] ring-1 ring-brand-200/80">
      {/* App bar: the two languages, nothing translated yet */}
      <div className="flex flex-wrap items-center gap-2 border-b border-hairline px-4 py-3 sm:px-5">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-900 px-3 py-1.5 text-[12px] font-bold text-white">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-300" />
          {MAYA.from}
        </span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-light-lavender text-brand-600">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 8h14l-3-3M20 16H6l3 3" />
          </svg>
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-400 px-3 py-1.5 text-[12px] font-bold text-ink-950">
          <span className="h-1.5 w-1.5 rounded-full bg-ink-950/50" />
          {MAYA.to}
        </span>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-gold-50 px-2.5 py-1 text-[11px] font-bold text-gold-800 ring-1 ring-gold-200">
          <span data-status className="h-1.5 w-1.5 rounded-full bg-gold-500" />
          Not translated yet
        </span>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)] sm:grid-cols-2">
        <p className="hidden bg-brand-900 px-5 pb-1 pt-5 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-300 sm:block sm:px-6">In Jordan&apos;s words</p>
        <p className="hidden bg-gold-100 px-5 pb-1 pt-5 text-[11px] font-bold uppercase tracking-[0.16em] text-gold-800 sm:block sm:px-6">How it lands</p>
        {MISREAD.map((m, i) => (
          <div key={m.said} data-mrow className="contents">
            <div className="relative flex min-h-[112px] items-center gap-3.5 bg-brand-900 px-5 py-5 text-white sm:px-6">
              <span data-mpin className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-400 font-display text-[14px] font-extrabold text-ink-950 shadow-[0_0_0_5px_rgba(249,195,32,0.18)]">{i + 1}</span>
              <span data-said className="min-w-0 font-display text-[17px] font-semibold leading-snug sm:text-[18px] xl:text-[20px]">
                {m.said}
              </span>
              {i < MISREAD.length - 1 && <span className="absolute inset-x-5 bottom-0 h-px bg-white/10 sm:inset-x-6" />}
            </div>
            <div className="relative flex min-h-[96px] items-center gap-3 bg-gold-100 px-5 py-5 text-ink-950 sm:min-h-[112px] sm:px-6">
              <span className="relative min-w-0 flex-1">
                <span data-dots className="absolute left-0 top-1/2 flex -translate-y-1/2 gap-1 opacity-0">
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="h-2 w-2 rounded-full bg-gold-700/60" />
                  ))}
                </span>
                <span data-reads className="block">
                  <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-gold-800/80">Reads as</span>
                  <span className="mt-1 block font-display text-[17px] font-bold leading-snug decoration-gold-600 decoration-wavy decoration-[1.5px] underline-offset-[5px] [text-decoration-line:underline] sm:text-[18px] xl:text-[20px]">
                    {m.reads}
                  </span>
                </span>
              </span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white font-display text-[17px] font-extrabold text-gold-700 ring-1 ring-gold-300">?</span>
              {i < MISREAD.length - 1 && <span className="absolute inset-x-5 bottom-0 h-px bg-ink-950/10 sm:inset-x-6" />}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 bg-brand-950 px-5 py-3.5 sm:px-6">
        <Persona tone="dark" note="Six years of real work, written for a different employer" />
        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-gold-300">Sample</span>
      </div>
    </div>
  );
}

function SameResume() {
  return (
    <div aria-hidden="true" className="relative min-w-0">
      <div data-same className="flex items-center gap-3 rounded-2xl bg-brand-700 p-3 text-white ring-1 ring-white/10">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-brand-200">
          <Icon name="doc" className="h-5 w-5" />
        </span>
        <span className="min-w-0">
          <span className="block break-all text-[13px] font-bold sm:break-normal">maya_resume_FINAL.pdf</span>
          <span className="block text-[12px] font-medium text-brand-200">One version, hospital-admin terms</span>
        </span>
        <span className="ml-auto shrink-0 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold text-white/80">Sent to all</span>
      </div>
      <ul className="relative mt-3 space-y-2 pl-6">
        <span className="absolute bottom-6 left-2 top-0 w-[2px] rounded bg-white/15" />
        {REPLIES.map((c) => (
          <li key={c} data-reply className="relative flex items-center gap-3 rounded-2xl bg-white/[0.06] px-3 py-2.5 ring-1 ring-white/10">
            <span className="absolute -left-4 top-1/2 h-[2px] w-4 bg-white/15" />
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white/70">
              <Icon name="mail" className="h-4 w-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] font-bold text-white">{c}</span>
              <span className="block text-[12px] font-medium text-white/55">&ldquo;Thank you for applying. Unfortunately&hellip;&rdquo;</span>
            </span>
            <span className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold text-gold-300 ring-1 ring-gold-300/50">No feedback</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function LostInTranslation({ s, n }) {
  const root = useRef(null);
  const cards = s.blocks.find((b) => b.type === 'cards');
  const p = s.blocks.find((b) => b.type === 'p');
  const others = s.blocks.filter((b) => b !== cards && b !== p);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(q('[data-intro], [data-persona]'), { y: 30, opacity: 0, stagger: 0.1, duration: 1.1, scrollTrigger: { trigger: root.current, start: 'top 75%', once: true } });

        // The misread: Jordan's words arrive, the pins drop, then each reading "types" in on the gold side
        const tl = gsap.timeline({ scrollTrigger: { trigger: q('[data-misread]')[0], start: 'top 78%', once: true } });
        tl.from(q('[data-misread]'), { y: 50, opacity: 0, duration: 1.1 }, 0)
          .from(q('[data-said]'), { x: -24, opacity: 0, stagger: 0.18, duration: 0.8 }, 0.3)
          .from(q('[data-mpin]'), { scale: 0, rotation: -60, stagger: 0.18, duration: 0.7, ease: 'back.out(2.4)' }, 0.4);
        q('[data-mrow]').forEach((row, i) => {
          const at = 0.8 + i * 0.32;
          const dots = row.querySelector('[data-dots]');
          tl.to(dots, { opacity: 1, duration: 0.15 }, at)
            .to(dots.children, { y: -4, duration: 0.18, stagger: 0.06, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at)
            .to(dots, { opacity: 0, duration: 0.12 }, at + 0.42)
            .from(row.querySelector('[data-reads]'), { y: 10, opacity: 0, duration: 0.6 }, at + 0.45);
        });

        gsap.set(q('[data-card]'), { y: 40, opacity: 0 });
        ScrollTrigger.batch(q('[data-card]'), { start: 'top 88%', once: true, onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, stagger: 0.12, duration: 1 }) });

        gsap
          .timeline({ scrollTrigger: { trigger: q('[data-band]')[0], start: 'top 78%', once: true } })
          .from(q('[data-band]'), { y: 50, opacity: 0, duration: 1.1 }, 0)
          .from(q('[data-same]'), { x: 30, opacity: 0, duration: 0.9 }, 0.3)
          .from(q('[data-reply]'), { x: 30, opacity: 0, stagger: 0.14, duration: 0.8 }, 0.5)
          .from(q('[data-handoff]'), { y: 30, opacity: 0, duration: 1 }, 0.8)
          .from(q('[data-handoff-arrow]'), { x: -16, duration: 0.8, ease: 'back.out(2)' }, 1.1);
      });
    },
    { scope: root }
  );

  return (
    <section id={s.id} ref={root} aria-labelledby={`${s.id}-title`} className="relative scroll-mt-24 overflow-clip bg-light-lavender py-16 sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_35%_at_0%_10%,rgba(196,179,234,0.6),transparent),radial-gradient(35%_30%_at_100%_60%,rgba(252,211,77,0.2),transparent)]" />
      <div className="container-x relative">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <SectionHeading s={s} n={n} className="min-w-0 lg:col-span-7" />
          <div className="min-w-0 lg:col-span-5 lg:pb-2">
            <Intro text={s.intro} />
            <div data-persona className="mt-5">
              <Persona />
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-6 sm:mt-14 lg:grid-cols-12 lg:items-stretch lg:gap-8">
          <div className="min-w-0 lg:col-span-7">
            <MisreadPanel />
          </div>
          {cards && (
            <ul className="grid min-w-0 grid-cols-[minmax(0,1fr)] content-between gap-4 lg:col-span-5">
              {cards.items.map((c, i) => (
                <li key={c.title} data-card>
                  <div className="group relative grid h-full grid-cols-[auto_minmax(0,1fr)] items-start gap-4 overflow-hidden rounded-[24px] bg-white p-5 shadow-[0_24px_50px_-40px_rgba(26,15,51,0.6)] ring-1 ring-hairline transition-transform duration-500 hover:-translate-y-1 sm:p-6">
                    <span aria-hidden="true" className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-950 text-gold-300 shadow-[0_12px_24px_-12px_rgba(26,15,51,0.8)] transition-transform duration-500 group-hover:-rotate-6">
                      <Icon name={c.icon || 'spark'} className="h-5 w-5" />
                      <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gold-400 font-display text-[12px] font-extrabold text-ink-950 ring-2 ring-white">{i + 1}</span>
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-[1.2rem] font-bold leading-snug tracking-[-0.02em] text-ink-950 xl:text-[1.3rem]">{c.title}</h3>
                      <p className="mt-1.5 text-[15.5px] leading-relaxed text-ink-900/70">
                        <Rich text={c.text} />
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {p && (
          <div data-band className="grain relative mt-6 overflow-hidden rounded-[32px] bg-brand-950 p-6 sm:p-10 lg:mt-8 lg:p-12">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_70%_at_0%_100%,rgba(109,76,176,0.55),transparent),radial-gradient(35%_60%_at_100%_0%,rgba(244,180,0,0.14),transparent)]" />
            <div className="relative grid grid-cols-[minmax(0,1fr)] items-center gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="min-w-0 lg:col-span-7">
                <p aria-hidden="true" className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em] text-gold-300">
                  <Icon name="refresh" className="h-4 w-4" />
                  The usual workaround
                </p>
                <p className="mt-4 font-display text-[clamp(1.3rem,1rem+1vw,2rem)] font-semibold leading-[1.35] tracking-[-0.015em] text-white">
                  <Rich text={p.text} tone="dark" />
                </p>
              </div>
              <div className="min-w-0 lg:col-span-5">
                <SameResume />
              </div>
            </div>
          </div>
        )}

        {others.length > 0 && (
          <div className="mt-8 space-y-5">
            {others.map((b, i) => (
              <Block key={i} b={b} />
            ))}
          </div>
        )}

        <Handoff n={2} now="Jordan's resume still speaks hospital administration" next="See what carries over, then translate it" className="mt-6 lg:mt-8" />
      </div>
    </section>
  );
}
