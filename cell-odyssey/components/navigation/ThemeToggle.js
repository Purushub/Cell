"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon, Sparkles, Zap } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return <div style={{ width: 130, height: 38 }} />;
  }

  const isPlayful = theme === "playful";

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-btn"
      title={`Switch to ${isPlayful ? "Cyberpunk Dark Sci-Fi" : "Bright Playful"} Theme`}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "4px 8px",
        width: "148px",
        height: "40px",
        borderRadius: "9999px",
        border: isPlayful ? "2px solid #cbd5e1" : "2px solid #00f0ff",
        background: isPlayful ? "#ffffff" : "rgba(15, 23, 42, 0.9)",
        boxShadow: isPlayful
          ? "0 4px 12px rgba(100, 116, 139, 0.15)"
          : "0 0 16px rgba(0, 240, 255, 0.4)",
        cursor: "pointer",
        position: "relative",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          fontSize: "0.78rem",
          fontWeight: 700,
          color: isPlayful ? "#8b5cf6" : "#00f0ff",
          marginLeft: "4px",
          transition: "color 0.2s ease",
        }}
      >
        {isPlayful ? (
          <>
            <Sparkles size={14} color="#8b5cf6" />
            <span>Playful</span>
          </>
        ) : (
          <>
            <Zap size={14} color="#00f0ff" />
            <span>Cyberpunk</span>
          </>
        )}
      </span>

      <div
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: isPlayful
            ? "linear-gradient(135deg, #f59e0b, #ec4899)"
            : "linear-gradient(135deg, #00f0ff, #d946ef)",
          color: "#ffffff",
          boxShadow: isPlayful
            ? "0 2px 6px rgba(245, 158, 11, 0.4)"
            : "0 0 10px #00f0ff",
          transition: "transform 0.3s ease, background 0.3s ease",
        }}
      >
        {isPlayful ? <Sun size={16} /> : <Moon size={16} />}
      </div>
    </button>
  );
}
