"use client";

import { ReactNode } from "react";
import { event } from "@/lib/gtag";
import { openChatDock } from "@/lib/chat-dock";

interface OpenChatButtonProps {
  children: ReactNode;
  className?: string;
  /** Asked right away when the dock opens. */
  question?: string;
  trackLabel: string;
}

/** Opens the site-wide chat dock in place; never navigates. */
export default function OpenChatButton({ children, className, question, trackLabel }: OpenChatButtonProps) {
  return (
    <button
      type="button"
      className={className}
      aria-haspopup="dialog"
      aria-controls="chat-dock"
      onClick={() => {
        event({ action: "click", category: "engagement", label: trackLabel });
        openChatDock(question);
      }}
    >
      {children}
    </button>
  );
}
