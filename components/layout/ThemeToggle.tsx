"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

/**
 * Dark / light toggle (added 2026-10-24 at Ali's request) — round button
 * in the header beside the language switcher. The actual theme is a
 * `dark` class on <html>, set before paint by the anti-flash script in
 * the locale layout (stored choice, else system preference) and flipped
 * here; the choice is remembered in localStorage ("qit-theme").
 */
export default function ThemeToggle() {
  const t = useTranslations("theme");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("qit-theme", next ? "dark" : "light");
    } catch {
      /* storage unavailable — theme still applies for this visit */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? t("light") : t("dark")}
      title={dark ? t("light") : t("dark")}
      aria-pressed={dark}
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-brand-green/20 bg-white text-brand-dark shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gold hover:text-brand-green active:scale-[0.97] motion-reduce:transform-none sm:h-11 sm:w-11"
    >
      {dark ? (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="text-gold-dark">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-brand-green">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" />
        </svg>
      )}
    </button>
  );
}
