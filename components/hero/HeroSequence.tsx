"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/**
 * ============================================================================
 * HERO CONFIGURATION & TUNABLE PARAMETERS
 * ============================================================================
 */
export const HERO_CONFIG = {
  brandName: "Mendly",
  brandLogo: "/lifecare logo.png",

  // Master Color Palette
  colors: {
    stageDarkTop: "#00201F",
    stageMidTeal: "#3F8A8F",
    stagePaleAqua: "#DCEEF2",
    panelDark: "#00504F",
    accentCoral: "#F25C5C",
    mutedAqua: "#8DE1DC",
    textWhite: "#FFFFFF",
  },

  // Tightened Timeline Progress Milestones (0.00 to 1.00) — No dead gaps
  timings: {
    sceneAEnd: 0.08,
    statementHoldEnd: 0.16,
    risingFrameEnd: 0.34,
    singleSphereEnd: 0.40,
    splitEnd: 0.50,
    rotateEnd: 0.58,
    scaleDownEnd: 0.64,
    manyBubblesEnd: 0.76,
    dropletsEnd: 0.82,
    vialZoomEnd: 0.89,
    pullBackEnd: 0.95,
    exitEnd: 1.00,
  },

  // Healthcare Content
  content: {
    sceneA: {
      headlineLine1: "Precision Care isn't discovered.",
      headlineLine2: "It's engineered.",
      subline: "Precision medicine in every molecule.",
      ctaPill: "Get in touch",
    },
    sceneB: {
      statementLine1: "A pure-play",
      statementLine2: "clinical biotherapy",
      statementLine3: "institute with an",
      statementLine4: "international track record.",
      subline: "Built to accelerate biosimilar development, from cell to sell.",
    },
    moleculeStage: {
      eyebrow: "WHAT WE DO",
      heading: "We produce impact-driven therapies. From concept to commercial supply.",
      statsStage1: [
        { label: "Approved products", value: "8" },
        { label: "Years of expertise", value: "25+" },
        { label: "Regulatory standards", value: "Global GMP · FDA · EMA · ICH" },
      ],
      statsStage2: [
        { label: "Operating from", value: "Zurich & Boston" },
        { label: "Commercial reach", value: "EU · US · Global Emerging" },
      ],
    },
    navLinks: [
      { label: "Company", href: "#approach" },
      { label: "Pipeline", href: "#specialism" },
      { label: "Partnerships", href: "#services" },
      { label: "Insights", href: "#reads" },
      { label: "Careers", href: "#testimonials" },
    ],
    contactCta: "Contact",
  },
};

/**
 * Photorealistic Water Molecule / Glass Droplet Component
 * Engineered to exactly match the reference liquid water droplet:
 * - Razor-thin luminous outer cyan/white Fresnel rim with crisp inner highlight
 * - Deep dark meniscus contour ring simulating liquid surface tension
 * - Radial spherical liquid volume with optical lensing
 * - Bottom luminous caustic focusing crescent
 * - Specular reflection arc glint at top and side (2 o'clock highlight)
 * - Concentric internal refractive caustic shell
 * - Optical backdrop-filter liquid refraction
 */
function Sphere({
  className = "",
  style = {},
  isLighter = false,
  showGlints = true,
}: {
  className?: string;
  style?: React.CSSProperties;
  isLighter?: boolean;
  showGlints?: boolean;
}) {
  return (
    <div
      className={`rounded-full relative pointer-events-none select-none overflow-hidden ${className}`}
      style={{
        background: isLighter
          ? "radial-gradient(circle at 50% 72%, rgba(180, 245, 255, 0.52) 0%, rgba(70, 165, 175, 0.40) 45%, rgba(20, 85, 92, 0.55) 75%, rgba(5, 45, 50, 0.75) 100%)"
          : "radial-gradient(circle at 50% 72%, rgba(150, 230, 240, 0.46) 0%, rgba(48, 140, 150, 0.36) 42%, rgba(12, 68, 75, 0.62) 72%, rgba(2, 34, 38, 0.82) 100%)",
        border: "1.5px solid rgba(220, 248, 255, 0.78)",
        boxShadow:
          "0 0 24px rgba(95, 210, 225, 0.32), 0 0 4px rgba(255, 255, 255, 0.4), inset 0 0 0 1.5px rgba(255, 255, 255, 0.65), inset 0 0 18px 4px rgba(0, 24, 28, 0.85), inset 0 -22px 38px rgba(160, 240, 250, 0.62), inset 0 18px 34px rgba(0, 20, 24, 0.72), inset 0 2px 6px rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(2px) contrast(1.08) brightness(1.04)",
        WebkitBackdropFilter: "blur(2px) contrast(1.08) brightness(1.04)",
        ...style,
      }}>
      {/* 1. Internal Secondary Refraction Ring */}
      <div
        className="absolute inset-[8px] rounded-full pointer-events-none"
        style={{
          border: "1px solid rgba(255, 255, 255, 0.22)",
          background:
            "radial-gradient(circle at 50% 82%, rgba(185, 248, 255, 0.32) 0%, rgba(55, 155, 165, 0.14) 40%, transparent 72%)",
        }}
      />

      {showGlints && (
        <>
          {/* 2. Top Razor Specular Reflection Arc */}
          <div
            className="absolute left-1/2 -translate-x-1/2 pointer-events-none rounded-full"
            style={{
              top: "4%",
              width: "38%",
              height: "9%",
              background:
                "radial-gradient(ellipse at 50% 25%, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.6) 35%, rgba(220, 250, 255, 0.15) 70%, transparent 100%)",
              filter: "blur(0.5px)",
            }}
          />

          {/* 3. Upper-Right Specular Crescent (2 o'clock highlight from reference) */}
          <div
            className="absolute pointer-events-none rounded-full"
            style={{
              top: "10%",
              right: "5%",
              width: "18%",
              height: "34%",
              transform: "rotate(26deg)",
              background:
                "radial-gradient(ellipse at 88% 50%, rgba(255, 255, 255, 0.88) 0%, rgba(215, 248, 255, 0.35) 45%, transparent 80%)",
              filter: "blur(0.7px)",
            }}
          />

          {/* 4. Bottom Caustic Luminous Pool Crescent */}
          <div
            className="absolute left-1/2 -translate-x-1/2 pointer-events-none rounded-full"
            style={{
              bottom: "2%",
              width: "68%",
              height: "22%",
              background:
                "radial-gradient(ellipse at 50% 85%, rgba(200, 252, 255, 0.68) 0%, rgba(125, 220, 235, 0.38) 50%, transparent 80%)",
              filter: "blur(2px)",
            }}
          />
        </>
      )}
    </div>
  );
}

