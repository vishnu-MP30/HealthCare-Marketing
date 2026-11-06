"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HEALTH_READ_TABS,
  HEALTH_READS_DATA,
  ReadArticle,
} from "@/content/healthReads";
import { ArrowRight, BookOpen } from "lucide-react";

export default function HealthReadsSection() {
  const [activeTab, setActiveTab] = useState<string>("heart-health");

  // Filter articles based on active category
  const filteredArticles = HEALTH_READS_DATA.filter(
    (article) => article.tab === activeTab
  );

  return (
    <section
      id="health-reads"
      className="relative z-10 w-full bg-white text-[#1F2123] py-16 sm:py-24 border-b border-[#1F2123]/10 select-none"
      style={{ backgroundColor: "#FFFFFF" }}
      aria-label="Health Reads & Clinical Guidance">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        {/* ====================================================================
            HEADER: Large Bodoni Serif Title & Centered Subtitle
            Matching Reference 1 & 2
            ==================================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-[11px] uppercase tracking-[0.24em] text-[#E8682A] font-semibold mb-4 inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E8682A] animate-pulse" />
            Clinical Insights &amp; Guidance
          </span>

          <h2 className="font-display font-bold text-[#1F2123] text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.04] mt-3 mb-4">
            Health <span className="text-[#E8682A] font-normal">Reads.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#1F2123]/70 font-body font-light leading-relaxed max-w-2xl mx-auto">
            Not sure which guidance fits? Choose a clinical focus and explore measured insights, preventive protocols, and practical advice from our medical team.
          </p>
        </div>

        {/* ====================================================================
            CATEGORY TABS: Minimalist Elegant Pill Switchers
            ==================================================================== */}
        <div
          role="tablist"
          aria-label="Health Reads Categories"
          className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-16 sm:mb-20">
          {HEALTH_READ_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#E8682A] text-white shadow-sm"
                    : "bg-transparent text-[#1F2123]/70 font-body border border-[#1F2123]/15 hover:border-[#E8682A] hover:text-[#E8682A]"
                }`}>
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ====================================================================
            GRID OF CIRCLE FRAMES: Reference 1 & 2 Style
            4 Perfect Circular Frames with Centered Serif Title Underneath
            ==================================================================== */}
        <div
          id={`panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 animate-in fade-in duration-300">
          {filteredArticles.map((article: ReadArticle) => (
            <Link
              key={article.id}
              href={article.href || "#"}
              className="group flex flex-col items-center text-center cursor-pointer select-none">
              {/* Circular Framed Image */}
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 rounded-full overflow-hidden shadow-sm border border-[#1F2123]/10 bg-white transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 640px) 150px, (max-width: 1024px) 210px, 250px"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-[#E8682A]/15 transition-colors duration-400" />
              </div>

              {/* Title Underneath: Normal font, reduced size, strictly 2 lines, no top clipping */}
              <div className="w-full max-w-[260px] mt-3.5 mb-1.5 min-h-[2.9rem] flex items-start justify-center">
                <h3
                  className="font-body font-normal text-center w-full group-hover:text-[#E8682A] transition-colors pt-0.5 line-clamp-2"
                  style={{
                    fontSize: "15px",
                    lineHeight: "1.35",
                    color: "#1F2123",
                  }}>
                  {article.title}
                </h3>
              </div>

              {/* Minimal reading time prompt */}
              <span className="text-[11px] sm:text-xs uppercase tracking-widest text-[#1F2123]/50 mt-2 font-medium flex items-center gap-1 group-hover:text-[#E8682A] transition-colors">
                <BookOpen className="w-3 h-3" />
                Read article
              </span>
            </Link>
          ))}
        </div>

        {/* Bottom CTA / Browse All */}
        <div className="mt-16 sm:mt-20 pt-10 border-t border-[#1F2123]/10 text-center">
          <Link
            href="#all-reads"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#1F2123] hover:text-[#E8682A] transition-colors border-b border-[#1F2123]/15 pb-0.5">
            Explore all health &amp; clinical articles
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
