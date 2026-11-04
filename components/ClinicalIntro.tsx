"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function ClinicalIntro() {
  return (
    <section
      id="clinical-intro"
      className="relative w-full bg-[#fcfcfc] text-[#111111] pt-20 sm:pt-28 md:pt-32 pb-20 sm:pb-28 md:pb-36 px-6 sm:px-10 lg:px-14 overflow-hidden border-t border-neutral-200/60"
      aria-label="Clinical Approach and Suites"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* PART 1: RESTORE. REFINE. RENEW. */}
        <div className="mb-16 sm:mb-20 md:mb-28">
          {/* Top Kicker Label */}
          <p className="text-neutral-500 text-sm sm:text-base font-normal tracking-wide mb-8 sm:mb-12">
            LifeCare Clinical Practice
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Very Large 3-Word Title */}
            <div className="lg:col-span-7">
              <h2 className="font-sans font-light text-[40px] sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[82px] text-[#111111] leading-[1.02] tracking-[-0.035em]">
                Restore.
                <br />
                Refine.
                <br />
                <span className="text-[#008068] font-normal">Renew.</span>
              </h2>
            </div>

            {/* Right Column: Narrative Copy & Underlined Link (Fills top empty space) */}
            <div className="lg:col-span-5 flex flex-col justify-start pt-2 lg:pt-3">
              <p className="text-neutral-700 text-base sm:text-lg md:text-[1.125rem] font-light leading-relaxed mb-4 max-w-lg">
                Every care journey at LifeCare starts with understanding your goals. We
                treat the person as a whole, coordinate in seamless steps, and never
                recommend more than the outcome requires.
              </p>

              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-6 max-w-lg font-light">
                Through measured diagnostics, compassionate listening, and dedicated multidisciplinary specialists, we design tailored clinical pathways that prioritize long-term vitality, restorative health, and genuine patient autonomy at every milestone.
              </p>

              {/* Clinical Tenet Indicators */}
              <div className="grid grid-cols-2 gap-4 py-4 my-2 border-y border-neutral-200/80 max-w-lg">
                <div>
                  <span className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
                    Philosophy
                  </span>
                  <span className="text-sm font-sans font-medium text-[#111111]">
                    Restorative &amp; Minimal
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
                    Continuity
                  </span>
                  <span className="text-sm font-sans font-medium text-[#111111]">
                    Direct Specialist Care
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <Link
                  href="#about"
                  className="inline-flex items-center gap-2 text-sm sm:text-base text-neutral-900 underline underline-offset-4 decoration-neutral-400 hover:decoration-[#008068] hover:text-[#008068] transition-colors font-medium"
                >
                  <span>About our clinical approach</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* PART 2: STEP INSIDE THE STUDIO / CLINICAL SUITES */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Text & Description */}
          <div className="lg:col-span-5 pr-0 lg:pr-6">
            <h3 className="font-sans font-light text-3xl sm:text-5xl md:text-6xl lg:text-[64px] text-[#111111] leading-[1.04] tracking-[-0.035em] mb-6 whitespace-pre-line">
              Step inside our{"\n"}
              <span className="text-[#008068] font-normal">clinical suites.</span>
            </h3>
            <p className="text-neutral-600 text-base sm:text-lg font-light leading-relaxed max-w-md mb-6">
              Private consultation rooms, natural light, and a calm, quiet healing
              atmosphere. Consultations are unhurried, and every patient visit ends
              with dedicated written aftercare.
            </p>
            <div className="flex items-center gap-3 text-xs font-mono text-neutral-500 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#008068]" />
              <span>Acoustically isolated · Private recovery bays</span>
            </div>
          </div>

          {/* Right Column: Large Right-Aligned Rectangular Picture (Enlarged Height toward Top) */}
          <div className="lg:col-span-7 w-full flex justify-end">
            <div className="relative w-full h-[420px] sm:h-[540px] md:h-[640px] lg:h-[720px] xl:h-[780px] overflow-hidden bg-neutral-100 shadow-[0_12px_32px_rgba(0,0,0,0.06)]">
              <Image
                src="/hero/04-patient-care.jpg"
                alt="Doctor attending patient with compassionate care in a natural-light clinical suite"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-right"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
