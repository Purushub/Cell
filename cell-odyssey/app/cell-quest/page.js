"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function CellQuestPage() {
  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column", background: "#071210" }}>
      {/* Slim header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          padding: "10px 20px",
          background: "rgba(7, 18, 16, 0.96)",
          borderBottom: "1px solid rgba(46, 191, 165, 0.3)",
          backdropFilter: "blur(10px)",
          zIndex: 10,
        }}
      >
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            color: "#9bbab2",
            fontSize: "0.85rem",
            fontWeight: 600,
            textDecoration: "none",
            padding: "6px 12px",
            borderRadius: "8px",
            background: "rgba(46, 191, 165, 0.12)",
            border: "1px solid rgba(46, 191, 165, 0.3)",
          }}
        >
          <ArrowLeft size={16} />
          Back to Hub
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Sparkles size={18} color="#2ebfa5" />
          <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "#f2faf7", letterSpacing: "-0.01em" }}>
            BioQuest: The Cell Odyssey
          </span>
        </div>
        <span
          style={{
            marginLeft: "auto",
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "#2ebfa5",
            background: "rgba(46, 191, 165, 0.15)",
            border: "1px solid #2ebfa5",
            borderRadius: "4px",
            padding: "3px 10px",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Story Quest
        </span>
      </div>

      {/* Full-screen iframe */}
      <iframe
        src="/Cell_Odyssey_IB.html"
        title="BioQuest: The Cell Odyssey"
        style={{
          flex: 1,
          width: "100%",
          border: "none",
          background: "#071210",
        }}
        allow="autoplay; fullscreen"
      />
    </div>
  );
}
