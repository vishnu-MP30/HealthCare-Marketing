"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function RecoveryConnectionSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const windowH = window.innerHeight;
          const totalScrollDistance = rect.height - windowH;
          if (totalScrollDistance <= 0) return;

          // How far into the section we have scrolled
          const scrolled = -rect.top;
          const rawProgress = scrolled / totalScrollDistance;
          // Clamp between 0 and 1
          const clamped = Math.max(0, Math.min(1, rawProgress));
          setProgress(clamped);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Smooth ease function for natural kinetic movement
  const easeProgress = (t: number) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const p = easeProgress(progress);

  // Patient hand (bottom-left) movement:
  // Starts pushed down-left, moves to center pointing position
  const patientTranslateX = (1 - p) * -38; // percentage
  const patientTranslateY = (1 - p) * 38;  // percentage

  // Surgeon hand (top-right) movement:
  // Starts pushed up-right, moves to center pointing position
  const surgeonTranslateX = (1 - p) * 38;  // percentage
  const surgeonTranslateY = (1 - p) * -38; // percentage

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[250vh] bg-[#071726] select-none"
      aria-label="Patient Recovery Connection"
    >
      {/* ====================================================================
          STICKY FULLSCREEN VIEWPORT (Pinned for the entire scroll length)
          ==================================================================== */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-6 sm:p-10 lg:p-14 bg-gradient-to-br from-[#0c263d] via-[#091e30] to-[#05111c]">
        {/* Soft radial spotlight centered behind hands */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(20, 80, 128, 0.4) 0%, rgba(7, 23, 38, 0.8) 75%, #05111c 100%)",
          }}
        />

        {/* Subtle hospital architectural ambient lines */}
        <svg
          className="absolute inset-0 w-full h-full fill-none opacity-15 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1440 900"
        >
          <path
            d="M 0,450 C 400,380 900,520 1440,450"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="1"
          />
        </svg>

        {/* ====================================================================
            TOP TECHNICAL TELEMETRY HEADER (Matching Reference)
            ==================================================================== */}
        <div className="relative z-10 w-full flex items-start justify-between text-white/80 font-mono text-[10px] sm:text-xs tracking-widest uppercase">
          {/* Top Left Indicators */}
          <div className="flex items-center gap-6 sm:gap-10">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-white inline-block" />
              007
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-white inline-block" />
              OUR PROMISE
            </span>
          </div>

          {/* Top Right Post-Op Vitals / Telemetry */}
          <div className="text-right space-y-1 font-mono text-[10px] sm:text-[11px] leading-tight text-white/70">
            <div className="flex justify-between gap-6">
              <span className="text-white/40">PAIN LEVEL</span>
              <span className="text-white font-medium">1 / 10</span>
            </div>
            <div className="flex justify-between gap-6">
              <span className="text-white/40">RANGE OF MOTION</span>
              <span className="text-white font-medium">142°</span>
            </div>
            <div className="flex justify-between gap-6">
              <span className="text-white/40">LOAD BEARING</span>
              <span className="text-emerald-400 font-medium">FULL</span>
            </div>
            <div className="flex justify-between gap-6">
              <span className="text-white/40">GAIT SYMMETRY</span>
              <span className="text-white font-medium">98.4%</span>
            </div>
            <div className="flex justify-between gap-6">
              <span className="text-white/40">STATUS</span>
              <span className="text-emerald-400 font-semibold tracking-wider">
                RECOVERED
              </span>
            </div>
          </div>
        </div>

        {/* ====================================================================
            CENTER HERO TITLE: "Care // Always" (Amber/Gold bold typography)
            ==================================================================== */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 px-4">
          <h2
            className="font-sans font-black tracking-[-0.04em] text-[#FFA439] opacity-85 select-none leading-none text-center whitespace-nowrap"
            style={{
              fontSize: "clamp(56px, 11vw, 200px)",
              textShadow: "0 10px 40px rgba(0, 0, 0, 0.4)",
            }}
          >
            Care // Always
          </h2>
        </div>

        {/* ====================================================================
            INTERACTIVE REACHING HANDS LAYER
            Scroll-driven convergence toward center
            ==================================================================== */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          {/* BOTTOM-LEFT: Patient Bare Hand Reaching Up-Right */}
          <div
            className="absolute -bottom-10 -left-10 sm:-bottom-14 sm:-left-14 w-[500px] h-[500px] sm:w-[650px] sm:h-[650px] lg:w-[800px] lg:h-[800px] transition-transform duration-75 ease-out will-change-transform"
            style={{
              transform: `translate3d(${patientTranslateX}%, ${patientTranslateY}%, 0)`,
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src="/patient-hand.png"
                alt="Patient hand reaching up towards recovery"
                fill
                priority
                sizes="(max-width: 768px) 500px, 800px"
                className="object-contain object-bottom-left filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
              />
            </div>
          </div>

          {/* TOP-RIGHT: Surgeon Gloved Hand Reaching Down-Left */}
          <div
            className="absolute -top-10 -right-10 sm:-top-14 sm:-right-14 w-[520px] h-[520px] sm:w-[680px] sm:h-[680px] lg:w-[850px] lg:h-[850px] transition-transform duration-75 ease-out will-change-transform"
            style={{
              transform: `translate3d(${surgeonTranslateX}%, ${surgeonTranslateY}%, 0)`,
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src="/surgeon-hand.png"
                alt="Surgeon gloved hand reaching down to support patient"
                fill
                priority
                sizes="(max-width: 768px) 520px, 850px"
                className="object-contain object-top-right filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
              />
            </div>
          </div>
        </div>

        {/* ====================================================================
            BOTTOM TECHNICAL TELEMETRY FOOTER (Matching Reference)
            ==================================================================== */}
        <div className="relative z-10 w-full flex items-end justify-between text-white/70 font-mono text-[10px] sm:text-xs tracking-wider">
          {/* Bottom Left Vitals */}
          <div className="space-y-1 leading-tight">
            <div className="flex gap-4">
              <span className="text-white/40">POST-OP DAY</span>
              <span className="text-white font-medium">42</span>
            </div>
            <div className="flex gap-4">
              <span className="text-white/40">PHYSIO SESSIONS</span>
              <span className="text-white font-medium">12 / 12</span>
            </div>
            <div className="flex gap-4">
              <span className="text-white/40">SURGEON REVIEW</span>
              <span className="text-emerald-400 font-medium">SIGNED OFF</span>
            </div>
            <div className="flex gap-4">
              <span className="text-white/40">FOLLOW-UP</span>
              <span className="text-white font-medium">COMPLETE</span>
            </div>
            <div className="flex gap-4">
              <span className="text-white/40">PATIENT</span>
              <span className="text-emerald-400 font-medium">ACTIVE</span>
            </div>
          </div>

          {/* Bottom Right Scroll Indicator */}
          <div className="flex items-center gap-2 text-white/50 text-[10px] uppercase tracking-widest font-mono">
            <span>Scroll to connect</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
