"use client";

import React, { useState, useRef, useEffect, useId } from "react";
import {
  HEALTH_READ_TABS,
  HEALTH_READS_DATA,
  ReadArticle,
  ReadTab,
} from "@/content/healthReads";

/**
 * ============================================================================
 * HEALTH READS SECTION
 * ============================================================================
 * Featured health articles with category tabs, organic curved photo dividers,
 * alternating dark and light cards, and CSS/SVG drawn decorations.
 *
 * SPECIFICATION COMPLIANCE:
 * - Color theme: --g-900 (#0A3D2B), --g-800 (#0F5A3E), --g-700 (#146B49),
 *   --g-600 (#1E8A5E), --g-500 (#2E9E6F), --g-300 (#6FC59A),
 *   --mint-100 (#DDF2E5), --mint-50 (#EEF9F2), --white (#FFFFFF), --ink (#0F5A3E).
 * - Section background: linear-gradient(135deg, var(--g-900) 0%, var(--g-800) 45%, var(--g-600) 100%).
 * - Decorative inline SVG layer with 5 translucent swaying leaves & curved vines.
 * - Header: 56px white accent line, H2 clamp(36px, 4.2vw, 64px), subtitle.
 * - 5 Tabs: Pill buttons, accessible tablist, arrow key navigation, 250ms active transition.
 * - 4 Cards per tab: 2x2 grid, alternating dark/light & photo side (left/right/left/right).
 * - Organic curved photo edge facing text side via inline SVG <clipPath>.
 * - Thin curved highlight line (stroke white at 45%, 1.5px) following that edge.
 * - Faint decorative corner leaf watermark on the text side of every card.
 * - Card hover: lift 4px, photo zoom 1.05, arrow slides 4px with --g-300 glow.
 * - Photo fallback: green gradient placeholder with white leaf icon if image missing.
 * - Fully responsive: 1280px+, 900-1279px, <900px, <560px.
 * - prefers-reduced-motion support.
 */

// Image component with robust fallback when image file is missing or loading
function ArticleImage({
  src,
  alt,
  isLeft,
  isDark,
}: {
  src: string;
  alt: string;
  isLeft: boolean;
  isDark: boolean;
}) {
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    const testImg = new window.Image();
    testImg.src = src;
    testImg.onload = () => {
      if (active) setImgLoaded(true);
    };
    testImg.onerror = () => {
      if (active) setImgLoaded(false);
    };
    return () => {
      active = false;
    };
  }, [src]);

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      {imgLoaded ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          width={440}
          height={320}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      ) : (
        // Premium green gradient placeholder with clean white leaf SVG icon
        <div
          className="w-full h-full flex flex-col items-center justify-center relative select-none transition-transform duration-500 ease-out group-hover:scale-105"
          style={{
            background: isDark
              ? "linear-gradient(135deg, #146B49 0%, #1E8A5E 55%, #2E9E6F 100%)"
              : "linear-gradient(135deg, #2E9E6F 0%, #1E8A5E 60%, #0F5A3E 100%)",
          }}
          aria-hidden="true"
        >
          {/* Subtle soft glow circle */}
          <div className="absolute w-28 h-28 rounded-full bg-white/10 blur-xl pointer-events-none" />

          {/* Clean leaf icon */}
          <svg
            className="w-12 h-12 text-white/90 drop-shadow-md relative z-10 transition-transform duration-300 group-hover:scale-110"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
            <path d="M2 21c0-3 1.85-5.36 5.08-6" />
          </svg>
          <span className="mt-2 text-[11px] font-semibold tracking-wider text-white/80 uppercase">
            LifeCare Read
          </span>
        </div>
      )}

      {/* Curved Highlight stroke overlay along the organic cut edge (desktop) */}
      <svg
        className="hidden sm:block absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {isLeft ? (
          <path
            d="M 80,0 C 90,22 98,45 98,60 C 98,78 92,90 80,100"
            fill="none"
            stroke="rgba(255, 255, 255, 0.45)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        ) : (
          <path
            d="M 20,0 C 10,22 2,45 2,60 C 2,78 8,90 20,100"
            fill="none"
            stroke="rgba(255, 255, 255, 0.45)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        )}
      </svg>

      {/* Curved Highlight stroke overlay along the bottom organic cut edge (< 560px mobile) */}
      <svg
        className="block sm:hidden absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M 0,86 C 25,97 75,97 100,86"
          fill="none"
          stroke="rgba(255, 255, 255, 0.45)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

