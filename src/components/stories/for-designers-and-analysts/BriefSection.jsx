'use client';

import { useRef } from 'react';
import { gsap, SplitText, useGSAP, MOTION_OK } from '@/lib/gsap';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { Block } from '@/components/page/Blocks';
import { RunningHead, Numeral, Title, Lead, Handoff, Avatar, jitter } from './shared';

/*
 * Chapter 01, "The brief", on the brand-purple field. The signature scene pins on desktop: one job title
 * ("Product ...") splits into the designer posting and the analyst posting, the long mixed tool list
 * lands as a heap and peels apart into two colour-coded columns (gold for design, lavender for data), then
 * Noa's one resume rises in and ticks only part of each column. The three problems on the left light up
 * in step (class toggles only). The closing line becomes the chapter's pull quote: the turning point.
 * The markup is the finished board, so phones, reduced motion and no-JS visitors see it complete.
 */

const POSTINGS = [
  {
    key: 'd',
    tag: 'Posting A',
    word: 'Designer',
    company: 'Lumen Studio',
    skills: ['Figma', 'Design systems', 'Prototyping', 'Usability testing', 'User research'],
    has: [0, 4],
    card: 'bg-gold-400 text-ink-950',
    chip: 'bg-gold-400/[0.14] text-gold-100 ring-gold-400/45',
  },
  {
    key: 'a',
    tag: 'Posting B',
    word: 'Analyst',
    company: 'Northwind Labs',
    skills: ['SQL', 'Dashboards', 'A/B testing', 'Python', 'Tableau'],
    has: [0, 1],
    card: 'bg-brand-300 text-ink-950',
    chip: 'bg-brand-300/[0.14] text-brand-100 ring-brand-300/45',
  },
];

