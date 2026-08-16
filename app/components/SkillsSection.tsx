import ProgressBar from "./ds/ProgressBar";
import Tag from "./ds/Tag";
import Eyebrow from "./ds/Eyebrow";

const SKILLS = [
  { name: "Project/Program Management", level: 100 },
  { name: "Problem Solving", level: 100 },
  { name: "LLMs & GenAI", level: 90 },
  { name: "Modern Software Development", level: 90 },
  { name: "Product Development", level: 85 },
  { name: "DevOps Automation", level: 85 },
  { name: "System and Data Architecture", level: 85 },
  { name: "Practical Technical Skills", level: 75 },
  { name: "Cloud Architecture", level: 75 },
  { name: "Machine Learning", level: 60 },
];

const TECH_TAGS = [
  "Python",
  "AWS/Azure",
  "Docker/Kubernetes",
  "Oracle",
  "PostGres",
  "MySQL",
  "Linux",
  "SFDX/Apex",
  "SCRUM/SAFe",
  "Javascript",
  "Node.js",
  "REST API",
  "Data Visualization",
];

export default function SkillsSection() {
  return (
    <div style={{ background: "var(--surface-sunken)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div className="px-5 md:px-10 py-16 md:py-20" style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
        <Eyebrow>// skills</Eyebrow>
        <div style={{ font: "var(--text-h1)", letterSpacing: "var(--tracking-tight)", color: "var(--fg)", marginBottom: 40 }}>
          My Skills
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-10">
          {SKILLS.map((s) => (
            <div key={s.name} style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: 18 }}>
              <ProgressBar label={s.name} value={s.level} />
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2.5">
          {TECH_TAGS.map((t) => (
            <Tag key={t} variant="gray">
              {t}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
}
