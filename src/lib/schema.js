import { SITE_URL, PARENT_URL, APP_URL, BRAND, SEO, DEMO, FEATURES, FAQS } from '@/content/site';

/*
 * Structured data (schema.org JSON-LD) that tells search engines and AI answer engines what Job Hunter
 * is, that "JobHunter" / "JobHunter AI" are the same product, and that it belongs to SuperMIA.
 * Only facts that are on the page go in here: no ratings, reviews or prices.
 */

const ORG_ID = `${PARENT_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;
const APP_ID = `${SITE_URL}/#app`;
const PAGE_ID = `${SITE_URL}/#webpage`;
const VIDEO_ID = `${SITE_URL}/#demo-video`;

const abs = (path) => `${SITE_URL}${path}`;

const organization = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: BRAND.parent,
  legalName: BRAND.company,
  url: PARENT_URL,
  email: BRAND.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: BRAND.address.street,
    addressLocality: BRAND.address.city,
    addressRegion: BRAND.address.region,
    postalCode: BRAND.address.postalCode,
    addressCountry: BRAND.address.country,
  },
};

const website = {
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: SITE_URL,
  name: BRAND.name,
  alternateName: BRAND.alternateNames,
  inLanguage: 'en',
  publisher: { '@id': ORG_ID },
};

/** Site-wide: who publishes the site and what it is called. */
export const siteSchema = { '@context': 'https://schema.org', '@graph': [organization, website] };

/** Home page: the product, the demo video with its chapters, and the FAQ. */
export const homeSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': PAGE_ID,
      url: SITE_URL,
      name: SEO.title,
      description: SEO.description,
      inLanguage: 'en',
      isPartOf: { '@id': SITE_ID },
      about: { '@id': APP_ID },
      primaryImageOfPage: abs(DEMO.poster),
      video: { '@id': VIDEO_ID },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': APP_ID,
      name: BRAND.name,
      alternateName: BRAND.alternateNames,
      description: SEO.description,
      url: SITE_URL,
      installUrl: APP_URL,
      applicationCategory: 'BusinessApplication',
      applicationSubCategory: 'AI job search assistant',
      operatingSystem: 'Web browser',
      image: abs('/brand/logo.png'),
      screenshot: abs(DEMO.poster),
      featureList: FEATURES.map((f) => f.title),
      publisher: { '@id': ORG_ID },
      creator: { '@id': ORG_ID },
    },
    {
      '@type': 'VideoObject',
      '@id': VIDEO_ID,
      name: DEMO.name,
      description: DEMO.description,
      thumbnailUrl: [abs(DEMO.poster)],
      contentUrl: abs(DEMO.src),
      uploadDate: DEMO.uploadDate,
      duration: DEMO.duration,
      inLanguage: 'en',
      publisher: { '@id': ORG_ID },
      // Key moments: each link opens the page with the reel starting at that chapter
      hasPart: DEMO.chapters.map((c, i, all) => ({
        '@type': 'Clip',
        name: c.title,
        startOffset: c.start,
        endOffset: i < all.length - 1 ? all[i + 1].start : Math.floor(DEMO.seconds),
        url: `${SITE_URL}/?t=${c.start}#demo`,
      })),
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
};
