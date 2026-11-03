"use client";

import React from "react";
import Image from "next/image";

interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  treatment: string;
  hoverImage: string;
  hoverAlt: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "hannah",
    quote:
      "After two years of on-and-off back pain, six sessions with Dr. Nadia and I finally understand it. I haven't had a flare-up since the spring.",
    name: "HANNAH M.",
    treatment: "Lower back pain & mobility",
    hoverImage: "/story-maternal.jpg",
    hoverAlt: "Caring clinician with smiling patient during recovery milestone",
  },
  {
    id: "joe",
    quote:
      "Sam got me from ACL surgery to my first match in nine months. Every stage had a test, so I always knew where I stood with total confidence.",
    name: "JOE R.",
    treatment: "ACL reconstruction & physio",
    hoverImage: "/dept-orthopaedics.jpg",
    hoverAlt: "Supportive orthopaedic doctor guiding patient rehabilitation",
  },
  {
    id: "priya",
    quote:
      "The clinical rehabilitation classes are small enough that Mei notices everything. My hypermobile knees have never felt so solid.",
    name: "PRIYA S.",
    treatment: "Clinical Rehabilitation",
    hoverImage: "/clinical-consultation.jpg",
    hoverAlt: "Compassionate specialist listening and caring for patient",
  },
];

export default function EditorialTestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative z-10 w-full bg-[#EAECE6] text-[#132a21] py-24 sm:py-32 border-b border-[#132a21]/10 select-none"
      style={{ backgroundColor: "#EAECE6" }}
      aria-label="Patient Testimonials"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        {/* ====================================================================
            HEADER: Reference 2 Layout
            N° 06 — IN THEIR WORDS, Headline, Center Dot Icon
            ==================================================================== */}
        <div className="mb-14 sm:mb-18">
          <span className="font-mono text-xs uppercase tracking-widest text-[#132a21]/60 mb-4 block">
            N° 06 — IN THEIR WORDS
          </span>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#132a21] font-normal leading-[1.08] tracking-tight">
            Back to the things they love.
          </h2>

          {/* Minimalist central circle indicator mark from reference */}
          <div
            className="w-7 h-7 rounded-full border border-[#132a21]/25 flex items-center justify-center my-6"
            aria-hidden="true"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#132a21]" />
          </div>
        </div>

        {/* ====================================================================
            3-COLUMN TESTIMONIAL CARDS WITH HOVER PHOTO REVEAL
            Resting: Clean ivory card with serif italic quote
            Hover: Smoothly reveals photo of caring, support, and doctors/patients
            ==================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl bg-[#FAF8F5] p-8 sm:p-10 min-h-[380px] lg:min-h-[420px] flex flex-col justify-between overflow-hidden shadow-xs border border-[#132a21]/10 transition-all duration-500 cursor-pointer hover:shadow-xl"
            >
              {/* HOVER PHOTO REVEAL LAYER: Caring, Love, Support character photo */}
              <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <Image
                  src={item.hoverImage}
                  alt={item.hoverAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700"
                />
                {/* Dark gradient overlay so text remains razor sharp in white */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/35" />
              </div>

              {/* Top: Serif Italic Quote */}
              <div className="relative z-10">
                <p className="font-serif italic text-lg sm:text-xl text-[#132a21]/90 leading-relaxed font-normal transition-colors duration-300 group-hover:text-white">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Bottom: Author Name & Treatment */}
              <div className="relative z-10 pt-8 border-t border-[#132a21]/10 group-hover:border-white/20 transition-colors duration-300">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#132a21] block transition-colors duration-300 group-hover:text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#008068] group-hover:bg-[#2dd4bf] transition-colors" />
                  {item.name}
                </span>
                <span className="text-xs text-[#132a21]/60 block mt-1 transition-colors duration-300 group-hover:text-white/70">
                  {item.treatment}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
