"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function ClinicalEditorialStory() {
  const [activeTab, setActiveTab] = useState<"story" | "training">("story");

  return (
    <section className="relative z-20 isolate w-full bg-[#191b1a] overflow-hidden m-0 p-0 select-none">
      {/* ─────────────────────────────────────────────────────────────
          ROW 1: Dark Charcoal Full Bleed (Reference 1)
          Entire row is dark grey/black (#191b1a)
          Left: Content & Texts (Heading, Paragraph, Button)
          Right: Doctor Portrait with clean contrast
         ───────────────────────────────────────────────────────────── */}
      <div
        className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-[580px] lg:min-h-[660px] relative z-10"
        style={{ backgroundColor: "#191b1a" }}
      >
        {/* Left Column: Dark Charcoal Content */}
        <div
          className="w-full text-white flex flex-col justify-center px-8 sm:px-14 lg:px-20 xl:px-24 py-16 lg:py-24"
          style={{ backgroundColor: "#191b1a" }}
        >
          <div className="max-w-xl">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.08] tracking-tight mb-8">
              Results that still
              <br />
              look like you.
            </h2>

            <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-10 font-light">
              Small, measured changes over a few visits. We photograph and document every step, so you can see what moved, what improved, and what stayed exactly as it was.
            </p>

            <div>
              <Link
                href="#treatments"
                className="inline-block border border-white/40 hover:border-white text-white text-xs uppercase tracking-widest px-6 py-3.5 transition-colors duration-200 font-medium"
              >
                See treatments
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Full-Bleed Edge-to-Edge Image */}
        <div
          className="relative w-full h-[450px] lg:h-auto min-h-[450px] lg:min-h-[660px]"
          style={{ backgroundColor: "#191b1a" }}
        >
          <Image
            src="/doctor-portrait-dark.jpg"
            alt="Clinical Specialist"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            className="object-cover object-center grayscale contrast-[1.05]"
          />
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ROW 2: Medical Director Feature (Reference 2)
          Directly jointed with 0 gap / 0 vertical space!
          Left: Large Flush Image (50%)
          Right: Warm Linen Content (50%)
         ───────────────────────────────────────────────────────────── */}
      <div
        className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-[580px] lg:min-h-[660px] relative z-10"
        style={{ backgroundColor: "#F5F2EB" }}
      >
        {/* Left Column: Full-Bleed Edge-to-Edge Doctor Image */}
        <div
          className="relative w-full h-[450px] lg:h-auto min-h-[450px] lg:min-h-[660px] order-2 lg:order-1"
          style={{ backgroundColor: "#e8e4dc" }}
        >
          <Image
            src="/medical-director.jpg"
            alt="Chief Medical Director"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top"
          />
        </div>

        {/* Right Column: Warm Linen Content with Minimalist Tabs */}
        <div
          className="w-full text-[#132a21] flex flex-col justify-center px-8 sm:px-14 lg:px-20 xl:px-24 py-16 lg:py-24 order-1 lg:order-2"
          style={{ backgroundColor: "#F5F2EB" }}
        >
          <div className="max-w-xl">
            {/* Minimalist Underline Tabs matching Reference 2 */}
            <div className="flex items-center gap-6 mb-8 text-sm">
              <button
                type="button"
                onClick={() => setActiveTab("story")}
                className={`pb-1 text-xs sm:text-sm font-medium tracking-wide transition-all ${
                  activeTab === "story"
                    ? "text-[#132a21] border-b-2 border-[#132a21]"
                    : "text-[#132a21]/50 border-b-2 border-transparent hover:text-[#132a21]"
                }`}
              >
                Her story
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("training")}
                className={`pb-1 text-xs sm:text-sm font-medium tracking-wide transition-all ${
                  activeTab === "training"
                    ? "text-[#132a21] border-b-2 border-[#132a21]"
                    : "text-[#132a21]/50 border-b-2 border-transparent hover:text-[#132a21]"
                }`}
              >
                Training
              </button>
            </div>

            {activeTab === "story" ? (
              <div className="animate-in fade-in duration-200">
                <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#132a21] font-normal leading-[1.08] tracking-tight mb-7">
                  Meet our
                  <br />
                  medical director
                </h2>

                <p className="text-[#132a21]/75 text-base sm:text-lg leading-relaxed mb-6 font-light">
                  Ten years in specialized hospital medicine and clinical prevention before founding LifeCare. She approaches health as an interconnected whole, listening without hurry and crafting treatment protocols designed for lasting vitality rather than just the next appointment.
                </p>

                <p className="text-[#132a21]/75 text-base sm:text-lg leading-relaxed mb-8 font-light">
                  Every care pathway starts with what you wish to maintain, prioritizing conservative, restorative methods with patient autonomy at the center.
                </p>

                <div>
                  <Link
                    href="#team"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#132a21] hover:text-[#008068] transition-colors border-b border-[#132a21]/30 pb-0.5"
                  >
                    Read full background
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="animate-in fade-in duration-200">
                <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#132a21] font-normal leading-[1.08] tracking-tight mb-7">
                  Clinical training
                  <br />
                  &amp; credentials
                </h2>

                <p className="text-[#132a21]/75 text-base sm:text-lg leading-relaxed mb-6 font-light">
                  Board-certified specialist with extensive academic hospital appointments and continuous leadership in patient-first collaborative standards.
                </p>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#008068] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-sm text-[#132a21] font-semibold">MD, Johns Hopkins University School of Medicine</strong>
                      <span className="text-xs text-[#132a21]/65">Clinical Diagnostics &amp; Internal Medicine</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#008068] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-sm text-[#132a21] font-semibold">Fellow of the American College of Physicians (FACP)</strong>
                      <span className="text-xs text-[#132a21]/65">Advanced Clinical Fellowship</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#008068] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-sm text-[#132a21] font-semibold">Director of Clinical Protocol Governance</strong>
                      <span className="text-xs text-[#132a21]/65">LifeCare Multidisciplinary Council</span>
                    </div>
                  </li>
                </ul>

                <div>
                  <Link
                    href="#credentials"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#132a21] hover:text-[#008068] transition-colors border-b border-[#132a21]/30 pb-0.5"
                  >
                    View academic appointments
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ROW 3: Precision Procedure (Reference 3)
          Directly jointed with 0 gap / 0 vertical space!
          Left: Warm Linen Content with Stats (50%)
          Right: Large Flush Image (50%)
         ───────────────────────────────────────────────────────────── */}
      <div
        className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-[580px] lg:min-h-[660px] relative z-10"
        style={{ backgroundColor: "#F5F2EB" }}
      >
        {/* Left Column: Warm Linen Content with Metrics */}
        <div
          className="w-full text-[#132a21] flex flex-col justify-center px-8 sm:px-14 lg:px-20 xl:px-24 py-16 lg:py-24"
          style={{ backgroundColor: "#F5F2EB" }}
        >
          <div className="max-w-xl">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#132a21] font-normal leading-[1.08] tracking-tight mb-7">
              Precision care, in
              <br />
              under an hour.
            </h2>

            <p className="text-[#132a21]/75 text-base sm:text-lg leading-relaxed mb-10 font-light">
              Targeted treatments and clinical therapies placed with a light, disciplined hand, after a comprehensive consultation and a personalized care plan. Most patients go straight back to their day.
            </p>

            {/* 3-Column Metrics Row */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#132a21]/15 mb-10">
              <div>
                <span className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#132a21]/50 mb-1.5">
                  Time
                </span>
                <span className="font-serif text-xl sm:text-2xl text-[#132a21] font-normal">
                  30 to 45 min
                </span>
              </div>
              <div>
                <span className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#132a21]/50 mb-1.5">
                  Results
                </span>
                <span className="font-serif text-xl sm:text-2xl text-[#132a21] font-normal">
                  Sustained
                </span>
              </div>
              <div>
                <span className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#132a21]/50 mb-1.5">
                  Downtime
                </span>
                <span className="font-serif text-xl sm:text-2xl text-[#132a21] font-normal">
                  Little to none
                </span>
              </div>
            </div>

            <div>
              <Link
                href="#treatment-pathways"
                className="inline-block border border-[#132a21] hover:bg-[#132a21] hover:text-white text-[#132a21] text-xs uppercase tracking-widest px-6 py-3.5 transition-colors duration-200 font-medium"
              >
                Explore treatment
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Full-Bleed Edge-to-Edge Image */}
        <div
          className="relative w-full h-[450px] lg:h-auto min-h-[450px] lg:min-h-[660px]"
          style={{ backgroundColor: "#e8e4dc" }}
        >
          <Image
            src="/clinical-consultation.jpg"
            alt="Doctor Consultation"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
