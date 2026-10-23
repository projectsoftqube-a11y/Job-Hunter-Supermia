import { PRICING } from '@/content/site';
import { ogCard, OG_SIZE } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = "JobHunter pricing: Free, Starter at $15 a month and Pro at $30 a month";

export default function Image() {
  const line = PRICING.plans.map((p) => (p.price === 0 ? `${p.name} $0` : `${p.name} $${p.price} a month`)).join('  ·  ');
  return ogCard({ kicker: 'Pricing', title: 'Free, Starter and Pro Plans', line });
}
