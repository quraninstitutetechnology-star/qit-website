import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  children: ReactNode;
  tone?: "cream" | "white" | "green";
  className?: string;
}

const tones = {
  cream: "bg-cream",
  white: "bg-white",
  green: "bg-brand-green text-white",
};

export default function Section({ id, eyebrow, title, intro, children, tone = "cream", className = "" }: SectionProps) {
  const dark = tone === "green";
  return (
    <section id={id} className={`${tones[tone]} scroll-mt-28 py-14 sm:py-20 ${className}`}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            {eyebrow ? (
              <p className={`mb-2 text-xs font-bold uppercase tracking-[0.2em] ${dark ? "text-gold-light" : "text-gold-dark"}`}>
                {eyebrow}
              </p>
            ) : null}
            <h2 className={`text-3xl font-bold sm:text-4xl ${dark ? "text-white" : "text-brand-dark"}`}>{title}</h2>
            {intro ? <p className={`mt-3 ${dark ? "text-white/85" : "text-ink/70"}`}>{intro}</p> : null}
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
