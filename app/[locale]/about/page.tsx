import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link, type Locale } from "@/i18n/routing";
import { pageMetadata, localBusinessJsonLd } from "@/lib/seo";
import { getCourses } from "@/lib/locales";
import Breadcrumb from "@/components/ui/Breadcrumb";
import JsonLd from "@/components/ui/JsonLd";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import CampusMap from "@/components/ui/CampusMap";
import TrialForm from "@/components/forms/TrialForm";
import { siteConfig } from "@/lib/site-config";
import { images } from "@/lib/images";
import { whatsappLink, getWhatsappMessages } from "@/lib/whatsapp";
import StatsCircles from "@/components/home/StatsCircles";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({
    title: t("aboutTitle"),
    description: t("aboutDesc"),
    path: "/about",
    locale: locale as Locale,
  });
}

interface ValueText {
  title: string;
  text: string;
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const t = await getTranslations("about");
  const tc = await getTranslations("common");
  const tb = await getTranslations("breadcrumb");
  const wa = getWhatsappMessages(loc);
  const values = t.raw("values") as ValueText[];
  const courses = getCourses(loc);

  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <Breadcrumb
        items={[
          { name: tb("home"), path: "/" },
          { name: t("crumb"), path: "/about" },
        ]}
      />

      {/* Hero + story */}
      <section className="mx-auto w-full max-w-4xl px-4 py-12 text-center sm:px-6">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-gold-dark">{t("eyebrow")}</p>
        <h1 className="text-3xl font-bold text-brand-dark sm:text-4xl">
          {tc("shortName")} — {tc("fullName")}
        </h1>
        <p className="mt-2 text-lg font-medium italic text-gold-dark">{tc("slogan")}</p>
        <p className="mt-6 leading-relaxed text-ink/75">{t("story1")}</p>
        <p className="mt-4 leading-relaxed text-ink/75">{t("story2")}</p>
      </section>

      {/* Circular stats band — moved here from the home page 2026-10-24 at
          Ali's request ("add this section in the about, remove from home"). */}
      <StatsCircles />

      {/* Values */}
      <Section tone="white" title={t("valuesTitle")}>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.07}>
              <Card className="h-full p-6 text-center">
                <h2 className="font-bold text-brand-dark">{v.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{v.text}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* What we teach */}
      <Section title={t("teachTitle")} intro={t("teachIntro")}>
        <div className="flex flex-wrap justify-center gap-3">
          {courses.map((c) => (
            <Link
              key={c.slug}
              href={`/courses/${c.slug}`}
              className="inline-flex min-h-[44px] items-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-dark shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:text-brand-green motion-reduce:transform-none"
            >
              {c.title}
            </Link>
          ))}
        </div>
        <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="font-bold text-brand-dark">{t("onlineCardTitle")}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">{t("onlineCardText")}</p>
          </Card>
          <Card className="p-6">
            <h2 className="font-bold text-brand-dark">{t("campusCardTitle")}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">{t("campusCardText")}</p>
          </Card>
        </div>
      </Section>

      {/* Teachers section removed 2026-10-24 at Ali's order (placeholder
          profiles). Teacher data still lives in lib/teachers.ts +
          lib/locales if Ali wants the section back with real profiles. */}

      {/* Campus */}
      <Section id="campus" title={t("campusTitle")}>
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="group relative overflow-hidden rounded-2xl shadow-card">
              <Image
                src={images.campus.src}
                alt={images.campus.alt}
                width={images.campus.width}
                height={images.campus.height}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="space-y-3 text-ink/80">
              <li className="flex gap-2"><span aria-hidden="true">📍</span> {t("addressLabel")}: {tc("addressDisplay")} ({siteConfig.address.street})</li>
              <li className="flex gap-2"><span aria-hidden="true">🕐</span> {t("hoursLabel")}: {siteConfig.hours}</li>
              <li className="flex gap-2"><span aria-hidden="true">🏫</span> {t("admissionLine")}</li>
            </ul>
            {/* Real Google Maps embed — location supplied by Ali 2026-10-24. */}
            <CampusMap className="mt-6 h-64" />
          </Reveal>
        </div>
      </Section>

      {/* Contact + trial form */}
      <Section
        id="contact"
        tone="white"
        title={t("contactTitle")}
        intro={t("contactIntro")}
      >
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Card className="h-full p-7">
              <h2 className="font-bold text-brand-dark">{t("contactCardTitle")}</h2>
              <ul className="mt-4 space-y-3 text-sm text-ink/80">
                <li>📍 {tc("addressDisplay")}</li>
                <li>
                  WhatsApp:{" "}
                  <a href={whatsappLink(wa.about)} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-green">
                    <span dir="ltr">{siteConfig.phoneDisplay}</span>
                  </a>
                </li>
                <li>Email: {siteConfig.email}</li>
                <li>{t("hoursLabel")}: {siteConfig.hours}</li>
              </ul>
              <div className="mt-6">
                <Button href={whatsappLink(wa.about)} variant="whatsapp" external>
                  {t("messageWhatsapp")}
                </Button>
              </div>
            </Card>
          </div>
          <div className="rounded-2xl bg-cream p-6 shadow-card sm:p-7 lg:col-span-3">
            <TrialForm
              courseOptions={courses.map((c) => ({ slug: c.slug, title: c.title }))}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