/**
 * Vector Iridescent Hairline Overlap Lens SVG
 * Draws thin 2px stroked arcs along the intersection region with blue-to-orange gradient.
 * No filled blobs or thick glows.
 */
function OverlapLensSVG({
  width = 600,
  height = 600,
  className = "",
  style = {},
}: {
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none ${className}`}
      style={style}
      aria-hidden="true">
      <defs>
        <linearGradient id="lensIridescent" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5AA9FF" stopOpacity="0.75" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FF9A4D" stopOpacity="0.75" />
        </linearGradient>
      </defs>
      {/* Delicate crescent curve tracing Venn overlap boundary */}
      <path
        d="M 300 80 C 390 190 390 410 300 520"
        stroke="url(#lensIridescent)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}

/**
 * Clean accessible static fallback for users with prefers-reduced-motion
 */
function ReducedMotionStaticView() {
  const { content } = HERO_CONFIG;

  return (
    <section className="relative w-full py-24 px-6 bg-[#00201F] text-white">
      <div className="max-w-5xl mx-auto space-y-16">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#8DE1DC]">
            {HERO_CONFIG.brandName} • Clinical Biotherapeutics
          </span>
          <h1 className="mt-4 font-serif text-5xl sm:text-7xl leading-tight">
            {content.sceneA.headlineLine1} <br />
            <span className="italic">{content.sceneA.headlineLine2}</span>
          </h1>
          <p className="mt-6 text-lg text-white/80 max-w-2xl">{content.sceneA.subline}</p>
        </div>

        <div className="p-8 rounded-2xl bg-[#00504F] border border-white/15">
          <h2 className="font-serif text-3xl sm:text-4xl text-white">
            {content.sceneB.statementLine1} {content.sceneB.statementLine2} {content.sceneB.statementLine3} {content.sceneB.statementLine4}
          </h2>
          <p className="mt-4 text-[#8DE1DC]">{content.sceneB.subline}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {content.moleculeStage.statsStage1.map((s, idx) => (
            <div key={idx} className="border-t border-white/20 pt-4">
              <span className="text-xs text-white/60 uppercase">{s.label}</span>
              <div className="text-3xl font-serif text-white mt-1">{s.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Main Scroll-Driven Master Hero Sequence (Redesigned without dead-zones)
 */
export default function HeroSequence() {
  const containerRef = useRef<HTMLElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // References to animated DOM layers
  const sceneARef = useRef<HTMLDivElement>(null);
  const sceneATextRef = useRef<HTMLDivElement>(null);
  const sphereA1Ref = useRef<HTMLDivElement>(null);
  const sphereA2Ref = useRef<HTMLDivElement>(null);
  const idleSpheresGroupRef = useRef<HTMLDivElement>(null);
  const downArrowRef = useRef<HTMLButtonElement>(null);
  const ctaPillRef = useRef<HTMLAnchorElement>(null);

  const sceneBPanelRef = useRef<HTMLDivElement>(null);
  const sceneBContentWrapRef = useRef<HTMLDivElement>(null);
  const statementLinesRef = useRef<HTMLDivElement>(null);
  const bracketTLRef = useRef<HTMLDivElement>(null);
  const bracketTRRef = useRef<HTMLDivElement>(null);
  const bracketBLRef = useRef<HTMLDivElement>(null);
  const bracketBRRef = useRef<HTMLDivElement>(null);

  const risingMaskWrapRef = useRef<HTMLDivElement>(null);
  const moleculeStageRef = useRef<HTMLDivElement>(null);

  const singleSphereRef = useRef<HTMLDivElement>(null);
  const spherePairWrapperRef = useRef<HTMLDivElement>(null);
  const splitSphereLeftRef = useRef<HTMLDivElement>(null);
  const splitSphereRightRef = useRef<HTMLDivElement>(null);

  const bubblesGroupRef = useRef<HTMLDivElement>(null);
  const overlayTextRef = useRef<HTMLDivElement>(null);
  const statsListStage1Ref = useRef<HTMLDivElement>(null);
  const statsListStage2Ref = useRef<HTMLDivElement>(null);

  const vialEmergingWrapRef = useRef<HTMLDivElement>(null);
  const vialFrameWrapRef = useRef<HTMLDivElement>(null);
  const verticalRailsRef = useRef<HTMLDivElement>(null);

  // Step 4 & 5: White Section & "We know" Scene refs (Images 2, 3, 4, 5)
  const whiteSectionRef = useRef<HTMLDivElement>(null);
  const leftArcContainerRef = useRef<HTMLDivElement>(null);
  const mintSquareFrameRef = useRef<HTMLDivElement>(null);
  const whiteInnerCircleRef = useRef<HTMLDivElement>(null);
  const whiteVialImgRef = useRef<HTMLImageElement>(null);
  const weKnowHeadingWrapRef = useRef<HTMLDivElement>(null);
  const weKnowTitleRef = useRef<HTMLHeadingElement>(null);
  const weKnowRightBlockRef = useRef<HTMLDivElement>(null);
  const navPillWrapRef = useRef<HTMLElement>(null);
  const navLogoImgRef = useRef<HTMLImageElement>(null);

  // Smooth scroll down to Step 2 on down arrow click
  const handleScrollDown = () => {
    if (lenisRef.current) {
      const target = window.innerHeight * 1.2;
      lenisRef.current.scrollTo(target, { duration: 1.0 });
    } else {
      window.scrollTo({ top: window.innerHeight * 1.2, behavior: "smooth" });
    }
  };

  // Check prefers-reduced-motion
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // Main GSAP ScrollTrigger Sequence + Lenis Setup
  useLayoutEffect(() => {
    if (prefersReducedMotion || typeof window === "undefined") return;
    if (!containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);
    (window as unknown as { ScrollTrigger: typeof ScrollTrigger }).ScrollTrigger = ScrollTrigger;

    // 1. Initialize Lenis inside client component and sync with ScrollTrigger
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      syncTouch: false,
    });
    lenisRef.current = lenis;
    (window as unknown as { __lenis: Lenis }).__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // Subtle idle drift for Scene A spheres
      const idleTween = gsap.to(idleSpheresGroupRef.current, {
        y: "+=6",
        x: "+=4",
        scale: 1.012,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Pin length: end: "+=1150%" (desktop), "+=750%" (mobile)
      const isMobile = window.innerWidth < 768;
      const pinDistance = isMobile ? "+=750%" : "+=1150%";

      // Master scrubbed timeline with NO dead zones and ease: "none"
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: pinDistance,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (self.progress> 0.08) {
              idleTween.pause();
            } else {
              idleTween.play();
            }
          },
        },
      });

      // =======================================================================
      // 0.00 - 0.08: HERO SCENE EXIT + GREEN PANEL SLIDE-UP
      // Statement text starts fading in at 0.04 so content is ready before panel lands
      // =======================================================================
      tl.fromTo(
        sceneATextRef.current,
        { yPercent: 0, opacity: 1 },
        { yPercent: -40, opacity: 0, duration: 0.08, ease: "none" },
        0.00
      );

      tl.fromTo(
        idleSpheresGroupRef.current,
        { yPercent: 0 },
        { yPercent: -20, duration: 0.08, ease: "none" },
        0.00
      );

      tl.fromTo(
        [downArrowRef.current, ctaPillRef.current],
        { opacity: 1, y: 0 },
        { opacity: 0, y: 20, duration: 0.06, ease: "none" },
        0.00
      );

      // Solid dark-green panel (#00504F) slides up from bottom (yPercent 100 to 0)
      tl.fromTo(
        sceneBPanelRef.current,
        { yPercent: 100 },
        { yPercent: 0, duration: 0.08, ease: "none" },
        0.00
      );

      // Statement text lines start fading in at 0.04 and fully visible by 0.10
      const lines = statementLinesRef.current?.querySelectorAll(".statement-line");
      if (lines && lines.length> 0) {
        tl.fromTo(
          lines,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.06, stagger: 0.012, ease: "none" },
          0.04
        );
      }

      // Corner brackets fade in
      tl.fromTo(
        [bracketTLRef.current, bracketTRRef.current, bracketBLRef.current, bracketBRRef.current],
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.05, ease: "none" },
        0.05
      );

      // =======================================================================
      // 0.10 - 0.16: STATEMENT SECTION VISIBLE WITH SLOW UPWARD DRIFT (-4vh)
      // Never feels frozen or blank
      // =======================================================================
      tl.fromTo(
        sceneBContentWrapRef.current,
        { y: 0 },
        { y: "-4vh", duration: 0.06, ease: "none" },
        0.10
      );

      // Rising frame starts peeking up at bottom-center at 0.08
      tl.fromTo(
        risingMaskWrapRef.current,
        { xPercent: -50, yPercent: 75, rotation: 45, scale: 0.16, opacity: 1 },
        { xPercent: -50, yPercent: 55, rotation: 45, scale: 0.35, duration: 0.08, ease: "none" },
        0.08
      );

      // =======================================================================
      // 0.16 - 0.34: RISING FRAME EXPANSION (covers screen by 0.34)
      // Contains the molecule stage gradient + big sphere already visible.
      // Overlaps and pushes statement text up behind it.
      // =======================================================================
      tl.fromTo(
        risingMaskWrapRef.current,
        { xPercent: -50, yPercent: 55, rotation: 45, scale: 0.35 },
        { xPercent: -50, yPercent: -5, rotation: 45, scale: 6.2, duration: 0.18, ease: "none" },
        0.16
      );

      // Single big sphere starts scaling continuously from 0.16 to 0.40 (never frozen)
      tl.fromTo(
        singleSphereRef.current,
        { scale: 0.94, opacity: 1 },
        { scale: 1.06, opacity: 1, duration: 0.24, ease: "none" },
        0.16
      );

      // Statement text pushes up and fades behind rising frame (covered)
      tl.fromTo(
        sceneBContentWrapRef.current,
        { opacity: 1 },
        { opacity: 0, y: "-12vh", duration: 0.10, ease: "none" },
        0.18
      );

      tl.fromTo(
        [bracketTLRef.current, bracketTRRef.current, bracketBLRef.current, bracketBRRef.current],
        { opacity: 1 },
        { opacity: 0, duration: 0.08, ease: "none" },
        0.18
      );

      // At 0.34 full coverage: reveal full-screen molecule stage and hide green panel
      tl.fromTo(
        moleculeStageRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.01, ease: "none" },
        0.338
      );

      tl.fromTo(
        sceneBPanelRef.current,
        { opacity: 1 },
        { opacity: 0, duration: 0.01, ease: "none" },
        0.34
      );

      // =======================================================================
      // 0.40 - 0.50: SPLIT (Duplicate separates left/right to ±22vw)
      // Same size, right in front, with thin hairline iridescent rim
      // =======================================================================
      tl.fromTo(
        singleSphereRef.current,
        { opacity: 1 },
        { opacity: 0, duration: 0.02, ease: "none" },
        0.40
      );

      tl.fromTo(
        splitSphereLeftRef.current,
        { x: 0, opacity: 0.9 },
        { x: "-22vw", opacity: 1, duration: 0.10, ease: "none" },
        0.40
      );

      tl.fromTo(
        splitSphereRightRef.current,
        { x: 0, opacity: 0.9 },
        { x: "22vw", opacity: 1, duration: 0.10, ease: "none" },
        0.40
      );

      // =======================================================================
      // 0.50 - 0.58: ROTATE 90° (Horizontal pair becomes vertical pair)
      // Top sphere darker, bottom sphere lighter, touching/slightly overlapping
      // =======================================================================
      tl.fromTo(
        spherePairWrapperRef.current,
        { rotation: 0 },
        { rotation: 90, duration: 0.08, ease: "none" },
        0.50
      );

      // =======================================================================
      // 0.58 - 0.64: SCALE DOWN TO ~0.55x, DRIFTING LEFT
      // Stage background shifts to darker, greener teal
      // =======================================================================
      tl.fromTo(
        spherePairWrapperRef.current,
        { scale: 1.0, x: 0 },
        { scale: 0.55, x: "-12vw", duration: 0.06, ease: "none" },
        0.58
      );

      tl.fromTo(
        moleculeStageRef.current,
        { filter: "brightness(1) saturate(1)" },
        { filter: "brightness(0.88) saturate(1.25)", duration: 0.06, ease: "none" },
        0.58
      );

      // =======================================================================
      // 0.64 - 0.76: MANY BUBBLES (10-12) + HEADING + STATS
      // Bubbles pop in with staggered scale 0 to 1; heading on bottom-left, stats on right
      // =======================================================================
      tl.fromTo(
        bubblesGroupRef.current,
        { y: 0 },
        { y: -35, duration: 0.12, ease: "none" },
        0.64
      );

      const stageBubbles = bubblesGroupRef.current?.querySelectorAll(".stage-bubble");
      if (stageBubbles && stageBubbles.length> 0) {
        tl.fromTo(
          stageBubbles,
          { scale: 0, opacity: 0, y: 40 },
          { scale: 1, opacity: 1, y: 0, duration: 0.08, stagger: 0.008, ease: "none" },
          0.64
        );
      }

      // Bottom-left heading and eyebrow reveal (bubbles go behind text)
      tl.fromTo(
        overlayTextRef.current,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.08, ease: "none" },
        0.64
      );

      // Right-side stats rows reveal one by one with hairline dividers
      const statRows = statsListStage1Ref.current?.querySelectorAll(".stat-row");
      if (statRows && statRows.length> 0) {
        tl.fromTo(
          statRows,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.06, stagger: 0.025, ease: "none" },
          0.66
        );
      }

      // =======================================================================
      // 0.70 - 0.76: DROPLETS (Bubbles shrink to small droplets 10-130px)
      // Large ones disappear, droplets spread and float in upper/center area
      // =======================================================================
      if (stageBubbles && stageBubbles.length> 0) {
        tl.fromTo(
          stageBubbles,
          { scale: 1, opacity: 1 },
          { scale: 0.22, opacity: 0.65, duration: 0.06, ease: "none" },
          0.70
        );
      }

      // Center sphere pair fades out
      tl.fromTo(
        spherePairWrapperRef.current,
        { opacity: 1 },
        { opacity: 0, duration: 0.04, ease: "none" },
        0.70
      );

      // =======================================================================
      // 0.75 - 0.81: MEDICINE VIAL STAGE (Image 1)
      // Vial zooms in then settles inside the glass rounded-square frame with
      // orbital circular ring. Straight upright bottle (rotation: 0).
      // Left text + Right stats Stage 2 (Zurich & Boston / Global Reach)
      // =======================================================================
      tl.fromTo(
        vialEmergingWrapRef.current,
        { opacity: 0, scale: 3.2, yPercent: 12, rotation: 0 },
        { opacity: 1, scale: 1.0, yPercent: 0, rotation: 0, duration: 0.06, ease: "none" },
        0.75
      );

      tl.fromTo(
        vialFrameWrapRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1.0, duration: 0.05, ease: "none" },
        0.76
      );

      tl.fromTo(
        verticalRailsRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.04, ease: "none" },
        0.76
      );

      if (stageBubbles && stageBubbles.length> 0) {
        tl.fromTo(
          stageBubbles,
          { opacity: 0.65 },
          { opacity: 0, duration: 0.04, ease: "none" },
          0.76
        );
      }

      // Swap right-hand stats to Stage 2
      tl.fromTo(
        statsListStage1Ref.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -15, duration: 0.03, ease: "none" },
        0.75
      );

      tl.fromTo(
        statsListStage2Ref.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.04, ease: "none" },
        0.77
      );

      // =======================================================================
      // 0.81 - 0.87: WHITE PAGE RISES & CENTERED MINT FRAME (Images 2 & 3)
      // Clean white section slides up from bottom (yPercent 100 to 0)
      // In center: mint rounded square (#DEEDE9) with white circular cutout and vial
      // Navbar transitions text to dark teal
      // =======================================================================
      tl.fromTo(
        whiteSectionRef.current,
        { yPercent: 100 },
        { yPercent: 0, duration: 0.06, ease: "none" },
        0.81
      );

      // Teal hero text and stats fade out upward behind rising white section
      tl.fromTo(
        overlayTextRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -25, duration: 0.04, ease: "none" },
        0.81
      );

      tl.fromTo(
        statsListStage2Ref.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -25, duration: 0.04, ease: "none" },
        0.81
      );

      // Transition navbar to dark teal for the white page
      tl.fromTo(
        navPillWrapRef.current,
        { backgroundColor: "rgba(0, 52, 54, 0.7)", borderColor: "rgba(255, 255, 255, 0.15)" },
        { backgroundColor: "rgba(255, 255, 255, 0.85)", borderColor: "rgba(0, 60, 65, 0.15)", duration: 0.05, ease: "none" },
        0.81
      );

      const navLinks = navPillWrapRef.current?.querySelectorAll(".nav-link-item");
      if (navLinks && navLinks.length> 0) {
        tl.fromTo(
          navLinks,
          { color: "rgba(255, 255, 255, 0.85)" },
          { color: "#003B3A", duration: 0.05, ease: "none" },
          0.81
        );
      }

      tl.fromTo(
        navLogoImgRef.current,
        { filter: "brightness(1) invert(0)" },
        { filter: "brightness(0.18) invert(0)", duration: 0.05, ease: "none" },
        0.81
      );

      // =======================================================================
      // 0.87 - 0.93: FRAME MOVES TO LEFT & "WE KNOW" IN CENTER (Image 4)
      // The frame/circle expands and shifts to the left (-38vw, scale 2.2),
      // forming the curved left arc. The vial inside becomes softly blurred.
      // Large bold serif "We know" appears in center of white canvas.
      // =======================================================================
      tl.fromTo(
        leftArcContainerRef.current,
        { x: 0, scale: 1.0 },
        { x: "-38vw", scale: 2.2, duration: 0.06, ease: "none" },
        0.87
      );

      tl.fromTo(
        whiteVialImgRef.current,
        { filter: "blur(0px) opacity(1)" },
        { filter: "blur(8px) opacity(0.85)", duration: 0.06, ease: "none" },
        0.87
      );

      tl.fromTo(
        weKnowHeadingWrapRef.current,
        { opacity: 0, scale: 0.88 },
        { opacity: 1, scale: 1.0, duration: 0.05, ease: "none" },
        0.88
      );

      // =======================================================================
      // 0.93 - 0.98: TITLE REDUCES & SHIFTS LEFT + RIGHT STATEMENT (Image 5)
      // "We know" title shrinks to ~52% and shifts left.
      // Right editorial statement, teal emblem icon, and subtext reveal.
      // =======================================================================
      tl.fromTo(
        weKnowHeadingWrapRef.current,
        { x: 0, scale: 1.0 },
        { x: "-18vw", scale: 0.52, duration: 0.05, ease: "none" },
        0.93
      );

      tl.fromTo(
        weKnowRightBlockRef.current,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.05, ease: "none" },
        0.935
      );

      // =======================================================================
      // 0.98 - 1.00: SMOOTH EXIT RELEASE
      // Holds state cleanly; pin releases into the next section
      // =======================================================================
      tl.fromTo(
        weKnowRightBlockRef.current,
        { y: 0 },
        { y: 0, duration: 0.02, ease: "none" },
        0.98
      );
    });

    // Refresh on resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      lenisRef.current = null;
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <ReducedMotionStaticView />;
  }

  const { content } = HERO_CONFIG;

  return (
    <section
      ref={containerRef}
      id="hero-seq"
      className="hero-seq relative w-full h-[100svh] overflow-hidden select-none bg-[#00201F]"
      aria-label="Interactive Hero Sequence">
      {/* =====================================================================
          FIXED NAVBAR: ALWAYS TRANSPARENT BACKGROUND (Only Capsule Pill Blur)
          ===================================================================== */}
      <header className="fixed top-0 inset-x-0 z-50 pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <a
            href="#hero-seq"
            className="pointer-events-auto flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8DE1DC]"
            aria-label={`${HERO_CONFIG.brandName} Home`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={navLogoImgRef}
              src={HERO_CONFIG.brandLogo}
              alt={HERO_CONFIG.brandName}
              width={160}
              height={50}
              className="h-10 sm:h-11 w-auto object-contain brightness-110 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] transition-all duration-300"
            />
          </a>

          {/* Center-Right Segmented Capsule Pill Navigation Bar */}
          <div className="hidden md:flex items-center gap-3 pointer-events-auto">
            <nav
              ref={navPillWrapRef}
              className="flex items-center gap-1 bg-[#003436]/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 shadow-[0_4px_20px_rgba(0,0,0,0.25)] transition-all duration-300"
              aria-label="Hero navigation">
              {content.navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="nav-link-item px-4 py-1.5 rounded-full text-xs font-medium tracking-wide text-white/85 hover:text-white transition-all duration-200">
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Coral Action Pill */}
            <a
              href="#book"
              className="px-5 py-2.5 rounded-full bg-[#F25C5C] hover:bg-[#ff6e6e] text-white text-xs font-semibold tracking-wider uppercase shadow-[0_4px_16px_rgba(242,92,92,0.4)] hover:shadow-[0_6px_22px_rgba(242,92,92,0.6)] transition-all duration-200 hover:-translate-y-0.5">
              {content.contactCta}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="pointer-events-auto md:hidden text-white p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20"
            aria-label="Toggle navigation">
            <div className="w-5 flex flex-col gap-1.5">
              <span className="h-0.5 w-full bg-white rounded-full" />
              <span className="h-0.5 w-full bg-white rounded-full" />
              <span className="h-0.5 w-full bg-white rounded-full" />
            </div>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="pointer-events-auto md:hidden fixed inset-x-4 top-22 z-50 bg-[#002B2A]/95 backdrop-blur-2xl border border-white/15 rounded-2xl p-6 flex flex-col gap-4 text-white shadow-2xl">
            {content.navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base py-2 border-b border-white/10 text-white/90">
                {link.label}
              </a>
            ))}
            <a
              href="#book"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 text-center bg-[#F25C5C] text-white font-bold py-3 rounded-full shadow-lg">
              {content.contactCta}
            </a>
          </div>
        )}
      </header>

      {/* =====================================================================
          STEP 1: HERO SCENE (0.00 to 0.08)
          - Background: vertical gradient, near-black teal (#00201F) to mid teal (#3F8A8F) to pale aqua (#DCEEF2)
          - Sphere 1 (BIG): diameter ~65vw (min 1100px), center y ~8vh, cropped by top, sits BEHIND headline
          - Sphere 2: diameter ~55vw, top edge at ~58vh, rising from bottom
          - Overlap: Thin vector hairline rim with blue-to-orange gradient
          - Headline: sits centered ABOVE the lens, clean white serif
          ===================================================================== */}
      <div
        ref={sceneARef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #00201F 0%, #1A6469 38%, #3F8A8F 72%, #DCEEF2 100%)",
        }}>
        {/* Idle Drifting Group for Spheres */}
        <div ref={idleSpheresGroupRef} className="absolute inset-0 pointer-events-none">
          {/* Sphere 1 (BIG): Diameter ~65vw (min 1100px), center y ~8vh */}
          <Sphere
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              width: "clamp(1100px, 65vw, 1500px)",
              height: "clamp(1100px, 65vw, 1500px)",
              top: "calc(8vh - clamp(550px, 32.5vw, 750px))",
              zIndex: 1,
            }}
          />

          {/* Sphere 2: Diameter ~55vw, horizontally centered, top edge at ~58vh */}
          <Sphere
            className="absolute left-1/2 -translate-x-1/2"
            isLighter={true}
            style={{
              width: "clamp(900px, 55vw, 1250px)",
              height: "clamp(900px, 55vw, 1250px)",
              top: "58vh",
              zIndex: 3,
            }}
          />

          {/* Overlap Lens Hairline Rim (Vector SVG Stroke Only) */}
          <OverlapLensSVG
            className="absolute left-1/2 -translate-x-1/2 w-[520px] h-[520px]"
            style={{ top: "35vh", zIndex: 4 }}
          />
        </div>

        {/* Centered Editorial Headline & Subline (Clean white serif, centered ABOVE the lens) */}
        <div
          ref={sceneATextRef}
          className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center"
          style={{ marginTop: "-18vh" }}>
          <h1 className="font-serif text-white font-normal text-5xl sm:text-7xl lg:text-[104px] leading-[1.02] tracking-tight drop-shadow-[0_4px_24px_rgba(0,25,27,0.7)]">
            <span>{content.sceneA.headlineLine1}</span>
            <br />
            <span className="italic font-serif font-light">{content.sceneA.headlineLine2}</span>
          </h1>

          <p className="mt-6 text-white/90 text-base sm:text-xl font-normal tracking-wide max-w-2xl drop-shadow-[0_2px_12px_rgba(0,25,27,0.8)]">
            {content.sceneA.subline}
          </p>
        </div>

        {/* Circular Down-Arrow Button at Bottom Center */}
        <button
          ref={downArrowRef}
          type="button"
          onClick={handleScrollDown}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-11 h-11 rounded-full border border-white/30 bg-black/15 backdrop-blur-md flex items-center justify-center text-white/90 hover:text-white hover:border-white/60 hover:bg-black/25 transition-all duration-300 group cursor-pointer"
          aria-label="Scroll to discover next stage">
          <svg
            className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>

        {/* Bottom-Right "Get in Touch" Pill Button */}
        <a
          ref={ctaPillRef}
          href="#book"
          className="hidden sm:flex absolute bottom-8 right-10 z-20 items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white text-xs font-medium tracking-wide transition-all duration-300">
          <span className="w-2 h-2 rounded-full bg-[#F25C5C] animate-pulse" />
          <span>{content.sceneA.ctaPill}</span>
        </a>
      </div>

      {/* =====================================================================
          STEP 2: STATEMENT SECTION (0.08 to 0.26)
          - Solid dark-green panel (#00504F) slides up from bottom
          - 4 balanced lines with text-wrap: balance, max-width: 820px
          - Thin 1px rounded 14px corner brackets
          ===================================================================== */}
      <div
        ref={sceneBPanelRef}
        className="absolute inset-0 z-20 flex items-center justify-center overflow-hidden"
        style={{
          background: "radial-gradient(ellipse 85% 70% at 50% 48%, #00605E 0%, #00504F 55%, #003638 100%)",
        }}>
        {/* Content Wrap with Slow Upward Drift (-4vh) between 0.10 and 0.16 */}
        <div ref={sceneBContentWrapRef} className="relative w-full max-w-[820px] mx-auto px-6 py-12">
          {/* 4 Thin 1px Rounded 14px Corner Brackets */}
          <div
            ref={bracketTLRef}
            className="absolute top-0 left-4 w-9 h-9 border-t border-l border-white/40 rounded-tl-[14px] pointer-events-none"
          />
          <div
            ref={bracketTRRef}
            className="absolute top-0 right-4 w-9 h-9 border-t border-r border-white/40 rounded-tr-[14px] pointer-events-none"
          />
          <div
            ref={bracketBLRef}
            className="absolute bottom-0 left-4 w-9 h-9 border-b border-l border-white/40 rounded-bl-[14px] pointer-events-none"
          />
          <div
            ref={bracketBRRef}
            className="absolute bottom-0 right-4 w-9 h-9 border-b border-r border-white/40 rounded-br-[14px] pointer-events-none"
          />

          {/* Statement Typography Block (4 Balanced Lines, No Orphan Words) */}
          <div ref={statementLinesRef} className="text-center px-6 sm:px-12">
            <h2
              className="font-serif text-white font-normal text-4xl sm:text-6xl lg:text-[76px] leading-[1.02] tracking-tight"
              style={{ textWrap: "balance" }}>
              <span className="statement-line block">{content.sceneB.statementLine1}</span>
              <span className="statement-line block">{content.sceneB.statementLine2}</span>
              <span className="statement-line block">{content.sceneB.statementLine3}</span>
              <span className="statement-line block">{content.sceneB.statementLine4}</span>
            </h2>
            <p className="mt-8 text-[#8DE1DC] text-base sm:text-xl font-normal tracking-wide whitespace-nowrap">
              {content.sceneB.subline}
            </p>
          </div>
        </div>

        {/* ===================================================================
            STEP 3: RISING FRAME MASK (0.16 to 0.34) — REBUILT
            45°-rotated rounded square (border-radius: 48px, overflow: hidden)
            Inside: pale-aqua-to-teal gradient (top #2E7F84, bottom #DCEEF2)
            with the single big glass sphere already visible inside it!
            Opaque, statement text pushes up and goes behind.
            =================================================================== */}
        <div
          ref={risingMaskWrapRef}
          className="absolute bottom-0 left-1/2 z-30 pointer-events-none overflow-hidden"
          style={{
            width: "340px",
            height: "340px",
            borderRadius: "48px",
            transformOrigin: "50% 50%",
            boxShadow: "0 0 60px rgba(0,0,0,0.45), inset 0 0 30px rgba(255,255,255,0.35)",
            border: "1.5px solid rgba(255,255,255,0.5)",
          }}>
          {/* Inner Counter-Rotated Stage Container (-45deg) so sphere stays upright */}
          <div
            className="absolute inset-[-450%] flex items-center justify-center pointer-events-none"
            style={{
              transform: "rotate(-45deg)",
              background: "linear-gradient(180deg, #2E7F84 0%, #1A6469 40%, #3F8A8F 70%, #DCEEF2 100%)",
            }}>
            {/* Big Glass Sphere Pre-Rendered Inside Rising Frame */}
            <Sphere
              style={{
                width: "80vh",
                height: "80vh",
                maxWidth: "720px",
                maxHeight: "720px",
              }}
            />
          </div>
        </div>
      </div>

      {/* =====================================================================
          STEP 4: MOLECULE STAGE (0.34 to 0.97) — ONE CONTINUOUS SCENE
          - Top #2E7F84 to Bottom #DCEEF2 Stage Gradient
          ===================================================================== */}
      <div
        ref={moleculeStageRef}
        className="absolute inset-0 z-30 opacity-0 pointer-events-none flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #2E7F84 0%, #1A6469 40%, #3F8A8F 70%, #DCEEF2 100%)",
        }}>
        {/* 2 Thin Vertical Glass Line Elements (1px) at Left and Right */}
        <div
          ref={verticalRailsRef}
          className="absolute inset-y-0 inset-x-12 sm:inset-x-28 flex justify-between pointer-events-none opacity-0">
          <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        </div>

        {/* 4a. SINGLE LARGE GLASS SPHERE (0.34 to 0.40, breathing scale 1 to 1.06) */}
        <div ref={singleSphereRef} className="absolute flex items-center justify-center">
          <Sphere
            style={{
              width: "80vh",
              height: "80vh",
              maxWidth: "720px",
              maxHeight: "720px",
            }}
          />
        </div>

        {/* 4b, 4c, 4d. SPHERE PAIR WRAPPER (Split 0.40-0.50, Rotate 0.50-0.58, Scale Down 0.58-0.64) */}
        <div
          ref={spherePairWrapperRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Sphere Left */}
          <div ref={splitSphereLeftRef} className="absolute">
            <Sphere
              style={{
                width: "72vh",
                height: "72vh",
                maxWidth: "650px",
                maxHeight: "650px",
              }}
            />
          </div>

          {/* Sphere Right with Venn Overlap Iridescent Hairline Rim */}
          <div ref={splitSphereRightRef} className="absolute">
            <Sphere
              isLighter={true}
              style={{
                width: "72vh",
                height: "72vh",
                maxWidth: "650px",
                maxHeight: "650px",
              }}
            />
            {/* Iridescent Hairline Rim on Overlap Boundary */}
            <OverlapLensSVG
              className="absolute -left-1/4 top-0 w-full h-full"
            />
          </div>
        </div>

        {/* 4e, 4f. MANY BUBBLES (10 to 12 Spheres, 40px to 700px) */}
        <div
          ref={bubblesGroupRef}
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true">
          {/* Bubble 1: Top-Left Huge Cropped Orb (700px) */}
          <Sphere
            className="stage-bubble absolute -top-32 -left-24"
            style={{ width: "680px", height: "680px" }}
          />
          {/* Bubble 2: Top-Right Big Orb (360px) */}
          <Sphere
            className="stage-bubble absolute -top-16 -right-16"
            style={{ width: "360px", height: "360px" }}
          />
          {/* Bubble 3: Center-Right Large Orb (320px) */}
          <Sphere
            className="stage-bubble absolute top-1/4 right-[12%]"
            style={{ width: "320px", height: "320px" }}
          />
          {/* Bubble 4: Center Floating Orb (260px) */}
          <Sphere
            className="stage-bubble absolute top-1/3 left-[42%]"
            style={{ width: "260px", height: "260px" }}
          />
          {/* Bubble 5: Bottom-Center Rising Orb (340px) */}
          <Sphere
            className="stage-bubble absolute -bottom-28 left-1/2 -translate-x-1/2"
            style={{ width: "340px", height: "340px" }}
          />
          {/* Bubble 6: Mid-Left Medium Droplet (180px) */}
          <Sphere
            className="stage-bubble absolute top-1/2 left-[22%]"
            style={{ width: "180px", height: "180px" }}
          />
          {/* Bubble 7: Upper-Center Medium Droplet (130px) */}
          <Sphere
            className="stage-bubble absolute top-20 left-[34%]"
            style={{ width: "130px", height: "130px" }}
          />
          {/* Bubble 8: Lower-Right Small Droplet (90px) */}
          <Sphere
            className="stage-bubble absolute bottom-36 right-[28%]"
            style={{ width: "90px", height: "90px" }}
          />
          {/* Bubble 9: Center-Right Small Droplet (70px) */}
          <Sphere
            className="stage-bubble absolute top-[52%] right-[38%]"
            style={{ width: "70px", height: "70px" }}
          />
          {/* Bubble 10: Top-Center Micro Droplet (45px) */}
          <Sphere
            className="stage-bubble absolute top-14 left-[58%]"
            style={{ width: "45px", height: "45px" }}
          />
          {/* Bubble 11: Bottom-Right Micro Droplet (50px) */}
          <Sphere
            className="stage-bubble absolute bottom-24 right-[10%]"
            style={{ width: "50px", height: "50px" }}
          />
        </div>

        {/* 4g, 4h. VIAL STAGE REVEAL (Image 1) */}
        {/* Glass Rounded-Square Frame with Concentric Circular Ring */}
        <div
          ref={vialFrameWrapRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0">
          {/* Glass Rounded Square Frame (480px, radius 52px) */}
          <div
            className="w-[480px] h-[480px] rounded-[52px] border border-white/40 flex items-center justify-center relative"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.14) 0%, rgba(30, 100, 105, 0.18) 100%)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              boxShadow:
                "0 24px 60px rgba(0, 20, 24, 0.45), inset 0 0 30px rgba(255, 255, 255, 0.22)",
            }}>
            {/* Concentric Glass Orbital Ring (420px) */}
            <div
              className="w-[420px] h-[420px] rounded-full border-2 border-white/35"
              style={{
                boxShadow: "inset 0 0 18px rgba(255, 255, 255, 0.18)",
              }}
            />
          </div>
        </div>

        {/* Real Transparent Pharmaceutical Vial Asset (Straight Upright) */}
        <div
          ref={vialEmergingWrapRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0"
          style={{ transformOrigin: "50% 50%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/vial.webp"
            alt="Pharmaceutical Injection Vial"
            width={480}
            height={720}
            className="w-[280px] sm:w-[320px] h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,18,20,0.65)]"
          />
        </div>

        {/* Real DOM Overlay Text & Stat Layers (Positioned in FRONT of media, z-index 40) */}
        <div className="absolute inset-x-0 bottom-10 sm:bottom-16 px-6 sm:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-8 pointer-events-auto z-40">
          {/* Bottom-Left Eyebrow & Heading */}
          <div ref={overlayTextRef} className="max-w-[640px] text-left opacity-0">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-3 h-3 rounded-full bg-[#F25C5C] inline-block" />
              <span className="text-xs font-semibold tracking-widest uppercase text-white/90">
                {content.moleculeStage.eyebrow}
              </span>
            </div>
            <h2 className="font-serif text-white font-normal text-3xl sm:text-5xl lg:text-[62px] leading-[1.08] tracking-tight drop-shadow-md">
              {content.moleculeStage.heading}
            </h2>
          </div>

          {/* Right-Side Stat List Stage 1 (0.64 to 0.75) */}
          <div
            ref={statsListStage1Ref}
            className="w-full md:w-80 flex flex-col divide-y divide-white/20">
            {content.moleculeStage.statsStage1.map((stat, idx) => (
              <div key={idx} className="stat-row py-3.5 first:pt-0 last:pb-0 opacity-0">
                <span className="text-[11px] sm:text-xs font-normal uppercase tracking-wider text-white/70 block">
                  {stat.label}
                </span>
                <span className="text-2xl sm:text-3xl font-serif text-white font-medium tracking-tight mt-0.5 block">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          {/* Right-Side Stat List Stage 2 (0.75 to 0.81) */}
          <div
            ref={statsListStage2Ref}
            className="w-full md:w-80 flex flex-col divide-y divide-white/20 opacity-0 absolute right-6 sm:right-12 bottom-0">
            {content.moleculeStage.statsStage2.map((stat, idx) => (
              <div key={idx} className="py-4 first:pt-0 last:pb-0">
                <span className="text-[11px] sm:text-xs font-normal uppercase tracking-wider text-white/70 block">
                  {stat.label}
                </span>
                <span className="text-2xl sm:text-3xl font-serif text-white font-medium tracking-tight mt-0.5 block">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =====================================================================
          STEP 4 & 5: WHITE SECTION ("WE KNOW" SCENE)
          Matches uploaded Images 2, 3, 4, and 5
          Direct child of hero-seq at z-40 so it smoothly slides over molecule stage
          ===================================================================== */}
      <div
        ref={whiteSectionRef}
        className="absolute inset-0 z-40 bg-white flex items-center justify-center overflow-hidden pointer-events-auto">
        {/* Left Arc Mask Container (starts centered in Image 3, moves left in Image 4 & 5) */}
        <div
          ref={leftArcContainerRef}
          className="absolute flex items-center justify-center pointer-events-none"
          style={{
            width: "520px",
            height: "520px",
            transformOrigin: "50% 50%",
          }}>
          {/* Mint Rounded Square Frame (Image 3) */}
          <div
            ref={mintSquareFrameRef}
            className="absolute w-full h-full rounded-[60px]"
            style={{
              background: "#DEEDE9",
              boxShadow: "0 20px 50px rgba(0, 40, 42, 0.08)",
            }}
          />

          {/* White Circular Inner Cutout (Image 3 & 4) */}
          <div
            ref={whiteInnerCircleRef}
            className="absolute w-[440px] h-[440px] rounded-full overflow-hidden flex items-center justify-center"
            style={{
              background: "#FFFFFF",
              boxShadow: "inset 0 2px 14px rgba(0, 30, 35, 0.06)",
            }}>
            {/* Medicine Vial inside Left Shape (sharp in Image 3, blurred in Image 4 & 5, upright) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={whiteVialImgRef}
              src="/assets/vial.webp"
              alt="Medicine Vial in Lens"
              className="w-[280px] h-auto object-contain"
              style={{
                filter: "blur(0px)",
              }}
            />
          </div>
        </div>

        {/* Center Bold "We know" Title (Image 4) */}
        <div
          ref={weKnowHeadingWrapRef}
          className="absolute z-10 text-center pointer-events-none opacity-0 flex items-center justify-center"
          style={{ transformOrigin: "center center" }}>
          <h2
            ref={weKnowTitleRef}
            className="font-serif text-[#003B3A] font-medium tracking-tight whitespace-nowrap leading-none"
            style={{
              fontSize: "clamp(64px, 7.8vw, 118px)",
            }}>
            We know
          </h2>
        </div>

        {/* Right Side Content Block (Image 5) */}
        <div
          ref={weKnowRightBlockRef}
          className="absolute right-[6%] lg:right-[10%] max-w-[620px] flex flex-col items-start opacity-0 pointer-events-auto">
          {/* Large Editorial Statement */}
          <p
            className="font-serif text-[#003B3A] font-normal leading-[1.14] tracking-tight text-3xl sm:text-4xl lg:text-[46px]"
            style={{ textWrap: "balance" }}>
            as programs pass through various stages of development, they need specific experience and focused attention.
          </p>

          {/* Emblem Icon (Teal circle with rotated white diamond cutout) */}
          <div className="mt-8 mb-6 flex items-center justify-center w-11 h-11 rounded-full bg-[#008068] shadow-sm">
            <div className="w-4 h-4 bg-white rotate-45 rounded-[2px]" />
          </div>

          {/* Clean Grotesk Subtext */}
          <div className="space-y-1 text-sm sm:text-base font-normal text-[#003B3A]/85 tracking-wide">
            <p>We don&apos;t just develop therapies.</p>
            <p>We manage the interfaces.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
