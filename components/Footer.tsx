"use client";

import React, { useState } from "react";
import Link from "next/link";

/**
 * ============================================================================
 * LIFECARE FOOTER SECTION
 * ============================================================================
 * - Background: 2nd uploaded image (public/footer/footer-bg.png) featuring
 *   the illustrated medical staff on the right side.
 * - Left/Center Overlay: Clean, uncrowded white typography matching the
 *   1st reference layout (DrDoctor).
 * - Exact sections requested from the website:
 *     1. Intelligent Healthcare Pathway
 *     2. Healthcare for Families and Women
 *     3. Speciality Departments
 *     4. Health Reads
 * - Aligned Contact options: Phone, Email, Location.
 * - Small Email Enquiry form with send button.
 * - Bottom aligned large bold white "LifeCare" wordmark & copyright.
 */

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubmitted(true);
    setTimeout(() => {
      setEmail("");
      setSubmitted(false);
    }, 4500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="site-footer"
      aria-label="Mendly Hospital Footer"
      className="relative w-full bg-[#075F30] overflow-hidden text-white font-figtree">
      {/* ==================================================================== */}
      {/* BACKGROUND BANNER IMAGE WITH MEDICAL TEAM ON RIGHT                   */}
      {/* ==================================================================== */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{
          backgroundImage: "url('/footer/footer-bg.png')",
          backgroundPosition: "right bottom",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden="true"
      />

      {/* Gentle protective gradient on the left/middle so white text is 100% readable */}
      <div
        className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-r from-[#075F30]/95 via-[#075F30]/80 to-transparent lg:from-[#075F30]/90 lg:via-[#075F30]/60 lg:to-transparent"
        aria-hidden="true"
      />

      {/* Decorative Subtle Top Divider Line */}
      <div
        className="relative z-10 w-full h-[1px] bg-gradient-to-r from-white/10 via-white/20 to-transparent"
        aria-hidden="true"
      />

      {/* ==================================================================== */}
      {/* MAIN FOOTER CONTENT CONTAINER                                        */}
      {/* ==================================================================== */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-14 sm:pt-16 pb-8">
        {/* TOP ZONE: Uncrowded, high-contrast 3-column navigation, contact & enquiry */}
        {/* Constrained to left 60% on desktop so it NEVER touches the doctors on the right */}
        <div className="w-full lg:max-w-[62%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6 lg:gap-8 pb-12 lg:pb-16">
          {/* Column 1: Website Sections (4 core sections only as requested) */}
          <div className="flex flex-col">
            <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-white/80 mb-4">
              Care &amp; Services
            </span>
            <nav
              aria-label="Footer Navigation"
              className="flex flex-col space-y-3">
              <Link
                href="#journey"
                className="text-[14px] sm:text-[15px] text-white hover:text-white/80 hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 rounded-full bg-white opacity-60 group-hover:opacity-100 transition-opacity" />
                Intelligent Healthcare Pathway
              </Link>
              <Link
                href="#family-care"
                className="text-[14px] sm:text-[15px] text-white hover:text-white/80 hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 rounded-full bg-white opacity-60 group-hover:opacity-100 transition-opacity" />
                Healthcare for Families and Women
              </Link>
              <Link
                href="#departments"
                className="text-[14px] sm:text-[15px] text-white hover:text-white/80 hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 rounded-full bg-white opacity-60 group-hover:opacity-100 transition-opacity" />
                Speciality Departments
              </Link>
              <Link
                href="#health-reads"
                className="text-[14px] sm:text-[15px] text-white hover:text-white/80 hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 rounded-full bg-white opacity-60 group-hover:opacity-100 transition-opacity" />
                Health Reads
              </Link>
            </nav>
          </div>

          {/* Column 2: Aligned Contact Information */}
          <div className="flex flex-col">
            <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-white/80 mb-4">
              Contact &amp; Support
            </span>
            <ul className="flex flex-col space-y-3 text-[14px] sm:text-[14.5px] text-white">
              <li className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0 text-white mt-0.5">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <span>
                  <strong className="text-white font-semibold block sm:inline">24/7 Helpline:</strong>{" "}
                  <a
                    href="tel:+18005432273"
                    className="hover:underline text-white font-medium">
                    +1 (800) 543-CARE
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0 text-white mt-0.5">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span>
                  <strong className="text-white font-semibold block sm:inline">Email:</strong>{" "}
                  <a
                    href="mailto:care@mendly.org"
                    className="hover:underline text-white/95">
                    care@mendly.org
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0 text-white mt-0.5">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <span className="text-white/90">
                  100 Mendly Plaza, Medical Center
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Small Enquiry Form */}
          <div className="flex flex-col sm:col-span-2 lg:col-span-1">
            <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-white/80 mb-4">
              Quick Enquiry
            </span>
            <p className="text-[13px] text-white/85 mb-3 leading-relaxed">
              Have a clinical question? Leave your email and our care team will connect promptly.
            </p>

            {submitted ? (
              <div
                role="status"
                className="bg-white/20 border border-white/40 rounded-xl p-3 text-[13px] text-white flex items-center gap-2 animate-fadeIn">
                <svg
                  className="w-4 h-4 text-white flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Thank you! We will be in touch shortly.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address..."
                  required
                  aria-label="Email for enquiry"
                  className="w-full bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/30 focus:border-white rounded-full py-2 pl-3.5 pr-20 text-[13px] text-white placeholder-white/60 focus:outline-none transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-1 px-3.5 py-1.5 rounded-full bg-white hover:bg-white/90 text-[#075F30] text-[12.5px] font-semibold transition-all duration-200 cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1">
                  <span>Send</span>
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ==================================================================== */}
        {/* BOTTOM ZONE: DrDoctor Style Giant "LifeCare" Wordmark & Meta          */}
        {/* ==================================================================== */}
        <div className="pt-8 border-t border-white/15 flex flex-col">
          {/* Row with Giant LifeCare Wordmark + Back to top */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-4">
            {/* Massive Bold Brand Name matching reference visual balance */}
            <h2
              className="text-white font-extrabold tracking-[-0.04em] leading-none select-none"
              style={{
                fontSize: "clamp(48px, 8.5vw, 118px)",
              }}>
              Mendly
            </h2>

            {/* Back to Top Button */}
            <button
              type="button"
              onClick={scrollToTop}
              className="self-start sm:self-end text-white/75 hover:text-white transition-colors text-xs uppercase tracking-widest flex items-center gap-2 group pb-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
              <span>Back to Top</span>
              <div className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                <svg
                  className="w-3.5 h-3.5 transform group-hover:-translate-y-0.5 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              </div>
            </button>
          </div>

          {/* Copyright & Hospital Details Line (Bottom Aligned like Reference) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-white/70 pt-4 gap-3">
            <p>© Mendly 2026. All rights reserved.</p>
            <p className="font-light tracking-wide">
              Advanced Specialist Care • Clinical Excellence • Emergency Services
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
