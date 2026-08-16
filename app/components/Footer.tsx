import Link from "next/link";
import { socialConfig } from "@/lib/config";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ borderTop: "1px solid var(--border)" }}>
      <div
        className="flex flex-col md:flex-row md:justify-between gap-3 px-5 py-8 md:px-10"
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          font: "12px var(--font-mono)",
          color: "var(--fg-muted)",
        }}
      >
        <span>
          © {currentYear} <Link href="/" style={{ color: "var(--fg-muted)" }}>Dave Larrimore</Link>
        </span>
        <span className="flex gap-5">
          <a href={socialConfig.github} target="_blank" rel="noopener noreferrer" style={{ color: "var(--fg-muted)" }}>
            GitHub
          </a>
          <a href={socialConfig.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: "var(--fg-muted)" }}>
            LinkedIn
          </a>
          <a href={socialConfig.twitter} target="_blank" rel="noopener noreferrer" style={{ color: "var(--fg-muted)" }}>
            X
          </a>
        </span>
      </div>
    </footer>
  );
}
