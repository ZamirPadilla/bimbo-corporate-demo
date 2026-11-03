import type { Config } from "tailwindcss";

/**
 * Paleta oficial — abstracción del Informe Anual Integrado 2025 de Grupo Bimbo
 * (manual de identidad de referencia BMB-00334). Un color por pilar; nunca degradados.
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Papel: base cálida para el corporativo
        papel: "#F6EEDF",      // Masa
        miga: "#EFE2C8",       // Miga
        crema: "#FAE5C5",
        hueso: "#FBF8F2",

        // Tinta
        tinta: {
          DEFAULT: "#1A1D24",
          suave: "#6B6F7A",
          regla: "#E3DCCD",
        },

        // Corporativo
        azul: {
          DEFAULT: "#15359D",   // Azul Bimbo (informe 2025)
          medio: "#2253B1",
          claro: "#8FC9E6",
          noche: "#0F2F51",     // Para cifras y footer
          900: "#061730",
        },
        rojo: "#EE353A",         // Rojo logotipo oficial

        // PARA TI · Nutrición
        paraTi: {
          DEFAULT: "#DF8A35",   // Naranja
          hornear: "#954F1E",   // Café horneado
          caramelo: "#BD8952",
        },

        // PARA LA VIDA · Gente y comunidad
        paraLaVida: {
          DEFAULT: "#D33D66",   // Magenta
          vino: "#A02949",
          rosa: "#E2838C",
        },

        // PARA LA NATURALEZA · Planeta
        paraLaNaturaleza: {
          DEFAULT: "#479851",   // Verde
          bosque: "#1B4A31",
        },

        // CIMIENTOS · Calidad e inocuidad
        cimientos: {
          DEFAULT: "#BE973C",   // Mostaza
          arena: "#DFC389",
        },

        // GOBIERNO corporativo
        gobierno: {
          DEFAULT: "#6EB3AD",   // Menta
          pizarra: "#34596E",
          ambar: "#EEB14F",
          clara: "#91CEC9",
        },
      },

      fontFamily: {
        // Outfit cubre display + texto + datos (Google Fonts, licencia libre).
        // La familia oficial Poleno requiere Adobe Fonts; cuando se tenga, se agrega como
        // primera opción en var(--font-outfit).
        display: ["var(--font-outfit)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-outfit)", "ui-sans-serif", "system-ui", "sans-serif"],
      },

      fontSize: {
        // Tipografía fluida para titulares a escala "informe anual"
        "silaba-sm": ["clamp(3rem, 10vw, 6rem)", { lineHeight: "0.82", letterSpacing: "-0.04em" }],
        "silaba": ["clamp(4rem, 15vw, 11rem)", { lineHeight: "0.8", letterSpacing: "-0.04em" }],
        "silaba-lg": ["clamp(5rem, 20vw, 16rem)", { lineHeight: "0.78", letterSpacing: "-0.05em" }],
        "cifra-sm": ["clamp(3rem, 8vw, 5.5rem)", { lineHeight: "0.85", letterSpacing: "-0.03em" }],
        "cifra": ["clamp(4rem, 12vw, 9rem)", { lineHeight: "0.82", letterSpacing: "-0.04em" }],
      },

      animation: {
        "fade-up": "fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
        "blur-in": "blurIn 1.2s cubic-bezier(0.22, 1, 0.36, 1) both",
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
