"use client";

import React from "react";

/**
 * Transparent wrapper. Lenis and ScrollTrigger synchronization are managed
 * centrally inside HeroSequence as specified in the architecture instructions.
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
