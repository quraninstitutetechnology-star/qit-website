"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter, routing, type Locale } from "@/i18n/routing";
import { whatsappLink, getWhatsappMessages } from "@/lib/whatsapp";

const languageNames: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
  ur: "اردو",
};

/** Full-width slide-down mobile menu panel (spec §4.2) + language row. */
export default function MobileMenu({ open }: { open: boolean }) {
  const pathname = usePathname();
  const locale = useLocale() as Locale;
  const router = useRouter();
  const tn = useTranslations("nav");
  const tl = useTranslations("language");
  const tc = useTranslations("common");
  const wa = getWhatsappMessages(locale);
  if (!open) return null;

  const navItems = [
    { label: tn("home"), href: "/" },
    { label: tn("courses"), href: "/courses" },
    { label: tn("pricing"), href: "/pricing" },
    { label: tn("about"), href: "/about" },
    { label: tn("register"), href: "/register" },
    { label: tn("gallery"), href: "/gallery" },
  ] as const;

  return (
    <div id="mobile-menu" className="border-t border-brand-green/10 bg-cream shadow-card lg:hidden">
      <nav aria-label={tn("mobile")} className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6">
        {/* Full-width trial CTA inside the menu (added 2026-10-24 with the
            mobile header fix) so the compact header button is never the
            only way to book from a phone. */}
        <a
          href={whatsappLink(wa.home)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-shine mb-3 flex min-h-[48px] items-center justify-center rounded-full bg-gold px-5 py-3 text-sm font-bold text-brand-dark shadow-goldglow transition-all duration-200 hover:bg-gold-dark active:scale-[0.98] motion-reduce:transform-none"
        >
          {tc("bookTrial")}
        </a>
        <ul className="divide-y divide-brand-green/10">
          {navItems.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-[48px] items-center text-base font-semibold ${
                    active ? "text-gold-dark" : "text-brand-dark"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="border-t border-brand-green/10 py-3">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ink/50">{tl("label")}</p>
          <div className="flex flex-wrap gap-2" role="listbox" aria-label={tl("choose")}>
            {routing.locales.map((l) => (
              <button
                key={l}
                type="button"
                role="option"
                aria-selected={l === locale}
                onClick={() => l !== locale && router.replace(pathname, { locale: l })}
                className={`min-h-[44px] rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                  l === locale
                    ? "bg-brand-green text-white shadow-card"
                    : "bg-white text-brand-dark shadow-card hover:text-brand-green"
                }`}
              >
                <span lang={l} dir={l === "en" ? "ltr" : "rtl"}>{languageNames[l]}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
