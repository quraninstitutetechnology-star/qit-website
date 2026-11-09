import type { Locale } from "@/i18n/routing";
import { courses as enCourses, type Course } from "@/lib/courses";
import { faqs as enFaqs, type Faq } from "@/lib/faqs";
import {
  plans as enPlans,
  comparisonRows as enComparisonRows,
  billingNotes as enBillingNotes,
  currencies as enCurrencies,
  type Plan,
  type Currency,
} from "@/lib/plans";
import { teachers as enTeachers, type Teacher } from "@/lib/teachers";
import * as arData from "./ar";
import * as urData from "./ur";

export interface LocaleData {
  courses: Course[];
  faqs: Faq[];
  plans: Plan[];
  comparisonRows: { label: string; values: [string, string, string] }[];
  billingNotes: string[];
  currencies: Currency[];
  teachers: Teacher[];
}

const enData: LocaleData = {
  courses: enCourses,
  faqs: enFaqs,
  plans: enPlans,
  comparisonRows: enComparisonRows,
  billingNotes: enBillingNotes,
  currencies: enCurrencies,
  teachers: enTeachers,
};

const byLocale: Record<Locale, LocaleData> = {
  en: enData,
  ar: arData as LocaleData,
  ur: urData as LocaleData,
};

export function getCourses(locale: Locale): Course[] {
  return (byLocale[locale] ?? byLocale.en).courses;
}

export function getCourse(locale: Locale, slug: string): Course | undefined {
  return (byLocale[locale] ?? byLocale.en).courses.find((c) => c.slug === slug);
}

export function getFaqs(locale: Locale): Faq[] {
  return (byLocale[locale] ?? byLocale.en).faqs;
}

export function getPlans(locale: Locale): Plan[] {
  return (byLocale[locale] ?? byLocale.en).plans;
}

export function getComparisonRows(locale: Locale) {
  return (byLocale[locale] ?? byLocale.en).comparisonRows;
}

export function getBillingNotes(locale: Locale): string[] {
  return (byLocale[locale] ?? byLocale.en).billingNotes;
}

export function getCurrencies(locale: Locale): Currency[] {
  return (byLocale[locale] ?? byLocale.en).currencies;
}

export function getTeachers(locale: Locale): Teacher[] {
  return (byLocale[locale] ?? byLocale.en).teachers;
}
