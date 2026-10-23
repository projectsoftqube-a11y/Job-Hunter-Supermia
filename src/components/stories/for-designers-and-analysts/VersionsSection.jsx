'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { Block } from '@/components/page/Blocks';
import { RunningHead, Numeral, Title, Lead, Handoff, Avatar, jitter } from './shared';

/*
 * Chapter 03, "The iterations", the dark ink band. Each resume version is a specimen plate on its own
 * colour block with code-drawn cover art: a designer's mood board of swatches and a type specimen, a
 * research journey map, an analyst's dashboard whose line draws in, and a data-science scatter with its
 * fit line. Three plates carry Noa's folder tag (the roles that cleared the line in chapter 02); data
 * science, her real gap, waits. The email paragraph closes on a white slab with a draft she sends herself.
 * All art is decorative.
 */

const SWATCHES = [
  { c: 'bg-brand-600 text-white', hex: '#4B2E83' },
  { c: 'bg-brand-950 text-white', hex: '#1A0F33' },
  { c: 'bg-brand-200 text-ink-950', hex: '#DED5F5' },
  { c: 'bg-white text-ink-950', hex: '#FFFFFF' },
];

function MoodBoard() {
  return (
    <div className="grid h-full grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-2.5">
      <div className="grid grid-cols-2 grid-rows-2 gap-2.5">
        {SWATCHES.map((s) => (
          <span key={s.hex} data-art-pop className={`flex items-end rounded-2xl p-2 text-[10.5px] font-bold tracking-[0.04em] shadow-[0_10px_20px_-14px_rgba(0,0,0,0.6)] ${s.c}`}>
            {s.hex}
          </span>
        ))}
      </div>
      <div data-art-pop className="flex min-w-0 flex-col justify-between rounded-2xl bg-white p-3 text-ink-950 shadow-[0_10px_20px_-14px_rgba(0,0,0,0.6)] sm:p-4">
        <span className="flex items-start justify-between gap-2">
          <span className="font-display text-[clamp(3rem,2rem+3vw,4.8rem)] font-extrabold leading-[0.8] tracking-[-0.05em]">Aa</span>
          <span className="text-right text-[10.5px] font-bold leading-tight text-ink-900/50">
            Display
            <br />
            72 / 80
          </span>
        </span>
        <span className="mt-2 block">
          <span className="block font-display text-[13px] font-bold tracking-[-0.01em] sm:text-[15px]">Aa Bb Cc 0123</span>
          <span className="mt-2 flex flex-wrap items-center gap-1.5">
            <span className="rounded-full bg-brand-950 px-2.5 py-1 text-[10.5px] font-bold text-gold-300">Primary</span>
            <span className="hidden rounded-full px-2.5 py-1 text-[10.5px] font-bold text-brand-600 ring-1 ring-brand-300 sm:inline">Ghost</span>
            <span className="relative h-4 w-7 rounded-full bg-brand-600">
              <span className="absolute right-0.5 top-0.5 h-3 w-3 rounded-full bg-white" />
            </span>
          </span>
        </span>
      </div>
    </div>
  );
}

const JOURNEY = [
  { x: 20, y: 70, t: 'Discover' },
  { x: 110, y: 40, t: 'Try' },
  { x: 200, y: 112, t: 'Stuck' },
  { x: 290, y: 66, t: 'Fix' },
  { x: 380, y: 26, t: 'Done' },
];

