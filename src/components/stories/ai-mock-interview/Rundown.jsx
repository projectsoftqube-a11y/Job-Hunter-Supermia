'use client';

import { useRef } from 'react';
import CreativeHeading from '@/components/CreativeHeading';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';
import { Slate, H2_LIGHT } from './shared';

/*
 * Segment 2, "Run of show". The four steps read like a studio rundown: four cues on one rail, a gold
 * playhead that travels the rail with the scroll and lights each cue as it passes, and a small
 * code-drawn preview of what happens at that cue. The callout is the producer's note beside the title.
 */

function CueArt({ i }) {
  if (i === 0)
    return (
      <div className="relative h-full overflow-hidden rounded-2xl bg-light-lavender p-4">
        <div className="mx-auto h-full w-[78%] rounded-lg bg-white p-3 shadow-[0_14px_30px_-18px_rgba(26,15,51,0.5)]">
          <span className="block h-2 w-1/2 rounded bg-brand-950" />
          <span className="mt-2 block h-1.5 w-full rounded bg-brand-100" />
          <span className="mt-1.5 block h-1.5 w-4/5 rounded bg-brand-100" />
          <span className="mt-3 flex flex-wrap gap-1">
            {['React', '6 yrs', 'Senior'].map((t) => (
              <span key={t} className="rounded bg-gold-100 px-1.5 py-0.5 text-[9.5px] font-bold text-gold-800">
                {t}
              </span>
            ))}
          </span>
          <span className="mt-2 block h-1.5 w-3/5 rounded bg-brand-100" />
        </div>
        <span className="absolute inset-x-6 top-[46%] h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent shadow-[0_0_12px_rgba(244,180,0,0.9)]" />
      </div>
    );
  if (i === 1)
    return (
      <div className="flex h-full flex-col justify-center gap-2 rounded-2xl bg-light-lavender p-4">
        <span className="flex items-center gap-2 rounded-lg bg-white px-2.5 py-2 text-[11px] font-bold text-ink-950 shadow-sm">
          <span className="flex h-5 w-5 items-center justify-center rounded bg-brand-50 font-display text-[10px] text-brand-600">N</span>
          Frontend Engineer · Northwind Labs
        </span>
        <span className="grid grid-cols-4 gap-1">
          {[0, 1, 2, 3].map((r) => (
            <span key={r} className={`rounded-md py-1.5 text-center font-mono text-[10px] font-bold ${r === 1 ? 'bg-brand-950 text-gold-300' : 'bg-white text-ink-900/50'}`}>
              R{r + 1}
            </span>
          ))}
        </span>
      </div>
    );
  if (i === 2)
    return (
      <div className="flex h-full items-center justify-between gap-3 rounded-2xl bg-brand-950 p-4">
        <span className="relative flex h-8 w-16 shrink-0 items-center rounded-full bg-white/10 p-1 ring-1 ring-white/15">
          <span className="h-6 w-6 rounded-full bg-gold-400 shadow-[0_0_12px_rgba(249,195,32,0.8)]" />
        </span>
        <span className="flex h-9 flex-1 items-center justify-center gap-[3px]">
          {[0.5, 0.9, 0.65, 1, 0.55, 0.8, 0.4, 0.95, 0.6].map((h, b) => (
            <span key={b} className="w-[4px] rounded-full bg-gold-400" style={{ height: `${h * 100}%` }} />
          ))}
        </span>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-500 text-white">
          <Icon name="mic" className="h-4 w-4" />
        </span>
      </div>
    );
  return (
    <div className="flex h-full items-center gap-4 rounded-2xl bg-light-lavender p-4">
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[conic-gradient(#10b981_0_78%,#ede9fe_78%_100%)]">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white font-display text-[14px] font-extrabold text-ink-950">7.8</span>
      </span>
      <span className="flex-1 space-y-1.5">
        {[81, 74, 79].map((v, b) => (
          <span key={b} className="block h-1.5 overflow-hidden rounded-full bg-white">
            <span className="block h-full rounded-full bg-gradient-to-r from-brand-500 to-gold-400" style={{ width: `${v}%` }} />
          </span>
        ))}
      </span>
    </div>
  );
}

export default function Rundown({ s, n }) {
  const root = useRef(null);
  const steps = s.blocks.find((b) => b.type === 'steps');
  const callouts = s.blocks.filter((b) => b.type === 'callout');

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const list = q('[data-cues]')[0];
        gsap.from(q('[data-note]'), { y: 40, rotate: 2, opacity: 0, duration: 1.3, scrollTrigger: { trigger: q('[data-note]')[0], start: 'top 88%', once: true } });
        gsap.from(q('[data-cue]'), { y: 70, opacity: 0, stagger: 0.12, duration: 1.2, scrollTrigger: { trigger: list, start: 'top 82%', once: true } });

      });

      // Playhead runs the rail with the scroll; each cue lights when the head reaches it
      const rail = (axis) => () => {
        const q = gsap.utils.selector(root);
        const list = q('[data-cues]')[0];
        const dots = q('[data-cue-dot]');
        const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: list, start: axis === 'x' ? 'top 75%' : 'top 70%', end: axis === 'x' ? 'bottom 55%' : 'bottom 60%', scrub: 0.4 } });
        tl.fromTo(q('[data-rail]'), { [axis === 'x' ? 'scaleX' : 'scaleY']: 0 }, { [axis === 'x' ? 'scaleX' : 'scaleY']: 1, duration: 1 }, 0);
        dots.forEach((d, i) => {
          tl.fromTo(d, { scale: 0 }, { scale: 1, duration: 0.08, ease: 'back.out(3)' }, (i / Math.max(1, dots.length - 1)) * 0.92);
        });
      };
      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, rail('x'));
      mm.add(`(max-width: 1023px) and ${MOTION_OK}`, rail('y'));
    },
    { scope: root }
  );

  return (
    <section ref={root} id={s.id} aria-labelledby={`${s.id}-title`} className="relative scroll-mt-24 overflow-hidden bg-white py-[72px] sm:py-24 lg:py-28">
      <div className="container-x">
        <Slate n={n} eyebrow={s.eyebrow} />
        <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="min-w-0 lg:col-span-7">
            <CreativeHeading id={`${s.id}-title`} lines={s.h2} className={H2_LIGHT} />
            {s.intro && (
              <p className="mt-6 max-w-[46rem] text-lead font-medium text-ink-900/70">
                <Rich text={s.intro} />
              </p>
            )}
          </div>
          {callouts.map((c, i) => (
            <aside key={i} data-note className="relative min-w-0 overflow-hidden rounded-[26px] bg-brand-950 p-6 text-white shadow-[0_20px_40px_-26px_rgba(26,15,51,0.85)] sm:p-7 lg:col-span-5">
              <span aria-hidden="true" className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-[radial-gradient(closest-side,rgba(244,180,0,0.35),transparent)]" />
              <span className="relative flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-gold-300">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-rose-500" />
                Director&rsquo;s cue
              </span>
              {c.title && <p className="relative mt-3 font-display text-[1.35rem] font-bold leading-snug text-white">{c.title}</p>}
              <p className="relative mt-2 text-[16px] leading-relaxed text-brand-100">
                <Rich text={c.text} tone="dark" />
              </p>
            </aside>
          ))}
        </div>

        {steps && (
          <div className="relative mt-14 lg:mt-16">
            {/* Rail: horizontal on desktop, vertical on phones */}
            <div aria-hidden="true" className="absolute bottom-6 left-[19px] top-6 w-[2px] bg-hairline lg:bottom-auto lg:left-0 lg:right-0 lg:top-[19px] lg:h-[2px] lg:w-auto">
              <div data-rail className="h-full w-full origin-top bg-gradient-to-b from-brand-600 to-gold-500 lg:origin-left lg:bg-gradient-to-r" />
            </div>
            <ol data-cues className="relative grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-4 lg:gap-6">
              {steps.items.map((st, i) => (
                <li key={i} data-cue className="group relative grid grid-cols-[40px_minmax(0,1fr)] gap-4 lg:block">
                  <span aria-hidden="true" className="relative z-[1] flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 font-mono text-[12px] font-extrabold text-brand-600 ring-4 ring-white">
                    {String(i + 1).padStart(2, '0')}
                    <span data-cue-dot className="absolute inset-0 flex items-center justify-center rounded-full bg-brand-950 text-gold-400">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </span>
                  <div className="min-w-0 rounded-[24px] border border-hairline bg-white p-4 shadow-[0_16px_30px_-24px_rgba(26,15,51,0.5)] transition-[translate,border-color] duration-500 hover:-translate-y-1.5 hover:border-brand-200 lg:mt-6">
                    <div aria-hidden="true" className="h-[104px]">
                      <CueArt i={i} />
                    </div>
                    <div className="px-2 pb-2 pt-5">
                      <p aria-hidden="true" className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-brand-500">Cue {String(i + 1).padStart(2, '0')}</p>
                      <h3 className="mt-1.5 font-display text-[1.2rem] font-bold leading-snug tracking-[-0.02em] text-ink-950">{st.title}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-ink-900/70">
                        <Rich text={st.text} />
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
}
