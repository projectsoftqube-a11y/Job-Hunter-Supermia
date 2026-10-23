import Link from 'next/link';
import { Icon } from '@/components/icons';

/*
 * "Keep exploring": where to go next from this page. A header column, then three numbered tiles, each
 * with a small code-drawn illustration of what it links to (a score ring, a search, a waveform...).
 * Descriptive anchor text, crawlable links. Hover motion is transform-only.
 */

const kindOf = (href) =>
  href.startsWith('/blog')
    ? 'guide'
    : href.includes('interview-questions')
      ? 'questions'
      : href.includes('mock')
        ? 'voice'
        : href.includes('email')
          ? 'mail'
          : href.includes('resume')
            ? 'score'
            : href.includes('job-match')
              ? 'search'
              : href.startsWith('/for-')
                ? 'people'
                : 'guide';

const LABEL = { guide: 'Guide', questions: 'Resource', voice: 'Feature', mail: 'Feature', score: 'Feature', search: 'Feature', people: 'For you' };

// Three tile skins so the row never reads as identical cards
const SKINS = [
  { card: 'bg-brand-950 text-white', art: 'bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950', meta: 'text-gold-300', text: 'text-white/65', arrow: 'bg-gold-400 text-ink-950' },
  { card: 'bg-light-lavender text-ink-950', art: 'bg-gradient-to-br from-brand-100 to-brand-300', meta: 'text-brand-600', text: 'text-ink-900/65', arrow: 'bg-brand-950 text-gold-400' },
  { card: 'bg-[#fff8e6] text-ink-950', art: 'bg-gradient-to-br from-gold-100 to-gold-300', meta: 'text-gold-800', text: 'text-ink-900/65', arrow: 'bg-brand-950 text-gold-400' },
];

function Art({ kind }) {
  switch (kind) {
    case 'score':
      return (
        <span className="flex items-center gap-4">
          <span className="relative flex h-20 w-20 items-center justify-center rounded-full" style={{ background: 'conic-gradient(#10b981 0 86%, rgba(255,255,255,0.35) 0)' }}>
            <span className="flex h-[62px] w-[62px] items-center justify-center rounded-full bg-white font-display text-xl font-extrabold text-ink-950">86</span>
          </span>
          <span className="space-y-2">
            <span className="block h-2 w-24 rounded-full bg-white/80" />
            <span className="block h-2 w-16 rounded-full bg-white/60" />
            <span className="block h-2 w-20 rounded-full bg-white/50" />
          </span>
        </span>
      );
    case 'search':
      return (
        <span className="w-full max-w-[230px] space-y-2">
          <span className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-[11px] font-semibold text-ink-900/60 shadow-sm">
            <Icon name="search" className="h-3.5 w-3.5 text-brand-600" />
            One search, three boards
          </span>
          {[92, 86, 79].map((n) => (
            <span key={n} className="flex items-center gap-2 rounded-lg bg-white/85 px-3 py-1.5">
              <span className="h-2 flex-1 rounded-full bg-brand-100" />
              <span className="text-[10px] font-bold text-emerald-600">{n}</span>
            </span>
          ))}
        </span>
      );
    case 'voice':
      return (
        <span className="flex h-16 items-center gap-[5px]">
          {[0.3, 0.55, 0.85, 0.5, 1, 0.7, 0.4, 0.9, 0.6, 0.35, 0.75, 0.5, 0.3].map((h, i) => (
            <span key={i} className="w-[6px] rounded-full bg-gradient-to-t from-brand-300 to-gold-400" style={{ height: `${h * 100}%` }} />
          ))}
        </span>
      );
    case 'mail':
      return (
        <span className="relative h-20 w-32">
          <span className="absolute inset-0 rounded-xl bg-white shadow-md" />
          <span className="absolute inset-x-0 top-0 h-12 overflow-hidden">
            <span className="absolute left-1/2 top-[-30px] h-16 w-16 -translate-x-1/2 rotate-45 rounded-md border-2 border-brand-200 bg-brand-50" />
          </span>
          <span className="absolute bottom-3 left-4 right-4 space-y-1.5">
            <span className="block h-1.5 w-3/4 rounded-full bg-brand-200" />
            <span className="block h-1.5 w-1/2 rounded-full bg-gold-300" />
          </span>
        </span>
      );
    case 'questions':
      return (
        <span className="relative flex h-20 w-36 items-center justify-center">
          <span className="absolute left-0 top-1 rounded-2xl rounded-bl-sm bg-white px-3 py-2 text-[11px] font-bold text-ink-950 shadow-md">Tell me about…</span>
          <span className="absolute bottom-0 right-0 flex h-11 w-11 items-center justify-center rounded-full bg-gold-400 font-display text-2xl font-extrabold text-ink-950">?</span>
        </span>
      );
    case 'people':
      return (
        <span className="flex -space-x-3">
          {['N', 'C', 'S', 'D', 'R'].map((l, i) => (
            <span key={l} className={`flex h-12 w-12 items-center justify-center rounded-full border-2 border-white font-display text-sm font-bold ${['bg-brand-500 text-white', 'bg-gold-400 text-ink-950', 'bg-brand-800 text-gold-300', 'bg-emerald-500 text-white', 'bg-brand-300 text-brand-950'][i]}`}>
              {l}
            </span>
          ))}
        </span>
      );
    default:
      return (
        <span className="relative h-20 w-28">
          <span className="absolute left-4 top-0 h-[76px] w-20 rotate-6 rounded-lg bg-white/50" />
          <span className="absolute left-2 top-1 h-[76px] w-20 -rotate-3 rounded-lg bg-white/75" />
          <span className="absolute left-0 top-2 flex h-[76px] w-20 flex-col gap-1.5 rounded-lg bg-white p-2.5 shadow-md">
            <span className="h-1.5 w-3/4 rounded-full bg-brand-600" />
            <span className="h-1.5 w-full rounded-full bg-brand-100" />
            <span className="h-1.5 w-5/6 rounded-full bg-brand-100" />
            <span className="h-1.5 w-2/3 rounded-full bg-brand-100" />
          </span>
        </span>
      );
  }
}

