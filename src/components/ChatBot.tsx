"use client";
import React, { useState } from "react";
import { marked } from 'marked';
import styles from "./ChatBot.module.css";

// Helper to clean up common markdown formatting issues from LLM output
const cleanMarkdown = (md: string): string => {
  // Ensure heading markers are followed by a space
  let cleaned = md.replace(/^##([^\s])/gm, '## $1');
  // Convert plain list items like "Item 1" into markdown list format
  cleaned = cleaned.replace(/^(Item\s+\d+.*)$/gm, '- $1');
  return cleaned;
};
// import ReactMarkdown from 'react-markdown';

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: "nvidia/nemotron-3-super-120b-a12b:free",
          messages: [
            { role: "system", content: "You are a digital twin of Vinay Kumar K V.\nContact\nvinaykumar.kv@outlook.com\nwww.linkedin.com/in/vinay-kumar-k-v\nvinaykumarkv.github.io/\nwww.mygreatlearning.com/eportfolio/vinay-kumar-k-v\nTop Skills: Content Creation, Community Building, Curriculum Development, SQL Associate, Data Engineer, Business Analysis Foundations, Project Management Essentials, Professional Scrum Master™ I (PSMI)\nPublications: VATSA: Video, Audio, Text, Sensory, Action - A Unified Five-Modality Architecture for Human-Level Perception and Action\nSummary: I build AI systems that work in the real world, including GxP‑regulated pharmaceutical manufacturing. I have experience as System Engineer, Product Engineer, and AI Engineer, deploying Python utilities in live production, building LLM evaluation frameworks, and authoring GxP validation documentation. Currently building VATSA, a unified five‑modality AI architecture." },
            ...messages.concat(userMsg).map((m) => ({ role: m.role, content: m.content })),
          ],
        }),
      });
      const data = await response.json();
      // Preserve markdown; render with react-markdown
      const rawContent = data?.choices?.[0]?.message?.content || "Sorry, I couldn't fetch a response.";
      const assistantMsg: Message = {
        role: "assistant",
        content: rawContent,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (e) {
      const errMsg: Message = { role: "assistant", content: "Error contacting the AI service." };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading) {
      handleSend();
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messages}>
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.role === "user" ? styles.userMsg : styles.assistantMsg}>
            {msg.role === "assistant" ? (
              <div dangerouslySetInnerHTML={{ __html: marked(cleanMarkdown(msg.content)) }} />
            ) : (
              msg.content
            )}
          </div>
        ))}
        {loading && <div className={styles.assistantMsg}>Typing…</div>}
      </div>
      <div className={styles.inputBar}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="Ask me about Vinay…"
          disabled={loading}
          className={styles.inputField}
        />
        <button onClick={handleSend} disabled={loading || !input.trim()} className={styles.sendBtn}>
          Send
        </button>
      </div>
    </div>
  );
}
