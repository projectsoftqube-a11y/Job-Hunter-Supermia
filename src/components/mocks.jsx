'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';

/*
 * Product UI mockups drawn in code (not screenshots) so they stay sharp at any size and can animate.
 * The people, companies and salaries shown inside them are illustrative sample data.
 */

/** Circular score ring that counts up when it scrolls into view. */
export function ScoreRing({ value, max = 100, size = 64, stroke = 6, label, tone = 'emerald', className = '', textClass = 'text-ink-900' }) {
  const ref = useRef(null);
  const num = useRef(null);
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const colors = { emerald: '#10b981', gold: '#f4b400', brand: '#6d4cb0' };
  const decimals = max === 10 ? 1 : 0;

  useGSAP(
    () => {
      const arc = ref.current.querySelector('[data-arc]');
      const target = c * (1 - value / max);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const counter = { v: 0 };
        gsap.fromTo(arc, { strokeDashoffset: c }, { strokeDashoffset: target, duration: 1.8, ease: 'expo.out', scrollTrigger: { trigger: ref.current, start: 'top 92%', once: true } });
        gsap.to(counter, {
          v: value,
          duration: 1.8,
          ease: 'expo.out',
          scrollTrigger: { trigger: ref.current, start: 'top 92%', once: true },
          onUpdate: () => {
            if (num.current) num.current.textContent = counter.v.toFixed(decimals);
          },
        });
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={`relative shrink-0 ${className}`} style={{ width: size, height: size }} role="img" aria-label={label || `${value} out of ${max}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeWidth={stroke} className="text-brand-100/80" />
        <circle
          data-arc
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={colors[tone]}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - value / max)}
        />
      </svg>
      <span className={`absolute inset-0 flex items-center justify-center font-display font-extrabold ${textClass}`} style={{ fontSize: size * 0.27 }}>
        <span ref={num}>{value.toFixed(decimals)}</span>
        {max === 100 && <span style={{ fontSize: size * 0.16 }}>%</span>}
      </span>
    </div>
  );
}

function SourceBadge({ name }) {
  const styles = {
    LinkedIn: 'border-[#0A66C2]/30 bg-[#0A66C2]/10 text-[#084E94]',
    Indeed: 'border-[#2557A7]/30 bg-[#2557A7]/10 text-[#1d4687]',
    Dice: 'border-rose-200 bg-rose-50 text-rose-700',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-[5px] border px-2 py-0.5 text-[11px] font-bold ${styles[name]}`}>
      <Image src={`/logos/${name.toLowerCase()}.png`} alt="" width={14} height={14} className="h-3.5 w-3.5 object-contain" />
      {name}
    </span>
  );
}

const JOBS = [
  { title: 'Senior Frontend Engineer', company: 'Northwind Labs', place: 'Austin, TX', pay: '$145k - $170k', source: 'LinkedIn', score: 92 },
  { title: 'React Developer', company: 'Brightpath Software', place: 'Remote, US', pay: '$120k - $140k', source: 'Indeed', score: 86 },
  { title: 'UI Engineer', company: 'Lumen Studio', place: 'New York, NY', pay: '$130k - $155k', source: 'Dice', score: 79 },
];

export function JobsMock() {
  return (
    <div className="w-full rounded-[22px] border border-hairline bg-white p-3 shadow-[0_40px_80px_-30px_rgba(26,15,51,0.55)] sm:p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-1 sm:gap-3">
        <div className="flex min-w-0 items-center gap-2 rounded-xl border border-hairline bg-light-lavender px-3 py-2 text-[13px] font-semibold text-ink-900">
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-brand-500" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
          <span className="truncate">Frontend Engineer · Austin, TX</span>
        </div>
        <span className="shrink-0 rounded-full bg-gold-100 px-2.5 py-1 text-[11px] font-bold text-gold-800">64 matches</span>
      </div>
      <ul className="space-y-2.5">
        {JOBS.map((j) => (
          <li key={j.title} className="flex items-center gap-3 rounded-2xl border border-hairline bg-white p-3 transition-colors hover:bg-light-lavender">
            <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 font-display text-lg font-extrabold text-brand-600 min-[420px]:flex">{j.company[0]}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-ink-900">{j.title}</p>
              <p className="truncate text-xs font-medium text-ink-800">
                {j.company} · {j.place}
              </p>
              <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                <SourceBadge name={j.source} />
                <span className="text-[11px] font-semibold text-emerald-700">{j.pay}</span>
              </div>
            </div>
            <ScoreRing value={j.score} size={50} stroke={5} label={`${j.score}% match`} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AtsMock() {
  const checks = [
    ['Contact details and sections are readable', true],
    ['Experience matches the seniority asked for', true],
    ['GraphQL and Storybook are not mentioned', false],
  ];
  return (
    <div className="w-full rounded-[22px] border border-hairline bg-white p-5 shadow-[0_40px_80px_-30px_rgba(26,15,51,0.55)] sm:p-6">
      <div className="flex flex-col items-start gap-4 min-[380px]:flex-row min-[380px]:items-center min-[380px]:gap-5">
        <ScoreRing value={86} size={104} stroke={9} label="86% ATS match" />
        <div className="min-w-0">
          <p className="text-xs font-bold text-brand-600">ATS match score</p>
          <p className="font-display text-xl font-extrabold leading-tight text-ink-900">Strong match</p>
          <p className="mt-1 text-[13px] font-medium text-ink-800">Senior Frontend Engineer · Northwind Labs</p>
        </div>
      </div>
      <div className="mt-5 space-y-2">
        {checks.map(([text, ok]) => (
          <div key={text} className="flex items-center gap-2.5 text-[13px] font-semibold text-ink-900">
            <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${ok ? 'bg-emerald-500 text-white' : 'bg-gold-400 text-ink-900'}`} aria-hidden="true">
              {ok ? '✓' : '!'}
            </span>
            {text}
          </div>
        ))}
      </div>
      <div className="mt-5 border-t border-hairline pt-4">
        <p className="mb-2 text-xs font-bold text-ink-900">Skills to add</p>
        <div className="flex flex-wrap gap-1.5">
          {['GraphQL', 'Storybook', 'Web Vitals'].map((s) => (
            <span key={s} className="rounded-[5px] border border-gold-200 bg-gold-50 px-2 py-0.5 text-xs font-bold text-gold-800">
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const MAIL_BODY =
  'Hi Sarah,\n\nI am applying for the Senior Frontend Engineer role at Northwind Labs. I have spent six years building React and TypeScript products, most recently leading a design system used by four product teams.\n\nI would love to talk about how I could help your customer platform team ship faster.\n\nBest,\nEmily Carter';

export function MailMock() {
  const ref = useRef(null);
  const [text, setText] = useState(MAIL_BODY);

  // Types the email out once when it scrolls into view
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const state = { n: 0 };
        setText('');
        gsap.to(state, {
          n: MAIL_BODY.length,
          duration: 4.5,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true },
          onUpdate: () => setText(MAIL_BODY.slice(0, Math.round(state.n))),
        });
        return () => setText(MAIL_BODY);
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="w-full rounded-[22px] border border-hairline bg-white shadow-[0_40px_80px_-30px_rgba(26,15,51,0.55)]">
      <div className="flex items-center justify-between border-b border-hairline px-5 py-3.5">
        <span className="flex items-center gap-2 text-sm font-bold text-ink-900">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-600 text-white" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-4 w-4">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
          </span>
          AI application email
        </span>
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">Ready to send</span>
      </div>
      <div className="space-y-2.5 px-5 py-4 text-[13px]">
        <p className="flex gap-2 text-ink-900">
          <span className="w-16 shrink-0 font-semibold text-brand-600">To</span>
          <span className="truncate font-mono font-semibold">careers@northwindlabs.com</span>
        </p>
        <p className="flex gap-2 text-ink-900">
          <span className="w-16 shrink-0 font-semibold text-brand-600">Subject</span>
          <span className="font-semibold">Senior Frontend Engineer application, Emily Carter</span>
        </p>
      </div>
      <div className="mx-5 mb-5 min-h-[208px] whitespace-pre-line rounded-xl border border-hairline bg-light-lavender p-4 text-[13px] font-medium leading-relaxed text-ink-900">
        {text}
        <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-brand-500" aria-hidden="true" />
      </div>
    </div>
  );
}

/** Live voice waveform drawn on a canvas, mirrored bars with smoothed random levels. */
export function Waveform({ className = '', bars = 48, active = true, color = '#f9c320', color2 = '#9b7fd4' }) {
  const canvas = useRef(null);

  useEffect(() => {
    const el = canvas.current;
    const ctx = el.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const levels = new Array(bars).fill(0.2);
    let raf = 0;
    let t = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      el.width = el.clientWidth * dpr;
      el.height = el.clientHeight * dpr;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    const draw = () => {
      t += 0.045;
      const w = el.width;
      const h = el.height;
      ctx.clearRect(0, 0, w, h);
      const gap = w / bars;
      const bw = gap * 0.5;
      const grad = ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, color2);
      grad.addColorStop(0.5, color);
      grad.addColorStop(1, color2);
      ctx.fillStyle = grad;
      for (let i = 0; i < bars; i += 1) {
        const center = 1 - Math.abs(i - bars / 2) / (bars / 2);
        const target = active ? 0.12 + center * (0.35 + 0.5 * Math.abs(Math.sin(t * 1.7 + i * 0.45) * Math.cos(t * 0.9 + i * 0.13))) : 0.06;
        levels[i] += (target - levels[i]) * 0.18;
        const bh = Math.max(h * 0.04, levels[i] * h);
        const x = i * gap + (gap - bw) / 2;
        const y = (h - bh) / 2;
        const rr = bw / 2;
        ctx.beginPath();
        ctx.roundRect(x, y, bw, bh, rr);
        ctx.fill();
      }
      if (!reduce && visible) raf = requestAnimationFrame(draw);
    };

    let visible = false;
    const io = new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting;
      if (visible && !was) raf = requestAnimationFrame(draw);
      if (!visible) cancelAnimationFrame(raf);
    });
    io.observe(el);
    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [bars, active, color, color2]);

  return <canvas ref={canvas} className={`block h-full w-full ${className}`} aria-hidden="true" />;
}

export function VoiceMock() {
  return (
    <div className="w-full overflow-hidden rounded-[22px] border border-white/10 bg-brand-950 text-white shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
        <span className="flex items-center gap-2 rounded-full bg-rose-500 px-3 py-1 text-xs font-bold">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
          Live voice session
        </span>
        <span className="text-xs font-semibold text-brand-100">Role & Knowledge · 12:48</span>
      </div>
      <div className="relative flex flex-col items-center px-5 pb-5 pt-7">
        <span className="relative flex h-16 w-16 items-center justify-center">
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-gold-400/40" />
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 font-display text-lg font-extrabold">AI</span>
        </span>
        <p className="mt-3 text-sm font-bold">AI interviewer is speaking</p>
        <div className="mt-3 h-16 w-full">
          <Waveform />
        </div>
        <div className="mt-4 w-full space-y-2.5">
          <p className="max-w-[88%] rounded-2xl rounded-tl-md bg-white px-4 py-2.5 text-[13px] font-medium leading-relaxed text-ink-900">
            Walk me through how you would cut the load time of a slow React dashboard.
          </p>
          <p className="ml-auto max-w-[80%] rounded-2xl rounded-tr-md bg-gradient-to-br from-brand-500 to-brand-700 px-4 py-2.5 text-[13px] font-medium leading-relaxed">
            First I would measure it. I would profile the bundle and the slowest renders before changing anything.
          </p>
        </div>
      </div>
    </div>
  );
}

export function ReportMock() {
  const bars = [
    ['Clarity & articulation', 8.1, 'from-brand-400 to-brand-700'],
    ['Confidence & delivery', 7.4, 'from-sky-400 to-sky-600'],
    ['Technical depth', 7.9, 'from-emerald-400 to-emerald-600'],
  ];
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(ref.current.querySelectorAll('[data-fill]'), {
          scaleX: 0,
          stagger: 0.12,
          duration: 1.6,
          scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
        });
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="w-full rounded-[22px] border border-hairline bg-white p-5 shadow-[0_40px_80px_-30px_rgba(26,15,51,0.55)] sm:p-6">
      <div className="flex flex-col items-start gap-4 min-[380px]:flex-row min-[380px]:items-center min-[380px]:gap-5">
        <ScoreRing value={7.8} max={10} size={104} stroke={9} tone="emerald" label="Readiness 7.8 out of 10" />
        <div>
          <p className="text-xs font-bold text-brand-600">Interview readiness</p>
          <p className="font-display text-xl font-extrabold leading-tight text-ink-900">Nearly ready</p>
          <span className="mt-1.5 inline-flex rounded-[5px] border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">Hire signal: strong</span>
        </div>
      </div>
      <div className="mt-5 space-y-3.5">
        {bars.map(([label, v, grad]) => (
          <div key={label}>
            <div className="mb-1.5 flex justify-between text-[13px] font-semibold text-ink-900">
              <span>{label}</span>
              <span>{v}</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-brand-50">
              <div data-fill className={`h-full origin-left rounded-full bg-gradient-to-r ${grad}`} style={{ width: `${v * 10}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2.5 border-t border-hairline pt-4 text-[12.5px] font-semibold">
        <p className="rounded-xl bg-emerald-50 p-3 text-emerald-800">Strength: structured answers</p>
        <p className="rounded-xl bg-gold-50 p-3 text-gold-800">Practice: caching trade-offs</p>
      </div>
    </div>
  );
}
