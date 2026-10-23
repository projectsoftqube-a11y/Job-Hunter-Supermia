'use client';

import { useRef } from 'react';
import CreativeHeading from '@/components/CreativeHeading';
import Rich from '@/components/Rich';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';
import { GUTTER, H2, Numeral, RunningHead, MarginNote } from './shared';

/*
 * One round of the library. A chapter opener (huge numeral, running head, title, intro), then the
 * questions as index cards with the hint written in the margin beside each one. While you scroll the
 * cards are dealt onto the table one after another: one scrubbed timeline per round places each
 * card's tween at its own position in the list, so a card lands as it reaches the lower third of the
 * screen. Rotations are seeded, never random. Phones get the same cards with the note underneath.
 */

const tilt = (i) => (((i * 37) % 11) - 5) * 1.3;

export default function RoundSection({ s, n, bg }) {
  const root = useRef(null);
  const qs = s.blocks.filter((b) => b.type === 'questions').flatMap((b) => b.items);
  const rest = s.blocks.filter((b) => b.type !== 'questions');

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const list = q('[data-deck]')[0];
        const items = q('[data-qcard]');
        const H = () => list.offsetHeight || 1;
        const span = 360; // px of scroll over which one card is dealt

        gsap.fromTo(q('[data-numeral]'), { yPercent: 18 }, { yPercent: -18, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'top top', scrub: true } });

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, scrollTrigger: { trigger: list, start: 'top 88%', end: 'bottom 88%', scrub: 0.4, invalidateOnRefresh: true } });
        items.forEach((li, i) => {
          const card = li.querySelector('[data-card]');
          const note = li.querySelector('[data-note]');
          const at = li.offsetTop / H();
          const d = Math.min(span / H(), 0.5);
          tl.fromTo(card, { x: i % 2 ? 90 : -90, y: 70, rotate: tilt(i) * 2.2, opacity: 0 }, { x: 0, y: 0, rotate: tilt(i) * 0.12, opacity: 1, duration: d }, at)
            .fromTo(note, { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: d * 0.8 }, at + d * 0.45);
        });
        // Make sure the timeline spans the whole list even if the last card ends early
        tl.set({}, {}, 1);
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id={s.id} aria-labelledby={`${s.id}-title`} className={`relative scroll-mt-24 overflow-hidden py-[72px] sm:py-24 lg:py-28 ${bg}`}>
      <div className={`container-x ${GUTTER}`}>
        {/* Chapter opener */}
        <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-end lg:gap-10">
          <div className="-mb-2 lg:mb-0">
            <Numeral n={n} />
          </div>
          <div className="min-w-0">
            <RunningHead n={n} eyebrow={s.eyebrow} meta={`${qs.length} questions`} />
            <CreativeHeading id={`${s.id}-title`} lines={s.h2} className={`mt-5 ${H2}`} />
          </div>
        </div>
        {s.intro && (
          <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-12 lg:gap-10">
            <p className="text-lead font-medium text-ink-900/75 first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-[3.4em] first-letter:font-extrabold first-letter:leading-[0.85] first-letter:text-brand-600 lg:col-span-8">
              <Rich text={s.intro} />
            </p>
            <div aria-hidden="true" className="hidden items-end lg:col-span-4 lg:flex">
              <div className="w-full rounded-2xl border border-dashed border-ink-950/20 p-4 font-mono text-[11px] font-bold uppercase leading-relaxed tracking-[0.12em] text-ink-900/55">
                <span className="text-brand-600">How to read</span>
                <br />
                Card: the question
                <br />
                Margin: what they check, then the follow-up
              </div>
            </div>
          </div>
        )}

        {/* The deck */}
        <ol data-deck className="relative mt-12 space-y-5 sm:space-y-6 lg:mt-14">
          {qs.map((it, i) => (
            <li key={i} data-qcard className="grid grid-cols-[minmax(0,1fr)] items-start gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-10">
              <div
                data-card
                className="group relative min-w-0 overflow-hidden rounded-[6px] bg-white px-5 pb-6 pt-5 shadow-[0_2px_0_rgba(26,15,51,0.06),0_14px_28px_-18px_rgba(26,15,51,0.45)] ring-1 ring-ink-950/[0.07] transition-shadow duration-300 hover:ring-brand-300 sm:px-7"
                style={{ backgroundImage: 'repeating-linear-gradient(180deg, transparent 0 31px, rgba(75,46,131,0.075) 31px 32px)', backgroundPosition: '0 58px' }}
              >
                <span aria-hidden="true" className="absolute inset-x-0 top-[57px] h-px bg-rose-400/60" />
                <div aria-hidden="true" className="flex items-center justify-between font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink-900/45">
                  <span>
                    <span className="text-brand-600">Q{n}.</span>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{s.eyebrow}</span>
                </div>
                <h3 className="relative mt-7 font-display text-[clamp(1.2rem,1.05rem+0.6vw,1.6rem)] font-bold leading-[1.3] tracking-[-0.02em] text-ink-950">{it.q}</h3>
              </div>
              {it.hint && (
                <div data-note className="min-w-0 lg:pt-3">
                  <MarginNote hint={it.hint} />
                </div>
              )}
            </li>
          ))}
        </ol>

        {rest.length > 0 && (
          <div className="mt-10 space-y-4">
            {rest.map((b, i) =>
              b.text ? (
                <p key={i} className="text-[17px] leading-[1.75] text-ink-900/75">
                  <Rich text={b.text} />
                </p>
              ) : null
            )}
          </div>
        )}
      </div>
    </section>
  );
}
