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
      className="family-care-section relative w-full bg-[#fcfcfc] text-[#111111] select-none border-t border-neutral-200/60 overflow-clip"
      aria-label="Lifecare Family & Women's Healthcare"
    >
      {/* ====================================================================
          INTRO: CENTERED HEADLINE & SUBTITLE (Uniform #fcfcfc Canvas)
          ==================================================================== */}
      <div className="relative z-10 max-w-[1440px] mx-auto flex flex-col items-center pt-16 sm:pt-20 lg:pt-24 pb-10 sm:pb-14 px-4 sm:px-8 lg:px-12">
        <div className="text-center max-w-6xl xl:max-w-7xl mx-auto flex flex-col items-center justify-center">
          {/* Category Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50/80 border border-emerald-200/60 shadow-2xs mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#008068] animate-pulse" />
            <span className="text-xs sm:text-sm font-medium tracking-wide text-neutral-800">
              Women &amp; Family Care Continuum
            </span>
          </div>

          <h2 className="font-sans font-light text-4xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] text-[#111111] tracking-[-0.035em] leading-[1.04] text-center mx-auto text-balance">
            <span className="block sm:whitespace-nowrap">Healthcare designed for women and families</span>
            <span className="block mt-1 sm:mt-2">
              that&apos;s personal{" "}
              <span className="text-[#008068] font-normal">and proven</span>
            </span>
          </h2>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-neutral-600 font-light tracking-normal leading-relaxed max-w-2xl mx-auto text-center">
            Trusted by 2,300+ employers &amp; Lifecare clinical partners to improve outcomes across every stage.
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
