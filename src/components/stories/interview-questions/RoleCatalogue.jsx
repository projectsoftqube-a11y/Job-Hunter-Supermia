'use client';

import { useRef } from 'react';
import CreativeHeading from '@/components/CreativeHeading';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';
import { GUTTER, H2_DARK, Numeral, RunningHead } from './shared';

/*
 * By role: the library's card catalogue. Six drawers in a dark cabinet, one per role, each with a
 * brass label holder and a catalogue card that the scroll pulls up out of the drawer, one drawer
 * after another (one scrubbed timeline). The card lists the role's typical questions, one per ruled
 * line; the role text is split at sentence ends so every word of the copy stays, in order.
 */

const sentences = (text) => text.split(/(?<=[?.])\s+(?=[A-Z"])/);

export default function RoleCatalogue({ s, n }) {
  const root = useRef(null);
  const cards = s.blocks.find((b) => b.type === 'cards');
  const paras = s.blocks.filter((b) => b.type === 'p');

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(q('[data-numeral]'), { yPercent: 18 }, { yPercent: -18, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'top top', scrub: true } });
        const tl = gsap.timeline({ defaults: { ease: 'power2.out' }, scrollTrigger: { trigger: q('[data-cabinet]')[0], start: 'top 85%', end: 'center 45%', scrub: 0.4 } });
        q('[data-catcard]').forEach((c, i) => {
          tl.fromTo(c, { yPercent: 62, rotate: i % 2 ? 1.5 : -1.5 }, { yPercent: 0, rotate: 0, duration: 0.5 }, i * 0.14);
        });
        tl.from(q('[data-handle]'), { scaleX: 0.4, stagger: 0.14, duration: 0.3 }, 0);
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id={s.id} aria-labelledby={`${s.id}-title`} className="grain relative scroll-mt-24 overflow-hidden bg-brand-950 py-[72px] text-white sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_30%_at_70%_0%,rgba(109,76,176,0.45),transparent),radial-gradient(30%_30%_at_100%_100%,rgba(244,180,0,0.1),transparent)]" />
      <div className={`container-x relative z-[2] ${GUTTER}`}>
        <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-end lg:gap-10">
          <div className="-mb-2 lg:mb-0">
            <Numeral n={n} dark />
          </div>
          <div className="min-w-0">
            <RunningHead n={n} eyebrow={s.eyebrow} meta={cards ? `${cards.items.length} roles` : null} dark />
            <CreativeHeading id={`${s.id}-title`} lines={s.h2} tone="dark" className={`mt-5 ${H2_DARK}`} />
          </div>
        </div>
        {s.intro && (
          <p className="mt-8 max-w-[52rem] text-lead font-medium text-brand-100">
            <Rich text={s.intro} tone="dark" />
          </p>
        )}

        {cards && (
          <div className="relative mt-12 rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,#2a1650,#1d1039)] p-3 sm:p-5 lg:mt-14">
            <ul data-cabinet className="grid grid-cols-[minmax(0,1fr)] gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
              {cards.items.map((c, i) => (
                <li key={i} className="relative flex min-w-0 flex-col overflow-hidden rounded-[18px] bg-[#140a29] px-3 pt-4 sm:px-4">
                  <article
                    data-catcard
                    aria-labelledby={`${s.id}-role-${i}`}
                    className="relative z-[1] flex-1 rounded-[4px] bg-[#fffdf6] px-5 pb-12 pt-4 text-ink-950 shadow-[0_10px_20px_-14px_rgba(0,0,0,0.8)]"
                    style={{ backgroundImage: 'repeating-linear-gradient(180deg, transparent 0 29px, rgba(75,46,131,0.09) 29px 30px)', backgroundPosition: '0 70px' }}
                  >
                    <div aria-hidden="true" className="flex items-center justify-between font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-ink-900/45">
                      <span>IQ · {String(n).padStart(2, '0')}.{String(i + 1).padStart(2, '0')}</span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-950 text-gold-300">
                        <Icon name={c.icon || 'spark'} className="h-3.5 w-3.5" />
                      </span>
                    </div>
                    <h3 id={`${s.id}-role-${i}`} className="mt-2 font-display text-[1.3rem] font-bold leading-tight tracking-[-0.02em] text-ink-950">
                      {c.title}
                    </h3>
                    <span aria-hidden="true" className="mt-3 block h-px bg-rose-400/60" />
                    <ol className="mt-2 list-decimal space-y-1 pl-5 text-[15px] leading-[1.75] text-ink-900/85 marker:font-mono marker:text-[12px] marker:font-bold marker:text-brand-500">
                      {sentences(c.text).map((t, k) => (
                        <li key={k} className="pl-1">
                          <Rich text={t} />
                        </li>
                      ))}
                    </ol>
                    <span aria-hidden="true" className="absolute bottom-4 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-[#140a29] shadow-[inset_0_2px_3px_rgba(0,0,0,0.6)]" />
                  </article>
                  {/* Drawer front */}
                  <div aria-hidden="true" className="relative z-[2] -mx-3 -mt-3 flex h-16 items-center justify-center gap-4 border-t border-white/10 bg-[linear-gradient(180deg,#3e2670,#271749)] sm:-mx-4">
                    <span className="rounded-[4px] border border-gold-400/50 bg-[#fffdf6] px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-ink-950">
                      {c.title.split(' ')[0]}
                    </span>
                    <span data-handle className="h-2.5 w-16 rounded-full bg-gradient-to-b from-gold-200 to-gold-600 shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {paras.map((b, i) => (
          <p key={i} className="mt-8 flex gap-3 border-t border-white/15 pt-6 text-[16.5px] leading-[1.7] text-white/80">
            <span aria-hidden="true" className="font-display text-[1.4rem] font-extrabold leading-none text-gold-400">§</span>
            <span className="min-w-0">
              <Rich text={b.text} tone="dark" />
            </span>
          </p>
        ))}
      </div>
    </section>
  );
}
