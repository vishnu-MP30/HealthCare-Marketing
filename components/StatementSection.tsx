"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Words and inline illustrations matching the exact reference structure
const STATEMENT_PARAGRAPHS = [
  {
    words: [
      { text: "Most" },
      { text: "brands" },
      { text: "enter" },
      { illustration: "walking" },
      { text: "adulthood" },
      { text: "as" },
      { text: "if" },
      { text: "they" },
      { text: "were" },
    ],
  },
  {
    words: [
      { text: "sitting" },
      { text: "down" },
      { text: "at" },
      { text: "a" },
      { text: "chessboard" },
      { text: "for" },
      { text: "the" },
      { text: "first" },
      { text: "time," },
    ],
  },
  {
    words: [
      { text: "without" },
      { text: "knowing" },
      { illustration: "reading" },
      { text: "the" },
      { text: "rules," },
      { text: "without" },
    ],
  },
  {
    words: [
      { text: "recognizing" },
      { text: "which" },
      { text: "pieces" },
      { text: "truly" },
      { text: "matter," },
      { text: "and" },
    ],
  },
  {
    words: [
      { text: "believing" },
      { text: "that" },
      { text: "hard" },
      { text: "work" },
      { text: "alone" },
      { text: "will" },
      { text: "be" },
      { text: "enough" },
    ],
  },
  {
    words: [
      { text: "to" },
      { text: "stay" },
      { illustration: "playing" },
      { text: "in" },
      { text: "the" },
      { text: "game." },
    ],
  },
];

