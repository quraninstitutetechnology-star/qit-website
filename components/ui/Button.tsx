import { Link } from "@/i18n/routing";
import type { ReactNode } from "react";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "gold" | "green" | "outline" | "whatsapp";
  className?: string;
  external?: boolean;
}

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  gold: "bg-gold text-brand-dark hover:bg-gold-dark shadow-goldglow",
  green: "bg-brand-green text-white hover:bg-brand-dark shadow-card",
  outline: "bg-white/10 text-white border-2 border-white/70 hover:bg-white hover:text-brand-dark backdrop-blur-sm",
  whatsapp: "bg-whatsapp text-white hover:brightness-110 shadow-card",
};

/** Shared button with spec §4.6 motion: hover lift + scale + glow, press scale, shine sweep. */
export default function Button({ href, children, variant = "gold", className = "", external = false }: ButtonProps) {
  const cls = `btn-shine inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.04] active:scale-[0.97] motion-reduce:transform-none ${variants[variant]} ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
