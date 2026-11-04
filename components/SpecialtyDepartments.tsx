"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

/**
 * ============================================================================
 * SPECIALTY DEPARTMENTS SECTION
 * ============================================================================
 * Positioned immediately after the 4 Family Care cards section.
 * Built according to the user's reference image:
 *
 * Design features:
 * - Clean warm white / light cream background (#FAF8F5).
 * - Warm terracotta editorial serif headline ("Specialty Departments").
 * - Clean sans-serif subtitle: "A few of our specialty departments that are equipped for your special needs."
 * - "VIEW ALL DEPARTMENTS" pill button with soft sand background.
 * - Horizontal row of tall rounded cards (aspect 3:4) with high-res medical photos:
 *   1. Obstetrics and Gynaecology (Maternal & Fetal Care)
 *   2. Orthopaedics & Joint Care (Glowing X-ray Diagnostics)
 *   3. Cardiology & Vascular (Clinical Stress Test & Telemetry)
 *   4. General & Laparoscopic Surgery (Surgical Theater Team)
 *   5. Pediatrics & Neonatal Care (Tender Child Medicine)
 * - Translucent frosted dark glass badges at the bottom of each card.
 * - Interactive horizontal scroll controls (previous / next buttons).
 * - Interactive detail modal when clicking any department card.
 */

interface Department {
  id: string;
  name: string;
  badgeName: string;
  tagline: string;
  category: string;
  description: string;
  image: string;
  stats: string;
  highlights: string[];
  chiefDoctor: string;
}

const DEPARTMENTS: Department[] = [
  {
    id: "obstetrics",
    name: "Obstetrics and Gynaecology",
    badgeName: "Obstetrics and Gynaecology",
    tagline: "Comprehensive maternal, fetal, and prenatal care with birthing suites.",
    category: "Maternal & Women's Health",
    description:
      "Our Obstetrics & Gynaecology department provides world-class maternal-fetal medicine, high-risk pregnancy monitoring, 4D ultrasound fetal imaging, and personalized birthing suites equipped with advanced neonatal resuscitation units.",
    image: "/dept-obstetrics.jpg",
    stats: "4,200+ Safe Deliveries • 24/7 LDRP Suites",
    highlights: [
      "Level-III Neonatal Intensive Care Unit (NICU)",
      "Painless labor management & epidural services",
      "Advanced fetal echocardiography & genetics",
      "Minimally invasive hysteroscopic procedures",
    ],
    chiefDoctor: "Dr. Elena Vance, MD, FACOG — Chief of Perinatal Medicine",
  },
  {
    id: "orthopaedics",
    name: "Orthopaedics & Joint Care",
    badgeName: "Orthopaedics & Joint",
    tagline: "Precision robotic arthroplasty, joint restoration, and sports rehab.",
    category: "Musculoskeletal & Trauma",
    description:
      "Specializing in sub-millimeter robotic knee and hip replacements, computer-navigated spine stabilization, complex intra-articular fracture reconstruction, and fast-track physical rehabilitation.",
    image: "/dept-orthopaedics.jpg",
    stats: "99.2% Joint Mobility Restoration Rate",
    highlights: [
      "Mako Robotic-Arm assisted joint replacement",
      "Rapid-recovery protocol: Ambulation within 4 hours",
      "Minimally invasive keyhole arthroscopy",
      "Dedicated sports medicine & hydrotherapy facility",
    ],
    chiefDoctor: "Dr. Marcus Thorne, MS, MCh (Ortho) — Lead Arthroplasty Surgeon",
  },
  {
    id: "cardiology",
    name: "Cardiology & Vascular",
    badgeName: "Cardiology & Vascular",
    tagline: "24/7 acute STEMI trauma, heart rhythm ablation, and preventive care.",
    category: "Heart & Vascular Institute",
    description:
      "A comprehensive cardiovascular center featuring twin biplane catheterization laboratories, fractional flow reserve (FFR) diagnostics, emergency angioplasty, transcatheter valve interventions (TAVR), and heart failure telemetry.",
    image: "/dept-cardiology.jpg",
    stats: "<14 Mins Door-to-Balloon Emergency STAT",
    highlights: [
      "24/7 dedicated acute coronary interventional unit",
      "512-slice ultra-fast cardiac CT angiography",
      "3D electro-anatomical mapping for arrhythmias",
      "Dedicated preventive cardiology & cardiac rehab",
    ],
    chiefDoctor: "Dr. Rajeshwar Patel, DM, FACC — Director of Interventional Cardiology",
  },
  {
    id: "surgery",
    name: "General & Advanced Surgery",
    badgeName: "General & Advanced Surgery",
    tagline: "Minimally invasive robotic laparoscopy and ultra-sterile suites.",
    category: "Surgical Sciences & Robotics",
    description:
      "Equipped with Da Vinci Xi 4th-generation multi-port surgical robotics, our surgical department executes ultra-precise gastrointestinal, bariatric, oncologic, and endocrine operations with minimal blood loss and rapid healing.",
    image: "/dept-surgery.jpg",
    stats: "24 Ultra-Clean Laminar Flow OR Suites",
    highlights: [
      "Da Vinci Xi robotic 4-arm precision surgery",
      "Day-care surgery program with same-day discharge",
      "HEPA-filtered positive pressure laminar airflow",
      "Intra-operative high-definition laparoscopic imaging",
    ],
    chiefDoctor: "Dr. Sophia Laurent, FACS, FICS — Chief of Robotic Surgery",
  },
  {
    id: "pediatrics",
    name: "Pediatrics & Neonatal Care",
    badgeName: "Pediatrics & Child Health",
    tagline: "Compassionate child health, developmental therapy, and emergency care.",
    category: "Pediatric & Child Wellness",
    description:
      "Providing gentle, family-centered medical care for infants, children, and adolescents. Supported by round-the-clock pediatric emergency physicians, pediatric pulmonologists, and dedicated child-friendly inpatient rooms.",
    image: "/dept-pediatrics.jpg",
    stats: "24/7 Pediatric Emergency & Level-III NICU",
    highlights: [
      "Child-friendly themed outpatient suites",
      "Pediatric critical care ambulance transport",
      "Neurodevelopmental and speech therapy clinics",
      "Comprehensive childhood immunization programs",
    ],
    chiefDoctor: "Dr. Anita Desai, MD, FAAP — Head of Pediatric Medicine",
  },
];

