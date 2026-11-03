import type { Metadata } from "next";
import { plano } from "@/content/resolver";
import { PaginaGlobo } from "@/components/globo/PaginaGlobo";

export const metadata: Metadata = {
  title: "Globo de presencia · Demo Grupo Bimbo",
  description: plano("Prototipo del globo de presencia: operamos en {paisesOperacion} países y nuestros productos llegan a {paisesPresencia}."),
  robots: { index: false, follow: false },
};

export default function GloboV1() {
  return <PaginaGlobo />;
}
