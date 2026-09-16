"use client";

import React from "react";

/**
 * Organelle3DIcon:
 * High-definition, colorful stylized 3D SVG renders for all organelles
 * matching the Pixar/Mario-Kart visual style in the reference mockup.
 */
export default function Organelle3DIcon({ type, size = 28 }) {
  switch (type) {
    case "cell-wall":
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
          <defs>
            <linearGradient id="wallFront" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
            <linearGradient id="wallSide" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#15803d" />
              <stop offset="100%" stopColor="#14532d" />
            </linearGradient>
            <filter id="wallGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#22c55e" floodOpacity="0.5" />
            </filter>
          </defs>
          <g filter="url(#wallGlow)">
            {/* 3D Isometric Brick Block */}
            <path d="M8 16 L24 8 L40 16 L40 32 L24 40 L8 32 Z" fill="url(#wallFront)" stroke="#14532d" strokeWidth="2" />
            <path d="M8 16 L24 24 L40 16" stroke="#166534" strokeWidth="2" fill="none" />
            <path d="M24 24 L24 40" stroke="#166534" strokeWidth="2" fill="none" />
            {/* Brick divisions */}
            <path d="M16 20 L16 28" stroke="#15803d" strokeWidth="1.5" />
            <path d="M32 20 L32 28" stroke="#15803d" strokeWidth="1.5" />
          </g>
        </svg>
      );

    case "membrane":
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
          <defs>
            <linearGradient id="memGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <filter id="memGlow">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#06b6d4" floodOpacity="0.6" />
            </filter>
          </defs>
          <g filter="url(#memGlow)">
            <circle cx="24" cy="24" r="16" stroke="url(#memGrad)" strokeWidth="4" fill="rgba(168, 85, 247, 0.15)" />
            <circle cx="24" cy="24" r="11" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
            <circle cx="24" cy="18" r="2" fill="#f43f5e" />
            <circle cx="30" cy="24" r="2" fill="#3b82f6" />
            <circle cx="18" cy="26" r="2" fill="#10b981" />
          </g>
        </svg>
      );

    case "mitochondria":
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
          <defs>
            <linearGradient id="mitoOuter" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
            <filter id="mitoGlow">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#f97316" floodOpacity="0.6" />
            </filter>
          </defs>
          <g filter="url(#mitoGlow)">
            <ellipse cx="24" cy="24" rx="18" ry="10" transform="rotate(-20 24 24)" fill="url(#mitoOuter)" stroke="#c2410c" strokeWidth="2" />
            {/* Cristae folds */}
            <path
              d="M12 28 Q18 20 24 25 T36 21"
              stroke="#fef08a"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        </svg>
      );

    case "nucleus":
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
          <defs>
            <radialGradient id="nucRad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="60%" stopColor="#7e22ce" />
              <stop offset="100%" stopColor="#3b0764" />
            </radialGradient>
            <filter id="nucGlow">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#a855f7" floodOpacity="0.7" />
            </filter>
          </defs>
          <g filter="url(#nucGlow)">
            <circle cx="24" cy="24" r="16" fill="url(#nucRad)" stroke="#581c87" strokeWidth="1.5" />
            <circle cx="20" cy="20" r="5" fill="#f3e8ff" />
            <circle cx="16" cy="14" r="1.5" fill="#e9d5ff" />
            <circle cx="31" cy="26" r="1.5" fill="#e9d5ff" />
            <circle cx="26" cy="32" r="1.5" fill="#e9d5ff" />
          </g>
        </svg>
      );

    case "chloroplast":
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
          <defs>
            <linearGradient id="chloroGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>
            <filter id="chloroGlow">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#22c55e" floodOpacity="0.6" />
            </filter>
          </defs>
          <g filter="url(#chloroGlow)">
            <ellipse cx="24" cy="24" rx="17" ry="11" transform="rotate(15 24 24)" fill="url(#chloroGrad)" stroke="#14532d" strokeWidth="2" />
            {/* Grana stacks */}
            <ellipse cx="18" cy="23" rx="3.5" ry="1.5" fill="#bbf7d0" />
            <ellipse cx="18" cy="25" rx="3.5" ry="1.5" fill="#86efac" />
            <ellipse cx="28" cy="24" rx="3.5" ry="1.5" fill="#bbf7d0" />
            <ellipse cx="28" cy="26" rx="3.5" ry="1.5" fill="#86efac" />
          </g>
        </svg>
      );

    case "vacuole":
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
          <defs>
            <radialGradient id="vacRad" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#bae6fd" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </radialGradient>
            <filter id="vacGlow">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#38bdf8" floodOpacity="0.7" />
            </filter>
          </defs>
          <g filter="url(#vacGlow)">
            <ellipse cx="24" cy="24" rx="16" ry="13" fill="url(#vacRad)" stroke="#0369a1" strokeWidth="1.5" />
            <ellipse cx="19" cy="19" rx="5" ry="2.5" fill="#ffffff" opacity="0.75" />
          </g>
        </svg>
      );

    case "lysosome":
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
          <defs>
            <radialGradient id="lysoRad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="70%" stopColor="#db2777" />
              <stop offset="100%" stopColor="#831843" />
            </radialGradient>
            <filter id="lysoGlow">
              <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#ec4899" floodOpacity="0.6" />
            </filter>
          </defs>
          <g filter="url(#lysoGlow)">
            <circle cx="24" cy="24" r="14" fill="url(#lysoRad)" stroke="#9d174d" strokeWidth="1.5" />
            <circle cx="20" cy="20" r="2.5" fill="#fdf2f8" />
            <circle cx="27" cy="26" r="1.5" fill="#fce7f3" />
            <circle cx="20" cy="27" r="1.5" fill="#fce7f3" />
          </g>
        </svg>
      );

    case "centrioles":
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
          <defs>
            <linearGradient id="centGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#e879f9" />
              <stop offset="100%" stopColor="#a21caf" />
            </linearGradient>
          </defs>
          <g>
            {/* Perpendicular star barrels */}
            <rect x="18" y="10" width="12" height="6" rx="2" fill="url(#centGrad)" stroke="#701a75" strokeWidth="1.5" />
            <rect x="18" y="18" width="12" height="6" rx="2" fill="url(#centGrad)" stroke="#701a75" strokeWidth="1.5" />
            <rect x="18" y="26" width="12" height="6" rx="2" fill="url(#centGrad)" stroke="#701a75" strokeWidth="1.5" />
            <circle cx="24" cy="38" r="4" fill="#f0abfc" />
          </g>
        </svg>
      );

    case "cytoplasm":
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
          <defs>
            <radialGradient id="cytoRad" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#67e8f9" />
              <stop offset="60%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#0e7490" />
            </radialGradient>
            <filter id="cytoGlow">
              <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#06b6d4" floodOpacity="0.5" />
            </filter>
          </defs>
          <g filter="url(#cytoGlow)">
            <circle cx="24" cy="24" r="15" fill="url(#cytoRad)" stroke="#155e75" strokeWidth="1.5" />
            {/* Ribosome speckles */}
            <circle cx="18" cy="18" r="1.5" fill="#fef08a" />
            <circle cx="28" cy="20" r="1.2" fill="#fef08a" />
            <circle cx="22" cy="28" r="1.5" fill="#fef08a" />
            <circle cx="30" cy="28" r="1" fill="#fef08a" />
          </g>
        </svg>
      );
  }
}