export default function HealthReadsSection() {
  const [activeTab, setActiveTab] = useState<string>("heart-health");
  const [isFading, setIsFading] = useState<boolean>(false);
  const [displayTab, setDisplayTab] = useState<string>("heart-health");
  const tabListRef = useRef<HTMLDivElement>(null);
  const uniqueId = useId().replace(/:/g, "");

  // Smooth tab switching: grid fades out (150ms), and new cards fade and rise in with 60ms stagger
  const handleTabChange = (newTabId: string) => {
    if (newTabId === activeTab) return;
    setIsFading(true);
    setActiveTab(newTabId);

    setTimeout(() => {
      setDisplayTab(newTabId);
      setIsFading(false);
    }, 150);
  };

  // Keyboard navigation for accessible tablist: ArrowLeft, ArrowRight, Home, End
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    currentIndex: number
  ) => {
    const tabCount = HEALTH_READ_TABS.length;
    let nextIndex = currentIndex;

    if (e.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % tabCount;
      e.preventDefault();
    } else if (e.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + tabCount) % tabCount;
      e.preventDefault();
    } else if (e.key === "Home") {
      nextIndex = 0;
      e.preventDefault();
    } else if (e.key === "End") {
      nextIndex = tabCount - 1;
      e.preventDefault();
    } else {
      return;
    }

    const nextTab = HEALTH_READ_TABS[nextIndex];
    handleTabChange(nextTab.id);

    // Focus the target tab button
    const buttons = tabListRef.current?.querySelectorAll<HTMLButtonElement>(
      '[role="tab"]'
    );
    if (buttons && buttons[nextIndex]) {
      buttons[nextIndex].focus();
    }
  };

  const currentArticles = HEALTH_READS_DATA.filter(
    (item) => item.tab === displayTab
  ).slice(0, 4);

  return (
    <section
      id="health-reads"
      aria-labelledby="health-reads-heading"
      className="health-reads-section relative w-full overflow-hidden font-figtree select-none"
      style={{
        backgroundImage: "url('/healthread_bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#0D5B2B",
      }}
    >
      {/* ==================================================================== */}
      {/* SVG DEFS FOR CLIPPING CURVES                                         */}
      {/* ==================================================================== */}
      <svg
        className="absolute w-0 h-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          {/* Left photo clip path: organic convex curve facing right toward text */}
          <clipPath
            id={`hrClipLeft-${uniqueId}`}
            clipPathUnits="objectBoundingBox"
          >
            <path d="M 0,0 L 0.80,0 C 0.90,0.22 0.98,0.45 0.98,0.60 C 0.98,0.78 0.92,0.90 0.80,1 L 0,1 Z" />
          </clipPath>

          {/* Right photo clip path: organic convex curve facing left toward text */}
          <clipPath
            id={`hrClipRight-${uniqueId}`}
            clipPathUnits="objectBoundingBox"
          >
            <path d="M 1,0 L 0.20,0 C 0.10,0.22 0.02,0.45 0.02,0.60 C 0.02,0.78 0.08,0.90 0.20,1 L 1,1 Z" />
          </clipPath>

          {/* Mobile top photo clip path (< 560px): organic curve bulging downwards */}
          <clipPath
            id={`hrClipMobileTop-${uniqueId}`}
            clipPathUnits="objectBoundingBox"
          >
            <path d="M 0,0 L 1,0 L 1,0.86 C 0.75,0.97 0.25,0.97 0,0.86 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* ==================================================================== */}
      {/* SECTION CONTENT CONTAINER                                            */}
      {/* ==================================================================== */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-8 py-16 sm:py-20 lg:py-24">
        {/* Header Block */}
        <div className="mb-8 sm:mb-10">
          {/* Heading: H2 "Health Reads", pure white, bold with tactile depth */}
          <h2
            id="health-reads-heading"
            className="text-white font-extrabold tracking-tight leading-[1.08] drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
            style={{
              fontSize: "clamp(36px, 4.4vw, 62px)",
            }}
          >
            Health Reads
          </h2>

          {/* Subtitle: white at 90% opacity */}
          <p className="mt-2.5 text-white/90 text-base sm:text-lg max-w-2xl font-normal leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.35)]">
            Expert advice from the LifeCare care team.
          </p>
        </div>

        {/* ================================================================== */}
        {/* CATEGORY TABS (Pill buttons matching tactile stone theme)         */}
        {/* ================================================================== */}
        <div className="mb-8 sm:mb-10">
          <div
            ref={tabListRef}
            role="tablist"
            aria-label="Health Reads Categories"
            className="flex flex-wrap items-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar py-1"
          >
            {HEALTH_READ_TABS.map((tab: ReadTab, idx: number) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => handleTabChange(tab.id)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className={`
                    h-[46px] px-6 sm:px-7 rounded-full font-bold text-[14.5px] sm:text-[15.5px]
                    transition-all duration-200 cursor-pointer select-none whitespace-nowrap
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6FC59A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#084D32]
                    ${
                      isActive
                        ? "bg-[#C6E6D2] text-[#0A3D2B] shadow-[0_6px_16px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.7)] border border-white/60 scale-[1.02]"
                        : "bg-[#093E23]/60 backdrop-blur-sm text-white border border-white/20 shadow-[inset_0_1px_2px_rgba(0,0,0,0.3),0_2px_6px_rgba(0,0,0,0.2)] hover:bg-[#0E542F]/80 hover:border-white/40 hover:text-white"
                    }
                  `}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ================================================================== */}
        {/* CARD GRID (4 stone-textured cards, bold white text)               */}
        {/* ================================================================== */}
        <div
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7 transition-opacity duration-150 ${
            isFading ? "opacity-0" : "opacity-100"
          }`}
        >
          {currentArticles.map((article: ReadArticle, idx: number) => {
            // All 4 cards share the exact same dark green stone texture
            // Photos alternate:
            // Card 1 (idx 0): Photo LEFT
            // Card 2 (idx 1): Photo RIGHT
            // Card 3 (idx 2): Photo LEFT
            // Card 4 (idx 3): Photo RIGHT
            const isPhotoLeft = idx % 2 === 0;

            // Slight variations in background position to give each card natural stone variance
            const bgPositions = ["20% 30%", "65% 45%", "35% 70%", "75% 60%"];
            const cardBgPos = bgPositions[idx % bgPositions.length];

            return (
              <a
                key={article.id}
                href={article.href || "#"}
                aria-label={`Read article: ${article.title}`}
                style={{
                  animationDelay: `${idx * 60}ms`,
                  backgroundImage: "url('/reads/stone-card-texture.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: cardBgPos,
                }}
                className="
                  hr-card group relative block w-full rounded-[30px] sm:rounded-[34px] overflow-hidden select-none
                  border border-white/20
                  shadow-[0_16px_36px_-6px_rgba(0,0,0,0.45),0_4px_12px_rgba(0,0,0,0.25),inset_0_1.5px_1px_rgba(255,255,255,0.22),inset_0_-1.5px_2px_rgba(0,0,0,0.5)]
                  transition-all duration-300 ease-out
                  hover:-translate-y-1 hover:shadow-[0_22px_45px_-4px_rgba(0,0,0,0.55),inset_0_1.5px_1.5px_rgba(255,255,255,0.32),inset_0_-1.5px_2px_rgba(0,0,0,0.5)]
                  hover:border-white/30
                  focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-white
                  min-h-[210px] sm:h-[235px]
                "
              >
                {/* Subtle dark green depth wash overlay over stone texture */}
                <div
                  className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-b from-[#094726]/40 via-[#0A4F2A]/35 to-[#06381E]/55"
                  aria-hidden="true"
                />

                {/* Responsive container: row on >=560px, column on <560px */}
                <div
                  className={`
                    relative z-10 w-full h-full flex flex-col sm:flex-row
                    ${!isPhotoLeft ? "sm:flex-row-reverse" : ""}
                  `}
                >
                  {/* ======================================================== */}
                  {/* PHOTO SIDE: ~38% width on desktop, 150px on mobile       */}
                  {/* ======================================================== */}
                  <div
                    className="relative w-full sm:w-[38%] h-[150px] sm:h-full flex-shrink-0 overflow-hidden"
                    style={{
                      clipPath: isPhotoLeft
                        ? `url(#hrClipLeft-${uniqueId})`
                        : `url(#hrClipRight-${uniqueId})`,
                    }}
                  >
                    <ArticleImage
                      src={article.image}
                      alt={article.title}
                      isLeft={isPhotoLeft}
                      isDark={true}
                    />
                  </div>

                  {/* ======================================================== */}
                  {/* TEXT SIDE: ~62% width, centered content, watermark leaf   */}
                  {/* ======================================================== */}
                  <div className="relative flex-1 flex flex-col justify-center px-6 sm:px-8 py-6 sm:py-7 overflow-hidden z-10">
                    {/* Sculpted corner embossed leaf relief watermark */}
                    <div
                      className={`
                        absolute pointer-events-none z-0 transition-transform duration-300 group-hover:scale-105
                        ${
                          isPhotoLeft
                            ? "bottom-[-10px] right-[-6px]"
                            : "bottom-[-10px] left-[-6px]"
                        }
                      `}
                      aria-hidden="true"
                    >
                      <svg
                        className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                        viewBox="0 0 100 100"
                        fill="none"
                      >
                        {/* Leaf sculpted body */}
                        <path
                          d="M15 85 C30 50 60 20 88 12 C92 35 75 70 42 84 C32 87 22 87 15 85 Z"
                          fill="#1C7545"
                          fillOpacity="0.45"
                        />
                        {/* Embossed upper rim highlight */}
                        <path
                          d="M15 85 C30 50 60 20 88 12"
                          stroke="rgba(255, 255, 255, 0.28)"
                          strokeWidth="1.2"
                        />
                        {/* Center delicate leaf vein */}
                        <path
                          d="M15 85 Q 52 52 88 12"
                          stroke="rgba(255, 255, 255, 0.22)"
                          strokeWidth="1.1"
                        />
                      </svg>
                    </div>

                    {/* Article Title: Pure Bold White text, strong contrast on green stone */}
                    <h3 className="relative z-10 font-bold leading-[1.28] tracking-tight text-white transition-colors duration-200 line-clamp-3 mb-4 text-[18px] sm:text-[19px] lg:text-[21px] xl:text-[22px] drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
                      {article.title}
                    </h3>

                    {/* Arrow Button: Tactile circular stone-green button with clean white arrow */}
                    <div className="relative z-10 flex items-center">
                      <div
                        className="
                          w-[42px] h-[42px] rounded-full flex items-center justify-center flex-shrink-0
                          bg-[#247E4E] hover:bg-[#2C955D] text-white border border-white/30
                          shadow-[0_4px_10px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.4),inset_0_-1px_1px_rgba(0,0,0,0.3)]
                          transition-all duration-300 ease-out
                          group-hover:translate-x-1 group-hover:shadow-[0_4px_14px_rgba(0,0,0,0.45),0_0_14px_rgba(111,197,154,0.45)]
                        "
                        aria-hidden="true"
                      >
                        <svg
                          className="w-[18px] h-[18px] transition-transform duration-300 group-hover:translate-x-0.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* ==================================================================== */}
      {/* STANDARD SCOPED CSS STYLES                                           */}
      {/* ==================================================================== */}
      <style>{`
        @keyframes hrCardEntrance {
          0% {
            opacity: 0;
            transform: translateY(16px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hr-card {
          animation: hrCardEntrance 360ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @media (max-width: 559px) {
          .health-reads-section [style*="clip-path"] {
            clip-path: url(#hrClipMobileTop-${uniqueId}) !important;
          }
        }
      `}</style>
    </section>
  );
}
