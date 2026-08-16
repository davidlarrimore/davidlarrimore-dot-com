"use client";

import { useEffect, useId, useRef, useState } from "react";

interface MermaidProps {
  chart: string;
}

export default function Mermaid({ chart }: MermaidProps) {
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    import("mermaid").then(({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        fontFamily: "var(--font-sans)",
        themeVariables: {
          background: "#171d30",
          primaryColor: "#232a44",
          primaryTextColor: "#eef1fb",
          primaryBorderColor: "#333c5c",
          lineColor: "#4b5578",
          secondaryColor: "#3d6ef2",
          tertiaryColor: "#0c0f1c",
        },
      });

      mermaid
        .render(`mermaid-${rawId}`, chart.trim())
        .then(({ svg }) => {
          if (!cancelled && containerRef.current) {
            containerRef.current.innerHTML = svg;
          }
        })
        .catch((err) => {
          if (!cancelled) {
            setError(err instanceof Error ? err.message : "Failed to render diagram");
          }
        });
    });

    return () => {
      cancelled = true;
    };
  }, [chart, rawId]);

  if (error) {
    return <pre className="blog-mermaid-error">Mermaid render error: {error}</pre>;
  }

  return <div ref={containerRef} className="blog-mermaid" />;
}
