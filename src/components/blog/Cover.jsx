import { Icon } from '@/components/icons';

/*
 * Post cover art drawn in code (no stock photos). Two columns that never overlap: on the left the
 * category icon, the post's big tag and the category label; on the right a small illustration of what
 * the post teaches (an email draft, a scored resume, the STAR tiles, a week plan, a fix list, a
 * comparison). Everything is sized in container units, so a card and the post header scale the same.
 * Decorative: the post title sits next to it as real text.
 */

const THEMES = {
  'job-search': { bg: 'from-brand-600 via-brand-800 to-brand-950', glow: 'rgba(244,180,0,0.42)', icon: 'briefcase' },
  resume: { bg: 'from-[#5b3fa3] via-brand-700 to-[#1f1240]', glow: 'rgba(196,179,234,0.5)', icon: 'doc' },
  'interview-prep': { bg: 'from-brand-900 via-[#2a1650] to-ink-950', glow: 'rgba(249,195,32,0.45)', icon: 'mic' },
};

const card = 'relative w-full rounded-[2.6cqw] bg-white p-[3cqw] shadow-[0_3cqw_6cqw_-2cqw_rgba(10,5,25,0.55)]';
const bar = (w, tone = 'bg-brand-100') => <span className={`block h-[1.25cqw] rounded-full ${tone}`} style={{ width: `${w}%` }} />;
const tick = (cls = 'bg-emerald-500 text-white') => (
  <span className={`flex h-[3.4cqw] w-[3.4cqw] shrink-0 items-center justify-center rounded-full ${cls}`}>
    <Icon name="check" className="h-[2cqw] w-[2cqw]" strokeWidth={3.4} />
  </span>
);

function Email() {
  return (
    <div className="relative w-full">
      <span className="absolute inset-x-[7cqw] -top-[5.2cqw] h-[20cqw] rounded-[2.6cqw] bg-white/15" />
      <span className="absolute inset-x-[3.5cqw] -top-[2.6cqw] h-[20cqw] rounded-[2.6cqw] bg-white/35" />
      <div className={card}>
        <div className="flex items-center gap-[1cqw] border-b border-ink-900/10 pb-[2cqw]">
          {['bg-rose-400', 'bg-gold-400', 'bg-emerald-400'].map((c) => (
            <span key={c} className={`h-[1.3cqw] w-[1.3cqw] rounded-full ${c}`} />
          ))}
          <span className="ml-[1.2cqw] text-[1.9cqw] font-semibold text-ink-900/45">New message</span>
        </div>
        <div className="mt-[2.2cqw] flex items-center gap-[1.6cqw]">
          <span className="w-[8cqw] text-[1.8cqw] font-semibold text-ink-900/40">To</span>
          {bar(48)}
        </div>
        <div className="mt-[1.8cqw] flex items-center gap-[1.6cqw]">
          <span className="w-[8cqw] text-[1.8cqw] font-semibold text-ink-900/40">Subject</span>
          {bar(70, 'bg-gold-300')}
        </div>
        <div className="mt-[2.8cqw] space-y-[1.5cqw]">
          {bar(100)}
          {bar(92)}
          {bar(58)}
        </div>
        <div className="mt-[3cqw] flex justify-end">
          <span className="inline-flex items-center gap-[0.8cqw] rounded-full bg-gold-400 px-[2.6cqw] py-[1.1cqw] text-[1.9cqw] font-bold text-ink-950">
            Send
            <Icon name="arrow" className="h-[2cqw] w-[2cqw]" strokeWidth={2.6} />
          </span>
        </div>
      </div>
    </div>
  );
}

