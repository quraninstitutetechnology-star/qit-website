"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import type { Faq } from "@/lib/faqs";

/**
 * FAQ accordion (spec §5.11) — exists ONLY on the Home page. There is no /faq route.
 * One open at a time, keyboard accessible, aria-expanded, animated height + chevron.
 * FAQs are passed in already localized by the (server) Home page.
 */
export default function FaqSection({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  const t = useTranslations("faqSection");

  return (
    <Section eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")}>
      <div className="mx-auto max-w-3xl divide-y divide-brand-green/10 rounded-2xl bg-white shadow-card">
        {faqs.map((faq, i) => {
          const isOpen = open === i;
          return (
            <div key={faq.q}>
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-button-${i}`}
                  className="flex min-h-[56px] w-full items-center justify-between gap-4 px-5 py-4 text-start font-semibold text-brand-dark transition-colors hover:text-brand-green sm:px-7"
                >
                  <span>{faq.q}</span>
                  <span
                    aria-hidden="true"
                    className={`shrink-0 text-xl text-gold-dark transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  >
                    ▾
                  </span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-button-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduce ? 0 : 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm leading-relaxed text-ink/70 sm:px-7">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
