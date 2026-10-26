"use client";

import React from "react";
import Image from "next/image";
import { SCENES } from "./scenes";
import { HERO_CONTENT } from "@/content/hero";

export default function ReducedMotionFallback() {
  return (
    <div className="w-full bg-[#0a0f12] text-white">
      {/* Stage 1: Exterior */}
      <section className="relative min-h-[90vh] flex flex-col justify-between p-6 sm:p-12 border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <Image
            src={SCENES[0].imageSrc}
            alt={SCENES[0].alt}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/60" />
        </div>

        <div className="relative z-10 pt-16 flex items-center justify-between">
          <p className="font-mono-hud text-xs tracking-[0.16em] uppercase text-white/80">
            {HERO_CONTENT.coordinates}
          </p>
          <span className="font-mono-hud text-xs text-[#008068] font-bold">01 / 07</span>
        </div>

        <div className="relative z-10 max-w-4xl py-12">
          <p className="font-mono-hud text-xs tracking-[0.2em] uppercase text-[#008068] font-bold mb-4">
            {HERO_CONTENT.scenes.exterior.caption}
          </p>
          <h1 className="font-grotesque text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight uppercase leading-[0.92]">
            {HERO_CONTENT.scenes.exterior.headlinePre}
            <span className="font-serif-accent font-normal italic text-[#008068]">
              {HERO_CONTENT.scenes.exterior.headlineEm}
            </span>
            {HERO_CONTENT.scenes.exterior.headlinePost}
          </h1>
        </div>

        <div className="relative z-10 flex justify-between items-end border-t border-white/10 pt-4">
          <span className="font-mono-hud text-xs text-white/60">ACCESSIBLE STATIC VIEW</span>
          <span className="font-mono-hud text-3xl font-light text-[#008068]">
            {HERO_CONTENT.emergencyFigure}
          </span>
        </div>
      </section>

      {/* Stage 2: Canopy Approach */}
      <section className="relative min-h-[70vh] flex flex-col justify-center p-6 sm:p-12 border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <Image
            src={SCENES[1].imageSrc}
            alt={SCENES[1].alt}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 max-w-3xl">
          <span className="font-mono-hud text-xs text-[#008068] font-bold">02 / 07 &bull; CANOPY ENTRANCE</span>
          <h2 className="font-grotesque text-3xl sm:text-5xl font-bold uppercase mt-3">
            ACCESSIBLE AMBULATORY &amp; VEHICULAR DROP-OFF
          </h2>
        </div>
      </section>

      {/* Stage 3: Sliding Glass Doors */}
      <section className="relative min-h-[70vh] flex flex-col justify-center p-6 sm:p-12 border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <Image
            src={SCENES[2].imageSrc}
            alt={SCENES[2].alt}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 max-w-3xl">
          <span className="font-mono-hud text-xs text-[#008068] font-bold">03 / 07 &bull; AUTOMATIC DOORS</span>
          <h2 className="font-grotesque text-3xl sm:text-5xl font-bold uppercase mt-3">
            SEAMLESS EMERGENCY &amp; ADMISSION PASSAGE
          </h2>
        </div>
      </section>

      {/* Stage 4: Lobby Reception */}
      <section className="relative min-h-[85vh] flex flex-col justify-end p-6 sm:p-12 border-b border-white/10 bg-[#f8f7f4] text-black">
        <div className="absolute inset-0 z-0">
          <Image
            src={SCENES[3].imageSrc}
            alt={SCENES[3].alt}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/40 to-transparent" />
        </div>
        <div className="relative z-10 max-w-3xl pb-8">
          <span className="font-mono-hud text-xs text-[#008068] font-bold">04 / 07 &bull; RECEPTION LOBBY</span>
          <h2 className="font-grotesque text-4xl sm:text-6xl font-bold uppercase mt-2 leading-[0.94] text-black">
            {HERO_CONTENT.scenes.lobby.headlineLine1}{" "}
            <span className="font-serif-accent font-normal italic text-[#008068]">
              {HERO_CONTENT.scenes.lobby.headlineEm}
            </span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-black/75 mt-4 max-w-xl">
            {HERO_CONTENT.scenes.lobby.description}
          </p>
        </div>
      </section>

      {/* Stage 5: Inpatient Bedside Recovery (5th view) */}
      <section className="relative min-h-[85vh] flex flex-col justify-end p-6 sm:p-12 border-b border-white/10 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src={SCENES[4].imageSrc}
            alt={SCENES[4].alt}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/35" />
        </div>
        <div className="relative z-10 max-w-xl pb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-block w-2 h-2 rounded-full bg-[#008068]" />
            <span className="font-mono-hud text-xs text-[#a0e8d8] font-semibold">
              05 / 07 &bull; {HERO_CONTENT.scenes.patientCare.badge}
            </span>
          </div>
          <h2 className="font-grotesque text-4xl sm:text-6xl font-bold uppercase leading-[0.94] text-white">
            {HERO_CONTENT.scenes.patientCare.headlineLine1}
            <br />
            <span className="font-serif-accent font-normal italic text-[#008068]">
              {HERO_CONTENT.scenes.patientCare.headlineEm}
            </span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-white/80 mt-4 max-w-md">
            {HERO_CONTENT.scenes.patientCare.description}
          </p>
        </div>
      </section>

      {/* Stage 6: Inpatient Bed Care */}
      <section className="relative min-h-[85vh] flex flex-col justify-end p-6 sm:p-12 border-b border-white/10 bg-black text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src={SCENES[5].imageSrc}
            alt={SCENES[5].alt}
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Stage 7: Infant Personal Care */}
      <section className="relative min-h-[85vh] flex flex-col justify-end p-6 sm:p-12 bg-black text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src={SCENES[6].imageSrc}
            alt={SCENES[6].alt}
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>
    </div>
  );
}
