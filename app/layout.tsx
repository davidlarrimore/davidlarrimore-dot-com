import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "David Larrimore | Personal Website",
  description: "Professional profile, projects and resume of David Larrimore",
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