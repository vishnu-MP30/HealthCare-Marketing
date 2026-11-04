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
      className="relative z-10 w-full bg-[#fcfcfc] text-[#111111] py-24 sm:py-32 border-b border-neutral-200 select-none"
      style={{ backgroundColor: "#fcfcfc" }}
      aria-label="Health Reads & Clinical Guidance"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        {/* ====================================================================
            HEADER: Large Bodoni Serif Title & Centered Subtitle
            Matching Reference 1 & 2
            ==================================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-[11px] uppercase tracking-[0.24em] text-[#008068] font-semibold mb-4 inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#008068] animate-pulse" />
            Clinical Insights &amp; Guidance
          </span>

          <h2 className="font-sans font-light text-[40px] sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[82px] text-[#111111] leading-[1.04] tracking-[-0.035em] mt-3 mb-6">
            Health <span className="text-[#008068] font-normal">Reads.</span>
          </h2>

          <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed max-w-2xl mx-auto">
            Not sure which guidance fits? Choose a clinical focus and explore measured insights, preventive protocols, and practical advice from our medical team.
          </p>
        </div>

        {/* ====================================================================
            CATEGORY TABS: Minimalist Elegant Pill Switchers
            ==================================================================== */}
        <div
          role="tablist"
          aria-label="Health Reads Categories"
          className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-16 sm:mb-20"
        >
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
                    ? "bg-[#111111] text-white shadow-sm"
                    : "bg-transparent text-neutral-600 border border-neutral-300 hover:border-[#111111] hover:text-[#111111]"
                }`}
              >
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
          className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 animate-in fade-in duration-300"
        >
          {filteredArticles.map((article: ReadArticle) => (
            <Link
              key={article.id}
              href={article.href || "#"}
              className="group flex flex-col items-center text-center cursor-pointer select-none"
            >
              {/* Circular Framed Image */}
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 rounded-full overflow-hidden shadow-sm border border-neutral-200 bg-white transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 640px) 150px, (max-width: 1024px) 210px, 250px"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-[#008068]/15 transition-colors duration-400" />
              </div>

              {/* Title Underneath in Sans Font */}
              <h3 className="font-sans font-light text-lg sm:text-xl lg:text-2xl text-[#111111] leading-snug tracking-[-0.02em] mt-6 transition-colors duration-200 group-hover:text-[#008068] max-w-[260px]">
                {article.title}
              </h3>

              {/* Minimal reading time prompt */}
              <span className="text-[11px] sm:text-xs uppercase tracking-widest text-neutral-400 mt-2 font-medium flex items-center gap-1 group-hover:text-[#008068] transition-colors">
                <BookOpen className="w-3 h-3" />
                Read article
              </span>
            </Link>
          ))}
        </div>

        {/* Bottom CTA / Browse All */}
        <div className="mt-16 sm:mt-20 pt-10 border-t border-neutral-200 text-center">
          <Link
            href="#all-reads"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#111111] hover:text-[#008068] transition-colors border-b border-neutral-300 pb-0.5"
          >
            Explore all health &amp; clinical articles
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
