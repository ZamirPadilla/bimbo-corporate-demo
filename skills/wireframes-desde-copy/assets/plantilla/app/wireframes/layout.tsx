import type { Metadata } from "next";
import Link from "next/link";
import { paginas } from "@/content/paginas";
import { proyecto } from "@/content/proyecto";

export const metadata: Metadata = {
  title: "Wireframes · Propuesta de sitio corporativo",
  robots: { index: false, follow: false },
};

export default function LayoutWireframes({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <div className="bg-neutral-900 px-4 py-2 text-center text-xs text-neutral-300">
        Wireframe de una propuesta · no es el sitio oficial de {proyecto.cliente} ·{" "}
        <span className="underline decoration-dashed decoration-amber-500">subrayado</span> = cifra por confirmar
      </div>
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur">
        <nav aria-label="Páginas del wireframe" className="mx-auto flex max-w-6xl items-center gap-6 overflow-x-auto px-4 py-3 text-sm md:px-6">
          <Link href="/wireframes" className="shrink-0 font-bold">
            {proyecto.cliente} <span className="font-normal text-neutral-400">· wireframes</span>
          </Link>
          {paginas.map((p) => (
            <Link key={p.slug} href={`/wireframes/${p.slug}`} className="shrink-0 text-neutral-600 hover:text-neutral-900">
              {p.nombre}
            </Link>
          ))}
        </nav>
      </header>
      {children}
    </div>
  );
}
