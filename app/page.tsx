"use client";

import CareArcFlow from "@/components/CareArcFlow";
import ClinicalIntro from "@/components/ClinicalIntro";
import TreatmentGallery from "@/components/TreatmentGallery";
import SpecialismShowcase from "@/components/SpecialismShowcase";
import FamilyCareAccordion from "@/components/FamilyCareAccordion";
import ClinicalEditorialStory from "@/components/ClinicalEditorialStory";
import SpecialtyDepartments from "@/components/SpecialtyDepartments";
import HealthReadsSection from "@/components/HealthReadsSection";
import RecoveryConnectionSequence from "@/components/RecoveryConnectionSequence";
import ClinicalJournalSection from "@/components/ClinicalJournalSection";
import EditorialTestimonialsSection from "@/components/EditorialTestimonialsSection";
import EditorialFooter from "@/components/EditorialFooter";

import FlowingHero from "@/components/hero/FlowingHero";
import HealthcareMarquee from "@/components/HealthcareMarquee";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-arch-grid">
      <main className="w-full relative">
        <FlowingHero />
        <HealthcareMarquee />
        <CareArcFlow />
        <ClinicalIntro />
        <TreatmentGallery />
        <SpecialismShowcase />
        <FamilyCareAccordion />
        <ClinicalEditorialStory />
        <SpecialtyDepartments />
        <HealthReadsSection />
        <RecoveryConnectionSequence />
        <ClinicalJournalSection />
        <EditorialTestimonialsSection />
        <EditorialFooter />
      </main>
    </div>
  );
}

