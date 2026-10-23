'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';

/** Fades and lifts its children into place, optionally staggering direct children. */
export function FadeUp({ children, className = '', y = 60, delay = 0, stagger = 0, start = 'top 88%', as: Tag = 'div' }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const targets = stagger ? ref.current.children : ref.current;
        gsap.from(targets, {
          y,
          opacity: 0,
          delay,
          stagger,
          duration: 1.2,
          scrollTrigger: { trigger: ref.current, start, once: true },
        });
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
