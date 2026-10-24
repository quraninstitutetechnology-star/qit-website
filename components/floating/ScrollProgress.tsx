"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/routing";

/**
 * Scroll progress 1–100 (spec §4.4) — fixed bottom-left on EVERY page.
 * Circular ring (green track, gold progress) + percentage in the centre.
 * Updates via refs + rAF-throttled passive listener — no React re-renders.
 * Click = smooth scroll to top. Recalculates on route change and resize.
 */
export default function ScrollProgress() {
  const pathname = usePathname();
  const t = useTranslations("floating");
  const numberRef = useRef<HTMLSpanElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const R = 26;
  const CIRC = 2 * Math.PI * R;

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const pct = max <= 0 ? 100 : Math.min(100, Math.max(1, Math.round((window.scrollY / max) * 100)));
      if (numberRef.current) numberRef.current.textContent = String(pct);
      if (circleRef.current) {
        circleRef.current.style.strokeDashoffset = String(CIRC * (1 - pct / 100));
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname, CIRC]);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      role="button"
      aria-label={t("scrollAria")}
      title={t("scrollTitle")}
      className="fixed bottom-6 left-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lift ring-1 ring-brand-green/15 transition-transform duration-200 hover:scale-105 active:scale-95 motion-reduce:transform-none sm:left-6"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <svg width="56" height="56" viewBox="0 0 56 56" className="absolute inset-0 -rotate-90" aria-hidden="true">
        <circle cx="28" cy="28" r={R} fill="none" stroke="#0B5D4A" strokeOpacity="0.15" strokeWidth="4" />
        <circle
          ref={circleRef}
          cx="28"
          cy="28"
          r={R}
          fill="none"
          stroke="#D9A441"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={CIRC}
          strokeDashoffset={CIRC * 0.99}
        />
      </svg>
      <span className="text-[13px] font-bold leading-none text-brand-dark">
        <span ref={numberRef}>1</span>
        <span className="block text-[8px] font-semibold text-brand-green">%</span>
      </span>
    </button>
  );
}
