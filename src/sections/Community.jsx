'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';
import CreativeHeading from '@/components/CreativeHeading';

/*
 * The group photo is cut into one slice per person. The slices start apart at different heights and
 * glide together into a single seamless photo as the section scrolls through, each person's label
 * settling at the bottom of their slice. The labels are illustrative, not real customers.
 */
const PEOPLE = ['New grad', 'Career switcher', 'Engineer', 'Designer', 'Back to work'];
const OFFSETS = [90, -50, 130, -30, 70];

export default function Community() {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const small = window.matchMedia('(max-width: 767px)').matches;
        gsap
          .timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: q('[data-strip]')[0], start: 'top 95%', end: 'center 50%', scrub: 0.8 } })
          .fromTo(q('[data-strip]'), { columnGap: small ? 8 : 18, '--r': small ? '14px' : '26px' }, { columnGap: 0, '--r': '0px' }, 0)
          .fromTo(q('[data-slice]'), { y: (i) => OFFSETS[i] * (small ? 0.4 : 1) }, { y: 0 }, 0)
          .fromTo(q('[data-slice-img]'), { scale: 1.18 }, { scale: 1 }, 0)
          .fromTo(q('[data-tag]'), { y: -16, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.3 }, 0.55);
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} aria-labelledby="community-title" className="relative overflow-hidden bg-white py-[60px] sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_35%_at_15%_10%,rgba(196,179,234,0.4),transparent),radial-gradient(40%_30%_at_90%_95%,rgba(252,211,77,0.16),transparent)]" />

      <div className="container-x relative">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
              Who it is for
            </p>
            <CreativeHeading
            id="community-title"
            className="font-display text-display font-extrabold text-ink-950"
            lines={[
              ['Built for ', { chip: 'users' }, ' people who want ', { mark: 'the job,' }],
              ['not just ', { outline: 'more applications.' }],
            ]}
          />
          </div>
          <p className="text-lead font-medium text-ink-900/65 lg:col-span-4">Whether it is your first role or your next one, you get the same plan: find the right jobs, tailor every application, and practise until you are ready.</p>
        </div>

        {/* Sliced photo */}
        <div data-strip className="mt-10 flex h-[clamp(300px,58vw,760px)] sm:mt-20" style={{ columnGap: 0, '--r': '0px', '--R': 'clamp(20px,2.5vw,36px)' }}>
          {PEOPLE.map((label, i) => (
            <div
              key={label}
              data-slice
              className="relative h-full flex-1 overflow-hidden"
              style={{ borderRadius: i === 0 ? 'var(--R) var(--r) var(--r) var(--R)' : i === PEOPLE.length - 1 ? 'var(--r) var(--R) var(--R) var(--r)' : 'var(--r)' }}
            >
              <div data-slice-img className="absolute inset-y-0 h-full w-[500%]" style={{ left: `${-i * 100}%` }}>
                <Image
                  src="/images/community-group.jpg"
                  alt={i === 0 ? 'Five young professionals walking and laughing together across a sunlit campus' : ''}
                  fill
                  sizes="100vw"
                  className="object-cover object-[50%_60%]"
                />
              </div>
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brand-950/60 to-transparent" />
              <span data-tag className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-full bg-white/90 px-3.5 py-1.5 text-sm font-bold text-ink-950 shadow-lg md:block">
                {label}
              </span>
            </div>
          ))}
        </div>
        <ul className="mt-5 flex flex-wrap justify-center gap-2 md:hidden">
          {PEOPLE.map((label) => (
            <li key={label} className="rounded-full border border-brand-200 bg-white px-3 py-1.5 text-xs font-bold text-ink-950">
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
