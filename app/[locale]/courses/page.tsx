import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { getCourses } from "@/lib/locales";
import type { Locale } from "@/i18n/routing";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CourseFilter from "@/components/courses/CourseFilter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({
    title: t("coursesTitle"),
    description: t("coursesDesc"),
    path: "/courses",
    locale: locale as Locale,
  });
}

export default async function CoursesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("coursesPage");
  const tb = await getTranslations("breadcrumb");

  return (
    <>
      <Breadcrumb
        items={[
          { name: tb("home"), path: "/" },
          { name: t("crumbCourses"), path: "/courses" },
        ]}
      />
      {/* The visible intro section (heading + text + audience filters) was
          removed 2026-10-24 at Ali's request — the page opens straight into
          the course cards. The h1 stays sr-only for SEO/accessibility. */}
      <h1 className="sr-only">{t("h1")}</h1>
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <CourseFilter courses={getCourses(locale as Locale)} />
      </section>
    </>
  );
}
