"use client";

import React, { useState } from "react";
import styles from "./Career.module.css";
import { ChevronRight, Calendar, MapPin, Briefcase } from "../lucide-shim";

interface RoleDetails {
  id: string;
  role: string;
  company: string;
  dates: string;
  location: string;
  badges: string[];
  bullets: Array<{ title: string; text: string }>;
}

export default function Career() {
  const roles: RoleDetails[] = [
    {
      id: "ai-engineer",
      role: "AI & Machine Learning Engineer",
      company: "Tata Consultancy Services",
      dates: "June 2026 - Present",
      location: "London, United Kingdom",
      badges: ["Multi-Agent AI", "NLP & LLM", "Anomaly Detection", "GxP Delivery"],
      bullets: [
        {
          title: "Location Code Prediction",
          text: "Built NLP-focused features using TF-IDF, Bag-of-Words, Word2Vec and LLM-derived candidates; benchmarked Gradient Boosting, XGBoost and LightGBM, and used LoRA fine-tuning plus RAG over a term dictionary where labels lacked ground truth.",
        },
        {
          title: "Observability & Evaluation",
          text: "Refactored the codebase to integrate Weave tracing for function-level observability, created an evaluation dataset, and ran systematic model evaluation.",
        },
        {
          title: "Anomaly Detection",
          text: "Co-developed a Poisson CUSUM and Mann-Kendall model to flag abnormal event volumes by location; continue to provide advisory support to the COA Digitalisation team.",
        },
      ],
    },
    {
      id: "coa-lead",
      role: "IT Business Analyst & Onsite Delivery Lead",
      company: "Tata Consultancy Services",
      dates: "May 2024 - June 2026",
      location: "London, United Kingdom & Bengaluru, India",
      badges: ["£13M Programme", "26-Person Team", "Generative AI", "Pharma"],
      bullets: [
        {
          title: "Programme Leadership",
          text: "Led a 26-person team delivering a fixed-price £13M digital transformation programme end-to-end, from requirements and URS/SRS through design specification and business-logic definition.",
        },
        {
          title: "Generative AI Prototype",
          text: "Designed a two-agent Extractor and Reviewer/Critic architecture that converts PDFs to organisation-standard JSON, scores field confidence, and logs I/O pairs for auditability; containerised the demo on Azure Container Registry with development auto-scaling.",
        },
        {
          title: "Automation & Problem Solving",
          text: "Reduced manual review and approval from 10 days to 2 days, built XML digital-signature, time-conversion and JIRA/Outlook sprint-reporting solutions, and ported the ASTM signer across Python, Java and .NET.",
        },
      ],
    },
    {
      id: "batch-release-hub",
      role: "IT Business Analyst & Scrum Master",
      company: "Tata Consultancy Services",
      dates: "August 2020 - May 2024",
      location: "Bengaluru, India & London, United Kingdom",
      badges: ["GxP Environment", "Scrum", "Stakeholder Management", "Python"],
      bullets: [
        {
          title: "Product Delivery",
          text: "Produced end-to-end application lifecycle documentation in a GxP-regulated environment and defined business rules and logical workflows from data analysis.",
        },
        {
          title: "Team & Revenue Growth",
          text: "Grew the delivery team from 4 to 12 members while running Scrum ceremonies, improving team efficiency, and contributing to project revenue growth from £150K to £350K.",
        },
        {
          title: "Technical Support",
          text: "Performed code reviews, supported bug fixes, and built Python scripts to load data from shared locations into the database; moved onsite to support deployment across multiple sites.",
        },
      ],
    },
    {
      id: "business-analyst",
      role: "Business Analyst",
      company: "Tata Consultancy Services",
      dates: "September 2019 - August 2020",
      location: "Bengaluru, India",
      badges: ["SOPs", "Agile Compliance", "Process Analysis"],
      bullets: [
        {
          title: "Process Documentation",
          text: "Documented standard operating procedures for 7+ technical teams across Storage & Backup, Linux, Windows, Database, Service Support and Network functions.",
        },
        {
          title: "Agile Compliance",
          text: "Monitored Agile compliance across the project and reported progress to the Delivery Manager.",
        },
      ],
    },
    {
      id: "mba-sabbatical",
      role: "Sabbatical - Full-Time MBA",
      company: "MSRIT",
      dates: "2017 - 2019",
      location: "Bengaluru, India",
      badges: ["MBA", "Marketing", "Business Strategy"],
      bullets: [
        {
          title: "Full-Time Study",
          text: "Completed a full-time MBA in Marketing at M S Ramaiah Institute of Technology during a two-year career sabbatical.",
        },
      ],
    },
    {
      id: "systems-engineer",
      role: "System Engineer",
      company: "Tata Consultancy Services",
      dates: "October 2015 - October 2017",
      location: "Chennai, India",
      badges: ["Infrastructure Operations", "Backup & Restore", "Shell Scripting"],
      bullets: [
        {
          title: "Backup Operations",
          text: "Ensured reliable backup operations across servers and databases through tiered T1-to-T3 replication and archival, including tape libraries and Iron Mountain archiving.",
        },
        {
          title: "Automation",
          text: "Automated manual backup processes using shell scripting.",
        },
      ],
    },
  ];

  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const activeRole = roles[activeRoleIndex];

  return (
    <section id="journey" className={styles.careerSection}>
      <div className="section-header">
        <h2 className="section-title">Career Journey</h2>
        <p className="section-subtitle">A Decade of Technical Growth & Leadership</p>
      </div>

      <div className={styles.timelineContainer}>
        {/* Left timeline nodes */}
        <div className={styles.track}>
          {roles.map((role, index) => {
            const isActive = activeRoleIndex === index;
            return (
              <div
                key={role.id}
                className={`${styles.timelineNode} ${isActive ? styles.activeNode : ""}`}
                onClick={() => setActiveRoleIndex(index)}
              >
                <h3 className={styles.nodeTitle}>{role.role}</h3>
                <div className={styles.nodeCompany}>{role.company}</div>
                <div className={styles.nodeDate}>{role.dates}</div>
              </div>
            );
          })}
        </div>

        {/* Right role display detail card */}
        <div className={styles.detailsCard}>
          <div className={styles.detailsHeader}>
            <h3 className={styles.detailsRole}>{activeRole.role}</h3>
            <div className={styles.detailsMeta}>
              <span className={styles.detailsCompany}>
                <Briefcase size={14} style={{ display: "inline", marginRight: "4px", verticalAlign: "text-bottom" }} />
                {activeRole.company}
              </span>
              <span className={styles.detailsDate}>
                <Calendar size={14} style={{ display: "inline", marginRight: "4px", verticalAlign: "text-bottom" }} />
                {activeRole.dates}
              </span>
            </div>
            <div className={styles.detailsMeta} style={{ marginTop: "0.25rem" }}>
              <span className={styles.detailsDate}>
                <MapPin size={14} style={{ display: "inline", marginRight: "4px", verticalAlign: "text-bottom" }} />
                {activeRole.location}
              </span>
            </div>
            <div className={styles.badgeContainer}>
              {activeRole.badges.map((badge, idx) => (
                <span key={idx} className={styles.badge}>
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.bulletList}>
            {activeRole.bullets.map((bullet, idx) => (
              <div key={idx} className={styles.bulletItem}>
                <ChevronRight className={styles.bulletIcon} size={18} />
                <div className={styles.bulletText}>
                  <strong>{bullet.title}:</strong> {bullet.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
