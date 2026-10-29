import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Reveal from "@/components/ui/Reveal";

interface FounderRole {
  label: string;
  org: string;
}

/**
 * Director Profile section (redesigned 2026-10-29 at Ali's order to match
 * his supplied Director Profile sample): one card placed directly after
 * the hero — photo on one side, deep-navy panel on the other (mirrored in
 * Urdu/Arabic), stacking photo-first on mobile. The navy is the site's
 * brand-dark token, changed the same day to the sample's #0D2B54 and
 * adopted as the dark-mode colour across the whole site. All facts are
 * Ali's own, taken from the sample: MSCS • M.Phil IT • Dars-e-Nizami;
 * Chairman, Anjuman Khadman-e-Quran Pakistan; General Secretary, Path of
 * Life Welfare Foundation (Regd NGO); 5000+ teachers trained; Free IT
 * Centers; Quran Digital Board for Madaris.
 */
export default async function FounderSection() {
  const t = await getTranslations("founder");
  const roles = t.raw("roles") as FounderRole[];
  const highlights = t.raw("highlights") as string[];
  const extras = t.raw("extras") as string[];

  return (
    <section className="scroll-mt-28 bg-cream py-14 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid overflow-hidden rounded-3xl border border-gold/40 bg-brand-dark shadow-lift lg:grid-cols-2">
            {/* Photo — full-height side of the card; a banner on mobile */}
            <div className="relative h-80 sm:h-96 lg:h-auto lg:min-h-[560px]">
              <Image
                src="/images/founder.jpg"
                alt={t("photoAlt")}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-brand-dark/25 rtl:lg:bg-gradient-to-l" />
            </div>

            {/* Navy panel */}
            <div className="relative p-6 text-white sm:p-8 lg:p-10">
              <div
                className="pointer-events-none absolute -top-24 end-0 h-56 w-56 rounded-full bg-gold/10 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-light">
                  {t("profileLabel")}
                </p>
                <h2 className="mt-2 text-3xl font-bold leading-snug text-gold-light sm:text-4xl">
                  {t("title")}
                </h2>
                <p className="mt-2 font-semibold tracking-wide text-white/90">
                  {t("credentials")}
                </p>

                <ul className="mt-6 space-y-3">
                  {roles.map((r) => (
                    <li key={r.label} className="flex items-start gap-3">
                      <span className="mt-[7px] h-2 w-2 shrink-0 rotate-45 bg-gold" aria-hidden="true" />
                      <span className="leading-relaxed">
                        <span className="font-bold text-gold-light">{r.label}</span>
                        <span className="mx-2 text-white/40" aria-hidden="true">
                          —
                        </span>
                        <span className="text-white/85">{r.org}</span>
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Vision banner */}
                <div className="mt-7 rounded-2xl border border-gold/50 bg-white/5 px-5 py-4 text-center">
                  <p className="leading-relaxed text-gold-light">
                    <span className="font-bold">{t("visionLabel")}: </span>
                    <span className="italic">{t("vision")}</span>
                  </p>
                </div>

                {/* Highlights */}
                <div className="mt-7 grid grid-cols-1 gap-4 border-y border-white/15 py-5 text-center sm:grid-cols-3 sm:gap-3">
                  {highlights.map((h) => (
                    <div key={h} className="flex flex-col items-center gap-2 px-1">
                      <span className="h-1.5 w-1.5 rotate-45 bg-gold" aria-hidden="true" />
                      <p className="text-sm font-bold leading-snug text-white">{h}</p>
                    </div>
                  ))}
                </div>

                {/* Extras */}
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {extras.map((x) => (
                    <li key={x} className="flex items-center gap-2.5">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold text-brand-dark">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3.5 w-3.5"
                          aria-hidden="true"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </span>
                      <span className="text-sm font-semibold text-white/90">{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
