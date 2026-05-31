/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'DM Sans'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      transitionDuration: {
        400: "400ms",
      },
      colors: {
        accent: {
          green: "#10b981",
          mint: "#6ee7b7",
          dark: "#064e3b",
        },
      },
      backgroundImage: {
        "green-glow": "radial-gradient(ellipse at center, rgba(16,185,129,0.08) 0%, transparent 70%)",
      },
    },
  },
  plugins: [],
};
