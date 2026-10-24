"use client";

import { useLocale, useTranslations } from "next-intl";
import type { Plan, Currency } from "@/lib/plans";
import { whatsappLink, getWhatsappMessages } from "@/lib/whatsapp";
import type { Locale } from "@/i18n/routing";

/** Pricing plan card (spec §7). Shows the plan's monthly price for the active currency (prices set by Ali 2026-10-24 in lib/plans.ts). */
export default function PlanCard({ plan, currency }: { plan: Plan; currency: Currency }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("pricing");
  const tc = useTranslations("common");
  const wa = getWhatsappMessages(locale);

  return (
    <div
      className={`relative flex h-full flex-col rounded-2xl border-2 bg-white p-7 shadow-card transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-lift motion-reduce:transform-none ${
        plan.popular ? "border-gold" : "border-transparent hover:border-gold"
      }`}
    >
      {plan.popular && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold px-4 py-1 text-xs font-bold uppercase tracking-wide text-brand-dark shadow-goldglow">
          {t("mostPopular")}
        </span>
      )}
      <h3 className="text-center text-xl font-bold text-brand-dark">{plan.name}</h3>
      <p className="mt-4 text-center">
        <span className="text-4xl font-bold text-brand-green">{currency.symbol} {plan.prices[currency.code]}</span>
        <span className="text-sm text-ink/60"> {t("perMonth")}</span>
      </p>
      <p className="mt-1 text-center text-xs text-ink/50">{t("finalFees")}</p>
      <ul className="mt-6 flex-1 space-y-2.5 text-sm text-ink/80">
        {plan.features.map((f) => (
          <li key={f} className="flex gap-2">
            <span aria-hidden="true" className="font-bold text-brand-green">✓</span>
            <span>{f.replace("*", "")}</span>
          </li>
        ))}
      </ul>
      <a
        href={whatsappLink(wa.plan(plan.name))}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn-shine mt-7 inline-flex min-h-[44px] items-center justify-center rounded-full px-5 py-3 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.03] active:scale-[0.97] motion-reduce:transform-none ${
          plan.popular ? "bg-gold text-brand-dark shadow-goldglow hover:bg-gold-dark" : "bg-brand-green text-white hover:bg-brand-dark"
        }`}
      >
        {tc("bookTrial")}
      </a>
    </div>
  );
}
