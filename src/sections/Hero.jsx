'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK, onIntroDone } from '@/lib/gsap';
import Button from '@/components/Button';
import { Waveform } from '@/components/mocks';
import { HERO, CHANNELS, APP_URL, OFFER } from '@/content/site';

/*
 * The bento tiles are product UI drawn in code. The jobs, people and emails inside them are
 * illustrative sample data, matching the mockups used further down the page.
 */
const SEARCH = 'Frontend Engineer · Austin, TX';
const JOBS = [
  { title: 'Senior Frontend Engineer', meta: 'Northwind Labs · Austin, TX', pay: '$145k - $170k', source: 'LinkedIn', score: 92 },
  { title: 'React Developer', meta: 'Brightpath Software · Remote', pay: '$120k - $140k', source: 'Indeed', score: 86 },
];
const QUESTIONS = [
  'Good. And how would you measure that the change actually worked?',
  'Tell me about a time you disagreed with a design decision.',
  'How would you make this page load twice as fast?',
];
const EMAIL = 'Hi Sarah, I am applying for the Senior Frontend Engineer role. I have spent six years building React and TypeScript products, most recently leading a design system used by four teams.';

/** Rounded photo capsule that sits inside the headline text */
function Pill({ src, className = '' }) {
  return (
    <span
      data-pill
      className={`group/pill relative mx-[0.12em] inline-block h-[0.8em] w-[1.85em] translate-y-[0.06em] overflow-hidden rounded-full align-baseline shadow-[0_18px_40px_-16px_rgba(26,15,51,0.55)] ring-[0.06em] ring-white ${className}`}
    >
      <Image src={src} alt="" fill sizes="(max-width: 768px) 30vw, 16vw" className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/pill:scale-[1.18]" />
    </span>
  );
}

function Faces({ className = '' }) {
  const faces = ['/images/hero-face-1.jpg', '/images/hero-face-2.jpg', '/images/hero-face-3.jpg'];
  return (
    <span data-pill className={`relative mx-[0.12em] inline-flex h-[0.8em] translate-y-[0.06em] items-center align-baseline ${className}`}>
      {faces.map((f, i) => (
        <span
          key={f}
          className="relative -ml-[0.2em] inline-block h-[0.8em] w-[0.8em] overflow-hidden rounded-full shadow-[0_12px_28px_-12px_rgba(26,15,51,0.6)] ring-[0.05em] ring-white first:ml-0"
          style={{ zIndex: 3 - i }}
        >
          <Image src={f} alt="" fill sizes="10vw" className="object-cover" />
        </span>
      ))}
    </span>
  );
}

/** Score ring whose arc and number are driven by the hero timeline */
function Ring({ value, size, stroke, tone = '#10b981', className = '' }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <span className={`relative inline-flex shrink-0 ${className}`} style={{ width: size, height: size }} role="img" aria-label={`${value}% match`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} className="stroke-brand-100" />
        <circle data-ring={value} data-c={c} cx={size / 2} cy={size / 2} r={r} fill="none" stroke={tone} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)} />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-display font-extrabold text-ink-950" style={{ fontSize: size * 0.27 }}>
        <span data-ring-num={value}>{value}</span>
        <span style={{ fontSize: size * 0.15 }}>%</span>
      </span>
    </span>
  );
}

function Source({ name }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-hairline bg-white px-1.5 py-0.5 text-[11px] font-bold text-ink-900">
      <Image src={`/logos/${name.toLowerCase()}.png`} alt="" width={14} height={14} className="h-3.5 w-3.5 object-contain" />
      {name}
    </span>
  );
}

/** Tile shell */
function Tile({ className = '', dark = false, children }) {
  return (
    <div data-tile className={`relative ${className}`}>
      <div
        className={`relative h-full overflow-hidden rounded-[26px] border ${
          dark ? 'border-white/10 bg-brand-950 text-white shadow-[0_30px_60px_-34px_rgba(26,15,51,0.8)]' : 'border-hairline bg-white text-ink-950 shadow-[0_24px_50px_-34px_rgba(26,15,51,0.45)]'
        }`}
      >
        <div data-tile-in className="relative h-full w-full">
          {children}
        </div>
      </div>
    </div>
  );
}

