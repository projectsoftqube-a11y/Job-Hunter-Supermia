import { SITE_URL, PARENT_URL, APP_URL, BRAND, SEO, DEMO, PRICING } from '@/content/site';
import { FAQ_PAGE } from '@/content/faq';
import { plain } from '@/lib/text';

/*
 * Structured data (schema.org JSON-LD), per the SEO Audit section 9.
 * - The Organization, WebSite and SoftwareApplication nodes are output sitewide from the root layout, so
 *   every page's @id references resolve. The Organization @id matches supermia.ai so Google merges them.
 * - FAQPage is built from the exact strings each page renders. A question also answered on /faq is
 *   marked up there only, so no question is claimed by two pages. Offers come from the confirmed
 *   pricing. No Review or AggregateRating until real, consented reviews exist.
 */

export const ORG_ID = `${PARENT_URL}/#organization`;
export const SITE_ID = `${SITE_URL}/#website`;
export const APP_ID = `${SITE_URL}/#software`;
const VIDEO_ID = `${SITE_URL}/#demo-video`;

export const abs = (path = '/') => (path.startsWith('http') ? path : `${SITE_URL}${path === '/' ? '/' : path}`);
// Each plan's Offer has a stable @id so the /pricing OfferCatalog can point at it
const planId = (p) => `${abs(PRICING.path)}#plan-${p.id}`;
// Every page has its own 1200x630 share card at <path>/opengraph-image
const shareImage = (path) => ({ '@type': 'ImageObject', url: abs(path === '/' ? '/opengraph-image' : `${path}/opengraph-image`), width: 1200, height: 630 });

const organization = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: BRAND.parent,
  legalName: BRAND.company,
  url: `${PARENT_URL}/`,
  email: BRAND.email,
  logo: { '@type': 'ImageObject', url: `${PARENT_URL}/images/logo.svg` },
  address: {
    '@type': 'PostalAddress',
    streetAddress: BRAND.address.street,
    addressLocality: BRAND.address.city,
    addressRegion: BRAND.address.region,
    postalCode: BRAND.address.postalCode,
    addressCountry: BRAND.address.country,
  },
  // Only real profile URLs ship: no empty, "#" or placeholder entries
  sameAs: BRAND.sameAs.filter((u) => /^https:\/\/[^#\s]+$/.test(u)),
  knowsAbout: ['Conversational AI', 'AI agents', 'AI job search', 'Resume matching', 'AI mock interviews', 'Interview practice'],
};

const website = {
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: `${SITE_URL}/`,
  name: BRAND.siteName,
  alternateName: BRAND.alternateNames,
  inLanguage: 'en-US',
  publisher: { '@id': ORG_ID },
};

const software = {
  '@type': 'SoftwareApplication',
  '@id': APP_ID,
  name: BRAND.name,
  alternateName: BRAND.alternateNames,
  url: `${SITE_URL}/`,
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'AI job search and interview practice',
  operatingSystem: 'Web browser',
  description:
    'AI job search and interview practice app that searches LinkedIn, Indeed and Dice in one search, scores your resume for each job, drafts the application email and runs live voice mock interviews with a scorecard.',
  audience: { '@type': 'Audience', audienceType: 'Job seekers, including new graduates, career switchers, software engineers, designers, analysts and people returning to work' },
  // The job boards it searches, linked to their public entities
  mentions: [
    { '@type': 'Organization', name: 'LinkedIn', sameAs: 'https://en.wikipedia.org/wiki/LinkedIn' },
    { '@type': 'Organization', name: 'Indeed', sameAs: 'https://en.wikipedia.org/wiki/Indeed' },
    { '@type': 'Organization', name: 'Dice', sameAs: 'https://en.wikipedia.org/wiki/Dice_Holdings' },
  ],
  featureList: [
    'One search across LinkedIn, Indeed and Dice',
    'Resume match score out of 100 with missing skills',
    'Application email drafted for each role',
    'Live voice AI mock interview with four rounds',
    'Guided practice and real simulation modes',
    'Interview scorecard with a 0-10 readiness score',
  ],
  image: abs('/opengraph-image'),
  installUrl: APP_URL,
  offers: PRICING.plans.map((p) => ({
    '@type': 'Offer',
    '@id': planId(p),
    name: `${BRAND.name} ${p.name}`,
    price: String(p.price),
    priceCurrency: PRICING.currency,
    url: abs(PRICING.path),
    ...(p.price > 0 ? { priceSpecification: { '@type': 'UnitPriceSpecification', price: String(p.price), priceCurrency: PRICING.currency, billingDuration: 'P1M', unitCode: 'MON' } } : {}),
  })),
  publisher: { '@id': ORG_ID },
  provider: { '@id': ORG_ID },
};

/** Sitewide graph, rendered once from the root layout. */
export const siteSchema = { '@context': 'https://schema.org', '@graph': [organization, website, software] };

/** BreadcrumbList for an inner page. `trail` = [{ name, path }], Home is added first. */
export function breadcrumbNode(path, trail) {
  const items = [{ name: 'Home', path: '/' }, ...trail];
  return {
    '@type': 'BreadcrumbList',
    '@id': `${abs(path)}#breadcrumb`,
    itemListElement: items.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.path) })),
  };
}

