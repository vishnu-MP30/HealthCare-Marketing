"use client";

import React from "react";
import { Play, Pause } from "lucide-react";

interface AutoplayIndicatorProps {
  totalSectors: number;
  activeIndex: number;
  progressPercent: number; // 0 to 100
  isPlaying: boolean;
  onTogglePlay: () => void;
  onSelectIndex: (index: number) => void;
}

export default function AutoplayIndicator({
  totalSectors,
  activeIndex,
  progressPercent,
  isPlaying,
  onTogglePlay,
  onSelectIndex,
}: AutoplayIndicatorProps) {
  return (
    <div className="flex items-center gap-3 pt-4 select-none">
      {/* 4 Sector Indicators */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalSectors }).map((_, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectIndex(idx)}
              aria-label={`Jump to sector ${idx + 1}`}
              className="relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[#008068] rounded-full p-1 -m-1">
              {isActive ? (
                // Active Expanding Pill with Filling Progress Bar
                <div className="relative h-2 w-7 sm:w-8 rounded-full bg-[#d0ded6] overflow-hidden">
                  <div
                    className="h-full bg-[#008068] transition-all duration-75 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              ) : (
                // Inactive Dot
                <div className="h-2 w-2 rounded-full bg-[#c0d0c6] hover:bg-[#88a896] transition-colors" />
              )}
            </button>
          );
        })}
      </div>

      {/* Accessible Play/Pause Toggle Button (WCAG 2.2.2) */}
      <button
        type="button"
        onClick={onTogglePlay}
        className="w-6 h-6 rounded-full bg-white/70 hover:bg-white border border-[#d0ded6] text-[#008068] flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#008068] shadow-xs"
        aria-label={isPlaying ? "Pause automated sector rotation" : "Start automated sector rotation"}
        title={isPlaying ? "Pause autoplay" : "Resume autoplay"}>
        {isPlaying ? (
          <Pause className="w-3 h-3 fill-[#008068]" />
        ) : (
          <Play className="w-3 h-3 fill-[#008068] ml-0.5" />
        )}
      </button>
    </div>
  );
}
