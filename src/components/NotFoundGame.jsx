'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';
import { Icon } from '@/components/icons';

/*
 * 404 mini-game: the pointer becomes a magnifier over a dark "search field". Six destinations are
 * hidden in the field and light up as found when the lens passes over them; a counter tracks progress
 * and "Reveal all" skips the hunt. On touch screens the lens wanders by itself. Every destination is a
 * real link that is always in the page, readable and focusable (focusing one also marks it found).
 * Motion is transform/opacity only; no React state changes while the pointer moves.
 */

const TARGETS = [
  { href: '/', label: 'Home', icon: 'arrow', x: 14, y: 24 },
  { href: '/features', label: 'Features', icon: 'layers', x: 72, y: 20 },
  { href: '/pricing', label: 'Pricing', icon: 'target', x: 44, y: 64 },
  { href: '/interview-questions', label: 'Interview questions', icon: 'question', x: 80, y: 70 },
  { href: '/blog', label: 'Blog', icon: 'book', x: 18, y: 76 },
  { href: '/faq', label: 'FAQ', icon: 'chat', x: 52, y: 30 },
];
const RADIUS = 95;
// Path the lens follows on touch screens (percent of the field)
const WANDER = [[14, 24], [52, 30], [72, 20], [80, 70], [44, 64], [18, 76], [30, 45]];

