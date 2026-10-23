'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap';
import RoundSection from './interview-questions/RoundSection';
import RoleCatalogue from './interview-questions/RoleCatalogue';
import PracticeSection from './interview-questions/PracticeSection';
import { PAPER } from './interview-questions/shared';

/*
 * Interview questions, "The Question Library". A light, editorial page: each round is a chapter with
 * a huge numeral, its questions laid out as index cards with the interviewer's hint in the margin,
 * then the card catalogue of questions by role, then the closing chapter on practising out loud.
 * On desktop a sticky navigator rides in the left margin of the whole library: it marks the chapter
 * you are in (scroll-spy) and fills a reading-progress rail. Everything is DOM-driven (attribute and
 * textContent writes), so scrolling never re-renders React. On phones the navigator is a contents
 * card at the top.
 */

const kind = (s) => (s.blocks.some((b) => b.type === 'questions') ? 'round' : s.blocks.some((b) => b.type === 'cards') ? 'roles' : 'practice');
const countLabel = (s) => {
  const k = kind(s);
  if (k === 'round') return `${s.blocks.filter((b) => b.type === 'questions').reduce((a, b) => a + b.items.length, 0)} questions`;
  if (k === 'roles') return `${s.blocks.find((b) => b.type === 'cards').items.length} roles`;
  const steps = s.blocks.find((b) => b.type === 'steps');
  return steps ? `${steps.items.length} steps` : 'Practice';
};

function LibraryNav({ sections }) {
  return (
    <nav aria-label="Question library chapters" className="rounded-[22px] border border-ink-950/10 bg-white/95 p-5 shadow-[0_18px_40px_-28px_rgba(26,15,51,0.5)] lg:p-4 xl:p-5">
      <div className="flex items-baseline justify-between gap-3 border-b border-ink-950/10 pb-3">
        <p className="font-display text-[15px] font-bold text-ink-950">The library</p>
        <p aria-hidden="true" className="hidden font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-ink-900/50 lg:block">
          <span data-readpct>0</span>% read
        </p>
      </div>
      <ol className="relative mt-3 space-y-0.5">
        <span aria-hidden="true" className="absolute bottom-4 left-[13px] top-4 w-[2px] rounded-full bg-ink-950/10">
          <span data-readrail className="block h-full w-full origin-top scale-y-0 rounded-full bg-gradient-to-b from-brand-600 to-gold-500" />
        </span>
        {sections.map((s, i) => (
          <li key={s.id}>
            <a href={`#${s.id}`} data-navlink={s.id} data-active="false" className="group relative flex items-center gap-3 rounded-xl py-2 pl-0 pr-2 transition-colors duration-300 hover:bg-light-lavender data-[active=true]:bg-light-lavender">
              <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-ink-950/15 bg-white font-mono text-[10.5px] font-bold text-ink-900/60 transition-colors duration-300 group-data-[active=true]:border-brand-950 group-data-[active=true]:bg-brand-950 group-data-[active=true]:text-gold-300">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[13.5px] font-semibold leading-tight text-ink-900/75 transition-colors duration-300 group-data-[active=true]:text-ink-950">{s.eyebrow}</span>
                <span className="block text-[11.5px] font-medium text-ink-900/45">{countLabel(s)}</span>
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default function InterviewQuestionsStory({ page }) {
  const root = useRef(null);
  const sections = page.sections || [];

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(`(min-width: 1024px)`, () => {
        const pct = q('[data-readpct]')[0];
        const rail = q('[data-readrail]')[0];
        const set = gsap.quickSetter(rail, 'scaleY');
        const links = q('[data-navlink]');
        const els = sections.map((s) => document.getElementById(s.id));
        let tops = [];
        let last = -1;
        let active = '';
        // One trigger drives both the reading rail and the scroll-spy (no React state, DOM writes only)
        const st = ScrollTrigger.create({
          trigger: root.current,
          start: 'top 55%',
          end: 'bottom 55%',
          onRefresh: () => {
            tops = els.map((el) => (el ? el.getBoundingClientRect().top + window.scrollY : 0));
          },
          onUpdate: (self) => {
            set(self.progress);
            const v = Math.round(self.progress * 100);
            if (v !== last && pct) {
              last = v;
              pct.textContent = String(v);
            }
            const line = self.scroll() + window.innerHeight * 0.45;
            let id = sections[0]?.id || '';
            tops.forEach((t, i) => {
              if (t <= line) id = sections[i].id;
            });
            if (id !== active) {
              active = id;
              links.forEach((a) => a.setAttribute('data-active', a.dataset.navlink === id ? 'true' : 'false'));
            }
          },
        });
        return () => st.kill();
      });
      mm.add(`(max-width: 1023px) and ${MOTION_OK}`, () => {
        gsap.from(q('nav[aria-label] li'), { x: -20, opacity: 0, stagger: 0.06, duration: 0.9, scrollTrigger: { trigger: q('nav[aria-label]')[0], start: 'top 85%', once: true } });
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} data-library className={`relative ${PAPER}`}>
      {/* Navigator: a contents card on phones, a sticky rail in the left margin on desktop */}
      <div className="relative z-20 pt-12 lg:pointer-events-none lg:absolute lg:inset-0 lg:pt-0">
        <div className="container-x lg:h-full lg:pt-28">
          <div className="lg:pointer-events-auto lg:sticky lg:top-28 lg:w-[232px] xl:w-[264px]">
            <LibraryNav sections={sections} />
          </div>
        </div>
      </div>

      {sections.map((s, i) => {
        const k = kind(s);
        if (k === 'round') return <RoundSection key={s.id} s={s} n={i + 1} bg={i % 2 ? 'bg-white' : PAPER} />;
        if (k === 'roles') return <RoleCatalogue key={s.id} s={s} n={i + 1} />;
        return <PracticeSection key={s.id} s={s} n={i + 1} />;
      })}
    </div>
  );
}
