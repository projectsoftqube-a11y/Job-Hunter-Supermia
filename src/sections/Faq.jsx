'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SplitHeading, FadeUp } from '@/components/Reveal';
import Button from '@/components/Button';
import { FAQS, APP_URL, OFFER } from '@/content/site';

const ease = [0.16, 1, 0.3, 1];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" aria-labelledby="faq-title" className="relative bg-light-lavender py-[60px] sm:py-32 lg:py-40">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <p className="mb-5 text-sm font-bold text-brand-600">Questions</p>
            <SplitHeading id="faq-title" className="font-display text-display font-extrabold text-ink-900">
              Good to know.
            </SplitHeading>
            <p className="mt-6 text-lead font-medium text-ink-800">Still deciding? Start with one search and one practice round.</p>
            <div className="mt-8">
              <Button href={APP_URL} variant="ink">
                {OFFER.ctaLong}
              </Button>
            </div>
          </div>
        </div>

        <FadeUp as="ul" className="space-y-3 lg:col-span-8" stagger={0.08}>
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className={`overflow-hidden rounded-3xl border transition-colors duration-500 ${isOpen ? 'border-brand-200 bg-white' : 'border-hairline bg-white/60 hover:bg-white'}`}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left sm:px-8"
                  >
                    <span className="font-display text-[clamp(1.0625rem,1rem+0.4vw,1.375rem)] font-bold text-ink-900">{item.q}</span>
                    <span
                      aria-hidden="true"
                      className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-500 ${isOpen ? 'bg-gold-500 text-ink-900' : 'bg-brand-600 text-white'}`}
                    >
                      <span className="absolute h-[2px] w-4 rounded bg-current" />
                      <span className={`absolute h-4 w-[2px] rounded bg-current transition-transform duration-500 ${isOpen ? 'rotate-90 scale-y-0' : ''}`} />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.55, ease }}
                    >
                      <p className="max-w-3xl px-6 pb-7 text-base font-medium leading-relaxed text-ink-800 sm:px-8 sm:text-[17px]">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </FadeUp>
      </div>
    </section>
  );
}
