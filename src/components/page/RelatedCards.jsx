import Link from 'next/link';
import { Icon } from '@/components/icons';

const ICON_FOR = (href) =>
  href.startsWith('/blog')
    ? 'book'
    : href.includes('interview-questions')
      ? 'question'
      : href.includes('mock')
        ? 'mic'
        : href.includes('email')
          ? 'mail'
          : href.includes('resume')
            ? 'target'
            : href.includes('job-match')
              ? 'search'
              : href.startsWith('/for-')
                ? 'users'
                : 'spark';

/** "Keep exploring" cards linking sideways to related pages (descriptive anchor text, crawlable links). */
export default function RelatedCards({ items, heading = 'Keep exploring' }) {
  if (!items?.length) return null;
  return (
    <section aria-labelledby="related-title" className="relative bg-white py-20 sm:py-28">
      <div className="container-x">
        <h2 id="related-title" className="font-display text-[clamp(1.6rem,1.2rem+1.4vw,2.5rem)] font-extrabold tracking-[-0.03em] text-ink-950">
          {heading}
        </h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {items.map((r) => (
            <li key={r.href}>
              <Link href={r.href} className="group flex h-full flex-col rounded-[26px] border border-hairline bg-light-lavender/60 p-6 transition-[transform,background-color,border-color] duration-500 hover:-translate-y-1 hover:border-brand-200 hover:bg-white">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-950 text-gold-400 transition-transform duration-500 group-hover:-rotate-6">
                  <Icon name={ICON_FOR(r.href)} className="h-5 w-5" />
                </span>
                <span className="mt-5 font-display text-[1.2rem] font-bold leading-snug tracking-[-0.02em] text-ink-950">{r.title}</span>
                <span className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-900/65">{r.text}</span>
                <span className="mt-5 inline-flex items-center gap-2 text-[14px] font-bold text-brand-600">
                  Read more
                  <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
