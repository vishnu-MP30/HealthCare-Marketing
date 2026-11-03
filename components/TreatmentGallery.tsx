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
      className="relative w-full bg-[#FAF8F5] text-[#132a21] pt-12 sm:pt-16 md:pt-20 pb-24 sm:pb-32 md:pb-40 px-6 sm:px-10 lg:px-14 overflow-hidden"
      aria-label="Find Your Treatment Gallery"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* TOP HEADER: Exact title, subtitle, and right link from Reference Image 1 */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-12 sm:mb-16 md:mb-20">
          <div>
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#132a21] leading-[1.06] tracking-tight whitespace-pre-line mb-4">
              Find your{"\n"}treatment.
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base md:text-lg font-light tracking-wide max-w-lg">
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

        {/* 5-PICTURE EDITORIAL MASONRY GRID (Exact positions & dimensions from Reference Images 1, 2, 3) */}
        {/* Non-hovering, pure photographic presentation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-7 items-start">
          
          {/* COLUMN 1: Vertically Long Picture (starts with low offset) */}
          <div className="w-full lg:pt-36 flex flex-col">
            <div className="relative w-full h-[460px] sm:h-[540px] lg:h-[640px] overflow-hidden bg-neutral-200">
              <Image
                src={TREATMENTS[0].image}
                alt={TREATMENTS[0].alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover"
                style={{ objectPosition: TREATMENTS[0].objectPosition }}
                priority
              />
              {/* Subtle natural contrast scrim for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-7">
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                  {TREATMENTS[0].title}
                </h3>
                {TREATMENTS[0].subtitle && (
                  <p className="text-white/85 text-xs sm:text-sm font-light mt-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                    {TREATMENTS[0].subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* COLUMN 2: Two Stacked Medium Pictures (starts at top, pt-0) */}
          <div className="w-full flex flex-col gap-5 sm:gap-6 lg:gap-7">
            {/* Top Medium Picture */}
            <div className="relative w-full h-[260px] sm:h-[300px] lg:h-[330px] overflow-hidden bg-neutral-200">
              <Image
                src={TREATMENTS[1].image}
                alt={TREATMENTS[1].alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover"
                style={{ objectPosition: TREATMENTS[1].objectPosition }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent flex items-center justify-center p-6 text-center">
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                  {TREATMENTS[1].title}
                </h3>
              </div>
            </div>

            {/* Bottom Medium Picture */}
            <div className="relative w-full h-[240px] sm:h-[280px] lg:h-[300px] overflow-hidden bg-neutral-200">
              <Image
                src={TREATMENTS[2].image}
                alt={TREATMENTS[2].alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover"
                style={{ objectPosition: TREATMENTS[2].objectPosition }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent flex items-end justify-center p-6 pb-7 text-center">
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                  {TREATMENTS[2].title}
                </h3>
              </div>
            </div>
          </div>

          {/* COLUMN 3: Tall Vertical Portrait (medium offset) */}
          <div className="w-full lg:pt-20 flex flex-col">
            <div className="relative w-full h-[440px] sm:h-[510px] lg:h-[580px] overflow-hidden bg-neutral-200">
              <Image
                src={TREATMENTS[3].image}
                alt={TREATMENTS[3].alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover"
                style={{ objectPosition: TREATMENTS[3].objectPosition }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end items-center p-6 pb-7 text-center">
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                  {TREATMENTS[3].title}
                </h3>
              </div>
            </div>
          </div>

          {/* COLUMN 4: Tall Vertical Picture (higher offset, completes staggered rhythm) */}
          <div className="w-full lg:pt-10 flex flex-col">
            <div className="relative w-full h-[420px] sm:h-[480px] lg:h-[530px] overflow-hidden bg-neutral-200">
              <Image
                src={TREATMENTS[4].image}
                alt={TREATMENTS[4].alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover"
                style={{ objectPosition: TREATMENTS[4].objectPosition }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end items-center p-6 pb-7 text-center">
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                  {TREATMENTS[4].title}
                </h3>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
