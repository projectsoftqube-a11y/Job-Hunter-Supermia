'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap';
import ContentSections from '@/components/page/ContentSections';
import { GUTTER_LEFT } from './for-software-engineers/editor';
import ThreeBoards from './for-software-engineers/ThreeBoards';
import SkillsDiff from './for-software-engineers/SkillsDiff';
import RoundTerminal from './for-software-engineers/RoundTerminal';
import DepthScorecard from './for-software-engineers/DepthScorecard';

/*
 * Software engineers story: "The Editor". Each chapter opens like a commit, with its eyebrow as a file
 * tab, and a git graph runs down the page gutter on desktop, drawing as you read and lighting each
 * chapter's commit as it passes. Chapters: the three boards in one ranked file, resume.md vs job.md as a
 * diff, the Role & Knowledge round as a transcript, and the scorecard. The editor is purely a visual frame
 * for the page's copy (JobHunter has no CLI, API or IDE plugin). Every string comes from the content module.
 */

const SCENES = {
  'three-boards': ThreeBoards,
  'skills-each-role-expects': SkillsDiff,
  'role-and-knowledge': RoundTerminal,
  'technical-depth': DepthScorecard,
};

export default function SoftwareEngineersStory({ page }) {
  const root = useRef(null);
  const sections = page.sections || [];

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        gsap.fromTo(q('[data-git-line]'), { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top 55%', end: 'bottom 55%', scrub: true } });
        ScrollTrigger.batch(q('[data-git-node]'), {
          start: 'top 55%',
          onEnter: (els) => els.forEach((e) => (e.dataset.on = 'true')),
          onLeaveBack: (els) => els.forEach((e) => (e.dataset.on = 'false')),
        });
      });
      mm.add(`(min-width: 1024px) and (prefers-reduced-motion: reduce)`, () => {
        q('[data-git-node]').forEach((e) => (e.dataset.on = 'true'));
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} className="relative">
      {sections.map((s, i) => {
        const Scene = SCENES[s.id];
        if (!Scene) return <ContentSections key={s.id} page={{ ...page, sections: [s] }} />;
        return <Scene key={s.id} s={s} n={i + 1} total={sections.length} />;
      })}

      {/* The git graph in the gutter */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[3] hidden lg:block">
        <div className="container-x h-full">
          <div className="relative h-full">
            <span className="absolute inset-y-0 w-[2px] bg-[repeating-linear-gradient(to_bottom,rgba(155,127,212,0.45)_0_6px,transparent_6px_12px)]" style={{ left: GUTTER_LEFT }} />
            <span data-git-line className="absolute inset-y-0 w-[2px] origin-top bg-gradient-to-b from-gold-400 via-brand-400 to-gold-400" style={{ left: GUTTER_LEFT }} />
          </div>
        </div>
      </div>
    </div>
  );
}
