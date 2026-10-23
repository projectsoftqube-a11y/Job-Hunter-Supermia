import ContentSections from '@/components/page/ContentSections';
import PlanSection from './for-people-returning-to-work/PlanSection';
import PracticeSection from './for-people-returning-to-work/PracticeSection';
import GapSection from './for-people-returning-to-work/GapSection';
import MatchSection from './for-people-returning-to-work/MatchSection';

/*
 * "Your restart, inside JobHunter": a returner's way back told through the product, in four steps.
 *   01 Your plan     (lavender) what feels hard, each worry answered by a finished panel of the app.
 *   02 Practice      (deep brand stage, pinned) the mock-interview screen moves from guided practice
 *                    with a hint, through the HR round and the filled scorecard, to real simulation.
 *   03 Your gap      (white) a live transcript of the example gap answer, synced with the answer list
 *                    and the follow-up questions.
 *   04 Your match    (deep brand stage) resume vs one role, row by row, then the drafted email you send.
 * Every string comes from the page's content module and is server-rendered.
 */

const SCENES = {
  'what-feels-hard': PlanSection,
  'guided-practice': PracticeSection,
  'explain-the-gap': GapSection,
  'skills-still-match': MatchSection,
};

export default function ReturningToWorkStory({ page }) {
  return (page.sections || []).map((s, i) => {
    const Scene = SCENES[s.id];
    if (!Scene) return <ContentSections key={s.id} page={{ ...page, sections: [s] }} />;
    return <Scene key={s.id} s={s} n={i + 1} />;
  });
}
