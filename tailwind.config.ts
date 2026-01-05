import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#0d0d0d",
        parchment: "#e8e6e1",
        ash: "#6b6b6b",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "serif"],
      },
      maxWidth: {
        prose: "72ch",
      },
      spacing: {
        section: "clamp(4rem, 12vh, 8rem)",
      },
      transitionTimingFunction: {
        weight: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
      screens: {
        'docs': '1180px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