function Stage() {
  return (
    <div data-stage aria-hidden="true" className="relative min-w-0 overflow-hidden rounded-[32px] bg-brand-950 p-4 text-white shadow-[0_70px_120px_-60px_rgba(15,8,32,0.95)] ring-1 ring-white/10 sm:p-6 lg:p-7">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_40%_at_50%_0%,rgba(109,76,176,0.6),transparent),radial-gradient(35%_30%_at_0%_100%,rgba(244,180,0,0.14),transparent),radial-gradient(35%_30%_at_100%_100%,rgba(196,179,234,0.16),transparent)]" />

      {/* The one title */}
      <div className="relative flex justify-center">
        <p data-root className="inline-flex items-center gap-2.5 rounded-full bg-white px-4 py-2 font-display text-[clamp(1rem,0.85rem+0.7vw,1.4rem)] font-extrabold tracking-[-0.02em] text-ink-950 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.8)]">
          <Icon name="briefcase" className="h-[1.05em] w-[1.05em] text-brand-600" strokeWidth={2.4} />
          Product …
          <span className="rounded-full bg-brand-950 px-2 py-0.5 text-[0.55em] font-bold uppercase tracking-[0.12em] text-gold-300">One title</span>
        </p>
      </div>

      {/* It splits in two */}
      <svg data-branches viewBox="0 0 400 44" preserveAspectRatio="none" className="relative block h-9 w-full origin-top sm:h-11">
        <path data-branch d="M200 0 C200 26 100 18 100 44" fill="none" stroke="#f9c320" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <path data-branch d="M200 0 C200 26 300 18 300 44" fill="none" stroke="#c4b3ea" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>

      <div data-cols className="relative grid grid-cols-2 gap-3 sm:gap-5">
        {POSTINGS.map((p) => (
          <div key={p.key} className="min-w-0">
            <div data-post={p.key} className={`relative rounded-[22px] p-3 shadow-[0_24px_40px_-24px_rgba(0,0,0,0.8)] sm:p-4 ${p.card}`}>
              <p className="text-[10.5px] font-bold uppercase leading-tight tracking-[0.12em] opacity-70 sm:text-[11.5px]">
                {p.tag} · {p.company}
              </p>
              <p className="mt-1 font-display text-[clamp(1.05rem,0.75rem+1.3vw,2rem)] font-extrabold leading-[1.02] tracking-[-0.03em]">
                Product <span data-word className="inline-block">{p.word}</span>
              </p>
            </div>
            <ul className="mt-3 space-y-2">
              {p.skills.map((sk, i) => {
                const has = p.has.includes(i);
                return (
                  <li key={sk} data-chip className={`flex min-h-9 items-center justify-between gap-2 rounded-xl px-2.5 py-1.5 text-[11.5px] font-bold leading-tight ring-1 sm:px-3 sm:text-[13.5px] ${p.chip}`}>
                    <span data-label className="min-w-0">{sk}</span>
                    {has && (
                      <span data-tick className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-ink-950">
                        <Icon name="check" className="h-3 w-3" strokeWidth={3.2} />
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Noa's one resume, sent to both */}
      <div data-resume className="relative mt-4 flex items-center gap-3 rounded-[20px] bg-white p-3 text-ink-950 sm:mt-5 sm:p-3.5">
        <Avatar className="h-10 w-10 text-[13px]" />
        <span className="min-w-0 flex-1">
          <span className="block text-[13px] font-bold leading-tight sm:text-[14px]">Noa&apos;s one resume</span>
          <span className="mt-0.5 block text-[11.5px] font-medium leading-snug text-ink-900/60 sm:text-[12.5px]">Framed for research, sent to both postings</span>
        </span>
        <span className="hidden shrink-0 items-center gap-1.5 rounded-full bg-gold-100 px-3 py-1.5 text-[11.5px] font-bold text-gold-800 sm:inline-flex">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-ink-950">
            <Icon name="check" className="h-2.5 w-2.5" strokeWidth={3.4} />
          </span>
          2 of 5 in each
        </span>
      </div>
    </div>
  );
}

export default function BriefSection({ s }) {
  const root = useRef(null);
  const cards = s.blocks.find((b) => b.type === 'cards');
  const quote = s.blocks.find((b) => b.type === 'p');
  const others = s.blocks.filter((b) => b !== cards && b !== quote);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: 'top 75%', once: true } })
          .from(q('[data-numeral]'), { yPercent: 40, opacity: 0, duration: 1.3 }, 0)
          .from(q('[data-lead], [data-subject]'), { y: 30, opacity: 0, stagger: 0.12, duration: 1.1 }, 0.2);
        gsap.from(q('[data-handoff]'), { y: 40, opacity: 0, duration: 1.1, scrollTrigger: { trigger: q('[data-handoff]')[0], start: 'top 92%', once: true } });
      });

      // Desktop: the pinned split, one scrubbed timeline
      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        const stage = q('[data-stage]')[0];
        const cols = q('[data-cols]')[0];
        const list = q('[data-problems]')[0];
        const items = q('[data-problem]');
        const posts = q('[data-post]');
        const chips = q('[data-chip]');
        list.dataset.run = 'true';

        // Layout centre of an element relative to the stage (offsets ignore transforms)
        const box = (el) => {
          let x = 0;
          let y = 0;
          let e = el;
          while (e && e !== stage) {
            x += e.offsetLeft;
            y += e.offsetTop;
            e = e.offsetParent;
          }
          return { x: x + el.offsetWidth / 2, y: y + el.offsetHeight / 2 };
        };
        const centre = () => box(cols);

        const PHASES = [0, 1, 2.1];
        let active = -1;
        const setActive = (t) => {
          const a = PHASES.filter((p) => t >= p).length - 1;
          if (a === active) return;
          active = a;
          items.forEach((li, i) => (li.dataset.active = i === a ? 'true' : 'false'));
        };

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: q('[data-pin]')[0],
            start: 'top top',
            end: '+=260%',
            scrub: 0.4,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            // Once the scene is done, all three problems read at full strength again
            onLeave: () => (list.dataset.run = 'false'),
            onEnterBack: () => (list.dataset.run = 'true'),
          },
          onUpdate() {
            setActive(this.time());
          },
        });

        // 1. One title splits into two postings
        tl.from(q('[data-root]'), { scale: 0.7, opacity: 0, duration: 0.25, ease: 'back.out(1.8)' }, 0)
          .fromTo(q('[data-branches]'), { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: 0.35 }, 0.2)
          .from(posts[0], { x: () => box(stage).x - box(posts[0]).x + 10, rotation: -3, duration: 0.5, ease: 'power3.inOut' }, 0.3)
          .from(posts[1], { x: () => box(stage).x - box(posts[1]).x - 10, rotation: 3, opacity: 0, duration: 0.5, ease: 'power3.inOut' }, 0.3)
          .from(q('[data-word]'), { y: 18, opacity: 0, stagger: 0.08, duration: 0.3, ease: 'power2.out' }, 0.6);

        // 2. The long mixed tool list lands as a heap, then peels apart into two columns
        tl.fromTo(
          chips,
          {
            x: (i, el) => centre().x - box(el).x + jitter(i, 1) * 60,
            y: (i, el) => centre().y - box(el).y + jitter(i, 2) * 46,
            rotation: (i) => jitter(i, 3) * 14,
            opacity: 0,
            scale: 0.9,
          },
          { opacity: 1, duration: 0.2, stagger: 0.025 },
          1
        ).to(chips, { x: 0, y: 0, rotation: 0, scale: 1, duration: 0.55, stagger: 0.04, ease: 'power3.inOut' }, 1.45);

        // 3. Noa's one resume covers only part of each column
        tl.from(q('[data-resume]'), { y: 60, opacity: 0, duration: 0.35, ease: 'power3.out' }, 2.1)
          .from(q('[data-tick]'), { scale: 0, rotation: -90, stagger: 0.08, duration: 0.25, ease: 'back.out(2.4)' }, 2.45)
          .to(
            chips.filter((c) => !c.querySelector('[data-tick]')),
            { opacity: 0.45, duration: 0.3 },
            2.55
          )
          .to({}, { duration: 0.4 }, 2.9);

        setActive(0);

        // The pull quote reads in word by word as it scrolls up
        const split = SplitText.create(q('[data-quote-text]')[0], { type: 'words' });
        gsap.fromTo(split.words, { opacity: 0.22 }, { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: q('[data-quote]')[0], start: 'top 80%', end: 'bottom 55%', scrub: true } });

        return () => {
          delete list.dataset.run;
          items.forEach((li) => delete li.dataset.active);
        };
      });

      mm.add(`(max-width: 1023px) and ${MOTION_OK}`, () => {
        gsap
          .timeline({ scrollTrigger: { trigger: q('[data-stage]')[0], start: 'top 85%', once: true } })
          .from(q('[data-stage]'), { y: 50, opacity: 0, duration: 1 })
          .from(q('[data-post]'), { y: 24, opacity: 0, stagger: 0.12, duration: 0.8 }, 0.3)
          .from(q('[data-chip]'), { y: 16, opacity: 0, stagger: 0.04, duration: 0.6 }, 0.5)
          .from(q('[data-tick]'), { scale: 0, stagger: 0.08, duration: 0.5, ease: 'back.out(2.4)' }, 1);
        // The cards' inner content moves (the cards themselves carry CSS transitions for the desktop scene)
        gsap.from(q('[data-problem] > div'), { y: 30, opacity: 0, stagger: 0.1, duration: 1, scrollTrigger: { trigger: q('[data-problems]')[0], start: 'top 88%', once: true } });
        gsap.from(q('[data-quote]'), { y: 40, opacity: 0, duration: 1.1, scrollTrigger: { trigger: q('[data-quote]')[0], start: 'top 90%', once: true } });
      });
    },
    { scope: root }
  );

  return (
    <section id={s.id} ref={root} aria-labelledby={`${s.id}-title`} className="grain relative scroll-mt-24 overflow-clip bg-brand-600 text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_40%_at_90%_10%,rgba(155,127,212,0.55),transparent),radial-gradient(40%_35%_at_0%_70%,rgba(39,23,73,0.6),transparent)]" />

      {/* Masthead */}
      <div className="container-x relative z-[2] pt-16 sm:pt-24 lg:pt-28">
        <RunningHead n={1} eyebrow={s.eyebrow} tone="purple" />
        <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-8 lg:mt-14 lg:grid-cols-12 lg:items-end lg:gap-10">
          <Numeral n={1} tone="purple" className="text-[clamp(6rem,3rem+10vw,15rem)] lg:col-span-3" />
          <div className="min-w-0 lg:col-span-9">
            <Title s={s} tone="purple" />
          </div>
          <div className="min-w-0 lg:col-span-7 lg:self-start">
            <Lead text={s.intro} tone="purple" />
          </div>
          <div className="min-w-0 lg:col-span-5 lg:self-start">
            <p data-subject className="flex items-start gap-4 rounded-[22px] bg-brand-950/45 p-4 text-[15px] leading-snug text-brand-50 ring-1 ring-white/10 sm:p-5">
              <Avatar />
              <span className="min-w-0">
                <strong className="font-bold text-white">Meet Noa,</strong> the sample job seeker this page follows: a product designer who runs her own studies and writes SQL for her dashboards. This month she is looking at design and analyst roles.
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Pinned split scene */}
      <div data-pin className="relative z-[2] pt-12 lg:flex lg:h-[100svh] lg:min-h-[760px] lg:items-center lg:pb-6 lg:pt-[92px]">
        <div className="container-x grid w-full grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-12 xl:gap-16">
          {cards && (
            <ol data-problems className="group/list relative space-y-3">
              {cards.items.map((c, i) => (
                <li key={c.title} data-problem className="group/item relative overflow-hidden rounded-[24px] bg-white/[0.08] p-5 ring-1 ring-white/15 transition-[opacity,translate] duration-500 group-data-[run=true]/list:opacity-50 data-[active=true]:translate-x-2 data-[active=true]:opacity-100! sm:p-6">
                  <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[24px] opacity-0 ring-2 ring-inset ring-gold-400 transition-opacity duration-500 group-data-[active=true]/item:opacity-100" />
                  <div className="relative grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4 sm:gap-5">
                    <span aria-hidden="true" className="font-display text-[2.6rem] font-extrabold leading-[0.85] tracking-[-0.05em] text-gold-400 sm:text-[3.2rem]">
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-[1.25rem] font-bold leading-snug tracking-[-0.02em] text-white sm:text-[1.35rem]">{c.title}</h3>
                      <p className="mt-1.5 text-[15.5px] leading-relaxed text-brand-100">
                        <Rich text={c.text} tone="dark" />
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          )}
          <div className="min-w-0">
            <Stage />
          </div>
        </div>
      </div>

      {/* The turning point */}
      <div className="container-x relative z-[2] pb-16 sm:pb-24 lg:pb-28">
        {quote && (
          <div data-quote className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-4 sm:mt-20 lg:grid-cols-12 lg:gap-10">
            <span aria-hidden="true" className="font-display text-[clamp(6rem,4rem+7vw,12rem)] font-extrabold leading-[0.62] text-gold-400 lg:col-span-2 lg:text-right">
              &ldquo;
            </span>
            <div className="min-w-0 lg:col-span-9">
              <p className="mb-5 text-[13px] font-bold uppercase tracking-[0.18em] text-gold-300">The turning point</p>
              <p data-quote-text className="font-display text-[clamp(1.55rem,1rem+2.1vw,3.2rem)] font-bold leading-[1.14] tracking-[-0.025em] text-white">
                <Rich text={quote.text} tone="dark" />
              </p>
            </div>
          </div>
        )}
        {others.length > 0 && (
          <div className="mt-8 space-y-5">
            {others.map((b, i) => (
              <Block key={i} b={b} />
            ))}
          </div>
        )}
        <Handoff next={1} tone="purple" line="Noa stops sending one resume everywhere. First she checks which roles deserve an evening of tailoring." />
      </div>
    </section>
  );
}
