"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { JOURNEY_FLOW_DATA } from "@/content/journey";
import SectorRail from "./SectorRail";
import PathwayCanvas from "./PathwayCanvas";

export default function JourneyFlow() {
  const [activeSectorId, setActiveSectorId] = useState(
    JOURNEY_FLOW_DATA.sectors[0].id
  );
  const [selectionTick, setSelectionTick] = useState(0);
  const [autoplayProgress, setAutoplayProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const manualTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeSector =
    JOURNEY_FLOW_DATA.sectors.find((s) => s.id === activeSectorId) ||
    JOURNEY_FLOW_DATA.sectors[0];

  const totalSectors = JOURNEY_FLOW_DATA.sectors.length;
  const currentSectorIndex = JOURNEY_FLOW_DATA.sectors.findIndex(
    (s) => s.id === activeSectorId
  );

  // IntersectionObserver to only autoplay when in viewport (>= 35% visible)
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.35 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Autoplay progression interval
  useEffect(() => {
    if (!isPlaying || isHovered || !isInView) return;

    const intervalTime = 50; // update progress every 50ms
    const totalDuration = 4800; // 4.8 seconds per sector
    const stepIncrement = (intervalTime / totalDuration) * 100;

    const timer = setInterval(() => {
      setAutoplayProgress((prev) => {
        if (prev>= 100) {
          // Advance to next sector
          const nextIndex = (currentSectorIndex + 1) % totalSectors;
          setActiveSectorId(JOURNEY_FLOW_DATA.sectors[nextIndex].id);
          setSelectionTick((t) => t + 1);
          return 0;
        }
        return prev + stepIncrement;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, isInView, currentSectorIndex, totalSectors]);

  // Handle manual sector selection: always plays immediately and restarts timeline on re-click
  const handleSelectSector = useCallback((sectorId: string) => {
    setActiveSectorId(sectorId);
    setSelectionTick((t) => t + 1);
    setAutoplayProgress(0);

    // Pause autoplay for 8 seconds after manual user interaction
    setIsPlaying(false);
    if (manualTimerRef.current) clearTimeout(manualTimerRef.current);
    manualTimerRef.current = setTimeout(() => {
      setIsPlaying(true);
    }, 8000);
  }, []);

  // Handle Pause/Play toggle
  const handleTogglePlay = useCallback(() => {
    if (manualTimerRef.current) clearTimeout(manualTimerRef.current);
    setIsPlaying((prev) => !prev);
  }, []);

  return (
    <section
      ref={containerRef}
      id="careflow-pathways"
      aria-label="Interactive Careflow Pathways"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      className="relative w-full py-16 sm:py-20 px-4 sm:px-6 md:px-10 lg:px-12 overflow-hidden bg-[#fbf6f1] select-none border-b border-[#e6ddd4]">
      {/* 1. BACKGROUND TEXTURE: Soft Peach / Emerald Glow + Architectural Dot Grid */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 right-1/4 w-[500px] h-[500px] bg-[#e6f4ea]/60 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 left-1/4 w-[450px] h-[450px] bg-[#faebe0]/70 rounded-full blur-3xl" />

        {/* Faint Architectural Dot Grid (24px spacing, 8% opacity) */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(#004d40 1.2px, transparent 1.2px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1480px]">
        {/* 2. SECTION EYEBROW & TITLE */}
        <div className="mb-8 sm:mb-10">
          <p className="font-mono text-xs sm:text-[12px] tracking-[0.2em] uppercase text-[#008068] font-bold mb-2.5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#008068]" />
            {JOURNEY_FLOW_DATA.sectionEyebrow}
          </p>
          <h2 className="font-grotesque text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#11241c] tracking-tight leading-[0.96] max-w-4xl">
            {JOURNEY_FLOW_DATA.sectionTitle}
            <span className="font-serif-accent font-normal italic text-[#008068] inline-block px-1">
              {JOURNEY_FLOW_DATA.sectionHighlight}
            </span>
          </h2>
        </div>

        {/* 3. TWO-ZONE INTERACTIVE FLOW DIAGRAM (Compact 520-580px layout, zero horizontal overflow) */}
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8 bg-white/45 backdrop-blur-xs p-5 sm:p-7 lg:p-8 rounded-[28px] border border-white/70 shadow-[0_12px_44px_rgba(0,0,0,0.03)] min-h-[520px] max-w-full overflow-visible">
          {/* LEFT ZONE: Sector Rail (System of Record, ~28% width) */}
          <div className="shrink-0 w-full lg:w-auto">
            <SectorRail
              sectors={JOURNEY_FLOW_DATA.sectors}
              activeSectorId={activeSectorId}
              onSelectSector={handleSelectSector}
              autoplayProgress={autoplayProgress}
              isPlaying={isPlaying}
              onTogglePlay={handleTogglePlay}
              systemOfRecordLabel={JOURNEY_FLOW_DATA.systemOfRecordLabel}
            />
          </div>

          {/* RIGHT ZONE: Pathway Track (System of Action, exactly 3 columns) */}
          <div className="flex-1 w-full min-w-0 overflow-visible">
            <PathwayCanvas
              key={`${activeSector.id}-${selectionTick}`}
              sector={activeSector}
              systemOfActionLabel={JOURNEY_FLOW_DATA.systemOfActionLabel}
              selectionTick={selectionTick}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
