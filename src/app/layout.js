import { Inter, Lexend } from 'next/font/google';
import 'lenis/dist/lenis.css';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import Cursor from '@/components/Cursor';
import JsonLd from '@/components/JsonLd';
import { siteSchema } from '@/lib/schema';
import { SITE_URL, PARENT_URL, BRAND, SEO, DEMO } from '@/content/site';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const lexend = Lexend({ subsets: ['latin'], variable: '--font-lexend', display: 'swap' });

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SEO.title, template: SEO.titleTemplate },
  description: SEO.description,
  applicationName: BRAND.name,
  keywords: SEO.keywords,
  authors: [{ name: BRAND.parent, url: PARENT_URL }],
  creator: BRAND.parent,
  publisher: BRAND.parent,
  category: 'technology',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  // The share image comes from app/opengraph-image.js
  openGraph: {
    type: 'website',
    siteName: 'JobHunter AI by SuperMIA',
    locale: 'en_US',
    url: '/',
    title: SEO.title,
    description: SEO.description,
    videos: [{ url: `${SITE_URL}${DEMO.src}`, type: 'video/mp4', width: 720, height: 1280 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO.title,
    description: SEO.description,
  },
};

export const viewport = {
  themeColor: '#1a0f33',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${lexend.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
        <Cursor />
        <JsonLd data={siteSchema} />
      </body>
    </html>
  );
}
