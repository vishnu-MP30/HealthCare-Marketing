"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Volume2, VolumeX, Sparkles, MoveRight } from "lucide-react";

interface CareCard {
  id: string;
  badge: string;
  title: string;
  description: string;
  details: string;
  image: string;
  alt: string;
  iconType: "leaf" | "eye" | "lotus" | "spiral" | "blossom" | "pulse";
}

const CARDS_DATA: CareCard[] = [
  {
    id: "skin-health",
    badge: "01 / Dermatology",
    title: "Skin\nHealth",
    description:
      "Treatments designed to support balanced, healthy skin and maintain its natural strength over time.",
    details: "Cellular rejuvenation, barrier repair & preventative clinical diagnostics.",
    image: "/fam-midlife.jpg",
    alt: "Radiant, natural skin health and cellular rejuvenation portrait",
    iconType: "leaf",
  },
  {
    id: "aesthetic-care",
    badge: "02 / Aesthetics",
    title: "Aesthetic\nCare",
    description:
      "Subtle, non-invasive treatments designed to refresh your natural look without going to extremes.",
    details: "Precision facial contouring, restorative microneedling & collagen renewal.",
    image: "/spec-eye.jpg",
    alt: "Gentle non-invasive aesthetic and facial contour care",
    iconType: "eye",
  },
  {
    id: "wellness-recovery",
    badge: "03 / Longevity",
    title: "Wellness &\nRecovery",
    description:
      "Care that supports deep relaxation, gentle recovery, and overall well-being for body and mind.",
    details: "Infusion therapies, metabolic recovery protocols & clinical calm spaces.",
    image: "/reads/mind-1.jpg",
    alt: "Peaceful restorative wellness and mental vitality session",
    iconType: "lotus",
  },
  {
    id: "personal-consultation",
    badge: "04 / Concierge",
    title: "Personal\nConsultation",
    description:
      "A calm, one-on-one conversation to understand your goals and create a plan that fits you.",
    details: "Comprehensive biomarker evaluation, aesthetic mapping & 1-on-1 specialist advisory.",
    image: "/fam-fertility.jpg",
    alt: "Warm one-on-one doctor and patient consultation",
    iconType: "spiral",
  },
  {
    id: "long-term-plans",
    badge: "05 / Care Pathways",
    title: "Long-Term\nCare Plans",
    description:
      "Thoughtful programs built around your skin and wellness needs, focused on lasting results.",
    details: "Continuous quarterly health reviews, proactive adaptations & dedicated specialist guidance.",
    image: "/story-maternal.jpg",
    alt: "Compassionate ongoing maternal and long-term care",
    iconType: "blossom",
  },
  {
    id: "clinical-excellence",
    badge: "06 / Specialist",
    title: "Clinical\nPrecision",
    description:
      "Evidence-based clinical treatments led by certified medical specialists with surgical precision.",
    details: "Advanced diagnostic imaging, tailored prescriptions & seamless medical continuum.",
    image: "/dept-surgery.jpg",
    alt: "Specialist surgery and advanced precision clinical care",
    iconType: "pulse",
  },
];

