"use client";

import React from "react";
import styles from "./Footer.module.css";
import { Mail, ExternalLink } from '../lucide-shim';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footerSection}>
      {/* Interactive CTA Box */}
      <div className={styles.contactCard}>
        <h2 className={styles.cardTitle}>Deploy Secure AI Systems</h2>
        <p className={styles.cardDesc}>
          Whether you are looking for a Senior AI/ML Engineer who understands GxP compliance, an LLM evaluation architect, or a research collaborator on multimodal robotics, let&apos;s build together.
        </p>
        
        <div className={styles.btnGroup}>
          <a href="mailto:vinaykumar.kv@outlook.com" className="cyber-btn">
            <Mail size={16} /> Email Node
          </a>
          <a href="https://linkedin.com/in/vinay-kumar-k-v" target="_blank" rel="noopener noreferrer" className="cyber-btn cyber-btn-purple">
            <svg viewBox="0 0 24 24" width={16} height={16} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle" }}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg> Connect on LinkedIn
          </a>
        </div>

        {/* Future Portfolio Node */}
        <div>
          <div className={styles.futurePortfolio}>
            <span className={styles.futurePortDot}></span>
            <span>PORTFOLIO_LINKS: [vinaykumarkv.github.io] ONLINE</span>
            <a href="https://vinaykumarkv.github.io" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "2px", color: "var(--accent-cyan)", marginLeft: "4px" }}>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Meta bottom bar */}
      <div className={styles.bottom}>
        <div className={styles.copyright}>
          &copy; {currentYear} Vinay Kumar K.V. All rights reserved. // Enterprise meets Edgy.
        </div>
        <div className={styles.socials}>
          <a href="https://linkedin.com/in/vinay-kumar-k-v" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" width={18} height={18} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle" }}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
          <a href="https://vinaykumarkv.github.io" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="GitHub">
            <svg viewBox="0 0 24 24" width={18} height={18} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle" }}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </a>
          <a href="mailto:vinaykumar.kv@outlook.com" className={styles.socialIcon} aria-label="Email">
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
