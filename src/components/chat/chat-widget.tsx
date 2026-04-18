"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Loader2,
  AlertCircle,
  Minimize2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site-config";

const suggestedQuestions = [
  "What technologies do you work with?",
  "Tell me about the CRM platform you built",
  "What's your experience with Agentic AI?",
  "Tell me about the multi-platform chat app",
];

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const chatTransport = useRef(
    new DefaultChatTransport({ api: "/api/chat" })
  );

  const {
    messages,
    sendMessage,
    status,
    error,
  } = useChat({
    transport: chatTransport.current,
    messages: [
      {
        id: "welcome",
        role: "assistant",
        parts: [
          {
            type: "text" as const,
            text: `Hey! 👋 I'm ${siteConfig.name}'s AI assistant. Ask me anything about my skills, projects, or experience!`,
          },
        ],
      },
    ] as UIMessage[],
  });

  const isLoading = status === "streaming" || status === "submitted";

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Listen for custom event to open chat from other components
  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener("open-chat", handleOpenChat);
    return () => window.removeEventListener("open-chat", handleOpenChat);
  }, []);

  const handleSend = (text: string) => {
    if (!text.trim() || isLoading) return;
    setHasInteracted(true);
    setInput("");
    sendMessage({
      parts: [{ type: "text" as const, text }],
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  const handleSuggestedQuestion = (question: string) => {
    handleSend(question);
  };

  // Get text content from message parts
  const getMessageText = (message: (typeof messages)[0]): string => {
    if (message.parts && message.parts.length > 0) {
      return message.parts
        .filter((part): part is { type: "text"; text: string } => part.type === "text")
        .map((part) => part.text)
        .join("");
    }
    return "";
  };

  return (
    <>
      {/* Chat Trigger Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-all hover:bg-accent-hover hover:shadow-accent-glow md:bottom-8 md:right-8"
            aria-label="Open AI Chat"
          >
            <MessageSquare className="h-6 w-6" />
            {/* Notification dot */}
            {!hasInteracted && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-4 w-4 rounded-full bg-success" />
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={cn(
              "fixed z-50 flex flex-col overflow-hidden rounded-2xl border border-border shadow-2xl",
              // Mobile: full screen with margins
              "bottom-0 left-0 right-0 top-0 m-3",
              // Desktop: fixed size in corner, max-h prevents top cropping on short viewports
              "md:bottom-8 md:right-8 md:left-auto md:top-auto md:m-0 md:h-[600px] md:max-h-[calc(100vh-4rem)] md:w-[420px]"
            )}
            style={{
              background: "var(--card)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10">
                  <Sparkles className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold">AI Assistant</p>
                  <p className="text-[10px] text-muted-foreground">
                    Powered by Groq
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Minimize chat"
                >
                  <Minimize2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "flex gap-3",
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  {/* Avatar */}
                  <div
                    className={cn(
                      "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full",
                      message.role === "user"
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {message.role === "user" ? (
                      <User className="h-3.5 w-3.5" />
                    ) : (
                      <Bot className="h-3.5 w-3.5" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                      message.role === "user"
                        ? "bg-accent text-accent-foreground rounded-tr-md"
                        : "bg-muted text-foreground rounded-tl-md"
                    )}
                  >
                    <p className="whitespace-pre-wrap">{getMessageText(message)}</p>
                  </div>
                </motion.div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex items-center gap-1 rounded-2xl rounded-tl-md bg-muted px-4 py-3">
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-accent" />
                    <span className="text-xs text-muted-foreground">
                      Thinking...
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Error state */}
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 rounded-xl bg-error/10 px-4 py-3 text-xs text-error"
                >
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <p>Something went wrong. Please try again.</p>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length <= 1 && !hasInteracted && (
              <div className="border-t border-border px-4 py-3">
                <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  Try asking
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {suggestedQuestions.map((question) => (
                    <button
                      key={question}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="rounded-full border border-border bg-card px-3 py-1.5 text-[11px] text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="border-t border-border px-4 py-3">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 rounded-xl border border-border bg-muted px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  disabled={isLoading}
                  maxLength={500}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-all hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
