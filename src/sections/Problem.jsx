'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';
import { PROBLEM, APP_URL, OFFER } from '@/content/site';

/*
 * Pinned scroll story with a single focal point: one card at a time in the centre. Each card carries
 * one sentence of the problem as its headline with a small illustration under it. Cards slide up
 * onto a stack while older ones step back, then the stack gives way to the Job Hunter plan card.
 * The illustrations are UI with sample data. Without motion the plan card shows.
 */

// The statement split into the three beats
const SENTENCES = PROBLEM.text.match(/[^.]+\./g).map((s) => s.trim());

function Chip({ children, tone = 'muted' }) {
  const tones = {
    muted: 'bg-ink-900/5 text-ink-900/60',
    rose: 'bg-rose-50 text-rose-600',
  };
  return <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${tones[tone]}`}>{children}</span>;
}

function SameResume() {
  const rows = ['Northwind Labs', 'Brightpath', 'Lumen Studio'];
  return (
    <ul className="space-y-2">
      {rows.map((r) => (
        <li key={r} className="flex items-center gap-3 rounded-xl bg-white px-3 py-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink-900/5 font-display text-sm font-bold text-ink-900/50">{r[0]}</span>
          <span className="min-w-0 flex-1 truncate text-sm font-bold text-ink-950">{r}</span>
          <span className="hidden rounded-md bg-ink-900/5 px-1.5 py-0.5 font-mono text-[11px] text-ink-900/60 sm:inline">resume_final.pdf</span>
          <Chip>Sent</Chip>
        </li>
      ))}
    </ul>
  );
}

function Silence() {
  return (
    <ul className="space-y-2">
      {[0, 1].map((i) => (
        <li key={i} className="flex items-center gap-3 rounded-xl border border-dashed border-ink-900/15 bg-white px-3 py-2.5">
          <span className="h-8 w-8 shrink-0 rounded-full bg-ink-900/5" />
          <span className="flex-1 space-y-1.5">
            <span className="block h-2 w-2/5 rounded-full bg-ink-900/10" />
            <span className="block h-2 w-3/4 rounded-full bg-ink-900/5" />
          </span>
          <Chip>No response</Chip>
        </li>
      ))}
      <li className="rounded-xl bg-white px-3.5 py-2.5 text-[13px] leading-snug text-ink-900/60">
        <span className="block text-xs font-bold text-ink-900/80">noreply@careers</span>
        We have decided to move forward with other candidates.
      </li>
    </ul>
  );
}

function Guesswork() {
  const notes = ['What will they ask me?', 'Tell me about yourself… ?', 'What do I say about salary?'];
  return (
    <div>
      <p className="mb-2 inline-flex items-center gap-2 rounded-lg bg-gold-50 px-2.5 py-1.5 text-xs font-bold text-gold-800">Interview tomorrow, 10:00</p>
      <ul className="space-y-1.5">
        {notes.map((t, i) => (
          <li key={t} className="flex items-center gap-3 rounded-xl bg-white px-3 py-2 text-sm font-medium text-ink-900/75">
            <span className={`h-4 w-4 shrink-0 rounded border-2 ${i === 0 ? 'border-rose-300' : 'border-ink-900/20'}`} />
            <span className={i === 1 ? 'line-through decoration-rose-400/70' : ''}>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const BEATS = [
  { tag: 'Same file, every time', Ui: SameResume, img: '/images/problem-same-resume.jpg', alt: 'Job seeker sending the same resume late at night', why: 'A generic resume rarely matches the job description, so it gets passed over before a person reads it.', fix: 'Resume tailored to each job' },
  { tag: 'No replies', Ui: Silence, img: '/images/problem-late-night.jpg', alt: 'Job seeker alone at his desk late at night, waiting for replies', why: 'With no feedback you cannot tell what is going wrong, so you keep sending more of the same.', fix: 'Every match scored before you apply' },
  { tag: 'Guessing', Ui: Guesswork, img: '/images/problem-guessing.jpg', alt: 'Stressed job seeker surrounded by notes the night before an interview', why: 'Practising alone, nobody asks the follow-up questions or tells you which answers fall flat.', fix: 'AI interviewer with real feedback' },
];
const PLAN_IMG = '/images/problem-plan.jpg';

function Words({ text, accentFrom = 0 }) {
  return text.split(' ').map((w, j, all) => (
    <span key={j} data-w className={j >= all.length - accentFrom ? 'text-gold-400' : undefined}>
      {w}{' '}
    </span>
  ));
}

export default function Problem() {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const cards = q('[data-card]');
        const dims = q('[data-dim]');
        const plan = q('[data-plan]')[0];
        const segs = q('[data-seg]');
        const small = window.matchMedia('(max-width: 1023px)').matches;
        const below = () => window.innerHeight;

        gsap.set(cards, { autoAlpha: 1, y: below, transformOrigin: '50% 0%' });
        gsap.set(plan, { autoAlpha: 1, y: below });
        gsap.set(q('[data-card] [data-w], [data-plan] [data-w]'), { opacity: 0.15 });
        gsap.set(q('[data-plan-step]'), { y: 16, opacity: 0 });
        gsap.set(segs, { scaleX: 0 });

        // Card 01 arrives while the section scrolls into view, so the stage is never empty when it pins
        const pinEl = q('[data-pin]')[0];
        const intro = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: pinEl, start: 'top 85%', end: 'top top', scrub: 0.6, invalidateOnRefresh: true },
        });
        intro
          .to(cards[0], { y: 0, duration: 1, ease: 'power3.out' }, 0)
          .fromTo(cards[0].querySelector('[data-card-img]'), { scale: 1.25 }, { scale: 1, duration: 1, ease: 'power2.out' }, 0)
          .to(segs[0], { scaleX: 1, duration: 1 }, 0)
          .to(cards[0].querySelectorAll('[data-w]'), { opacity: 1, stagger: { amount: 0.35 }, duration: 0.25 }, 0.4);

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: pinEl,
            start: 'top top',
            end: small ? '+=230%' : '+=280%',
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Bring a card to the front: it slides up, older cards step back and dim, its sentence lights up
        const front = (el, at, stack) => {
          tl.to(el, { y: 0, duration: 0.8, ease: 'power3.out' }, at).fromTo(el.querySelector('[data-card-img]'), { scale: 1.25 }, { scale: 1, duration: 1.1, ease: 'power2.out' }, at);
          stack.forEach((c, j) => {
            const depth = stack.length - j;
            tl.to(c, { scale: 1 - depth * 0.045, yPercent: -depth * 2.6, duration: 0.8, ease: 'power2.out' }, at).to(dims[j], { opacity: Math.min(0.7, depth * 0.35), duration: 0.8 }, at);
          });
          tl.to(el.querySelectorAll('[data-w]'), { opacity: 1, stagger: { amount: 0.45 }, duration: 0.2 }, at + 0.35);
        };

        // Cards 02 and 03 follow straight away once the section is pinned
        cards.slice(1).forEach((card, k) => {
          const at = 0.1 + k;
          front(card, at, cards.slice(0, k + 1));
          tl.to(segs[k + 1], { scaleX: 1, duration: 0.8 }, at);
        });

        // The turn: the stack drops away and the plan card takes the front
        tl.to(cards, { y: below, rotation: (i) => [-8, 6, -4][i], stagger: 0.05, duration: 0.8, ease: 'power2.in' }, 2.1)
          .to(plan, { y: 0, duration: 0.9, ease: 'power3.out' }, 2.4)
          .fromTo(plan.querySelector('[data-card-img]'), { scale: 1.25 }, { scale: 1, duration: 1.1, ease: 'power2.out' }, 2.4)
          .to(segs[3], { scaleX: 1, duration: 0.9 }, 2.4)
          .to(plan.querySelectorAll('[data-w]'), { opacity: 1, stagger: { amount: 0.4 }, duration: 0.2 }, 2.75)
          .to(q('[data-plan-step]'), { y: 0, opacity: 1, stagger: 0.08, duration: 0.4, ease: 'power2.out' }, 3.1)
          .to({}, { duration: 0.5 }); // short hold before the pin releases
      });
    },
    { scope: root }
  );

  const steps = [
    ['Roles matched to your resume', 'LinkedIn, Indeed and Dice in one search, scored for fit.'],
    ['Resume tailored to each job', 'See the match score and the skills to add before you apply.'],
    ['Application email written for you', 'A personal note for every role, ready to send.'],
    ['Interview rehearsed out loud', 'An AI interviewer asks follow-ups and scores your answers.'],
  ];

  return (
    <section ref={root} aria-labelledby="problem-title" className="relative bg-light-lavender">
      <div data-pin className="relative flex h-[100svh] min-h-[640px] flex-col items-center justify-center overflow-hidden pb-20 pt-16 lg:pb-6 lg:pt-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_40%_at_50%_55%,rgba(196,179,234,0.5),transparent),radial-gradient(35%_30%_at_85%_90%,rgba(252,211,77,0.16),transparent)]" />

        <div className="container-x relative flex w-full flex-col items-center text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
            {PROBLEM.label}
          </p>
          <h2 id="problem-title" className="mt-3 font-display text-[clamp(1.4rem,1rem+1.4vw,2.5rem)] font-extrabold tracking-[-0.03em] text-ink-950">
            Most job hunts look like this.
          </h2>

          {/* The stack: one card in focus at a time */}
          <div className="relative mt-9 h-[min(660px,calc(100svh-260px))] min-h-[420px] w-full max-w-[1240px] text-left lg:mt-12">
            {BEATS.map(({ tag, Ui, img, alt, why, fix }, i) => (
              <article
                key={tag}
                data-card
                className="invisible absolute inset-0 grid grid-rows-[minmax(0,34%)_1fr] overflow-hidden rounded-[30px] border border-hairline bg-white shadow-[0_40px_80px_-40px_rgba(26,15,51,0.55)] md:grid-cols-[0.95fr_1.05fr] md:grid-rows-1"
                style={{ zIndex: i + 1 }}
              >
                <div className="relative overflow-hidden">
                  <div data-card-img className="absolute inset-0">
                    <Image src={img} alt={alt} fill unoptimized sizes="(max-width: 768px) 100vw, 1400px" className="object-cover grayscale-[35%]" />
                  </div>
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-950/55 via-ink-950/10 to-transparent" />
                  <span className="absolute left-4 top-3 font-display text-[clamp(2.5rem,1.5rem+3vw,4.5rem)] font-extrabold leading-none tracking-[-0.05em] text-white/90 md:left-6 md:top-5">0{i + 1}</span>
                  <span className="absolute bottom-3 left-4 md:bottom-5 md:left-6">
                    <Chip tone="rose">{tag}</Chip>
                  </span>
                </div>
                <div className="flex min-h-0 flex-col p-5 sm:p-7 lg:p-9">
                  <p className="font-display text-[clamp(1.2rem,0.8rem+1.6vw,2.5rem)] font-bold leading-[1.12] tracking-[-0.03em] text-ink-950">
                    <Words text={SENTENCES[i]} />
                  </p>
                  <p className="mt-3 hidden max-w-[46ch] text-[15px] font-medium leading-relaxed text-ink-900/60 sm:block lg:text-base">{why}</p>
                  <div className="mt-auto rounded-2xl bg-light-lavender p-3 sm:p-4">
                    <Ui />
                  </div>
                  <p className="mt-4 hidden items-center gap-2.5 text-sm font-semibold text-ink-900/70 md:flex">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-[11px] font-bold text-gold-300">→</span>
                    Job Hunter fixes this:
                    <span className="rounded-full bg-gold-100 px-2.5 py-1 text-xs font-bold text-gold-800">{fix}</span>
                  </p>
                </div>
                <div data-dim aria-hidden="true" className="pointer-events-none absolute inset-0 bg-light-lavender opacity-0" />
              </article>
            ))}

            <article data-plan className="absolute inset-0 z-10 grid grid-rows-[minmax(0,22%)_1fr] sm:grid-rows-[minmax(0,34%)_1fr] overflow-hidden rounded-[30px] bg-brand-950 text-white shadow-[0_50px_90px_-40px_rgba(26,15,51,0.85)] md:grid-cols-[0.95fr_1.05fr] md:grid-rows-1">
              <div className="relative overflow-hidden">
                <div data-card-img className="absolute inset-0">
                  <Image src={PLAN_IMG} alt="New hire smiling on her first day at a new job" fill unoptimized sizes="(max-width: 768px) 100vw, 1400px" className="object-cover" />
                </div>
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-brand-950/40" />
                <span className="absolute bottom-3 left-4 rounded-full bg-gold-400 px-2.5 py-1 text-[11px] font-bold text-ink-950 md:bottom-5 md:left-6">With Job Hunter</span>
              </div>
              <div className="relative flex min-h-0 flex-col p-4 sm:p-7 lg:p-9">
                <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(244,180,0,0.25),transparent)]" />
                <span className="relative flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white">
                    <Image src="/brand/favicon.png" alt="" width={28} height={28} className="h-6 w-6 object-contain" />
                  </span>
                  <span className="font-display text-sm font-bold text-brand-100">Your plan</span>
                </span>
                <p className="relative mt-4 font-display text-[clamp(1.15rem,0.75rem+1.9vw,2.9rem)] font-extrabold leading-[1.08] tracking-[-0.035em]">
                  <Words text={PROBLEM.turn} accentFrom={2} />
                </p>
                <p className="relative mt-3 hidden max-w-[44ch] text-[15px] font-medium leading-relaxed text-brand-100 sm:block lg:text-base">
                  One place to find the right roles, tailor every application and rehearse the interview out loud.
                </p>
                <ul className="relative mt-auto grid gap-1.5 pt-3 sm:grid-cols-2 sm:gap-2 lg:gap-2.5">
                  {steps.map(([title, desc]) => (
                    <li key={title} data-plan-step className="flex items-start gap-2.5 rounded-xl bg-white/[0.07] px-3 py-2 sm:gap-3 sm:rounded-2xl sm:px-3.5 sm:py-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-400 text-xs font-bold text-ink-950">✓</span>
                      <span>
                        <span className="block text-sm font-bold">{title}</span>
                        <span className="mt-0.5 hidden text-xs font-medium leading-snug text-brand-100 lg:block">{desc}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <div data-plan-step className="relative mt-3 hidden items-center gap-4 sm:flex lg:mt-4">
                  <div className="hidden flex-1 rounded-2xl border border-white/10 px-4 py-2.5 sm:block">
                    <span className="flex items-center justify-between text-xs font-semibold text-brand-100">
                      Interview readiness
                      <span className="font-display text-base font-extrabold text-gold-400">
                        7.8<span className="text-xs text-brand-100">/10</span>
                      </span>
                    </span>
                    <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-white/10">
                      <span className="block h-full w-[78%] rounded-full bg-gradient-to-r from-brand-400 to-gold-400" />
                    </span>
                  </div>
                  <a href={APP_URL} className="flex h-12 shrink-0 items-center gap-2 rounded-full bg-gold-500 px-5 text-sm font-bold text-ink-950 transition-colors hover:bg-gold-300">
                    {OFFER.ctaLong}
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </article>
          </div>

          {/* Progress through the story */}
          <div aria-hidden="true" className="mt-6 flex w-full max-w-[240px] gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-brand-200/70">
                <span data-seg className={`block h-full origin-left rounded-full ${i === 3 ? 'bg-gold-500' : 'bg-brand-600'}`} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
