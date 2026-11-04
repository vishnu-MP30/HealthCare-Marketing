"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface TreatmentPillar {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  alt: string;
  objectPosition?: string;
}

const TREATMENTS: TreatmentPillar[] = [
  // 0: Column 1 - Vertically tall picture
  {
    id: "cardiology",
    title: "Cardiology",
    subtitle: "Heart health & preventative vascular care",
    image: "/dept-cardiology.jpg",
    alt: "Senior cardiologist consulting patient with clinical care",
    objectPosition: "center 30%",
  },
  // 1: Column 2 Top - Medium rectangle
  {
    id: "surgery",
    title: "Surgery",
    subtitle: "Minimally invasive & robotic precision",
    image: "/dept-surgery.jpg",
    alt: "Senior surgical specialist in operating theater",
    objectPosition: "center 25%",
  },
  // 2: Column 2 Bottom - Medium rectangle
  {
    id: "obstetrics",
    title: "Obstetrics",
    subtitle: "Maternal wellness & prenatal care",
    image: "/dept-obstetrics.jpg",
    alt: "Obstetrics specialist examining patient with gentle clinical care",
    objectPosition: "center 35%",
  },
  // 3: Column 3 - Tall vertical portrait
  {
    id: "pediatrics",
    title: "Pediatrics",
    subtitle: "Infant & child developmental health",
    image: "/dept-pediatrics.jpg",
    alt: "Pediatric doctor examining toddler with stethoscope",
    objectPosition: "center 25%",
  },
  // 4: Column 4 - Tall vertical portrait
  {
    id: "orthopaedics",
    title: "Orthopaedics",
    subtitle: "Joint preservation & musculoskeletal recovery",
    image: "/dept-orthopaedics.jpg",
    alt: "Orthopaedic specialist assessing patient joint mobility",
    objectPosition: "center 30%",
  },
];

