"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import confetti from "canvas-confetti";
import { Trophy, RotateCcw, Home, Sparkles, Star, Award, Heart } from "lucide-react";
import MiniCellBuilder from "@/components/cell/MiniCellBuilder";

export default function VictoryModal({
  winner = "blue", // 'blue' | 'red' | 'tie'
  blueScore = 0,
  redScore = 0,
  blueCompleted = 6,
  redCompleted = 6,
  onRestart,
}) {
  const isBlue = winner === "blue";
  const isRed = winner === "red";
  const isTie = winner === "tie";

  // Winner has completed their cell (minimum 6 if they won, or actual count)
  const displayBlueCompleted = isBlue ? Math.max(blueCompleted, 6) : blueCompleted;
  const displayRedCompleted = isRed ? Math.max(redCompleted, 6) : redCompleted;

  // Trigger continuous festive confetti celebration
  useEffect(() => {
    // Immediate confetti cannon
    confetti({
      particleCount: 160,
      spread: 100,
      origin: { y: 0.5 },
      colors: isBlue
        ? ["#3b82f6", "#10b981", "#86efac", "#60a5fa", "#fde047"]
        : isRed
        ? ["#ef4444", "#f97316", "#f43f5e", "#fb923c", "#fde047"]
        : ["#3b82f6", "#ef4444", "#10b981", "#f59e0b"],
    });

    // Secondary burst 600ms later
    const timeout1 = setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 120,
        origin: { x: 0.2, y: 0.5 },
      });
      confetti({
        particleCount: 120,
        spread: 120,
        origin: { x: 0.8, y: 0.5 },
      });
    }, 600);

    // Play celebration audio clip if available
    try {
      const audio = new Audio(
        isBlue
          ? "/assets/audio/zoe_plant_cell.mp3"
          : isRed
          ? "/assets/audio/zoe_animal_cell.mp3"
          : "/assets/audio/quest_cert_congrats.mp3"
      );
      audio.volume = 0.85;
      audio.play().catch(() => {});
    } catch (e) {}

    return () => clearTimeout(timeout1);
  }, [isBlue, isRed, isTie]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(10, 15, 30, 0.88)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <div
        className="card"
        style={{
          maxWidth: "740px",
          width: "100%",
          maxHeight: "92vh",
          overflowY: "auto",
          padding: "24px 28px",
          background: "var(--bg-card)",
          borderRadius: "20px",
          border: `3px solid ${isBlue ? "#2563eb" : isRed ? "#dc2626" : "#f59e0b"}`,
          boxShadow: `0 20px 60px ${isBlue ? "rgba(37,99,235,0.4)" : isRed ? "rgba(220,38,38,0.4)" : "rgba(245,158,11,0.4)"}`,
          textAlign: "center",
          position: "relative",
          animation: "scaleUp 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
      >
        {/* Top Trophy & Crown Badge */}
        <div
          style={{
            width: "54px",
            height: "54px",
            borderRadius: "50%",
            margin: "0 auto 10px",
            background: isBlue
              ? "linear-gradient(135deg, #60a5fa, #2563eb)"
              : isRed
              ? "linear-gradient(135deg, #f87171, #dc2626)"
              : "linear-gradient(135deg, #fde047, #ca8a04)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
          }}
        >
          <Trophy size={30} />
        </div>

        {/* Victory Header */}
        <div
          style={{
            fontSize: "0.78rem",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: isBlue ? "#2563eb" : isRed ? "#dc2626" : "#ca8a04",
            marginBottom: "4px",
          }}
        >
          🏁 GRAND PRIX CHAMPIONSHIP WINNER
        </div>

        <h1
          style={{
            fontSize: "clamp(1.5rem, 3vw, 2.1rem)",
            fontWeight: 900,
            marginBottom: "10px",
            letterSpacing: "-0.02em",
          }}
        >
          {isBlue ? (
            <span style={{ color: "#2563eb" }}>BLUE TEAM WINS! (Plant Cell)</span>
          ) : isRed ? (
            <span style={{ color: "#dc2626" }}>RED TEAM WINS! (Animal Cell)</span>
          ) : (
            <span style={{ color: "#ca8a04" }}>IT&apos;S A DEAD HEAT TIE!</span>
          )}
        </h1>

        {/* Scoreboard Pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            background: "var(--bg-surface)",
            border: "1.5px solid var(--border-card)",
            borderRadius: "9999px",
            padding: "6px 20px",
            marginBottom: "16px",
            fontWeight: 900,
            fontSize: "1rem",
          }}
        >
          <span style={{ color: "#2563eb" }}>Blue Team: {blueScore} pts</span>
          <span style={{ color: "var(--text-muted)" }}>•</span>
          <span style={{ color: "#dc2626" }}>Red Team: {redScore} pts</span>
        </div>

        {/* The Character / Kingdom Thank-You Speech Bubble */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            background: isBlue
              ? "rgba(37, 99, 235, 0.08)"
              : isRed
              ? "rgba(220, 38, 38, 0.08)"
              : "rgba(245, 158, 11, 0.08)",
            border: `1.5px solid ${isBlue ? "#2563eb" : isRed ? "#dc2626" : "#f59e0b"}`,
            borderRadius: "16px",
            padding: "12px 18px",
            textAlign: "left",
            marginBottom: "18px",
          }}
        >
          {/* Character Avatar */}
          <div
            style={{
              position: "relative",
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              overflow: "hidden",
              flexShrink: 0,
              border: `2.5px solid ${isBlue ? "#2563eb" : isRed ? "#dc2626" : "#f59e0b"}`,
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            <Image
              src={isBlue ? "/assets/zoe.jpg" : isRed ? "/assets/kai.jpg" : "/assets/dr_elena.jpg"}
              alt="Character"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>

          <div>
            <div
              style={{
                fontWeight: 900,
                fontSize: "0.95rem",
                color: isBlue ? "#2563eb" : isRed ? "#dc2626" : "#ca8a04",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "3px",
              }}
            >
              {isBlue ? (
                <>
                  <span>🌿 Flora Guardian Zoe & The Plant Kingdom:</span>
                  <Heart size={16} fill="#10b981" color="#10b981" />
                </>
              ) : isRed ? (
                <>
                  <span>🐾 Fauna Guardian Kai & The Animal Kingdom:</span>
                  <Heart size={16} fill="#ef4444" color="#ef4444" />
                </>
              ) : (
                <>
                  <span>🧬 Dr. Elena • Chief Biologist:</span>
                  <Sparkles size={16} color="#ca8a04" />
                </>
              )}
            </div>

            <p style={{ fontSize: "0.85rem", lineHeight: 1.45, color: "var(--text-secondary)", margin: 0 }}>
              {isBlue
                ? "“Thank you so much, Blue Team! With all 6 plant organelles assembled—the rigid cellulose cell wall, large turgor vacuole, and solar chloroplasts—our forest canopy can harness sunlight and stand strong against the wind!”"
                : isRed
                ? "“A roaring thank you to Red Team from all of us in the Animal Kingdom! With our flexible plasma membrane, high-output mitochondria, and centrioles, our muscles have the energy to leap, run, and explore the wild!”"
                : "“Incredible performance from both teams! Plant and Animal cells working in perfect harmony, producing oxygen and energy for the entire biosphere!”"}
            </p>
          </div>
        </div>

        {/* Both Teams Final Cell Comparison Preview */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "14px",
            marginBottom: "20px",
          }}
        >
          <div>
            <div style={{ fontSize: "0.78rem", fontWeight: 800, color: "#2563eb", marginBottom: "6px" }}>
              🌱 BLUE TEAM PLANT CELL
            </div>
            <MiniCellBuilder cellType="plant" completedCount={displayBlueCompleted} />
          </div>
          <div>
            <div style={{ fontSize: "0.78rem", fontWeight: 800, color: "#dc2626", marginBottom: "6px" }}>
              🐾 RED TEAM ANIMAL CELL
            </div>
            <MiniCellBuilder cellType="animal" completedCount={displayRedCompleted} />
          </div>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={onRestart}
            className="btn btn-primary"
            style={{
              padding: "12px 24px",
              fontSize: "0.95rem",
              borderRadius: "9999px",
            }}
          >
            <RotateCcw size={18} />
            <span>Play Again / Rematch</span>
          </button>

          <Link
            href="/teaching"
            className="btn btn-outline"
            style={{
              padding: "12px 20px",
              fontSize: "0.95rem",
              borderRadius: "9999px",
            }}
          >
            <Award size={18} />
            <span>Explore 3D Teaching Aid</span>
          </Link>

          <Link
            href="/"
            className="btn btn-outline"
            style={{
              padding: "12px 20px",
              fontSize: "0.95rem",
              borderRadius: "9999px",
            }}
          >
            <Home size={18} />
            <span>Return to Hub</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
