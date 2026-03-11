/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"],
        mono: ["JetBrains Mono", "monospace"],
        retro: ['"Press Start 2P"', "cursive"],
      },
      colors: {
        "vibe-dark": "#0a0a0a",
        "vibe-light": "#ffffff",
        "neon-blue": "#00f3ff",
        "neon-pink": "#ff00ff",
        "retro-green": "#33ff33",
        "elegant-gold": "#d4af37",
        vibe: {
          accent: "rgb(from var(--vibe-accent) r g b / <alpha-value>)",
          bg: "var(--vibe-bg)",
          text: "var(--vibe-text)",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
