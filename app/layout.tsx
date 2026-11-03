import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grupo Bimbo — Demo Corporativa",
  description:
    "Demo pública de la página corporativa de Grupo Bimbo. Proyecto abierto a contribuciones de la comunidad.",
  // Íconos en public/iconos (ver su README). Subir ?v= al cambiarlos: los navegadores guardan el favicon mucho tiempo.
  icons: {
    icon: [
      { url: "/iconos/favicon.ico?v=1", sizes: "16x16" },
      { url: "/iconos/favicon-16x16.png?v=1", type: "image/png", sizes: "16x16" },
      { url: "/iconos/icon-192.png?v=1", type: "image/png", sizes: "192x192" },
    ],
    shortcut: "/iconos/favicon.ico?v=1",
    apple: { url: "/iconos/apple-touch-icon.png?v=1", sizes: "180x180" },
  },
  manifest: "/iconos/site.webmanifest",
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
