"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { event } from "@/lib/gtag";
import { CHAT_DOCK_STATE, toggleChatDock, type ChatDockStateDetail } from "@/lib/chat-dock";
import SpriteIcon from "../chat/SpriteIcon";

const FULL_CHAT_PATH = "/projects/resumeChat";

/**
 * The site's one playful element, and the launcher for the chat dock (docs/DESIGN-CHARTER.md:
 * "executive first, with exactly one playful element"). Docked bottom-right; it opens and
 * closes the chat panel in place. Not shown on the full chatbot page.
 */
export default function PixelCompanion({ size = 48 }: { size?: number }) {
  const pathname = usePathname();
  const [blink, setBlink] = useState(false);
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);

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
    function onState(e: Event) {
      setOpen(Boolean((e as CustomEvent<ChatDockStateDetail>).detail?.open));
    }
    window.addEventListener(CHAT_DOCK_STATE, onState);
    return () => {
      alive = false;
      clearTimeout(timer);
      window.removeEventListener(CHAT_DOCK_STATE, onState);
    };
  }, []);

  if (pathname?.startsWith(FULL_CHAT_PATH)) return null;

  return (
    <button
      type="button"
      className={`ds-companion${open ? " is-open" : ""}`}
      aria-label={open ? "Close the chat about Dave's work" : "Ask my résumé chatbot a question"}
      aria-expanded={open}
      aria-controls="chat-dock"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      onClick={() => {
        if (!open) event({ action: "click", category: "engagement", label: "companion_chat_launcher" });
        toggleChatDock();
      }}
    >
      <span className="ds-companion-bubble" aria-hidden="true">
        Ask me about Dave&apos;s work
      </span>
      <span className="ds-companion-sprite">
        <SpriteIcon size={size} face={hover || open ? "alert" : blink ? "blink" : "open"} />
      </span>
    </button>
  );
}
