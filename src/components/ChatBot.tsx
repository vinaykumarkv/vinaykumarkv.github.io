"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import styles from "./ChatBot.module.css";

const CHAT_API_URL =
  process.env.NEXT_PUBLIC_CHAT_API_URL ??
  "https://vinaykumarkv-digitaltwin.hf.space/chat";

const DEFAULT_ASSISTANT_MESSAGE =
  "Ask me anything about Vinay's digital twin, portfolio, or recent projects.";

type ChatRole = "assistant" | "user";

type BaseMessage = { id: string; role: ChatRole; content: string };

const cleanMarkdown = (md: string): string => {
  let cleaned = md.replace(/^##([^\s])/gm, "## $1");
  cleaned = cleaned.replace(/^(Item\s+\d+.*)$/gm, "- $1");
  return cleaned;
};

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");

const renderInlineMarkdown = (value: string): string =>
  escapeHtml(value)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/\[(.+?)\]\((https?:\/\/[^\s]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');

const renderMarkdownToHtml = (markdown: string): string => {
  const lines = cleanMarkdown(markdown).split(/\r?\n/);
  const blocks: string[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      blocks.push(`<ul>${listItems.join("")}</ul>`);
      listItems = [];
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushList();
      continue;
    }

    if (line.startsWith("## ")) {
      flushList();
      blocks.push(`<h2>${renderInlineMarkdown(line.slice(3))}</h2>`);
      continue;
    }

    if (line.startsWith("# ")) {
      flushList();
      blocks.push(`<h1>${renderInlineMarkdown(line.slice(2))}</h1>`);
      continue;
    }

    if (line.startsWith("- ")) {
      listItems.push(`<li>${renderInlineMarkdown(line.slice(2))}</li>`);
      continue;
    }

    flushList();
    blocks.push(`<p>${renderInlineMarkdown(line)}</p>`);
  }

  flushList();
  return blocks.join("");
};

const createMessageId = (): string =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

export default function ChatBot() {
  const [messages, setMessages] = useState<BaseMessage[]>([
    {
      id: "assistant-welcome",
      role: "assistant",
      content: DEFAULT_ASSISTANT_MESSAGE,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTo({
        top: messagesEndRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const sendConversation = async (conversation: BaseMessage[]) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: conversation.map(({ role, content }) => ({ role, content })),
          temperature: 0.3,
          max_tokens: 700,
        }),
      });

      if (!response.ok) {
        const details = await response.text();
        throw new Error(details || `Unexpected status ${response.status}`);
      }

      const payload = await response.json();
      const reply = (payload.reply ?? "").trim();

      if (!reply) {
        throw new Error("Chat service returned an empty response.");
      }

      setMessages((current) => [
        ...current,
        { id: createMessageId(), role: "assistant", content: reply },
      ]);
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Unknown error";
      setError(message);
      setMessages((current) => [
        ...current,
        {
          id: createMessageId(),
          role: "assistant",
          content:
            "I couldn't reach the chat backend right now. Please try again in a few moments.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed || isLoading) {
      return;
    }

    const userMessage: BaseMessage = {
      id: createMessageId(),
      role: "user",
      content: trimmed,
    };

    setInputValue("");
    setMessages((current) => {
      const updated = [...current, userMessage];
      void sendConversation(updated);
      return updated;
    });
  };

  const statusLabel = error
    ? "Disconnected"
    : isLoading
    ? "Thinking"
    : "Live";
  const statusText = error
    ? "Chat service is unavailable."
    : isLoading
    ? "Vinay is composing a reply…"
    : "Connected to the Hugging Face digital twin.";

  return (
    <div className={styles.chatContainer}>
      <div className={styles.statusBar}>
        <span className={styles.statusPill}>{statusLabel}</span>
        <span className={styles.statusText}>{statusText}</span>
      </div>
      <div
        className={styles.messages}
        ref={messagesEndRef}
        aria-live="polite"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={
              message.role === "user" ? styles.userMsg : styles.assistantMsg
            }
          >
            {message.role === "assistant" ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: renderMarkdownToHtml(message.content),
                }}
              />
            ) : (
              <p className={styles.userText}>{escapeHtml(message.content)}</p>
            )}
          </div>
        ))}
      </div>
      <form className={styles.inputBar} onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Ask Vinay about the digital twin, portfolio, or roadmap"
          className={styles.inputField}
          disabled={isLoading}
        />
        <button
          type="submit"
          className={styles.sendBtn}
          disabled={!inputValue.trim() || isLoading}
        >
          {isLoading ? "Sending…" : "Send"}
        </button>
      </form>
    </div>
  );
}
