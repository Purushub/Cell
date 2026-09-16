"use client";

import React from "react";
import { Check } from "lucide-react";

export const STAGES_LIST = [
  { id: 1, label: "CELL BOUNDARY" },
  { id: 2, label: "POWERHOUSE" },
  { id: 3, label: "COMMAND CORE" },
  { id: 4, label: "ENERGY & DIGESTION" },
  { id: 5, label: "STORAGE & DIVISION" },
  { id: 6, label: "COMPLETE CELL" },
];

export default function StageTimelineStepper({ currentStage = 1 }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        background: "rgba(10, 25, 47, 0.85)",
        backdropFilter: "blur(12px)",
        border: "1.5px solid rgba(56, 189, 248, 0.5)",
        borderRadius: "9999px",
        padding: "6px 20px",
        gap: "16px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4), inset 0 0 15px rgba(56, 189, 248, 0.15)",
        maxWidth: "100%",
        overflowX: "auto",
      }}
    >
      {STAGES_LIST.map((stage, idx) => {
        const isActive = stage.id === currentStage;
        const isPast = stage.id < currentStage;

        return (
          <React.Fragment key={stage.id}>
            {/* Step Item */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "3px",
                opacity: isActive ? 1 : isPast ? 0.9 : 0.45,
                transition: "all 0.2s ease",
              }}
            >
              {/* Circle Number / Check */}
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.85rem",
                  fontWeight: 900,
                  background: isActive
                    ? "radial-gradient(circle, #22c55e 0%, #15803d 100%)"
                    : isPast
                    ? "#0284c7"
                    : "rgba(15, 23, 42, 0.8)",
                  color: "#ffffff",
                  border: isActive
                    ? "2px solid #86efac"
                    : isPast
                    ? "2px solid #38bdf8"
                    : "1.5px solid rgba(148, 163, 184, 0.4)",
                  boxShadow: isActive
                    ? "0 0 12px #22c55e, 0 0 20px rgba(34, 197, 94, 0.5)"
                    : "none",
                }}
              >
                {isPast ? <Check size={14} strokeWidth={3} /> : stage.id}
              </div>

              {/* Step Label */}
              <span
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 800,
                  letterSpacing: "0.04em",
                  color: isActive ? "#86efac" : isPast ? "#bae6fd" : "#94a3b8",
                  whiteSpace: "nowrap",
                  textAlign: "center",
                }}
              >
                {stage.label}
              </span>
            </div>

            {/* Connecting Line between steps */}
            {idx < STAGES_LIST.length - 1 && (
              <div
                style={{
                  width: "24px",
                  height: "2px",
                  background: isPast
                    ? "linear-gradient(90deg, #0284c7, #38bdf8)"
                    : "rgba(148, 163, 184, 0.25)",
                  flexShrink: 0,
                  marginBottom: "12px",
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
