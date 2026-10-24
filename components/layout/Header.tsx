"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, type Locale } from "@/i18n/routing";
import { whatsappLink, getWhatsappMessages } from "@/lib/whatsapp";
import MobileMenu from "./MobileMenu";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

/** Sticky header (spec §4.2): shrinks 80px → 56px + soft shadow when scrolled. */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale() as Locale;
  const t = useTranslations("header");
  const tc = useTranslations("common");
  const tn = useTranslations("nav");
  const wa = getWhatsappMessages(locale);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const navItems = [
    { label: tn("home"), href: "/" },
    { label: tn("courses"), href: "/courses" },
    { label: tn("pricing"), href: "/pricing" },
    { label: tn("about"), href: "/about" },
  ] as const;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-40 bg-cream/95 backdrop-blur transition-shadow duration-300 ${
        scrolled ? "shadow-card" : ""
      }`}
    >
      <div
        className={`mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 transition-all duration-300 sm:px-6 lg:px-8 ${
          scrolled ? "h-14" : "h-20"
        }`}
      >
        <Link href="/" className="flex items-center gap-2.5" aria-label={t("homeAria")}>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-green text-sm font-bold text-gold shadow-card sm:h-11 sm:w-11 sm:text-base">
            QIT
          </span>
          <span className="hidden leading-tight min-[480px]:block">
            <span className="block text-[15px] font-bold text-brand-dark sm:text-base">
              {tc("fullName")}
            </span>
            <span className="block text-[11px] font-medium italic text-gold-dark sm:text-xs">
              {tc("slogan")}
            </span>
          </span>
        </Link>

        <nav aria-label={tn("main")} className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`nav-link py-2 text-[15px] font-semibold transition-colors ${
                isActive(item.href) ? "text-gold-dark" : "text-brand-dark hover:text-brand-green"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle />
          <LanguageSwitcher />
          {/* Compact on mobile (short "Free Trial" label, smaller padding) —
              full label and size from sm up. Fixed 2026-10-24: the full-size
              button overflowed/cramped the mobile header. */}
          <a
            href={whatsappLink(wa.home)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine inline-flex min-h-[40px] items-center whitespace-nowrap rounded-full bg-gold px-3 py-2 text-xs font-bold text-brand-dark shadow-goldglow transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.04] hover:bg-gold-dark active:scale-[0.97] motion-reduce:transform-none sm:min-h-[44px] sm:px-5 sm:py-2.5 sm:text-sm"
          >
            <span className="sm:hidden">{tc("bookTrialShort")}</span>
            <span className="hidden sm:inline">{tc("bookTrial")}</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-brand-dark transition-colors hover:bg-brand-light lg:hidden"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? (
                <>
                  <line x1="5" y1="5" x2="19" y2="19" />
                  <line x1="19" y1="5" x2="5" y2="19" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>
      <MobileMenu open={open} />
    </header>
  );
}
