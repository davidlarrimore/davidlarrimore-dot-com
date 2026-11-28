"use client";

import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

type Theme = "light" | "dark";

/**
 * Switches between the light and dark token sets. The initial theme is set before paint by
 * the script in app/layout.tsx (saved choice, else the system setting); this button only
 * flips it and remembers the choice.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  function toggle() {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be blocked (private mode); the theme still applies for this page view.
    }
    setTheme(next);
    window.dispatchEvent(new CustomEvent("themechange", { detail: next }));
  }

  const label = theme === "light" ? "Switch to dark theme" : "Switch to light theme";

  return (
    <button type="button" className="ds-icon-btn" onClick={toggle} aria-label={label} title={label}>
      {/* Before hydration the theme is unknown; render a stable icon to avoid a mismatch. */}
      {theme === "light" ? <FiMoon aria-hidden="true" size={18} /> : <FiSun aria-hidden="true" size={18} />}
    </button>
  );
}
