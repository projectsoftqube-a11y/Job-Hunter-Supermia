'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { Block } from '@/components/page/Blocks';
import { RunningHead, Numeral, Title, Lead, Para, Avatar } from './shared';

/*
 * Chapter 04, "The critique", on the lavender field. The practice prompts hang as a critique wall: four
 * large quote cards, each on its own colour block, with the hint pinned on as the reviewer's note. On
 * desktop the wall assembles with the scroll (cards swing in from alternate sides, then each note lands).
 * The closing paragraph sits beside a sample scorecard sheet (no dials): a big readiness numeral with a
 * 10-block bar and three report bars that fill. The chapter, and Noa's story, ends on the outcome strip.
 * The scorecard is sample data, decorative.
 */

const CARDS = [
  { box: 'bg-brand-950 text-white', glyph: 'text-gold-400', sub: 'text-white/55', note: 'bg-gold-400 text-ink-950', noteSub: 'text-ink-950/65', tone: 'light' },
  { box: 'bg-white text-ink-950', glyph: 'text-brand-300', sub: 'text-ink-900/50', note: 'bg-brand-600 text-white', noteSub: 'text-white/65', tone: 'dark' },
  { box: 'bg-gold-400 text-ink-950', glyph: 'text-brand-950', sub: 'text-ink-950/60', note: 'bg-brand-950 text-white', noteSub: 'text-white/60', tone: 'dark' },
  { box: 'bg-brand-600 text-white', glyph: 'text-gold-300', sub: 'text-white/60', note: 'bg-white text-ink-950', noteSub: 'text-ink-900/55', tone: 'light' },
];

function Wall({ items }) {
  return (
    <ol data-wall className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-5 sm:mt-16 md:grid-cols-2 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-6 lg:pb-24">
      {items.map((it, i) => {
        const c = CARDS[i % CARDS.length];
        return (
          <li key={it.q} data-crit className={`group min-w-0 ${i % 2 ? 'lg:translate-y-24' : ''}`}>
            <article className={`relative flex h-full flex-col overflow-hidden rounded-[34px] p-6 shadow-[0_50px_90px_-50px_rgba(26,15,51,0.7)] transition-[translate] duration-500 hover:-translate-y-1.5 sm:p-8 lg:p-10 ${c.box}`}>
              <div className="flex items-start justify-between gap-4">
                <p className={`text-[12.5px] font-bold uppercase tracking-[0.18em] ${c.sub}`}>Prompt {String(i + 1).padStart(2, '0')}</p>
                <span aria-hidden="true" className={`-mt-2 font-display text-[clamp(4.5rem,3rem+3vw,7rem)] font-extrabold leading-[0.6] ${c.glyph}`}>
                  &ldquo;
                </span>
              </div>
              <h3 className="mt-5 font-display text-[clamp(1.55rem,1rem+1.7vw,2.7rem)] font-extrabold leading-[1.08] tracking-[-0.03em]">{it.q}</h3>
              {it.hint && (
                <div data-note className="mt-auto pt-8">
                  <div className={`relative -rotate-1 rounded-[24px] p-4 shadow-[0_24px_40px_-26px_rgba(0,0,0,0.7)] transition-[rotate] duration-500 group-hover:rotate-0 sm:p-5 ${c.note}`}>
                    <p className={`flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.16em] ${c.noteSub}`}>
                      <Icon name="pen" className="h-4 w-4" />
                      Reviewer&apos;s note
                    </p>
                    <p className="mt-2 text-[15.5px] font-medium leading-relaxed">
                      <Rich text={it.hint} tone={c.tone} />
                    </p>
                  </div>
                </div>
              )}
            </article>
          </li>
        );
      })}
    </ol>
  );
}

const READY = 7.8;
const BARS = [
  { t: 'Clarity', v: 8.2 },
  { t: 'Confidence', v: 7.4 },
  { t: 'Technical depth', v: 7.6 },
];

