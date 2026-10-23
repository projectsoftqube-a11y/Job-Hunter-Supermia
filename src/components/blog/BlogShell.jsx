import Link from 'next/link';
import CreativeHeading from '@/components/CreativeHeading';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import HeroStage from '@/components/page/HeroStage';
import { CATEGORIES, POSTS, postsIn } from '@/content/blog';

/** Header for the blog hub and category pages: H1, intro and the category chips (real links). */
export function BlogHeader({ h1, intro, current }) {
  const chips = [{ slug: null, name: 'All', href: '/blog', count: POSTS.length }, ...CATEGORIES.map((c) => ({ slug: c.slug, name: c.name, href: `/blog/category/${c.slug}`, count: postsIn(c.slug).length }))].filter((c) => c.count > 0);
  return (
    <HeroStage as="header" tiles tileIcons={['book', 'briefcase', 'doc', 'mic']}>
      <div className="mx-auto max-w-[66rem] pt-4 text-center sm:pt-8">
        <CreativeHeading as="h1" lines={h1} tone="dark" start="top 100%" className="font-display text-[clamp(2.2rem,1.3rem+3.2vw,4.6rem)] font-extrabold leading-[1.04] tracking-[-0.035em] text-white" />
        <div className="mx-auto mt-6 max-w-[44rem] space-y-4 text-[clamp(1.02rem,0.95rem+0.3vw,1.2rem)] font-medium leading-relaxed text-white/70">
          {(Array.isArray(intro) ? intro : [intro]).map((p) => (
            <p key={p}>
              <Rich text={p} tone="dark" />
            </p>
          ))}
        </div>
        <nav aria-label="Blog categories" className="mt-9">
          <ul className="flex flex-wrap justify-center gap-2">
            {chips.map((c) => {
              const on = c.slug === current;
              return (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    aria-current={on ? 'page' : undefined}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[14px] font-bold transition-colors ${on ? 'bg-gold-400 text-ink-950' : 'bg-white/[0.06] text-white ring-1 ring-white/12 hover:bg-white/[0.12]'}`}
                  >
                    {c.name}
                    <span className={`rounded-full px-1.5 text-[11px] ${on ? 'bg-ink-950/10 text-ink-950' : 'bg-white/10 text-gold-300'}`}>{c.count}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </HeroStage>
  );
}

/** Small "you can also practice it" strip shown under post lists. */
export function BlogNote() {
  return (
    <p className="mt-12 flex flex-wrap items-center justify-center gap-2 text-center text-[15px] font-semibold text-ink-900/60">
      <Icon name="question" className="h-4 w-4 text-brand-500" />
      Looking for questions to rehearse? See the{' '}
      <Link href="/interview-questions" className="font-bold text-brand-600 underline decoration-brand-200 underline-offset-4 hover:decoration-brand-600">
        mock interview questions by round and role
      </Link>
      .
    </p>
  );
}
