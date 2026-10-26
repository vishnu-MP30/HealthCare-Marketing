"use client";

import React from "react";
import Image from "next/image";

/**
 * ============================================================================
 * SPECIALISM & HEALTHCARE LEADERSHIP SHOWCASE SECTION
 * ============================================================================
 * Replaces the previous Mail Showcase section with the high-end editorial
 * "The art of relationships. The science of specialism." feature.
 *
 * Structure:
 * 1. Upper Half:
 *    - Left: Large editorial serif-like/clean headline with coral "specialism."
 *            accent, hook sentence, and comprehensive healthcare narrative copy.
 *    - Right: Overlapping dual photographic composition (Crosswalk pedestrians
 *             + Macro amber eye close-up) framed against a coral crosshair grid (+).
 * 2. Lower Half:
 *    - 3-column service grid:
 *      * People Services in Health (Doctor with stethoscope)
 *      * People Services in Life Sciences (Biotech researcher with microscope)
 *      * Impact & Solutions (Healthcare strategy conference table)
 */

export default function SpecialismShowcase() {
  // Crosshair coordinates for the decorative coral grid
  const gridRows = 6;
  const gridCols = 5;

  const services = [
    {
      title: "People Services in Health",
      image: "/spec-health.jpg",
      alt: "People Services in Health - Clinical specialist and nurse in modern hospital",
      caption:
        "Behind every health challenge is a human story, shaped by the systems, structures and decisions that underpin care delivery.",
      linkText: "(→)",
    },
    {
      title: "People Services in Life Sciences",
      image: "/spec-science.jpg",
      alt: "People Services in Life Sciences - Biotechnology researcher using microscope",
      caption:
        "A diagnostics expert becomes the catalyst for breakthrough therapies. A MedTech platform unlocks growth for an adjacent player.",
      linkText: "(→)",
    },
    {
      title: "Impact & Solutions",
      image: "/spec-impact.jpg",
      alt: "Impact & Solutions - Strategic healthcare advisors collaborating at table",
      caption:
        "The best advice comes from people who understand what's come before, and can collaborate with you to achieve your vision.",
      linkText: "(→)",
    },
  ];

  return (
    <section
      id="specialism-showcase"
      className="relative w-full bg-[#fcfcfc] text-[#111111] py-24 sm:py-32 px-6 sm:px-12 lg:px-20 border-t border-neutral-200 overflow-hidden"
      aria-label="The Art of Relationships - Healthcare Leadership"
    >
      <div className="max-w-7xl mx-auto">
        {/* ====================================================================
            UPPER HALF: EDITORIAL HEADLINE + DUAL OVERLAPPING PHOTOGRAPHY
            ==================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Column: Monumental Editorial Typography */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            <h2 className="font-sans font-light text-[40px] sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[82px] leading-[1.04] tracking-[-0.035em] text-[#111111]">
              The art of<br />
              relationships.<br />
              The science of<br />
              <span className="text-[#FF6B4A] font-normal">specialism.</span>
            </h2>

            <div className="mt-8 sm:mt-12 max-w-xl">
              <p className="text-base sm:text-lg text-neutral-800 font-normal leading-relaxed">
                Discover what’s possible. With the right people and the right decisions, everything changes.
              </p>

              <p className="mt-6 text-sm sm:text-[15px] text-neutral-600 font-normal leading-relaxed">
                Lifecare Healthcare is an international people services business, working exclusively across the health and life sciences market. Internationally ambitious and global by design, we serve clients across the UK, US, EU and Australia — we are intent on leading this market, not following it. We do two things exceptionally well: bespoke executive and non-executive recruitment, and the provision of subject-matter experts — never generalists — to empower financial, digital and AI productivity.
              </p>
            </div>
          </div>

          {/* Right Column: Layered Photographic Composition with Coral Crosshairs */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end items-center pt-4 lg:pt-0">
            <div className="relative w-full max-w-[460px] h-[480px] sm:h-[540px]">
              
              {/* Decorative Coral Plus Grid (+) */}
              <div
                className="absolute inset-0 pointer-events-none select-none grid grid-cols-5 grid-rows-6 place-items-center opacity-70"
                aria-hidden="true"
              >
                {Array.from({ length: gridRows * gridCols }).map((_, i) => (
                  <span
                    key={i}
                    className="text-[#FF6B4A] font-light text-xs sm:text-sm select-none"
                  >
                    +
                  </span>
                ))}
              </div>

              {/* Back Card: Pedestrians Crossing Zebra Crosswalk */}
              <div className="absolute right-4 sm:right-6 top-2 w-[220px] sm:w-[260px] aspect-[3/4] shadow-[0_20px_40px_rgba(0,0,0,0.12)] overflow-hidden z-10 bg-neutral-100">
                <Image
                  src="/spec-crosswalk.jpg"
                  alt="Urban pedestrians crossing zebra stripes"
                  fill
                  sizes="(max-width: 640px) 220px, 260px"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Front Card: Macro Human Amber Eye (Overlapping bottom-left) */}
              <div className="absolute left-4 sm:left-8 bottom-6 w-[180px] sm:w-[210px] aspect-[3/4] shadow-[0_25px_50px_rgba(0,0,0,0.18)] overflow-hidden z-20 bg-neutral-100 border-[3px] border-white">
                <Image
                  src="/spec-eye.jpg"
                  alt="Focused amber hazel human eye macro close-up"
                  fill
                  sizes="(max-width: 640px) 180px, 210px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================================
            LOWER HALF: 3-COLUMN SERVICE FEATURE GRID
            Continuation showing Health, Life Sciences, and Impact & Solutions
            ==================================================================== */}
        <div className="mt-20 sm:mt-28 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {services.map((item, idx) => (
              <div
                key={idx}
                className="group flex flex-col justify-between border-t border-neutral-300 pt-3"
              >
                {/* Header Row: Title + Arrow link */}
                <div>
                  <div className="flex items-baseline justify-between gap-2 pb-3">
                    <h3 className="font-sans font-light text-xl sm:text-[22px] lg:text-2xl text-neutral-900 tracking-tight leading-snug group-hover:text-[#FF6B4A] transition-colors duration-200">
                      {item.title}
                    </h3>
                    <span className="font-sans text-sm sm:text-base text-neutral-500 group-hover:text-[#FF6B4A] group-hover:translate-x-1 transition-all duration-200 shrink-0">
                      {item.linkText}
                    </span>
                  </div>

                  {/* Photo Container */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-100 mb-4">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Narrative Caption */}
                <p className="text-xs sm:text-[13px] text-neutral-600 font-normal leading-relaxed">
                  {item.caption}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
