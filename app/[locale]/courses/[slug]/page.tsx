import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link, routing, type Locale } from "@/i18n/routing";
import { courses as enCourses } from "@/lib/courses";
import { getCourse, getCourses } from "@/lib/locales";
import { courseImage } from "@/lib/images";
import { siteConfig } from "@/lib/site-config";
import { whatsappLink, getWhatsappMessages } from "@/lib/whatsapp";
import { pageMetadata } from "@/lib/seo";
import Breadcrumb from "@/components/ui/Breadcrumb";
import JsonLd from "@/components/ui/JsonLd";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    enCourses.map((c) => ({ locale, slug: c.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const course = getCourse(locale as Locale, slug);
  if (!course) return {};
  const tm = await getTranslations({ locale, namespace: "meta" });
  const audience =
    locale === "en"
      ? course.audienceLabel.charAt(0).toLowerCase() + course.audienceLabel.slice(1)
      : course.audienceLabel;
  return pageMetadata({
    title: `${course.title} — ${tm("courseMetaSuffix")} | QIT`,
    description: tm("courseMetaDesc", {
      title: course.title,
      tagline: course.tagline,
      audience,
    }),
    path: `/courses/${course.slug}`,
    locale: locale as Locale,
  });
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const course = getCourse(locale as Locale, slug);
  if (!course) notFound();

  const t = await getTranslations("coursePage");
  const tb = await getTranslations("breadcrumb");
  const tc = await getTranslations("common");
  const tCard = await getTranslations("courseCard");
  const wa = getWhatsappMessages(locale as Locale);

  const img = {
    ...courseImage(course.slug, course.title),
    alt: tCard("imgAlt", { title: course.title }),
  };

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${course.title} — QIT`,
    description: course.tagline,
    provider: {
      "@type": "EducationalOrganization",
      name: `${siteConfig.shortName} — ${siteConfig.fullName}`,
      sameAs: siteConfig.url,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: ["online", "onsite"],
      courseWorkload: course.frequencyNote,
    },
  };

  const related = getCourses(locale as Locale)
    .filter((c) => c.slug !== course.slug)
    .slice(0, 3);

  return (
    <>
      <JsonLd data={courseJsonLd} />
      <Breadcrumb
        items={[
          { name: tb("home"), path: "/" },
          { name: t("crumbCourses"), path: "/courses" },
          { name: course.title, path: `/courses/${course.slug}` },
        ]}
      />

      {/* Hero */}
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <Reveal>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-dark">{course.level} · {course.format}</p>
              <h1 className="mt-2 text-3xl font-bold text-brand-dark sm:text-4xl">{course.title}</h1>
              <p className="mt-4 text-lg text-ink/75">{course.tagline}</p>
              <p className="mt-3 text-sm font-semibold text-brand-green">{t("whoFor")}: {course.audienceLabel}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href={whatsappLink(wa.course(course.title))} variant="gold" external>
                  {tc("bookTrial")}
                </Button>
                <Button href="/pricing" variant="green">{t("seePricing")}</Button>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="group relative overflow-hidden rounded-2xl shadow-card">
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Details */}
      <section className="bg-white py-14">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-brand-dark">{t("whatYouLearn")}</h2>
            <ul className="mt-5 space-y-3">
              {course.outcomes.map((o) => (
                <li key={o} className="flex gap-3 text-ink/80">
                  <span aria-hidden="true" className="mt-0.5 font-bold text-brand-green">✓</span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
            <h2 className="mt-10 text-2xl font-bold text-brand-dark">{t("howClassesWork")}</h2>
            <p className="mt-3 leading-relaxed text-ink/75">{course.howItWorks}</p>
            <p className="mt-3 leading-relaxed text-ink/75">{course.frequencyNote}</p>
            <h2 className="mt-10 text-2xl font-bold text-brand-dark">{t("yourTeacher")}</h2>
            <p className="mt-3 leading-relaxed text-ink/75">{course.teacherNote}</p>
          </div>
          <aside className="h-fit rounded-2xl bg-brand-light p-6">
            <h2 className="font-bold text-brand-dark">{t("startCourse")}</h2>
            <p className="mt-2 text-sm text-ink/70">{t("startText")}</p>
            <a
              href={whatsappLink(wa.course(course.title))}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine mt-4 flex min-h-[44px] items-center justify-center rounded-full bg-gold px-5 py-3 text-sm font-bold text-brand-dark shadow-goldglow transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold-dark active:scale-[0.97] motion-reduce:transform-none"
            >
              {tc("bookTrial")}
            </a>
            <Link href="/pricing" className="mt-3 flex min-h-[44px] items-center justify-center rounded-full bg-brand-green px-5 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-dark active:scale-[0.97] motion-reduce:transform-none">
              {t("viewPlansFees")}
            </Link>
          </aside>
        </div>
      </section>

      {/* Course-specific questions */}
      <section className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-brand-dark">{t("questionsTitle")}</h2>
        <div className="mt-8 space-y-4">
          {course.questions.map((item) => (
            <div key={item.q} className="rounded-2xl bg-white p-6 shadow-card">
              <h3 className="font-bold text-brand-dark">{item.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related */}
      <section className="bg-white py-14">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-brand-dark">{t("continueTitle")}</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {related.map((c) => (
              <Link
                key={c.slug}
                href={`/courses/${c.slug}`}
                className="inline-flex min-h-[44px] items-center rounded-full bg-cream px-5 py-2.5 text-sm font-semibold text-brand-dark shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:text-brand-green motion-reduce:transform-none"
              >
                {c.title} →
              </Link>
            ))}
            <Link
              href="/courses"
              className="inline-flex min-h-[44px] items-center rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold text-white shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-dark motion-reduce:transform-none"
            >
              {t("allCourses")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
