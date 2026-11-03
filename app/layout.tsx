import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

/**
 * Outfit es la familia tipográfica confirmada en los materiales 2025 de Grupo Bimbo
 * (manual de identidad de referencia BMB-00334). Google Fonts, licencia libre (OFL).
 * Archivos locales en public/fonts/ para que el build sea reproducible y no dependa
 * de la red del runner de CI.
 *
 * Poleno (Adobe Fonts) se agregará como primaria cuando se asegure la licencia web.
 */
const outfit = localFont({
  src: [
    { path: "../public/fonts/outfit-300.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/outfit-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/outfit-500.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/outfit-600.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/outfit-700.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/outfit-800.woff2", weight: "800", style: "normal" },
    { path: "../public/fonts/outfit-900.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Grupo Bimbo | Celebramos lo que nos une",
  description:
    "La panificadora más grande del mundo. 80 años horneando, +100 marcas, 39 países de operación. Alimentamos un mundo mejor.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={outfit.variable}>
      <body className="antialiased bg-papel text-tinta font-sans">{children}</body>
    </html>
  );
}
