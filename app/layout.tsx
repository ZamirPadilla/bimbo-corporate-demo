import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grupo Bimbo — Demo Corporativa",
  description:
    "Demo pública de la página corporativa de Grupo Bimbo. Proyecto abierto a contribuciones de la comunidad.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
