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
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { SERVICES } from "@/content/services";

const N = SERVICES.length;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function calculateLayer(i: number, pos: number) {
  const d = i - pos;
  const e = ease(clamp((Math.abs(d) - 0.3) / 0.4));
  const s = Math.sign(d);
  return {
    copyOp: 1 - clamp(e / 0.6),
    imgScale: 1 - s * 0.03 * e,
    near: 1 - clamp(Math.abs(d)),
  };
}

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

const getServerSnapshotFalse = () => false;

function FeatureIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "calendar":
      return <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#E8682A]" />;
    case "clock24":
      return (
        <span className="flex items-center justify-center text-[10px] font-bold tracking-tight text-[#E8682A] border-[1.5px] border-[#E8682A] rounded-full w-5 h-5 leading-none">
          24/7
        </span>
      );
    case "stethoscope":
      return <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 text-[#E8682A]" />;
    case "dna":
      return <Dna className="w-4 h-4 sm:w-5 sm:h-5 text-[#E8682A]" />;
    case "video":
      return <Video className="w-4 h-4 sm:w-5 sm:h-5 text-[#E8682A]" />;
    case "activity":
      return <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-[#E8682A]" />;
    case "heartPulse":
      return <HeartPulse className="w-4 h-4 sm:w-5 sm:h-5 text-[#E8682A]" />;
    case "shield":
      return <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#E8682A]" />;
    default:
      return <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-[#E8682A]" />;
  }
}

// Cardinal angles for clock numerals (12 o'clock, 3 o'clock, 6 o'clock, 9 o'clock)
const STEP_ANGLES = [0, 90, 180, 270];

export default function ServicesDial() {
  const wrapperRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const primaryHandRef = useRef<HTMLDivElement>(null);
  const secondHandRef = useRef<HTMLDivElement>(null);

  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerSnapshotFalse
  );

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

    const applyLayers = (pos: number) => {
      const curActive = clamp(Math.round(pos), 0, N - 1);

      // Smooth clock hands rotation based on scroll position
      const targetDeg = pos * 90;
      if (primaryHandRef.current) {
        primaryHandRef.current.style.transform = `rotate(${targetDeg}deg)`;
      }
      if (secondHandRef.current) {
        secondHandRef.current.style.transform = `rotate(${targetDeg + pos * 180}deg)`;
      }

      for (let i = 0; i < N; i++) {
        const l = calculateLayer(i, pos);
        const imgEl = imgRefs.current[i];
        if (imgEl) {
          imgEl.style.opacity = String(l.copyOp);
          imgEl.style.transform = `scale(${l.imgScale})`;
          imgEl.style.visibility = l.copyOp > 0.01 ? "visible" : "hidden";
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

      target = clamp(p / 0.94) * (N - 1) - (1 - enter);

      if (!rafId) {
        rafId = requestAnimationFrame(tick);
      }
    };

    measure();

    const onScroll = () => measure();
    const onResize = () => measure();

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
      aria-label="Women and family healthcare pathways">
      {/* 2-COLUMN GRID STAGE PINNED 100vh */}
      <div
        ref={stageRef}
        className="stage sticky top-0 w-full h-[100svh] overflow-hidden bg-white grid grid-cols-1 lg:grid-cols-2">
        
        {/* ====================================================================
            COLUMN 1 (LEFT): LARGE LEFT-ALIGNED CLOCK + MILESTONE STEPPER
            (Personalized pathways title & center text removed as requested)
            ==================================================================== */}
        <div className="w-full h-full flex flex-col justify-center items-center lg:items-start pl-6 sm:pl-10 md:pl-14 lg:pl-16 xl:pl-20 pr-6 py-8 bg-white z-10 border-r border-[#1F2123]/10">
          <div className="flex flex-col items-center lg:items-start">
            
            {/* LARGE LIFESTYLE CLOCK TIMEPIECE */}
            <div className="relative shrink-0 flex items-center justify-center mb-6 sm:mb-8">
              <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[380px] md:h-[380px] lg:w-[410px] lg:h-[410px] xl:w-[450px] xl:h-[450px] rounded-full bg-gradient-to-br from-white via-[#F9FAFB] to-[#ECEFF2] border-2 border-[#1F2123]/15 shadow-[0_20px_50px_rgba(31,33,35,0.08),inset_0_2px_4px_rgba(255,255,255,0.95)] flex items-center justify-center p-3 sm:p-4">
                
                {/* Outer Chapter Ring with Minute / Hour Tick Marks */}
                <div className="absolute inset-2 sm:inset-3 rounded-full border border-[#1F2123]/10 pointer-events-none">
                  {Array.from({ length: 12 }).map((_, idx) => {
                    const deg = idx * 30;
                    const isCardinal = deg % 90 === 0;
                    return (
                      <div
                        key={idx}
                        className="absolute top-0 left-1/2 -translate-x-1/2 origin-bottom h-1/2 flex flex-col justify-start pointer-events-none"
                        style={{ transform: `rotate(${deg}deg)` }}>
                        <div
                          className={`rounded-full ${
                            isCardinal
                              ? "w-1 h-3.5 bg-[#1F2123]/70"
                              : "w-0.5 h-1.5 bg-[#1F2123]/25"
                          }`}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Inner Track Ring */}
                <div className="relative w-full h-full rounded-full border border-dashed border-[#1F2123]/15 flex items-center justify-center bg-white/70 backdrop-blur-[2px]">
                  
                  {/* INWARD STEP NUMERALS (01, 02, 03, 04) */}
                  {SERVICES.map((step, i) => {
                    const angle = STEP_ANGLES[i];
                    const isActive = activeStepIndex === i;
                    const rad = (angle - 90) * (Math.PI / 180);
                    const radiusPercent = 38;
                    const x = 50 + radiusPercent * Math.cos(rad);
                    const y = 50 + radiusPercent * Math.sin(rad);

                    return (
                      <button
                        key={step.id}
                        type="button"
                        onClick={() => handleDialClick(i)}
                        aria-label={`Go to step ${step.stepNumber}: ${step.title}`}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-300 font-body cursor-pointer flex flex-col items-center justify-center rounded-full ${
                          isActive
                            ? "text-[#E8682A] font-bold scale-110"
                            : "text-[#1F2123]/40 font-medium hover:text-[#1F2123] hover:scale-105"
                        }`}
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                        }}>
                        <span className="text-sm sm:text-base tracking-wider leading-none">
                          {step.stepNumber}
                        </span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E8682A] mt-1 shadow-[0_0_8px_rgba(232,104,42,0.8)]" />
                        )}
                      </button>
                    );
                  })}

                  {/* Pinion Jewel */}
                  <div className="absolute z-20 w-5 h-5 rounded-full bg-[#1F2123] border-2 border-white shadow-md flex items-center justify-center pointer-events-none">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E8682A]" />
                  </div>

                  {/* Primary Hand */}
                  <div
                    ref={primaryHandRef}
                    className="absolute inset-0 pointer-events-none flex items-center justify-center will-change-transform transition-transform duration-100 ease-out z-10">
                    <div
                      className="w-1.5 sm:w-2 bg-[#1F2123] rounded-t-full shadow-md"
                      style={{
                        height: "36%",
                        transform: "translateY(-50%)",
                        transformOrigin: "bottom center",
                      }}
                    />
                  </div>

                  {/* Secondary Needle (Orange Accent Hand) */}
                  <div
                    ref={secondHandRef}
                    className="absolute inset-0 pointer-events-none flex items-center justify-center will-change-transform transition-transform duration-75 ease-out z-15">
                    <div
                      className="w-0.5 sm:w-1 bg-[#E8682A] rounded-full shadow-[0_0_6px_rgba(232,104,42,0.5)]"
                      style={{
                        height: "44%",
                        transform: "translateY(-40%)",
                        transformOrigin: "center 75%",
                      }}
                    />
                    <div
                      className="absolute w-2 h-2 rounded-full bg-[#E8682A]"
                      style={{
                        transform: "translateY(22px)",
                      }}
                    />
                  </div>

                  {/* Brand Dial Label */}
                  <div className="absolute top-[28%] text-[10px] sm:text-[11px] font-body uppercase tracking-[0.2em] text-[#1F2123]/35 font-semibold pointer-events-none">
                    Mendly
                  </div>
                </div>
              </div>
            </div>

            {/* MILESTONE STEPPER ROW ALIGNED WITH CLOCK */}
            <div className="flex items-center gap-4 sm:gap-5 w-full max-w-[340px] justify-between">
              <div className="font-body font-bold text-xl sm:text-2xl text-[#1F2123] tracking-wide">
                <span>0{activeStepIndex + 1}</span>
                <span className="text-[#1F2123]/40 font-normal text-sm sm:text-base"> / 04</span>
              </div>

              {/* Progress bars */}
              <div className="flex items-center gap-2">
                {SERVICES.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleDialClick(idx)}
                    aria-label={`Jump to milestone ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeStepIndex === idx
                        ? "w-8 bg-[#E8682A]"
                        : "w-3 bg-[#1F2123]/15 hover:bg-[#1F2123]/30"
                    }`}
                  />
                ))}
              </div>

              {/* Prev / Next buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleDialClick(Math.max(0, activeStepIndex - 1))}
                  disabled={activeStepIndex === 0}
                  className="w-9 h-9 rounded-full border border-[#1F2123]/15 bg-white flex items-center justify-center text-[#1F2123]/80 hover:text-[#E8682A] hover:border-[#E8682A] disabled:opacity-25 disabled:pointer-events-none transition-all shadow-2xs cursor-pointer"
                  aria-label="Previous milestone">
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDialClick(Math.min(N - 1, activeStepIndex + 1))}
                  disabled={activeStepIndex === N - 1}
                  className="w-9 h-9 rounded-full bg-[#E8682A] hover:bg-[#D4591F] text-white flex items-center justify-center disabled:opacity-25 disabled:pointer-events-none transition-all shadow-sm cursor-pointer"
                  aria-label="Next milestone">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* ====================================================================
            COLUMN 2 (RIGHT): FULL-BLEED EXPANDED IMAGE (TOP TO BOTTOM)
            ZERO WHITE BG - TEXTS OVERLAID AT THE BOTTOM IN CRISP WHITE
            ==================================================================== */}
        <div className="relative w-full h-full min-h-[100svh] overflow-hidden bg-neutral-900">
          
          {/* Expanded Full-Bleed Images (Layered with Transitions) */}
          {SERVICES.map((step, i) => (
            <div
              key={step.id}
              ref={(el) => {
                imgRefs.current[i] = el;
              }}
              className="absolute inset-0 w-full h-full will-change-[transform,opacity]">
              <Image
                src={step.image}
                alt={step.alt}
                fill
                priority={i === 0}
                loading={i <= 1 ? "eager" : "lazy"}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full h-full object-cover transition-transform duration-700 ease-out"
                style={{
                  objectPosition: step.objectPosition || "center 25%",
                }}
              />
            </div>
          ))}

          {/* Floating Milestone Badge in Top-Left Corner */}
          <div className="absolute top-6 left-6 z-20">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white font-body text-xs font-semibold border border-white/20 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#E8682A]" />
              <span className="text-white !text-white" style={{ color: "#FFFFFF" }}>Milestone {activeService.stepNumber}</span>
            </span>
          </div>

          {/* BOTTOM OVERLAY CONTAINER WITH GRADIENT SCRIM & WHITE TEXT */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-6 sm:p-8 lg:p-10 xl:p-12 z-20 flex flex-col justify-end">
            <div
              key={activeService.id}
              className="w-full max-w-xl animate-in fade-in duration-200">
              
              {/* Milestone Title in Pure White with Refined Font & Size */}
              <h2
                className="font-body font-medium text-xl sm:text-2xl md:text-3xl text-white !text-white tracking-tight leading-tight mb-3 drop-shadow-md"
                style={{ color: "#FFFFFF" }}>
                {activeService.title}
              </h2>

              {/* TWO HORIZONTAL FEATURE CARDS: FROSTED GLASS & WHITE TEXT */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                {activeService.featureCards.map((card, idx) => (
                  <div
                    key={idx}
                    className="p-3 sm:p-3.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/20 flex items-center gap-3 shadow-lg">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                      <FeatureIcon icon={card.icon} />
                    </div>
                    <span
                      className="font-body font-medium text-white !text-white text-xs sm:text-[13px] tracking-tight leading-snug drop-shadow-sm"
                      style={{ color: "#FFFFFF" }}>
                      {card.title}
                    </span>
                  </div>
                ))}
              </div>

              {/* BOTTOM ROW: Tags on Left, CTA Button on Right */}
              <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 pt-1">
                {/* Pill Tags with Frosted Border */}
                <div className="flex flex-wrap items-center gap-2">
                  {activeService.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium text-white/95 !text-white font-body bg-black/40 backdrop-blur-md border border-white/20 shadow-sm"
                      style={{ color: "#FFFFFF" }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA Action Button */}
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#E8682A] hover:bg-[#D4591F] text-white text-xs sm:text-sm font-semibold font-body transition-colors shadow-lg shrink-0 cursor-pointer">
                  <span>Book pathway</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
