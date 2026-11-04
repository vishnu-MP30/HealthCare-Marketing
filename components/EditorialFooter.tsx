"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function EditorialFooter() {
  return (
    <footer
      id="site-footer"
      className="relative z-10 w-full bg-[#182B22] text-white pt-20 sm:pt-28 pb-12 sm:pb-16 px-6 sm:px-10 lg:px-14 overflow-hidden select-none"
      style={{ backgroundColor: "#182B22" }}
      aria-label="LifeCare Clinic Footer"
    >
      <div className="max-w-7xl mx-auto">
        {/* ====================================================================
            TOP CTA BLOCK (Reference Image 3)
            N° 00 — START HERE
            "Feeling better starts with a proper conversation."
            ==================================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-14 sm:pb-20">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-white/50 mb-4 block">
              N° 00 — START HERE
            </span>
            <h2 className="font-sans font-light text-[40px] sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[82px] text-white leading-[1.04] tracking-[-0.035em] max-w-3xl">
              Feeling better starts with
              <br />
              a proper <span className="text-[#008068] font-normal">conversation.</span>
            </h2>
          </div>

          <div className="flex items-center gap-6 self-start lg:self-end">
            {/* Center dot indicator */}
            <div
              className="w-7 h-7 rounded-full border border-white/20 hidden sm:flex items-center justify-center shrink-0"
              aria-hidden="true"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#008068]" />
            </div>

            <Link
              href="#book"
              className="px-7 py-3.5 rounded-full bg-white text-[#182B22] hover:bg-neutral-100 transition-all duration-300 text-sm font-semibold tracking-wide inline-flex items-center gap-2 group shadow-md"
            >
              <span>Book an assessment</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* ====================================================================
            THIN DIVIDER LINE (Reference Image 3)
            ==================================================================== */}
        <div className="w-full border-t border-white/15 pt-12 sm:pt-16" />

        {/* ====================================================================
            4-COLUMN METADATA & LINKS GRID (Reference Image 3)
            VISIT | OPENING HOURS | CONTACT | EXPLORE
            ==================================================================== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12 font-mono text-xs tracking-wider">
          {/* Column 1: VISIT */}
          <div>
            <span className="text-white/40 uppercase tracking-widest block mb-4">
              VISIT
            </span>
            <p className="text-white/80 leading-relaxed font-sans text-sm font-light">
              450 Medical Center Plaza,
              <br />
              Bristol BS2 8RR
            </p>
            <Link
              href="#directions"
              className="inline-block text-white/90 underline decoration-white/40 underline-offset-4 hover:decoration-white transition-colors mt-3 text-xs font-mono"
            >
              Get directions
            </Link>
          </div>

          {/* Column 2: OPENING HOURS */}
          <div>
            <span className="text-white/40 uppercase tracking-widest block mb-4">
              OPENING HOURS
            </span>
            <ul className="space-y-1.5 text-white/80 font-mono text-xs leading-relaxed">
              <li className="flex justify-between max-w-[200px]">
                <span className="text-white/50">Mon–Thu</span>
                <span>07:00–20:30</span>
              </li>
              <li className="flex justify-between max-w-[200px]">
                <span className="text-white/50">Fri</span>
                <span>07:00–18:00</span>
              </li>
              <li className="flex justify-between max-w-[200px]">
                <span className="text-white/50">Sat</span>
                <span>08:30–14:00</span>
              </li>
              <li className="flex justify-between max-w-[200px]">
                <span className="text-white/50">Sun</span>
                <span className="text-white/40">Closed</span>
              </li>
            </ul>
          </div>

          {/* Column 3: CONTACT */}
          <div>
            <span className="text-white/40 uppercase tracking-widest block mb-4">
              CONTACT
            </span>
            <ul className="space-y-2 text-white/80 font-mono text-xs">
              <li>
                <a
                  href="tel:+441174960321"
                  className="hover:text-white transition-colors block font-sans text-sm"
                >
                  +44 117 496 0321
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@lifecare.co"
                  className="hover:text-white transition-colors block text-white/70"
                >
                  hello@lifecare.co
                </a>
              </li>
              <li className="pt-2">
                <Link
                  href="#instagram"
                  className="hover:text-white transition-colors text-white/70 underline underline-offset-4 decoration-white/30"
                >
                  Instagram
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: EXPLORE */}
          <div>
            <span className="text-white/40 uppercase tracking-widest block mb-4">
              EXPLORE
            </span>
            <ul className="space-y-2 text-white/75 font-sans text-sm font-light">
              <li>
                <Link href="#conditions" className="hover:text-white transition-colors">
                  Conditions
                </Link>
              </li>
              <li>
                <Link href="#treatments" className="hover:text-white transition-colors">
                  Treatments
                </Link>
              </li>
              <li>
                <Link href="#classes" className="hover:text-white transition-colors">
                  Classes &amp; timetable
                </Link>
              </li>
              <li>
                <Link href="#team" className="hover:text-white transition-colors">
                  Our team
                </Link>
              </li>
              <li>
                <Link href="#exercise-library" className="hover:text-white transition-colors">
                  Exercise library
                </Link>
              </li>
              <li>
                <Link href="#journal" className="hover:text-white transition-colors">
                  Journal
                </Link>
              </li>
              <li>
                <Link href="#first-visit" className="hover:text-white transition-colors">
                  First visit &amp; fees
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ====================================================================
            GIANT BRAND LOGO / WORDMARK (Reference Image 4)
            "LifeCare" taking massive width across bottom
            ==================================================================== */}
        <div className="pt-16 sm:pt-24 select-none pointer-events-none">
          <h1 className="font-sans font-light text-[17vw] sm:text-[19vw] lg:text-[20vw] text-white/95 leading-none tracking-[-0.04em] opacity-95 -ml-1 sm:-ml-3">
            LifeCare
          </h1>
        </div>

        {/* ====================================================================
            BOTTOM LEGAL BAR (Reference Image 4)
            ==================================================================== */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/15 text-[11px] font-mono text-white/50 tracking-wider">
          <p>© 2026 LifeCare Clinic · Physiotherapy, clinical medicine &amp; rehabilitation</p>
          <div className="flex items-center gap-6">
            <Link href="#privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="#terms" className="hover:text-white transition-colors">
              Terms of Care
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
