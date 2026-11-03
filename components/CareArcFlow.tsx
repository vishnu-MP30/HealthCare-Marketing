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
  color = "#008068",
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
          xmlns="http://www.w3.org/2000/svg"
        >
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
          xmlns="http://www.w3.org/2000/svg"
        >
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
          xmlns="http://www.w3.org/2000/svg"
        >
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
          xmlns="http://www.w3.org/2000/svg"
        >
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
          xmlns="http://www.w3.org/2000/svg"
        >
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
          xmlns="http://www.w3.org/2000/svg"
        >
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
      className="relative w-full bg-[#FAF8F5] text-[#132a21] selection:bg-[#008068] selection:text-white"
      style={{ height: "400vh" }}
      aria-label="Care Services Arc Showcase"
    >
      {/* Pinned 100vh Stage with Warm Luxury Linen Background matching Treatment Gallery */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pointer-events-auto bg-[#FAF8F5]">
        
        {/* PHASE 1: INTRODUCTION TITLE (Exact copy and warm luxury aesthetic) */}
        <div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 sm:px-12 pointer-events-none transition-transform duration-200"
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleTranslateY}px)`,
            visibility: titleOpacity <= 0 ? "hidden" : "visible",
          }}
        >
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 border border-[#008068]/20 shadow-xs mb-5 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#008068] animate-pulse" />
            <span className="text-xs sm:text-sm font-medium tracking-wide text-[#008068]">
              Our Services
            </span>
          </div>

          {/* Main Title */}
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#132a21] font-normal tracking-tight max-w-4xl leading-[1.08] mb-5">
            Thoughtful care, chosen for you.
          </h2>

          {/* Subtitle */}
          <p className="text-neutral-600 text-sm sm:text-base md:text-lg font-light max-w-xl leading-relaxed mx-auto">
            We offer a carefully selected range of aesthetic and wellness treatments
            focused on natural results and long-term skin health.
          </p>
        </div>

        {/* PHASE 2: CONTINUOUS SEMI-CIRCULAR ARC CAROUSEL WITH 3D HOVER REVEAL */}
        <div
          className="relative z-10 w-full flex-1 flex items-center justify-center pointer-events-none select-none"
          style={{ perspective: "1500px" }}
        >
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
              if (Math.abs(cardX) > 1350) return null;

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
                  aria-label={`${card.title.replace("\n", " ")} card`}
                >
                  {/* Card Container with 3D Flip Mechanics */}
                  <div
                    className={`relative w-full h-full rounded-[30px] sm:rounded-[36px] transition-transform duration-700 ease-out [transform-style:preserve-3d] ${
                      isFlipped ? "[transform:rotateY(180deg)]" : ""
                    } ${
                      isCenter
                        ? "shadow-[0_24px_55px_-12px_rgba(0,0,0,0.18),0_4px_20px_rgba(0,0,0,0.06)]"
                        : "shadow-[0_16px_40px_-10px_rgba(0,0,0,0.12),0_2px_12px_rgba(0,0,0,0.04)]"
                    }`}
                  >
                    {/* FRONT FACE: Full Expanded Premium Photography Image */}
                    <div className="absolute inset-0 w-full h-full rounded-[30px] sm:rounded-[36px] overflow-hidden [backface-visibility:hidden] bg-neutral-100 border border-neutral-200/80">
                      <Image
                        src={card.image}
                        alt={card.alt}
                        fill
                        sizes="(max-width: 768px) 300px, 400px"
                        priority={idx < 3}
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Gentle Cinematic Gradient Scrim */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10 flex flex-col justify-between p-7 sm:p-9 pointer-events-none">
                        {/* Top Category Badge */}
                        <div className="self-start">
                          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-medium tracking-wide shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            {card.badge}
                          </span>
                        </div>

                        {/* Bottom Title & Hover Hint */}
                        <div>
                          <h3 className="font-serif text-2xl sm:text-[2rem] text-white font-normal leading-[1.16] tracking-tight whitespace-pre-line drop-shadow-sm mb-2">
                            {card.title}
                          </h3>
                          <div className="flex items-center gap-1.5 text-emerald-300 text-xs sm:text-[0.82rem] font-medium tracking-wide">
                            <span>Hover to reveal pathway</span>
                            <MoveRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* BACK FACE: Rich Emerald Green Surface with Complete Content */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-[30px] sm:rounded-[36px] p-7 sm:p-9 flex flex-col justify-between items-center text-center text-white [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-2xl border border-emerald-400/30"
                      style={{
                        background:
                          "linear-gradient(145deg, #008068 0%, #006B57 55%, #004D3F 100%)",
                      }}
                    >
                      {/* Top: Delicate White Line Icon */}
                      <div className="pt-2 flex flex-col items-center">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/10 border border-white/20 backdrop-blur-xs shadow-inner">
                          <CardIcon type={card.iconType} color="#ffffff" />
                        </div>
                      </div>

                      {/* Middle: Title, Badge & Rich Content */}
                      <div className="my-auto px-1 sm:px-2 flex flex-col items-center">
                        <span className="inline-block text-[0.7rem] uppercase tracking-widest text-emerald-200 font-semibold mb-2">
                          {card.badge}
                        </span>
                        <h3 className="font-serif text-2xl sm:text-[2.1rem] text-white font-normal leading-[1.18] tracking-tight whitespace-pre-line mb-3">
                          {card.title}
                        </h3>
                        <p className="text-white/90 text-xs sm:text-[0.92rem] font-light leading-relaxed max-w-[270px]">
                          {card.description}
                        </p>
                      </div>

                      {/* Bottom: "Click to learn more" Action */}
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCard(card);
                        }}
                        className="pt-3 w-full border-t border-white/20 flex items-center justify-center gap-1.5 text-white/90 hover:text-white transition-colors cursor-pointer"
                      >
                        <span className="text-xs sm:text-[0.85rem] font-medium tracking-wide">
                          Click to learn more
                        </span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* BOTTOM CONTROLS (Harmonized with #FAF8F5 background) */}
        <footer className="relative z-20 pb-8 sm:pb-10 px-6 sm:px-12 flex items-center justify-between pointer-events-auto bg-transparent">
          {/* Experience with sound pill */}
          <button
            type="button"
            onClick={() => {
              const nextState = !isSoundEnabled;
              setIsSoundEnabled(nextState);
              if (nextState) playCalmTone(528);
            }}
            className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/85 border border-neutral-200/80 text-[#132a21] text-xs sm:text-sm font-medium hover:border-[#008068]/40 hover:bg-white transition-all shadow-xs group backdrop-blur-sm"
            title={isSoundEnabled ? "Mute sound" : "Experience with sound"}
          >
            <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center text-[#008068] group-hover:bg-[#008068] group-hover:text-white transition-colors">
              {isSoundEnabled ? (
                <Volume2 className="w-3 h-3" />
              ) : (
                <VolumeX className="w-3 h-3" />
              )}
            </div>
            <span className="text-neutral-700 font-light">
              {isSoundEnabled ? "Sound enabled" : "Experience with sound"}
            </span>
          </button>

          {/* Stepper Dots Indicator */}
          <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-white/85 border border-neutral-200/80 shadow-xs backdrop-blur-sm">
            {CARDS_DATA.map((c, i) => (
              <button
                key={c.id}
                type="button"
                onClick={() => scrollToCard(i)}
                className={`transition-all duration-300 rounded-full ${
                  activeCardIndex === i
                    ? "w-6 h-2 bg-[#008068]"
                    : "w-2 h-2 bg-neutral-300 hover:bg-[#008068]/60"
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
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/85 border border-neutral-200/80 flex items-center justify-center text-neutral-700 hover:text-[#008068] hover:border-[#008068]/40 hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition-all shadow-xs backdrop-blur-sm"
              aria-label="Previous card"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollToCard(Math.min(totalCards - 1, activeCardIndex + 1))}
              disabled={activeCardIndex === totalCards - 1}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/85 border border-neutral-200/80 flex items-center justify-center text-neutral-700 hover:text-[#008068] hover:border-[#008068]/40 hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition-all shadow-xs backdrop-blur-sm"
              aria-label="Next card"
            >
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
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="relative w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-[#008068]/20 text-center animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#008068] flex items-center justify-center shadow-md">
              <CardIcon type={selectedCard.iconType} color="#ffffff" />
            </div>
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#008068] bg-emerald-50 px-3.5 py-1 rounded-full mb-3 border border-[#008068]/20">
              {selectedCard.badge}
            </span>
            <h3 className="font-serif text-3xl text-[#132a21] font-normal mb-3 whitespace-pre-line">
              {selectedCard.title}
            </h3>
            <p className="text-neutral-600 text-sm leading-relaxed mb-4">
              {selectedCard.description}
            </p>
            <div className="p-4 rounded-2xl bg-neutral-50 text-xs text-neutral-700 font-medium leading-relaxed mb-6 border border-neutral-200/80">
              <div className="flex items-center justify-center gap-1.5 text-[#008068] font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Pathway Highlights</span>
              </div>
              {selectedCard.details}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSelectedCard(null)}
                className="flex-1 py-3 px-4 rounded-full border border-neutral-200 text-neutral-700 hover:bg-neutral-50 text-sm font-medium transition-colors"
              >
                Close
              </button>
              <a
                href="#consultation"
                onClick={() => setSelectedCard(null)}
                className="flex-1 py-3 px-4 rounded-full bg-[#008068] hover:bg-[#006B57] text-white text-sm font-medium transition-colors shadow-sm"
              >
                Book Pathway
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
