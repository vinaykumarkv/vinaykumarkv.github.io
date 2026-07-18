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
      role: "AI/ML Engineer - Audit Anomaly Detection & GenAI",
      company: "Tata Consultancy Services",
      dates: "Jun 2026 - Present",
      location: "London, United Kingdom",
      badges: ["NLP Location Prediction", "Experimentation Pipelines", "LLM Agents", "GxP Delivery"],
      bullets: [
        {
          title: "Live Platform Delivery",
          text: "Building ML and NLP components for an AI-agent system that flags process gaps and deviations carrying audit and penalty risk, surfacing anomaly signals for investigators to review.",
        },
        {
          title: "Hierarchical NLP Location Model",
          text: "Developing a hierarchical, NLP-based location-prediction model to extract structured location signals from unstructured records.",
        },
        {
          title: "Experimentation Infrastructure",
          text: "Built a YAML-driven experimentation pipeline so features, datasets, and model choices can be swapped without touching code.",
        },
        {
          title: "LLM-Based Agent Extension",
          text: "Extending the system with Python-based LLM agent architecture for richer anomaly triage and investigation workflows.",
        },
      ],
    },
    {
      id: "product-engineer",
      role: "Product Engineer - Business Analysis & Onsite Lead",
      company: "Tata Consultancy Services",
      dates: "2023 - Jun 2026",
      location: "London, United Kingdom",
      badges: ["GenAI Prototyping", "Document Intelligence", "Digital Signatures", "Sprint Analytics"],
      bullets: [
        {
          title: "GenAI Evaluation & Prototyping",
          text: "Defined extraction-quality metrics and led comparative evaluation of Azure Document Intelligence versus GPT-4o Vision for regulatory document automation across US and UK manufacturing sites.",
        },
        {
          title: "GxP Production Utilities",
          text: "Built and helped deploy Python XML digital-signature verification utilities into live GxP production, including URS/SRS/UAT validation documentation and regulatory sign-off.",
        },
        {
          title: "Automation for Cross-Functional Teams",
          text: "Prototyped GenAI integrations beyond formal role scope and built Python/Jira API sprint-analytics automation that removed manual reporting for a 25+ member team.",
        },
      ],
    },
    {
      id: "product-engineer-bangalore",
      role: "Product Engineer - Validation Lead / Scrum Master / Business Analyst",
      company: "Tata Consultancy Services",
      dates: "2019 - 2023",
      location: "Bengaluru, India",
      badges: ["Batch Release Hub", "Scrum Master", "GxP Validation"],
      bullets: [
        {
          title: "Batch Release Hub Leadership",
          text: "Led a cross-functional team of 8+ developers on Batch Release Hub, a GxP-validated digital platform serving 8 global pharmaceutical sites.",
        },
        {
          title: "Validation Ownership",
          text: "Owned GxP validation end-to-end including IQ/OQ/PQ protocols, UAT execution, and regulatory sign-off.",
        },
        {
          title: "Delivery & Stakeholder Management",
          text: "Managed Scrum Master and Technical BA responsibilities across sprint planning, backlog management, release coordination, and global stakeholder communication.",
        },
      ],
    },
    {
      id: "systems-engineer",
      role: "Systems Engineer - Telecom & Infrastructure",
      company: "Tata Consultancy Services",
      dates: "2015 - 2017",
      location: "Bengaluru, India",
      badges: ["Infrastructure Operations", "Automation", "SLA Management"],
      bullets: [
        {
          title: "Enterprise Backup & Restore",
          text: "Maintained enterprise backup and restore infrastructure across Linux and Windows environments while holding a 100% SLA commitment.",
        },
        {
          title: "Automation Tools",
          text: "Built shell-scripting automation tools that reduced manual operations and improved incident response efficiency.",
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
