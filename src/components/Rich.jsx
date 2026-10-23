import Link from 'next/link';

/*
 * Renders the inline markup used in content strings: [anchor](href) links and **bold**.
 * Internal paths become <Link>, the app and mailto links plain anchors, other sites open in a new tab.
 * Everything is real, crawlable <a href> markup in the server HTML.
 */

// [anchor](href) or **bold**; a fresh RegExp is made per render (global regexes carry state)
const TOKEN_SOURCE = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/.source;

const linkClass = {
  light: 'font-semibold text-brand-600 underline decoration-brand-300 decoration-2 underline-offset-[3px] transition-colors hover:text-brand-800 hover:decoration-brand-600',
  dark: 'font-semibold text-gold-300 underline decoration-gold-300/40 decoration-2 underline-offset-[3px] transition-colors hover:text-gold-200 hover:decoration-gold-300',
};

export function RichLink({ href, children, tone = 'light', className }) {
  const cls = className ?? linkClass[tone];
  if (href.startsWith('/') && !href.startsWith('//')) {
    if (href.endsWith('.pdf')) {
      return (
        <a href={href} className={cls}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  // Only web and mail links are ever rendered as links (never javascript:, data: or other schemes)
  if (!/^(https?:\/\/|mailto:|#)/i.test(href)) return <span className={className}>{children}</span>;
  let host = '';
  try {
    host = href.startsWith('mailto:') || href.startsWith('#') ? '' : new URL(href).hostname;
  } catch {
    return <span className={className}>{children}</span>;
  }
  const own = !host || host === 'jobhunter.supermia.ai' || host.endsWith('.jobhunter.supermia.ai');
  return (
    <a href={href} className={cls} {...(own ? {} : { target: '_blank', rel: 'noopener noreferrer' })}>
      {children}
    </a>
  );
}

export default function Rich({ text = '', tone = 'light' }) {
  const out = [];
  let last = 0;
  let m;
  const token = new RegExp(TOKEN_SOURCE, 'g');
  while ((m = token.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) {
      out.push(
        <RichLink key={m.index} href={m[2]} tone={tone}>
          {m[1]}
        </RichLink>
      );
    } else {
      out.push(
        <strong key={m.index} className={tone === 'dark' ? 'font-bold text-white' : 'font-bold text-ink-950'}>
          {m[3]}
        </strong>
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
