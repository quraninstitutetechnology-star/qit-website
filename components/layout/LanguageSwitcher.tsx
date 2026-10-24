"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter, routing, type Locale } from "@/i18n/routing";

/**
 * Language toggle (added 2026-10-24 at Ali's request) — a pill button in
 * the header showing a globe + the current language; opens a dropdown
 * with English / العربية / اردو, each labelled in its own script.
 * Switching keeps the visitor on the same page (path-preserving).
 */
const languageNames: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
  ur: "اردو",
};

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("language");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open ]);

  const choose = (next: Locale) => {
    setOpen(false);
    if (next !== locale) router.replace(pathname, { locale: next });
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`${t("label")}: ${languageNames[locale]}`}
        className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border-2 border-brand-green/20 bg-white px-2.5 py-2 text-sm font-bold text-brand-dark shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gold hover:text-brand-green active:scale-[0.97] motion-reduce:transform-none sm:min-h-[44px] sm:px-3.5"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="shrink-0 text-brand-green">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span className="hidden min-[480px]:inline">{languageNames[locale]}</span>
        <span aria-hidden="true" className={`text-[10px] text-gold-dark transition-transform duration-300 ${open ? "rotate-180" : ""}`}>▾</span>
      </button>
      {open && (
        <ul
          role="listbox"
          aria-label={t("choose")}
          className="absolute end-0 top-[calc(100%+8px)] z-50 w-44 overflow-hidden rounded-2xl bg-white py-1.5 shadow-lift ring-1 ring-brand-green/10"
        >
          {routing.locales.map((l) => {
            const active = l === locale;
            return (
              <li key={l} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => choose(l)}
                  className={`flex min-h-[44px] w-full items-center justify-between px-4 py-2.5 text-sm font-semibold transition-colors ${
                    active ? "bg-brand-light text-brand-green" : "text-brand-dark hover:bg-cream"
                  }`}
                >
                  <span lang={l} dir={l === "en" ? "ltr" : "rtl"}>{languageNames[l]}</span>
                  {active && <span aria-hidden="true" className="font-bold text-gold-dark">✓</span>}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
