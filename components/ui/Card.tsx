import type { ReactNode } from "react";

/** Card with spec §4.6 hover: lift -6px, deeper shadow, gold border glow. */
export default function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border-2 border-transparent bg-white shadow-card transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-gold hover:shadow-lift motion-reduce:transform-none ${className}`}
    >
      {children}
    </div>
  );
}
