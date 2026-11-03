import Link from "next/link";
import { paginas } from "@/content/paginas";
import { porConfirmar } from "@/content/cifras";
import { plano } from "@/content/resolver";

export default function IndiceWireframes() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-14 md:px-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">Propuesta · copy y wireframes</p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight">Mapa del sitio</h1>
      <p className="mt-4 max-w-2xl text-neutral-600">
        Ocho páginas con el copy propuesto. Cada página muestra sus secciones en orden, con notas de diseño. Las cifras salen de una sola
        fuente y las que no coinciden entre páginas del sitio actual aparecen marcadas.
      </p>
      <ol className="mt-10 grid gap-4 md:grid-cols-2">
        {paginas.map((p, i) => (
          <li key={p.slug}>
            <Link href={`/wireframes/${p.slug}`} className="block rounded-xl border border-neutral-300 p-5 hover:border-neutral-900">
              <p className="text-xs text-neutral-500">
                {String(i + 1).padStart(2, "0")} · {p.ruta} · {p.secciones.length} secciones
              </p>
              <h2 className="mt-1 text-xl font-bold">{p.nombre}</h2>
              <p className="mt-2 text-sm text-neutral-600">{plano(p.meta.description)}</p>
            </Link>
          </li>
        ))}
      </ol>
      <section className="mt-14">
        <h2 className="text-2xl font-bold">Cifras por confirmar ({porConfirmar.length})</h2>
        {porConfirmar.length === 0 && (
          <p className="mt-4 text-sm text-neutral-600">
            Ninguna: las cifras que no coincidían se resolvieron con el Informe Anual 2025. Ver{" "}
            <Link href="/demo#decisiones" className="underline underline-offset-4">
              decisiones
            </Link>
            .
          </p>
        )}
        <ul className="mt-4 divide-y divide-neutral-200 border-y border-neutral-200">
          {porConfirmar.map((c) => (
            <li key={c.id} className="py-3 text-sm">
              <span className="font-semibold">{c.etiqueta}:</span> {c.valor} — <span className="text-neutral-600">{c.nota}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
