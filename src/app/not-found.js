import Link from 'next/link';
import { Icon } from '@/components/icons';
import HeroStage from '@/components/page/HeroStage';

export const metadata = {
  title: { absolute: 'Page Not Found | JobHunter by SuperMIA' },
  description: 'This page is not here. Pick up your job hunt from the JobHunter home page, features, pricing, blog or FAQ.',
};

const NEXT_STOPS = [
  { href: '/features', icon: 'layers', title: 'Features', text: 'Job search, resume match, email drafts and mock interviews.' },
  { href: '/pricing', icon: 'target', title: 'Pricing', text: 'A Free plan, Starter and Pro, side by side.' },
  { href: '/interview-questions', icon: 'question', title: 'Interview questions', text: 'Common questions by round and role.' },
  { href: '/blog', icon: 'book', title: 'Blog', text: 'Job search, resume and interview tips.' },
  { href: '/faq', icon: 'chat', title: 'FAQ', text: 'How JobHunter works and what it never does.' },
  { href: '/for-new-grads', icon: 'users', title: "Who it's for", text: 'New grads, career switchers, engineers and more.' },
];

/*
 * 404 for unmatched URLs and notFound(): the dark stage with a giant "404" whose zero is a magnifying
 * glass still searching, a sample search returning no matches, two ways back, and the next stops.
 * Next.js adds noindex for 404 responses.
 */
export default function NotFound() {
  return (
    <main id="main">
      <HeroStage tiles>
        <div className="mx-auto max-w-[56rem] pt-4 text-center sm:pt-8">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-gold-300 ring-1 ring-white/10">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
            Error 404 · 0 matches
          </p>

          {/* 4 [lens] 4 */}
          <div aria-hidden="true" className="mt-6 flex items-center justify-center gap-[0.04em] font-display text-[clamp(6.5rem,4rem+12vw,13rem)] font-extrabold leading-none tracking-[-0.06em] text-white">
            <span>4</span>
            <span className="relative inline-flex h-[0.78em] w-[0.78em] motion-safe:animate-[seek_7s_ease-in-out_infinite]">
              <span className="absolute inset-0 rounded-full border-[0.11em] border-gold-400 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.22),rgba(124,92,214,0.18)_55%,transparent_70%)]" />
              <span className="absolute -bottom-[0.2em] -right-[0.2em] h-[0.34em] w-[0.12em] origin-top -rotate-45 rounded-full bg-gold-400" />
              <span className="absolute left-[24%] top-[22%] h-[0.12em] w-[0.12em] rounded-full bg-white/70" />
            </span>
            <span>4</span>
          </div>

          <h1 className="mt-8 font-display text-[clamp(1.9rem,1.3rem+2.2vw,3.2rem)] font-extrabold leading-[1.08] tracking-[-0.035em] text-white">
            This page isn&apos;t in the <span className="text-gold-400">search results</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[34rem] text-[clamp(1.02rem,0.95rem+0.3vw,1.2rem)] font-medium leading-relaxed text-white/70">
            The link may be old or mistyped. Here are the best places to pick up your job hunt.
          </p>

          {/* Sample search with no results */}
          <div aria-hidden="true" className="mx-auto mt-8 flex max-w-[30rem] items-center gap-3 rounded-2xl bg-white p-2 pl-4 text-left shadow-[0_24px_50px_-24px_rgba(0,0,0,0.6)]">
            <Icon name="search" className="h-5 w-5 shrink-0 text-brand-600" />
            <span className="min-w-0 flex-1 truncate text-[14px] font-semibold text-ink-900/70">jobhunter.supermia.ai/this-page</span>
            <span className="shrink-0 rounded-xl bg-brand-950 px-3 py-2 text-[12px] font-bold text-gold-300">0 matches</span>
          </div>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/" className="group inline-flex h-14 items-center gap-3 rounded-full bg-gold-500 pl-7 pr-2 text-[15px] font-bold text-ink-950 shadow-[0_18px_40px_-16px_rgba(244,180,0,0.9)] transition-colors hover:bg-gold-300 sm:h-16 sm:text-base">
              Back to home
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-950 text-gold-400 transition-transform duration-500 group-hover:-rotate-45 sm:h-12 sm:w-12" aria-hidden="true">
                <Icon name="arrow" className="h-5 w-5" strokeWidth={2.4} />
              </span>
            </Link>
            <Link href="/features" className="inline-flex h-14 items-center rounded-full px-7 text-[15px] font-bold text-white ring-1 ring-white/20 transition-colors hover:bg-white/[0.08] sm:h-16">
              Explore features
            </Link>
          </div>
        </div>
      </HeroStage>

      <section aria-labelledby="next-stops-title" className="relative bg-white pb-40 pt-16 sm:pb-56 sm:pt-20">
        <div className="container-x">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="next-stops-title" className="font-display text-[clamp(1.7rem,1.3rem+1.6vw,2.6rem)] font-extrabold tracking-[-0.03em] text-ink-950">
              Try one of these instead
            </h2>
            <p className="text-[15px] text-ink-900/60">Six places most people head next.</p>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {NEXT_STOPS.map((s, i) => (
              <li key={s.href}>
                <Link href={s.href} className={`group flex h-full items-center gap-4 rounded-[22px] p-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 ${i === 0 ? 'bg-brand-950 text-white' : 'border border-hairline bg-light-lavender/60'}`}>
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${i === 0 ? 'bg-gold-400 text-ink-950' : 'bg-brand-950 text-gold-400'}`}>
                    <Icon name={s.icon} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block font-display text-[1.1rem] font-bold ${i === 0 ? 'text-white' : 'text-ink-950'}`}>{s.title}</span>
                    <span className={`mt-0.5 block text-[14px] leading-snug ${i === 0 ? 'text-white/65' : 'text-ink-900/60'}`}>{s.text}</span>
                  </span>
                  <Icon name="arrow" className={`h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1 ${i === 0 ? 'text-gold-400' : 'text-brand-600'}`} strokeWidth={2.2} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
