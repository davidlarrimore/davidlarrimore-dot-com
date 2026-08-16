interface StatChartDatum {
  label: string;
  value: number;
}

interface StatChartProps {
  data?: StatChartDatum[];
  className?: string;
}

export default function StatChart({ data = [], className = "" }: StatChartProps) {
  return (
    <div className={`ds-chart ${className}`}>
      {data.map((d, i) => (
        <div key={i} className="ds-chart-col">
          <div className="ds-chart-value">{d.value}</div>
          <div className="ds-chart-bar" style={{ height: `${Math.max(2, d.value)}%` }} />
          <div className="ds-chart-label">{d.label}</div>
        </div>
      ))}
    </div>
  );
}
