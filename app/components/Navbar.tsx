"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { contactConfig } from "@/lib/config";
import ThemeToggle from "./ds/ThemeToggle";

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
    <header className="ds-header">
      <div className="ds-header-bar">
        <Link href="/" className="ds-brand" onClick={() => setIsMenuOpen(false)}>
          <span className="ds-brand-mark" aria-hidden="true">
            DL
          </span>
          <span className="ds-brand-name">Dave Larrimore</span>
        </Link>

        <nav aria-label="Main" className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="ds-nav-link"
              aria-current={isActive(l.href) ? "page" : undefined}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {/* The wrapper carries the breakpoint: .ds-btn sets display and would override `hidden`. */}
          <span className="hidden md:inline-flex">
            <a href={`mailto:${contactConfig.email}`} className="ds-btn ds-btn-secondary ds-btn-sm">
              Contact Me
            </a>
          </span>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className="ds-icon-btn md:hidden"
            aria-controls="navbar-menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">{isMenuOpen ? "Close main menu" : "Open main menu"}</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14" aria-hidden="true">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav id="navbar-menu" aria-label="Main" className="ds-nav-mobile md:hidden flex flex-col px-5 pb-4">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setIsMenuOpen(false)}
              className="ds-nav-link"
              aria-current={isActive(l.href) ? "page" : undefined}
            >
              {l.label}
            </Link>
          ))}
          <a href={`mailto:${contactConfig.email}`} className="ds-btn ds-btn-secondary ds-btn-md mt-2 w-full">
            Contact Me
          </a>
        </nav>
      )}
    </header>
  );
}
