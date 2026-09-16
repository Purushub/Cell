"use client";

import React, { useState } from "react";
import { useGame } from "@/context/GameContext";
import { MYSTERY_SAMPLES } from "@/data/scenarios";
import { HelpCircle, CheckCircle2, XCircle, Search, ArrowRight, RotateCcw } from "lucide-react";

export default function ClassifierPage() {
  const { fireConfetti, playSound, awardPoints, buzzedTeam } = useGame();

  const [currentSampleIdx, setCurrentSampleIdx] = useState(0);
  const [selectedGuess, setSelectedGuess] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const sample = MYSTERY_SAMPLES[currentSampleIdx];

  const handleDiagnose = (option) => {
    setSelectedGuess(option);
    setIsAnswered(true);

    const isCorrect = option === sample.correctType;
    if (isCorrect) {
      playSound("correct");
      fireConfetti();
      if (buzzedTeam) {
        awardPoints(buzzedTeam, 150);
      }
    } else {
      playSound("wrong");
      if (buzzedTeam) {
        awardPoints(buzzedTeam, -50);
      }
    }
  };

  const handleNext = () => {
    setSelectedGuess(null);
    setIsAnswered(false);
    setCurrentSampleIdx((prev) => (prev + 1) % MYSTERY_SAMPLES.length);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "14px",
          marginBottom: "20px",
        }}
      >
        <div>
          <span className="badge badge-playful" style={{ marginBottom: "6px" }}>
            <HelpCircle size={13} /> Cellular Pathology & Taxonomy
          </span>
          <h1 style={{ fontSize: "2rem", fontWeight: 800 }}>Mystery Specimen Classifier</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Analyze electron microscope observations and diagnose unknown cellular samples.
          </p>
        </div>

        <button onClick={handleNext} className="btn btn-primary">
          <span>Next Specimen</span>
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Specimen Inspection Dossier */}
      <div
        className="card"
        style={{
          padding: "28px",
          marginBottom: "24px",
          border: "2px solid var(--border-card)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "2rem" }}>{sample.visualIcon}</span>
            <div>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 800 }}>{sample.codeName}</h2>
              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 700 }}>
                SPECIMEN #{currentSampleIdx + 1} OF {MYSTERY_SAMPLES.length}
              </span>
            </div>
          </div>

          <div
            style={{
              padding: "4px 12px",
              borderRadius: "9999px",
              background: "var(--accent-glow)",
              color: "var(--accent-primary)",
              fontWeight: 800,
              fontSize: "0.82rem",
            }}
          >
            Field Dossier
          </div>
        </div>

        <div
          style={{
            padding: "16px",
            borderRadius: "var(--radius-md)",
            background: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
            marginBottom: "20px",
            lineHeight: 1.6,
          }}
        >
          <strong>Microscope Observation:</strong> {sample.fieldObservation}
        </div>

        <h3 style={{ fontSize: "1rem", fontWeight: 800, marginBottom: "10px" }}>
          Key Ultrastructural Signatures:
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "10px",
            marginBottom: "24px",
          }}
        >
          {sample.microscopeFeatures.map((feat, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 14px",
                borderRadius: "var(--radius-sm)",
                background: "var(--bg-surface)",
                border: "1px solid var(--border-card)",
                fontSize: "0.85rem",
                fontWeight: 600,
              }}
            >
              <Search size={16} color="var(--accent-secondary)" style={{ flexShrink: 0 }} />
              <span>{feat}</span>
            </div>
          ))}
        </div>

        {/* Diagnosis Options */}
        <h3 style={{ fontSize: "1.05rem", fontWeight: 800, marginBottom: "12px" }}>
          Select Cellular Diagnosis:
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "12px",
          }}
        >
          {sample.options.map((opt, i) => {
            const isSelected = selectedGuess === opt;
            const isCorrect = opt === sample.correctType;
            let borderColor = "var(--border-card)";
            let bgColor = "var(--bg-surface)";

            if (isAnswered) {
              if (isCorrect) {
                borderColor = "var(--accent-success)";
                bgColor = "rgba(16, 185, 129, 0.15)";
              } else if (isSelected) {
                borderColor = "var(--accent-danger)";
                bgColor = "rgba(244, 63, 94, 0.15)";
              }
            }

            return (
              <button
                key={i}
                onClick={() => handleDiagnose(opt)}
                disabled={isAnswered}
                style={{
                  padding: "16px",
                  borderRadius: "var(--radius-md)",
                  border: `2px solid ${borderColor}`,
                  background: bgColor,
                  color: "var(--text-primary)",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  cursor: isAnswered ? "default" : "pointer",
                  textAlign: "center",
                  transition: "all 0.15s ease",
                }}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {/* Diagnostic Rationale */}
        {isAnswered && (
          <div
            style={{
              marginTop: "20px",
              padding: "16px",
              borderRadius: "var(--radius-md)",
              background:
                selectedGuess === sample.correctType
                  ? "rgba(16, 185, 129, 0.12)"
                  : "rgba(244, 63, 94, 0.12)",
              border: `1.5px solid ${
                selectedGuess === sample.correctType
                  ? "var(--accent-success)"
                  : "var(--accent-danger)"
              }`,
            }}
          >
            <div
              style={{
                fontWeight: 800,
                color:
                  selectedGuess === sample.correctType
                    ? "var(--accent-success)"
                    : "var(--accent-danger)",
                marginBottom: "4px",
              }}
            >
              {selectedGuess === sample.correctType
                ? "✓ Diagnosis Confirmed!"
                : "✗ Inconclusive / Incorrect Diagnosis"}
            </div>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
              {sample.rationale}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
