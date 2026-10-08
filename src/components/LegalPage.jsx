'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';
import { APP_URL, OFFER } from '@/content/site';
import Footer from '@/sections/Footer';

/** Renders a body block: a paragraph string, or { list: [...] } for a bulleted list. */
function Block({ b }) {
  if (typeof b === 'string') return <p>{b}</p>;
  return (
    <ul className="space-y-2.5">
      {b.list.map((li) => (
        <li key={li} className="flex gap-3">
          <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
          <span>{li}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Shared layout for the legal pages: a light hero with a plain-words summary, a sticky contents rail
 * that tracks the section you are reading, numbered sections, and a contact card.
 */
export default function LegalPage({ eyebrow, title, intro, updated, summary, sections, contact, other }) {
  const root = useRef(null);
  const [active, setActive] = useState(sections[0].id);

  // Highlight the section currently in view
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        const seen = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (seen[0]) setActive(seen[0].target.id);
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(q('[data-hero] > *'), { y: 40, opacity: 0, stagger: 0.08, duration: 1.2, ease: 'expo.out' });
        gsap.from(q('[data-summary]'), { y: 60, opacity: 0, duration: 1.3, delay: 0.3, ease: 'expo.out' });
        gsap.fromTo(q('[data-progress]'), { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: q('[data-body]')[0], start: 'top 30%', end: 'bottom 70%', scrub: 0.4 } });
        q('[data-section]').forEach((el) => {
          gsap.from(el, { y: 40, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
        });
      });
    },
    { scope: root }
  );

  return (
    <>
      <div ref={root} id="top" className="relative bg-[#faf9ff] text-ink-950">
        {/* Header */}
        <header className="container-x absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-4 pt-6 sm:pt-8">
          <Link href="/" aria-label="Job Hunter home" className="flex items-center rounded-2xl bg-white px-3 py-2 shadow-[0_10px_30px_-18px_rgba(75,46,131,0.5)] ring-1 ring-brand-100">
            <Image src="/brand/logo.png" alt="Job Hunter" width={2172} height={724} className="h-9 w-auto" />
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/" className="hidden rounded-full px-4 py-2.5 text-sm font-semibold text-ink-900 transition-colors hover:text-brand-600 sm:block">
              ← Back to home
            </Link>
            <a href={APP_URL} className="inline-flex h-11 items-center rounded-full bg-gold-500 px-5 text-sm font-bold text-ink-950 transition-colors hover:bg-gold-300">
              {OFFER.cta}
            </a>
          </div>
        </header>

        {/* Hero */}
        <section className="relative overflow-hidden pb-16 pt-36 sm:pt-44">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_55%_at_15%_10%,rgba(196,179,234,0.55),transparent),radial-gradient(35%_45%_at_90%_30%,rgba(252,211,77,0.18),transparent)]" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: 'linear-gradient(rgba(75,46,131,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(75,46,131,0.07) 1px, transparent 1px)',
              backgroundSize: '84px 84px',
              maskImage: 'radial-gradient(ellipse 60% 70% at 30% 20%, black 10%, transparent 75%)',
            }}
          />
          <div className="container-x relative grid gap-10 lg:grid-cols-12 lg:items-end">
            <div data-hero className="lg:col-span-7">
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                {eyebrow}
              </p>
              <h1 className="font-display text-[clamp(2.75rem,1.5rem+5vw,7rem)] font-extrabold leading-[0.98] tracking-[-0.045em]">{title}</h1>
              <p className="mt-6 max-w-[40rem] text-lead font-medium text-ink-900/65">{intro}</p>
              <p className="mt-6 flex flex-wrap items-center gap-3 text-sm font-semibold text-ink-900/55">
                <span className="rounded-full bg-white px-3 py-1.5 ring-1 ring-brand-100">Last updated {updated}</span>
                <span className="rounded-full bg-white px-3 py-1.5 ring-1 ring-brand-100">{sections.length} sections</span>
                <Link href={other.href} className="rounded-full bg-white px-3 py-1.5 text-brand-600 ring-1 ring-brand-100 transition-colors hover:bg-brand-50">
                  Read the {other.label} →
                </Link>
              </p>
            </div>

            {/* Plain-words summary */}
            <aside data-summary className="relative overflow-hidden rounded-[32px] bg-brand-950 p-7 text-white shadow-[0_50px_100px_-45px_rgba(26,15,51,0.85)] sm:p-9 lg:col-span-5">
              <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,rgba(244,180,0,0.3),transparent)]" />
              <p className="relative text-xs font-bold uppercase tracking-[0.16em] text-gold-300">In plain words</p>
              <ul className="relative mt-5 space-y-4">
                {summary.map((s) => (
                  <li key={s} className="flex gap-3 text-[15px] font-medium leading-relaxed text-white/85">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-400 text-xs font-bold text-ink-950">✓</span>
                    {s}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        {/* Body */}
        <div data-body className="container-x relative grid gap-12 pb-48 pt-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-20 xl:grid-cols-[340px_minmax(0,1fr)]">
          {/* Contents */}
          <nav aria-label="On this page" className="lg:sticky lg:top-8 lg:h-fit">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-ink-900/45">On this page</p>
            <div className="relative">
              <span aria-hidden="true" className="absolute bottom-1 left-[11px] top-1 hidden w-[2px] rounded-full bg-brand-100 lg:block">
                <span data-progress className="block h-full w-full origin-top rounded-full bg-gradient-to-b from-gold-400 to-brand-500" />
              </span>
              <ol className="grid gap-1 sm:grid-cols-2 lg:grid-cols-1">
                {sections.map((s, i) => {
                  const on = active === s.id;
                  return (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className={`relative flex items-center gap-3 rounded-xl py-2 pl-0 pr-3 text-sm font-semibold transition-colors ${on ? 'text-brand-700' : 'text-ink-900/55 hover:text-ink-950'}`}
                      >
                        <span
                          className={`relative z-[1] flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-display text-[10px] font-bold transition-colors ${on ? 'bg-gold-400 text-ink-950' : 'bg-white text-ink-900/50 ring-1 ring-brand-100'}`}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {s.title}
                      </a>
                    </li>
                  );
                })}
              </ol>
            </div>
          </nav>

          {/* Sections */}
          <article className="min-w-0">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} data-section className="scroll-mt-10 border-t border-ink-900/10 py-10 first:border-t-0 first:pt-0 lg:py-14">
                <div className="grid gap-4 xl:grid-cols-[120px_minmax(0,1fr)]">
                  <span className="font-display text-[clamp(2.5rem,1.8rem+2vw,4rem)] font-extrabold leading-none tracking-[-0.05em] text-brand-200">{String(i + 1).padStart(2, '0')}</span>
                  <div className="max-w-[52rem]">
                    <h2 className="font-display text-[clamp(1.5rem,1.1rem+1.2vw,2.4rem)] font-extrabold leading-tight tracking-[-0.03em]">{s.title}</h2>
                    <div className="mt-5 space-y-4 text-[17px] font-medium leading-[1.75] text-ink-900/75">
                      {s.body.map((b, j) => (
                        <Block key={j} b={b} />
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            ))}

            {/* Contact */}
            <div className="mt-6 grid overflow-hidden rounded-[32px] bg-white shadow-[0_40px_80px_-45px_rgba(26,15,51,0.45)] ring-1 ring-brand-100 md:grid-cols-[1.2fr_1fr]">
              <div className="p-7 sm:p-10">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">Questions?</p>
                <h2 className="mt-3 font-display text-[clamp(1.5rem,1.1rem+1.2vw,2.4rem)] font-extrabold leading-tight tracking-[-0.03em]">{contact}</h2>
                <a href="mailto:hello@supermia.ai" className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-brand-600 px-6 font-bold text-white transition-colors hover:bg-brand-800">
                  hello@supermia.ai →
                </a>
              </div>
              <div className="bg-brand-950 p-7 text-white sm:p-10">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-300">Office</p>
                <p className="mt-3 font-display text-lg font-bold">Botfinity Inc.</p>
                <p className="mt-1 text-[15px] font-medium leading-relaxed text-white/75">
                  2451 W Grapevine Mills Cir #547
                  <br />
                  Grapevine, TX 76051
                </p>
                <a href="https://supermia.ai" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-bold text-gold-300 hover:text-gold-200">
                  supermia.ai ↗
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
      <Footer />
    </>
  );
}
