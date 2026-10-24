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
    title: t("privacyTitle"),
    description: t("privacyDesc"),
    path: "/privacy",
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
  const paras = t.raw("privacyBody") as Para[];
  return (
    <LegalPage title={t("privacyTitle")} path="/privacy">
      {paras.map((p, i) => (
        <p key={i}>
          {p.lead ? <strong>{p.lead} </strong> : null}
          {p.rest}
        </p>
      ))}
    </LegalPage>
  );
}

