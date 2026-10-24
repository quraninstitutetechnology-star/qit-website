import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import PlanCard from "@/components/pricing/PlanCard";
import { plans, currencies } from "@/lib/plans";

/** Pricing preview (spec §5.8) — 3 plan cards in default currency + full-pricing link. */
export default function PricingPreview() {
  return (
    <Section
      tone="white"
      eyebrow="Fees & plans"
      title="Simple Monthly Plans"
      intro="Choose how many classes you want each week. Every plan starts with a free trial class."
    >
      <div className="grid items-stretch gap-6 pt-4 lg:grid-cols-3">
        {plans.map((plan, i) => (
          <Reveal key={plan.name} delay={i * 0.08}>
            <PlanCard plan={plan} currency={currencies[0]} />
          </Reveal>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Button href="/pricing" variant="green">See Full Pricing</Button>
      </div>
    </Section>
  );
}
