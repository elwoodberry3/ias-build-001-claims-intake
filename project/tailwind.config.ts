import type { Config } from "tailwindcss";

/**
 * Design tokens.
 *
 * IAS core palette (Deep Slate Teal / Muted Seafoam / Kinetic Emerald)
 * is the engine that powers the feature. Obsidian Ledger Capital's own
 * chrome sits on top as the host platform: a graphite/obsidian shell with
 * a slate-blue institutional accent. The demo feature itself keeps the
 * IAS accent (Kinetic Emerald) reserved for genuinely live agent activity,
 * per brand Article VI.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Obsidian Ledger host chrome
        obsidian: {
          950: "#0B0F14", // deepest shell (top nav, rails)
          900: "#11161D", // panels on dark
          800: "#1A222C", // raised dark surfaces
          700: "#26303C", // hairlines on dark
          400: "#8A97A6", // muted text on dark
          200: "#C7D0DA", // labels on dark
          ledger: "#4F86C6", // institutional slate-blue accent
          ledgerdim: "#2E5F94",
        },
        // IAS engine palette (the agent belongs to IAS)
        ias: {
          primary: "#0A2E36",
          secondary: "#3F7266",
          accent: "#00E5A3", // live-only, Article VI
          accentPressed: "#00B882",
          dark: "#111827",
          light: "#F9FAFB",
          muted: "#6B7280",
          body: "#374151",
          mid: "#E5E7EB",
          disabled: "#9CA3AF",
        },
        // Semantic state fills
        state: {
          warnBg: "#FAEEDA",
          warnFg: "#854F0B",
          okBg: "#E1F5EE",
          okFg: "#085041",
          riskBg: "#FCE8E8",
          riskFg: "#9B1C1C",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "14px",
      },
      maxWidth: {
        shell: "1180px",
      },
    },
  },
  plugins: [],
};

export default config;
