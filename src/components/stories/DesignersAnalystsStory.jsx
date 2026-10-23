import SplitSection from './for-designers-and-analysts/SplitSection';
import ChartSection from './for-designers-and-analysts/ChartSection';
import CanvasSection from './for-designers-and-analysts/CanvasSection';
import NotesSection from './for-designers-and-analysts/NotesSection';

/*
 * Designers and analysts story, "The Canvas": the page told in a design-tool and dashboard world, four
 * frames. The problem: designer and analyst boards slide together at a seam, then the three problems as
 * artboards. Match score: a shortlist chart that draws and annotates itself, and the missing-skills table
 * as a colour-coded data table. Resumes: a pinned dark canvas where four resume-version artboards fly into
 * place. Practice: the interview prompts as sticky notes on a portfolio review board, then a scorecard.
 * Every string comes from the content module.
 */

const SECTIONS = {
  'same-title-different-job': SplitSection,
  'match-score-first': ChartSection,
  'resume-versions': CanvasSection,
  'talk-through-your-work': NotesSection,
};

export default function DesignersAnalystsStory({ page }) {
  return (page.sections || []).map((s) => {
    const Section = SECTIONS[s.id] || ChartSection;
    return <Section key={s.id} s={s} />;
  });
}
