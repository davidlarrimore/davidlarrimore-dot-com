import { HTMLAttributes, ReactNode } from "react";

type Variant = "blue" | "purple" | "gray";

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
  children: ReactNode;
}

export default function Tag({ variant = "blue", children, className = "", ...rest }: TagProps) {
  return (
    <span className={`ds-tag ds-tag-${variant} ${className}`} {...rest}>
      {children}
    </span>
  );
}
