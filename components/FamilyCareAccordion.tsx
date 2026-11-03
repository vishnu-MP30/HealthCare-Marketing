"use client";

import React from "react";
import ServicesDial from "./ServicesDial";

/**
 * ============================================================================
 * FAMILY CARE & WOMEN'S HEALTH - SCROLL-DRIVEN DIAL SECTION
 * ============================================================================
 * Pinned, scroll-driven dial section stepping through 4 clinical services:
 * 01 Fertility & Family Building
 * 02 Maternity & Newborn Care
 * 03 Parenting & Pediatrics
 * 04 Menopause & Midlife Health
 *
 * Retains the signature emerald green gradient, ambient lighting,
 * and sweeping engraved wave lines from the original design.
 */
export default function FamilyCareAccordion() {
  return (
    <section
      id="family-care"
      className="family-care-section relative w-full bg-white text-slate-900 select-none border-t border-slate-200 overflow-clip"
      aria-label="Lifecare Family & Women's Healthcare"
    >
      {/* ====================================================================
          STICKY BACKGROUND AMBIENCE: Subtle Architectural Contour Lines & Ambient Glows
          Pinned throughout the entire scrolling sequence
          ==================================================================== */}
      <div
        className="sticky top-0 h-[100svh] w-full pointer-events-none -mb-[100svh] z-0 overflow-hidden bg-white"
        aria-hidden="true"
      >
        {/* Soft background ambient radial glows on white */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[950px] h-[520px] bg-slate-50/80 rounded-full blur-[140px]" />
        <div className="absolute -bottom-24 right-8 w-[550px] h-[420px] bg-emerald-50/40 rounded-full blur-[130px]" />
        <div className="absolute top-1/3 -left-20 w-[450px] h-[450px] bg-sky-50/40 rounded-full blur-[120px]" />

        {/* Delicate sweeping curved contour lines in softest gray */}
        <svg
          className="absolute inset-0 w-full h-full fill-none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1440 900"
        >
          <path
            d="M -60,250 C 320,180 720,330 1500,230"
            stroke="rgba(15, 23, 42, 0.06)"
            strokeWidth="1.2"
          />
          <path
            d="M -60,310 C 380,260 820,390 1500,290"
            stroke="rgba(15, 23, 42, 0.04)"
            strokeWidth="0.9"
          />
          <path
            d="M -60,690 C 480,560 980,780 1500,630"
            stroke="rgba(15, 23, 42, 0.05)"
            strokeWidth="1.1"
          />
        </svg>
      </div>

      {/* ====================================================================
          INTRO: CENTERED HEADLINE & SUBTITLE (Light Mode Luxury)
          ==================================================================== */}
      <div className="relative z-10 max-w-[1440px] mx-auto flex flex-col items-center pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-8 lg:px-12">
        <div className="text-center max-w-3xl mx-auto px-4">
          <h2 className="font-sans font-light text-3xl sm:text-5xl lg:text-[58px] xl:text-[64px] text-slate-900 tracking-[-0.03em] leading-[1.08]">
            Healthcare designed<br />
            for women and families<br />
            that&apos;s personal<br />
            <span className="font-serif italic font-normal text-slate-900">
              and proven
            </span>
          </h2>

          <p className="mt-5 text-sm sm:text-base lg:text-lg text-slate-600 font-normal tracking-tight">
            Trusted by 2,300+ employers &amp; Lifecare clinical partners to improve outcomes across every stage
          </p>
        </div>
      </div>

      {/* ====================================================================
          PINNED SCROLL-DRIVEN DIAL COMPONENT
          ==================================================================== */}
      <div className="relative z-10 w-full">
        <ServicesDial />
      </div>
    </section>
  );
}
