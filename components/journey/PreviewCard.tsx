"use client";

import React from "react";
import { CardSpec } from "@/content/journey";
import { CheckCircle2, QrCode, Phone, Check, Bell } from "lucide-react";

interface PreviewCardProps {
  card: CardSpec;
  className?: string;
}

export default function PreviewCard({ card, className = "" }: PreviewCardProps) {
  return (
    <div
      className={`relative w-full min-w-0 max-w-none rounded-[24px] p-2.5 sm:p-3 bg-white/40 backdrop-blur-md border border-white/70 shadow-[0_8px_24px_rgba(0,0,0,0.04)] select-none will-change-transform ${className}`}>
      <div className="relative rounded-[18px] bg-white p-3.5 sm:p-4 shadow-2xs border border-[#e8ece9] flex flex-col justify-between min-h-[190px] sm:min-h-[205px]">
        {/* 1. FORM / SURVEY CARD */}
        {card.type === "form" && (
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#1a2e26] tracking-tight">
                {card.title}
              </span>
              <span className="text-[9px] font-mono tracking-wider text-[#60776d] uppercase font-semibold">
                {card.stepIndicator}
              </span>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full h-1.5 bg-[#edf2ef] rounded-full overflow-hidden">
              <div
                className="card-progress-bar h-full bg-[#008068] rounded-full will-change-transform"
                data-percent={card.progressPercent}
                style={{ width: `${card.progressPercent}%` }}
              />
            </div>

            <p className="text-[11px] sm:text-xs font-medium text-[#2d4239] leading-tight">
              {card.question}
            </p>

            {/* Options Checkboxes */}
            <div className="flex flex-col gap-1.5 mt-0.5">
              {card.options.map((opt, idx) => (
                <div
                  key={idx}
                  className={`card-option-row flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-medium ${
                    opt.checked
                      ? "bg-[#e8f5e9] text-[#006b57] border border-[#a5d6a7]/60"
                      : "bg-[#f8faf9] text-[#556960] border border-transparent"
                  }`}>
                  <div
                    className={`card-checkbox-icon w-3.5 h-3.5 rounded flex items-center justify-center border text-[9px] shrink-0 ${
                      opt.checked
                        ? "bg-[#008068] border-[#008068] text-white"
                        : "border-[#c4d1ca] bg-white"
                    }`}>
                    {opt.checked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                  <span className="break-words [overflow-wrap:anywhere]">{opt.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. BOOKING TICKET CARD */}
        {card.type === "ticket" && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between border-b border-[#f0f3f1] pb-2">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded bg-[#008068] text-white text-[9px] font-bold flex items-center justify-center">
                  Lc
                </div>
                <span className="text-[11px] font-bold text-[#1a2e26] truncate">{card.centreName}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[8px] font-mono tracking-wider text-[#7e9187] uppercase">TIME</span>
                <span className="text-[11px] font-bold text-[#1a2e26] font-mono">{card.time}</span>
              </div>
            </div>

            <div>
              <span className="text-[9px] font-mono tracking-widest text-[#008068] uppercase font-bold">
                {card.department}
              </span>
              <h4 className="text-sm font-extrabold text-[#1a2e26] tracking-tight">
                {card.date}
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-1.5 text-[10px] bg-[#f8faf9] p-2 rounded-lg border border-[#edf2ef]">
              <div>
                <p className="text-[8px] font-mono text-[#7e9187] uppercase">WITH</p>
                <p className="font-semibold text-[#1a2e26] truncate">{card.team}</p>
              </div>
              <div>
                <p className="text-[8px] font-mono text-[#7e9187] uppercase">LOCATION</p>
                <p className="font-semibold text-[#1a2e26] truncate">{card.travelTime}</p>
              </div>
            </div>

            {card.hasQr && (
              <div className="card-ticket-qr flex items-center justify-center pt-0.5 text-[#008068]">
                <QrCode className="w-8 h-8 stroke-[1.5]" />
              </div>
            )}
          </div>
        )}

        {/* 3. CHAT / SMS CARD */}
        {card.type === "chat" && (
          <div className="flex flex-col gap-2">
            <div className="card-chat-bubble-in bg-[#f4efe8] text-[#2c3d35] p-2.5 rounded-xl rounded-tl-xs text-[11px] leading-relaxed shadow-2xs">
              {card.incomingText}
            </div>

            <div className="card-chat-bubble-out self-end bg-[#201533] text-white p-2 px-3 rounded-xl rounded-tr-xs text-[11px] font-medium shadow-2xs">
              {card.outgoingText}
            </div>

            <span className="self-end text-[9px] font-mono text-[#8a9990] tracking-wide">
              {card.confirmedTime}
            </span>
          </div>
        )}

        {/* 4. NOTIFICATION CARD */}
        {card.type === "notification" && (
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-2">
              <div className="card-notif-bell w-7 h-7 rounded-lg bg-[#008068] flex items-center justify-center text-white shrink-0 shadow-2xs">
                <Bell className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1a2e26]">{card.appTitle}</span>
                  <span className="text-[9px] font-mono text-[#8a9990]">{card.timeTag}</span>
                </div>
                <p className="text-[11px] text-[#4d6359] leading-snug mt-1 break-words [overflow-wrap:anywhere]">
                  {card.message}
                </p>
              </div>
            </div>

            <div className="card-notif-status bg-[#f0f5f2] px-2 py-1 rounded border border-[#e1ece5] text-[9px] text-[#006b57] font-medium flex items-center gap-1.5 mt-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-[#008068] shrink-0" />
              <span className="break-words [overflow-wrap:anywhere]">{card.deliveryStatus}</span>
            </div>
          </div>
        )}

        {/* 5. VOICE AGENT CARD */}
        {card.type === "voice" && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-[#008068]" />
                <span className="text-xs font-bold text-[#1a2e26]">{card.title}</span>
              </div>
              <span className="text-[9px] font-mono text-[#8a9990]">{card.timeTag}</span>
            </div>

            {/* Audio Waveform */}
            <div className="card-waveform flex items-center justify-center gap-1 py-1 px-2.5 bg-[#f6faf8] rounded-lg border border-[#e8f1ec]">
              {[12, 22, 14, 28, 18, 12, 24, 16, 30, 18, 12].map((h, i) => (
                <span
                  key={i}
                  className="card-waveform-bar w-0.5 rounded-full bg-[#008068]/80 will-change-transform"
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>

            <p className="text-[10px] sm:text-[11px] italic text-[#4a5f55] leading-tight break-words [overflow-wrap:anywhere]">
              {card.quoteText}
            </p>

            <span className="text-[9px] font-mono text-[#008068] font-bold mt-auto">
              {card.statusText}
            </span>
          </div>
        )}

        {/* 6. OUTCOME / RESULT CARD */}
        {card.type === "result" && (
          <div className="flex flex-col justify-between h-full gap-2">
            <div>
              <div className="flex items-center gap-1.5">
                <div className="card-result-check w-6 h-6 rounded-full bg-[#e8f5e9] text-[#008068] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span className="text-xs font-extrabold text-[#1a2e26] leading-tight">
                  {card.title}
                </span>
              </div>

              <p className="text-[10px] sm:text-[11px] text-[#556960] leading-snug mt-1.5 break-words [overflow-wrap:anywhere]">
                {card.description}
              </p>
            </div>

            <div className="pt-2 border-t border-[#edf2ef] flex items-center justify-between mt-auto">
              <span className="text-[8px] font-mono tracking-wider text-[#8a9990] uppercase">
                OUTCOME KPI
              </span>
              <span className="card-result-badge text-[10px] font-mono font-bold text-[#008068] bg-[#e8f5e9] px-2 py-0.5 rounded-full whitespace-nowrap">
                <span
                  className="card-result-counter inline-block"
                  data-prefix={card.counterPrefix || ""}
                  data-target={card.counterTarget || 0}
                  data-suffix={card.counterSuffix || ""}>
                  {card.counterPrefix || ""}{card.dateOrMetric}{card.counterSuffix || ""}
                </span>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
