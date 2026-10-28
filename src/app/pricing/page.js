import CreativeHeading from '@/components/CreativeHeading';
import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/page/PageHero';
import CtaBand from '@/components/page/CtaBand';
import FaqList from '@/components/page/FaqList';
import { PricingPlans, PricingTable } from '@/sections/Pricing';
import { OFFER, PRICING, OG_BASE } from '@/content/site';
import { getBillingPlans } from '@/lib/billing';
import { freePlan, listNames, offerPhrase, paidPlans, pricePhrase, pricingDescription, pricingFaqs, pricingTitle } from '@/lib/pricing';
import { graph, pageNode, breadcrumbNode, faqNode, offerCatalogNode } from '@/lib/schema';

const { path } = PRICING;
const TRAIL = [{ name: 'Pricing', path }];

export async function generateMetadata() {
  const plans = await getBillingPlans();
  const title = pricingTitle(plans);
  const description = pricingDescription(plans);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: { ...OG_BASE, type: 'website', url: path, title, description },
    twitter: { card: 'summary_large_image', title, description },
  };
}

/*
 * /pricing: the plans as cards, then every limit side by side. The plans come from the billing API; the
 * offers themselves are on the sitewide SoftwareApplication node, and the page's OfferCatalog, FAQPage
 * and every sentence naming a plan or price are built from the same plans the cards render.
 */
export default async function PricingPage() {
  const plans = await getBillingPlans();
  const title = pricingTitle(plans);
  const faqs = pricingFaqs(plans);
  const free = freePlan(plans);
  const paid = paidPlans(plans);
  const names = plans.map((p) => p.name);

  const schema = graph(
    pageNode({ path, name: title, description: pricingDescription(plans), extra: { mainEntity: { '@id': offerCatalogNode(plans)['@id'] } } }),
    breadcrumbNode(path, TRAIL),
    offerCatalogNode(plans),
    faqNode(path, faqs)
  );

  return (
    <>
      <main id="main">
        <PageHero
          trail={TRAIL}
          eyebrow={`${plans.length} plans · prices in US dollars`}
          h1={[['JobHunter ', { mark: 'Pricing' }], [names.length > 1 ? `${names.slice(0, -1).join(', ')} and ` : '', { grad: `${names[names.length - 1]} Plans`, swoosh: true }]]}
          tagline={`${plans.map((p) => `${p.name} at ${pricePhrase(p)}`).join(', ')}. Every plan includes all four tools.`}
          lead={`JobHunter by SuperMIA has ${offerPhrase(plans)}. Every plan includes [all four features](/features): AI job search across LinkedIn, Indeed and Dice, ATS match scores, application email drafts and live voice [mock interviews](/features/ai-mock-interview). The plans differ in how much you can use.`}
          points={plans.map((p) => `${p.name}: ${pricePhrase(p)}`)}
        />

        <section aria-label="Plans" className="relative bg-white pb-8 pt-16 sm:pt-24">
          <div className="container-x">
            <PricingPlans plans={plans} headingLevel={2} />
            <p className="mt-10 text-center text-[14px] font-semibold text-ink-900/60">{OFFER.control}</p>
          </div>
        </section>

        <section aria-labelledby="compare-title" className="relative bg-white py-16 sm:py-24">
          <div className="container-x">
            <CreativeHeading
              id="compare-title"
              lines={[['Compare ', { mark: 'Every Limit' }]]}
              className="font-display text-[clamp(1.9rem,1.3rem+2vw,3.2rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink-950"
            />
            <p className="mt-4 max-w-3xl text-[17px] leading-relaxed text-ink-900/70">What each plan includes, from resume uploads to live voice mock interviews.</p>
            <div className="mt-8">
              <PricingTable plans={plans} />
            </div>
          </div>
        </section>

        <section aria-labelledby="pricing-faq-title" className="relative bg-light-lavender py-16 sm:py-24">
          <div className="container-x grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="min-w-0 lg:col-span-5">
              <CreativeHeading
                id="pricing-faq-title"
                lines={[['JobHunter Pricing ', { mark: 'FAQs' }]]}
                className="font-display text-[clamp(1.85rem,1.2rem+1.9vw,2.9rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-ink-950"
              />
              <p className="mt-5 text-lead font-medium text-ink-900/70">Short answers about the plans. More on the FAQ page.</p>
            </div>
            <div className="min-w-0 lg:col-span-7">
              <FaqList items={faqs} idPrefix="pricing-faq" />
            </div>
          </div>
        </section>

        <CtaBand
          h2={[['Start Free and ', { mark: 'Upgrade' }], ['When Your ', { grad: 'Search Grows', swoosh: true }]]}
          text={`Try the full loop on a real job${free ? ` with the ${free.name} plan` : ''}, then move to ${listNames(paid.map((p) => p.name), 'or')} when you need more.`}
        />
      </main>
      <JsonLd data={schema} />
    </>
  );
}