function Scorecard() {
  return (
    <div data-score aria-hidden="true" className="relative min-w-0 overflow-hidden rounded-[32px] bg-white p-5 text-ink-950 shadow-[0_60px_110px_-55px_rgba(26,15,51,0.8)] sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="flex min-w-0 items-center gap-3">
          <Avatar className="h-10 w-10 text-[13px]" />
          <span className="min-w-0">
            <span className="block text-[14px] font-bold leading-tight">Scorecard · Product Designer</span>
            <span className="block text-[12px] font-medium text-ink-900/55">Noa · sample</span>
          </span>
        </span>
        <span className="flex items-center gap-1.5 text-[11.5px] font-bold">
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-brand-600">
            <Icon name="check" className="h-3 w-3" strokeWidth={3} />
            Guided
          </span>
          <Icon name="arrow" className="h-3.5 w-3.5 text-brand-400" strokeWidth={2.4} />
          <span className="rounded-full bg-brand-950 px-2.5 py-1 text-gold-300">Real simulation</span>
        </span>
      </div>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-x-5 gap-y-2">
        <p className="font-display leading-none">
          <span data-ready className="text-[clamp(4.2rem,3rem+3vw,6.2rem)] font-extrabold tracking-[-0.05em]">
            {READY.toFixed(1)}
          </span>
          <span className="ml-1 text-[1.3rem] font-bold text-ink-900/40">/10</span>
        </p>
        <p className="pb-2 text-[12px] font-bold uppercase tracking-[0.18em] text-brand-600">Readiness</p>
      </div>
      <div className="mt-3 grid grid-cols-10 gap-1">
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} className="relative h-3.5 overflow-hidden rounded-[4px] bg-brand-100">
            {i < Math.round(READY) && <span data-seg className={`absolute inset-0 ${i < 6 ? 'bg-brand-500' : 'bg-gold-400'}`} />}
          </span>
        ))}
      </div>

      <ul className="mt-6 space-y-3.5">
        {BARS.map((b) => (
          <li key={b.t}>
            <span className="flex items-center justify-between text-[13px] font-bold">
              {b.t}
              <span className="font-display">{b.v.toFixed(1)}</span>
            </span>
            <span className="mt-1.5 block h-2.5 overflow-hidden rounded-full bg-brand-100">
              <span className="block h-full rounded-full" style={{ width: `${b.v * 10}%` }}>
                <span data-rbar className="block h-full w-full origin-left rounded-full bg-gradient-to-r from-brand-600 to-brand-400" />
              </span>
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-6 grid grid-cols-3 gap-2 text-[11.5px] font-bold">
        {[
          ['Strength', 'Clear structure', 'bg-brand-50 text-brand-700'],
          ['Gap', 'Why that metric', 'bg-gold-100 text-gold-800'],
          ['Next', 'Stakeholder story', 'bg-brand-950 text-gold-300'],
        ].map(([k, v, cls]) => (
          <span key={k} data-chipx className={`rounded-2xl px-2.5 py-2 leading-tight ${cls}`}>
            <span className="block text-[10px] uppercase tracking-[0.12em] opacity-70">{k}</span>
            <span className="mt-0.5 block">{v}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function CritiqueSection({ s }) {
  const root = useRef(null);
  const qs = s.blocks.find((b) => b.type === 'questions');
  const qIndex = s.blocks.indexOf(qs);
  const before = s.blocks.filter((b, i) => b.type === 'p' && (qIndex < 0 || i < qIndex));
  const after = s.blocks.filter((b, i) => b.type === 'p' && qIndex >= 0 && i > qIndex);
  const others = s.blocks.filter((b) => b !== qs && b.type !== 'p');

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: 'top 75%', once: true } })
          .from(q('[data-numeral]'), { yPercent: 40, opacity: 0, duration: 1.3 }, 0)
          .from(q('[data-lead], [data-copy]'), { y: 30, opacity: 0, stagger: 0.12, duration: 1.1 }, 0.2);

        // The scorecard: readiness counts up, the blocks and bars fill
        const num = q('[data-ready]')[0];
        const c = { v: 0 };
        let shown = '';
        gsap
          .timeline({ scrollTrigger: { trigger: q('[data-score]')[0], start: 'top 80%', once: true } })
          .from(q('[data-score]'), { y: 60, opacity: 0, duration: 1.2 }, 0)
          .fromTo(
            c,
            { v: 0 },
            {
              v: READY,
              duration: 2,
              onUpdate: () => {
                const v = c.v.toFixed(1);
                if (v !== shown) num.textContent = shown = v;
              },
            },
            0.3
          )
          .from(q('[data-seg]'), { scaleY: 0.2, opacity: 0, stagger: 0.07, duration: 0.5 }, 0.3)
          .from(q('[data-rbar]'), { scaleX: 0, stagger: 0.12, duration: 1.3 }, 0.6)
          .from(q('[data-chipx]'), { y: 16, opacity: 0, stagger: 0.08, duration: 0.8 }, 1);
        gsap.from(q('[data-outcome] > *'), { y: 40, opacity: 0, stagger: 0.12, duration: 1.1, scrollTrigger: { trigger: q('[data-outcome]')[0], start: 'top 90%', once: true } });

        return () => {
          num.textContent = READY.toFixed(1);
        };
      });

      // Desktop: the wall assembles with the scroll, cards from alternate sides, then each note lands
      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        const cards = q('[data-crit]');
        const tl = gsap.timeline({ defaults: { ease: 'power2.out' }, scrollTrigger: { trigger: q('[data-wall]')[0], start: 'top 85%', end: 'center 50%', scrub: 0.4 } });
        cards.forEach((card, i) => {
          tl.from(card, { x: i % 2 ? 90 : -90, y: 60, rotation: i % 2 ? 3 : -3, opacity: 0, duration: 1 }, i * 0.45).from(
            card.querySelector('[data-note]'),
            { y: 40, rotation: i % 2 ? -4 : 4, scale: 1.08, opacity: 0, duration: 0.7 },
            i * 0.45 + 0.5
          );
        });
      });

      mm.add(`(max-width: 1023px) and ${MOTION_OK}`, () => {
        const cards = q('[data-crit]');
        gsap.set(cards, { y: 60, opacity: 0 });
        ScrollTrigger.batch(cards, { start: 'top 90%', once: true, onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, stagger: 0.12, duration: 1.1 }) });
      });
    },
    { scope: root }
  );

  return (
    <section id={s.id} ref={root} aria-labelledby={`${s.id}-title`} className="relative scroll-mt-24 overflow-clip bg-brand-100 py-16 text-ink-950 sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_35%_at_100%_0%,rgba(196,179,234,0.8),transparent),radial-gradient(35%_30%_at_0%_55%,rgba(255,255,255,0.75),transparent),radial-gradient(30%_25%_at_95%_90%,rgba(252,211,77,0.25),transparent)]" />
      <div className="container-x relative">
        <RunningHead n={4} eyebrow={s.eyebrow} tone="lavender" />

        <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-12 xl:col-span-7">
            <Numeral n={4} tone="lavender" className="text-[clamp(5.5rem,3rem+7vw,11rem)]" />
            <Title s={s} tone="lavender" className="mt-6" />
            <Lead text={s.intro} tone="lavender" className="mt-6 max-w-[46rem]" />
          </div>
          <div className="min-w-0 lg:col-span-12 xl:col-span-5 xl:self-end">
            <div data-copy className="space-y-4 rounded-[28px] bg-white/70 p-5 ring-1 ring-brand-200 sm:p-7 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0 xl:block xl:space-y-4">
              {before.map((b, i) => (
                <Para key={i} text={b.text} tone="lavender" />
              ))}
            </div>
          </div>
        </div>

        {qs && <Wall items={qs.items} />}

        {after.length > 0 && (
          <div className="mt-14 grid grid-cols-[minmax(0,1fr)] items-center gap-8 sm:mt-20 lg:grid-cols-12 lg:gap-12">
            <div className="min-w-0 lg:col-span-6">
              <p className="text-[13px] font-bold uppercase tracking-[0.18em] text-brand-600">Guided, then strict</p>
              {after.map((b, i) => (
                <p key={i} data-copy className="mt-4 font-display text-[clamp(1.2rem,0.95rem+0.9vw,1.75rem)] font-semibold leading-[1.4] tracking-[-0.015em] text-ink-950">
                  <Rich text={b.text} />
                </p>
              ))}
            </div>
            <div className="min-w-0 lg:col-span-6">
              <Scorecard />
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

        <div data-outcome className="grain relative mt-14 grid grid-cols-[minmax(0,1fr)] items-center gap-5 overflow-hidden rounded-[30px] bg-brand-950 p-5 text-white shadow-[0_40px_80px_-50px_rgba(26,15,51,0.9)] sm:mt-16 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-7 sm:p-7 lg:px-10">
          <Avatar className="relative z-[2] h-14 w-14 text-[17px] sm:h-16 sm:w-16" />
          <p className="relative z-[2] min-w-0">
            <span className="block text-[12.5px] font-bold uppercase tracking-[0.18em] text-gold-300">The outcome</span>
            <span className="mt-1.5 block font-display text-[clamp(1.1rem,0.9rem+0.8vw,1.65rem)] font-bold leading-snug tracking-[-0.02em]">
              Noa walks into the interview having explained her work out loud already, and every application went out because she sent it.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
