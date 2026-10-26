/**
 * Content configuration for the Scroll-Driven Cinematic Hero
 * Unified with the clean LifeCare Hospital visual assets and the 5th Inpatient Care section.
 */

export interface HeroContent {
  hospitalName: string;
  tagline: string;
  coordinates: string;
  emergencyBadge: string;
  emergencyFigure: string;
  scrollPrompt: string;
  navLinks: Array<{ label: string; href: string }>;
  ctaText: string;
  ctaHref: string;
  scenes: {
    exterior: {
      id: string;
      sceneNumber: string;
      label: string;
      headlinePre: string;
      headlineEm: string;
      headlinePost: string;
      caption: string;
    };
    canopy: {
      id: string;
      sceneNumber: string;
      label: string;
      signageText: string;
    };
    doors: {
      id: string;
      sceneNumber: string;
      label: string;
      signageText: string;
    };
    lobby: {
      id: string;
      sceneNumber: string;
      label: string;
      headlineLine1: string;
      headlineEm: string;
      description: string;
    };
    patientCare: {
      id: string;
      sceneNumber: string;
      label: string;
      headlineLine1: string;
      headlineEm: string;
      description: string;
      badge: string;
      caption: string;
    };
    surgical: {
      id: string;
      sceneNumber: string;
      sectionNum: string;
      badge: string;
      headlineStart: string;
      headlineEm: string;
      headlineEnd: string;
      caption: string;
    };
    diagnostics: {
      id: string;
      sceneNumber: string;
      label: string;
      headlineStart: string;
      headlineEm: string;
      caption: string;
    };
  };
}

export const HERO_CONTENT: HeroContent = {
  hospitalName: "LIFECARE HOSPITAL",
  tagline: "ADVANCED MEDICAL CENTER",
  coordinates: "LIFECARE HOSPITAL / 27.7172° N / 85.3240° E",
  emergencyBadge: "24/7 EMERGENCY CARE",
  emergencyFigure: "24/7",
  scrollPrompt: "SCROLL TO ENTER",
  navLinks: [
    { label: "DEPARTMENTS", href: "#departments" },
    { label: "SPECIALISTS", href: "#specialists" },
    { label: "SERVICES", href: "#services" },
    { label: "ABOUT", href: "#about" },
  ],
  ctaText: "BOOK ↗",
  ctaHref: "#book",
  scenes: {
    exterior: {
      id: "exterior",
      sceneNumber: "01",
      label: "FACILITY EXTERIOR",
      headlinePre: "YOUR HEALTH, ",
      headlineEm: "OUR GREATEST",
      headlinePost: " PRIORITY.",
      caption: "24/7 EMERGENCY & AMBULATORY CARE",
    },
    canopy: {
      id: "canopy",
      sceneNumber: "02",
      label: "CANOPY APPROACH",
      signageText: "MAIN ENTRANCE",
    },
    doors: {
      id: "doors",
      sceneNumber: "03",
      label: "AUTOMATIC GLASS DOORS",
      signageText: "ENTRANCE",
    },
    lobby: {
      id: "lobby",
      sceneNumber: "04",
      label: "CENTRAL RECEPTION ATRIUM",
      headlineLine1: "WELCOME TO",
      headlineEm: "LIFECARE.",
      description:
        "A sanctuary of modern healing, where world-class clinical expertise meets heartfelt patient support.",
    },
    patientCare: {
      id: "patientCare",
      sceneNumber: "05",
      label: "INPATIENT CARE & RECOVERY",
      headlineLine1: "CARE DESIGNED",
      headlineEm: "AROUND YOU.",
      description:
        "Dedicated clinicians and attentive bedside care, delivering comfort and dignity at every stage of recovery.",
      badge: "BEDSIDE EXCELLENCE",
      caption: "INPATIENT CARE / 24-HOUR MONITORING / DEDICATED RECOVERY",
    },
    surgical: {
      id: "surgical",
      sceneNumber: "06",
      sectionNum: "02",
      badge: "SPECIALIST CARE",
      headlineStart: "MEDICINE BECOMES ",
      headlineEm: "POWERFUL",
      headlineEnd:
        " WHEN TECHNOLOGY AND HUMAN ATTENTION MOVE TOGETHER.",
      caption: "SURGERY / DIAGNOSTICS / RECOVERY",
    },
    diagnostics: {
      id: "diagnostics",
      sceneNumber: "07",
      label: "PRECISION MEDICINE",
      headlineStart: "CARE THAT STAYS ",
      headlineEm: "AROUND THE CLOCK",
      caption: "NEXT-GENERATION MOLECULAR & MRI DIAGNOSTICS",
    },
  },
};
