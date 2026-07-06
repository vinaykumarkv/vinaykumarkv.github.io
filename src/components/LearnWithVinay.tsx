"use client";

import React from "react";
import styles from "./LearnWithVinay.module.css";
import { BookOpen } from "lucide-react";

interface Course {
  title: string;
  status: "Released" | "Recording In Progress" | "In Development";
  topics: string[];
  desc: string;
  progress: number;
}

export default function LearnWithVinay() {
  const courses: Course[] = [
    {
      title: "Generative AI & LLM Systems",
      status: "In Development",
      topics: ["LangChain", "Advanced RAG", "Evaluation Matrix", "Agentic Workflows"],
      desc: "Advanced structures for semantic extraction, vector search indexes, vector db configurations, prompt safety filtering, and model benchmarking.",
      progress: 100,
    },
    {
      title: "Machine Learning & Deep Learning",
      status: "In Development",
      topics: ["PyTorch Core", "CNNs / RNNs", "Model Explainability", "Validation Metrics"],
      desc: "Mathematical backpropagation, gradient descents, custom neural classifier loops, and validation checks using SHAP and LIME.",
      progress: 100,
    },
    {
      title: "Mathematics for Data Science",
      status: "In Development",
      topics: ["Linear Algebra", "Calculus", "Probability", "Vector Projections"],
      desc: "The fundamental mathematical building blocks behind regressions, loss functions, optimizer derivations, and neural weights.",
      progress: 100,
    },
    {
      title: "Python Programming",
      status: "Recording In Progress",
      topics: ["OOP Principles", "Production Scripts", "File Utilities", "Data Structs"],
      desc: "Writing clean, modular Python microservices and utility scripts designed to integrate into automated pipelines and live production environments.",
      progress: 80,
    },
    {
      title: "SQL & Relational Databases",
      status: "In Development",
      topics: ["Indexed Queries", "DB Optimization", "Analytical Joins", "DB Schema Design"],
      desc: "Relational database mechanics, constructing high-performance analytical queries, indexing methods, and transactional safety.",
      progress: 100,
    },
    {
      title: "ROS2 & Robotics Systems",
      status: "In Development",
      topics: ["Nodes & Pub/Sub", "Sensory Bindings", "Actuator Controls", "SLAM Nav"],
      desc: "Robotics OS mechanics, wiring publisher-subscriber nodes, handling raw spatial lidar data feeds, and mapping joint motion instructions.",
      progress: 45,
    },
    {
      title: "Embedded C++ & PCB Design",
      status: "In Development",
      topics: ["Firmware Dev", "Signal Integrity", "Schematics Routing", "Microcontrollers"],
      desc: "Writing low-latency C++ instructions for microcontrollers, designing schematics, routing tracks, and ensuring clean hardware signal loops.",
      progress: 30,
    },
  ];

  return (
    <section id="learnwithvinay" className={styles.learnSection}>
      <div className="section-header">
        <h2 className="section-title">LearnWithVinay</h2>
        <p className="section-subtitle">Founder & Tech Educator</p>
      </div>

      <div className={styles.initiativeIntro}>
        LearnWithVinay is an ongoing personal education initiative. Currently, only Python-based material is in development; no C modules have been released yet.
      </div>

      <div className={styles.grid}>
        {courses.map((course, index) => {
          const isReleased = course.status === "Released";
          const isRecording = course.status === "Recording In Progress";

          return (
            <div key={index} className={styles.courseCard}>
              <div>
                <div className={styles.cardHeader}>
                  <h3 className={styles.courseTitle}>{course.title}</h3>
                  <span
                    className={`${styles.statusTag} ${isReleased
                        ? styles.statusReady
                        : isRecording
                          ? styles.statusActive
                          : styles.statusActive
                      }`}
                  >
                    {course.status}
                  </span>
                </div>
                <p className={styles.courseDesc}>{course.desc}</p>
              </div>

              <div>
                <div className={styles.topicList}>
                  {course.topics.map((topic, idx) => (
                    <span key={idx} className={styles.topicTag}>
                      {topic}
                    </span>
                  ))}
                </div>
                <div className={styles.cardFooter}>
                  <span className={styles.progressLabel}>
                    <BookOpen size={12} style={{ display: "inline", marginRight: "4px", verticalAlign: "middle" }} />
                    Syllabus progress
                  </span>
                  <div className={styles.progressContainer}>
                    <div
                      className={styles.progressBar}
                      style={{
                        width: `${course.progress}%`,
                        backgroundColor: isReleased
                          ? "var(--accent-green)"
                          : "var(--accent-purple)",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
