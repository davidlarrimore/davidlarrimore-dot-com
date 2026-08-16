import { HTMLAttributes, ReactNode } from "react";

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  eyebrow?: ReactNode;
  title?: ReactNode;
  footer?: ReactNode;
  hud?: boolean;
  children?: ReactNode;
}

export default function Card({ eyebrow, title, footer, hud, children, className = "", ...rest }: CardProps) {
  return (
    <div className={`ds-card ${hud ? "ds-card-hud" : ""} ${className}`} {...rest}>
      {eyebrow && (
        <div
          style={{
            font: "var(--text-label)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "var(--fg-muted)",
            marginBottom: "var(--space-2)",
          }}
        >
          {eyebrow}
        </div>
      )}
      {title && (
        <div style={{ font: "var(--text-h3)", color: "var(--fg)", marginBottom: "var(--space-3)" }}>{title}</div>
      )}
      {children}
      {footer && (
        <div style={{ marginTop: "var(--space-4)", paddingTop: "var(--space-4)", borderTop: "1px solid var(--border)" }}>
          {footer}
        </div>
      )}
    </div>
  );
}
