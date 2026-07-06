"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./VATSA.module.css";
import { Video, Volume2, AlignLeft, BarChart3, Radio } from "../lucide-shim";

type Modality = "video" | "audio" | "text" | "sensory" | "action";

export default function VATSA() {
  const [activeTab, setActiveTab] = useState<Modality>("video");

  // Video loop refs
  const videoCanvasRef = useRef<HTMLCanvasElement>(null);
  // Audio loop refs
  const audioCanvasRef = useRef<HTMLCanvasElement>(null);

  // SAMOS state
  const [threatScore, setThreatScore] = useState(15);
  const [selectedPrompt, setSelectedPrompt] = useState("nav_to_cell");

  // Sensory state
  const [sensoryData, setSensoryData] = useState({
    lidar: 1.84,
    gyroX: 12.4,
    gyroY: -1.2,
    temp: 34.2,
    force: 1.25,
  });

  // Action state (Joints)
  const [jointAngles, setJointAngles] = useState([45.2, -15.4, 92.1, 5.0, 1.2]);

  // Video Animation loop (CIFAR-10 Scanner)
  useEffect(() => {
    if (activeTab !== "video") return;
    const canvas = videoCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let scanLineY = 0;
    
    // Target coordinate boxes
    const targets = [
      { x: 50, y: 70, w: 120, h: 100, label: "human_operator", conf: 0.98, dx: 0.2, dy: 0.1 },
      { x: 220, y: 120, w: 90, h: 90, label: "robot_arm_2", conf: 0.94, dx: -0.15, dy: 0.2 },
      { x: 120, y: 40, w: 60, h: 50, label: "obstacle_bin", conf: 0.99, dx: 0.1, dy: -0.15 },
    ];

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || 400;
      canvas.height = 300;
    };
    resizeCanvas();

    const draw = () => {
      ctx.fillStyle = "#040508";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw cyber matrix grid
      ctx.strokeStyle = "rgba(0, 240, 255, 0.05)";
      ctx.lineWidth = 1;
      const gridSize = 25;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw radar circles in center
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      ctx.strokeStyle = "rgba(0, 240, 255, 0.1)";
      ctx.beginPath();
      ctx.arc(cx, cy, 50, 0, Math.PI * 2);
      ctx.arc(cx, cy, 100, 0, Math.PI * 2);
      ctx.stroke();

      // Move and draw scanning green overlay line
      scanLineY = (scanLineY + 1.5) % canvas.height;
      ctx.strokeStyle = "rgba(0, 240, 255, 0.15)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, scanLineY);
      ctx.lineTo(canvas.width, scanLineY);
      ctx.stroke();

      // Draw scanning laser glow
      const laserGlow = ctx.createLinearGradient(0, scanLineY - 20, 0, scanLineY);
      laserGlow.addColorStop(0, "transparent");
      laserGlow.addColorStop(1, "rgba(0, 240, 255, 0.04)");
      ctx.fillStyle = laserGlow;
      ctx.fillRect(0, scanLineY - 20, canvas.width, 20);

      // Update and Draw target bounding boxes
      targets.forEach((t) => {
        // bounce physics inside canvas
        t.x += t.dx;
        t.y += t.dy;
        if (t.x < 10 || t.x + t.w > canvas.width - 10) t.dx *= -1;
        if (t.y < 10 || t.y + t.h > canvas.height - 10) t.dy *= -1;

        // Bounding box outline
        ctx.strokeStyle = t.label === "human_operator" ? "#ffbd2e" : "rgba(0, 240, 255, 0.5)";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(t.x, t.y, t.w, t.h);

        // Bounding corners indicators
        const l = 10;
        ctx.strokeStyle = t.label === "human_operator" ? "#ff5f56" : "#00f0ff";
        ctx.lineWidth = 3;
        
        // Top-left corner
        ctx.beginPath();
        ctx.moveTo(t.x + l, t.y); ctx.lineTo(t.x, t.y); ctx.lineTo(t.x, t.y + l);
        ctx.stroke();

        // Top-right corner
        ctx.beginPath();
        ctx.moveTo(t.x + t.w - l, t.y); ctx.lineTo(t.x + t.w, t.y); ctx.lineTo(t.x + t.w, t.y + l);
        ctx.stroke();

        // Bottom-left corner
        ctx.beginPath();
        ctx.moveTo(t.x, t.y + t.h - l); ctx.lineTo(t.x, t.y + t.h); ctx.lineTo(t.x + l, t.y + t.h);
        ctx.stroke();

        // Bottom-right corner
        ctx.beginPath();
        ctx.moveTo(t.x + t.w - l, t.y + t.h); ctx.lineTo(t.x + t.w, t.y + t.h); ctx.lineTo(t.x + t.w, t.y + t.h - l);
        ctx.stroke();

        // Label tags
        ctx.fillStyle = t.label === "human_operator" ? "rgba(255, 189, 46, 0.95)" : "rgba(0, 240, 255, 0.95)";
        ctx.font = "bold 9px monospace";
        const labelText = `${t.label} [${Math.round(t.conf * 100)}%]`;
        const textWidth = ctx.measureText(labelText).width;
        ctx.fillRect(t.x, t.y - 14, textWidth + 8, 14);

        ctx.fillStyle = "#000000";
        ctx.fillText(labelText, t.x + 4, t.y - 4);
      });

      // Overlay static telemetry data
      ctx.fillStyle = "rgba(0, 240, 255, 0.8)";
      ctx.font = "9px monospace";
      ctx.fillText("CAM_INPUT: LNK_ONLINE", 15, 25);
      ctx.fillText("ENCODER_FPS: 22.0", 15, 38);
      ctx.fillText("CLASSIFIER: CIFAR-10_96.31%", 15, 51);

      animationId = requestAnimationFrame(draw);
    };

    draw();

    window.addEventListener("resize", resizeCanvas);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [activeTab]);

  // Audio Animation Loop (Sine Wave generator)
  useEffect(() => {
    if (activeTab !== "audio") return;
    const canvas = audioCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let offset = 0;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || 400;
      canvas.height = 300;
    };
    resizeCanvas();

    const draw = () => {
      ctx.fillStyle = "#040508";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = "rgba(189, 0, 255, 0.05)";
      ctx.lineWidth = 1;
      const size = 30;
      for (let x = 0; x < canvas.width; x += size) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw middle reference line
      const midY = canvas.height / 2;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.beginPath();
      ctx.moveTo(0, midY);
      ctx.lineTo(canvas.width, midY);
      ctx.stroke();

      // Render 3 overlapping sine waves representing Wav2Vec2 encoder
      const waves = [
        { amplitude: 45, frequency: 0.015, speed: 0.05, color: "rgba(189, 0, 255, 0.8)", glow: "rgba(189, 0, 255, 0.2)" },
        { amplitude: 25, frequency: 0.03, speed: -0.07, color: "rgba(0, 240, 255, 0.6)", glow: "rgba(0, 240, 255, 0.15)" },
        { amplitude: 15, frequency: 0.05, speed: 0.09, color: "rgba(5, 255, 197, 0.4)", glow: "rgba(5, 255, 197, 0.1)" },
      ];

      waves.forEach((w) => {
        ctx.strokeStyle = w.color;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 8;
        ctx.shadowColor = w.color;
        ctx.beginPath();

        for (let x = 0; x < canvas.width; x++) {
          const y = midY + Math.sin(x * w.frequency + offset * w.speed) * w.amplitude;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

      // Clear shadow properties
      ctx.shadowBlur = 0;

      offset += 1;

      // Telemetry log
      ctx.fillStyle = "rgba(189, 0, 255, 0.8)";
      ctx.font = "9px monospace";
      ctx.fillText("AUDIO_INPUT: MIC_ACTIVE", 15, 25);
      ctx.fillText("TRANSFORMER: Wav2Vec2_ENCODER", 15, 38);
      ctx.fillText("CLASSIFIER: ESC-50_70.25%", 15, 51);

      animationId = requestAnimationFrame(draw);
    };

    draw();

    window.addEventListener("resize", resizeCanvas);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [activeTab]);

  // Sensory simulation interval loop
  useEffect(() => {
    const interval = setInterval(() => {
      setSensoryData((prev) => ({
        lidar: Math.max(0.2, Math.min(4.0, Number((prev.lidar + (Math.random() - 0.5) * 0.1).toFixed(2)))),
        gyroX: Number((prev.gyroX + (Math.random() - 0.5) * 0.4).toFixed(1)),
        gyroY: Number((prev.gyroY + (Math.random() - 0.5) * 0.4).toFixed(1)),
        temp: Number((34.0 + Math.sin(Date.now() / 10000) * 0.5 + Math.random() * 0.05).toFixed(1)),
        force: Math.max(0.1, Math.min(5.0, Number((prev.force + (Math.random() - 0.5) * 0.15).toFixed(2)))),
      }));

      // Shifting action joint angles slightly
      setJointAngles((prev) =>
        prev.map((angle) => Number((angle + (Math.random() - 0.5) * 0.2).toFixed(1)))
      );
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // Determine SAMOS Decision
  const getSAMOSDecision = () => {
    const prompts: Record<string, { label: string; action: string }> = {
      nav_to_cell: { label: "Navigate to Packaging Cell", action: "Move base path" },
      lift_block: { label: "Pick Up Vials Box", action: "Engage magnetic gripper" },
      shutdown: { label: "Trigger Manual E-Stop", action: "Immediate clamp brakes" },
    };

    const activePrompt = prompts[selectedPrompt] || { label: "Unknown Command", action: "N/A" };

    if (threatScore < 30) {
      return {
        status: "SAFE",
        desc: "SAMOS routes actions straight to execution. Complete velocity bounds authorized.",
        command: `Velocity: 1.25m/s | Target Action: ${activePrompt.action} [100% Force]`,
        styleClass: styles.decisionSafe,
        pathClass: styles.routingPathActive,
      };
    } else if (threatScore < 70) {
      return {
        status: "THROTTLED (SAFETY RE-ROUTE)",
        desc: "Co-operative operator detected within buffer zone. Applying threat coefficient dampening.",
        command: `Velocity: 0.35m/s [Safety Throttled] | Collision Prevention active | ${activePrompt.action}`,
        styleClass: styles.decisionWarning,
        pathClass: styles.routingPathWarning,
      };
    } else {
      return {
        status: "CRITICAL: LOCKOUT ENGINE ENGAGED",
        desc: "Collision imminent. Override triggered. Joint motors deactivated, brakes clamped.",
        command: "Velocity: 0.0m/s [Emergency Stop Active] | Override code 0x99",
        styleClass: styles.decisionEStop,
        pathClass: styles.routingPathDanger,
      };
    }
  };

  const decision = getSAMOSDecision();

  return (
    <section id="vatsa" className={styles.vatsaSection}>
      <div className="section-header">
        <h2 className="section-title">VATSA AI System</h2>
        <p className="section-subtitle">Unified Five-Modality Robotics Architecture</p>
      </div>

      <div className={styles.dashboard}>
        {/* Modality Tabs */}
        <div className={styles.tabBar}>
          <button
            className={`${styles.tabBtn} ${activeTab === "video" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("video")}
          >
            <Video size={15} /> Video Modality
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === "audio" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("audio")}
          >
            <Volume2 size={15} /> Audio Modality
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === "text" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("text")}
          >
            <AlignLeft size={15} /> Text Router
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === "sensory" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("sensory")}
          >
            <BarChart3 size={15} /> Sensory Data
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === "action" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("action")}
          >
            <Radio size={15} /> Action Vectors
          </button>
        </div>

        {/* Tab content console */}
        <div className={styles.consoleBody}>
          {activeTab === "video" && (
            <div className={styles.consoleLayout}>
              <div className={styles.visualPanel}>
                <canvas ref={videoCanvasRef} className={styles.canvas} />
              </div>
              <div className={styles.metaPanel}>
                <h3 className={styles.metaTitle}>Neural Scanning Engine</h3>
                <p className={styles.metaDesc}>
                  Our vision modality uses a modified convolutional feed to process live visual fields. Built for low-latency robotics contexts, it operates on raw image inputs to identify operators and manufacturing bins.
                </p>
                <div className={styles.statsGrid}>
                  <div className={styles.statCard}>
                    <div className={styles.statValue}>96.31%</div>
                    <div className={styles.statLabel}>CIFAR-10 Accuracy</div>
                  </div>
                  <div className={styles.statCard}>
                    <div className={styles.statValue}>22.0</div>
                    <div className={styles.statLabel}>Real-time FPS</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "audio" && (
            <div className={styles.consoleLayout}>
              <div className={styles.visualPanel}>
                <canvas ref={audioCanvasRef} className={styles.canvas} />
              </div>
              <div className={styles.metaPanel}>
                <h3 className={styles.metaTitle}>Acoustic Transfer Learning</h3>
                <p className={styles.metaDesc}>
                  Processes audio frequency arrays through Wav2Vec2 transfer learning, tuned specifically to industrial environmental alerts. Filters white ambient noises (machinery hums) to capture commands.
                </p>
                <div className={styles.statsGrid}>
                  <div className={styles.statCard}>
                    <div className={`${styles.statValue} ${styles.statValuePurple}`}>70.25%</div>
                    <div className={styles.statLabel}>ESC-50 Accuracy</div>
                  </div>
                  <div className={styles.statCard}>
                    <div className={styles.statValue}>Wav2Vec2</div>
                    <div className={styles.statLabel}>Feature Extractor</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "text" && (
            <div className={styles.consoleLayout}>
              {/* Interactive SAMOS router */}
              <div className={styles.samosContainer}>
                <h4 className={styles.metaTitle} style={{ fontSize: "1rem", color: "var(--accent-cyan)", fontFamily: "var(--font-mono)" }}>
                  SAMOS Algorithmic Router
                </h4>

                <div className={styles.sliderGroup}>
                  <label htmlFor="prompt-select" className={styles.sliderHeader}>
                    <span>Select Actuator Prompt:</span>
                  </label>
                  <select
                    id="prompt-select"
                    value={selectedPrompt}
                    onChange={(e) => setSelectedPrompt(e.target.value)}
                    style={{
                      background: "#1c2130",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "#fff",
                      padding: "0.5rem",
                      borderRadius: "4px",
                      fontFamily: "monospace",
                      outline: "none",
                    }}
                  >
                    <option value="nav_to_cell">Command: Navigate Packaging Cell</option>
                    <option value="lift_block">Command: Lift Vials Cargo</option>
                    <option value="shutdown">Command: Emergency Shutdown Trigger</option>
                  </select>
                </div>

                <div className={styles.sliderGroup}>
                  <div className={styles.sliderHeader}>
                    <span>Safety Threat Score (Collision Risk):</span>
                    <span style={{ color: threatScore > 70 ? "#ff5f56" : threatScore > 30 ? "#ffbd2e" : "var(--accent-green)" }}>
                      {threatScore}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={threatScore}
                    onChange={(e) => setThreatScore(Number(e.target.value))}
                    className={styles.slider}
                  />
                </div>

                <div className={styles.routingVisualizer}>
                  <div className={`${styles.routingNode} ${styles.nodeActive}`}>
                    <span>Prompt</span>
                    <span>Input</span>
                  </div>
                  <div className={`${styles.routingNode} ${styles.nodeActive}`}>
                    <span>SAMOS</span>
                    <span>Router</span>
                  </div>
                  <div className={`${styles.routingNode} ${threatScore < 70 ? styles.nodeActive : ""}`}>
                    <span>Action</span>
                    <span>Motors</span>
                  </div>
                  <div className={`${styles.routingNode} ${threatScore >= 70 ? styles.nodeActive : ""}`}>
                    <span>E-STOP</span>
                    <span>Brakes</span>
                  </div>
                  <div className={`${styles.routingPath} ${decision.pathClass}`} />
                </div>

                <div className={`${styles.decisionBox} ${decision.styleClass}`}>
                  <strong>ROUTE DECISION: {decision.status}</strong>
                  <p style={{ marginTop: "0.25rem", fontSize: "0.75rem", opacity: 0.9 }}>{decision.desc}</p>
                  <p style={{ marginTop: "0.5rem", fontWeight: "bold" }}>&gt; Output Vector: {decision.command}</p>
                </div>
              </div>

              <div className={styles.metaPanel}>
                <h3 className={styles.metaTitle}>SAMOS Output Routing</h3>
                <p className={styles.metaDesc}>
                  VATSA is part of ongoing research; the SAMOS routing algorithm is still under development and not yet formalized in a thesis. It evaluates collision and threat probabilities from sensors in real-time, routing or throttling commands accordingly.
                </p>
                <div className={styles.statsGrid}>
                  <div className={styles.statCard}>
                    <div className={styles.statValue}>&lt; 2ms</div>
                    <div className={styles.statLabel}>Routing Latency</div>
                  </div>
                  <div className={styles.statCard}>
                    <div className={styles.statValue}>Fail-Safe</div>
                    <div className={styles.statLabel}>State Machine</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "sensory" && (
            <div className={styles.consoleLayout}>
              <div className={styles.sensoryGrid}>
                <div className={styles.sensoryBarRow}>
                  <span className={styles.sensoryBarName}>LIDAR RNG</span>
                  <div className={styles.sensoryBarTrack}>
                    <div className={styles.sensoryBarFill} style={{ width: `${(sensoryData.lidar / 4) * 100}%` }}></div>
                  </div>
                  <span className={styles.sensoryBarValue}>{sensoryData.lidar} m</span>
                </div>

                <div className={styles.sensoryBarRow}>
                  <span className={styles.sensoryBarName}>THERMAL</span>
                  <div className={styles.sensoryBarTrack}>
                    <div className={styles.sensoryBarFill} style={{ width: `${(sensoryData.temp / 50) * 100}%` }}></div>
                  </div>
                  <span className={styles.sensoryBarValue}>{sensoryData.temp}°C</span>
                </div>

                <div className={styles.sensoryBarRow}>
                  <span className={styles.sensoryBarName}>PRESSURE</span>
                  <div className={styles.sensoryBarTrack}>
                    <div className={styles.sensoryBarFill} style={{ width: `${(sensoryData.force / 5) * 100}%` }}></div>
                  </div>
                  <span className={styles.sensoryBarValue}>{sensoryData.force} N</span>
                </div>

                <div className={styles.sensoryBarRow} style={{ marginTop: "1rem" }}>
                  <span className={styles.sensoryBarName}>GYROSCOPE</span>
                  <span style={{ color: "var(--accent-purple)", fontFamily: "monospace", fontSize: "0.75rem" }}>
                    X-Axis: {sensoryData.gyroX}° | Y-Axis: {sensoryData.gyroY}°
                  </span>
                </div>
              </div>

              <div className={styles.metaPanel}>
                <h3 className={styles.metaTitle}>Industrial Sensory Streams</h3>
                <p className={styles.metaDesc}>
                  Aggregates tactile, thermal, and spatial environmental variables. High-resolution feedback channels are combined with deep networks to continuously monitor robot surroundings.
                </p>
                <div className={styles.statsGrid}>
                  <div className={styles.statCard}>
                    <div className={styles.statValue}>100Hz</div>
                    <div className={styles.statLabel}>Sampling Rate</div>
                  </div>
                  <div className={styles.statCard}>
                    <div className={styles.statValue}>16-bit</div>
                    <div className={styles.statLabel}>Resolution</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "action" && (
            <div className={styles.consoleLayout}>
              <div className={styles.sensoryGrid}>
                {jointAngles.map((angle, index) => (
                  <div key={index} className={styles.sensoryBarRow}>
                    <span className={styles.sensoryBarName}>ACTUATOR {index + 1}</span>
                    <div className={styles.sensoryBarTrack}>
                      <div className={styles.sensoryBarFill} style={{ width: `${((angle + 90) / 180) * 100}%`, background: "linear-gradient(90deg, var(--accent-purple), var(--accent-green))" }}></div>
                    </div>
                    <span className={styles.sensoryBarValue}>{angle}°</span>
                  </div>
                ))}
              </div>

              <div className={styles.metaPanel}>
                <h3 className={styles.metaTitle}>Actuator Pulse Vectors</h3>
                <p className={styles.metaDesc}>
                  Maps high-level routing goals directly into low-level joint torque instructions. Joint position registers feedback at 200hz loop rates with emergency stop locks linked to the safety routing channels.
                </p>
                <div className={styles.statsGrid}>
                  <div className={styles.statCard}>
                    <div className={styles.statValue}>5 Axes</div>
                    <div className={styles.statLabel}>Manipulator DOF</div>
                  </div>
                  <div className={styles.statCard}>
                    <div className={styles.statValue}>Closed-loop</div>
                    <div className={styles.statLabel}>Control Loop</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
