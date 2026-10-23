import ContentSections from '@/components/page/ContentSections';
import LostInTranslation from './for-career-switchers/LostInTranslation';
import Translation from './for-career-switchers/Translation';
import Dialects from './for-career-switchers/Dialects';
import Captions from './for-career-switchers/Captions';

/*
 * For Career Switchers: "The Translator". A career switch is a translation problem, from the old
 * field's language (deep purple) into the new field's language (warm gold). One sample switcher, Jordan
 * (hospital administration → operations analysis), carries the four-chapter arc: her experience is lost
 * in translation (the problem), a match score shows what carries over and a pinned translator renames
 * her work step by step (the turning point and the method), one set of facts becomes three resume
 * versions, and her "why are you switching" answer plays as captions in a live interview (the confident
 * outcome). Each chapter ends on a hand-off to the next. Every string comes from the page module.
 */

const SCENES = {
  'where-switchers-get-stuck': LostInTranslation,
  'skills-match': Translation,
  'resume-versions': Dialects,
  'why-switching': Captions,
};

export default function CareerSwitchersStory({ page }) {
  const sections = page.sections || [];
  return sections.map((s, i) => {
    const Scene = SCENES[s.id];
    if (!Scene) return <ContentSections key={s.id} page={{ ...page, sections: [s] }} />;
    return <Scene key={s.id} s={s} n={i + 1} />;
  });
}
