import { ReactNode } from "react";
import Avatar from "./ds/Avatar";

interface ExperienceItemProps {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  icon?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  imageLayout?: string;
  imageShape?: "circle" | "square";
}

export default function ResumeExperienceItem({
  title,
  company,
  location,
  period,
  description,
  achievements,
  imageSrc,
  imageAlt,
  imageShape = "circle",
  imageLayout,
}: ExperienceItemProps) {
  return (
    <div className="flex gap-4 mb-8">
      {imageSrc && imageLayout !== "wordmark" && (
        <Avatar
          src={imageSrc}
          alt={imageAlt || `${company} logo`}
          size={56}
          shape={imageShape}
          className={imageShape === "square" ? "ds-avatar-contain" : ""}
        />
      )}
      <div className="flex-1 min-w-0 pb-6" style={{ borderBottom: "1px solid var(--border)" }}>
        {imageSrc && imageLayout === "wordmark" && (
          <div className="resume-wordmark">
            {/* Preserve the full acquisition lockup and its white lettering. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageSrc} alt={imageAlt || `${company} logo`} width={1204} height={320} />
          </div>
        )}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1">
          <div>
            <div style={{ font: "700 16px var(--font-sans)", color: "var(--fg)" }}>
              {title} at {company}
            </div>
            <div style={{ font: "14px var(--font-sans)", color: "var(--fg-secondary)" }}>{location}</div>
          </div>
          <div style={{ font: "12px var(--font-mono)", color: "var(--fg-muted)", whiteSpace: "nowrap" }}>{period}</div>
        </div>
        <p className="mt-3" style={{ font: "14px/1.6 var(--font-sans)", color: "var(--fg-secondary)" }}>
          {description}
        </p>
        <ul className="mt-3 space-y-2 list-disc pl-5" style={{ font: "14px/1.6 var(--font-sans)", color: "var(--fg-secondary)" }}>
          {achievements.map((achievement, index) => (
            <li key={index}>{achievement}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
