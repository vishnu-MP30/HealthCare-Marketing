"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function EditorialFooter() {
  return (
    <footer
      id="site-footer"
      className="relative z-10 w-full bg-[#E8682A] text-white pt-14 sm:pt-20 pb-10 sm:pb-12 px-6 sm:px-10 lg:px-14 overflow-hidden select-none border-t border-white/20"
      style={{ backgroundColor: "#E8682A", color: "#FFFFFF" }}
      aria-label="Mendly Clinic Footer">
      <div className="max-w-7xl mx-auto">
        {/* ====================================================================
            TOP CTA BLOCK
            N° 00 — START HERE
            "Feeling better starts with a proper conversation."
            ==================================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-14 sm:pb-20">
          <div>
            <span
              className="font-body text-xs uppercase tracking-widest text-white/85 mb-4 block font-semibold"
              style={{ color: "rgba(255, 255, 255, 0.85)" }}>
              N° 00 — START HERE
            </span>
            <h2
              className="font-display font-bold text-white text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] tracking-tight leading-[1.02] max-w-4xl"
              style={{ color: "#FFFFFF" }}>
              Feeling better starts with
              <br />
              a proper <span className="font-normal text-white" style={{ color: "#FFFFFF" }}>conversation.</span>
            </h2>
          </div>

          <div className="flex items-center gap-6 self-start lg:self-end">
            {/* Center dot indicator */}
            <div
              className="w-7 h-7 rounded-full border border-white/40 hidden sm:flex items-center justify-center shrink-0"
              aria-hidden="true">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>

            <Link
              href="#book"
              className="px-7 py-3.5 rounded-full bg-white text-[#E8682A] hover:bg-neutral-100 transition-all duration-300 text-sm font-semibold tracking-wide inline-flex items-center gap-2 group shadow-lg cursor-pointer">
              <span>Book an assessment</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* ====================================================================
            THIN DIVIDER LINE
            ==================================================================== */}
        <div className="w-full border-t border-white/25 pt-12 sm:pt-16" />

        {/* ====================================================================
            4-COLUMN METADATA & LINKS GRID
            VISIT | OPENING HOURS | CONTACT | EXPLORE
            ==================================================================== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12 font-body text-xs tracking-wider">
          {/* Column 1: VISIT */}
          <div>
            <span
              className="text-white/80 font-semibold uppercase tracking-widest block mb-4"
              style={{ color: "rgba(255, 255, 255, 0.8)" }}>
              VISIT
            </span>
            <p
              className="text-white leading-relaxed font-body text-sm font-normal"
              style={{ color: "#FFFFFF" }}>
              450 Medical Center Plaza,
              <br />
              Bristol BS2 8RR
            </p>
            <Link
              href="#directions"
              className="inline-block text-white underline decoration-white/60 underline-offset-4 hover:decoration-white transition-colors mt-3 text-xs font-body"
              style={{ color: "#FFFFFF" }}>
              Get directions
            </Link>
          </div>

          {/* Column 2: OPENING HOURS */}
          <div>
            <span
              className="text-white/80 font-semibold uppercase tracking-widest block mb-4"
              style={{ color: "rgba(255, 255, 255, 0.8)" }}>
              OPENING HOURS
            </span>
            <ul className="space-y-1.5 text-white font-body text-xs leading-relaxed" style={{ color: "#FFFFFF" }}>
              <li className="flex justify-between max-w-[200px]">
                <span className="text-white/85" style={{ color: "rgba(255, 255, 255, 0.85)" }}>Mon–Thu</span>
                <span className="text-white font-medium" style={{ color: "#FFFFFF" }}>07:00–20:30</span>
              </li>
              <li className="flex justify-between max-w-[200px]">
                <span className="text-white/85" style={{ color: "rgba(255, 255, 255, 0.85)" }}>Fri</span>
                <span className="text-white font-medium" style={{ color: "#FFFFFF" }}>07:00–18:00</span>
              </li>
              <li className="flex justify-between max-w-[200px]">
                <span className="text-white/85" style={{ color: "rgba(255, 255, 255, 0.85)" }}>Sat</span>
                <span className="text-white font-medium" style={{ color: "#FFFFFF" }}>08:30–14:00</span>
              </li>
              <li className="flex justify-between max-w-[200px]">
                <span className="text-white/85" style={{ color: "rgba(255, 255, 255, 0.85)" }}>Sun</span>
                <span className="text-white/70" style={{ color: "rgba(255, 255, 255, 0.7)" }}>Closed</span>
              </li>
            </ul>
          </div>

          {/* Column 3: CONTACT */}
          <div>
            <span
              className="text-white/80 font-semibold uppercase tracking-widest block mb-4"
              style={{ color: "rgba(255, 255, 255, 0.8)" }}>
              CONTACT
            </span>
            <ul className="space-y-2 text-white font-body text-xs" style={{ color: "#FFFFFF" }}>
              <li>
                <a
                  href="tel:+441174960321"
                  className="hover:underline transition-all block font-body text-sm text-white"
                  style={{ color: "#FFFFFF" }}>
                  +44 117 496 0321
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@mendly.co"
                  className="hover:underline transition-all block text-white/95 text-sm"
                  style={{ color: "rgba(255, 255, 255, 0.95)" }}>
                  hello@mendly.co
                </a>
              </li>
              <li className="pt-2">
                <Link
                  href="#instagram"
                  className="hover:underline transition-all text-white underline underline-offset-4 decoration-white/60"
                  style={{ color: "#FFFFFF" }}>
                  Instagram
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: EXPLORE */}
          <div>
            <span
              className="text-white/80 font-semibold uppercase tracking-widest block mb-4"
              style={{ color: "rgba(255, 255, 255, 0.8)" }}>
              EXPLORE
            </span>
            <ul className="space-y-2 text-white font-body text-sm font-normal" style={{ color: "#FFFFFF" }}>
              <li>
                <Link href="#conditions" className="hover:underline transition-all text-white block" style={{ color: "#FFFFFF" }}>
                  Conditions
                </Link>
              </li>
              <li>
                <Link href="#treatments" className="hover:underline transition-all text-white block" style={{ color: "#FFFFFF" }}>
                  Treatments
                </Link>
              </li>
              <li>
                <Link href="#classes" className="hover:underline transition-all text-white block" style={{ color: "#FFFFFF" }}>
                  Classes &amp; timetable
                </Link>
              </li>
              <li>
                <Link href="#team" className="hover:underline transition-all text-white block" style={{ color: "#FFFFFF" }}>
                  Our team
                </Link>
              </li>
              <li>
                <Link href="#exercise-library" className="hover:underline transition-all text-white block" style={{ color: "#FFFFFF" }}>
                  Exercise library
                </Link>
              </li>
              <li>
                <Link href="#journal" className="hover:underline transition-all text-white block" style={{ color: "#FFFFFF" }}>
                  Journal
                </Link>
              </li>
              <li>
                <Link href="#first-visit" className="hover:underline transition-all text-white block" style={{ color: "#FFFFFF" }}>
                  First visit &amp; fees
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ====================================================================
            GIANT BRAND WORDMARK (Expanded & Stretched Editorial Serif)
            Matching uploaded reference: centered dot above + edge-to-edge Mendly
            ==================================================================== */}
        <div className="pt-16 sm:pt-24 select-none pointer-events-none flex flex-col items-center w-full">
          {/* Subtle indicator dot matching uploaded reference */}
          <div className="w-2.5 h-2.5 rounded-full bg-white/70 mb-4 sm:mb-6 shadow-sm" />

          {/* Expanded & Stretched "Mendly" Wordmark */}
          <div className="w-full overflow-hidden flex justify-center items-center">
            <h1
              className="font-serif font-normal text-white text-center tracking-[-0.03em] leading-[0.85] whitespace-nowrap w-full select-none"
              style={{
                fontFamily: '"Playfair Display", "Cormorant Garamond", Georgia, "Times New Roman", serif',
                fontSize: "clamp(5rem, 23vw, 24rem)",
                color: "#FFFFFF",
              }}>
              Mendly
            </h1>
          </div>
        </div>

        {/* ====================================================================
            BOTTOM LEGAL BAR
            ==================================================================== */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/25 text-[11px] font-body tracking-wider"
          style={{ color: "rgba(255, 255, 255, 0.85)" }}>
          <p>© 2026 Mendly Clinic · Physiotherapy, clinical medicine &amp; rehabilitation</p>
          <div className="flex items-center gap-6">
            <Link href="#privacy" className="hover:underline transition-all text-white" style={{ color: "#FFFFFF" }}>
              Privacy
            </Link>
            <Link href="#terms" className="hover:underline transition-all text-white" style={{ color: "#FFFFFF" }}>
              Terms of Care
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
