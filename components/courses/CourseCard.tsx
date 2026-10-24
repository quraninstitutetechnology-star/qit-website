"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link, type Locale } from "@/i18n/routing";
import type { Course } from "@/lib/courses";
import { courseImage } from "@/lib/images";
import { whatsappLink, getWhatsappMessages } from "@/lib/whatsapp";
import Card from "@/components/ui/Card";

/** Course card with spec §4.6 hover: lift, gold border glow, image zoom. */
export default function CourseCard({ course }: { course: Course }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("courseCard");
  const wa = getWhatsappMessages(locale);
  const img = { ...courseImage(course.slug, course.title), alt: t("imgAlt", { title: course.title }) };

  return (
    <Card className="group flex h-full flex-col overflow-hidden">
      {/* Banner aspect matches the 800x560 course image exactly (10/7) so the
          full book cover shows — a fixed h-44 banner cropped its top/bottom. */}
      <div className="relative aspect-[10/7] overflow-hidden bg-brand-dark">
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
        />
        <span className="absolute start-3 top-3 rounded-full bg-brand-dark/85 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-gold-light backdrop-blur">
          {course.level}
        </span>
      </div>
      {/* Card stays clean/professional per Ali (2026-10-24): cover, level,
          title and audience only — tagline & format details live on the
          course page, not the card. */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold text-brand-dark">{course.title}</h3>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-gold-dark">{course.audienceLabel}</p>
        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          <Link
            href={`/courses/${course.slug}`}
            className="inline-flex min-h-[44px] items-center rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-dark active:scale-[0.97] motion-reduce:transform-none"
          >
            {t("viewCourse")}
          </Link>
          <a
            href={whatsappLink(wa.course(course.title))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center rounded-full border-2 border-gold px-5 py-2.5 text-sm font-semibold text-gold-dark transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold hover:text-brand-dark active:scale-[0.97] motion-reduce:transform-none"
          >
            {t("freeTrial")}
          </a>
        </div>
      </div>
    </Card>
  );
}
