import Card from "./ds/Card";
import Eyebrow from "./ds/Eyebrow";
import content from "@/lib/resume-content.json";

export default function AboutSection() {
  return (
    <div className="px-5 md:px-10 py-16 md:py-20" style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
      <p className="mb-6" style={{ font: "var(--text-body-lg)", color: "var(--fg-secondary)" }}>{content.profile}</p>
      <p className="mb-12" style={{ color: "var(--fg-secondary)", lineHeight: 1.7 }}>I believe the best technology leaders understand both the business and the engineering—and aren’t afraid to roll up their sleeves and build something themselves.</p>
      <Eyebrow>// about</Eyebrow>
      <h2 style={{ font: "var(--text-h1)", letterSpacing: "var(--tracking-tight)", marginBottom: 40 }}>What I focus on</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {content.focus.map((item) => <Card title={item.title} key={item.title}><p style={{ font: "15px/1.7 var(--font-sans)", color: "var(--fg-secondary)" }}>{item.body}</p></Card>)}
      </div>
      <Eyebrow>// impact highlights</Eyebrow>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
        {content.impact.map((item) => <div key={item.value} style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: 20 }}>
          <div style={{ font: "var(--text-h1)", color: "var(--accent-hover)" }}>{item.value}</div>
          <p className="mt-3" style={{ font: "14px/1.6 var(--font-sans)", color: "var(--fg-secondary)" }}>{item.label}</p>
        </div>)}
      </div>
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: 32 }}>
        <Eyebrow color="var(--fg-muted)">// my journey</Eyebrow>
        <div className="space-y-4" style={{ font: "15px/1.7 var(--font-sans)", color: "var(--fg-secondary)" }}>
          {content.journey.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <div className="mt-8"><Eyebrow color="var(--fg-muted)">// beyond work</Eyebrow>
          <p style={{ font: "15px/1.7 var(--font-sans)", color: "var(--fg-secondary)" }}>{content.beyond}</p>
        </div>
      </div>
    </div>
  );
}
