import type { Metadata } from "next";
import { plano } from "@/content/resolver";
import { PaginaGlobo } from "@/components/globo/PaginaGlobo";

export const metadata: Metadata = {
  title: "Globo de presencia v2 · Demo Grupo Bimbo",
  description: plano("Laboratorio de granos del globo de presencia: operamos en {paisesOperacion} países."),
  robots: { index: false, follow: false },
};

// v2: multigrano en color natural (trigo, avena, ajonjolí y maíz); el panel deja comparar cada grano.
export default function GloboV2() {
  return <PaginaGlobo grano="multigrano" paleta="natural" laboratorio />;
}
