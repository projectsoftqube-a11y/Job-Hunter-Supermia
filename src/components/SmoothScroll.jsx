'use client';

import { useEffect, useRef } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

function ScrollTriggerSync() {
  // Keep every ScrollTrigger in step with Lenis' smoothed scroll position
  useLenis(ScrollTrigger.update);
  return null;
}

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Drive Lenis from GSAP's ticker so scroll and animations share one frame loop
    const update = (time) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) lenisRef.current?.lenis?.destroy();

    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{ autoRaf: false, lerp: 0.1, wheelMultiplier: 1, anchors: { offset: -80 } }}
    >
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
