import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

interface FounderPoint {
  title: string;
  text: string;
}

/**
 * Founder & Director section (added 2026-10-27 at Ali's order, plan
 * approved by him before building): Qari Zameer Zaidi — photo supplied
 * by Ali. Placed directly after the hero (moved 2026-10-28 at Ali's
 * order) with the TEXT on the left and the PHOTO on the right in LTR
 * (mirrored automatically in Urdu/Arabic). All facts are Ali's own:
 * MSc & M.Phil (IT) + Dars-e-Nizami, ~5,000 teachers trained, Chairman
 * Anjuman Khadman-e-Quran Pakistan, certified Qari/Hafiz teacher network.
 */
export default async function FounderSection() {
  const t = await getTranslations("founder");
  const points = t.raw("points") as FounderPoint[];

  return (
    <Section tone="green" eyebrow={t("eyebrow")} title={t("title")}>
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_minmax(0,420px)] lg:gap-14">
        <Reveal>
          <div>
            <p className="text-lg font-semibold text-gold-light">{t("role")}</p>
            <p className="mt-4 leading-relaxed text-white/85">{t("bio")}</p>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2">
              {points.map((p) => (
                <li key={p.title} className="flex gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold text-brand-dark">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  <span>
                    <span className="block font-bold text-white">{p.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-white/75">{p.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal>
          <div className="relative mx-auto w-full max-w-[420px]">
            <div className="overflow-hidden rounded-b-3xl rounded-t-[999px] border-4 border-gold shadow-goldglow">
              <Image
                src="/images/founder.jpg"
                alt={t("photoAlt")}
                width={928}
                height={933}
                className="aspect-[4/5] w-full object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-brand-dark shadow-goldglow rtl:translate-x-1/2">
              {t("badge")}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
