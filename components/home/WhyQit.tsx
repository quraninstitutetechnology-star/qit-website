import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";

/**
 * Why QIT — 6 feature cards (spec §5.5), each with a photo approved by
 * Ali 2026-10-24.
 * TODO_CONFIRM: Ali must verify each of these claims is true for QIT before launch:
 * 1-to-1 live classes · male & female teachers · online + real campus in Khanpur ·
 * monthly progress reports · completion certificates · flexible timings (PK + overseas).
 */
const featureImages = [
  "/images/why/1to1.jpg",
  "/images/why/teachers.jpg",
  "/images/why/campus.jpg",
  "/images/why/reports.jpg",
  "/images/why/certificates.jpg",
  "/images/why/flexible.jpg",
];

interface FeatureText {
  title: string;
  text: string;
  alt: string;
}

export default async function WhyQit() {
  const t = await getTranslations("why");
  const features = t.raw("features") as FeatureText[];

  return (
    <Section eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")}>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={(i % 3) * 0.08}>
            <Card className="h-full overflow-hidden">
              <div className="relative aspect-[3/2] w-full">
                <Image src={featureImages[i]} alt={f.alt} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
              </div>
              <div className="p-7">
                <h3 className="text-lg font-bold text-brand-dark">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{f.text}</p>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
