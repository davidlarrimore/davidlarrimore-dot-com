"use client";

import Link from "next/link";
import { FaFileAlt } from "react-icons/fa";
import { event } from "@/lib/gtag";
import Avatar from "./ds/Avatar";
import Eyebrow from "./ds/Eyebrow";
import HeroCanvas from "./ds/HeroCanvas";

export default function HeroSection() {
  const trackEvent = (action: string, label: string) => {
    event({ action, category: "engagement", label });
  };

  return (
    <section
      className="relative overflow-hidden flex items-center"
      style={{ minHeight: 560, borderBottom: "1px solid var(--border)", background: "var(--bg)" }}
    >
      <HeroCanvas />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(120deg, rgba(12,15,28,0.85) 35%, rgba(12,15,28,0.4) 70%, rgba(61,110,242,0.12))",
        }}
      />
      <div
        className="relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-14 w-full px-5 md:px-10 py-16"
        style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}
      >
        <div
          className="relative flex-shrink-0"
          style={{
            width: 168,
            height: 168,
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            background: "linear-gradient(135deg, var(--accent), var(--accent2))",
            padding: 3,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              overflow: "hidden",
              background: "var(--surface)",
            }}
          >
            <Avatar src="/images/profile.webp" alt="Dave Larrimore" size={162} shape="square" />
          </div>
        </div>

        <div className="text-center md:text-left">
          <Eyebrow>// technologist · executive · builder</Eyebrow>
          <div
            style={{
              font: "var(--text-display)",
              letterSpacing: "var(--tracking-tight)",
              color: "var(--fg)",
              marginBottom: 16,
            }}
          >
            Hey, I&apos;m Dave Larrimore
          </div>
          <div
            className="mx-auto md:mx-0"
            style={{ font: "var(--text-body-lg)", color: "var(--fg-secondary)", marginBottom: 32, maxWidth: 520 }}
          >
            I build modern digital experiences and lead the teams that ship them — with a lifelong pull toward
            games, prototypes, and emerging tech.
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <Link
              href="/projects"
              onClick={() => trackEvent("click", "hero_projects_button")}
              className="ds-btn ds-btn-primary ds-btn-md"
            >
              View Projects
            </Link>
            <Link
              href="/resume"
              onClick={() => trackEvent("click", "hero_resume_button")}
              className="ds-btn ds-btn-secondary ds-btn-md"
            >
              <FaFileAlt /> View Resume
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
