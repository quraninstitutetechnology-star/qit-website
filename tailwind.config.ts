import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#0B5D4A",
          dark: "#0D2B54",
          light: "#E7F2ED",
        },
        gold: {
          DEFAULT: "#D9A441",
          dark: "#B9862F",
          light: "#F3E3BC",
        },
        cream: "#FAF7F0",
        ink: "#1B1B1B",
        whatsapp: "#25D366",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        arabic: ["var(--font-arabic)", "serif"],
        naskh: ["var(--font-naskh)", "serif"],
        nastaliq: ["var(--font-nastaliq)", "serif"],
      },
      boxShadow: {
        card: "0 4px 24px rgba(11, 93, 74, 0.10)",
        lift: "0 16px 40px rgba(11, 93, 74, 0.20)",
        goldglow: "0 10px 30px rgba(217, 164, 65, 0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
