import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";

/** Audience cards — photos approved by Ali 2026-10-24. */
const audienceAssets = [
  { img: "/images/who/kids.jpg", href: "/courses?audience=kids" },
  { img: "/images/who/sisters.jpg", href: "/courses?audience=sisters" },
  { img: "/images/who/adults.jpg", href: "/courses?audience=adults" },
];

interface AudienceText {
  title: string;
  text: string;
  link: string;
  alt: string;
}

export default async function AudienceCards() {
  const t = await getTranslations("who");
  const audiences = t.raw("audiences") as AudienceText[];

  return (
    <Section tone="white" eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")}>
      <div className="grid gap-6 md:grid-cols-3">
        {audiences.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.1}>
            <Card className="flex h-full flex-col overflow-hidden">
              <div className="relative aspect-[3/2] w-full">
                <Image src={audienceAssets[i].img} alt={a.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col items-center p-7 text-center">
                <h3 className="text-xl font-bold text-brand-dark">{a.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">{a.text}</p>
                <Link
                  href={audienceAssets[i].href}
                  className="mt-4 inline-flex min-h-[44px] items-center font-semibold text-brand-green transition-colors hover:text-gold-dark"
                >
                  {a.link}
                </Link>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
