import { Inter, Lexend } from 'next/font/google';
import 'lenis/dist/lenis.css';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import Nav from '@/components/Nav';
import Footer from '@/sections/Footer';
import JsonLd from '@/components/JsonLd';
import { siteSchema } from '@/lib/schema';
import { SITE_URL, PARENT_URL, BRAND, SEO, DEMO } from '@/content/site';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const lexend = Lexend({ subsets: ['latin'], variable: '--font-lexend', display: 'swap' });

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SEO.title, template: '%s | JobHunter' },
  description: SEO.description,
  applicationName: BRAND.name,
  authors: [{ name: BRAND.parent, url: PARENT_URL }],
  creator: BRAND.parent,
  publisher: BRAND.parent,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  // Share images come from the opengraph-image files (root, pages and posts)
  openGraph: {
    type: 'website',
    siteName: BRAND.siteName,
    locale: 'en_US',
    url: '/',
    title: SEO.title,
    description: SEO.description,
    videos: [{ url: `${SITE_URL}${DEMO.src}`, type: 'video/mp4', width: 720, height: 1280 }],
  },
  twitter: { card: 'summary_large_image', title: SEO.title, description: SEO.description },
};

export const viewport = {
  themeColor: '#1a0f33',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-US" className={`${inter.variable} ${lexend.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[95] focus:rounded-full focus:bg-gold-500 focus:px-5 focus:py-3 focus:font-semibold focus:text-ink-900">
          Skip to content
        </a>
        <SmoothScroll>
          <Nav />
          {children}
          <Footer />
        </SmoothScroll>
        <JsonLd data={siteSchema} />
      </body>
    </html>
  );
}
