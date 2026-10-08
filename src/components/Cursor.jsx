'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

/**
 * Two-part cursor: a precise dot and a lagging ring.
 * The ring grows over links and buttons, and shows a label over elements with data-cursor="Label".
 * Hidden on touch devices (see globals.css) and when reduced motion is requested.
 */
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return undefined;

    document.documentElement.style.cursor = 'none';
    const dx = gsap.quickTo(dot.current, 'x', { duration: 0.12, ease: 'power3.out' });
    const dy = gsap.quickTo(dot.current, 'y', { duration: 0.12, ease: 'power3.out' });
    const rx = gsap.quickTo(ring.current, 'x', { duration: 0.5, ease: 'power3.out' });
    const ry = gsap.quickTo(ring.current, 'y', { duration: 0.5, ease: 'power3.out' });

    const move = (e) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };

    const over = (e) => {
      const target = e.target.closest('a, button, [data-cursor]');
      const text = target?.getAttribute('data-cursor') || '';
      label.current.textContent = text;
      gsap.to(ring.current, {
        scale: target ? (text ? 2.6 : 1.8) : 1,
        backgroundColor: text ? 'rgba(244,180,0,0.95)' : target ? 'rgba(244,180,0,0.18)' : 'rgba(244,180,0,0)',
        duration: 0.45,
        ease: 'expo.out',
      });
      gsap.to(label.current, { opacity: text ? 1 : 0, duration: 0.25 });
      gsap.to(dot.current, { scale: target ? 0 : 1, duration: 0.3 });
    };

    const leave = () => gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.3 });
    const enter = () => gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.3 });

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerover', over);
    document.addEventListener('pointerleave', leave);
    document.addEventListener('pointerenter', enter);
    gsap.set([dot.current, ring.current], { opacity: 1 });

    return () => {
      document.documentElement.style.cursor = '';
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      document.removeEventListener('pointerleave', leave);
      document.removeEventListener('pointerenter', enter);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
      <div
        ref={ring}
        className="cursor-dot absolute left-0 top-0 -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-full border border-gold-300 opacity-0"
      >
        <span ref={label} className="text-[5px] font-bold tracking-wide text-ink-900 opacity-0" />
      </div>
      <div ref={dot} className="cursor-dot absolute left-0 top-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-gold-300 opacity-0" />
    </div>
  );
}
