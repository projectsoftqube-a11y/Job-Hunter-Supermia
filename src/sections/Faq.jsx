import Link from 'next/link';
import { FadeUp } from '@/components/Reveal';
import Button from '@/components/Button';
import Rich from '@/components/Rich';
import CreativeHeading from '@/components/CreativeHeading';
import FaqList from '@/components/page/FaqList';
import { FAQS, FAQ_PREVIEW, APP_URL, OFFER } from '@/content/site';

/*
 * Homepage FAQ preview: five questions, every answer in the server HTML (details/summary accordion).
 * No FAQPage markup here: the full FAQ and its schema live on /faq (SEO Audit section 9).
 */
export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="relative bg-light-lavender pb-6 pt-[60px] sm:pb-10 sm:pt-28 lg:pb-12 lg:pt-32">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <p className="mb-5 text-sm font-bold text-brand-600">Questions</p>
            <CreativeHeading
              id="faq-title"
              className="font-display text-display font-extrabold text-ink-900"
              lines={[
                [{ mark: 'JobHunter' }],
                [{ grad: 'FAQs', swoosh: true }, ' ', { chip: 'chat' }],
              ]}
            />
            <p className="mt-6 text-lead font-medium text-ink-800">
              <Rich text={FAQ_PREVIEW.sub} />
            </p>
            <div className="mt-8 flex flex-col items-start gap-4">
              <Button href={APP_URL} variant="ink">
                {OFFER.ctaLong}
              </Button>
              <Link href="/faq" className="text-[15px] font-bold text-brand-600 underline decoration-brand-200 decoration-2 underline-offset-4 hover:decoration-brand-600">
                See all JobHunter questions
              </Link>
            </div>
          </div>
        </div>

        <FadeUp className="lg:col-span-8" y={40}>
          <FaqList items={FAQS} idPrefix="home-faq" />
        </FadeUp>
      </div>
    </section>
  );
}
