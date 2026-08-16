import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "purple" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  icon,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`ds-btn ds-btn-${variant} ds-btn-${size} ${className}`}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}
