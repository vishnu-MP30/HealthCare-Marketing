export interface ReadArticle {
  id: string;
  title: string;
  image: string;
  href: string;
  tab: string;
}

export interface ReadTab {
  id: string;
  label: string;
}

export const HEALTH_READ_TABS: ReadTab[] = [
  { id: "heart-health", label: "Heart Health" },
  { id: "women-child", label: "Women and Child" },
  { id: "mental-wellbeing", label: "Mental Wellbeing" },
  { id: "nutrition", label: "Nutrition" },
  { id: "fitness", label: "Fitness" },
];

export const HEALTH_READS_DATA: ReadArticle[] = [
  // Heart Health
  {
    id: "heart-1",
    tab: "heart-health",
    title: "Daily Habits for a Healthy Heart",
    image: "/reads/heart-1.jpg",
    href: "#",
  },
  {
    id: "heart-2",
    tab: "heart-health",
    title: "Understanding Your Blood Pressure",
    image: "/reads/heart-2.jpg",
    href: "#",
  },
  {
    id: "heart-3",
    tab: "heart-health",
    title: "When Chest Pain Needs Care",
    image: "/reads/heart-3.jpg",
    href: "#",
  },
  {
    id: "heart-4",
    tab: "heart-health",
    title: "Preparing for a Heart Check-Up",
    image: "/reads/heart-4.jpg",
    href: "#",
  },

  // Women and Child
  {
    id: "women-child-1",
    tab: "women-child",
    title: "Prenatal Care & Milestones",
    image: "/reads/women-child-1.jpg",
    href: "#",
  },
  {
    id: "women-child-2",
    tab: "women-child",
    title: "Essential Infant Vaccines",
    image: "/reads/women-child-2.jpg",
    href: "#",
  },
  {
    id: "women-child-3",
    tab: "women-child",
    title: "Postpartum Care for Mothers",
    image: "/reads/women-child-3.jpg",
    href: "#",
  },
  {
    id: "women-child-4",
    tab: "women-child",
    title: "Gentle Routines for Baby Sleep",
    image: "/reads/women-child-4.jpg",
    href: "#",
  },

  // Mental Wellbeing
  {
    id: "mind-1",
    tab: "mental-wellbeing",
    title: "Daily Habits to Ease Stress",
    image: "/reads/mind-1.jpg",
    href: "#",
  },
  {
    id: "mind-2",
    tab: "mental-wellbeing",
    title: "Sleep & Emotional Wellbeing",
    image: "/reads/mind-2.jpg",
    href: "#",
  },
  {
    id: "mind-3",
    tab: "mental-wellbeing",
    title: "Gentle Ways to Ease Anxiety",
    image: "/reads/mind-3.jpg",
    href: "#",
  },
  {
    id: "mind-4",
    tab: "mental-wellbeing",
    title: "Mindful Breathing for Calm",
    image: "/reads/mind-4.jpg",
    href: "#",
  },

  // Nutrition
  {
    id: "nutrition-1",
    tab: "nutrition",
    title: "Balanced Family Nutrition",
    image: "/fam-fertility.jpg",
    href: "#",
  },
  {
    id: "nutrition-2",
    tab: "nutrition",
    title: "Foods for Steady Blood Sugar",
    image: "/fam-midlife.jpg",
    href: "#",
  },
  {
    id: "nutrition-3",
    tab: "nutrition",
    title: "Quick Heart-Healthy Meals",
    image: "/reads/heart-1.jpg",
    href: "#",
  },
  {
    id: "nutrition-4",
    tab: "nutrition",
    title: "Hydration Habits for Energy",
    image: "/spec-science.jpg",
    href: "#",
  },

  // Fitness
  {
    id: "fitness-1",
    tab: "fitness",
    title: "Restorative Evening Stretches",
    image: "/dept-orthopaedics.jpg",
    href: "#",
  },
  {
    id: "fitness-2",
    tab: "fitness",
    title: "20-Minute Daily Workouts",
    image: "/dept-cardiology.jpg",
    href: "#",
  },
  {
    id: "fitness-3",
    tab: "fitness",
    title: "Safe Movement for Health",
    image: "/spec-impact.jpg",
    href: "#",
  },
  {
    id: "fitness-4",
    tab: "fitness",
    title: "Daily Walking for Longevity",
    image: "/spec-crosswalk.jpg",
    href: "#",
  },
];
