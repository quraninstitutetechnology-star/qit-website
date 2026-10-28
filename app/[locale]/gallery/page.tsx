import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import SpecialSlider from "@/components/gallery/SpecialSlider";
import { galleryImages } from "@/lib/gallery";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({
    title: t("galleryTitle"),
    description: t("galleryDesc"),
    path: "/gallery",
    locale: locale as Locale,
  });
}

/**
 * Gallery page (added 2026-10-28 at Ali's order): the Special Moments
 * slider (Ali's special_slider photos, auto-swipe every 4s, special-1
 * first and repeated after every 3) above a photo-card grid (Ali's
 * gallery photos, shown complete at their natural shapes).
 */
export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("gallery");
  const tn = await getTranslations("nav");

  return (
    <>
      <Breadcrumb
        items={[
          { name: tn("home"), path: "/" },
          { name: tn("gallery"), path: "/gallery" },
        ]}
      />

      <Section eyebrow={t("eyebrow")} title={t("sliderTitle")} intro={t("intro")}>
        <Reveal>
          <SpecialSlider />
        </Reveal>
      </Section>

      <Section tone="white" title={t("gridTitle")}>
        <Reveal>
          <div className="columns-2 gap-4 md:columns-3 xl:columns-4 [&>*]:mb-4">
            {galleryImages.map((img, i) => (
              <figure
                key={img.src}
                className="group break-inside-avoid overflow-hidden rounded-2xl shadow-card"
              >
                <Image
                  src={img.src}
                  alt={t("photoAlt", { n: i + 1 })}
                  width={img.width}
                  height={img.height}
                  sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </figure>
            ))}
          </div>
        </Reveal>
      </Section>
    </>
  );
}