/** WebPage (or a subtype) node for a page. */
export function pageNode({ path, name, description, type = 'WebPage', about = APP_ID, breadcrumb = true, updated = SEO.updated, extra = {} }) {
  return {
    '@type': type,
    '@id': `${abs(path)}#webpage`,
    url: abs(path),
    name,
    description,
    inLanguage: 'en-US',
    isPartOf: { '@id': SITE_ID },
    ...(about ? { about: { '@id': about } } : {}),
    publisher: { '@id': ORG_ID },
    ...(breadcrumb ? { breadcrumb: { '@id': `${abs(path)}#breadcrumb` } } : {}),
    dateModified: updated,
    primaryImageOfPage: shareImage(path),
    ...extra,
  };
}

export const graph = (...nodes) => ({ '@context': 'https://schema.org', '@graph': nodes.filter(Boolean) });

/** Home page: WebPage plus the demo video with its chapters as key moments. */
export const homeSchema = graph(
  pageNode({
    path: '/',
    name: SEO.title,
    description: SEO.description,
    breadcrumb: false,
    extra: {
      mainEntity: { '@id': APP_ID },
      video: { '@id': VIDEO_ID },
    },
  }),
  {
    '@type': 'VideoObject',
    '@id': VIDEO_ID,
    name: DEMO.name,
    description: DEMO.description,
    thumbnailUrl: [abs(DEMO.poster)],
    contentUrl: abs(DEMO.src),
    uploadDate: DEMO.uploadDate,
    duration: DEMO.duration,
    inLanguage: 'en-US',
    publisher: { '@id': ORG_ID },
    hasPart: DEMO.chapters.map((c, i, all) => ({
      '@type': 'Clip',
      name: c.title,
      startOffset: c.start,
      endOffset: i < all.length - 1 ? all[i + 1].start : Math.floor(DEMO.seconds),
      url: `${SITE_URL}/?t=${c.start}#demo`,
    })),
  }
);

const FAQ_HUB_QUESTIONS = new Set(FAQ_PAGE.groups.flatMap((g) => g.items.map((f) => f.q)));

/**
 * FAQPage node from the rendered { q, a } items; answers lose their inline markup so the text matches
 * what readers see. Off /faq, questions that /faq also answers are left out. Returns null when no
 * question is left, so graph() drops it.
 */
export function faqNode(path, items = []) {
  const own = path === FAQ_PAGE.path ? items : items.filter((f) => !FAQ_HUB_QUESTIONS.has(f.q));
  if (own.length === 0) return null;
  return {
    '@type': 'FAQPage',
    '@id': `${abs(path)}#faq`,
    isPartOf: { '@id': `${abs(path)}#webpage` },
    mainEntity: own.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: plain(f.a) } })),
  };
}

/** OfferCatalog of the published plans, pointing at the Offers on the SoftwareApplication node. */
export const offerCatalogNode = () => ({
  '@type': 'OfferCatalog',
  '@id': `${abs(PRICING.path)}#plans`,
  name: `${BRAND.name} plans`,
  itemListElement: PRICING.plans.map((p, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@id': planId(p) } })),
});

/** Points voice assistants at the page's answer blocks (elements marked data-speakable). */
export const speakable = { '@type': 'SpeakableSpecification', cssSelector: ['[data-speakable]'] };

/** BlogPosting node for an article. */
export function articleNode({ path, headline, description, published, updated, image, section, words }) {
  return {
    '@type': 'BlogPosting',
    '@id': `${abs(path)}#article`,
    headline,
    description,
    url: abs(path),
    mainEntityOfPage: { '@id': `${abs(path)}#webpage` },
    datePublished: published,
    dateModified: updated,
    inLanguage: 'en-US',
    articleSection: section,
    wordCount: words,
    image: abs(image),
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    isPartOf: { '@type': 'Blog', '@id': `${SITE_URL}/blog#blog`, name: `${BRAND.name} Blog`, url: abs('/blog'), publisher: { '@id': ORG_ID } },
    about: { '@id': APP_ID },
  };
}

/** ItemList of links (posts on a hub, questions by round). */
export function itemListNode(path, name, entries) {
  return {
    '@type': 'ItemList',
    '@id': `${abs(path)}#list`,
    name,
    itemListElement: entries.map((e, i) => ({ '@type': 'ListItem', position: i + 1, name: e.name, ...(e.path ? { url: abs(e.path) } : {}) })),
  };
}
