import { notFound } from 'next/navigation';
import ContentRoute, { contentMetadata } from '@/components/page/ContentRoute';
import { FEATURE_PAGES } from '@/content/pages';

/* The four feature pages, at /features/<slug>. Prerendered at build time; other slugs are a 404. */

const BY_SLUG = Object.fromEntries(FEATURE_PAGES.map((p) => [p.slug, p]));

export function generateStaticParams() {
  return FEATURE_PAGES.map((p) => ({ slug: p.slug }));
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
