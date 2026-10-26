/**
 * Data model and content configuration for the Interactive Journey Flow Section.
 * Decoupled data model with 4 distinct healthcare sectors, each with exactly 3 blocks.
 */

export type CardType = "form" | "ticket" | "chat" | "notification" | "voice" | "result";

export interface FormCardSpec {
  type: "form";
  title: string;
  stepIndicator: string;
  progressPercent: number;
  question: string;
  options: Array<{ label: string; checked?: boolean }>;
}

export interface TicketCardSpec {
  type: "ticket";
  centreName: string;
  badgeText: string;
  time: string;
  department: string;
  date: string;
  team: string;
  travelTime: string;
  hasQr: boolean;
}

export interface ChatCardSpec {
  type: "chat";
  incomingText: string;
  outgoingText: string;
  confirmedTime: string;
}

export interface NotificationCardSpec {
  type: "notification";
  appTitle: string;
  timeTag: string;
  message: string;
  deliveryStatus: string;
}

export interface VoiceCardSpec {
  type: "voice";
  title: string;
  timeTag: string;
  quoteText: string;
  statusText: string;
}

export interface ResultCardSpec {
  type: "result";
  title: string;
  dateOrMetric: string;
  description: string;
  counterTarget?: number;
  counterSuffix?: string;
  counterPrefix?: string;
}

export type CardSpec =
  | FormCardSpec
  | TicketCardSpec
  | ChatCardSpec
  | NotificationCardSpec
  | VoiceCardSpec
  | ResultCardSpec;

export type StepKind = "chip" | "decision" | "outcome";

export interface RegularStep {
  kind: "chip";
  id: string;
  label: string;
  icon: "bolt" | "calendar" | "message" | "phone" | "fileText" | "check";
  card: CardSpec;
}

export interface DecisionStep {
  kind: "decision";
  id: string;
  label: string; // e.g. "Confirmed?"
  noBranch: {
    chipLabel: string;
    icon: "phone" | "message";
    card: CardSpec;
  };
  yesBranchLabel: string;
}

export interface OutcomeStep {
  kind: "outcome";
  id: string;
  label: string;
  icon: "check";
  card: ResultCardSpec;
}

export type Step = RegularStep | DecisionStep | OutcomeStep;

export interface Sector {
  id: string;
  name: string;
  iconName: "home" | "userCheck" | "activity" | "video";
  subject: string;
  meta: string;
  steps: [Step, Step, Step]; // Exactly 3 blocks per sector
}

