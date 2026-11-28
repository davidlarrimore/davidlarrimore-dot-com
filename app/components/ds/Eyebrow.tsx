import { ReactNode } from "react";

interface EyebrowProps {
  children: ReactNode;
  /** Render as a heading when the label is the only title of its section. */
  as?: "div" | "h2" | "h3" | "p";
  muted?: boolean;
  id?: string;
}

/**
 * Small mono label. A leading "// " is decoration, so it is hidden from screen readers
 * (otherwise they announce "slash slash"). Phase 2 of the redesign removes eyebrows from
 * the homepage; see docs/DESIGN-CHARTER.md.
 */
export default function Eyebrow({ children, as: Tag = "div", muted = false, id }: EyebrowProps) {
  const className = `ds-eyebrow${muted ? " ds-eyebrow-muted" : ""}`;
  if (typeof children === "string" && children.startsWith("// ")) {
    return (
      <Tag className={className} id={id}>
        <span aria-hidden="true">{"// "}</span>
        {children.slice(3)}
      </Tag>
    );
  }
  return (
    <Tag className={className} id={id}>
      {children}
    </Tag>
  );
}
