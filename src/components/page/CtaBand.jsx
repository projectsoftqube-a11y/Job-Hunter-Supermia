import Link from 'next/link';
import CreativeHeading from '@/components/CreativeHeading';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { APP_URL, OFFER } from '@/content/site';

/**
 * Closing call to action on inner pages: light band (so it reads apart from the dark footer) with the page's final H2, one line of copy, the
 * primary button, an optional secondary link and the control promise. Extra bottom padding leaves room
 * for the footer, which rises over the last section.
 */
export default function CtaBand({ h2, text, secondary = { label: OFFER.demo, href: '/#demo' }, note = 'Nothing is applied or sent without you.' }) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-white via-[#f8f6ff] to-light-lavender pb-40 pt-20 text-ink-950 sm:pb-56 sm:pt-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-[1]">
        <div className="absolute inset-0 bg-[radial-gradient(45%_55%_at_50%_0%,rgba(196,179,234,0.55),transparent),radial-gradient(30%_40%_at_88%_70%,rgba(252,211,77,0.22),transparent),radial-gradient(30%_40%_at_10%_75%,rgba(196,179,234,0.4),transparent)]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(75,46,131,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(75,46,131,0.06) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(ellipse 60% 70% at 50% 40%, black 10%, transparent 75%)',
          }}
        />
      </div>
      <div className="container-x relative z-[2] text-center">
        <CreativeHeading lines={h2} className="mx-auto max-w-5xl font-display text-display font-extrabold text-ink-950" />
        {text && (
          <p className="mx-auto mt-6 max-w-2xl text-lead font-medium text-ink-900/70">
            <Rich text={text} />
          </p>
        )}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href={APP_URL} className="group relative isolate inline-flex h-16 items-center gap-3 overflow-hidden rounded-full bg-gold-500 pl-8 pr-2 text-base font-bold text-ink-950 transition-colors duration-500 hover:text-white shadow-[0_20px_50px_-18px_rgba(244,180,0,0.9)]">
            <span aria-hidden="true" className="absolute inset-0 -z-10 translate-y-full rounded-full bg-brand-950 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0" />
            {OFFER.ctaLong}
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink-950 text-gold-400 transition-colors duration-500 group-hover:bg-gold-400 group-hover:text-ink-950" aria-hidden="true">
              <Icon name="arrow" className="h-5 w-5" strokeWidth={2.4} />
            </span>
          </a>
          {secondary &&
            (secondary.href.startsWith('/') && !secondary.href.endsWith('.pdf') ? (
              <Link href={secondary.href} className="inline-flex h-16 items-center rounded-full border border-ink-900/15 bg-white/70 px-7 font-semibold text-ink-950 transition-colors hover:border-brand-300 hover:bg-white">
                {secondary.label}
              </Link>
            ) : (
              <a href={secondary.href} className="inline-flex h-16 items-center rounded-full border border-ink-900/15 bg-white/70 px-7 font-semibold text-ink-950 transition-colors hover:border-brand-300 hover:bg-white">
                {secondary.label}
              </a>
            ))}
        </div>
        {note && (
          <p className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-ink-900/55">
            <Icon name="shield" className="h-4 w-4 text-brand-500" />
            {note}
          </p>
        )}
      </div>
    </section>
  );
}
