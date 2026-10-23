import ContentSections from '@/components/page/ContentSections';
import SearchBento from './for-software-engineers/SearchBento';
import SkillsMatch from './for-software-engineers/SkillsMatch';
import LiveSession from './for-software-engineers/LiveSession';
import DepthScore from './for-software-engineers/DepthScore';

/*
 * Software engineers story: "Built for engineers". A dark, glowing product-page body in four chapters
 * that follow one sample engineer, Sam, from noise to proof: three tabs collapse into one search on a
 * sticky bento that lights tile by tile (dark band), the job's required skills connect to Sam's resume
 * skills on a pinned match panel, the Role & Knowledge round plays on a live-session panel as each
 * prompt scrolls by (dark band), and the scorecard fills part by part. Each chapter ends with a hand-off
 * bar that carries Sam's progress to the next one. Every string comes from the page's content module.
 */

const SCENES = {
  'three-boards': SearchBento,
  'skills-each-role-expects': SkillsMatch,
  'role-and-knowledge': LiveSession,
  'technical-depth': DepthScore,
};

export default function SoftwareEngineersStory({ page }) {
  const sections = page.sections || [];
  return sections.map((s, i) => {
    const Scene = SCENES[s.id];
    if (!Scene) return <ContentSections key={s.id} page={{ ...page, sections: [s] }} />;
    const nxt = sections[i + 1];
    return <Scene key={s.id} s={s} n={i + 1} next={nxt ? { id: nxt.id, eyebrow: nxt.eyebrow } : null} />;
  });
}
