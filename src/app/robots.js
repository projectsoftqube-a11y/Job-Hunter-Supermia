import { SITE_URL } from '@/content/site';

// Launch Kit robots.txt: no Host line (non-standard). The app host is kept out of the index with an
// X-Robots-Tag header on app.jobhunter.supermia.ai, not here.
export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
