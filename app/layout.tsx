import type { Metadata } from "next";
import ReactLenis from "lenis/react";
import CookieConsent from "./components/CookieConsent";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "./seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  classification: "Digital marketing, artificial intelligence, SEO and web development agency",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <ReactLenis root options={{ lerp: 0.085, duration: 1.2, smoothWheel: true }}>
          <a href="#main-content" className="fixed left-4 top-3 z-[200] -translate-y-24 rounded-full bg-[var(--acid)] px-5 py-3 text-xs font-black uppercase tracking-wider text-[var(--ink)] transition-transform focus:translate-y-0">Skip to content</a>
          {children}
        </ReactLenis>
        <CookieConsent />
      </body>
    </html>
  );
}
