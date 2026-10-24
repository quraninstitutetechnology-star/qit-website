import { getLocale, getTranslations } from "next-intl/server";
import { Link, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/lib/site-config";
import { getCourses } from "@/lib/locales";
import { whatsappLink, getWhatsappMessages } from "@/lib/whatsapp";

/** Footer (spec §4.5) — all contact details come from siteConfig only. */
export default async function Footer() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("footer");
  const tc = await getTranslations("common");
  const tn = await getTranslations("nav");
  const wa = getWhatsappMessages(locale);
  const courses = getCourses(locale);
  const year = new Date().getFullYear();

  const navItems = [
    { label: tn("home"), href: "/" },
    { label: tn("courses"), href: "/courses" },
    { label: tn("pricing"), href: "/pricing" },
    { label: tn("about"), href: "/about" },
  ] as const;

  return (
    <footer className="bg-brand-dark text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <p lang="ar" dir="rtl" className="mb-10 text-center font-arabic text-2xl text-gold-light">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-lg font-bold text-gold">
              {tc("shortName")} — {tc("fullName")}
            </p>
            <p className="mt-1 font-medium italic text-gold-light">{tc("slogan")}</p>
            <p className="mt-4 text-sm leading-relaxed text-white/80">{t("aboutText")}</p>
          </div>
          <nav aria-label={t("quickLinks")}>
            <p className="mb-4 font-bold text-gold">{t("quickLinks")}</p>
            <ul className="space-y-2.5 text-sm">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/80 transition-colors hover:text-gold">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/about#contact" className="text-white/80 transition-colors hover:text-gold">
                  {tc("bookTrial")}
                </Link>
              </li>
            </ul>
          </nav>
          <nav aria-label={t("coursesHeading")}>
            <p className="mb-4 font-bold text-gold">{t("coursesHeading")}</p>
            <ul className="space-y-2.5 text-sm">
              {courses.slice(0, 7).map((c) => (
                <li key={c.slug}>
                  <Link href={`/courses/${c.slug}`} className="text-white/80 transition-colors hover:text-gold">
                    {c.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/courses" className="font-semibold text-gold-light transition-colors hover:text-gold">
                  {t("viewAllCourses")}
                </Link>
              </li>
            </ul>
          </nav>
          <div>
            <p className="mb-4 font-bold text-gold">{t("contactHeading")}</p>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>📍 {tc("addressDisplay")}</li>
              <li>
                {t("whatsapp")}:{" "}
                <a href={whatsappLink(wa.generic)} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold">
                  <span dir="ltr">{siteConfig.phoneDisplay}</span>
                </a>
              </li>
              <li>{t("email")}: {siteConfig.email}</li>
              <li>{t("hours")}: {siteConfig.hours}</li>
            </ul>
            {/* Social links are placeholders in siteConfig.socials (TODO_*) until Ali supplies real profiles. */}
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              {["Facebook", "Instagram", "YouTube"].map((name) => (
                <span key={name} className="rounded-full border border-white/25 px-3 py-1.5 text-white/70">
                  {name} — {t("comingSoon")}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-white/70 sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {year} {tc("shortName")} — {tc("fullName")}. {t("rights")}
          </p>
          <p className="flex gap-4">
            <Link href="/privacy" className="transition-colors hover:text-gold">{t("privacy")}</Link>
            <Link href="/terms" className="transition-colors hover:text-gold">{t("terms")}</Link>
            <Link href="/refund-policy" className="transition-colors hover:text-gold">{t("refund")}</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
