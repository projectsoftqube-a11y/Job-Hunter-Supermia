import CreativeHeading from '@/components/CreativeHeading';
import Rich from '@/components/Rich';
import PageHero from '@/components/page/PageHero';
import ContentSections from '@/components/page/ContentSections';
import { STORIES } from '@/components/stories';
import FaqList from '@/components/page/FaqList';
import CtaBand from '@/components/page/CtaBand';
import RelatedCards from '@/components/page/RelatedCards';

/*
 * Template for the feature, audience and resource pages (content modules in src/content/pages).
 * Order: hero (H1) → the page's own story (its H2 sections, src/components/stories) → visible FAQ (no
 * FAQPage markup here) → related pages → closing CTA.
 */

export default function ContentPage({ page, trail }) {
  const { hero, sections = [], faqs, cta, related } = page;
  const Story = STORIES[page.slug] || ContentSections;
  return (
    <main id="main">
      <PageHero trail={trail} eyebrow={hero.eyebrow} h1={hero.h1} tagline={hero.tagline} compact={hero.compact} lead={hero.lead} points={hero.points} visual={hero.visual} />

      <Story page={page} />

      {faqs?.items?.length > 0 && (
        <section id="faqs" aria-labelledby="faqs-title" className={`relative scroll-mt-24 py-20 sm:py-28 ${sections.length % 2 === 0 ? 'bg-white' : 'bg-light-lavender'}`}>
          <div className="container-x grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="min-w-0 lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-brand-500">Questions</p>
                <CreativeHeading id="faqs-title" lines={faqs.h2} className="font-display text-[clamp(1.85rem,1.2rem+1.9vw,2.9rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-ink-950" />
                {faqs.intro && (
                  <p className="mt-5 text-lead font-medium text-ink-900/70">
                    <Rich text={faqs.intro} />
                  </p>
                )}
                <p className="mt-5 text-[15px] font-medium text-ink-900/60">
                  <Rich text="More answers on the [JobHunter FAQ page](/faq)." />
                </p>
              </div>
            </div>
            <div className="min-w-0 lg:col-span-7">
              <FaqList items={faqs.items} idPrefix={`${page.slug}-faq`} />
            </div>
          </div>
        </section>
      )}

      <RelatedCards items={related} />

      {cta && <CtaBand h2={cta.h2} text={cta.text} secondary={cta.secondary} />}
    </main>
  );
}
