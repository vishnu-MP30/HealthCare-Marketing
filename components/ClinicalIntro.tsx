"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function ClinicalIntro() {
  return (
    <section
      id="clinical-intro"
      className="relative w-full bg-white text-[#1F2123] pt-12 sm:pt-16 md:pt-20 pb-14 sm:pb-20 md:pb-24 px-6 sm:px-10 lg:px-14 overflow-hidden border-t border-[#1F2123]/10"
      aria-label="Clinical Approach and Suites">
      <div className="max-w-[1440px] mx-auto">
        {/* PART 1: RESTORE. REFINE. RENEW. */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          {/* Top Kicker Label */}
          <p className="text-[#1F2123]/70 font-body text-base sm:text-lg font-medium tracking-wider mb-3 sm:mb-5">
            Mendly Clinical Practice
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
            {/* Left Column: Very Large Bold Statement Filling Entire Left to Center Section */}
            <div className="lg:col-span-7 xl:col-span-8 pb-4">
              <h2
                className="font-display font-black tracking-tighter text-[#1F2123] select-none"
                style={{
                  fontSize: "clamp(4.5rem, 2.5rem + 7.8vw, 11.25rem)",
                  lineHeight: 0.94,
                  letterSpacing: "-0.04em",
                }}>
                Restore.
                <br />
                Refine.
                <br />
                <span className="text-[#E8682A]">Renew.</span>
              </h2>
            </div>

            {/* Right Column: Right Section Narrative Text & Indicators */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-start pt-1 lg:pt-2">
              <p className="text-[#1F2123] font-body text-xl sm:text-2xl md:text-3xl font-bold leading-snug mb-5 w-full max-w-xl tracking-tight text-justify [text-justify:inter-word]">
                Every care journey at Mendly starts with understanding your goals. We
                treat the person as a whole, coordinate in seamless steps, and never
                recommend more than the outcome requires.
              </p>

              <p className="text-[#1F2123]/85 font-body text-base sm:text-lg md:text-xl font-medium leading-relaxed mb-6 w-full max-w-xl text-justify [text-justify:inter-word]">
                Through measured diagnostics, compassionate listening, and dedicated multidisciplinary specialists, we design tailored clinical pathways that prioritize long-term vitality, restorative health, and genuine patient autonomy at every milestone.
              </p>

              {/* Clinical Tenet Indicators */}
              <div className="grid grid-cols-2 gap-4 py-5 my-2 border-y border-[#1F2123]/10 w-full max-w-xl">
                <div>
                  <span className="block text-xs font-body uppercase tracking-wider text-[#1F2123]/50 mb-1">
                    Philosophy
                  </span>
                  <span className="text-base sm:text-lg font-sans font-medium text-[#1F2123]">
                    Restorative &amp; Minimal
                  </span>
                </div>
                <div>
                  <span className="block text-xs font-body uppercase tracking-wider text-[#1F2123]/50 mb-1">
                    Continuity
                  </span>
                  <span className="text-base sm:text-lg font-sans font-medium text-[#1F2123]">
                    Direct Specialist Care
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <Link
                  href="#about"
                  className="inline-flex items-center gap-2 text-base sm:text-lg text-[#1F2123] font-body underline underline-offset-4 decoration-[#1F2123]/30 hover:decoration-[#E8682A] hover:text-[#E8682A] transition-colors font-medium">
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
            <h3 className="font-display font-semibold text-[#1F2123] tracking-tight mb-6 whitespace-pre-line">
              Step inside our{"\n"}
              <span className="text-[#E8682A] font-normal">clinical suites.</span>
            </h3>
            <p className="text-[#1F2123]/70 font-body text-base sm:text-lg font-light leading-relaxed max-w-md mb-6">
              Private consultation rooms, natural light, and a calm, quiet healing
              atmosphere. Consultations are unhurried, and every patient visit ends
              with dedicated written aftercare.
            </p>
            <div className="flex items-center gap-3 text-xs font-body text-[#1F2123]/60 font-body uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8682A]" />
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
