'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { Block } from '@/components/page/Blocks';
import { BoardMark, BOARD_NAMES, ROLES, RANKED, SectionHeading, Intro } from './shared';

/*
 * Chapter 1, "How it works": the signature scene. On desktop the section pins and one scrubbed timeline
 * plays the four steps on a single board: the resume is read, one search fans out to three source lanes,
 * every lane's roles fly together into one list while their fit scores count up, the list re-sorts itself
 * by fit, and the decision bar appears. The step list on the left follows along (class toggles only, no
 * React state). The markup is the final state (the ranked list), so phones, reduced motion and no-JS
 * visitors see the finished board. Only transforms and opacity are animated.
 */

const SKILLS = ['React', 'TypeScript', '6 yrs', 'Senior'];
const ACTIONS = ['Open listing', 'Check missing', 'Draft email', 'Move on'];
const FUNNEL = ['M50 0 C50 18 150 12 150 30', 'M150 0 L150 30', 'M250 0 C250 18 150 12 150 30'];

function Stage() {
  return (
    <div data-stage aria-hidden="true" className="relative min-w-0 overflow-hidden rounded-[30px] bg-white p-3.5 shadow-[0_60px_120px_-60px_rgba(26,15,51,0.65)] ring-1 ring-brand-200/80 sm:p-5">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-2/3 opacity-60" style={{ backgroundImage: 'radial-gradient(rgba(109,76,176,0.14) 1px, transparent 1px)', backgroundSize: '18px 18px' }} />

      {/* Resume in, search out */}
      <div className="relative grid gap-2.5 sm:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] sm:gap-3">
        <div className="relative rounded-2xl">
          <span data-drop className="absolute inset-0 flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-brand-200 text-[12px] font-bold text-brand-400 opacity-0">
            <Icon name="download" className="h-4 w-4 rotate-180" />
            Upload a resume
          </span>
          <div data-resume className="relative flex items-center gap-3 overflow-hidden rounded-2xl bg-brand-950 p-2.5 text-white sm:p-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold-400 text-ink-950">
              <Icon name="doc" className="h-[18px] w-[18px]" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[12.5px] font-bold">resume_v3.pdf</span>
              <span className="mt-1 flex flex-wrap gap-1">
                {SKILLS.map((t) => (
                  <span key={t} data-skill className="rounded-md bg-white/10 px-1.5 py-[1px] text-[10px] font-bold text-brand-100">
                    {t}
                  </span>
                ))}
              </span>
            </span>
            <span data-scan className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-gold-300/30 to-transparent opacity-0" />
          </div>
        </div>
        <div data-search className="flex min-w-0 items-center gap-2 rounded-2xl border border-hairline bg-light-lavender py-2 pl-3 pr-2">
          <Icon name="search" className="h-4 w-4 shrink-0 text-brand-500" />
          <span className="relative min-w-0 flex-1 truncate text-[12.5px] font-semibold text-ink-950">
            <span data-query className="inline-block">Frontend Engineer · Remote, US</span>
            <span data-ph className="absolute inset-0 truncate font-medium text-ink-900/40 opacity-0">
              Search a role and a place
            </span>
          </span>
          <span data-go className="shrink-0 rounded-xl bg-brand-950 px-2.5 py-2 text-[11px] font-bold text-gold-300">
            Search 3 boards
          </span>
        </div>
      </div>

      {/* Three source lanes */}
      <div className="relative mt-3 grid grid-cols-3 gap-2 sm:mt-4 sm:gap-3">
        {BOARD_NAMES.map((b) => (
          <div key={b} className="relative min-w-0 overflow-hidden rounded-2xl bg-light-lavender p-1.5 ring-1 ring-hairline sm:p-2">
            <span data-lane-glow className="absolute inset-0 bg-gold-100 opacity-0" />
            <p className="relative flex items-center gap-1.5 px-0.5 pt-0.5">
              <BoardMark board={b} size="h-5 w-5" text="text-[10px]" />
              <span className="truncate text-[11.5px] font-bold text-ink-950">{b}</span>
              <span className="ml-auto hidden text-[10px] font-bold text-ink-900/45 sm:inline">2 roles</span>
            </p>
            <div className="relative mt-1.5 space-y-1.5">
              {ROLES.filter((r) => r.board === b).map((r) => (
                <div key={r.key} data-chip={r.key} className="rounded-xl bg-white px-2 py-1.5 ring-1 ring-hairline">
                  <p className="truncate text-[10.5px] font-bold text-ink-950 sm:text-[11px]">{r.title}</p>
                  <p className="truncate text-[9.5px] font-medium text-ink-900/55 sm:text-[10px]">{r.company}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* The three lanes converge */}
      <div className="relative h-7">
        {[false, true].map((gold) => (
          <svg key={String(gold)} data-flow={gold ? '' : undefined} viewBox="0 0 300 30" preserveAspectRatio="none" className="absolute inset-0 block h-full w-full origin-top">
            {FUNNEL.map((d) => (
              <path key={d} d={d} fill="none" stroke={gold ? '#f4b400' : '#ded5f5'} strokeWidth={gold ? 2.5 : 2} strokeDasharray={gold ? undefined : '3 5'} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            ))}
          </svg>
        ))}
      </div>

      {/* One list, ranked by fit */}
      <div className="relative">
        <div data-listhead className="flex items-center justify-between gap-2 px-1">
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-600">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
            One list · 6 roles
          </p>
          <span data-sort className="inline-flex items-center gap-1.5 rounded-full bg-brand-950 px-2.5 py-1 text-[10.5px] font-bold text-gold-300">
            Sorted by fit
            <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M6 2v8M3 7l3 3 3-3" />
            </svg>
          </span>
        </div>
        <div className="mt-2 grid grid-cols-[18px_minmax(0,1fr)] gap-x-1.5 sm:grid-cols-[22px_minmax(0,1fr)] sm:gap-x-2">
          <ol className="space-y-1.5">
            {RANKED.map((r, i) => (
              <li key={r.key} data-slot className={`flex h-[44px] items-center justify-center font-display text-[12px] font-extrabold ${i === 0 ? 'text-gold-600' : 'text-brand-300'}`}>
                {i + 1}
              </li>
            ))}
          </ol>
          <ul className="space-y-1.5">
            {RANKED.map((r, i) => (
              <li key={r.key} className="h-[44px] rounded-xl border border-dashed border-brand-200">
                <div data-card={r.key} className="relative -m-px flex h-[44px] items-center gap-2 rounded-xl bg-white px-2 shadow-[0_6px_14px_-10px_rgba(26,15,51,0.45)] ring-1 ring-hairline sm:gap-2.5 sm:px-2.5">
                  {i === 0 && <span data-best className="pointer-events-none absolute -inset-px rounded-xl ring-2 ring-gold-400" />}
                  <BoardMark board={r.board} size="h-6 w-6" text="text-[10px]" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[12px] font-bold leading-tight text-ink-950">{r.title}</span>
                    <span className="block truncate text-[10.5px] font-medium leading-tight text-ink-900/55">
                      {r.company} · {r.board}
                    </span>
                  </span>
                  <span className="hidden shrink-0 rounded-md bg-gold-100 px-1.5 py-0.5 text-[10px] font-bold text-gold-800 min-[440px]:inline">Missing {r.missing}</span>
                  <span className="w-[54px] shrink-0 text-right">
                    <span className="block font-display text-[16px] font-extrabold leading-none text-ink-950">
                      <span data-num>{r.score}</span>
                      <span className="text-[9.5px] font-bold text-ink-900/40">/100</span>
                    </span>
                    <span className="mt-1 block h-1 overflow-hidden rounded-full bg-brand-100">
                      <span className="block h-full rounded-full" style={{ width: `${r.score}%` }}>
                        <span data-bar className="block h-full w-full origin-left rounded-full bg-gradient-to-r from-brand-500 to-gold-400" />
                      </span>
                    </span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Your move */}
      <div data-decide className="relative mt-3 flex flex-wrap items-center gap-1.5 rounded-2xl bg-brand-950 p-2 pl-3">
        <span className="mr-1 text-[10.5px] font-bold uppercase tracking-[0.14em] text-gold-300">Your move</span>
        {ACTIONS.map((a, i) => (
          <span key={a} data-act className="relative rounded-lg bg-white/10 px-2 py-1 text-[11px] font-semibold text-white">
            {i === 2 && <span data-pick className="absolute -inset-[3px] rounded-[10px] ring-2 ring-gold-400" />}
            {a}
          </span>
        ))}
        <span className="ml-auto hidden items-center gap-1 text-[10.5px] font-semibold text-white/60 sm:inline-flex">
          <Icon name="user" className="h-3.5 w-3.5" />
          Sent only by you
        </span>
      </div>
    </div>
  );
}

export default function MergeScene({ s, n }) {
  const root = useRef(null);
  const steps = s.blocks.find((b) => b.type === 'steps')?.items || [];
  const others = s.blocks.filter((b) => b.type !== 'steps');

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        const stage = q('[data-stage]')[0];
        const list = q('[data-steps]')[0];
        const items = q('[data-step-card]');
        const bars = q('[data-step-bar]');
        const cards = RANKED.map((r) => q(`[data-card="${r.key}"]`)[0]);
        const chips = RANKED.map((r) => q(`[data-chip="${r.key}"]`)[0]);
        list.dataset.run = 'true';
        cards.forEach((c) => (c.style.willChange = 'transform'));

        // Layout positions relative to the stage (offsets ignore transforms, so they stay true mid-scene)
        const box = (el) => {
          let x = 0;
          let y = 0;
          let e = el;
          while (e && e !== stage) {
            x += e.offsetLeft;
            y += e.offsetTop;
            e = e.offsetParent;
          }
          return { x: x + el.offsetWidth / 2, y: y + el.offsetHeight / 2, w: el.offsetWidth };
        };
        const pitch = () => cards[1].parentElement.offsetTop - cards[0].parentElement.offsetTop;

        const PHASES = [0, 1, 2.2, 4.4];
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
            end: '+=340%',
            scrub: 0.4,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
          onUpdate() {
            setActive(this.time());
          },
        });

        // Step progress bars fill across their phase
        [1, 1.2, 2.2, 1].forEach((d, i) => tl.fromTo(bars[i], { scaleX: 0 }, { scaleX: 1, duration: d }, PHASES[i]));

        // 1. The resume is read
        tl.fromTo(q('[data-drop]'), { opacity: 1 }, { opacity: 0, duration: 0.1 }, 0.2)
          .from(q('[data-resume]'), { y: 40, scale: 0.9, opacity: 0, duration: 0.35, ease: 'back.out(1.6)' }, 0)
          .from(q('[data-skill]'), { scale: 0, opacity: 0, stagger: 0.08, duration: 0.25, ease: 'back.out(2.4)' }, 0.25)
          .fromTo(q('[data-scan]'), { xPercent: -100, opacity: 1 }, { xPercent: 320, duration: 0.6 }, 0.3)
          .to(q('[data-scan]'), { opacity: 0, duration: 0.05 }, 0.9);

        // 2. One search fans out to three boards
        tl.from(q('[data-search]'), { x: 50, opacity: 0, duration: 0.3, ease: 'power3.out' }, 1)
          .fromTo(q('[data-ph]'), { opacity: 1 }, { opacity: 0, duration: 0.08 }, 1.1)
          .from(q('[data-query]'), { x: -16, opacity: 0, duration: 0.35, ease: 'power2.out' }, 1.15)
          .from(q('[data-go]'), { scale: 0.5, opacity: 0, duration: 0.2, ease: 'back.out(2.4)' }, 1.45)
          .to(q('[data-lane-glow]'), { opacity: 1, duration: 0.15, stagger: 0.08 }, 1.5)
          .to(q('[data-lane-glow]'), { opacity: 0, duration: 0.3, stagger: 0.08 }, 1.75)
          .from(q('[data-chip]'), { y: -44, opacity: 0, stagger: 0.07, duration: 0.35, ease: 'power2.out' }, 1.68);

        // 3. The lanes merge into one list, scores count up, then the list re-sorts by fit
        tl.from(q('[data-flow]'), { scaleY: 0, opacity: 0, duration: 0.4 }, 2.2)
          .from(q('[data-listhead]'), { y: 12, opacity: 0, duration: 0.25 }, 2.25)
          .from(q('[data-slot]'), { opacity: 0, x: -8, stagger: 0.04, duration: 0.2 }, 2.3)
          .from(q('[data-sort]'), { scale: 0.4, opacity: 0, duration: 0.25, ease: 'back.out(2.4)' }, 3.3);

        RANKED.forEach((r, rank) => {
          const arrive = ROLES.findIndex((x) => x.key === r.key);
          const card = cards[rank];
          const chip = chips[rank];
          const at = 2.35 + arrive * 0.12;
          const shift = () => (arrive - rank) * pitch();
          tl.fromTo(
            card,
            {
              x: () => box(chip).x - box(card).x,
              y: () => box(chip).y - box(card).y,
              scale: () => box(chip).w / box(card).w,
              opacity: 0,
            },
            { x: 0, y: shift, scale: 1, opacity: 1, duration: 0.45, ease: 'power3.inOut' },
            at
          ).to(chip, { opacity: 0.35, scale: 0.96, duration: 0.2 }, at);

          const num = card.querySelector('[data-num]');
          const counter = { v: 0 };
          let shown = -1;
          tl.fromTo(
            counter,
            { v: 0 },
            {
              v: r.score,
              duration: 0.5,
              ease: 'power1.out',
              onUpdate: () => {
                const v = Math.round(counter.v);
                if (v !== shown) num.textContent = shown = v;
              },
            },
            at + 0.15
          ).from(card.querySelector('[data-bar]'), { scaleX: 0, duration: 0.5, ease: 'power1.out' }, at + 0.15);

          // The sort: every card glides to its ranked slot, nudging sideways as it passes the others
          const dir = arrive > rank ? 1 : -1;
          if (arrive !== rank) {
            tl.to(card, { y: 0, duration: 0.7, ease: 'power2.inOut' }, 3.45 + rank * 0.04)
              .to(card, { x: dir * 14, duration: 0.35, ease: 'power1.out' }, 3.45 + rank * 0.04)
              .to(card, { x: 0, duration: 0.35, ease: 'power1.in' }, 3.8 + rank * 0.04);
          }
        });
        tl.from(q('[data-best]'), { opacity: 0, scale: 1.06, duration: 0.3 }, 4.15);

        // 4. The decision stays yours
        tl.from(q('[data-decide]'), { y: 26, opacity: 0, duration: 0.3, ease: 'power3.out' }, 4.45)
          .from(q('[data-act]'), { y: 10, opacity: 0, stagger: 0.07, duration: 0.25, ease: 'back.out(2)' }, 4.55)
          .from(q('[data-pick]'), { opacity: 0, scale: 1.2, duration: 0.2 }, 5.05)
          .to({}, { duration: 0.45 }, 5.4);

        setActive(0);

        return () => {
          delete list.dataset.run;
          items.forEach((li) => delete li.dataset.active);
          cards.forEach((c, i) => {
            c.style.willChange = '';
            c.querySelector('[data-num]').textContent = RANKED[i].score;
          });
        };
      });

      mm.add(`(max-width: 1023px) and ${MOTION_OK}`, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: q('[data-steps]')[0], start: 'top 85%', once: true } });
        tl.from(q('[data-step]'), { y: 34, opacity: 0, stagger: 0.08, duration: 1 })
          .from(q('[data-stage]'), { y: 50, opacity: 0, duration: 1 }, 0.3)
          .from(q('[data-chip]'), { y: -20, opacity: 0, stagger: 0.05, duration: 0.6 }, 0.6)
          .from(q('[data-card]'), { x: -24, opacity: 0, stagger: 0.07, duration: 0.8 }, 0.9)
          .from(q('[data-bar]'), { scaleX: 0, stagger: 0.07, duration: 1 }, 1.1);
      });

      mm.add(MOTION_OK, () => {
        gsap.from(q('[data-intro]'), { y: 30, opacity: 0, duration: 1.1, scrollTrigger: { trigger: q('[data-intro]')[0], start: 'top 90%', once: true } });
      });
    },
    { scope: root }
  );

  return (
    <section id={s.id} ref={root} aria-labelledby={`${s.id}-title`} className="relative scroll-mt-24 overflow-hidden bg-light-lavender">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_35%_at_85%_20%,rgba(196,179,234,0.55),transparent),radial-gradient(30%_30%_at_10%_90%,rgba(252,211,77,0.18),transparent)]" />

      <div className="container-x relative grid grid-cols-[minmax(0,1fr)] gap-6 pt-[60px] sm:pt-24 lg:grid-cols-12 lg:items-end lg:gap-10 lg:pb-4">
        <SectionHeading s={s} n={n} className="lg:col-span-7" />
        <Intro text={s.intro} className="lg:col-span-5 lg:pb-2" />
      </div>

      <div data-pin className="relative pb-[60px] pt-10 sm:pb-24 lg:flex lg:h-[100svh] lg:min-h-[740px] lg:items-center lg:pb-5 lg:pt-[88px]">
        <div className="container-x grid w-full grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-center lg:gap-12 xl:gap-16">
          <div className="min-w-0">
            <ol data-steps className="group/steps relative space-y-2.5">
              {steps.map((st, i) => (
                <li key={st.title} data-step>
                  <div
                    data-step-card
                    className="group/card relative overflow-hidden rounded-[22px] bg-white p-4 shadow-[0_24px_50px_-40px_rgba(26,15,51,0.6)] ring-1 ring-hairline transition-[opacity,transform] duration-500 group-data-[run=true]/steps:opacity-50 data-[active=true]:translate-x-2 data-[active=true]:opacity-100! sm:p-5"
                  >
                    <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[22px] opacity-0 ring-2 ring-inset ring-brand-300 transition-opacity duration-500 group-data-[active=true]/card:opacity-100" />
                    <div className="relative flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-950 font-display text-sm font-extrabold text-gold-400">{String(i + 1).padStart(2, '0')}</span>
                      <div className="min-w-0">
                        <h3 className="font-display text-[1.15rem] font-bold leading-snug tracking-[-0.02em] text-ink-950">{st.title}</h3>
                        <p className="mt-1.5 text-[15px] leading-relaxed text-ink-900/70">
                          <Rich text={st.text} />
                        </p>
                      </div>
                    </div>
                    <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] bg-brand-50">
                      <span data-step-bar className="block h-full w-full origin-left bg-gradient-to-r from-brand-500 to-gold-400" />
                    </span>
                  </div>
                </li>
              ))}
            </ol>
            {others.length > 0 && (
              <div className="mt-6 space-y-5">
                {others.map((b, i) => (
                  <Block key={i} b={b} />
                ))}
              </div>
            )}
          </div>
          <Stage />
        </div>
      </div>
    </section>
  );
}
