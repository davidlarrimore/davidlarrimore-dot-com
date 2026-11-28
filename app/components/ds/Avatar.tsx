type Shape = "circle" | "square";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
  shape?: Shape;
  className?: string;
  /** Lazy by default; pass "eager" for an image in the first viewport. */
  loading?: "lazy" | "eager";
}

export default function Avatar({
  src,
  alt = "",
  size = 64,
  shape = "circle",
  className = "",
  loading = "lazy",
}: AvatarProps) {
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
      width={size}
      height={size}
      loading={loading}
      decoding="async"
      className={`ds-avatar ${shape === "square" ? "ds-avatar-square" : ""} ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