function Resume() {
  return (
    <div className={`${card} rotate-[3deg]`}>
      <div className="flex items-start justify-between gap-[2cqw]">
        <div className="flex-1 space-y-[1.5cqw] pt-[0.6cqw]">
          {bar(62, 'bg-brand-600')}
          {bar(40, 'bg-brand-200')}
        </div>
        <span className="relative flex h-[11cqw] w-[11cqw] shrink-0 items-center justify-center rounded-full" style={{ background: 'conic-gradient(#10b981 0 92%, #ece8f7 0)' }}>
          <span className="flex h-[8.4cqw] w-[8.4cqw] items-center justify-center rounded-full bg-white font-display text-[3.4cqw] font-extrabold text-ink-950">92</span>
        </span>
      </div>
      <div className="mt-[3cqw] space-y-[1.5cqw]">
        {bar(100)}
        {bar(86)}
        {bar(94)}
        {bar(64)}
      </div>
      <div className="mt-[3cqw] flex flex-wrap gap-[1.2cqw]">
        {['Skills', 'Tools', 'Results'].map((s) => (
          <span key={s} className="inline-flex items-center gap-[0.8cqw] rounded-full bg-emerald-50 py-[0.7cqw] pl-[0.7cqw] pr-[1.6cqw] text-[1.8cqw] font-bold text-emerald-700">
            {tick()}
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function Star() {
  return (
    <div className="grid w-full grid-cols-2 gap-[2cqw]">
      {[
        ['S', 'Situation'],
        ['T', 'Task'],
        ['A', 'Action'],
        ['R', 'Result'],
      ].map(([l, w], i) => (
        <span key={l} className={`flex aspect-[1.15] flex-col justify-between rounded-[2.4cqw] p-[2.2cqw] ${i === 2 ? 'bg-gold-400 text-ink-950' : 'bg-white/10 text-white ring-1 ring-white/15'}`}>
          <span className="font-display text-[7.5cqw] font-extrabold leading-none">{l}</span>
          <span className={`text-[1.8cqw] font-bold uppercase tracking-[0.12em] ${i === 2 ? 'text-ink-950/70' : 'text-white/60'}`}>{w}</span>
        </span>
      ))}
    </div>
  );
}

function Week() {
  return (
    <div className={card}>
      <div className="flex items-center justify-between">
        <span className="text-[2cqw] font-bold text-ink-950">This week</span>
        <span className="rounded-full bg-gold-100 px-[1.4cqw] py-[0.5cqw] text-[1.6cqw] font-bold text-gold-700">Day 7: interview</span>
      </div>
      <div className="mt-[2.6cqw] grid grid-cols-7 gap-[0.9cqw]">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
          <span key={i} className="flex flex-col items-center gap-[0.9cqw]">
            <span className="text-[1.6cqw] font-bold text-ink-900/40">{d}</span>
            <span className={`flex aspect-square w-full items-center justify-center rounded-[1.2cqw] ${i < 5 ? 'bg-emerald-50 text-emerald-600' : i === 5 ? 'bg-brand-50 text-brand-500' : 'bg-gold-400 text-ink-950'}`}>
              <Icon name={i < 5 ? 'check' : i === 5 ? 'refresh' : 'mic'} className="h-[2.2cqw] w-[2.2cqw]" strokeWidth={i < 5 ? 3.2 : 2.4} />
            </span>
          </span>
        ))}
      </div>
      <div className="mt-[3cqw] space-y-[1.5cqw]">
        {bar(88)}
        {bar(60)}
      </div>
      <div className="mt-[3cqw] h-[1.6cqw] overflow-hidden rounded-full bg-brand-50">
        <span className="block h-full w-[72%] rounded-full bg-gradient-to-r from-brand-500 to-gold-400" />
      </div>
    </div>
  );
}

function Fixes() {
  return (
    <div className={card}>
      <div className="flex items-center justify-between">
        <span className="text-[2cqw] font-bold text-ink-950">Fix list</span>
        <span className="text-[1.7cqw] font-bold text-ink-900/45">3 of 7</span>
      </div>
      <ul className="mt-[2.2cqw] space-y-[1.4cqw]">
        {[88, 70, 80, 62].map((w, i) => (
          <li key={i} className={`flex items-center gap-[1.6cqw] rounded-[1.4cqw] p-[1.4cqw] ${i < 3 ? 'bg-emerald-50/70' : 'bg-brand-50/70'}`}>
            <span className="w-[2.6cqw] text-center font-display text-[1.9cqw] font-extrabold text-brand-600">{i + 1}</span>
            <span className="flex-1">{bar(w, i < 3 ? 'bg-emerald-200' : 'bg-brand-200')}</span>
            {i < 3 ? tick() : <span className="h-[3.4cqw] w-[3.4cqw] shrink-0 rounded-full border-[0.4cqw] border-brand-200" />}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Compare() {
  const rows = [
    [true, true, true],
    [true, false, true],
    [true, true, false],
    [false, true, false],
  ];
  return (
    <div className={card}>
      <div className="grid grid-cols-[1.6fr_repeat(3,1fr)] items-center gap-[1.2cqw] border-b border-ink-900/10 pb-[1.8cqw]">
        <span className="text-[1.8cqw] font-bold text-ink-900/45">Feature</span>
        {['bg-brand-500', 'bg-gold-400', 'bg-emerald-400'].map((c) => (
          <span key={c} className={`mx-auto h-[3cqw] w-[3cqw] rounded-[0.9cqw] ${c}`} />
        ))}
      </div>
      {rows.map((r, i) => (
        <div key={i} className="grid grid-cols-[1.6fr_repeat(3,1fr)] items-center gap-[1.2cqw] border-b border-ink-900/[0.06] py-[1.7cqw] last:border-0 last:pb-0">
          {bar([90, 70, 80, 60][i], 'bg-brand-100')}
          {r.map((on, j) => (
            <span key={j} className="mx-auto">
              {on ? tick('bg-emerald-100 text-emerald-600') : <span className="block h-[0.5cqw] w-[2.4cqw] rounded-full bg-ink-900/15" />}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

const ART = {
  'how-to-email-a-recruiter': Email,
  'match-resume-to-job-description': Resume,
  'behavioral-interview-practice': Star,
  'how-to-practice-for-an-interview': Week,
  'applied-to-jobs-no-response': Fixes,
  'best-ai-job-search-tools': Compare,
};
const ART_BY_CATEGORY = { 'job-search': Email, resume: Resume, 'interview-prep': Star };

export default function Cover({ slug, category, label, tag, className = '' }) {
  const t = THEMES[category] || THEMES['job-search'];
  const Art = ART[slug] || ART_BY_CATEGORY[category] || Email;
  const [big, small] = Array.isArray(tag) ? tag : [tag];

  return (
    <div aria-hidden="true" className={`@container relative isolate overflow-hidden bg-gradient-to-br ${t.bg} ${className}`}>
      <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 88% 8%, ${t.glow}, transparent 55%)` }} />
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '6cqw 6cqw',
          maskImage: 'radial-gradient(ellipse 80% 75% at 25% 25%, black, transparent)',
        }}
      />

      <div className="absolute inset-0 flex gap-[5cqw] p-[6.5cqw]">
        <div className="flex w-[34cqw] shrink-0 flex-col justify-between">
          <span className="flex h-[9.5cqw] w-[9.5cqw] items-center justify-center rounded-[2.6cqw] bg-gold-400 text-ink-950 shadow-[0_1.6cqw_3cqw_-1cqw_rgba(0,0,0,0.45)]">
            <Icon name={t.icon} className="h-[4.6cqw] w-[4.6cqw]" />
          </span>
          {big && (
            <span className="font-display font-extrabold leading-[0.92] tracking-[-0.04em] text-white">
              <span className="block text-[12cqw] text-gold-400">{big}</span>
              {small && <span className="mt-[0.8cqw] block text-[5.6cqw]">{small}</span>}
            </span>
          )}
          {label ? (
            <span className="self-start rounded-full bg-white/10 px-[2.2cqw] py-[0.9cqw] text-[max(9px,1.9cqw)] font-bold uppercase tracking-[0.14em] text-white/90 ring-1 ring-white/15">{label}</span>
          ) : (
            <span />
          )}
        </div>
        <div className="relative flex min-w-0 flex-1 items-center">
          <Art />
        </div>
      </div>
    </div>
  );
}
