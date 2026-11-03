import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { paginaPorSlug, paginas } from "@/content/paginas";
import { plano } from "@/content/resolver";
import Seccion from "@/components/wireframe/Seccion";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return paginas.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pagina = paginaPorSlug((await params).slug);
  if (!pagina) return {};
  return { title: `Wireframe · ${plano(pagina.meta.title)}`, description: plano(pagina.meta.description) };
}

export default async function PaginaWireframe({ params }: Props) {
  const pagina = paginaPorSlug((await params).slug);
  if (!pagina) notFound();
  return (
    <main>
      <div className="border-b border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-neutral-500 md:px-6">
          <p>
            <span className="font-semibold text-neutral-700">Ruta propuesta:</span> {pagina.ruta} ·{" "}
            <span className="font-semibold text-neutral-700">Audiencias:</span> {pagina.audiencias.join(", ")}
          </p>
          <p className="mt-1">
            <span className="font-semibold text-neutral-700">title:</span> {plano(pagina.meta.title)} ({plano(pagina.meta.title).length} car.) ·{" "}
            <span className="font-semibold text-neutral-700">description:</span> {plano(pagina.meta.description)} ({plano(pagina.meta.description).length} car.)
          </p>
        </div>
      </div>
      {pagina.secciones.map((s, i) => (
        <Seccion key={s.id} s={s} primera={i === 0} />
      ))}
    </main>
  );
}
