"use client";

import React, { useState } from "react";
import Image from "next/image";

/**
 * ============================================================================
 * FAMILY CARE & WOMEN'S HEALTH INTERACTIVE ACCORDION SECTION
 * ============================================================================
 * Positioned immediately after the Specialism Showcase section.
 * Built strictly according to reference images 1, 2, 3, and 4:
 *
 * Design features:
 * - Deep dark emerald / forest green background (#031d16) with subtle ambient
 *   curved vector lines.
 * - Center-aligned headline:
 *   "Healthcare designed for women and families that's personal and proven"
 *   with "and proven" in elegant serif italics.
 * - Subtitle: "Trusted by 2,300+ employers to improve outcomes across every stage"
 * - 4 vertical cards side-by-side with rounded corners (rounded-3xl).
 * - Interactive Responsive Hover Expansion:
 *   When pointing / hovering on any card, it widens smoothly (flex-[2.8]),
 *   other cards contract, and the card reveals its expanded clinical copy
 *   and vibrant [Learn more] button!
 */

interface FamilyCard {
  id: string;
  dotColor: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  alt: string;
}

const CARDS: FamilyCard[] = [
  {
    id: "fertility",
    dotColor: "bg-[#22d3ee] shadow-[0_0_8px_#22d3ee]",
    title: "Fertility & Family Building",
    subtitle: "Free, covered by Lifecare employer or health plan",
    description:
      "Personalized clinical navigation, fertility testing, egg freezing, IVF guidance, and compassionate adoption and surrogacy advisory.",
    image: "/fam-fertility.jpg",
    alt: "Young loving couple laughing together in golden sunlight - Fertility and Family Building",
  },
  {
    id: "maternity",
    dotColor: "bg-[#10b981] shadow-[0_0_8px_#10b981]",
    title: "Maternity & Newborn Care",
    subtitle: "Free, covered by Lifecare employer or health plan",
    description:
      "Providing proactive, continuous care to help families throughout pregnancy, postpartum recovery, newborn development, and return to work.",
    image: "/fam-maternity.jpg",
    alt: "Expecting mother peacefully holding baby bump in serene morning light - Maternity and Newborn Care",
  },
  {
    id: "pediatrics",
    dotColor: "bg-[#818cf8] shadow-[0_0_8px_#818cf8]",
    title: "Parenting & Pediatrics",
    subtitle: "Free, covered by Lifecare employer or health plan",
    description:
      "Helping parents navigate their child's development with 24/7 on-demand access to pediatric specialists, developmental screening, and expert family support.",
    image: "/fam-pediatrics.jpg",
    alt: "Parents joyfully playing with toddler child on cozy carpet - Parenting and Pediatrics",
  },
  {
    id: "midlife",
    dotColor: "bg-[#fbbf24] shadow-[0_0_8px_#fbbf24]",
    title: "Menopause & Midlife Health",
    subtitle: "Free, covered by Lifecare employer or health plan",
    description:
      "Specialized midlife health, evidence-based menopause symptom management, hormone therapy consultations, and holistic healthy aging protocols.",
    image: "/fam-midlife.jpg",
    alt: "Mature couple laughing warmly together in sunlit home - Menopause and Midlife Health",
  },
];

