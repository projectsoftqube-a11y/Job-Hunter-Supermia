import { notFound } from 'next/navigation';
import ContentRoute, { contentMetadata } from '@/components/page/ContentRoute';
import { TOP_PAGES } from '@/content/pages';

/*
 * Audience and resource pages, one per content module (feature pages live under /features). Every page
 * is prerendered at build time; any other slug at this level is a 404.
 */

const BY_SLUG = Object.fromEntries(TOP_PAGES.map((p) => [p.slug, p]));

// Every page here is prerendered from generateStaticParams and unknown slugs are a 404, so the dev-only
// instant-navigation check (which can't render notFound()) is switched off for this segment.
export const instant = false;
// An unknown slug must answer 404 on its first request too. Without this, the prerendered App Shell is
// sent with a 200 before notFound() runs (a soft 404 for crawlers).
export const ensureStatic = 'navigation';

export function generateStaticParams() {
  return TOP_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return contentMetadata(BY_SLUG[slug]);
}

export default async function Page({ params }) {
  const { slug } = await params;
  const page = BY_SLUG[slug];
  if (!page) notFound();
  return <ContentRoute page={page} />;
}
