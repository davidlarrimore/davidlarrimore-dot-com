"use client";

import { useEffect, useId, useRef, useState } from "react";

interface MermaidProps {
  chart: string;
}

/** Diagram colors come from the active theme's design tokens, so diagrams follow light and dark. */
function themeVariables() {
  const css = getComputedStyle(document.documentElement);
  const v = (name: string) => css.getPropertyValue(name).trim();
  return {
    background: v("--surface"),
    primaryColor: v("--surface-raised"),
    primaryTextColor: v("--fg"),
    primaryBorderColor: v("--border-strong"),
    lineColor: v("--fg-muted"),
    secondaryColor: v("--accent-soft"),
    tertiaryColor: v("--surface-sunken"),
    textColor: v("--fg"),
    mainBkg: v("--surface-raised"),
    nodeBorder: v("--border-strong"),
    fontFamily: v("--font-sans") || "sans-serif",
  };
}

export default function Mermaid({ chart }: MermaidProps) {
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let renderCount = 0;

    function render() {
      const id = `mermaid-${rawId}-${renderCount++}`;
      import("mermaid").then(({ default: mermaid }) => {
        mermaid.initialize({ startOnLoad: false, theme: "base", themeVariables: themeVariables() });
        mermaid
          .render(id, chart.trim())
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
    }

    render();
    // Re-render when the visitor switches themes (ThemeToggle dispatches this event).
    window.addEventListener("themechange", render);
    return () => {
      cancelled = true;
      window.removeEventListener("themechange", render);
    };
  }, [chart, rawId]);

  if (error) {
    return <pre className="blog-mermaid-error">Mermaid render error: {error}</pre>;
  }

  return <div ref={containerRef} className="blog-mermaid" />;
}
