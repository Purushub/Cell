"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGame } from "@/context/GameContext";
import { useTheme } from "@/context/ThemeContext";
import StageTimelineStepper from "@/components/ui/StageTimelineStepper";
import CellRaceArena3D from "@/components/race/CellRaceArena3D";
import Organelle3DIcon from "@/components/cell/Organelle3DIcon";
import VictoryModal from "@/components/celebration/VictoryModal";
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
} from "lucide-react";

// IB Grade 6 Science Stages
const GRAND_PRIX_STAGES = [
  {
    id: 1,
    name: "CELL BOUNDARY",
    title: "STAGE 1: THE CELL BOUNDARY & SUPPORT",
    challengeName: "STAGE 1: CELL BOUNDARY",
    questionText:
      "Plant cells have a tough, rigid outer layer made of cellulose that keeps the plant upright and prevents the cell from bursting. Animal cells do NOT have this. What is it called?",
    options: ["Cell Wall", "Cell Membrane", "Cytoplasm", "Chloroplast"],
    correctAnswer: "Cell Wall",
    explanation:
      "Plant cells have a rigid Cellulose Cell Wall outside their membrane for structural support. Animal cells only have a flexible Plasma Membrane!",
    plantReward: "Cellulose Cell Wall",
    animalReward: "Flexible Plasma Membrane",
    organelleKey: "cell-wall",
    points: 100,
  },
  {
    id: 2,
    name: "POWERHOUSE",
    title: "STAGE 2: ENERGY RELEASE & CELLULAR RESPIRATION",
    challengeName: "STAGE 2: CELL POWERHOUSE",
    questionText:
      "Which organelle is known as the 'Powerhouse of the Cell' because it breaks down glucose from food to release energy (ATP) through respiration?",
    options: ["Nucleus", "Mitochondria", "Ribosome", "Vacuole"],
    correctAnswer: "Mitochondria",
    explanation:
      "Mitochondria carry out aerobic cellular respiration, releasing ATP energy to power all plant and animal cells!",
    plantReward: "Mitochondria",
    animalReward: "Mitochondria",
    organelleKey: "mitochondria",
    points: 150,
  },
  {
    id: 3,
    name: "COMMAND CORE",
    title: "STAGE 3: CONTROL CENTER & GENETIC DIRECTIVES",
    challengeName: "STAGE 3: THE CELL'S BRAIN",
    questionText:
      "Which organelle acts like the 'control center' or 'brain' of the cell, holding instructions (DNA) and directing cell growth and activities?",
    options: ["Vacuole", "Nucleus", "Cell Wall", "Chloroplast"],
    correctAnswer: "Nucleus",
    explanation:
      "The Nucleus contains the cell's genetic blueprint (DNA chromosomes) and coordinates all growth and protein synthesis.",
    plantReward: "Nucleus",
    animalReward: "Nucleus",
    organelleKey: "nucleus",
    points: 200,
  },
  {
    id: 4,
    name: "ENERGY & DIGESTION",
    title: "STAGE 4: PHOTOSYNTHESIS VS DIGESTION",
    challengeName: "STAGE 4: SPECIALIZED ENGINES",
    questionText:
      "Plant cells can make their own food through photosynthesis using sunlight. What green disc-shaped organelles containing chlorophyll carry this out?",
    options: ["Centrioles", "Chloroplasts", "Lysosomes", "Ribosomes"],
    correctAnswer: "Chloroplasts",
    explanation:
      "Chloroplasts contain green chlorophyll pigments that absorb solar photons to manufacture sugars. Animal cells use lysosomes to digest nutrients!",
    plantReward: "Chloroplasts",
    animalReward: "Lysosomes",
    organelleKey: "chloroplast",
    points: 250,
  },
  {
    id: 5,
    name: "STORAGE & DIVISION",
    title: "STAGE 5: HYDROSTATIC PRESSURE & DIVISION",
    challengeName: "STAGE 5: STORAGE & DIVISION",
    questionText:
      "When a plant does not get enough water, it wilts. Which large fluid-filled sac loses water and turgor pressure, causing the plant to droop?",
    options: ["Large Vacuole", "Mitochondria", "Cell Wall", "Ribosome"],
    correctAnswer: "Large Vacuole",
    explanation:
      "The Large Central Vacuole maintains turgor pressure against the cell wall. Animal cells have centrioles to coordinate chromosome division!",
    plantReward: "Large Vacuole",
    animalReward: "Centrioles",
    organelleKey: "vacuole",
    points: 300,
  },
  {
    id: 6,
    name: "COMPLETE CELL",
    title: "STAGE 6: INTERNAL CYTOPLASMIC MATRIX",
    challengeName: "STAGE 6: FINAL CELL BIOGENESIS",
    questionText:
      "What is the clear, jelly-like fluid that fills the space inside the cell, where most chemical reactions take place and all organelles float?",
    options: ["Chlorophyll", "Cytoplasm", "Cellulose", "Chromosome"],
    correctAnswer: "Cytoplasm",
    explanation:
      "Cytoplasm is the gel-like fluid that suspends organelles, distributes nutrients, and facilitates vital biochemical metabolism.",
    plantReward: "Cytoplasm",
    animalReward: "Cytoplasm",
    organelleKey: "cytoplasm",
    points: 350,
  },
];

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

