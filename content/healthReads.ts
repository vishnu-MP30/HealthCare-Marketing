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
    title: "7 Daily Habits for a Stronger Heart",
    image: "/reads/heart-1.jpg",
    href: "#",
  },
  {
    id: "heart-2",
    tab: "heart-health",
    title: "Understanding Blood Pressure Numbers",
    image: "/reads/heart-2.jpg",
    href: "#",
  },
  {
    id: "heart-3",
    tab: "heart-health",
    title: "When Chest Pain Needs Emergency Care",
    image: "/reads/heart-3.jpg",
    href: "#",
  },
  {
    id: "heart-4",
    tab: "heart-health",
    title: "How to Prepare for a Heart Check-Up",
    image: "/reads/heart-4.jpg",
    href: "#",
  },

  // Women and Child
  {
    id: "women-child-1",
    tab: "women-child",
    title: "A Guide to Healthy Pregnancy Check-Ups",
    image: "/reads/women-child-1.jpg",
    href: "#",
  },
  {
    id: "women-child-2",
    tab: "women-child",
    title: "Vaccines Your Child Needs in the First Year",
    image: "/reads/women-child-2.jpg",
    href: "#",
  },
  {
    id: "women-child-3",
    tab: "women-child",
    title: "Easing Back Into Life After Delivery",
    image: "/reads/women-child-3.jpg",
    href: "#",
  },
  {
    id: "women-child-4",
    tab: "women-child",
    title: "Simple Ways to Support Your Baby's Sleep",
    image: "/reads/women-child-4.jpg",
    href: "#",
  },

  // Mental Wellbeing
  {
    id: "mind-1",
    tab: "mental-wellbeing",
    title: "5 Calming Habits to Reduce Daily Stress",
    image: "/reads/mind-1.jpg",
    href: "#",
  },
  {
    id: "mind-2",
    tab: "mental-wellbeing",
    title: "Sleep and Mental Health: What the Research Says",
    image: "/reads/mind-2.jpg",
    href: "#",
  },
  {
    id: "mind-3",
    tab: "mental-wellbeing",
    title: "How to Talk to a Loved One About Anxiety",
    image: "/reads/mind-3.jpg",
    href: "#",
  },
  {
    id: "mind-4",
    tab: "mental-wellbeing",
    title: "Mindful Breathing You Can Do in 3 Minutes",
    image: "/reads/mind-4.jpg",
    href: "#",
  },

  // Nutrition
  {
    id: "nutrition-1",
    tab: "nutrition",
    title: "Building a Balanced Plate for the Whole Family",
    image: "/fam-fertility.jpg",
    href: "#",
  },
  {
    id: "nutrition-2",
    tab: "nutrition",
    title: "Foods That Support Healthy Blood Sugar",
    image: "/fam-midlife.jpg",
    href: "#",
  },
  {
    id: "nutrition-3",
    tab: "nutrition",
    title: "Easy Heart-Healthy Meals for Busy Weeks",
    image: "/reads/heart-1.jpg",
    href: "#",
  },
  {
    id: "nutrition-4",
    tab: "nutrition",
    title: "How Much Water Do You Really Need?",
    image: "/spec-science.jpg",
    href: "#",
  },

  // Fitness
  {
    id: "fitness-1",
    tab: "fitness",
    title: "8 Gentle Stretches to Do Before Bed",
    image: "/dept-orthopaedics.jpg",
    href: "#",
  },
  {
    id: "fitness-2",
    tab: "fitness",
    title: "A 20-Minute Workout for Busy Days",
    image: "/dept-cardiology.jpg",
    href: "#",
  },
  {
    id: "fitness-3",
    tab: "fitness",
    title: "How to Exercise Safely With Diabetes",
    image: "/spec-impact.jpg",
    href: "#",
  },
  {
    id: "fitness-4",
    tab: "fitness",
    title: "Walking for Health: How Far Is Enough?",
    image: "/spec-crosswalk.jpg",
    href: "#",
  },
];
