"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ORGANELLES } from "@/data/organelles";
import { BookOpen, Volume2, Play, CheckCircle, Info, Sparkles, RotateCw } from "lucide-react";

const CellExplorer3D = dynamic(() => import("@/components/cell/CellExplorer3D"), { ssr: false });

export default function TeachingAidPage() {
  const [selectedOrganelle, setSelectedOrganelle] = useState(ORGANELLES[0]);
  const [filterType, setFilterType] = useState("all"); // 'all' | 'plant' | 'animal'
  const [cellViewType, setCellViewType] = useState("plant"); // for 3D explorer

  const handleOrganelleSelect3D = useCallback((organelleId) => {
    const found = ORGANELLES.find((o) => o.id === organelleId);
    if (found) setSelectedOrganelle(found);
  }, []);

  const filteredOrganelles = ORGANELLES.filter((org) => {
    if (filterType === "plant") return org.foundIn.includes("plant");
    if (filterType === "animal") return org.foundIn.includes("animal");
    return true;
  });

  const playVoiceClip = (audioPath) => {
    try {
      const audio = new Audio(audioPath);
      audio.play();
    } catch (e) {
      console.warn("Audio play error", e);
    }
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
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <div>
          <span className="badge badge-playful" style={{ marginBottom: "6px" }}>
            <BookOpen size={13} /> Classroom Teaching Companion
          </span>
          <h1 style={{ fontSize: "2rem", fontWeight: 800 }}>Educator Teaching Aid</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Full-fidelity organelle encyclopedia, cellular micrographs, and IB Biology curriculum guides.
          </p>
        </div>

        {/* Narrative Characters Voice Quick-play */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button
            onClick={() => playVoiceClip("/assets/audio/elena_welcome.mp3")}
            className="btn btn-outline"
            style={{ fontSize: "0.82rem", padding: "8px 14px" }}
          >
            <Volume2 size={16} color="var(--accent-primary)" />
            Dr. Elena Briefing
          </button>
          <button
            onClick={() => playVoiceClip("/assets/audio/zoe_intro.mp3")}
            className="btn btn-outline"
            style={{ fontSize: "0.82rem", padding: "8px 14px" }}
          >
            <Volume2 size={16} color="var(--accent-secondary)" />
            Zoe Overview
          </button>
        </div>
      </div>

      {/* Narrative Dialogue Card */}
      <div
        className="card"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
          padding: "20px 24px",
          marginBottom: "24px",
          background: "var(--bg-card)",
          borderLeft: "6px solid var(--accent-primary)",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            overflow: "hidden",
            flexShrink: 0,
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
        <div>
          <div style={{ fontWeight: 800, fontSize: "1rem", marginBottom: "2px" }}>
            Dr. Elena • Senior Bio-Explorer
          </div>
          <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
            &quot;In this mode, all anatomical structures and organelle labels are fully visible for
            instruction. Use the selector below to isolate plant-specific or animal-specific organelles,
            review size scales in micrometers, and discuss the endosymbiotic origins of double-membraned structures.&quot;
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => setFilterType("all")}
          className={`btn ${filterType === "all" ? "btn-primary" : "btn-outline"}`}
          style={{ padding: "8px 16px", fontSize: "0.85rem" }}
        >
          All Organelles ({ORGANELLES.length})
        </button>
        <button
          onClick={() => setFilterType("plant")}
          className={`btn ${filterType === "plant" ? "btn-primary" : "btn-outline"}`}
          style={{ padding: "8px 16px", fontSize: "0.85rem" }}
        >
          🍃 Plant Cell Organelles
        </button>
        <button
          onClick={() => setFilterType("animal")}
          className={`btn ${filterType === "animal" ? "btn-primary" : "btn-outline"}`}
          style={{ padding: "8px 16px", fontSize: "0.85rem" }}
        >
          🐾 Animal Cell Organelles
        </button>
      </div>

      {/* 3D Interactive Cell Explorer */}
      <div
        className="card"
        style={{
          marginBottom: "24px",
          padding: "0",
          overflow: "hidden",
          border: "2px solid var(--border-card)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 20px",
            background: "var(--bg-surface)",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <RotateCw size={18} color="var(--accent-primary)" />
            <span style={{ fontWeight: 800, fontSize: "1rem" }}>3D Cell Explorer</span>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Drag to rotate • Click organelles • Scroll to zoom</span>
          </div>
          <div style={{ display: "flex", gap: "6px" }}>
            <button
              onClick={() => setCellViewType("plant")}
              className={`btn ${cellViewType === "plant" ? "btn-primary" : "btn-outline"}`}
              style={{ padding: "6px 14px", fontSize: "0.8rem" }}
            >
              🌱 Plant Cell
            </button>
            <button
              onClick={() => setCellViewType("animal")}
              className={`btn ${cellViewType === "animal" ? "btn-primary" : "btn-outline"}`}
              style={{ padding: "6px 14px", fontSize: "0.8rem" }}
            >
              🐾 Animal Cell
            </button>
          </div>
        </div>
        <div style={{ height: "420px" }}>
          <CellExplorer3D
            cellType={cellViewType}
            onSelectOrganelle={handleOrganelleSelect3D}
            selectedOrganelleId={selectedOrganelle.id}
          />
        </div>
      </div>

      {/* Main Encyclopedia Grid: Left List, Right Inspector Detail */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "24px",
        }}
      >
        {/* Left List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {filteredOrganelles.map((org) => {
            const isSelected = selectedOrganelle.id === org.id;

            return (
              <div
                key={org.id}
                onClick={() => setSelectedOrganelle(org)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "14px 18px",
                  borderRadius: "var(--radius-md)",
                  border: isSelected
                    ? "2px solid var(--accent-primary)"
                    : "1.5px solid var(--border-card)",
                  background: isSelected ? "var(--accent-glow)" : "var(--bg-card)",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  boxShadow: isSelected ? "var(--card-shadow-hover)" : "none",
                }}
              >
                <span style={{ fontSize: "1.8rem" }}>{org.symbol}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: "1rem" }}>{org.name}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{org.role}</div>
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    padding: "2px 8px",
                    borderRadius: "4px",
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  {org.size}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Detail Card */}
        <div className="card" style={{ padding: "28px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "16px",
                  background: "var(--accent-glow)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2rem",
                  border: "2px solid var(--border-card)",
                }}
              >
                {selectedOrganelle.symbol}
              </div>
              <div>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 800 }}>{selectedOrganelle.name}</h2>
                <div style={{ fontSize: "0.85rem", color: "var(--accent-primary)", fontWeight: 700 }}>
                  {selectedOrganelle.role}
                </div>
              </div>
            </div>

            <span
              style={{
                fontSize: "0.8rem",
                fontWeight: 700,
                padding: "4px 10px",
                borderRadius: "9999px",
                background: "rgba(16, 185, 129, 0.12)",
                color: "var(--accent-success)",
                border: "1px solid var(--accent-success)",
              }}
            >
              IB Bio Standard
            </span>
          </div>

          <div
            style={{
              padding: "16px",
              borderRadius: "var(--radius-md)",
              background: "var(--bg-surface)",
              border: "1px solid var(--border-subtle)",
              lineHeight: 1.6,
              fontSize: "0.95rem",
              marginBottom: "20px",
            }}
          >
            {selectedOrganelle.description}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "14px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                padding: "12px",
                borderRadius: "var(--radius-sm)",
                background: "var(--bg-surface)",
                border: "1px solid var(--border-card)",
              }}
            >
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 700 }}>
                AVERAGE SIZE / SCALE
              </div>
              <div style={{ fontSize: "1.1rem", fontWeight: 800, marginTop: "2px" }}>
                {selectedOrganelle.size}
              </div>
            </div>

            <div
              style={{
                padding: "12px",
                borderRadius: "var(--radius-sm)",
                background: "var(--bg-surface)",
                border: "1px solid var(--border-card)",
              }}
            >
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 700 }}>
                CELLULAR OCCURRENCE
              </div>
              <div style={{ fontSize: "0.95rem", fontWeight: 800, marginTop: "2px", textTransform: "capitalize" }}>
                {selectedOrganelle.foundIn.join(" & ")} Cells
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "14px 16px",
              borderRadius: "var(--radius-md)",
              background: "var(--accent-glow)",
              border: "1px solid var(--accent-primary)",
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
            }}
          >
            <Info size={20} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: "2px" }} />
            <div>
              <strong style={{ fontSize: "0.88rem" }}>Pedagogical Tip:</strong>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "2px" }}>
                When quizzing students, emphasize the relationship between ultrastructure and function
                (e.g., folded cristae maximizing surface area for oxidative phosphorylation).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
