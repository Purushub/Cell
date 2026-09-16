"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";

const GameContext = createContext(null);

export function GameProvider({ children }) {
  // Team states
  const [teams, setTeams] = useState({
    team1: { name: "Team Mitochondria", score: 0, color: "#3b82f6", key: "A" },
    team2: { name: "Team Chloroplast", score: 0, color: "#f97316", key: "L" },
  });

  // Buzzer lockout state
  const [buzzedTeam, setBuzzedTeam] = useState(null);
  const [buzzerActive, setBuzzerActive] = useState(true);
  const [lockoutTime, setLockoutTime] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(10);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Sound Synthesizer using Web Audio API
  const playSound = useCallback((type) => {
    if (typeof window === "undefined") return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      if (type === "buzzer") {
        // Energetic arcade buzzer ding
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === "correct") {
        // Cheerful major chord arpeggio
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.value = freq;
          const start = ctx.currentTime + i * 0.08;
          gain.gain.setValueAtTime(0.25, start);
          gain.gain.exponentialRampToValueAtTime(0.001, start + 0.3);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(start);
          osc.stop(start + 0.3);
        });
      } else if (type === "wrong") {
        // Low double-buzz
        [160, 130].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sawtooth";
          osc.frequency.value = freq;
          const start = ctx.currentTime + i * 0.12;
          gain.gain.setValueAtTime(0.2, start);
          gain.gain.exponentialRampToValueAtTime(0.01, start + 0.15);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(start);
          osc.stop(start + 0.15);
        });
      } else if (type === "click") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(900, ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      }
    } catch (e) {
      console.warn("Audio Context error:", e);
    }
  }, []);

  // Confetti trigger
  const fireConfetti = useCallback((options = {}) => {
    try {
      confetti({
        particleCount: options.count || 80,
        spread: options.spread || 70,
        origin: options.origin || { y: 0.6 },
        colors: ["#3b82f6", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6"],
        ...options,
      });
    } catch (e) {
      console.warn("Confetti error:", e);
    }
  }, []);

  // Buzzer trigger
  const triggerBuzzer = useCallback((teamId) => {
    if (!buzzerActive || buzzedTeam) return;
    setBuzzedTeam(teamId);
    setLockoutTime(Date.now());
    setIsTimerRunning(true);
    setTimerSeconds(10);
    playSound("buzzer");
  }, [buzzerActive, buzzedTeam, playSound]);

  // Reset buzzer for next question
  const resetBuzzer = useCallback(() => {
    setBuzzedTeam(null);
    setIsTimerRunning(false);
    setTimerSeconds(10);
    setLockoutTime(null);
  }, []);

  // Award points
  const awardPoints = useCallback((teamId, points) => {
    setTeams((prev) => ({
      ...prev,
      [teamId]: {
        ...prev[teamId],
        score: Math.max(0, prev[teamId].score + points),
      },
    }));
    if (points > 0) {
      playSound("correct");
      fireConfetti();
    } else {
      playSound("wrong");
    }
  }, [playSound, fireConfetti]);

  // Reset all scores
  const resetScores = useCallback(() => {
    setTeams((prev) => ({
      team1: { ...prev.team1, score: 0 },
      team2: { ...prev.team2, score: 0 },
    }));
    resetBuzzer();
  }, [resetBuzzer]);

  // Timer countdown effect
  useEffect(() => {
    if (!isTimerRunning || timerSeconds <= 0) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsTimerRunning(false);
          playSound("wrong");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds, playSound]);

  // Global Keyboard listener for Buzzer ('A' for Team 1, 'L' for Team 2, 'Space' to reset)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger buzzer if user is typing in an input
      if (["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName)) return;

      if (e.key === "a" || e.key === "A") {
        triggerBuzzer("team1");
      } else if (e.key === "l" || e.key === "L") {
        triggerBuzzer("team2");
      } else if (e.code === "Space" && buzzedTeam) {
        // Spacebar resets buzzer lockout
        e.preventDefault();
        resetBuzzer();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [triggerBuzzer, resetBuzzer, buzzedTeam]);

  return (
    <GameContext.Provider
      value={{
        teams,
        setTeams,
        buzzedTeam,
        triggerBuzzer,
        resetBuzzer,
        buzzerActive,
        setBuzzerActive,
        timerSeconds,
        isTimerRunning,
        awardPoints,
        resetScores,
        playSound,
        fireConfetti,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
