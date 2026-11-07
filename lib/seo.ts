import type { Metadata } from "next";
import { siteConfig } from "./site-config";
import type { Locale } from "@/i18n/routing";

interface PageSeoInput {
  title: string;
  description: string;
  /** Logical path WITHOUT locale prefix, e.g. "/courses". */
  path: string;
  locale: Locale;
}

const ogLocales: Record<Locale, string> = { en: "en_US", ar: "ar_EG", ur: "ur_PK" };

/** Public URL for a logical path in a locale (EN has no prefix — as-needed). */
export function localizedUrl(path: string, locale: Locale): string {
  const suffix = path === "/" ? "" : path;
  return locale === "en"
    ? `${siteConfig.url}${suffix}`
    : `${siteConfig.url}/${locale}${suffix}`;
}

/** Builds consistent page metadata: canonical + hreflang + Open Graph + Twitter. */
export function pageMetadata({ title, description, path, locale }: PageSeoInput): Metadata {
  const url = localizedUrl(path, locale);
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: localizedUrl(path, "en"),
        ar: localizedUrl(path, "ar"),
        ur: localizedUrl(path, "ur"),
        "x-default": localizedUrl(path, "en"),
      },
    },
    openGraph: {
      type: "website",
      siteName: `QIT — ${siteConfig.fullName}`,
      title,
      description,
      url,
      locale: ogLocales[locale],
      images: [
        {
          url: `${siteConfig.url}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `QIT — ${siteConfig.fullName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteConfig.url}/og-image.png`],
    },
  };
}

/** Site-wide EducationalOrganization JSON-LD — only facts Ali has supplied. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: `${siteConfig.shortName} — ${siteConfig.fullName}`,
    slogan: siteConfig.slogan,
    url: siteConfig.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      addressCountry: "PK",
    },
  };
}

/** LocalBusiness JSON-LD for the Khanpur campus — known fields only, nothing faked. */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${siteConfig.shortName} — ${siteConfig.fullName}`,
    slogan: siteConfig.slogan,
    url: siteConfig.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      addressCountry: "PK",
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}
