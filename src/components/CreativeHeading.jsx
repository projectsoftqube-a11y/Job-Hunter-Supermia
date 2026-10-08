'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';

/**
 * Section heading with the page's signature accents. `lines` is an array of lines; each line is an
 * array of parts:
 *   'plain text'
 *   { mark: 'word' }               gold marker swipe behind the word
 *   { grad: 'word', swoosh: true } gradient word, optionally with a hand-drawn underline
 *   { outline: 'word' }            outlined word
 *   { chip: 'mic', eq: true }      inline icon pill, optionally with live equaliser bars or a `label`
 * Lines rise out of masks, then the marker, chip and underline land in turn. The markup is the final
 * state, so without motion (or JavaScript) the heading simply shows. Chips are decorative only.
 */

const TONES = {
  light: {
    mark: 'bg-gold-300',
    grad: 'from-brand-600 via-brand-500 to-gold-500',
    chip: 'bg-brand-950 text-gold-400 shadow-[0_14px_30px_-12px_rgba(26,15,51,0.6)]',
    eq: 'bg-gold-400',
    outline: '[-webkit-text-stroke:0.035em_var(--color-brand-600)]',
    swoosh: 'text-gold-400',
  },
  dark: {
    mark: 'bg-brand-500',
    grad: 'from-gold-300 via-gold-400 to-brand-300',
    chip: 'bg-gold-400 text-ink-950 shadow-[0_14px_30px_-12px_rgba(0,0,0,0.6)]',
    eq: 'bg-ink-950',
    outline: '[-webkit-text-stroke:0.035em_rgba(255,255,255,0.75)]',
    swoosh: 'text-gold-400',
  },
};

const ICONS = {
  mic: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
    </>
  ),
  play: <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.6-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" fill="currentColor" />,
  doc: <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h4" />,
  spark: <path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z" fill="currentColor" />,
  check: <path d="M4 12.5l5 5L20 6.5" />,
  chat: <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.9A8 8 0 1 1 21 12zM8.5 12h.01M12 12h.01M15.5 12h.01" />,
  users: <path d="M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20M10 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM20 20v-1.5a3.5 3.5 0 0 0-2.6-3.4M15.5 4.6a3.5 3.5 0 0 1 0 6.8" />,
  book: <path d="M12 6.5C10 5 7.5 4.5 4 4.5v14c3.5 0 6 .5 8 2 2-1.5 4.5-2 8-2v-14c-3.5 0-6 .5-8 2zM12 6.5v14" />,
  search: <path d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4" />,
};

function Chip({ icon, eq, label, tone }) {
  const t = TONES[tone];
  return (
    <span data-ch-chip aria-hidden="true" className={`mx-[0.06em] inline-flex h-[0.78em] -translate-y-[0.06em] items-center gap-[0.06em] rounded-full px-[0.2em] align-middle ${t.chip}`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="h-[0.38em] w-[0.38em]">
        {ICONS[icon]}
      </svg>
      {eq && (
        <span className="flex h-[0.36em] items-center gap-[0.035em]">
          {[0.55, 1, 0.7, 0.9, 0.45].map((h, i) => (
            <span key={i} className={`w-[0.05em] origin-center animate-[eq_1.1s_ease-in-out_infinite] rounded-full ${t.eq}`} style={{ height: `${h * 100}%`, animationDelay: `${i * -0.18}s` }} />
          ))}
        </span>
      )}
      {label && <span className="pr-[0.04em] font-display text-[0.3em] font-extrabold tracking-normal">{label}</span>}
    </span>
  );
}

function Part({ part, tone }) {
  const t = TONES[tone];
  if (typeof part === 'string') return part;
  if (part.chip) return <Chip icon={part.chip} eq={part.eq} label={part.label} tone={tone} />;
  if (part.mark)
    return (
      <span className="relative isolate inline-block">
        {part.mark}
        <span data-ch-mark aria-hidden="true" className={`absolute inset-x-[-0.06em] bottom-[0.1em] -z-[1] h-[0.3em] origin-left -skew-x-6 rounded-[0.06em] ${t.mark}`} />
      </span>
    );
  if (part.outline) return <span className={`text-transparent ${t.outline}`}>{part.outline}</span>;
  if (part.grad)
    return (
      <span className={`relative inline-block bg-gradient-to-r bg-clip-text pr-[0.04em] text-transparent ${t.grad}`}>
        {part.grad}
        {part.swoosh && (
          <svg viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true" className={`absolute left-0 top-[88%] h-[0.2em] w-[92%] overflow-visible ${t.swoosh}`}>
            <path data-ch-swoosh d="M4 17C70 7 160 4 296 13" pathLength="1" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
          </svg>
        )}
      </span>
    );
  return null;
}

export default function CreativeHeading({ as: Tag = 'h2', id, lines, tone = 'light', className = '', start = 'top 85%' }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ scrollTrigger: { trigger: ref.current, start, once: true } })
          .from(q('[data-ch-line]'), { yPercent: 110, rotation: 2, stagger: 0.12, duration: 1.2, ease: 'expo.out' })
          .from(q('[data-ch-mark]'), { scaleX: 0, stagger: 0.1, duration: 0.8, ease: 'expo.inOut' }, 0.55)
          .from(q('[data-ch-chip]'), { scale: 0, rotation: -40, stagger: 0.1, duration: 0.8, ease: 'back.out(2.2)' }, 0.7)
          .fromTo(q('[data-ch-swoosh]'), { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, stagger: 0.1, duration: 0.9, ease: 'power2.inOut' }, 0.9);
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} id={id} className={className}>
      {lines.map((parts, i) => {
        const underlined = parts.some((p) => p?.swoosh);
        return (
          <span key={i} className={`block overflow-hidden ${underlined ? '-mb-[0.22em] pb-[0.3em]' : 'pb-[0.08em]'}`}>
            <span data-ch-line className="inline-block">
              {parts.map((p, j) => (
                <Part key={j} part={p} tone={tone} />
              ))}
            </span>
          </span>
        );
      })}
    </Tag>
  );
}
