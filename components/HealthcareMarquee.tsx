"use client";

import React from "react";

const HEALTHCARE_FIELDS = [
  "Preventive Cardiology",
  "Maternal & Newborn Care",
  "Advanced Orthopaedics",
  "Pediatric Medicine",
  "Minimally Invasive Surgery",
  "Women's Health & Longevity",
  "Diagnostic Imaging & MRI",
  "Rehabilitative Physical Therapy",
  "Metabolic & Nutritional Health",
  "Mental Wellbeing & Neurology",
  "Dermatology & Skin Health",
  "Emergency & Acute Care",
];

export default function HealthcareMarquee() {
  return (
    <section
      aria-label="Healthcare Specialties Marquee"
      className="relative z-10 w-full overflow-hidden border-y border-[#1F2123]/10 py-6 sm:py-8 lg:py-10 select-none bg-white"
    >
      {/* Inline Hardware-Accelerated Animation Styles to guarantee 100% active infinite motion */}
      <style>{`
        @keyframes marqueeInfiniteMove {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .marquee-moving-track {
          display: flex !important;
          width: max-content !important;
          animation: marqueeInfiniteMove 24s linear infinite !important;
          will-change: transform;
        }
      `}</style>

      {/* Subtle edge fades for smooth entrance and exit */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-44 bg-gradient-to-r from-white via-white/90 to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-44 bg-gradient-to-l from-white via-white/90 to-transparent pointer-events-none z-10" />

      {/* Continuous Infinite Moving Track */}
      <div className="marquee-moving-track items-center">
        {/* Set 1 */}
        <div className="flex shrink-0 items-center">
          {HEALTHCARE_FIELDS.map((field, idx) => (
            <div key={`field-1-${idx}`} className="flex items-center shrink-0">
              <span className="font-display font-medium text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[42px] tracking-[-0.02em] text-[#1F2123]">
                {field}
              </span>
              <span
                className="text-[#E8682A] font-light text-xl sm:text-2xl md:text-3xl mx-5 sm:mx-8 lg:mx-10 select-none opacity-90"
                aria-hidden="true"
              >
                +
              </span>
            </div>
          ))}
        </div>

        {/* Set 2 (Seamless loop partner) */}
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {HEALTHCARE_FIELDS.map((field, idx) => (
            <div key={`field-2-${idx}`} className="flex items-center shrink-0">
              <span className="font-display font-medium text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[42px] tracking-[-0.02em] text-[#1F2123]">
                {field}
              </span>
              <span
                className="text-[#E8682A] font-light text-xl sm:text-2xl md:text-3xl mx-5 sm:mx-8 lg:mx-10 select-none opacity-90"
                aria-hidden="true"
              >
                +
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
