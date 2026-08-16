interface TerminalLine {
  type: "cmd" | "out";
  text: string;
}

interface TerminalProps {
  lines?: TerminalLine[];
  prompt?: string;
  cursor?: boolean;
  className?: string;
}

export default function Terminal({ lines = [], prompt = "$", cursor = true, className = "" }: TerminalProps) {
  return (
    <div className={`ds-terminal ${className}`}>
      {lines.map((l, i) => (
        <div key={i} className="ds-terminal-line">
          {l.type === "cmd" && <span className="ds-terminal-prompt">{prompt}</span>}
          <span className={l.type === "cmd" ? "" : "ds-terminal-out"}>{l.text}</span>
        </div>
      ))}
      {cursor && (
        <div className="ds-terminal-line">
          <span className="ds-terminal-prompt">{prompt}</span>
          <span className="ds-terminal-cursor" />
        </div>
      )}
    </div>
  );
}
