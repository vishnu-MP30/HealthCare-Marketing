"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { TESTIMONIALS_SLIDES, TestimonialSlide } from "@/content/testimonials";

/**
 * ============================================================================
 * TESTIMONIALS SECTION
 * ============================================================================
 * Matches the user's reference images (slides 1 & 2) and uses the user's 3rd
 * uploaded wide banner image (caregiver & elderly woman on the left, soft
 * sage-green botanical background on the right) with floating white overlay
 * testimonial cards, signature plum quotation marks, caregiver avatars,
 * and 5-dot pagination.
 */

export default function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = TESTIMONIALS_SLIDES.length;

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentSlide) return;
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    },
    [isTransitioning, currentSlide]
  );

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % totalSlides);
  }, [currentSlide, totalSlides, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
  }, [currentSlide, totalSlides, goToSlide]);

  // Auto-advance every 6 seconds (pauses on hover)
  useEffect(() => {
    timerRef.current = setInterval(() => {
      goToSlide((currentSlide + 1) % totalSlides);
    }, 6500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentSlide, totalSlides, goToSlide]);

  // Touch swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  const activeSlideData: TestimonialSlide = TESTIMONIALS_SLIDES[currentSlide];

  return (
    <section
      id="testimonials"
      aria-label="Client and Caregiver Testimonials"
      className="testimonials-section relative w-full bg-[#FAF8F5] py-14 sm:py-20 overflow-hidden"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Banner Container with 3rd Uploaded Image as Background */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_16px_50px_rgba(0,0,0,0.06)] bg-[#EBF4EE] border border-black/[0.04]"
          style={{
            minHeight: "500px",
          }}
        >
          {/* Desktop/Tablet Background Graphic */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-no-repeat pointer-events-none"
            style={{
              backgroundImage: "url('/testimonials/testimonial-bg.png')",
              backgroundPosition: "left center",
            }}
            aria-hidden="true"
          />

          {/* Subtle mobile gradient overlay for pristine contrast */}
          <div
            className="block lg:hidden absolute inset-0 bg-gradient-to-b from-transparent via-[#EBF4EE]/85 to-[#EBF4EE] pointer-events-none"
            aria-hidden="true"
          />

          {/* Inner Content Grid: Left side reserved for Caregiver Image, Right side for Cards */}
          <div className="relative z-10 w-full min-h-[500px] flex flex-col justify-center">
            <div className="w-full flex flex-col lg:flex-row items-center">
              {/* Left Column Spacer (Keeps the Caregiver & Patient completely visible) */}
              <div className="w-full lg:w-[42%] xl:w-[44%] h-[240px] sm:h-[300px] lg:h-full flex-shrink-0" />

              {/* Right Column: Overlay Testimonial Cards & Navigation */}
              <div className="w-full lg:w-[58%] xl:w-[56%] px-5 sm:px-8 lg:pr-10 lg:pl-4 py-8 lg:py-12 flex flex-col justify-center">
                {/* 2 Testimonial Cards Side-by-Side */}
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 transition-all duration-300 ease-out ${
                    isTransitioning
                      ? "opacity-0 translate-y-2 scale-[0.99]"
                      : "opacity-100 translate-y-0 scale-100"
                  }`}
                >
                  {activeSlideData.items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-[4px] p-6 sm:p-7 shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-black/[0.03] flex flex-col justify-between min-h-[220px] sm:min-h-[240px] transition-transform duration-300 hover:-translate-y-1"
                    >
                      {/* Top: Signature Quotation Marks & Quote */}
                      <div>
                        {/* Quotation Icon: Deep Plum / Purple as in Reference */}
                        <div className="text-[#8A246B] mb-3 leading-none select-none">
                          <svg
                            className="w-8 h-8 fill-current"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                          </svg>
                        </div>

                        {/* Quote Text */}
                        <p className="text-[#2D3748] text-[15px] sm:text-[15.5px] leading-[1.55] font-normal">
                          {item.quote}
                        </p>
                      </div>

                      {/* Bottom Footer: Author & Role on Left, Avatar on Right */}
                      <div className="flex items-center justify-between mt-6 pt-3 border-t border-gray-100/70">
                        <div className="pr-3">
                          <h4 className="text-[13px] sm:text-[13.5px] font-bold text-[#1A202C] tracking-wide uppercase">
                            —{item.author}
                          </h4>
                          <p className="text-[11.5px] sm:text-[12px] text-[#4A5568] leading-tight mt-0.5 font-medium">
                            {item.role}
                          </p>
                        </div>

                        {/* Circular Avatar */}
                        <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0 shadow-sm border border-gray-200/80 bg-gray-100">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.avatar}
                            alt={item.author}
                            width={48}
                            height={48}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Carousel Pagination Controls */}
                <div className="mt-8 flex items-center justify-center gap-2 select-none">
                  {/* Prev Button */}
                  <button
                    type="button"
                    onClick={prevSlide}
                    aria-label="Previous testimonials slide"
                    className="p-1.5 rounded-full text-gray-400 hover:text-[#8A246B] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8A246B]"
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </button>

                  {/* 5 Dots exactly as shown in the reference */}
                  <div className="flex items-center gap-2 px-1">
                    {TESTIMONIALS_SLIDES.map((slide, idx) => {
                      const isActive = idx === currentSlide;
                      return (
                        <button
                          key={slide.id}
                          type="button"
                          onClick={() => goToSlide(idx)}
                          aria-label={`Go to slide ${idx + 1}`}
                          className={`
                            h-2.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8A246B] cursor-pointer
                            ${
                              isActive
                                ? "w-6 bg-[#8A246B] shadow-sm"
                                : "w-2.5 bg-[#CBD5E1] hover:bg-[#94A3B8]"
                            }
                          `}
                        />
                      );
                    })}
                  </div>

                  {/* Next Button */}
                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next testimonials slide"
                    className="p-1.5 rounded-full text-gray-400 hover:text-[#8A246B] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8A246B]"
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
