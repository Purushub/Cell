"use client";

import React, { useState } from "react";
import { useGame } from "@/context/GameContext";
import { FUNCTION_PAIRS } from "@/data/scenarios";
import { Sparkles, Check, RotateCcw, Award } from "lucide-react";

export default function FunctionMatchPage() {
  const { fireConfetti, playSound, awardPoints, buzzedTeam } = useGame();

  const [selectedFunc, setSelectedFunc] = useState(null);
  const [matchedIds, setMatchedIds] = useState([]); // array of matched function pair ids
  const [feedback, setFeedback] = useState(null);

  // Shuffle organelles for matching
  const organellePool = FUNCTION_PAIRS.map((p) => ({
    pairId: p.id,
    organelleId: p.organelleId,
    organelleName: p.organelleName,
    symbol: p.symbol,
  })).sort((a, b) => a.organelleName.localeCompare(b.organelleName));

  const handleSelectFunction = (item) => {
    if (matchedIds.includes(item.id)) return;
    setSelectedFunc(item);
    playSound("click");
    setFeedback(null);
  };

  const handleSelectOrganelle = (item) => {
    if (matchedIds.includes(item.pairId)) return;

    if (!selectedFunc) {
      setFeedback({ type: "info", text: "Select a cellular process first, then select its matching organelle!" });
      return;
    }

    if (selectedFunc.id === item.pairId) {
      // Correct Match!
      const newMatches = [...matchedIds, item.pairId];
      setMatchedIds(newMatches);
      setSelectedFunc(null);
      playSound("correct");
      fireConfetti({ particleCount: 60, spread: 50 });
      setFeedback({ type: "success", text: `Matched: ${item.organelleName} correctly linked!` });

      if (buzzedTeam) {
        awardPoints(buzzedTeam, 100);
      }

      if (newMatches.length === FUNCTION_PAIRS.length) {
        setTimeout(() => {
          fireConfetti({ particleCount: 200, spread: 120 });
          playSound("correct");
        }, 300);
      }
    } else {
      // Wrong Match
      playSound("wrong");
      setFeedback({ type: "error", text: "Incorrect match. Review the organelle function and try again!" });
      if (buzzedTeam) {
        awardPoints(buzzedTeam, -25);
      }
    }
  };

  const handleReset = () => {
    setSelectedFunc(null);
    setMatchedIds([]);
    setFeedback(null);
  };

  const allComplete = matchedIds.length === FUNCTION_PAIRS.length;

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
            <Sparkles size={13} /> Cellular Physiology Connect
          </span>
          <h1 style={{ fontSize: "2rem", fontWeight: 800 }}>Bio-Function Matcher</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Pair cellular metabolic processes with the responsible organelle.
          </p>
        </div>

        <button onClick={handleReset} className="btn btn-outline">
          <RotateCcw size={16} /> Reset Matches
        </button>
      </div>

      {/* Progress & Feedback banner */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "var(--bg-card)",
          padding: "14px 20px",
          borderRadius: "var(--radius-md)",
          border: "1.5px solid var(--border-card)",
          marginBottom: "24px",
        }}
      >
        <div style={{ fontWeight: 800 }}>
          Matched: {matchedIds.length} / {FUNCTION_PAIRS.length}
          {allComplete && (
            <span style={{ color: "var(--accent-success)", marginLeft: "12px" }}>
              🏆 All Functions Successfully Linked!
            </span>
          )}
        </div>

        {feedback && (
          <div
            style={{
              fontSize: "0.88rem",
              fontWeight: 700,
              color:
                feedback.type === "success"
                  ? "var(--accent-success)"
                  : feedback.type === "error"
                  ? "var(--accent-danger)"
                  : "var(--text-secondary)",
            }}
          >
            {feedback.text}
          </div>
        )}
      </div>

      {/* Two Column Matching Board */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "24px",
        }}
      >
        {/* Left: Functions */}
        <div className="card" style={{ padding: "20px" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "14px" }}>
            Step 1: Cellular Process
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {FUNCTION_PAIRS.map((f) => {
              const isMatched = matchedIds.includes(f.id);
              const isSelected = selectedFunc?.id === f.id;

              return (
                <div
                  key={f.id}
                  onClick={() => handleSelectFunction(f)}
                  style={{
                    padding: "14px 16px",
                    borderRadius: "var(--radius-md)",
                    border: isSelected
                      ? "2px solid var(--accent-primary)"
                      : isMatched
                      ? "1.5px solid var(--accent-success)"
                      : "1.5px solid var(--border-card)",
                    background: isSelected
                      ? "var(--accent-glow)"
                      : isMatched
                      ? "rgba(16, 185, 129, 0.1)"
                      : "var(--bg-surface)",
                    opacity: isMatched ? 0.6 : 1,
                    cursor: isMatched ? "default" : "pointer",
                    transition: "all 0.15s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}
                >
                  <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>{f.functionName}</span>
                  {isMatched && <Check size={18} color="var(--accent-success)" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Organelles */}
        <div className="card" style={{ padding: "20px" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "14px" }}>
            Step 2: Responsible Organelle
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {organellePool.map((o) => {
              const isMatched = matchedIds.includes(o.pairId);

              return (
                <div
                  key={o.pairId}
                  onClick={() => handleSelectOrganelle(o)}
                  style={{
                    padding: "14px 16px",
                    borderRadius: "var(--radius-md)",
                    border: isMatched
                      ? "1.5px solid var(--accent-success)"
                      : "1.5px solid var(--border-card)",
                    background: isMatched
                      ? "rgba(16, 185, 129, 0.1)"
                      : "var(--bg-surface)",
                    opacity: isMatched ? 0.6 : 1,
                    cursor: isMatched ? "default" : "pointer",
                    transition: "all 0.15s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <span style={{ fontSize: "1.6rem" }}>{o.symbol}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: "0.95rem" }}>{o.organelleName}</div>
                  </div>
                  {isMatched && <Check size={18} color="var(--accent-success)" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
