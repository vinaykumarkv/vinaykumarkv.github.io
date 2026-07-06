"use client";
import styles from "./ChatBot.module.css";

// Helper to clean up common markdown formatting issues from LLM output
const cleanMarkdown = (md: string): string => {
  // Ensure heading markers are followed by a space
  let cleaned = md.replace(/^##([^\s])/gm, "## $1");
  // Convert plain list items like "Item 1" into markdown list format
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

export default function ChatBot() {
  const assistantMessage = renderMarkdownToHtml(
    "## Digital twin chat is offline on GitHub Pages\n- GitHub Pages only serves static files, so the live AI proxy is disabled here.\n- Contact Vinay directly through the links below for a conversation or demo request."
  );

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messages}>
        <div className={styles.assistantMsg}>
          <div dangerouslySetInnerHTML={{ __html: assistantMessage }} />
        </div>
      </div>
      <div className={styles.inputBar}>
        <input
          type="text"
          value="Static deployment: chat disabled"
          readOnly
          disabled
          className={styles.inputField}
        />
        <button disabled className={styles.sendBtn}>
          Offline
        </button>
      </div>
    </div>
  );
}
