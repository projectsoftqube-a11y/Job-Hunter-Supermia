'use client';

import { useRef } from 'react';
import Link from 'next/link';
import CreativeHeading from '@/components/CreativeHeading';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import MockFrame from '@/components/page/MockFrame';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';

/*
 * /features body: a find → apply → practice journey strip whose line draws as you scroll, then a tour of
 * the four features (alternating rows: number, stage, name, tagline, three points, link, product mock).
 * Transform/opacity motion only; everything is visible without JavaScript.
 */

const STAGES = ['Find', 'Apply', 'Practice'];
const ROW_BG = ['bg-light-lavender', 'bg-white', 'grain bg-brand-950 text-white', 'bg-light-lavender'];

export default function FeaturesHubBody({ features }) {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(q('[data-line]'), { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: q('[data-journey]')[0], start: 'top 75%', end: 'bottom 55%', scrub: 0.4 } });
        gsap.from(q('[data-stage]'), { y: 30, opacity: 0, stagger: 0.12, duration: 0.9, scrollTrigger: { trigger: q('[data-journey]')[0], start: 'top 80%', once: true } });
        q('[data-row]').forEach((row) => {
          const dir = row.dataset.row === 'left' ? -1 : 1;
          gsap.from(row.querySelector('[data-mock]'), { x: 80 * dir, rotate: 2 * dir, opacity: 0, duration: 1.1, scrollTrigger: { trigger: row, start: 'top 75%', once: true } });
          gsap.from(row.querySelectorAll('[data-point]'), { x: -18, opacity: 0, stagger: 0.08, duration: 0.7, scrollTrigger: { trigger: row, start: 'top 70%', once: true } });
          gsap.fromTo(row.querySelector('[data-num]'), { yPercent: 20 }, { yPercent: -20, ease: 'none', scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: true } });
        });
      });
    },
    { scope: root }
  );

  return (
    <div ref={root}>
      {/* Journey: the order you use them in */}
      <section aria-labelledby="journey-title" className="relative bg-white py-16 sm:py-24">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
            <div>
              <p className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em] text-brand-600">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                How they fit together
              </p>
              <CreativeHeading id="journey-title" className="mt-4 font-display text-[clamp(1.9rem,1.3rem+2.2vw,3.4rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink-950" lines={[['One Job Hunt, ', { mark: 'Three Stages' }]]} />
            </div>
            <p className="text-[clamp(1rem,0.95rem+0.25vw,1.15rem)] leading-relaxed text-ink-900/70">
              Each feature covers one stage of the hunt. Use them in order, or jump straight to the one you need today. Nothing is applied or sent without you.
            </p>
          </div>

          <div data-journey className="relative mt-12">
            <span aria-hidden="true" className="absolute left-[16%] right-[16%] top-8 hidden h-1 rounded-full bg-brand-100 md:block" />
            <span data-line aria-hidden="true" className="absolute left-[16%] right-[16%] top-8 hidden h-1 origin-left rounded-full bg-gradient-to-r from-brand-500 via-brand-400 to-gold-400 md:block" />
            <ol className="relative grid grid-cols-[minmax(0,1fr)] gap-8 md:grid-cols-3 md:gap-6">
              {STAGES.map((stage, si) => (
                <li key={stage} data-stage className="flex min-w-0 flex-col items-center text-center">
                  <span className="relative z-[1] flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-950 font-display text-xl font-extrabold text-gold-400 shadow-[0_0_0_8px_#fff]">0{si + 1}</span>
                  <h3 className="mt-4 font-display text-[1.35rem] font-bold tracking-[-0.02em] text-ink-950">{stage}</h3>
                  <ul className="mt-4 grid w-full gap-2.5">
                    {features
                      .filter((f) => f.stage === stage)
                      .map((f) => (
                        <li key={f.page.slug}>
                          <Link href={f.page.path} className="group flex items-center gap-3 rounded-2xl border border-hairline bg-light-lavender/60 p-3 text-left transition-colors hover:border-brand-200 hover:bg-white">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 ring-1 ring-brand-100">
                              <Icon name={f.icon} className="h-5 w-5" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-[15px] font-semibold text-ink-950">{f.page.label}</span>
                              <span className="block text-[13px] leading-snug text-ink-900/55">{f.page.hero.points[0]}</span>
                            </span>
                            <Icon name="arrow" className="h-4 w-4 shrink-0 text-brand-600 transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} />
                          </Link>
                        </li>
                      ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Tour: one row per feature */}
      {features.map((f, i) => {
        const dark = ROW_BG[i].includes('brand-950');
        const left = i % 2 === 0;
        return (
          <section key={f.page.slug} data-row={left ? 'left' : 'right'} aria-labelledby={`tour-${f.page.slug}`} className={`relative overflow-hidden py-16 sm:py-24 ${ROW_BG[i]}`}>
            <div className="container-x grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
              <div className={`relative min-w-0 ${left ? '' : 'lg:order-2'}`}>
                <span data-num aria-hidden="true" className={`pointer-events-none absolute -top-10 right-0 font-display text-[clamp(6rem,4rem+8vw,11rem)] font-extrabold leading-none tracking-[-0.06em] ${dark ? 'text-white/[0.06]' : 'text-brand-200/50'}`}>
                  0{i + 1}
                </span>
                <span className={`relative inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] ${dark ? 'bg-white/[0.07] text-gold-300 ring-1 ring-white/10' : 'bg-white text-brand-600 ring-1 ring-brand-200'}`}>
                  <Icon name={f.icon} className="h-3.5 w-3.5" />
                  {f.stage} · Feature 0{i + 1}
                </span>
                <h2 id={`tour-${f.page.slug}`} className={`relative mt-5 font-display text-[clamp(2rem,1.4rem+2.4vw,3.6rem)] font-extrabold leading-[1.03] tracking-[-0.035em] ${dark ? 'text-white' : 'text-ink-950'}`}>
                  {f.page.label}
                </h2>
                <p className={`relative mt-4 max-w-[34rem] text-[clamp(1.02rem,0.95rem+0.3vw,1.2rem)] font-medium leading-relaxed ${dark ? 'text-white/75' : 'text-ink-900/70'}`}>
                  <Rich text={f.page.hero.tagline} tone={dark ? 'dark' : undefined} />
                </p>
                <ul className="relative mt-6 space-y-3">
                  {f.page.hero.points.map((pt) => (
                    <li key={pt} data-point className={`flex items-center gap-3 text-[15.5px] font-semibold ${dark ? 'text-white/90' : 'text-ink-950'}`}>
                      <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-400 text-ink-950">
                        <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>
                <Link
                  href={f.page.path}
                  className={`group relative mt-8 inline-flex h-14 items-center gap-3 rounded-full pl-6 pr-2 text-[15px] font-bold transition-colors ${dark ? 'bg-gold-500 text-ink-950 hover:bg-gold-300' : 'bg-brand-950 text-white hover:bg-brand-800'}`}
                >
                  Explore {f.page.label}
                  <span className={`flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-500 group-hover:-rotate-45 ${dark ? 'bg-ink-950 text-gold-400' : 'bg-gold-400 text-ink-950'}`} aria-hidden="true">
                    <Icon name="arrow" className="h-4 w-4" strokeWidth={2.4} />
                  </span>
                </Link>
              </div>
              <div data-mock className={`min-w-0 ${left ? '' : 'lg:order-1'}`}>
                <MockFrame name={f.page.hero.visual} tone={dark ? 'dark' : 'light'} />
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
