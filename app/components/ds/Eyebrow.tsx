import { ReactNode } from "react";

interface EyebrowProps {
  children: ReactNode;
  color?: string;
}

export default function Eyebrow({ children, color = "var(--accent-soft-text)" }: EyebrowProps) {
  return <div className="ds-eyebrow" style={{ color }}>{children}</div>;
}
