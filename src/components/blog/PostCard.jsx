import Link from 'next/link';
import Cover from '@/components/blog/Cover';
import { CATEGORY_BY_SLUG } from '@/content/blog';
import { longDate, readingMinutes } from '@/lib/text';

/** Post card for the hub, category pages and "related" rails: cover art, category, title, excerpt, date. */
export default function PostCard({ post, featured = false, headingLevel = 3 }) {
  const cat = CATEGORY_BY_SLUG[post.category];
  const H = `h${headingLevel}`;
  const minutes = readingMinutes([post.title, post.answer, post.takeaways, post.body, post.faqs]);
  return (
    <article className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-hairline bg-white shadow-[0_30px_60px_-45px_rgba(26,15,51,0.6)] transition-[transform,border-color] duration-500 hover:-translate-y-1.5 hover:border-brand-200 ${featured ? 'lg:flex-row lg:items-center' : ''}`}>
      <Cover slug={post.slug} category={post.category} label={cat?.name} tag={post.coverTag} className={`${featured ? 'aspect-[16/10] lg:w-[42%] lg:shrink-0 lg:self-center' : 'aspect-[16/10]'} transition-transform duration-700 group-hover:scale-[1.02]`} />
      <div className={`flex flex-1 flex-col p-6 ${featured ? 'sm:p-9 lg:justify-center' : ''}`}>
        <p className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] text-brand-500">
          {cat?.name}
          <span aria-hidden="true" className="text-ink-900/25">·</span>
          <span className="text-ink-900/45">{minutes} min read</span>
        </p>
        <H className={`mt-3 font-display font-extrabold leading-[1.15] tracking-[-0.025em] text-ink-950 ${featured ? 'text-[clamp(1.6rem,1.1rem+1.4vw,2.4rem)]' : 'text-[1.3rem]'}`}>
          <Link href={post.path} className="after:absolute after:inset-0 after:content-['']">
            {post.title}
          </Link>
        </H>
        <p className={`mt-3 flex-1 leading-relaxed text-ink-900/65 ${featured ? 'text-[17px]' : 'text-[15px]'}`}>{post.excerpt}</p>
        <p className="mt-5 flex items-center justify-between text-[13px] font-semibold text-ink-900/45">
          <time dateTime={post.published}>{longDate(post.published)}</time>
          <span className="inline-flex items-center gap-1.5 font-bold text-brand-600">
            Read the guide
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </p>
      </div>
    </article>
  );
}
