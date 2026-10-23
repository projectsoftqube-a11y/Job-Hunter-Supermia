'use client';

import { Icon } from '@/components/icons';
import { ScoreRing } from '@/components/mocks';

/*
 * Building blocks for "The Bridge" (for-career-switchers). Cool lavender is the field you are leaving,
 * warm gold the field you are moving into, brand purple the bridge between them. Everything here is
 * decorative (aria-hidden) and uses fictional sample data.
 */

// Chapter marker: a tiny bridge with four piers, filled up to the current part
const ARC = (t) => {
  const x = 4 + 88 * t;
  const y = (1 - t) ** 2 * 17 + 2 * (1 - t) * t * -3 + t ** 2 * 17;
  return [Number(x.toFixed(1)), Number(y.toFixed(1))];
};
const PIERS = [0.06, 0.36, 0.64, 0.94].map(ARC);

export function Crossing({ n, label, eyebrow, dark = false }) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-2.5">
      <span aria-hidden="true" className={`inline-flex items-center gap-2 rounded-full py-1.5 pl-3 pr-3 ${dark ? 'bg-white/[0.07] ring-1 ring-white/15' : 'bg-white ring-1 ring-brand-200 shadow-[0_10px_24px_-16px_rgba(26,15,51,0.5)]'}`}>
        <span className={`text-[10px] font-extrabold uppercase tracking-[0.14em] ${dark ? 'text-brand-300' : 'text-brand-500'}`}>Old</span>
        <svg viewBox="0 0 96 22" className="h-[22px] w-24 overflow-visible">
          <path d="M4 17 Q48 -3 92 17" fill="none" stroke={dark ? 'rgba(255,255,255,0.25)' : '#ded5f5'} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M4 17 Q48 -3 92 17" fill="none" stroke="#6d4cb0" strokeWidth="2.5" strokeLinecap="round" pathLength="1" strokeDasharray={`${[0.08, 0.38, 0.66, 1][n - 1]} 1`} />
          {PIERS.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i === n - 1 ? 4.5 : 3.2} fill={i === n - 1 ? '#f9c320' : i < n ? '#6d4cb0' : dark ? '#1a0f33' : '#ffffff'} stroke={i < n ? 'none' : '#c4b3ea'} strokeWidth="1.5" />
          ))}
        </svg>
        <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-gold-600">New</span>
      </span>
      <span aria-hidden="true" className={`font-display text-[13px] font-bold ${dark ? 'text-white/80' : 'text-ink-950/75'}`}>
        Part {n} of 4 · {label}
      </span>
      <p className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] ${dark ? 'bg-gold-400 text-ink-950' : 'bg-brand-950 text-gold-300'}`}>{eyebrow}</p>
    </div>
  );
}

/* ---------- Part 1: the two shores, with a bridge that does not quite meet ---------- */
// A week of shifts (deterministic pattern) and a small chart, drawn in code
const SHIFTS = [1, 1, 0, 1, 2, 0, 0, 0, 1, 1, 2, 1, 0, 1, 2, 0, 1, 1, 0, 2, 1, 1, 2, 0, 1, 0, 1, 1];
const BARS = [38, 52, 46, 64, 58, 78];

export function TwoShores() {
  return (
    <div aria-hidden="true" className="relative pt-[84px]">
      <div className="grid grid-cols-2 gap-3 sm:gap-5">
        <div data-shore="old" className="relative min-w-0 rounded-[28px] bg-[linear-gradient(165deg,#f5f3ff,#ded5f5)] p-3.5 ring-1 ring-brand-200 shadow-[0_40px_70px_-44px_rgba(26,15,51,0.6)] sm:p-5">
          <p className="text-[9.5px] font-extrabold uppercase tracking-[0.16em] text-brand-500 sm:text-[10px]">The field you know</p>
          <p className="font-display text-[14px] font-extrabold leading-tight text-brand-800 sm:text-[17px]">Hospital administration</p>
          <div className="mt-3 rounded-2xl bg-white p-2.5 sm:mt-4 sm:p-3">
            <p className="flex items-center justify-between text-[10px] font-bold text-brand-600 sm:text-[11px]">
              <span>Shift plan</span>
              <span className="text-ink-900/40">Week 32</span>
            </p>
            <div className="mt-2 grid grid-cols-7 gap-1">
              {SHIFTS.map((v, i) => (
                <span key={i} data-shift className={`h-3 rounded-[4px] sm:h-4 ${v === 2 ? 'bg-brand-500' : v === 1 ? 'bg-brand-300' : 'bg-brand-100'}`} />
              ))}
            </div>
          </div>
          <div className="mt-2.5 flex flex-wrap gap-1.5 sm:mt-3">
            {['Rostering', 'Census report', 'Unit budget'].map((t) => (
              <span key={t} className="rounded-full bg-white/80 px-2 py-0.5 text-[10.5px] font-bold text-brand-700 ring-1 ring-brand-200 sm:px-2.5 sm:py-1 sm:text-[11.5px]">
                {t}
              </span>
            ))}
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-[10.5px] font-bold text-brand-500 sm:text-[11.5px]">
            <Icon name="chat" className="h-3.5 w-3.5" /> The old language
          </p>
        </div>

        <div data-shore="new" className="relative mt-10 min-w-0 rounded-[28px] bg-[linear-gradient(195deg,#fffbeb,#fde68a)] p-3.5 ring-1 ring-gold-300 shadow-[0_40px_70px_-44px_rgba(138,90,0,0.55)] sm:mt-14 sm:p-5">
          <p className="text-[9.5px] font-extrabold uppercase tracking-[0.16em] text-gold-700 sm:text-[10px]">The field you want</p>
          <p className="font-display text-[14px] font-extrabold leading-tight text-gold-800 sm:text-[17px]">Operations analysis</p>
          <div className="mt-3 rounded-2xl bg-white p-2.5 sm:mt-4 sm:p-3">
            <p className="flex items-center justify-between text-[10px] font-bold text-gold-700 sm:text-[11px]">
              <span>Capacity dashboard</span>
              <span className="text-ink-900/40">Q3</span>
            </p>
            <div className="mt-2 flex h-[52px] items-end gap-1.5 sm:h-[64px]">
              {BARS.map((h, i) => (
                <span key={i} data-bar className={`flex-1 origin-bottom rounded-t-[4px] ${i === BARS.length - 1 ? 'bg-brand-600' : 'bg-gold-400'}`} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <div className="mt-2.5 flex flex-wrap gap-1.5 sm:mt-3">
            {['Capacity planning', 'KPIs', 'Process mapping'].map((t) => (
              <span key={t} className="rounded-full bg-white/80 px-2 py-0.5 text-[10.5px] font-bold text-gold-800 ring-1 ring-gold-300 sm:px-2.5 sm:py-1 sm:text-[11.5px]">
                {t}
              </span>
            ))}
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-[10.5px] font-bold text-gold-800 sm:text-[11.5px]">
            <Icon name="chat" className="h-3.5 w-3.5" /> The words they use
          </p>
        </div>
      </div>

      {/* The bridge between the two worlds, broken in the middle */}
      <svg viewBox="0 0 400 110" preserveAspectRatio="none" className="pointer-events-none absolute left-[14%] top-[6px] h-[80px] w-[72%] overflow-visible">
        <path data-span d="M8 100 C 70 34, 150 18, 184 20" pathLength="1" fill="none" stroke="#4b2e83" strokeWidth="9" strokeLinecap="round" />
        <path data-span d="M216 20 C 250 18, 330 34, 392 100" pathLength="1" fill="none" stroke="#4b2e83" strokeWidth="9" strokeLinecap="round" />
        <path d="M8 112 C 70 46, 150 30, 184 32" fill="none" stroke="#9b7fd4" strokeWidth="2" strokeDasharray="2 7" strokeLinecap="round" />
        <path d="M216 32 C 250 30, 330 46, 392 112" fill="none" stroke="#f4b400" strokeWidth="2" strokeDasharray="2 7" strokeLinecap="round" />
      </svg>
      <span data-gap className="absolute left-1/2 top-[22px] flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-brand-950 py-1.5 pl-1.5 pr-3.5 text-white shadow-[0_18px_34px_-16px_rgba(26,15,51,0.9)]">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-400 font-display text-[15px] font-extrabold text-ink-950">?</span>
        <span className="whitespace-nowrap text-[12px] font-bold">Lost in translation</span>
      </span>
    </div>
  );
}

/* ---------- Part 1: one resume, sent everywhere ---------- */
const COMPANIES = ['Northwind Labs', 'Brightpath Software', 'Lumen Studio'];

export function SameResume() {
  return (
    <div aria-hidden="true" className="relative grid grid-cols-[minmax(0,1fr)] items-center gap-8 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] sm:gap-6">
      <div data-same-stack className="relative mx-auto h-[150px] w-[118px] sm:h-[176px] sm:w-[138px]">
        {[2, 1, 0].map((k) => (
          <div key={k} className="absolute inset-0 rounded-[14px] bg-white p-3 shadow-[0_18px_30px_-18px_rgba(0,0,0,0.6)]" style={{ transform: `translate(${k * 8}px, ${k * -8}px) rotate(${k * 3}deg)` }}>
            <span className="block h-2 w-14 rounded bg-brand-300" />
            <span className="mt-2 block h-1.5 w-full rounded bg-brand-100" />
            <span className="mt-1.5 block h-1.5 w-4/5 rounded bg-brand-100" />
            <span className="mt-1.5 block h-1.5 w-full rounded bg-brand-100" />
            <span className="mt-3 block h-1.5 w-3/5 rounded bg-brand-100" />
            <span className="mt-1.5 block h-1.5 w-full rounded bg-brand-100" />
          </div>
        ))}
        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 -rotate-6 whitespace-nowrap rounded-md border-2 border-rose-400 bg-white px-2 py-0.5 font-display text-[11px] font-extrabold uppercase tracking-[0.12em] text-rose-500">Same resume</span>
      </div>
      <ul className="space-y-2.5">
        {COMPANIES.map((c) => (
          <li key={c} data-same-row className="flex items-center gap-3 rounded-2xl bg-white/[0.07] p-2.5 ring-1 ring-white/10 sm:p-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 font-display text-sm font-extrabold text-brand-200">{c[0]}</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[12.5px] font-bold text-white sm:text-[13px]">{c}</span>
              <span className="block truncate text-[11px] font-semibold text-white/50">resume_v1.pdf · sent</span>
            </span>
            <span data-same-status className="shrink-0 rounded-full bg-rose-500/15 px-2.5 py-1 text-[10.5px] font-bold text-rose-300 ring-1 ring-rose-400/30">No feedback</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Part 2: the match score card next to the paragraph ---------- */
export function MatchCard() {
  return (
    <div aria-hidden="true" className="relative rounded-[28px] bg-white p-5 shadow-[0_40px_80px_-46px_rgba(26,15,51,0.7)] ring-1 ring-brand-100 sm:p-6">
      <div className="flex items-center gap-4">
        <ScoreRing value={64} size={78} stroke={7} tone="brand" label="64 out of 100 match" />
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-500">Match score · sample</p>
          <p className="truncate font-display text-[1.1rem] font-extrabold text-ink-950">Operations Analyst</p>
          <p className="truncate text-[12.5px] font-semibold text-ink-900/55">Northwind Labs · Indeed</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2.5 text-[12px] font-bold">
        <div className="rounded-2xl bg-brand-50 p-3">
          <p className="text-[10px] uppercase tracking-[0.14em] text-brand-500">Carries over</p>
          <p className="mt-1.5 leading-relaxed text-brand-800">Scheduling · Reporting · Training staff</p>
        </div>
        <div className="rounded-2xl border border-dashed border-gold-300 bg-gold-50 p-3">
          <p className="text-[10px] uppercase tracking-[0.14em] text-gold-700">Missing</p>
          <p className="mt-1.5 leading-relaxed text-gold-800">SQL · Process mapping</p>
        </div>
      </div>
      <p className="mt-2.5 flex items-center gap-2 rounded-2xl bg-brand-950 px-3.5 py-2.5 text-[12px] font-bold text-white">
        <Icon name="bolt" className="h-4 w-4 shrink-0 text-gold-400" />
        Fix first: say “onboarding” where you wrote “trained new staff”
      </p>
    </div>
  );
}

/* ---------- Part 2: the bridge scene (desktop) and the same mapping as a list (phones) ---------- */
export const SKILLS = [
  ['Trained new staff', 'Onboarding & enablement'],
  ['Built the shift schedule', 'Capacity planning'],
  ['Monthly department reports', 'Reporting & dashboards'],
  ['Handled patient complaints', 'Stakeholder management'],
];

export function BridgeScene() {
  return (
    <div aria-hidden="true" className="relative hidden lg:block">
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,0.78fr)_minmax(0,1fr)] items-stretch">
        {/* Old shore */}
        <div className="relative rounded-[30px] bg-[linear-gradient(160deg,#f5f3ff,#ded5f5)] p-5 xl:p-6">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-500">Old field · the words you used</p>
          <p className="font-display text-[1.15rem] font-extrabold text-brand-800">Hospital administration</p>
          <ul className="mt-4 space-y-2.5">
            {SKILLS.map(([old]) => (
              <li key={old} data-ghost className="flex h-12 items-center justify-between gap-2 rounded-2xl border-2 border-dashed border-brand-300 px-3.5 text-[13.5px] font-bold text-brand-500">
                <span className="truncate">{old}</span>
                <span data-ghost-tag className="shrink-0 rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-brand-600">other name</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 flex items-center gap-2 text-[12px] font-bold text-brand-600">
            <Icon name="refresh" className="h-4 w-4" /> Same skills, old words
          </p>
        </div>

        {/* The bridge */}
        <div className="relative">
          <svg viewBox="0 0 300 300" preserveAspectRatio="none" className="absolute inset-x-[-18px] top-[38%] h-[46%] w-[calc(100%+36px)] overflow-visible">
            <path data-bridge d="M0 150 L300 150" pathLength="1" fill="none" stroke="#6d4cb0" strokeWidth="10" strokeLinecap="round" />
            <path data-bridge d="M0 40 Q150 175 300 40" pathLength="1" fill="none" stroke="#9b7fd4" strokeWidth="3.5" strokeLinecap="round" />
            {[40, 80, 120, 150, 180, 220, 260].map((x) => {
              const t = x / 300;
              const y = (1 - t) ** 2 * 40 + 2 * (1 - t) * t * 175 + t ** 2 * 40;
              return <path key={x} data-hanger d={`M${x} ${y.toFixed(1)} L${x} 150`} stroke="#c4b3ea" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />;
            })}
            <path d="M0 165 Q150 230 300 165" fill="none" stroke="rgba(109,76,176,0.35)" strokeWidth="2" strokeDasharray="2 8" vectorEffect="non-scaling-stroke" />
          </svg>
          <span className="absolute left-1/2 top-[22%] -translate-x-1/2 whitespace-nowrap rounded-full bg-brand-600 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.14em] text-white">Translate</span>
          <div data-carry className="absolute inset-x-4 bottom-0 rounded-[20px] bg-white/[0.07] p-3.5 ring-1 ring-white/15 xl:inset-x-6">
            <p className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-gold-300">
              <Icon name="layers" className="h-3.5 w-3.5" /> Next listing
            </p>
            <p className="mt-1 text-[12.5px] font-bold leading-snug text-white">Same field, so the four translations come with you</p>
          </div>
        </div>

        {/* New shore: the chips land here (their final place) */}
        <div className="relative rounded-[30px] bg-[linear-gradient(200deg,#fffbeb,#fde68a)] p-5 xl:p-6">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-gold-700">New field · the words they use</p>
          <p className="font-display text-[1.15rem] font-extrabold text-gold-800">Operations analysis</p>
          <ul className="mt-4 space-y-2.5">
            {SKILLS.map(([old, now]) => (
              <li key={now} data-chip className="relative flex h-12 items-center rounded-2xl bg-white px-3.5 shadow-[0_6px_14px_-8px_rgba(138,90,0,0.5)] ring-1 ring-gold-200 will-change-transform">
                <span data-chip-new className="flex min-w-0 flex-1 items-center gap-2 text-[13.5px] font-bold text-ink-950">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-gold-500" />
                  <span className="truncate">{now}</span>
                </span>
                <span data-chip-old className="absolute inset-0 flex items-center rounded-2xl bg-brand-100 px-3.5 text-[13.5px] font-bold text-brand-700 opacity-0">
                  {old}
                </span>
                <span data-proof className="ml-2 inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10.5px] font-bold text-emerald-700">
                  <Icon name="check" className="h-3 w-3" strokeWidth={3} /> proof
                </span>
              </li>
            ))}
            <li data-gapslot className="flex h-12 items-center justify-between gap-2 rounded-2xl border-2 border-dashed border-gold-500/60 px-3.5 text-[13px] font-bold text-gold-800">
              <span>Process mapping</span>
              <span className="rounded-full bg-white/70 px-2 py-0.5 text-[10.5px]">Learn it soon</span>
            </li>
            <li data-gapslot className="flex h-12 items-center justify-between gap-2 rounded-2xl border-2 border-dashed border-rose-400/60 px-3.5 text-[13px] font-bold text-rose-700">
              <span>SQL</span>
              <span className="rounded-full bg-white/70 px-2 py-0.5 text-[10.5px]">Real gap for now</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function BridgeList() {
  return (
    <ul aria-hidden="true" className="space-y-2.5 lg:hidden">
      {SKILLS.map(([old, now]) => (
        <li key={now} data-pair className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2">
          <span className="rounded-2xl bg-brand-100 px-3 py-2.5 text-[12.5px] font-bold leading-snug text-brand-700">{old}</span>
          <Icon name="arrow" className="h-4 w-4 text-brand-500" strokeWidth={2.6} />
          <span className="rounded-2xl bg-gold-300 px-3 py-2.5 text-[12.5px] font-bold leading-snug text-ink-950">{now}</span>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Part 3: the Venn diagram ---------- */
export function Venn() {
  return (
    <div aria-hidden="true" data-venn className="relative mx-auto aspect-[100/66] w-full max-w-[720px]">
      <div data-venn-a className="absolute left-0 top-[3%] aspect-square w-[62%] rounded-full bg-[radial-gradient(circle_at_35%_30%,#f5f3ff,#c4b3ea)] ring-1 ring-brand-300 will-change-transform">
        <span className="absolute left-[14%] top-[16%] font-display text-[clamp(0.85rem,0.6rem+0.8vw,1.15rem)] font-extrabold text-brand-800">Current field</span>
        <div className="absolute left-[10%] top-[40%] flex max-w-[44%] flex-col items-start gap-1.5">
          {['Hospital systems', 'Clinical rules'].map((t) => (
            <span key={t} data-venn-only className="rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-bold text-brand-700 sm:text-[12px]">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div data-venn-b className="absolute right-0 top-[3%] aspect-square w-[62%] rounded-full bg-[radial-gradient(circle_at_65%_30%,#fffbeb,#fcd34d)] ring-1 ring-gold-400 will-change-transform">
        <span className="absolute right-[16%] top-[16%] font-display text-[clamp(0.85rem,0.6rem+0.8vw,1.15rem)] font-extrabold text-gold-800">New field</span>
        <div className="absolute right-[9%] top-[40%] flex max-w-[44%] flex-col items-end gap-1.5">
          {['SQL', 'Process mapping'].map((t) => (
            <span key={t} data-venn-gap className="rounded-full border-2 border-dashed border-gold-700/50 bg-white/70 px-2.5 py-1 text-[11px] font-bold text-gold-800 sm:text-[12px]">
              Gap: {t}
            </span>
          ))}
        </div>
      </div>
      {/* The overlap: a lens exactly where the two circles meet */}
      <div data-venn-lens className="absolute left-[38%] top-[12.9%] flex h-[74.2%] w-[24%] flex-col items-center justify-center">
        <svg viewBox="0 0 240 490" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="csLens" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6d4cb0" />
              <stop offset="100%" stopColor="#311e59" />
            </linearGradient>
          </defs>
          <path d="M120 0 A310 310 0 0 1 120 490 A310 310 0 0 1 120 0 Z" fill="url(#csLens)" />
        </svg>
        <span className="relative font-display text-[clamp(0.7rem,0.5rem+0.6vw,0.95rem)] font-extrabold text-gold-300">Bridge role</span>
        <div className="relative mt-2 flex flex-col items-center gap-1">
          {['Scheduling', 'Reporting', 'Training', 'Budgets'].map((t) => (
            <span key={t} data-venn-both className="rounded-full bg-white px-1.5 py-0.5 text-[9px] font-bold text-brand-800 sm:px-2 sm:text-[11px]">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Part 3: a mini resume on top of each version card ---------- */
export function MiniResume({ tone }) {
  const bar = { old: 'bg-brand-300', now: 'bg-gold-400', both: 'bg-gradient-to-r from-brand-400 to-gold-400' }[tone];
  return (
    <div aria-hidden="true" className="relative h-[86px] overflow-hidden rounded-t-[22px] bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.5)_0_6px,transparent_6px_14px)] px-5 pt-4">
      <div className="mx-auto w-[70%] rounded-t-xl bg-white p-3 pb-6 shadow-[0_14px_30px_-18px_rgba(26,15,51,0.6)]">
        <span className={`block h-2 w-16 rounded ${bar}`} />
        <span className="mt-2 block h-1.5 w-full rounded bg-brand-100" />
        <span className="mt-1.5 block h-1.5 w-4/5 rounded bg-brand-100" />
        <span className="mt-1.5 block h-1.5 w-3/5 rounded bg-brand-100" />
      </div>
    </div>
  );
}

/* ---------- Part 4: the rounds where the why question shows up ---------- */
export function RoundsPath() {
  return (
    <div aria-hidden="true" className="relative grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
      <div className="rounded-[22px] bg-white/[0.07] p-4 ring-1 ring-white/15">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-400 text-ink-950">
          <Icon name="user" className="h-4.5 w-4.5" />
        </span>
        <p className="mt-3 font-display text-[15px] font-extrabold text-white">HR &amp; Introduction</p>
        <p className="mt-1 text-[12px] font-semibold leading-snug text-gold-300">The why question</p>
      </div>
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-white">
        <Icon name="arrow" className="h-4 w-4" strokeWidth={2.6} />
      </span>
      <div className="rounded-[22px] bg-white/[0.07] p-4 ring-1 ring-white/15">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-white">
          <Icon name="book" className="h-4.5 w-4.5" />
        </span>
        <p className="mt-3 font-display text-[15px] font-extrabold text-white">Role &amp; Knowledge</p>
        <p className="mt-1 text-[12px] font-semibold leading-snug text-brand-200">Where the gaps show</p>
      </div>
    </div>
  );
}
