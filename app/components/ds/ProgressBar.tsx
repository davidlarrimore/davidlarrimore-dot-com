interface ProgressBarProps {
  value: number;
  label?: string;
  className?: string;
}

export default function ProgressBar({ value, label, className = "" }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className={className}>
      {label && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            font: "var(--text-small)",
            color: "var(--fg-secondary)",
            marginBottom: "var(--space-2)",
          }}
        >
          <span>{label}</span>
          <span style={{ fontFamily: "var(--font-mono)" }}>{pct}%</span>
        </div>
      )}
      <div className="ds-progress">
        <div className="ds-progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
