"use client";

import React, { useEffect, useRef } from "react";

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

    // Resize canvas respecting devicePixelRatio <= 2
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

    const NUM_RINGS = 18;
    const NUM_POINTS = 16;
    const CYCLE_DURATION = 12.0; // seconds for 1 spacing outward travel
    const BASE_SPACING = 72; // desktop spacing px
    const BASE_INNER_RADIUS = 12; // inner radius px

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

      // Centered on the character's face: cx = 50%, cy ≈ 38% - 40%
      const cx = width * 0.5;
      const cy = height * 0.39;

      // Scale spacing smoothly by viewport width (reference 1280px)
      const scaleFactor = Math.min(Math.max(width / 1280, 0.55), 1.25);
      const spacing = BASE_SPACING * scaleFactor;
      const innerRadius = BASE_INNER_RADIUS * scaleFactor;

      // Fractional outward movement in [0, 1)
      const timeOffset = prefersReducedMotion
        ? 0
        : (elapsed / CYCLE_DURATION) % 1;

      // Noise drift over time
      const driftTime = elapsed * 0.05;

      // Sound reaction pulse
      const soundPulse = isSoundActiveRef.current
        ? 1.0 + 0.18 * Math.sin(elapsed * 3.5)
        : 1.0;

      // Render rings from outer to inner or inner to outer
      for (let i = 0; i < NUM_RINGS; i++) {
        // Continuous radius that travels outward
        const ringProgress = i + timeOffset;
        const currentRadius = innerRadius + ringProgress * spacing;

        // Inner rings fade in over first 3 rings (0 -> 1)
        const innerFade = Math.min(Math.max((ringProgress - 0.2) / 2.8, 0), 1);

        // Outer rings fade gently down to ~0.35
        const outerProgress = ringProgress / NUM_RINGS;
        const outerFade = Math.max(1.0 - outerProgress * 0.65, 0.35);

        // Calculate opacity
        const ringOpacity = Math.max(
          0,
          Math.min(1, innerFade * outerFade * soundPulse)
        );

        if (ringOpacity <= 0.01) continue;

        // Sample control points around squircle
        const points: { x: number; y: number }[] = [];

        for (let j = 0; j < NUM_POINTS; j++) {
          const theta = (j / NUM_POINTS) * Math.PI * 2;

          // Multi-octave organic wobble noise (sine sum)
          const n1 = Math.sin(2 * theta + driftTime + i * 0.25) * 0.05;
          const n2 = Math.sin(3 * theta - driftTime * 0.8 + 1.2) * 0.03;
          const n3 = Math.cos(4 * theta + driftTime * 0.5 + 2.4) * 0.02;
          const wobble = n1 + n2 + n3; // amplitude ~6-10% of radius

          const r = currentRadius * (1 + wobble);

          // Squircle horizontal stretch ratio 1.35:1
          const x = cx + r * 1.35 * Math.cos(theta);
          const y = cy + r * Math.sin(theta);
          points.push({ x, y });
        }

        // Draw closed Catmull-Rom spline through points
        ctx.beginPath();
        for (let j = 0; j < NUM_POINTS; j++) {
          const p0 = points[(j - 1 + NUM_POINTS) % NUM_POINTS];
          const p1 = points[j];
          const p2 = points[(j + 1) % NUM_POINTS];
          const p3 = points[(j + 2) % NUM_POINTS];

          if (j === 0) {
            ctx.moveTo(p1.x, p1.y);
          }

          // Catmull-Rom to cubic Bézier control points
          const cp1x = p1.x + (p2.x - p0.x) / 6;
          const cp1y = p1.y + (p2.y - p0.y) / 6;
          const cp2x = p2.x - (p3.x - p1.x) / 6;
          const cp2y = p2.y - (p3.y - p1.y) / 6;

          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
        }
        ctx.closePath();

        // Pass 1: crisp clean white stroke (1px)
        ctx.lineWidth = 1.0;
        ctx.strokeStyle = `rgba(255, 255, 255, ${(0.68 * ringOpacity).toFixed(3)})`;
        ctx.stroke();

        // Pass 2: subtle warm peach/apricot glow tint pass
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = `rgba(255, 190, 150, ${(0.22 * ringOpacity).toFixed(3)})`;
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
