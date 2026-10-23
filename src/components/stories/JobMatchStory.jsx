import ContentSections from '@/components/page/ContentSections';
import MergeScene from './ai-job-match/MergeScene';
import OneSearch from './ai-job-match/OneSearch';
import FitScore from './ai-job-match/FitScore';
import EveryMatch from './ai-job-match/EveryMatch';

/*
 * AI Job Match story: "Three Boards, One List". Four chapters follow one search through the pipeline,
 * each tagged with its stage marker: the resume goes in and three boards merge into one ranked list
 * (pinned scene), the dark command-centre band compares one search with board-by-board searching, one
 * role goes on the fit-score instrument, and the anatomy of a match ends with the next step being yours.
 * Every string comes from the page's content module.
 */

const SCENES = {
  'how-it-works': MergeScene,
  'one-search': OneSearch,
  'fit-score': FitScore,
  'every-match': EveryMatch,
};

export default function JobMatchStory({ page }) {
  const sections = page.sections || [];
  return sections.map((s, i) => {
    const Scene = SCENES[s.id];
    if (!Scene) return <ContentSections key={s.id} page={{ ...page, sections: [s] }} />;
    return <Scene key={s.id} s={s} n={i + 1} />;
  });
}