export default function RelatedCards({ items, heading = 'Keep exploring' }) {
  if (!items?.length) return null;
  return (
    <section aria-labelledby="related-title" className="relative bg-white py-16 sm:py-24">
      <div className="container-x grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,2.25fr)] lg:gap-12">
        <div className="min-w-0 lg:pt-4">
          <p className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em] text-brand-600">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
            Next stops
          </p>
          <h2 id="related-title" className="mt-4 font-display text-[clamp(1.9rem,1.3rem+2vw,3.2rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink-950">
            {heading}
          </h2>
          <p className="mt-4 max-w-[22rem] text-[16px] leading-relaxed text-ink-900/65">Pages that pick up where this one ends, so your next step is one click away.</p>
          <span aria-hidden="true" className="mt-8 hidden h-1.5 w-28 rounded-full bg-gradient-to-r from-brand-400 to-gold-400 lg:block" />
        </div>

        <ul className="grid min-w-0 gap-4 md:grid-cols-3">
          {items.map((r, i) => {
            const kind = kindOf(r.href);
            const skin = SKINS[i % SKINS.length];
            return (
              <li key={r.href} className="min-w-0">
                <Link
                  href={r.href}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] p-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 ${skin.card}`}
                >
                  <span aria-hidden="true" className={`relative flex h-40 items-center justify-center overflow-hidden rounded-[20px] ${skin.art}`}>
                    <span className="absolute right-3 top-2 font-display text-[3.4rem] font-extrabold leading-none tracking-[-0.06em] opacity-15">{String(i + 1).padStart(2, '0')}</span>
                    <span className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]">
                      <Art kind={kind} />
                    </span>
                  </span>
                  <span className="flex flex-1 flex-col px-3 pb-3 pt-5">
                    <span className={`text-[11.5px] font-bold uppercase tracking-[0.16em] ${skin.meta}`}>
                      {String(i + 1).padStart(2, '0')} · {LABEL[kind]}
                    </span>
                    <span className="mt-2 font-display text-[1.22rem] font-bold leading-snug tracking-[-0.02em]">{r.title}</span>
                    <span className={`mt-2 flex-1 text-[14.5px] leading-relaxed ${skin.text}`}>{r.text}</span>
                    <span className="mt-5 flex items-center justify-between gap-3">
                      <span className="text-[14px] font-bold">Read more</span>
                      <span className={`flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-500 group-hover:-rotate-45 ${skin.arrow}`} aria-hidden="true">
                        <Icon name="arrow" className="h-4 w-4" strokeWidth={2.4} />
                      </span>
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
