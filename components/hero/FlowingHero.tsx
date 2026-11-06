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
        aria-label="Mendly Aesthetic and Clinical Wellness Care"
        style={{
          background:
            "radial-gradient(ellipse 45% 55% at 50% 52%, #FFF6EF 0%, #F3EEF3 50%, #E3E8F2 100%)",
        }}
      >
        {/* ====================================================================
            LAYER 1: CONTOUR LINES CANVAS (Lobed "Flower" Topographic Rings)
            Positioned absolutely under character with zero glow or blur.
            ==================================================================== */}
        <ContourLinesCanvas isSoundActive={isSoundActive} />

        {/* ====================================================================
            LAYER 2: CENTRE CHARACTER (FIXED DOCTOR PORTRAIT)
            Never moves, never scales, no parallax, no hover transform.
            Face stays fully above headline; stethoscope and coat sit behind text.
            ==================================================================== */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 z-[3] pointer-events-none will-change-opacity transition-opacity duration-1000 ease-out ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            top: "8%",
            height: "63%",
            aspectRatio: "896 / 1200",
            maskImage:
              "linear-gradient(to bottom, #000 0%, #000 52%, transparent 86%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 0%, #000 52%, transparent 86%)",
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src="/hero/doctor-portrait.png"
              alt="Friendly female doctor in white coat with stethoscope"
              fill
              priority
              sizes="(max-width: 768px) 52vh, (max-width: 1024px) 58vh, 63vh"
              className="object-contain"
            />
          </div>
        </div>

        {/* ====================================================================
            LAYER 3: TEXT CONTENT (Headline, Subtitle, Medium Orange CTA)
            Shifted down ~70px so "Subtle care." starts below stethoscope & chest.
            ==================================================================== */}
        <div
          className="absolute inset-x-0 z-[4] flex flex-col items-center text-center px-4 pointer-events-auto"
          style={{
            top: "clamp(420px, 54svh, 580px)",
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          {/* Heading: Font weight 600, negative tracking -0.02em */}
          <h1
            className={`font-display tracking-[-0.02em] leading-[1.03] max-w-5xl transition-all duration-1000 ease-out ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3"
            }`}
            style={{
              fontSize: "clamp(2.85rem, 6.2vw, 5.6rem)",
              fontWeight: 600,
              transitionDelay: "150ms",
            }}
          >
            <span style={{ color: "#2B2D36", fontWeight: 600 }}>Subtle care.</span>{" "}
            <span style={{ color: "#E8793A", fontWeight: 600 }}>Visible confidence.</span>
          </h1>

          {/* Subtitle below headline */}
          <p
            className={`mt-3.5 sm:mt-4 font-body text-[15px] sm:text-[17px] text-[#2B2D36]/75 font-normal max-w-2xl transition-all duration-1000 ease-out ${
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
        </div>

        {/* ====================================================================
            LAYER 4: NAVBAR (32px side padding, ~110px top row)
            ==================================================================== */}
        <header className="absolute top-0 inset-x-0 z-20 px-6 sm:px-8 py-6 sm:py-8 flex items-center justify-between">
          {/* Left: Script-style Logo */}
          <div className="flex items-center">
            <a
              href="#"
              className="font-script font-bold text-[36px] sm:text-[42px] text-[#2B2D36] hover:text-[#E8793A] transition-colors leading-none tracking-tight cursor-pointer select-none"
            >
              Mendly
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
                className="font-body text-[16px] lg:text-[17px] text-[#2B2D36]/80 hover:text-[#E8793A] transition-colors font-medium"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Right: White pill button */}
          <div className="hidden md:flex items-center">
            <a
              href="#consultation"
              className="px-6 py-3 rounded-full bg-white text-[#2B2D36] hover:text-[#E8793A] hover:border-[#E8793A] font-body text-sm font-medium transition-all duration-200 shadow-[0_2px_14px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 border border-[#2B2D36]/15 cursor-pointer"
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
          <div className="md:hidden absolute top-24 inset-x-6 z-30 p-6 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-[#1F2123]/10 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
            {["About", "Services", "Journal", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="font-body text-lg text-[#2B2D36] hover:text-[#E8793A] font-medium py-1 transition-colors"
              >
                {item}
              </a>
            ))}
            <div className="pt-2 border-t border-[#1F2123]/10">
              <a
                href="#consultation"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full py-3 rounded-full bg-[#E8793A] text-white font-body text-sm font-medium shadow-md"
              >
                Book a consultation
              </a>
            </div>
          </div>
        )}

        {/* ====================================================================
            LAYER 5: BOTTOM-LEFT SOUND BUTTON ("Experience with sound")
            Border: 1.5px #E8793A, label "Experience" in charcoal, "with sound" in grey
            ==================================================================== */}
        <ExperienceSoundButton onSoundToggle={setIsSoundActive} />

        {/* ====================================================================
            LAYER 6: BOTTOM-RIGHT CTA BUTTON ("Start your journey")
            Right-aligned inside the hero section so it is never cut off
            ==================================================================== */}
        <div
          className={`absolute right-6 md:right-8 bottom-6 md:bottom-8 z-30 pointer-events-auto transition-all duration-1000 ease-out ${
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
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-7 sm:py-3.5 rounded-full text-white font-body text-[14px] sm:text-[15px] tracking-normal transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] cursor-pointer shadow-lg"
            style={{
              backgroundColor: "#E8793A",
              fontWeight: 500,
              boxShadow: "0 6px 24px rgba(232, 121, 60, 0.28)",
            }}
          >
            <span>Start your journey</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </>
  );
}