// Clean line art icons with dynamic color support (green on light, white/mint on green back face)
function CardIcon({
  type,
  color = "#E8682A",
}: {
  type: CareCard["iconType"];
  color?: string;
}) {
  switch (type) {
    case "leaf":
      return (
        <svg
          width="48"
          height="48"
          viewBox="0 0 54 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <circle cx="27" cy="14" r="4.5" stroke={color} strokeWidth="1.8" />
          <path
            d="M27 22C22 28 16 32 11 32C11 25 15 20 23 20"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M27 22C32 28 38 32 43 32C43 25 39 20 31 20"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "eye":
      return (
        <svg
          width="48"
          height="48"
          viewBox="0 0 54 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M17 18C22 13 32 13 37 18"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M13 28C19 20 35 20 41 28"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M41 28C43 33 42 38 45 42"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case "lotus":
      return (
        <svg
          width="48"
          height="48"
          viewBox="0 0 54 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <circle cx="27" cy="15" r="4.2" stroke={color} strokeWidth="1.8" />
          <path
            d="M27 22C21 28 15 31 10 31C10 23 15 19 22 19"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M27 22C33 28 39 31 44 31C44 23 39 19 32 19"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "spiral":
      return (
        <svg
          width="48"
          height="48"
          viewBox="0 0 54 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M27 27C25.5 27 24 25.8 24 24.5C24 23 25.5 21.5 27 21.5C29 21.5 30.5 23 30.5 25C30.5 27.5 28.5 29.5 26 29.5C23 29.5 20.5 27 20.5 24C20.5 20 23.8 17 27.5 17C32 17 35.5 20.5 35.5 25C35.5 30 31.5 34 26.5 34C20.5 34 16 29.5 16 23.5C16 16.5 21.5 11 28 11"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );

    case "blossom":
      return (
        <svg
          width="48"
          height="48"
          viewBox="0 0 54 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M27 12C27 12 31 19 31 25C31 29 29 31 27 31C25 31 23 29 23 25C23 19 27 12 27 12Z"
            stroke={color}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M23 29C19 29 15 27 13 23C12 20 13 17 15 17C18 17 21 21 22 25"
            stroke={color}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M31 29C35 29 39 27 41 23C42 20 41 17 39 17C36 17 33 21 32 25"
            stroke={color}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M19 33C24 36 30 36 35 33"
            stroke={color}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );

    case "pulse":
      return (
        <svg
          width="48"
          height="48"
          viewBox="0 0 54 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <circle cx="27" cy="27" r="16" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" />
          <path
            d="M17 27H22L24.5 19L28.5 35L31.5 27H37"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

export default function CareArcFlow() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll progress from 0 (section top) to 1 (section end)
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CareCard | null>(null);

  // Audio tone generator for calm ambient sound
  const audioContextRef = useRef<AudioContext | null>(null);

  const playCalmTone = useCallback(
    (freq = 528) => {
      if (!isSoundEnabled) return;
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!audioContextRef.current) {
          audioContextRef.current = new AudioCtx();
        }
        const ctx = audioContextRef.current;
        if (ctx.state === "suspended") ctx.resume();

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.1);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.2);
      } catch {
        // Audio not permitted
      }
    },
    [isSoundEnabled]
  );

  // Responsive check
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Track scroll position within pinned container
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollableDistance = rect.height - window.innerHeight;
      if (totalScrollableDistance <= 0) return;

      const currentScrolled = -rect.top;
      const rawProgress = currentScrolled / totalScrollableDistance;
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));
      setScrollProgress(clampedProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Arc & spacing configuration
  const cardSpacing = isMobile ? 310 : 400;
  const totalCards = CARDS_DATA.length;

  // Horizontal translation mapping:
  const startOffset = isMobile ? 650 : 1100;
  const endOffset = -(totalCards - 1) * cardSpacing - (isMobile ? 240 : 380);

  // Card movement active range: 0.12 to 0.95
  const movementProgress = Math.max(0, Math.min(1, (scrollProgress - 0.12) / 0.83));
  const currentOffset = startOffset + movementProgress * (endOffset - startOffset);

  // Title fade out range:
  const titleOpacity = Math.max(0, Math.min(1, 1 - (scrollProgress - 0.03) / 0.16));
  const titleTranslateY = -Math.min(1, scrollProgress / 0.2) * 40;

  // Detect currently centered card
  useEffect(() => {
    let closestIndex = 0;
    let minDistance = Infinity;

    CARDS_DATA.forEach((_, idx) => {
      const cardX = idx * cardSpacing + currentOffset;
      const dist = Math.abs(cardX);
      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = idx;
      }
    });

    if (closestIndex !== activeCardIndex) {
      setActiveCardIndex(closestIndex);
      if (isSoundEnabled) {
        playCalmTone(440 + closestIndex * 50);
      }
    }
  }, [currentOffset, cardSpacing, activeCardIndex, isSoundEnabled, playCalmTone]);

  // Jump to specific card on clicking pagination or arrows
  const scrollToCard = (index: number) => {
    if (!containerRef.current) return;
    const targetOffset = -index * cardSpacing;
    const targetRatio = (targetOffset - startOffset) / (endOffset - startOffset);
    const targetProgress = 0.12 + Math.max(0, Math.min(1, targetRatio)) * 0.83;

    const rect = containerRef.current.getBoundingClientRect();
    const containerTopInDoc = window.scrollY + rect.top;
    const totalScrollableDistance = rect.height - window.innerHeight;
    const targetScrollY = containerTopInDoc + targetProgress * totalScrollableDistance;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={containerRef}
      id="our-services-arc"
      className="relative w-full bg-white text-[#1F2123] selection:bg-[#E8682A] selection:text-white"
      style={{ height: "400vh" }}
      aria-label="Care Services Arc Showcase">
      {/* Pinned 100vh Stage with Crisp Editorial Theme matching Specialism Showcase */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pointer-events-auto bg-white">
        
        {/* PHASE 1: INTRODUCTION TITLE */}
        <div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 sm:px-12 pointer-events-none transition-transform duration-200"
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleTranslateY}px)`,
            visibility: titleOpacity <= 0 ? "hidden" : "visible",
          }}>
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F8F9FA] border border-[#1F2123]/10 shadow-xs mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8682A] animate-pulse" />
            <span className="text-xs sm:text-sm font-medium tracking-wide text-[#1F2123]/80 font-body">
              Our Services
            </span>
          </div>

          {/* Main Title - Larger, bolder and highly readable */}
          <h2 className="font-display font-bold tracking-tight text-[#1F2123] text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.25rem] leading-[0.98] mb-4 max-w-5xl mx-auto">
            Thoughtful care, chosen for{" "}
            <span className="text-[#E8682A] font-normal">you.</span>
          </h2>

          {/* Subtitle - Steady calibrated readable paragraph */}
          <p className="text-[#1F2123]/80 font-body text-base sm:text-lg md:text-xl font-normal max-w-2xl leading-relaxed mx-auto">
            We offer a carefully selected range of aesthetic and wellness treatments
            focused on natural results and long-term skin health.
          </p>
        </div>

        {/* PHASE 2: CONTINUOUS SEMI-CIRCULAR ARC CAROUSEL WITH 3D HOVER REVEAL */}
        <div
          className="relative z-10 w-full flex-1 flex items-center justify-center pointer-events-none select-none"
          style={{ perspective: "1500px" }}>
          {/* Arc Center Anchor */}
          <div className="relative w-0 h-0 flex items-center justify-center">
            {CARDS_DATA.map((card, idx) => {
              // Horizontal coordinate relative to center of viewport
              const cardX = idx * cardSpacing + currentOffset;

              // Arc geometry calculation:
              const rotDeg = (cardX / 2600) * (180 / Math.PI) * 0.95;
              const arcDropY = (cardX * cardX) / (isMobile ? 2200 : 3200);

              // Proximity to center
              const distFromCenter = Math.abs(cardX);
              const isCenter = distFromCenter < cardSpacing * 0.55;
              const normalizedDist = Math.min(1, distFromCenter / 1200);

              // Scale boost at center peak
              const scale = 1 - normalizedDist * 0.07 + (isCenter ? 0.03 : 0);
              const opacity = Math.max(0, 1 - Math.pow(normalizedDist, 3) * 1.5);

              // Skip rendering cards far outside screen
              if (Math.abs(cardX)> 1350) return null;

              const isFlipped = hoveredCardId === card.id;

              return (
                <article
                  key={card.id}
                  onMouseEnter={() => setHoveredCardId(card.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  onClick={() => {
                    // Mobile or desktop toggle
                    if (isMobile) {
                      setHoveredCardId(isFlipped ? null : card.id);
                    } else {
                      setSelectedCard(card);
                    }
                  }}
                  className="absolute pointer-events-auto cursor-pointer group"
                  style={{
                    width: isMobile ? "290px" : "360px",
                    height: isMobile ? "440px" : "520px",
                    transform: `translate3d(calc(${cardX}px - 50%), calc(${arcDropY}px - 12%), 0) rotate(${rotDeg}deg) scale(${scale})`,
                    transformOrigin: "center 85%",
                    opacity,
                    perspective: "1200px",
                    willChange: "transform, opacity",
                    zIndex: isFlipped ? 150 : Math.round(100 - distFromCenter / 10),
                  }}
                  aria-label={`${card.title.replace("\n", " ")} card`}>
                  {/* Card Container with 3D Flip Mechanics */}
                  <div
                    className={`relative w-full h-full rounded-[30px] sm:rounded-[36px] transition-transform duration-700 ease-out [transform-style:preserve-3d] ${
                      isFlipped ? "[transform:rotateY(180deg)]" : ""
                    } ${
                      isCenter
                        ? "shadow-[0_24px_55px_-12px_rgba(0,0,0,0.18),0_4px_20px_rgba(0,0,0,0.06)]"
                        : "shadow-[0_16px_40px_-10px_rgba(0,0,0,0.12),0_2px_12px_rgba(0,0,0,0.04)]"
                    }`}>
                    {/* FRONT FACE: Full Expanded Premium Photography Image */}
                    <div className="absolute inset-0 w-full h-full rounded-[30px] sm:rounded-[36px] overflow-hidden [backface-visibility:hidden] bg-white/5 border border-white/10">
                      <Image
                        src={card.image}
                        alt={card.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 450px"
                        priority={idx < 3}
                        className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[1.04] contrast-[1.02]"
                      />

                      {/* Localized Bottom Gradient Only (leaves upper 55% completely clear and bright) */}
                      <div className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

                      {/* Content Overlay */}
                      <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 pointer-events-none">
                        {/* Top Category Badge */}
                        <div className="self-start">
                          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/25 text-white text-xs font-medium tracking-wide shadow-md">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E8682A]" />
                            {card.badge}
                          </span>
                        </div>

                        {/* Bottom Title & Hover Hint with crisp drop shadow */}
                        <div>
                          <h3
                            className="font-display font-semibold text-white !text-white tracking-tight leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] mb-2 whitespace-pre-line"
                            style={{ color: "#FFFFFF", fontSize: "clamp(1.25rem, 1.8vw, 1.6rem)" }}>
                            {card.title}
                          </h3>
                          <div className="flex items-center gap-1.5 text-[#FFA674] text-xs sm:text-[0.85rem] font-semibold tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                            <span>Hover to reveal pathway</span>
                            <MoveRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* BACK FACE: Brand Orange Surface with Bold White Justified Typography */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-[30px] sm:rounded-[36px] p-8 sm:p-10 flex flex-col justify-between items-center text-white [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-2xl bg-[#E8682A] border border-[#E8682A]">
                      {/* Top: Crisp White Line Icon in translucent container */}
                      <div className="pt-1 flex flex-col items-center">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/20 border border-white/30 shadow-inner">
                          <CardIcon type={card.iconType} color="#FFFFFF" />
                        </div>
                      </div>

                      {/* Middle: Badge, Title & Justified Bold White Description (with comfortable breathing room) */}
                      <div className="my-auto w-full px-2 flex flex-col items-center text-center">
                        <span className="inline-block text-[0.75rem] uppercase tracking-widest text-white font-bold mb-3 bg-white/20 px-3.5 py-1 rounded-full border border-white/25">
                          {card.badge}
                        </span>
                        <h3
                          className="font-display text-white !text-white text-xl sm:text-2xl font-bold mb-3 tracking-tight whitespace-pre-line"
                          style={{ color: "#FFFFFF" }}>
                          {card.title}
                        </h3>
                        <p className="text-white font-semibold text-sm sm:text-[0.92rem] leading-relaxed text-justify [text-justify:inter-word] [text-wrap:pretty] px-2 max-w-[290px]">
                          {card.description}
                        </p>
                      </div>

                      {/* Bottom: "Click to learn more" Action in Bold White */}
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCard(card);
                        }}
                        className="pt-3.5 w-full border-t border-white/25 flex items-center justify-center gap-2 text-white font-bold hover:opacity-90 transition-opacity cursor-pointer">
                        <span className="text-xs sm:text-[0.9rem] tracking-wide">
                          Click to learn more
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* BOTTOM CONTROLS (Sound button removed here; only preserved in hero) */}
        <footer className="relative z-20 pb-8 sm:pb-10 px-6 sm:px-12 flex items-center justify-between pointer-events-auto bg-transparent">
          {/* Spacer to balance flex-between and keep stepper centered */}
          <div className="w-24 hidden sm:block" />

          {/* Stepper Dots Indicator */}
          <div className="flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 rounded-full bg-white border border-[#1F2123]/15 shadow-xs mx-auto sm:mx-0">
            {CARDS_DATA.map((c, i) => (
              <button
                key={c.id}
                type="button"
                onClick={() => scrollToCard(i)}
                className={`transition-all duration-300 rounded-full ${
                  activeCardIndex === i
                    ? "w-7 h-2 bg-[#E8682A]"
                    : "w-2 h-2 bg-neutral-300 hover:bg-neutral-600"
                }`}
                aria-label={`Jump to ${c.title.replace("\n", " ")}`}
              />
            ))}
          </div>

          {/* Prev / Next Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollToCard(Math.max(0, activeCardIndex - 1))}
              disabled={activeCardIndex === 0}
              className="w-10 h-10 rounded-full bg-white border border-[#1F2123]/15 flex items-center justify-center text-[#1F2123] font-body hover:text-[#E8682A] hover:border-[#E8682A] disabled:opacity-30 disabled:pointer-events-none transition-all shadow-xs"
              aria-label="Previous card">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollToCard(Math.min(totalCards - 1, activeCardIndex + 1))}
              disabled={activeCardIndex === totalCards - 1}
              className="w-10 h-10 rounded-full bg-white border border-[#1F2123]/15 flex items-center justify-center text-[#1F2123] font-body hover:text-[#E8682A] hover:border-[#E8682A] disabled:opacity-30 disabled:pointer-events-none transition-all shadow-xs"
              aria-label="Next card">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </footer>
      </div>

      {/* Interactive Modal Drawer when card is clicked */}
      {selectedCard && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedCard(null)}>
          <div
            className="relative w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-[#1F2123]/10 text-center animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}>
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#E8682A] text-[#1F2123] flex items-center justify-center shadow-md">
              <CardIcon type={selectedCard.iconType} color="#ffffff" />
            </div>
            <span className="inline-block text-xs font-medium uppercase tracking-wider text-[#1F2123]/80 font-body bg-[#F8F9FA] px-3.5 py-1 rounded-full mb-3 border border-[#1F2123]/10">
              {selectedCard.badge}
            </span>
            <h3 className="font-display font-medium text-[#1F2123] tracking-tight mb-3 whitespace-pre-line">
              {selectedCard.title}
            </h3>
            <p className="text-[#1F2123]/70 font-body text-sm leading-relaxed mb-4">
              {selectedCard.description}
            </p>
            <div className="p-4 rounded-2xl bg-[#F8F9FA] text-xs text-[#1F2123]/80 font-body font-medium leading-relaxed mb-6 border border-[#1F2123]/10">
              <div className="flex items-center justify-center gap-1.5 text-[#E8682A] font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Pathway Highlights</span>
              </div>
              {selectedCard.details}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSelectedCard(null)}
                className="flex-1 py-3 px-4 rounded-full border border-[#1F2123]/15 text-[#1F2123]/80 font-body hover:bg-black/5 text-sm font-medium transition-colors">
                Close
              </button>
              <a
                href="#consultation"
                onClick={() => setSelectedCard(null)}
                className="flex-1 py-3 px-4 rounded-full bg-[#E8682A] hover:bg-[#D4591F] text-white text-sm font-medium transition-colors shadow-sm">
                Book Pathway
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
