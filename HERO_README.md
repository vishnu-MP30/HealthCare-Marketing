# Althea Aesthetic & Wellness Hero Section

A responsive, accessible, high-performance hero section recreating the Althea reference aesthetic with Next.js, React, Tailwind CSS, HTML5 Canvas, and the Web Audio API.

---

## 1. Visual Architecture & Layers (Bottom to Top)

1. **Layer 0 (Background & Ambient Halos)**:
   - Soft pale gradient (`#F9FAFC` → `#F4F6FB` → `#EBF0F8` → `#FDF8F5`).
   - Radial glow centered behind the character face (`rgba(255, 255, 255, 0.98)` fading to transparent).
   - Warm apricot/orange ambient halo (`rgba(255, 160, 95, 0.35)` with 100px blur).
2. **Layer 1 (Contour Lines Canvas)**:
   - Dynamic HTML5 `<canvas>` rendering 18 concentric squircle topographic loops.
   - Built with Catmull-Rom closed splines converted to hardware-accelerated cubic Bézier curves.
   - Continuous outward motion with linear progression.
   - Double-pass stroke: crisp white primary stroke (1px) with subtle warm apricot glow second pass.
   - Sound reaction: gently pulses line opacity/brightness in sync with ambient audio.
3. **Layer 2 (Center Glow Mask)**:
   - Radial CSS gradient washing out contour lines as they cross her facial focal point.
4. **Layer 3 (Fixed Center Character)**:
   - High-fidelity transparent WebP of the woman in profile (`public/hero/woman-profile.webp`).
   - Fixed position: `left: 50%`, `transform: translateX(-50%)`, `top: 10%`, `height: 70%` (desktop), `62%` (tablet), `58%` (mobile).
   - Never moves, scales, parallaxes, or follows cursor.
   - Bottom edge feathered with a gradient mask so the neck and shoulders fade into the background behind the headline.
5. **Layer 4 (Typography & CTA)**:
   - Editorial Serif Headline: *"Subtle care. Visible confidence."* in `Instrument Serif`, tightly tracked.
   - Subtitle: *"Modern aesthetic and wellness care, with a gentle and personal approach."* in sans-serif.
   - Pill CTA: *"Start your journey"* in warm radiant orange (`#E05D26`), lifting to 1.03 scale on hover.
6. **Layer 5 (Navbar & Audio Control)**:
   - Left: handwritten script logo *"Althea"* in `Dancing Script`.
   - Center: `About`, `Services`, `Journal`, `Contact`.
   - Right: White pill button *"Book a consultation"*, lifting 2px on hover.
   - Mobile: collapsible hamburger navigation drawer.
   - Bottom-Left: 60px circular *"Experience with sound"* button with morphing sine-wave icon and Web Audio playback.
7. **Loader**:
   - Initial 0 → 100 counter on background over 1.3s before revealing the scene.

---

## 2. Asset File Locations

| Asset | Path | Description |
|---|---|---|
| **Center Character** | [`public/hero/woman-profile.webp`](file:///c:/Users/ACER/Downloads/marketing_web/public/hero/woman-profile.webp) | Transparent 928×1228 RGBA image of woman in profile |
| **Ambient Audio** | [`public/audio/althea-ambient.mp3`](file:///c:/Users/ACER/Downloads/marketing_web/public/audio/althea-ambient.mp3) | Peaceful looping soundscape for the Experience button |

---

## 3. Tunable Numbers & Configuration Guide

Open [`components/hero/ContourLinesCanvas.tsx`](file:///c:/Users/ACER/Downloads/marketing_web/components/hero/ContourLinesCanvas.tsx) to adjust contour line parameters:

```ts
// 1. Number of Concentric Rings (default: 18)
const NUM_RINGS = 18; // Increase for denser lines, decrease for sparser lines

// 2. Control Points per Ring (default: 16)
const NUM_POINTS = 16; // 12-16 points around the loop

// 3. Outward Progression Speed (default: 12.0s)
const CYCLE_DURATION = 12.0; // Seconds to expand by 1 full spacing (higher = slower & calmer)

// 4. Ring Spacing (default: 72px)
const BASE_SPACING = 72; // Desktop spacing in px (automatically scales with viewport width)

// 5. Center Coordinates
const cx = width * 0.5;   // 50% horizontal center
const cy = height * 0.39; // 39% vertical focal point (aligned with character cheek/face)

// 6. Squircle Stretch Aspect Ratio (default: 1.35)
const x = cx + r * 1.35 * Math.cos(theta); // 1.35:1 horizontal expansion ratio

// 7. Stroke Color & Opacity
// Pass 1 (Primary White Stroke)
ctx.strokeStyle = `rgba(255, 255, 255, ${(0.68 * ringOpacity).toFixed(3)})`;
// Pass 2 (Warm Apricot / Orange Accent Glow)
ctx.strokeStyle = `rgba(255, 190, 150, ${(0.22 * ringOpacity).toFixed(3)})`;
```

---

## 4. Audio Control Configuration

Open [`components/hero/ExperienceSoundButton.tsx`](file:///c:/Users/ACER/Downloads/marketing_web/components/hero/ExperienceSoundButton.tsx):

- **Fade-in Duration**: `gainNode.gain.linearRampToValueAtTime(0.45, ctx.currentTime + 1.0);` (1.0s)
- **Fade-out Duration**: `gainNode.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.6);` (0.6s)
- **Sine Wave Amplitude**: `amplitude = 5.5;`
- **Sine Wave Frequency**: `frequency = 2.0;` (2 cycles across the 28px width)
- **Sine Wave Speed**: `phaseOffset = (wavePhase / 1.2) * Math.PI * 2;` (1.2s per period)
