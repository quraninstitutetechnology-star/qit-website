import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import CampusMap from "@/components/ui/CampusMap";
import { images } from "@/lib/images";
import { siteConfig } from "@/lib/site-config";

/** Campus highlight (spec §5.10) — QIT's differentiator: a real campus in Khanpur. */
export default async function CampusHighlight() {
  const t = await getTranslations("campus");
  const tc = await getTranslations("common");

  return (
    <Section tone="white" eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")}>
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
          <div>
            <ul className="space-y-3 text-ink/80">
              <li className="flex gap-2"><span aria-hidden="true">📍</span> {tc("addressDisplay")}</li>
              <li className="flex gap-2"><span aria-hidden="true">🕐</span> {t("hoursLabel")}: {siteConfig.hours}</li>
              <li className="flex gap-2"><span aria-hidden="true">🏫</span> {t("onCampusLine")}</li>
            </ul>
            <div className="mt-7">
              <Button href="/about#campus" variant="green">{t("aboutCampus")}</Button>
            </div>
          </div>
        </Reveal>
      </div>
      {/* Campus location map — Google Maps link supplied by Ali 2026-10-24. */}
      <Reveal delay={0.15}>
        <CampusMap className="mt-10 h-80 w-full" />
        <p className="mt-3 text-center text-sm">
          <a
            href={siteConfig.mapLinkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-green underline-offset-2 hover:text-gold-dark hover:underline"
          >
            {t("openMaps")}
          </a>
        </p>
      </Reveal>
    </Section>
  );
}
