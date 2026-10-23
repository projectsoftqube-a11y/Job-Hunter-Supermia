'use client';

import { useRef } from 'react';
import CreativeHeading from '@/components/CreativeHeading';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap';
import { Slate, H2_LIGHT } from './shared';

/*
 * Segment 4, "The switch". The two modes sit on a piece of studio hardware: a heavy slide switch on
 * a screwed plate, with indicator lamps. Scrolling past the middle of the section throws the switch
 * to Real simulation once (until you touch it yourself); clicking it flips it either way. The mode
 * table becomes two mode cards: the selected one is lit, the other stays fully readable.
 *
 * The switch state lives in the DOM, not in React state: flipping swaps the class lists stored on
 * each element (data-on / data-off) and moves the knob with a transform, so nothing re-renders.
 * The server markup is the Guided practice state.
 */

const SCREENS = [
  { q: 'Tell me about a time you disagreed with a teammate.', extra: 'Hint: situation, task, action, result.' },
  { q: 'Tell me about a time you disagreed with a teammate.', extra: 'No hints · strict run' },
];

// Props for an element whose look depends on the mode: `on` while mode === m, `off` otherwise
const tog = (m, base, on, off) => ({ 'data-m': m, 'data-on': on, 'data-off': off, className: `${base} ${m === 0 ? on : off}` });

function Screw({ className }) {
  return (
    <span aria-hidden="true" className={`absolute flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gradient-to-br from-white to-brand-200 shadow-[inset_0_-1px_2px_rgba(26,15,51,0.35)] ${className}`}>
      <span className="h-[1.5px] w-2 rotate-45 rounded bg-brand-400/70" />
    </span>
  );
}

