import { stats } from "@/lib/stats";
import Reveal from "@/components/ui/Reveal";

/** Trust strip (spec §5.2) — server-rendered placeholder values ("—"), never JS counters. */
export default function StatsStrip() {
  return (
    <section aria-label="QIT at a glance" className="border-b border-brand-green/10 bg-white">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08}>
            <div className="text-center">
              <p className="text-4xl font-bold text-brand-green">{stat.value}</p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-gold-dark">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="pb-6 text-center text-xs text-ink/50">
        Real numbers will be published here as the academy grows.
      </p>
    </section>
  );
}
