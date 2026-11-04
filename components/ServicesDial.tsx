"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import {
  Calendar,
  Stethoscope,
  Dna,
  Video,
  Activity,
  HeartPulse,
  ShieldCheck,
  Users,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { SERVICES } from "@/content/services";

const N = SERVICES.length;
const STEP_DEG = 22;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function calculateLayer(i: number, pos: number) {
  const d = i - pos; // <0 past, >0 upcoming
  const e = ease(clamp((Math.abs(d) - 0.3) / 0.4)); // hold until 0.3, gone at 0.7
  const s = Math.sign(d);
  return {
    copyY: s * e * 30, // vh
    copyOp: 1 - clamp(e / 0.6),
    imgScale: 1 - s * 0.03 * e,
    near: 1 - clamp(Math.abs(d)), // 1 = active, for dial styling
  };
}

// Media query subscriptions with useSyncExternalStore
function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function subscribeMobile(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia("(max-width: 767px)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getMobileSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px)").matches;
}

const getServerSnapshotFalse = () => false;

// Custom 24/7 Badge Icon helper matching reference image
function FeatureIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "calendar":
      return <Calendar className="w-5 h-5" />;
    case "clock24":
      return (
        <span className="flex items-center justify-center text-[10px] font-bold tracking-tight text-[#008068] border-[1.5px] border-[#008068] rounded-full w-6 h-6 leading-none">
          24/7
        </span>
      );
    case "stethoscope":
      return <Stethoscope className="w-5 h-5" />;
    case "dna":
      return <Dna className="w-5 h-5" />;
    case "video":
      return <Video className="w-5 h-5" />;
    case "activity":
      return <Activity className="w-5 h-5" />;
    case "heartPulse":
      return <HeartPulse className="w-5 h-5" />;
    case "shield":
      return <ShieldCheck className="w-5 h-5" />;
    default:
      return <Activity className="w-5 h-5" />;
  }
}

