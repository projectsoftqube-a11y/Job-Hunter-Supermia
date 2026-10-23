import { PAGES, PAGE_BY_SLUG } from '@/content/pages';
import { ogCard, OG_SIZE } from '@/lib/og';
import { headingText } from '@/lib/text';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'JobHunter by SuperMIA';

const KICKER = { feature: 'Feature', audience: "Who it's for", resource: 'Resource' };

export function generateStaticParams() {
  return PAGES.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }) {
  const { slug } = await params;
  const page = PAGE_BY_SLUG[slug];
  return ogCard({
    kicker: KICKER[page?.kind] || 'JobHunter',
    title: page ? headingText(page.hero.h1) : 'JobHunter',
    line: page?.seo.description,
  });
}