function JourneyMap() {
  const d = JOURNEY.map((p, i) => {
    if (i === 0) return `M${p.x} ${p.y}`;
    const a = JOURNEY[i - 1];
    const mx = (a.x + p.x) / 2;
    return `C${mx} ${a.y} ${mx} ${p.y} ${p.x} ${p.y}`;
  }).join(' ');
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl bg-white/55 p-3 sm:p-4">
      <div className="flex items-center justify-between gap-2 text-[11px] font-bold text-ink-950/70">
        <span>Journey map · 6 interviews</span>
        <span data-art-pop className="rounded-full bg-ink-950 px-2.5 py-1 text-[10.5px] text-gold-300">
          Finding: step 3
        </span>
      </div>
      <svg viewBox="0 0 400 136" className="mt-1 block w-full">
        <line x1="0" y1="76" x2="400" y2="76" stroke="rgba(21,18,31,0.12)" strokeWidth="1.5" strokeDasharray="3 6" />
        <path data-art-draw d={d} pathLength="1" fill="none" stroke="#1a0f33" strokeWidth="4" strokeLinecap="round" />
        {JOURNEY.map((p, i) => (
          <circle key={p.t} data-art-pop cx={p.x} cy={p.y} r={i === 2 ? 10 : 7} fill={i === 2 ? '#f9c320' : '#fff'} stroke="#1a0f33" strokeWidth="3" />
        ))}
      </svg>
      <div className="grid grid-cols-5 text-center text-[10.5px] font-bold text-ink-950/70 sm:text-[11.5px]">
        {JOURNEY.map((p) => (
          <span key={p.t}>{p.t}</span>
        ))}
      </div>
    </div>
  );
}

const SERIES = [62, 58, 70, 66, 78, 74, 88, 94];
const COLS = [40, 64, 52, 80, 70, 92];

