"use client";

/**
 * LIFECARE CINEMATIC SCROLL SEQUENCE:
 * "16:9 Auto-Crossfade Hero Card → Connecting Divider → Clock Dial → Seamless Portal Transition"
 * 
 * SPECIFICATIONS:
 * 1. Background: Deep forest emerald (#031d16) with subtle ambient glow and architectural dot grid.
 * 2. 16:9 Hero Container:
 *    - Positioned with ~1cm emerald green margin/border visible around both edges.
 *    - Seamless automatic crossfade between Image 1 (infant hand held) & Image 2 (inpatient bed prep).
 *    - Both images occupy the exact same spot with center-aligned typography:
 *      "Because care should always feel personal".
 * 3. 1-Line Connecting Divider linking the Hero card directly to the Circle Dial layer.
 * 4. Radial Clock Dial:
 *    - Gauge face artwork (seq-healthcare-clock-gauge.jpg), center pivot.
 *    - Rotating needle (-60deg to +100deg).
 *    - Orbiting aperture donut dot (+30deg to +140deg, scaling 1.0 -> 1.8x).
 * 5. Tight, Seamless Transition (No Blank Pages):
 *    - Scroll length tightly tuned to +=130% (zero dead space, zero blank green screens).
 *    - Circle dial centers precisely using live offsetTop calculations.
 *    - Zoom transitions cleanly into the #fcfcfc background of SpecialismShowcase.
 */

