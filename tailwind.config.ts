import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Bimbo: base cálida tipo pan recién horneado + azul oficial.
        // Valores aproximados; el azul oficial se validará con la guía de marca.
        harina: "#FBF7F0",       // Fondo principal, crema cálida
        migaja: "#FFFDF9",       // Fondo alterno de cards
        trigo: {
          50: "#FBF4E4",
          100: "#F3E8D5",
          200: "#E9C47C",         // trigo
          400: "#D4A24A",
          600: "#C8873A",         // corteza
        },
        azul: {
          DEFAULT: "#003DA5",     // Azul Bimbo (aprox)
          500: "#0A4DA2",
          700: "#0D2A52",         // azul noche
          900: "#061730",
        },
        tinta: {
          DEFAULT: "#1E2230",     // Texto principal (no negro puro)
          suave: "#6E675C",       // Gris cálido secundario
        },
        accion: {
          rojo: "#E0442E",         // CTA cálido (uso moderado)
          rojoBimbo: "#E30613",   // Rojo clásico Bimbo (para el logo)
        },
      },
      fontFamily: {
        // Barlow Condensed: titulares bold mayúsculas tipo Henrietta
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        // Fraunces: serif editorial para mensaje largo tipo Polpharma
        serif: ["var(--font-serif)", "Georgia", "serif"],
        // Inter: UI, datos, texto corto
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Tipografía fluida para titulares de impacto
        "hero-sm": ["clamp(2.5rem, 7vw, 4rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "hero": ["clamp(3rem, 10vw, 8.5rem)", { lineHeight: "0.9", letterSpacing: "-0.03em" }],
        "mega": ["clamp(4rem, 14vw, 12rem)", { lineHeight: "0.85", letterSpacing: "-0.04em" }],
      },
      animation: {
        "fade-up": "fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
        "blur-in": "blurIn 1.2s cubic-bezier(0.22, 1, 0.36, 1) both",
        "shimmer": "shimmer 2.4s linear infinite",
        "rise": "rise 1s cubic-bezier(0.34, 1.56, 0.64, 1) both",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blurIn: {
          "0%": { opacity: "0", filter: "blur(16px)", transform: "scale(1.02)" },
          "100%": { opacity: "1", filter: "blur(0)", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(30px) scale(0.95)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
