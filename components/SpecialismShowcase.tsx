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
      className="relative w-full bg-white text-[#1F2123] py-16 sm:py-24 px-6 sm:px-12 lg:px-20 border-t border-[#1F2123]/10 overflow-hidden"
      aria-label="The Art of Relationships - Healthcare Leadership">
      <div className="max-w-7xl mx-auto">
        {/* ====================================================================
            UPPER HALF: EDITORIAL HEADLINE + DUAL OVERLAPPING PHOTOGRAPHY
            ==================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* Left Column: Monumental Editorial Typography */}
          <div className="lg:col-span-8 flex flex-col justify-start">
            <h2 className="font-display font-bold tracking-tight text-[#1F2123] text-4xl sm:text-5xl md:text-[3.25rem] lg:text-[3.65rem] leading-[1.04]">
              <span className="block text-[#1F2123] font-bold sm:whitespace-nowrap">The art of relationships.</span>
              <span className="block text-[#1F2123] font-bold sm:whitespace-nowrap mt-1">
                The science of{" "}
                <span className="text-[#E8682A] font-bold">specialism.</span>
              </span>
            </h2>

            <div className="mt-8 sm:mt-12 max-w-xl">
              <p className="text-base sm:text-lg text-[#1F2123]/90 font-body font-normal leading-relaxed">
                Discover what’s possible. With the right people and the right decisions, everything changes.
              </p>

              <p className="mt-6 text-sm sm:text-[15px] text-[#1F2123]/70 font-body font-normal leading-relaxed">
                Mendly Healthcare is an international people services business, working exclusively across the health and life sciences market. Internationally ambitious and global by design, we serve clients across the UK, US, EU and Australia — we are intent on leading this market, not following it. We do two things exceptionally well: bespoke executive and non-executive recruitment, and the provision of subject-matter experts — never generalists — to empower financial, digital and AI productivity.
              </p>
            </div>
          </div>

          {/* Right Column: Layered Photographic Composition with Coral Crosshairs */}
          <div className="lg:col-span-4 relative flex justify-center lg:justify-end items-center pt-4 lg:pt-0">
            <div className="relative w-full max-w-[460px] h-[480px] sm:h-[540px]">
              
              {/* Decorative Coral Plus Grid (+) */}
              <div
                className="absolute inset-0 pointer-events-none select-none grid grid-cols-5 grid-rows-6 place-items-center opacity-70"
                aria-hidden="true">
                {Array.from({ length: gridRows * gridCols }).map((_, i) => (
                  <span
                    key={i}
                    className="text-[#E8682A]/60 font-light text-xs sm:text-sm select-none">
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
                className="group flex flex-col justify-between border-t border-white/10 pt-3">
                {/* Header Row: Title + Arrow link */}
                <div>
                  <div className="flex items-start justify-between gap-3 pb-4 min-h-[5.25rem] sm:min-h-[5.5rem] lg:min-h-[5.75rem]">
                    <h3 className="font-display font-medium text-lg sm:text-xl md:text-[1.25rem] text-[#1F2123] tracking-tight leading-snug group-hover:text-[#E8682A] transition-colors duration-200">
                      {item.title}
                    </h3>
                    <span className="font-sans text-sm sm:text-base text-[#1F2123]/60 font-body group-hover:text-[#E8682A] group-hover:translate-x-1 transition-all duration-200 shrink-0 pt-0.5">
                      {item.linkText}
                    </span>
                  </div>

                  {/* Photo Container - Pushed down cleanly with ample breathing room */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-100 mb-4 mt-2">
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
                <p className="text-xs sm:text-[13px] text-[#1F2123]/70 font-body font-normal leading-relaxed">
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
