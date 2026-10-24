import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { getBillingNotes, getComparisonRows, getCurrencies, getPlans } from "@/lib/locales";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/routing";
import { whatsappLink, getWhatsappMessages } from "@/lib/whatsapp";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import CurrencyTabs from "@/components/pricing/CurrencyTabs";
import ComparisonTable from "@/components/pricing/ComparisonTable";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({
    title: t("pricingTitle"),
    description: t("pricingDesc"),
    path: "/pricing",
    locale: locale as Locale,
  });
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const t = await getTranslations("pricing");
  const tb = await getTranslations("breadcrumb");
  const wa = getWhatsappMessages(loc);
  const plans = getPlans(loc);
  const billingNotes = getBillingNotes(loc);

  return (
    <>
      <Breadcrumb
        items={[
          { name: tb("home"), path: "/" },
          { name: t("crumb"), path: "/pricing" },
        ]}
      />

      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-gold-dark">{t("eyebrow")}</p>
          <h1 className="text-3xl font-bold text-brand-dark sm:text-4xl">{t("title")}</h1>
          <p className="mt-3 text-ink/70">{t("intro")}</p>
          <div className="mt-6">
            <Button href={whatsappLink(wa.pricing)} variant="gold" external>
              {t("askFees")}
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8" aria-label={t("plansAria")}>
        <CurrencyTabs plans={plans} currencies={getCurrencies(loc)} />
        <p className="mt-8 text-center font-semibold text-brand-dark">
          {t("siblingQ")} <span className="text-brand-green">{t("siblingAsk")}</span> {t("siblingOn")}
        </p>
      </section>

      <Section tone="white" title={t("compareTitle")} intro={t("compareIntro")}>
        <Reveal>
          <ComparisonTable rows={getComparisonRows(loc)} plans={plans} />
        </Reveal>
      </Section>

      <Section title={t("billingTitle")} intro={t("billingIntro")}>
        <Reveal>
          <div className="mx-auto max-w-3xl rounded-2xl bg-white p-7 shadow-card">
            <ul className="space-y-3 text-sm leading-relaxed text-ink/80">
              {billingNotes.map((note) => (
                <li key={note} className="flex gap-3">
                  <span aria-hidden="true" className="font-bold text-brand-green">•</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-ink/60">
              {t("readFull")} <Link href="/refund-policy" className="font-semibold text-brand-green underline">{t("refundPolicy")}</Link>.
            </p>
          </div>
        </Reveal>
        <div className="mt-10 text-center">
          <Button href={whatsappLink(wa.pricing)} variant="whatsapp" external>
            {t("bookOnWhatsapp")}
          </Button>
        </div>
      </Section>
    </>
  );
}