export default function StatementSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const banknoteRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  // Live timestamp in emerald green matching reference
  const [currentTime, setCurrentTime] = useState("October 22, 2026, 9:21 AM");

  // Interactive 3D cursor physics for the floating banknote
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      setCurrentTime(now.toLocaleString("en-US", options));
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // Mouse move tilt effect across the entire section
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!banknoteRef.current) return;
    const rect = banknoteRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
    const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);
    setMousePos({ x: Math.max(-1.5, Math.min(1.5, deltaX)), y: Math.max(-1.5, Math.min(1.5, deltaY)) });
  };

  // Real-time word-by-word scroll highlighting
  const updateWordHighlights = useCallback(() => {
    if (!textContainerRef.current) return;

    const words = textContainerRef.current.querySelectorAll<HTMLElement>(".hl-word");
    const readingLine = window.innerHeight * 0.62; // 62% from top of viewport

    words.forEach((el) => {
      const rect = el.getBoundingClientRect();
      // If the top of the word has reached or passed the reading line, illuminate to solid black
      if (rect.top <= readingLine) {
        el.style.color = "#000000";
        el.style.opacity = "1";
      } else {
        // Unreached words remain in muted highlight color
        el.style.color = "rgba(0, 0, 0, 0.22)";
        el.style.opacity = "0.75";
      }
    });

    // Also update inline illustrations
    const icons = textContainerRef.current.querySelectorAll<HTMLElement>(".hl-icon");
    icons.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= readingLine) {
        el.style.opacity = "1";
        el.style.filter = "none";
      } else {
        el.style.opacity = "0.25";
        el.style.filter = "grayscale(1)";
      }
    });
  }, []);

  useEffect(() => {
    // Initial evaluation
    updateWordHighlights();

    // Listen to scroll & resize events
    window.addEventListener("scroll", updateWordHighlights, { passive: true });
    window.addEventListener("resize", updateWordHighlights, { passive: true });

    // Also register with ScrollTrigger if active
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.addEventListener("refresh", updateWordHighlights);
    }

    return () => {
      window.removeEventListener("scroll", updateWordHighlights);
      window.removeEventListener("resize", updateWordHighlights);
      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.removeEventListener("refresh", updateWordHighlights);
      }
    };
  }, [updateWordHighlights]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative w-full overflow-hidden select-none"
    >
      {/* ====================================================================
          1. TOP METADATA STRIP (Grid-Aligned, matching Reference 1)
          ==================================================================== */}
      <div className="w-full border-t border-b border-[rgba(0,0,0,0.09)] py-3 px-6 sm:px-10 lg:px-16 text-xs font-mono tracking-wide">
        <div className="max-w-[1600px] mx-auto grid grid-cols-2 md:grid-cols-5 items-center gap-4 text-black">
          {/* Column 1 */}
          <div className="font-serif-display font-bold text-sm text-black">
            VELORA Studio.
          </div>

          {/* Column 2 */}
          <div className="hidden sm:block font-serif italic text-xs text-[#484848]">
            The Principles of Wealth &amp; Brand.
          </div>

          {/* Column 3: Center Scroll Indicator */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-center justify-center text-center">
            <span className="font-serif italic text-[11px] text-[#484848]/80 block">
              Monograph // Edition 2026
            </span>
            <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-neutral-500">
              <svg width="12" height="18" viewBox="0 0 12 18" fill="none" className="text-black inline">
                <rect x="0.75" y="0.75" width="10.5" height="16.5" rx="5.25" stroke="currentColor" strokeWidth="1.2"/>
                <line x1="6" y1="4" x2="6" y2="7.5" stroke="#008068" strokeWidth="1.5" strokeLinecap="round" className="animate-pulse"/>
              </svg>
              <span>Scroll to read</span>
            </div>
          </div>

          {/* Column 4: Live Timestamp in Brand Emerald Green */}
          <div className="hidden md:block text-right font-medium text-[#008068] tracking-wider">
            {currentTime}
          </div>

          {/* Column 5: Location */}
          <div className="text-right font-serif-display font-bold text-xs text-black">
            New York / London
          </div>
        </div>
      </div>

      {/* Grid margin coordinates along vertical grid lines */}
      <div className="pointer-events-none absolute right-6 sm:right-12 top-24 font-sans text-[11px] font-semibold text-[#008068]">
        N
      </div>
      <div className="pointer-events-none absolute right-6 sm:right-12 top-96 font-sans text-[11px] font-semibold text-[#008068]">
        S
      </div>

      {/* Scattered pencil notations along grid intersections (matching reference) */}
      <div className="pointer-events-none absolute left-[32%] top-8 font-serif italic text-xs text-[#484848]/50 hidden lg:block">
        d6
      </div>
      <div className="pointer-events-none absolute left-[48%] top-12 font-serif italic text-xs text-[#484848]/50 hidden lg:block">
        a4
      </div>
      <div className="pointer-events-none absolute right-[28%] top-8 font-serif italic text-xs text-[#484848]/50 hidden lg:block">
        O--O
      </div>
      <div className="pointer-events-none absolute right-[18%] top-16 font-serif italic text-xs text-[#484848]/50 hidden lg:block">
        W6
      </div>

      {/* ====================================================================
          2. CORE EDITORIAL STATEMENT WITH PROGRESSIVE SCROLL HIGHLIGHT
          ==================================================================== */}
      <div className="relative w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 pt-16 sm:pt-24 pb-28 sm:pb-36">
        
        {/* 
          INTERACTIVE FLOATING BANKNOTE (Tactile Cursor Hover / Point Animation)
          Overlaps the upper left quadrant of the grid and text
        */}
        <div
          ref={banknoteRef}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="absolute left-4 sm:left-10 lg:left-14 -top-8 sm:-top-12 z-20 w-[140px] sm:w-[190px] md:w-[230px] aspect-square pointer-events-auto cursor-grab transition-all duration-300 ease-out"
          style={{
            transform: `perspective(900px) rotateX(${mousePos.y * -28}deg) rotateY(${mousePos.x * 28}deg) translate3d(${mousePos.x * 32}px, ${mousePos.y * 32}px, ${isHovering ? 45 : 10}px) scale(${isHovering ? 1.08 : 1}) rotate(-14deg)`,
            filter: `drop-shadow(${mousePos.x * -20 + 8}px ${mousePos.y * 20 + 22}px ${isHovering ? 36 : 24}px rgba(0,0,0,${isHovering ? 0.28 : 0.20}))`,
          }}
          title="Interactive Studio Monograph Currency Note"
        >
          <div className="relative w-full h-full animate-[float_6s_ease-in-out_infinite]">
            <Image
              src="/velora-banknote.png"
              alt="Velora Currency Banknote"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 640px) 140px, (max-width: 1024px) 190px, 230px"
            />
          </div>
        </div>

        {/* 
          The Large Serif Statement Paragraph:
          Progressive word-by-word scroll highlighting matching Reference Image 2
        */}
        <div
          ref={textContainerRef}
          className="relative z-10 font-serif-display font-normal text-left text-[clamp(1.9rem,3.8vw,4.1rem)] leading-[1.32] tracking-[-0.015em] max-w-[1300px] mx-auto space-y-2 sm:space-y-4"
        >
          {STATEMENT_PARAGRAPHS.map((para, pIdx) => (
            <p key={pIdx} className="flex flex-wrap items-baseline gap-x-[0.24em] leading-[1.32]">
              {para.words.map((item, wIdx) => {
                // If it's an inline illustration
                if (item.illustration === "walking") {
                  return (
                    <span
                      key={wIdx}
                      className="hl-icon inline-flex self-center px-1.5 transition-all duration-300 ease-out"
                      style={{ opacity: 0.25, filter: "grayscale(1)" }}
                    >
                      <svg width="24" height="34" viewBox="0 0 24 34" fill="none" className="text-black inline-block">
                        <circle cx="12" cy="5" r="3" fill="currentColor"/>
                        <path d="M8 9H16L17 21H14L13 14H11L10 21H7L8 9Z" fill="currentColor"/>
                        <line x1="9" y1="21" x2="9" y2="31" stroke="currentColor" strokeWidth="1.5"/>
                        <line x1="15" y1="21" x2="15" y2="31" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                    </span>
                  );
                }
                if (item.illustration === "reading") {
                  return (
                    <span
                      key={wIdx}
                      className="hl-icon inline-flex self-center px-1.5 transition-all duration-300 ease-out"
                      style={{ opacity: 0.25, filter: "grayscale(1)" }}
                    >
                      <svg width="26" height="30" viewBox="0 0 26 30" fill="none" className="text-black inline-block">
                        <circle cx="13" cy="5" r="3" fill="currentColor"/>
                        <path d="M7 10H19L20 22H16L15 15H11L10 22H6L7 10Z" fill="currentColor"/>
                        <rect x="5" y="22" width="16" height="6" fill="#181818" rx="1"/>
                      </svg>
                    </span>
                  );
                }
                if (item.illustration === "playing") {
                  return (
                    <span
                      key={wIdx}
                      className="hl-icon inline-flex self-center px-1.5 transition-all duration-300 ease-out"
                      style={{ opacity: 0.25, filter: "grayscale(1)" }}
                    >
                      <svg width="28" height="24" viewBox="0 0 28 24" fill="none" className="text-black inline-block">
                        <circle cx="8" cy="6" r="3" fill="currentColor"/>
                        <path d="M4 11C4 11 7 10 9 11L12 18H5L4 11Z" fill="currentColor"/>
                        <rect x="13" y="14" width="12" height="4" rx="1" fill="#008068"/>
                        <line x1="13" y1="18" x2="13" y2="22" stroke="currentColor" strokeWidth="1.2"/>
                        <line x1="25" y1="18" x2="25" y2="22" stroke="currentColor" strokeWidth="1.2"/>
                      </svg>
                    </span>
                  );
                }

                // Regular word
                return (
                  <span
                    key={wIdx}
                    className="hl-word inline-block transition-colors duration-300 ease-out"
                    style={{ color: "rgba(0, 0, 0, 0.22)", opacity: 0.75 }}
                  >
                    {item.text}
                  </span>
                );
              })}
            </p>
          ))}
        </div>
      </div>

      {/* ====================================================================
          3. MONOGRAPH PUBLICATION SHOWCASE (Reference Image 3)
          ==================================================================== */}
      <div className="relative w-full border-t border-[rgba(0,0,0,0.09)] py-16 sm:py-24 px-6 sm:px-12 lg:px-16">
        <div className="max-w-[1500px] mx-auto">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-10 border-b border-[rgba(0,0,0,0.09)] mb-12">
            <div className="flex items-baseline gap-3">
              <span className="font-serif-display font-bold text-2xl text-black">
                The Monograph.
              </span>
              <span className="font-serif italic text-sm text-[#484848]">
                12 Selected Case Studies. 3 Formats. One Story.
              </span>
            </div>
            <div className="font-mono text-xs text-[#008068] tracking-widest uppercase font-semibold">
              // STUDIO PUBLICATION 2026
            </div>
          </div>

          {/* Book Showcase Grid Container */}
          <div className="relative w-full aspect-[16/9] max-h-[700px] rounded-sm overflow-hidden flex items-center justify-center">
            <Image
              src="/velora-monograph.png"
              alt="The Art of Brand Distinction Monograph Book by VELORA Studio"
              fill
              className="object-contain filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.14)]"
              sizes="(max-width: 1200px) 100vw, 1500px"
              priority
            />
          </div>

          {/* Bottom Action strip */}
          <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-[rgba(0,0,0,0.09)] mt-10">
            <p className="font-serif italic text-sm text-[#484848]">
              Printed in limited release. Bound in emerald linen with foil-embossed plates.
            </p>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full border border-black px-6 py-2.5 text-xs font-semibold tracking-wider uppercase text-black hover:bg-[#008068] hover:border-[#008068] hover:text-white transition-all"
            >
              <span>Order Monograph Edition</span>
              <span className="text-xs transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
