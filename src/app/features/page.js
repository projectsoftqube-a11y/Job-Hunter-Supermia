import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/page/PageHero';
import CtaBand from '@/components/page/CtaBand';
import FeaturesHubBody from '@/components/page/FeaturesHubBody';
import { FEATURES_HUB } from '@/content/features-hub';
import { PAGE_BY_SLUG } from '@/content/pages';
import { graph, pageNode, breadcrumbNode, itemListNode } from '@/lib/schema';
import { OG_BASE } from '@/content/site';

const { path, seo, hero, tour, cta } = FEATURES_HUB;
const TRAIL = [{ name: FEATURES_HUB.label, path }];

export const metadata = {
  title: { absolute: seo.title },
  description: seo.description,
  alternates: { canonical: path },
  openGraph: { ...OG_BASE, type: 'website', url: path, title: seo.title, description: seo.description },
  twitter: { card: 'summary_large_image', title: seo.title, description: seo.description },
};

/* /features: the hub for the four feature pages (each at /features/<slug>). */
export default function FeaturesPage() {
  const features = tour.map((t) => ({ ...t, page: PAGE_BY_SLUG[t.slug] })).filter((f) => f.page);
  const schema = graph(
    pageNode({ path, name: seo.title, description: seo.description, type: 'CollectionPage' }),
    breadcrumbNode(path, TRAIL),
    itemListNode(
      path,
      'JobHunter features',
      features.map((f) => ({ name: f.page.label, path: f.page.path }))
    )
  );

  return (
    <>
      <main id="main">
        <PageHero eyebrow={hero.eyebrow} h1={hero.h1} tagline={hero.tagline} lead={hero.lead} points={hero.points} />
        <FeaturesHubBody features={features} />
        <CtaBand h2={cta.h2} text={cta.text} />
      </main>
      <JsonLd data={schema} />
    </>
  );
}
