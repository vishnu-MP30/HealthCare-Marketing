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
      className="relative w-full bg-white text-[#1F2123] pt-14 sm:pt-20 md:pt-24 pb-28 sm:pb-36 md:pb-48 px-6 sm:px-10 lg:px-12 xl:px-16 overflow-hidden border-t border-[#1F2123]/10"
      aria-label="Find Your Treatment Gallery"
    >
      <div className="max-w-[1600px] mx-auto">
        {/* TOP HEADER: One-line title, right-side healthcare badges, stretched & justified narrative */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#1F2123]/10">
            <div>
              <span className="font-body text-xs uppercase tracking-widest text-[#E8682A] font-semibold mb-3 block">
                Clinical Specialisms
              </span>
              <h2 className="font-display font-bold tracking-tight text-[#1F2123] text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08]">
                Find your <span className="text-[#E8682A] font-normal">treatment.</span>
              </h2>
            </div>

            {/* Right side healthcare-based design elements to balance empty space */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#F8F9FA] border border-[#1F2123]/10 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#E8682A]" />
                <span className="font-body text-xs sm:text-sm font-semibold text-[#1F2123]">
                  5 Accredited Disciplines
                </span>
              </div>
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#F8F9FA] border border-[#1F2123]/10 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-body text-xs sm:text-sm font-semibold text-[#1F2123]">
                  100% Specialist-Led
                </span>
              </div>
              <Link
                href="#specialties"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1F2123] hover:bg-[#E8682A] text-white text-xs sm:text-sm font-semibold font-body transition-colors shadow-2xs"
              >
                <span>All treatments</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* Stretched & Justified Healthcare Narrative Paragraphs */}
          <div className="mt-8 max-w-5xl">
            <p className="font-body text-lg sm:text-xl md:text-2xl font-bold text-[#1F2123] tracking-tight leading-snug mb-4 text-justify [text-justify:inter-word]">
              Discover what&apos;s possible. With the right people and the right decisions, everything changes.
            </p>
            <p className="font-body text-base sm:text-lg text-[#1F2123]/80 font-normal leading-relaxed text-justify [text-justify:inter-word]">
              Mendly Healthcare is an international people services business, working exclusively across the health and life sciences market. Internationally ambitious and global by design, we serve clients across the UK, US, EU and Australia — we are intent on leading this market, not following it. We do two things exceptionally well: bespoke executive and non-executive recruitment, and the provision of subject-matter experts — never generalists — to empower financial, digital and AI productivity.
            </p>
          </div>
        </div>

        {/* 5-PICTURE EDITORIAL MASONRY GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8 items-start">
          
          {/* COLUMN 1: Vertically Long Picture */}
          <div className="w-full lg:pt-28 flex flex-col">
            <div className="relative w-full h-[580px] sm:h-[720px] md:h-[840px] lg:h-[940px] xl:h-[1020px] overflow-hidden bg-neutral-100 shadow-[0_12px_32px_rgba(0,0,0,0.06)] group rounded-xl border border-[#1F2123]/10">
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6 sm:p-8 z-10 pointer-events-none">
                <h3 className="font-display font-bold text-2xl sm:text-3xl drop-shadow-lg tracking-tight mb-1 text-white !text-white" style={{ color: "#FFFFFF" }}>
                  {TREATMENTS[0].title}
                </h3>
                {TREATMENTS[0].subtitle && (
                  <p className="font-body font-semibold text-xs sm:text-sm drop-shadow-md leading-relaxed tracking-wide text-white !text-white" style={{ color: "#FFFFFF" }}>
                    {TREATMENTS[0].subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* COLUMN 2: Two Stacked Medium Pictures */}
          <div className="w-full flex flex-col gap-6 sm:gap-7 lg:gap-8">
            {/* Top Medium Picture - Surgery */}
            <div className="relative w-full h-[320px] sm:h-[400px] md:h-[460px] lg:h-[520px] xl:h-[560px] overflow-hidden bg-neutral-100 shadow-[0_12px_32px_rgba(0,0,0,0.06)] group rounded-xl border border-[#1F2123]/10">
              <Image
                src={TREATMENTS[1].image}
                alt={TREATMENTS[1].alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ objectPosition: TREATMENTS[1].objectPosition }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6 sm:p-8 z-10 pointer-events-none">
                <h3 className="font-display font-bold text-2xl sm:text-3xl drop-shadow-lg tracking-tight mb-1 text-white !text-white" style={{ color: "#FFFFFF" }}>
                  {TREATMENTS[1].title}
                </h3>
                {TREATMENTS[1].subtitle && (
                  <p className="font-body font-semibold text-xs sm:text-sm drop-shadow-md leading-relaxed tracking-wide text-white !text-white" style={{ color: "#FFFFFF" }}>
                    {TREATMENTS[1].subtitle}
                  </p>
                )}
              </div>
            </div>

            {/* Bottom Medium Picture - Obstetrics */}
            <div className="relative w-full h-[340px] sm:h-[420px] md:h-[480px] lg:h-[540px] xl:h-[580px] overflow-hidden bg-neutral-100 shadow-[0_12px_32px_rgba(0,0,0,0.06)] group rounded-xl border border-[#1F2123]/10">
              <Image
                src={TREATMENTS[2].image}
                alt={TREATMENTS[2].alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ objectPosition: TREATMENTS[2].objectPosition }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6 sm:p-8 z-10 pointer-events-none">
                <h3 className="font-display font-bold text-2xl sm:text-3xl drop-shadow-lg tracking-tight mb-1 text-white !text-white" style={{ color: "#FFFFFF" }}>
                  {TREATMENTS[2].title}
                </h3>
                {TREATMENTS[2].subtitle && (
                  <p className="font-body font-semibold text-xs sm:text-sm drop-shadow-md leading-relaxed tracking-wide text-white !text-white" style={{ color: "#FFFFFF" }}>
                    {TREATMENTS[2].subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* COLUMN 3: Tall Vertical Portrait - Pediatrics */}
          <div className="w-full lg:pt-16 flex flex-col">
            <div className="relative w-full h-[540px] sm:h-[700px] md:h-[820px] lg:h-[920px] xl:h-[980px] overflow-hidden bg-neutral-100 shadow-[0_12px_32px_rgba(0,0,0,0.06)] group rounded-xl border border-[#1F2123]/10">
              <Image
                src={TREATMENTS[3].image}
                alt={TREATMENTS[3].alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ objectPosition: TREATMENTS[3].objectPosition }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6 sm:p-8 z-10 pointer-events-none">
                <h3 className="font-display font-bold text-2xl sm:text-3xl drop-shadow-lg tracking-tight mb-1 text-white !text-white" style={{ color: "#FFFFFF" }}>
                  {TREATMENTS[3].title}
                </h3>
                {TREATMENTS[3].subtitle && (
                  <p className="font-body font-semibold text-xs sm:text-sm drop-shadow-md leading-relaxed tracking-wide text-white !text-white" style={{ color: "#FFFFFF" }}>
                    {TREATMENTS[3].subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* COLUMN 4: Tall Vertical Picture - Orthopaedics */}
          <div className="w-full lg:pt-8 flex flex-col">
            <div className="relative w-full h-[520px] sm:h-[680px] md:h-[800px] lg:h-[900px] xl:h-[960px] overflow-hidden bg-neutral-100 shadow-[0_12px_32px_rgba(0,0,0,0.06)] group rounded-xl border border-[#1F2123]/10">
              <Image
                src={TREATMENTS[4].image}
                alt={TREATMENTS[4].alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ objectPosition: TREATMENTS[4].objectPosition }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6 sm:p-8 z-10 pointer-events-none">
                <h3 className="font-display font-bold text-2xl sm:text-3xl drop-shadow-lg tracking-tight mb-1 text-white !text-white" style={{ color: "#FFFFFF" }}>
                  {TREATMENTS[4].title}
                </h3>
                {TREATMENTS[4].subtitle && (
                  <p className="font-body font-semibold text-xs sm:text-sm drop-shadow-md leading-relaxed tracking-wide text-white !text-white" style={{ color: "#FFFFFF" }}>
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
