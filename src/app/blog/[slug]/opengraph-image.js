import { POSTS, POST_BY_SLUG, CATEGORY_BY_SLUG } from '@/content/blog';
import { ogCard, OG_SIZE } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'JobHunter blog';

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }) {
  const { slug } = await params;
  const post = POST_BY_SLUG[slug];
  return ogCard({
    kicker: post ? `Blog · ${CATEGORY_BY_SLUG[post.category]?.name}` : 'Blog',
    title: post?.title || 'JobHunter blog',
    line: post?.excerpt,
  });
}
