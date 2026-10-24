import { siteConfig } from "@/lib/site-config";

/**
 * Google Maps embed of the QIT campus location (Mana Ahamadani,
 * Dera Ghazi Khan — link supplied by Ali 2026-10-24). Keyless embed.
 */
export default function CampusMap({ className = "" }: { className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl shadow-card ${className}`}>
      <iframe
        title="QIT Quran Academy location — Mana Ahamadani, Dera Ghazi Khan (Google Maps)"
        src={siteConfig.mapEmbedUrl}
        className="h-full w-full border-0"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
