import Card from "./ds/Card";
import Eyebrow from "./ds/Eyebrow";

export default function AboutSection() {
  return (
    <div className="px-5 md:px-10 py-16 md:py-20" style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
      <Eyebrow>// about</Eyebrow>
      <div style={{ font: "var(--text-h1)", letterSpacing: "var(--tracking-tight)", color: "var(--fg)", marginBottom: 40 }}>
        What I focus on
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <Card title="Modern Software Development">
          <p style={{ font: "14px/1.5 var(--font-sans)", color: "var(--fg-secondary)" }}>
            I specialize in leading organizations and building modern digital experiences. I have no problem getting
            my hands dirty (as seen by this website) and I&apos;m passionate about clean, maintainable code with a
            focus on performance and user experience.
          </p>
        </Card>
        <Card title="Artificial Intelligence">
          <p style={{ font: "14px/1.5 var(--font-sans)", color: "var(--fg-secondary)" }}>
            An experienced leader in Responsible AI — building and governing AI systems in highly regulated
            environments. I&apos;m passionate about the potential of AI to transform industries and improve
            people&apos;s lives.
          </p>
        </Card>
        <Card title="Collaboration">
          <p style={{ font: "14px/1.5 var(--font-sans)", color: "var(--fg-secondary)" }}>
            I thrive in cross-functional teams, valuing clear communication, feedback, and an iterative approach to
            building software.
          </p>
        </Card>
      </div>

      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: 32 }}>
        <Eyebrow color="var(--fg-muted)">// log_entry · my journey</Eyebrow>
        <div className="space-y-4" style={{ font: "15px/1.7 var(--font-sans)", color: "var(--fg-secondary)" }}>
          <p>
            I am the Senior Vice President of Solution Engineering at Amivero, where I lead technology strategy and
            innovation initiatives for a rapidly growing government contracting firm. I&apos;m responsible for
            driving technical excellence, advancing AI capabilities, and fostering innovation across our portfolio
            of federal projects. My professional background spans AI/ML, Cloud Computing, DevOps/Automation,
            Application Development, Product Management, Business Intelligence, and Analytics.
          </p>
          <p>
            Prior to joining Amivero, I served as the Chief Technology Officer (CTO) and Chief AI Officer (CAIO) for
            the Department of Homeland Security (DHS), where I led a team of ~150 employees and contractors. During
            this time, I spearheaded department-wide AI initiatives, recruited a specialized team of 50 AI experts,
            and delivered AI-powered products including a department-wide Generative AI chatbot used by 20,000
            personnel. I established comprehensive AI governance frameworks and ensured the safe, responsible
            adoption of emerging technologies like facial recognition and generative AI.
          </p>
          <p>
            Outside of work, I am a passionate and lifelong gamer that still remembers playing Counter-Strike on my
            Toshiba Infinia 7200 in the 90&apos;s. Whether it&apos;s replaying Final Fantasy VII for the hundredth
            time or trying a new RPG, RTS, FPS, or MMO, I love epic narratives that blend creativity, fantasy,
            strategy, and problem-solving. I&apos;m also a hands-on techie that does 3D printing and building IoT
            devices for home projects like creating escape rooms. Additionally, I practice Brazilian Jiu-Jitsu and
            enjoy tabletop games like D&amp;D with family and friends.
          </p>
        </div>
      </div>
    </div>
  );
}
