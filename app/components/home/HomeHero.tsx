import { contactConfig } from "@/lib/config";
import TrackedLink from "../ds/TrackedLink";

/**
 * Homepage hero (Persuade surface): who Dave is, the credential, and two plain next steps.
 * The chatbot is deliberately not here: it is an always-available helper (the pixel sprite's
 * chat dock) and the "What I'm building" list, not the hero's job (Dave's call, 2026-11-28).
 * Credential wording follows lib/resume-content.json `profile`; confirm changes with Dave.
 */
export default function HomeHero() {
  return (
    <section className="home-hero" aria-labelledby="home-title">
      <div className="home-hero-inner">
        <div className="home-hero-copy">
          <h1 id="home-title" className="home-name">
            Dave Larrimore
          </h1>
          <p className="home-credential">
            Former Chief Technology Officer and Chief AI Officer of the U.S. Department of Homeland Security. Today I
            build and operate production AI platforms, and develop the engineers who run them.
          </p>
          <div className="home-hero-actions">
            <TrackedLink href="/resume" trackLabel="hero_resume_button" className="ds-btn ds-btn-primary ds-btn-lg">
              Read the résumé
            </TrackedLink>
            <a href={`mailto:${contactConfig.email}`} className="ds-btn ds-btn-secondary ds-btn-lg">
              Get in touch
            </a>
          </div>
        </div>

        <div className="home-portrait">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/profile.webp" alt="Dave Larrimore" width={320} height={320} fetchPriority="high" />
        </div>
      </div>
    </section>
  );
}
