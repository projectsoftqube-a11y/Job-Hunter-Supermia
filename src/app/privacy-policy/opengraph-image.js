import { LEGAL_SEO } from '@/content/legal';
import { ogCard, OG_SIZE } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = "JobHunter Privacy Policy";

export default function Image() {
  return ogCard({ kicker: 'Legal', title: 'Privacy Policy', line: LEGAL_SEO.privacy.description });
}
