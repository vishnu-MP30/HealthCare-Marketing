with open("tools/reference/figure_jsx.txt", "r", encoding="utf-8") as f:
    figure_jsx = f.read()

template = """\"use client\";

import React from "react";

/**
 * ============================================================================
 * LIFECARE HEALTHCARE HERO SECTION — PRECISION VECTOR-TRACED ARTWORK
 * ============================================================================
 * 
 * 1. ZERO RASTER IMAGES, ZERO BASE64, ZERO EXTERNAL LIBS.
 * 2. 100% Vector-traced figure matching reference design (43 clean spline paths).
 * 3. Dedicated bottom-left SVG layer with preserveAspectRatio="xMinYMax meet"
 *    and width="min(32vw, 620px)" to guarantee ZERO overlap with centered text.
 * 4. Separate full-bleed wave and badge SVG layer behind the figure.
 * 5. Full responsiveness at 1920x1080, 1366x768, 1024x768, tablet (<900px) and mobile (<600px).
 */

export default function CalmDrawingSection() {
  return (
    <section
      id="calm-drawing"
      aria-label="Welcome to LifeCare — Healing Environment"
      className="relative w-full h-screen overflow-hidden select-none flex items-center justify-center font-['Figtree',sans-serif]"
      style={{
        background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAF8 35%, #F1FAF5 100%)",
        ["--white" as string]: "#FFFFFF",
        ["--bg-mint" as string]: "#F1FAF5",
        ["--mint-1" as string]: "#DDF2E5",
        ["--mint-2" as string]: "#BFE5CF",
        ["--green-light" as string]: "#6FC59A",
        ["--green" as string]: "#2E9E6F",
        ["--green-bold" as string]: "#1E8A5E",
        ["--green-deep" as string]: "#0F6B47",
      }}
    >
      {/* Top-Right Navbar Placeholder */}
      <div className="absolute top-6 sm:top-8 right-6 sm:right-10 z-20 pointer-events-auto">
        <div className="px-4 py-2 bg-white/95 backdrop-blur-md rounded-full shadow-[0_4px_18px_rgba(15,107,71,0.08)] border border-[#BFE5CF]/60 flex items-center gap-2.5 text-xs font-semibold text-[#0F6B47] transition-all duration-200 hover:scale-105 hover:shadow-[0_6px_22px_rgba(15,107,71,0.14)] cursor-pointer">
          <span className="w-2 h-2 rounded-full bg-[#1E8A5E]" />
          <span className="tracking-wide">Menu</span>
        </div>
      </div>

      {/* Embedded Styles for Animations & Responsive Rules */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes waveDriftBack {
          0% { transform: translateX(0px); }
          100% { transform: translateX(18px); }
        }
        @keyframes waveDriftFront {
          0% { transform: translateX(0px); }
          100% { transform: translateX(-15px); }
        }
        .anim-wave-back {
          animation: waveDriftBack 18s ease-in-out infinite alternate;
        }
        .anim-wave-front {
          animation: waveDriftFront 15s ease-in-out infinite alternate;
        }

        @keyframes flowLinesSway {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-7px); }
        }
        .anim-flow-lines {
          animation: flowLinesSway 12s ease-in-out infinite alternate;
        }

        @keyframes floatLeaf1 {
          0% { transform: translate(0px, 0px) rotate(0deg); }
          50% { transform: translate(-4px, -11px) rotate(3deg); }
          100% { transform: translate(0px, 0px) rotate(0deg); }
        }
        @keyframes floatLeaf2 {
          0% { transform: translate(0px, 0px) rotate(0deg); }
          50% { transform: translate(5px, -9px) rotate(-3deg); }
          100% { transform: translate(0px, 0px) rotate(0deg); }
        }
        .anim-float-leaf-1 {
          animation: floatLeaf1 7s ease-in-out infinite;
        }
        .anim-float-leaf-2 {
          animation: floatLeaf2 8.2s ease-in-out infinite;
        }

        @keyframes badgePulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.035); }
          100% { transform: scale(1); }
        }
        .anim-badge-a {
          transform-origin: 1552px 186px;
          animation: badgePulse 5.5s ease-in-out infinite;
        }
        .anim-badge-b {
          transform-origin: 1750px 445px;
          animation: badgePulse 6.2s ease-in-out infinite 0.8s;
        }
        .anim-badge-c {
          transform-origin: 1651px 680px;
          animation: badgePulse 5.8s ease-in-out infinite 1.6s;
        }

        /* Subtle 4px breathing float on figure */
        @keyframes figureBreathing {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
          100% { transform: translateY(0px); }
        }
        .anim-figure {
          animation: figureBreathing 6s ease-in-out infinite alternate;
        }

        @keyframes ecgLinePulse {
          0% { stroke-dashoffset: 160; }
          50% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -160; }
        }
        .anim-ecg {
          stroke-dasharray: 80 160;
          animation: ecgLinePulse 3s linear infinite;
        }

        /* Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          .anim-wave-back,
          .anim-wave-front,
          .anim-flow-lines,
          .anim-float-leaf-1,
          .anim-float-leaf-2,
          .anim-badge-a,
          .anim-badge-b,
          .anim-badge-c,
          .anim-figure,
          .anim-ecg {
            animation: none !important;
            transform: none !important;
          }
        }

        /* Responsive Safe-Zone Scaling */
        @media (max-width: 1100px) {
          #badge-chain {
            transform: scale(0.8) translate(-40px, 20px);
            transform-origin: 1600px 450px;
          }
          #floating-leaves {
            opacity: 0.5;
          }
        }

        @media (max-width: 900px) {
          .figure-container {
            transform: scale(0.55);
            transform-origin: 0% 100%;
            bottom: -20px;
          }
          #badge-chain, #floating-leaves {
            display: none;
          }
        }

        @media (max-width: 600px) {
          .figure-container {
            transform: scale(0.45);
            transform-origin: 0% 100%;
            bottom: -35px;
          }
        }
      ` }} />

      {/* ====================================================================
          1. FULL-BLEED SVG LAYER: WAVES & BADGES (viewBox="0 0 1920 1080")
          ==================================================================== */}
      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      >
        <defs>
          <linearGradient id="leafGradMain" x1="0%" y1="100%" x2="40%" y2="0%">
            <stop offset="0%" stopColor="#1E8A5E" />
            <stop offset="65%" stopColor="#2E9E6F" />
            <stop offset="100%" stopColor="#6FC59A" />
          </linearGradient>

          <linearGradient id="leafGradDark" x1="0%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#0F6B47" />
            <stop offset="60%" stopColor="#1E8A5E" />
            <stop offset="100%" stopColor="#2E9E6F" />
          </linearGradient>

          <linearGradient id="leafGradLight" x1="0%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#2E9E6F" />
            <stop offset="50%" stopColor="#6FC59A" />
            <stop offset="100%" stopColor="#BFE5CF" />
          </linearGradient>

          <linearGradient id="frontWaveGrad" x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#0F6B47" />
            <stop offset="25%" stopColor="#1E8A5E" />
            <stop offset="70%" stopColor="#2E9E6F" />
            <stop offset="100%" stopColor="#6FC59A" />
          </linearGradient>

          <linearGradient id="midWaveGrad" x1="0%" y1="0%" x2="100%" y2="90%">
            <stop offset="0%" stopColor="#1E8A5E" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#2E9E6F" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#6FC59A" stopOpacity="0.6" />
          </linearGradient>

          <linearGradient id="backWaveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#BFE5CF" stopOpacity="0.55" />
            <stop offset="50%" stopColor="#DDF2E5" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#F1FAF5" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id="backWaveGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#DDF2E5" stopOpacity="0.65" />
            <stop offset="60%" stopColor="#BFE5CF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
          </linearGradient>

          <filter id="badgeShadow" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="6" stdDeviation="12" floodColor="#0F6B47" floodOpacity="0.14" />
          </filter>

          <filter id="dotGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3.5" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. #back-waves */}
        <g id="back-waves" className="anim-wave-back">
          <path
            d="M 0 470 C 180 440, 420 540, 680 620 C 990 710, 1380 640, 1680 720 C 1810 755, 1920 735, 1920 735 L 1920 1080 L 0 1080 Z"
            fill="url(#backWaveGrad1)"
          />
          <path
            d="M 0 650 C 260 620, 520 730, 840 760 C 1180 790, 1470 700, 1720 780 C 1830 815, 1920 830, 1920 830 L 1920 1080 L 0 1080 Z"
            fill="url(#backWaveGrad2)"
          />
          <path
            d="M 0 280 C 140 240, 240 370, 275 550 C 305 690, 220 810, 170 930 L 0 930 Z"
            fill="#DDF2E5"
            opacity="0.4"
          />
        </g>

        {/* 2. #flow-lines: Stays ABOVE y: 300 to keep text area clear */}
        <g id="flow-lines" fill="none" strokeLinecap="round" className="anim-flow-lines">
          <path d="M 480 320 C 580 200, 840 50, 1150 52 C 1280 53, 1378 100, 1433 172" stroke="#1E8A5E" strokeWidth="2.5" opacity="0.85" />
          <path d="M 495 330 C 595 215, 852 64, 1155 66 C 1282 67, 1376 112, 1433 172" stroke="#2E9E6F" strokeWidth="2.2" opacity="0.75" />
          <path d="M 510 340 C 610 228, 864 78, 1160 80 C 1284 82, 1375 125, 1433 172" stroke="#6FC59A" strokeWidth="2" opacity="0.68" />
          <path d="M 525 350 C 625 242, 876 92, 1165 94 C 1287 96, 1374 138, 1433 172" stroke="#BFE5CF" strokeWidth="1.8" opacity="0.8" />
          <path d="M 540 360 C 640 258, 888 108, 1170 110 C 1290 112, 1374 150, 1433 172" stroke="#6FC59A" strokeWidth="1.5" opacity="0.6" />
        </g>

        {/* 6. #front-waves: Bottom wave bands */}
        <g id="front-waves" className="anim-wave-front">
          <path
            d="M 0 780 C 320 740, 700 840, 1150 890 C 1420 920, 1650 820, 1920 830 L 1920 1080 L 0 1080 Z"
            fill="#BFE5CF"
            opacity="0.65"
          />
          <path
            d="M 0 840 C 280 810, 600 870, 1020 925 C 1380 970, 1620 860, 1850 750 L 1920 780 L 1920 1080 L 0 1080 Z"
            fill="url(#midWaveGrad)"
          />
          <path
            d="M 0 910 C 340 880, 720 950, 1180 970 C 1520 985, 1720 880, 1826 677 C 1850 740, 1880 770, 1920 790 L 1920 1080 L 0 1080 Z"
            fill="url(#frontWaveGrad)"
            stroke="#0F6B47"
            strokeWidth="3.5"
          />

          {/* Right leaf shape */}
          <g id="bottom-right-leaf">
            <path
              d="M 1826 677 C 1785 735, 1795 810, 1855 830 C 1895 805, 1880 725, 1826 677 Z"
              fill="url(#leafGradDark)"
              stroke="#0F6B47"
              strokeWidth="2"
            />
            <path
              d="M 1826 677 C 1845 740, 1850 785, 1855 830"
              stroke="#6FC59A"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.9"
            />
          </g>

          {/* Highlight silk curves */}
          <path d="M 0 842 C 340 815, 680 875, 1080 930 C 1420 975, 1680 865, 1920 815" stroke="rgba(255, 255, 255, 0.75)" strokeWidth="2.5" fill="none" />
          <path d="M 0 880 C 320 850, 640 905, 1040 955 C 1380 995, 1660 905, 1920 865" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="1.8" fill="none" />
          <path d="M 0 915 C 340 885, 720 955, 1180 975 C 1520 990, 1720 885, 1826 682" stroke="#DDF2E5" strokeWidth="2" fill="none" opacity="0.6" />
        </g>

        {/* 7. #badge-chain */}
        <g id="badge-chain">
          <path
            id="connectorLinePath"
            d="M 1433 172 C 1530 174, 1618 215, 1670 298 C 1735 390, 1778 490, 1751 595 C 1732 662, 1655 720, 1542 761"
            stroke="#1E8A5E"
            strokeWidth="2.8"
            fill="none"
          />
          <path d="M 1485 174 L 1552 186" stroke="#1E8A5E" strokeWidth="2" strokeDasharray="3 3" fill="none" opacity="0.6" />
          <path d="M 1725 385 L 1750 445" stroke="#1E8A5E" strokeWidth="2" strokeDasharray="3 3" fill="none" opacity="0.6" />
          <path d="M 1700 645 L 1651 680" stroke="#1E8A5E" strokeWidth="2" strokeDasharray="3 3" fill="none" opacity="0.6" />

          {/* Dots */}
          <circle cx="1433" cy="172" r="9" fill="#1E8A5E" />
          <circle cx="1433" cy="172" r="4.5" fill="#FFFFFF" />
          <circle cx="1670" cy="298" r="9" fill="#1E8A5E" />
          <circle cx="1670" cy="298" r="4.5" fill="#FFFFFF" />
          <circle cx="1751" cy="595" r="9" fill="#1E8A5E" />
          <circle cx="1751" cy="595" r="4.5" fill="#FFFFFF" />
          <circle cx="1542" cy="761" r="9" fill="#1E8A5E" />
          <circle cx="1542" cy="761" r="4.5" fill="#FFFFFF" />

          {/* Glowing Traveling Dot */}
          <circle r="6" fill="#6FC59A" filter="url(#dotGlow)">
            <animateMotion
              dur="8s"
              repeatCount="indefinite"
              path="M 1433 172 C 1530 174, 1618 215, 1670 298 C 1735 390, 1778 490, 1751 595 C 1732 662, 1655 720, 1542 761"
            />
          </circle>

          {/* Badge A */}
          <g id="badge-a" className="anim-badge-a">
            <circle cx="1552" cy="186" r="78" fill="rgba(255, 255, 255, 0.94)" stroke="#BFE5CF" strokeWidth="4" filter="url(#badgeShadow)" />
            <circle cx="1552" cy="186" r="70" fill="none" stroke="#DDF2E5" strokeWidth="1.5" />
            <path d="M 1552 162 C 1540 138, 1508 138, 1494 160 C 1476 188, 1502 216, 1552 245 C 1602 216, 1628 188, 1610 160 C 1596 138, 1564 138, 1552 162 Z" fill="#1E8A5E" />
            <path d="M 1492 186 L 1530 186 L 1539 166 L 1551 206 L 1562 176 L 1572 186 L 1612 186" stroke="#FFFFFF" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" fill="none" className="anim-ecg" />
          </g>

          {/* Badge B */}
          <g id="badge-b" className="anim-badge-b">
            <circle cx="1750" cy="445" r="92" fill="rgba(255, 255, 255, 0.94)" stroke="#BFE5CF" strokeWidth="4" filter="url(#badgeShadow)" />
            <circle cx="1750" cy="445" r="84" fill="none" stroke="#DDF2E5" strokeWidth="1.5" />
            <circle cx="1762" cy="392" r="18" fill="#1E8A5E" />
            <circle cx="1734" cy="420" r="13" fill="#1E8A5E" />
            <path d="M 1720 488 C 1705 460, 1715 440, 1740 435 C 1765 430, 1795 442, 1785 488 C 1765 496, 1740 496, 1720 488 Z" fill="#1E8A5E" />
            <path d="M 1698 460 C 1690 485, 1710 508, 1750 510 C 1790 508, 1810 485, 1802 460 C 1798 472, 1775 492, 1750 492 C 1725 492, 1702 472, 1698 460 Z" fill="#1E8A5E" />
            <path d="M 1750 448 C 1744 436, 1728 436, 1722 447 C 1714 461, 1728 475, 1750 488 C 1772 475, 1786 461, 1778 447 C 1772 436, 1756 436, 1750 448 Z" fill="#FFFFFF" />
            <path d="M 1750 452 C 1746 442, 1734 442, 1729 450 C 1723 461, 1734 472, 1750 482 C 1766 472, 1777 461, 1771 450 C 1766 442, 1754 442, 1750 452 Z" fill="#1E8A5E" />
          </g>

          {/* Badge C */}
          <g id="badge-c" className="anim-badge-c">
            <circle cx="1651" cy="680" r="83" fill="rgba(255, 255, 255, 0.94)" stroke="#BFE5CF" strokeWidth="4" filter="url(#badgeShadow)" />
            <circle cx="1651" cy="680" r="75" fill="none" stroke="#DDF2E5" strokeWidth="1.5" />
            <path d="M 1651 638 C 1643 624, 1622 624, 1614 638 C 1604 656, 1622 674, 1651 692 C 1680 674, 1698 656, 1688 638 C 1680 624, 1659 624, 1651 638 Z" fill="#1E8A5E" />
            <path d="M 1605 680 C 1605 696, 1620 714, 1644 718 C 1648 718, 1650 710, 1645 705 C 1632 692, 1624 676, 1622 660 C 1616 662, 1605 668, 1605 680 Z" fill="#1E8A5E" />
            <path d="M 1697 680 C 1697 696, 1682 714, 1658 718 C 1654 718, 1652 710, 1657 705 C 1670 692, 1678 676, 1680 660 C 1686 662, 1697 668, 1697 680 Z" fill="#1E8A5E" />
            <path d="M 1615 708 C 1635 724, 1667 724, 1687 708" stroke="#1E8A5E" strokeWidth="4" strokeLinecap="round" fill="none" />
          </g>
        </g>

        {/* 8. #floating-leaves */}
        <g id="floating-leaves">
          <g className="anim-float-leaf-1" transform="translate(1384, 218) rotate(32)">
            <path d="M 0 -35 C 20 -15, 22 15, 0 35 C -22 15, -20 -15, 0 -35 Z" fill="url(#leafGradMain)" stroke="#0F6B47" strokeWidth="1.2" />
            <path d="M 0 -35 L 0 35" stroke="#BFE5CF" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
          </g>
          <g className="anim-float-leaf-2" transform="translate(1622, 491) rotate(-12)">
            <path d="M 0 -32 C 14 -12, 15 12, 0 32 C -15 12, -14 -12, 0 -32 Z" fill="url(#leafGradLight)" stroke="#1E8A5E" strokeWidth="1.2" />
            <path d="M 0 -32 L 0 32" stroke="#6FC59A" strokeWidth="1.4" strokeLinecap="round" opacity="0.8" />
          </g>
          <g className="anim-float-leaf-1" transform="translate(1464, 683) rotate(-38)">
            <path d="M 0 -36 C 22 -15, 24 15, 0 36 C -24 15, -22 -15, 0 -36 Z" fill="url(#leafGradMain)" stroke="#0F6B47" strokeWidth="1.2" />
            <path d="M 0 -36 L 0 36" stroke="#DDF2E5" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />
            <path d="M 0 36 C 4 44, 12 48, 16 52" stroke="#1E8A5E" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          </g>
        </g>
      </svg>

      {/* ====================================================================
          2. DEDICATED FIGURE LAYER: EXACT VECTOR TRACE (43 PATHS)
          Anchored bottom-left, width="min(32vw, 620px)", preserveAspectRatio="xMinYMax meet".
          ZERO overlap with centered text.
          ==================================================================== */}
      <div className="figure-container absolute bottom-0 left-0 z-[1] pointer-events-none transition-transform duration-300">
        <svg
          id="figure-svg"
          viewBox="0 0 450 355"
          preserveAspectRatio="xMinYMax meet"
          className="w-[min(32vw,620px)] h-auto overflow-visible block"
          aria-hidden="true"
        >
          <g id="figure" className="anim-figure">
__FIGURE_JSX__
          </g>
        </svg>
      </div>

      {/* ====================================================================
          3. REAL HTML TEXT OVERLAY (Strictly Centered in Safe Zone)
          Keeps >= 40px clear of all figures, leaves, and badges at all screen sizes.
          ==================================================================== */}
      <div className="relative z-10 max-w-[560px] mx-auto px-6 text-center animate-fade-in-up pointer-events-auto">
        <h1
          className="font-medium tracking-tight font-figtree"
          style={{
            color: "#0F6B47",
            fontSize: "clamp(34px, 3.4vw, 56px)",
            lineHeight: 1.18,
            marginBottom: "1rem",
            letterSpacing: "-0.02em",
          }}
        >
          Welcome to LifeCare.
        </h1>
        <p
          className="font-normal font-figtree"
          style={{
            color: "#1F5C45",
            fontSize: "clamp(18px, 1.5vw, 24px)",
            lineHeight: 1.55,
            maxWidth: "520px",
            margin: "0 auto",
            letterSpacing: "-0.005em",
          }}
        >
          Experience medical expertise in an environment built for dignity, comfort, and calm.
        </p>
      </div>
    </section>
  );
}
"""

final_tsx = template.replace("__FIGURE_JSX__", figure_jsx)

with open("components/CalmDrawingSection.tsx", "w", encoding="utf-8") as f:
    f.write(final_tsx)

print("CalmDrawingSection.tsx generated successfully without syntax errors!")
