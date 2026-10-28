import { BRAND, SEO } from '@/content/site';

// Web app manifest (/manifest.webmanifest): name, colours and icons for "Add to Home Screen" and tab UI
export default function manifest() {
  return {
    name: BRAND.siteName,
    short_name: BRAND.name,
    description: SEO.description,
    start_url: '/',
    display: 'browser',
    background_color: '#ffffff',
    theme_color: '#1a0f33',
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
