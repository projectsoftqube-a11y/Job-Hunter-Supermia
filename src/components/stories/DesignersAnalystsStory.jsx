import ContentSections from '@/components/page/ContentSections';
import BriefSection from './for-designers-and-analysts/BriefSection';
import ResearchSection from './for-designers-and-analysts/ResearchSection';
import VersionsSection from './for-designers-and-analysts/VersionsSection';
import CritiqueSection from './for-designers-and-analysts/CritiqueSection';

/*
 * Designers and analysts story, "The Case Study": the page reads like a portfolio case study that follows
 * Noa, a sample job seeker, through four chapters, each on its own colour field. 01 The brief (purple): one
 * job title splits into a designer posting and an analyst posting in a pinned scene, ending on the
 * turning-point pull quote. 02 The research (gold): her shortlist's match scores build into an annotated
 * bar chart that feeds the missing-skills diagnosis. 03 The iterations (ink): resume versions as specimen
 * plates with code-drawn cover art, then the email she sends herself. 04 The critique (lavender): the
 * practice prompts as a critique wall with reviewer's notes, a sample scorecard and the outcome. Each
 * chapter hands off to the next. Every content string comes from the page's content module.
 */

const CHAPTERS = {
  'same-title-different-job': BriefSection,
  'match-score-first': ResearchSection,
  'resume-versions': VersionsSection,
  'talk-through-your-work': CritiqueSection,
};

export default function DesignersAnalystsStory({ page }) {
  return (page.sections || []).map((s) => {
    const Chapter = CHAPTERS[s.id];
    if (!Chapter) return <ContentSections key={s.id} page={{ ...page, sections: [s] }} />;
    return <Chapter key={s.id} s={s} />;
  });
}
