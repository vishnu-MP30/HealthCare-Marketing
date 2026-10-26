"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

/**
 * ============================================================================
 * LIFECARE HEALTHCARE HERO SECTION — REFINED EDITORIAL DISPLAY
 * ============================================================================
 * 
 * SPECIFICATIONS:
 * 1. Title strictly formatted into 3 lines (never wraps to 4):
 *    - Line 1: "Your Health," (Bold Sans)
 *    - Line 2: "Our Commitment" (Bold Sans, whitespace-nowrap)
 *    - Line 3: "to Excellence" (Bodoni Moda Luxury Italic Serif)
 * 2. Real Brand Logo:
 *    - Replaced text logo with /lifecare logo.png, cleanly fitted and left-aligned.
 * 3. Bottom Action Buttons:
 *    - Both "Book an appointment" and "Meet our doctors" styled in the rich emerald green
 *      (#0A5C36 / #085834) from the finalized theme, with crisp white text.
 *    - Header CTA also styled with the matching green button theme.
 * 4. Background & Full-Bleed Video:
 *    - Static background: /herobg.png.
 *    - Cursor movement/hover across hero triggers full-screen cinematic video (/hero/hero-video.mp4).
 *    - Cursor leave smoothly pauses and fades back to the static family photo.
 *    - Ambient sound toggle button in bottom corner.
 */

