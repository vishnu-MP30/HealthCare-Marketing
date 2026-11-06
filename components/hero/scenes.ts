/**
 * Clean scene configurations for the 2.5D camera dolly-zoom hero experience.
 * Using the high-resolution Mendly Hospital assets including the 5th Inpatient Care section.
 */

export interface SceneConfig {
  id: string;
  index: number;
  label: string;
  imageSrc: string;
  alt: string;
  focalPoint: string;
  scaleStart: number;
  scalePeak: number;
}

export const SCENES: SceneConfig[] = [
  {
    id: "exterior",
    index: 1,
    label: "01 / EXTERIOR",
    imageSrc: "/hero/01-exterior.jpg",
    alt: "Mendly Hospital exterior facade with canopy entrance and driveway",
    focalPoint: "50% 72%",
    scaleStart: 1.0,
    scalePeak: 2.65,
  },
  {
    id: "canopy",
    index: 2,
    label: "02 / CANOPY APPROACH",
    imageSrc: "/hero/02-canopy.jpg",
    alt: "Mendly Hospital modern entrance canopy and pillars",
    focalPoint: "50% 66%",
    scaleStart: 0.96,
    scalePeak: 2.15,
  },
  {
    id: "doors",
    index: 3,
    label: "03 / SLIDING DOORS",
    imageSrc: "/hero/02-doors.jpg",
    alt: "Automatic glass sliding doors with Mendly reception visible inside",
    focalPoint: "50% 56%",
    scaleStart: 0.98,
    scalePeak: 2.25,
  },
  {
    id: "lobby",
    index: 4,
    label: "04 / RECEPTION ATRIUM",
    imageSrc: "/hero/03-lobby.jpg",
    alt: "Warm interior reception lobby with wooden desk and Mendly branding",
    focalPoint: "50% 50%",
    scaleStart: 1.0,
    scalePeak: 1.15,
  },
  {
    id: "patientCare",
    index: 5,
    label: "05 / INPATIENT CARE",
    imageSrc: "/hero/04-patient-care.jpg",
    alt: "Doctor providing compassionate bedside care to recovery patient in hospital ward",
    focalPoint: "65% 55%",
    scaleStart: 1.04,
    scalePeak: 1.0,
  },
  {
    id: "surgical",
    index: 6,
    label: "06 / INPATIENT CARE",
    imageSrc: "/hero/04-bed-prep.png",
    alt: "Because care should always feel personal - Inpatient bedside care",
    focalPoint: "50% 50%",
    scaleStart: 1.05,
    scalePeak: 1.0,
  },
  {
    id: "diagnostics",
    index: 7,
    label: "07 / PERSONAL CARE",
    imageSrc: "/hero/05-infant-hand.png",
    alt: "Because care should always feel personal - Tender personal care",
    focalPoint: "50% 50%",
    scaleStart: 1.05,
    scalePeak: 1.0,
  },
];
