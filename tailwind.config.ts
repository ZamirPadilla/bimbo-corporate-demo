import type { Config } from "tailwindcss";

// Globo de presencia (/demo/globo): paleta provisional tomada de las infografías del Informe Anual 2025
// («Celebramos 80 años de crecimiento» y el mapa de presencia). Se exporta porque la escena 3D la usa en JS.
export const globo = {
  noche: "#0E2A4F",
  oceano: "#123763",
  tierra: "#56739B",
  norteamerica: "#3170F7",
  mexico: "#B9DBFF",
  latinoamerica: "#4FA3E8",
  eaa: "#6E7BFF",
  rotulo: "#5AAEF0",
};

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bimbo: {
          red: "#E30613",
          blue: "#003DA5",
          cream: "#FFF8E7",
          dark: "#1A1A1A",
        },
        globo,
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
