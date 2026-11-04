"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("services");

  const navLinks = [
    { label: "Services", href: "#services", id: "services" },
    { label: "Our Approach", href: "#approach", id: "approach" },
    { label: "About", href: "#about", id: "about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[rgba(0,0,0,0.09)] bg-[#E8E8E8]/90 backdrop-blur-sm transition-colors">
      <div className="mx-auto flex h-[80px] w-full max-w-[1600px] items-center justify-between px-6 sm:px-10 lg:px-16">
        {/* LEFT ZONE: Brand Identity */}
        <div className="flex items-center">
          <Link
            href="/"
            className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#008068]"
            aria-label="VELORA Creative & Marketing Studio"
          >
            {/* Custom Sculptural V Symbol */}
            <div className="relative flex h-8 w-8 items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <svg
                width="28"
                height="28"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Left faceted blade in Emerald Green */}
                <path
                  d="M4 6L14.2 27.2C14.7 28.2 16.1 28.3 16.7 27.4L20.8 21.2L11.5 6H4Z"
                  fill="#008068"
                />
                {/* Right faceted blade in Rich Noir */}
                <path
                  d="M28 6L17.5 22.5L20.8 21.2L28 6Z"
                  fill="#000000"
                />
                {/* Center bevel facet */}
                <path
                  d="M28 6H20.5L16.2 13.8L19.5 20.2L28 6Z"
                  fill="#1E1E1E"
                  fillOpacity="0.85"
                />
                {/* Emerald highlight facet */}
                <path
                  d="M11.5 6L16.2 13.8L14.5 17.2L8.5 6H11.5Z"
                  fill="#006B57"
                />
              </svg>
            </div>

            {/* Brand Typography */}
            <div className="flex items-baseline gap-2.5">
              <span className="font-sans text-2xl font-semibold tracking-wider text-black">
                VELORA
              </span>
              <span className="hidden font-sans text-sm text-[#484848] sm:inline-block">
                Studio
              </span>
            </div>
          </Link>
        </div>

        {/* CENTER ZONE: Navigation */}
        <nav
          className="hidden md:flex items-center gap-10 lg:gap-14"
          aria-label="Main Navigation"
        >
          {navLinks.map((item) => {
            const isActive = activeLink === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setActiveLink(item.id)}
                className={`relative py-1 text-[15px] tracking-wide transition-colors duration-200 focus:outline-none focus-visible:text-[#008068] ${
                  isActive
                    ? "font-semibold text-black"
                    : "font-normal text-[#484848] hover:text-black"
                }`}
              >
                <span>{item.label}</span>
                {/* Crisp editorial underline inspired by the reference */}
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] w-full transition-all duration-300 ${
                    isActive
                      ? "bg-black opacity-100"
                      : "bg-[#008068] opacity-0 hover:opacity-80"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* RIGHT ZONE: Primary CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          {/* Desktop Primary CTA: Minimalist Editorial Treatment */}
          <div className="hidden sm:block">
            <a
              href="#contact"
              className="group inline-flex items-center gap-1.5 rounded-full border border-black/25 px-5 py-2 text-[14px] font-medium tracking-wide text-black transition-all duration-200 hover:border-[#008068] hover:text-[#008068] hover:bg-[#008068]/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#008068]"
            >
              <span>Let&apos;s Talk</span>
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-xs text-[#008068]">
                ↗
              </span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex md:hidden items-center justify-center p-2 text-black hover:text-[#008068] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#008068]"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.75"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 8h16.5M3.75 16h16.5"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[rgba(0,0,0,0.09)] bg-[#E8E8E8] px-6 py-5 transition-all">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => {
                  setActiveLink(item.id);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between text-base font-medium text-black hover:text-[#008068] transition-colors"
              >
                <span>{item.label}</span>
                <span className="text-xs text-[#008068]">→</span>
              </a>
            ))}
            <div className="pt-3 border-t border-[rgba(0,0,0,0.09)]">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-[#008068] bg-[#008068] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#006B57]"
              >
                <span>Let&apos;s Talk</span>
                <span>↗</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
