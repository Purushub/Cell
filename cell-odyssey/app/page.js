"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import BuzzerBar from "@/components/buzzer/BuzzerBar";
import Scoreboard from "@/components/buzzer/Scoreboard";
import {
  Swords,
  Layers,
  Trophy,
  HelpCircle,
  Sparkles,
  BookOpen,
  ArrowRight,
  Zap,
  CheckCircle2,
  Flag,
} from "lucide-react";

export default function HomePage() {
  const { theme } = useTheme();
  const isPlayful = theme === "playful";

  const activities = [
    {
      title: "Grand Prix Dual Cell Arena",
      tag: "Split-Screen Battle",
      description: "Dual-team split-screen battle with real-time mini cell building, 3D biological race track in the middle, powerups (50:50, +10s, 2X), and stage telemetry!",
      href: "/grand-prix",
      icon: Flag,
      color: "#2563eb",
      badge: "⭐ Featured Duel",
    },
    {
      title: "Cell Odyssey Quest",
      tag: "Story Mode",
      description: "Follow Dr. Elena Vance through a fully-voiced, story-driven expedition across 5 laboratory stations with 3D cell dissection, factory tycoon, and RPG battle deck.",
      href: "/cell-quest",
      icon: Sparkles,
      color: "#2ebfa5",
      badge: "🔬 Story Quest",
    },
    {
      title: "Classroom Buzzer Battle",
      tag: "Multiplayer Arena",
      description: "Two teams compete head-to-head with buzzer lockout detection, instant timer, and live scoreboard.",
      href: "/battle",
      icon: Swords,
      color: "var(--accent-primary)",
      badge: "Team Showdown",
    },
    {
      title: "Mystery Cell Builder",
      tag: "Reconstruction Lab",
      description: "Assemble plant and animal cells with zero spoiler labels. Deduce organelle locations using clues and shape geometry.",
      href: "/activities/cell-builder",
      icon: Layers,
      color: "var(--accent-secondary)",
      badge: "No Spoilers",
    },
    {
      title: "Speed Blitz Showdown",
      tag: "IB Biology Trivia",
      description: "High-energy buzzer quiz covering cell theory, endosymbiosis, and surface-area-to-volume ratio.",
      href: "/activities/speed-blitz",
      icon: Trophy,
      color: "var(--accent-warning)",
      badge: "Rapid Recall",
    },
    {
      title: "Mystery Specimen Classifier",
      tag: "Diagnostic Lab",
      description: "Analyze unknown cellular micrographs and microscopic features to diagnose specimen taxonomy.",
      href: "/activities/classifier",
      icon: HelpCircle,
      color: "var(--accent-success)",
      badge: "Diagnostic",
    },
    {
      title: "Bio-Function Matcher",
      tag: "Metabolic Connect",
      description: "Connect complex cellular processes (ATP synthesis, translation, autophagy) to the responsible organelles.",
      href: "/activities/function-match",
      icon: Sparkles,
      color: "var(--accent-danger)",
      badge: "Interactive Match",
    },
    {
      title: "Educator Teaching Aid",
      tag: "Classroom Companion",
      description: "Full-fidelity annotated cell diagrams, organelle glossary, curriculum notes, and Dr. Elena's narrative.",
      href: "/teaching",
      icon: BookOpen,
      color: "#8b5cf6",
      badge: "Teaching Mode",
    },
  ];

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section
        className="card"
        style={{
          padding: "36px 32px",
          marginBottom: "28px",
          background: isPlayful
            ? "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(240,253,244,0.9))"
            : "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(13,21,39,0.9))",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-40px",
            right: "-40px",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            background: "var(--accent-glow)",
            filter: "blur(50px)",
            pointerEvents: "none",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
          <span className={`badge ${isPlayful ? "badge-playful" : "badge-cyber"}`}>
            <Zap size={13} /> IB BIOLOGY 1.2 & A1.1
          </span>
          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>
            Theme: <strong>{isPlayful ? "Bright & Playful" : "Cyberpunk Dark Sci-Fi"}</strong>
          </span>
        </div>

        <h1
          style={{
            fontSize: "clamp(2rem, 4vw, 2.8rem)",
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: "14px",
            letterSpacing: "-0.03em",
          }}
        >
          Welcome to <span style={{ color: "var(--accent-primary)" }}>Cell Odyssey</span>
        </h1>

        <p
          style={{
            fontSize: "1.05rem",
            color: "var(--text-secondary)",
            maxWidth: "750px",
            lineHeight: 1.6,
            marginBottom: "24px",
          }}
        >
          An interactive arena for high school and IB Biology students. Experience competitive
          two-team buzzer battles, spoiler-free organelle reconstruction with confetti rewards,
          and seamless instant theme toggling!
        </p>

        {/* Narrative Avatar snippet */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "14px",
            background: "var(--bg-surface)",
            padding: "8px 16px 8px 8px",
            borderRadius: "var(--radius-full)",
            border: "1px solid var(--border-subtle)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid var(--accent-primary)",
            }}
          >
            <Image
              src="/assets/dr_elena.jpg"
              alt="Dr. Elena"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)" }}>
            <strong>Dr. Elena:</strong> &quot;Cadets, grab your team buzzers! Today we map cellular ultrastructure.&quot;
          </span>
        </div>
      </section>

      {/* Classroom Buzzer Bar on Home Page */}
      <section style={{ marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 800, display: "flex", alignItems: "center", gap: "8px" }}>
            <Zap size={20} color="var(--accent-warning)" />
            Instant Team Buzzer Tester
          </h2>
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            Keys: <strong>[A]</strong> Team 1 • <strong>[L]</strong> Team 2 • <strong>[Space]</strong> Reset
          </span>
        </div>
        <BuzzerBar points={100} showControls={true} />
      </section>

      {/* Mode / Activity Grid */}
      <section style={{ marginBottom: "36px" }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "18px" }}>
          Explore Interactive Activities & Teaching Aids
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          {activities.map((act) => {
            const Icon = act.icon;
            return (
              <Link
                key={act.href}
                href={act.href}
                className="card card-hoverable"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  textDecoration: "none",
                  color: "inherit",
                  position: "relative",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "14px",
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "var(--radius-md)",
                        background: `${act.color}18`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: act.color,
                        border: `1.5px solid ${act.color}40`,
                      }}
                    >
                      <Icon size={26} />
                    </div>

                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        padding: "3px 10px",
                        borderRadius: "9999px",
                        background: `${act.color}15`,
                        color: act.color,
                        border: `1px solid ${act.color}30`,
                      }}
                    >
                      {act.badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "8px" }}>
                    {act.title}
                  </h3>

                  <p
                    style={{
                      fontSize: "0.88rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.5,
                      marginBottom: "16px",
                    }}
                  >
                    {act.description}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "0.88rem",
                    fontWeight: 700,
                    color: act.color,
                    paddingTop: "12px",
                    borderTop: "1px solid var(--border-subtle)",
                  }}
                >
                  <span>Launch Mode</span>
                  <ArrowRight size={16} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Standings */}
      <Scoreboard />
    </div>
  );
}
