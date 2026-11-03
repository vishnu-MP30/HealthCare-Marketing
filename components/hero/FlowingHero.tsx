"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import FlowLinesCanvas from "./FlowLinesCanvas";

export default function FlowingHero() {
  const heroRef = useRef<HTMLElement>(null);
  const subjectWrapperRef = useRef<HTMLDivElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const soundBtnRef = useRef<HTMLButtonElement>(null);

  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [mounted, setMounted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Gutter clamp: clamp(20px, 3.8vw, 72px)
  const gutterStyle = {
    paddingLeft: "clamp(20px, 3.8vw, 72px)",
    paddingRight: "clamp(20px, 3.8vw, 72px)",
  };

  useEffect(() => {
    setMounted(true);

    const onScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const heroH = heroRef.current.offsetHeight || window.innerHeight;
      const progress = Math.min(1, Math.max(0, scrollY / (heroH * 0.6)));

      // Over first 60% of hero height scrolled:
      // headline, subtitle and CTA fade out and blur up to 8px
      if (textGroupRef.current) {
        textGroupRef.current.style.opacity = String(1 - progress);
        textGroupRef.current.style.filter = `blur(${progress * 8}px)`;
        textGroupRef.current.style.transform = `translateY(${-progress * 24}px)`;
      }

      // Subject drifts up by at most 6svh
      if (subjectWrapperRef.current) {
        subjectWrapperRef.current.style.transform = `translate(-50%, ${-progress * 6}vh)`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sync sound button vertically with CTA center line
  useEffect(() => {
    const updateSoundPos = () => {
      if (!ctaRef.current || !soundBtnRef.current || !heroRef.current) return;
      const ctaRect = ctaRef.current.getBoundingClientRect();
      const heroRect = heroRef.current.getBoundingClientRect();
      const ctaCenterFromHeroTop = ctaRect.top + ctaRect.height / 2 - heroRect.top;
      soundBtnRef.current.style.top = `${ctaCenterFromHeroTop}px`;
      soundBtnRef.current.style.transform = "translateY(-50%)";
    };

    updateSoundPos();
    window.addEventListener("resize", updateSoundPos);
    return () => window.removeEventListener("resize", updateSoundPos);
  }, [mounted]);

  // Ambient sound synthesizer using Web Audio API
  const toggleSound = () => {
    if (isPlayingSound) {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.5);
      }
      setIsPlayingSound(false);
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = audioCtxRef.current || new AudioCtx();
      audioCtxRef.current = ctx;

      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 1.2);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Soft harmonic chord (peaceful healthcare meditation drone)
      const freqs = [130.81, 196.0, 261.63, 329.63, 392.0];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.1 + idx * 0.05, ctx.currentTime);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();

        oscGain.gain.setValueAtTime(0.2 / freqs.length, ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();
      });

      setIsPlayingSound(true);
    } catch (e) {
      console.warn("Audio playback not allowed:", e);
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[100svh] overflow-hidden select-none"
      aria-label="LifeCare Personalized Healthcare"
      style={{
        background: "radial-gradient(ellipse 60% 65% at 50% 38%, #F7FBF8 0%, #E5F2E2 45%, #D7EBDC 100%)",
      }}
    >
      {/* ====================================================================
          LAYER 1: WEBGL2 FLOW LINES CANVAS (z-1)
          ==================================================================== */}
      <FlowLinesCanvas
        heroRef={heroRef}
        subjectRef={subjectWrapperRef}
        crossFraction={{ x: 0.5193, y: 0.5044 }}
      />

      {/* ====================================================================
          LAYER 2: CENTER GLOW (z-2)
          Radial soft CSS glow washing out lines as they approach the subject
          ==================================================================== */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background: "radial-gradient(circle at 50% 36%, rgba(255, 255, 255, 0.88) 0%, rgba(255, 255, 255, 0.45) 28%, transparent 66%)",
        }}
        aria-hidden="true"
      />

      {/* ====================================================================
          LAYER 5 (TOP): UI HEADER (3-column grid: 1fr auto 1fr)
          ==================================================================== */}
      <header
        className="relative z-50 w-full pt-6 pb-4 grid grid-cols-[1fr_auto_1fr] items-center"
        style={gutterStyle}
      >
        {/* Left Column: Brand Logo */}
        <div className="flex items-center justify-start">
          <a href="#" className="flex items-center gap-2 group cursor-pointer">
            <span className="w-7 h-7 flex items-center justify-center text-[#0B501C]">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-3H8v-2h3v-3h2v3h3v2h-3v3h-2z" />
              </svg>
            </span>
            <span className="font-sans font-bold text-2xl tracking-tight text-[#1A2A1F]">
              LifeCare
            </span>
          </a>
        </div>

        {/* Center Column: Centered Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-8 lg:gap-10"
          aria-label="Main Navigation"
        >
          {["About", "Services", "Care Plans", "Resources", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="text-[15px] font-sans font-medium text-[#1A2A1F]/80 hover:text-[#0B501C] transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Right Column: CTA Button */}
        <div className="flex items-center justify-end">
          <a
            href="#book"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0B501C] hover:bg-[#083D15] text-white font-sans text-sm font-semibold tracking-wide transition-all duration-200 shadow-sm hover:shadow"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>Book a Consultation</span>
          </a>
        </div>
      </header>

      {/* ====================================================================
          LAYER 3: CENTER SUBJECT (Stethoscope Heart with Glowing Cross & Leaves)
          Centered horizontally at 50% across, top at 2svh below header
          ==================================================================== */}
      <div
        ref={subjectWrapperRef}
        className="absolute left-1/2 -translate-x-1/2 z-[3] pointer-events-none transition-transform duration-300 ease-out will-change-transform"
        style={{
          top: "clamp(74px, 10svh, 96px)",
          height: "clamp(290px, 47svh, 540px)",
          aspectRatio: "569 / 452",
        }}
      >
        <div className="relative w-full h-full hero-subject-anim">
          <Image
            src="/hero/stethoscope-clean.png"
            alt="LifeCare stethoscope forming a heart with glowing cross and leaves"
            fill
            priority
            sizes="(max-width: 768px) 340px, (max-width: 1280px) 480px, 569px"
            className="object-contain"
          />
        </div>
      </div>

      {/* ====================================================================
          LAYER 4: TEXT CONTENT (Headline, Subtitle, Centered Pill CTA)
          Overlaps the lowest 8-10% of the image (tube and leaves)
          ==================================================================== */}
      <div
        ref={textGroupRef}
        className="absolute inset-x-0 z-[4] flex flex-col items-center text-center px-4 pointer-events-auto will-change-transform"
        style={{
          top: "clamp(420px, 54svh, 600px)",
          maxWidth: "1440px",
          margin: "0 auto",
        }}
      >
        {/* Large Editorial Serif Headline */}
        <h1
          className="font-serif text-[#1A2A1F] font-normal tracking-[-0.02em] leading-[1.02] max-w-5xl hero-headline-anim"
          style={{
            fontSize: "clamp(2.4rem, 4.6vw, 5.4rem)",
          }}
        >
          <span>Personalized Care for a </span>
          <span className="text-[#0B501C] font-normal">Healthier You.</span>
        </h1>

        {/* One-Line Subtitle (20-24px below headline) */}
        <p className="mt-5 sm:mt-6 font-sans text-base sm:text-lg lg:text-[1.15rem] text-[#1A2A1F]/75 font-normal max-w-2xl hero-subtitle-anim">
          Comprehensive, compassionate, and modern healthcare for you and your family.
        </p>

        {/* Primary CTA Button (28-32px below subtitle) */}
        <div className="mt-7 sm:mt-8 hero-cta-anim">
          <a
            ref={ctaRef}
            href="#care"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#0B501C] hover:bg-[#083D15] text-white font-sans text-base font-medium tracking-wide transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02] cursor-pointer"
          >
            <span>Explore Our Care</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      {/* ====================================================================
          LAYER 5: "EXPERIENCE WITH SOUND" BUTTON
          Positioned on the left at --gutter and centered vertically with CTA
          ==================================================================== */}
      <button
        ref={soundBtnRef}
        type="button"
        onClick={toggleSound}
        style={{
          left: "clamp(20px, 3.8vw, 72px)",
          top: "84%", // dynamically updated to CTA center line
        }}
        className="absolute z-50 flex items-center gap-3 py-2 px-3.5 rounded-full bg-white/70 hover:bg-white/95 border border-[#1A2A1F]/10 backdrop-blur-md text-[#1A2A1F] text-xs font-sans font-medium transition-all duration-200 shadow-sm cursor-pointer"
        aria-label={isPlayingSound ? "Mute ambient healthcare sound" : "Experience with sound"}
      >
        <span
          className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
            isPlayingSound ? "bg-[#0B501C] text-white" : "bg-[#1A2A1F]/10 text-[#1A2A1F]"
          }`}
        >
          {isPlayingSound ? (
            <svg className="w-3 h-3 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg className="w-3 h-3 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </span>
        <span className="leading-tight text-left">
          {isPlayingSound ? "Sound active" : "Experience\nwith sound"}
        </span>
      </button>
    </section>
  );
}
