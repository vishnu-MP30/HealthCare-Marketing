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

  // Patient hand (bottom-left) movement
  const patientTranslateX = (1 - p) * -38;
  const patientTranslateY = (1 - p) * 38;

  // Surgeon hand (top-right) movement
  const surgeonTranslateX = (1 - p) * 38;
  const surgeonTranslateY = (1 - p) * -38;

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[250vh] bg-[#141618] select-none border-t border-[#24272B]"
      aria-label="Patient Recovery Connection"
    >
      {/* ====================================================================
          STICKY FULLSCREEN VIEWPORT (Pinned for the entire scroll length)
          Monochromatic Dark Theme
          ==================================================================== */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-6 sm:p-10 lg:p-14 bg-[#141618]">
        {/* Soft radial spotlight centered behind hands */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(232, 104, 42, 0.04) 0%, rgba(20, 22, 24, 0.8) 60%, #141618 100%)",
          }}
        />

        {/* Subtle hospital architectural ambient lines */}
        <svg
          className="absolute inset-0 w-full h-full fill-none opacity-20 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1440 900"
        >
          <path
            d="M 0,450 C 400,380 900,520 1440,450"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="1"
          />
        </svg>



        {/* ====================================================================
            CENTER HERO TITLE: "Care // Always" (Care white, Always orange)
            ==================================================================== */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 px-4">
          <h2
            className="font-display font-semibold tracking-tight select-none leading-none text-center whitespace-nowrap drop-shadow-md"
            style={{
              fontSize: "clamp(56px, 11vw, 200px)",
            }}
          >
            <span style={{ color: "#FFFFFF" }}>Care</span>{" "}
            <span style={{ color: "rgba(255, 255, 255, 0.3)" }}>//</span>{" "}
            <span style={{ color: "#E8682A" }}>Always</span>
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
                className="object-contain object-bottom-left filter drop-shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
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
                className="object-contain object-top-right filter drop-shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
              />
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}
