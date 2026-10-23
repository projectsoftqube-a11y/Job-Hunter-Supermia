'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { Waveform } from '@/components/mocks';
import { Avatar, ChapterHead, Handoff, SAM, TARGET } from './shared';

/*
 * Chapter 3, "The round" (dark band). Sam takes the Role & Knowledge round for the role matched in
 * chapter 2. A polished live-session panel stays beside the copy on desktop; as each prompt from the
 * page scrolls into view, the panel asks it, Sam's answer waveform and transcript come in, then the
 * follow-up on the same decision appears with a guided-practice hint. The prompts are the page's own
 * questions; Sam's answers and the follow-ups are illustrative sample content. Without motion the panel
 * shows the first exchange and every prompt stays in the list beside it.
 */

const ANSWERS = [
  'I moved our order events from nightly cron jobs to a Kafka pipeline, and I owned the rollout from design doc to on-call.',
  'We needed replay and per-account ordering. A Postgres-backed queue was simpler, but it would not keep up with our write volume.',
  'First I would check whether it hits one account or all of them, then compare traces from before and after the last deploy.',
  'I would add consumer lag alerts from day one. We found the first backlog through a customer ticket, not a dashboard.',
];
const FOLLOWUPS = [
  'What was the hardest trade-off in that rollout?',
  'What would make you pick the Postgres queue today?',
  'The traces look clean. Where do you look next?',
  'How would you set that alert threshold?',
];
const ROUND_NAMES = ['HR & Introduction', 'Role & Knowledge', 'Practical & Behavioral', 'Managerial & Final'];
const stack = 'grid [&>*]:col-start-1 [&>*]:row-start-1';

