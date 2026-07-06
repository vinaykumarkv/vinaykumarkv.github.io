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
      title: "Machine Learning & Deep Learning",
      icon: <Brain size={16} />,
      skills: [
        {
          name: "PyTorch & Custom Architectures",
          level: 92,
          label: "Expert",
          detail: "Built VATSA five-modality architecture, custom visual/audio classifiers.",
        },
        {
          name: "Model Explainability (SHAP/LIME)",
          level: 85,
          label: "Advanced",
          detail: "Model interpretability pipelines for safety-critical settings.",
        },
      ],
    },
    {
      title: "Generative AI & LLMs",
      icon: <Cpu size={16} />,
      skills: [
        {
          name: "LLM Evaluation Frameworks",
          level: 95,
          label: "Production-Proved",
          detail: "Evaluated Azure Doc Intel vs GPT-4o Vision, defining GSK's adoption strategy.",
        },
        {
          name: "LangChain, RAG & Vector DBs",
          level: 90,
          label: "Expert",
          detail: "Architected advanced semantic retrieval & agentic orchestration pipelines.",
        },
      ],
    },
    {
      title: "Enterprise Systems & APIs",
      icon: <Database size={16} />,
      skills: [
        {
          name: "Python & FastAPI Microservices",
          level: 93,
          label: "Senior Developer",
          detail: "Built high-throughput XML signature verification microservices in production.",
        },
        {
          name: "Docker & Infrastructure Automation",
          level: 80,
          label: "Advanced",
          detail: "Containerized AI systems, shell-scripting automation, backup infrastructure.",
        },
      ],
    },
    {
      title: "Compliance & Technical Leadership",
      icon: <ShieldCheck size={16} />,
      skills: [
        {
          name: "GxP Regulatory Validation",
          level: 96,
          label: "SME",
          detail: "Managed end-to-end regulatory sign-off, authoring URS/SRS/UAT protocols.",
        },
        {
          name: "Agile & Jira Analytics",
          level: 88,
          label: "PSM I Certified",
          detail: "Built Jira API analytics dashboard automation eliminating manual reporting.",
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
        <h2 className="section-title">Bridging Two Worlds</h2>
        <p className="section-subtitle">The AI Engineer Who Deploys Under Regulation</p>
      </div>

      <div className={styles.layout}>
        {/* Left Side: Professional Narrative */}
        <div className={styles.bioBlock}>
          <p className={styles.introText}>
            I don&apos;t just evaluate AI models. <strong>I deploy them into production</strong>. 
            My expertise is forged in the most demanding environments you can work in: <strong>GxP-regulated pharmaceutical manufacturing</strong>.
          </p>

          <p className={styles.introText}>
            With over 10 years of experience at Tata Consultancy Services (TCS), my career has spanned the complete software lifecycle. 
            I have evolved from an Infrastructure Systems Engineer to a Product Engineer, and now to an <strong>AI Engineer specializing in LLM evaluation and regulated AI systems</strong>.
          </p>

          <div className={styles.highlightBox}>
            <div className={styles.highlightTitle}>Core Professional Differentiator</div>
            What I bring that most AI engineers don&apos;t: 8 years of understanding how regulated businesses make decisions, how to frame the right problems before writing code, how to author strict validation documentation, and how to explain technical trade-offs to a board.
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
                Conducting DBA research in Walsh College on neural architectures for safety-critical autonomous robotics.
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
