'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { ModuleHead, PAD, Tick, Sample, mod, of } from './shared';

/*
 * Module 4 · Apply. The three tips are a numbered checklist linked to a sample draft in the app: on
 * desktop the scene pins and one scrubbed timeline works through the tips, and each tip lights up the
 * part of the note it describes (1 the role and a posting detail, 2 the project, 3 the length check),
 * with matching number badges on both sides, then ticks off. Markup is the finished, fully highlighted
 * state; only transforms and opacity move.
 */

const PARTS = [
  'I am applying for the Junior Data Analyst role. Your posting mentions weekly sales dashboards, which is the work I enjoyed most at university.',
  'For my capstone project I built a SQL and Python dashboard that tracked campus library use, and I presented it to the library team.',
];

function Badge({ n, m }) {
  return (
    <span data-part-badge className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-display text-[12px] font-extrabold ${m.badge} shadow-[0_6px_14px_-6px_rgba(16,185,129,0.8)]`}>
      {n}
    </span>
  );
}

function Draft({ m }) {
  return (
    <div aria-hidden="true" className="relative min-w-0 overflow-hidden rounded-[30px] bg-white ring-1 ring-brand-100 shadow-[0_60px_120px_-60px_rgba(26,15,51,0.6)]">
      <div className="flex items-center gap-3 bg-brand-950 px-5 py-3.5 text-white sm:px-6">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gold-400 text-ink-950">
          <Icon name="mail" className="h-4 w-4" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13px] font-bold">Application email · draft</span>
          <span className="block truncate text-[11px] font-medium text-white/55">Written from your resume for this job</span>
        </span>
        <span className="hidden shrink-0 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold text-gold-300 sm:inline">You send it</span>
      </div>
      <div className="space-y-1.5 border-b border-hairline px-5 py-3.5 text-[13px] sm:px-6">
        <p className="flex items-center gap-3">
          <span className="w-14 shrink-0 font-semibold text-ink-900/45">To</span>
          <span className="min-w-0 flex-1 truncate font-semibold text-ink-950">Recruiter, Northwind Labs</span>
          <Sample />
        </p>
        <p className="flex gap-3">
          <span className="w-14 shrink-0 font-semibold text-ink-900/45">Subject</span>
          <span className="min-w-0 truncate font-semibold text-ink-950">Junior Data Analyst application</span>
        </p>
      </div>
      <div className="grid grid-cols-[28px_minmax(0,1fr)] gap-x-3 gap-y-3 px-5 py-5 text-[14.5px] leading-relaxed text-ink-900/80 sm:gap-x-4 sm:px-6">
        <span />
        <p>Hi Sam,</p>
        {PARTS.map((t, i) => (
          <div key={i} className="contents">
            <Badge n={i + 1} m={m} />
            <p className="relative">
              <span data-part-hl className="absolute -inset-x-2 -inset-y-1 origin-left rounded-xl bg-emerald-50 ring-1 ring-emerald-200" />
              <span className="relative">{t}</span>
            </p>
          </div>
        ))}
        <span />
        <p>
          My resume is attached. I would be glad to talk if the role is still open.
          <br />
          Thanks, Alex Rivera
        </p>
        <Badge n={3} m={m} />
        <div className="relative">
          <span data-part-hl className="absolute -inset-x-2 -inset-y-1 origin-left rounded-xl bg-emerald-50 ring-1 ring-emerald-200" />
          <div className="relative flex flex-wrap items-center gap-x-4 gap-y-2 py-1">
            <span className="flex items-center gap-2 text-[13px] font-bold text-ink-950">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4 text-emerald-600">
                <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
                <path d="M10.5 18.5h3" />
              </svg>
              69 words · fits one phone screen
            </span>
            <span className="flex min-w-[8rem] flex-1 items-center gap-2">
              <span className="grid flex-1 grid-cols-10 gap-[3px]">
                {Array.from({ length: 10 }, (_, b) => (
                  <span key={b} className={`h-1.5 rounded-full ${b < 4 ? 'bg-emerald-500' : 'bg-emerald-100'}`} />
                ))}
              </span>
              <span className="shrink-0 text-[11px] font-bold text-ink-900/45">short</span>
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-hairline bg-light-lavender px-5 py-3.5 sm:px-6">
        <span className="flex gap-2">
          {['Copy', 'Edit'].map((b) => (
            <span key={b} className="rounded-xl bg-white px-3 py-1.5 text-[12px] font-bold text-ink-900/70 ring-1 ring-hairline">
              {b}
            </span>
          ))}
        </span>
        <span className="flex items-center gap-2 text-[12px] font-bold text-ink-900/55">
          <Icon name="shield" className="h-4 w-4 text-emerald-600" />
          Nothing is sent without you
        </span>
      </div>
    </div>
  );
}

export default function ModuleApply({ s, index, total }) {
  const root = useRef(null);
  const m = mod(index);
  const para = of(s, 'p');
  const list = of(s, 'list');

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      const build = (tl) => {
        const tips = q('[data-tip]');
        const glows = q('[data-tip-glow]');
        const tipBadges = q('[data-tip-badge]');
        const fills = q('[data-tip] [data-tick-fill]');
        const paths = q('[data-tip] [data-tick-path]');
        const hls = q('[data-part-hl]');
        const badges = q('[data-part-badge]');
        tips.forEach((tip, i) => {
          const t = i * 1.1;
          tl.to(glows[i], { opacity: 1, duration: 0.2 }, t)
            .fromTo(tipBadges[i], { scale: 0.7 }, { scale: 1, duration: 0.3, ease: 'back.out(2.4)' }, t)
            .fromTo(badges[i], { scale: 0.3, opacity: 0.25 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2.4)' }, t + 0.1)
            .fromTo(hls[i], { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.5, ease: 'power2.out' }, t + 0.15)
            .fromTo(fills[i], { scale: 0 }, { scale: 1, duration: 0.18, ease: 'back.out(2)' }, t + 0.75)
            .fromTo(paths[i], { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.18 }, t + 0.82);
          if (i < tips.length - 1) tl.to(glows[i], { opacity: 0, duration: 0.2 }, t + 1.05);
        });
      };

      mm.add(MOTION_OK, () => {
        gsap.from(q('[data-draft-wrap]'), { y: 60, opacity: 0, rotation: 1.2, duration: 1.2, scrollTrigger: { trigger: q('[data-apply-scene]')[0], start: 'top 85%', once: true } });
      });

      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        const scene = q('[data-apply-scene]')[0];
        const navGap = 96;
        const fits = scene.offsetHeight < window.innerHeight - navGap - 24;
        const top = () => Math.max(navGap, Math.round((window.innerHeight - scene.offsetHeight) / 2 + 36));
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: fits
            ? { trigger: scene, start: () => `top ${top()}px`, end: '+=170%', scrub: 0.4, pin: true, anticipatePin: 1, invalidateOnRefresh: true }
            : { trigger: scene, start: 'top 65%', end: 'bottom 50%', scrub: 0.4, invalidateOnRefresh: true },
        });
        build(tl);
        tl.to({}, { duration: 0.4 });
      });

      mm.add(`(max-width: 1023px) and ${MOTION_OK}`, () => {
        const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: q('[data-draft-wrap]')[0], start: 'top 70%', once: true } });
        build(tl);
        tl.timeScale(1.3);
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id={s.id} data-module={index} aria-labelledby={`${s.id}-title`} className="relative scroll-mt-24 overflow-clip bg-light-lavender py-16 sm:py-20 lg:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_40%_at_100%_100%,rgba(16,185,129,0.1),transparent),radial-gradient(45%_35%_at_0%_0%,rgba(109,76,176,0.1),transparent)]" />
      <div className="container-x relative">
        <div className={PAD}>
          <ModuleHead s={s} index={index} total={total} meta={`1 draft · ${list.items.length} checks`} />

          <div data-apply-scene className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-8 sm:mt-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center xl:gap-12">
            <div className="min-w-0">
              <p className="text-[1.0625rem] leading-relaxed text-ink-900/75 xl:text-[1.125rem]">
                <Rich text={para.text} />
              </p>
              <div className="mt-7 rounded-[26px] bg-white p-2 ring-1 ring-brand-100 shadow-[0_30px_60px_-44px_rgba(26,15,51,0.5)]">
                <p aria-hidden="true" className={`flex items-center gap-2 px-4 pb-1 pt-3 text-[11px] font-extrabold uppercase tracking-[0.18em] ${m.label}`}>
                  <Icon name="list" className="h-4 w-4" />
                  Before you send
                </p>
                <ol>
                  {list.items.map((t, i) => (
                    <li key={t} data-tip className="relative flex items-start gap-4 rounded-[20px] px-4 py-3.5">
                      <span data-tip-glow aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[20px] bg-emerald-50 opacity-0 ring-1 ring-emerald-200" />
                      <span data-tip-badge aria-hidden="true" className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-[13px] font-extrabold ${m.badge}`}>
                        {i + 1}
                      </span>
                      <span className="relative min-w-0 flex-1 pt-1 text-[15.5px] font-semibold leading-snug text-ink-950">
                        <Rich text={t} />
                      </span>
                      <Tick m={m} size="h-7 w-7" className="relative mt-0.5" />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div data-draft-wrap className="min-w-0">
              <Draft m={m} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
