'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap, SplitText, useGSAP, MOTION_OK } from '@/lib/gsap';

/**
 * Heading whose lines slide up from behind a mask when scrolled into view.
 * Text stays fully visible without JavaScript or with reduced motion.
 */
export function SplitHeading({ as: Tag = 'h2', children, className = '', start = 'top 85%', stagger = 0.08, ...rest }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create(ref.current, {
          type: 'lines',
          mask: 'lines',
          linesClass: 'split-line',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              rotate: 2,
              stagger,
              duration: 1.2,
              scrollTrigger: { trigger: ref.current, start, once: true },
            }),
        });
        return () => split.revert();
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}

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

/**
 * Image that is revealed by an expanding clip mask, then drifts slower than the page (parallax).
 */
export function ParallaxImage({ src, alt, className = '', imgClassName = '', sizes = '100vw', strength = 12, reveal = true, preload = false, position = 'center' }) {
  const wrap = useRef(null);
  const img = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          img.current,
          { yPercent: -strength },
          { yPercent: strength, ease: 'none', scrollTrigger: { trigger: wrap.current, start: 'top bottom', end: 'bottom top', scrub: true } }
        );
        if (reveal) {
          gsap.from(wrap.current, {
            clipPath: 'inset(18% 12% 18% 12% round 32px)',
            duration: 1.6,
            ease: 'expo.out',
            scrollTrigger: { trigger: wrap.current, start: 'top 85%', once: true },
          });
        }
      });
    },
    { scope: wrap }
  );

  return (
    <div ref={wrap} className={`relative overflow-hidden ${className}`} style={{ clipPath: 'inset(0% 0% 0% 0% round 0px)' }}>
      <div ref={img} className="absolute inset-x-0 -inset-y-[14%]">
        <Image src={src} alt={alt} fill sizes={sizes} preload={preload} className={`object-cover ${imgClassName}`} style={{ objectPosition: position }} />
      </div>
    </div>
  );
}
