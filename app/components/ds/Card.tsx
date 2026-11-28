import { HTMLAttributes, ReactNode } from "react";

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  eyebrow?: ReactNode;
  title?: ReactNode;
  /** Heading level for the title, so cards fit the page's heading tree. */
  titleAs?: "h2" | "h3" | "h4";
  footer?: ReactNode;
  hud?: boolean;
  children?: ReactNode;
}

export default function Card({
  eyebrow,
  title,
  titleAs: TitleTag = "h3",
  footer,
  hud,
  children,
  className = "",
  ...rest
}: CardProps) {
  return (
    <div className={`ds-card ${hud ? "ds-card-hud" : ""} ${className}`} {...rest}>
      {eyebrow && <div className="ds-card-eyebrow">{eyebrow}</div>}
      {title && <TitleTag className="ds-card-title">{title}</TitleTag>}
      {children}
      {footer && <div className="ds-card-footer">{footer}</div>}
    </div>
  );
}
