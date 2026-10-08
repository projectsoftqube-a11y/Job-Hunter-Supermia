import Preloader from '@/components/Preloader';
import Nav from '@/components/Nav';
import StickyCta from '@/components/StickyCta';
import Hero from '@/sections/Hero';
import Problem from '@/sections/Problem';
import Features from '@/sections/Features';
import HowItWorks from '@/sections/HowItWorks';
import Interview from '@/sections/Interview';
import Results from '@/sections/Results';
import Testimonials from '@/sections/Testimonials';
import Community from '@/sections/Community';
import Brochure from '@/sections/Brochure';
import Faq from '@/sections/Faq';
import FinalCta from '@/sections/FinalCta';
import Footer from '@/sections/Footer';

export default function Home() {
  return (
    <>
      <Preloader />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[95] focus:rounded-full focus:bg-gold-500 focus:px-5 focus:py-3 focus:font-semibold focus:text-ink-900">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Problem />
        <Features />
        <HowItWorks />
        <Interview />
        <Results />
        <Testimonials />
        <Community />
        <Brochure />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
