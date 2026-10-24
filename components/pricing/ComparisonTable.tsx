import { getTranslations } from "next-intl/server";
import type { Plan } from "@/lib/plans";

interface Row {
  label: string;
  values: [string, string, string];
}

/** Plan comparison table (spec §7). "TODO" cells are unconfirmed policy items. */
export default async function ComparisonTable({
  rows,
  plans,
}: {
  rows: Row[];
  plans: Plan[];
}) {
  const t = await getTranslations("pricing");

  return (
    <div className="overflow-x-auto rounded-2xl bg-white shadow-card">
      <table className="w-full min-w-[560px] text-start text-sm">
        <caption className="sr-only">{t("caption")}</caption>
        <thead>
          <tr className="bg-brand-green text-white">
            <th scope="col" className="px-5 py-4 text-start font-bold">{t("whatsIncluded")}</th>
            {plans.map((p) => (
              <th key={p.name} scope="col" className="px-5 py-4 text-center font-bold">
                {p.name}
                {p.popular ? " ★" : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.label} className={i % 2 ? "bg-cream" : "bg-white"}>
              <th scope="row" className="px-5 py-3.5 text-start font-semibold text-brand-dark">{row.label}</th>
              {row.values.map((v, j) => (
                <td key={j} className="px-5 py-3.5 text-center text-ink/80">
                  {v === "TODO" ? <span className="text-ink/50">{t("askUs")}</span> : v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
