"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

/**
 * Circular stats band (added 2026-10-24 at Ali's request, modelled on his
 * reference image): white circles with a gold ring on a deep-green band,
 * numbers count up when the band scrolls into view.
 * Numbers supplied by Ali 2026-10-24: 7+ years, 1,500+ satisfied students,
 * 10,000+ teaching hours (kept from his reference image). NO teachers card
 * — Ali said to leave it out. Change a number here and it updates everywhere.
 */
const stats = [
  { key: "years", value: 7, icon: "calendar" },
  { key: "students", value: 1500, icon: "cap" },
  { key: "hours", value: 10000, icon: "hourglass" },
] as const;

function useCountUp(target: number, start: boolean, duration = 1600) {
  const [value, setValue] = useState(target);
  useEffect(() => {
    if (!start) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    setValue(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return value;
}

function StatCircle({
  icon,
  value,
  label,
  start,
}: {
  icon: string;
  value: number;
  label: string;
  start: boolean;
}) {
  const current = useCountUp(value, start);
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-44 w-44 flex-col items-center justify-center rounded-full bg-white text-center shadow-lift ring-[6px] ring-gold sm:h-52 sm:w-52">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-brand-dark">
          {icon === "calendar" && (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
          )}
          {icon === "cap" && (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 10L12 5 2 10l10 5 10-5z" />
              <path d="M6 12.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-3.5" />
              <path d="M22 10v6" />
            </svg>
          )}
          {icon === "hourglass" && (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 22h14M5 2h14" />
              <path d="M17 22v-4.2a2 2 0 0 0-.4-1.2L12 11l-4.6 5.6a2 2 0 0 0-.4 1.2V22" />
              <path d="M7 2v4.2a2 2 0 0 0 .4 1.2L12 13l4.6-5.6A2 2 0 0 0 17 6.2V2" />
            </svg>
          )}
        </span>
        <p className="mt-2 text-4xl font-bold leading-none text-[#12284B] sm:text-[42px]">
          {current.toLocaleString("en-US")}
          <span className="text-gold">+</span>
        </p>
        <span aria-hidden="true" className="my-2 block h-0.5 w-8 rounded bg-gold" />
        <p className="px-4 text-[11px] font-bold uppercase tracking-[0.14em] text-[#3D4B63] sm:text-xs">
          {label}
        </p>
      </div>
    </div>
  );
}

export default function StatsCircles() {
  const t = useTranslations("stats");
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const labels: Record<string, string> = {
    years: t("years"),
    students: t("students"),
    hours: t("hours"),
  };

  return (
    <section aria-label={t("aria")} className="bg-cream">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="relative overflow-hidden bg-gradient-to-b from-[#0E6B4F] via-brand-green to-brand-dark px-6 py-12 shadow-card sm:px-10 sm:py-14"
          style={{ clipPath: "polygon(18px 0, calc(100% - 18px) 0, 100% 18px, 100% calc(100% - 18px), calc(100% - 18px) 100%, 18px 100%, 0 calc(100% - 18px), 0 18px)" }}
        >
          <div className="mx-auto grid max-w-4xl gap-10 sm:grid-cols-3 sm:gap-6">
            {stats.map((s) => (
              <StatCircle key={s.key} icon={s.icon} value={s.value} label={labels[s.key]} start={visible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
