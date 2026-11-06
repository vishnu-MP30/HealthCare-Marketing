"use client";

import React from "react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full flex-1 flex flex-col justify-between items-center overflow-hidden pt-8 pb-10 px-4 sm:px-6 md:px-8 select-none">
      {/* 1. TOP EYEBROW */}
      <div className="relative z-10 text-center mb-4 sm:mb-6">
        <p className="font-serif-display text-sm sm:text-base md:text-lg tracking-[0.14em] text-black uppercase font-medium">
          Independent Creative &amp; Marketing Studio
        </p>
      </div>

      {/* 2. MAIN COMPOSITION: OVERSIZED HEADLINE + OVERLAPPING SCULPTURAL V SYMBOL */}
      <div className="relative z-10 w-full max-w-[1560px] mx-auto flex flex-col items-center justify-center my-auto">
        {/* OVERSIZED EMERALD-GREEN SERIF HEADLINE */}
        <div className="relative z-0 w-full text-center">
          <h1 className="font-serif-display font-normal text-[#008068] tracking-[-0.025em] leading-[0.84] m-0 p-0 text-[clamp(4.2rem,13.5vw,13.5rem)]">
            <span className="block">MAKE YOUR</span>
            <span className="block mt-[-0.04em]">MARK.</span>
          </h1>
        </div>

        {/* CENTRAL SCULPTURAL 3D SYMBOL (Clean Transparent PNG Cutout - NO rectangular panel) */}
        {/* Horizontally centered, overlapping both lines, with precise scale proportion matching reference */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none w-[clamp(160px,19vw,320px)] aspect-[3/4]">
          <div className="relative w-full h-full filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.18)]">
            <Image
              src="/velora-sculpture.png"
              alt="VELORA Sculptural Symbol - Obsidian and emerald geometric monument"
              fill
              priority
              className="object-contain"
              sizes="(max-width: 640px) 180px, (max-width: 1024px) 240px, 320px"
            />
          </div>
        </div>
      </div>

      {/* 3. BELOW: SUPPORTING COPY & PRIMARY CTA */}
      <div className="relative z-10 w-full max-w-[1100px] flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 sm:pt-8 mt-4 border-t border-[rgba(0,0,0,0.08)]">
        {/* Left: Concise Supporting Statement */}
        <div className="text-center sm:text-left">
          <p className="font-serif-display italic text-base sm:text-lg text-black">
            A creative marketing studio for brands that refuse to blend in.
          </p>
          <p className="font-sans text-xs sm:text-sm text-[#484848] mt-0.5">
            Strategy, Identity, and Digital Art Direction.
          </p>
        </div>

        {/* Right: Clear Primary Call to Action */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 rounded-full bg-[#008068] px-7 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-200 hover:bg-[#006B57] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#008068]">
            <span>Start a Project</span>
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5 text-xs">
              ↗
            </span>
          </a>

          <a
            href="#approach"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-black hover:text-[#008068] transition-colors py-2 px-3 border-b border-black/30 hover:border-[#008068]">
            <span>Our Approach</span>
            <span className="text-xs">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
