export interface ServiceStep {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  tags: string[];
  dotColor: string;
  image: string;
  alt: string;
  objectPosition?: string;
  showCta?: boolean;
}

export const SERVICES: ServiceStep[] = [
  {
    id: "fertility",
    stepNumber: "01",
    title: "Fertility & Family Building",
    // TODO: clinical copy review
    description: "Guidance and care from your first question to your family-building plan.",
    // TODO: clinical copy review
    tags: ["Fertility Testing", "Treatment Navigation", "Care Coordination"],
    dotColor: "#0284C7",
    image: "/fam-fertility.jpg",
    alt: "Young loving couple smiling together in warm sunlight during family building consultation",
    objectPosition: "68% 35%",
    showCta: false,
  },
  {
    id: "maternity",
    stepNumber: "02",
    title: "Maternity & Newborn Care",
    // TODO: clinical copy review
    description: "Support through pregnancy, birth and the first weeks at home.",
    // TODO: clinical copy review
    tags: ["Prenatal Care", "Postpartum Support", "Lactation"],
    dotColor: "#059669",
    image: "/fam-maternity.jpg",
    alt: "Expecting mother peacefully resting hands on baby bump in natural daylight",
    objectPosition: "65% 35%",
    showCta: false,
  },
  {
    id: "pediatrics",
    stepNumber: "03",
    title: "Parenting & Pediatrics",
    // TODO: clinical copy review
    description: "Everyday help for your child's health and your confidence as a parent.",
    // TODO: clinical copy review
    tags: ["Pediatric Access", "Child Development", "Sleep & Feeding"],
    dotColor: "#6366F1",
    image: "/fam-pediatrics.jpg",
    alt: "Parents joyfully playing with young toddler on cozy rug",
    objectPosition: "70% 40%",
    showCta: false,
  },
  {
    id: "midlife",
    stepNumber: "04",
    title: "Menopause & Midlife Health",
    // TODO: clinical copy review
    description: "Care for the changes of midlife, from symptoms to long-term health.",
    // TODO: clinical copy review
    tags: ["Symptom Support", "Hormone Guidance", "Bone & Heart Health"],
    dotColor: "#D97706",
    image: "/fam-midlife.jpg",
    alt: "Mature couple laughing together in sunlit home during healthy midlife care",
    objectPosition: "72% 35%",
    showCta: false,
  },
];
