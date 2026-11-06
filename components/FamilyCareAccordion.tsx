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
      className="family-care-section relative w-full bg-white text-[#1F2123] select-none border-t border-[#1F2123]/10 overflow-clip"
      aria-label="Mendly Family & Women's Healthcare">
      {/* ====================================================================
          INTRO: LEFT-ALIGNED 2-LINE HEADLINE & SUBTITLE
          ==================================================================== */}
      <div className="relative z-10 max-w-[1440px] mx-auto flex flex-col items-start pt-16 sm:pt-20 lg:pt-24 pb-10 sm:pb-14 px-6 sm:px-10 lg:px-14">
        <div className="text-left w-full flex flex-col items-start justify-start">
          {/* Category Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F8F9FA] border border-[#1F2123]/10 shadow-2xs mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8682A] animate-pulse" />
            <span className="text-xs sm:text-sm font-medium tracking-wide text-[#1F2123]/80 font-body">
              Women &amp; Family Care Continuum
            </span>
          </div>

          <h2 className="font-display font-bold text-[#1F2123] text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.06] text-left w-full mb-4">
            <span className="block">Comprehensive care</span>
            <span className="block mt-1 sm:mt-2">
              built for your <span className="text-[#E8682A]">family.</span>
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg md:text-xl text-[#1F2123]/75 font-body font-light tracking-normal leading-relaxed max-w-3xl text-left">
            Trusted by 2,300+ employers &amp; Mendly clinical partners to improve outcomes across every stage.
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
