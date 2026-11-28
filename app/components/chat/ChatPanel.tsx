"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { FiArrowUp, FiRotateCcw, FiX } from "react-icons/fi";
import { event } from "@/lib/gtag";
import SpriteIcon from "./SpriteIcon";

type Message = { role: "user" | "assistant"; content: string };

const STORAGE_KEY = "chatDock_history";
const MAX_STORED = 30;

const STARTERS = [
  "What did you do as DHS Chief AI Officer?",
  "What AI have you built at Amivero?",
  "How was the DHS AI Corps hired?",
  "What do you do outside of work?",
];

function readHistory(): Message[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(parsed)
      ? parsed.filter(
          (m): m is Message =>
            (m?.role === "user" || m?.role === "assistant") && typeof m?.content === "string"
        )
      : [];
  } catch {
    return [];
  }
}

interface ChatPanelProps {
  open: boolean;
  onClose: () => void;
  /** A question handed over by a launcher; `id` changes for each new ask. */
  ask: { question: string; id: number } | null;
  onAskHandled: () => void;
}

export default function ChatPanel({ open, onClose, ask, onAskHandled }: ChatPanelProps) {
  // Loaded only in the browser (ssr: false), so history can be read synchronously: a question
  // handed over on first open then joins the saved conversation instead of replacing it.
  const [messages, setMessages] = useState<Message[]>(readHistory);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesRef = useRef(messages);
  const loadingRef = useRef(false);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesRef.current = messages;
    try {
      if (messages.length) localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_STORED)));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Storage can be unavailable (private mode); the chat still works for this visit.
    }
  }, [messages]);

  // Keep the latest question at the top of the log, so a long answer reads from its start
  // instead of landing on its last line.
  useEffect(() => {
    const log = logRef.current;
    if (!log) return;
    const questions = log.querySelectorAll<HTMLElement>(".ds-dock-msg-user");
    const latest = questions[questions.length - 1];
    log.scrollTo({ top: latest ? latest.offsetTop - log.offsetTop - 16 : 0 });
  }, [messages, loading, open]);

  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const send = useCallback(async (text: string) => {
    const question = text.trim().slice(0, 500);
    if (!question || loadingRef.current) return;
    const next: Message[] = [...messagesRef.current, { role: "user", content: question }];
    messagesRef.current = next;
    setMessages(next);
    setInput("");
    loadingRef.current = true;
    setLoading(true);
    event({ action: "chat_dock_question", category: "engagement", label: "resume_chat" });
    try {
      const res = await fetch("/api/projects/resumeChat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, version: "basic" }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: String(data.message ?? "") }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Sorry, I couldn't answer that just now. Please try again in a moment." },
      ]);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!ask) return;
    onAskHandled();
    send(ask.question);
  }, [ask, send, onAskHandled]);

  return (
    <section
      id="chat-dock"
      className="ds-dock"
      role="dialog"
      aria-modal="false"
      aria-labelledby="chat-dock-title"
      hidden={!open}
    >
      <header className="ds-dock-head">
        <SpriteIcon size={28} />
        <div className="ds-dock-titles">
          <h2 id="chat-dock-title">Ask about Dave&apos;s work</h2>
          <p>Claude, grounded in Dave&apos;s résumé. It can make mistakes.</p>
        </div>
        {/* Hidden while an answer is on its way, so a late reply can't land alone in a new chat. */}
        {messages.length > 0 && !loading && (
          <button type="button" className="ds-icon-btn" onClick={() => setMessages([])} aria-label="Start a new chat" title="Start a new chat">
            <FiRotateCcw aria-hidden="true" size={16} />
          </button>
        )}
        <button type="button" className="ds-icon-btn" onClick={onClose} aria-label="Close chat" title="Close (Esc)">
          <FiX aria-hidden="true" size={18} />
        </button>
      </header>

      <div className="ds-dock-log" ref={logRef} aria-live="polite" aria-busy={loading}>
        {messages.length === 0 && (
          <div className="ds-dock-empty">
            <p>Hi! I can answer questions about Dave&apos;s career, from his work at DHS to what he&apos;s building now.</p>
            <ul className="ds-dock-starters" aria-label="Example questions">
              {STARTERS.map((q) => (
                <li key={q}>
                  <button type="button" onClick={() => send(q)}>
                    {q}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`ds-dock-msg ds-dock-msg-${m.role}`}>
            {m.role === "assistant" ? (
              <ReactMarkdown
                components={{
                  a: ({ ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />,
                }}
              >
                {m.content}
              </ReactMarkdown>
            ) : (
              m.content
            )}
          </div>
        ))}
        {loading && (
          <div className="ds-dock-msg ds-dock-msg-assistant ds-dock-typing">
            <span className="sr-only">Thinking…</span>
            <i aria-hidden="true" />
            <i aria-hidden="true" />
            <i aria-hidden="true" />
          </div>
        )}
      </div>

      <form
        className="ds-dock-form"
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <label htmlFor="chat-dock-input" className="sr-only">
          Your question
        </label>
        <input
          id="chat-dock-input"
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question…"
          maxLength={500}
          autoComplete="off"
        />
        <button type="submit" className="ds-btn ds-btn-primary ds-dock-send" disabled={loading || !input.trim()} aria-label="Send">
          <FiArrowUp aria-hidden="true" size={18} />
        </button>
      </form>
    </section>
  );
}
