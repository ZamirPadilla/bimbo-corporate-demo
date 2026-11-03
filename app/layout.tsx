import type { Metadata } from "next";
import { Barlow_Condensed, Fraunces, Inter } from "next/font/google";
import "./globals.css";

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const serif = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Grupo Bimbo | Alimentamos un mundo mejor",
  description:
    "La panificadora más grande del mundo: más de 100 marcas, 39 países de operación y una estrategia pública de sustentabilidad.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${display.variable} ${serif.variable} ${sans.variable}`}
    >
      <body className="antialiased bg-harina text-tinta">{children}</body>
    </html>
  );
}
