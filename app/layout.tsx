import type { Metadata, Viewport } from 'next';
import { Cormorant, Outfit } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const cormorant = Cormorant({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['300', '400', '600']
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['200', '300', '400']
});

export const metadata: Metadata = {
  title: 'Antonela Butuc | MSc Nutritionist & Brain Health Coach',
  description: 'Helping high-achieving women navigate midlife with grace and purpose. MSc Nutritionist & Brain Health Coach specializing in hormonal balance, EFT, and holistic wellness.',
  keywords: ['nutritionist dublin', 'brain health coach', 'hormonal balance', 'EFT tapping', 'women\'s health', 'menopause nutrition'],
  authors: [{ name: 'Antonela Butuc' }],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Antonela Butuc'
  }
};

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable}`}>
      <body className="font-sans bg-obsidian text-cream">
        <div className="noise-overlay" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
