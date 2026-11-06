"use client";

import React, { useEffect, useRef } from "react";

/**
 * ============================================================================
 * CONTOUR-WAVE BACKGROUND KNOBS (FLOWER TOPOGRAPHIC RINGS)
 * ============================================================================
 * Full configuration exposed at the top of the file as requested.
 */
export const CONTOUR_KNOBS = {
  // Rings count & spacing
  rings: 20, // Draw about 16 rings plus spare so outer rings leave screen
  spacingVW: 7.4, // ~7.4vw spacing (~105px at 1440px wide)
  r0VW: 4.5, // Innermost radius ~4.5vw
  originX: 0.5, // Horizontally centred on character (50%)
  originY: 0.55, // Vertically around chin & neck (55% of hero height)
  period: 12.0, // Each ring advances one full spacing every 12 seconds
  numPoints: 260, // Closed polyline of 260 points around origin

  // Horizontal stretch growing with age u:
  // sx(u) = stretchXMin + (stretchXMax - stretchXMin) * (1 - exp(-u / stretchXDecay))
  stretchXMin: 1.04, // Inner rings almost round (1.04)
  stretchXMax: 1.38, // Outer rings ~1.38x wider than tall
  stretchXDecay: 5.5, // Exponential growth factor

  // Fades
  birthFadeRings: 3.2, // Fade-in over first 3.2 rings: min(1, u / 3.2)
  deathStartRing: 8.0, // Past u = 8, drop to about 45% alpha by u = 18
  deathEndRing: 18.0,
  deathMinAlpha: 0.45,

  // Line style & visibility
  strokeAlpha: 0.85, // 1px white stroke: rgba(255, 255, 255, 0.85 * alpha)
  tintAlpha: 0.3, // Orange tint stroke offset down 1px: rgba(232, 121, 60, 0.30 * alpha)
  tintOffsetY: 1.0, // 1px offset down

  // Harmonics table: [k lobes, amplitude at u=0, decay in rings, phase, spin rad/s, twist per ring]
  harmonics: [
    [9, 0.066, 7, 0.4, 0.1, 0.55], // scalloped flower lobes
    [7, 0.03, 8, 2.1, -0.07, 0.4],
    [5, 0.04, 12, 1.3, 0.05, 0.3],
    [3, 0.05, 40, 4.0, -0.04, 0.22], // broad swell
    [2, 0.035, 60, 0.9, 0.03, 0.15], // slight asymmetry
  ] as const,
};

interface ContourLinesCanvasProps {
  isSoundActive?: boolean;
}

