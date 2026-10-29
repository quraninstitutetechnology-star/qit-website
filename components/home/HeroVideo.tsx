"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { type Locale } from "@/i18n/routing";
import { whatsappLink, getWhatsappMessages } from "@/lib/whatsapp";
import Button from "@/components/ui/Button";

/**
 * Hero — 10-second looping video (approved by Ali 2026-10-24) replacing
 * the 3-slide carousel. Lightweight: one optimised MP4 (1.1 MB, no audio,
 * faststart) + poster image that paints instantly; under reduced-motion
 * the poster is shown instead of the video.
 */
export default function HeroVideo() {
  const reduce = useReducedMotion();
  const locale = useLocale() as Locale;
  const t = useTranslations("hero");
  const tc = useTranslations("common");
  const wa = getWhatsappMessages(locale);

  return (
    <section aria-label={t("aria")} className="relative bg-brand-dark">
      <div className="relative h-[540px] sm:h-[500px] lg:h-[560px]">
        {reduce ? (
          <Image
            src="/images/hero-poster.jpg"
            alt={t("imgAlt")}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/images/hero-poster.jpg"
            aria-label={t("imgAlt")}
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/55 via-brand-dark/25 to-transparent rtl:bg-gradient-to-l" />
        <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p lang="ar" dir="rtl" className="mb-4 text-left font-arabic text-lg text-gold-light drop-shadow sm:text-xl">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <h1 className="text-2xl font-bold leading-snug text-white drop-shadow-lg sm:text-3xl lg:text-4xl">
              {t("headline")}
            </h1>
            <p className="mt-4 max-w-xl text-sm text-white/90 drop-shadow sm:text-base">{t("sub")}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href={whatsappLink(wa.home)} variant="gold" external>
                {tc("bookTrial")}
              </Button>
              <Button href="/courses" variant="outline">
                {t("viewCourses")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
