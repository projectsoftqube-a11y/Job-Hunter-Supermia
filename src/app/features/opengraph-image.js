import { FEATURES_HUB } from '@/content/features-hub';
import { headingText } from '@/lib/text';
import { ogCard, OG_SIZE } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'JobHunter features: AI job search, resume match, application email and mock interviews';

export default function Image() {
  return ogCard({ kicker: 'Features', title: headingText(FEATURES_HUB.hero.h1), line: FEATURES_HUB.seo.description });
}
