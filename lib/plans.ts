export type CurrencyCode = "PKR" | "USD" | "GBP";

export interface Currency {
  code: CurrencyCode;
  label: string;
  symbol: string;
  /** Placeholder price text — NEVER a real or competitor price (spec §1 #3). */
  placeholder: string;
}

export const currencies: Currency[] = [
  { code: "PKR", label: "PKR — Pakistan", symbol: "Rs", placeholder: "Rs —" },
  { code: "USD", label: "USD — USA", symbol: "$", placeholder: "$ —" },
  { code: "GBP", label: "GBP — UK", symbol: "£", placeholder: "£ —" },
];

export interface Plan {
  name: string;
  classesPerWeek: number;
  minutesPerClass: number;
  classesPerMonth: number;
  popular?: boolean;
  /** Monthly price per currency with discount display (Ali 2026-10-26:
      "was" shows struck-through, "now" is the charged price). USD ladder
      30→22 · 60→44 · 90→66 set by Ali; PKR/GBP mirror the same pattern. */
  prices: Record<CurrencyCode, { was: string; now: string }>;
  features: string[];
}

/** Structural plan defaults (spec §7). Prices are placeholders in `currencies`. */
export const plans: Plan[] = [
  {
    name: "Basic",
    classesPerWeek: 3,
    minutesPerClass: 30,
    classesPerMonth: 12,
    prices: { PKR: { was: "10,000", now: "8,000" }, USD: { was: "30", now: "22" }, GBP: { was: "25", now: "18" } },
    features: [
      "3 classes per week (12 / month)",
      "30 minutes per class",
      "Private 1-to-1 teacher",
      "Monthly progress report",
      "Flexible rescheduling*", // TODO_CONFIRM: Ali to confirm rescheduling policy
    ],
  },
  {
    name: "Standard",
    classesPerWeek: 5,
    minutesPerClass: 30,
    classesPerMonth: 20,
    popular: true,
    prices: { PKR: { was: "20,000", now: "16,000" }, USD: { was: "60", now: "44" }, GBP: { was: "50", now: "37" } },
    features: [
      "5 classes per week (20 / month)",
      "30 minutes per class",
      "Private 1-to-1 teacher",
      "Monthly progress report",
      "Flexible rescheduling*", // TODO_CONFIRM
      "Best for steady Hifz & Tajweed progress",
    ],
  },
  {
    name: "Premium",
    classesPerWeek: 5,
    minutesPerClass: 45,
    classesPerMonth: 20,
    prices: { PKR: { was: "25,000", now: "20,000" }, USD: { was: "90", now: "66" }, GBP: { was: "75", now: "55" } },
    features: [
      "5 classes per week (20 / month)",
      "45 minutes per class — longer lessons",
      "Private 1-to-1 teacher",
      "Monthly progress report",
      "Flexible rescheduling*", // TODO_CONFIRM
      "Ideal for Hifz, Ijazah & Tafsir",
    ],
  },
];

/** Comparison table rows (spec §7). */
export const comparisonRows: { label: string; values: [string, string, string] }[] = [
  { label: "Classes per week", values: ["3", "5", "5"] },
  { label: "Minutes per class", values: ["30", "30", "45"] },
  { label: "Classes per month", values: ["12", "20", "20"] },
  { label: "Private 1-to-1 teacher", values: ["✓", "✓", "✓"] },
  { label: "Male or female teacher choice", values: ["✓", "✓", "✓"] },
  { label: "Monthly progress report", values: ["✓", "✓", "✓"] },
  { label: "Completion certificate", values: ["✓", "✓", "✓"] },
  { label: "Rescheduling / makeup classes", values: ["TODO", "TODO", "TODO"] }, // TODO_CONFIRM: policy
];

/** Billing notes (spec §7) — every line is TODO_CONFIRM until Ali approves the policy. */
export const billingNotes: string[] = [
  "Fees are paid monthly in advance.",
  "You can pause or cancel your plan — please see the Refund Policy page for the current terms.",
  "Missed classes can be made up according to the makeup policy — ask us on WhatsApp for details.",
  "Payment methods: please ask on WhatsApp — details are confirmed at enrolment.",
];
