"use client";

import React, { useState } from "react";
import Image from "next/image";
import ContourLinesCanvas from "./ContourLinesCanvas";
import ExperienceSoundButton from "./ExperienceSoundButton";
import PageLoader from "./PageLoader";

export default function FlowingHero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSoundActive, setIsSoundActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* 1. Page Loader Counter (0 -> 100) */}
      <PageLoader onComplete={() => setIsLoaded(true)} />

      <section
        className="relative w-full min-h-[100svh] overflow-hidden select-none"
        aria-label="Althea Aesthetic and Wellness Care"
        style={{
          background:
            "linear-gradient(180deg, #F9FAFC 0%, #F4F6FB 40%, #EBF0F8 80%, #FDF8F5 100%)",
        }}
      >
        {/* ====================================================================
            LAYER 0: BACKGROUND WARM RADIAL GLOW (Behind Woman's Face)
            ==================================================================== */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 50% 38%, rgba(255, 255, 255, 0.98) 0%, rgba(255, 245, 235, 0.65) 28%, rgba(235, 242, 252, 0.35) 55%, transparent 75%)",
          }}
          aria-hidden="true"
        />

        {/* Ambient warm orange subtle focal halo */}
        <div
          className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none z-0 blur-[100px] opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 160, 95, 0.35) 0%, rgba(255, 210, 180, 0.15) 50%, transparent 80%)",
          }}
          aria-hidden="true"
        />

        {/* ====================================================================
            LAYER 1: CONTOUR LINES CANVAS (Continuous Outward Topographic Rings)
            ==================================================================== */}
        <ContourLinesCanvas isSoundActive={isSoundActive} />

        {/* ====================================================================
            LAYER 2: SOFT CENTER GLOW WASH
            ==================================================================== */}
        <div
          className="absolute inset-0 pointer-events-none z-[2]"
          style={{
            background:
              "radial-gradient(circle at 50% 39%, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.25) 32%, transparent 64%)",
          }}
          aria-hidden="true"
        />

        {/* ====================================================================
            LAYER 3: CENTRE CHARACTER (FIXED PROFILE WOMAN)
            Never moves, never scales, no parallax, no hover transform.
            ==================================================================== */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 z-[3] pointer-events-none will-change-opacity transition-opacity duration-1000 ease-out ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            top: "10%",
            height: "70%",
            aspectRatio: "928 / 1228",
            maskImage:
              "linear-gradient(to bottom, black 0%, black 65%, rgba(0,0,0,0.7) 80%, transparent 97%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 65%, rgba(0,0,0,0.7) 80%, transparent 97%)",
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src="/hero/woman-profile.webp"
              alt="Woman in peaceful profile with soft glowing aesthetic skin"
              fill
              priority
              sizes="(max-width: 768px) 58vh, (max-width: 1024px) 62vh, 70vh"
              className="object-contain"
            />
          </div>
        </div>

        {/* ====================================================================
            LAYER 4: TEXT CONTENT (Headline, Subtitle, Warm Orange CTA)
            Baseline overlaps the woman's neck and shoulders.
            ==================================================================== */}
        <div
          className="absolute inset-x-0 z-[4] flex flex-col items-center text-center px-4 pointer-events-auto"
          style={{
            top: "clamp(390px, 51svh, 570px)",
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          {/* High-Contrast Editorial Serif Headline */}
          <h1
            className={`font-editorial font-normal text-[#262832] tracking-normal leading-[1.02] max-w-5xl transition-all duration-1000 ease-out ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3"
            }`}
            style={{
              fontSize: "clamp(2.85rem, 6.2vw, 5.6rem)",
              transitionDelay: "150ms",
            }}
          >
            Subtle care. Visible confidence.
          </h1>

          {/* Subtitle below headline */}
          <p
            className={`mt-4 sm:mt-5 font-sans text-[15px] sm:text-[17px] text-[#4b4e5c] font-normal max-w-2xl transition-all duration-1000 ease-out ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3"
            }`}
            style={{
              transitionDelay: "270ms",
            }}
          >
            Modern aesthetic and wellness care, with a gentle and personal approach.
          </p>

          {/* CTA: Warm Orange Pill Button */}
          <div
            className={`mt-6 sm:mt-8 transition-all duration-1000 ease-out ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3"
            }`}
            style={{
              transitionDelay: "390ms",
            }}
          >
            <a
              href="#journey"
              className="inline-flex items-center justify-center px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-[#E05D26] hover:bg-[#C94E1B] text-white font-sans text-[15px] sm:text-base font-medium tracking-normal transition-all duration-200 shadow-[0_4px_20px_rgba(224,93,38,0.25)] hover:shadow-[0_6px_28px_rgba(224,93,38,0.38)] hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
            >
              Start your journey
            </a>
          </div>
        </div>

        {/* ====================================================================
            LAYER 5: NAVBAR (32px side padding, ~110px top row)
            ==================================================================== */}
        <header className="absolute top-0 inset-x-0 z-20 px-6 sm:px-8 py-6 sm:py-8 flex items-center justify-between">
          {/* Left: Script-style Logo */}
          <div className="flex items-center">
            <a
              href="#"
              className="font-script font-bold text-[36px] sm:text-[42px] text-[#242630] hover:text-[#E05D26] transition-colors leading-none tracking-tight cursor-pointer select-none"
            >
              Althea
            </a>
          </div>

          {/* Centre: Nav links */}
          <nav
            className="hidden md:flex items-center gap-10 lg:gap-12"
            aria-label="Main Navigation"
          >
            {["About", "Services", "Journal", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-sans text-[16px] lg:text-[17px] text-[#3a3d4a] hover:text-[#E05D26] transition-colors font-normal"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Right: White pill button */}
          <div className="hidden md:flex items-center">
            <a
              href="#consultation"
              className="px-6 py-3 rounded-full bg-white text-[#2f323c] hover:text-[#E05D26] font-sans text-sm font-medium transition-all duration-200 shadow-[0_2px_14px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 border border-white/80 cursor-pointer"
            >
              Book a consultation
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-11 h-11 rounded-full bg-white/90 shadow-sm flex items-center justify-center text-[#2f323c] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-24 inset-x-6 z-30 p-6 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-black/5 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
            {["About", "Services", "Journal", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="font-sans text-lg text-[#3a3d4a] hover:text-[#E05D26] font-medium py-1 transition-colors"
              >
                {item}
              </a>
            ))}
            <div className="pt-2 border-t border-black/5">
              <a
                href="#consultation"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full py-3 rounded-full bg-[#E05D26] text-white font-sans text-sm font-medium shadow-md"
              >
                Book a consultation
              </a>
            </div>
          </div>
        )}

        {/* ====================================================================
            LAYER 6: BOTTOM-LEFT SOUND BUTTON ("Experience with sound")
            ==================================================================== */}
        <ExperienceSoundButton onSoundToggle={setIsSoundActive} />
      </section>
    </>
  );
}
