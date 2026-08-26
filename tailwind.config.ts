import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./emails/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "forest-deep": "#16302A",
        forest: "#33513A",
        sage: "#DEE0C4",
        "gold-light": "#EFD164",
        "gold-deep": "#C6A63F",
        cream: "#F4F3EA",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-body)", "sans-serif"],
      },
      maxWidth: {
        wrap: "1280px",
      },
      boxShadow: {
        tile: "0 30px 60px -20px rgba(22,48,42,0.35)",
      },
      keyframes: {
        heroZoom: {
          "0%": { transform: "scale(1.08)" },
          "100%": { transform: "scale(1)" },
        },
        scrollLine: {
          "0%": { top: "-46px" },
          "100%": { top: "46px" },
        },
      },
      animation: {
        heroZoom: "heroZoom 16s ease-out forwards",
        scrollLine: "scrollLine 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
