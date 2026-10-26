"use client";

import React from "react";
import StepChip from "./StepChip";
import PreviewCard from "./PreviewCard";
import { DecisionStep } from "@/content/journey";

interface DecisionNodeProps {
  step: DecisionStep;
}

export default function DecisionNode({ step }: DecisionNodeProps) {
  return (
    <div className="relative flex flex-col items-center w-full min-w-0">
      {/* 1. DECISION HEADER: '?' Circle & Label */}
      <div className="relative flex flex-col items-center justify-center h-12 w-full">
        <span className="text-[9px] font-mono tracking-widest uppercase text-[#008068] font-bold mb-0.5">
          {step.label}
        </span>

        {/* '?' Decision Circle */}
        <div className="decision-node-circle w-7 h-7 rounded-full bg-[#004d40] text-white flex items-center justify-center font-bold text-xs shadow-md border-2 border-white z-20 will-change-transform">
          ?
        </div>

        {/* 'Y' continuation line to next column (Block 3) */}
        <div className="absolute left-[calc(50%+14px)] top-[27px] right-0 flex items-center z-10 pointer-events-none">
          <div className="flex-1 h-[2px] bg-[#9bb8a5]" />
          <span className="px-1.5 py-0.2 rounded-full bg-[#008068] text-white text-[8px] font-bold shadow-2xs shrink-0 mx-1 border border-white">
            Y
          </span>
          <div className="flex-1 h-[2px] bg-[#9bb8a5]" />
        </div>
      </div>

      {/* 2. 'N' BRANCH: Dotted downward connector with 'N' Badge to Voice Agent Backup */}
      <div className="flex flex-col items-center w-full">
        {/* Vertical connector line */}
        <div className="relative flex flex-col items-center my-1.5">
          <div className="connector-vertical w-0 border-l-2 border-dotted border-[#008068]/60 h-6 will-change-transform origin-top" />
          <span className="absolute top-1/2 -translate-y-1/2 px-1 rounded-full bg-white border border-[#008068]/40 text-[8px] font-bold text-[#008068] shadow-2xs z-10">
            N
          </span>
        </div>

        {/* Voice agent chip & card */}
        <div className="w-full flex flex-col items-center">
          <div className="mb-1.5">
            <StepChip
              label={step.noBranch.chipLabel}
              icon={step.noBranch.icon}
              className="text-[10px] py-1 px-2.5"
            />
          </div>
          <div className="w-full">
            <PreviewCard card={step.noBranch.card} />
          </div>
        </div>
      </div>
    </div>
  );
}
