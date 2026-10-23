import { CATEGORIES, CATEGORY_BY_SLUG } from '@/content/blog';
import { ogCard, OG_SIZE } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = "JobHunter Blog category";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export default async function Image({ params }) {
  const { category } = await params;
  const c = CATEGORY_BY_SLUG[category];
  return ogCard({ kicker: 'Blog', title: c ? c.h1 : 'JobHunter Blog', line: c?.seo.description });
}
