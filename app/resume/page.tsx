import content from "@/lib/resume-content.json";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ResumeExperienceItem from "../components/ResumeExperienceItem";
import OpenChatButton from "../components/chat/OpenChatButton";
import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { contactConfig, socialConfig } from "@/lib/config";
import ResumeIndex, { type ResumeSection } from "./ResumeIndex";
import VisitorWelcome from "./VisitorWelcome";
import "./resume.css";

export const metadata: Metadata = buildMetadata({
  title: "David Larrimore | Resume",
  description:
    "Professional resume of David Larrimore - Senior Executive Technologist with expertise in IT modernization, AI strategy, cloud computing, and enterprise technology transformation",
  path: "/resume",
});

const SECTIONS: ResumeSection[] = [
  { id: "experience", label: "Experience" },
  { id: "awards", label: "Awards" },
  { id: "education", label: "Education" },
  { id: "expertise", label: "Expertise" },
  { id: "approach", label: "Approach" },
];

/** "DHS Secretary’s Silver Medal — 2025" → { name, year }. Nominations keep their "(Nominated)" out. */
function splitAward(entry: string) {
  const [name, rest = ""] = entry.split(" — ");
  return { name: name.trim(), year: rest.replace(/\(Nominated\)/i, "").trim() };
}

const linkedinLabel = socialConfig.linkedin.replace(/^https?:\/\/(www\.)?/, "");

/**
 * Résumé (Read surface, F-pattern): positioning, then Experience first, then the supporting
 * sections. Every fact comes from lib/resume-content.json; this page only arranges it.
 */
export default function ResumePage() {
  return (
    <>
      <Navbar />
      <VisitorWelcome />
      <main id="main" className="resume">
        <header className="resume-head">
          <h1 id="resume-title" tabIndex={-1} className="resume-title">
            Résumé
          </h1>
          <p className="resume-positioning">{content.profile}</p>
          <p className="resume-contact">
            <span>{content.location}</span>
            <span aria-hidden="true">·</span>
            <a href={`mailto:${contactConfig.email}`}>{contactConfig.email}</a>
            <span aria-hidden="true">·</span>
            <a href={socialConfig.linkedin} target="_blank" rel="noopener noreferrer">
              {linkedinLabel}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
          <div className="resume-actions no-print">
            <OpenChatButton className="ds-btn ds-btn-primary ds-btn-md" trackLabel="resume_open_chat">
              Ask my résumé a question
            </OpenChatButton>
            <a href="/api/download-resume" download="David_Larrimore_Resume.pdf" className="ds-btn ds-btn-secondary ds-btn-md">
              Download PDF
            </a>
          </div>
        </header>

        <div className="resume-layout">
          <ResumeIndex sections={SECTIONS} />

          <div className="resume-content">
            <section id="experience" className="resume-section" aria-labelledby="experience-title">
              <h2 id="experience-title" className="resume-h2">
                Experience
              </h2>
              {content.experience.map((role) => (
                <ResumeExperienceItem key={role.company} {...role} />
              ))}

              <div className="resume-earlier">
                <h3 className="resume-h3">Earlier roles</h3>
                <ul>
                  {content.earlier.map((role) => (
                    <li key={role.company + role.period}>
                      <p className="resume-earlier-line">
                        <span className="resume-earlier-period">{role.period}</span>
                        <span>
                          <strong>{role.title}</strong>, {role.company}
                        </span>
                      </p>
                      <p className="resume-earlier-desc">{role.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section id="awards" className="resume-section" aria-labelledby="awards-title">
              <h2 id="awards-title" className="resume-h2">
                Awards
              </h2>
              <ul className="resume-awards">
                {content.awards.map((a) => {
                  const { name, year } = splitAward(a);
                  return (
                    <li key={a}>
                      <span>{name}</span>
                      <span className="resume-year">{year}</span>
                    </li>
                  );
                })}
              </ul>
              {content.nominations.length > 0 && (
                <>
                  <h3 className="resume-h3 resume-nominations-title">Nominations</h3>
                  <ul className="resume-awards">
                    {content.nominations.map((a) => {
                      const { name, year } = splitAward(a);
                      return (
                        <li key={a}>
                          <span>{name}</span>
                          <span className="resume-year">{year}</span>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </section>

            <section id="education" className="resume-section" aria-labelledby="education-title">
              <h2 id="education-title" className="resume-h2">
                Education
              </h2>
              <ul className="resume-awards">
                {content.education.map((e) => (
                  <li key={e.degree + e.school}>
                    <span>
                      <strong>{e.degree}</strong>, {e.school}
                    </span>
                    <span className="resume-year">{e.year}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="expertise" className="resume-section" aria-labelledby="expertise-title">
              <h2 id="expertise-title" className="resume-h2">
                Expertise
              </h2>
              <dl className="resume-expertise">
                {content.expertise.map((t) => (
                  <div key={t.title}>
                    <dt>{t.title}</dt>
                    <dd>{t.body}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section id="approach" className="resume-section" aria-labelledby="approach-title">
              <h2 id="approach-title" className="resume-h2">
                Approach
              </h2>
              <p className="resume-lead">{content.about}</p>
              <div className="resume-approach">
                {content.approach.map((item) => (
                  <div key={item.title}>
                    <h3 className="resume-h3">{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
