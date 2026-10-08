'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';
import CreativeHeading from '@/components/CreativeHeading';

const PDF = '/brochure/job-hunter-brochure.pdf';
const DOWNLOAD_NAME = 'JobHunter-AI-by-SuperMIA-brochure.pdf';
const page = (n) => `/brochure/pages/page-${n}.jpg`;

// Pages 2-8 of the PDF (page 1 is the cover)
const CHAPTERS = [
  'The hidden challenges of job hunting',
  'The AI-powered career workflow',
  'Meet your AI career coach',
  'The Job Hunter story: before and after',
  'What makes Job Hunter different',
  'Discover, tailor, apply and practice',
  'Let’s build your career together',
];
const TITLE = (n) => (n === 1 ? 'Cover' : CHAPTERS[n - 2]);

// A leaf is one sheet: its front is an odd page, its back the next even page
const LEAVES = [
  [1, 2],
  [3, 4],
  [5, 6],
  [7, 8],
];
// What is open after each turn
const SPREADS = [[1], [2, 3], [4, 5], [6, 7], [8]];
const SPREAD_LABEL = ['Cover', 'Pages 2–3', 'Pages 4–5', 'Pages 6–7', 'Page 8'];

/*
 * Brochure as a real book. On desktop the section pins and the brochure, built from the eight pages of
 * the PDF, opens and turns one sheet per scroll step; the chapter list follows the open spread, and the
 * last spread lands on a download page. On phones the pages sit in a swipeable strip. Without motion the
 * closed brochure is shown with the same download links.
 */
