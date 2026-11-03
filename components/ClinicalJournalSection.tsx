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
    title: "Training for your first half marathon without getting hurt",
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
      className="relative z-10 w-full bg-[#FAF8F5] text-[#132a21] py-24 sm:py-32 border-b border-[#132a21]/10 select-none"
      style={{ backgroundColor: "#FAF8F5" }}
      aria-label="Clinical Journal"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        {/* ====================================================================
            HEADER: Reference 1 Layout
            N° 07 — JOURNAL, Title, Center Dot Icon, Read the Journal CTA
            ==================================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 sm:pb-16 border-b border-[#132a21]/15">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#132a21]/60 mb-4 block">
              N° 07 — JOURNAL
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#132a21] font-normal leading-[1.08] tracking-tight max-w-xl">
              Plain advice from
              <br />
              the treatment room.
            </h2>
          </div>

          <div className="flex items-center gap-6 self-start md:self-end">
            {/* Minimalist central circle indicator from reference */}
            <div
              className="w-7 h-7 rounded-full border border-[#132a21]/25 hidden sm:flex items-center justify-center shrink-0"
              aria-hidden="true"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#132a21]" />
            </div>

            <Link
              href="#all-articles"
              className="px-6 py-3 rounded-full border border-[#132a21]/30 hover:border-[#132a21] hover:bg-[#132a21] hover:text-white transition-all duration-300 text-sm font-medium tracking-wide inline-flex items-center gap-2 group shadow-2xs"
            >
              <span>Read the journal</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* ====================================================================
            3-COLUMN EDITORIAL ARTICLE GRID (Matching Reference 1)
            ==================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 mt-12 sm:mt-16">
          {JOURNAL_ARTICLES.map((article) => (
            <Link
              key={article.id}
              href={article.href}
              className="group flex flex-col cursor-pointer"
            >
              {/* Photo Card with Clean Straight Rectangle Framing */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-stone-200 border border-[#132a21]/10">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Read Time */}
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#132a21]/55 mt-4 block">
                {article.readTime}
              </span>

              {/* Article Title */}
              <h3 className="font-serif text-xl sm:text-2xl text-[#132a21] font-normal leading-snug mt-2 mb-2 group-hover:text-[#008068] transition-colors duration-200">
                {article.title}
              </h3>

              {/* Excerpt */}
              <p className="text-sm text-[#132a21]/70 font-light leading-relaxed">
                {article.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
