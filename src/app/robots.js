import { SITE_URL } from '@/content/site';

// Launch Kit robots.txt: no Host line (non-standard). The app host is kept out of the index with an
// X-Robots-Tag header on app.jobhunter.supermia.ai, not here. AI search and answer-engine crawlers are
// named explicitly so the site can be read, cited and linked in AI answers (AEO/GEO).
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Bingbot',
  'DuckAssistBot',
  'CCBot',
  'meta-externalagent',
  'Amazonbot',
  'Bytespider',
];

export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: AI_CRAWLERS, allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
