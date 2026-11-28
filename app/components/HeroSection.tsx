import { FaFileAlt } from "react-icons/fa";
import Avatar from "./ds/Avatar";
import Eyebrow from "./ds/Eyebrow";
import HeroCanvas from "./ds/HeroCanvas";
import TrackedLink from "./ds/TrackedLink";

// Server component: only HeroCanvas and the tracked links run on the client.
// Phase 2 of the redesign replaces this hero (docs/DESIGN-CHARTER.md).
export default function HeroSection() {
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
            "linear-gradient(120deg, color-mix(in srgb, var(--bg) 85%, transparent) 35%, color-mix(in srgb, var(--bg) 40%, transparent) 70%, var(--accent-soft))",
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
            <Avatar src="/images/profile.webp" alt="Dave Larrimore" size={162} shape="square" loading="eager" />
          </div>
        </div>

        <div className="text-center md:text-left">
          <Eyebrow>// technologist · executive · builder</Eyebrow>
          <h1
            style={{
              font: "var(--text-display)",
              letterSpacing: "var(--tracking-tight)",
              color: "var(--fg)",
              marginBottom: 16,
            }}
          >
            Hey, I&apos;m Dave Larrimore
          </h1>
          <div
            className="mx-auto md:mx-0"
            style={{ font: "var(--text-body-lg)", color: "var(--fg-secondary)", marginBottom: 32, maxWidth: 520 }}
          >
            I build technology, lead teams, and turn complex challenges into practical solutions.
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <TrackedLink href="/projects" trackLabel="hero_projects_button" className="ds-btn ds-btn-primary ds-btn-md">
              View Projects
            </TrackedLink>
            <TrackedLink href="/resume" trackLabel="hero_resume_button" className="ds-btn ds-btn-secondary ds-btn-md">
              <FaFileAlt aria-hidden="true" /> View Resume
            </TrackedLink>
          </div>
        </div>
      </div>
    </section>
  );
}
