"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGame } from "@/context/GameContext";
import { useTheme } from "@/context/ThemeContext";
import StageTimelineStepper from "@/components/ui/StageTimelineStepper";
import Organelle3DIcon from "@/components/cell/Organelle3DIcon";
import BiogenesisCrucible3D from "@/components/ecosystem/BiogenesisCrucible3D";
import VictoryModal from "@/components/celebration/VictoryModal";
import { QUIZ_QUESTIONS } from "@/data/quizQuestions";
import {
  Shield,
  PawPrint,
  Clock,
  Home,
  Check,
  Zap,
  Lock,
  ArrowRight,
  Info,
  CheckCircle2,
  Circle,
  Star,
  Sparkles,
  FlaskConical,
} from "lucide-react";

const PLANT_PROGRESS_LIST = [
  { key: "cell-wall", name: "Cell Wall" },
  { key: "mitochondria", name: "Mitochondria" },
  { key: "nucleus", name: "Nucleus" },
  { key: "chloroplast", name: "Chloroplasts" },
  { key: "vacuole", name: "Large Vacuole" },
  { key: "cytoplasm", name: "Cytoplasm" },
];

const ANIMAL_PROGRESS_LIST = [
  { key: "membrane", name: "Membrane" },
  { key: "mitochondria", name: "Mitochondria" },
  { key: "nucleus", name: "Nucleus" },
  { key: "lysosome", name: "Lysosomes" },
  { key: "centrioles", name: "Centrioles" },
  { key: "cytoplasm", name: "Cytoplasm" },
];