export default function SpecialtyDepartments() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);
  const [viewAllOpen, setViewAllOpen] = useState(false);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 360;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="specialty-departments"
      className="relative w-full bg-[#fcfcfc] text-neutral-900 py-16 sm:py-24 px-4 sm:px-8 lg:px-12 border-t border-neutral-200 overflow-hidden select-none"
      style={{ backgroundColor: "#fcfcfc" }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* ==================================================================
            HEADER ROW (Editorial serif title, clean subtext & view all button)
            ================================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-2xl">
            {/* Editorial Title */}
            <h2 className="font-sans font-light text-[40px] sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[82px] text-[#111111] leading-[1.04] tracking-[-0.035em]">
              Specialty <span className="text-[#008068] font-normal">Departments</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-600 font-sans leading-relaxed">
              A few of our specialty departments that are equipped for your special needs.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-end">
            {/* Horizontal Scroll Navigation Arrows */}
            <div className="hidden sm:flex items-center gap-2 mr-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                aria-label="Scroll left"
                className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 text-[#111111] flex items-center justify-center transition-all duration-200 active:scale-95 border border-neutral-200 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label="Scroll right"
                className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 text-[#111111] flex items-center justify-center transition-all duration-200 active:scale-95 border border-neutral-200 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* VIEW ALL DEPARTMENTS Button */}
            <button
              type="button"
              onClick={() => setViewAllOpen(true)}
              className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 rounded-full bg-[#111111] text-white hover:bg-neutral-800 font-sans text-xs sm:text-[13px] tracking-wider font-semibold uppercase transition-all duration-200 shadow-xs active:scale-95 group border border-[#111111] cursor-pointer"
            >
              <span>VIEW ALL DEPARTMENTS</span>
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">↗</span>
            </button>
          </div>
        </div>

        {/* ==================================================================
            HORIZONTAL CARDS CAROUSEL / ROW
            ================================================================== */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {DEPARTMENTS.map((dept) => (
            <div
              key={dept.id}
              onClick={() => setSelectedDept(dept)}
              className="group relative flex-shrink-0 w-[270px] sm:w-[310px] md:w-[330px] aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 snap-start border border-neutral-300/40 bg-neutral-900"
            >
              {/* Department Background Photograph */}
              <Image
                src={dept.image}
                alt={dept.name}
                fill
                sizes="(max-width: 640px) 270px, (max-width: 768px) 310px, 330px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Subtle top subtle shadow for contrast */}
              <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />

              {/* Department Category pill in top left */}
              <div className="absolute top-3.5 left-3.5 z-10">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider text-white/90 bg-black/40 backdrop-blur-md border border-white/20 uppercase">
                  {dept.category.split(" ")[0]}
                </span>
              </div>

              {/* Gradient Scrim for Bottom Readability */}
              <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

              {/* Bottom Translucent Frosted Glass Badge (Identical to Reference Image) */}
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <div className="bg-black/55 backdrop-blur-md border border-white/20 rounded-xl p-3 sm:p-3.5 text-white transition-all duration-300 group-hover:bg-black/75 group-hover:border-[#008068]/60 shadow-lg">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-sans font-semibold text-sm sm:text-base text-white tracking-tight leading-snug line-clamp-1">
                      {dept.badgeName}
                    </span>
                    <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0">
                      ↗
                    </span>
                  </div>

                  <p className="text-[11px] text-white/80 line-clamp-1 mt-1 font-sans font-normal">
                    {dept.tagline}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom indicator hint */}
        <div className="flex items-center justify-between mt-6 text-xs text-neutral-500 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#008068]" />
            <span>5 SPECIALTY DIVISIONS • ACCREDITED EXCELLENCE</span>
          </div>
          <span className="hidden sm:inline">DRAG OR SCROLL TO EXPLORE MORE →</span>
        </div>
      </div>

      {/* ==================================================================
          INTERACTIVE DEPARTMENT DETAIL MODAL
          ================================================================== */}
      {selectedDept && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedDept(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative w-full h-56 sm:h-64">
              <Image
                src={selectedDept.image}
                alt={selectedDept.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedDept(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur-md border border-white/20 hover:bg-black/75 transition-all cursor-pointer"
                aria-label="Close modal"
              >
                ✕
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#34d399] font-bold">
                  {selectedDept.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-sans font-light text-white mt-1 tracking-[-0.035em]">
                  {selectedDept.name}
                </h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-5">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#111111] font-bold mb-1">
                  Department Overview
                </h4>
                <p className="text-sm sm:text-base text-neutral-700 font-sans leading-relaxed">
                  {selectedDept.description}
                </p>
              </div>

              {/* Clinical Highlights */}
              <div className="p-4 rounded-2xl bg-[#fcfcfc] border border-neutral-200">
                <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-900 font-bold mb-2">
                  Specialized Infrastructure &amp; Capabilities
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-neutral-700 font-sans">
                  {selectedDept.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#008068] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Medical Leadership */}
              <div className="flex items-center justify-between text-xs text-neutral-600 border-t border-neutral-200 pt-4">
                <div>
                  <span className="block font-semibold text-neutral-900 font-sans">
                    {selectedDept.chiefDoctor}
                  </span>
                  <span className="font-mono text-[11px] text-[#008068] font-medium">
                    {selectedDept.stats}
                  </span>
                </div>

                <a
                  href="#contact"
                  onClick={() => setSelectedDept(null)}
                  className="px-5 py-2.5 rounded-xl bg-[#008068] text-white font-sans text-xs font-semibold hover:bg-[#006B57] transition-all shadow-sm"
                >
                  Book Consultation →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================
          "VIEW ALL DEPARTMENTS" FULL DIRECTORY MODAL
          ================================================================== */}
      {viewAllOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setViewAllOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 sm:p-8 bg-[#fcfcfc] border-b border-neutral-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#008068] font-bold">
                  Clinical Network Directory
                </span>
                <h3 className="text-2xl sm:text-3xl font-sans font-light text-[#111111] mt-1 tracking-[-0.035em]">
                  All Specialized Medical Departments
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setViewAllOpen(false)}
                className="w-10 h-10 rounded-full bg-neutral-200/80 text-neutral-700 flex items-center justify-center hover:bg-neutral-300 transition-all font-sans cursor-pointer"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* List */}
            <div className="p-6 sm:p-8 overflow-y-auto divide-y divide-neutral-200 space-y-6">
              {DEPARTMENTS.map((dept) => (
                <div key={dept.id} className="pt-6 first:pt-0 flex flex-col sm:flex-row gap-5 items-start">
                  <div className="relative w-full sm:w-44 h-32 rounded-xl overflow-hidden shrink-0 shadow-sm">
                    <Image src={dept.image} alt={dept.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono uppercase text-[#008068] font-bold tracking-wider">
                        {dept.category}
                      </span>
                      <span className="text-xs text-neutral-500 font-mono">{dept.stats}</span>
                    </div>
                    <h4 className="text-lg font-sans font-medium text-neutral-900 mt-0.5 tracking-tight">{dept.name}</h4>
                    <p className="text-xs sm:text-sm text-neutral-600 mt-1 font-sans leading-relaxed">
                      {dept.description}
                    </p>
                    <div className="mt-3 flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          setViewAllOpen(false);
                          setSelectedDept(dept);
                        }}
                        className="text-xs font-semibold text-[#008068] hover:underline cursor-pointer"
                      >
                        View Full Clinical Scope →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
