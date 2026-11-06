"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  {
    id: "marcus",
    quote:
      "The cardiac rehabilitation plan gave me my confidence back after my stent procedure. I'm hiking with my grandchildren again every weekend.",
    name: "MARCUS T.",
    treatment: "Cardiovascular Rehab & Recovery",
    hoverImage: "/dept-cardiology.jpg",
    hoverAlt: "Specialist monitoring cardiac patient recovery",
  },
];

export default function EditorialTestimonialsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section
      id="testimonials"
      className="relative z-10 w-full bg-white text-[#1F2123] py-16 sm:py-24 border-b border-[#1F2123]/10 select-none overflow-hidden"
      style={{ backgroundColor: "#FFFFFF" }}
      aria-label="Patient Testimonials">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        {/* ====================================================================
            HEADER: Reference 2 Layout with Prev / Next Navigation Controls
            N° 06 — IN THEIR WORDS, Headline, Center Dot Icon
            ==================================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <span className="font-body text-xs uppercase tracking-widest text-[#1F2123]/60 mb-4 block">
              N° 06 — IN THEIR WORDS
            </span>

            <h2 className="font-display font-bold text-[#1F2123] text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.08] max-w-3xl">
              Back to the things <span className="whitespace-nowrap">they <span className="text-[#E8682A] font-normal">love.</span></span>
            </h2>

            {/* Minimalist central circle indicator mark */}
            <div
              className="w-7 h-7 rounded-full border border-[#1F2123]/15 flex items-center justify-center my-6"
              aria-hidden="true">
              <div className="w-1.5 h-1.5 rounded-full bg-[#E8682A]" />
            </div>
          </div>

          {/* Horizontal Scroll Navigation Controls */}
          <div className="flex items-center gap-3 self-start md:self-end pb-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="w-10 h-10 rounded-full bg-[#F8F9FA] text-[#1F2123] hover:border-[#E8682A] hover:text-[#E8682A] flex items-center justify-center transition-all duration-200 active:scale-95 border border-[#1F2123]/15 cursor-pointer shadow-2xs">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="w-10 h-10 rounded-full bg-[#F8F9FA] text-[#1F2123] hover:border-[#E8682A] hover:text-[#E8682A] flex items-center justify-center transition-all duration-200 active:scale-95 border border-[#1F2123]/15 cursor-pointer shadow-2xs">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ====================================================================
            SCROLLABLE HORIZONTAL TESTIMONIAL CARDS
            Constant background images with deep gradient scrim & crisp white text
            ==================================================================== */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 sm:gap-8 overflow-x-auto scrollbar-none snap-x snap-mandatory py-3 -mx-6 sm:-mx-10 lg:-mx-14 px-6 sm:px-10 lg:px-14 scroll-smooth">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="group relative flex-shrink-0 w-[290px] sm:w-[350px] md:w-[380px] lg:w-[410px] rounded-2xl p-8 sm:p-10 min-h-[380px] lg:min-h-[420px] flex flex-col justify-between overflow-hidden shadow-md border border-white/10 transition-all duration-500 cursor-pointer hover:shadow-2xl hover:-translate-y-1 bg-neutral-900 snap-start">
              
              {/* CONSTANT IMAGE BACKGROUND */}
              <div className="absolute inset-0 z-0 opacity-100 pointer-events-none">
                <Image
                  src={item.hoverImage}
                  alt={item.hoverAlt}
                  fill
                  sizes="(max-width: 640px) 290px, (max-width: 1024px) 380px, 410px"
                  className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Deep gradient scrim for crystal-clear text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/75 to-black/55" />
              </div>

              {/* Top: Quote in crisp white color */}
              <div className="relative z-10">
                <p
                  className="font-body font-light text-base sm:text-lg lg:text-xl text-white !text-white leading-relaxed drop-shadow-sm"
                  style={{ color: "#FFFFFF" }}>
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Bottom: Author Name & Treatment in crisp white */}
              <div className="relative z-10 pt-8 border-t border-white/20">
                <span
                  className="font-body text-xs font-semibold uppercase tracking-wider text-white !text-white flex items-center gap-2"
                  style={{ color: "#FFFFFF" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E8682A]" />
                  {item.name}
                </span>
                <span
                  className="text-xs text-white/80 !text-white font-body block mt-1"
                  style={{ color: "rgba(255, 255, 255, 0.85)" }}>
                  {item.treatment}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom indicator hint */}
        <div className="flex items-center justify-between mt-8 text-xs text-neutral-500 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E8682A]" />
            <span>4 PATIENT RECOVERY STORIES • VERIFIED CLINICAL OUTCOMES</span>
          </div>
          <span className="hidden sm:inline">DRAG OR SCROLL TO EXPLORE MORE →</span>
        </div>
      </div>
    </section>
  );
}