export default function CellBuilderPage() {
  const { teams, awardPoints, resetScores, fireConfetti, playSound } = useGame();

  // Reset scores whenever starting a new cell-builder game
  useEffect(() => {
    resetScores();
  }, [resetScores]);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [blueSelected, setBlueSelected] = useState(null);
  const [redSelected, setRedSelected] = useState(null);
  const [blueAttempted, setBlueAttempted] = useState(false);
  const [redAttempted, setRedAttempted] = useState(false);
  const [answerRevealed, setAnswerRevealed] = useState(false);

  // Rewards tracking
  const [blueGained, setBlueGained] = useState([]);
  const [redGained, setRedGained] = useState([]);
  const [lastBlueGained, setLastBlueGained] = useState(null);
  const [lastRedGained, setLastRedGained] = useState(null);

  // 3D Biogenesis laser synthesis trigger ('blue' | 'red' | null)
  const [winnerTeam, setWinnerTeam] = useState(null);

  // Timer & Broadcast
  const [timerSeconds, setTimerSeconds] = useState(25);
  const [autoAdvance, setAutoAdvance] = useState(null);
  const [broadcastMessage, setBroadcastMessage] = useState(
    "🧪 Biogenesis Crucible: Select answer under your team to synthesize organelles!"
  );
  const [isChampionshipOver, setIsChampionshipOver] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIdx % QUIZ_QUESTIONS.length];

  // Round countdown timer
  useEffect(() => {
    if (answerRevealed || isChampionshipOver) return;

    if (timerSeconds <= 0) {
      setAnswerRevealed(true);
      playSound("wrong");
      setBroadcastMessage(`⏰ Time expired! Correct answer: ${currentQ.correctAnswer}`);
      start5sCountdown();
      return;
    }

    const clock = setInterval(() => {
      setTimerSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(clock);
  }, [timerSeconds, answerRevealed, isChampionshipOver, currentQ]);

  // Keyboard shortcut listener (Key A for Blue Lock, Key L for Red Lock)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (answerRevealed || isChampionshipOver) return;
      if (e.key === "a" || e.key === "A") {
        if (blueSelected && !blueAttempted) handleBlueLock();
      } else if (e.key === "l" || e.key === "L") {
        if (redSelected && !redAttempted) handleRedLock();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const start5sCountdown = () => {
    setAutoAdvance(5);
    const interval = setInterval(() => {
      setAutoAdvance((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          advanceToNextStage();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const advanceToNextStage = () => {
    setBlueSelected(null);
    setRedSelected(null);
    setBlueAttempted(false);
    setRedAttempted(false);
    setAnswerRevealed(false);
    setWinnerTeam(null);
    setAutoAdvance(null);
    setTimerSeconds(25);

    if (currentIdx + 1 >= 6 || blueGained.length >= 6 || redGained.length >= 6) {
      setIsChampionshipOver(true);
      return;
    }

    setCurrentIdx((prev) => prev + 1);
    setBroadcastMessage("🧪 New biogenesis round! Select answer under your team.");
  };

  const handleBlueLock = () => {
    if (!blueSelected || blueAttempted || answerRevealed) return;
    setBlueAttempted(true);

    const isCorrect = blueSelected === currentQ.correctAnswer;

    if (isCorrect) {
      playSound("correct");
      fireConfetti({ particleCount: 140, spread: 80, origin: { x: 0.2, y: 0.5 } });

      setWinnerTeam("blue"); // Fires 3D green biogenesis laser and organelle synthesis!
      const organelleEarned = PLANT_PROGRESS_LIST[Math.min(5, blueGained.length)].key;
      awardPoints("team1", currentQ.points);
      setBlueGained((prev) => [...prev, organelleEarned]);
      setLastBlueGained(currentQ.topic || "Plant Component");
      setBroadcastMessage(`🎉 Blue Plant Synth synthesized organelle! +${currentQ.points} PTS`);

      setAnswerRevealed(true);
      start5sCountdown();
    } else {
      playSound("wrong");
      awardPoints("team1", -25);
      if (!redAttempted) {
        setBroadcastMessage("❌ Blue Plant Synth missed! ⚡ Red Animal Synth can STEAL!");
      } else {
        setBroadcastMessage(`❌ Both missed! Correct answer: ${currentQ.correctAnswer}`);
        setAnswerRevealed(true);
        start5sCountdown();
      }
    }
  };

  const handleRedLock = () => {
    if (!redSelected || redAttempted || answerRevealed) return;
    setRedAttempted(true);

    const isCorrect = redSelected === currentQ.correctAnswer;

    if (isCorrect) {
      playSound("correct");
      fireConfetti({ particleCount: 140, spread: 80, origin: { x: 0.8, y: 0.5 } });

      setWinnerTeam("red"); // Fires 3D magenta biogenesis laser and organelle synthesis!
      const organelleEarned = ANIMAL_PROGRESS_LIST[Math.min(5, redGained.length)].key;
      awardPoints("team2", currentQ.points);
      setRedGained((prev) => [...prev, organelleEarned]);
      setLastRedGained(currentQ.topic || "Animal Component");
      setBroadcastMessage(`🎉 Red Animal Synth synthesized organelle! +${currentQ.points} PTS`);

      setAnswerRevealed(true);
      start5sCountdown();
    } else {
      playSound("wrong");
      awardPoints("team2", -25);
      if (!blueAttempted) {
        setBroadcastMessage("❌ Red Animal Synth missed! ⚡ Blue Plant Synth can STEAL!");
      } else {
        setBroadcastMessage(`❌ Both missed! Correct answer: ${currentQ.correctAnswer}`);
        setAnswerRevealed(true);
        start5sCountdown();
      }
    }
  };

  const handleRestart = () => {
    resetScores();
    setIsChampionshipOver(false);
    setCurrentIdx(0);
    setBlueSelected(null);
    setRedSelected(null);
    setBlueAttempted(false);
    setRedAttempted(false);
    setAnswerRevealed(false);
    setWinnerTeam(null);
    setAutoAdvance(null);
    setTimerSeconds(25);
    setBlueGained([]);
    setRedGained([]);
    setLastBlueGained(null);
    setLastRedGained(null);
    setBroadcastMessage("🧪 Biogenesis restarted! Select answer under your team.");
  };

  const determineWinner = () => {
    if (teams.team1.score > teams.team2.score) return "blue";
    if (teams.team2.score > teams.team1.score) return "red";
    return "tie";
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "#030712",
        color: "#ffffff",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* 1. TOP HEADER HUD BAR */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 24px",
          gap: "16px",
          flexWrap: "wrap",
          zIndex: 30,
          background: "linear-gradient(180deg, rgba(3, 7, 18, 0.95) 0%, rgba(3, 7, 18, 0.75) 100%)",
          backdropFilter: "blur(12px)",
          borderBottom: "1.5px solid rgba(56, 189, 248, 0.3)",
        }}
      >
        {/* Left: T1 Blue Team Shield Pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "rgba(12, 74, 110, 0.85)",
            border: "2px solid #00f0ff",
            boxShadow: "0 0 16px rgba(0, 240, 255, 0.45)",
            borderRadius: "9999px",
            padding: "6px 18px",
          }}
        >
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: "#22c55e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 8px #22c55e",
            }}
          >
            <Shield size={16} fill="#ffffff" color="#ffffff" />
          </div>
          <span style={{ fontSize: "1.1rem", fontWeight: 900, letterSpacing: "0.05em" }}>
            T1: {teams.team1.score}
          </span>
        </div>

        {/* Center: Stage Title & 6-Stage Stepper */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            flex: 1,
            minWidth: "320px",
          }}
        >
          <div
            style={{
              background: "rgba(15, 23, 42, 0.92)",
              border: "1.5px solid #00f0ff",
              borderRadius: "9999px",
              padding: "4px 22px",
              textAlign: "center",
              boxShadow: "0 0 15px rgba(0, 240, 255, 0.25)",
            }}
          >
            <div
              style={{
                fontSize: "0.7rem",
                fontWeight: 900,
                color: "#38bdf8",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              CELLULAR BIOGENESIS INCUBATOR CRUCIBLE
            </div>
            <div style={{ fontSize: "0.92rem", fontWeight: 900, color: "#ffffff" }}>
              SYNTHESIS STAGE {currentIdx + 1}: DUAL CELL BIOGENESIS
            </div>
          </div>

          <StageTimelineStepper currentStage={currentIdx + 1} />
        </div>

        {/* Right: T2 Red Team Paw Pill & Timer */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "rgba(159, 18, 57, 0.85)",
              border: "2px solid #ff2a6d",
              boxShadow: "0 0 16px rgba(255, 42, 109, 0.45)",
              borderRadius: "9999px",
              padding: "6px 18px",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "#f43f5e",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 8px #f43f5e",
              }}
            >
              <PawPrint size={16} fill="#ffffff" color="#ffffff" />
            </div>
            <span style={{ fontSize: "1.1rem", fontWeight: 900, letterSpacing: "0.05em" }}>
              T2: {teams.team2.score}
            </span>
          </div>

          {/* Timer Pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(10, 25, 47, 0.9)",
              border: "2px solid #38bdf8",
              borderRadius: "9999px",
              padding: "6px 16px",
              boxShadow: "0 0 12px rgba(56, 189, 248, 0.3)",
            }}
          >
            <Clock size={18} color="#facc15" />
            <span
              style={{
                fontSize: "1.05rem",
                fontWeight: 900,
                color: "#facc15",
                fontFamily: "monospace",
              }}
            >
              00:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}
            </span>
          </div>
        </div>
      </header>

      {/* Broadcast Toast Banner */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "6px 20px",
          background: "rgba(15, 23, 42, 0.85)",
          borderBottom: "1px solid rgba(56, 189, 248, 0.2)",
          zIndex: 25,
          gap: "12px",
        }}
      >
        <Sparkles size={16} color="#38bdf8" />
        <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#ffffff" }}>
          {broadcastMessage}
        </span>
        {autoAdvance !== null && (
          <span
            style={{
              background: "rgba(34, 197, 94, 0.25)",
              border: "1px solid #22c55e",
              borderRadius: "9999px",
              padding: "2px 10px",
              fontSize: "0.78rem",
              fontWeight: 900,
              color: "#86efac",
            }}
          >
            Next stage in {autoAdvance}s ⏱️
          </span>
        )}
      </div>

      {/* 2. MAIN 3-COLUMN ARENA (QUESTIONS UNDER EACH TEAM) */}
      <main
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "330px 1fr 330px",
          gap: "16px",
          padding: "16px 20px",
          boxSizing: "border-box",
          alignItems: "stretch",
        }}
      >
        {/* LEFT COLUMN: BLUE PLANT SYNTH & QUESTION UNDER BLUE TEAM */}
        <section style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div
            style={{
              background: "rgba(10, 25, 47, 0.92)",
              backdropFilter: "blur(14px)",
              border: "2.5px solid #00f0ff",
              boxShadow: "0 0 24px rgba(0, 240, 255, 0.35)",
              borderRadius: "20px",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "rgba(34, 197, 94, 0.2)",
                  border: "1.5px solid #22c55e",
                  borderRadius: "9999px",
                  padding: "4px 12px",
                  fontSize: "0.85rem",
                  fontWeight: 900,
                  color: "#86efac",
                }}
              >
                <Shield size={14} fill="#22c55e" color="#22c55e" />
                <span>BLUE PLANT SYNTH</span>
              </div>
              <span style={{ fontSize: "0.85rem", fontWeight: 900, color: "#38bdf8" }}>
                {teams.team1.score} PTS
              </span>
            </div>

            {/* Plant Cell Image */}
            <div style={{ position: "relative", width: "100%", aspectRatio: "1", borderRadius: "14px", overflow: "hidden", border: "1.5px solid rgba(56, 189, 248, 0.3)" }}>
              <Image src="/assets/plant_cell.jpg" alt="Plant Cell" fill style={{ objectFit: "cover" }} />
              <div style={{
                position: "absolute", bottom: "6px", left: "6px", right: "6px",
                background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)",
                borderRadius: "8px", padding: "4px 10px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#86efac" }}>🌱 Plant Cell</span>
                <span style={{ fontSize: "0.72rem", fontWeight: 900, color: "#facc15" }}>{blueGained.length}/6</span>
              </div>
            </div>
          </div>

          {/* BLUE PLANT SYNTH QUESTION & ANSWER CONSOLE */}
          <div
            style={{
              background: "rgba(10, 25, 47, 0.94)",
              backdropFilter: "blur(16px)",
              border: "2px solid #00f0ff",
              boxShadow: "0 0 20px rgba(0, 240, 255, 0.25)",
              borderRadius: "20px",
              padding: "14px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              flex: 1,
            }}
          >
            <div style={{ fontSize: "0.72rem", fontWeight: 900, color: "#38bdf8", textTransform: "uppercase" }}>
              BLUE SYNTH CHALLENGE:
            </div>

            <p style={{ fontSize: "0.88rem", fontWeight: 700, lineHeight: 1.4, margin: 0 }}>
              {currentQ.question}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {currentQ.options.map((option, idx) => {
                const letter = String.fromCharCode(65 + idx);
                const isSelected = blueSelected === option;
                const isCorrect = answerRevealed && option === currentQ.correctAnswer;

                let bg = "rgba(15, 23, 42, 0.85)";
                let border = "1.5px solid rgba(56, 189, 248, 0.35)";
                let glow = "none";

                if (isCorrect) {
                  bg = "linear-gradient(90deg, #15803d 0%, #22c55e 100%)";
                  border = "2px solid #86efac";
                  glow = "0 0 12px #22c55e";
                } else if (isSelected) {
                  bg = "rgba(14, 165, 233, 0.25)";
                  border = "2px solid #00f0ff";
                  glow = "0 0 12px rgba(0, 240, 255, 0.5)";
                }

                return (
                  <button
                    key={letter}
                    onClick={() => !blueAttempted && !answerRevealed && setBlueSelected(option)}
                    disabled={blueAttempted || answerRevealed}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "8px 12px",
                      borderRadius: "12px",
                      background: bg,
                      border: border,
                      boxShadow: glow,
                      color: "#ffffff",
                      fontSize: "0.85rem",
                      fontWeight: 800,
                      cursor: blueAttempted || answerRevealed ? "default" : "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        background: isSelected ? "#00f0ff" : "rgba(56, 189, 248, 0.3)",
                        color: isSelected ? "#0f172a" : "#ffffff",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.75rem",
                        fontWeight: 900,
                        marginRight: "8px",
                        flexShrink: 0,
                      }}
                    >
                      {letter}
                    </span>
                    <span style={{ flex: 1 }}>{option}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleBlueLock}
              disabled={!blueSelected || blueAttempted || answerRevealed}
              style={{
                marginTop: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "10px",
                borderRadius: "12px",
                background:
                  !blueSelected || blueAttempted || answerRevealed
                    ? "rgba(100, 116, 139, 0.4)"
                    : "linear-gradient(135deg, #00f0ff 0%, #0284c7 100%)",
                border: "2px solid #38bdf8",
                boxShadow:
                  !blueSelected || blueAttempted || answerRevealed
                    ? "none"
                    : "0 0 16px rgba(0, 240, 255, 0.5)",
                color: "#ffffff",
                fontSize: "0.9rem",
                fontWeight: 900,
                cursor: !blueSelected || blueAttempted || answerRevealed ? "not-allowed" : "pointer",
              }}
            >
              <Zap size={16} />
              <span>{blueAttempted ? "SYNTHESIZED" : "LOCK & SYNTHESIZE (KEY A)"}</span>
            </button>
          </div>
        </section>

        {/* CENTER COLUMN: 3D BIOGENESIS CRUCIBLE (UNOBSTRUCTED) */}
        <section
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            borderRadius: "24px",
            overflow: "hidden",
            minHeight: "640px",
            border: "2px solid rgba(56, 189, 248, 0.4)",
            boxShadow: "0 0 30px rgba(0, 240, 255, 0.2)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "14px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 15,
              background: "rgba(15, 23, 42, 0.88)",
              backdropFilter: "blur(10px)",
              border: "1.5px solid #00f0ff",
              borderRadius: "9999px",
              padding: "4px 18px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
            }}
          >
            <FlaskConical size={15} color="#00f0ff" />
            <span style={{ fontSize: "0.82rem", fontWeight: 900, color: "#ffffff" }}>
              3D BIOGENESIS INCUBATOR CRUCIBLE
            </span>
          </div>

          <BiogenesisCrucible3D
            blueScore={teams.team1.score}
            redScore={teams.team2.score}
            winnerTeam={winnerTeam}
          />
        </section>

        {/* RIGHT COLUMN: RED ANIMAL SYNTH & QUESTION UNDER RED TEAM */}
        <section style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div
            style={{
              background: "rgba(24, 10, 30, 0.92)",
              backdropFilter: "blur(14px)",
              border: "2.5px solid #ff2a6d",
              boxShadow: "0 0 24px rgba(255, 42, 109, 0.35)",
              borderRadius: "20px",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "rgba(244, 63, 94, 0.2)",
                  border: "1.5px solid #f43f5e",
                  borderRadius: "9999px",
                  padding: "4px 12px",
                  fontSize: "0.85rem",
                  fontWeight: 900,
                  color: "#fda4af",
                }}
              >
                <PawPrint size={14} fill="#f43f5e" color="#f43f5e" />
                <span>RED ANIMAL SYNTH</span>
              </div>
              <span style={{ fontSize: "0.85rem", fontWeight: 900, color: "#fda4af" }}>
                {teams.team2.score} PTS
              </span>
            </div>

            {/* Animal Cell Image */}
            <div style={{ position: "relative", width: "100%", aspectRatio: "1", borderRadius: "14px", overflow: "hidden", border: "1.5px solid rgba(244, 63, 94, 0.3)" }}>
              <Image src="/assets/animal_cell.jpg" alt="Animal Cell" fill style={{ objectFit: "cover" }} />
              <div style={{
                position: "absolute", bottom: "6px", left: "6px", right: "6px",
                background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)",
                borderRadius: "8px", padding: "4px 10px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#fda4af" }}>🐾 Animal Cell</span>
                <span style={{ fontSize: "0.72rem", fontWeight: 900, color: "#facc15" }}>{redGained.length}/6</span>
              </div>
            </div>
          </div>

          {/* RED ANIMAL SYNTH QUESTION & ANSWER CONSOLE */}
          <div
            style={{
              background: "rgba(24, 10, 30, 0.94)",
              backdropFilter: "blur(16px)",
              border: "2px solid #ff2a6d",
              boxShadow: "0 0 20px rgba(255, 42, 109, 0.25)",
              borderRadius: "20px",
              padding: "14px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              flex: 1,
            }}
          >
            <div style={{ fontSize: "0.72rem", fontWeight: 900, color: "#fda4af", textTransform: "uppercase" }}>
              RED SYNTH CHALLENGE:
            </div>

            <p style={{ fontSize: "0.88rem", fontWeight: 700, lineHeight: 1.4, margin: 0 }}>
              {currentQ.question}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {currentQ.options.map((option, idx) => {
                const letter = String.fromCharCode(65 + idx);
                const isSelected = redSelected === option;
                const isCorrect = answerRevealed && option === currentQ.correctAnswer;

                let bg = "rgba(15, 23, 42, 0.85)";
                let border = "1.5px solid rgba(244, 63, 94, 0.35)";
                let glow = "none";

                if (isCorrect) {
                  bg = "linear-gradient(90deg, #15803d 0%, #22c55e 100%)";
                  border = "2px solid #86efac";
                  glow = "0 0 12px #22c55e";
                } else if (isSelected) {
                  bg = "rgba(225, 29, 72, 0.25)";
                  border = "2px solid #ff2a6d";
                  glow = "0 0 12px rgba(255, 42, 109, 0.5)";
                }

                return (
                  <button
                    key={letter}
                    onClick={() => !redAttempted && !answerRevealed && setRedSelected(option)}
                    disabled={redAttempted || answerRevealed}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "8px 12px",
                      borderRadius: "12px",
                      background: bg,
                      border: border,
                      boxShadow: glow,
                      color: "#ffffff",
                      fontSize: "0.85rem",
                      fontWeight: 800,
                      cursor: redAttempted || answerRevealed ? "default" : "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        background: isSelected ? "#ff2a6d" : "rgba(244, 63, 94, 0.3)",
                        color: isSelected ? "#ffffff" : "#ffffff",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.75rem",
                        fontWeight: 900,
                        marginRight: "8px",
                        flexShrink: 0,
                      }}
                    >
                      {letter}
                    </span>
                    <span style={{ flex: 1 }}>{option}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleRedLock}
              disabled={!redSelected || redAttempted || answerRevealed}
              style={{
                marginTop: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "10px",
                borderRadius: "12px",
                background:
                  !redSelected || redAttempted || answerRevealed
                    ? "rgba(100, 116, 139, 0.4)"
                    : "linear-gradient(135deg, #ff2a6d 0%, #be123c 100%)",
                border: "2px solid #f43f5e",
                boxShadow:
                  !redSelected || redAttempted || answerRevealed
                    ? "none"
                    : "0 0 16px rgba(255, 42, 109, 0.5)",
                color: "#ffffff",
                fontSize: "0.9rem",
                fontWeight: 900,
                cursor: !redSelected || redAttempted || answerRevealed ? "not-allowed" : "pointer",
              }}
            >
              <Zap size={16} />
              <span>{redAttempted ? "SYNTHESIZED" : "LOCK & SYNTHESIZE (KEY L)"}</span>
            </button>
          </div>
        </section>
      </main>

      {/* 3. CHAMPIONSHIP CELEBRATION MODAL */}
      {isChampionshipOver && (
        <VictoryModal
          winner={determineWinner()}
          blueScore={teams.team1.score}
          redScore={teams.team2.score}
          blueCompleted={blueGained.length}
          redCompleted={redGained.length}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
