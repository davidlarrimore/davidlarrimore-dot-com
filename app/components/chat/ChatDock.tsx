"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { CHAT_DOCK_OPEN, CHAT_DOCK_STATE, CHAT_DOCK_TOGGLE, type ChatDockOpenDetail } from "@/lib/chat-dock";

// The panel (and react-markdown) loads on first open, so pages don't pay for it up front.
const ChatPanel = dynamic(() => import("./ChatPanel"), { ssr: false });

const FULL_CHAT_PATH = "/projects/resumeChat";

/**
 * Site-wide chat with Dave's résumé bot, opened by the pixel sprite or any openChatDock() call.
 * It never navigates away: a panel docked bottom-right on desktop, a full-height sheet on phones.
 */
export default function ChatDock() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [ask, setAsk] = useState<{ question: string; id: number } | null>(null);
  const openRef = useRef(false);
  const openerRef = useRef<HTMLElement | null>(null);

  const show = useCallback(() => {
    if (!openRef.current) openerRef.current = document.activeElement as HTMLElement | null;
    openRef.current = true;
    setLoaded(true);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    openRef.current = false;
    setOpen(false);
    // Return focus to whatever opened the dock (WCAG 2.4.3).
    openerRef.current?.focus?.();
  }, []);

  useEffect(() => {
    function onOpen(e: Event) {
      const question = (e as CustomEvent<ChatDockOpenDetail>).detail?.question?.trim();
      show();
      if (question) setAsk({ question, id: Date.now() });
    }
    function onToggle() {
      if (openRef.current) close();
      else show();
    }
    window.addEventListener(CHAT_DOCK_OPEN, onOpen);
    window.addEventListener(CHAT_DOCK_TOGGLE, onToggle);
    return () => {
      window.removeEventListener(CHAT_DOCK_OPEN, onOpen);
      window.removeEventListener(CHAT_DOCK_TOGGLE, onToggle);
    };
  }, [show, close]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent(CHAT_DOCK_STATE, { detail: { open } }));
  }, [open]);

  // The full chatbot page has its own interface.
  if (pathname?.startsWith(FULL_CHAT_PATH) || !loaded) return null;

  // The question is consumed once sent, so a remount (e.g. after visiting the full chat page)
  // never asks it again.
  return <ChatPanel open={open} onClose={close} ask={ask} onAskHandled={() => setAsk(null)} />;
}