export default function ContourLinesCanvas({
  isSoundActive = false,
}: ContourLinesCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isSoundActiveRef = useRef(isSoundActive);
  isSoundActiveRef.current = isSoundActive;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let startTime: number | null = null;
    let isTabVisible = true;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Device pixel ratio capped at 2 for crisp lines with maximum performance
    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const onVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Pre-allocate point buffer for 260 points (x, y pairs = 520 floats)
    const numPoints = CONTOUR_KNOBS.numPoints;
    const pointBufferX = new Float64Array(numPoints);
    const pointBufferY = new Float64Array(numPoints);

    const render = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = (now - startTime) / 1000;

      if (!isTabVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = rect.width;
      const height = rect.height;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Origin: horizontally centred on character (50%), vertically around chin/neck (55%)
      const cx = width * CONTOUR_KNOBS.originX;
      const cy = height * CONTOUR_KNOBS.originY;

      // Spacing based on viewport width: ~7.4vw (~105px at 1440w), r0 ~4.5vw
      const spacing = (width * CONTOUR_KNOBS.spacingVW) / 100;
      const r0 = (width * CONTOUR_KNOBS.r0VW) / 100;

      // Continuous time: each ring advances one full spacing every 12 seconds
      const t = prefersReducedMotion ? 0 : elapsed;
      const ringAdvance = prefersReducedMotion
        ? 0
        : (t / CONTOUR_KNOBS.period) % 1;

      // Subtle sound responsiveness if active
      const soundScale = isSoundActiveRef.current
        ? 1.0 + 0.05 * Math.sin(elapsed * 4.0)
        : 1.0;

      const harmonics = CONTOUR_KNOBS.harmonics;
      const numHarmonics = harmonics.length;

      // Draw each ring from outermost to innermost or innermost outward
      for (let i = 0; i < CONTOUR_KNOBS.rings; i++) {
        // Continuous age u: 0 at centre, growing outward
        const u = i + ringAdvance;
        const baseR = (r0 + u * spacing) * soundScale;

        // 1. Birth fade-in over first 3.2 rings
        const inAlpha = Math.min(1.0, Math.max(0.0, u / CONTOUR_KNOBS.birthFadeRings));

        // 2. Death fade-out past u = 8, drop to ~45% by u = 18
        let outAlpha = 1.0;
        if (u > CONTOUR_KNOBS.deathStartRing) {
          if (u <= CONTOUR_KNOBS.deathEndRing) {
            const prog =
              (u - CONTOUR_KNOBS.deathStartRing) /
              (CONTOUR_KNOBS.deathEndRing - CONTOUR_KNOBS.deathStartRing);
            outAlpha = 1.0 - (1.0 - CONTOUR_KNOBS.deathMinAlpha) * prog;
          } else {
            // Spare outer rings gracefully fade out
            const extra = Math.min(1.0, (u - CONTOUR_KNOBS.deathEndRing) / 2.0);
            outAlpha = CONTOUR_KNOBS.deathMinAlpha * (1.0 - extra);
          }
        }

        const alpha = inAlpha * outAlpha;
        if (alpha <= 0.005) continue;

        // Horizontal stretch sx(u) = 1.04 + (1.38 - 1.04) * (1 - exp(-u / 5.5))
        const sx =
          CONTOUR_KNOBS.stretchXMin +
          (CONTOUR_KNOBS.stretchXMax - CONTOUR_KNOBS.stretchXMin) *
            (1.0 - Math.exp(-u / CONTOUR_KNOBS.stretchXDecay));

        // Sample closed polyline of 260 points around origin
        for (let j = 0; j < numPoints; j++) {
          const theta = (j / numPoints) * (Math.PI * 2);

          // Sum of harmonics: amp * exp(-u / decay) * sin(k * theta + phase + spin * t + twist * u)
          let harmonicSum = 0;
          for (let h = 0; h < numHarmonics; h++) {
            const [k, amp, decay, phase, spin, twist] = harmonics[h];
            harmonicSum +=
              amp *
              Math.exp(-u / decay) *
              Math.sin(k * theta + phase + spin * t + twist * u);
          }

          const r = baseR * (1.0 + harmonicSum);
          pointBufferX[j] = cx + Math.cos(theta) * r * sx;
          pointBufferY[j] = cy + Math.sin(theta) * r;
        }

        // ─────────────────────────────────────────────────────────────
        // Pass 1: Crisp White 1px stroke: rgba(255, 255, 255, 0.85 * alpha)
        // ─────────────────────────────────────────────────────────────
        ctx.beginPath();
        for (let j = 0; j < numPoints; j++) {
          if (j === 0) {
            ctx.moveTo(pointBufferX[j], pointBufferY[j]);
          } else {
            ctx.lineTo(pointBufferX[j], pointBufferY[j]);
          }
        }
        ctx.closePath();
        ctx.lineWidth = 1.0;
        ctx.strokeStyle = `rgba(255, 255, 255, ${(CONTOUR_KNOBS.strokeAlpha * alpha).toFixed(3)})`;
        ctx.stroke();

        // ─────────────────────────────────────────────────────────────
        // Pass 2: Orange tint stroke offset down 1px: rgba(232, 121, 60, 0.30 * alpha)
        // Soft warm delicate edge with no blur or glow
        // ─────────────────────────────────────────────────────────────
        ctx.beginPath();
        const offsetY = CONTOUR_KNOBS.tintOffsetY;
        for (let j = 0; j < numPoints; j++) {
          if (j === 0) {
            ctx.moveTo(pointBufferX[j], pointBufferY[j] + offsetY);
          } else {
            ctx.lineTo(pointBufferX[j], pointBufferY[j] + offsetY);
          }
        }
        ctx.closePath();
        ctx.lineWidth = 1.0;
        ctx.strokeStyle = `rgba(232, 121, 60, ${(CONTOUR_KNOBS.tintAlpha * alpha).toFixed(3)})`;
        ctx.stroke();
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      style={{ display: "block" }}
      aria-hidden="true"
    />
  );
}