export default function FamilyCareAccordion() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const isAnyHovered = hoveredIndex !== null;

  return (
    <section
      id="family-care"
      className="family-care-stone-section relative w-full text-white py-24 sm:py-32 px-4 sm:px-8 lg:px-12 overflow-hidden select-none border-t border-white/10"
      aria-label="Lifecare Family & Women's Healthcare"
      style={{
        backgroundColor: "#0A4F2A",
        backgroundImage: `
          radial-gradient(1.2px 1.2px at 30px 40px, rgba(255, 255, 255, 0.12), transparent),
          radial-gradient(1px 1px at 85px 115px, rgba(0, 0, 0, 0.22), transparent),
          radial-gradient(1.4px 1.4px at 150px 65px, rgba(255, 255, 255, 0.10), transparent),
          radial-gradient(1px 1px at 210px 175px, rgba(0, 0, 0, 0.25), transparent),
          radial-gradient(ellipse at 50% 25%, #0E602A 0%, #0A4F24 50%, #063918 100%)
        `,
        backgroundSize: "240px 240px, 240px 240px, 240px 240px, 240px 240px, 100% 100%",
      }}
    >
      {/* ====================================================================
          SVG DEFS: Micro-Grain Stone Texture Filter (Zero External Files)
          ==================================================================== */}
      <svg
        className="absolute w-0 h-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <filter id="stoneGrainFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="matrix"
            values="
              0 0 0 0 0.05
              0 0 0 0 0.38
              0 0 0 0 0.18
              0 0 0 0.13 0"
          />
        </filter>
      </svg>

      {/* ====================================================================
          BACKGROUND TEXTURE: Subtle SVG Micro-Noise Overlay
          ==================================================================== */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-40 mix-blend-overlay"
        style={{
          filter: "url(#stoneGrainFilter)",
        }}
        aria-hidden="true"
      />

      {/* ====================================================================
          BACKGROUND TEXTURE: Soft Ambient Lighting & Flowing Engraved Lines
          ==================================================================== */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Soft background ambient radial glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[950px] h-[520px] bg-white/[0.05] rounded-full blur-[140px]" />
        <div className="absolute -bottom-24 right-8 w-[550px] h-[420px] bg-[#16734A]/35 rounded-full blur-[130px]" />
        <div className="absolute top-1/3 -left-20 w-[450px] h-[450px] bg-[#064A2B]/50 rounded-full blur-[120px]" />

        {/* Delicate sweeping curved engraved contour lines (Matching Reference Image) */}
        <svg
          className="absolute inset-0 w-full h-full fill-none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1440 900"
        >
          {/* Main central sweeping line dipping gracefully under the headline */}
          <path
            d="M -60,250 C 320,180 720,330 1500,230"
            stroke="rgba(255, 255, 255, 0.22)"
            strokeWidth="1.2"
          />
          {/* Soft secondary echo line */}
          <path
            d="M -60,310 C 380,260 820,390 1500,290"
            stroke="rgba(255, 255, 255, 0.11)"
            strokeWidth="0.9"
          />
          {/* Lower graceful wave behind the cards */}
          <path
            d="M -60,690 C 480,560 980,780 1500,630"
            stroke="rgba(255, 255, 255, 0.13)"
            strokeWidth="1.1"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto flex flex-col items-center">
        {/* ====================================================================
            CENTERED HEADLINE & SUBTITLE
            Exact typography matching Reference Image
            ==================================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 px-4">
          <h2 className="font-sans font-light text-3xl sm:text-5xl lg:text-[58px] xl:text-[64px] text-white tracking-[-0.03em] leading-[1.08] drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
            Healthcare designed<br />
            for women and families<br />
            that&apos;s personal<br />
            <span className="font-serif italic font-normal text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
              and proven
            </span>
          </h2>

          <p className="mt-5 text-sm sm:text-base lg:text-lg text-white/90 font-normal tracking-tight drop-shadow-[0_1px_4px_rgba(0,0,0,0.35)]">
            Trusted by 2,300+ employers &amp; Lifecare clinical partners to improve outcomes across every stage
          </p>
        </div>

        {/* ====================================================================
            4-CARD SCULPTED STONE FRAMES (Matching Reference Image)
            Tactile beveled stone borders, rounded corners & smooth accordion expansion
            ==================================================================== */}
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 w-full h-[880px] lg:h-[500px] xl:h-[530px]">
          {CARDS.map((card, index) => {
            const isExpanded = hoveredIndex === index;

            return (
              <div
                key={card.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setHoveredIndex(isExpanded ? null : index)}
                tabIndex={0}
                role="button"
                aria-expanded={isExpanded}
                aria-label={`${card.title} - Click or hover to explore details`}
                style={{
                  backgroundColor: "#0A4623",
                  backgroundImage: `
                    radial-gradient(1px 1px at 20px 25px, rgba(255, 255, 255, 0.12), transparent),
                    radial-gradient(1px 1px at 60px 75px, rgba(0, 0, 0, 0.24), transparent),
                    linear-gradient(180deg, #0E5B2B 0%, #0A4722 55%, #053316 100%)
                  `,
                  backgroundSize: "120px 120px, 120px 120px, 100% 100%",
                }}
                className={`
                  group relative rounded-[28px] sm:rounded-[32px] cursor-pointer
                  p-2.5 sm:p-3 lg:p-3.5
                  border border-white/20
                  shadow-[0_20px_45px_-10px_rgba(0,0,0,0.55),0_6px_18px_rgba(0,0,0,0.35),inset_0_1.5px_1px_rgba(255,255,255,0.28),inset_0_-2px_3px_rgba(0,0,0,0.5)]
                  transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
                  hover:shadow-[0_26px_55px_-8px_rgba(0,0,0,0.65),inset_0_1.5px_1px_rgba(255,255,255,0.36),inset_0_-2px_3px_rgba(0,0,0,0.5)]
                  hover:border-white/30
                  ${
                    isExpanded
                      ? "flex-[1.6] lg:flex-[1.65]"
                      : isAnyHovered
                      ? "flex-[0.8] opacity-85 hover:opacity-100"
                      : "flex-1"
                  }
                `}
              >
                {/* Inner Picture Window with Inset Bevel Frame */}
                <div className="relative w-full h-full rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-[inset_0_2px_6px_rgba(0,0,0,0.45),inset_0_0_1px_rgba(255,255,255,0.18)]">
                  {/* Healthcare Photograph */}
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, (max-width: 1440px) 40vw, 30vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    priority={true}
                  />

                  {/* Dark Gradient Overlay for optimal text readability */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      isExpanded
                        ? "bg-gradient-to-t from-black/95 via-black/45 to-black/15"
                        : "bg-gradient-to-t from-black/85 via-black/30 to-transparent group-hover:from-black/90"
                    }`}
                  />

                  {/* Top-Left Circular Indicator Badge (Matching Reference Image) */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-black/55 backdrop-blur-md flex items-center justify-center border border-white/20 z-20 shadow-md">
                    <span className={`w-2.5 h-2.5 rounded-full ${card.dotColor}`} />
                  </div>

                  {/* Bottom Content Area */}
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 lg:p-6 z-20 flex flex-col justify-end text-white">
                    <h3 className="font-sans font-semibold text-base sm:text-lg lg:text-xl leading-tight text-white mb-1 tracking-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
                      {card.title}
                    </h3>

                    <p className="text-[11px] sm:text-xs text-white/85 font-normal leading-snug drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                      {card.subtitle}
                    </p>

                    {/* Expanded Content (Smoothly slides and fades in upon hover/click) */}
                    <div
                      className={`transition-all duration-400 ease-out overflow-hidden ${
                        isExpanded
                          ? "max-h-48 opacity-100 mt-3 pt-2.5 border-t border-white/20"
                          : "max-h-0 opacity-0 pointer-events-none"
                      }`}
                    >
                      <p className="text-xs sm:text-[13px] text-white/90 leading-relaxed font-sans max-w-md drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                        {card.description}
                      </p>

                      <div className="mt-3.5">
                        <button
                          type="button"
                          className="px-4 sm:px-5 py-2 rounded-lg bg-white text-[#0A4722] font-semibold text-xs sm:text-sm tracking-wide shadow-md hover:bg-[#EAF5EF] transition-all duration-200 inline-flex items-center gap-2 group/btn"
                        >
                          <span>Learn more</span>
                          <span className="transition-transform duration-200 group-hover/btn:translate-x-0.5">→</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
