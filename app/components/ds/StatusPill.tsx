import { HTMLAttributes, ReactNode } from "react";

type Tone = "default" | "live" | "new";

interface StatusPillProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  children: ReactNode;
}

export default function StatusPill({ tone = "default", children, className = "", ...rest }: StatusPillProps) {
  const toneClass = tone === "live" ? "ds-pill-live" : tone === "new" ? "ds-pill-new" : "";
  return (
    <span className={`ds-pill ${toneClass} ${className}`} {...rest}>
      <span className="ds-pill-dot" />
      {children}
    </span>
  );
}
