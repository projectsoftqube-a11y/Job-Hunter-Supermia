'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { APP_URL, OFFER } from '@/content/site';

/** Phone-only call to action that slides up once the hero is out of view, and steps aside for the closing call to action. */
export default function StickyCta() {
  const [show, setShow] = useState(false);
  const finale = useRef(null);
  const story = useRef(null);

  useEffect(() => {
    finale.current = document.querySelector('[aria-labelledby="cta-title"]');
    story.current = document.querySelector('[aria-labelledby="problem-title"]');
  }, []);

  useLenis(({ scroll }) => {
    const h = window.innerHeight;
    // Hide once the closing section (with its own buttons) starts entering the screen
    const reachedFinale = finale.current ? finale.current.getBoundingClientRect().top < h : false;
    // Also step aside while the full-screen problem story is pinned, since its plan card has its own button
    const s = story.current?.getBoundingClientRect();
    const inStory = s ? s.top <= 1 && s.bottom >= h - 1 : false;
    const next = scroll > h * 0.9 && !reachedFinale && !inStory;
    setShow((v) => (v === next ? v : next));
  });

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: '120%' }}
          animate={{ y: 0 }}
          exit={{ y: '120%' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 p-3 md:hidden"
        >
          <a
            href={APP_URL}
            className="flex h-14 w-full items-center justify-between rounded-full bg-gold-500 pl-6 pr-2 font-semibold text-ink-900 shadow-[0_18px_40px_-12px_rgba(26,15,51,0.7)]"
          >
            {OFFER.ctaLong}
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-900 text-gold-400" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
