import Link from 'next/link';
import Rich from '@/components/Rich';
import { Icon } from '@/components/icons';
import { APP_URL } from '@/content/site';

/*
 * Renders content blocks from the page and blog modules (see the content spec): paragraphs, lists,
 * step cards, icon cards, tables, callouts, example artifacts, interview question lists, and for
 * articles: h2/h3 headings and the product box. All server-rendered text.
 */

const TONES = {
  info: { box: 'border-brand-200 bg-brand-50/70', icon: 'bg-brand-600 text-white', name: 'spark' },
  success: { box: 'border-emerald-200 bg-emerald-50/70', icon: 'bg-emerald-600 text-white', name: 'check' },
  warn: { box: 'border-gold-300 bg-gold-50', icon: 'bg-gold-500 text-ink-950', name: 'shield' },
};

function Paragraph({ text }) {
  return (
    <p className="text-[17px] leading-[1.75] text-ink-900/75 sm:text-[18px]">
      <Rich text={text} />
    </p>
  );
}

function List({ items, style = 'check', ordered }) {
  const numbered = ordered || style === 'number';
  const Tag = numbered ? 'ol' : 'ul';
  return (
    <Tag className="space-y-3">
      {items.map((t, i) => (
        <li key={i} className="flex gap-3.5 text-[17px] leading-[1.65] text-ink-900/80">
          {numbered ? (
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-950 font-display text-[13px] font-extrabold text-gold-400">{i + 1}</span>
          ) : style === 'dot' ? (
            <span aria-hidden="true" className="mt-[0.7em] h-2 w-2 shrink-0 rounded-full bg-gold-500" />
          ) : (
            <span aria-hidden="true" className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-400 text-ink-950">
              <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
          )}
          <span className="min-w-0">
            <Rich text={t} />
          </span>
        </li>
      ))}
    </Tag>
  );
}

function Steps({ items }) {
  return (
    <ol className={`grid gap-4 sm:grid-cols-2 ${items.length === 3 ? 'lg:grid-cols-3' : items.length >= 4 ? 'lg:grid-cols-4' : ''}`}>
      {items.map((s, i) => (
        <li key={i} className="group relative overflow-hidden rounded-[26px] border border-hairline bg-white p-6 shadow-[0_24px_50px_-36px_rgba(26,15,51,0.5)] transition-transform duration-500 hover:-translate-y-1">
          <span aria-hidden="true" className="absolute -right-3 -top-6 font-display text-[6.5rem] font-extrabold leading-none tracking-[-0.06em] text-brand-50 transition-colors duration-500 group-hover:text-gold-100">
            {i + 1}
          </span>
          <span className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-950 font-display text-sm font-extrabold text-gold-400">{String(i + 1).padStart(2, '0')}</span>
          <h3 className="relative mt-5 font-display text-[1.2rem] font-bold leading-snug tracking-[-0.02em] text-ink-950">{s.title}</h3>
          <p className="relative mt-2 text-[15px] leading-relaxed text-ink-900/70">
            <Rich text={s.text} />
          </p>
        </li>
      ))}
    </ol>
  );
}

