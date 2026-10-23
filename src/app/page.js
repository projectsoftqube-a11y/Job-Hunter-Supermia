import Preloader from '@/components/Preloader';
import StickyCta from '@/components/StickyCta';
import DemoPopup from '@/components/DemoPopup';
import Hero from '@/sections/Hero';
import Problem from '@/sections/Problem';
import Demo from '@/sections/Demo';
import Features from '@/sections/Features';
import HowItWorks from '@/sections/HowItWorks';
import Interview from '@/sections/Interview';
import Results from '@/sections/Results';
import Community from '@/sections/Community';
import Trust from '@/sections/Trust';
import Pricing from '@/sections/Pricing';
import Brochure from '@/sections/Brochure';
import Faq from '@/sections/Faq';
import FinalCta from '@/sections/FinalCta';
import JsonLd from '@/components/JsonLd';
import { homeSchema } from '@/lib/schema';
import { SEO } from '@/content/site';

export const metadata = {
  title: { absolute: SEO.title },
  description: SEO.description,
  alternates: { canonical: '/' },
};

// Section order follows the homepage v2 content. The "Sample stories" testimonials are removed until
// real, consented stories exist (SEO Audit issue 4).
export default function Home() {
  return (
    <>
      <Preloader />
      <main id="main">
        <Hero />
        <Problem />
        <Demo />
        <Features />
        <HowItWorks />
        <Interview />
        <Results />
        <Community />
        <Trust />
        <Pricing />
        <Brochure />
        <Faq />
        <FinalCta />
      </main>
      <StickyCta />
      <DemoPopup />
      <JsonLd data={homeSchema} />
    </>
  );
}
