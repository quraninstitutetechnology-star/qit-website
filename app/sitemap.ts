import type { MetadataRoute } from "next";
import { courses } from "@/lib/courses";
import { localizedUrl } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

const LOCALES: Locale[] = ["en", "ar", "ur"];

/**
 * Sitemap generated from the real page + course list (spec §9), in all
 * three locales with hreflang alternates. No /faq — FAQ is Home-only.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = ["", "/courses", "/pricing", "/about", "/register", "/gallery", "/privacy", "/terms", "/refund-policy"];
  const paths = [
    ...staticPages,
    ...courses.map((course) => `/courses/${course.slug}`),
  ];

  return paths.flatMap((path) =>
    LOCALES.map((locale) => ({
      url: localizedUrl(path === "" ? "/" : path, locale),
      lastModified: now,
      changeFrequency: (path === "" || !path.startsWith("/courses/")
        ? "weekly"
        : "monthly") as "weekly" | "monthly",
      priority: path === "" ? 1 : path.startsWith("/courses/") ? 0.7 : 0.8,
      alternates: {
        languages: {
          en: localizedUrl(path === "" ? "/" : path, "en"),
          ar: localizedUrl(path === "" ? "/" : path, "ar"),
          ur: localizedUrl(path === "" ? "/" : path, "ur"),
        },
      },
    })),
  );
}
