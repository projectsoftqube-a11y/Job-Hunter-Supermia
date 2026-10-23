import { FAQ_PAGE } from '@/content/faq';
import { headingText } from '@/lib/text';
import { ogCard, OG_SIZE } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = "JobHunter FAQ: how it works, what it never does and what happens to your data";

export default function Image() {
  return ogCard({ kicker: 'FAQ', title: headingText(FAQ_PAGE.h1), line: FAQ_PAGE.seo.description });
}
