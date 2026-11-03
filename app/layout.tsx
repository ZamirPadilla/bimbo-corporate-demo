import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

/**
 * Outfit es la familia tipográfica confirmada en los materiales 2025 de Grupo Bimbo
 * (manual de identidad de referencia BMB-00334). Google Fonts, licencia libre.
 * Poleno (Adobe Fonts) se agregará como primaria cuando se asegure la licencia web.
 */
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
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
