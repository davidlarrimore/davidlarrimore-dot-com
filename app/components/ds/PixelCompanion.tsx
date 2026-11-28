"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { event } from "@/lib/gtag";

const SPRITE = [
  "..........",
  "....P.....",
  "....P.....",
  "...BBB....",
  "..BBBBB...",
  ".BBBBBBB..",
  ".BBWBBWB..",
  ".BBBBBBB..",
  ".BBBBBBB..",
  ".B.B.B.B..",
];
const SPRITE_BLINK = SPRITE.map((row, i) => (i === 6 ? ".BBBBBBB.." : row));
const SPRITE_ALERT = SPRITE.map((row, i) => (i === 6 ? ".BWWBWWB.." : row));

const CHAT_PATH = "/projects/resumeChat";

function colorFor(c: string) {
  return c === "B" ? "var(--accent)" : c === "P" ? "var(--accent2)" : "var(--white)";
}

/**
 * The site's one playful element, and the launcher for the resume chatbot (docs/DESIGN-CHARTER.md:
 * "executive first, with exactly one playful element"). Docked bottom-right on desktop, hidden on
 * phones (the homepage hero carries the ask box there) and on the chatbot page itself.
 */
export default function PixelCompanion({ size = 48 }: { size?: number }) {
  const pathname = usePathname();
  const [blink, setBlink] = useState(false);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    let alive = true;
    let timer: ReturnType<typeof setTimeout>;
    function scheduleBlink() {
      timer = setTimeout(() => {
        if (!alive) return;
        setBlink(true);
        timer = setTimeout(() => {
          if (!alive) return;
          setBlink(false);
          scheduleBlink();
        }, 140);
      }, 2400 + Math.random() * 3200);
    }
    scheduleBlink();
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, []);

  if (pathname?.startsWith(CHAT_PATH)) return null;

  const grid = alert ? SPRITE_ALERT : blink ? SPRITE_BLINK : SPRITE;

  return (
    <Link
      href={CHAT_PATH}
      className="ds-companion"
      aria-label="Ask my résumé chatbot a question"
      onMouseEnter={() => setAlert(true)}
      onMouseLeave={() => setAlert(false)}
      onFocus={() => setAlert(true)}
      onBlur={() => setAlert(false)}
      onClick={() => event({ action: "click", category: "engagement", label: "companion_chat_launcher" })}
    >
      <span className="ds-companion-bubble" aria-hidden="true">
        Ask me about Dave&apos;s work
      </span>
      <span className="ds-companion-sprite" style={{ width: size, height: size }} aria-hidden="true">
        <svg width={size} height={size} viewBox="0 0 10 10" focusable="false">
          {grid.flatMap((row, r) =>
            row.split("").map((c, x) =>
              c === "." ? null : <rect key={`${r}-${x}`} x={x} y={r} width={1} height={1} fill={colorFor(c)} />
            )
          )}
        </svg>
      </span>
    </Link>
  );
}
