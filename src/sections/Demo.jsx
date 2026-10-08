'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';
import { FadeUp } from '@/components/Reveal';
import Button from '@/components/Button';
import { DEMO, APP_URL, OFFER } from '@/content/site';
import CreativeHeading from '@/components/CreativeHeading';

/*
 * Product reel in a phone frame with a chapter list beside it. The video loads nothing until it scrolls
 * into view, then plays muted and loops; it pauses when it leaves the screen. Chapters light up as the
 * reel plays and jump to their moment when clicked. The first "Play with sound" restarts the reel so
 * the voiceover is heard from the top. Captions are burned into the video. A ?t=<seconds> query starts
 * the reel at that moment (used by the key-moment links in the VideoObject structured data).
 */

const { chapters } = DEMO;

const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

const chapterAt = (t) => {
  let i = 0;
  chapters.forEach((c, j) => {
    if (t >= c.start) i = j;
  });
  return i;
};

const chapterEnd = (i) => (i < chapters.length - 1 ? chapters[i + 1].start : DEMO.seconds);

function Icon({ name, className = 'h-5 w-5' }) {
  const paths = {
    play: <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.6-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" fill="currentColor" stroke="none" />,
    pause: (
      <>
        <rect x="6.5" y="5" width="4" height="14" rx="1.2" fill="currentColor" stroke="none" />
        <rect x="13.5" y="5" width="4" height="14" rx="1.2" fill="currentColor" stroke="none" />
      </>
    ),
    muted: (
      <>
        <path d="M11 5 6 9H3v6h3l5 4V5z" fill="currentColor" />
        <path d="m22 9-6 6M16 9l6 6" />
      </>
    ),
    sound: (
      <>
        <path d="M11 5 6 9H3v6h3l5 4V5z" fill="currentColor" />
        <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      {paths[name]}
    </svg>
  );
}

export default function Demo() {
  const root = useRef(null);
  const video = useRef(null);
  const bar = useRef(null);
  const clock = useRef(null);
  const fills = useRef([]);
  const userPaused = useRef(false);
  const heardSound = useRef(false);
  const startAt = useRef(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const play = useCallback(() => {
    const v = video.current;
    if (!v) return;
    v.play().catch(() => setPlaying(false));
  }, []);

  // Paint the progress bars straight to the DOM, so playback never re-renders the section
  const paint = useCallback(() => {
    const v = video.current;
    if (!v) return;
    const t = v.currentTime;
    const i = chapterAt(t);
    setActive((prev) => (prev === i ? prev : i));
    if (bar.current) bar.current.style.transform = `scaleX(${Math.min(1, t / DEMO.seconds)})`;
    if (clock.current) clock.current.textContent = fmt(t);
    fills.current.forEach((el, j) => {
      if (!el) return;
      const c = chapters[j];
      const p = j < i ? 1 : j > i ? 0 : (t - c.start) / (chapterEnd(j) - c.start);
      el.style.transform = `scaleX(${Math.max(0, Math.min(1, p))})`;
    });
  }, []);

  useEffect(() => {
    if (!playing) return undefined;
    let raf = requestAnimationFrame(function loop() {
      paint();
      raf = requestAnimationFrame(loop);
    });
    return () => cancelAnimationFrame(raf);
  }, [playing, paint]);

  // Play while on screen, pause when it leaves. Nothing autoplays for visitors who asked for reduced motion.
  useEffect(() => {
    const v = video.current;
    const t = Number(new URLSearchParams(window.location.search).get('t'));
    if (t > 0 && t < DEMO.seconds) startAt.current = t;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!userPaused.current && (!reduce || startAt.current !== null)) play();
        } else if (!v.paused) {
          v.pause();
        }
      },
      { threshold: 0.45 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [play]);

  const toggle = () => {
    const v = video.current;
    if (v.paused) {
      userPaused.current = false;
      play();
    } else {
      userPaused.current = true;
      v.pause();
    }
  };

  const toggleSound = () => {
    const v = video.current;
    if (v.muted && !heardSound.current) {
      // First time with sound: start the voiceover from the top
      heardSound.current = true;
      v.currentTime = 0;
    }
    v.muted = !v.muted;
    userPaused.current = false;
    play();
  };

  const seek = (s) => {
    const v = video.current;
    if (v.readyState === 0) startAt.current = s;
    else v.currentTime = s;
    userPaused.current = false;
    play();
    paint();
  };

  const seekBar = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    seek(((e.clientX - r.left) / r.width) * DEMO.seconds);
  };

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(q('[data-phone]'), {
          y: 140,
          rotation: -7,
          scale: 0.86,
          opacity: 0,
          duration: 1.6,
          scrollTrigger: { trigger: q('[data-phone]')[0], start: 'top 92%', once: true },
        });
        gsap.fromTo(q('[data-glow]'), { yPercent: -12 }, { yPercent: 12, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
    },
    { scope: root }
  );

  return (
    <section id="demo" ref={root} aria-labelledby="demo-title" className="relative overflow-hidden bg-white py-[60px] sm:py-32 lg:py-40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_35%_at_85%_30%,rgba(196,179,234,0.4),transparent),radial-gradient(35%_30%_at_10%_85%,rgba(252,211,77,0.16),transparent)]" />

      {/* Mobile order: heading, phone, chapters. Desktop: heading and chapters on the left, phone on the right. */}
      <div className="container-x relative grid gap-y-12 lg:grid-cols-12 lg:grid-rows-[auto_auto] lg:gap-x-16 lg:gap-y-0 xl:gap-x-24">
        <div className="min-w-0 lg:col-span-7 lg:row-start-1 lg:self-end xl:col-span-6 xl:col-start-2">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
            {DEMO.label}
          </p>
          <CreativeHeading
            id="demo-title"
            className="font-display text-display font-extrabold text-ink-950"
            lines={[
              ['See ', { mark: 'JobHunter AI' }],
              ['work in ', { chip: 'play' }, ' ', { grad: '47 seconds.', swoosh: true }],
            ]}
          />
          <FadeUp>
            <p className="mt-6 max-w-[36rem] text-lead font-medium text-ink-900/65">{DEMO.sub}</p>
          </FadeUp>
        </div>

        <div className="min-w-0 lg:col-span-7 lg:row-start-2 lg:self-start xl:col-span-6 xl:col-start-2">
          <h3 className="sr-only">Video chapters</h3>
          <FadeUp as="ol" stagger={0.06} className="space-y-1.5 lg:mt-10">
            {chapters.map((c, i) => {
              const on = active === i;
              return (
                <li key={c.start}>
                  <button
                    type="button"
                    onClick={() => seek(c.start)}
                    aria-current={on ? 'step' : undefined}
                    className={`group relative w-full overflow-hidden rounded-2xl px-4 py-3 text-left transition-colors duration-300 sm:px-5 ${on ? 'bg-white shadow-[0_20px_40px_-24px_rgba(26,15,51,0.45)] ring-1 ring-brand-200' : 'hover:bg-brand-50/70'}`}
                  >
                    <span className="flex items-baseline gap-4">
                      <span className={`w-9 shrink-0 font-mono text-xs font-bold tabular-nums ${on ? 'text-gold-700' : 'text-ink-900/40'}`}>{fmt(c.start)}</span>
                      <span className="min-w-0">
                        <span className={`block font-display text-[clamp(1rem,0.9rem+0.4vw,1.25rem)] font-bold tracking-[-0.02em] ${on ? 'text-ink-950' : 'text-ink-900/60 group-hover:text-ink-900/80'}`}>{c.title}</span>
                        <span className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out-expo ${on ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                          <span className="overflow-hidden">
                            <span className="block pt-1 text-[15px] font-medium leading-snug text-ink-900/60">{c.body}</span>
                          </span>
                        </span>
                      </span>
                    </span>
                    <span aria-hidden="true" className={`absolute inset-x-5 bottom-0 h-[3px] overflow-hidden rounded-full ${on ? 'bg-brand-100' : 'bg-transparent'}`}>
                      <span
                        ref={(el) => {
                          fills.current[i] = el;
                        }}
                        className="block h-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-brand-500 to-gold-400" />
                    </span>
                  </button>
                </li>
              );
            })}
          </FadeUp>

          <FadeUp className="mt-10">
            <Button href={APP_URL} variant="ink">
              {OFFER.ctaLong}
            </Button>
          </FadeUp>
        </div>

        {/* Phone */}
        <div className="relative row-start-2 flex justify-center lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:self-center xl:col-span-4 xl:col-start-8">
          <div data-glow aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[140%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(109,76,176,0.35),transparent)]" />
          <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[min(120%,640px)] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border-2 border-dashed border-brand-200/80" />

          <div data-phone className="relative w-[min(78vw,400px,max(44svh,250px))]">
            <div className="rounded-[clamp(30px,4vw,48px)] bg-brand-950 p-[clamp(7px,0.9vw,11px)] shadow-[0_60px_100px_-40px_rgba(26,15,51,0.75),inset_0_0_0_1.5px_rgba(255,255,255,0.12)]">
              <div className="relative aspect-[9/16] overflow-hidden rounded-[clamp(24px,3.3vw,38px)] bg-brand-900">
                <video
                  ref={video}
                  className="absolute inset-0 h-full w-full cursor-pointer object-cover"
                  poster={DEMO.poster}
                  width={720}
                  height={1280}
                  preload="none"
                  muted
                  loop={muted}
                  playsInline
                  aria-label={DEMO.name}
                  onClick={toggle}
                  onPlay={() => setPlaying(true)}
                  onPause={() => {
                    setPlaying(false);
                    paint();
                  }}
                  onEnded={() => {
                    setPlaying(false);
                    paint();
                  }}
                  onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
                  onLoadedMetadata={(e) => {
                    if (startAt.current === null) return;
                    e.currentTarget.currentTime = startAt.current;
                    startAt.current = null;
                  }}
                  onSeeked={paint}
                >
                  <source src={DEMO.src} type="video/mp4" />
                  Your browser does not play this video. <a href={DEMO.src}>Download the JobHunter AI demo</a>.
                </video>

                {/* Big play button while paused */}
                <button
                  type="button"
                  onClick={toggle}
                  tabIndex={playing ? -1 : 0}
                  aria-label="Play the demo"
                  className={`absolute inset-0 flex items-center justify-center bg-brand-950/25 transition-opacity duration-500 ${playing ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
                >
                  <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gold-500 text-ink-950 shadow-[0_20px_40px_-12px_rgba(26,15,51,0.6)]">
                    <span className="absolute inset-0 animate-pulse-ring rounded-full bg-gold-400/50" />
                    <Icon name="play" className="relative ml-1 h-8 w-8" />
                  </span>
                </button>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-5 flex items-center gap-3 rounded-full bg-white/90 p-1.5 pr-4 shadow-[0_20px_40px_-24px_rgba(26,15,51,0.5)] ring-1 ring-hairline backdrop-blur">
              <button type="button" onClick={toggle} aria-label={playing ? 'Pause the demo' : 'Play the demo'} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white transition-colors hover:bg-brand-800">
                <Icon name={playing ? 'pause' : 'play'} className="h-4 w-4" />
              </button>
              <div aria-hidden="true" onClick={seekBar} className="relative h-6 min-w-0 flex-1 cursor-pointer">
                <span className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 overflow-hidden rounded-full bg-brand-100">
                  <span ref={bar} className="block h-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-brand-500 to-gold-400" />
                </span>
                {chapters.slice(1).map((c) => (
                  <span key={c.start} className="absolute top-1/2 h-3 w-[2px] -translate-y-1/2 rounded-full bg-white" style={{ left: `${(c.start / DEMO.seconds) * 100}%` }} />
                ))}
              </div>
              <span className="shrink-0 font-mono text-xs font-bold tabular-nums text-ink-900/55">
                <span ref={clock}>0:00</span> / {fmt(DEMO.seconds)}
              </span>
              <button
                type="button"
                onClick={toggleSound}
                aria-pressed={!muted}
                aria-label={muted ? 'Play with sound' : 'Mute'}
                className={`flex h-10 shrink-0 items-center gap-2 rounded-full px-3 text-xs font-bold transition-colors ${muted ? 'bg-gold-500 text-ink-950 hover:bg-gold-300' : 'bg-brand-50 text-brand-700 hover:bg-brand-100'}`}
              >
                <Icon name={muted ? 'muted' : 'sound'} className="h-4 w-4" />
                <span className="hidden sm:inline">{muted ? 'Sound on' : 'Mute'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
