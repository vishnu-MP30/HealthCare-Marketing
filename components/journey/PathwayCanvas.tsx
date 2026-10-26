"use client";

import React, { useRef, useState, useEffect } from "react";
import { Sector } from "@/content/journey";
import StepChip from "./StepChip";
import DecisionNode from "./DecisionNode";
import PreviewCard from "./PreviewCard";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Flip, DrawSVGPlugin, useGSAP);
}

interface PathwayCanvasProps {
  sector: Sector;
  systemOfActionLabel: string;
  selectionTick?: number;
}

export default function PathwayCanvas({
  sector,
  systemOfActionLabel,
  selectionTick = 0,
}: PathwayCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackSvgRef = useRef<SVGSVGElement | null>(null);
  const mainLineRef = useRef<SVGPathElement | null>(null);
  const travelingDotRef = useRef<SVGCircleElement | null>(null);
  const connectorPathRef = useRef<SVGPathElement | null>(null);
  const activeTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const [trackWidth, setTrackWidth] = useState(800);

  // Measure container width dynamically on mount and resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setTrackWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Build and execute the GSAP timeline on active sector or selectionTick change
  useGSAP(
    () => {
      const isReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Kill any running previous timeline immediately
      if (activeTimelineRef.current) {
        activeTimelineRef.current.kill();
      }

      const container = containerRef.current;
      if (!container) return;

      const chips = container.querySelectorAll(".pathway-step-chip");
      const connectors = container.querySelectorAll(".pathway-connector-vertical");
      const cards = container.querySelectorAll(".pathway-card-wrapper");
      const progressBars = container.querySelectorAll(".card-progress-bar");
      const optionRows = container.querySelectorAll(".card-option-row");
      const chatIn = container.querySelectorAll(".card-chat-bubble-in");
      const chatOut = container.querySelectorAll(".card-chat-bubble-out");
      const waveformBars = container.querySelectorAll(".card-waveform-bar");
      const qrCodes = container.querySelectorAll(".card-ticket-qr");
      const counters = container.querySelectorAll(".card-result-counter");
      const decisionCircles = container.querySelectorAll(".decision-node-circle");

      // REDUCED MOTION FALLBACK: Show complete static state instantly
      if (isReduced) {
        gsap.set(chips, { opacity: 1, y: 0, scale: 1 });
        gsap.set(connectors, { scaleY: 1 });
        gsap.set(cards, { opacity: 1, y: 0 });
        if (mainLineRef.current) gsap.set(mainLineRef.current, { drawSVG: "100%" });
        if (connectorPathRef.current) gsap.set(connectorPathRef.current, { drawSVG: "100%" });
        if (travelingDotRef.current) gsap.set(travelingDotRef.current, { opacity: 0 });
        return;
      }

      // INITIAL HIDDEN STATE (via gsap.set before timeline begins)
      if (chips && chips.length > 0) gsap.set(chips, { opacity: 0, y: 8, scale: 0.96 });
      if (connectors && connectors.length > 0) gsap.set(connectors, { scaleY: 0, transformOrigin: "top" });
      if (cards && cards.length > 0) gsap.set(cards, { opacity: 0, y: 16 });
      if (optionRows && optionRows.length > 0) gsap.set(optionRows, { opacity: 0, x: -6 });
      if (chatIn && chatIn.length > 0) gsap.set(chatIn, { opacity: 0, x: -10 });
      if (chatOut && chatOut.length > 0) gsap.set(chatOut, { opacity: 0, x: 10 });
      if (qrCodes && qrCodes.length > 0) gsap.set(qrCodes, { opacity: 0, scale: 0.8 });
      if (decisionCircles && decisionCircles.length > 0) gsap.set(decisionCircles, { scale: 0 });
      if (travelingDotRef.current) gsap.set(travelingDotRef.current, { opacity: 0 });
      if (mainLineRef.current) gsap.set(mainLineRef.current, { drawSVG: "0%" });
      if (connectorPathRef.current) gsap.set(connectorPathRef.current, { drawSVG: "0%" });

      progressBars.forEach((bar) => {
        gsap.set(bar, { width: "0%" });
      });

      const mm = gsap.matchMedia();

      // DESKTOP & TABLET: Horizontal continuous line (>= 768px)
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          id: `journey-timeline-desktop-${sector.id}`,
          defaults: { ease: "power2.out" },
          onComplete: () => {
            if (travelingDotRef.current) {
              gsap.to(travelingDotRef.current, { opacity: 0, duration: 0.2 });
            }
          },
        });

        activeTimelineRef.current = tl;

        // 1. S-CURVE CONNECTOR (0ms - 350ms)
        if (connectorPathRef.current) {
          tl.to(connectorPathRef.current, {
            drawSVG: "0% 100%",
            duration: 0.35,
            ease: "power2.inOut",
          });
        }

        // 2. HORIZONTAL GREEN LINE (350ms - 1550ms, 1.2s duration)
        if (mainLineRef.current) {
          const linePath = mainLineRef.current;
          const totalLen = linePath.getTotalLength() || 600;

          tl.addLabel("lineStart");

          tl.to(
            travelingDotRef.current,
            { opacity: 1, duration: 0.1 },
            "lineStart"
          );

          tl.to(
            linePath,
            {
              drawSVG: "0% 100%",
              duration: 1.2,
              ease: "power1.inOut",
              onUpdate: function () {
                const progress = this.progress();
                if (travelingDotRef.current && totalLen > 0) {
                  const pt = linePath.getPointAtLength(progress * totalLen);
                  travelingDotRef.current.setAttribute("cx", String(pt.x));
                  travelingDotRef.current.setAttribute("cy", String(pt.y));
                }
              },
            },
            "lineStart"
          );

          // 3. STEP 1 (Line tip reaches column 1, ~550ms)
          tl.addLabel("step1", "lineStart+=0.2");
          if (chips[0]) {
            tl.to(
              chips[0],
              { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: "back.out(1.6)" },
              "step1"
            );
          }
          if (connectors[0]) {
            tl.to(connectors[0], { scaleY: 1, duration: 0.2 }, "step1+=0.1");
          }
          if (cards[0]) {
            tl.to(
              cards[0],
              { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
              "step1+=0.15"
            );
          }

          // Card 1 inner animations
          if (progressBars[0]) {
            const targetW = progressBars[0].getAttribute("data-percent") || "33";
            tl.to(
              progressBars[0],
              { width: `${targetW}%`, duration: 0.5, ease: "power2.out" },
              "step1+=0.3"
            );
          }
          if (optionRows.length > 0) {
            tl.to(
              optionRows,
              { opacity: 1, x: 0, duration: 0.25, stagger: 0.05 },
              "step1+=0.25"
            );
          }
          if (chatIn.length > 0) {
            tl.to(chatIn, { opacity: 1, x: 0, duration: 0.3 }, "step1+=0.2");
          }
          if (chatOut.length > 0) {
            tl.to(chatOut, { opacity: 1, x: 0, duration: 0.3 }, "step1+=0.35");
          }

          // 4. STEP 2 (Line tip reaches column 2, ~950ms)
          tl.addLabel("step2", "lineStart+=0.6");
          if (chips[1]) {
            tl.to(
              chips[1],
              { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: "back.out(1.6)" },
              "step2"
            );
          }
          if (decisionCircles.length > 0) {
            tl.to(
              decisionCircles,
              { scale: 1, duration: 0.3, ease: "back.out(2)" },
              "step2"
            );
          }
          if (connectors[1]) {
            tl.to(connectors[1], { scaleY: 1, duration: 0.2 }, "step2+=0.1");
          }
          if (cards[1]) {
            tl.to(
              cards[1],
              { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
              "step2+=0.15"
            );
          }

          // Card 2 inner animations
          if (qrCodes.length > 0) {
            tl.to(
              qrCodes,
              { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.5)" },
              "step2+=0.3"
            );
          }
          if (waveformBars.length > 0) {
            tl.fromTo(
              waveformBars,
              { scaleY: 0.3 },
              {
                scaleY: 1,
                duration: 0.4,
                stagger: { each: 0.04, repeat: 1, yoyo: true },
                ease: "sine.inOut",
              },
              "step2+=0.25"
            );
          }

          // 5. STEP 3 OUTCOME (Line tip reaches column 3, ~1350ms)
          tl.addLabel("step3", "lineStart+=1.0");
          if (chips[2]) {
            tl.to(
              chips[2],
              { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: "back.out(1.8)" },
              "step3"
            );
          }
          if (connectors[2]) {
            tl.to(connectors[2], { scaleY: 1, duration: 0.2 }, "step3+=0.1");
          }
          if (cards[2]) {
            tl.to(
              cards[2],
              { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
              "step3+=0.15"
            );
          }

          // KPI Counter count up
          counters.forEach((counter) => {
            const target = parseFloat(counter.getAttribute("data-target") || "100");
            const prefix = counter.getAttribute("data-prefix") || "";
            const suffix = counter.getAttribute("data-suffix") || "";
            const obj = { val: 0 };

            tl.to(
              obj,
              {
                val: target,
                duration: 0.7,
                ease: "power2.out",
                onUpdate: () => {
                  const isDecimal = target % 1 !== 0;
                  const formatted = isDecimal ? obj.val.toFixed(1) : Math.round(obj.val);
                  counter.textContent = `${prefix}${formatted}${suffix}`;
                },
              },
              "step3+=0.2"
            );
          });
        }
      });

      // MOBILE: Vertical timeline (< 768px)
      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          id: `journey-timeline-mobile-${sector.id}`,
          defaults: { ease: "power2.out" },
        });

        activeTimelineRef.current = tl;

        chips.forEach((chip, i) => {
          tl.to(
            chip,
            { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: "back.out(1.6)" },
            i * 0.3
          );
          if (connectors[i]) {
            tl.to(connectors[i], { scaleY: 1, duration: 0.2 }, i * 0.3 + 0.1);
          }
          if (cards[i]) {
            tl.to(
              cards[i],
              { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" },
              i * 0.3 + 0.15
            );
          }
        });

        if (decisionCircles.length > 0) {
          tl.to(decisionCircles, { scale: 1, duration: 0.3, ease: "back.out(2)" }, 0.3);
        }
      });

      return () => {
        mm.revert();
      };
    },
    { dependencies: [sector.id, selectionTick], revertOnUpdate: true }
  );

  return (
    <div
      ref={containerRef}
      className="relative flex-1 flex flex-col min-w-0 w-full overflow-visible"
      id={`sector-panel-${sector.id}`}
      role="tabpanel"
      aria-labelledby={`sector-tab-${sector.id}`}
    >
      {/* Top Label */}
      <div className="flex items-center gap-2 mb-3 sm:mb-5">
        <span className="w-2 h-2 rounded-full bg-[#008068] animate-pulse" />
        <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.16em] uppercase text-[#008068] font-bold">
          {systemOfActionLabel}
        </span>
      </div>

      {/* Main Pathway Canvas Container: Zero horizontal scroll */}
      <div className="relative w-full overflow-visible">
        {/* SVG Connective Pathway Track Layer (Desktop & Tablet) */}
        <div className="hidden md:block relative w-full h-11 pointer-events-none mb-1">
          <svg
            ref={trackSvgRef}
            className="w-full h-full overflow-visible"
            viewBox={`0 0 ${Math.max(trackWidth, 600)} 44`}
            preserveAspectRatio="none"
            fill="none"
          >
            {/* S-CURVE CONNECTOR from Sector Rail on left */}
            <path
              ref={connectorPathRef}
              d="M -20 22 C -6 22, -6 22, 10 22"
              stroke="#9bb8a5"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* HORIZONTAL CONTINUOUS PATHWAY LINE */}
            <path
              ref={mainLineRef}
              d={`M 10 22 L ${Math.max(trackWidth - 14, 560)} 22`}
              stroke="#008068"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* End Cap Dot at right edge */}
            <circle
              cx={Math.max(trackWidth - 14, 560)}
              cy="22"
              r="4"
              fill="#008068"
              stroke="#ffffff"
              strokeWidth="1.5"
            />

            {/* Glowing Traveling Dot at drawing tip */}
            <circle
              ref={travelingDotRef}
              cx="10"
              cy="22"
              r="4.5"
              fill="#008068"
              className="drop-shadow-[0_0_6px_#008068]"
            />
          </svg>
        </div>

        {/* 3 EQUAL COLUMNS GRID (Strictly 3 blocks, width 100%, minmax(0, 1fr)) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5 w-full min-w-0 max-w-none">
          {sector.steps.map((step, idx) => {
            // DECISION STEP (Outpatients flow)
            if (step.kind === "decision") {
              return (
                <div
                  key={step.id || idx}
                  className="pathway-step-col flex flex-col items-center w-full min-w-0"
                >
                  <DecisionNode step={step} />
                </div>
              );
            }

            // OUTCOME STEP
            if (step.kind === "outcome") {
              return (
                <div
                  key={step.id || idx}
                  className="pathway-step-col flex flex-col items-center w-full min-w-0"
                >
                  {/* Step Chip Row */}
                  <div className="h-10 flex items-center justify-center">
                    <div className="pathway-step-chip will-change-transform">
                      <StepChip
                        label={step.label}
                        icon="check"
                        isOutcome={true}
                      />
                    </div>
                  </div>

                  {/* Vertical Connector */}
                  <div className="pathway-connector-vertical w-0 border-l-2 border-dotted border-[#008068]/60 h-5 my-1.5 will-change-transform origin-top" />

                  {/* Outcome Result Card */}
                  <div className="pathway-card-wrapper w-full will-change-transform">
                    <PreviewCard card={step.card} />
                  </div>
                </div>
              );
            }

            // REGULAR CHIP STEP
            return (
              <div
                key={step.id || idx}
                className="pathway-step-col flex flex-col items-center w-full min-w-0"
              >
                {/* Step Chip Row */}
                <div className="h-10 flex items-center justify-center">
                  <div className="pathway-step-chip will-change-transform">
                    <StepChip label={step.label} icon={step.icon} />
                  </div>
                </div>

                {/* Vertical Connector */}
                <div className="pathway-connector-vertical w-0 border-l-2 border-dotted border-[#008068]/60 h-5 my-1.5 will-change-transform origin-top" />

                {/* Regular Preview Card */}
                <div className="pathway-card-wrapper w-full will-change-transform">
                  <PreviewCard card={step.card} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
