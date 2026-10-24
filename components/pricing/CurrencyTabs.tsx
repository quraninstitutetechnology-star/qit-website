"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { Currency, Plan } from "@/lib/plans";
import PlanCard from "./PlanCard";

/** Currency tabs PKR · USD · GBP (spec §7) — client component, default PKR. */
export default function CurrencyTabs({
  plans,
  currencies,
}: {
  plans: Plan[];
  currencies: Currency[];
}) {
  const [active, setActive] = useState<Currency>(currencies[0]);
  const t = useTranslations("pricing");

  return (
    <div>
      <div role="tablist" aria-label={t("currencyAria")} className="mb-10 flex flex-wrap justify-center gap-2">
        {currencies.map((c) => (
          <button
            key={c.code}
            role="tab"
            aria-selected={active.code === c.code}
            onClick={() => setActive(c)}
            className={`min-h-[44px] rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97] motion-reduce:transform-none ${
              active.code === c.code
                ? "bg-brand-green text-white shadow-card"
                : "bg-white text-brand-dark shadow-card hover:text-brand-green"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
      <div className="grid items-stretch gap-6 pt-4 lg:grid-cols-3">
        {plans.map((plan) => (
          <PlanCard key={plan.name} plan={plan} currency={active} />
        ))}
      </div>
    </div>
  );
}
