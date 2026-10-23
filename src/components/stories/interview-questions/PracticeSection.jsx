'use client';

import { useRef } from 'react';
import CreativeHeading from '@/components/CreativeHeading';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { ReportMock } from '@/components/mocks';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap';
import { GUTTER, H2, Numeral, RunningHead } from './shared';

/*
 * The last chapter: from reading to rehearsing. The four steps are a drill written across the page
 * with big italic numerals; then the way JobHunter asks the follow-up for you, beside a sample
 * scorecard clipped to the page; and the librarian's stamped note that this is a study list.
 */

export default function PracticeSection({ s, n }) {
  const root = useRef(null);
  const steps = s.blocks.find((b) => b.type === 'steps');
  const paras = s.blocks.filter((b) => b.type === 'p');
  const list = s.blocks.find((b) => b.type === 'list');
  const callouts = s.blocks.filter((b) => b.type === 'callout');

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(q('[data-numeral]'), { yPercent: 18 }, { yPercent: -18, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'top top', scrub: true } });
        ScrollTrigger.batch(q('[data-drill]'), { start: 'top 88%', once: true, onEnter: (els) => gsap.from(els, { y: 50, opacity: 0, stagger: 0.12, duration: 1.1, ease: 'expo.out' }) });
        gsap.from(q('[data-clip]'), { y: 60, rotate: 3, opacity: 0, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: q('[data-clip]')[0], start: 'top 85%', once: true } });
        gsap.from(q('[data-stamp]'), { scale: 1.8, rotate: -24, opacity: 0, duration: 0.7, ease: 'back.out(2.2)', scrollTrigger: { trigger: q('[data-stamp]')[0], start: 'top 85%', once: true } });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id={s.id} aria-labelledby={`${s.id}-title`} className="relative scroll-mt-24 overflow-hidden bg-light-lavender py-[72px] sm:py-24 lg:py-28">
      <div className={`container-x ${GUTTER}`}>
        <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-end lg:gap-10">
          <div className="-mb-2 lg:mb-0">
            <Numeral n={n} />
          </div>
          <div className="min-w-0">
            <RunningHead n={n} eyebrow={s.eyebrow} meta={steps ? `${steps.items.length} steps` : null} />
            <CreativeHeading id={`${s.id}-title`} lines={s.h2} className={`mt-5 ${H2}`} />
          </div>
        </div>
        {s.intro && (
          <p className="mt-8 max-w-[52rem] text-lead font-medium text-ink-900/75">
            <Rich text={s.intro} />
          </p>
        )}

        {steps && (
          <ol className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-x-8 gap-y-2 sm:grid-cols-2 xl:grid-cols-4">
            {steps.items.map((st, i) => (
              <li key={i} data-drill className="relative min-w-0 border-t-2 border-ink-950 pb-4 pt-5">
                <span aria-hidden="true" className="block font-display text-[3.25rem] font-extrabold italic leading-none tracking-[-0.06em] text-brand-600/25">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 font-display text-[1.25rem] font-bold leading-snug tracking-[-0.02em] text-ink-950">{st.title}</h3>
                <p className="mt-2.5 text-[15.5px] leading-[1.7] text-ink-900/75">
                  <Rich text={st.text} />
                </p>
              </li>
            ))}
          </ol>
        )}

        <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-7">
            {paras.map((b, i) => (
              <p key={i} className="text-[17.5px] leading-[1.8] text-ink-900/80">
                <Rich text={b.text} />
              </p>
            ))}
            {list && (
              <ul className="mt-6 space-y-3">
                {list.items.map((t, i) => (
                  <li key={i} className="flex gap-4 rounded-2xl bg-white px-5 py-4 text-[16px] leading-[1.65] text-ink-900/80 ring-1 ring-hairline">
                    <span aria-hidden="true" className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-950 text-gold-300">
                      <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    <span className="min-w-0">
                      <Rich text={t} />
                    </span>
                  </li>
                ))}
              </ul>
            )}
            {callouts.map((c, i) => (
              <aside key={i} className="relative mt-8 rounded-[6px] border-2 border-dashed border-brand-300 bg-[#fffdf6] p-6 pr-6 sm:pr-36">
                <span data-stamp aria-hidden="true" className="absolute right-5 top-5 hidden h-24 w-24 rotate-[-12deg] items-center justify-center rounded-full border-[3px] border-rose-500/70 text-center font-mono text-[10px] font-extrabold uppercase leading-tight tracking-[0.1em] text-rose-500/80 sm:flex">
                  Study
                  <br />
                  list
                </span>
                {c.title && <p className="font-display text-[1.2rem] font-bold text-ink-950">{c.title}</p>}
                <p className="mt-2 text-[16px] leading-[1.7] text-ink-900/80">
                  <Rich text={c.text} />
                </p>
              </aside>
            ))}
          </div>
          <div className="min-w-0 lg:col-span-5">
            <figure data-clip className="relative mx-auto max-w-[480px] rotate-[1.5deg] rounded-[8px] bg-[#fffdf6] p-4 pt-8 shadow-[0_24px_48px_-30px_rgba(26,15,51,0.6)] ring-1 ring-ink-950/10 lg:sticky lg:top-28">
              <span aria-hidden="true" className="absolute -top-4 left-10 h-12 w-6 rounded-full border-[3px] border-ink-900/40 border-b-transparent" />
              <div aria-hidden="true">
                <ReportMock />
              </div>
              <figcaption className="mt-4 flex items-center justify-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-ink-900/55">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                Scorecard after a session · sample data
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
