type Shape = "circle" | "square";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
  shape?: Shape;
  className?: string;
}

export default function Avatar({ src, alt = "", size = 64, shape = "circle", className = "" }: AvatarProps) {
  if (!src) {
    return (
      <div
        className={`ds-placeholder ${className}`}
        style={{ width: size, height: size, borderRadius: shape === "circle" ? "50%" : "var(--radius-md)", fontSize: "10px" }}
      >
        headshot
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={`ds-avatar ${shape === "square" ? "ds-avatar-square" : ""} ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
