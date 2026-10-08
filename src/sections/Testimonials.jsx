'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap';
import { SplitHeading } from '@/components/Reveal';
import { TESTIMONIALS } from '@/content/site';

/*
 * Stories as voice notes. One plays at a time: the waveform fills, the clock counts and the quote
 * lights up word by word as if it were being spoken. When it ends the next note plays; the list below
 * lets you pick one, and the button pauses. Plays only while the section is on screen.
 */

const BARS = Array.from({ length: 64 }, (_, i) => 0.25 + 0.75 * Math.abs(Math.sin(i * 0.55) * Math.cos(i * 0.21 + 1)));
const SECS_PER_WORD = 0.32;
const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
const lengthOf = (t) => t.quote.split(' ').length * SECS_PER_WORD + 1.2;

function Wave({ className = '', bars = BARS, thin = false }) {
  return (
    <span className={`flex h-full min-w-0 items-center gap-[2px] sm:gap-[3px] ${className}`} aria-hidden="true">
      {bars.map((h, i) => (
        <span key={i} className={`w-full min-w-0 rounded-full bg-current ${thin && i % 3 ? 'max-sm:hidden' : ''}`} style={{ height: `${Math.round(h * 100)}%` }} />
      ))}
    </span>
  );
}

export default function Testimonials() {
  const root = useRef(null);
  const stage = useRef(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const tlRef = useRef(null);
  const visible = useRef(false);
  const t = TESTIMONIALS[active];
  const anySample = TESTIMONIALS.some((x) => x.sample);

  // Entrance
  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(q('[data-player]'), { y: 80, opacity: 0, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: q('[data-player]')[0], start: 'top 85%', once: true } });
        gsap.from(q('[data-note]'), { y: 30, opacity: 0, stagger: 0.08, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: q('[data-notes]')[0], start: 'top 92%', once: true } });
        ScrollTrigger.create({
          trigger: root.current,
          start: 'top 70%',
          end: 'bottom 30%',
          onToggle: (self) => {
            visible.current = self.isActive;
            if (!tlRef.current) return;
            if (self.isActive && playing) tlRef.current.play();
            else tlRef.current.pause();
          },
        });
      });
    },
    { scope: root }
  );

  // One voice note: words light up, waveform fills, clock counts; then the next note
  useGSAP(
    () => {
      const q = gsap.utils.selector(stage);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const words = q('[data-word]');
        const clock = q('[data-clock]')[0];
        const total = lengthOf(t);
        const time = { s: 0 };

        gsap.set(words, { opacity: 0.18 });
        const tl = gsap.timeline({
          paused: true,
          onComplete: () => setActive((i) => (i + 1) % TESTIMONIALS.length),
        });
        tl.fromTo(q('[data-portrait]'), { clipPath: 'inset(100% 0% 0% 0% round 28px)' }, { clipPath: 'inset(0% 0% 0% 0% round 28px)', duration: 0.9, ease: 'expo.inOut' }, 0)
          .fromTo(q('[data-portrait-img]'), { scale: 1.25 }, { scale: 1, duration: 1.4, ease: 'expo.out' }, 0)
          .fromTo(q('[data-who] > *'), { y: 16, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.6, ease: 'expo.out' }, 0.3)
          .fromTo(q('[data-fill]'), { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: total, ease: 'none' }, 0.4)
          .to(time, { s: total, duration: total, ease: 'none', onUpdate: () => (clock.textContent = fmt(time.s)) }, 0.4)
          .to(words, { opacity: 1, stagger: SECS_PER_WORD, duration: 0.25, ease: 'power1.out' }, 0.6)
          .to({}, { duration: 0.6 });

        tlRef.current = tl;
        if (playing && visible.current) tl.play();
        return () => {
          tlRef.current = null;
        };
      });
    },
    { scope: stage, dependencies: [active], revertOnUpdate: true }
  );

  const toggle = () => {
    const next = !playing;
    setPlaying(next);
    if (!tlRef.current) return;
    if (next && visible.current) tlRef.current.play();
    else tlRef.current.pause();
  };

  return (
    <section ref={root} aria-labelledby="voices-title" className="relative overflow-hidden bg-white py-[60px] sm:py-32 lg:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_40%_at_80%_30%,rgba(196,179,234,0.45),transparent),radial-gradient(35%_30%_at_10%_90%,rgba(252,211,77,0.16),transparent)]" />

      <div className="container-x relative">
        {/* Header */}
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-500" />
              From job seekers
            </p>
            <SplitHeading id="voices-title" className="font-display text-display font-extrabold text-ink-950">
              Practice first. <span className="text-brand-600">Then show up ready.</span>
            </SplitHeading>
          </div>
          <p className="text-lead font-medium text-ink-900/65 lg:col-span-4">In their own words: what changed once they practised out loud.</p>
        </div>

        {/* Player */}
        <div data-player className="mt-14 lg:mt-20">
          <div ref={stage} className="grid overflow-hidden rounded-[36px] bg-brand-950 text-white shadow-[0_60px_120px_-50px_rgba(26,15,51,0.85)] lg:grid-cols-[0.8fr_1.2fr]">
            {/* Portrait */}
            <div className="relative p-4 sm:p-6">
              <div data-portrait className="relative aspect-[4/3] overflow-hidden rounded-[28px] lg:aspect-auto lg:h-full lg:min-h-[480px]">
                <div data-portrait-img className="absolute inset-0">
                  <Image key={t.image} src={t.image} alt={`${t.role} from ${t.place}`} fill sizes="(max-width: 1024px) 92vw, 600px" className="object-cover" />
                </div>
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-transparent" />
                <div data-who className="absolute inset-x-5 bottom-5">
                  <p className="font-display text-2xl font-extrabold tracking-[-0.02em]">{t.role}</p>
                  <p className="mt-1 text-sm font-medium text-white/75">{t.place}</p>
                </div>
              </div>
            </div>

            {/* Voice note */}
            <div className="flex min-w-0 flex-col p-5 pt-2 sm:p-10 lg:pl-4">
              <div className="flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-[0.16em] text-brand-200">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-rose-500" />
                  Voice note {active + 1} of {TESTIMONIALS.length}
                </span>
                {anySample && <span className="rounded-full bg-white/10 px-2.5 py-1 normal-case tracking-normal text-white/60">Sample stories</span>}
              </div>

              <blockquote className="mt-6 flex-1 font-display text-[clamp(1.5rem,1rem+1.8vw,2.75rem)] font-bold leading-[1.2] tracking-[-0.025em]">
                <span className="text-gold-400">“</span>
                {t.quote.split(' ').map((w, i) => (
                  <span key={`${active}-${i}`} data-word>
                    {w}{' '}
                  </span>
                ))}
                <span className="text-gold-400">”</span>
              </blockquote>

              {/* Waveform and controls */}
              <div className="mt-8 flex items-center gap-4">
                <button
                  type="button"
                  onClick={toggle}
                  aria-label={playing ? 'Pause stories' : 'Play stories'}
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold-400 text-ink-950 transition-transform duration-300 hover:scale-105"
                >
                  {playing ? (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                      <rect x="6" y="5" width="4" height="14" rx="1" />
                      <rect x="14" y="5" width="4" height="14" rx="1" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-5 w-5" aria-hidden="true">
                      <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5z" />
                    </svg>
                  )}
                </button>
                <div className="relative h-12 min-w-0 flex-1">
                  <Wave thin className="text-white/15" />
                  <span data-fill className="absolute inset-0 text-gold-400">
                    <Wave thin />
                  </span>
                </div>
                <span className="shrink-0 whitespace-nowrap text-right font-mono text-sm font-bold tabular-nums text-brand-100">
                  <span data-clock>0:00</span>
                  <span className="text-white/40"> / {fmt(lengthOf(t))}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Playlist */}
          <div data-notes className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {TESTIMONIALS.map((x, i) => {
              const on = i === active;
              return (
                <button
                  key={x.image}
                  type="button"
                  data-note
                  onClick={() => {
                    setActive(i);
                    setPlaying(true);
                  }}
                  aria-pressed={on}
                  className={`group flex items-center gap-3 rounded-2xl border p-3 text-left transition-colors duration-300 ${on ? 'border-brand-600 bg-brand-600 text-white' : 'border-hairline bg-white text-ink-950 hover:border-brand-300'}`}
                >
                  <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-white">
                    <Image src={x.image} alt="" fill sizes="48px" className="object-cover" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold">{x.role}</span>
                    <span className={`mt-1 flex h-4 items-center gap-2 text-xs font-semibold ${on ? 'text-gold-300' : 'text-ink-900/45'}`}>
                      <Wave bars={BARS.slice(i * 8, i * 8 + 18)} className={`w-20 ${on ? 'text-gold-400' : 'text-brand-200'}`} />
                      {fmt(lengthOf(x))}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
