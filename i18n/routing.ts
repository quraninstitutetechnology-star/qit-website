import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

/**
 * QIT locales — added 2026-10-24 at Ali's request (site launched English-only).
 * English is the default and keeps clean URLs (localePrefix "as-needed"):
 * English /, /courses — Urdu /ur/..., Arabic /ar/...
 */
export const routing = defineRouting({
  locales: ["en", "ar", "ur"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

/** Locales that render right-to-left. */
export const rtlLocales: Locale[] = ["ar", "ur"];

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
