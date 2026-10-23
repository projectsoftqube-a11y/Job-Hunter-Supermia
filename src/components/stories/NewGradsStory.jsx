'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap';
import Rail from './for-new-grads/Rail';
import ModuleProblem from './for-new-grads/ModuleProblem';
import ModuleRoles from './for-new-grads/ModuleRoles';
import ModulePractice from './for-new-grads/ModulePractice';
import ModuleApply from './for-new-grads/ModuleApply';

/*
 * "The First-Job Syllabus" (for-new-grads). The job hunt is framed as a short course: every section is a
 * module with its own accent and a module header bar that shows where it sits in the whole syllabus.
 *   Module 1 · The problem: lesson cards + a pre-course checklist that ticks itself off.
 *   Module 2 · Find roles: lesson rows tick off on one track while a sample match board builds beside them.
 *   Module 3 · Practice (dark band): mode cards, then a pinned worksheet whose four reps level up
 *              (smoother waveforms, a 10-block confidence strip from Awkward to Natural), then a scorecard.
 *   Module 4 · Apply: a pinned scene where each tip lights up its part of a sample application note.
 * On desktop a sticky syllabus rail follows along: one scrubbed trigger per module fills its bar and spine
 * segment, flips the node state and writes the overall percentage straight to the DOM (no React state).
 * All copy comes from the page module; mocks are decorative sample data.
 */

const MODULES = [ModuleProblem, ModuleRoles, ModulePractice, ModuleApply];

export default function NewGradsStory({ page }) {
  const root = useRef(null);
  const sections = page.sections || [];

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      // Reveal choreography shared by every module
      mm.add(MOTION_OK, () => {
        const rises = q('[data-rise]');
        gsap.set(rises, { y: 34, opacity: 0 });
        ScrollTrigger.batch(rises, {
          start: 'top 90%',
          once: true,
          onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, stagger: 0.1, duration: 1.1, overwrite: true }),
        });

        const bars = q('[data-modbar]');
        gsap.set(bars, { y: 24, opacity: 0 });
        ScrollTrigger.batch(bars, {
          start: 'top 92%',
          once: true,
          onEnter: (els) =>
            els.forEach((el) => {
              gsap.to(el, { y: 0, opacity: 1, duration: 0.9, overwrite: true });
              const seg = el.querySelector('[data-modseg]');
              if (seg) gsap.fromTo(seg, { scaleX: 0 }, { scaleX: 1, duration: 1.3, delay: 0.25, ease: 'expo.inOut' });
            }),
        });
      });

      // Syllabus rail: progress follows the reading position (desktop only)
      mm.add('(min-width: 1024px)', () => {
        const mods = q('[data-module]');
        const nodes = q('[data-rail-node]');
        const railBars = q('[data-rail-bar]');
        const segs = q('[data-rail-seg]');
        const pct = q('[data-rail-pct]')[0];
        const now = q('[data-rail-now]')[0];
        const prog = mods.map(() => 0);
        let weights = mods.map(() => 1);
        let shown = -1;

        const writePct = () => {
          const sum = weights.reduce((a, b) => a + b, 0) || 1;
          const v = Math.round((prog.reduce((a, p, i) => a + p * weights[i], 0) / sum) * 100);
          if (v !== shown && pct) {
            shown = v;
            pct.textContent = String(v);
          }
        };
        const setState = (i, state) => {
          if (!nodes[i]) return;
          nodes[i].dataset.state = state;
          if (state === 'active' && now) now.textContent = `Module ${i + 1} · ${sections[i]?.eyebrow ?? ''}`;
        };

        mods.forEach((sec, i) => {
          const tl = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: sec,
              start: 'top 55%',
              end: 'bottom 55%',
              scrub: true,
              refreshPriority: -1,
              invalidateOnRefresh: true,
              onRefresh: () => {
                weights = mods.map((m) => m.offsetHeight || 1);
              },
              onUpdate: (self) => {
                prog[i] = self.progress;
                writePct();
              },
              onEnter: () => setState(i, 'active'),
              onEnterBack: () => setState(i, 'active'),
              onLeave: () => setState(i, 'done'),
              onLeaveBack: () => setState(i, 'todo'),
            },
          });
          if (railBars[i]) tl.fromTo(railBars[i], { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0);
          if (segs[i]) tl.fromTo(segs[i], { scaleY: 0 }, { scaleY: 1, duration: 1 }, 0);
        });

        return () => nodes.forEach((n) => (n.dataset.state = 'todo'));
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} className="relative">
      <Rail sections={sections} />
      {sections.map((s, i) => {
        const Module = MODULES[i] || MODULES[MODULES.length - 1];
        return <Module key={s.id} s={s} index={i} total={sections.length} sections={sections} />;
      })}
    </div>
  );
}
