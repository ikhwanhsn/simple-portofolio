import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        text: "rgb(var(--text) / <alpha-value>)",
        outline: "rgb(var(--outline) / <alpha-value>)",
        cardHover: "rgb(var(--card-hover) / <alpha-value>)",
        buttonHover: "rgb(var(--button-hover) / <alpha-value>)",
        backgroundCard: "rgb(var(--background-card) / <alpha-value>)",
        greyText: "rgb(var(--grey-text) / <alpha-value>)",
        highlight: "rgb(var(--highlight) / <alpha-value>)",
        icon: "rgb(var(--icon) / <alpha-value>)",
      },
      fontFamily: {
        sans: [
          "var(--font-geist-sans)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
