import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/views/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        arctic: {
          blue: {
            "600": "#253BFF",
          },
        },
        blue: {
          gray: {
            "50": "#F9FAFB",
            "200": "#EAECF0",
            "300": "#D0D5DD",
            "600": "#475467",
            "800": "#1D2939",
            "900": "#101828",
          },
        },
        lime: {
          green: {
            "400": "#9FF443",
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
