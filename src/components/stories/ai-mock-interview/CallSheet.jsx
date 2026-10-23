'use client';

import { useRef } from 'react';
import CreativeHeading from '@/components/CreativeHeading';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';
import { Slate, H2_LIGHT, wave } from './shared';

/*
 * Segment 6, "The call sheet". Who takes the chair, written as a studio call sheet: numbered slots,
 * each with a role tag. Beside it, a candidate mid-answer, and the opener in three takes: the
 * waveform has fewer hesitation gaps each take, drawn in with the scroll.
 */

const TAGS = ['New grad', 'Switcher', 'Engineer', 'Design · Data', 'Returning'];
const TAKES = [
  { label: 'Take 1', gaps: [5, 6, 11, 12, 13, 19, 20, 26, 27] },
  { label: 'Take 2', gaps: [9, 10, 18, 25] },
  { label: 'Take 3', gaps: [] },
];
const BARS = wave(30, 7);

export default function CallSheet({ s, n }) {
  const root = useRef(null);
  const list = s.blocks.find((b) => b.type === 'list');
  const paras = s.blocks.filter((b) => b.type === 'p');

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(q('[data-slot]'), { y: 40, opacity: 0, stagger: 0.09, duration: 1.1, scrollTrigger: { trigger: q('[data-slots]')[0], start: 'top 82%', once: true } });
        // The slate lands, then the clapper snaps shut once
        gsap
          .timeline({ scrollTrigger: { trigger: q('[data-slate]')[0], start: 'top 85%', once: true } })
          .from(q('[data-slate]'), { y: 50, opacity: 0, duration: 1.2, ease: 'expo.out' })
          .fromTo(q('[data-clap]'), { rotate: -24 }, { rotate: 0, duration: 0.35, ease: 'power4.in' }, 0.55)
          .from(q('[data-slate-row]'), { x: -16, opacity: 0, stagger: 0.08, duration: 0.6, ease: 'expo.out' }, 0.8);

        // The three takes draw in with the scroll, one after the other
        const tl = gsap.timeline({ scrollTrigger: { trigger: q('[data-takes]')[0], start: 'top 90%', end: 'bottom 55%', scrub: 0.4 } });
        q('[data-take]').forEach((t, i) => {
          tl.from(t.querySelector('[data-bars]'), { scaleX: 0, transformOrigin: '0% 50%', duration: 0.4, ease: 'power2.out' }, i * 0.45);
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id={s.id} aria-labelledby={`${s.id}-title`} className="relative scroll-mt-24 overflow-hidden bg-white py-[72px] sm:py-24 lg:py-28">
      <div className="container-x">
        <Slate n={n} eyebrow={s.eyebrow} />
        <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="min-w-0 lg:col-span-7">
            <CreativeHeading id={`${s.id}-title`} lines={s.h2} className={H2_LIGHT} />
            {s.intro && (
              <p className="mt-6 text-lead font-medium text-ink-900/70">
                <Rich text={s.intro} />
              </p>
            )}
            {list && (
              <div className="mt-9 overflow-hidden rounded-[26px] border border-hairline">
                <div aria-hidden="true" className="flex items-center justify-between bg-brand-950 px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-white/70">
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                    Call sheet · today
                  </span>
                  <span>In the chair</span>
                </div>
                <ul data-slots className="divide-y divide-hairline">
                  {list.items.map((t, i) => (
                    <li key={i} data-slot className="group grid grid-cols-[44px_minmax(0,1fr)] items-start gap-4 bg-white px-5 py-5 transition-colors duration-300 hover:bg-light-lavender sm:grid-cols-[52px_minmax(0,1fr)_auto] sm:px-6">
                      <span aria-hidden="true" className="font-display text-[1.6rem] font-extrabold leading-none tracking-[-0.04em] text-brand-200 transition-colors duration-300 group-hover:text-gold-500">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="min-w-0 text-[16.5px] leading-[1.6] text-ink-900/80">
                        <Rich text={t} />
                      </span>
                      <span aria-hidden="true" className="col-start-2 inline-flex w-max items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-brand-700 transition-colors duration-300 group-hover:bg-brand-950 group-hover:text-gold-300 sm:col-start-3">
                        <Icon name="mic" className="h-3 w-3" />
                        {TAGS[i % TAGS.length]}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="min-w-0 lg:col-span-5">
            <div className="flex h-full flex-col gap-4 lg:sticky lg:top-28 lg:h-auto">
              {/* Code-drawn clapperboard: the take being rehearsed (decorative) */}
              <div data-slate aria-hidden="true" className="relative overflow-hidden rounded-[26px] bg-[#1d1039] p-5 text-white ring-1 ring-brand-900 sm:p-6">
                <div className="relative h-11">
                  <span data-clap className="absolute inset-x-0 top-0 block h-9 origin-[0%_100%] rounded-md bg-[repeating-linear-gradient(-55deg,#f9c320_0_22px,#1a0f33_22px_44px)] ring-2 ring-[#1a0f33]" />
                </div>
                <div className="mt-1 h-9 rounded-md bg-[repeating-linear-gradient(55deg,#ffffff_0_22px,#1a0f33_22px_44px)] ring-2 ring-[#1a0f33]" />
                <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-4 font-mono">
                  {[
                    ['Scene', 'The opener'],
                    ['Take', '03'],
                    ['Round', 'HR & Introduction'],
                    ['Mode', 'Guided practice'],
                  ].map(([k, v]) => (
                    <div key={k} data-slate-row className="min-w-0 border-b border-dashed border-white/20 pb-2">
                      <span className="block text-[10.5px] font-bold uppercase tracking-[0.16em] text-gold-300/80">{k}</span>
                      <span className="mt-1 block truncate text-[15px] font-bold text-white">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-3 rounded-2xl bg-white/[0.06] px-4 py-3 ring-1 ring-white/10">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-300 to-brand-600 font-display text-[12px] font-extrabold">AI</span>
                  <span className="min-w-0 text-[14px] font-medium leading-snug text-white/85">&ldquo;So, tell me about yourself.&rdquo;</span>
                  <span className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-500">
                    <Icon name="mic" className="h-4 w-4" />
                  </span>
                </div>
              </div>

              <div className="rounded-[26px] bg-brand-950 p-5 text-white sm:p-6">
                {paras.map((b, i) => (
                  <p key={i} className="text-[16.5px] font-medium leading-[1.7] text-white/85">
                    <Rich text={b.text} tone="dark" />
                  </p>
                ))}
                <div data-takes aria-hidden="true" className="mt-5 space-y-2.5 border-t border-white/10 pt-5">
                  {TAKES.map((t) => (
                    <div key={t.label} data-take className="grid grid-cols-[56px_minmax(0,1fr)] items-center gap-3">
                      <span className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-white/55">{t.label}</span>
                      <span data-bars className="flex h-7 items-center justify-between">
                        {BARS.map((h, k) => (
                          <span
                            key={k}
                            className={`w-[3px] origin-center rounded-full ${t.gaps.includes(k) ? 'bg-white/10' : t.label === 'Take 3' ? 'bg-gold-400' : 'bg-brand-300'}`}
                            style={{ height: t.gaps.includes(k) ? '12%' : `${h}%` }}
                          />
                        ))}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
