import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `QIT — ${siteConfig.fullName}`;

/** Branded 1200×630 OG image (spec §9): deep green + gold, arch motif, slogan. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #0B5D4A 0%, #073F32 100%)",
          color: "#FAF7F0",
          padding: 64,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "4px solid #D9A441",
            borderRadius: "200px 200px 24px 24px",
            padding: "36px 72px",
            fontSize: 110,
            fontWeight: 700,
            color: "#D9A441",
            letterSpacing: 4,
          }}
        >
          QIT
        </div>
        <div style={{ marginTop: 36, fontSize: 44, fontWeight: 700, textAlign: "center" }}>
          {siteConfig.fullName}
        </div>
        <div style={{ marginTop: 12, fontSize: 30, fontStyle: "italic", color: "#F3E3BC", textAlign: "center" }}>
          {siteConfig.slogan}
        </div>
        <div style={{ marginTop: 28, fontSize: 24, color: "#FAF7F0", opacity: 0.85 }}>
          Online Quran Classes · Khanpur, Dera Ghazi Khan
        </div>
      </div>
    ),
    { ...size }
  );
}
