'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { Icon } from '@/components/icons';

/*
 * "Slide to choose" button. Drag the knob to the end of the track: past 80% it snaps home, the knob pops
 * into a check, the label changes and the app opens. Let go early and it springs back. It is still a
 * real link underneath, so crawlers, keyboards and a plain tap all work: a tap or Enter plays the slide
 * for you, then follows the link.
 */
const TONES = {
  dark: {
    track: 'bg-white/[0.08] ring-1 ring-white/15',
    fill: 'bg-gradient-to-r from-gold-500/30 to-gold-400',
    knob: 'bg-gold-400 text-ink-950 shadow-[0_8px_24px_-8px_rgba(244,180,0,0.9)]',
    text: 'text-white',
    shine: 'from-white/55 via-white to-white/55',
    chevron: 'text-gold-300',
    done: 'text-ink-950',
  },
  light: {
    track: 'bg-light-lavender ring-1 ring-brand-100',
    fill: 'bg-gradient-to-r from-brand-500/25 to-brand-700',
    knob: 'bg-brand-950 text-gold-400 shadow-[0_8px_24px_-10px_rgba(26,15,51,0.9)]',
    text: 'text-ink-950',
    shine: 'from-ink-950/55 via-ink-950 to-ink-950/55',
    chevron: 'text-brand-500',
    done: 'text-white',
  },
};

export default function SlideCta({ href, label, tone = 'light', className = '' }) {
  const t = TONES[tone];
  const track = useRef(null);
  const knob = useRef(null);
  const fill = useRef(null);
  const hint = useRef(null);
  const drag = useRef({ active: false, startX: 0, x: 0, max: 0, moved: false });
  const [done, setDone] = useState(false);

  const measure = () => {
    const tr = track.current.getBoundingClientRect();
    const kn = knob.current.getBoundingClientRect();
    return tr.width - kn.width - 12; // 6px inset each side
  };

  const render = (x, max) => {
    gsap.set(knob.current, { x });
    gsap.set(fill.current, { width: x + knob.current.offsetWidth + 6 });
    gsap.set(hint.current, { opacity: Math.max(0, 1 - (x / max) * 1.6) });
  };

  const complete = () => {
    if (done) return;
    setDone(true);
    const max = measure();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    gsap
      .timeline({ onComplete: () => window.location.assign(href) })
      .to(knob.current, { x: max, duration: reduce ? 0 : 0.45, ease: 'power3.out' }, 0)
      .to(fill.current, { width: '100%', duration: reduce ? 0 : 0.45, ease: 'power3.out' }, 0)
      .to(hint.current, { opacity: 0, duration: 0.2 }, 0)
      .fromTo(knob.current, { scale: 1 }, { scale: 1.18, duration: reduce ? 0 : 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }, reduce ? 0 : 0.42)
      .to({}, { duration: reduce ? 0.1 : 0.45 });
  };

  // Coming back with the browser's back button restores the page from cache: reset the slider
  useEffect(() => {
    const onShow = (e) => {
      if (!e.persisted) return;
      setDone(false);
      gsap.set([knob.current, fill.current, hint.current], { clearProps: 'all' });
    };
    window.addEventListener('pageshow', onShow);
    return () => window.removeEventListener('pageshow', onShow);
  }, []);

  const onDown = (e) => {
    if (done) return;
    drag.current = { active: true, startX: e.clientX, x: 0, max: measure(), moved: false };
    knob.current.setPointerCapture(e.pointerId);
    gsap.killTweensOf([knob.current, fill.current, hint.current]);
  };
  const onMove = (e) => {
    const d = drag.current;
    if (!d.active) return;
    const x = Math.min(d.max, Math.max(0, e.clientX - d.startX));
    if (Math.abs(x) > 4) d.moved = true;
    d.x = x;
    render(x, d.max);
  };
  const onUp = () => {
    const d = drag.current;
    if (!d.active) return;
    d.active = false;
    if (d.x > d.max * 0.8) {
      complete();
      return;
    }
    const knobW = knob.current.offsetWidth;
    gsap.to(knob.current, { x: 0, duration: 0.6, ease: 'elastic.out(1, 0.6)' });
    gsap.to(fill.current, { width: knobW + 6, duration: 0.6, ease: 'elastic.out(1, 0.6)' });
    gsap.to(hint.current, { opacity: 1, duration: 0.3 });
  };

  const onClick = (e) => {
    e.preventDefault();
    if (drag.current.moved) {
      drag.current.moved = false;
      return;
    }
    complete();
  };

  return (
    <a ref={track} href={href} onClick={onClick} draggable={false} onDragStart={(e) => e.preventDefault()} className={`group relative isolate flex h-16 shrink-0 select-none items-center overflow-hidden rounded-full [-webkit-user-drag:none] ${t.track} ${className}`}>
      {/* Fill that follows the knob */}
      <span ref={fill} aria-hidden="true" className={`absolute inset-y-1.5 left-1.5 -z-[1] w-[52px] rounded-full ${t.fill}`} />

      {/* Label with a shine and chevrons pointing the way */}
      <span ref={hint} className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2 pl-14 pr-4">
        <span className={`bg-gradient-to-r ${t.shine} bg-[length:200%_100%] bg-clip-text text-[15px] font-bold text-transparent motion-safe:animate-[shine_2.6s_linear_infinite]`}>{label}</span>
        <span aria-hidden="true" className={`flex ${t.chevron}`}>
          {[0, 1, 2].map((i) => (
            <svg key={i} viewBox="0 0 24 24" className="-ml-1.5 h-4 w-4 motion-safe:animate-[nudge_1.4s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.15}s` }} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 6 6 6-6 6" />
            </svg>
          ))}
        </span>
      </span>

      {/* Success label */}
      <span aria-live="polite" className={`pointer-events-none absolute inset-0 flex items-center justify-center pr-12 text-[15px] font-bold transition-opacity duration-300 ${t.done} ${done ? 'opacity-100 delay-200' : 'opacity-0'}`}>
        {done ? 'Opening the app…' : ''}
      </span>

      {/* Knob */}
      <span
        ref={knob}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        aria-hidden="true"
        className={`absolute left-1.5 top-1.5 flex h-[52px] w-[52px] cursor-grab touch-none items-center justify-center rounded-full active:cursor-grabbing ${t.knob}`}
      >
        <Icon name={done ? 'check' : 'arrow'} className="h-5 w-5" strokeWidth={done ? 3 : 2.4} />
      </span>
    </a>
  );
}