function Label({ n, children, dark = false }) {
  return (
    <span className={`flex items-center gap-2 text-xs font-bold ${dark ? 'text-brand-100' : 'text-ink-900/60'}`}>
      <span className={`flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 font-display text-[11px] ${dark ? 'bg-white/10 text-gold-400' : 'bg-brand-50 text-brand-600'}`}>{n}</span>
      {children}
    </span>
  );
}

export default function Hero() {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const search = q('[data-search]')[0];
        const question = q('[data-question]')[0];
        const email = q('[data-email]')[0];
        const send = q('[data-send]')[0];
        const loops = [];

        // Starting states (hidden behind the preloader sheet)
        gsap.set(q('[data-word]'), { yPercent: 115, rotate: 3 });
        gsap.set(q('[data-pill]'), { scale: 0, opacity: 0 });
        gsap.set(q('[data-fade]'), { y: 30, opacity: 0 });
        gsap.set(q('[data-marker]'), { scaleX: 0 });
        // Tiles start covered: the clip leaves room for the shadow once fully open
        const OPEN = 'inset(-80px -80px -80px -80px round 26px)';
        gsap.set(q('[data-tile]'), { clipPath: 'inset(100% -80px -80px -80px round 26px)' });
        gsap.set(q('[data-tile-in]'), { yPercent: 18 });
        gsap.set(q('[data-photo]'), { scale: 1.3 });
        gsap.set(q('[data-job]'), { x: 40, opacity: 0 });
        gsap.set(q('[data-chip]'), { scale: 0.6, opacity: 0 });
        q('[data-ring]').forEach((el) => gsap.set(el, { strokeDashoffset: Number(el.dataset.c) }));
        q('[data-ring-num]').forEach((el) => (el.textContent = '0'));
        search.textContent = '';
        email.textContent = '';

        const typeInto = (el, text, duration) => {
          const s = { n: 0 };
          return gsap.to(s, { n: text.length, duration, ease: 'none', onUpdate: () => (el.textContent = text.slice(0, Math.round(s.n))) });
        };

        const countRings = () => {
          const tl = gsap.timeline();
          const nums = q('[data-ring-num]');
          q('[data-ring]').forEach((el, i) => {
            const v = Number(el.dataset.ring);
            const c = Number(el.dataset.c);
            const num = nums[i];
            const s = { v: 0 };
            tl.to(el, { strokeDashoffset: c * (1 - v / 100), duration: 1.6, ease: 'expo.out' }, i * 0.12).to(
              s,
              { v, duration: 1.6, ease: 'expo.out', onUpdate: () => (num.textContent = Math.round(s.v)) },
              i * 0.12
            );
          });
          return tl;
        };

        // Interview questions rotate on their own
        const asking = () => {
          const tl = gsap.timeline({ repeat: -1 });
          QUESTIONS.forEach((text, i) => {
            const nextText = QUESTIONS[(i + 1) % QUESTIONS.length];
            tl.to(question, { opacity: 0, y: -8, duration: 0.35, ease: 'power2.in' }, '+=4')
              .add(() => (question.textContent = nextText))
              .fromTo(question, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out', immediateRender: false });
          });
          return tl;
        };

        // The email writes itself, sends, and starts again
        const mailing = () => {
          const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });
          tl.add(() => {
            email.textContent = '';
            send.dataset.state = 'idle';
          })
            .add(typeInto(email, EMAIL, 5))
            .to(send, { scale: 0.94, duration: 0.15, yoyo: true, repeat: 1 }, '+=0.5')
            .add(() => (send.dataset.state = 'sent'))
            .to({}, { duration: 2.2 })
            .to(email, { opacity: 0, duration: 0.4 })
            .set(email, { opacity: 1 });
          return tl;
        };

        const intro = gsap.timeline({ paused: true });
        intro
          .to(q('[data-word]'), { yPercent: 0, rotate: 0, stagger: 0.05, duration: 1.3, ease: 'expo.out' })
          .to(q('[data-pill]'), { scale: 1, opacity: 1, stagger: 0.12, duration: 1.2, ease: 'elastic.out(1, 0.7)' }, 0.4)
          .to(q('[data-marker]'), { scaleX: 1, duration: 1, ease: 'expo.inOut' }, 0.85)
          .to(q('[data-fade]'), { y: 0, opacity: 1, stagger: 0.07, duration: 1.1 }, 0.5);

        // Bento: each tile is uncovered from the bottom like a curtain while its content glides up
        // behind it, then the tile's own UI plays
        const drop = gsap.timeline({ paused: true });
        drop
          .to(q('[data-tile]'), { clipPath: OPEN, duration: 1.4, stagger: 0.12, ease: 'expo.inOut', clearProps: 'clipPath' })
          .to(q('[data-tile-in]'), { yPercent: 0, duration: 1.8, stagger: 0.12, ease: 'expo.out', clearProps: 'transform' }, 0.25)
          .to(q('[data-photo]'), { scale: 1, duration: 2.2, ease: 'expo.out' }, 0.2)
          .to(q('[data-chip]'), { scale: 1, opacity: 1, stagger: 0.15, duration: 0.9, ease: 'back.out(2)' }, 1.1)
          .add(typeInto(search, SEARCH, 1.1), 0.9)
          .to(q('[data-job]'), { x: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: 'expo.out' }, 1.8)
          .add(countRings(), 1.4)
          .add(() => {
            loops.push(asking(), mailing());
          }, 1.2);

        // Drop when the grid scrolls into view, but never before the intro has played
        let ready = false;
        let seen = false;
        const go = () => ready && seen && drop.play();
        ScrollTrigger.create({
          trigger: q('[data-bento]')[0],
          start: 'top 88%',
          once: true,
          onEnter: () => {
            seen = true;
            go();
          },
        });
        const off = onIntroDone(() => {
          intro.play();
          ready = true;
          gsap.delayedCall(0.6, go);
        });

        gsap.to(q('[data-copy]'), { yPercent: -12, opacity: 0.35, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: '60% top', scrub: true } });

        return () => {
          off();
          intro.kill();
          drop.kill();
          loops.forEach((l) => l.kill());
          search.textContent = SEARCH;
          email.textContent = EMAIL;
          question.textContent = QUESTIONS[0];
          gsap.set([question, email, send], { clearProps: 'all' });
          send.dataset.state = 'idle';
        };
      });
    },
    { scope: root }
  );

  const [l1, l2, l3] = HERO.lines; // 'Find the role.', 'Practice the interview.', 'Land the offer.'
  const words = (text, { mark } = {}) =>
    text.split(' ').map((w, i, all) => {
      const marked = mark && i === all.length - 1;
      return (
        <span key={`${w}${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <span data-word className="relative isolate inline-block">
            {marked && <span data-marker aria-hidden="true" className="absolute inset-x-[-0.06em] bottom-[0.08em] -z-[1] h-[0.26em] origin-left -skew-x-6 rounded-[0.06em] bg-gold-300" />}
            {w}
            {marked ? '' : ' '}
          </span>
        </span>
      );
    });

  return (
    <section id="top" ref={root} className="relative isolate overflow-hidden bg-gradient-to-b from-[#faf9ff] via-[#f6f3ff] to-light-lavender text-ink-950">
      {/* ------- Atmosphere (static, cheap to paint) ------- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-[1]">
        <div className="absolute inset-0 bg-[radial-gradient(60%_45%_at_15%_5%,rgba(196,179,234,0.55),transparent),radial-gradient(45%_40%_at_90%_15%,rgba(155,127,212,0.18),transparent),radial-gradient(55%_35%_at_50%_70%,rgba(252,211,77,0.2),transparent)]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(75,46,131,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(75,46,131,0.07) 1px, transparent 1px)',
            backgroundSize: '84px 84px',
            backgroundPosition: 'center top',
            maskImage: 'radial-gradient(ellipse 70% 50% at 50% 25%, black 15%, transparent 78%)',
          }}
        />
      </div>

      {/* ------- Copy ------- */}
      <div data-copy className="container-x relative z-[2] flex flex-col items-center pt-[clamp(7.5rem,15vh,10rem)] text-center">
        <p data-fade className="mb-7 inline-flex items-center gap-3 rounded-full border border-brand-200/80 bg-white/80 py-1.5 pl-1.5 pr-1.5 text-sm font-semibold text-brand-700 shadow-[0_10px_30px_-18px_rgba(75,46,131,0.5)] sm:pr-5">
          <span className="flex items-center gap-1.5 rounded-full bg-brand-950 px-3 py-1 text-xs font-bold text-white">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-gold-400/70" />
              <span className="relative h-2 w-2 rounded-full bg-gold-400" />
            </span>
            Live AI interviewer
          </span>
          <span className="hidden sm:inline">{HERO.eyebrow} for serious job seekers</span>
        </p>

        <h1 className="mx-auto font-display text-[clamp(2.25rem,1rem+4vw,6rem)] font-extrabold leading-[1.02] tracking-[-0.045em]">
          <span className="block">
            {words(l1.replace('.', ','))}
            <Pill src="/images/hero-pill-search.jpg" />
          </span>
          <span className="block text-brand-600">
            <Pill src="/images/hero-pill-practice.jpg" className="mr-[0.24em]" />
            {words(l2.replace('Practice', 'practice').replace('.', ','))}
          </span>
          <span className="block">
            {words(l3.replace('Land', 'land'), { mark: true })}
            <Faces className="ml-[0.32em]" />
          </span>
        </h1>

        <p data-fade className="mx-auto mt-7 max-w-[40rem] text-lead font-medium text-ink-900/70">
          {HERO.sub}
        </p>

        <div data-fade className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={APP_URL} magnetic={false}>
            {OFFER.ctaLong}
          </Button>
          <Button href="#features" variant="outline-dark" arrow={false} magnetic={false}>
            See how it works
          </Button>
        </div>

        <div data-fade className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-3 text-sm font-semibold text-ink-900/60">
          <span>One search across</span>
          {CHANNELS.map((c) => (
            <span key={c.name} className="flex items-center gap-2 rounded-full border border-hairline bg-white/80 px-3.5 py-1.5 font-bold text-ink-900 shadow-[0_6px_18px_-12px_rgba(26,15,51,0.45)]">
              <Image src={c.logo} alt="" width={16} height={16} className="h-4 w-4 object-contain" />
              {c.name}
            </span>
          ))}
        </div>
      </div>

      {/* ------- Bento ------- */}
      <div className="container-x relative z-[2] mt-10 pb-[60px] sm:mt-[clamp(3rem,7vh,5rem)] sm:pb-[clamp(4rem,10vh,7rem)]">
        <div data-bento className="mx-auto grid max-w-[1440px] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12 lg:grid-rows-[256px_256px] lg:gap-5">
          {/* Photo */}
          <Tile className="aspect-[4/5] sm:aspect-[4/3] md:row-span-2 md:aspect-auto lg:col-span-4 lg:row-span-2">
            <Image src="/images/hero-candidate.jpg" data-photo alt="Job seeker holding her laptop, ready for her next role" fill sizes="(max-width: 1024px) 100vw, 34vw" className="object-cover object-[50%_22%]" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-950/70 to-transparent" />
            <div data-chip className="absolute left-4 top-4 flex items-center gap-2.5 rounded-2xl bg-white p-2 pr-3.5 shadow-lg">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-950 font-display text-sm font-extrabold text-gold-400">7.8</span>
              <span className="text-left leading-tight">
                <span className="block text-[11px] font-bold text-brand-600">Interview readiness</span>
                <span className="block text-sm font-bold text-ink-950">Ready for round two</span>
              </span>
            </div>
            <div data-chip className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-2xl bg-gold-400 px-4 py-3 text-ink-950 shadow-lg">
              <span className="flex items-center gap-2 text-sm font-bold">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="h-4 w-4" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
                Application email ready
              </span>
              <span className="rounded-full bg-ink-950 px-2.5 py-1 text-[11px] font-bold text-gold-300">Send</span>
            </div>
          </Tile>

          {/* Find: search and matches */}
          <Tile className="lg:col-span-5">
            <div className="flex h-full flex-col p-5">
              <div className="flex items-center justify-between">
                <Label n="01">Find the role</Label>
                <span className="rounded-full bg-gold-100 px-2.5 py-1 text-[11px] font-bold text-gold-800">64 matches</span>
              </div>
              <div className="mt-3 flex items-center gap-2 rounded-xl border border-hairline bg-light-lavender px-3 py-2.5 text-left text-[13px] font-semibold text-ink-900">
                <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-brand-500" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" strokeLinecap="round" />
                </svg>
                <span data-search className="truncate">
                  {SEARCH}
                </span>
                <span className="-ml-1.5 h-4 w-[2px] animate-pulse bg-brand-500" aria-hidden="true" />
              </div>
              <ul className="mt-3 flex flex-1 flex-col justify-between gap-2">
                {JOBS.map((j) => (
                  <li key={j.title} data-job className="flex items-center gap-3 rounded-2xl border border-hairline bg-white px-3 py-2 text-left">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 font-display text-base font-extrabold text-brand-600">{j.meta[0]}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold text-ink-950">{j.title}</span>
                      <span className="mt-0.5 flex flex-wrap items-center gap-1.5">
                        <Source name={j.source} />
                        <span className="truncate text-[11px] font-semibold text-emerald-700">{j.pay}</span>
                      </span>
                    </span>
                    <Ring value={j.score} size={44} stroke={4.5} />
                  </li>
                ))}
              </ul>
            </div>
          </Tile>

          {/* Practice: live interview */}
          <Tile dark className="md:col-span-2 lg:col-span-3 lg:row-span-2">
            <div className="flex h-full flex-col p-5 text-left">
              <div className="flex items-center justify-between">
                <Label n="02" dark>
                  Practice
                </Label>
                <span className="flex items-center gap-1.5 rounded-full bg-rose-500 px-2.5 py-1 text-[11px] font-bold">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                  Live
                </span>
              </div>
              <div className="mt-5 flex items-center gap-3">
                <span className="relative flex h-12 w-12 items-center justify-center">
                  <span className="absolute inset-0 animate-pulse-ring rounded-full bg-gold-400/40" />
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-300 to-brand-600 font-display text-sm font-extrabold">AI</span>
                </span>
                <span>
                  <span className="block text-sm font-bold">AI interviewer</span>
                  <span className="block text-xs font-medium text-brand-100">Role & knowledge round</span>
                </span>
              </div>
              <div className="mt-4 h-16">
                <Waveform bars={30} />
              </div>
              <p data-question className="mt-4 min-h-[4.5em] rounded-2xl rounded-tl-md bg-white px-4 py-3 text-[13px] font-medium leading-relaxed text-ink-950">
                {QUESTIONS[0]}
              </p>
              <p className="mt-2.5 rounded-2xl border border-gold-400/40 bg-gold-500/15 px-3.5 py-2.5 text-xs font-semibold leading-relaxed text-gold-100">
                <span className="text-gold-300">Hint:</span> mention a metric, like load time before and after.
              </p>
              <div className="mt-auto flex items-center justify-between pt-4 text-xs font-semibold text-brand-100">
                <span>Question 3 of 8</span>
                <span className="flex gap-1">
                  {Array.from({ length: 8 }, (_, i) => (
                    <span key={i} className={`h-1.5 w-3 rounded-full ${i < 3 ? 'bg-gold-400' : 'bg-white/15'}`} />
                  ))}
                </span>
              </div>
            </div>
          </Tile>

          {/* Resume match */}
          <Tile className="lg:col-span-2">
            <div className="flex h-full flex-col items-center justify-center gap-3 p-5 text-center">
              <Ring value={92} size={112} stroke={9} tone="#6d4cb0" />
              <span>
                <span className="block text-sm font-bold text-ink-950">Resume match</span>
                <span className="block text-xs font-medium text-ink-900/60">Tailored to the job</span>
              </span>
            </div>
          </Tile>

          {/* Land: application email */}
          <Tile className="md:col-span-2 lg:col-span-3">
            <div className="flex h-full flex-col p-5 text-left">
              <div className="flex items-center justify-between">
                <Label n="03">Land the offer</Label>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">AI email</span>
              </div>
              <p className="mt-3 truncate text-xs font-semibold text-ink-900/60">
                To <span className="font-mono text-ink-950">careers@northwindlabs.com</span>
              </p>
              <p className="mt-2 line-clamp-4 min-h-[5.6em] flex-1 text-[13px] font-medium leading-snug text-ink-900">
                <span data-email>{EMAIL}</span>
                <span className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-0.5 animate-pulse bg-brand-500" aria-hidden="true" />
              </p>
              <span
                data-send
                data-state="idle"
                className="group mt-3 flex items-center justify-center gap-2 self-start rounded-full bg-brand-600 px-4 py-2 text-xs font-bold text-white transition-colors duration-300 data-[state=sent]:bg-emerald-600"
              >
                <span className="group-data-[state=sent]:hidden">Send application</span>
                <span className="hidden group-data-[state=sent]:inline">Sent ✓</span>
              </span>
            </div>
          </Tile>
        </div>
      </div>
    </section>
  );
}
