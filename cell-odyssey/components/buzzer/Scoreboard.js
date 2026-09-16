"use client";

import React, { useState } from "react";
import { useGame } from "@/context/GameContext";
import { Trophy, Flame, RotateCcw, Edit2, Check } from "lucide-react";

export default function Scoreboard() {
  const { teams, setTeams, resetScores } = useGame();
  const [editingTeam, setEditingTeam] = useState(null);
  const [tempName, setTempName] = useState("");

  const startEdit = (teamKey) => {
    setEditingTeam(teamKey);
    setTempName(teams[teamKey].name);
  };

  const saveEdit = (teamKey) => {
    if (tempName.trim()) {
      setTeams((prev) => ({
        ...prev,
        [teamKey]: { ...prev[teamKey], name: tempName.trim() },
      }));
    }
    setEditingTeam(null);
  };

  const leader =
    teams.team1.score > teams.team2.score
      ? "team1"
      : teams.team2.score > teams.team1.score
      ? "team2"
      : null;

  return (
    <div
      className="card"
      style={{
        margin: "20px 0",
        background: "var(--bg-card)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
          borderBottom: "1px solid var(--border-subtle)",
          paddingBottom: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Trophy size={22} color="var(--accent-warning)" />
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800 }}>Classroom Battle Standings</h3>
        </div>

        <button
          onClick={resetScores}
          className="btn btn-outline"
          style={{ padding: "6px 12px", fontSize: "0.8rem" }}
        >
          <RotateCcw size={14} /> Reset Scores
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {/* Team 1 Card */}
        <div
          style={{
            background: "var(--team1-bg)",
            border: `2px solid ${leader === "team1" ? "var(--team1-color)" : "var(--team1-border)"}`,
            borderRadius: "var(--radius-md)",
            padding: "20px",
            position: "relative",
            boxShadow: leader === "team1" ? "0 4px 20px rgba(37, 99, 235, 0.2)" : "none",
          }}
        >
          {leader === "team1" && (
            <div
              style={{
                position: "absolute",
                top: "-12px",
                right: "16px",
                background: "var(--team1-color)",
                color: "#ffffff",
                padding: "2px 10px",
                borderRadius: "9999px",
                fontSize: "0.75rem",
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <Flame size={12} /> IN THE LEAD
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {editingTeam === "team1" ? (
              <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  style={{
                    padding: "4px 8px",
                    borderRadius: "6px",
                    border: "1px solid var(--border-card)",
                    background: "var(--bg-surface)",
                    color: "var(--text-primary)",
                    fontWeight: 700,
                  }}
                  autoFocus
                />
                <button
                  onClick={() => saveEdit("team1")}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--accent-success)" }}
                >
                  <Check size={18} />
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--team1-color)" }}>
                  {teams.team1.name}
                </span>
                <button
                  onClick={() => startEdit("team1")}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}
                  title="Rename team"
                >
                  <Edit2 size={14} />
                </button>
              </div>
            )}
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>
              Buzzer Key: [A]
            </span>
          </div>

          <div style={{ fontSize: "2.8rem", fontWeight: 900, color: "var(--team1-color)", margin: "8px 0" }}>
            {teams.team1.score}
            <span style={{ fontSize: "1rem", color: "var(--text-muted)", fontWeight: 600, marginLeft: "6px" }}>
              points
            </span>
          </div>
        </div>

        {/* Team 2 Card */}
        <div
          style={{
            background: "var(--team2-bg)",
            border: `2px solid ${leader === "team2" ? "var(--team2-color)" : "var(--team2-border)"}`,
            borderRadius: "var(--radius-md)",
            padding: "20px",
            position: "relative",
            boxShadow: leader === "team2" ? "0 4px 20px rgba(234, 88, 12, 0.2)" : "none",
          }}
        >
          {leader === "team2" && (
            <div
              style={{
                position: "absolute",
                top: "-12px",
                right: "16px",
                background: "var(--team2-color)",
                color: "#ffffff",
                padding: "2px 10px",
                borderRadius: "9999px",
                fontSize: "0.75rem",
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <Flame size={12} /> IN THE LEAD
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {editingTeam === "team2" ? (
              <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  style={{
                    padding: "4px 8px",
                    borderRadius: "6px",
                    border: "1px solid var(--border-card)",
                    background: "var(--bg-surface)",
                    color: "var(--text-primary)",
                    fontWeight: 700,
                  }}
                  autoFocus
                />
                <button
                  onClick={() => saveEdit("team2")}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--accent-success)" }}
                >
                  <Check size={18} />
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--team2-color)" }}>
                  {teams.team2.name}
                </span>
                <button
                  onClick={() => startEdit("team2")}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}
                  title="Rename team"
                >
                  <Edit2 size={14} />
                </button>
              </div>
            )}
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>
              Buzzer Key: [L]
            </span>
          </div>

          <div style={{ fontSize: "2.8rem", fontWeight: 900, color: "var(--team2-color)", margin: "8px 0" }}>
            {teams.team2.score}
            <span style={{ fontSize: "1rem", color: "var(--text-muted)", fontWeight: 600, marginLeft: "6px" }}>
              points
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
