import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Footer from "./components/Layout/Footer/Footer";
import Header from "./components/Layout/Header/Header";
import SiteVersionLogger from "./components/SiteVersionLogger";
import "./globals.scss";
import { siteVersion } from "./siteVersion";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Starter Next.js | Site Institucional",
    template: "%s | Starter Next.js",
  },
  description:
    "Template reutilizável para desenvolvimento de sites institucionais com Next.js, TypeScript e SCSS Modules.",

  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <SiteVersionLogger
          siteName="Next.js Institucional Starter"
          version={siteVersion}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
