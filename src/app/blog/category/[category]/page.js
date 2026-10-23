import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import { FadeUp } from '@/components/Reveal';
import CtaBand from '@/components/page/CtaBand';
import PostCard from '@/components/blog/PostCard';
import { BlogHeader, BlogNote } from '@/components/blog/BlogShell';
import { CATEGORIES, CATEGORY_BY_SLUG, postsIn, categoryIndexable } from '@/content/blog';
import { graph, pageNode, breadcrumbNode, itemListNode } from '@/lib/schema';

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

const pathOf = (c) => `/blog/category/${c.slug}`;

export async function generateMetadata({ params }) {
  const { category } = await params;
  const c = CATEGORY_BY_SLUG[category];
  if (!c) return {};
  return {
    title: { absolute: c.seo.title },
    description: c.seo.description,
    alternates: { canonical: pathOf(c) },
    // noindex, follow until the category holds three posts (Navigation spec 4.3)
    ...(categoryIndexable(c.slug) ? {} : { robots: { index: false, follow: true } }),
    openGraph: { type: 'website', url: pathOf(c), title: c.seo.title, description: c.seo.description },
    twitter: { card: 'summary_large_image', title: c.seo.title, description: c.seo.description },
  };
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const c = CATEGORY_BY_SLUG[category];
  if (!c) notFound();

  const posts = postsIn(c.slug);
  const path = pathOf(c);
  const trail = [
    { name: 'Blog', path: '/blog' },
    { name: c.menu, path },
  ];
  const schema = graph(
    pageNode({ path, name: c.seo.title, description: c.seo.description, type: 'CollectionPage', about: null }),
    breadcrumbNode(path, trail),
    itemListNode(path, c.h1, posts.map((p) => ({ name: p.title, path: p.path })))
  );

  return (
    <>
      <main id="main">
        <BlogHeader trail={trail} h1={[[c.h1.split(' ').slice(0, -1).join(' ') + ' ', { grad: c.h1.split(' ').slice(-1)[0], swoosh: true }]]} intro={c.intro} current={c.slug} />
        <section aria-labelledby="posts" className="bg-white py-16 sm:py-24">
          <div className="container-x">
            <h2 id="posts" className="font-display text-[clamp(1.6rem,1.2rem+1.4vw,2.5rem)] font-extrabold tracking-[-0.03em] text-ink-950">
              {posts.length} {posts.length === 1 ? 'guide' : 'guides'} in {c.name}
            </h2>
            <FadeUp as="ul" y={40} stagger={0.08} className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <li key={p.slug}>
                  <PostCard post={p} />
                </li>
              ))}
            </FadeUp>
            <BlogNote />
          </div>
        </section>
        <CtaBand
          h2={[['Put the Advice to ', { mark: 'Work' }], ['on Your ', { grad: 'Next Application', swoosh: true }]]}
          text="Upload your resume once, see your match score for each role, and practice the interview before it counts."
        />
      </main>
      <JsonLd data={schema} />
    </>
  );
}
