"use client";

import { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaAngleDown, FaAngleUp, FaTrash } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { RiRobot2Fill } from "react-icons/ri";
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

// Local storage key for saving chat history
const STORAGE_KEY = "resumeChat_history";
const STORAGE_VERSION_KEY = "resumeChat_version";

export default function ResumeChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi there! I'm an AI assistant who can answer questions about David Larrimore's professional experience, skills, and background. You can switch between Basic and RAG modes using the toggle below. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatVersion, setChatVersion] = useState<ChatVersion>("basic");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Track which message's chunks are expanded
  const [expandedChunks, setExpandedChunks] = useState<number[]>([]);
  
  // Load saved messages from localStorage on initial render
  useEffect(() => {
    const savedMessages = localStorage.getItem(STORAGE_KEY);
    const savedVersion = localStorage.getItem(STORAGE_VERSION_KEY);
    
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        // Only update state if we have valid messages
        if (Array.isArray(parsedMessages) && parsedMessages.length > 0) {
          setMessages(parsedMessages);
        }
      } catch (error) {
        console.error("Error parsing saved messages:", error);
        // If there's an error, we'll just use the default messages
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
  
  // Save messages to localStorage whenever they change
  useEffect(() => {
    // Only save if we have more than the initial message
    if (messages.length > 1) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);
  
  // Save chat version to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_VERSION_KEY, JSON.stringify(chatVersion));
  }, [chatVersion]);

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;
    
    // Add user message to resumeChat
    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Send message to API with version parameter
      const response = await fetch("/api/projects/resumeChat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          version: chatVersion,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      
      // Add assistant response to resumeChat with retrieved chunks if available
      setMessages((prev) => [...prev, { 
        role: "assistant", 
        content: data.message,
        retrievedChunks: data.retrievedChunks || []
      }]);
    } catch (error) {
      console.error("Error:", error);
      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm sorry, I encountered an error processing your request. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChunksDisplay = (index: number) => {
    setExpandedChunks(prev => 
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };
  
  const clearChatHistory = () => {
    // Reset to initial message
    const initialMessage = {
      role: "assistant" as const,
      content: "Hi there! I'm an AI assistant who can answer questions about David Larrimore's professional experience, skills, and background. You can switch between Basic and RAG modes using the toggle below. What would you like to know?",
    };
    
    setMessages([initialMessage]);
    
    // Also clear from localStorage
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col h-[500px]">
      <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 border-b border-gray-200 dark:border-gray-600 flex justify-between items-center">
        <h3 className="font-medium text-gray-800 dark:text-gray-200">Resume Chat</h3>
        <button 
          onClick={clearChatHistory}
          className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 p-1 rounded"
          title="Clear chat history"
        >
          <FaTrash /> 
        </button>
      </div>
      
      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start mb-4 ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.role === "assistant" && (
              <div className="flex-shrink-0 mr-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <RiRobot2Fill className="text-primary text-xl" />
                </div>
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === "user"
                  ? "bg-primary text-white rounded-tr-none"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none"
              }`}
            >
              {message.role === "assistant" ? (
                <div className="prose dark:prose-invert prose-sm max-w-none">
                  <ReactMarkdown
                    components={{
                      a: ({ node, ...props }) => (
                        <a
                          {...props}
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul {...props} className="list-disc pl-5 space-y-1" />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol {...props} className="list-decimal pl-5 space-y-1" />
                      ),
                      li: ({ node, ...props }) => (
                        <li {...props} className="mb-1" />
                      ),
                      p: ({ node, ...props }) => (
                        <p {...props} className="mb-2 last:mb-0" />
                      ),
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                  
                  {/* Display retrieved chunks for RAG mode */}
                  {message.retrievedChunks && message.retrievedChunks.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-300 dark:border-gray-600">
                      <button 
                        onClick={() => toggleChunksDisplay(index)}
                        className="flex items-center text-xs text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {expandedChunks.includes(index) ? (
                          <>
                            <FaAngleUp className="mr-1" /> 
                            Hide retrieved chunks ({message.retrievedChunks.length})
                          </>
                        ) : (
                          <>
                            <FaAngleDown className="mr-1" /> 
                            Show retrieved chunks ({message.retrievedChunks.length})
                          </>
                        )}
                      </button>
                      
                      {expandedChunks.includes(index) && (
                        <div className="mt-2 text-xs space-y-2 max-h-64 overflow-y-auto">
                          <p className="font-semibold text-gray-700 dark:text-gray-300">
                            Pinecone returned the following {message.retrievedChunks.length} chunks:
                          </p>
                          {message.retrievedChunks.map((chunk, chunkIndex) => (
                            <div 
                              key={chunkIndex} 
                              className="border border-gray-300 dark:border-gray-600 rounded p-2 bg-gray-200 dark:bg-gray-800"
                            >
                              <div className="flex justify-between mb-1">
                                <span className="font-bold text-xs">Score: {(chunk.score * 100).toFixed(2)}%</span>
                                {chunk.metadata.section && (
                                  <span className="text-xs px-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full">
                                    {chunk.metadata.section}
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-700 dark:text-gray-300 text-xs">{chunk.text}</p>
                              <div className="mt-1 flex flex-wrap gap-1">
                                {chunk.metadata.role && (
                                  <span className="text-xs px-1 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
                                    Title: {chunk.metadata.role}
                                  </span>
                                )}
                                {chunk.metadata.organization && (
                                  <span className="text-xs px-1 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
                                    Org: {chunk.metadata.organization}
                                  </span>
                                )}
                                {chunk.metadata.years && (
                                  <span className="text-xs px-1 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
                                    Year: {chunk.metadata.years}
                                  </span>
                                )}
                                {chunk.metadata.subcategory && (
                                  <span className="text-xs px-1 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
                                    Skills: {chunk.metadata.subcategory}
                                  </span>
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
            {message.role === "user" && (
              <div className="flex-shrink-0 ml-3">
                <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                  <IoMdPerson className="text-gray-700 dark:text-gray-300 text-xl" />
                </div>
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start mb-4 justify-start">
            <div className="flex-shrink-0 mr-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <RiRobot2Fill className="text-primary text-xl" />
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg rounded-tl-none p-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex justify-end mb-2">
          <div 
            className="flex items-center cursor-pointer text-sm text-gray-600 dark:text-gray-300 group relative"
            onClick={() => setChatVersion(chatVersion === "basic" ? "rag" : "basic")}
          >
            <span className="mr-2">
              {chatVersion === "basic" ? "Basic Mode" : "RAG Mode (Experimental)"}
            </span>
            {chatVersion === "basic" ? (
              <FaToggleOff className="w-5 h-5 text-gray-400" />
            ) : (
              <FaToggleOn className="w-5 h-5 text-primary" />
            )}
            
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 w-64 bg-gray-800 text-white text-xs rounded p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <p><strong>Basic Mode:</strong> Uses the entire resume as context for every question.</p>
              <p className="mt-1"><strong>RAG Mode:</strong> Uses Pinecone's embedding model to retrieve only the most relevant parts of the resume based on your question, potentially giving more focused answers.</p>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about David's experience..."
            className="flex-1 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={isLoading}
          />
          <button
            type="submit"
            className={`bg-primary hover:bg-primary/90 text-white rounded-r-lg p-2 h-full ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            <FaPaperPlane className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
}