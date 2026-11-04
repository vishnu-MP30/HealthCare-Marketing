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
      <div className="relative z-10 max-w-[1440px] mx-auto flex flex-col items-center pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-8 lg:px-12">
        <div className="text-center max-w-3xl mx-auto px-4">
          <h2 className="font-sans font-light text-[40px] sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[82px] text-[#111111] tracking-[-0.035em] leading-[1.04]">
            Healthcare designed<br />
            for women and families<br />
            that&apos;s personal<br />
            <span className="text-[#008068] font-normal">
              and proven
            </span>
          </h2>

          <p className="mt-5 text-sm sm:text-base lg:text-lg text-neutral-600 font-normal tracking-normal leading-relaxed">
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
