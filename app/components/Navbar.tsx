"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { contactConfig } from "@/lib/config";
import Button from "./ds/Button";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Resume", href: "/resume" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      style={{
        borderBottom: "1px solid var(--border)",
        background: "rgba(12,15,28,0.85)",
        backdropFilter: "blur(10px)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <div className="flex items-center justify-between px-5 py-4 md:px-10">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setIsMenuOpen(false)}>
          <div
            style={{
              width: 30,
              height: 30,
              border: "1px solid var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              font: "700 13px var(--font-mono)",
              color: "var(--accent-hover)",
              flexShrink: 0,
            }}
          >
            DL
          </div>
          <div style={{ font: "700 17px var(--font-sans)", color: "var(--fg)", letterSpacing: "var(--tracking-tight)" }}>
            Dave Larrimore
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  font: "600 12px var(--font-mono)",
                  textTransform: "uppercase",
                  letterSpacing: "var(--tracking-wide)",
                  color: active ? "var(--accent-hover)" : "var(--fg-secondary)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  borderBottom: active ? "2px solid var(--accent)" : "2px solid transparent",
                  paddingBottom: 4,
                }}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a href={`mailto:${contactConfig.email}`} className="hidden md:inline-flex">
            <Button variant="primary" size="sm">
              Contact Me
            </Button>
          </a>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className="md:hidden inline-flex items-center justify-center w-10 h-10"
            style={{ color: "var(--fg-secondary)" }}
            aria-controls="navbar-menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14" aria-hidden="true">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav
          id="navbar-menu"
          className="md:hidden flex flex-col gap-1 px-5 pb-4"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {LINKS.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 py-3"
                style={{
                  font: "600 12px var(--font-mono)",
                  textTransform: "uppercase",
                  letterSpacing: "var(--tracking-wide)",
                  color: active ? "var(--accent-hover)" : "var(--fg-secondary)",
                }}
              >
                {l.label}
              </Link>
            );
          })}
          <a href={`mailto:${contactConfig.email}`} className="mt-2">
            <Button variant="primary" size="sm" className="w-full">
              Contact Me
            </Button>
          </a>
        </nav>
      )}
    </header>
  );
}
