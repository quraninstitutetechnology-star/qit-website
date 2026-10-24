import { getLocale, getTranslations } from "next-intl/server";
import { siteConfig } from "@/lib/site-config";
import { whatsappLink, getWhatsappMessages } from "@/lib/whatsapp";
import type { Locale } from "@/i18n/routing";

/**
 * Top bar ABOVE the header (spec §4.1). NOT sticky — it scrolls away.
 * Left: location. Right: WhatsApp / email placeholders + Book Free Trial.
 */
export default async function TopBar() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("topbar");
  const tc = await getTranslations("common");
  const wa = getWhatsappMessages(locale);

  return (
    <div className="bg-brand-dark text-white">
      <div className="mx-auto flex min-h-[38px] w-full max-w-7xl items-center justify-between gap-4 px-4 py-1.5 text-xs sm:px-6 sm:text-[13px] lg:px-8">
        <p className="flex items-center gap-1.5 font-medium">
          <span aria-hidden="true">📍</span>
          <span>{tc("cityRegion")}</span>
        </p>
        <div className="flex items-center gap-4">
          <a
            href={whatsappLink(wa.generic)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden font-medium text-gold-light transition-colors hover:text-gold sm:inline"
          >
            {t("whatsapp")}: <span dir="ltr">{siteConfig.phoneDisplay}</span>
          </a>
          <a href={whatsappLink(wa.generic)} target="_blank" rel="noopener noreferrer" className="font-medium text-gold-light sm:hidden">
            {t("whatsapp")}
          </a>
          <span className="hidden text-white/80 md:inline">{siteConfig.email}</span>
          <a
            href={whatsappLink(wa.home)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-gold transition-colors hover:text-gold-light"
          >
            {t("bookTrial")}
          </a>
        </div>
      </div>
    </div>
  );
}
