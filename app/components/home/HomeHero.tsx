import TrackedLink from "../ds/TrackedLink";
import OpenChatButton from "../chat/OpenChatButton";

// Starter questions open the chat dock with the question already asked.
const STARTERS = [
  "What did you do as DHS Chief AI Officer?",
  "What AI have you built at Amivero?",
  "How was the DHS AI Corps hired?",
];

/**
 * Homepage hero (Persuade surface). One focal action: open the chat with Dave's résumé bot,
 * the working proof that he builds with AI. It opens in place (the chat dock), never a new page.
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

          <div className="home-ask">
            <div className="home-ask-actions">
              <OpenChatButton className="ds-btn ds-btn-primary ds-btn-lg" trackLabel="hero_open_chat">
                Ask my AI about my work
              </OpenChatButton>
              <TrackedLink href="/resume" trackLabel="hero_resume_link" className="home-text-link">
                Read the résumé <span aria-hidden="true">→</span>
              </TrackedLink>
            </div>
            <p className="home-ask-note">A Claude chatbot I built, grounded in my résumé. Or start with:</p>
            <ul className="home-starters" aria-label="Example questions">
              {STARTERS.map((q) => (
                <li key={q}>
                  <OpenChatButton className="home-starter" question={q} trackLabel="hero_starter_question">
                    {q}
                  </OpenChatButton>
                </li>
              ))}
            </ul>
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
