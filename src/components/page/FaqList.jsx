import Rich from '@/components/Rich';

/**
 * FAQ accordion built on <details>: every answer is in the server HTML on first load (no fetch on
 * click), and it works without JavaScript. The first item starts open. Whether FAQPage markup is added
 * is the page's decision (only /faq does).
 */
export default function FaqList({ items, idPrefix = 'faq', openFirst = true, headingLevel = 3 }) {
  const H = `h${headingLevel}`;
  return (
    <div className="space-y-3">
      {items.map((it, i) => (
        <details key={it.q} id={`${idPrefix}-${i + 1}`} open={openFirst && i === 0} className="group scroll-mt-28 overflow-hidden rounded-3xl border border-hairline bg-white/70 transition-colors duration-300 open:border-brand-200 open:bg-white hover:bg-white">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-5 p-5 sm:p-6 [&::-webkit-details-marker]:hidden">
            <H className="font-display text-[1.08rem] font-bold leading-snug tracking-[-0.01em] text-ink-950 sm:text-[1.15rem]">{it.q}</H>
            <span aria-hidden="true" className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition-transform duration-500 group-open:rotate-45 group-open:bg-brand-950 group-open:text-gold-400">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className="h-4 w-4">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </summary>
          <div className="px-5 pb-6 text-[16px] leading-[1.75] text-ink-900/75 sm:px-6">
            <Rich text={it.a} />
          </div>
        </details>
      ))}
    </div>
  );
}
