"use client";

import React, { useState } from "react";
import { HERO_CONTENT } from "@/content/hero";

interface AdaptiveHeaderProps {
  currentSceneIndex?: number;
}

export default function AdaptiveHeader({ currentSceneIndex = 1 }: AdaptiveHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDarkScene =
    currentSceneIndex === 1 ||
    currentSceneIndex === 2 ||
    currentSceneIndex === 3 ||
    currentSceneIndex === 5;

  return (
    <header
      id="adaptive-header"
      className="fixed top-0 left-0 w-full z-50 pointer-events-auto transition-all duration-500">
      <div className="mx-auto flex h-[68px] sm:h-[76px] w-full max-w-[1600px] items-center justify-between px-5 sm:px-8 md:px-12">
        {/* LEFT ZONE: Brand Wordmark */}
        <div className="flex items-center">
          <a
            href="#"
            className="group flex items-center gap-2.5 focus:outline-none"
            aria-label={HERO_CONTENT.hospitalName}>
            <div className="flex items-center gap-2 bg-black/35 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
              <span className="inline-block h-2 w-2 rounded-full bg-[#008068] animate-pulse" />
              <span className="font-mono-hud text-[12px] sm:text-[13px] tracking-[0.16em] uppercase text-white font-semibold">
                {HERO_CONTENT.hospitalName}
              </span>
            </div>
          </a>
        </div>

        {/* CENTER ZONE: Monospaced Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-8 lg:gap-11 bg-black/35 backdrop-blur-md px-6 py-2 rounded-full border border-white/10"
          aria-label="Hero Navigation">
          {HERO_CONTENT.navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-mono-hud text-[11px] lg:text-[12px] tracking-[0.18em] uppercase text-white/85 hover:text-white transition-colors duration-200">
              {link.label}
            </a>
          ))}
        </nav>

        {/* RIGHT ZONE: Primary CTA */}
        <div className="flex items-center gap-3">
          <a
            href={HERO_CONTENT.ctaHref}
            className="group relative inline-flex items-center gap-1.5 rounded-full bg-[#008068] px-5 sm:px-6 py-2.5 text-[12px] sm:text-[13px] font-semibold tracking-[0.1em] text-white uppercase transition-all duration-300 hover:bg-[#006B57] hover:scale-[1.03] shadow-lg focus:outline-none">
            <span>{HERO_CONTENT.ctaText}</span>
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`inline-flex md:hidden p-2 rounded focus:outline-none transition-colors ${
              isDarkScene ? "text-white" : "text-black"
            }`}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}>
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 8h16.5M3.75 16h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-black/95 backdrop-blur-md px-6 py-4">
          <nav className="flex flex-col space-y-3">
            {HERO_CONTENT.navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-mono-hud text-xs tracking-widest text-white/90 hover:text-white uppercase py-1">
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
