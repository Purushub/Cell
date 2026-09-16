"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { useGame } from "@/context/GameContext";
import { Sparkles, Trophy, BookOpen, Dna, Swords, HelpCircle, Layers, Flag } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { teams } = useGame();

  const navItems = [
    { href: "/", label: "Hub", icon: Dna },
    { href: "/grand-prix", label: "🏁 Grand Prix Arena", icon: Flag },
    { href: "/battle", label: "Buzzer Battle", icon: Swords },
    { href: "/activities/cell-builder", label: "Cell Builder", icon: Layers },
    { href: "/activities/speed-blitz", label: "Speed Blitz", icon: Trophy },
    { href: "/activities/classifier", label: "Classifier", icon: HelpCircle },
    { href: "/activities/function-match", label: "Functions", icon: Sparkles },
    { href: "/teaching", label: "Teaching Aid", icon: BookOpen },
  ];

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "var(--bg-card)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1.5px solid var(--border-subtle)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: "1350px",
          margin: "0 auto",
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        {/* Brand */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            color: "var(--text-primary)",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              boxShadow: "0 4px 12px var(--accent-glow)",
            }}
          >
            <Dna size={24} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: "1.15rem", letterSpacing: "-0.02em" }}>
              CELL ODYSSEY
            </div>
            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 600 }}>
              IB Biology Interactive Arena
            </div>
          </div>
        </Link>

        {/* Navigation links */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            background: "var(--bg-surface)",
            padding: "4px",
            borderRadius: "var(--radius-full)",
            border: "1px solid var(--border-subtle)",
            overflowX: "auto",
            maxWidth: "100%",
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 14px",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.85rem",
                  fontWeight: isActive ? 700 : 600,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  color: isActive ? "#ffffff" : "var(--text-secondary)",
                  background: isActive
                    ? "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))"
                    : "transparent",
                  transition: "all 0.2s ease",
                }}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Team Score Ticker & Theme Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Live Mini Scoreboard */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "var(--bg-surface)",
              padding: "4px 12px",
              borderRadius: "var(--radius-full)",
              border: "1px solid var(--border-subtle)",
              fontSize: "0.8rem",
              fontWeight: 700,
            }}
          >
            <span style={{ color: "var(--team1-color)" }}>
              T1: {teams.team1.score}
            </span>
            <span style={{ color: "var(--text-muted)" }}>|</span>
            <span style={{ color: "var(--team2-color)" }}>
              T2: {teams.team2.score}
            </span>
          </div>

          {/* Theme Toggle Button */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
