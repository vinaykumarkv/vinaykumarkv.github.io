"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./Hero.module.css";
import { Mail, Terminal, ArrowRight, Server, BrainCircuit } from "lucide-react";

interface LogEntry {
  type: "command" | "system" | "help" | "skills" | "contact";
  content: React.ReactNode;
}

export default function Hero() {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      type: "system",
      content: "SYSTEM LOG ON: 2026-07-06T01:03:44. VATSA CORE V2.1 ACTIVE.",
    },
    {
      type: "system",
      content: "Type 'help' or click the quick action chips below to query database.",
    },
  ]);

  const logsEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    if (!trimmedCmd) return;

    const newLogs = [...logs, { type: "command" as const, content: `> ${cmd}` }];

    switch (trimmedCmd) {
      case "help":
        newLogs.push({
          type: "help",
          content: (
            <div className={styles.helpCommandList}>
              <span className={styles.helpCmd}>about</span>
              <span className={styles.helpDesc}>Profile bio & key differentiators</span>
              <span className={styles.helpCmd}>skills</span>
              <span className={styles.helpDesc}>View technical capabilities matrix</span>
              <span className={styles.helpCmd}>vatsa</span>
              <span className={styles.helpDesc}>Query 5-modality AI architecture specs</span>
              <span className={styles.helpCmd}>contact</span>
              <span className={styles.helpDesc}>Display connection links & email</span>
              <span className={styles.helpCmd}>clear</span>
              <span className={styles.helpDesc}>Clear terminal console logs</span>
            </div>
          ),
        });
        break;

      case "about":
        newLogs.push({
          type: "system",
          content: (
            <div className={styles.sysOutput}>
              I build AI systems that work in the real world - including the most demanding environment: GxP-regulated pharmaceutical manufacturing.
              With 10+ years of cross-functional experience across software delivery, product leadership, and AI engineering, I bridge the gap between business risk, regulatory safety compliance, and high-performance neural computing.
            </div>
          ),
        });
        break;

      case "skills":
        newLogs.push({
          type: "skills",
          content: (
            <div className={styles.sysOutput}>
              <strong>[TECHNICAL STACK MATRIX]</strong>
              <br />
              • ML/DL Core   :: PyTorch, Scikit-learn, SHAP
              <br />
              • GenAI Architectures :: LangChain, RAG, OpenAI API, LLM Evaluation
              <br />
              • Backend & API :: FastAPI, Python, Docker, SQL
              <br />
              • Infrastructure :: Linux/Windows Enterprise Adm, Backup Infrastructure
              <br />
              • Methodologies  :: GxP Validation (URS/SRS/UAT), Agile, Scrum (PSM I)
            </div>
          ),
        });
        break;

      case "vatsa":
        newLogs.push({
          type: "system",
          content: (
            <div className={styles.sysOutput}>
              <strong>[PROJECT VATSA - 5 MODALITY ARCHITECTURE]</strong>
              <br />
              A unified system for embodied robotics intelligence processing five distinct streams:
              <br />
              1. <strong>Video</strong>: 96.31% accuracy on CIFAR-10, real-time 22 FPS.
              <br />
              2. <strong>Audio</strong>: 70.25% on ESC-50 via Wav2Vec2 transfer learning.
              <br />
              3. <strong>Text</strong>: LLM output routing simulator with safety-weights.
              <br />
              4. <strong>Sensory</strong>: Physical state metrics (spatial data feeds).
              <br />
              5. <strong>Action</strong>: Robotic actuation pathways.
              <br />
              *Proposed <strong>SAMOS</strong>: Safety-weighted output routing mechanism for parallel generation.
            </div>
          ),
        });
        break;

      case "contact":
        newLogs.push({
          type: "contact",
          content: (
            <div className={styles.sysOutput}>
              Email: <a href="mailto:vinaykumar.kv@outlook.com">vinaykumar.kv@outlook.com</a>
              <br />
              LinkedIn: <a href="https://linkedin.com/in/vinay-kumar-k-v" target="_blank" rel="noopener noreferrer">linkedin.com/in/vinay-kumar-k-v</a>
              <br />
              GitHub/Portfolio: <a href="https://vinaykumarkv.github.io" target="_blank" rel="noopener noreferrer">vinaykumarkv.github.io</a>
            </div>
          ),
        });
        break;

      case "clear":
        setLogs([]);
        setInput("");
        return;

      default:
        newLogs.push({
          type: "system",
          content: `Command not found: '${cmd}'. Type 'help' to view valid options.`,
        });
    }

    setLogs(newLogs);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    }
  };

  return (
    <section className={styles.heroContainer}>
      {/* Premium Navbar */}
      <header className={styles.header}>
        <div className={styles.logo}>
          V.K<span className={styles.logoDot}></span>
        </div>
        <nav className={styles.navLinks}>
          <a href="#about" className={styles.navLink}>
            <BrainCircuit size={14} /> About
          </a>
          <a href="#vatsa" className={styles.navLink}>
            <Server size={14} /> VATSA
          </a>
          <a href="#journey" className={styles.navLink}>
            Journey
          </a>
          <a
            href="https://linkedin.com/in/vinay-kumar-k-v"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navLink}
          >
            <svg viewBox="0 0 24 24" width={15} height={15} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle" }}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg> LinkedIn
          </a>
          <a
            href="https://vinaykumarkv.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navLink}
          >
            <svg viewBox="0 0 24 24" width={15} height={15} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle" }}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg> GitHub
          </a>
        </nav>
      </header>

      {/* Hero Content */}
      <div className={styles.heroContent}>
        <div className={styles.heroLeft}>
          <div className={styles.greetingChip}>
            <span className={styles.neonDot}></span> System Status: Online
          </div>
          <h1 className={styles.title}>
            GXP Systems AI Engineer - Builder<br />
            <span className={styles.titleGlow}>Regulated AI &amp; Robotics</span>
          </h1>
          <p className={styles.subtitle}>
            I am <span className={styles.highlightText}>Vinay Kumar K.V</span>, a GxP Systems AI Engineer bridging the gap between rigorous enterprise regulatory frameworks (GxP validation, LLM safety audits) and cutting-edge artificial intelligence, deep learning, and robotics.
          </p>
          <div className={styles.ctaGroup}>
            <a href="#about" className="cyber-btn">
              Explore Profile <ArrowRight size={16} />
            </a>
            <a href="mailto:vinaykumar.kv@outlook.com" className="cyber-btn cyber-btn-purple">
              <Mail size={16} /> Get In Touch
            </a>
          </div>
        </div>

        {/* Cyber Terminal UI */}
        <div className={styles.terminalContainer} onClick={focusInput}>
          <div className={styles.terminal}>
            <div className={styles.terminalHeader}>
              <div className={styles.terminalButtons}>
                <span className={`${styles.terminalButton} ${styles.btnRed}`}></span>
                <span className={`${styles.terminalButton} ${styles.btnYellow}`}></span>
                <span className={`${styles.terminalButton} ${styles.btnGreen}`}></span>
              </div>
              <div className={styles.terminalTitle}>vk_terminal_v2.1</div>
              <Terminal size={14} className={styles.promptLine} />
            </div>

            <div className={styles.terminalLogs}>
              {logs.map((log, index) => (
                <div
                  key={index}
                  className={`${styles.terminalLine} ${log.type === "command" ? styles.promptLine : ""
                    }`}
                >
                  {log.content}
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>

            <div className={styles.terminalInputLine}>
              <span className={styles.inputPrefix}>guest@vatsa_node:~$</span>
              <input
                ref={inputRef}
                type="text"
                className={styles.inputField}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder=""
                autoFocus
              />
            </div>
          </div>

          {/* Quick command buttons */}
          <div className={styles.quickChips}>
            <button className={styles.quickChip} onClick={() => handleCommand("about")}>
              [run: about]
            </button>
            <button className={styles.quickChip} onClick={() => handleCommand("skills")}>
              [run: skills]
            </button>
            <button className={styles.quickChip} onClick={() => handleCommand("vatsa")}>
              [run: vatsa]
            </button>
            <button className={styles.quickChip} onClick={() => handleCommand("contact")}>
              [run: contact]
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
