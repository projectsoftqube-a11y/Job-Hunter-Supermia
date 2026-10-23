import { notFound } from 'next/navigation';
import ContentPage from '@/components/page/ContentPage';
import JsonLd from '@/components/JsonLd';
import { PAGES, PAGE_BY_SLUG, trailFor } from '@/content/pages';
import { graph, pageNode, breadcrumbNode, itemListNode } from '@/lib/schema';
import { headingText } from '@/lib/text';

/*
 * Feature, audience and resource pages, one per content module. Every page is prerendered at build
 * time; any other slug at this level is a 404.
 */

export function generateStaticParams() {
  return PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = PAGE_BY_SLUG[slug];
  if (!page) return {};
  return {
    title: { absolute: page.seo.title },
    description: page.seo.description,
    alternates: { canonical: page.path },
    openGraph: { type: 'website', url: page.path, title: page.seo.title, description: page.seo.description },
    twitter: { card: 'summary_large_image', title: page.seo.title, description: page.seo.description },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const page = PAGE_BY_SLUG[slug];
  if (!page) notFound();

  const trail = trailFor(page);
  const questionSections = page.sections.filter((s) => s.blocks?.some((b) => b.type === 'questions'));
  const schema = graph(
    pageNode({ path: page.path, name: page.seo.title, description: page.seo.description }),
    breadcrumbNode(page.path, trail),
    questionSections.length > 0 &&
      itemListNode(
        page.path,
        headingText(page.hero.h1),
        questionSections.map((s) => ({ name: headingText(s.h2), path: `${page.path}#${s.id}` }))
      )
  );

  return (
    <>
      <ContentPage page={page} trail={trail} />
      <JsonLd data={schema} />
    </>
  );
}
