import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { FadeUp } from '@/components/Reveal';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import CtaBand from '@/components/page/CtaBand';
import PostCard from '@/components/blog/PostCard';
import { BlogHeader } from '@/components/blog/BlogShell';
import { BLOG_HUB, POSTS, CATEGORIES, postsIn, hubIndexable } from '@/content/blog';
import { graph, pageNode, breadcrumbNode, itemListNode } from '@/lib/schema';

const TRAIL = [{ name: 'Blog', path: BLOG_HUB.path }];
const indexable = hubIndexable();

export const metadata = {
  title: { absolute: BLOG_HUB.seo.title },
  description: BLOG_HUB.seo.description,
  alternates: { canonical: BLOG_HUB.path },
  ...(indexable ? {} : { robots: { index: false, follow: true } }),
  openGraph: { type: 'website', url: BLOG_HUB.path, title: BLOG_HUB.seo.title, description: BLOG_HUB.seo.description },
  twitter: { card: 'summary_large_image', title: BLOG_HUB.seo.title, description: BLOG_HUB.seo.description },
};

export default function BlogHub() {
  const [featured, ...rest] = POSTS;
  const schema = graph(
    pageNode({ path: BLOG_HUB.path, name: BLOG_HUB.seo.title, description: BLOG_HUB.seo.description, type: 'CollectionPage', about: null }),
    breadcrumbNode(BLOG_HUB.path, TRAIL),
    itemListNode(BLOG_HUB.path, BLOG_HUB.latestH2, POSTS.map((p) => ({ name: p.title, path: p.path })))
  );

  return (
    <>
      <main id="main">
        <BlogHeader trail={TRAIL} h1={BLOG_HUB.h1} intro={BLOG_HUB.lead} current={null} />

        <section aria-labelledby="latest" className="bg-white py-16 sm:py-24">
          <div className="container-x">
            <h2 id="latest" className="font-display text-[clamp(1.7rem,1.2rem+1.6vw,2.75rem)] font-extrabold tracking-[-0.03em] text-ink-950">
              {BLOG_HUB.latestH2}
            </h2>
            <FadeUp y={40} className="mt-8">
              <PostCard post={featured} featured />
            </FadeUp>
            <FadeUp as="ul" y={40} stagger={0.08} className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((p) => (
                <li key={p.slug}>
                  <PostCard post={p} />
                </li>
              ))}
              {/* Promo tile: the interview questions hub */}
              <li>
                <Link href="/interview-questions" className="group relative flex h-full min-h-[360px] flex-col justify-between overflow-hidden rounded-[28px] bg-brand-950 p-7 text-white shadow-[0_30px_60px_-40px_rgba(26,15,51,0.9)] transition-transform duration-500 hover:-translate-y-1.5">
                  <span aria-hidden="true" className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(244,180,0,0.35),transparent)]" />
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-400 text-ink-950">
                    <Icon name="question" className="h-6 w-6" />
                  </span>
                  <span className="relative">
                    <span className="block text-[12px] font-bold uppercase tracking-[0.16em] text-gold-300">Practice list</span>
                    <span className="mt-3 block font-display text-[1.6rem] font-extrabold leading-[1.12] tracking-[-0.025em]">Mock interview questions by round and role</span>
                    <span className="mt-3 block text-[15px] leading-relaxed text-brand-100">Common questions for all four rounds, what each one tests, and the follow-up to expect.</span>
                    <span className="mt-6 inline-flex items-center gap-2 text-[14px] font-bold text-gold-300">
                      See the questions
                      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                  </span>
                </Link>
              </li>
            </FadeUp>
          </div>
        </section>

        {/* One block per category with at least one post (Blog Hub content) */}
        <section aria-label="Browse by category" className="bg-light-lavender py-16 sm:py-24">
          <div className="container-x grid gap-5 lg:grid-cols-3">
            {CATEGORIES.filter((c) => postsIn(c.slug).length > 0).map((c) => (
              <article key={c.slug} className="flex flex-col rounded-[28px] border border-hairline bg-white p-7 shadow-[0_30px_60px_-45px_rgba(26,15,51,0.6)]">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-950 text-gold-400" aria-hidden="true">
                  <Icon name={c.icon} className="h-6 w-6" />
                </span>
                <h2 className="mt-5 font-display text-[1.6rem] font-extrabold tracking-[-0.02em] text-ink-950">{c.name}</h2>
                <p className="mt-3 flex-1 text-[15.5px] leading-relaxed text-ink-900/70">
                  <Rich text={c.hub} />
                </p>
                <ul className="mt-5 space-y-2 border-t border-hairline pt-5">
                  {postsIn(c.slug).map((p) => (
                    <li key={p.slug}>
                      <Link href={p.path} className="group flex items-start gap-2 text-[14.5px] font-semibold leading-snug text-ink-950 hover:text-brand-600">
                        <span aria-hidden="true" className="mt-0.5 text-gold-500 transition-transform group-hover:translate-x-0.5">→</span>
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <CtaBand h2={BLOG_HUB.cta.h2} text={BLOG_HUB.cta.text} />
      </main>
      <JsonLd data={schema} />
    </>
  );
}