export default function ServicesDial() {
  const wrapperRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ringArcRef = useRef<HTMLDivElement>(null);
  const activeDotRef = useRef<HTMLDivElement>(null);
  const dialContainerRef = useRef<HTMLDivElement>(null);

  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const mobileBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerSnapshotFalse
  );

  const isMobile = useSyncExternalStore(
    subscribeMobile,
    getMobileSnapshot,
    getServerSnapshotFalse
  );

  // Smooth-scroll click handler for dial buttons & stepper arrows
  const handleDialClick = (stepIndex: number) => {
    if (!wrapperRef.current || !stageRef.current) return;
    const wrapRect = wrapperRef.current.getBoundingClientRect();
    const wrapperAbsoluteTop = window.scrollY + wrapRect.top;
    const run = wrapperRef.current.offsetHeight - stageRef.current.offsetHeight;

    const targetP = (stepIndex / (N - 1)) * 0.94;
    const targetScrollY = wrapperAbsoluteTop + targetP * run;

    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: unknown) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(targetScrollY, { duration: 1.2 });
    } else {
      window.scrollTo({
        top: targetScrollY,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (prefersReducedMotion) return;

    let rafId = 0;
    let target = 0;
    let display = 0;

    const updateGeometry = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const mob = w < 768;

      if (mob) return;

      const isTablet = w >= 768 && w <= 1100;
      // Arc radius & center: positioned so the green disc fills the left edge, and the numbers & beacon sit along the edge
      const radius = isTablet ? h * 0.7 : h * 0.76;
      const centerX = isTablet ? -w * 0.22 : -w * 0.24;
      const centerY = h * 0.5;

      if (ringArcRef.current) {
        ringArcRef.current.style.left = `${centerX}px`;
        ringArcRef.current.style.top = `${centerY}px`;
        ringArcRef.current.style.width = `${radius * 2}px`;
        ringArcRef.current.style.height = `${radius * 2}px`;
        ringArcRef.current.style.transform = `translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.left = `${centerX}px`;
        ringRef.current.style.top = `${centerY}px`;
      }

      if (activeDotRef.current) {
        activeDotRef.current.style.left = `${centerX + radius}px`;
        activeDotRef.current.style.top = `${centerY}px`;
        activeDotRef.current.style.transform = `translate(-50%, -50%)`;
      }

      buttonRefs.current.forEach((btn, i) => {
        if (!btn) return;
        const angle = i * STEP_DEG;
        btn.style.transform = `rotate(${angle}deg) translateX(${radius + 32}px) translateY(-50%)`;
      });
    };

    const applyLayers = (pos: number) => {
      const curActive = clamp(Math.round(pos), 0, N - 1);
      const mob = window.innerWidth < 768;

      if (ringRef.current && !mob) {
        ringRef.current.style.transform = `rotate(${-pos * STEP_DEG}deg)`;
      }

      for (let i = 0; i < N; i++) {
        const l = calculateLayer(i, pos);

        const imgEl = imgRefs.current[i];
        if (imgEl) {
          imgEl.style.opacity = String(l.copyOp);
          imgEl.style.transform = `scale(${l.imgScale})`;
          imgEl.style.visibility = l.copyOp > 0.01 ? "visible" : "hidden";
        }

        const btn = buttonRefs.current[i];
        if (btn && !mob) {
          const isNear = l.near > 0.5;
          btn.style.opacity = String(0.4 + l.near * 0.6);
          btn.style.fontSize = `${30 + l.near * 14}px`;
          btn.style.fontWeight = isNear ? "700" : "500";
          btn.style.color = isNear ? "#008068" : "#94A3B8";
        }

        const mobBtn = mobileBtnRefs.current[i];
        if (mobBtn && mob) {
          mobBtn.style.opacity = String(0.4 + l.near * 0.6);
        }
      }

      setActiveStepIndex((prev) => (prev !== curActive ? curActive : prev));
    };

    const tick = () => {
      display += (target - display) * 0.12;
      applyLayers(display);

      if (Math.abs(target - display) > 0.0005) {
        rafId = requestAnimationFrame(tick);
      } else {
        display = target;
        applyLayers(display);
        rafId = 0;
      }
    };

    const measure = () => {
      if (!wrapperRef.current || !stageRef.current) return;
      const wrap = wrapperRef.current;
      const stage = stageRef.current;

      const r = wrap.getBoundingClientRect();
      const run = wrap.offsetHeight - stage.offsetHeight;
      if (run <= 0) return;

      const p = clamp(-r.top / run);
      const enter = clamp(1 - r.top / window.innerHeight);

      if (dialContainerRef.current) {
        dialContainerRef.current.style.opacity = String(clamp(enter));
      }

      target = clamp(p / 0.94) * (N - 1) - (1 - enter);

      if (!rafId) {
        rafId = requestAnimationFrame(tick);
      }
    };

    updateGeometry();
    measure();

    const onScroll = () => measure();
    const onResize = () => {
      updateGeometry();
      measure();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion]);

  const activeService = SERVICES[activeStepIndex] || SERVICES[0];

  return (
    <section
      ref={wrapperRef}
      className="services-runway relative w-full select-none"
      style={{ height: "calc(100svh * 5)" }}
      aria-label="Women and family healthcare pathways"
    >
      {/* Pinned 100vh Stage with Crisp Light Theme matching Specialism Showcase */}
      <div
        ref={stageRef}
        className="stage sticky top-0 w-full h-[100svh] overflow-hidden bg-[#fcfcfc] flex items-center justify-between"
      >
        {/* ====================================================================
            LEFT ZONE: HERO GREEN ROTATING DISC DIAL & CENTER POINTS (Reference Mockup)
            ==================================================================== */}
        <div className="relative w-full md:w-[48vw] lg:w-[45vw] h-full flex items-center justify-center lg:justify-end pr-4 sm:pr-8 lg:pr-12 pointer-events-none z-20">
          
          {/* DIAL INSTRUMENT: Solid Green Disc, Glowing Beacon & Step Numbers */}
          <div
            ref={dialContainerRef}
            className="dial absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
            aria-hidden={isMobile}
          >
            {/* Large Solid Green Disc on Far Left matching Hero Green */}
            <div
              ref={ringArcRef}
              className="absolute rounded-full bg-gradient-to-br from-[#008068] via-[#006B57] to-[#004D3F] shadow-[0_0_60px_rgba(0,128,104,0.35)] pointer-events-none z-10 border border-emerald-400/25"
              aria-hidden="true"
            />

            {/* Glowing Green Active Beacon at Peak of Arc */}
            <div
              ref={activeDotRef}
              className="absolute w-5 h-5 rounded-full pointer-events-none z-30 bg-white ring-4 ring-[#008068]/30 border-2 border-emerald-400 shadow-[0_0_18px_#10b981] transition-all duration-200"
              aria-hidden="true"
            />

            {/* Rotating Numbers (01, 02, 03, 04) along Outer Boundary */}
            <div ref={ringRef} className="absolute w-0 h-0 pointer-events-none z-30">
              {SERVICES.map((step, i) => (
                <button
                  key={step.id}
                  ref={(el) => {
                    buttonRefs.current[i] = el;
                  }}
                  type="button"
                  onClick={() => handleDialClick(i)}
                  aria-label={`Go to ${step.title}`}
                  aria-current={activeStepIndex === i ? "step" : undefined}
                  className="absolute left-0 top-0 origin-top-left pointer-events-auto cursor-pointer bg-transparent border-0 select-none px-3 py-1 font-sans transition-all duration-200 hover:!opacity-80 focus-visible:outline-none whitespace-nowrap"
                >
                  {step.stepNumber}
                </button>
              ))}
            </div>

            {/* Mobile Step Indicator Pills (< 768px) */}
            <div
              className="md:hidden absolute top-4 inset-x-0 flex items-center justify-center z-40 pointer-events-auto px-4"
              aria-label="Step indicator"
            >
              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-neutral-200 shadow-md">
                {SERVICES.map((step, i) => {
                  const isActive = activeStepIndex === i;
                  return (
                    <button
                      key={step.id}
                      ref={(el) => {
                        mobileBtnRefs.current[i] = el;
                      }}
                      type="button"
                      onClick={() => handleDialClick(i)}
                      aria-label={`Go to ${step.title}`}
                      className={`flex items-center gap-1.5 text-sm font-sans ${
                        isActive ? "text-[#008068] font-bold" : "text-neutral-400"
                      }`}
                    >
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-[#008068]" />
                      )}
                      <span>{step.stepNumber}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* CENTER-LEFT CONTENT BLOCK (Clearing the arc, aligned with reference image) */}
          <div className="relative z-20 max-w-[340px] sm:max-w-[370px] pointer-events-auto text-left py-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50/90 border border-emerald-200/60 shadow-2xs mb-4">
              <span className="w-2 h-2 rounded-full bg-[#008068]" />
              <span className="text-xs font-semibold text-neutral-800">
                Women &amp; Family Care
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="font-sans font-light text-3xl sm:text-4xl lg:text-[42px] text-[#111111] leading-[1.08] tracking-[-0.035em] mb-6">
              Healthcare for<br />
              <span className="text-[#008068] font-normal">women &amp; families.</span>
            </h2>

            {/* Three Stacked Key Feature Points with Rounded Icon Badges */}
            <div className="flex flex-col gap-3 mb-8 max-w-[320px]">
              <div className="flex items-center gap-3.5 p-1.5 rounded-xl transition-colors hover:bg-emerald-50/40">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-[#008068] shrink-0">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <span className="font-sans font-bold text-neutral-900 text-sm sm:text-[15px] tracking-tight">
                  End-to-end care
                </span>
              </div>

              <div className="flex items-center gap-3.5 p-1.5 rounded-xl transition-colors hover:bg-emerald-50/40">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-[#008068] shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <span className="font-sans font-bold text-neutral-900 text-sm sm:text-[15px] tracking-tight">
                  Family-focused support
                </span>
              </div>

              <div className="flex items-center gap-3.5 p-1.5 rounded-xl transition-colors hover:bg-emerald-50/40">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-[#008068] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="font-sans font-bold text-neutral-900 text-sm sm:text-[15px] tracking-tight">
                  Trusted care team
                </span>
              </div>
            </div>

            {/* Bottom Stepper & Circular Arrow Navigation Row */}
            <div className="flex items-center gap-4 pt-4 border-t border-neutral-200/70 max-w-[320px]">
              {/* Step counter */}
              <div className="text-xs sm:text-sm font-semibold text-neutral-900 font-mono tracking-wider">
                0{activeStepIndex + 1} <span className="text-neutral-400 font-normal">/ 04</span>
              </div>

              {/* 4 Segmented Stepper Bars */}
              <div className="flex items-center gap-1.5 flex-1">
                {SERVICES.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      activeStepIndex === idx ? "w-6 bg-[#008068]" : "w-3 bg-neutral-200"
                    }`}
                  />
                ))}
              </div>

              {/* Prev / Next circular arrow buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleDialClick(Math.max(0, activeStepIndex - 1))}
                  disabled={activeStepIndex === 0}
                  className="w-8 h-8 rounded-full border border-neutral-300/80 bg-white flex items-center justify-center text-neutral-700 hover:text-[#008068] hover:border-[#008068] disabled:opacity-30 disabled:pointer-events-none transition-all shadow-2xs cursor-pointer"
                  aria-label="Previous milestone"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDialClick(Math.min(N - 1, activeStepIndex + 1))}
                  disabled={activeStepIndex === N - 1}
                  className="w-8 h-8 rounded-full bg-[#008068] hover:bg-[#006B57] text-white flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm cursor-pointer"
                  aria-label="Next milestone"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================================
            RIGHT ZONE: ROUNDED PHOTOGRAPH + TITLE + 2 FEATURE CARDS + CTA (Reference Mockup)
            ==================================================================== */}
        <div className="service-visual w-full md:w-[52vw] lg:w-[55vw] h-full pointer-events-auto z-20 flex flex-col justify-center p-6 sm:p-8 lg:p-12 xl:p-14 overflow-hidden">
          
          <div className="max-w-[620px] w-full flex flex-col justify-between">
            {/* TOP: Rounded Expanded Photograph with Floating Milestone Pill */}
            <div className="relative w-full h-[42vh] sm:h-[46vh] lg:h-[48vh] rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-sm border border-neutral-200/80 bg-neutral-100 shrink-0">
              {SERVICES.map((step, i) => (
                <div
                  key={step.id}
                  ref={(el) => {
                    imgRefs.current[i] = el;
                  }}
                  className="absolute inset-0 w-full h-full will-change-[transform,opacity]"
                >
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    priority={i === 0}
                    loading={i <= 1 ? "eager" : "lazy"}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                    style={{
                      objectPosition: step.objectPosition || "center 22%",
                    }}
                  />
                  
                  {/* Floating Milestone Badge in Top-Left Corner */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-neutral-800 text-xs font-semibold border border-neutral-200/80 shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-[#008068]" />
                      <span>Milestone {step.stepNumber}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* DYNAMIC CONTENT CONTAINER (Transitions smoothly on milestone change) */}
            <div
              key={activeService.id}
              className="w-full flex flex-col justify-between pt-5 animate-in fade-in duration-200"
            >
              {/* Milestone Title */}
              <h3 className="font-sans font-bold text-2xl sm:text-3xl lg:text-[32px] text-[#111111] tracking-tight mb-4">
                {activeService.title}
              </h3>

              {/* TWO HORIZONTAL FEATURE CARDS SIDE BY SIDE (Reference Mockup) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-5">
                {activeService.featureCards.map((card, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 sm:p-4 rounded-2xl bg-[#f0fdf4] border border-emerald-100/80 flex items-center gap-3.5 shadow-2xs"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white border border-emerald-200/60 flex items-center justify-center text-[#008068] shrink-0 shadow-2xs">
                      <FeatureIcon icon={card.icon} />
                    </div>
                    <span className="font-sans font-bold text-neutral-900 text-xs sm:text-sm tracking-tight leading-snug">
                      {card.title}
                    </span>
                  </div>
                ))}
              </div>

              {/* BOTTOM ROW: Tags on Left, CTA Button on Right */}
              <div className="flex items-center justify-between gap-4">
                {/* Pill Tags */}
                <div className="flex flex-wrap items-center gap-2">
                  {activeService.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3.5 py-1.5 rounded-full text-xs font-medium text-neutral-700 bg-emerald-50/80 border border-emerald-100/60 shadow-2xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA Action Button */}
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#008068] hover:bg-[#006B57] text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm shrink-0 cursor-pointer"
                >
                  <span>Book pathway</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
