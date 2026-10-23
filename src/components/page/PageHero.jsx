import Link from 'next/link';
import CreativeHeading from '@/components/CreativeHeading';
import { FadeUp } from '@/components/Reveal';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import HeroStage from '@/components/page/HeroStage';
import MockFrame from '@/components/page/MockFrame';
import { APP_URL, OFFER } from '@/content/site';

/**
 * Inner page hero, kept light and centred like the homepage: eyebrow, the page's one H1 (the target
 * keyword), one short tagline and the two actions. Under the stage, an overview card carries the full
 * answer-first lead, the proof points and the product mock, so everything search engines read is still
 * on the page. (No visible breadcrumb; the BreadcrumbList stays in each page's JSON-LD.)
 */
export default function PageHero({ eyebrow, h1, tagline, compact = false, lead, points = [], visual, secondary = { label: OFFER.demo, href: '/#demo' } }) {
  const size = compact ? 'text-[clamp(1.95rem,1.2rem+2.4vw,3.6rem)]' : 'text-[clamp(2.1rem,1.3rem+3vw,4.3rem)]';
  const short = tagline || lead;
  const intro = tagline && lead;
  const overview = intro || points.length > 0 || visual;

  return (
    <>
      <HeroStage tiles>
        <div className="mx-auto max-w-[62rem] pt-4 text-center sm:pt-8">
          {eyebrow && (
            <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-gold-300 ring-1 ring-white/10">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              {eyebrow}
            </p>
          )}
          <CreativeHeading as="h1" lines={h1} tone="dark" className={`font-display ${size} font-extrabold leading-[1.05] tracking-[-0.035em] text-white`} start="top 100%" />
          <FadeUp y={30} delay={0.2}>
            <p className="mx-auto mt-6 max-w-[38rem] text-[clamp(1.05rem,0.98rem+0.3vw,1.25rem)] font-medium leading-relaxed text-white/75">
              <Rich text={short} tone="dark" />
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href={APP_URL} className="group relative isolate inline-flex h-14 items-center gap-3 overflow-hidden rounded-full bg-gold-500 pl-7 pr-2 text-[15px] font-bold text-ink-950 shadow-[0_18px_40px_-16px_rgba(244,180,0,0.9)] sm:h-16 sm:text-base">
                <span aria-hidden="true" className="absolute inset-0 -z-10 translate-y-full rounded-full bg-white transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0" />
                {OFFER.ctaLong}
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-950 text-gold-400 transition-transform duration-500 group-hover:-rotate-45 sm:h-12 sm:w-12" aria-hidden="true">
                  <Icon name="arrow" className="h-5 w-5" strokeWidth={2.4} />
                </span>
              </a>
              {secondary && (
                <Link href={secondary.href} className="group inline-flex h-14 items-center gap-3 rounded-full py-2 pl-2 pr-6 text-[15px] font-bold text-white ring-1 ring-white/20 transition-colors hover:bg-white/[0.08] sm:h-16">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-700 transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12" aria-hidden="true">
                    <Icon name="play" className="ml-0.5 h-4 w-4" />
                  </span>
                  {secondary.label}
                </Link>
              )}
            </div>
          </FadeUp>
        </div>
      </HeroStage>

      {/* Overview: the answer-first lead, the proof points and the product mock, right under the stage */}
      {overview && (
        <section aria-label="Overview" className="relative bg-white pb-2 pt-12 sm:pt-16">
          <div className="container-x">
            <div className={`grid items-center gap-8 rounded-[28px] border border-hairline bg-[#faf9ff] p-6 sm:p-9 lg:gap-14 lg:p-10 ${visual ? 'lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]' : ''}`}>
              <div className={`grid min-w-0 gap-8 ${!visual && intro && points.length > 0 ? 'lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-12' : ''}`}>
                {intro && (
                  <div className="min-w-0">
                    <p className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em] text-brand-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                      In short
                    </p>
                    <p className="mt-3 max-w-[50rem] text-[clamp(1rem,0.95rem+0.25vw,1.13rem)] leading-[1.75] text-ink-900/75">
                      <Rich text={lead} />
                    </p>
                  </div>
                )}
                {points.length > 0 && (
                  <div className={`min-w-0 ${intro ? `border-t border-hairline pt-7 ${visual ? '' : 'lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0'}` : ''}`}>
                    <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-ink-900/45">At a glance</p>
                    <ul className="mt-3 space-y-3">
                      {points.map((p) => (
                        <li key={p} className="flex items-start gap-3 text-[15px] font-semibold leading-snug text-ink-950">
                          <span aria-hidden="true" className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-400 text-ink-950">
                            <Icon name="check" className="h-3 w-3" strokeWidth={3.2} />
                          </span>
                          {p}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-5 flex items-center gap-2 text-[13px] font-semibold text-ink-900/50">
                      <Icon name="shield" className="h-4 w-4 text-brand-500" />
                      {OFFER.control}
                    </p>
                  </div>
                )}
              </div>
              {visual && (
                <FadeUp y={40} className="min-w-0">
                  <MockFrame name={visual} />
                </FadeUp>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