export default function GrandPrixPage() {
  const { teams, awardPoints, resetScores, playSound, fireConfetti } = useGame();
  const { theme } = useTheme();

  // Reset scores whenever starting a new Grand Prix race
  useEffect(() => {
    resetScores();
  }, [resetScores]);

  // Stage & Turn state
  const [stageIndex, setStageIndex] = useState(0);

  // Independent selections for each team under their column
  const [blueSelected, setBlueSelected] = useState(null);
  const [redSelected, setRedSelected] = useState(null);
  const [blueAttempted, setBlueAttempted] = useState(false);
  const [redAttempted, setRedAttempted] = useState(false);
  const [answerRevealed, setAnswerRevealed] = useState(false);

  // 3D Visual absorption trigger ('blue' | 'red' | null)
  const [winnerTeam, setWinnerTeam] = useState(null);

  // Rewards tracking
  const [blueGained, setBlueGained] = useState([]);
  const [redGained, setRedGained] = useState([]);
  const [lastBlueGained, setLastBlueGained] = useState(null);
  const [lastRedGained, setLastRedGained] = useState(null);

  // Timer & Broadcast
  const [timerSeconds, setTimerSeconds] = useState(26);
  const [autoAdvance, setAutoAdvance] = useState(null);
  const [broadcastMessage, setBroadcastMessage] = useState(
    "🏎️ Stage 1 Ready: Select your answer under your team and click LOCK to surge forward!"
  );
  const [isChampionshipOver, setIsChampionshipOver] = useState(false);

  const validStageIdx = Math.max(0, Math.min(stageIndex, GRAND_PRIX_STAGES.length - 1));
  const currentStage = GRAND_PRIX_STAGES[validStageIdx] || GRAND_PRIX_STAGES[0];

  // Stage countdown clock
  useEffect(() => {
    if (answerRevealed || isChampionshipOver) return;

    if (timerSeconds <= 0) {
      setAnswerRevealed(true);
      playSound("wrong");
      setBroadcastMessage(`⏰ Time expired! The correct answer was: ${currentStage?.correctAnswer}`);
      start5sCountdown();
      return;
    }

    const clock = setInterval(() => {
      setTimerSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(clock);
  }, [timerSeconds, answerRevealed, isChampionshipOver, currentStage]);

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
    setTimerSeconds(26);

    setStageIndex((prev) => {
      if (prev + 1 >= GRAND_PRIX_STAGES.length) {
        setIsChampionshipOver(true);
        return prev;
      }
      setBroadcastMessage(
        `🏎️ Stage ${prev + 2} Ready: Select your answer under your team and LOCK!`
      );
      return prev + 1;
    });
  };

  // Blue Team Answer Lock Handler
  const handleBlueLock = () => {
    if (!blueSelected || blueAttempted || answerRevealed) return;
    setBlueAttempted(true);

    const isCorrect = blueSelected === currentStage.correctAnswer;

    if (isCorrect) {
      playSound("correct");
      fireConfetti({
        particleCount: 140,
        spread: 80,
        origin: { x: 0.2, y: 0.5 },
      });

      setWinnerTeam("blue"); // Triggers 3D cell forward rush & organelle absorption!
      awardPoints("team1", currentStage.points);
      setBlueGained((prev) => [...prev, currentStage.organelleKey]);
      setLastBlueGained(currentStage.plantReward);
      setBroadcastMessage(
        `🎉 Blue Team surged forward and absorbed ${currentStage.plantReward}! +${currentStage.points} PTS`
      );

      setAnswerRevealed(true);
      start5sCountdown();
    } else {
      playSound("wrong");
      awardPoints("team1", -25);
      if (!redAttempted) {
        setBroadcastMessage("❌ Blue Team missed! ⚡ Red Team gets a chance to STEAL!");
      } else {
        setBroadcastMessage(`❌ Both teams missed! Correct answer: ${currentStage.correctAnswer}`);
        setAnswerRevealed(true);
        start5sCountdown();
      }
    }
  };

  // Red Team Answer Lock Handler
  const handleRedLock = () => {
    if (!redSelected || redAttempted || answerRevealed) return;
    setRedAttempted(true);

    const isCorrect = redSelected === currentStage.correctAnswer;

    if (isCorrect) {
      playSound("correct");
      fireConfetti({
        particleCount: 140,
        spread: 80,
        origin: { x: 0.8, y: 0.5 },
      });

      setWinnerTeam("red"); // Triggers 3D cell forward rush & organelle absorption!
      awardPoints("team2", currentStage.points);
      setRedGained((prev) => [...prev, currentStage.organelleKey]);
      setLastRedGained(currentStage.animalReward);
      setBroadcastMessage(
        `🎉 Red Team surged forward and absorbed ${currentStage.animalReward}! +${currentStage.points} PTS`
      );

      setAnswerRevealed(true);
      start5sCountdown();
    } else {
      playSound("wrong");
      awardPoints("team2", -25);
      if (!blueAttempted) {
        setBroadcastMessage("❌ Red Team missed! ⚡ Blue Team gets a chance to STEAL!");
      } else {
        setBroadcastMessage(`❌ Both teams missed! Correct answer: ${currentStage.correctAnswer}`);
        setAnswerRevealed(true);
        start5sCountdown();
      }
    }
  };

  const handleRestart = () => {
    resetScores();
    setIsChampionshipOver(false);
    setStageIndex(0);
    setBlueSelected(null);
    setRedSelected(null);
    setBlueAttempted(false);
    setRedAttempted(false);
    setAnswerRevealed(false);
    setWinnerTeam(null);
    setAutoAdvance(null);
    setTimerSeconds(26);
    setBlueGained([]);
    setRedGained([]);
    setLastBlueGained(null);
    setLastRedGained(null);
    setBroadcastMessage("🏎️ Championship restarted! Select answers under your team.");
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
        height: "100vh",
        maxHeight: "100vh",
        background: "#030712",
        color: "#ffffff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ========================================================= */}
      {/* 1. TOP HEADER HUD BAR                                    */}
      {/* ========================================================= */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "6px 20px",
          gap: "12px",
          zIndex: 30,
          background: "linear-gradient(180deg, rgba(3, 7, 18, 0.95) 0%, rgba(3, 7, 18, 0.8) 100%)",
          backdropFilter: "blur(12px)",
          borderBottom: "1.5px solid rgba(56, 189, 248, 0.3)",
          flexShrink: 0,
        }}
      >
        {/* Left: T1 Blue Team Shield Pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(12, 74, 110, 0.85)",
            border: "2px solid #00f0ff",
            boxShadow: "0 0 16px rgba(0, 240, 255, 0.45)",
            borderRadius: "9999px",
            padding: "4px 14px",
          }}
        >
          <div
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              background: "#22c55e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 8px #22c55e",
            }}
          >
            <Shield size={14} fill="#ffffff" color="#ffffff" />
          </div>
          <span style={{ fontSize: "1rem", fontWeight: 900, letterSpacing: "0.05em" }}>
            T1: {teams.team1.score}
          </span>
        </div>

        {/* Center: Stage Title & 6-Stage Stepper */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "3px",
            flex: 1,
            minWidth: "260px",
          }}
        >
          <div
            style={{
              background: "rgba(15, 23, 42, 0.92)",
              border: "1.5px solid #00f0ff",
              borderRadius: "9999px",
              padding: "2px 16px",
              textAlign: "center",
              boxShadow: "0 0 15px rgba(0, 240, 255, 0.25)",
            }}
          >
            <div
              style={{
                fontSize: "0.65rem",
                fontWeight: 900,
                color: "#38bdf8",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              IB GRADE 6 SCIENCE • CELLS UNIT
            </div>
            <div
              style={{
                fontSize: "0.85rem",
                fontWeight: 900,
                color: "#ffffff",
                letterSpacing: "0.04em",
              }}
            >
              {currentStage?.title || "GRAND PRIX RACE"}
            </div>
          </div>

          <StageTimelineStepper currentStage={stageIndex + 1} />
        </div>

        {/* Right: T2 Red Team Paw Pill & Timer */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(159, 18, 57, 0.85)",
              border: "2px solid #ff2a6d",
              boxShadow: "0 0 16px rgba(255, 42, 109, 0.45)",
              borderRadius: "9999px",
              padding: "4px 14px",
            }}
          >
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                background: "#f43f5e",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 8px #f43f5e",
              }}
            >
              <PawPrint size={14} fill="#ffffff" color="#ffffff" />
            </div>
            <span style={{ fontSize: "1rem", fontWeight: 900, letterSpacing: "0.05em" }}>
              T2: {teams.team2.score}
            </span>
          </div>

          {/* Timer Pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(10, 25, 47, 0.9)",
              border: "2px solid #38bdf8",
              borderRadius: "9999px",
              padding: "4px 14px",
              boxShadow: "0 0 12px rgba(56, 189, 248, 0.3)",
            }}
          >
            <Clock size={16} color="#facc15" />
            <span
              style={{
                fontSize: "0.95rem",
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
          padding: "4px 16px",
          background: "rgba(15, 23, 42, 0.85)",
          borderBottom: "1px solid rgba(56, 189, 248, 0.2)",
          zIndex: 25,
          gap: "10px",
          flexShrink: 0,
        }}
      >
        <Sparkles size={14} color="#38bdf8" />
        <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#ffffff" }}>
          {broadcastMessage}
        </span>
        {autoAdvance !== null && (
          <span
            style={{
              background: "rgba(34, 197, 94, 0.25)",
              border: "1px solid #22c55e",
              borderRadius: "9999px",
              padding: "2px 8px",
              fontSize: "0.75rem",
              fontWeight: 900,
              color: "#86efac",
            }}
          >
            Next stage in {autoAdvance}s ⏱️
          </span>
        )}
      </div>

      {/* ========================================================= */}
      {/* 2. MAIN 3-COLUMN ARENA (QUESTIONS UNDER EACH TEAM)        */}
      {/* ========================================================= */}
      <main
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "minmax(270px, 310px) 1fr minmax(270px, 310px)",
          gap: "10px",
          padding: "8px 14px",
          boxSizing: "border-box",
          alignItems: "stretch",
          minHeight: 0,
          overflow: "hidden",
        }}
      >
        {/* -------------------------------------------------------- */}
        {/* LEFT COLUMN: BLUE TEAM CARD & QUESTION UNDER BLUE TEAM   */}
        {/* -------------------------------------------------------- */}
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            minHeight: 0,
            height: "100%",
            overflow: "hidden",
          }}
        >
          {/* Blue Team Status Card */}
          <div
            style={{
              background: "rgba(10, 25, 47, 0.92)",
              backdropFilter: "blur(14px)",
              border: "2px solid #00f0ff",
              boxShadow: "0 0 18px rgba(0, 240, 255, 0.3)",
              borderRadius: "14px",
              padding: "8px 10px",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              flexShrink: 0,
            }}
          >
            {/* Header Badge */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "rgba(34, 197, 94, 0.2)",
                  border: "1.5px solid #22c55e",
                  borderRadius: "9999px",
                  padding: "3px 10px",
                  fontSize: "0.8rem",
                  fontWeight: 900,
                  color: "#86efac",
                }}
              >
                <Shield size={13} fill="#22c55e" color="#22c55e" />
                <span>BLUE TEAM</span>
              </div>
              <span style={{ fontSize: "0.82rem", fontWeight: 900, color: "#38bdf8" }}>
                {teams.team1.score} PTS
              </span>
            </div>

            {/* Plant Cell Image Banner */}
            <div style={{ position: "relative", width: "100%", height: "135px", borderRadius: "10px", overflow: "hidden", border: "1.5px solid rgba(56, 189, 248, 0.3)" }}>
              <Image src="/assets/plant_cell.jpg" alt="Plant Cell" fill style={{ objectFit: "cover" }} priority />
              <div style={{
                position: "absolute", bottom: "4px", left: "6px", right: "6px",
                background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)",
                borderRadius: "6px", padding: "2px 8px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#86efac" }}>🌱 Plant Cell</span>
                <span style={{ fontSize: "0.7rem", fontWeight: 900, color: "#facc15" }}>{blueGained.length}/6</span>
              </div>
            </div>
          </div>

          {/* BLUE TEAM QUESTION & ANSWER CONSOLE (UNDER BLUE TEAM) */}
          <div
            style={{
              background: "rgba(10, 25, 47, 0.94)",
              backdropFilter: "blur(16px)",
              border: "2px solid #00f0ff",
              boxShadow: "0 0 16px rgba(0, 240, 255, 0.2)",
              borderRadius: "14px",
              padding: "10px 12px",
              display: "flex",
              flexDirection: "column",
              gap: "7px",
              flex: 1,
              minHeight: 0,
              overflowY: "auto",
            }}
          >
            <div
              style={{
                fontSize: "0.68rem",
                fontWeight: 900,
                color: "#38bdf8",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              BLUE TEAM CHALLENGE:
            </div>

            <p style={{ fontSize: "0.82rem", fontWeight: 700, lineHeight: 1.35, margin: 0 }}>
              {currentStage?.questionText}
            </p>

            {/* Options */}
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              {(currentStage?.options || []).map((option, idx) => {
                const letter = String.fromCharCode(65 + idx);
                const isSelected = blueSelected === option;
                const isCorrect = answerRevealed && option === currentStage?.correctAnswer;

                let bg = "rgba(15, 23, 42, 0.85)";
                let border = "1.5px solid rgba(56, 189, 248, 0.35)";
                let glow = "none";

                if (isCorrect) {
                  bg = "linear-gradient(90deg, #15803d 0%, #22c55e 100%)";
                  border = "2px solid #86efac";
                  glow = "0 0 10px #22c55e";
                } else if (isSelected) {
                  bg = "rgba(14, 165, 233, 0.25)";
                  border = "2px solid #00f0ff";
                  glow = "0 0 10px rgba(0, 240, 255, 0.5)";
                }

                return (
                  <button
                    key={letter}
                    onClick={() => !blueAttempted && !answerRevealed && setBlueSelected(option)}
                    disabled={blueAttempted || answerRevealed}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "6px 10px",
                      borderRadius: "10px",
                      background: bg,
                      border: border,
                      boxShadow: glow,
                      color: "#ffffff",
                      fontSize: "0.8rem",
                      fontWeight: 800,
                      cursor: blueAttempted || answerRevealed ? "default" : "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: isSelected ? "#00f0ff" : "rgba(56, 189, 248, 0.3)",
                        color: isSelected ? "#0f172a" : "#ffffff",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.72rem",
                        fontWeight: 900,
                        marginRight: "8px",
                        flexShrink: 0,
                      }}
                    >
                      {letter}
                    </span>
                    <span style={{ flex: 1, whiteSpace: "normal", wordBreak: "break-word" }}>{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Lock Answer Button */}
            <button
              onClick={handleBlueLock}
              disabled={!blueSelected || blueAttempted || answerRevealed}
              style={{
                marginTop: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                padding: "8px 12px",
                borderRadius: "10px",
                background:
                  !blueSelected || blueAttempted || answerRevealed
                    ? "rgba(100, 116, 139, 0.4)"
                    : "linear-gradient(135deg, #00f0ff 0%, #0284c7 100%)",
                border: "2px solid #38bdf8",
                boxShadow:
                  !blueSelected || blueAttempted || answerRevealed
                    ? "none"
                    : "0 0 14px rgba(0, 240, 255, 0.45)",
                color: "#ffffff",
                fontSize: "0.84rem",
                fontWeight: 900,
                cursor:
                  !blueSelected || blueAttempted || answerRevealed ? "not-allowed" : "pointer",
              }}
            >
              <Zap size={15} />
              <span>{blueAttempted ? "LOCKED" : "LOCK & SURGE (KEY A)"}</span>
            </button>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/* CENTER COLUMN: 3D RACE TRACK & DYNAMIC ORGANELLE ABSORPTION */}
        {/* -------------------------------------------------------- */}
        <section
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            borderRadius: "20px",
            overflow: "hidden",
            minHeight: 0,
            height: "100%",
            border: "2px solid rgba(56, 189, 248, 0.4)",
            boxShadow: "0 0 24px rgba(0, 240, 255, 0.2)",
          }}
        >
          {/* Top Track Overlay Header */}
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 15,
              background: "rgba(15, 23, 42, 0.88)",
              backdropFilter: "blur(10px)",
              border: "1.5px solid #00f0ff",
              borderRadius: "9999px",
              padding: "3px 14px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
              maxWidth: "90%",
            }}
          >
            <Sparkles size={13} color="#00f0ff" />
            <span style={{ fontSize: "0.75rem", fontWeight: 900, color: "#ffffff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              3D VASCULAR RACEWAY • WATCH WINNING CELL SURGE & ABSORB!
            </span>
          </div>

          {/* 3D WebGL Canvas */}
          <CellRaceArena3D
            currentStage={stageIndex + 1}
            blueProgress={blueGained.length}
            redProgress={redGained.length}
            winnerTeam={winnerTeam}
            blueLocked={blueAttempted}
            redLocked={redAttempted}
          />
        </section>

        {/* -------------------------------------------------------- */}
        {/* RIGHT COLUMN: RED TEAM CARD & QUESTION UNDER RED TEAM    */}
        {/* -------------------------------------------------------- */}
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            minHeight: 0,
            height: "100%",
            overflow: "hidden",
          }}
        >
          {/* Red Team Status Card */}
          <div
            style={{
              background: "rgba(24, 10, 30, 0.92)",
              backdropFilter: "blur(14px)",
              border: "2px solid #ff2a6d",
              boxShadow: "0 0 18px rgba(255, 42, 109, 0.3)",
              borderRadius: "14px",
              padding: "8px 10px",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              flexShrink: 0,
            }}
          >
            {/* Header Badge */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "rgba(244, 63, 94, 0.2)",
                  border: "1.5px solid #f43f5e",
                  borderRadius: "9999px",
                  padding: "3px 10px",
                  fontSize: "0.8rem",
                  fontWeight: 900,
                  color: "#fda4af",
                }}
              >
                <PawPrint size={13} fill="#f43f5e" color="#f43f5e" />
                <span>RED TEAM</span>
              </div>
              <span style={{ fontSize: "0.82rem", fontWeight: 900, color: "#fda4af" }}>
                {teams.team2.score} PTS
              </span>
            </div>

            {/* Animal Cell Image Banner */}
            <div style={{ position: "relative", width: "100%", height: "135px", borderRadius: "10px", overflow: "hidden", border: "1.5px solid rgba(244, 63, 94, 0.3)" }}>
              <Image src="/assets/animal_cell.jpg" alt="Animal Cell" fill style={{ objectFit: "cover" }} priority />
              <div style={{
                position: "absolute", bottom: "4px", left: "6px", right: "6px",
                background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)",
                borderRadius: "6px", padding: "2px 8px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#fda4af" }}>🐾 Animal Cell</span>
                <span style={{ fontSize: "0.7rem", fontWeight: 900, color: "#facc15" }}>{redGained.length}/6</span>
              </div>
            </div>
          </div>

          {/* RED TEAM QUESTION & ANSWER CONSOLE (UNDER RED TEAM) */}
          <div
            style={{
              background: "rgba(24, 10, 30, 0.94)",
              backdropFilter: "blur(16px)",
              border: "2px solid #ff2a6d",
              boxShadow: "0 0 16px rgba(255, 42, 109, 0.2)",
              borderRadius: "14px",
              padding: "10px 12px",
              display: "flex",
              flexDirection: "column",
              gap: "7px",
              flex: 1,
              minHeight: 0,
              overflowY: "auto",
            }}
          >
            <div
              style={{
                fontSize: "0.68rem",
                fontWeight: 900,
                color: "#fda4af",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              RED TEAM CHALLENGE:
            </div>

            <p style={{ fontSize: "0.82rem", fontWeight: 700, lineHeight: 1.35, margin: 0 }}>
              {currentStage?.questionText}
            </p>

            {/* Options */}
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              {(currentStage?.options || []).map((option, idx) => {
                const letter = String.fromCharCode(65 + idx);
                const isSelected = redSelected === option;
                const isCorrect = answerRevealed && option === currentStage?.correctAnswer;

                let bg = "rgba(15, 23, 42, 0.85)";
                let border = "1.5px solid rgba(244, 63, 94, 0.35)";
                let glow = "none";

                if (isCorrect) {
                  bg = "linear-gradient(90deg, #15803d 0%, #22c55e 100%)";
                  border = "2px solid #86efac";
                  glow = "0 0 10px #22c55e";
                } else if (isSelected) {
                  bg = "rgba(225, 29, 72, 0.25)";
                  border = "2px solid #ff2a6d";
                  glow = "0 0 10px rgba(255, 42, 109, 0.5)";
                }

                return (
                  <button
                    key={letter}
                    onClick={() => !redAttempted && !answerRevealed && setRedSelected(option)}
                    disabled={redAttempted || answerRevealed}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "6px 10px",
                      borderRadius: "10px",
                      background: bg,
                      border: border,
                      boxShadow: glow,
                      color: "#ffffff",
                      fontSize: "0.8rem",
                      fontWeight: 800,
                      cursor: redAttempted || answerRevealed ? "default" : "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: isSelected ? "#ff2a6d" : "rgba(244, 63, 94, 0.3)",
                        color: isSelected ? "#ffffff" : "#ffffff",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.72rem",
                        fontWeight: 900,
                        marginRight: "8px",
                        flexShrink: 0,
                      }}
                    >
                      {letter}
                    </span>
                    <span style={{ flex: 1, whiteSpace: "normal", wordBreak: "break-word" }}>{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Lock Answer Button */}
            <button
              onClick={handleRedLock}
              disabled={!redSelected || redAttempted || answerRevealed}
              style={{
                marginTop: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                padding: "8px 12px",
                borderRadius: "10px",
                background:
                  !redSelected || redAttempted || answerRevealed
                    ? "rgba(100, 116, 139, 0.4)"
                    : "linear-gradient(135deg, #ff2a6d 0%, #be123c 100%)",
                border: "2px solid #ff2a6d",
                boxShadow:
                  !redSelected || redAttempted || answerRevealed
                    ? "none"
                    : "0 0 14px rgba(255, 42, 109, 0.45)",
                color: "#ffffff",
                fontSize: "0.84rem",
                fontWeight: 900,
                cursor:
                  !redSelected || redAttempted || answerRevealed ? "not-allowed" : "pointer",
              }}
            >
              <Zap size={15} />
              <span>{redAttempted ? "LOCKED" : "LOCK & SURGE (KEY L)"}</span>
            </button>
          </div>
        </section>
      </main>

      {/* ========================================================= */}
      {/* 3. CHAMPIONSHIP CELEBRATION MODAL                         */}
      {/* ========================================================= */}
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
