import { Inter, Lexend } from 'next/font/google';
import 'lenis/dist/lenis.css';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import Cursor from '@/components/Cursor';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const lexend = Lexend({ subsets: ['latin'], variable: '--font-lexend', display: 'swap' });

export const metadata = {
  metadataBase: new URL('https://jobhunter.supermia.ai'),
  title: 'Job Hunter | Find the role, practice the interview, land the offer',
  description:
    'Job Hunter searches LinkedIn, Indeed and Dice for you, scores your resume for every job, drafts the application email and lets you rehearse the interview out loud with an AI interviewer.',
  // Preview build: keep it out of search engines until launch is approved
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Job Hunter',
    description: 'Find the role. Practice the interview. Land the offer.',
    images: ['/images/hero-candidate.jpg'],
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
      </body>
    </html>
  );
}
