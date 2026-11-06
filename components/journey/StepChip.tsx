"use client";

import React from "react";
import { Zap, Check, Phone, MessageSquare, Calendar, FileText } from "lucide-react";

interface StepChipProps {
  label: string;
  icon?: "bolt" | "calendar" | "message" | "phone" | "fileText" | "check";
  isOutcome?: boolean;
  className?: string;
}

export default function StepChip({
  label,
  icon = "bolt",
  isOutcome = false,
  className = "",
}: StepChipProps) {
  const renderIcon = () => {
    switch (icon) {
      case "check":
        return <Check className="w-3.5 h-3.5 text-[#008068] stroke-[2.5]" />;
      case "phone":
        return <Phone className="w-3.5 h-3.5 text-[#008068] stroke-[2.2]" />;
      case "message":
        return <MessageSquare className="w-3.5 h-3.5 text-[#008068] stroke-[2.2]" />;
      case "calendar":
        return <Calendar className="w-3.5 h-3.5 text-[#008068] stroke-[2.2]" />;
      case "fileText":
        return <FileText className="w-3.5 h-3.5 text-[#008068] stroke-[2.2]" />;
      case "bolt":
      default:
        return <Zap className="w-3.5 h-3.5 text-[#008068] fill-[#008068]" />;
    }
  };

  return (
    <div
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border shadow-sm select-none will-change-transform ${
        isOutcome
          ? "bg-[#e8f5e9] border-[#a5d6a7] text-[#008068]"
          : "bg-white border-[#d8e2dc] text-[#1c2e28]"
      } ${className}`}>
      <span className="flex items-center justify-center chip-icon-wrapper">{renderIcon()}</span>
      <span className="text-xs font-semibold tracking-wide whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}
