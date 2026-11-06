"use client";

import React, { useEffect, useState } from "react";

interface PageLoaderProps {
  onComplete: () => void;
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
  const [count, setCount] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    // Run counter from 0 to 100 over ~1.3s
    const startTime = performance.now();
    const duration = 1300; // ms

    let animId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth easeOutCubic curve
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(eased * 100);
      setCount(currentVal);

      if (progress < 1) {
        animId = requestAnimationFrame(tick);
      } else {
        // Start fading out loader
        setIsFadingOut(true);
        setTimeout(() => {
          setIsRemoved(true);
          onComplete();
        }, 350);
      }
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [onComplete]);

  if (isRemoved) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center pointer-events-none transition-opacity duration-400 ease-out ${
        isFadingOut ? "opacity-0" : "opacity-100"
      }`}
      style={{
        background:
          "radial-gradient(circle at 50% 40%, #FFFFFF 0%, #FAF6F0 60%, #F5EFEB 100%)",
      }}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center justify-center">
        <div className="font-display text-[48px] sm:text-[60px] font-semibold text-[#1F2123] tracking-tight tabular-nums select-none">
          {count}
        </div>
        <div className="mt-2 text-xs uppercase tracking-[0.25em] text-[#E8682A] font-semibold font-body">
          Mendly
        </div>
      </div>
    </div>
  );
}
