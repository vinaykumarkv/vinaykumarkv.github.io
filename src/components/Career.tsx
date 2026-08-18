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
      role: "AI Engineer - AI and ML",
      company: "Tata Consultancy Services",
      dates: "June 2026 - Present",
      location: "London, United Kingdom",
      badges: ["AI Agents", "Process Gap Detection", "LLM Evaluation", "GxP Delivery"],
      bullets: [
        {
          title: "Live AI Platform Delivery",
          text: "Developing and integrating advanced machine learning models and multi-agent systems designed to proactively detect process gaps across global operations and flag audit risk early.",
        },
        {
          title: "Product Consultation",
          text: "Retained as a strategic advisor for the flagship COA digitalisation product, helping guide technical direction and product strategy for enterprise deployment.",
        },
        {
          title: "Experimentation & Evaluation",
          text: "Refactored model tracing and created evaluation datasets in Weave to support repeatable LLM observability, prompt assessment, and model improvement cycles.",
        },
      ],
    },
    {
      id: "systems-analyst",
      role: "Systems Analyst and Onsite Lead - AI and Automation",
      company: "Tata Consultancy Services",
      dates: "September 2019 - June 2026",
      location: "London, United Kingdom & Bengaluru, India",
      badges: ["Document Intelligence", "Azure AI", "GxP Validation", "Digital Transformation"],
      bullets: [
        {
          title: "Development & Technical Architecture",
          text: "Designed and developed an AI-powered document parser that converted scanned PDFs into structured JSON with field-level confidence scores, deployed using Azure Container Apps with PostgreSQL and Blob Storage for auditability.",
        },
        {
          title: "Technical Governance",
          text: "Led code reviews and R&D activities using Azure Document Intelligence templates, regex extraction techniques, and workflow design to balance agile delivery with GxP compliance.",
        },
        {
          title: "Commercial & Leadership",
          text: "Led the COA Digitalisation fixed-budget programme with a 26-member cross-functional team, delivering 3 iterative releases across UK and US manufacturing sites and scaling the Quality Hub account from a £150k to £350k annual programme.",
        },
      ],
    },
    {
      id: "mba-sabbatical",
      role: "Sabbatical for Full-time MBA",
      company: "Bengaluru, India",
      dates: "October 2017 - September 2019",
      location: "Bengaluru, India",
      badges: ["Business Analytics", "Operational Strategy", "Market Research"],
      bullets: [
        {
          title: "Academic Focus",
          text: "Advanced core competencies in business analytics, operational strategy, and market research while completing full-time MBA studies.",
        },
        {
          title: "Leadership Development",
          text: "Strengthened decision-making, commercial thinking, and cross-functional stakeholder alignment to support technology-led business transformation.",
        },
      ],
    },
    {
      id: "systems-engineer",
      role: "System Engineer",
      company: "Tata Consultancy Services",
      dates: "October 2015 - October 2017",
      location: "Chennai, India",
      badges: ["Infrastructure Operations", "Backup & Restore", "Windows/Linux Systems"],
      bullets: [
        {
          title: "Enterprise Backup & Restore",
          text: "Managed server backup and restore operations across Linux and Windows environments, ensuring data integrity and operational resilience.",
        },
        {
          title: "Operational Reliability",
          text: "Supported SLA-driven infrastructure operations, performing restores and incident response to maintain system availability and customer trust.",
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
