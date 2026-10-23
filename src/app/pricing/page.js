import CreativeHeading from '@/components/CreativeHeading';
import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/page/PageHero';
import CtaBand from '@/components/page/CtaBand';
import { PricingPlans, PricingTable } from '@/sections/Pricing';
import { OFFER, PRICING } from '@/content/site';
import { graph, pageNode, breadcrumbNode } from '@/lib/schema';

const { path } = PRICING;
const { title: TITLE, description: DESCRIPTION } = PRICING.seo;
const TRAIL = [{ name: 'Pricing', path }];

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: path },
  openGraph: { type: 'website', url: path, title: TITLE, description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

/*
 * /pricing: the three plans as cards, then every monthly limit side by side. The offers themselves are
 * on the sitewide SoftwareApplication node, built from the same PRICING data.
 */
export default function PricingPage() {
  const schema = graph(pageNode({ path, name: TITLE, description: DESCRIPTION }), breadcrumbNode(path, TRAIL));
  const [free, starter, pro] = PRICING.plans;

  return (
    <>
      <main id="main">
        <PageHero
          trail={TRAIL}
          eyebrow="3 plans · prices in US dollars"
          h1={[['JobHunter ', { mark: 'Pricing' }], ['Free, Starter and ', { grad: 'Pro Plans', swoosh: true }]]}
          tagline={`A ${free.name} plan, ${starter.name} at ${starter.price} a month and ${pro.name} at ${pro.price} a month. Every plan includes all four tools.`}
          lead={`JobHunter by SuperMIA has a ${free.name} plan and two paid plans: ${starter.name} at $${starter.price} a month and ${pro.name} at $${pro.price} a month. Every plan includes AI job search across LinkedIn, Indeed and Dice, ATS match scores, application email drafts and live voice [mock interviews](/features/ai-mock-interview). The plans differ in how much you can use each month.`}
          points={[`${free.name}: $0 to start`, `${starter.name}: $${starter.price} a month`, `${pro.name}: $${pro.price} a month`]}
        />

        <section aria-label="Plans" className="relative bg-white pb-8 pt-16 sm:pt-24">
          <div className="container-x">
            <PricingPlans headingLevel={2} />
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
            <p className="mt-4 max-w-3xl text-[17px] leading-relaxed text-ink-900/70">What each plan includes every month, from resume uploads to live voice mock interviews.</p>
            <div className="mt-8">
              <PricingTable />
            </div>
          </div>
        </section>

        <CtaBand h2={[['Start Free and ', { mark: 'Upgrade' }], ['When Your ', { grad: 'Search Grows', swoosh: true }]]} text="Try the full loop on a real job with the Free plan, then move to Starter or Pro when you need more." />
      </main>
      <JsonLd data={schema} />
    </>
  );
}
