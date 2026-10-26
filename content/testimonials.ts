export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export interface TestimonialSlide {
  id: number;
  items: [TestimonialItem, TestimonialItem];
}

export const TESTIMONIALS_SLIDES: TestimonialSlide[] = [
  {
    id: 0,
    items: [
      {
        id: "t-1",
        quote:
          "I really enjoy interactions with the clients. I know we help people in the community every single day.",
        author: "MALISSA",
        role: "Current Help at Home Caregiver",
        avatar: "/testimonials/avatar-malissa.png",
      },
      {
        id: "t-2",
        quote: "I love working with my client, we are two peas in a pod.",
        author: "KAREN",
        role: "Current Help at Home Caregiver",
        avatar: "/testimonials/avatar-karen.png",
      },
    ],
  },
  {
    id: 1,
    items: [
      {
        id: "t-3",
        quote:
          "It's always nice knowing that you're there to help somebody that can't help themselves.",
        author: "THOMAS",
        role: "Current Help at Home Caregiver",
        avatar: "/testimonials/avatar-thomas.png",
      },
      {
        id: "t-4",
        quote:
          "The longer you are with a client, the more they become like family.",
        author: "NAOMI",
        role: "Current Help at Home Caregiver",
        avatar: "/testimonials/avatar-naomi.png",
      },
    ],
  },
  {
    id: 2,
    items: [
      {
        id: "t-5",
        quote:
          "The compassion and clinical excellence at LifeCare gave my mother her dignity and vitality back. We felt supported every single day.",
        author: "DAVID & SARAH",
        role: "Patient Family & Care Advocates",
        avatar: "/testimonials/avatar-david.png",
      },
      {
        id: "t-6",
        quote:
          "Being part of a care team that truly listens to patients makes every day meaningful. Care starts with genuine human connection.",
        author: "DR. ELENA",
        role: "Chief of Patient Care Services",
        avatar: "/testimonials/avatar-elena.png",
      },
    ],
  },
  {
    id: 3,
    items: [
      {
        id: "t-7",
        quote:
          "Knowing my father receives professional, loving assistance in his own home gives our entire family complete peace of mind.",
        author: "RACHEL",
        role: "Family Caregiver",
        avatar: "/testimonials/avatar-malissa.png",
      },
      {
        id: "t-8",
        quote:
          "The relationship between caregiver and client is built on trust, respect, and deep mutual appreciation. It is truly life-changing.",
        author: "MARCUS",
        role: "Dedicated Support Specialist",
        avatar: "/testimonials/avatar-thomas.png",
      },
    ],
  },
  {
    id: 4,
    items: [
      {
        id: "t-9",
        quote:
          "Every single day brings a chance to make someone feel heard, valued, and safe. That is what healthcare should always be.",
        author: "PATRICIA",
        role: "Senior Care Coordinator",
        avatar: "/testimonials/avatar-karen.png",
      },
      {
        id: "t-10",
        quote:
          "We don't just provide medical assistance; we build lifelong bonds that bring light and joy to our clients and their homes.",
        author: "ALEXA",
        role: "Community Health Nurse",
        avatar: "/testimonials/avatar-naomi.png",
      },
    ],
  },
];
