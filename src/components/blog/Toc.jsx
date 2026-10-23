'use client';

import { useEffect, useState } from 'react';

/** "On this page" list for an article; the section being read is highlighted. Links work without JS. */
export default function Toc({ items }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        const seen = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (seen[0]) setActive(seen[0].target.id);
      },
      { rootMargin: '-15% 0px -70% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page">
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-ink-900/45">On this page</p>
      <ol className="relative space-y-1 border-l border-hairline">
        {items.map((it) => {
          const on = active === it.id;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                aria-current={on ? 'location' : undefined}
                className={`-ml-px block border-l-2 py-1.5 pl-4 text-[14px] font-semibold leading-snug transition-colors ${on ? 'border-gold-500 text-ink-950' : 'border-transparent text-ink-900/50 hover:text-ink-900'}`}
              >
                {it.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
