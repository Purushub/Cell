"use client";

import React from "react";
import { useGame } from "@/context/GameContext";
import { Zap, RotateCcw, Check, X, Clock, Volume2 } from "lucide-react";

export default function BuzzerBar({ showControls = true, points = 100 }) {
  const {
    teams,
    buzzedTeam,
    triggerBuzzer,
    resetBuzzer,
    timerSeconds,
    isTimerRunning,
    awardPoints,
    playSound,
  } = useGame();

  const activeTeam = buzzedTeam ? teams[buzzedTeam] : null;

  return (
    <div
      className="card"
      style={{
        margin: "18px 0",
        padding: "20px",
        background: "var(--bg-card)",
        border: buzzedTeam
          ? `2px solid ${activeTeam?.color || "var(--accent-primary)"}`
          : "1.5px solid var(--border-card)",
        boxShadow: buzzedTeam
          ? `0 0 25px ${activeTeam?.color}40`
          : "var(--card-shadow)",
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {/* Team 1 Buzzer Button */}
        <div style={{ textAlign: "center", flex: "1 1 200px" }}>
          <button
            onClick={() => triggerBuzzer("team1")}
            disabled={buzzedTeam !== null}
            className={`buzzer-pad buzzer-team1 ${
              buzzedTeam && buzzedTeam !== "team1" ? "locked" : ""
            } ${buzzedTeam === "team1" ? "animate-pulse-glow" : ""}`}
            style={{
              margin: "0 auto 10px",
              borderColor: buzzedTeam === "team1" ? "#ffffff" : "rgba(255,255,255,0.4)",
            }}
          >
            <Zap size={32} />
            <span style={{ fontSize: "0.9rem", marginTop: "4px" }}>BUZZ!</span>
          </button>
          <div style={{ fontWeight: 800, color: "var(--team1-color)", fontSize: "1rem" }}>
            {teams.team1.name}
          </div>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "2px" }}>
            Press Key <kbd style={{ padding: "2px 6px", background: "var(--bg-surface)", border: "1px solid var(--border-card)", borderRadius: "4px", fontWeight: 700 }}>A</kbd> or Tap
          </div>
          <div style={{ fontWeight: 800, fontSize: "1.2rem", marginTop: "4px" }}>
            {teams.team1.score} <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>pts</span>
          </div>
        </div>

        {/* Center: Buzzer Lockout Status & Timer */}
        <div
          style={{
            flex: "2 1 320px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
          }}
        >
          {buzzedTeam ? (
            <div style={{ width: "100%" }}>
              <div
                className="badge"
                style={{
                  background: `${activeTeam?.color}25`,
                  color: activeTeam?.color,
                  border: `1px solid ${activeTeam?.color}`,
                  fontSize: "0.95rem",
                  padding: "6px 16px",
                  marginBottom: "8px",
                }}
              >
                ⚡ {activeTeam?.name} BUZZED FIRST!
              </div>

              {/* Countdown Timer */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  fontSize: "1.8rem",
                  fontWeight: 900,
                  color: timerSeconds <= 3 ? "var(--accent-danger)" : "var(--text-primary)",
                  fontFamily: "var(--font-mono)",
                  margin: "8px 0",
                }}
              >
                <Clock size={24} />
                <span>00:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}</span>
              </div>

              {/* Action Controls for moderator */}
              {showControls && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    marginTop: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    onClick={() => {
                      awardPoints(buzzedTeam, points);
                      resetBuzzer();
                    }}
                    className="btn"
                    style={{
                      background: "var(--accent-success)",
                      color: "#ffffff",
                      padding: "8px 16px",
                      fontSize: "0.88rem",
                    }}
                  >
                    <Check size={16} /> Correct (+{points} pts)
                  </button>

                  <button
                    onClick={() => {
                      awardPoints(buzzedTeam, -Math.floor(points / 2));
                      // Give chance to steal or reset
                      const otherTeam = buzzedTeam === "team1" ? "team2" : "team1";
                      playSound("wrong");
                      triggerBuzzer(otherTeam);
                    }}
                    className="btn"
                    style={{
                      background: "var(--accent-danger)",
                      color: "#ffffff",
                      padding: "8px 16px",
                      fontSize: "0.88rem",
                    }}
                  >
                    <X size={16} /> Incorrect (Steal!)
                  </button>

                  <button
                    onClick={resetBuzzer}
                    className="btn btn-outline"
                    style={{
                      padding: "8px 14px",
                      fontSize: "0.88rem",
                    }}
                    title="Press Space to reset"
                  >
                    <RotateCcw size={16} /> Reset
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "4px" }}>
                Ready to Buzz!
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", maxWidth: "300px" }}>
                First team to press their buzzer gains control to answer and earn points.
              </p>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  marginTop: "8px",
                }}
              >
                <Volume2 size={14} /> Sound enabled • Space to reset
              </div>
            </div>
          )}
        </div>

        {/* Team 2 Buzzer Button */}
        <div style={{ textAlign: "center", flex: "1 1 200px" }}>
          <button
            onClick={() => triggerBuzzer("team2")}
            disabled={buzzedTeam !== null}
            className={`buzzer-pad buzzer-team2 ${
              buzzedTeam && buzzedTeam !== "team2" ? "locked" : ""
            } ${buzzedTeam === "team2" ? "animate-pulse-glow" : ""}`}
            style={{
              margin: "0 auto 10px",
              borderColor: buzzedTeam === "team2" ? "#ffffff" : "rgba(255,255,255,0.4)",
            }}
          >
            <Zap size={32} />
            <span style={{ fontSize: "0.9rem", marginTop: "4px" }}>BUZZ!</span>
          </button>
          <div style={{ fontWeight: 800, color: "var(--team2-color)", fontSize: "1rem" }}>
            {teams.team2.name}
          </div>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "2px" }}>
            Press Key <kbd style={{ padding: "2px 6px", background: "var(--bg-surface)", border: "1px solid var(--border-card)", borderRadius: "4px", fontWeight: 700 }}>L</kbd> or Tap
          </div>
          <div style={{ fontWeight: 800, fontSize: "1.2rem", marginTop: "4px" }}>
            {teams.team2.score} <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>pts</span>
          </div>
        </div>
      </div>
    </div>
  );
}
