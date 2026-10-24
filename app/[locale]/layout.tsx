import type { Metadata } from "next";
import { Poppins, Amiri, Noto_Naskh_Arabic, Noto_Nastaliq_Urdu } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import { siteConfig } from "@/lib/site-config";
import { organizationJsonLd } from "@/lib/seo";
import { routing, rtlLocales, type Locale } from "@/i18n/routing";
import { getCourses } from "@/lib/locales";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/floating/WhatsAppButton";
import ScrollProgress from "@/components/floating/ScrollProgress";
import JsonLd from "@/components/ui/JsonLd";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-arabic",
  display: "swap",
});

const naskh = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-naskh",
  display: "swap",
});

const nastaliq = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-nastaliq",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const tc = await getTranslations({ locale, namespace: "common" });
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t("defaultTitle"),
      template: "%s | QIT",
    },
    description: t("defaultDesc"),
    openGraph: {
      type: "website",
      siteName: `QIT — ${tc("fullName")}`,
      locale: locale === "ar" ? "ar_EG" : locale === "ur" ? "ur_PK" : "en_US",
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const dir = rtlLocales.includes(locale as Locale) ? "rtl" : "ltr";
  // Tiny slug → title map so the client WhatsApp button can build its
  // per-course message without bundling all course data.
  const courseTitles: Record<string, string> = Object.fromEntries(
    getCourses(locale as Locale).map((c) => [c.slug, c.title]),
  );

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      className={`${poppins.variable} ${amiri.variable} ${naskh.variable} ${nastaliq.variable}`}
    >
      <body>
        {/* Anti-flash theme script: applies the stored (or system) dark
            preference before first paint. Must stay inline and first. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("qit-theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})();`,
          }}
        />
        <NextIntlClientProvider>
          <JsonLd data={organizationJsonLd()} />
          <TopBar />
          <Header />
          <main>{children}</main>
          <Footer />
          {/* Floating widgets live OUTSIDE <main>/template so they never re-animate on navigation. */}
          <WhatsAppButton courseTitles={courseTitles} />
          <ScrollProgress />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
