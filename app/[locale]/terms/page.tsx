import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import LegalPage from "@/components/ui/LegalPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return pageMetadata({
    title: t("termsTitle"),
    description: t("termsDesc"),
    path: "/terms",
    locale: locale as Locale,
  });
}

interface Para {
  lead: string;
  rest: string;
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal");
  const paras = t.raw("termsBody") as Para[];
  return (
    <LegalPage title={t("termsTitle")} path="/terms">
      {paras.map((p, i) => (
        <p key={i}>
          {p.lead ? <strong>{p.lead} </strong> : null}
          {p.rest}
        </p>
      ))}
    </LegalPage>
  );
}

