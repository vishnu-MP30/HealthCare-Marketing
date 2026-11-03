"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function ClinicalIntro() {
  return (
    <section
      id="clinical-intro"
      className="relative w-full bg-[#FAF8F5] text-[#132a21] pt-24 sm:pt-32 md:pt-40 pb-20 sm:pb-28 md:pb-36 px-6 sm:px-10 lg:px-14 overflow-hidden"
      aria-label="Clinical Approach and Suites"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* PART 1: RESTORE. REFINE. RENEW. (Reference Image 1) */}
        <div className="mb-28 sm:mb-36 md:mb-44">
          {/* Top Kicker Label */}
          <p className="text-neutral-500 text-sm sm:text-base font-light tracking-wide mb-8 sm:mb-12">
            LifeCare Clinical Practice
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            {/* Left Column: Very Large 3-Word Title */}
            <div className="lg:col-span-7">
              <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[7.2rem] font-normal text-[#132a21] leading-[1.0] tracking-tight">
                Restore.
                <br />
                Refine.
                <br />
                Renew.
              </h2>
            </div>

            {/* Right Column: Narrative Copy & Underlined Link */}
            <div className="lg:col-span-5 flex flex-col justify-end lg:pb-4">
              <p className="text-neutral-700 text-base sm:text-lg md:text-[1.15rem] font-light leading-relaxed mb-6 max-w-lg">
                Every care journey at LifeCare starts with understanding your goals. We
                treat the person as a whole, coordinate in seamless steps, and never
                recommend more than the outcome requires.
              </p>
              <div>
                <Link
                  href="#about"
                  className="inline-block text-sm sm:text-base text-neutral-900 underline underline-offset-4 decoration-neutral-400 hover:decoration-[#008068] hover:text-[#008068] transition-colors font-normal"
                >
                  About our clinical approach
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* PART 2: STEP INSIDE THE STUDIO / CLINICAL SUITES (Reference Images 2 & 3) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Text & Description */}
          <div className="lg:col-span-5 pr-0 lg:pr-6">
            <h3 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#132a21] leading-[1.08] tracking-tight mb-6 whitespace-pre-line">
              Step inside our{"\n"}clinical suites.
            </h3>
            <p className="text-neutral-600 text-base sm:text-lg font-light leading-relaxed max-w-md">
              Private consultation rooms, natural light, and a calm, quiet healing
              atmosphere. Consultations are unhurried, and every patient visit ends
              with dedicated written aftercare.
            </p>
          </div>

          {/* Right Column: Large Right-Aligned Rectangular Picture */}
          <div className="lg:col-span-7 w-full flex justify-end">
            <div className="relative w-full h-[360px] sm:h-[480px] md:h-[560px] lg:h-[590px] overflow-hidden bg-neutral-200">
              <Image
                src="/hero/04-patient-care.jpg"
                alt="Doctor attending patient with compassionate care in a natural-light clinical suite"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
