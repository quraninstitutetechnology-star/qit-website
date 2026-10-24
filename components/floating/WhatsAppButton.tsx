"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, type Locale } from "@/i18n/routing";
import { whatsappLink, getWhatsappMessages } from "@/lib/whatsapp";

/**
 * Floating WhatsApp button (spec §4.3) — fixed bottom-right on EVERY page.
 * Always a perfect CIRCLE at every screen size (Ali's fix, 2026-10-24):
 * previous version switched to a wide pill with text on sm+ screens, which
 * looked stretched/broken. Now: aspect-square + rounded-full, icon centred,
 * responsive size (56px mobile → 64px desktop), no text label (aria-label
 * and title keep it accessible). Pure CSS shine sweep (~3s) + pulsing glow;
 * off under prefers-reduced-motion. Plain wa.me link, per-page message.
 */
export default function WhatsAppButton({ courseTitles }: { courseTitles: Record<string, string> }) {
  const pathname = usePathname();
  const locale = useLocale() as Locale;
  const t = useTranslations("floating");
  const whatsappMessages = getWhatsappMessages(locale);

  let message = whatsappMessages.generic;
  if (pathname === "/") message = whatsappMessages.home;
  else if (pathname === "/pricing") message = whatsappMessages.pricing;
  else if (pathname === "/about") message = whatsappMessages.about;
  else if (pathname.startsWith("/courses/")) {
    const slug = pathname.split("/")[2];
    const title = courseTitles[slug];
    message = title ? whatsappMessages.course(title) : whatsappMessages.courses;
  } else if (pathname === "/courses") message = whatsappMessages.courses;

  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("whatsappAria")}
      title={t("whatsappTitle")}
      className="wa-shine wa-pulse group fixed bottom-4 right-4 z-50 flex aspect-square h-14 w-14 shrink-0 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95 motion-reduce:transform-none sm:bottom-6 sm:right-6 sm:h-16 sm:w-16"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <svg
        viewBox="0 0 32 32"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
        className="block h-7 w-7 shrink-0 sm:h-8 sm:w-8"
      >
        <path d="M16.04 3C9.4 3 4.05 8.35 4.05 14.99c0 2.62.83 5.05 2.25 7.04L4 29l7.2-2.2a11.9 11.9 0 0 0 4.84 1.04h.01c6.63 0 11.98-5.35 11.98-11.99C28.03 8.35 22.67 3 16.04 3Zm0 21.83h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74 1.14 1.2-3.65-.23-.37a9.86 9.86 0 0 1-1.51-5.27c0-5.45 4.44-9.88 9.9-9.88a9.82 9.82 0 0 1 9.88 9.89c0 5.45-4.45 9.88-9.9 9.88Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.1 4.49.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.76-.72 2.25-1.42.49-.7.49-1.29.35-1.42-.15-.13-.27-.2-.57-.35Z" />
      </svg>
      <span className="sr-only">{t("srChat")}</span>
    </a>
  );
}
