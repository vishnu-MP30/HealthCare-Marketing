# Interactive Journey Flow Section

The **JourneyFlow** section is an interactive, tabbed careflow pathway diagram built with pure 2D SVG, React, Tailwind CSS, and Lucide icons (no WebGL or Three.js dependencies).

---

## Architecture Overview

```
components/journey/
├── JourneyFlow.tsx         # Master section, autoplay interval & intersection observer
├── SectorRail.tsx          # Left rail (System of Record), FLIP re-ordering & sector cards
├── AutoplayIndicator.tsx   # Progress bar pill & accessible WCAG Play/Pause toggle
├── PathwayCanvas.tsx       # Right canvas (System of Action), SVG connector & horizontal pathway
├── StepChip.tsx            # Pathway step chip with icons (bolt, phone, check, etc.)
├── DecisionNode.tsx        # Decision branch (? Confirmed? -> N/Y branches)
└── PreviewCard.tsx         # Glassmorphic preview cards (form, ticket, chat, voice, outcome)

content/
└── journey.ts              # Decoupled content data model for all clinical sectors
```

---

## 1. How to Edit or Add Sectors

All text, labels, and step progressions are defined in [`content/journey.ts`](../../content/journey.ts).

To update copy or add a new clinical sector:
1. Open [`content/journey.ts`](../../content/journey.ts).
2. Edit or add an object in `JOURNEY_FLOW_DATA.sectors`:
   ```ts
   {
     id: "oncology",
     name: "ONCOLOGY",
     iconName: "activity",
     subject: "Eleanor Vance, 52 · Chemotherapy cycle check",
     meta: "INFUSION SUITE 4 · APPOINTMENT 11:00 AM",
     steps: [ ... ]
   }
   ```

---

## 2. Supported Card Types

`PreviewCard.tsx` renders 6 distinct interactive UI cards:
- **`form`**: Clinical questionnaire/intake form with progress bar and multi-choice options.
- **`ticket`**: Digital clinic pass / barcode appointment confirmation with travel estimates.
- **`chat`**: Two-way SMS / WhatsApp patient engagement dialogue bubbles.
- **`notification`**: In-app push notification with delivery status and step-down failover.
- **`voice`**: AI voice concierge confirmation with audio waveform visualization.
- **`result`**: Clinical outcome summary card with measurable KPI tag (e.g. `+38% ENQUIRY COMPLETION`).

---

## 3. Autoplay & Interaction Tuning

In [`components/journey/JourneyFlow.tsx`](./JourneyFlow.tsx):
- **Rotation speed**: `totalDuration = 4800` (4.8 seconds per sector).
- **Manual pause**: Pauses for 8 seconds when a user manually clicks any sector tab.
- **Viewport detection**: Automatically pauses when less than 35% of the section is visible in the viewport.
