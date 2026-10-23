import { notFound } from 'next/navigation';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { FadeUp } from '@/components/Reveal';
import { Icon } from '@/components/icons';
import Rich from '@/components/Rich';
import HeroStage from '@/components/page/HeroStage';
import Blocks from '@/components/page/Blocks';
import FaqList from '@/components/page/FaqList';
import CtaBand from '@/components/page/CtaBand';
import Cover from '@/components/blog/Cover';
import PostCard from '@/components/blog/PostCard';
import Toc from '@/components/blog/Toc';
import { POSTS, POST_BY_SLUG, CATEGORY_BY_SLUG, AUTHOR } from '@/content/blog';
import { OFFER, SIGNUP_URL } from '@/content/site';
import { graph, pageNode, breadcrumbNode, articleNode } from '@/lib/schema';
import { countWords, longDate, readingMinutes } from '@/lib/text';

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = POST_BY_SLUG[slug];
  if (!post) return {};
  return {
    title: { absolute: post.seo.title },
    description: post.seo.description,
    alternates: { canonical: post.path },
    authors: [AUTHOR],
    openGraph: {
      type: 'article',
      url: post.path,
      title: post.seo.title,
      description: post.seo.description,
      publishedTime: post.published,
      modifiedTime: post.updated,
      section: CATEGORY_BY_SLUG[post.category]?.name,
    },
    twitter: { card: 'summary_large_image', title: post.seo.title, description: post.seo.description },
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = POST_BY_SLUG[slug];
  if (!post) notFound();

  const cat = CATEGORY_BY_SLUG[post.category];
  const trail = [
    { name: 'Blog', path: '/blog' },
    { name: cat.name, path: `/blog/category/${cat.slug}` },
    { name: post.title, path: post.path },
  ];
  const visible = [post.title, post.answer, post.takeaways, post.body, post.faqs];
  const toc = post.body.filter((b) => b.type === 'h2').map((b) => ({ id: b.id, text: b.text }));
  if (post.faqs?.length) toc.push({ id: 'faqs', text: 'FAQs' });
  const related = (post.related || []).map((s) => POST_BY_SLUG[s]).filter(Boolean).slice(0, 3);

  const schema = graph(
    pageNode({ path: post.path, name: post.seo.title, description: post.seo.description, about: null, updated: post.updated, extra: { mainEntity: { '@id': `${post.path}#article` } } }),
    breadcrumbNode(post.path, trail),
    articleNode({ path: post.path, headline: post.title, description: post.seo.description, published: post.published, updated: post.updated, image: `${post.path}/opengraph-image`, section: cat.name, words: countWords(visible) })
  );

  return (
    <>
      <main id="main">
        {/* Header */}
        <HeroStage as="header">
          <div className="mx-auto max-w-[60rem] pt-4 text-center sm:pt-8">
            <div className="min-w-0">
              <Link href={`/blog/category/${cat.slug}`} className="inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-gold-300 ring-1 ring-white/10 transition-colors hover:bg-white/[0.12]">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                {cat.name}
              </Link>
              <h1 className="mt-6 font-display text-[clamp(2rem,1.25rem+2.8vw,3.9rem)] font-extrabold leading-[1.06] tracking-[-0.035em] text-white">{post.title}</h1>
              <p className="mx-auto mt-5 max-w-[40rem] text-[clamp(1.02rem,0.95rem+0.3vw,1.2rem)] font-medium leading-relaxed text-white/70">{post.excerpt}</p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-[14px] font-semibold text-white/60">
                <span className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-400 text-ink-950" aria-hidden="true">
                    <Icon name="spark" className="h-4 w-4" />
                  </span>
                  <span>
                    By the <a href={AUTHOR.url} target="_blank" rel="noopener" className="font-bold text-white underline decoration-white/30 underline-offset-4 hover:decoration-gold-400">{AUTHOR.name}</a>
                  </span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon name="clock" className="h-4 w-4 text-gold-400" />
                  {readingMinutes(visible)} min read
                </span>
                <span>
                  Published <time dateTime={post.published}>{longDate(post.published)}</time>
                </span>
                {post.updated !== post.published && (
                  <span>
                    Updated <time dateTime={post.updated}>{longDate(post.updated)}</time>
                  </span>
                )}
              </div>
            </div>
            <FadeUp y={40} delay={0.2} className="mx-auto mt-10 max-w-[46rem] text-left">
              <Cover slug={post.slug} category={post.category} label={cat.name} tag={post.coverTag} className="aspect-[16/11] rounded-[28px] shadow-[0_50px_100px_-45px_rgba(0,0,0,0.9)] ring-1 ring-white/15" />
            </FadeUp>
          </div>
        </HeroStage>

        {/* Article */}
        <div className="relative bg-white py-14 sm:py-20">
          <div className="container-x grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[270px_minmax(0,1fr)] xl:gap-16 2xl:grid-cols-[270px_minmax(0,1fr)_300px] 2xl:gap-16">
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <Toc items={toc} />
                <div className="mt-8 rounded-[22px] bg-light-lavender p-5 2xl:hidden">
                  <p className="font-display text-[15px] font-bold text-ink-950">Practice it on a real job</p>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-900/65">One search, a match score per role and a mock interview with follow-ups.</p>
                  <a href={SIGNUP_URL} className="mt-4 inline-flex h-10 items-center rounded-full bg-gold-500 px-4 text-[13px] font-bold text-ink-950 transition-colors hover:bg-gold-300">
                    Start your job hunt
                  </a>
                </div>
              </div>
            </aside>

            <article className="mx-auto w-full min-w-0 max-w-[880px]">
              {/* Quick answer */}
              <section aria-label="Quick answer" className="relative overflow-hidden rounded-[26px] border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-6 sm:p-8">
                <p className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em] text-brand-600">
                  <Icon name="bolt" className="h-4 w-4" />
                  Quick answer
                </p>
                <p className="mt-3 text-[18px] font-medium leading-relaxed text-ink-950">
                  <Rich text={post.answer} />
                </p>
              </section>

              {post.takeaways?.length > 0 && (
                <section aria-label="Key takeaways" className="mt-6 rounded-[26px] bg-brand-950 p-6 text-white sm:p-8">
                  <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-gold-300">Key takeaways</p>
                  <ul className="mt-4 space-y-3">
                    {post.takeaways.map((t) => (
                      <li key={t} className="flex gap-3 text-[16px] leading-relaxed text-white/90">
                        <span aria-hidden="true" className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-400 text-ink-950">
                          <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />
                        </span>
                        <span>
                          <Rich text={t} tone="dark" />
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <Blocks blocks={post.body} className="mt-10 space-y-6" />

              {post.faqs?.length > 0 && (
                <section id="faqs" aria-labelledby="faqs-title" className="mt-16 scroll-mt-28">
                  <h2 id="faqs-title" className="font-display text-[clamp(1.6rem,1.2rem+1.2vw,2.25rem)] font-extrabold tracking-[-0.03em] text-ink-950">
                    FAQs
                  </h2>
                  <div className="mt-6">
                    <FaqList items={post.faqs} idPrefix={`${post.slug}-faq`} />
                  </div>
                </section>
              )}

              {post.sources?.length > 0 && (
                <section aria-labelledby="sources-title" className="mt-14 rounded-[22px] border border-hairline bg-light-lavender/60 p-6">
                  <h2 id="sources-title" className="font-display text-lg font-bold text-ink-950">
                    Sources
                  </h2>
                  <ol className="mt-4 space-y-2.5 text-[14px] leading-relaxed text-ink-900/70">
                    {post.sources.map((s, i) => (
                      <li key={s.url + i} className="flex gap-2">
                        <span className="font-bold text-ink-900/40">{i + 1}.</span>
                        <span>
                          <a href={s.url} target="_blank" rel="noopener" className="font-semibold text-brand-600 underline decoration-brand-200 underline-offset-2 hover:decoration-brand-600">
                            {s.label}
                          </a>
                          {s.note && <span className="text-ink-900/55">: {s.note}</span>}
                        </span>
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              <p className="mt-12 flex flex-wrap items-center gap-3 border-t border-hairline pt-6 text-[14px] font-semibold text-ink-900/55">
                More in
                <Link href={`/blog/category/${cat.slug}`} className="rounded-full bg-brand-50 px-3 py-1.5 font-bold text-brand-700 hover:bg-brand-100">
                  {cat.menu}
                </Link>
                <Link href="/blog" className="rounded-full bg-brand-50 px-3 py-1.5 font-bold text-brand-700 hover:bg-brand-100">
                  All articles
                </Link>
              </p>
            </article>

            {/* Wide screens: a right rail with the app pitch and what to read next */}
            <aside className="hidden 2xl:block">
              <div className="sticky top-28 space-y-6">
                <div className="grain relative overflow-hidden rounded-[26px] bg-brand-950 p-6 text-white">
                  <div aria-hidden="true" className="pointer-events-none absolute -right-14 -top-16 h-44 w-44 rounded-full bg-[radial-gradient(closest-side,rgba(244,180,0,0.28),transparent)]" />
                  <p className="relative font-display text-[1.25rem] font-bold leading-snug">
                    Practice it on a <span className="text-gold-400">real job</span>
                  </p>
                  <ul className="relative mt-4 space-y-2.5 text-[14px] text-white/80">
                    {['LinkedIn, Indeed and Dice in one search', 'A match score out of 100 per role', 'A mock interview with follow-ups'].map((t) => (
                      <li key={t} className="flex gap-2.5">
                        <span aria-hidden="true" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-400 text-ink-950">
                          <Icon name="check" className="h-3 w-3" strokeWidth={3} />
                        </span>
                        {t}
                      </li>
                    ))}
                  </ul>
                  <a href={SIGNUP_URL} className="relative mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-gold-500 text-[14px] font-bold text-ink-950 transition-colors hover:bg-gold-300">
                    {OFFER.ctaLong}
                    <Icon name="arrow" className="h-4 w-4" strokeWidth={2.4} />
                  </a>
                </div>
                {related.length > 0 && (
                  <div className="rounded-[26px] border border-hairline p-6">
                    <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-ink-900/45">Read next</p>
                    <ul className="mt-3 divide-y divide-hairline">
                      {related.map((p) => (
                        <li key={p.slug}>
                          <Link href={p.path} className="group flex items-start justify-between gap-3 py-3.5 text-[14.5px] font-semibold leading-snug text-ink-950 transition-colors hover:text-brand-600">
                            {p.title}
                            <Icon name="arrow" className="mt-0.5 h-4 w-4 shrink-0 text-brand-400 transition-transform group-hover:translate-x-0.5" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>

        {related.length > 0 && (
          <section aria-labelledby="related-posts" className="bg-light-lavender py-16 sm:py-24">
            <div className="container-x">
              <h2 id="related-posts" className="font-display text-[clamp(1.6rem,1.2rem+1.4vw,2.5rem)] font-extrabold tracking-[-0.03em] text-ink-950">
                Keep reading
              </h2>
              <ul className="mt-8 grid gap-5 md:grid-cols-3">
                {related.map((p) => (
                  <li key={p.slug}>
                    <PostCard post={p} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <CtaBand
          h2={[['Put the Advice to ', { mark: 'Work' }], ['on Your ', { grad: 'Next Application', swoosh: true }]]}
          text="Upload your resume once, see your match score for each role, and practice the interview before it counts."
        />
      </main>
      <JsonLd data={schema} />
    </>
  );
}
