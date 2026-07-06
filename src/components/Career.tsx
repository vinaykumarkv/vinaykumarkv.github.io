"use client";

import React, { useState } from "react";
import styles from "./Career.module.css";
import { ChevronRight, Calendar, MapPin, Briefcase } from "lucide-react";

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
      role: "AI Engineer - LLM & Regulated AI Systems",
      company: "Tata Consultancy Services",
      dates: "May 2023 - Present",
      location: "London, United Kingdom",
      badges: ["LLM Evaluation", "GSK Strategy", "FastAPI Microservices", "Jira API Analytics"],
      bullets: [
        {
          title: "GSK LLM Adoption Strategy",
          text: "Defined extraction-quality metrics and led comparative evaluation of Azure Document Intelligence vs GPT-4o Vision for regulatory document automation across US and UK pharmaceutical manufacturing sites, directly shaping GSK's LLM adoption strategy.",
        },
        {
          title: "GxP Production Microservices",
          text: "Built and deployed Python XML digital-signature verification utilities into live GxP production; authored full URS/SRS/UAT validation documentation and managed regulatory sign-off end-to-end.",
        },
        {
          title: "Intelligent Automation & Dashboards",
          text: "Built Python/Jira API sprint analytics pipeline with automated reporting and visual dashboards - eliminated all manual reporting effort for a 25+ member cross-functional team.",
        },
        {
          title: "Cross-Functional Leadership",
          text: "Acted as primary bridge between business requirements and technical delivery, translating AI evaluation findings into business recommendations that secured executive buy-in.",
        },
      ],
    },
    {
      id: "product-engineer",
      role: "Product Engineer - GxP",
      company: "Tata Consultancy Services",
      dates: "September 2019 - May 2023",
      location: "Bengaluru, India",
      badges: ["Batch Release Hub", "Scrum Master (PSM I)", "GxP Validation Protocols"],
      bullets: [
        {
          title: "Batch Release Hub Platform",
          text: "Led cross-functional product team of 8+ developers on Batch Release Hub - a GxP-validated digital platform replacing paper-based pharmaceutical manufacturing workflows across 8 global sites (US, UK, Europe).",
        },
        {
          title: "GxP validation ownership",
          text: "Owned GxP validation documentation end-to-end throughout the full product development lifecycle: IQ, OQ, PQ protocols, UAT execution, and regulatory sign-off.",
        },
        {
          title: "Dual Process & Technical Ownership",
          text: "Managed simultaneous Scrum Master and Technical BA responsibilities: sprint planning, backlog management, release coordination, and daily stakeholder communication across global teams.",
        },
      ],
    },
    {
      id: "mba-sabbatical",
      role: "MBA Market Research & Projects (Sabbatical)",
      company: "Ramaiah Institute of Technology",
      dates: "October 2017 - September 2019",
      location: "Bengaluru, India",
      badges: ["Marketing & HR", "Market Research", "Organizational Strategy"],
      bullets: [
        {
          title: "Full-Time MBA",
          text: "Graduated with a Master of Business Administration focusing on Marketing, Human Resources, and consumer behaviour.",
        },
        {
          title: "Business Strategy Projects",
          text: "Conducted market research and studied business organisational strategies, bridging engineering skills with executive decision-making frameworks.",
        },
      ],
    },
    {
      id: "systems-engineer",
      role: "Systems Engineer - Enterprise Infrastructure",
      company: "Tata Consultancy Services",
      dates: "October 2015 - October 2017",
      location: "Siruseri, India",
      badges: ["Infrastructure Administration", "Enterprise Backup", "Shell Scripting"],
      bullets: [
        {
          title: "Enterprise Backup Infrastructure",
          text: "Managed enterprise backup and restore infrastructure across Linux and Windows environments, maintaining 100% SLA compliance.",
        },
        {
          title: "Operations Automation",
          text: "Built shell scripting automation tools to reduce manual server operations, improving incident response time and system reliability.",
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
