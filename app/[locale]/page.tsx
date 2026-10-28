import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata, localBusinessJsonLd } from "@/lib/seo";
import { getFaqs } from "@/lib/locales";
import type { Locale } from "@/i18n/routing";
import JsonLd from "@/components/ui/JsonLd";
import HeroVideo from "@/components/home/HeroVideo";
import ExploreCards from "@/components/home/ExploreCards";
import FounderSection from "@/components/home/FounderSection";
import CampusHighlight from "@/components/home/CampusHighlight";
import FaqSection from "@/components/home/FaqSection";
import CtaBand from "@/components/home/CtaBand";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({
    title: t("homeTitle"),
    description: t("homeDesc"),
    path: "/",
    locale: locale as Locale,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const faqs = getFaqs(locale as Locale);

  /** FAQPage JSON-LD on Home only — for machine readability (FAQ rich results were removed by Google on 7 May 2026). */
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <JsonLd data={localBusinessJsonLd()} />
      {/* Hero carousel replaced by the approved 10s hero video 2026-10-24. */}
      <HeroVideo />
      {/* Founder & Director — directly after the hero (moved here
          2026-10-28 at Ali's order; originally after Why QIT). */}
      <FounderSection />
      {/* Stats strip (Students/Teachers/Countries/Years) removed 2026-10-24 at Ali's request. */}
      {/* How It Works moved to the About page 2026-10-28 at Ali's order. */}
      {/* Stats band was here briefly on 2026-10-24; Ali moved it to the
          About page the same day. */}
      {/* Course preview grid replaced by two navigation cards (Courses /
          Pricing) 2026-10-24 at Ali's request. */}
      <ExploreCards />
      {/* "Why QIT / Why Families Choose QIT" section deleted 2026-10-28 at
          Ali's order (component file kept in the tree, unused). */}
      {/* "Who We Teach" (AudienceCards) moved to the About page
          2026-10-28 at Ali's order. */}
      {/* "Our Teachers" preview and Pricing preview sections removed
          2026-10-24 at Ali's request. */}
      {/* Testimonials section removed completely 2026-10-24 at Ali's request. */}
      <CampusHighlight />
      <FaqSection faqs={faqs} />
      <CtaBand />
    </>
  );
}
