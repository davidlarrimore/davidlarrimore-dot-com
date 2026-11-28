import Link from "next/link";
import { socialConfig } from "@/lib/config";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="ds-footer">
      <div className="ds-footer-inner">
        <span>
          © {currentYear} <Link href="/">Dave Larrimore</Link>
        </span>
        <span className="ds-footer-links">
          <a href={socialConfig.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={socialConfig.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={socialConfig.twitter} target="_blank" rel="noopener noreferrer">
            X
          </a>
        </span>
      </div>
    </footer>
  );
}