export default function TreatmentGallery() {
  return (
    <section
      id="treatment-gallery"
      className="relative w-full bg-[#fcfcfc] text-[#111111] pt-14 sm:pt-20 md:pt-24 pb-28 sm:pb-36 md:pb-48 px-6 sm:px-10 lg:px-12 xl:px-16 overflow-hidden border-t border-neutral-200/60"
      aria-label="Find Your Treatment Gallery"
    >
      <div className="max-w-[1600px] mx-auto">
        {/* TOP HEADER: Exact title, subtitle, and right link */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-12 sm:mb-16 md:mb-20">
          <div>
            <h2 className="font-sans font-light text-[40px] sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[82px] text-[#111111] leading-[1.04] tracking-[-0.035em] whitespace-pre-line mb-4">
              Find your{"\n"}
              <span className="text-[#008068] font-normal">treatment.</span>
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base md:text-lg font-normal tracking-normal max-w-lg">
              Five areas of care, each led by a specialist.
            </p>
          </div>

          <div className="pt-2 md:pt-4">
            <Link
              href="#specialties"
              className="inline-block text-sm sm:text-base text-neutral-900 underline underline-offset-4 decoration-neutral-400 hover:decoration-[#008068] hover:text-[#008068] transition-colors font-normal"
            >
              All treatments
            </Link>
          </div>
        </div>

        {/* 5-PICTURE EDITORIAL MASONRY GRID (Expansive, Long, Large Architectural Format) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8 items-start">
          
          {/* COLUMN 1: Vertically Long Picture (starts with low offset) */}
          <div className="w-full lg:pt-28 flex flex-col">
            <div className="relative w-full h-[580px] sm:h-[720px] md:h-[840px] lg:h-[940px] xl:h-[1020px] overflow-hidden bg-neutral-100 shadow-[0_12px_32px_rgba(0,0,0,0.06)] group">
              <Image
                src={TREATMENTS[0].image}
                alt={TREATMENTS[0].alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ objectPosition: TREATMENTS[0].objectPosition }}
                priority
              />
              {/* Bottom Scrim with Title & Subtitle */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-end p-6 sm:p-8">
                <h3 className="font-sans text-2xl sm:text-3xl text-white font-light leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                  {TREATMENTS[0].title}
                </h3>
                {TREATMENTS[0].subtitle && (
                  <p className="text-white/85 text-xs sm:text-sm font-light mt-1.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)] leading-relaxed">
                    {TREATMENTS[0].subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* COLUMN 2: Two Stacked Medium Pictures (starts at top, pt-0) */}
          <div className="w-full flex flex-col gap-6 sm:gap-7 lg:gap-8">
            {/* Top Medium Picture - Surgery */}
            <div className="relative w-full h-[320px] sm:h-[400px] md:h-[460px] lg:h-[520px] xl:h-[560px] overflow-hidden bg-neutral-100 shadow-[0_12px_32px_rgba(0,0,0,0.06)] group">
              <Image
                src={TREATMENTS[1].image}
                alt={TREATMENTS[1].alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ objectPosition: TREATMENTS[1].objectPosition }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-end p-6 sm:p-8">
                <h3 className="font-sans text-2xl sm:text-3xl text-white font-light leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                  {TREATMENTS[1].title}
                </h3>
                {TREATMENTS[1].subtitle && (
                  <p className="text-white/85 text-xs sm:text-sm font-light mt-1.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)] leading-relaxed">
                    {TREATMENTS[1].subtitle}
                  </p>
                )}
              </div>
            </div>

            {/* Bottom Medium Picture - Obstetrics */}
            <div className="relative w-full h-[340px] sm:h-[420px] md:h-[480px] lg:h-[540px] xl:h-[580px] overflow-hidden bg-neutral-100 shadow-[0_12px_32px_rgba(0,0,0,0.06)] group">
              <Image
                src={TREATMENTS[2].image}
                alt={TREATMENTS[2].alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ objectPosition: TREATMENTS[2].objectPosition }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-end p-6 sm:p-8">
                <h3 className="font-sans text-2xl sm:text-3xl text-white font-light leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                  {TREATMENTS[2].title}
                </h3>
                {TREATMENTS[2].subtitle && (
                  <p className="text-white/85 text-xs sm:text-sm font-light mt-1.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)] leading-relaxed">
                    {TREATMENTS[2].subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* COLUMN 3: Tall Vertical Portrait (medium offset) - Pediatrics */}
          <div className="w-full lg:pt-16 flex flex-col">
            <div className="relative w-full h-[540px] sm:h-[700px] md:h-[820px] lg:h-[920px] xl:h-[980px] overflow-hidden bg-neutral-100 shadow-[0_12px_32px_rgba(0,0,0,0.06)] group">
              <Image
                src={TREATMENTS[3].image}
                alt={TREATMENTS[3].alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ objectPosition: TREATMENTS[3].objectPosition }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-end p-6 sm:p-8">
                <h3 className="font-sans text-2xl sm:text-3xl text-white font-light leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                  {TREATMENTS[3].title}
                </h3>
                {TREATMENTS[3].subtitle && (
                  <p className="text-white/85 text-xs sm:text-sm font-light mt-1.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)] leading-relaxed">
                    {TREATMENTS[3].subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* COLUMN 4: Tall Vertical Picture (higher offset) - Orthopaedics */}
          <div className="w-full lg:pt-8 flex flex-col">
            <div className="relative w-full h-[520px] sm:h-[680px] md:h-[800px] lg:h-[900px] xl:h-[960px] overflow-hidden bg-neutral-100 shadow-[0_12px_32px_rgba(0,0,0,0.06)] group">
              <Image
                src={TREATMENTS[4].image}
                alt={TREATMENTS[4].alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ objectPosition: TREATMENTS[4].objectPosition }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-end p-6 sm:p-8">
                <h3 className="font-sans text-2xl sm:text-3xl text-white font-light leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                  {TREATMENTS[4].title}
                </h3>
                {TREATMENTS[4].subtitle && (
                  <p className="text-white/85 text-xs sm:text-sm font-light mt-1.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)] leading-relaxed">
                    {TREATMENTS[4].subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
