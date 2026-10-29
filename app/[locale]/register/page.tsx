import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { getCourses } from "@/lib/locales";
import type { Locale } from "@/i18n/routing";
import Breadcrumb from "@/components/ui/Breadcrumb";
import RegistrationForms from "@/components/register/RegistrationForms";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({
    title: t("registerTitle"),
    description: t("registerDesc"),
    path: "/register",
    locale: locale as Locale,
  });
}

/**
 * Registration page (added 2026-10-26 at Ali's order): three forms —
 * student registration, teacher application, and madrasa registration
 * under the Qoumi Markazi Digital Quran Board (added 2026-10-29) — each
 * submitting a neatly arranged application to the academy's WhatsApp.
 */
export default async function RegisterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const t = await getTranslations("register");
  const tb = await getTranslations("breadcrumb");

  // All 18 courses — the former "extra" subjects (O/A Level, Persian,
  // Urdu, Maths, English, Science) are real courses now, so the dropdown
  // comes straight from the course catalogue (unique titles = unique keys).
  const courseOptions = getCourses(loc).map((c) => ({
    value: c.title,
    label: c.title,
  }));

  return (
    <>
      <Breadcrumb
        items={[
          { name: tb("home"), path: "/" },
          { name: t("crumb"), path: "/register" },
        ]}
      />
      <section className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
        <div className="text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-gold-dark">{t("eyebrow")}</p>
          <h1 className="text-3xl font-bold text-brand-dark sm:text-4xl">{t("title")}</h1>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-ink/75">{t("intro")}</p>
        </div>
        <div className="mt-10">
          <RegistrationForms courseOptions={courseOptions} />
        </div>
      </section>
    </>
  );
}
