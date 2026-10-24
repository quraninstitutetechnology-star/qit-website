import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { getLocale, getTranslations } from "next-intl/server";
import { whatsappLink, getWhatsappMessages } from "@/lib/whatsapp";
import type { Locale } from "@/i18n/routing";

/** Final CTA band (spec §5.12). */
export default async function CtaBand() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("cta");
  const tc = await getTranslations("common");
  const wa = getWhatsappMessages(locale);

  return (
    <section className="bg-brand-green">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 text-center sm:px-6 sm:py-16 lg:px-8">
        <Reveal>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">{t("title")}</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/85">{t("text")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/about#contact" variant="gold">{tc("bookTrial")}</Button>
            <Button href={whatsappLink(wa.home)} variant="whatsapp" external>
              {t("chatWhatsapp")}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
