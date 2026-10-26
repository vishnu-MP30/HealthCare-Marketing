"use client";

import React from "react";
import { HERO_CONTENT } from "@/content/hero";

interface HudOverlayProps {
  currentScene: number; // 1 to 7
  progress: number; // 0 to 1
  scrollPromptOpacity: number;
}

export default function HudOverlay({
  currentScene,
  progress,
  scrollPromptOpacity,
}: HudOverlayProps) {
  // Only display HUD overlay on the initial hero starting image (Stage 1)
  const isStartingHero = currentScene === 1 && progress < 0.14;
  const fadeClass = `transition-all duration-500 ${
    isStartingHero ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
  }`;

  return (
    <div className="pointer-events-none absolute inset-0 z-40 select-none flex flex-col justify-between p-5 sm:p-8 md:p-12">
      {/* 1. TOP BAR: COORDINATES & STAGE INDICATOR (Only on Starting Hero) */}
      <div className={`mt-14 sm:mt-16 flex items-center justify-between ${fadeClass}`}>
        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
          <span className="inline-block w-2 h-2 rounded-full bg-[#008068] animate-pulse" />
          <p className="font-mono-hud text-[10px] sm:text-[11px] tracking-[0.16em] uppercase font-medium text-white/90">
            {HERO_CONTENT.coordinates}
          </p>
        </div>

        {/* Scene progress badge (01 / 07) */}
        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-white/10">
          <span className="font-mono-hud text-[11px] sm:text-[12px] tracking-[0.18em] font-semibold text-white">
            01
          </span>
          <span className="font-mono-hud text-[11px] text-white/40">/</span>
          <span className="font-mono-hud text-[11px] tracking-[0.18em] text-white/50">07</span>
        </div>
      </div>

      {/* 2. CENTER: SCROLL PROMPT (Only on Starting Hero, fades early) */}
      <div
        className="mx-auto flex flex-col items-center gap-2 transition-opacity duration-300 pointer-events-none"
        style={{ opacity: isStartingHero ? scrollPromptOpacity : 0 }}
      >
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/55 backdrop-blur-md border border-white/15 shadow-lg">
          <span className="font-mono-hud text-[11px] tracking-[0.22em] text-white uppercase font-semibold">
            {HERO_CONTENT.scrollPrompt}
          </span>
          <svg
            className="w-3.5 h-3.5 text-[#008068] animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* 3. BOTTOM ROW: SCROLL PROGRESS BAR & 24/7 FIGURE (Only on Starting Hero) */}
      <div className={`flex items-end justify-between ${fadeClass}`}>
        {/* Left: Progress Track */}
        <div className="flex flex-col gap-2 w-32 sm:w-52 bg-black/40 backdrop-blur-sm p-2.5 rounded-lg border border-white/10">
          <div className="flex justify-between items-center">
            <span className="font-mono-hud text-[9px] sm:text-[10px] tracking-[0.16em] text-white/60">
              SCROLL PROGRESS
            </span>
            <span className="font-mono-hud text-[9px] sm:text-[10px] tracking-[0.14em] font-semibold text-white">
              {Math.round(progress * 100)}%
            </span>
          </div>
          <div className="h-[3px] w-full rounded-full overflow-hidden bg-white/20">
            <div
              className="h-full bg-[#008068] transition-all duration-75"
              style={{ width: `${Math.max(4, Math.min(100, progress * 100))}%` }}
            />
          </div>
        </div>

        {/* Right: Large Architectural 24/7 figure */}
        <div className="flex flex-col items-end">
          <span className="font-mono-hud text-[clamp(2.6rem,5.5vw,5rem)] font-light leading-none tracking-[-0.03em] text-[#008068] drop-shadow-md select-none">
            {HERO_CONTENT.emergencyFigure}
          </span>
          <span className="font-mono-hud text-[9px] sm:text-[10px] tracking-[0.22em] text-white/80 uppercase mt-0.5 bg-black/35 px-2 py-0.5 rounded">
            ALWAYS OPEN &bull; ACCREDITED
          </span>
        </div>
      </div>
    </div>
  );
}
