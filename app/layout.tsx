// app/layout.tsx
import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/config";
import { buildMetadata, siteUrl, SITE_DESCRIPTION } from "@/lib/seo";
import Analytics from "./components/Analytics";
import PixelCompanion from "./components/ds/PixelCompanion";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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