export default function Brochure() {
  const root = useRef(null);
  const spreadRef = useRef(0);
  const [spread, setSpread] = useState(0);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        const book = q('[data-book]')[0];
        const leaves = q('[data-leaf]');
        const TURN = 1.15;
        const first = 0.7;
        const at = (k) => first + k * TURN;

        gsap.set(book, { xPercent: -25, transformPerspective: 2400 });

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: q('[data-pin]')[0],
            start: 'top top',
            end: '+=380%',
            scrub: 0.7,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
          onUpdate() {
            const t = this.time();
            const open = leaves.filter((_, k) => t >= at(k) + TURN * 0.45).length;
            if (open !== spreadRef.current) {
              spreadRef.current = open;
              setSpread(open);
            }
          },
        });

        // The closed brochure settles flat before the cover opens
        tl.fromTo(book, { rotationX: 16, rotation: -3, scale: 0.92 }, { rotationX: 0, rotation: 0, scale: 1, duration: first, ease: 'power2.out' }, 0);

        leaves.forEach((leaf, k) => {
          const start = at(k);
          tl.to(leaf, { rotationY: -180, duration: TURN, ease: 'power1.inOut' }, start)
            .to(leaf.querySelector('[data-shade-front]'), { opacity: 1, duration: TURN / 2, ease: 'power1.in' }, start)
            .fromTo(leaf.querySelector('[data-shade-back]'), { opacity: 1 }, { opacity: 0, duration: TURN / 2, ease: 'power1.out', immediateRender: false }, start + TURN / 2)
            .set(leaf, { zIndex: 10 + k }, start + TURN / 2);
        });

        // Opening the cover slides the book from centred-closed to centred-open
        tl.to(book, { xPercent: 0, duration: TURN, ease: 'power1.inOut' }, at(0))
          .to(q('[data-left-base]'), { opacity: 1, duration: TURN * 0.4 }, at(0) + TURN * 0.5)
          .to({}, { duration: 0.6 });

        return () => {
          spreadRef.current = 0;
          setSpread(0);
        };
      });

      mm.add(MOTION_OK, () => {
        gsap.from(q('[data-copy] > :not([data-heading])'), { y: 36, opacity: 0, stagger: 0.07, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: q('[data-copy]')[0], start: 'top 82%', once: true } });
        gsap.from(q('[data-strip] > *'), { x: 80, opacity: 0, stagger: 0.06, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: q('[data-strip]')[0], start: 'top 90%', once: true } });
      });
    },
    { scope: root }
  );

  const visible = SPREADS[spread];

  return (
    <section id="brochure" ref={root} aria-labelledby="brochure-title" className="grain relative overflow-hidden bg-brand-950 text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_55%_at_68%_50%,rgba(109,76,176,0.5),transparent),radial-gradient(30%_35%_at_70%_60%,rgba(244,180,0,0.14),transparent),radial-gradient(35%_30%_at_5%_100%,rgba(155,127,212,0.25),transparent)]" />

      <div data-pin className="relative z-[2] py-[60px] sm:py-28 lg:flex lg:h-[100svh] lg:min-h-[680px] lg:items-center lg:pb-6 lg:pt-[92px]">
        <div className="container-x grid w-full grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(300px,400px)_minmax(0,1fr)] lg:gap-14 xl:gap-20">
          {/* Copy, chapters and download */}
          <div data-copy className="min-w-0 lg:self-center">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-gold-300">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              Brochure · 8 pages
            </p>
            <div data-heading>
              <CreativeHeading
            id="brochure-title"
            tone="dark"
            className="font-display text-[clamp(2rem,1.2rem+2.4vw,3.6rem)] font-extrabold leading-[1.04] tracking-[-0.035em]"
            lines={[
              ['The whole'],
              [{ mark: 'story,' }, ' in ', { chip: 'book' }],
              [{ grad: 'eight pages.', swoosh: true }],
            ]}
          />
            </div>
            <p className="mt-5 max-w-[30rem] text-[clamp(1rem,0.95rem+0.3vw,1.15rem)] font-medium leading-relaxed text-brand-100 [@media(min-width:1024px)_and_(max-height:860px)]:hidden">
              <span className="hidden lg:inline">Scroll to turn the pages. </span>
              <span className="lg:hidden">Swipe through the pages. </span>
              Read it later, print it, or share it with someone who is job hunting. No sign-up needed.
            </p>

            <ol className="mt-7 border-t border-white/10">
              {CHAPTERS.map((c, i) => {
                const n = i + 2;
                const on = visible.includes(n);
                return (
                  <li key={c} className="border-b border-white/10">
                    <a
                      href={`${PDF}#page=${n}`}
                      target="_blank"
                      rel="noopener"
                      aria-current={on ? 'true' : undefined}
                      className={`group relative flex items-center gap-4 py-2.5 pl-4 text-[15px] font-semibold transition-colors duration-300 lg:py-[clamp(0.35rem,1.1svh,0.7rem)] ${on ? 'text-white' : 'text-white/55 hover:text-white/85'}`}
                    >
                      <span aria-hidden="true" className={`absolute inset-y-1.5 left-0 w-[3px] origin-center rounded-full bg-gold-400 transition-transform duration-500 ease-out-expo ${on ? 'scale-y-100' : 'scale-y-0'}`} />
                      <span className={`w-6 shrink-0 font-display text-sm font-bold tabular-nums transition-colors duration-300 ${on ? 'text-gold-400' : 'text-brand-300'}`}>{String(i + 1).padStart(2, '0')}</span>
                      <span className="min-w-0 flex-1">{c}</span>
                      <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.12em] text-white/35 transition-colors group-hover:text-gold-300">p.{n}</span>
                    </a>
                  </li>
                );
              })}
            </ol>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href={PDF}
                download={DOWNLOAD_NAME}
                className="group relative isolate inline-flex h-14 items-center gap-3 overflow-hidden rounded-full bg-gold-500 pl-7 pr-2 text-[15px] font-bold text-ink-950"
              >
                <span aria-hidden="true" className="absolute inset-0 -z-10 translate-y-full rounded-full bg-white transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0" />
                Download the brochure
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-950 text-gold-400" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 transition-transform duration-500 group-hover:translate-y-0.5">
                    <path d="M12 4v12M6 11l6 6 6-6M5 20h14" />
                  </svg>
                </span>
              </a>
              <a href={PDF} target="_blank" rel="noopener" className="text-sm font-bold text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-gold-400">
                Open in browser
              </a>
            </div>
            <p className="mt-4 text-xs font-semibold text-white/40">PDF · 8 pages · 10.8 MB</p>
          </div>

          {/* Desktop: the book */}
          <div className="relative hidden min-w-0 flex-col items-center justify-center lg:flex">
            <div data-book className="relative aspect-[420/297] w-[min(100%,calc((100svh-240px)*1.414))] will-change-transform motion-reduce:-translate-x-1/4">
              <div className="absolute inset-0 [perspective:2600px]">
                {/* Left base: page edges that appear once the book is open */}
                <div data-left-base aria-hidden="true" className="absolute inset-y-0 left-0 w-1/2 opacity-0">
                  {[3, 2, 1].map((d) => (
                    <span key={d} className="absolute rounded-l-[12px] bg-[#f1eef8] ring-1 ring-black/10" style={{ top: d * 2.5, bottom: -d * 2.5, left: -d * 3, right: 0 }} />
                  ))}
                </div>

                {/* Right base: page edges and the closing download page */}
                <div className="absolute inset-y-0 right-0 w-1/2 [container-type:inline-size]">
                  {[3, 2, 1].map((d) => (
                    <span key={d} aria-hidden="true" className="absolute rounded-r-[12px] bg-[#f1eef8] ring-1 ring-black/10" style={{ top: d * 2.5, bottom: -d * 2.5, left: 0, right: -d * 3 }} />
                  ))}
                  <div className="absolute inset-0 flex flex-col overflow-hidden rounded-r-[12px] bg-gradient-to-br from-brand-600 via-brand-800 to-brand-950 p-[9cqw]">
                    <span aria-hidden="true" className="absolute -right-[20cqw] -top-[20cqw] h-[70cqw] w-[70cqw] rounded-full bg-[radial-gradient(closest-side,rgba(244,180,0,0.35),transparent)]" />
                    <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[8cqw] bg-gradient-to-r from-black/35 to-transparent" />
                    <p className="relative text-[2.6cqw] font-bold uppercase tracking-[0.18em] text-gold-300">Keep it</p>
                    <p className="relative mt-[3cqw] font-display text-[9cqw] font-extrabold leading-[1.02] tracking-[-0.03em]">
                      Take Job Hunter <span className="text-gold-400">with you.</span>
                    </p>
                    <p className="relative mt-[4cqw] text-[3.4cqw] font-medium leading-relaxed text-brand-100">Read it later, print it, or share it with someone who is job hunting.</p>
                    <div className="relative mt-auto flex flex-col gap-[3cqw]">
                      <a href={PDF} download={DOWNLOAD_NAME} className="flex h-[12cqw] items-center justify-between rounded-full bg-gold-500 pl-[6cqw] pr-[1.6cqw] text-[3.6cqw] font-bold text-ink-950 transition-colors hover:bg-gold-300">
                        Download PDF
                        <span aria-hidden="true" className="flex h-[9cqw] w-[9cqw] items-center justify-center rounded-full bg-ink-950 text-gold-400">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="h-[4.5cqw] w-[4.5cqw]">
                            <path d="M12 4v12M6 11l6 6 6-6M5 20h14" />
                          </svg>
                        </span>
                      </a>
                      <p className="text-center text-[2.6cqw] font-semibold text-white/50">8 pages · no sign-up needed</p>
                    </div>
                  </div>
                </div>

                {/* The sheets */}
                {LEAVES.map(([front, back], k) => (
                  <div key={front} data-leaf className="absolute inset-y-0 right-0 w-1/2 origin-left [transform-style:preserve-3d]" style={{ zIndex: LEAVES.length - k }}>
                    <div className="absolute inset-0 overflow-hidden rounded-r-[12px] bg-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] [backface-visibility:hidden]">
                      <Image src={page(front)} alt={`Brochure page ${front}: ${TITLE(front)}`} fill sizes="(min-width: 1024px) 460px, 1px" className="object-cover" />
                      <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[9%] bg-gradient-to-r from-black/25 via-black/5 to-transparent" />
                      <span data-shade-front aria-hidden="true" className="absolute inset-0 bg-gradient-to-l from-black/45 via-black/15 to-transparent opacity-0" />
                    </div>
                    <div className="absolute inset-0 overflow-hidden rounded-l-[12px] bg-white [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <Image src={page(back)} alt={`Brochure page ${back}: ${TITLE(back)}`} fill sizes="(min-width: 1024px) 460px, 1px" className="object-cover" />
                      <span aria-hidden="true" className="absolute inset-y-0 right-0 w-[9%] bg-gradient-to-l from-black/25 via-black/5 to-transparent" />
                      <span data-shade-back aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent opacity-0" />
                    </div>
                  </div>
                ))}
              </div>
              <div aria-hidden="true" className="absolute -bottom-10 left-1/2 -z-[1] h-12 w-[80%] -translate-x-1/2 rounded-[50%] bg-black/50 blur-2xl" />
            </div>

            {/* Where you are in the book */}
            <div className="mt-9 flex items-center gap-4">
              <span className="flex gap-1.5" aria-hidden="true">
                {SPREADS.map((_, i) => (
                  <span key={i} className={`h-1.5 rounded-full transition-all duration-500 ease-out-expo ${i === spread ? 'w-8 bg-gold-400' : i < spread ? 'w-3 bg-white/50' : 'w-3 bg-white/15'}`} />
                ))}
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">{SPREAD_LABEL[spread]}</span>
            </div>
          </div>

          {/* Phones and tablets: swipeable pages */}
          <div className="-mx-[clamp(16px,4.2vw,96px)] min-w-0 lg:hidden">
            <ol data-strip className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-[clamp(16px,4.2vw,96px)] pb-6 [scrollbar-width:none]">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <li key={n} className="w-[min(72vw,340px)] shrink-0 snap-center">
                  <a href={`${PDF}#page=${n}`} target="_blank" rel="noopener" className="block">
                    <span className="relative block aspect-[210/297] overflow-hidden rounded-[14px] bg-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
                      <Image src={page(n)} alt={`Brochure page ${n}: ${TITLE(n)}`} fill sizes="(max-width: 1023px) 72vw, 1px" className="object-cover" />
                      <span className="absolute left-3 top-3 rounded-full bg-brand-950/80 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur">
                        {n} / 8
                      </span>
                    </span>
                    <span className="mt-3 block text-sm font-semibold text-white/70">{TITLE(n)}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
