import content from "@/lib/resume-content.json";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ResumeExperienceItem from "../components/ResumeExperienceItem";
import Link from "next/link";
import { Metadata } from "next";
import { socialConfig } from "@/lib/config";
import Card from "../components/ds/Card";
import Eyebrow from "../components/ds/Eyebrow";
import Tag from "../components/ds/Tag";
import "./resume.css";
import VisitorWelcome from "./VisitorWelcome";

export const metadata: Metadata = {
  title: "David Larrimore | Resume",
  description:
    "Professional resume of David Larrimore - Senior Executive Technologist with expertise in IT modernization, AI strategy, cloud computing, and enterprise technology transformation",
};

export default function ResumePage() {
  return (
    <>
      <Navbar />
      <VisitorWelcome />
      <main style={{ minHeight: "100vh" }}>
        <div className="px-5 md:px-10 py-16 md:py-20" style={{ maxWidth: 760, margin: "0 auto" }}>
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-3">
            <div>
              <Eyebrow>// resume</Eyebrow>
              <h1 id="resume-title" tabIndex={-1} style={{ font: "var(--text-h1)", letterSpacing: "var(--tracking-tight)", color: "var(--fg)" }}>
                My Resume
              </h1>
            </div>
            <div className="flex flex-wrap gap-2.5 no-print">
              <Link href="/projects/resumeChat" className="ds-btn ds-btn-ghost ds-btn-sm">
                Chat with my Résumé
              </Link>
              <a href="/api/download-resume" download="David_Larrimore_Resume.pdf" className="ds-btn ds-btn-secondary ds-btn-md">
                Download PDF
              </a>
            </div>
          </div>
          <div style={{ font: "15px/1.6 var(--font-sans)", color: "var(--fg-secondary)", marginBottom: 48, maxWidth: 640 }}>
            {content.profile}<p className="mt-4">{content.about}</p>
          </div>

          {/* Contact */}
          <Card className="resume-section mb-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
              <div>
                <div style={{ font: "700 20px var(--font-sans)", color: "var(--fg)" }}>DAVID LARRIMORE</div>
                <div style={{ font: "14px var(--font-sans)", color: "var(--fg-secondary)" }}>
                  {content.tagline}
                </div>
              </div>
              <div className="md:text-right" style={{ font: "13px var(--font-sans)", color: "var(--fg-secondary)" }}>
                <div>davidlarrimore@gmail.com</div>
                <a href={socialConfig.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-hover)" }}>
                  {socialConfig.linkedin}
                </a>
              </div>
            </div>
          </Card>

          {/* Technical Expertise */}
          <Eyebrow color="var(--fg-muted)">// technical expertise</Eyebrow>
          <div className="grid md:grid-cols-2 gap-5 mb-12">
            {content.expertise.map((t) => (
              <div key={t.title}>
                <div style={{ font: "600 14px var(--font-sans)", color: "var(--accent-hover)", marginBottom: 6 }}>
                  {t.title}
                </div>
                <p style={{ font: "14px/1.6 var(--font-sans)", color: "var(--fg-secondary)" }}>{t.body}</p>
              </div>
            ))}
          </div>

          {/* Experience */}
          <Eyebrow color="var(--fg-muted)">// experience</Eyebrow>
          <div className="mb-12">
            {content.experience.map((role) => (
              <ResumeExperienceItem key={role.company} {...role} imageShape="square" />
            ))}

            <div>
              <Eyebrow color="var(--fg-muted)">// previous positions</Eyebrow>
              <ul className="list-disc pl-5 space-y-2" style={{ font: "14px/1.6 var(--font-sans)", color: "var(--fg-secondary)" }}>
                {content.earlier.map((role) => <li key={role.company}>{role.period}: {role.title} at {role.company}. {role.description}</li>)}
              </ul>
            </div>
          </div>

          {/* Awards */}
          <Eyebrow color="var(--fg-muted)">// awards & recognition</Eyebrow>
          <div className="flex flex-wrap gap-2">
            {[...content.awards, ...content.nominations].map((a) => (
              <Tag key={a} variant="blue">
                {a}
              </Tag>
            ))}
          </div>
          <div className="mt-12 space-y-6">
            <Eyebrow>// my approach to technology leadership</Eyebrow>
            {content.approach.map((item) => <section key={item.title}>
              <h2 style={{ color: "var(--fg)", font: "600 18px var(--font-sans)" }}>{item.title}</h2>
              <p className="mt-2" style={{ color: "var(--fg-secondary)", lineHeight: 1.7 }}>{item.body}</p>
            </section>)}
            <section><Eyebrow>// short professional biography</Eyebrow><p style={{ color: "var(--fg-secondary)", lineHeight: 1.7 }}>{content.shortBio}</p></section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