function Dashboard() {
  const pts = SERIES.map((v, i) => `${(i / (SERIES.length - 1)) * 300},${110 - v}`);
  return (
    <div className="grid h-full grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-2.5">
      <div className="flex min-w-0 flex-col justify-between rounded-2xl bg-brand-950/55 p-3 sm:p-4">
        <span className="flex items-center justify-between gap-2 text-[11px] font-bold text-white/70">
          Weekly active
          <span className="rounded-full bg-gold-400 px-2 py-0.5 text-[10.5px] text-ink-950">Q3</span>
        </span>
        <svg viewBox="0 0 300 116" className="mt-2 block w-full">
          <path data-art-fade d={`M0,116 L${pts.join(' L')} L300,116 Z`} fill="rgba(249,195,32,0.18)" />
          <path data-art-draw d={`M${pts.join(' L')}`} pathLength="1" fill="none" stroke="#f9c320" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle data-art-pop cx="300" cy={110 - SERIES[SERIES.length - 1]} r="6" fill="#f9c320" stroke="#271749" strokeWidth="3" />
        </svg>
        <span className="mt-2 block font-mono text-[10.5px] leading-tight text-brand-200">SELECT week, users</span>
      </div>
      <div className="flex min-w-0 flex-col justify-between gap-2.5">
        <div className="rounded-2xl bg-white p-3 text-ink-950">
          <span className="block text-[10.5px] font-bold text-ink-900/55">Funnel</span>
          <span className="mt-2 block space-y-1">
            {[100, 72, 46].map((w, i) => (
              <span key={w} data-art-grow-x className={`block h-2 origin-left rounded-full ${i === 2 ? 'bg-gold-400' : 'bg-brand-500'}`} style={{ width: `${w}%` }} />
            ))}
          </span>
        </div>
        <div className="flex flex-1 items-end gap-1.5 rounded-2xl bg-brand-950/55 p-3">
          {COLS.map((h, i) => (
            <span key={i} data-art-grow className={`block flex-1 origin-bottom rounded-t-[4px] ${i === COLS.length - 1 ? 'bg-gold-400' : 'bg-brand-300'}`} style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

const DOTS = Array.from({ length: 26 }, (_, i) => {
  const x = 20 + ((i * 360) / 25 + jitter(i, 4) * 14);
  const y = 118 - x * 0.24 + jitter(i, 5) * 22;
  return { x: x.toFixed(1), y: y.toFixed(1) };
});

function Scatter() {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl bg-white/[0.05] p-3 ring-1 ring-white/10 sm:p-4">
      <span className="flex items-center justify-between gap-2 text-[11px] font-bold text-white/60">
        Model fit · test set
        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10.5px] text-white/70">r² 0.71</span>
      </span>
      <svg viewBox="0 0 400 140" className="mt-1 block w-full">
        {DOTS.map((d, i) => (
          <circle key={i} data-art-pop cx={d.x} cy={d.y} r="5" fill={i % 5 === 0 ? '#f9c320' : '#c4b3ea'} fillOpacity="0.85" />
        ))}
        <path data-art-draw d="M10 116 L390 28" pathLength="1" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 0" />
      </svg>
      <span className="text-[11px] font-bold text-white/45">x: feature · y: outcome</span>
    </div>
  );
}

const PLATES = [
  { art: MoodBoard, box: 'bg-gold-400 text-ink-950', sub: 'text-ink-950/65', cell: 'bg-ink-950/[0.07]', tag: 'bg-brand-950 text-gold-300', span: 'lg:col-span-7', folder: true },
  { art: JourneyMap, box: 'bg-brand-300 text-ink-950', sub: 'text-ink-950/65', cell: 'bg-white/45', tag: 'bg-brand-950 text-gold-300', span: 'lg:col-span-5', folder: true },
  { art: Dashboard, box: 'bg-brand-600 text-white', sub: 'text-white/65', cell: 'bg-brand-950/35', tag: 'bg-gold-400 text-ink-950', span: 'lg:col-span-5', folder: true },
  { art: Scatter, box: 'bg-brand-900 text-white ring-1 ring-white/15', sub: 'text-white/55', cell: 'bg-white/[0.06]', tag: 'bg-white/10 text-white/75', span: 'lg:col-span-7', folder: false },
];

function Plates({ table }) {
  const [h0, h1, h2] = table.head;
  return (
    <ul data-plates className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-5 sm:mt-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-6">
      {table.rows.map((r, i) => {
        const p = PLATES[i % PLATES.length];
        const dark = p.box.includes('text-white');
        const Art = p.art;
        return (
          <li key={r[0]} data-plate className={`group relative flex min-w-0 flex-col overflow-hidden rounded-[32px] p-4 shadow-[0_50px_90px_-50px_rgba(0,0,0,0.9)] transition-[translate] duration-500 hover:-translate-y-1.5 sm:p-6 ${p.box} ${p.span}`}>
            <div aria-hidden="true" className="h-[200px] transition-[scale] duration-700 group-hover:scale-[1.015] sm:h-[220px]">
              <Art />
            </div>
            <div className="mt-6 flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className={`text-[12px] font-bold uppercase tracking-[0.16em] ${p.sub}`}>
                  {h0} {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-1 font-display text-[clamp(1.45rem,1.05rem+1.2vw,2.3rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
                  <Rich text={String(r[0])} tone={dark ? 'dark' : 'light'} />
                </h3>
              </div>
              <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-bold ${p.tag}`}>
                <Icon name={p.folder ? 'doc' : 'clock'} className="h-3.5 w-3.5" strokeWidth={2.4} />
                {p.folder ? 'In Noa’s folder' : 'Not for Noa yet'}
              </span>
            </div>
            <dl className="mt-5 grid flex-1 grid-cols-[minmax(0,1fr)] content-end gap-2.5 sm:grid-cols-2">
              <div className={`rounded-2xl p-3.5 ${p.cell}`}>
                <dt className={`text-[11.5px] font-bold uppercase tracking-[0.14em] ${p.sub}`}>{h1}</dt>
                <dd className="mt-1 text-[15.5px] font-semibold leading-snug">
                  <Rich text={String(r[1])} tone={dark ? 'dark' : 'light'} />
                </dd>
              </div>
              <div className={`rounded-2xl p-3.5 ${p.cell}`}>
                <dt className={`text-[11.5px] font-bold uppercase tracking-[0.14em] ${p.sub}`}>{h2}</dt>
                <dd className="mt-1 text-[15.5px] font-semibold leading-snug">
                  <Rich text={String(r[2])} tone={dark ? 'dark' : 'light'} />
                </dd>
              </div>
            </dl>
          </li>
        );
      })}
    </ul>
  );
}

function MailSlab({ text }) {
  return (
    <div data-mail className="relative mt-6 grid grid-cols-[minmax(0,1fr)] items-center gap-8 overflow-hidden rounded-[32px] bg-white p-5 text-ink-950 shadow-[0_50px_90px_-50px_rgba(0,0,0,0.9)] sm:p-8 lg:mt-6 lg:grid-cols-12 lg:gap-12 lg:p-11">
      <div className="min-w-0 lg:col-span-6">
        <p className="flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-[0.18em] text-brand-600">
          <Icon name="mail" className="h-4 w-4" />
          Version and role line up
        </p>
        <p className="mt-4 text-[clamp(1.05rem,0.95rem+0.4vw,1.3rem)] font-medium leading-relaxed text-ink-900/80">
          <Rich text={text} />
        </p>
      </div>
      <div aria-hidden="true" className="min-w-0 lg:col-span-6">
        <div className="rounded-[26px] bg-light-lavender p-4 ring-1 ring-hairline sm:p-5">
          <div className="space-y-2 text-[12.5px] font-semibold">
            <p className="flex items-start gap-2 rounded-xl bg-white px-3 py-2 leading-snug">
              <span className="w-12 shrink-0 text-ink-900/45 sm:w-14">To</span>
              <span className="min-w-0">Recruiter, Lumen Studio</span>
            </p>
            <p className="flex items-start gap-2 rounded-xl bg-white px-3 py-2 leading-snug">
              <span className="w-12 shrink-0 text-ink-900/45 sm:w-14">Subject</span>
              <span className="min-w-0">Product Designer application</span>
            </p>
          </div>
          <div className="mt-3 space-y-2 rounded-2xl bg-white p-3.5">
            {[100, 92, 96, 64].map((w, i) => (
              <span key={i} data-mail-line className="block h-2 origin-left rounded-full bg-brand-100" style={{ width: `${w}%` }} />
            ))}
            <span data-mail-chip className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-gold-100 px-3 py-1.5 text-[11.5px] font-bold text-gold-800 ring-1 ring-gold-300">
              <Icon name="pen" className="h-3.5 w-3.5" />
              Portfolio link added by Noa
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 text-[12px] font-bold text-ink-900/60">
              <Avatar className="h-7 w-7 text-[10px]" />
              Edited by Noa
            </span>
            <span data-send className="inline-flex items-center gap-2 rounded-full bg-brand-950 px-4 py-2 text-[12.5px] font-bold text-gold-300">
              <Icon name="user" className="h-3.5 w-3.5" />
              She sends it
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VersionsSection({ s }) {
  const root = useRef(null);
  const ps = s.blocks.filter((b) => b.type === 'p');
  const table = s.blocks.find((b) => b.type === 'table');
  const [lead, mail] = ps;
  const others = s.blocks.filter((b) => b !== table && !ps.includes(b));

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: 'top 75%', once: true } })
          .from(q('[data-numeral]'), { yPercent: 40, opacity: 0, duration: 1.3 }, 0)
          .from(q('[data-lead], [data-copy]'), { y: 30, opacity: 0, stagger: 0.12, duration: 1.1 }, 0.2);

        // Plates rise in; each one's cover art then draws itself
        const plates = q('[data-plate]');
        // Only tween the art parts a plate actually has (empty target lists make GSAP warn)
        const each = (pl, sel, fn) => {
          const els = pl.querySelectorAll(sel);
          if (els.length) fn(els);
        };
        gsap.set(plates, { y: 80, opacity: 0 });
        plates.forEach((pl) => {
          each(pl, '[data-art-draw]', (els) => gsap.set(els, { strokeDasharray: '1 1', strokeDashoffset: 1 }));
          each(pl, '[data-art-pop]', (els) => gsap.set(els, { scale: 0.4, opacity: 0, transformOrigin: '50% 50%' }));
          each(pl, '[data-art-grow]', (els) => gsap.set(els, { scaleY: 0 }));
          each(pl, '[data-art-fade]', (els) => gsap.set(els, { opacity: 0 }));
          each(pl, '[data-art-grow-x]', (els) => gsap.set(els, { scaleX: 0 }));
        });
        ScrollTrigger.batch(plates, {
          start: 'top 88%',
          once: true,
          onEnter: (els) =>
            els.forEach((pl, k) => {
              const d = k * 0.14;
              gsap.to(pl, { y: 0, opacity: 1, duration: 1.2, delay: d });
              each(pl, '[data-art-pop]', (els) => gsap.to(els, { scale: 1, opacity: 1, stagger: 0.05, duration: 0.7, ease: 'back.out(2)', delay: d + 0.3 }));
              each(pl, '[data-art-draw]', (els) => gsap.to(els, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut', delay: d + 0.35 }));
              each(pl, '[data-art-grow]', (els) => gsap.to(els, { scaleY: 1, stagger: 0.06, duration: 0.9, delay: d + 0.4 }));
              each(pl, '[data-art-fade]', (els) => gsap.to(els, { opacity: 1, duration: 1, delay: d + 0.9 }));
              each(pl, '[data-art-grow-x]', (els) => gsap.to(els, { scaleX: 1, stagger: 0.08, duration: 0.9, delay: d + 0.5 }));
            }),
        });

        gsap
          .timeline({ scrollTrigger: { trigger: q('[data-mail]')[0], start: 'top 85%', once: true } })
          .from(q('[data-mail]'), { y: 60, opacity: 0, duration: 1.2 })
          .from(q('[data-mail-line]'), { scaleX: 0, stagger: 0.1, duration: 0.8 }, 0.4)
          .from(q('[data-mail-chip]'), { scale: 0.5, opacity: 0, duration: 0.7, ease: 'back.out(2.2)' }, 0.9)
          .from(q('[data-send]'), { x: 30, opacity: 0, duration: 0.8 }, 1.1);
        gsap.from(q('[data-handoff]'), { y: 40, opacity: 0, duration: 1.1, scrollTrigger: { trigger: q('[data-handoff]')[0], start: 'top 92%', once: true } });
      });

      // Desktop: the asymmetric plate grid drifts apart slightly with the scroll
      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        const art = q('[data-plate] > div[aria-hidden]');
        gsap.fromTo(art, { y: (i) => (i % 2 ? 24 : -12) }, { y: (i) => (i % 2 ? -24 : 12), ease: 'none', scrollTrigger: { trigger: q('[data-plates]')[0], start: 'top bottom', end: 'bottom top', scrub: true } });
      });
    },
    { scope: root }
  );

  return (
    <section id={s.id} ref={root} aria-labelledby={`${s.id}-title`} className="grain relative scroll-mt-24 overflow-clip bg-brand-950 py-16 text-white sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_35%_at_85%_5%,rgba(109,76,176,0.55),transparent),radial-gradient(35%_30%_at_0%_45%,rgba(124,92,214,0.28),transparent),radial-gradient(30%_25%_at_90%_95%,rgba(244,180,0,0.14),transparent)]" />
      <div className="container-x relative z-[2]">
        <RunningHead n={3} eyebrow={s.eyebrow} tone="ink" />

        <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-8 lg:mt-14 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="min-w-0 lg:col-span-7">
            <Numeral n={3} tone="ink" className="text-[clamp(5.5rem,3rem+7vw,11rem)]" />
            <Title s={s} tone="ink" className="mt-6" />
          </div>
          <div className="min-w-0 lg:col-span-5">
            <Lead text={s.intro} tone="ink" />
            {lead && (
              <p data-copy className="mt-5 text-[17px] leading-relaxed text-brand-100">
                <Rich text={lead.text} tone="dark" />
              </p>
            )}
          </div>
        </div>

        {table && <Plates table={table} />}
        {mail && <MailSlab text={mail.text} />}
        {others.length > 0 && (
          <div className="mt-8 space-y-5">
            {others.map((b, i) => (
              <Block key={i} b={b} />
            ))}
          </div>
        )}
        <Handoff next={3} tone="ink" line="The emails go out, edited and sent by Noa. Next comes the call, where someone keeps asking why." />
      </div>
    </section>
  );
}
