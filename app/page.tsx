"use client";

import dynamic from "next/dynamic";
import JourneyFlow from "@/components/journey/JourneyFlow";
import SpecialismShowcase from "@/components/SpecialismShowcase";
import FamilyCareAccordion from "@/components/FamilyCareAccordion";
import SpecialtyDepartments from "@/components/SpecialtyDepartments";
import HealthReadsSection from "@/components/HealthReadsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

const LifeCareHero = dynamic(() => import("@/components/hero/LifeCareHero"), {
  ssr: false,
});

const CalmDrawingSection = dynamic(() => import("@/components/CalmDrawingSection"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-arch-grid">
      <main className="flex-1 flex flex-col">
        <LifeCareHero />
        <JourneyFlow />
        <CalmDrawingSection />
        <SpecialismShowcase />
        <FamilyCareAccordion />
        <SpecialtyDepartments />
        <HealthReadsSection />
        <TestimonialsSection />
        <Footer />
      </main>
    </div>
  );
}
