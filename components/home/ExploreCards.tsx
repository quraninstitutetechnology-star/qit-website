import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

/**
 * Two navigation cards (Courses / Pricing) — added 2026-10-24 at Ali's
 * request, replacing the home-page course preview grid: visitors tap a
 * card to open the full Courses or Pricing page. Photos approved by Ali
 * 2026-10-24 (book-shelf photo / three plan cards photo).
 */
const cardAssets = [
  { href: "/courses", variant: "green" as const, img: "/images/explore/courses-books.jpg" },
  { href: "/pricing", variant: "gold" as const, img: "/images/explore/pricing-plans.jpg" },
];

interface CardText {
  title: string;
  text: string;
  cta: string;
  alt: string;
}

export default async function ExploreCards() {
  const t = await getTranslations("explore");
  const cards = t.raw("cards") as CardText[];

  return (
    <section aria-label={t("aria")} className="bg-white py-14 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {cards.map((card, i) => (
            <Reveal key={cardAssets[i].href} delay={i * 0.08}>
              <Card className="flex h-full flex-col overflow-hidden">
                <div className="relative aspect-[3/2] w-full">
                  <Image
                    src={cardAssets[i].img}
                    alt={card.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col items-center p-8 text-center">
                  <h2 className="text-2xl font-bold text-brand-dark">{card.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">{card.text}</p>
                  <Button href={cardAssets[i].href} variant={cardAssets[i].variant} className="mt-6">
                    {card.cta} →
                  </Button>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
