import Eyebrow from "./ds/Eyebrow";
import content from "@/lib/resume-content.json";

export default function SkillsSection() {
  return (
    <div style={{ background: "var(--surface-sunken)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div className="px-5 md:px-10 py-16 md:py-20" style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
        <Eyebrow>// areas of expertise</Eyebrow>
        <h2 style={{ font: "var(--text-h1)", marginBottom: 40 }}>Engineering, strategy, and growth</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {content.expertise.map((item) => <section key={item.title} style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: 24 }}>
            <h3 style={{ font: "600 16px var(--font-sans)", color: "var(--accent-hover)" }}>{item.title}</h3>
            <p className="mt-3" style={{ font: "14px/1.7 var(--font-sans)", color: "var(--fg-secondary)" }}>{item.body}</p>
          </section>)}
        </div>
      </div>
    </div>
  );
}