export default function ModeSwitch({ s, n }) {
  const root = useRef(null);
  const state = useRef({ mode: 0, touched: false });
  const table = s.blocks.find((b) => b.type === 'table');
  const paras = s.blocks.filter((b) => b.type === 'p');
  const names = table ? [table.head[1], table.head[2]] : ['', ''];
  const label = (m) => `Practice mode: ${names[m]}. Switch to ${names[m ? 0 : 1]}`;

  const apply = (mode) => {
    const el = root.current;
    if (!el || state.current.mode === mode) return;
    state.current.mode = mode;
    el.querySelectorAll('[data-m]').forEach((node) => {
      const on = Number(node.dataset.m) === mode;
      node.classList.remove(...(on ? node.dataset.off : node.dataset.on).split(' ').filter(Boolean));
      node.classList.add(...(on ? node.dataset.on : node.dataset.off).split(' ').filter(Boolean));
    });
    const btn = el.querySelector('[role="switch"]');
    btn.setAttribute('aria-checked', mode === 1 ? 'true' : 'false');
    btn.setAttribute('aria-label', label(mode));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const knob = el.querySelector('[data-knob]');
    const face = el.querySelector('[data-face]');
    if (reduce) {
      gsap.set(knob, { xPercent: mode * 100 });
      return;
    }
    gsap.to(knob, { xPercent: mode * 100, duration: 0.65, ease: 'back.inOut(1.6)', overwrite: true });
    gsap.fromTo(face, { scaleX: 1.14, scaleY: 0.9 }, { scaleX: 1, scaleY: 1, duration: 0.7, delay: 0.3, ease: 'elastic.out(1, 0.45)', overwrite: true });
  };

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: q('[data-modecards]')[0], start: 'top 85%', once: true } });
        tl.from(q('[data-plate]'), { y: 60, rotate: -2, opacity: 0, duration: 1.3 }, 0).from(q('[data-modecard]'), { y: 70, opacity: 0, stagger: 0.14, duration: 1.2 }, 0.1);
        // Throw the switch once the cards are well in view, unless the visitor already used it
        const st = ScrollTrigger.create({
          trigger: q('[data-modecards]')[0],
          start: 'top 40%',
          onEnter: () => !state.current.touched && apply(1),
          onLeaveBack: () => !state.current.touched && apply(0),
        });
        return () => st.kill();
      });
    },
    { scope: root }
  );

  const flip = () => {
    state.current.touched = true;
    apply(state.current.mode ? 0 : 1);
  };

  return (
    <section ref={root} id={s.id} aria-labelledby={`${s.id}-title`} className="relative scroll-mt-24 overflow-hidden bg-light-lavender py-[72px] sm:py-24 lg:py-28">
      <div className="container-x relative">
        <Slate n={n} eyebrow={s.eyebrow} />
        <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left: title, the hardware switch */}
          <div className="min-w-0 lg:col-span-5">
            <CreativeHeading id={`${s.id}-title`} lines={s.h2} className={H2_LIGHT} />
            {s.intro && (
              <p className="mt-6 text-lead font-medium text-ink-900/70">
                <Rich text={s.intro} />
              </p>
            )}

            <div data-plate className="relative mt-9 rounded-[28px] bg-[linear-gradient(160deg,#ffffff_0%,#ede9fe_100%)] p-6 shadow-[0_18px_36px_-24px_rgba(26,15,51,0.5),inset_0_1px_0_rgba(255,255,255,1)] ring-1 ring-brand-200 sm:p-7">
              <Screw className="left-3 top-3" />
              <Screw className="right-3 top-3" />
              <Screw className="bottom-3 left-3" />
              <Screw className="bottom-3 right-3" />
              <div aria-hidden="true" className="flex items-center justify-between px-1 font-mono text-[10.5px] font-bold uppercase tracking-[0.18em] text-ink-900/50">
                <span>Practice mode</span>
                <span>Tap to flip</span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked="false"
                aria-label={label(0)}
                onClick={flip}
                className="relative mt-3 grid h-[84px] w-full grid-cols-2 items-center rounded-full bg-[linear-gradient(180deg,#1a0f33,#311e59)] p-2 shadow-[inset_0_4px_14px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.9)] sm:h-[92px]"
              >
                {/* The knob: moved with a transform, squashed on landing */}
                <span data-knob aria-hidden="true" className="absolute bottom-2 left-2 top-2 w-[calc(50%-8px)]">
                  <span data-face className="absolute inset-0 overflow-hidden rounded-full bg-[linear-gradient(180deg,#fde68a,#f4b400)] shadow-[0_8px_18px_-6px_rgba(26,15,51,0.7),inset_0_2px_0_rgba(255,255,255,0.7)]">
                    <span {...tog(1, 'absolute inset-0 bg-[linear-gradient(180deg,#fb7185,#e11d48)] transition-opacity duration-500', 'opacity-100', 'opacity-0')} />
                    <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-1 opacity-40">
                      {[0, 1, 2].map((g) => (
                        <span key={g} className="h-6 w-[2px] rounded bg-ink-950" />
                      ))}
                    </span>
                  </span>
                </span>
                {/* Engraved positions */}
                <span aria-hidden="true" {...tog(0, 'relative text-center font-display text-[14px] font-bold sm:text-[15px]', 'text-ink-950', 'text-white/55')}>
                  Guided
                </span>
                <span aria-hidden="true" {...tog(1, 'relative text-center font-display text-[14px] font-bold sm:text-[15px]', 'text-white', 'text-white/55')}>
                  Strict
                </span>
              </button>
              <div aria-hidden="true" className="mt-5 grid grid-cols-2 gap-3">
                <span className="flex items-center gap-2.5 rounded-xl bg-white/70 px-3 py-2 ring-1 ring-brand-100">
                  <span {...tog(0, 'h-3 w-3 shrink-0 rounded-full', 'bg-gold-400 shadow-[0_0_14px_rgba(249,195,32,0.95)]', 'bg-brand-100')} />
                  <span {...tog(0, 'font-mono text-[11px] font-bold uppercase tracking-[0.12em]', 'text-ink-950', 'text-ink-900/45')}>Hints on</span>
                </span>
                <span className="flex items-center gap-2.5 rounded-xl bg-white/70 px-3 py-2 ring-1 ring-brand-100">
                  <span {...tog(1, 'h-3 w-3 shrink-0 rounded-full', 'bg-rose-500 shadow-[0_0_14px_rgba(244,63,94,0.95)]', 'bg-brand-100')} />
                  <span {...tog(1, 'font-mono text-[11px] font-bold uppercase tracking-[0.12em]', 'text-ink-950', 'text-ink-900/45')}>Strict run</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right: the two modes, the plan underneath */}
          <div className="min-w-0 lg:col-span-7 lg:pt-4">
            {table && (
              <div data-modecards className="grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2">
                {names.map((name, m) => (
                  <article
                    key={m}
                    data-modecard
                    aria-labelledby={`${s.id}-mode-${m}`}
                    {...tog(
                      m,
                      'relative flex min-w-0 flex-col overflow-hidden rounded-[28px] bg-white p-5 sm:p-6',
                      'shadow-[0_24px_44px_-28px_rgba(26,15,51,0.85)]',
                      'shadow-[0_16px_30px_-24px_rgba(26,15,51,0.5)] ring-1 ring-hairline'
                    )}
                  >
                    {/* Lit state: a dark layer that fades in (opacity only) */}
                    <span aria-hidden="true" {...tog(m, 'absolute inset-0 bg-brand-950 transition-opacity duration-700', 'opacity-100', 'opacity-0')} />
                    {/* Screen preview */}
                    <div aria-hidden="true" {...tog(m, 'relative overflow-hidden rounded-2xl p-3.5', 'bg-white/[0.06] ring-1 ring-white/10', 'bg-light-lavender')}>
                      <div className="flex items-center justify-between">
                        <span {...tog(m, 'flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[0.14em]', 'text-white/60', 'text-ink-900/50')}>
                          <span className={`h-1.5 w-1.5 rounded-full ${m ? 'bg-rose-500' : 'bg-gold-500'}`} />
                          {m ? 'REC' : 'Practice'}
                        </span>
                        <span {...tog(m, 'font-mono text-[11px] font-bold', 'text-white/70', 'text-ink-900/45')}>{m ? '02:00' : 'R3'}</span>
                      </div>
                      <p className="mt-2.5 rounded-xl rounded-tl-sm bg-white px-3 py-2 text-[12.5px] font-medium leading-snug text-ink-950">{SCREENS[m].q}</p>
                      {m ? (
                        <p {...tog(1, 'mt-2 inline-flex rounded-lg px-2.5 py-1.5 text-[11.5px] font-bold', 'bg-rose-500/20 text-rose-200', 'bg-rose-50 text-rose-700')}>{SCREENS[m].extra}</p>
                      ) : (
                        <p {...tog(0, 'mt-2 inline-flex rounded-lg px-2.5 py-1.5 text-[11.5px] font-bold', 'bg-gold-400/20 text-gold-200', 'bg-gold-50 text-gold-800')}>{SCREENS[m].extra}</p>
                      )}
                    </div>

                    <div className="relative mt-5 flex items-center gap-3">
                      {m ? (
                        <span aria-hidden="true" {...tog(1, 'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl', 'bg-rose-500 text-white', 'bg-rose-50 text-rose-600')}>
                          <Icon name="target" className="h-5 w-5" />
                        </span>
                      ) : (
                        <span aria-hidden="true" {...tog(0, 'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl', 'bg-gold-400 text-ink-950', 'bg-gold-50 text-gold-700')}>
                          <Icon name="spark" className="h-5 w-5" />
                        </span>
                      )}
                      <h3 id={`${s.id}-mode-${m}`} {...tog(m, 'font-display text-[1.45rem] font-bold leading-tight tracking-[-0.02em]', 'text-white', 'text-ink-950')}>
                        {name}
                      </h3>
                    </div>
                    <dl className="relative mt-4 divide-y">
                      {table.rows.map((r, i) => (
                        <div key={i} {...tog(m, 'py-3.5', 'border-white/10', 'border-hairline')}>
                          {m ? (
                            <dt {...tog(1, 'text-[11.5px] font-bold uppercase tracking-[0.14em]', 'text-rose-300', 'text-brand-600')}>{r[0]}</dt>
                          ) : (
                            <dt {...tog(0, 'text-[11.5px] font-bold uppercase tracking-[0.14em]', 'text-gold-300', 'text-brand-600')}>{r[0]}</dt>
                          )}
                          <dd {...tog(m, 'mt-1 text-[15.5px] font-medium leading-relaxed', 'text-white/90', 'text-ink-900/80')}>
                            <Rich text={String(r[m + 1])} />
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </article>
                ))}
              </div>
            )}

            {paras.map((b, i) => (
              <div key={i} className="mt-5 flex gap-4 rounded-[24px] border border-brand-200 bg-white/80 p-5 sm:p-6">
                <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-950 text-gold-300">
                  <Icon name="compass" className="h-5 w-5" />
                </span>
                <p className="min-w-0 text-[16.5px] leading-[1.7] text-ink-900/80">
                  <Rich text={b.text} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
