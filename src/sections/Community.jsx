'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';
import CreativeHeading from '@/components/CreativeHeading';
import Link from 'next/link';
import { Icon } from '@/components/icons';
import { AUDIENCE } from '@/content/site';

/*
 * The group photo is cut into one slice per person. The slices start apart at different heights and
 * glide together into a single seamless photo as the section scrolls through. Each slice links to that
 * audience's page: hovering one dims the others and raises its description. On phones the same links
 * sit in a list under the photo. The people are illustrative, not real customers.
 */
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
        <div className="mx-auto max-w-[80rem] text-center">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
            Who it is for
          </p>
          <CreativeHeading
            id="community-title"
            className="font-display text-display font-extrabold text-ink-950"
            lines={[['Who ', { mark: 'JobHunter' }, ' Is ', { grad: 'Built For', swoosh: true }]]}
          />
          <p className="mx-auto mt-6 max-w-[58rem] text-lead font-medium text-ink-900/65">{AUDIENCE.sub}</p>
        </div>

        {/* Sliced photo: each person's slice links to their page. Hover one and the others dim. */}
        <ul data-strip className="group/strip mt-10 flex h-[clamp(300px,58vw,760px)] sm:mt-20" style={{ columnGap: 0, '--r': '0px', '--R': 'clamp(20px,2.5vw,36px)' }}>
          {AUDIENCE.items.map((p, i) => (
            <li
              key={p.label}
              data-slice
              className="relative h-full flex-1 overflow-hidden"
              style={{ borderRadius: i === 0 ? 'var(--R) var(--r) var(--r) var(--R)' : i === AUDIENCE.items.length - 1 ? 'var(--r) var(--R) var(--R) var(--r)' : 'var(--r)' }}
            >
              <Link href={p.href} className="group/slice absolute inset-0 block outline-none">
                <span data-slice-img className="absolute inset-y-0 block h-full w-[500%]" style={{ left: `${-i * 100}%` }}>
                  <span className="absolute inset-0 block transition-[filter] duration-500 group-hover/strip:brightness-[0.6] group-hover/strip:saturate-[0.4] group-hover/slice:brightness-100! group-hover/slice:saturate-100! group-focus-visible/slice:brightness-100! group-focus-visible/slice:saturate-100!">
                    <Image
                      src="/images/community-group.jpg"
                      alt={i === 0 ? 'Group of young professionals walking together across a sunlit campus' : ''}
                      fill
                      sizes="100vw"
                      className="object-cover object-[50%_60%]"
                    />
                  </span>
                </span>

                {/* Bottom panel: name always, line and arrow on hover or focus */}
                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-950/90 via-brand-950/45 to-transparent transition-[height] duration-500 group-hover/slice:h-[70%] group-focus-visible/slice:h-[70%]" />
                <span data-tag className="absolute inset-x-0 bottom-0 hidden flex-col p-5 md:flex lg:p-6">
                  <span className="font-display text-[12px] font-bold tracking-[0.2em] text-gold-300">0{i + 1}</span>
                  <span className="mt-1.5 flex items-end justify-between gap-3">
                    <span className="font-display text-[clamp(1.05rem,0.7rem+0.8vw,1.45rem)] font-bold leading-tight tracking-[-0.02em] text-white">{p.label.replace(/^./, (c) => c.toUpperCase())}</span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 text-white transition-[background-color,border-color,color,transform] duration-300 group-hover/slice:-rotate-45 group-hover/slice:border-gold-400 group-hover/slice:bg-gold-400 group-hover/slice:text-ink-950 group-focus-visible/slice:bg-gold-400 group-focus-visible/slice:text-ink-950">
                      <Icon name="arrow" className="h-4 w-4" strokeWidth={2.2} />
                    </span>
                  </span>
                  <span className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/slice:grid-rows-[1fr] group-focus-visible/slice:grid-rows-[1fr]">
                    <span className="overflow-hidden">
                      <span className="block pt-2.5 text-[14px] leading-relaxed text-white/80">{p.text}</span>
                    </span>
                  </span>
                </span>
                <span className="sr-only md:hidden">{p.label}</span>
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit] ring-0 ring-inset ring-gold-400 transition-[box-shadow] group-focus-visible/slice:ring-4" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Phones: the same five links as an editorial list under the photo */}
        <ul className="mt-6 divide-y divide-ink-900/[0.08] border-y border-ink-900/[0.08] md:hidden">
          {AUDIENCE.items.map((p, i) => (
            <li key={p.label}>
              <Link href={p.href} className="group flex items-center gap-4 py-4">
                <span className="w-7 shrink-0 font-display text-[13px] font-bold text-brand-400">0{i + 1}</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[1.1rem] font-bold text-ink-950">{p.label.replace(/^./, (c) => c.toUpperCase())}</span>
                  <span className="mt-0.5 block text-[14px] leading-snug text-ink-900/60">{p.text}</span>
                </span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink-900/10 text-ink-950 transition-colors group-hover:bg-gold-400" aria-hidden="true">
                  <Icon name="arrow" className="h-4 w-4" strokeWidth={2.2} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
