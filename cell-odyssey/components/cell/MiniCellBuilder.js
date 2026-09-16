"use client";

import React from "react";

/**
 * MiniCellBuilder:
 * - cellType: 'plant' (Blue Team) | 'animal' (Red Team)
 * - unlockedComponents: Array of string keys or stage count (0 to 6)
 * - latestGained: String description of latest organelle added
 */
export default function MiniCellBuilder({
  cellType = "plant",
  completedCount = 0,
  latestGained = null,
}) {
  const isPlant = cellType === "plant";
  const teamColor = isPlant ? "#2563eb" : "#dc2626";

  // Plant Cell Unlocks (Stages 1 to 6)
  // 1: Cellulose Cell Wall
  // 2: Mitochondria
  // 3: Nucleus
  // 4: Chloroplasts
  // 5: Large Central Vacuole
  // 6: Cytoplasm & Ribosomes
  const plantHasWall = completedCount >= 1;
  const plantHasMito = completedCount >= 2;
  const plantHasNucleus = completedCount >= 3;
  const plantHasChloroplast = completedCount >= 4;
  const plantHasVacuole = completedCount >= 5;
  const plantHasCytoplasm = completedCount >= 6;

  // Animal Cell Unlocks (Stages 1 to 6)
  // 1: Flexible Plasma Membrane
  // 2: Mitochondria
  // 3: Nucleus
  // 4: Lysosomes
  // 5: Centrioles
  // 6: Cytoplasm & Ribosomes
  const animalHasMembrane = completedCount >= 1;
  const animalHasMito = completedCount >= 2;
  const animalHasNucleus = completedCount >= 3;
  const animalHasLysosome = completedCount >= 4;
  const animalHasCentrioles = completedCount >= 5;
  const animalHasCytoplasm = completedCount >= 6;

  const totalStages = 6;
  const isComplete = completedCount >= totalStages;

  return (
    <div
      style={{
        background: isPlant ? "rgba(37, 99, 235, 0.05)" : "rgba(220, 38, 38, 0.05)",
        border: `2px solid ${isPlant ? "rgba(37, 99, 235, 0.3)" : "rgba(220, 38, 38, 0.3)"}`,
        borderRadius: "16px",
        padding: "12px 14px",
        marginBottom: "12px",
      }}
    >
      {/* Header Label */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
          borderBottom: "1px solid var(--border-subtle)",
          paddingBottom: "6px",
        }}
      >
        <span style={{ fontSize: "0.85rem", fontWeight: 900, color: teamColor, display: "flex", alignItems: "center", gap: "5px" }}>
          {isPlant ? "🌱 TARGET: PLANT CELL" : "🐾 TARGET: ANIMAL CELL"}
        </span>
        <span
          style={{
            fontSize: "0.72rem",
            fontWeight: 800,
            padding: "2px 8px",
            borderRadius: "9999px",
            background: isComplete ? "var(--accent-success)" : "var(--bg-surface)",
            color: isComplete ? "#ffffff" : "var(--text-muted)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          {completedCount}/{totalStages} Components
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        {/* SVG Diagram: Boxy Plant Cell vs Rounded Animal Cell */}
        <div
          style={{
            width: "92px",
            height: "92px",
            position: "relative",
            flexShrink: 0,
            background: "var(--bg-surface)",
            borderRadius: isPlant ? "12px" : "50%",
            border: "1.5px solid var(--border-card)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "4px",
          }}
        >
          {isPlant ? (
            /* ================= PLANT CELL SVG (Boxy, Large Vacuole, Chloroplasts) ================= */
            <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", overflow: "visible" }}>
              {/* Outer Cellulose Cell Wall (Stage 1) */}
              <rect
                x="6"
                y="8"
                width="88"
                height="84"
                rx="14"
                fill={plantHasWall ? "#dcfce7" : "none"}
                stroke={plantHasWall ? "#15803d" : "#cbd5e1"}
                strokeWidth={plantHasWall ? "4" : "2"}
                strokeDasharray={plantHasWall ? "none" : "4,3"}
              />
              {/* Inner Plasma Membrane */}
              {plantHasWall && (
                <rect x="11" y="13" width="78" height="74" rx="10" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
              )}

              {/* Stage 5: Large Central Vacuole */}
              {plantHasVacuole ? (
                <rect
                  x="28"
                  y="26"
                  width="48"
                  height="46"
                  rx="16"
                  fill="#bae6fd"
                  stroke="#0284c7"
                  strokeWidth="2"
                  opacity="0.85"
                />
              ) : (
                <rect x="32" y="30" width="40" height="38" rx="14" fill="none" stroke="#94a3b8" strokeDasharray="2,2" opacity="0.4" />
              )}

              {/* Stage 3: Nucleus (pushed to side by vacuole) */}
              {plantHasNucleus ? (
                <g>
                  <circle cx="24" cy="34" r="10" fill="#4338ca" />
                  <circle cx="24" cy="34" r="9" fill="#6366f1" />
                  <circle cx="26" cy="32" r="3" fill="#ffffff" />
                </g>
              ) : (
                <circle cx="24" cy="34" r="8" fill="none" stroke="#94a3b8" strokeDasharray="2,2" opacity="0.3" />
              )}

              {/* Stage 4: Chloroplasts (Green discs with thylakoids) */}
              {plantHasChloroplast ? (
                <g>
                  <ellipse cx="22" cy="68" rx="7" ry="4" transform="rotate(-20 22 68)" fill="#16a34a" />
                  <circle cx="20" cy="68" r="1" fill="#86efac" />
                  <circle cx="24" cy="68" r="1" fill="#86efac" />

                  <ellipse cx="78" cy="36" rx="7" ry="4" transform="rotate(30 78 36)" fill="#16a34a" />
                  <circle cx="76" cy="36" r="1" fill="#86efac" />
                  <circle cx="80" cy="36" r="1" fill="#86efac" />

                  <ellipse cx="74" cy="74" rx="7" ry="4" transform="rotate(-15 74 74)" fill="#16a34a" />
                </g>
              ) : (
                <ellipse cx="22" cy="68" rx="6" ry="3.5" fill="none" stroke="#94a3b8" strokeDasharray="2,2" opacity="0.3" />
              )}

              {/* Stage 2: Mitochondria */}
              {plantHasMito && (
                <g>
                  <ellipse cx="50" cy="18" rx="7" ry="3.5" fill="#ef4444" />
                  <path d="M 46 18 Q 50 16 54 18" stroke="#ffffff" strokeWidth="1" fill="none" />
                </g>
              )}

              {/* Stage 6: Cytoplasm & Ribosomes */}
              {plantHasCytoplasm && (
                <g>
                  <circle cx="18" cy="22" r="1.2" fill="#f59e0b" />
                  <circle cx="78" cy="20" r="1.2" fill="#f59e0b" />
                  <circle cx="48" cy="80" r="1.2" fill="#f59e0b" />
                </g>
              )}
            </svg>
          ) : (
            /* ================= ANIMAL CELL SVG (Round, Centrosome, Lysosomes) ================= */
            <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", overflow: "visible" }}>
              {/* Flexible Plasma Membrane (Stage 1) */}
              <ellipse
                cx="50"
                cy="50"
                rx="44"
                ry="41"
                fill={animalHasMembrane ? "#fee2e2" : "none"}
                stroke={animalHasMembrane ? "#dc2626" : "#cbd5e1"}
                strokeWidth={animalHasMembrane ? "3.5" : "2"}
                strokeDasharray={animalHasMembrane ? "none" : "4,3"}
              />

              {/* Stage 3: Centered Nucleus */}
              {animalHasNucleus ? (
                <g>
                  <circle cx="50" cy="50" r="14" fill="#991b1b" />
                  <circle cx="50" cy="50" r="13" fill="#dc2626" />
                  <circle cx="53" cy="48" r="4" fill="#ffffff" />
                </g>
              ) : (
                <circle cx="50" cy="50" r="12" fill="none" stroke="#94a3b8" strokeDasharray="2,2" opacity="0.3" />
              )}

              {/* Stage 2: Mitochondria */}
              {animalHasMito ? (
                <g>
                  <ellipse cx="26" cy="34" rx="8" ry="4" transform="rotate(-30 26 34)" fill="#ea580c" />
                  <path d="M 21 34 Q 26 32 31 34" stroke="#ffffff" strokeWidth="1" fill="none" />
                  <ellipse cx="72" cy="64" rx="8" ry="4" transform="rotate(25 72 64)" fill="#ea580c" />
                  <path d="M 67 64 Q 72 62 77 64" stroke="#ffffff" strokeWidth="1" fill="none" />
                </g>
              ) : (
                <ellipse cx="26" cy="34" rx="7" ry="3.5" fill="none" stroke="#94a3b8" strokeDasharray="2,2" opacity="0.3" />
              )}

              {/* Stage 4: Lysosomes (digestive acid vesicles) */}
              {animalHasLysosome ? (
                <g>
                  <circle cx="28" cy="68" r="5" fill="#ec4899" stroke="#be185d" strokeWidth="1.5" />
                  <circle cx="68" cy="32" r="4.5" fill="#ec4899" stroke="#be185d" strokeWidth="1.5" />
                </g>
              ) : (
                <circle cx="28" cy="68" r="4.5" fill="none" stroke="#94a3b8" strokeDasharray="2,2" opacity="0.3" />
              )}

              {/* Stage 5: Centrioles (orthogonal star/barrel pair) */}
              {animalHasCentrioles ? (
                <g>
                  <rect x="42" y="28" width="6" height="3" fill="#f59e0b" transform="rotate(45 45 29)" />
                  <rect x="46" y="28" width="3" height="6" fill="#f59e0b" transform="rotate(45 47 31)" />
                </g>
              ) : (
                <rect x="44" y="28" width="4" height="4" fill="none" stroke="#94a3b8" strokeDasharray="2,2" opacity="0.3" />
              )}

              {/* Stage 6: Cytoplasm & Ribosomes */}
              {animalHasCytoplasm && (
                <g>
                  <circle cx="20" cy="50" r="1.2" fill="#854d0e" />
                  <circle cx="78" cy="48" r="1.2" fill="#854d0e" />
                  <circle cx="50" cy="74" r="1.2" fill="#854d0e" />
                </g>
              )}
            </svg>
          )}
        </div>

        {/* Component Badges Grid */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 700, marginBottom: "4px" }}>
            CELL ANATOMY PROGRESS:
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
            {isPlant ? (
              <>
                <span style={badgeStyle(plantHasWall, "#16a34a")}>🧱 Cell Wall</span>
                <span style={badgeStyle(plantHasMito, "#ef4444")}>⚡ Mitochondria</span>
                <span style={badgeStyle(plantHasNucleus, "#6366f1")}>🧬 Nucleus</span>
                <span style={badgeStyle(plantHasChloroplast, "#10b981")}>🍃 Chloroplasts</span>
                <span style={badgeStyle(plantHasVacuole, "#0284c7")}>💧 Large Vacuole</span>
                <span style={badgeStyle(plantHasCytoplasm, "#f59e0b")}>⚙️ Cytoplasm</span>
              </>
            ) : (
              <>
                <span style={badgeStyle(animalHasMembrane, "#dc2626")}>🛡️ Membrane</span>
                <span style={badgeStyle(animalHasMito, "#ea580c")}>⚡ Mitochondria</span>
                <span style={badgeStyle(animalHasNucleus, "#6366f1")}>🧬 Nucleus</span>
                <span style={badgeStyle(animalHasLysosome, "#ec4899")}>♻️ Lysosomes</span>
                <span style={badgeStyle(animalHasCentrioles, "#f59e0b")}>🧭 Centrioles</span>
                <span style={badgeStyle(animalHasCytoplasm, "#854d0e")}>⚙️ Cytoplasm</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Latest Gained Component Announcement */}
      {latestGained && (
        <div
          style={{
            marginTop: "8px",
            padding: "6px 10px",
            borderRadius: "8px",
            background: isPlant ? "rgba(37, 99, 235, 0.1)" : "rgba(220, 38, 38, 0.1)",
            border: `1px solid ${teamColor}`,
            fontSize: "0.75rem",
            fontWeight: 800,
            color: teamColor,
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span>⭐ Just Gained:</span>
          <span>{latestGained}</span>
        </div>
      )}
    </div>
  );
}

function badgeStyle(isUnlocked, color) {
  return {
    fontSize: "0.68rem",
    padding: "2px 6px",
    borderRadius: "4px",
    fontWeight: 700,
    background: isUnlocked ? `${color}20` : "var(--bg-surface)",
    color: isUnlocked ? color : "var(--text-muted)",
    border: `1px solid ${isUnlocked ? color : "var(--border-subtle)"}`,
    opacity: isUnlocked ? 1 : 0.45,
    transition: "all 0.3s ease",
  };
}
