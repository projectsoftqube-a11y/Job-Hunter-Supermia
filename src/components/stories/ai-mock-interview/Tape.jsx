'use client';

import { useRef } from 'react';
import CreativeHeading from '@/components/CreativeHeading';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';
import { Slate, H2_DARK, wave } from './shared';

/*
 * Segment 7, "The recording's lifecycle". One panel tells what happens to a session recording, left
 * to right: it is recorded, it is used to run the service and give feedback, and it is deleted or
 * anonymized when you delete your account. The three privacy statements sit on those three stages
 * of a single rail; the rail fills and each stage node lights as you scroll (transform/opacity only,
 * one timeline). The privacy-policy link closes the panel beside what a session record holds.
 */

const STAGES = [
  { icon: 'mic', label: 'Recorded', tone: 'bg-gold-400 text-ink-950' },
  { icon: 'layers', label: 'Used for your feedback', tone: 'bg-brand-300 text-ink-950' },
  { icon: 'shield', label: 'Deleted or anonymized', tone: 'bg-emerald-400 text-ink-950' },
];
const HELD = ['Audio', 'Transcript', 'Hints shown', 'Scores', 'Feedback'];
const BARS = wave(18, 5);

function StageArt({ i }) {
  if (i === 0)
    return (
      <span className="flex h-8 items-center gap-[3px]">
        <span className="mr-2 flex items-center gap-1 rounded-full bg-rose-500 px-2 py-0.5 font-mono text-[10px] font-bold text-white">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          REC
        </span>
        {BARS.map((h, k) => (
          <span key={k} className="w-[3px] rounded-full bg-gold-400/80" style={{ height: `${h}%` }} />
        ))}
      </span>
    );
  if (i === 1)
    return (
      <span className="flex h-8 flex-wrap items-center gap-1.5">
        {['Run the service', 'Feedback', 'AI & speech'].map((t) => (
          <span key={t} className="rounded-md bg-white/10 px-2 py-0.5 text-[10.5px] font-bold text-white/80 ring-1 ring-white/10">
            {t}
          </span>
        ))}
      </span>
    );
  return (
    <span className="flex h-8 items-center gap-2 font-mono text-[11px] font-bold">
      <span className="rounded-md bg-white/10 px-2 py-0.5 text-white/70 line-through decoration-rose-400 decoration-2">session_audio</span>
      <Icon name="arrow" className="h-3.5 w-3.5 text-white/50" />
      <span className="rounded-md bg-emerald-400/15 px-2 py-0.5 tracking-[0.2em] text-emerald-200">••••••</span>
    </span>
  );
}

