'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';
import { JobsMock, AtsMock, MailMock, VoiceMock, ReportMock } from '@/components/mocks';
import { FEATURES } from '@/content/site';
import CreativeHeading from '@/components/CreativeHeading';

const MOCKS = { jobs: JobsMock, ats: AtsMock, mail: MailMock, voice: VoiceMock, report: ReportMock };

function Panel({ f }) {
  const Mock = MOCKS[f.mock];
  return (
    <article
      data-panel
      aria-labelledby={`feature-${f.id}`}
      className="relative grid w-full min-w-0 shrink-0 grid-cols-1 items-center gap-8 rounded-[28px] border border-white/10 bg-brand-900/60 p-4 sm:rounded-[36px] sm:p-8 lg:w-[min(84vw,1480px)] lg:grid-cols-2 lg:gap-14 lg:p-12 xl:p-16"
    >
      <div className="relative order-2 min-w-0 lg:order-1">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-2 -top-14 font-display text-[clamp(5rem,3rem+8vw,13rem)] font-extrabold leading-none text-transparent sm:-top-20"
          style={{ WebkitTextStroke: '1.5px rgba(196,179,234,0.28)' }}
        >
          {f.index}
        </span>
        <div className="relative">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-gold-500 px-3 py-1 text-xs font-bold text-ink-900">Feature {f.index}</p>
          <h3 id={`feature-${f.id}`} className="font-display text-title font-bold text-white">
            {f.title}
          </h3>
          <p className="mt-5 max-w-xl text-lead font-medium text-brand-100">{f.body}</p>
        </div>
      </div>

      <div className="relative order-1 min-w-0 lg:order-2">
        {f.image ? (
          <div className="relative">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] sm:aspect-[16/11] sm:rounded-[28px]">
              <div data-panel-img className="absolute -inset-x-[8%] inset-y-0">
                <Image src={f.image} alt={f.alt} fill sizes="(max-width: 1024px) 92vw, 42vw" className="object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/50 via-transparent to-transparent" />
            </div>
            <div className="relative z-[2] mt-4 w-full sm:-mt-32 sm:ml-auto sm:w-[78%] lg:-mr-6">
              <Mock />
            </div>
          </div>
        ) : (
          <div className="relative flex items-center justify-center rounded-[22px] bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 p-3 sm:rounded-[28px] sm:p-10">
            <div aria-hidden="true" className="absolute inset-0 rounded-[28px] opacity-30" style={{ background: 'radial-gradient(circle at 75% 20%, rgba(244,180,0,0.55), transparent 55%)' }} />
            <div className="relative w-full max-w-[520px]">
              <Mock />
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

/**
 * Desktop: the section pins and the five panels slide past horizontally, with a progress bar.
 * Phones and tablets: the same panels stack vertically.
 */
export default function Features() {
  const root = useRef(null);
  const track = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        const pinEl = root.current.querySelector('[data-pin]');
        const distance = () => Math.max(0, track.current.scrollWidth - window.innerWidth);
        const slide = gsap.to(track.current, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: pinEl,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
        gsap.fromTo('[data-progress]', { scaleX: 0.04 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: pinEl, start: 'top top', end: () => `+=${distance()}`, scrub: true } });

        // Each photo drifts inside its frame as its panel crosses the screen
        gsap.utils.toArray('[data-panel-img]').forEach((img) => {
          gsap.fromTo(img, { xPercent: -6 }, { xPercent: 6, ease: 'none', scrollTrigger: { trigger: img, containerAnimation: slide, start: 'left right', end: 'right left', scrub: true } });
        });
      });

      mm.add(`(max-width: 1023px) and ${MOTION_OK}`, () => {
        gsap.utils.toArray('[data-panel]').forEach((panel) => {
          gsap.from(panel, { y: 80, opacity: 0, duration: 1.2, scrollTrigger: { trigger: panel, start: 'top 85%', once: true } });
        });
      });
    },
    { scope: root }
  );

  return (
    <section id="features" ref={root} aria-labelledby="features-title" className="grain relative bg-brand-950 text-white">
      <div className="container-x relative z-[2] pb-10 pt-[60px] sm:pb-12 sm:pt-32 lg:pb-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <CreativeHeading
            id="features-title"
            tone="dark"
            className="font-display text-display font-extrabold lg:col-span-8"
            lines={[
              ['Everything between ', { mark: 'applying' }],
              ['and ', { chip: 'spark' }, ' ', { grad: 'getting hired.', swoosh: true }],
            ]}
          />
          <p className="text-lead font-medium text-brand-100 lg:col-span-4">
            Five tools that work together, so every application is better than the last one.
          </p>
        </div>
      </div>

      <div data-pin className="relative z-[2] lg:flex lg:h-[100svh] lg:flex-col lg:justify-center lg:overflow-hidden">
        <div ref={track} className="container-x flex flex-col gap-6 pb-[60px] sm:pb-24 lg:w-max lg:max-w-none lg:flex-row lg:gap-10 lg:pb-0">
          {FEATURES.map((f) => (
            <Panel key={f.id} f={f} />
          ))}
        </div>
        <div className="container-x mt-10 hidden lg:block" aria-hidden="true">
          <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/10">
            <div data-progress className="h-full origin-left rounded-full bg-gradient-to-r from-brand-400 to-gold-400" />
          </div>
        </div>
      </div>
    </section>
  );
}
