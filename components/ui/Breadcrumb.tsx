import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import JsonLd from "./JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export interface Crumb {
  name: string;
  path: string;
}

export default async function Breadcrumb({ items }: { items: Crumb[] }) {
  const t = await getTranslations("breadcrumb");
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(items)} />
      <nav aria-label={t("aria")} className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-ink/60">
          {items.map((item, i) => (
            <li key={item.path} className="flex items-center gap-1">
              {i > 0 && <span aria-hidden="true" className="text-gold-dark">›</span>}
              {i === items.length - 1 ? (
                <span aria-current="page" className="font-semibold text-brand-green">{item.name}</span>
              ) : (
                <Link href={item.path} className="transition-colors hover:text-brand-green">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
