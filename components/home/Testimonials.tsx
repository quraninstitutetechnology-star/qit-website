"use client";

import { useState } from "react";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import { testimonials } from "@/lib/testimonials";

/**
 * Testimonials slider (spec §5.9) — 3 PLACEHOLDER slots clearly marked "Sample".
 * No stars, no ratings, excluded from structured data.
 */
export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const t = testimonials[index];

  return (
    <Section
      eyebrow="Testimonials"
      title="What Our Students Say"
      intro="Real reviews from QIT students and parents will be published here."
    >
      <div className="mx-auto max-w-3xl">
        <Card className="p-8 text-center sm:p-10">
          <span className="rounded-full bg-gold-light px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-gold-dark">
            Sample — replace with real review
          </span>
          <blockquote className="mt-5 text-lg italic leading-relaxed text-ink/80">“{t.text}”</blockquote>
          <p className="mt-5 font-bold text-brand-dark">{t.name}</p>
          <p className="text-sm text-ink/60">{t.location}</p>
        </Card>
        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => setIndex((index - 1 + testimonials.length) % testimonials.length)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-dark shadow-card transition hover:bg-gold"
          >
            ‹
          </button>
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show testimonial ${i + 1}`}
              aria-current={index === i}
              onClick={() => setIndex(i)}
              className="flex h-11 w-11 items-center justify-center"
            >
              <span className={`block h-2.5 rounded-full transition-all ${index === i ? "w-8 bg-gold" : "w-2.5 bg-brand-green/30"}`} />
            </button>
          ))}
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => setIndex((index + 1) % testimonials.length)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-dark shadow-card transition hover:bg-gold"
          >
            ›
          </button>
        </div>
      </div>
    </Section>
  );
}
