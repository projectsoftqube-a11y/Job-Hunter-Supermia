import { notFound } from 'next/navigation';
import ContentRoute, { contentMetadata } from '@/components/page/ContentRoute';
import { TOP_PAGES } from '@/content/pages';

/*
 * Audience and resource pages, one per content module (feature pages live under /features). Every page
 * is prerendered at build time; any other slug at this level is a 404.
 */

const BY_SLUG = Object.fromEntries(TOP_PAGES.map((p) => [p.slug, p]));

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
