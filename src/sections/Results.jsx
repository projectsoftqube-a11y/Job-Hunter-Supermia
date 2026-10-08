'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';
import { PRODUCT_FACTS } from '@/content/site';

/*
 * Knockout zoom. The page colour covers a full-screen photo except where the word CONFIDENCE is cut
 * out of it. While the section is pinned the cut-out zooms through the "I" until the photo fills the
 * screen, then the closing line and the product facts land on top as glass cards.
 * The markup renders the final state; the intro state is only set when motion is allowed.
 */

const WORD = 'CONFIDENCE';
const VB_W = 1600;
const VB_H = 900;
const FONT = 300;

export default function Results() {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const text = q('[data-word]')[0];
        const knock = q('[data-knock]')[0];

        // Zoom around the middle of the "I" so the hole grows until it covers the screen
        // Middle of the I stem: halfway between its start and end, half a cap height above the baseline.
        // Measured on every zoom frame so it always matches the font actually on screen (the web font
        // can finish loading after this code first runs, which moves the letters).
        let ox = VB_W / 2;
        let oy = VB_H / 2;
        const measure = () => {
          try {
            const i = WORD.indexOf('I');
            const a = text.getStartPositionOfChar(i);
            const b = text.getEndPositionOfChar(i);
            ox = (a.x + b.x) / 2;
            oy = a.y - FONT * 0.34;
          } catch {
            /* keep the last value */
          }
        };

        gsap.set(q('[data-overlay]'), { autoAlpha: 1 });
        gsap.set(q('[data-intro]'), { autoAlpha: 1 });
        const zoom = { s: 1 };
        const applyZoom = () => {
          measure();
          knock.setAttribute('transform', `translate(${ox} ${oy}) scale(${zoom.s}) translate(${-ox} ${-oy})`);
        };
        applyZoom();
        gsap.set(q('[data-photo]'), { scale: 1.35 });
        gsap.set(q('[data-shade]'), { opacity: 0 });
        gsap.set(q('[data-final-word]'), { yPercent: 110 });
        gsap.set(q('[data-final-mark]'), { scaleX: 0 });
        gsap.set(q('[data-final-swoosh]'), { strokeDasharray: 1, strokeDashoffset: 1 });
        gsap.set(q('[data-final-sub]'), { y: 30, opacity: 0 });
        gsap.set(q('[data-card]'), { y: 120, opacity: 0, rotate: (i) => [-4, 3, -2, 4][i] });
        q('[data-count]').forEach((el) => (el.textContent = '0'));

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: q('[data-pin]')[0],
            start: 'top top',
            end: '+=240%',
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(q('[data-intro-top]'), { y: -60, opacity: 0, duration: 0.35, ease: 'power2.in' }, 0.05)
          .to(q('[data-intro-bottom]'), { y: 60, opacity: 0, duration: 0.35, ease: 'power2.in' }, 0.05)
          .to(zoom, { s: 95, duration: 1.1, ease: 'power3.in', onUpdate: applyZoom }, 0.1)
          .to(q('[data-cover]'), { opacity: 0, duration: 0.35, ease: 'power1.in' }, 0.8)
          .to(q('[data-photo]'), { scale: 1, duration: 1.3, ease: 'power2.out' }, 0.1)
          .set(q('[data-overlay]'), { autoAlpha: 0 }, 1.22)
          .to(q('[data-shade]'), { opacity: 1, duration: 0.4 }, 1.1)
          .to(q('[data-final-word]'), { yPercent: 0, stagger: 0.06, duration: 0.45, ease: 'power3.out' }, 1.3)
          .to(q('[data-final-mark]'), { scaleX: 1, duration: 0.35, ease: 'power2.inOut' }, 1.45)
          .to(q('[data-final-swoosh]'), { strokeDashoffset: 0, duration: 0.4, ease: 'power2.inOut' }, 1.55)
          .to(q('[data-final-sub]'), { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, 1.5)
          .to(q('[data-card]'), { y: 0, opacity: 1, rotate: 0, stagger: 0.08, duration: 0.55, ease: 'back.out(1.4)' }, 1.6);

        q('[data-count]').forEach((el, i) => {
          const o = { v: 0 };
          tl.to(o, { v: Number(el.dataset.count), duration: 0.6, ease: 'power2.out', onUpdate: () => (el.textContent = Math.round(o.v)) }, 1.7 + i * 0.08);
        });
        tl.to({}, { duration: 0.45 }); // short hold before the pin releases
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} aria-labelledby="results-title" className="relative bg-[#faf9ff]">
      <div data-pin className="relative h-[100svh] min-h-[600px] overflow-hidden">
        {/* Photo under everything */}
        <div data-photo className="absolute inset-0">
          <Image src="/images/real-interview-success.jpg" alt="Candidate shaking hands with a hiring manager after a successful interview" fill sizes="100vw" className="object-cover object-[40%_center]" />
        </div>
        <div data-shade aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,15,51,0.35)_0%,rgba(26,15,51,0.55)_45%,rgba(26,15,51,0.92)_100%)]" />

        {/* Page-coloured cover with the word cut out of it (motion only) */}
        <svg data-overlay aria-hidden="true" className="invisible absolute inset-0 h-full w-full overflow-visible" viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="xMidYMid meet">
          <defs>
            <mask id="confidenceMask" maskUnits="userSpaceOnUse" x="-20000" y="-20000" width="40000" height="40000">
              <rect x="-20000" y="-20000" width="40000" height="40000" fill="#fff" />
              <g data-knock>
                <text data-word x={VB_W / 2} y={VB_H / 2 + 105} textAnchor="middle" textLength="1500" lengthAdjust="spacingAndGlyphs" className="font-display" fontSize={FONT} fontWeight="800" letterSpacing="-6" fill="#000">
                  {WORD}
                </text>
              </g>
            </mask>
          </defs>
          <rect data-cover x="-20000" y="-20000" width="40000" height="40000" fill="#faf9ff" mask="url(#confidenceMask)" />
        </svg>

        {/* Intro lines around the word (motion only) */}
        <div data-intro aria-hidden="true" className="invisible pointer-events-none absolute inset-0">
          <div data-intro-top className="absolute inset-x-0 top-[clamp(5.5rem,16vh,9rem)] text-center">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
              Why it works
            </p>
            <p className="font-display text-[clamp(1.6rem,1rem+2.2vw,3.25rem)] font-extrabold tracking-[-0.03em] text-ink-950">Practice builds</p>
          </div>
          <div data-intro-bottom className="absolute inset-x-0 bottom-[clamp(5rem,14vh,8rem)] text-center">
            <p className="mx-auto max-w-[36rem] px-4 text-lead font-medium text-ink-900/65">You walk in having answered the questions out loud, with a resume tuned to the job.</p>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-brand-500">Scroll</p>
          </div>
        </div>

        {/* Final state: closing line and the facts */}
        <div className="container-x relative flex h-full flex-col justify-end pb-28 text-white sm:pb-[clamp(2.5rem,7vh,5rem)]">
          <h2 id="results-title" className="max-w-[16ch] font-display text-[clamp(2.2rem,1.2rem+3.6vw,5.5rem)] font-extrabold leading-[1.02] tracking-[-0.04em]">
            <span className="sr-only">Practice builds confidence. </span>
            <span className="inline-block overflow-hidden pb-[0.06em] align-bottom">
              <span data-final-word className="relative isolate inline-block">
                Confidence
                <span data-final-mark aria-hidden="true" className="absolute inset-x-[-0.06em] bottom-[0.1em] -z-[1] h-[0.3em] origin-left -skew-x-6 rounded-[0.06em] bg-brand-500" />
              </span>
            </span>{' '}
            {['shows', 'in'].map((w) => (
              <span key={w} className="inline-block overflow-hidden pb-[0.06em] align-bottom">
                <span data-final-word className="inline-block">{w}&nbsp;</span>
              </span>
            ))}
            <span className="-mb-[0.22em] inline-block overflow-hidden pb-[0.3em] align-bottom">
              <span data-final-word className="relative inline-block bg-gradient-to-r from-gold-300 via-gold-400 to-brand-300 bg-clip-text pr-[0.04em] text-transparent">
                the room.
                <svg viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true" className="absolute left-0 top-[88%] h-[0.2em] w-[92%] overflow-visible text-gold-400">
                  <path data-final-swoosh d="M4 17C70 7 160 4 296 13" pathLength="1" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
                </svg>
              </span>
            </span>
          </h2>
          <p data-final-sub className="mt-4 max-w-[38rem] text-lead font-medium text-white/80">
            You walk in having already answered the questions out loud, with a resume tuned to the job and a clear list of what to brush up on.
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-10 lg:grid-cols-4">
            {PRODUCT_FACTS.map((f) => (
              <div key={f.label} data-card className="rounded-[24px] border border-white/15 bg-brand-950/55 p-4 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)] sm:p-6">
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className="block font-display text-[clamp(2.25rem,1.5rem+2.8vw,4.5rem)] font-extrabold leading-none tracking-[-0.05em] text-gold-400">
                    {f.prefix}
                    <span data-count={f.value}>{f.value}</span>
                    {f.suffix}
                  </span>
                  <span className="mt-2 block text-[13px] font-semibold leading-snug text-white/80 sm:text-[15px]">{f.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
