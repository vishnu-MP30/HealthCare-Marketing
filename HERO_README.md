# Scroll-Driven "Walk Into the Hospital" Cinematic Hero

This document outlines the architecture, asset configuration, animation tunables, and copy customization for the scroll-driven cinematic hospital hero on the **LifeCare Hospital** marketing website.

---

## 1. Timeline Structure & Camera Choreography

The hero is driven by a single master GSAP `ScrollTrigger` pinned timeline (`scrub: 0.8`), simulating a **2.5D camera dolly-zoom** that moves the user from the exterior driveway, through the entrance canopy and automatic glass doors, into the main atrium, onward into the compassionate inpatient bedside care ward, and forward into specialist surgical and diagnostic care.

| Stage | Range (% of scroll) | Visual Action | Active Scene |
|---|---|---|---|
| **01** | `0% – 15%` | **Exterior Facade**: Wide view with subtle breathing zoom (1.00 → 1.04). Primary headline and "24/7" badge visible. | `01-exterior.jpg` |
| **02** | `15% – 30%` | **Dolly-in #1 (Canopy Approach)**: Exterior scales (1.04 → 2.65) centered on the entrance doors (`transform-origin: 50% 72%`). Seamless crossfade into canopy approach. | `02-canopy.jpg` |
| **03** | `30% – 45%` | **Dolly-in #2 (Sliding Glass Doors)**: Canopy scales (0.95 → 2.15). Automatic sliding doors layer crossfades in with reception desk clearly visible through the glass. | `02-doors.jpg` |
| **04** | `45% – 60%` | **Step Into Reception Atrium**: Doors scale (1.22 → 2.35) parting open. Warm reception lobby lands (`0.95 → 1.05`). Welcome headline reveals: *"WELCOME TO LIFECARE."* | `03-lobby.jpg` |
| **05** | `60% – 76%` | **5th View: Inpatient Bedside Care**: Camera pushes from reception into the recovery ward. Doctor providing bedside attention. Left-aligned spacious white typography: *"CARE DESIGNED AROUND YOU."* | `04-patient-care.jpg` |
| **06** | `76% – 90%` | **Symmetric Full-Bleed Opening (Surgical Care)**: Bedside care smoothly transitions. Centered window expands simultaneously and symmetrically on both left & right sides to full-bleed. Crisp, high-contrast white typography reveals on the left. | `04-surgical-team.webp` |
| **07** | `90% – 100%` | **Light-Section Circular Portal (MRI Diagnostics)**: Background turns warm off-white. Circular mask (`clip-path: circle(0% → 85%)`) opens into the MRI scan suite. Pin releases smoothly into site flow. | `05-diagnostics-mri.webp` |

---

## 2. How to Edit Marketing Copy

All headlines, captions, coordinates, navigation links, and micro-labels are decoupled from the animation code and stored in:

📁 [`content/hero.ts`](file:///c:/Users/ACER/Downloads/Marketing_web/content/hero.ts)

### Example: Modifying the 5th View (Inpatient Care) Copy
```ts
patientCare: {
  id: "patientCare",
  sceneNumber: "05",
  label: "INPATIENT CARE & RECOVERY",
  headlineLine1: "CARE DESIGNED",
  headlineEm: "AROUND YOU.", // Rendered with italic accent
  description: "Dedicated clinicians and attentive bedside care, delivering comfort and dignity at every stage of recovery.",
  badge: "BEDSIDE EXCELLENCE",
  caption: "INPATIENT CARE / 24-HOUR MONITORING / DEDICATED RECOVERY",
}
```

---

## 3. How to Swap or Update Images

All scene images are stored in:

📁 [`public/hero/`](file:///c:/Users/ACER/Downloads/Marketing_web/public/hero/)

- `01-exterior.jpg` — Wide hospital facade
- `02-canopy.jpg` — Approach canopy and modern pillars
- `02-doors.jpg` — Sliding automatic glass entrance
- `03-lobby.jpg` — Warm reception lobby and desk
- `04-patient-care.jpg` — 5th View: Inpatient bedside clinical care
- `04-surgical-team.webp` — Specialist surgical care team
- `05-diagnostics-mri.webp` — Advanced MRI imaging suite

To change image paths, focal points, or default scaling, adjust:

📁 [`components/hero/scenes.ts`](file:///c:/Users/ACER/Downloads/Marketing_web/components/hero/scenes.ts)

---

## 4. How to Tune Scroll Length & Zoom Speeds

Open [`components/hero/ScrollHero.tsx`](file:///c:/Users/ACER/Downloads/Marketing_web/components/hero/ScrollHero.tsx):

- **Scroll Length**:
  - Desktop: `end: "+=720%"` (increase to make scroll slower/more deliberate, decrease for faster progression).
  - Mobile: `end: "+=520%"`.
- **Scrub Inertia**:
  - `scrub: 0.8` (increase to `1.2` for higher smoothness/lag, decrease to `0.4` for snappier response).
