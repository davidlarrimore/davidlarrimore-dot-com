"use client";

import { useState, useRef, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

interface AIChatProps {
  messages: { role: string; content: string }[];
  onNewMessage: (message: { role: string; content: string }) => void;
  questionContext?: string;
}

export default function AIChat({ messages, onNewMessage, questionContext }: AIChatProps) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      onNewMessage({
        role: "assistant",
        content: "Hi! I'm your AI assistant for this scavenger hunt. Ask me anything to help you solve the challenge!",
      });
    }
  }, [messages.length, onNewMessage]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const userMessage = { role: "user", content: input };
    onNewMessage(userMessage);
    setInput("");
    setIsLoading(true);

    try {
      const updatedMessages = [...messages, userMessage];

      const response = await fetch("/api/projects/scavenger-hunt/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          context: questionContext || "",
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      onNewMessage({ role: "assistant", content: data.message });
    } catch (error) {
      console.error("Error:", error);
      onNewMessage({
        role: "assistant",
        content: "I'm sorry, I encountered an error processing your request. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ds-chat-panel h-full">
      <div className="ds-chat-head">
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent2)" }} />
        <div
          style={{
            font: "700 13px var(--font-mono)",
            textTransform: "uppercase",
            letterSpacing: "var(--tracking-wide)",
            color: "var(--fg)",
          }}
        >
          ai_assistant.exe
        </div>
      </div>

      <div ref={scrollRef} className="ds-chat-scroll" style={{ height: 380 }}>
        {messages.map((message, index) => (
          <div key={index} className={`ds-chat-bubble ${message.role === "user" ? "ds-chat-bubble-user" : "ds-chat-bubble-bot"}`}>
            {message.role === "assistant" ? (
              <div className="prose prose-invert prose-sm max-w-none">
                <ReactMarkdown
                  components={{
                    a: ({ ...props }) => (
                      <a {...props} style={{ color: "var(--accent-hover)" }} target="_blank" rel="noopener noreferrer" />
                    ),
                    ul: ({ ...props }) => <ul {...props} className="list-disc pl-5 space-y-1" />,
                    ol: ({ ...props }) => <ol {...props} className="list-decimal pl-5 space-y-1" />,
                    li: ({ ...props }) => <li {...props} className="mb-1" />,
                    p: ({ ...props }) => <p {...props} className="mb-2 last:mb-0" />,
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            ) : (
              <p className="whitespace-pre-wrap">{message.content}</p>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="ds-chat-bubble ds-chat-bubble-bot">
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: "var(--fg-muted)" }} />
              <div
                className="w-2 h-2 rounded-full animate-bounce"
                style={{ background: "var(--fg-muted)", animationDelay: "0.2s" }}
              />
              <div
                className="w-2 h-2 rounded-full animate-bounce"
                style={{ background: "var(--fg-muted)", animationDelay: "0.4s" }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="ds-chat-foot">
        <form onSubmit={handleSubmit} className="ds-chat-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI to help solve the challenge..."
            className="ds-chat-input"
            disabled={isLoading}
          />
          <button type="submit" className="ds-btn ds-btn-purple ds-btn-sm" disabled={isLoading}>
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
}