export const TUNABLES = {
  SCROLL_LENGTH: "+=130%",
  SCROLL_LENGTH_MOBILE: "+=100%",
  HAND_START: -60, // deg (approx 10 o'clock)
  HAND_END: 100,   // deg (approx 3-4 o'clock)
  DOT_START: 30,   // deg
  DOT_END: 140,    // deg
  DOT_SCALE: 1.8,
  ZOOM_EASE: "power2.in",
};

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const captionBarRef = useRef<HTMLDivElement>(null);

  // The Connected Stack Container
  const stackRef = useRef<HTMLDivElement>(null);

  // 16:9 Hero Card Ref & Layer 4 (Circle Dial) Ref
  const heroCardRef = useRef<HTMLDivElement>(null);
  const layer4Ref = useRef<HTMLDivElement>(null);

  const handRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const portalMaskRef = useRef<HTMLDivElement>(null);

  // Automatic crossfade state between the two 16:9 images
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev === 0 ? 1 : 0));
    }, 4000); // Crossfades smoothly every 4 seconds in the exact same spot
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !stageRef.current || !stackRef.current) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    const ctx = gsap.context(() => {
      const mobile = window.innerWidth < 768;
      const scrollLength = mobile ? TUNABLES.SCROLL_LENGTH_MOBILE : TUNABLES.SCROLL_LENGTH;

      // Master scrubbing timeline on the pinned stage (tight scroll distance, NO blank pages)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: scrollLength,
          scrub: 0.6,
          pin: stageRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Calculate exact dimensions and live offsets to ensure 100% dead-center alignment
      const heroH = heroCardRef.current?.offsetHeight || 500;
      const circleH = layer4Ref.current?.offsetHeight || 400;
      const circleOffsetTop = layer4Ref.current?.offsetTop || (heroH + 60);

      // Vertical centering coordinates:
      const heroCenterY = Math.max(30, (window.innerHeight - heroH) / 2);
      const circleCenterY = (window.innerHeight - circleH) / 2 - circleOffsetTop;

      // INITIAL POSITIONS:
      // Hero card starts centered in the viewport
      gsap.set(stackRef.current, { y: heroCenterY });
      gsap.set(handRef.current, { rotation: TUNABLES.HAND_START, transformOrigin: "0% 50%" });
      gsap.set(orbitRef.current, { rotation: TUNABLES.DOT_START, transformOrigin: "50% 50%" });
      gsap.set(dotRef.current, { scale: 1 });
      gsap.set(layer4Ref.current, { scale: 1 });
      gsap.set(portalMaskRef.current, { clipPath: "circle(0% at 50% 50%)", opacity: 0 });

      // 1. 0.00 -> 0.20: Hero Card rests centered in viewport as user starts scrolling
      // 2. 0.20 -> 0.55: Stack smoothly glides upward so the Circle Dial reaches the exact center
      tl.to(
        stackRef.current,
        { y: circleCenterY, ease: "power2.inOut", duration: 0.35 },
        0.20
      );

      // 3. 0.45 -> 0.75: Clock Dial Needle & Donut Orbit (Signature Animation)
      tl.to(
        handRef.current,
        { rotation: TUNABLES.HAND_END, ease: "none", duration: 0.30 },
        0.45
      );
      tl.to(
        orbitRef.current,
        { rotation: TUNABLES.DOT_END, ease: "none", duration: 0.30 },
        0.45
      );
      tl.to(
        dotRef.current,
        { scale: TUNABLES.DOT_SCALE, ease: "none", duration: 0.30 },
        0.45
      );

      // 4. 0.75 -> 1.00: Aperture zoom seamlessly dissolves into #fcfcfc (SpecialismShowcase)
      tl.to(
        layer4Ref.current,
        {
          scale: mobile ? 22 : 36,
          ease: TUNABLES.ZOOM_EASE,
          duration: 0.25,
        },
        0.75
      );
      tl.to(
        portalMaskRef.current,
        {
          opacity: 1,
          clipPath: "circle(150% at 50% 50%)",
          ease: TUNABLES.ZOOM_EASE,
          duration: 0.25,
        },
        0.75
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className="relative w-full bg-[#031d16] text-white overflow-hidden border-t border-[#008068]/30">
      {/* ====================================================================
          PINNED STAGE (ScrollTrigger pin)
          ==================================================================== */}
      <section id="seq" ref={containerRef} className="relative w-full">
        <div
          ref={stageRef}
          className="seq__stage relative w-full h-screen overflow-hidden bg-[#031d16] flex flex-col justify-between select-none">
          {/* Ambient Texture in Deep Forest Emerald */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#008068]/20 rounded-full blur-[140px]" />
            <div className="absolute -bottom-20 right-10 w-[500px] h-[400px] bg-[#00d29d]/15 rounded-full blur-[120px]" />

            {/* Faint Architectural Dot Grid (24px spacing, 12% opacity) */}
            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage: "radial-gradient(#00d29d 1.2px, transparent 1.2px)",
                backgroundSize: "24px 24px",
              }}
            />
          </div>

          {/* Top Status Header Bar (All text white) */}
          <div className="relative z-10 w-full pt-4 sm:pt-6 px-4 sm:px-8 pointer-events-none">
            <div
              ref={captionBarRef}
              className="caption-bar w-full py-2.5 px-4 border border-[#008068]/40 bg-[#061812]/90 backdrop-blur-md rounded-xl flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-wider text-white uppercase shadow-lg">
              <div className="flex items-center gap-3">
                <span className="font-bold text-white tracking-widest">MENDLY</span>
                <span className="hidden sm:inline text-white/50">—</span>
                <span className="hidden sm:inline text-white">CLINICAL NETWORK &amp; EMERGENCY CARE 2026</span>
              </div>
              <div className="hidden md:flex items-center gap-6 text-white/90">
                <span className="text-white">[Clinical Infrastructure]</span>
                <span className="text-white">Specialty: Acute &amp; Surgical Care</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-white">TRIAGE ACTIVE</span>
                <span className="text-white font-bold">SYSTEM ↗</span>
              </div>
            </div>
          </div>

          {/* ====================================================================
              CONNECTED STACK:
              1. 16:9 Auto-Crossfade Hero Card (framed by ~1cm green border)
              2. 1-Line Connecting Divider
              3. Radial Clock Dial & Needle (Transition Portal)
              Gliding continuously upward into the circular transition portal
              ==================================================================== */}
          <div
            ref={stackRef}
            className="stack-column absolute left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-30"
            style={{ rowGap: "1px" }}>
            {/* 
              ------------------------------------------------------------------
              16:9 RATIO AUTO-CROSSFADING HERO CONTAINER
              Framed with ~1cm emerald green background around the edges
              ------------------------------------------------------------------
            */}
            <div
              ref={heroCardRef}
              className="relative w-[92vw] max-w-[1140px] aspect-[16/9] max-h-[62vh] p-2.5 sm:p-3.5 bg-[#061812] border border-[#008068]/50 rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex items-center justify-center overflow-hidden">
              {/* Inner 16:9 Image Frame surrounded by the ~1cm green border */}
              <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#031d16] border border-[#008068]/30">
                {/* Image 1: Infant Hand Held */}
                <div
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    activeSlide === 0 ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}>
                  <Image
                    src="/seq-hero-1.png"
                    alt="Because care should always feel personal - infant neonatal care"
                    fill
                    priority
                    className="object-cover object-center"
                  />
                </div>

                {/* Image 2: Hospital Bed Prep */}
                <div
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    activeSlide === 1 ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}>
                  <Image
                    src="/seq-hero-2.png"
                    alt="Because care should always feel personal - hospital inpatient bedside care"
                    fill
                    priority
                    className="object-cover object-center"
                  />
                </div>

                {/* Status Indicator Pill */}
                <div className="absolute bottom-3 right-4 z-20 flex items-center gap-2 bg-[#061812]/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#008068]/40 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-[#00d29d] animate-pulse shadow-[0_0_8px_#00d29d]" />
                  <span className="font-mono text-[9px] sm:text-[10px] text-white tracking-widest uppercase font-medium">
                    {activeSlide === 0 ? "01 / 02 • NEONATAL & PEDIATRIC" : "02 / 02 • INPATIENT SURGICAL CARE"}
                  </span>
                </div>
              </div>
            </div>

            {/* 1-Line Connecting Divider */}
            <div className="w-full max-w-[1140px] h-[1px] bg-[#008068]/40 my-3" />

            {/* 
              ------------------------------------------------------------------
              LAYER 4: Radial Healthcare Specialty Dial & Needle (Transition Portal)
              ------------------------------------------------------------------
            */}
            <div
              ref={layer4Ref}
              className="layer-4 clock relative w-[clamp(280px,32vw,440px)] aspect-square rounded-full bg-[#0a1a15] text-white border-2 border-[#008068]/50 shadow-[0_0_60px_rgba(0,128,104,0.35)] flex items-center justify-center overflow-visible my-4 sm:my-6">
              {/* Healthcare Dial Gauge Face (Uploaded Artwork) */}
              <div className="absolute inset-0 rounded-full overflow-hidden shadow-inner">
                <Image
                  src="/seq-healthcare-clock-gauge.jpg"
                  alt="Clinical specialties radial dial"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Center Pivot */}
              <div className="absolute w-3.5 h-3.5 rounded-full bg-[#0a1a15] z-30 shadow-md border-2 border-[#00d29d]" />

              {/* Rotating Needle / Hand (-60deg to +100deg) - Kept constant */}
              <div
                ref={handRef}
                className="hand absolute left-1/2 top-1/2 w-[42%] h-[2.5px] bg-[#00d29d] z-20 flex items-center justify-end origin-left shadow-[0_0_8px_#00d29d]">
                <div className="absolute right-4 -top-5 flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] text-white font-semibold whitespace-nowrap bg-[#0a1a15]/95 px-2 py-0.5 rounded shadow-md border border-[#008068]/60 backdrop-blur-xs">
                  <span>Care</span>
                  <span className="text-[#00d29d] font-bold">(Active)</span>
                </div>
              </div>

              {/* Rotating Orbit with Donut Dot (Small black round ball) - Kept constant */}
              <div
                ref={orbitRef}
                className="orbit absolute inset-0 rounded-full pointer-events-none flex items-center justify-end z-20">
                <div
                  ref={dotRef}
                  className="dot relative -mr-3.5 sm:-mr-4 w-7 sm:w-9 h-7 sm:h-9 rounded-full bg-[#0a1a15] border-2 border-[#00d29d] flex items-center justify-center shadow-[0_0_15px_rgba(0,210,157,0.4)] origin-center">
                  {/* Aperture Hole */}
                  <div className="dot__hole w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 rounded-full bg-white transition-all" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom subtle indicator */}
          <div className="relative z-10 w-full pb-4 px-6 flex justify-between items-center text-[11px] font-mono text-white/90 border-t border-[#008068]/30">
            <span className="text-white">[SCROLL TO ADVANCE SEQUENCE]</span>
            <span className="text-white font-bold">MENDLY / CLINICAL NETWORK 01</span>
          </div>
        </div>

        {/* ====================================================================
            PORTAL ZOOM EXPANSION (Expands directly into #fcfcfc of SpecialismShowcase)
            Zero blank black screens, seamless white aperture reveal
            ==================================================================== */}
        <div
          ref={portalMaskRef}
          className="portal-mask absolute inset-0 z-50 pointer-events-none bg-[#fcfcfc]"
          style={{ clipPath: "circle(0% at 50% 50%)" }}
          aria-hidden="true"
        />
      </section>
    </div>
  );
}
