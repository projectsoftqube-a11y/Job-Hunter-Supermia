import Link from 'next/link';

/**
 * Visible breadcrumb trail (Home first, current page last and unlinked). The matching BreadcrumbList
 * JSON-LD is part of each page's graph (lib/schema breadcrumbNode), built from the same trail.
 */
export default function Breadcrumbs({ trail, tone = 'light', className = '' }) {
  const items = [{ name: 'Home', path: '/' }, ...trail];
  const muted = tone === 'dark' ? 'text-white/55 hover:text-gold-300' : 'text-ink-900/55 hover:text-brand-600';
  const current = tone === 'dark' ? 'text-white' : 'text-ink-950';
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] font-semibold">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className={current}>
                  {c.name}
                </span>
              ) : (
                <>
                  <Link href={c.path} className={`transition-colors ${muted}`}>
                    {c.name}
                  </Link>
                  <span aria-hidden="true" className={tone === 'dark' ? 'text-white/30' : 'text-ink-900/30'}>
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
