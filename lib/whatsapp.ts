import { siteConfig } from "./site-config";
import type { Locale } from "@/i18n/routing";

/**
 * Single helper for ALL WhatsApp links on the site.
 * Uses the number from site-config (real number supplied by Ali 2026-10-24).
 */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export interface WhatsappMessages {
  home: string;
  pricing: string;
  courses: string;
  about: string;
  generic: string;
  course: (courseTitle: string) => string;
  plan: (planName: string) => string;
}

/**
 * Prefilled WhatsApp messages per locale (added with AR/UR support
 * 2026-10-24) — the visitor's chosen language, so the academy sees the
 * enquiry in the language the visitor was browsing in.
 */
const messagesByLocale: Record<Locale, WhatsappMessages> = {
  en: {
    home: `Assalamu Alaikum! I want to book a ${siteConfig.trialLabel} at QIT.`,
    pricing: "Assalamu Alaikum! I have a question about QIT fees and plans.",
    courses: "Assalamu Alaikum! I want to know more about QIT courses.",
    about: "Assalamu Alaikum! I want to know more about QIT.",
    generic: "Assalamu Alaikum! I have a question about QIT Quran Academy.",
    course: (courseTitle: string) =>
      `Assalamu Alaikum! I want to book a ${siteConfig.trialLabel} for the "${courseTitle}" course at QIT.`,
    plan: (planName: string) =>
      `Assalamu Alaikum! I want to book a ${siteConfig.trialLabel} and ask about the ${planName} plan at QIT.`,
  },
  ur: {
    home: "السلام علیکم! میں QIT میں مفت آزمائشی کلاس بک کرنا چاہتا/چاہتی ہوں۔",
    pricing: "السلام علیکم! مجھے QIT کی فیس اور پلانز کے بارے میں سوال پوچھنا ہے۔",
    courses: "السلام علیکم! میں QIT کے کورسز کے بارے میں مزید جاننا چاہتا/چاہتی ہوں۔",
    about: "السلام علیکم! میں QIT کے بارے میں مزید جاننا چاہتا/چاہتی ہوں۔",
    generic: "السلام علیکم! مجھے QIT قرآن اکیڈمی کے بارے میں ایک سوال پوچھنا ہے۔",
    course: (courseTitle: string) =>
      `السلام علیکم! میں QIT میں "${courseTitle}" کورس کے لیے مفت آزمائشی کلاس بک کرنا چاہتا/چاہتی ہوں۔`,
    plan: (planName: string) =>
      `السلام علیکم! میں مفت آزمائشی کلاس بک کرنا اور QIT کے ${planName} پلان کے بارے میں پوچھنا چاہتا/چاہتی ہوں۔`,
  },
  ar: {
    home: "السلام عليكم! أريد حجز حصة تجريبية مجانية في QIT.",
    pricing: "السلام عليكم! لدي سؤال حول رسوم وخطط QIT.",
    courses: "السلام عليكم! أريد معرفة المزيد عن دورات QIT.",
    about: "السلام عليكم! أريد معرفة المزيد عن QIT.",
    generic: "السلام عليكم! لدي سؤال حول أكاديمية QIT للقرآن الكريم.",
    course: (courseTitle: string) =>
      `السلام عليكم! أريد حجز حصة تجريبية مجانية لدورة "${courseTitle}" في QIT.`,
    plan: (planName: string) =>
      `السلام عليكم! أريد حجز حصة تجريبية مجانية والسؤال عن خطة ${planName} في QIT.`,
  },
};

export function getWhatsappMessages(locale: Locale): WhatsappMessages {
  return messagesByLocale[locale];
}

/** English messages (kept for EN-only contexts). */
export const whatsappMessages = messagesByLocale.en;
