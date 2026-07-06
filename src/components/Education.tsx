"use client";

import React from "react";
import styles from "./Education.module.css";
import { GraduationCap, FileText, Calendar, MapPin, Award } from "../lucide-shim";

export default function Education() {
  return (
    <section id="education" className={styles.eduSection}>
      <div className="section-header">
        <h2 className="section-title">Academic Foundation</h2>
        <p className="section-subtitle">Combining Doctoral Research with Business Rigor</p>
      </div>

      <div className={styles.layout}>
        {/* Left: Publications */}
        <div>
          <div className={styles.pubCard}>
            <div className={styles.pubHeader}>
              <FileText size={16} />
              Featured Publication
            </div>
            <h3 className={styles.pubTitle}>
              VATSA: Video, Audio, Text, Sensory, Action - A Unified Five-Modality Architecture for Human-Level Perception and Action
            </h3>
            <div className={styles.pubAuthors}>
              Authors: <span className={styles.pubAuthorHighlight}>Vinay Kumar .K .V</span>
            </div>
            <p className={styles.pubAbstract}>
              <strong>Abstract:</strong> This research proposes a unified multimodal neural network model tailored for safety-critical robotics environments. By combining visual bounding boxes, audio spectrogram converters, text goal parsers, and spatial sensor networks, the architecture drives real-time action instructions. The model integrates the SAMOS routing mechanism, analyzing collision scores dynamically to restrict motor torque velocities in proximity to human operators, providing a robust validation pathway for GxP-regulated deployment.
            </p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <span className="cyber-btn cyber-btn-purple" style={{ fontSize: "0.75rem", padding: "0.5rem 1rem" }}>
                <Award size={14} /> Concept Paper
              </span>
            </div>
          </div>
        </div>

        {/* Right: Education Timeline */}
        <div className={styles.eduList}>
          {/* Walsh DBA */}
          <div className={styles.eduItem}>
            <div className={styles.eduIconWrapper}>
              <GraduationCap size={20} />
            </div>
            <div className={styles.eduContent}>
              <h3 className={styles.eduDegree}>Doctor of Business Administration (DBA)</h3>
              <p className={styles.eduSchool}>Walsh College</p>
              <div className={styles.eduMeta}>
                <span>
                  <Calendar size={12} style={{ display: "inline", marginRight: "4px", verticalAlign: "middle" }} />
                  Dec 2025 - Dec 2028
                </span>
                <span>
                  <MapPin size={12} style={{ display: "inline", marginRight: "4px", verticalAlign: "middle" }} />
                  Michigan, US (Remote)
                </span>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                Focus: Artificial Intelligence and Machine Learning models for safety-critical autonomous systems.
              </p>
            </div>
          </div>

          {/* UT McCombs PG */}
          <div className={styles.eduItem}>
            <div className={styles.eduIconWrapper}>
              <GraduationCap size={20} />
            </div>
            <div className={styles.eduContent}>
              <h3 className={styles.eduDegree}>Post Graduate Program in AI & ML</h3>
              <p className={styles.eduSchool}>Texas McCombs School of Business</p>
              <div className={styles.eduMeta}>
                <span>
                  <Calendar size={12} style={{ display: "inline", marginRight: "4px", verticalAlign: "middle" }} />
                  Dec 2025 - Dec 2026
                </span>
                <span>
                  <MapPin size={12} style={{ display: "inline", marginRight: "4px", verticalAlign: "middle" }} />
                  Texas, US (Remote)
                </span>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                Focus: Business Applications of Artificial Intelligence and Machine Learning.
              </p>
            </div>
          </div>

          {/* Ramaiah MBA */}
          <div className={styles.eduItem}>
            <div className={styles.eduIconWrapper}>
              <GraduationCap size={20} />
            </div>
            <div className={styles.eduContent}>
              <h3 className={styles.eduDegree}>Master of Business Administration (MBA)</h3>
              <p className={styles.eduSchool}>Ramaiah Institute of Technology</p>
              <div className={styles.eduMeta}>
                <span>
                  <Calendar size={12} style={{ display: "inline", marginRight: "4px", verticalAlign: "middle" }} />
                  2017 - 2019
                </span>
                <span>
                  <MapPin size={12} style={{ display: "inline", marginRight: "4px", verticalAlign: "middle" }} />
                  Bengaluru, India
                </span>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                Focus: Marketing, HR, and Market Research.
              </p>
            </div>
          </div>

          {/* Sir M VIT BE */}
          <div className={styles.eduItem}>
            <div className={styles.eduIconWrapper}>
              <GraduationCap size={20} />
            </div>
            <div className={styles.eduContent}>
              <h3 className={styles.eduDegree}>Bachelor of Engineering (B.E.)</h3>
              <p className={styles.eduSchool}>Sir M Visvesvaraya Institute of Technology</p>
              <div className={styles.eduMeta}>
                <span>
                  <Calendar size={12} style={{ display: "inline", marginRight: "4px", verticalAlign: "middle" }} />
                  2011 - 2015
                </span>
                <span>
                  <MapPin size={12} style={{ display: "inline", marginRight: "4px", verticalAlign: "middle" }} />
                  Bengaluru, India
                </span>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                Major: Electronics and Communications Engineering.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
