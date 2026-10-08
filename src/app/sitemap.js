import { SITE_URL, DEMO } from '@/content/site';
import { LEGAL_UPDATED } from '@/content/legal';

export default function sitemap() {
  const legal = new Date(LEGAL_UPDATED);
  return [
    {
      url: SITE_URL,
      lastModified: new Date(DEMO.uploadDate),
      changeFrequency: 'weekly',
      priority: 1,
      videos: [
        {
          title: DEMO.name,
          thumbnail_loc: `${SITE_URL}${DEMO.poster}`,
          description: DEMO.description,
          content_loc: `${SITE_URL}${DEMO.src}`,
          duration: Math.floor(DEMO.seconds),
          publication_date: DEMO.uploadDate,
        },
      ],
    },
    { url: `${SITE_URL}/privacy-policy`, lastModified: legal, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/terms-and-conditions`, lastModified: legal, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
