export interface FeatureCard {
  icon: "calendar" | "clock24" | "stethoscope" | "dna" | "video" | "activity" | "heartPulse" | "shield";
  title: string;
}

export interface ServiceStep {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  tags: string[];
  features?: string[];
  featureCards: FeatureCard[];
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
    description: "Guidance and care from your first question to your family-building plan.",
    tags: ["Fertility Testing", "Treatment Navigation"],
    features: [
      "Access to top reproductive endocrinologists",
      "Personalized biomarker & hormonal profiling",
    ],
    featureCards: [
      { icon: "stethoscope", title: "Top specialist endocrinologists" },
      { icon: "dna", title: "Biomarker & hormonal testing" },
    ],
    dotColor: "#0284C7",
    image: "/fam-fertility.jpg",
    alt: "Young loving couple smiling together in warm sunlight during family building consultation",
    objectPosition: "center 22%",
    showCta: false,
  },
  {
    id: "maternity",
    stepNumber: "02",
    title: "Maternity & Newborn Care",
    description: "Support through pregnancy, birth and the first weeks at home.",
    tags: ["Prenatal Care", "Postpartum Support"],
    features: [
      "Personalized prenatal & trimester care planning",
      "24/7 direct access to certified nurse midwives",
    ],
    featureCards: [
      { icon: "calendar", title: "Personalized prenatal care" },
      { icon: "clock24", title: "24/7 nurse midwife access" },
    ],
    dotColor: "#059669",
    image: "/fam-maternity.jpg",
    alt: "Expecting mother peacefully resting hands on baby bump in natural daylight",
    objectPosition: "center 25%",
    showCta: false,
  },
  {
    id: "pediatrics",
    stepNumber: "03",
    title: "Parenting & Pediatrics",
    description: "Everyday help for your child's health and your confidence as a parent.",
    tags: ["Pediatric Access", "Child Development"],
    features: [
      "On-demand pediatric telehealth & same-day visits",
      "Cognitive milestone & developmental growth tracking",
    ],
    featureCards: [
      { icon: "video", title: "On-demand pediatric telehealth" },
      { icon: "activity", title: "Developmental milestone tracking" },
    ],
    dotColor: "#6366F1",
    image: "/fam-pediatrics.jpg",
    alt: "Parents joyfully playing with young toddler on cozy rug",
    objectPosition: "center 28%",
    showCta: false,
  },
  {
    id: "midlife",
    stepNumber: "04",
    title: "Menopause & Midlife Health",
    description: "Care for the changes of midlife, from symptoms to long-term health.",
    tags: ["Hormone Guidance", "Longevity Support"],
    features: [
      "Comprehensive hormone & cardiovascular health profiling",
      "Evidence-based menopause & longevity protocols",
    ],
    featureCards: [
      { icon: "heartPulse", title: "Comprehensive hormone profiling" },
      { icon: "shield", title: "Evidence-based longevity care" },
    ],
    dotColor: "#008068",
    image: "/fam-midlife.jpg",
    alt: "Mature couple laughing together in sunlit home during healthy midlife care",
    objectPosition: "center 22%",
    showCta: false,
  },
];
