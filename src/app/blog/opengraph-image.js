import { BLOG_HUB } from '@/content/blog';
import { headingText } from '@/lib/text';
import { ogCard, OG_SIZE } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = "JobHunter Blog: job search, resume and interview tips";

export default function Image() {
  return ogCard({ kicker: 'Blog', title: headingText(BLOG_HUB.h1), line: BLOG_HUB.seo.description });
}
