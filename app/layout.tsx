import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: siteConfig.name
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}