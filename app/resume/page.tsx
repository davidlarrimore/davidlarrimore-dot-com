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

const TECH_EXPERTISE = [
  {
    title: "AI & Machine Learning",
    body: "AI governance, generative AI, large language models (LLMs), Responsible Use, Facial Recognition Technology (FRT), AI automation",
  },
  {
    title: "Cloud Computing",
    body: "AWS, Microsoft Azure, multi-cloud architecture, cloud security, cloud cost optimization",
  },
  {
    title: "Software Development & Engineering",
    body: "Open Source, Python, Java, Node.js, Apex (SFDC), SQL, API development, database architecture, full-stack development",
  },
  {
    title: "Agile & DevSecOps",
    body: "Scaled Agile Framework (SAFe), CI/CD pipelines, test automation, Kubernetes, Docker, Infrastructure as Code (IaC)",
  },
  {
    title: "Data Architecture & Analytics",
    body: "Big Data (Hadoop, Hortonworks), Business Intelligence (Tableau, MicroStrategy), Data Warehousing, SQL, MongoDB",
  },
  {
    title: "IT Governance & Enterprise Architecture",
    body: "Technical reference models, IT portfolio management, Automated Governance, IT acquisition strategy",
  },
];

const AWARDS = [
  "Presidential Rank Award, 2025 (Nominated)",
  "GovExec The Federal 100 Award, 2025",
  "Under Secretary's Award for Special Achievement, 2024",
  "Washington Exec, Pinnacle Cloud Executive of the Year, 2024",
  "Washington Exec, Top Exec to Watch, 2024",
];

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
              <a href="/api/download-resume" download="resume.pdf" className="ds-btn ds-btn-secondary ds-btn-md">
                Download PDF
              </a>
            </div>
          </div>
          <div style={{ font: "15px/1.6 var(--font-sans)", color: "var(--fg-secondary)", marginBottom: 48, maxWidth: 640 }}>
            Senior Executive Technologist with 15+ years in IT modernization, AI strategy, cloud computing, and
            enterprise technology transformation. Proven ability to develop and implement cutting-edge technology
            solutions, optimize IT investments, and drive innovation at scale.
          </div>

          {/* Contact */}
          <Card className="resume-section mb-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
              <div>
                <div style={{ font: "700 20px var(--font-sans)", color: "var(--fg)" }}>DAVID LARRIMORE</div>
                <div style={{ font: "14px var(--font-sans)", color: "var(--fg-secondary)" }}>
                  Technologist / Senior Executive / Leader
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
            {TECH_EXPERTISE.map((t) => (
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
            <ResumeExperienceItem
              title="Senior Vice President, Solution Engineering"
              company="Amivero"
              location="McLean, VA"
              period="2025 — Present"
              description="Leading technology strategy and innovation initiatives for a rapidly growing government contracting firm. Responsible for driving technical excellence, advancing AI capabilities, and fostering innovation across the organization's portfolio of federal projects."
              achievements={[
                "Driving enterprise-wide technology strategy and digital transformation initiatives to enhance service delivery and operational excellence.",
                "Leading AI and emerging technology adoption across government client portfolios, ensuring responsible implementation and measurable outcomes.",
                "Establishing technical centers of excellence to elevate engineering practices, promote innovation, and develop scalable solutions.",
                "Partnering with executive leadership to align technology investments with business objectives and client mission needs.",
                "Mentoring and developing technical talent while fostering a culture of continuous learning and innovation.",
                "Building strategic partnerships with technology vendors and research institutions to stay at the forefront of emerging technologies.",
              ]}
              imageSrc="/images/logos/logo-4.webp"
              imageAlt="Amivero Logo"
              imageShape="square"
            />

            <ResumeExperienceItem
              title="Chief Technology and AI Officer"
              company="DHS"
              location="Washington, DC"
              period="2021 — 2025"
              description="Provided technical oversight and organizational leadership, including the management of artificial intelligence initiatives, for a $10B IT portfolio spanning 22 components and offices within the Department of Homeland Security. Managed a $15M budget and over 100 federal employees."
              achievements={[
                "Created DHS Office of the Chief AI Officer organization, including a nationwide hiring initiative that hired 50 AI experts from private sector, government, and academia.",
                "Led development and implementation of LLM powered Generative AI Chatbot used by 20,000 DHS personnel.",
                "Developed and implemented department-wide policies and training programs to ensure the safe and responsible adoption of AI technologies, including facial recognition and generative AI.",
                "Led negotiation and awarded Enterprise User Agreement with Login.gov that has provided over $2.5M in cost avoidance and provided enterprise mechanism to onboard all DHS external onto a unified authentication services providing a streamlined user experience.",
                "Led the creation of and managed multiple enterprise products, including Cloud SecDevOps toolchain, Generative AI chatbots, and Information sharing platforms.",
                "Worked directly with major programs across the department to resolve risks and issues by applying problem-solving techniques, risk management strategies, collaboration, and technical oversight.",
              ]}
              imageSrc="/images/logos/logo-0.webp"
              imageAlt="Department of Homeland Security Logo"
              imageShape="square"
            />

            <ResumeExperienceItem
              title="Lead Solution Engineer"
              company="Salesforce"
              location="Reston, VA"
              period="2019 — 2021"
              description="As a Lead Solution Engineer in one of the fastest growing business units (Global Public Sector) in Salesforce, I provided strategic and tactical account support ranging from small civilian agencies to entire departments blending my federal experience with adaptable technical skills."
              achievements={[
                "Provided technical leadership on 52 different opportunities since 2019, totaling over $10 million in revenue.",
                "Followed human centered design practices and SecDevOps create tailored demonstrations and shareable assets for enterprise use.",
                "Developed Proofs of Concept for enterprise grade implementations supporting client requirements.",
                "Led internal Q&A sessions to help federal sales organization understand federal laws, policies, standards, and best practices.",
                "Worked with government Solution Integrators (SI's) and other partners to ensure solutions led to customer success.",
              ]}
              imageSrc="/images/logos/logo-1.webp"
              imageAlt="Salesforce Logo"
              imageShape="square"
            />

            <ResumeExperienceItem
              title="Chief Technology Officer (CTO)"
              company="DHS/ICE"
              location="Washington, DC"
              period="2016 — 2019"
              description="As the ICE CTO, I managed all enterprise technology functions (Enterprise Architecture, Data Architecture, Vendor Management), as well as defined and led the technology culture change of a 400-person organization and half a billion dollars in IT Spend."
              achievements={[
                "Implemented enterprise-wide multi-cloud General Support System (GSS) leveraging Amazon Web Services and Microsoft Azure.",
                "Managed the migration of 87 production systems and 133 total environments to cloud in six months providing up-to 75% cost savings on compute costs.",
                "Developed strategy and led IPT to implement enterprise Application Platform as a Service capability (APaaS) to enable no-code/low-code Rapid Application Development (RAD).",
                "Implemented enterprise Agile coaching and DevSecOps tools strategy that reduced lead and delivery time on provisioning of new resources by 99%, doubled deployment frequency, and doubled Agile team maturity.",
                "Designed and implemented enterprise DevSecOps toolchain to enable every OCIO development team with distributed CI/CD, Test Automation, and Cloud Orchestration capabilities.",
                'Worked with individual systems teams to plan cloud migration, migrate to Open Source technologies, and adopt a DevOps "toolchain".',
              ]}
              imageSrc="/images/logos/logo-2.webp"
              imageAlt="ICE Logo"
              imageShape="square"
            />

            <ResumeExperienceItem
              title="Cloud Strategist"
              company="USDA"
              location="Washington, DC"
              period="2016"
              description="As the Cloud Strategist in the OCIO Cloud Strategy and Policy division, I was responsible for planning and executing the department-wide strategy for adopting secure commercial cloud solutions."
              achievements={[
                "Built coalitions with department level engineering, networking, and security leadership to develop a common-sense approach to incrementally adopting commercial cloud solutions.",
                "Engaged USDA enterprise shared service providers to evaluate and certify commercial cloud ready shared services that can be leveraged by all USDA customer Agencies.",
                "Led working groups and integrated project teams to develop enterprise cloud policy and guidance that identified areas of trust and flexibility for USDA customer Agencies to drastically reduce the acquisition and securing of commercial cloud solutions while still ensuring security and compliance.",
                "Worked directly with USDA Customer Agencies to identify common commercial cloud service needs and provide necessary expertise.",
              ]}
              imageSrc="/images/logos/logo-3.webp"
              imageAlt="USDA Logo"
              imageShape="square"
            />

            <div>
              <Eyebrow color="var(--fg-muted)">// previous positions</Eyebrow>
              <ul className="list-disc pl-5 space-y-2" style={{ font: "14px/1.6 var(--font-sans)", color: "var(--fg-secondary)" }}>
                <li>2011 - 2016: Analytics Branch Chief at General Services Administration</li>
                <li>2009 - 2011: IT Program Analyst at Department of Homeland Security</li>
                <li>2008 - 2009: Software Engineer at Aspex, Inc.</li>
              </ul>
            </div>
          </div>

          {/* Awards */}
          <Eyebrow color="var(--fg-muted)">// recent awards</Eyebrow>
          <div className="flex flex-wrap gap-2">
            {AWARDS.map((a) => (
              <Tag key={a} variant="blue">
                {a}
              </Tag>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