export const JOURNEY_FLOW_DATA: {
  systemOfRecordLabel: string;
  systemOfActionLabel: string;
  sectionEyebrow: string;
  sectionTitle: string;
  sectionHighlight: string;
  sectors: Sector[];
} = {
  systemOfRecordLabel: "THE SYSTEM OF RECORD · LIFECARE EHR",
  systemOfActionLabel: "THE SYSTEM OF ACTION · LIFECARE CAREFLOW",
  sectionEyebrow: "INTELLIGENT HEALTHCARE PATHWAYS",
  sectionTitle: "Connecting clinical intent to ",
  sectionHighlight: "measurable patient outcomes.",
  sectors: [
    {
      id: "primary-care",
      name: "PRIMARY CARE",
      iconName: "home",
      subject: "June Baker, 68 · COPD annual wellness review",
      meta: "COMMUNITY RESPIRATORY · REVIEW SCHEDULED OCT",
      steps: [
        {
          kind: "chip",
          id: "pc-step-1",
          label: "Health check",
          icon: "bolt",
          card: {
            type: "form",
            title: "COPD annual review",
            stepIndicator: "STAGE 1 OF 3",
            progressPercent: 33,
            question: "How has your breathing been lately?",
            options: [
              { label: "Stable, no flare-ups", checked: true },
              { label: "Worse than last month", checked: false },
            ],
          },
        },
        {
          kind: "chip",
          id: "pc-step-2",
          label: "Booked nearby",
          icon: "calendar",
          card: {
            type: "ticket",
            centreName: "LifeCare Health Centre",
            badgeText: "COMMUNITY CLINIC",
            time: "10:15am",
            department: "COMMUNITY RESPIRATORY",
            date: "Wed 22 Oct",
            team: "Respiratory Team",
            travelTime: "10 mins from home",
            hasQr: true,
          },
        },
        {
          kind: "outcome",
          id: "pc-step-3",
          label: "Seen locally",
          icon: "check",
          card: {
            type: "result",
            title: "Reviewed close to home · 22 Oct",
            dateOrMetric: "100%",
            counterTarget: 100,
            counterSuffix: "% ATTENDANCE",
            description: "Completed neighborhood clinic visit, bypassing acute hospital waitlists.",
          },
        },
      ],
    },
    {
      id: "outpatients",
      name: "OUTPATIENTS",
      iconName: "userCheck",
      subject: "Amara Osei, 34 · Cardiology follow-up",
      meta: "TUE 24 OCT · 09:20 · PREVIOUS DNA: 1",
      steps: [
        {
          kind: "chip",
          id: "op-step-1",
          label: "LifeCare App push",
          icon: "message",
          card: {
            type: "notification",
            appTitle: "Appointment reminder",
            timeTag: "08:00",
            message: "Cardiology follow-up: Tue 24 Oct, 9:20am, Level 2. Tap to confirm.",
            deliveryStatus: "Stepping down to automated SMS",
          },
        },
        {
          kind: "decision",
          id: "op-decision",
          label: "Confirmed?",
          yesBranchLabel: "Confirmed via SMS",
          noBranch: {
            chipLabel: "Voice agent backup",
            icon: "phone",
            card: {
              type: "voice",
              title: "Voice concierge",
              timeTag: "now",
              quoteText: "\"Hi Amara, automated reminder for Tuesday.\" Confirmed by voice.",
              statusText: "Voice confirmed · 100% reach",
            },
          },
        },
        {
          kind: "outcome",
          id: "op-step-3",
          label: "Attended",
          icon: "check",
          card: {
            type: "result",
            title: "Attended · checked in 09:12",
            dateOrMetric: "+38%",
            counterTarget: 38,
            counterPrefix: "+",
            counterSuffix: "% COMPLETION",
            description: "Zero non-attendance. Multi-channel confirmation prevented clinic drop-off.",
          },
        },
      ],
    },
    {
      id: "surgery",
      name: "SURGERY",
      iconName: "activity",
      subject: "Derek Whitmore, 58 · Knee replacement pre-op",
      meta: "SURGICAL THEATER 3 · ADMISSION DUE NOV",
      steps: [
        {
          kind: "chip",
          id: "sg-step-1",
          label: "Pre-assessment check",
          icon: "fileText",
          card: {
            type: "form",
            title: "Pre-op checklist",
            stepIndicator: "STAGE 1 OF 3",
            progressPercent: 66,
            question: "Have you stopped anti-inflammatory meds?",
            options: [
              { label: "Yes, 7 days ago", checked: true },
              { label: "No, need clinical advice", checked: false },
            ],
          },
        },
        {
          kind: "chip",
          id: "sg-step-2",
          label: "Admission pass",
          icon: "calendar",
          card: {
            type: "ticket",
            centreName: "LifeCare Surgical Pavilion",
            badgeText: "ELECTIVE SURGERY",
            time: "07:30am",
            department: "ORTHOPEDIC SUITE",
            date: "Mon 03 Nov",
            team: "Joint Care Team",
            travelTime: "North Gate entrance",
            hasQr: true,
          },
        },
        {
          kind: "outcome",
          id: "sg-step-3",
          label: "Surgery prepared",
          icon: "check",
          card: {
            type: "result",
            title: "0% Day-of-Surgery Delays",
            dateOrMetric: "100%",
            counterTarget: 100,
            counterSuffix: "% PRE-OP COMPLIANCE",
            description: "Lab work and fasting confirmed digitally 48 hours prior to theatre.",
          },
        },
      ],
    },
    {
      id: "telehealth",
      name: "VIRTUAL CARE",
      iconName: "video",
      subject: "David Brooks, 71 · Remote pulmonary recovery",
      meta: "VIRTUAL TELEMETRY WARD · 24/7 ACTIVE",
      steps: [
        {
          kind: "chip",
          id: "th-step-1",
          label: "Vitals sync",
          icon: "bolt",
          card: {
            type: "notification",
            appTitle: "Biometric sync",
            timeTag: "08:15am",
            message: "Pulse Ox: 98% · HR: 68 BPM. All within safe threshold.",
            deliveryStatus: "Logged to Registry · Normal range",
          },
        },
        {
          kind: "chip",
          id: "th-step-2",
          label: "Video consult",
          icon: "calendar",
          card: {
            type: "ticket",
            centreName: "Virtual Recovery Suite",
            badgeText: "TELEMETRY CHECK",
            time: "02:00pm",
            department: "POST-ACUTE CARE",
            date: "Thu 26 Oct",
            team: "Dr. Sarah Lin",
            travelTime: "Home video portal",
            hasQr: false,
          },
        },
        {
          kind: "outcome",
          id: "th-step-3",
          label: "Discharged safely",
          icon: "check",
          card: {
            type: "result",
            title: "Safe In-Home Recovery · 26 Oct",
            dateOrMetric: "-4.2",
            counterTarget: 4.2,
            counterPrefix: "-",
            counterSuffix: " DAYS AVERAGE STAY",
            description: "Recovered faster at home with continuous telemetry and virtual physician oversight.",
          },
        },
      ],
    },
  ],
};
