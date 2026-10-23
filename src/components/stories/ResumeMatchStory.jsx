import ScannerSection from './resume-job-match/ScannerSection';
import ScoreSection from './resume-job-match/ScoreSection';
import LanesSection from './resume-job-match/LanesSection';
import VersionsSection from './resume-job-match/VersionsSection';

/*
 * Resume job match story, "The Scanner": one resume read against one job, told in four chapters.
 * Start here: a deep brand stage where the pinned scanner reads the resume with a glowing beam while the
 * four steps ride along. The score: a photo composite where the score lands in big numerals beside the
 * three things that come with it. Missing skills: three full-colour lanes the skill chips fly into.
 * Versions: a dark band where a stack of resume versions fans apart. Every string comes from the
 * content module.
 */

const SECTIONS = {
  'check-one-job': ScannerSection,
  'match-score': ScoreSection,
  'missing-skills': LanesSection,
  'resume-versions': VersionsSection,
};

export default function ResumeMatchStory({ page }) {
  return (page.sections || []).map((s) => {
    const Section = SECTIONS[s.id] || ScoreSection;
    return <Section key={s.id} s={s} />;
  });
}
