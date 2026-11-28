import TrackedLink from "../ds/TrackedLink";

// Starter questions open the resume chatbot with the question already asked.
const STARTERS = [
  "What did you do as DHS Chief AI Officer?",
  "What AI have you built at Amivero?",
  "How was the DHS AI Corps hired?",
];

const askHref = (q: string) => `/projects/resumeChat?q=${encodeURIComponent(q)}`;

/**
 * Homepage hero (Persuade surface). One focal action: ask the resume chatbot, the working proof
 * that Dave builds with AI. The form is a plain GET, so it works before JavaScript loads.
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

          <form className="home-ask" action="/projects/resumeChat" method="get" role="search" aria-label="Ask my résumé">
            <label htmlFor="home-ask-input" className="home-ask-label">
              Ask my résumé a question
            </label>
            <div className="home-ask-row">
              <input
                id="home-ask-input"
                name="q"
                type="text"
                required
                maxLength={500}
                autoComplete="off"
                className="home-ask-input"
                placeholder="What did you lead at DHS?"
              />
              <button type="submit" className="ds-btn ds-btn-primary ds-btn-md">
                Ask
              </button>
            </div>
            <p className="home-ask-note">Answered by a Claude chatbot I built, grounded in my résumé.</p>
            <ul className="home-starters" aria-label="Example questions">
              {STARTERS.map((q) => (
                <li key={q}>
                  <TrackedLink href={askHref(q)} trackLabel="hero_starter_question" className="home-starter">
                    {q}
                  </TrackedLink>
                </li>
              ))}
            </ul>
          </form>

          <TrackedLink href="/resume" trackLabel="hero_resume_link" className="home-text-link">
            Read the full résumé <span aria-hidden="true">→</span>
          </TrackedLink>
        </div>

        <div className="home-portrait">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/profile.webp" alt="Dave Larrimore" width={320} height={320} fetchPriority="high" />
        </div>
      </div>
    </section>
  );
}
