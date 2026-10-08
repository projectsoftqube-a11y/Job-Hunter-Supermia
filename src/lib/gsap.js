'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  gsap.defaults({ ease: 'expo.out', duration: 1.1 });
}

// Animations only run when the visitor has not asked for reduced motion
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';

// Fired by the preloader once the intro curtain has lifted
export const INTRO_EVENT = 'jh:intro-done';

export function onIntroDone(callback) {
  if (typeof window === 'undefined') return () => {};
  if (window.__jhIntroDone) {
    callback();
    return () => {};
  }
  window.addEventListener(INTRO_EVENT, callback, { once: true });
  return () => window.removeEventListener(INTRO_EVENT, callback);
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