function Cards({ items, columns = 3 }) {
  const cols = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' }[columns] || 'sm:grid-cols-2 lg:grid-cols-3';
  return (
    <ul className={`grid gap-4 ${cols}`}>
      {items.map((c, i) => (
        <li key={i} className="group rounded-[26px] border border-hairline bg-white p-6 shadow-[0_24px_50px_-38px_rgba(26,15,51,0.5)] transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-brand-200">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-900 text-gold-300 shadow-[0_12px_24px_-12px_rgba(75,46,131,0.8)] transition-transform duration-500 group-hover:-rotate-6">
            <Icon name={c.icon || 'spark'} className="h-5 w-5" />
          </span>
          <h3 className="mt-5 font-display text-[1.15rem] font-bold leading-snug tracking-[-0.02em] text-ink-950">{c.title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-900/70">
            <Rich text={c.text} />
          </p>
        </li>
      ))}
    </ul>
  );
}

function Table({ head, rows }) {
  return (
    <div className="overflow-x-auto rounded-[22px] border border-hairline bg-white shadow-[0_24px_50px_-40px_rgba(26,15,51,0.5)]">
      <table className="w-full min-w-[560px] border-collapse text-left text-[15px]">
        <thead>
          <tr className="bg-brand-950 text-white">
            {head.map((h, i) => (
              <th key={i} scope="col" className="px-5 py-3.5 font-display text-[13px] font-bold uppercase tracking-[0.08em]">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-hairline align-top even:bg-light-lavender/60">
              {r.map((cell, j) => (
                <td key={j} className={`px-5 py-4 leading-relaxed ${j === 0 ? 'font-bold text-ink-950' : 'text-ink-900/75'}`}>
                  <Rich text={String(cell)} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Callout({ tone = 'info', title, text }) {
  const t = TONES[tone] || TONES.info;
  return (
    <aside className={`flex gap-4 rounded-[22px] border p-5 sm:p-6 ${t.box}`}>
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${t.icon}`} aria-hidden="true">
        <Icon name={t.name} className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        {title && <p className="font-display text-[1.05rem] font-bold text-ink-950">{title}</p>}
        <p className={`text-[16px] leading-relaxed text-ink-900/80 ${title ? 'mt-1' : ''}`}>
          <Rich text={text} />
        </p>
      </div>
    </aside>
  );
}

function Example({ label, meta, lines }) {
  return (
    <figure className="overflow-hidden rounded-[22px] border border-hairline bg-white shadow-[0_30px_60px_-40px_rgba(26,15,51,0.6)]">
      <figcaption className="flex items-center gap-3 border-b border-hairline bg-light-lavender px-5 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-gold-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
        </span>
        <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-brand-600">{label}</span>
      </figcaption>
      <div className="px-5 py-5 sm:px-7 sm:py-6">
        {meta && <p className="mb-4 rounded-xl bg-brand-50 px-3.5 py-2 text-[14px] font-semibold text-brand-800">{meta}</p>}
        <div className="space-y-3 text-[15.5px] leading-relaxed text-ink-900/85">
          {lines.map((l, i) => (
            <p key={i} className={l === '' ? 'h-1' : ''}>
              <Rich text={l} />
            </p>
          ))}
        </div>
      </div>
    </figure>
  );
}

function Questions({ items }) {
  return (
    <ol className="grid gap-3 md:grid-cols-2">
      {items.map((it, i) => (
        <li key={i} className="flex gap-4 rounded-[22px] border border-hairline bg-white p-5 shadow-[0_20px_40px_-34px_rgba(26,15,51,0.5)]">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-400 font-display text-[13px] font-extrabold text-ink-950">{i + 1}</span>
          <div className="min-w-0">
            <h3 className="font-display text-[1.05rem] font-bold leading-snug tracking-[-0.01em] text-ink-950">{it.q}</h3>
            {it.hint && (
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-900/65">
                <Rich text={it.hint} />
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Product box inside an article: one honest paragraph about JobHunter. */
function Product({ text }) {
  return (
    <aside className="relative overflow-hidden rounded-[28px] bg-brand-950 p-6 text-white shadow-[0_40px_80px_-40px_rgba(26,15,51,0.9)] sm:p-8">
      <div aria-hidden="true" className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,rgba(244,180,0,0.3),transparent)]" />
      <p className="relative flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em] text-gold-300">
        <Icon name="spark" className="h-4 w-4" />
        How JobHunter helps
      </p>
      <p className="relative mt-3 text-[16.5px] leading-relaxed text-brand-100">
        <Rich text={text} tone="dark" />
      </p>
      <div className="relative mt-5 flex flex-wrap items-center gap-4">
        <a href={APP_URL} className="inline-flex h-11 items-center gap-2 rounded-full bg-gold-500 pl-5 pr-1.5 text-[14px] font-bold text-ink-950 transition-colors hover:bg-gold-300">
          Start your job hunt
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-950 text-gold-400" aria-hidden="true">
            <Icon name="arrow" className="h-4 w-4" strokeWidth={2.4} />
          </span>
        </a>
        <Link href="/#demo" className="text-[14px] font-bold text-white underline decoration-white/30 underline-offset-4 hover:decoration-gold-400">
          Watch the 47-second demo
        </Link>
      </div>
    </aside>
  );
}

export function Block({ b }) {
  switch (b.type) {
    case 'p':
      return <Paragraph text={b.text} />;
    case 'list':
      return <List items={b.items} style={b.style} ordered={b.ordered} />;
    case 'steps':
      return <Steps items={b.items} />;
    case 'cards':
      return <Cards items={b.items} columns={b.columns} />;
    case 'table':
      return <Table head={b.head} rows={b.rows} />;
    case 'callout':
      return <Callout tone={b.tone} title={b.title} text={b.text} />;
    case 'example':
      return <Example label={b.label} meta={b.meta} lines={b.lines} />;
    case 'questions':
      return <Questions items={b.items} />;
    case 'product':
      return <Product text={b.text} />;
    case 'h2':
      return (
        <h2 id={b.id} className="scroll-mt-28 pt-6 font-display text-[clamp(1.6rem,1.2rem+1.2vw,2.25rem)] font-extrabold leading-[1.12] tracking-[-0.03em] text-ink-950">
          {b.text}
        </h2>
      );
    case 'h3':
      return <h3 className="pt-2 font-display text-[1.3rem] font-bold leading-snug tracking-[-0.02em] text-ink-950">{b.text}</h3>;
    default:
      return null;
  }
}

export default function Blocks({ blocks = [], className = 'space-y-6' }) {
  return (
    <div className={className}>
      {blocks.map((b, i) => (
        <Block key={i} b={b} />
      ))}
    </div>
  );
}
