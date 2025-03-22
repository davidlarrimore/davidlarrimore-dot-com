"use client";

import { useState, useRef, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { RiRobot2Fill } from "react-icons/ri";
import ReactMarkdown from "react-markdown";

interface AIChatProps {
  messages: { role: string; content: string }[];
  onNewMessage: (message: { role: string; content: string }) => void;
  questionContext?: string; // Optional context for the current question
}

export default function AIChat({ 
  messages, 
  onNewMessage,
  questionContext 
}: AIChatProps) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Add initial AI message if no messages yet
  useEffect(() => {
    if (messages.length === 0) {
      onNewMessage({
        role: "assistant",
        content: "Hi! I'm your AI assistant for this scavenger hunt. Ask me anything to help you solve the challenge!"
      });
    }
  }, [messages.length, onNewMessage]);
  
  // Scroll to bottom of chat when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;
    
    // Add user message to chat
    const userMessage = { role: "user", content: input };
    onNewMessage(userMessage);
    setInput("");
    setIsLoading(true);

    try {
      // Create a local copy of messages that includes the new message
      const updatedMessages = [...messages, userMessage];
      
      // Send message to API with the updated messages array
      const response = await fetch("/api/projects/scavenger-hunt/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
          context: questionContext || ""
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      
      // Add assistant response to chat
      onNewMessage({ 
        role: "assistant", 
        content: data.message
      });
    } catch (error) {
      console.error("Error:", error);
      // Add error message
      onNewMessage({
        role: "assistant",
        content:
          "I'm sorry, I encountered an error processing your request. Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px]">
      <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 border-b border-gray-200 dark:border-gray-600">
        <h3 className="font-medium text-gray-800 dark:text-gray-200">AI Assistant</h3>
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
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI to help solve the challenge..."
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