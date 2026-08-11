import type { Metadata } from "next";
import ReactLenis from "lenis/react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://alvirotech.com"),
  title: "Alviro Tech — Digital Growth Systems",
  description: "Alviro Tech builds high-performance websites, campaigns, brands, and growth systems for ambitious businesses.",
  keywords: ["digital marketing agency", "web development", "performance marketing", "SEO", "branding", "Alviro Tech"],
  openGraph: {
    title: "Alviro Tech — Stop Guessing. Start Scaling.",
    description: "Strategy, design, technology, and performance working as one connected growth system.",
    type: "website",
    url: "https://alvirotech.com",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ReactLenis root options={{ lerp: 0.085, duration: 1.2, smoothWheel: true }}>
          <a href="#main-content" className="fixed left-4 top-3 z-[200] -translate-y-24 rounded-full bg-[var(--acid)] px-5 py-3 text-xs font-black uppercase tracking-wider text-[var(--ink)] transition-transform focus:translate-y-0">Skip to content</a>
          {children}
        </ReactLenis>
      </body>
    </html>
  );
}
