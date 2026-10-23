import Link from 'next/link';
import { Icon } from '@/components/icons';
import NotFoundGame from '@/components/NotFoundGame';

export const metadata = {
  title: { absolute: 'Page Not Found | JobHunter by SuperMIA' },
  description: 'This page is not here. Pick up your job hunt from the JobHunter home page, features, pricing, blog or FAQ.',
};

/*
 * 404: a small hunt. The message and a way home on the left; on the right a dark search field where
 * the pointer becomes a magnifier and finds the pages to go to next (see NotFoundGame).
 * Next.js adds noindex for 404 responses.
 */
export default function NotFound() {
  return (
    <main id="main" className="relative isolate overflow-hidden bg-gradient-to-b from-[#f6f3ff] to-light-lavender pb-40 pt-[120px] sm:pb-56 sm:pt-[150px]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-[1] bg-[radial-gradient(45%_45%_at_8%_10%,rgba(196,179,234,0.6),transparent),radial-gradient(35%_40%_at_95%_85%,rgba(252,211,77,0.22),transparent)]" />
      <div className="container-x grid grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
        <div className="min-w-0 text-center lg:text-left">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
            Error 404
          </p>
          <h1 className="mt-6 font-display text-[clamp(2.3rem,1.5rem+3.2vw,4.4rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-ink-950">
            Lost the trail? <span className="text-brand-600">Let&apos;s hunt it down.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[30rem] text-[clamp(1.02rem,0.95rem+0.3vw,1.2rem)] font-medium leading-relaxed text-ink-900/70 lg:mx-0">
            This page is not here. Grab the magnifier and find where to go next, or head straight home.
          </p>
          <div className="mt-8 flex justify-center lg:justify-start">
            <Link href="/" className="group inline-flex h-14 items-center gap-3 rounded-full bg-gold-500 pl-7 pr-2 text-[15px] font-bold text-ink-950 shadow-[0_18px_40px_-16px_rgba(244,180,0,0.9)] transition-colors hover:bg-gold-300 sm:h-16 sm:text-base">
              Back to home
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-950 text-gold-400 transition-transform duration-500 group-hover:-rotate-45 sm:h-12 sm:w-12" aria-hidden="true">
                <Icon name="arrow" className="h-5 w-5" strokeWidth={2.4} />
              </span>
            </Link>
          </div>
        </div>
        <NotFoundGame />
      </div>
    </main>
  );
}
