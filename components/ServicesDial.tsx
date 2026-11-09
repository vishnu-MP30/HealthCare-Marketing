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
  ChevronDown,
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
      return <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF6A13]" />;
    case "clock24":
      return (
        <span className="flex items-center justify-center text-[10px] font-bold tracking-tight text-[#FF6A13] border-[1.5px] border-[#FF6A13] rounded-full w-5 h-5 leading-none">
          24/7
        </span>
      );
    case "stethoscope":
      return <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF6A13]" />;
    case "dna":
      return <Dna className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF6A13]" />;
    case "video":
      return <Video className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF6A13]" />;
    case "activity":
      return <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF6A13]" />;
    case "heartPulse":
      return <HeartPulse className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF6A13]" />;
    case "shield":
      return <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF6A13]" />;
    default:
      return <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF6A13]" />;
  }
}

// 4-STEP DIAL DATA
interface DialStep {
  number: string;
  label: string;
  image: string;
  alt: string;
}

const STEPS: DialStep[] = [
  {
    number: "01",
    label: "FERTILITY",
    image: "/dial/silhouette-fertility.png",
    alt: "Fertility care silhouette of mother and child",
  },
  {
    number: "02",
    label: "MATERNITY",
    image: "/dial/silhouette-maternity.png",
    alt: "Maternity and newborn care silhouette",
  },
  {
    number: "03",
    label: "PEDIATRICS",
    image: "/dial/silhouette-pediatrics.png",
    alt: "Pediatric care silhouette of parent and child",
  },
  {
    number: "04",
    label: "MIDLIFE",
    image: "/dial/silhouette-midlife.png",
    alt: "Midlife health and longevity silhouette of couple",
  },
];

const DEFAULT_IMAGE = "/dial/silhouette-mother-baby.png";

// Numeral anchor definitions inside SVG 1000x1000 (R = 340)
const NUMERAL_CONFIGS = [
  { index: 0, num: "01", x: 500, y: 155, dotX: 500, dotY: 198, label: "01 Fertility" },
  { index: 1, num: "02", x: 845, y: 500, dotX: 845, dotY: 543, label: "02 Maternity" },
  { index: 2, num: "03", x: 500, y: 845, dotX: 500, dotY: 888, label: "03 Pediatrics" },
  { index: 3, num: "04", x: 155, y: 500, dotX: 155, dotY: 543, label: "04 Midlife" },
];