export default function NotFoundGame() {
  const field = useRef(null);
  const lens = useRef(null);
  const count = useRef(null);
  const done = useRef(null);

  useEffect(() => {
    const el = field.current;
    if (!el) return undefined;
    const items = [...el.querySelectorAll('[data-target]')];
    const found = new Set();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    const mark = (i) => {
      if (found.has(i)) return;
      found.add(i);
      items[i].setAttribute('data-found', '');
      if (!reduce) gsap.fromTo(items[i], { scale: 0.9 }, { scale: 1, duration: 0.6, ease: 'back.out(2.4)' });
      if (count.current) count.current.textContent = String(found.size);
      if (found.size === items.length && done.current) done.current.removeAttribute('hidden');
    };
    const revealAll = () => items.forEach((_, i) => mark(i));

    // Centres of the targets, relative to the field
    let centres = [];
    const measure = () => {
      const fr = el.getBoundingClientRect();
      centres = items.map((it) => {
        const r = it.getBoundingClientRect();
        return { x: r.left - fr.left + r.width / 2, y: r.top - fr.top + r.height / 2 };
      });
    };
    measure();
    const check = (x, y) => centres.forEach((c, i) => Math.hypot(c.x - x, c.y - y) < RADIUS && mark(i));

    const onFocus = (e) => {
      const i = items.indexOf(e.target.closest('[data-target]'));
      if (i >= 0) mark(i);
    };
    el.addEventListener('focusin', onFocus);
    const btn = el.parentElement.querySelector('[data-reveal]');
    btn?.addEventListener('click', revealAll);
    window.addEventListener('resize', measure);

    if (reduce) {
      revealAll();
      return () => {
        el.removeEventListener('focusin', onFocus);
        btn?.removeEventListener('click', revealAll);
        window.removeEventListener('resize', measure);
      };
    }

    const xTo = gsap.quickTo(lens.current, 'x', { duration: 0.35, ease: 'power3.out' });
    const yTo = gsap.quickTo(lens.current, 'y', { duration: 0.35, ease: 'power3.out' });
    let tl;
    const onMove = (e) => {
      const fr = el.getBoundingClientRect();
      const x = e.clientX - fr.left;
      const y = e.clientY - fr.top;
      xTo(x);
      yTo(y);
      check(x, y);
    };

    if (fine) {
      gsap.set(lens.current, { x: el.clientWidth * 0.3, y: el.clientHeight * 0.45, opacity: 1 });
      el.addEventListener('pointermove', onMove);
    } else {
      // Touch: the lens wanders the field on its own and finds things as it goes
      gsap.set(lens.current, { opacity: 1 });
      tl = gsap.timeline({ repeat: -1, defaults: { duration: 1.4, ease: 'sine.inOut' } });
      WANDER.forEach(([px, py]) => {
        tl.to(lens.current, {
          x: () => (el.clientWidth * px) / 100,
          y: () => (el.clientHeight * py) / 100,
          onUpdate: () => check(gsap.getProperty(lens.current, 'x'), gsap.getProperty(lens.current, 'y')),
        });
      });
    }

    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('focusin', onFocus);
      btn?.removeEventListener('click', revealAll);
      window.removeEventListener('resize', measure);
      tl?.kill();
    };
  }, []);

  return (
    <div className="min-w-0">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-[14px] font-bold text-ink-950">
          <Icon name="search" className="h-4 w-4 text-brand-600" />
          Found <span ref={count}>0</span> / {TARGETS.length}
        </p>
        <button type="button" data-reveal className="rounded-full bg-white px-4 py-2 text-[13px] font-bold text-brand-700 ring-1 ring-brand-200 transition-colors hover:bg-light-lavender">
          Reveal all
        </button>
      </div>

      <div ref={field} className="relative isolate h-[440px] cursor-none touch-pan-y overflow-hidden rounded-[30px] bg-brand-950 shadow-[0_60px_120px_-50px_rgba(26,15,51,0.9)] sm:h-[480px]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-[1] bg-[radial-gradient(50%_50%_at_30%_20%,rgba(124,92,214,0.35),transparent),radial-gradient(40%_40%_at_85%_85%,rgba(244,180,0,0.15),transparent)]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-[1] opacity-60"
          style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)', backgroundSize: '22px 22px' }}
        />
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 -z-[1] flex items-center justify-center font-display text-[clamp(8rem,5rem+14vw,15rem)] font-extrabold tracking-[-0.06em] text-white/[0.04]">
          404
        </span>

        {/* Hidden destinations: real links, dim until the lens finds them */}
        <ul className="absolute inset-0 grid grid-cols-2 content-center gap-2.5 p-4 sm:block sm:p-0">
          {TARGETS.map((t) => (
            <li key={t.href} data-target className="group min-w-0 sm:absolute sm:left-[var(--x)] sm:top-[var(--y)] sm:-translate-x-1/2 sm:-translate-y-1/2" style={{ '--x': `${t.x}%`, '--y': `${t.y}%` }}>
              <Link
                href={t.href}
                className="flex cursor-pointer items-center justify-center gap-2 rounded-full text-center sm:justify-start sm:whitespace-nowrap bg-white/[0.06] px-3.5 py-2 text-[13px] font-bold text-white/35 ring-1 ring-white/10 transition-[background-color,color,box-shadow] duration-500 group-data-[found]:bg-gold-400 group-data-[found]:text-ink-950 group-data-[found]:shadow-[0_0_0_6px_rgba(249,195,32,0.18),0_18px_40px_-14px_rgba(249,195,32,0.8)] group-data-[found]:ring-gold-300 sm:px-4 sm:text-[14px]"
              >
                <Icon name={t.icon} className="h-4 w-4" />
                {t.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* The magnifier */}
        <div ref={lens} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 z-[2] opacity-0">
          <div className="relative -ml-[60px] -mt-[60px] h-[120px] w-[120px] rounded-full border-[7px] border-gold-400 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.22),rgba(255,255,255,0.05)_60%,transparent_72%)] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)]">
            <span className="absolute -bottom-[34px] -right-[22px] h-[46px] w-[14px] origin-top -rotate-45 rounded-full bg-gold-400" />
            <span className="absolute left-[24%] top-[20%] h-3 w-3 rounded-full bg-white/60" />
          </div>
        </div>

        <p ref={done} hidden className="absolute inset-x-4 bottom-4 z-[3] rounded-2xl bg-white px-4 py-3 text-center text-[14px] font-bold text-ink-950 shadow-lg">
          You found them all. Now pick where your job hunt goes next.
        </p>
      </div>
      <p className="mt-3 text-center text-[13px] font-medium text-ink-900/55">Move the magnifier over the field to find your way back.</p>
    </div>
  );
}
