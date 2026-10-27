import { SITE_URL, DEMO, SEO } from '@/content/site';
import { PAGES } from '@/content/pages';
import { POSTS, CATEGORIES, categoryIndexable, hubIndexable } from '@/content/blog';

/*
 * Only live, indexable URLs (Launch Kit: sitemap.xml). Blog listings join once they hold three posts.
 */
export default function sitemap() {
  const url = (path) => `${SITE_URL}${path === '/' ? '/' : path}`;
  // Every page has its own share card at <path>/opengraph-image
  const og = (path) => [url(path === '/' ? '/opengraph-image' : `${path}/opengraph-image`)];
  const entries = [
    {
      url: url('/'),
      lastModified: SEO.updated,
      changeFrequency: 'weekly',
      priority: 1,
      images: og('/'),
      videos: [
        {
          title: DEMO.name,
          thumbnail_loc: url(DEMO.poster),
          description: DEMO.description,
          content_loc: url(DEMO.src),
          duration: Math.floor(DEMO.seconds),
          publication_date: DEMO.uploadDate,
        },
      ],
    },
    ...PAGES.map((p) => ({ url: url(p.path), lastModified: SEO.updated, changeFrequency: 'monthly', priority: p.kind === 'feature' ? 0.9 : 0.8, images: og(p.path) })),
    { url: url('/features'), lastModified: SEO.updated, changeFrequency: 'monthly', priority: 0.9, images: og('/features') },
    { url: url('/faq'), lastModified: SEO.updated, changeFrequency: 'monthly', priority: 0.8, images: og('/faq') },
    { url: url('/pricing'), lastModified: SEO.updated, changeFrequency: 'monthly', priority: 0.8, images: og('/pricing') },
  ];

  if (hubIndexable()) entries.push({ url: url('/blog'), lastModified: POSTS.map((p) => p.updated).sort().at(-1), changeFrequency: 'weekly', priority: 0.7, images: og('/blog') });
  CATEGORIES.filter((c) => categoryIndexable(c.slug)).forEach((c) => entries.push({ url: url(`/blog/category/${c.slug}`), lastModified: SEO.updated, changeFrequency: 'weekly', priority: 0.5, images: og(`/blog/category/${c.slug}`) }));
  POSTS.forEach((p) => entries.push({ url: url(p.path), lastModified: p.updated, changeFrequency: 'monthly', priority: 0.7, images: og(p.path) }));

  entries.push(
    { url: url('/privacy-policy'), lastModified: '2026-10-08', changeFrequency: 'yearly', priority: 0.3, images: og('/privacy-policy') },
    { url: url('/terms-and-conditions'), lastModified: '2026-10-08', changeFrequency: 'yearly', priority: 0.3, images: og('/terms-and-conditions') }
  );
  return entries;
}
