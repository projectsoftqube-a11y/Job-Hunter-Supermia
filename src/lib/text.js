/*
 * Small text helpers shared by server and client code.
 */

/** Plain text of a heading given as a string or as CreativeHeading lines (chips add no text). */
export function headingText(lines) {
  if (!lines) return '';
  if (typeof lines === 'string') return lines;
  return lines
    .map((parts) => parts.map((p) => (typeof p === 'string' ? p : p.mark || p.grad || p.outline || '')).join(''))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Strips the inline markup used in content strings ([text](href) and **bold**). */
export function plain(text = '') {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*([^*]+)\*\*/g, '$1');
}

/** Word count of every visible string in a content object. */
export function countWords(value) {
  if (typeof value === 'string') return plain(value).split(/\s+/).filter(Boolean).length;
  if (Array.isArray(value)) return value.reduce((n, v) => n + countWords(v), 0);
  if (value && typeof value === 'object') {
    return Object.entries(value).reduce((n, [k, v]) => (['slug', 'path', 'href', 'id', 'type', 'kind', 'visual', 'icon', 'style', 'tone', 'category', 'url', 'published', 'updated', 'chip'].includes(k) ? n : n + countWords(v)), 0);
  }
  return 0;
}

/** Reading time in whole minutes at 230 words a minute. */
export function readingMinutes(value) {
  return Math.max(1, Math.round(countWords(value) / 230));
}

/** Long US date, e.g. "October 22, 2026", from an ISO date string. */
export function longDate(iso) {
  const [y, m, d] = iso.slice(0, 10).split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}
