"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
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

  // Smooth-scroll click handler for dial buttons
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
      // Arc radius & center: positioned so the crest and numbers are centered in the left 50% column
      const radius = isTablet ? h * 0.65 : h * 0.72;
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
        btn.style.transform = `rotate(${angle}deg) translateX(${radius + 28}px) translateY(-50%)`;
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
          btn.style.fontSize = `${32 + l.near * 16}px`;
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
      {/* Sticky 100vh Stage */}
      <div
        ref={stageRef}
        className="stage sticky top-0 w-full h-[100svh] overflow-hidden bg-white"
      >
        {/* ====================================================================
            LEFT ZONE: ROTATING ARC DIAL FEATURE IN BOLD EMERALD GREEN
            ==================================================================== */}
        <div className="absolute left-0 top-0 w-full md:w-[50vw] h-full pointer-events-none z-20 overflow-hidden">
          
          {/* Header positioned in the open center-right space of the left column (clearing the arc) */}
          <div className="absolute top-8 sm:top-12 right-4 sm:right-6 lg:right-8 max-w-[320px] sm:max-w-[360px] pointer-events-auto text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50/90 border border-[#008068]/20 text-[#008068] text-[11px] sm:text-xs font-semibold tracking-wider uppercase mb-2.5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#008068] animate-pulse" />
              <span>Women &amp; Family Care Pathways</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-[2.2rem] text-slate-900 font-normal tracking-tight leading-[1.12]">
              Healthcare designed for
              <br />
              women &amp; families.
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm font-light mt-2 max-w-xs leading-relaxed">
              Scroll down to rotate through each milestone of care.
            </p>
          </div>
        </div>

        {/* DIAL INSTRUMENT (Semi-Circle Arc with Bold Green Line & Rotating Numbers) */}
        <div
          ref={dialContainerRef}
          className="dial absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
          aria-hidden={isMobile}
        >
          {/* Bold Green Semi-Circle Arc Line (Bold & clearly visible) */}
          <div
            ref={ringArcRef}
            className="absolute rounded-full border-[3px] border-[#008068] shadow-[0_0_20px_rgba(0,128,104,0.3)] pointer-events-none z-20"
            aria-hidden="true"
          />

          {/* Active Dot with Radiant Glow at Peak of Arc */}
          <div
            ref={activeDotRef}
            className="absolute w-4 h-4 rounded-full pointer-events-none z-30 bg-[#008068] ring-4 ring-[#008068]/25 shadow-[0_0_15px_#008068] transition-all duration-200"
            aria-hidden="true"
          />

          {/* Rotating Ring Holding Step Numbers (01, 02, 03, 04) */}
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
                className="absolute left-0 top-0 origin-top-left pointer-events-auto cursor-pointer bg-transparent border-0 select-none px-3 py-1 font-serif transition-all duration-200 hover:!opacity-80 focus-visible:outline-none whitespace-nowrap"
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
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-[#008068]/30 shadow-md">
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
                    className={`flex items-center gap-1.5 text-sm font-serif ${
                      isActive ? "text-[#008068] font-bold" : "text-slate-400"
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

        {/* ====================================================================
            RIGHT ZONE: STRAIGHT, FULL-EXPANDED PHOTOGRAPH WITH HOVER CONTENT REVEAL
            ==================================================================== */}
        <div className="service-visual absolute inset-x-0 top-0 h-[48svh] md:inset-x-auto md:right-0 md:top-0 md:w-[50vw] md:h-full pointer-events-auto z-20 overflow-hidden bg-slate-900 border-l border-slate-200/80 group cursor-pointer">
          {/* Expanded Photographic Images (Cross-fading with Scroll) */}
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
                loading={i === 0 ? "eager" : i === 1 ? "eager" : "lazy"}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full h-full object-cover rounded-none transition-transform duration-700 group-hover:scale-105"
                style={{
                  objectPosition: step.objectPosition || "center 35%",
                }}
              />
            </div>
          ))}

          {/* RESTING STATE: Floating Capsule Button at Bottom */}
          <div className="absolute bottom-8 left-8 right-8 z-30 flex items-center justify-between pointer-events-none transition-opacity duration-300 group-hover:opacity-0">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/95 backdrop-blur-md border border-white/50 shadow-xl text-slate-900 text-xs sm:text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-[#008068] animate-pulse" />
              <span className="font-semibold text-[#008068]">
                {activeService.stepNumber}
              </span>
              <span className="font-medium text-slate-800">{activeService.title}</span>
              <span className="text-slate-300 font-light hidden sm:inline">|</span>
              <span className="text-slate-500 font-light hidden sm:inline">
                Hover to view care details ↗
              </span>
            </div>
          </div>

          {/* HOVER REVEAL: Rich Emerald Green Overlay with Full Title, Content & Tags */}
          <div className="absolute inset-0 z-40 bg-gradient-to-t from-[#004D3F]/98 via-[#006B57]/95 to-[#008068]/92 backdrop-blur-md p-8 sm:p-12 lg:p-16 flex flex-col justify-between text-white opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-auto">
            {/* Top Content Block */}
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-200 font-semibold mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                <span>Free, covered by Lifecare employer or health plan</span>
              </div>
              <span className="font-serif text-3xl sm:text-4xl text-emerald-200/80 font-normal mb-2 block">
                {activeService.stepNumber}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal leading-tight tracking-tight mb-4">
                {activeService.title}
              </h3>
              <p className="text-white/90 text-sm sm:text-base lg:text-lg font-light leading-relaxed max-w-lg mb-6">
                {activeService.description}
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {activeService.tags.map((tag) => (
                  <span
                    key={tag}
                    className="h-9 px-4 inline-flex items-center rounded-full text-xs sm:text-sm text-white font-medium bg-white/15 border border-white/25 shadow-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Content / Action Button */}
            <div className="pt-6 border-t border-white/20 flex items-center justify-between">
              <span className="text-xs text-emerald-200 font-light">
                Specialist Clinical Continuum · LifeCare
              </span>
              <button
                type="button"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-[#008068] hover:bg-emerald-50 text-sm font-semibold transition-colors shadow-md"
              >
                <span>Explore clinical program</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
