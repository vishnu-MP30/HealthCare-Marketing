"use client";

import React, { useEffect, useRef, useState } from "react";

interface ExperienceSoundButtonProps {
  onSoundToggle?: (isActive: boolean) => void;
}

export default function ExperienceSoundButton({
  onSoundToggle,
}: ExperienceSoundButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [wavePhase, setWavePhase] = useState(0);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Read saved preference from sessionStorage
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("althea_sound_pref");
      if (saved === "true") {
        // We remember user's intent, but browsers require click to play
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Pre-fetch or prepare audio buffer
  useEffect(() => {
    let isMounted = true;
    const loadAudio = async () => {
      try {
        const response = await fetch("/audio/althea-ambient.mp3");
        if (!response.ok) return;
        const arrayBuf = await response.arrayBuffer();
        if (!isMounted) return;

        // Will decode when AudioContext is created
        (window as unknown as { _ambientBuffer?: ArrayBuffer })._ambientBuffer =
          arrayBuf;
      } catch (err) {
        console.warn("Could not pre-load ambient audio:", err);
      }
    };
    loadAudio();

    return () => {
      isMounted = false;
    };
  }, []);

  // Animate sine wave when playing
  useEffect(() => {
    if (!isPlaying) {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      return;
    }

    let start = performance.now();
    const loop = (now: number) => {
      const elapsed = (now - start) / 1000;
      setWavePhase(elapsed);
      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isPlaying]);

  const toggleSound = async () => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        await ctx.resume();
      }

      if (isPlaying) {
        // Fade out over 0.6s
        if (gainNodeRef.current) {
          gainNodeRef.current.gain.cancelScheduledValues(ctx.currentTime);
          gainNodeRef.current.gain.setValueAtTime(
            gainNodeRef.current.gain.value,
            ctx.currentTime
          );
          gainNodeRef.current.gain.linearRampToValueAtTime(
            0.0001,
            ctx.currentTime + 0.6
          );
        }

        setTimeout(() => {
          if (sourceNodeRef.current) {
            try {
              sourceNodeRef.current.stop();
              sourceNodeRef.current.disconnect();
            } catch {}
            sourceNodeRef.current = null;
          }
        }, 650);

        setIsPlaying(false);
        onSoundToggle?.(false);
        try {
          sessionStorage.setItem("althea_sound_pref", "false");
        } catch {}
      } else {
        // Start audio & fade in over 1.0s
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
        masterGain.gain.linearRampToValueAtTime(0.45, ctx.currentTime + 1.0);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Try decoding stored buffer, or synthesize soft harmonic chord drone fallback
        const rawBuf = (
          window as unknown as { _ambientBuffer?: ArrayBuffer }
        )._ambientBuffer;

        let startedBuffer = false;
        if (rawBuf && !audioBufferRef.current) {
          try {
            audioBufferRef.current = await ctx.decodeAudioData(
              rawBuf.slice(0)
            );
          } catch {}
        }

        if (audioBufferRef.current) {
          const src = ctx.createBufferSource();
          src.buffer = audioBufferRef.current;
          src.loop = true;
          src.connect(masterGain);
          src.start(0);
          sourceNodeRef.current = src;
          startedBuffer = true;
        }

        // If buffer is unavailable, fall back to soft harmonic peaceful drone
        if (!startedBuffer) {
          const freqs = [146.83, 220.0, 293.66, 369.99, 440.0]; // D major ambient chord
          freqs.forEach((f, idx) => {
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(f, ctx.currentTime);

            // Subtle slow tremolo
            const lfo = ctx.createOscillator();
            lfo.frequency.setValueAtTime(0.08 + idx * 0.04, ctx.currentTime);
            const lfoGain = ctx.createGain();
            lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
            lfo.connect(lfoGain);
            lfoGain.connect(osc.frequency);
            lfo.start();

            g.gain.setValueAtTime(0.12 / freqs.length, ctx.currentTime);
            osc.connect(g);
            g.connect(masterGain);
            osc.start();
          });
        }

        setIsPlaying(true);
        onSoundToggle?.(true);
        try {
          sessionStorage.setItem("althea_sound_pref", "true");
        } catch {}
      }
    } catch (err) {
      console.warn("Audio interaction error:", err);
    }
  };

  // Generate SVG path: Flat line or Sine wave
  const width = 28;
  const height = 18;
  const midY = height / 2;

  let wavePath = `M 0 ${midY} L ${width} ${midY}`;
  if (isPlaying) {
    const points: string[] = [];
    const numSteps = 40;
    const amplitude = 5.5; // wave height
    const frequency = 2.0; // 2 loops

    for (let i = 0; i <= numSteps; i++) {
      const frac = i / numSteps;
      const x = frac * width;
      // Animated sine wave with moving phase (1.2s per cycle)
      const phaseOffset = (wavePhase / 1.2) * Math.PI * 2;
      const y = midY + Math.sin(frac * Math.PI * 2 * frequency - phaseOffset) * amplitude;
      points.push(`${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`);
    }
    wavePath = points.join(" ");
  }

  return (
    <div className="absolute left-6 md:left-8 bottom-6 md:bottom-8 z-30 flex items-center gap-3.5 select-none pointer-events-auto">
      {/* 60px Circle Button */}
      <button
        type="button"
        onClick={toggleSound}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? "Pause ambient sound" : "Play ambient sound"}
        className="w-[58px] h-[58px] rounded-full bg-white flex items-center justify-center transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_4px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_28px_rgba(235,94,30,0.18),0_2px_8px_rgba(0,0,0,0.06)] hover:scale-[1.04] active:scale-[0.97] cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#E05D26]/40"
      >
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="overflow-visible"
        >
          <path
            d={wavePath}
            fill="none"
            stroke={isPlaying ? "#E05D26" : "#3b3d46"}
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-colors duration-300"
          />
        </svg>
      </button>

      {/* Label beside button */}
      <div className="text-left font-sans text-[14px] leading-tight text-[#767988] font-normal tracking-normal pointer-events-none">
        <span>Experience</span>
        <br />
        <span className="text-[#9ea2b0] text-[13px]">with sound</span>
      </div>
    </div>
  );
}
