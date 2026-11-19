// app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { siteConfig } from "@/lib/config";
import { buildMetadata, siteUrl, SITE_DESCRIPTION } from "@/lib/seo";
import Analytics from "./components/Analytics";
import PixelCompanion from "./components/ds/PixelCompanion";

// Fonts are served from app/fonts (latin subset, OFL; see app/fonts/LICENSE.txt) rather than
// next/font/google, so builds never download from Google Fonts. Fetching them at build time
// made Railway builds fail intermittently under Turbopack.
const inter = localFont({
  src: [{ path: "./fonts/inter-latin-variable.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = localFont({
  src: [
    { path: "./fonts/ibm-plex-mono-latin-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ibm-plex-mono-latin-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/ibm-plex-mono-latin-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
});

// Site-wide defaults. Pages call buildMetadata() themselves so their link
// previews (LinkedIn, Slack, etc.) get a page-specific title, URL, and image.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...buildMetadata({ title: siteConfig.name, description: SITE_DESCRIPTION }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth dark ${inter.variable} ${plexMono.variable}`}>
      <body className="bg-[var(--bg)] text-[var(--fg)] antialiased">
        {children}
        <PixelCompanion />
        <Analytics />
      </body>
    </html>
  );
}