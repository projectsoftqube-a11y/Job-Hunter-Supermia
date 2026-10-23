import LiveScene from './ai-mock-interview/LiveScene';
import Rundown from './ai-mock-interview/Rundown';
import Corridor from './ai-mock-interview/Corridor';
import ModeSwitch from './ai-mock-interview/ModeSwitch';
import Scorecard from './ai-mock-interview/Scorecard';
import CallSheet from './ai-mock-interview/CallSheet';
import Tape from './ai-mock-interview/Tape';

/*
 * AI mock interview, "The Interview Room". The page body reads as one live session, segment by
 * segment, each marked by a broadcast slate (SEG 01-07 with tally lights): on air (the live exchange
 * that proves the comparison table), the run of show (four steps), the corridor of four round doors,
 * the mode switch, the scorecard report card, the call sheet of who it is for, and the recording's
 * lifecycle (privacy).
 * Deep brand-950 stage bands with gold signal accents alternate with crisp light sections.
 */

const SCENES = {
  'what-it-is': LiveScene,
  'how-it-works': Rundown,
  rounds: Corridor,
  modes: ModeSwitch,
  scorecard: Scorecard,
  'who-its-for': CallSheet,
  privacy: Tape,
};

export default function MockInterviewStory({ page }) {
  const sections = page.sections || [];
  return sections.map((s, i) => {
    const Scene = SCENES[s.id] || CallSheet;
    return <Scene key={s.id} s={s} n={i + 1} />;
  });
}