function Panel({ prompts }) {
  return (
    <div aria-hidden="true" className="relative rounded-[32px] bg-gradient-to-br from-gold-300/50 via-brand-400/25 to-brand-300/40 p-px shadow-[0_60px_120px_-50px_rgba(0,0,0,0.85)]">
      <div className="relative overflow-hidden rounded-[31px] bg-[#120926]">
        <span className="pointer-events-none absolute -top-32 left-1/4 h-64 w-[70%] rounded-full bg-[radial-gradient(closest-side,rgba(109,76,176,0.5),transparent)]" />

        {/* Session bar */}
        <div className="relative flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-white/10 px-4 py-3 sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-3 py-1 text-[11.5px] font-bold text-white">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            Live voice session
          </span>
          <span className="text-[12.5px] font-bold text-white">Role & Knowledge</span>
          <span className="ml-auto hidden rounded-full bg-white/[0.06] p-0.5 ring-1 ring-white/10 sm:inline-flex">
            <span className="rounded-full bg-gold-400 px-2.5 py-1 text-[11px] font-bold text-ink-950">Guided practice</span>
            <span className="px-2.5 py-1 text-[11px] font-bold text-brand-200">Real simulation</span>
          </span>
          <span className="text-[12px] font-semibold tabular-nums text-brand-300">08:42</span>
        </div>

        <div className="relative p-4 sm:p-6 lg:p-7">
          {/* Interviewer and what the session is set to */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 font-display text-[13px] font-extrabold text-white ring-2 ring-gold-400/60">AI</span>
            <span className="min-w-0">
              <span className="block text-[13.5px] font-bold text-white">AI interviewer</span>
              <span className="block text-[11.5px] text-brand-300">Set to your level, your resume and the job</span>
            </span>
            <span className="ml-auto flex items-center gap-1.5">
              {prompts.map((_, i) => (
                <span key={i} data-dot className={`h-1.5 w-5 rounded-full transition-[scale,background-color] duration-500 ${i === 0 ? 'bg-gold-400' : 'scale-x-[0.3] bg-white/25'}`} />
              ))}
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5 lg:[@media(max-height:840px)]:hidden">
            {[TARGET.title, 'Mid-senior', 'platform.pdf'].map((t) => (
              <span key={t} className="rounded-md bg-white/[0.06] px-2 py-0.5 text-[11px] font-semibold text-brand-200 ring-1 ring-white/8">
                {t}
              </span>
            ))}
          </div>

          {/* The prompt */}
          <div className={`mt-5 ${stack}`}>
            {prompts.map((p, i) => (
              <p key={i} data-x={i} data-xq={i} className={`font-display text-[21px] font-bold leading-[1.2] tracking-[-0.02em] text-white sm:text-[27px] ${i ? 'invisible opacity-0' : ''}`}>
                “{p.q}”
              </p>
            ))}
          </div>

          {/* Sam's answer */}
          <div className="mt-5 rounded-[20px] bg-white/[0.04] p-3.5 ring-1 ring-white/10 sm:p-4">
            <div className="flex items-center gap-2.5">
              <Avatar className="h-7 w-7 text-[10px]" />
              <span className="text-[12.5px] font-bold text-white">{SAM.name.split(' ')[0]} is answering</span>
              <span className="ml-auto text-[11px] font-bold text-gold-300">Recording</span>
            </div>
            <div className="mt-2 h-12 sm:h-14">
              <Waveform bars={56} />
            </div>
            <div className={`mt-2 ${stack}`}>
              {ANSWERS.map((a, i) => (
                <p key={i} data-x={i} data-xa={i} className={`text-[13.5px] leading-relaxed text-brand-100 sm:text-[14.5px] ${i ? 'invisible opacity-0' : ''}`}>
                  {a}
                </p>
              ))}
            </div>
          </div>

          {/* The follow-up on the same decision, with a guided-practice hint */}
          <div className={`mt-4 ${stack}`}>
            {FOLLOWUPS.map((f, i) => (
              <div key={i} data-x={i} className={i ? 'invisible opacity-0' : ''}>
                <div data-xf={i} className="rounded-[20px] bg-gradient-to-r from-gold-400/15 to-transparent p-3.5 ring-1 ring-gold-400/40 sm:p-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-400 px-2 py-0.5 text-[10.5px] font-extrabold uppercase tracking-[0.08em] text-ink-950">
                    <Icon name="refresh" className="h-3 w-3" strokeWidth={2.6} />
                    Follow-up · same decision
                  </span>
                  <span className="mt-2 block font-display text-[17px] font-bold leading-snug text-white sm:text-[19px]">{f}</span>
                </div>
                <span data-xh={i} className="mt-2 inline-flex max-w-full items-start gap-2 rounded-xl bg-white/[0.05] px-3 py-1.5 text-[12px] font-semibold text-brand-100 ring-1 ring-white/10">
                  <Icon name="spark" className="mt-px h-3.5 w-3.5 shrink-0 text-gold-300" />
                  <span>Hint: {prompts[i].hint.split('. ')[0].replace(/\.$/, '')}.</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* The four rounds */}
        <div className="relative flex flex-wrap gap-1.5 border-t border-white/10 px-4 py-3 sm:px-6 lg:[@media(max-height:840px)]:hidden">
          {ROUND_NAMES.map((r) => (
            <span key={r} className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${r === 'Role & Knowledge' ? 'bg-white text-brand-800' : 'bg-white/[0.05] text-brand-200'}`}>
              {r}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LiveSession({ s, n, next }) {
  const root = useRef(null);
  const paras = s.blocks.filter((b) => b.type === 'p');
  const prompts = s.blocks.find((b) => b.type === 'questions')?.items || [];

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        const items = q('[data-prompt]');
        const dots = q('[data-dot]');
        const list = q('[data-prompts]')[0];
        list.dataset.run = 'true';
        let cur = -1;
        let tl;
        const activate = (i) => {
          if (i === cur) return;
          cur = i;
          items.forEach((li, k) => (li.dataset.active = k === i ? 'true' : 'false'));
          dots.forEach((d, k) => {
            d.style.scale = k === i ? '1' : '0.3 1';
            d.style.backgroundColor = k <= i ? '#f9c320' : 'rgba(255,255,255,0.25)';
          });
          if (tl) tl.kill();
          gsap.set(q('[data-x]').filter((e) => e.dataset.x !== String(i)), { autoAlpha: 0 });
          gsap.set(q(`[data-x="${i}"]`), { autoAlpha: 1 });
          tl = gsap
            .timeline()
            .fromTo(q(`[data-xq="${i}"]`), { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.7 })
            .fromTo(q(`[data-xa="${i}"]`), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.4)
            .fromTo(q(`[data-xf="${i}"]`), { autoAlpha: 0, y: 26, scale: 0.97 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.5)' }, 1.2)
            .fromTo(q(`[data-xh="${i}"]`), { autoAlpha: 0, x: -12 }, { autoAlpha: 1, x: 0, duration: 0.6 }, 1.7);
        };
        items.forEach((li, i) =>
          ScrollTrigger.create({
            trigger: li,
            start: 'top 62%',
            end: 'bottom 62%',
            onToggle: (self) => self.isActive && activate(i),
          })
        );
        activate(0);

        return () => {
          if (tl) tl.kill();
          delete list.dataset.run;
          items.forEach((li) => delete li.dataset.active);
          dots.forEach((d) => {
            d.style.scale = '';
            d.style.backgroundColor = '';
          });
        };
      });

      mm.add(MOTION_OK, () => {
        ScrollTrigger.batch(q('[data-reveal]'), {
          start: 'top 88%',
          once: true,
          onEnter: (els) => gsap.from(els, { y: 30, opacity: 0, stagger: 0.08, duration: 0.9, clearProps: 'opacity,transform' }),
        });
      });
    },
    { scope: root }
  );

  return (
    <section id={s.id} ref={root} aria-labelledby={`${s.id}-title`} className="grain relative scroll-mt-24 overflow-hidden bg-brand-950 py-16 text-white sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_32%_at_15%_10%,rgba(109,76,176,0.5),transparent),radial-gradient(35%_30%_at_95%_85%,rgba(244,180,0,0.12),transparent)]" />
      <div className="container-x relative z-[2]">
        <ChapterHead s={s} n={n} tone="dark" />

        <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          <div className="min-w-0 lg:col-span-7">
            <div data-reveal className="lg:sticky lg:top-[max(24px,calc(50vh_-_340px))]">
              <Panel prompts={prompts} />
            </div>
          </div>

          <div className="min-w-0 lg:col-span-5">
            {paras[0] && (
              <p data-reveal className="text-[18px] leading-[1.7] text-brand-100 sm:text-[19px]">
                <Rich text={paras[0].text} tone="dark" />
              </p>
            )}
            <ol data-prompts className="group/prompts mt-7 space-y-3">
              {prompts.map((p, i) => (
                <li
                  key={i}
                  data-prompt
                  className="flex gap-4 rounded-[22px] bg-white/[0.04] p-5 ring-1 ring-white/10 transition-[opacity,background-color,box-shadow] duration-500 lg:group-data-[run=true]/prompts:opacity-45 data-[active=true]:bg-white/[0.08] data-[active=true]:opacity-100! data-[active=true]:ring-gold-400/60"
                >
                  <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-400 font-display text-[13px] font-extrabold text-ink-950">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-[1.12rem] font-bold leading-snug tracking-[-0.01em] text-white">{p.q}</h3>
                    {p.hint && (
                      <p className="mt-2 text-[15px] leading-relaxed text-brand-100/80">
                        <Rich text={p.hint} tone="dark" />
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
            {paras[1] && (
              <p data-reveal className="mt-7 text-[16.5px] leading-[1.7] text-brand-100/90">
                <Rich text={paras[1].text} tone="dark" />
              </p>
            )}
          </div>
        </div>

        <Handoff n={n} next={next} tone="dark" />
      </div>
    </section>
  );
}
