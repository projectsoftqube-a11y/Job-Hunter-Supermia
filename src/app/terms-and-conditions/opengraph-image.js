import { LEGAL_SEO } from '@/content/legal';
import { ogCard, OG_SIZE } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = "JobHunter Terms and Conditions";

export default function Image() {
  return ogCard({ kicker: 'Legal', title: 'Terms and Conditions', line: LEGAL_SEO.terms.description });
}
