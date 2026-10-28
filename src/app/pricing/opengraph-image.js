import { getBillingPlans } from '@/lib/billing';
import { listNames, pricePhrase } from '@/lib/pricing';
import { ogCard, OG_SIZE } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = 'image/png';
// Static by Next.js convention, so it names no plan or price that could go stale
export const alt = 'JobHunter pricing: the free and paid plans compared';

export default async function Image() {
  const plans = await getBillingPlans();
  const line = plans.map((p) => `${p.name} ${pricePhrase(p)}`).join('  ·  ');
  return ogCard({ kicker: 'Pricing', title: `${listNames(plans.map((p) => p.name))} Plans`, line });
}
