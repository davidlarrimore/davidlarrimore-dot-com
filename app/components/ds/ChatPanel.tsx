"use client";

import { useEffect, useRef, useState } from "react";

interface ChatMessage {
  from: "user" | "bot";
  text: string;
}

interface ChatPanelProps {
  title?: string;
  messages?: ChatMessage[];
  starters?: string[];
  typing?: boolean;
  onSend?: (text: string) => void;
  className?: string;
}

export default function ChatPanel({
  title = "chat.exe",
  messages = [],
  starters = [],
  typing,
  onSend,
  className = "",
}: ChatPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    onSend?.(input);
    setInput("");
  }

  return (
    <div className={`ds-card ds-card-hud ds-chat-panel ${className}`} style={{ padding: 0, overflow: "hidden" }}>
      <div className="ds-chat-head">
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--success)" }} />
        <div
          style={{
            font: "700 13px var(--font-mono)",
            textTransform: "uppercase",
            letterSpacing: "var(--tracking-wide)",
            color: "var(--fg)",
          }}
        >
          {title}
        </div>
      </div>
      <div ref={scrollRef} className="ds-chat-scroll" style={{ height: 340 }}>
        {messages.map((m, i) => (
          <div key={i} className={`ds-chat-bubble ${m.from === "user" ? "ds-chat-bubble-user" : "ds-chat-bubble-bot"}`}>
            {m.text}
          </div>
        ))}
        {typing && <div className="ds-chat-bubble ds-chat-bubble-bot">…</div>}
      </div>
      <div className="ds-chat-foot">
        {starters.length > 0 && (
          <div className="ds-chat-starters">
            {starters.map((s) => (
              <button key={s} type="button" className="ds-chat-starter" onClick={() => onSend?.(s)}>
                {s}
              </button>
            ))}
          </div>
        )}
        <form className="ds-chat-form" onSubmit={submit}>
          <input
            className="ds-chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message…"
          />
          <button type="submit" className="ds-btn ds-btn-primary ds-btn-sm">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
