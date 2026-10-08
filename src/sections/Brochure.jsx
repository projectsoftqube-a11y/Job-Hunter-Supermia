'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';
import { SplitHeading } from '@/components/Reveal';

const PDF = '/brochure/job-hunter-brochure.pdf';
const CHAPTERS = ['The problem with most job hunts', 'Five tools that work together', 'How it works, in three steps', 'AI mock interviews: rounds and modes', 'Why practice works'];

/*
 * Brochure download. A 3D brochure built from the real PDF pages: as the section scrolls in it swings
 * round to face you, the cover opens on its spine to show the features page, and the pages behind
 * fan out. The download link serves the same PDF.
 */
export default function Brochure() {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const book = q('[data-book]')[0];

        gsap.set(book, { transformPerspective: 1800 });
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: q('[data-stage]')[0], start: 'top 85%', end: 'center 45%', scrub: 0.8 },
        });
        // Stays closed: it swings round to face you and settles, while a gloss sweeps across the cover
        tl.fromTo(book, { rotationY: -38, rotationX: 16, rotation: 6, y: 140, scale: 0.85 }, { rotationY: -14, rotationX: 6, rotation: -3, y: 0, scale: 1, duration: 1, ease: 'power2.out' }, 0).fromTo(
          q('[data-gloss]'),
          { xPercent: -120 },
          { xPercent: 120, duration: 0.7, ease: 'power1.inOut' },
          0.35
        );

        // A slow idle float once it has landed
        gsap.to(q('[data-float]'), { y: -10, rotation: 0.6, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 });

        // Copy and the chapter list
        gsap.from(q('[data-copy] > *'), { y: 36, opacity: 0, stagger: 0.08, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: q('[data-copy]')[0], start: 'top 82%', once: true } });
        gsap.from(q('[data-chapter]'), { x: -20, opacity: 0, stagger: 0.07, duration: 0.8, ease: 'expo.out', scrollTrigger: { trigger: q('[data-chapters]')[0], start: 'top 85%', once: true } });
      });
    },
    { scope: root }
  );

  return (
    <section id="brochure" ref={root} aria-labelledby="brochure-title" className="relative overflow-hidden bg-white py-[60px] sm:py-32 lg:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_45%_at_75%_50%,rgba(196,179,234,0.45),transparent),radial-gradient(30%_30%_at_10%_90%,rgba(252,211,77,0.16),transparent)]" />

      <div className="container-x relative grid items-center gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16">
        {/* Copy */}
        <div data-copy>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
            Brochure
          </p>
          <SplitHeading id="brochure-title" className="font-display text-[clamp(2rem,1.2rem+2.8vw,4.25rem)] font-extrabold leading-[1.04] tracking-[-0.035em] text-ink-950">
            Everything about Job Hunter, in one brochure.
          </SplitHeading>
          <p className="mt-5 max-w-[34rem] text-lead font-medium text-ink-900/65">Read it later, print it, or share it with someone who is job hunting. Six pages, no sign-up needed.</p>

          <ol data-chapters className="mt-8 space-y-2.5">
            {CHAPTERS.map((c, i) => (
              <li key={c} data-chapter className="flex items-center gap-4 border-b border-ink-900/10 pb-2.5 text-[15px] font-semibold text-ink-900/80">
                <span className="font-display text-sm font-bold text-brand-400">0{i + 2}</span>
                {c}
              </li>
            ))}
          </ol>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={PDF}
              download="Job-Hunter-brochure.pdf"
              className="group relative isolate inline-flex h-14 items-center gap-3 overflow-hidden rounded-full bg-brand-600 pl-7 pr-2 text-[15px] font-semibold text-white sm:h-16 sm:text-base"
            >
              <span aria-hidden="true" className="absolute inset-0 -z-10 translate-y-full rounded-full bg-brand-900 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0" />
              Download the brochure
              <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gold-400 text-ink-950 sm:h-12 sm:w-12" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 transition-transform duration-500 group-hover:translate-y-0.5">
                  <path d="M12 4v12M6 11l6 6 6-6M5 20h14" />
                </svg>
              </span>
            </a>
            <a href={PDF} target="_blank" rel="noopener" className="text-sm font-bold text-brand-600 underline decoration-brand-200 underline-offset-4 transition-colors hover:decoration-brand-600">
              Open in browser
            </a>
          </div>
          <p className="mt-4 text-xs font-semibold text-ink-900/45">PDF · 6 pages · 4.8 MB</p>
        </div>

        {/* Closed brochure */}
        <div data-stage className="relative mx-auto w-full max-w-[520px] py-6 lg:py-10">
          <a href={PDF} target="_blank" rel="noopener" aria-label="Open the Job Hunter brochure" data-cursor="Open" className="block">
            <div data-float>
              <div data-book className="relative mx-auto aspect-[210/297] w-[min(76%,420px)] [transform-style:preserve-3d]">
                {/* Page block: stacked edges peeking out on the right and bottom give it thickness */}
                {[3, 2, 1].map((d) => (
                  <span
                    key={d}
                    aria-hidden="true"
                    className="absolute inset-0 rounded-r-[10px] rounded-l-[3px] border border-ink-900/10 bg-[#fbfaf7]"
                    style={{ transform: `translate(${d * 3}px, ${d * 3}px)` }}
                  />
                ))}
                <span aria-hidden="true" className="absolute inset-0 translate-x-[12px] translate-y-[12px] rounded-r-[12px] rounded-l-[4px] bg-ink-950/25 blur-xl" style={{ zIndex: -1 }} />

                {/* Cover */}
                <div className="absolute inset-0 overflow-hidden rounded-r-[10px] rounded-l-[3px] shadow-[0_50px_90px_-35px_rgba(26,15,51,0.75)]">
                  <Image src="/brochure/cover.jpg" alt="Cover of the Job Hunter brochure" fill sizes="(max-width: 1024px) 76vw, 420px" className="object-cover" />
                  {/* Spine: binding shadow and the crease where the cover folds */}
                  <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[7%] bg-gradient-to-r from-black/45 via-black/15 to-transparent" />
                  <span aria-hidden="true" className="absolute inset-y-0 left-[4.5%] w-px bg-white/25" />
                  {/* Paper light: soft top sheen and a sweep of gloss */}
                  <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.22)_0%,transparent_35%,transparent_70%,rgba(0,0,0,0.12)_100%)]" />
                  <span data-gloss aria-hidden="true" className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                </div>
              </div>
            </div>
          </a>
          <div aria-hidden="true" className="mx-auto mt-8 h-6 w-[55%] rounded-[50%] bg-ink-950/20 blur-xl" />
        </div>
      </div>
    </section>
  );
}
