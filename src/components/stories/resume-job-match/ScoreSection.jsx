'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { Header, Glyph } from './shared';

/*
 * Chapter 2, "The score": one composite. On the left a marked-up resume sheet (drawn in code) with the
 * score landing on it in big display numerals; on the right the three things that come
 * with the number, joined by a gold line that draws as you scroll and lights each one in turn. Below, the
 * description and the "guide, not a verdict" note. The score and mini visuals are sample data.
 */

const SCORE = 78;

function Mini({ i }) {
  if (i === 0)
    return (
      <span aria-hidden="true" className="mt-4 flex flex-wrap gap-2">
        {[
          ['Northwind Labs', 86, 'bg-white/10 text-white'],
          ['Brightpath', 78, 'bg-gold-400 text-ink-950'],
          ['Lumen Studio', 58, 'bg-white/10 text-white'],
        ].map(([n, v, c]) => (
          <span key={n} className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] font-bold ${c}`}>
            {n}
            <span className="font-display text-[13px] font-extrabold">{v}</span>
          </span>
        ))}
      </span>
    );
  if (i === 1)
    return (
      <span aria-hidden="true" className="mt-4 flex flex-wrap gap-2">
        {[
          ['React in your recent role', true],
          ['Level fits', true],
          ['GraphQL not shown', false],
        ].map(([t, ok]) => (
          <span key={t} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 py-1 pl-1 pr-3 text-[12px] font-semibold text-white/90">
            <span className={`flex h-5 w-5 items-center justify-center rounded-full ${ok ? 'bg-gold-400' : 'bg-rose-400'} text-ink-950`}>
              <Glyph name={ok ? 'check' : 'dash'} className="h-3 w-3" strokeWidth={3.4} />
            </span>
            {t}
          </span>
        ))}
      </span>
    );
  return (
    <span aria-hidden="true" className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-500 py-1 pl-1 pr-3.5 text-[12.5px] font-bold text-ink-950">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink-950 text-emerald-400">
        <Glyph name="plus" className="h-3.5 w-3.5" strokeWidth={3} />
      </span>
      Add GraphQL with a line of proof
    </span>
  );
}

export default function ScoreSection({ s }) {
  const root = useRef(null);
  const cards = s.blocks.find((b) => b.type === 'cards')?.items || [];
  const para = s.blocks.find((b) => b.type === 'p');
  const callout = s.blocks.find((b) => b.type === 'callout');

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const num = q('[data-big]')[0];
        const counter = { v: 0 };
        const dots = q('[data-dot-on]');
        num.textContent = '0';
        gsap.set(dots, { scale: 0 });

        // One scrubbed scene: the score counts up, the meter fills, the line draws and lights each item
        const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: q('[data-composite]')[0], start: 'top 75%', end: 'bottom 70%', scrub: 0.4 } });
        tl.to(counter, { v: SCORE, duration: 1, ease: 'power2.out', onUpdate: () => (num.textContent = Math.round(counter.v)) }, 0)
          .fromTo(q('[data-seg]'), { opacity: 0 }, { opacity: 1, stagger: 0.05, duration: 0.05 }, 0)
          .fromTo(q('[data-line]'), { scaleY: 0 }, { scaleY: 1, duration: 1.4 }, 0.1);
        dots.forEach((d, i) => tl.to(d, { scale: 1, duration: 0.15, ease: 'back.out(2)' }, 0.15 + i * 0.5));
        tl.fromTo(q('[data-photo]'), { y: 30 }, { y: -30, duration: 1.6 }, 0);

        gsap.from(q('[data-badge]'), { y: 50, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: q('[data-composite]')[0], start: 'top 70%', once: true } });
        gsap.from(q('[data-after] > *'), { y: 36, opacity: 0, stagger: 0.12, duration: 1.1, scrollTrigger: { trigger: q('[data-after]')[0], start: 'top 85%', once: true } });

        return () => {
          num.textContent = String(SCORE);
        };
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id={s.id} aria-labelledby={`${s.id}-title`} className="relative scroll-mt-24 overflow-hidden bg-white py-16 sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_30%_at_90%_10%,rgba(196,179,234,0.35),transparent),radial-gradient(35%_30%_at_5%_90%,rgba(252,211,77,0.14),transparent)]" />
      <div className="container-x relative">
        <Header s={s} n={2} />

        {/* The composite: a marked-up resume with the score, and what comes with it */}
        <div data-composite className="mt-12 grid grid-cols-[minmax(0,1fr)] overflow-hidden rounded-[32px] bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 text-white shadow-[0_40px_70px_-45px_rgba(26,15,51,0.8)] sm:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:rounded-[40px]">
          <div className="relative min-h-[540px] overflow-hidden sm:min-h-[600px] lg:min-h-[660px]">
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_30%,rgba(155,127,212,0.45),transparent),radial-gradient(40%_35%_at_80%_80%,rgba(244,180,0,0.18),transparent)]" />
            {/* A marked-up resume sheet, drawn in code */}
            <div aria-hidden="true" className="absolute left-1/2 top-8 w-[min(78%,420px)] -translate-x-1/2 rotate-[4deg] sm:top-12 lg:top-14">
              <div data-photo className="rounded-[8px] bg-white p-5 text-ink-950 shadow-[0_30px_50px_-24px_rgba(0,0,0,0.75)] sm:p-7">
                <span className="block font-display text-[17px] font-extrabold tracking-[-0.02em] sm:text-[21px]">Jordan Lee</span>
                <span className="block text-[11px] font-semibold text-ink-900/55 sm:text-[12.5px]">React Developer · Austin, TX</span>
                <span className="mt-4 block border-b border-ink-900/10 pb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-600">Summary</span>
                <span className="mt-2 block text-[11px] leading-[1.6] text-ink-900/70 sm:text-[12.5px]">
                  Six years shipping <span className="rounded-[2px] bg-gold-300 px-0.5 font-semibold text-ink-950">React</span> and{' '}
                  <span className="rounded-[2px] bg-gold-300 px-0.5 font-semibold text-ink-950">TypeScript</span> products.
                </span>
                <span className="mt-4 block border-b border-ink-900/10 pb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-600">Experience</span>
                <span className="mt-2 block space-y-1.5">
                  <span className="block h-2 w-full rounded-full bg-brand-100" />
                  <span className="block h-2 w-[86%] rounded-full bg-brand-100 shadow-[0_3px_0_#9b7fd4]" />
                  <span className="block h-2 w-[64%] rounded-full bg-brand-100" />
                </span>
                <span className="mt-4 block border-b border-ink-900/10 pb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-600">Skills</span>
                <span className="mt-2 flex flex-wrap gap-1.5">
                  {['Jest', 'CSS', 'Accessibility'].map((k) => (
                    <span key={k} className="rounded-full bg-light-lavender px-2 py-0.5 text-[10.5px] font-bold text-brand-700">
                      {k}
                    </span>
                  ))}
                  <span className="rounded-full border border-dashed border-rose-400 px-2 py-0.5 text-[10.5px] font-bold text-rose-600">GraphQL?</span>
                </span>
              </div>
              <span className="absolute -right-4 top-16 rotate-[-6deg] rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-bold text-ink-950 shadow-[0_8px_16px_-8px_rgba(0,0,0,0.6)] sm:-right-8">Level fits</span>
            </div>
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-950/90 to-transparent" />

            {/* The score landing on the moment */}
            <div data-badge aria-hidden="true" className="absolute inset-x-4 bottom-4 rounded-[26px] bg-brand-950/90 p-5 ring-1 ring-white/15 sm:inset-x-auto sm:bottom-8 sm:left-8 sm:w-[min(360px,80%)] sm:p-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-gold-300">Match score · this one job</span>
              <span className="mt-1 flex items-baseline font-display font-extrabold leading-[0.9] tracking-[-0.06em]">
                <span data-big className="bg-gradient-to-b from-gold-200 to-gold-500 bg-clip-text text-[clamp(4.5rem,3.2rem+4.5vw,7.5rem)] text-transparent">
                  {SCORE}
                </span>
                <span className="ml-2 text-[1.6rem] tracking-[-0.02em] text-white/40">/100</span>
              </span>
              {/* Slim segmented bar: one block per 5 points */}
              <span className="mt-3 grid grid-cols-[repeat(20,minmax(0,1fr))] gap-[3px]">
                {Array.from({ length: 20 }, (_, i) => (
                  <span key={i} className="relative h-2 rounded-[2px] bg-white/10">
                    {i < Math.round(SCORE / 5) && <span data-seg className={`absolute inset-0 rounded-[2px] ${i < 12 ? 'bg-gold-400' : 'bg-emerald-400'}`} />}
                  </span>
                ))}
              </span>
              <span className="mt-2 block text-[12px] font-semibold text-white/55">Sample score, React Developer at Brightpath Software</span>
            </div>
          </div>

          <div className="relative min-w-0 p-7 sm:p-10 lg:p-14 xl:p-16">
            <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgba(244,180,0,0.18),transparent)]" />
            <p className="relative text-xs font-bold uppercase tracking-[0.16em] text-gold-300">What comes with the number</p>
            <ol className="relative mt-8 space-y-9 lg:space-y-11">
              <span aria-hidden="true" className="absolute bottom-6 left-[27px] top-6 w-[2px] rounded-full bg-white/10">
                <span data-line className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-gold-300 to-emerald-400" />
              </span>
              {cards.map((c, i) => (
                <li key={c.title} className="relative grid grid-cols-[56px_minmax(0,1fr)] gap-5">
                  <span aria-hidden="true" className="relative flex h-14 w-14 items-center justify-center rounded-full bg-brand-950 text-gold-300 ring-2 ring-gold-400/60">
                    <Icon name={c.icon || 'spark'} className="h-6 w-6" />
                    <span data-dot-on className="absolute inset-0 flex items-center justify-center rounded-full bg-gold-400 text-ink-950">
                      <Icon name={c.icon || 'spark'} className="h-6 w-6" />
                    </span>
                  </span>
                  <span className="min-w-0 pt-1">
                    <h3 className="font-display text-[clamp(1.35rem,1.1rem+0.8vw,1.85rem)] font-bold leading-tight tracking-[-0.025em] text-white">{c.title}</h3>
                    <p className="mt-2 text-[16px] leading-relaxed text-white/80 sm:text-[17px]">
                      <Rich text={c.text} tone="dark" />
                    </p>
                    <Mini i={i} />
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* The description and the note */}
        <div data-after className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-6 lg:mt-8 lg:grid-cols-12 lg:gap-8">
          {para && (
            <div className="relative min-w-0 rounded-[30px] bg-light-lavender p-7 sm:p-10 lg:col-span-7">
              <p className="font-display text-[clamp(1.15rem,1rem+0.55vw,1.5rem)] font-medium leading-[1.55] tracking-[-0.01em] text-ink-950">
                <Rich text={para.text} />
              </p>
            </div>
          )}
          {callout && (
            <aside className="relative min-w-0 overflow-hidden rounded-[30px] bg-ink-950 p-7 text-white sm:p-10 lg:col-span-5">
              <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-gold-300 to-gold-600" />
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-400 text-ink-950">
                  <Icon name="shield" className="h-5 w-5" />
                </span>
                <p className="font-display text-[1.35rem] font-bold tracking-[-0.02em]">{callout.title}</p>
              </div>
              <p className="mt-4 text-[16px] leading-relaxed text-white/80">
                <Rich text={callout.text} tone="dark" />
              </p>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
