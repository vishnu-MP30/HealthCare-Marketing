"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function ClinicalEditorialStory() {
  const [activeTab, setActiveTab] = useState<"story" | "training">("story");

  return (
    <section className="relative z-20 isolate w-full bg-[#141618] text-white overflow-hidden border-t border-[#24272B] m-0 p-0 select-none">
      {/* ─────────────────────────────────────────────────────────────
          ROW 1: Editorial Feature (Monochromatic Theme)
          Left: Content & Texts (Heading, Paragraph, Button)
          Right: Doctor Portrait with clean monochromatic contrast
         ───────────────────────────────────────────────────────────── */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] relative z-10 bg-[#141618]">
        {/* Left Column: Monochromatic Content */}
        <div className="w-full flex flex-col justify-center px-8 sm:px-14 lg:px-20 xl:px-24 py-16 sm:py-20 lg:py-24 bg-[#141618]">
          <div className="max-w-xl">
            <span className="font-body text-xs uppercase tracking-widest text-[#E8682A] font-semibold mb-3 block">
              Patient Outcome Philosophy
            </span>

            {/* Reduced size, normal weight (not bold), pure white color */}
            <h2
              className="font-body font-normal text-white text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] tracking-tight leading-[1.18] mb-5"
              style={{ color: "#FFFFFF" }}>
              Results that still
              <br />
              look like <span className="font-normal" style={{ color: "#E8682A" }}>you.</span>
            </h2>

            <p
              className="text-white/85 text-sm sm:text-base md:text-lg leading-relaxed mb-8 font-normal font-body max-w-lg"
              style={{ color: "rgba(255, 255, 255, 0.85)" }}>
              Small, measured changes over a few visits. We photograph and document every step, so you can see what moved, what improved, and what stayed exactly as it was.
            </p>

            <div>
              <Link
                href="#treatments"
                className="inline-block border border-white/30 hover:border-[#E8682A] hover:bg-[#E8682A] hover:text-white text-white text-xs uppercase tracking-widest px-7 py-3.5 transition-all duration-200 font-medium font-body rounded-full"
                style={{ color: "#FFFFFF" }}
              >
                See treatments →
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Full-Bleed Edge-to-Edge Doctor Image with Monochromatic Tone */}
        <div className="relative w-full h-[460px] sm:h-[560px] lg:h-auto min-h-[460px] lg:min-h-[720px] bg-[#141618] border-l border-[#24272B]">
          <Image
            src="/doctor-portrait-dark.jpg"
            alt="Clinical Specialist"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            className="object-cover object-center grayscale contrast-[1.08] brightness-[0.92]"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#141618] via-transparent to-transparent opacity-40 pointer-events-none" />
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ROW 2: Medical Director Feature (Monochromatic Theme)
          Left: Large Flush Image (50%)
          Right: Editorial Canvas Content (50%)
         ───────────────────────────────────────────────────────────── */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-[540px] lg:min-h-[640px] relative z-10 border-t border-[#24272B] bg-[#141618]">
        {/* Left Column: Full-Bleed Edge-to-Edge Doctor Image */}
        <div className="relative w-full h-[420px] lg:h-auto min-h-[420px] lg:min-h-[640px] order-2 lg:order-1 bg-[#141618] border-r border-[#24272B]">
          <Image
            src="/medical-director.jpg"
            alt="Chief Medical Director"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top grayscale contrast-[1.08] brightness-[0.92]"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-[#141618] via-transparent to-transparent opacity-40 pointer-events-none" />
        </div>

        {/* Right Column: Editorial Canvas Content with Minimalist Tabs */}
        <div className="w-full flex flex-col justify-center px-8 sm:px-14 lg:px-20 xl:px-24 py-14 lg:py-20 order-1 lg:order-2 bg-[#141618]">
          <div className="max-w-xl">
            {/* Minimalist Underline Tabs */}
            <div className="flex items-center gap-6 mb-7 text-sm">
              <button
                type="button"
                onClick={() => setActiveTab("story")}
                className={`pb-1 text-xs sm:text-sm font-medium tracking-wide transition-all ${
                  activeTab === "story"
                    ? "text-[#E8682A] border-b-2 border-[#E8682A]"
                    : "text-white/50 font-body border-b-2 border-transparent hover:text-white"
                }`}
                style={activeTab === "story" ? { color: "#E8682A" } : { color: "rgba(255, 255, 255, 0.6)" }}
              >
                Her story
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("training")}
                className={`pb-1 text-xs sm:text-sm font-medium tracking-wide transition-all ${
                  activeTab === "training"
                    ? "text-[#E8682A] border-b-2 border-[#E8682A]"
                    : "text-white/50 font-body border-b-2 border-transparent hover:text-white"
                }`}
                style={activeTab === "training" ? { color: "#E8682A" } : { color: "rgba(255, 255, 255, 0.6)" }}
              >
                Training
              </button>
            </div>

            {activeTab === "story" ? (
              <div className="animate-in fade-in duration-200">
                {/* Reduced size, normal weight (not bold), pure white color */}
                <h2
                  className="font-body font-normal text-white text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] tracking-tight leading-[1.18] mb-5"
                  style={{ color: "#FFFFFF" }}>
                  Meet our
                  <br />
                  medical <span className="font-normal" style={{ color: "#E8682A" }}>director</span>
                </h2>

                <p
                  className="text-white/85 font-body text-sm sm:text-base leading-relaxed mb-5 font-normal"
                  style={{ color: "rgba(255, 255, 255, 0.85)" }}>
                  Ten years in specialized hospital medicine and clinical prevention before founding Mendly. She approaches health as an interconnected whole, listening without hurry and crafting treatment protocols designed for lasting vitality rather than just the next appointment.
                </p>

                <p
                  className="text-white/85 font-body text-sm sm:text-base leading-relaxed mb-7 font-normal"
                  style={{ color: "rgba(255, 255, 255, 0.85)" }}>
                  Every care pathway starts with what you wish to maintain, prioritizing conservative, restorative methods with patient autonomy at the center.
                </p>

                <div>
                  <Link
                    href="#team"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-white hover:text-[#E8682A] transition-colors border-b border-white/30 pb-0.5 font-body"
                    style={{ color: "#FFFFFF" }}
                  >
                    Read full background
                    <ArrowRight className="w-3.5 h-3.5 text-[#E8682A]" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="animate-in fade-in duration-200">
                {/* Reduced size, normal weight (not bold), pure white color */}
                <h2
                  className="font-body font-normal text-white text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] tracking-tight leading-[1.18] mb-5"
                  style={{ color: "#FFFFFF" }}>
                  Clinical training
                  <br />
                  &amp; <span className="font-normal" style={{ color: "#E8682A" }}>credentials</span>
                </h2>

                <p
                  className="text-white/85 font-body text-sm sm:text-base leading-relaxed mb-5 font-normal"
                  style={{ color: "rgba(255, 255, 255, 0.85)" }}>
                  Board-certified specialist with extensive academic hospital appointments and continuous leadership in patient-first collaborative standards.
                </p>

                <ul className="space-y-3.5 mb-7">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#E8682A] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-sm text-white font-medium font-body" style={{ color: "#FFFFFF" }}>MD, Johns Hopkins University School of Medicine</strong>
                      <span className="text-xs text-white/70 font-body" style={{ color: "rgba(255, 255, 255, 0.7)" }}>Clinical Diagnostics &amp; Internal Medicine</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#E8682A] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-sm text-white font-medium font-body" style={{ color: "#FFFFFF" }}>Fellow of the American College of Physicians (FACP)</strong>
                      <span className="text-xs text-white/70 font-body" style={{ color: "rgba(255, 255, 255, 0.7)" }}>Advanced Clinical Fellowship</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#E8682A] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-sm text-white font-medium font-body" style={{ color: "#FFFFFF" }}>Dual Certification: Preventive &amp; Internal Medicine</strong>
                      <span className="text-xs text-white/70 font-body" style={{ color: "rgba(255, 255, 255, 0.7)" }}>American Board of Internal Medicine</span>
                    </div>
                  </li>
                </ul>

                <div>
                  <Link
                    href="#team"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-white hover:text-[#E8682A] transition-colors border-b border-white/30 pb-0.5 font-body"
                    style={{ color: "#FFFFFF" }}
                  >
                    View publications &amp; research
                    <ArrowRight className="w-3.5 h-3.5 text-[#E8682A]" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
