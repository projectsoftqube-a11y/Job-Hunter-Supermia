'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon } from '@/components/icons';

/*
 * 404 quick finder: a search box that filters the destinations as you type (Enter opens the best
 * match), above four link cards and two text links. All destinations are real links in the HTML.
 */

const CARDS = [
  { href: '/', title: 'Home', text: 'Start from the beginning', icon: 'arrow', keys: 'home start main' },
  { href: '/features', title: 'Features', text: 'Job search, resume match, email and interviews', icon: 'layers', keys: 'features tools job search resume match email mock interview' },
  { href: '/pricing', title: 'Pricing', text: 'Free, Starter and Pro plans', icon: 'target', keys: 'pricing price plans cost free starter pro' },
  { href: '/blog', title: 'Blog', text: 'Job search and interview tips', icon: 'book', keys: 'blog tips guides articles' },
];
const EXTRA = [
  { href: '/faq', title: 'FAQ', keys: 'faq questions help privacy' },
  { href: '/interview-questions', title: 'Interview questions', keys: 'interview questions rounds roles practice' },
];

const matches = (item, q) => !q || `${item.title} ${item.keys}`.toLowerCase().includes(q);

export default function NotFoundSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const best = q ? [...CARDS, ...EXTRA].find((i) => matches(i, q)) : null;

  const onSubmit = (e) => {
    e.preventDefault();
    if (best) router.push(best.href);
  };

  return (
    <div className="mx-auto mt-8 w-full max-w-[44rem] lg:mx-0">
      <form role="search" onSubmit={onSubmit} className="flex items-center gap-3 rounded-2xl bg-white p-2 pl-4 shadow-[0_24px_50px_-30px_rgba(26,15,51,0.45)] ring-1 ring-ink-900/[0.08] focus-within:ring-2 focus-within:ring-brand-400">
        <Icon name="search" className="h-5 w-5 shrink-0 text-brand-600" />
        <label htmlFor="nf-search" className="sr-only">
          Search JobHunter pages
        </label>
        <input
          id="nf-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search pages: features, pricing, blog…"
          autoComplete="off"
          className="min-w-0 flex-1 bg-transparent py-2 text-[15px] font-medium text-ink-950 outline-none placeholder:text-ink-900/40"
        />
        <button type="submit" className="shrink-0 rounded-xl bg-brand-950 px-4 py-2.5 text-[13.5px] font-bold text-white transition-colors hover:bg-brand-800 disabled:opacity-40" disabled={!best}>
          Go
        </button>
      </form>
      <p className="mt-2 h-5 text-left text-[13px] font-medium text-ink-900/55" aria-live="polite">
        {q ? (best ? `Best match: ${best.title}. Press Enter to open it.` : 'No match. Try one of the pages below.') : ''}
      </p>

      <ul className="mt-4 grid gap-3 text-left sm:grid-cols-2">
        {CARDS.map((c) => {
          const on = matches(c, q);
          return (
            <li key={c.href} className={`transition-opacity duration-300 ${on ? 'opacity-100' : 'opacity-40'}`}>
              <Link
                href={c.href}
                className={`group flex h-full items-center gap-4 rounded-2xl border bg-white p-4 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_20px_40px_-28px_rgba(26,15,51,0.5)] ${best?.href === c.href ? 'border-brand-400' : 'border-hairline'}`}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-light-lavender text-brand-600">
                  <Icon name={c.icon} className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[1.05rem] font-bold text-ink-950">{c.title}</span>
                  <span className="mt-0.5 block text-[13.5px] leading-snug text-ink-900/60">{c.text}</span>
                </span>
                <Icon name="arrow" className="h-4 w-4 shrink-0 text-brand-600 transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} />
              </Link>
            </li>
          );
        })}
      </ul>

      <p className="mt-6 text-[14px] font-medium text-ink-900/60">
        Or visit{' '}
        {EXTRA.map((x, i) => (
          <span key={x.href}>
            {i > 0 && ' · '}
            <Link href={x.href} className={`font-bold underline decoration-brand-200 underline-offset-4 hover:decoration-brand-600 ${best?.href === x.href ? 'text-brand-600' : 'text-ink-950'}`}>
              {x.title}
            </Link>
          </span>
        ))}
      </p>
    </div>
  );
}
