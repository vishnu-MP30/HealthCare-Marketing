"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface JournalArticle {
  id: string;
  readTime: string;
  title: string;
  excerpt: string;
  image: string;
  href: string;
}

const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: "rest-sore-back",
    readTime: "4 MIN READ",
    title: "Should you rest a sore back?",
    excerpt:
      "Mostly, no. Here is what to do in the first few days instead, and when to call someone.",
    image: "/journal-walking.jpg",
    href: "#journal-back-pain",
  },
  {
    id: "half-marathon-training",
    readTime: "6 MIN READ",
    title: "Training for your first half marathon safely",
    excerpt:
      "Most running injuries are training errors. Three rules that keep beginners on the road.",
    image: "/journal-running.jpg",
    href: "#journal-running",
  },
  {
    id: "clinical-pilates",
    readTime: "3 MIN READ",
    title: "What makes Pilates 'clinical'?",
    excerpt:
      "Same reformer, different starting point. Why our classes begin with an assessment.",
    image: "/journal-clinical-pilates.jpg",
    href: "#journal-pilates",
  },
];

export default function ClinicalJournalSection() {
  return (
    <section
      id="journal"
      className="relative z-10 w-full bg-white text-[#1F2123] py-16 sm:py-24 border-b border-[#1F2123]/10 select-none"
      aria-label="Clinical Journal"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        {/* ====================================================================
            HEADER: Reference Layout
            N° 07 — JOURNAL, Title, Center Dot Icon, Read the Journal CTA
            ==================================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 sm:pb-16 border-b border-[#1F2123]/10">
          <div>
            <span className="font-body text-xs uppercase tracking-widest text-[#E8682A] font-semibold mb-3 block">
              N° 07 — JOURNAL
            </span>
            <h2 className="font-display font-bold text-[#1F2123] text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.04]">
              Plain advice from{"\n"}
              the treatment <span className="text-[#E8682A] font-normal">room.</span>
            </h2>
          </div>

          <div className="flex items-center gap-6 self-start md:self-end">
            {/* Minimalist central circle indicator */}
            <div
              className="w-7 h-7 rounded-full border border-[#1F2123]/15 hidden sm:flex items-center justify-center shrink-0"
              aria-hidden="true"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#E8682A]" />
            </div>

            <Link
              href="#all-articles"
              className="px-6 py-3 rounded-full border border-[#1F2123]/20 hover:border-[#E8682A] hover:bg-[#E8682A] hover:text-white text-[#1F2123] transition-all duration-300 text-sm font-medium tracking-wide inline-flex items-center gap-2 group shadow-sm"
            >
              <span>Read the journal</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* ====================================================================
            3-COLUMN EDITORIAL ARTICLE GRID
            ==================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 mt-12 sm:mt-16">
          {JOURNAL_ARTICLES.map((article) => (
            <Link
              key={article.id}
              href={article.href}
              className="group flex flex-col cursor-pointer"
            >
              {/* Photo Card with Clean Straight Rectangle Framing */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-100 border border-[#1F2123]/10 rounded-lg">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Read Time */}
              <span className="font-body text-[11px] uppercase tracking-wider text-[#1F2123]/50 mt-4 block font-medium">
                {article.readTime}
              </span>

              {/* Article Title */}
              <h3 className="font-display font-medium text-base sm:text-lg md:text-[1.18rem] text-[#1F2123] leading-snug tracking-tight mt-2 mb-2 group-hover:text-[#E8682A] transition-colors duration-200 min-h-[3.2rem]">
                {article.title}
              </h3>

              {/* Excerpt */}
              <p className="text-sm text-[#1F2123]/70 font-body font-normal leading-relaxed">
                {article.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
