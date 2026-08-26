"use client";

import React from "react";
import styles from "./Education.module.css";
import { GraduationCap, Calendar, MapPin, Award } from "../lucide-shim";

export default function Education() {
  return (
    <section id="education" className={styles.eduSection}>
      <div className="section-header">
        <h2 className="section-title">Academic Foundation</h2>
        <p className="section-subtitle">Combining Doctoral Research, Applied AI, and Business Rigor</p>
      </div>

      <div className={styles.layout}>
        {/* Left: Certifications */}
        <div>
          <div className={styles.pubCard}>
            <div className={styles.pubHeader}>
              <Award size={16} />
              Certifications
            </div>
            <h3 className={styles.pubTitle}>Professional credentials</h3>
            <ul className={styles.certificationList}>
              <li>Data Scientist Professional - DataCamp, 2026</li>
              <li>Data Engineer Professional - DataCamp, 2025</li>
              <li>Building LLM Applications with Prompt Engineering - NVIDIA, 2025</li>
              <li>Professional Scrum Master (PSM I) - Scrum.org, 2023</li>
              <li>DevOps Engineer - Edureka, 2021</li>
            </ul>
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
              <h3 className={styles.eduDegree}>Doctor of Business Administration (DBA) in AI & Machine Learning</h3>
              <p className={styles.eduSchool}>Walsh College, USA (via Great Learning)</p>
              <div className={styles.eduMeta}>
                <span>
                  <Calendar size={12} style={{ display: "inline", marginRight: "4px", verticalAlign: "middle" }} />
                  2025 - 2028 (in progress)
                </span>
                <span>
                  <MapPin size={12} style={{ display: "inline", marginRight: "4px", verticalAlign: "middle" }} />
                  Remote
                </span>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                DBA in AI & ML via Great Learning.
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
              <p className={styles.eduSchool}>McCombs School of Business, UT Austin</p>
              <div className={styles.eduMeta}>
                <span>
                  <Calendar size={12} style={{ display: "inline", marginRight: "4px", verticalAlign: "middle" }} />
                  Currently in progress
                </span>
                <span>
                  <MapPin size={12} style={{ display: "inline", marginRight: "4px", verticalAlign: "middle" }} />
                  Remote
                </span>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                Year 1 PGP in AI & ML; currently top of batch.
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
              <p className={styles.eduSchool}>MSRIT, Visvesvaraya Technological University</p>
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
                Major: Marketing.
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
              <p className={styles.eduSchool}>Sir M. Visvesvaraya Institute of Technology</p>
              <div className={styles.eduMeta}>
                <span>
                  <Calendar size={12} style={{ display: "inline", marginRight: "4px", verticalAlign: "middle" }} />
                  2012 - 2015
                </span>
                <span>
                  <MapPin size={12} style={{ display: "inline", marginRight: "4px", verticalAlign: "middle" }} />
                  Bengaluru, India
                </span>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                Major: Electronics & Communication Engineering.
              </p>
            </div>
          </div>

          {/* PVP Polytechnic Diploma */}
          <div className={styles.eduItem}>
            <div className={styles.eduIconWrapper}>
              <GraduationCap size={20} />
            </div>
            <div className={styles.eduContent}>
              <h3 className={styles.eduDegree}>Diploma in Electronics &amp; Communication Engineering</h3>
              <p className={styles.eduSchool}>PVP Polytechnic</p>
              <div className={styles.eduMeta}>
                <span>
                  <Calendar size={12} style={{ display: "inline", marginRight: "4px", verticalAlign: "middle" }} />
                  2009 - 2012
                </span>
                <span>
                  <MapPin size={12} style={{ display: "inline", marginRight: "4px", verticalAlign: "middle" }} />
                  India
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
