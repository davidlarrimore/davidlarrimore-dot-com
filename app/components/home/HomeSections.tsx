import Link from "next/link";
import content from "@/lib/resume-content.json";
import { contactConfig, socialConfig } from "@/lib/config";

/* All copy below comes from lib/resume-content.json (the single source of career facts),
   except the Resume Chatbot description, which matches app/projects/page.tsx. */

const projectBody = (name: string) => content.projects.find((p) => p.name === name)?.body ?? "";

const BUILT = [
  {
    name: "Resume Chatbot",
    body: "An AI-powered chatbot built with Next.js and Claude that answers questions about my professional background.",
    href: "/projects/resumeChat",
    image: "/images/resume-chatbot-icon.svg",
    action: "Try it",
  },
  {
    name: "NLP Playground",
    body: projectBody("NLP Playground"),
    href: "https://nlp-playground.davidlarrimore.com/",
    image: "/images/projects/nlp-playground.webp",
    action: "Open the labs",
  },
  {
    name: "E.L.V.I.S.",
    body: projectBody("ELVIS"),
    href: "https://elvis.davidlarrimore.com/",
    image: "/images/projects/elvis.webp",
    action: "Try a challenge",
  },
  {
    name: "Homelab",
    body: projectBody("Homelab"),
    href: "https://lab.davidlarrimore.com/",
    image: "/images/projects/homelab.webp",
    action: "Tour the lab",
  },
];

/** Three highlights as plain sentences: the number in strong text, never a big-number tile. */
export function ProofBand() {
  return (
    <section className="home-section home-proof" aria-labelledby="proof-title">
      <h2 id="proof-title" className="sr-only">
        Highlights
      </h2>
      <ul className="home-proof-list">
        {content.impact.slice(0, 3).map((item) => (
          <li key={item.value}>
            <strong>{item.value}</strong> {lowerFirst(item.label)}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function BuiltSection() {
  return (
    <section className="home-section" aria-labelledby="built-title">
      <div className="home-section-head">
        <h2 id="built-title" className="home-h2">
          What I&apos;m building
        </h2>
        <Link href="/projects" className="home-text-link">
          All projects <span aria-hidden="true">→</span>
        </Link>
      </div>
      <ul className="home-built">
        {BUILT.map((p) => {
          const external = p.href.startsWith("http");
          return (
            <li key={p.name} className="home-built-item">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt="" width={56} height={56} loading="lazy" decoding="async" className="home-built-icon" />
              <div className="home-built-text">
                <h3 className="home-h3">{p.name}</h3>
                <p>{p.body}</p>
              </div>
              <a
                href={p.href}
                className="home-built-link"
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {p.action}
                <span className="sr-only">: {p.name}{external ? " (opens in a new tab)" : ""}</span>
                <span aria-hidden="true">{external ? "↗" : "→"}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function FocusSection() {
  return (
    <section className="home-section" aria-labelledby="focus-title">
      <h2 id="focus-title" className="home-h2">
        What I work on
      </h2>
      <ul className="home-focus">
        {content.focus.map((f) => (
          <li key={f.title}>
            <h3 className="home-h3">{f.title}</h3>
            <p>{firstSentence(f.body)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function CareerSection() {
  return (
    <section className="home-section" aria-labelledby="career-title">
      <div className="home-section-head">
        <h2 id="career-title" className="home-h2">
          Career
        </h2>
        <Link href="/resume" className="home-text-link">
          Full résumé <span aria-hidden="true">→</span>
        </Link>
      </div>
      <ol className="home-career">
        {content.experience.slice(0, 4).map((role) => (
          <li key={role.company}>
            <p className="home-career-period">{role.period}</p>
            <h3 className="home-h3">{role.title}</h3>
            <p className="home-career-org">{role.company}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** The page ends on what to do next (peak-end rule): ask the chatbot or get in touch. */
export function ClosingSection() {
  return (
    <section className="home-section home-closing" aria-labelledby="closing-title">
      <div className="home-closing-beyond">
        <h2 className="home-h3">Outside work</h2>
        <p>{content.beyond}</p>
      </div>
      <div className="home-closing-cta">
        <h2 id="closing-title" className="home-h2">
          Let&apos;s talk
        </h2>
        <p>Ask the chatbot about my work, or reach out directly.</p>
        <div className="home-closing-actions">
          <Link href="/projects/resumeChat" className="ds-btn ds-btn-primary ds-btn-md">
            Ask my résumé
          </Link>
          <a href={`mailto:${contactConfig.email}`} className="ds-btn ds-btn-secondary ds-btn-md">
            Email me
          </a>
          <a href={socialConfig.linkedin} target="_blank" rel="noopener noreferrer" className="home-text-link">
            LinkedIn<span className="sr-only"> (opens in a new tab)</span> <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function firstSentence(text: string) {
  const end = text.search(/[.!?](\s|$)/);
  return end === -1 ? text : text.slice(0, end + 1);
}

function lowerFirst(text: string) {
  return text.charAt(0).toLowerCase() + text.slice(1);
}
