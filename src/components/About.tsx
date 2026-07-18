"use client";

import React, { useState } from "react";
import styles from "./About.module.css";
import { Brain, Cpu, ShieldCheck, Database, Award } from "../lucide-shim";

interface Skill {
  name: string;
  level: number;
  label: string;
  detail: string;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
}

export default function About() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const skillCategories: SkillCategory[] = [
    {
      title: "Machine Learning & NLP",
      icon: <Brain size={16} />,
      skills: [
        {
          name: "Hierarchical NLP Models",
          level: 94,
          label: "Advanced",
          detail: "Built location-prediction models from unstructured records for audit anomaly workflows.",
        },
        {
          name: "Classification & Experimentation",
          level: 90,
          label: "Expert",
          detail: "Developed YAML-driven experimentation pipelines for feature, dataset, and model swap workflows.",
        },
      ],
    },
    {
      title: "Generative AI & LLMs",
      icon: <Cpu size={16} />,
      skills: [
        {
          name: "LLM-Based Agent Systems",
          level: 95,
          label: "Production-Ready",
          detail: "Extended systems with Python-based LLM agent architectures for process-gap and deviation analysis.",
        },
        {
          name: "Document Intelligence Evaluation",
          level: 92,
          label: "Expert",
          detail: "Compared Azure Document Intelligence and GPT-4o Vision for regulatory document automation across global sites.",
        },
      ],
    },
    {
      title: "Enterprise Systems & APIs",
      icon: <Database size={16} />,
      skills: [
        {
          name: "Python Automation & APIs",
          level: 93,
          label: "Senior Developer",
          detail: "Built XML signature verification utilities, Jira analytics automation, and production utilities in Python.",
        },
        {
          name: "GxP Delivery Enablement",
          level: 88,
          label: "Advanced",
          detail: "Worked across URS/SRS/UAT, validation, and digital platform delivery in regulated environments.",
        },
      ],
    },
    {
      title: "Leadership & Stakeholder Alignment",
      icon: <ShieldCheck size={16} />,
      skills: [
        {
          name: "Cross-Functional Delivery",
          level: 96,
          label: "SME",
          detail: "Led requirements conversations with QA, Regulatory, Operations, and IT stakeholders across sites.",
        },
        {
          name: "Agile & Scrum Leadership",
          level: 90,
          label: "PSM I",
          detail: "Managed sprint planning, release coordination, backlog ownership, and stakeholder communication.",
        },
      ],
    },
  ];

  const handleSkillClick = (skillName: string) => {
    setSelectedSkill(selectedSkill === skillName ? null : skillName);
  };

  return (
    <section id="about" className={styles.aboutSection}>
      <div className="section-header">
        <h2 className="section-title">Bridging Strategy and AI Systems</h2>
        <p className="section-subtitle">The AI Engineer Who Works Across Business, Risk, and Delivery</p>
      </div>

      <div className={styles.layout}>
        {/* Left Side: Professional Narrative */}
        <div className={styles.bioBlock}>
          <p className={styles.introText}>
            I build AI systems that operate in the real world, including <strong>audit-anomaly detection, hierarchical NLP extraction, and GenAI tooling in regulated pharmaceutical environments</strong>.
          </p>

          <p className={styles.introText}>
            With 10+ years at Tata Consultancy Services, I have moved from infrastructure operations into product engineering, onsite leadership, and now full-time AI/ML delivery. I am comfortable translating complex regulatory and operational needs into production-ready models and experiments.
          </p>

          <div className={styles.highlightBox}>
            <div className={styles.highlightTitle}>Core Professional Differentiator</div>
            What I bring that most AI engineers do not: the ability to work on both sides of the table, leading requirements conversations with QA, Regulatory, and Operations teams while also building the models, pipelines, and agent architectures behind the solution.
          </div>

          <div className={styles.pillars}>
            <div className={styles.pillarCard}>
              <ShieldCheck className={styles.pillarIcon} size={24} />
              <h3 className={styles.pillarTitle}>GxP Compliance</h3>
              <p className={styles.pillarDesc}>
                Expert in pharmaceutical validation standards. Experienced in authoring full URS, SRS, and UAT protocols.
              </p>
            </div>

            <div className={styles.pillarCard}>
              <Award className={styles.pillarIcon} size={24} />
              <h3 className={styles.pillarTitle}>Doctoral AI Research</h3>
              <p className={styles.pillarDesc}>
                Conducting DBA research in Walsh College on robust safety-critical autonomous systems.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Skills matrix */}
        <div className={styles.skillsWidget}>
          <div className={styles.introText} style={{ marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--accent-purple)", fontWeight: "bold" }}>
              Interactive Skills Deck
            </span>
            <br />
            <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
              Click on any skill node to query system details:
            </span>
          </div>

          {skillCategories.map((cat, catIdx) => (
            <div key={catIdx} className={styles.categoryGroup}>
              <h3 className={styles.categoryTitle}>
                {cat.icon}
                {cat.title}
              </h3>
              <div className={styles.skillsList}>
                {cat.skills.map((skill, skillIdx) => {
                  const isSelected = selectedSkill === skill.name;
                  return (
                    <div
                      key={skillIdx}
                      className={styles.skillItem}
                      onClick={() => handleSkillClick(skill.name)}
                    >
                      <div className={styles.skillMeta}>
                        <span className={styles.skillName}>{skill.name}</span>
                        <span className={styles.skillLevel}>{skill.label}</span>
                      </div>
                      <div className={styles.progressBarTrack}>
                        <div
                          className={styles.progressBarFill}
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                      {isSelected && (
                        <div className={styles.skillDetail}>
                          &gt; info: {skill.detail}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