export default function Tape({ s, n }) {
  const root = useRef(null);
  const list = s.blocks.find((b) => b.type === 'list');
  const paras = s.blocks.filter((b) => b.type === 'p');

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      // One scrubbed timeline per layout: the rail fills, each stage node pops and its text settles
      const flow = (wide) => () => {
        const panel = q('[data-flow]')[0];
        gsap.from(panel, { y: 50, opacity: 0, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: panel, start: 'top 88%', once: true } });
        const axis = wide ? 'scaleX' : 'scaleY';
        const tl = gsap.timeline({ defaults: { ease: 'power2.out' }, scrollTrigger: { trigger: panel, start: 'top 75%', end: 'center 45%', scrub: 0.4 } });
        tl.fromTo(q('[data-rail-fill]'), { [axis]: 0 }, { [axis]: 1, ease: 'none', duration: 1 }, 0);
        q('[data-stage]').forEach((st, i) => {
          const at = (i / Math.max(1, STAGES.length - 1)) * 0.9;
          tl.fromTo(st.querySelector('[data-node]'), { scale: 0.4 }, { scale: 1, duration: 0.12, ease: 'back.out(3)' }, at).fromTo(st.querySelector('[data-stage-body]'), { y: 24, opacity: 0.25 }, { y: 0, opacity: 1, duration: 0.25 }, at);
        });
      };
      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, flow(true));
      mm.add(`(max-width: 1023px) and ${MOTION_OK}`, flow(false));
    },
    { scope: root }
  );

  return (
    <section ref={root} id={s.id} aria-labelledby={`${s.id}-title`} className="grain relative scroll-mt-24 overflow-hidden bg-brand-950 py-[72px] text-white sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_40%_at_85%_0%,rgba(109,76,176,0.4),transparent),radial-gradient(35%_35%_at_0%_100%,rgba(244,180,0,0.1),transparent)]" />
      <div className="container-x relative z-[2]">
        <Slate n={n} eyebrow={s.eyebrow} dark />
        <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <CreativeHeading id={`${s.id}-title`} lines={s.h2} tone="dark" className={`${H2_DARK} lg:col-span-7`} />
          {s.intro && (
            <p className="min-w-0 text-lead font-medium text-brand-100 lg:col-span-5">
              <Rich text={s.intro} tone="dark" />
            </p>
          )}
        </div>

        {list && (
          <div data-flow className="relative mt-12 overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(160deg,#2a1650_0%,#1a0f33_70%)] shadow-[0_24px_50px_-30px_rgba(0,0,0,0.9)] lg:mt-14">
            <div className="relative px-5 pb-6 pt-7 sm:px-8 lg:px-10 lg:pb-10 lg:pt-10">
              {/* Rail through the stage nodes: vertical on phones, horizontal on desktop */}
              <span aria-hidden="true" className="absolute bottom-10 left-[calc(1.25rem+21px)] top-12 w-[2px] bg-white/10 sm:left-[calc(2rem+21px)] lg:bottom-auto lg:left-[16.67%] lg:right-[16.67%] lg:top-[calc(2.5rem+21px)] lg:h-[2px] lg:w-auto">
                <span data-rail-fill className="block h-full w-full origin-top bg-gradient-to-b from-gold-400 via-brand-300 to-emerald-400 lg:origin-left lg:bg-gradient-to-r" />
              </span>

              <ol className="relative grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-3 lg:gap-8">
                {list.items.map((t, i) => {
                  const st = STAGES[i] || STAGES[STAGES.length - 1];
                  return (
                    <li key={i} data-stage className="grid min-w-0 grid-cols-[44px_minmax(0,1fr)] gap-4 lg:flex lg:flex-col lg:items-center lg:gap-0 lg:text-center">
                      <span data-node aria-hidden="true" className={`relative z-[1] flex h-11 w-11 items-center justify-center rounded-full ring-[6px] ring-[#24133f] ${st.tone}`}>
                        <Icon name={st.icon} className="h-5 w-5" />
                      </span>
                      <div data-stage-body className="min-w-0 lg:mt-5 lg:flex lg:flex-col lg:items-center">
                        <p aria-hidden="true" className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-gold-300">
                          Stage {i + 1} · {st.label}
                        </p>
                        <div aria-hidden="true" className="mt-3">
                          <StageArt i={i} />
                        </div>
                        <p className="mt-3 max-w-[30rem] text-[16px] leading-[1.7] text-white/80">
                          <Rich text={t} tone="dark" />
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Footer: what a session record holds, and the full policy */}
            <div className="relative grid grid-cols-[minmax(0,1fr)] items-center gap-4 border-t border-white/10 bg-black/20 px-5 py-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-8 lg:px-10">
              <div aria-hidden="true" className="flex flex-wrap items-center gap-2">
                <span className="mr-1 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white/50">A session record</span>
                {HELD.map((h) => (
                  <span key={h} className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[12px] font-semibold text-white/75 ring-1 ring-white/10">
                    {h}
                  </span>
                ))}
              </div>
              {paras.map((b, i) => (
                <p key={i} className="flex items-center gap-3 rounded-full bg-gold-400/10 px-4 py-2.5 text-[15.5px] font-medium text-white/85 ring-1 ring-gold-400/30">
                  <Icon name="doc" className="h-5 w-5 shrink-0 text-gold-300" />
                  <span className="min-w-0">
                    <Rich text={b.text} tone="dark" />
                  </span>
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
