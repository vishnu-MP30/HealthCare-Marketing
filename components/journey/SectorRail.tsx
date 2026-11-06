"use client";

import React, { useRef } from "react";
import { Sector } from "@/content/journey";
import AutoplayIndicator from "./AutoplayIndicator";
import { Home, UserCheck, Activity, Video } from "lucide-react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Flip);
}

interface SectorRailProps {
  sectors: Sector[];
  activeSectorId: string;
  onSelectSector: (sectorId: string) => void;
  autoplayProgress: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
  systemOfRecordLabel: string;
}

export default function SectorRail({
  sectors,
  activeSectorId,
  onSelectSector,
  autoplayProgress,
  isPlaying,
  onTogglePlay,
  systemOfRecordLabel,
}: SectorRailProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const activeIndex = sectors.findIndex((s) => s.id === activeSectorId);
  const activeSector = sectors[activeIndex] || sectors[0];

  // Reorder for desktop rail: active on top
  const reorderedSectors = [
    activeSector,
    ...sectors.filter((s) => s.id !== activeSectorId),
  ];

  const handleSectorClick = (sectorId: string) => {
    if (containerRef.current) {
      const state = Flip.getState(
        containerRef.current.querySelectorAll(".sector-tab-item")
      );
      onSelectSector(sectorId);
      requestAnimationFrame(() => {
        if (containerRef.current) {
          Flip.from(state, {
            duration: 0.45,
            ease: "power3.inOut",
            stagger: 0.02,
            nested: true,
          });
        }
      });
    } else {
      onSelectSector(sectorId);
    }
  };

  const renderSectorIcon = (iconName: string, className = "w-3.5 h-3.5") => {
    switch (iconName) {
      case "home":
        return <Home className={className} />;
      case "userCheck":
        return <UserCheck className={className} />;
      case "activity":
        return <Activity className={className} />;
      case "video":
      default:
        return <Video className={className} />;
    }
  };

  return (
    <div className="flex flex-col gap-2.5 w-full lg:w-[270px] shrink-0">
      {/* Top Label */}
      <div className="flex items-center gap-2 mb-1">
        <span className="w-1.5 h-1.5 rounded-full bg-[#8c9e95]" />
        <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.16em] uppercase text-[#6f8278] font-semibold">
          {systemOfRecordLabel}
        </span>
      </div>

      {/* Responsive Tablist: 2x2 grid on mobile/tablet, vertical rail on desktop (>=1024px) */}
      <div
        ref={containerRef}
        role="tablist"
        aria-label="Healthcare Clinical Sectors"
        className="grid grid-cols-2 lg:flex lg:flex-col gap-2 relative w-full"
        id="sector-rail-container">
        {reorderedSectors.map((sector, index) => {
          const isActive = sector.id === activeSectorId;

          if (isActive) {
            return (
              /* ACTIVE EXPANDED SECTOR CARD */
              <div
                key={sector.id}
                data-flip-id={sector.id}
                role="tab"
                id={`sector-tab-${sector.id}`}
                aria-selected={true}
                aria-controls={`sector-panel-${sector.id}`}
                tabIndex={0}
                className="sector-tab-item col-span-2 lg:col-span-1 relative rounded-[18px] bg-white p-3.5 sm:p-4 shadow-[0_6px_20px_rgba(0,0,0,0.05)] border border-[#dce6e1] z-10 will-change-transform">
                {/* Sector Name Eyebrow */}
                <div className="flex items-center gap-1.5 text-[#008068] font-mono text-[9px] tracking-[0.16em] uppercase font-bold mb-1">
                  {renderSectorIcon(sector.iconName, "w-3 h-3 text-[#008068]")}
                  <span>{sector.name}</span>
                </div>

                {/* Subject Line */}
                <h3 className="text-xs sm:text-[13px] font-extrabold text-[#1a2e26] leading-tight tracking-tight">
                  {sector.subject}
                </h3>

                {/* Grey Meta Line */}
                <p className="text-[8px] sm:text-[9px] font-mono text-[#74877e] uppercase tracking-wider mt-1.5 font-medium">
                  {sector.meta}
                </p>
              </div>
            );
          }

          // Inactive compact item
          return (
            <button
              key={sector.id}
              data-flip-id={sector.id}
              type="button"
              role="tab"
              id={`sector-tab-${sector.id}`}
              aria-selected={false}
              aria-controls={`sector-panel-${sector.id}`}
              tabIndex={0}
              onClick={() => handleSectorClick(sector.id)}
              className="sector-tab-item flex items-center gap-2 p-2 sm:p-2.5 rounded-xl text-left bg-white/50 hover:bg-white/90 border border-transparent hover:border-[#dce6e1] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#008068] will-change-transform opacity-70 hover:opacity-100 transition-opacity">
              <div className="text-[#5f746a] shrink-0">
                {renderSectorIcon(sector.iconName, "w-3.5 h-3.5")}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-mono text-[8px] sm:text-[9px] tracking-wider uppercase text-[#5f746a] font-bold">
                  {sector.name}
                </span>
                <span className="text-[10px] text-[#40544a] font-medium leading-tight truncate">
                  {sector.subject.split("·")[0]}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Autoplay Controls */}
      <AutoplayIndicator
        totalSectors={sectors.length}
        activeIndex={activeIndex}
        progressPercent={autoplayProgress}
        isPlaying={isPlaying}
        onTogglePlay={onTogglePlay}
        onSelectIndex={(idx) => handleSectorClick(sectors[idx].id)}
      />
    </div>
  );
}