export default function ServicesDial() {
  const wrapperRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Continuous smooth progress (0 to 1) for the SVG arc and knob
  const [smoothProgress, setSmoothProgress] = useState(0);
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

    // Center of step range
    const targetP = (stepIndex / N) + 0.05;
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
    let rafId = 0;
    let target = 0;
    let display = 0;

    const applyLayers = (pos: number) => {
      // Step calculation: step 1 from 0, step 2 from 0.25, step 3 from 0.5, step 4 from 0.75
      let step = 0;
      if (pos >= 0.75) step = 3;
      else if (pos >= 0.5) step = 2;
      else if (pos >= 0.25) step = 1;
      else step = 0;

      setActiveStepIndex((prev) => (prev !== step ? step : prev));
      setSmoothProgress(clamp(pos, 0, 1));

      // Right column crossfade
      const rightColPos = pos * (N - 1);
      for (let i = 0; i < N; i++) {
        const l = calculateLayer(i, rightColPos);
        const imgEl = imgRefs.current[i];
        if (imgEl) {
          imgEl.style.opacity = String(l.copyOp);
          imgEl.style.transform = `scale(${l.imgScale})`;
          imgEl.style.visibility = l.copyOp > 0.01 ? "visible" : "hidden";
        }
      }
    };

    const tick = () => {
      if (prefersReducedMotion) {
        display = target;
      } else {
        display += (target - display) * 0.12;
      }
      applyLayers(display);

      if (!prefersReducedMotion && Math.abs(target - display) > 0.0005) {
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

      const p = clamp(-r.top / run, 0, 1);
      target = p;

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

  // Knob position computed from smooth progress (starts at 12 o'clock, radius = 450)
  const knobAngleDeg = smoothProgress * 360;
  const knobRad = (knobAngleDeg - 90) * (Math.PI / 180);
  const knobX = 500 + 450 * Math.cos(knobRad);
  const knobY = 500 + 450 * Math.sin(knobRad);

  return (
    <section
      ref={wrapperRef}
      className="services-runway relative w-full select-none"
      style={{ height: "calc(100svh * 4)" }}
      aria-label="Women and family healthcare pathways">
      
      {/* Hidden text for screen readers */}
      <div className="sr-only" aria-live="polite">
        Current pathway: {STEPS[activeStepIndex]?.number} {STEPS[activeStepIndex]?.label}
      </div>

      {/* Preload step images */}
      <div className="hidden" aria-hidden="true">
        {STEPS.map((s) => (
          <img key={s.number} src={s.image || DEFAULT_IMAGE} alt="" />
        ))}
      </div>

      {/* 2-COLUMN GRID STAGE PINNED 100vh */}
      <div
        ref={stageRef}
        className="stage sticky top-0 w-full h-[100svh] overflow-hidden bg-white grid grid-cols-1 lg:grid-cols-2">
        
        {/* ====================================================================
            COLUMN 1 (LEFT): EXACT REFERENCE REPLICA CIRCULAR DIAL
            ==================================================================== */}
        <div className="w-full h-full flex flex-col justify-center items-center lg:items-start pl-6 sm:pl-10 md:pl-14 lg:pl-16 xl:pl-20 pr-6 py-6 sm:py-8 bg-white z-10 border-r border-[#1F2123]/10">
          <div className="flex flex-col items-center lg:items-start w-full max-w-[540px]">
            
            {/* RESPONSIVE DIAL CONTAINER (aspect-ratio 1, max about 640px) */}
            <div className="relative w-full max-w-[400px] sm:max-w-[460px] md:max-w-[490px] lg:max-w-[510px] xl:max-w-[530px] aspect-square flex items-center justify-center mb-6 sm:mb-8">
              
              {/* RESPONSIVE SVG (viewBox 0 0 1000 1000) */}
              <svg
                viewBox="0 0 1000 1000"
                className="w-full h-full overflow-visible select-none pointer-events-auto"
                aria-hidden="true">
                <defs>
                  {/* Outer soft shadow */}
                  <filter id="dialOuterShadow" x="-15%" y="-15%" width="130%" height="130%">
                    <feDropShadow dx="0" dy="14" stdDeviation="28" floodColor="#1F2123" floodOpacity="0.06" />
                  </filter>

                  {/* Arc glow filter */}
                  <filter id="arcGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#FF6A13" floodOpacity="0.65" />
                  </filter>

                  {/* Knob halo */}
                  <filter id="knobHalo" x="-60%" y="-60%" width="220%" height="220%">
                    <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#FF6A13" floodOpacity="0.85" />
                    <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000000" floodOpacity="0.18" />
                  </filter>
                </defs>

                {/* 1. Outer track: thin light-grey ring (~1.5px, #E6E6E8) with soft outer shadow */}
                <circle
                  cx="500"
                  cy="500"
                  r="450"
                  fill="#FFFFFF"
                  stroke="#E6E6E8"
                  strokeWidth="3"
                  filter="url(#dialOuterShadow)"
                />

                {/* 2. Dotted ring: thin dotted ring (1px dashed, #C9C9CE) just inside outer track */}
                <circle
                  cx="500"
                  cy="500"
                  r="422"
                  fill="none"
                  stroke="#C9C9CE"
                  strokeWidth="2.5"
                  strokeDasharray="6 7"
                />

                {/* Four small grey dots on dotted ring at 12, 3, 6 and 9 o'clock */}
                <circle cx="500" cy="78" r="5.5" fill="#A3A3A8" />
                <circle cx="922" cy="500" r="5.5" fill="#A3A3A8" />
                <circle cx="500" cy="922" r="5.5" fill="#A3A3A8" />
                <circle cx="78" cy="500" r="5.5" fill="#A3A3A8" />

                {/* 3. Numbers 01, 02, 03, 04 placed just INSIDE the dotted ring */}
                {NUMERAL_CONFIGS.map((item) => {
                  const isActive = activeStepIndex === item.index;
                  return (
                    <g
                      key={item.num}
                      onClick={() => handleDialClick(item.index)}
                      className="cursor-pointer transition-all duration-300"
                      role="button"
                      aria-label={`Jump to ${item.label}`}>
                      <text
                        x={item.x}
                        y={item.y}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontFamily="var(--font-figtree), system-ui, sans-serif"
                        fontWeight="800"
                        fontSize="70"
                        letterSpacing="-0.03em"
                        fill={isActive ? "#FF6A13" : "#A3A3A8"}
                        className="transition-colors duration-300 select-none">
                        {item.num}
                      </text>

                      {/* Small orange dot with gentle pulse beneath active number */}
                      {isActive && (
                        <circle
                          cx={item.dotX}
                          cy={item.dotY}
                          r="6.5"
                          fill="#FF6A13"
                          className="animate-pulse"
                        />
                      )}
                    </g>
                  );
                })}

                {/* 4. Progress line: THIN orange stroke sitting on outer ring, starts 12 o'clock, runs clockwise */}
                <path
                  d="M 500 50 A 450 450 0 1 1 499.99 50"
                  fill="none"
                  stroke="#FF6A13"
                  strokeWidth="6"
                  strokeLinecap="round"
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset={Math.max(0, 1 - smoothProgress)}
                  filter="url(#arcGlow)"
                  className="transition-[stroke-dashoffset] duration-75 ease-out"
                />

                {/* White knob (about 20px) with orange halo at leading end */}
                <g filter="url(#knobHalo)" className="transition-transform duration-75 ease-out">
                  <circle
                    cx={knobX}
                    cy={knobY}
                    r="18"
                    fill="#FFFFFF"
                    stroke="#FF6A13"
                    strokeWidth="4"
                  />
                </g>
              </svg>

              {/* Down Arrow button placed right under 03 at the bottom rim */}
              <button
                type="button"
                onClick={() => handleDialClick(Math.min(N - 1, activeStepIndex + 1))}
                aria-label="Next care milestone"
                className="absolute bottom-2 left-1/2 -translate-x-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-[#1F2123]/20 shadow-sm hover:shadow-md hover:border-[#FF6A13] text-[#1F2123]/70 hover:text-[#FF6A13] flex items-center justify-center transition-all cursor-pointer z-30">
                <ChevronDown className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* ==============================================================
                  CENTRE: GLASS CIRCLE (about 47% of the dial diameter)
                  ============================================================== */}
              
              {/* Soft blurred orange organic blobs peeking out behind glass circle */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "47%",
                  height: "47%",
                }}
                className="pointer-events-none -z-10 flex items-center justify-center">
                <div className="absolute w-[130%] h-[110%] -left-[25%] bg-gradient-to-r from-[#FF6A13]/40 via-[#FFA674]/25 to-transparent rounded-full blur-2xl transform -rotate-12" />
                <div className="absolute w-[130%] h-[110%] -right-[25%] bg-gradient-to-l from-[#FF6A13]/40 via-[#FFA674]/25 to-transparent rounded-full blur-2xl transform rotate-12" />
              </div>

              {/* Glass Circle Container (47% diameter) with Lifestyle Circle Image */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "47%",
                  height: "47%",
                }}
                className="rounded-full border-2 border-white/95 shadow-[0_16px_45px_rgba(255,106,19,0.18),0_4px_16px_rgba(0,0,0,0.08),inset_0_2px_6px_rgba(255,255,255,0.95)] overflow-hidden flex flex-col items-center justify-end text-center pointer-events-auto z-20">
                
                {/* 1. NEW LIFESTYLE CIRCLE IMAGE - Vivid Doctor & Patient */}
                <img
                  src="/dial/lifestyle-doctor-patient.png"
                  alt="Mendly Doctor with Patient"
                  className="absolute inset-0 w-full h-full object-cover rounded-full pointer-events-none select-none brightness-[1.02]"
                />

                {/* 2. SOFT GRADIENT SCIM AT BOTTOM ONLY (NO BOXES) */}
                <div className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-white/90 via-white/60 to-transparent rounded-b-full pointer-events-none" />

                {/* 3. UNBOXED TEXT OVERLAID AT BOTTOM */}
                <div className="relative z-10 flex flex-col items-center justify-end pb-4 sm:pb-5 text-center pointer-events-none select-none">
                  
                  {/* "Mendly Health" bold wordmark */}
                  <span className="font-display font-extrabold text-[14px] sm:text-[16px] md:text-[17px] text-[#111827] tracking-tight leading-none mb-1 drop-shadow-xs">
                    Mendly Health
                  </span>

                  {/* Thin orange ECG pulse line */}
                  <div className="w-10 sm:w-12 h-2.5 sm:h-3 text-[#FF6A13] flex items-center justify-center my-0.5">
                    <svg
                      viewBox="0 0 50 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-full h-full drop-shadow-xs">
                      <path d="M 0 6 L 14 6 L 19 1 L 25 11 L 31 3 L 35 8 L 38 6 L 50 6" />
                    </svg>
                  </div>

                  {/* Step label in orange, letter-spaced caps */}
                  <span className="font-display font-bold text-[10px] sm:text-[11px] md:text-xs text-[#FF6A13] uppercase tracking-[0.24em] leading-none drop-shadow-xs">
                    {STEPS[activeStepIndex]?.label}
                  </span>
                </div>

              </div>

            </div>

            {/* MILESTONE STEPPER ROW ALIGNED WITH DIAL */}
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
                        ? "w-8 bg-[#FF6A13]"
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
                  className="w-9 h-9 rounded-full border border-[#1F2123]/15 bg-white flex items-center justify-center text-[#1F2123]/80 hover:text-[#FF6A13] hover:border-[#FF6A13] disabled:opacity-25 disabled:pointer-events-none transition-all shadow-2xs cursor-pointer"
                  aria-label="Previous milestone">
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDialClick(Math.min(N - 1, activeStepIndex + 1))}
                  disabled={activeStepIndex === N - 1}
                  className="w-9 h-9 rounded-full bg-[#FF6A13] hover:bg-[#E85907] text-white flex items-center justify-center disabled:opacity-25 disabled:pointer-events-none transition-all shadow-sm cursor-pointer"
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
              <span className="w-2 h-2 rounded-full bg-[#FF6A13]" />
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

                {/* Optional Right Action CTA */}
                <button
                  type="button"
                  onClick={() => handleDialClick(Math.min(N - 1, activeStepIndex + 1))}
                  className="px-4 py-2 rounded-full bg-[#FF6A13] hover:bg-[#E85907] text-white text-xs font-semibold tracking-wide shadow-md transition-all cursor-pointer shrink-0">
                  <span>Explore Pathway</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
