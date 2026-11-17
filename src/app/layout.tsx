import { Geist, Geist_Mono } from 'next/font/google';

import { siteConfig, siteMetadata } from '@/config/site';
import Footer from './components/Layout/Footer/Footer';
import Header from './components/Layout/Header/Header';
import SiteVersionLogger from './components/SiteVersionLogger';
import './globals.scss';
import { siteVersion } from './siteVersion';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = siteMetadata;

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang={siteConfig.locale}
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <SiteVersionLogger
          siteName={siteConfig.name}
          version={siteVersion}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
