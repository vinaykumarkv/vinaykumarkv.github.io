import React from "react";
import styles from "./Projects.module.css";
import { ExternalLink, FileText, Award } from "../lucide-shim";

interface Project {
  title: string;
  period: string;
  description: string;
  tags: string[];
  href?: string;
}

const projects: Project[] = [
  {
    title: "Agent Alpha",
    period: "Jun 2026",
    description: "Field-technician co-pilot that analyses equipment and environment photos and generates diagnostic or repair instructions.",
    tags: ["Vision", "Agents", "Field Support"],
    href: "https://github.com/vinaykumarkv/agent-alpha",
  },
  {
    title: "Medical RAG Agent",
    period: "Jun 2026",
    description: "RAG-based agent grounded in the Merck Medical Manual for answering common medical questions.",
    tags: ["RAG", "Medical NLP", "Grounding"],
    href: "https://github.com/vinaykumarkv/Medical_Assistant_rag",
  },
  {
    title: "C5Tree",
    period: "Apr 2026",
    description: "Pure-Python implementation of the C5.0 decision-tree algorithm, designed to be scikit-learn compatible.",
    tags: ["Python", "Machine Learning", "Algorithms"],
    href: "https://github.com/vinaykumarkv/c5tree",
  },
  {
    title: "XML Digital Signer",
    period: "Feb 2025",
    description: "Custom ASTM-standard XML signing and verification implementation ported across Python, .NET and Java for supplier reuse.",
    tags: ["ASTM", "Cryptography", "Python / Java / .NET"],
    href: "https://github.com/vinaykumarkv/XMLDigSignerASTM_Python",
  },
  {
    title: "SuperKart",
    period: "Jul 2026",
    description: "Sales-forecasting model for a multi-city retail chain, served through a Flask API in a Docker container.",
    tags: ["Forecasting", "Flask", "Docker"],
  },
  {
    title: "HelmNet",
    period: "Jun 2026",
    description: "CNN image classifier using TensorFlow/Keras and VGG-16 transfer learning to detect worker helmet compliance.",
    tags: ["Computer Vision", "CNN", "Transfer Learning"],
  },
  {
    title: "EasyVisa",
    period: "Apr 2026",
    description: "Seven tuned classification models predicting US visa approval outcomes, with imbalance handling and profile-based recommendations.",
    tags: ["Classification", "Ensembles", "Imbalanced Data"],
  },
  {
    title: "Personal Loan Campaign",
    period: "Mar 2026",
    description: "Classification and clustering models identifying customer attributes that drive personal-loan conversion.",
    tags: ["Classification", "Clustering", "Customer Analytics"],
  },
  {
    title: "Healthcare Cost Prediction",
    period: "Hackathon",
    description: "Linear regression model predicting annual healthcare costs from demographic, health and lifestyle features; finished top three by RMSE.",
    tags: ["Regression", "Healthcare", "Top 3 RMSE"],
  },
  {
    title: "Risk Event Classification",
    period: "Hackathon",
    description: "Prompt-engineering solution using an open-source pretrained LLM to classify risk events as cybersecurity or financial.",
    tags: ["Prompt Engineering", "LLM", "Risk Classification"],
  },
];

export default function Projects() {
  return (
    <section id="projects" className={styles.projectsSection}>
      <div className="section-header">
        <h2 className="section-title">Selected Projects</h2>
        <p className="section-subtitle">Open source, applied AI, and academic machine learning</p>
      </div>

      <div className={styles.grid}>
        {projects.map((project) => (
          <article key={project.title} className={styles.projectCard}>
            <div className={styles.cardTopline}>
              <span className={styles.projectType}>{project.href ? <FileText size={14} /> : <Award size={14} />} {project.href ? "Open source" : "Academic project"}</span>
              <span className={styles.period}>{project.period}</span>
            </div>
            <h3 className={styles.projectTitle}>{project.title}</h3>
            <p className={styles.description}>{project.description}</p>
            <div className={styles.tags}>
              {project.tags.map((tag) => <span key={tag} className={styles.tag}>{tag}</span>)}
            </div>
            {project.href && (
              <a className={styles.projectLink} href={project.href} target="_blank" rel="noopener noreferrer">
                View repository <ExternalLink size={14} />
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
