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
      title: "Machine Learning & Data",
      icon: <Brain size={16} />,
      skills: [
        {
          name: "Classical ML & Feature Engineering",
          level: 94,
          label: "Advanced",
          detail: "EDA, feature engineering, classification, clustering, dimensionality reduction and model tuning with scikit-learn, XGBoost and LightGBM.",
        },
        {
          name: "Data Engineering & Analytics",
          level: 90,
          label: "Expert",
          detail: "Python, SQL, Pandas, NumPy, Seaborn and PySpark for analysis, transformation and repeatable data workflows.",
        },
      ],
    },
    {
      title: "Generative AI & LLMs",
      icon: <Cpu size={16} />,
      skills: [
        {
          name: "LLM Applications & Agents",
          level: 95,
          label: "Production-Ready",
          detail: "Built RAG and multi-agent systems with LangChain, OpenAI APIs, Hugging Face, tool/function definitions and MCP servers.",
        },
        {
          name: "Fine-tuning & Evaluation",
          level: 92,
          label: "Expert",
          detail: "Fine-tuned Llama 3.2 with LoRA, created golden datasets with SMEs, and used Weave tracing for systematic evaluation.",
        },
      ],
    },
    {
      title: "Enterprise Systems & APIs",
      icon: <Database size={16} />,
      skills: [
        {
          name: "Deep Learning",
          level: 93,
          label: "Senior Developer",
          detail: "PyTorch, TensorFlow and Keras, including neural networks, CNN image classification and LSTM/RNN concepts.",
        },
        {
          name: "Cloud & Platform Delivery",
          level: 88,
          label: "Advanced",
          detail: "Microsoft Azure, Azure Container Registry, Databricks and GitHub Copilot for enterprise AI delivery.",
        },
      ],
    },
    {
      title: "Leadership & Stakeholder Alignment",
      icon: <ShieldCheck size={16} />,
      skills: [
        {
          name: "Regulated-Industry Delivery",
          level: 96,
          label: "SME",
          detail: "Translate GxP/pharma business problems into deployed technical solutions while working with QA, Regulatory, Operations and IT stakeholders.",
        },
        {
          name: "Leadership & Scrum",
          level: 90,
          label: "PSM I",
          detail: "Led a 26-person team on a £13M transformation programme and hold Professional Scrum Master I certification.",
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
        <h2 className="section-title">AI Engineering With Delivery Context</h2>
        <p className="section-subtitle">Hands-on machine learning, stakeholder leadership, and regulated-industry experience</p>
      </div>

      <div className={styles.layout}>
        {/* Left Side: Professional Narrative */}
        <div className={styles.bioBlock}>
          <p className={styles.introText}>
            AI/ML Engineer and Data Scientist building <strong>multi-agent architectures, NLP/LLM pipelines, classical ML models, and anomaly detection solutions</strong> for real business problems.
          </p>

          <p className={styles.introText}>
            I have spent 11 years at Tata Consultancy Services, with 9 years of active delivery and a 2-year full-time MBA sabbatical. My path spans infrastructure operations, business analysis, Scrum Master leadership, onsite delivery, and hands-on AI/ML engineering for a UK pharmaceutical account.
          </p>

          <div className={styles.highlightBox}>
            <div className={styles.highlightTitle}>Professional Differentiator</div>
            I combine technical AI/ML delivery with the ability to translate regulated-industry requirements into practical products, having led requirements, design, delivery, and stakeholder alignment across the full lifecycle.
          </div>

          <div className={styles.pillars}>
            <div className={styles.pillarCard}>
              <ShieldCheck className={styles.pillarIcon} size={24} />
              <h3 className={styles.pillarTitle}>Pharma &amp; GxP</h3>
              <p className={styles.pillarDesc}>
                Experience delivering software and AI solutions in a GxP-regulated pharmaceutical environment, including URS/SRS and validation workflows.
              </p>
            </div>

            <div className={styles.pillarCard}>
              <Award className={styles.pillarIcon} size={24} />
              <h3 className={styles.pillarTitle}>Applied AI Research</h3>
              <p className={styles.pillarDesc}>
                DBA in AI &amp; ML in progress through Walsh College via Great Learning, alongside the Year 1 PGP in AI &amp; ML at McCombs School of Business, UT Austin.
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
