"use client";

import { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaAngleDown, FaAngleUp, FaTrash } from "react-icons/fa";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

type Message = {
  role: "user" | "assistant";
  content: string;
  retrievedChunks?: RetrievedChunk[];
};

type RetrievedChunk = {
  text: string;
  score: number;
  metadata: {
    section: string;
    organization: string;
    role: string;
    achievement_type: string;
    subcategory: string;
    years: string | number;
  };
};

type ChatVersion = "basic" | "rag";

const STORAGE_KEY = "resumeChat_history";
const STORAGE_VERSION_KEY = "resumeChat_version";

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hi there! I'm an AI assistant who can answer questions about David Larrimore's professional experience, skills, and background. You can switch between Basic and RAG modes using the toggle below. What would you like to know?",
};

const STARTERS = [
  "What's your current role?",
  "Tell me about your DHS experience.",
  "What are your top skills?",
  "What do you do outside of work?",
];

export default function ResumeChatInterface() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatVersion, setChatVersion] = useState<ChatVersion>("basic");
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isInitialLoad = useRef(true);

  const [expandedChunks, setExpandedChunks] = useState<number[]>([]);

  useEffect(() => {
    const savedMessages = localStorage.getItem(STORAGE_KEY);
    const savedVersion = localStorage.getItem(STORAGE_VERSION_KEY);

    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        if (Array.isArray(parsedMessages) && parsedMessages.length > 0) {
          setMessages(parsedMessages);
        }
      } catch (error) {
        console.error("Error parsing saved messages:", error);
      }
    }

    if (savedVersion) {
      try {
        const parsedVersion = JSON.parse(savedVersion);
        if (parsedVersion === "basic" || parsedVersion === "rag") {
          setChatVersion(parsedVersion);
        }
      } catch (error) {
        console.error("Error parsing saved chat version:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (messages.length > 1) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(STORAGE_VERSION_KEY, JSON.stringify(chatVersion));
  }, [chatVersion]);

  useEffect(() => {
    if (!isInitialLoad.current && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (text: string) => {
    const t = text.trim();
    if (t === "") return;

    inputRef.current?.blur();
    isInitialLoad.current = false;

    const userMessage: Message = { role: "user", content: t };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/projects/resumeChat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          version: chatVersion,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.message,
          retrievedChunks: data.retrievedChunks || [],
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm sorry, I encountered an error processing your request. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const toggleChunksDisplay = (index: number) => {
    setExpandedChunks((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
  };

  const clearChatHistory = () => {
    setMessages([INITIAL_MESSAGE]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="ds-card ds-card-hud ds-chat-panel" style={{ padding: 0, overflow: "hidden" }}>
      <div className="ds-chat-head">
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--success)" }} />
        <div
          style={{
            font: "700 13px var(--font-mono)",
            textTransform: "uppercase",
            letterSpacing: "var(--tracking-wide)",
            color: "var(--fg)",
            flex: 1,
          }}
        >
          resume_chat.exe
        </div>
        <button
          type="button"
          onClick={() => setChatVersion(chatVersion === "basic" ? "rag" : "basic")}
          className="group relative flex items-center gap-2"
          style={{ font: "12px var(--font-mono)", color: "var(--fg-secondary)" }}
          title="Toggle Basic / RAG mode"
        >
          {chatVersion === "basic" ? "Basic" : "RAG"}
          {chatVersion === "basic" ? (
            <FaToggleOff style={{ color: "var(--fg-muted)" }} />
          ) : (
            <FaToggleOn style={{ color: "var(--accent-hover)" }} />
          )}
          <div
            className="absolute right-0 top-full mt-2 hidden group-hover:block"
            style={{
              width: 260,
              background: "var(--surface-raised)",
              border: "1px solid var(--border-strong)",
              color: "var(--fg-secondary)",
              font: "12px/1.5 var(--font-sans)",
              padding: 10,
              zIndex: 20,
              textAlign: "left",
            }}
          >
            <p>
              <strong style={{ color: "var(--fg)" }}>Basic:</strong> uses the entire resume as context.
            </p>
            <p className="mt-1">
              <strong style={{ color: "var(--fg)" }}>RAG:</strong> retrieves only the most relevant resume chunks via
              Pinecone.
            </p>
          </div>
        </button>
        <button
          type="button"
          onClick={clearChatHistory}
          title="Clear chat history"
          style={{ color: "var(--fg-muted)" }}
        >
          <FaTrash />
        </button>
      </div>

      <div ref={messagesContainerRef} className="ds-chat-scroll" style={{ height: 420 }}>
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

                {message.retrievedChunks && message.retrievedChunks.length > 0 && (
                  <div className="mt-3 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
                    <button
                      onClick={() => toggleChunksDisplay(index)}
                      className="flex items-center"
                      style={{ font: "11px var(--font-mono)", color: "var(--accent-hover)" }}
                    >
                      {expandedChunks.includes(index) ? (
                        <>
                          <FaAngleUp className="mr-1" /> Hide retrieved chunks ({message.retrievedChunks.length})
                        </>
                      ) : (
                        <>
                          <FaAngleDown className="mr-1" /> Show retrieved chunks ({message.retrievedChunks.length})
                        </>
                      )}
                    </button>

                    {expandedChunks.includes(index) && (
                      <div className="mt-2 space-y-2 max-h-64 overflow-y-auto">
                        <p style={{ font: "600 11px var(--font-mono)", color: "var(--fg-muted)" }}>
                          Pinecone returned the following {message.retrievedChunks.length} chunks:
                        </p>
                        {message.retrievedChunks.map((chunk, chunkIndex) => (
                          <div
                            key={chunkIndex}
                            style={{
                              border: "1px solid var(--border)",
                              background: "var(--surface-sunken)",
                              padding: 8,
                            }}
                          >
                            <div className="flex justify-between mb-1">
                              <span style={{ font: "700 11px var(--font-mono)", color: "var(--fg-secondary)" }}>
                                Score: {(chunk.score * 100).toFixed(2)}%
                              </span>
                              {chunk.metadata.section && <span className="ds-tag ds-tag-blue">{chunk.metadata.section}</span>}
                            </div>
                            <p style={{ font: "12px/1.5 var(--font-sans)", color: "var(--fg-secondary)" }}>{chunk.text}</p>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {chunk.metadata.role && <span className="ds-tag ds-tag-gray">Title: {chunk.metadata.role}</span>}
                              {chunk.metadata.organization && (
                                <span className="ds-tag ds-tag-gray">Org: {chunk.metadata.organization}</span>
                              )}
                              {chunk.metadata.years && <span className="ds-tag ds-tag-gray">Year: {chunk.metadata.years}</span>}
                              {chunk.metadata.subcategory && (
                                <span className="ds-tag ds-tag-gray">Skills: {chunk.metadata.subcategory}</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
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
        {messages.length === 1 && (
          <div className="ds-chat-starters">
            {STARTERS.map((s) => (
              <button key={s} type="button" className="ds-chat-starter" onClick={() => sendMessage(s)}>
                {s}
              </button>
            ))}
          </div>
        )}
        <form onSubmit={handleSubmit} className="ds-chat-form">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about David's experience..."
            className="ds-chat-input"
            disabled={isLoading}
          />
          <button type="submit" className="ds-btn ds-btn-primary ds-btn-sm" disabled={isLoading}>
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
}
