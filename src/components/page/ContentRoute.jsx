import ContentPage from '@/components/page/ContentPage';
import JsonLd from '@/components/JsonLd';
import { trailFor } from '@/content/pages';
import { graph, pageNode, breadcrumbNode, itemListNode } from '@/lib/schema';
import { headingText } from '@/lib/text';

/*
 * Shared by app/[slug] (audience and resource pages) and app/features/[slug] (feature pages): the
 * metadata and the page body with its JSON-LD, built the same way for every content module.
 */

export function contentMetadata(page) {
  if (!page) return {};
  return {
    title: { absolute: page.seo.title },
    description: page.seo.description,
    alternates: { canonical: page.path },
    openGraph: { type: 'website', url: page.path, title: page.seo.title, description: page.seo.description },
    twitter: { card: 'summary_large_image', title: page.seo.title, description: page.seo.description },
  };
}

export default function ContentRoute({ page }) {
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