export default function LifeCareHero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVideoActive, setIsVideoActive] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Hover/move cursor into hero to play background video
  const handleMouseEnter = useCallback(() => {
    setIsVideoActive(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().catch(() => {});
        }
      });
    }
  }, []);

  // Leave hero to pause video and return to static image
  const handleMouseLeave = useCallback(() => {
    setIsVideoActive(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  // Toggle audio
  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
    }
  };

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setIsVideoActive(false);
        if (videoRef.current) videoRef.current.pause();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks = [
    { label: "About", href: "#approach" },
    { label: "Services", href: "#specialism" },
    { label: "Why Us?", href: "#family-care" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Team", href: "#doctors" },
  ];

  return (
    <section
      ref={heroRef}
      id="lifecare-hero"
      aria-label="LifeCare Hospital Hero"
      onMouseEnter={handleMouseEnter}
      onMouseMove={() => {
        if (!isVideoActive) handleMouseEnter();
      }}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen xl:h-screen flex flex-col justify-between overflow-hidden select-none bg-[#0E1512]"
    >
      {/* =====================================================================
          1. FULL-BLEED STATIC BACKGROUND IMAGE (/herobg.png)
          ===================================================================== */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: "url('/herobg.png')",
          backgroundPosition: "center 35%",
        }}
        aria-hidden="true"
      />

      {/* =====================================================================
          2. FULL-BLEED HOVER VIDEO PLAYER (/hero/hero-video.mp4)
          ===================================================================== */}
      <video
        ref={videoRef}
        src="/hero/hero-video.mp4"
        muted={isMuted}
        loop
        playsInline
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover object-center z-1 transition-opacity duration-700 ease-in-out pointer-events-none ${
          isVideoActive ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />

      {/* =====================================================================
          3. CINEMATIC GRADIENT OVERLAYS (For Crystal-Clear Typography Contrast)
          ===================================================================== */}
      <div
        className="absolute inset-0 z-2 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(0, 0, 0, 0.76) 0%, rgba(0, 0, 0, 0.48) 46%, rgba(0, 0, 0, 0.12) 78%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 z-2 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.48) 0%, transparent 22%, transparent 80%, rgba(0, 0, 0, 0.55) 100%)",
        }}
        aria-hidden="true"
      />

      {/* =====================================================================
          4. HEADER NAVIGATION — REAL LIFECARE LOGO & MATCHING GREEN CTA
          ===================================================================== */}
      <header className="relative z-20 w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 pt-6 sm:pt-8 flex items-center justify-between">
        {/* Real Brand Logo Fitted & Left-Aligned */}
        <a
          href="#lifecare-hero"
          className="flex items-center focus-visible:outline-none transition-transform duration-200 hover:scale-[1.02]"
          aria-label="LifeCare Healthcare Homepage"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/lifecare logo.png"
            alt="LifeCare Healthcare Logo"
            width={240}
            height={80}
            className="h-11 sm:h-13 md:h-14 w-auto object-contain filter drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)] brightness-110"
          />
        </a>

        {/* Desktop Navigation Links on the Right */}
        <nav
          className="hidden md:flex items-center gap-7 lg:gap-8 text-[14px] lg:text-[15px] font-medium text-white/90"
          aria-label="Hero navigation"
        >
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-white/90 hover:text-white transition-colors duration-200 tracking-wide font-normal"
            >
              {item.label}
            </a>
          ))}

          {/* Header Action Button Styled with Rich Emerald Theme */}
          <a
            href="#book"
            className="
              px-5 py-2.5 rounded-full bg-[#0A5C36] hover:bg-[#0D7344] text-white font-semibold text-sm
              border border-[#1E8A5E]/50 hover:border-[#2E9E6F]
              shadow-[0_4px_16px_rgba(10,92,54,0.45),inset_0_1px_1px_rgba(255,255,255,0.25)]
              hover:shadow-[0_6px_20px_rgba(10,92,54,0.65),inset_0_1px_1px_rgba(255,255,255,0.4)]
              hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200
            "
          >
            <span>(&nbsp;Book an Appointment&nbsp;)</span>
          </a>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className="md:hidden text-white p-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/20"
        >
          <div className="flex flex-col gap-1.5 w-5">
            <span className="h-0.5 w-full bg-white rounded-full" />
            <span className="h-0.5 w-full bg-white rounded-full" />
            <span className="h-0.5 w-full bg-white rounded-full" />
          </div>
        </button>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-4 top-20 z-40 bg-[#063923]/95 backdrop-blur-2xl border border-white/15 rounded-2xl p-6 flex flex-col gap-4 text-white shadow-2xl">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg py-2 border-b border-white/10"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#book"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 text-center bg-[#0A5C36] text-white font-bold py-3.5 rounded-full border border-white/25 shadow-lg"
          >
            Book an Appointment
          </a>
        </div>
      )}

      {/* =====================================================================
          5. HERO MAIN CONTENT: EXACT 3-LINE HEADLINE & EMERALD GREEN BUTTONS
          ===================================================================== */}
      <div className="relative z-10 w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 flex-1 flex flex-col justify-center my-auto py-8 lg:py-0">
        <div className="max-w-[820px] text-left">
          {/* Main Title — STRICTLY 3 LINES ONLY:
              - Line 1: Your Health,
              - Line 2: Our Commitment (nowrap)
              - Line 3: to Excellence (Bodoni Moda Italic Serif) */}
          <h1
            className="
              text-white font-[family-name:var(--font-heading)] font-extrabold
              tracking-[-0.035em] leading-[0.95]
              text-[44px] sm:text-[64px] md:text-[76px] lg:text-[84px] xl:text-[92px]
              drop-shadow-[0_4px_30px_rgba(0,0,0,0.7)]
            "
          >
            <span className="block">Your Health,</span>
            <span className="block whitespace-nowrap">Our Commitment</span>
            <span
              className="
                block font-[family-name:var(--font-serif)] italic font-normal
                tracking-[-0.01em] text-white mt-1 sm:mt-1.5
              "
              style={{
                fontFamily: "var(--font-serif), Bodoni Moda, Georgia, serif",
              }}
            >
              to Excellence
            </span>
          </h1>

          {/* Supporting Description */}
          <p
            className="
              mt-5 sm:mt-6 text-white/95 text-[16px] sm:text-[18px] lg:text-[19px]
              leading-[1.55] max-w-[500px] font-normal
              drop-shadow-[0_2px_14px_rgba(0,0,0,0.75)]
            "
          >
            Professional healthcare that ensures your comfort and well-being.
            Schedule an appointment with us today!
          </p>

          {/* Bottom Action Buttons: Both Styled in Deep Emerald Green (#0A5C36) */}
          <div className="mt-7 sm:mt-8 flex flex-wrap items-center gap-4 sm:gap-5">
            {/* Button 1: Book an appointment */}
            <a
              href="#book"
              className="
                group inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full
                bg-[#0A5C36] hover:bg-[#0D7344] text-white font-bold text-[15px] sm:text-[16px]
                border border-[#1E8A5E]/40 hover:border-[#2E9E6F]
                shadow-[0_8px_24px_rgba(10,92,54,0.45),inset_0_1px_1px_rgba(255,255,255,0.25)]
                hover:shadow-[0_12px_32px_rgba(10,92,54,0.65),inset_0_1px_1px_rgba(255,255,255,0.4)]
                hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E9E6F]
              "
            >
              <span>Book an appointment</span>
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>

            {/* Button 2: Meet our doctors */}
            <a
              href="#doctors"
              className="
                group inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full
                bg-[#0A5C36]/90 hover:bg-[#0D7344] text-white font-bold text-[15px] sm:text-[16px]
                border border-[#1E8A5E]/40 hover:border-[#2E9E6F]
                shadow-[0_8px_24px_rgba(10,92,54,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)]
                hover:shadow-[0_12px_32px_rgba(10,92,54,0.55),inset_0_1px_1px_rgba(255,255,255,0.35)]
                hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E9E6F]
              "
            >
              <span>Meet our doctors</span>
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* =====================================================================
          6. BOTTOM FOOTER BAR (Motion Indicator & Ambient Sound Toggle)
          ===================================================================== */}
      <footer className="relative z-20 w-full max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-14 pb-5 sm:pb-7 flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-xs text-white/75 drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
          <span
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              isVideoActive ? "bg-[#10B981] animate-pulse" : "bg-white/40"
            }`}
          />
          <span className="tracking-wider uppercase text-[11px] font-medium">
            {isVideoActive ? "Cinema Walkthrough Playing" : "Hover anywhere to explore story"}
          </span>
        </div>

        <button
          type="button"
          onClick={toggleAudio}
          className="
            flex items-center gap-2 text-xs text-white/85 hover:text-white
            px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md
            border border-white/20 transition-all duration-200 shadow-lg
            focus-visible:outline-none
          "
          aria-label={isMuted ? "Unmute video sound" : "Mute video sound"}
        >
          {isMuted ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
              <span>(&nbsp;Sound Off&nbsp;)</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
              <span>(&nbsp;Sound On&nbsp;)</span>
            </>
          )}
        </button>
      </footer>
    </section>
  );
}
