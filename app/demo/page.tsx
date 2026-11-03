import type { Metadata } from "next";
import Link from "next/link";
import { paginas } from "@/content/paginas";
import { benchmark, correccionesDelInforme, decisiones, documentos, dudas, estado, fuentes, marcadoresPendientes } from "@/content/indice";

export const metadata: Metadata = {
  title: "Índice de la demo · Propuesta de sitio corporativo",
  description: "Documentación, wireframes, decisiones, benchmark y dudas vigentes de la propuesta.",
  robots: { index: false, follow: false },
};

function Bloque({ id, titulo, children }: { id: string; titulo: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className="border-t border-neutral-200 py-12">
      <h2 id={`${id}-titulo`} className="text-2xl font-bold tracking-tight">
        {titulo}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

const fmt = (n: number | null, suf = "") => (n === null ? "n/c" : `${n}${suf}`);

export default function IndiceDemo() {
  const marcadores = marcadoresPendientes();
  const indice = [
    ["documentacion", "Documentación"],
    ["wireframes", "Wireframes"],
    ["decisiones", "Decisiones"],
    ["benchmark", "Benchmark de rendimiento"],
    ["dudas", "Dudas vigentes"],
    ["fuentes", "Fuentes"],
  ];
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <div className="bg-neutral-900 px-4 py-2 text-center text-xs text-neutral-300">
        Propuesta de sitio corporativo · no es el sitio oficial de Grupo Bimbo ni está afiliada a la empresa
      </div>
      <main className="mx-auto max-w-5xl px-4 py-14 md:px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">Índice de la demo</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight md:text-5xl">Propuesta de sitio corporativo para Grupo Bimbo</h1>
        <p className="mt-4 max-w-2xl text-lg text-neutral-600">{estado.etapa}</p>
        <p className="mt-2 text-sm text-neutral-500">
          Actualizado el {estado.actualizado} · rama <code>{estado.rama}</code> ·{" "}
          <a href={estado.pr} className="underline underline-offset-4">
            PR del copy y los wireframes
          </a>
        </p>

        <nav aria-label="Secciones del índice" className="mt-8 flex flex-wrap gap-2">
          {indice.map(([id, nombre]) => (
            <a key={id} href={`#${id}`} className="rounded-full border border-neutral-300 px-4 py-1.5 text-sm hover:border-neutral-900">
              {nombre}
            </a>
          ))}
        </nav>

        <dl className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            [String(paginas.length), "páginas con copy y wireframe"],
            [String(decisiones.length), "decisiones tomadas"],
            [String(dudas.length), "dudas vigentes"],
            [String(marcadores.length), "marcadores en el copy"],
          ].map(([n, t]) => (
            <div key={t} className="border-t border-neutral-300 pt-3">
              <dt className="text-xs text-neutral-500">{t}</dt>
              <dd className="text-3xl font-bold">{n}</dd>
            </div>
          ))}
        </dl>

        <Bloque id="documentacion" titulo="Documentación">
          <ul className="divide-y divide-neutral-200 border-y border-neutral-200">
            {documentos.map((d) => (
              <li key={d.ruta} className="flex flex-col gap-1 py-4 md:flex-row md:items-baseline md:justify-between">
                <a href={d.url} className="font-medium underline underline-offset-4">
                  {d.titulo}
                </a>
                <span className="text-sm text-neutral-600">{d.descripcion}</span>
              </li>
            ))}
            <li className="flex flex-col gap-1 py-4 md:flex-row md:items-baseline md:justify-between">
              <a href={`${documentos[0].url.replace("copy/README.md", "INDICE.md")}`} className="font-medium underline underline-offset-4">
                Este índice en Markdown
              </a>
              <span className="text-sm text-neutral-600">docs/INDICE.md, generado con npm run copy:docs.</span>
            </li>
          </ul>
        </Bloque>

        <Bloque id="wireframes" titulo="Wireframes">
          <ul className="grid gap-3 md:grid-cols-2">
            {paginas.map((p, i) => (
              <li key={p.slug}>
                <Link href={`/wireframes/${p.slug}`} className="block rounded-xl border border-neutral-300 p-4 hover:border-neutral-900">
                  <span className="text-xs text-neutral-500">
                    {String(i + 1).padStart(2, "0")} · {p.ruta} · {p.secciones.length} secciones
                  </span>
                  <span className="mt-1 block font-semibold">{p.nombre}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Bloque>

        <Bloque id="decisiones" titulo="Decisiones tomadas">
          <p className="max-w-3xl text-neutral-600">
            Criterio: cuando las páginas del sitio actual no coinciden, manda el último reporte publicado, el Informe Anual 2025.
          </p>
          <ol className="mt-6 space-y-4">
            {decisiones.map((d, i) => (
              <li key={d.pregunta} className="rounded-xl border border-neutral-300 p-5">
                <p className="text-sm text-neutral-500">
                  {i + 1}. {d.pregunta}
                </p>
                <p className="mt-1 font-semibold">{d.decision}</p>
                <p className="mt-2 text-sm text-neutral-600">{d.efecto}</p>
                <p className="mt-2 text-xs text-neutral-500">Fuente: {d.fuente}</p>
              </li>
            ))}
          </ol>
          <h3 className="mt-8 font-semibold">Otras correcciones que trajo el informe</h3>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-neutral-700">
            {correccionesDelInforme.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </Bloque>

        <Bloque id="benchmark" titulo="Benchmark de rendimiento">
          <p className="max-w-3xl text-sm text-neutral-600">{benchmark.nota}</p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <caption className="sr-only">Rendimiento de la página de inicio de cuatro empresas de alimentos</caption>
              <thead className="border-b border-neutral-300 text-xs text-neutral-500">
                <tr>
                  <th scope="col" className="py-2 pr-4 font-medium">Sitio</th>
                  <th scope="col" className="py-2 pr-4 text-right font-medium">Móvil</th>
                  <th scope="col" className="py-2 pr-4 text-right font-medium">Escritorio</th>
                  <th scope="col" className="py-2 pr-4 text-right font-medium">Contenido principal (móvil)</th>
                  <th scope="col" className="py-2 pr-4 text-right font-medium">Peso</th>
                  <th scope="col" className="py-2 text-right font-medium">Peticiones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {benchmark.filas.map((f) => (
                  <tr key={f.sitio}>
                    <th scope="row" className="py-3 pr-4 font-medium">
                      {f.sitio}
                      {f.nota ? <span className="block text-xs font-normal text-neutral-500">{f.nota}</span> : null}
                    </th>
                    <td className="py-3 pr-4 text-right tabular-nums">{fmt(f.movil)}</td>
                    <td className="py-3 pr-4 text-right tabular-nums">{fmt(f.escritorio)}</td>
                    <td className="py-3 pr-4 text-right tabular-nums">{fmt(f.lcpMovil, " s")}</td>
                    <td className="py-3 pr-4 text-right tabular-nums">{fmt(f.pesoMb, " MB")}</td>
                    <td className="py-3 text-right tabular-nums">{fmt(f.peticiones)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm font-medium">{benchmark.metas}</p>
        </Bloque>

        <Bloque id="dudas" titulo={`Dudas vigentes (${dudas.length})`}>
          <ul className="divide-y divide-neutral-200 border-y border-neutral-200">
            {dudas.map((d) => (
              <li key={d.pregunta} className="grid gap-1 py-3 text-sm md:grid-cols-[9rem_1fr_11rem] md:gap-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">{d.tema}</span>
                <span>{d.pregunta}</span>
                <span className="text-neutral-500 md:text-right">{d.quien}</span>
              </li>
            ))}
          </ul>
          <details className="mt-6">
            <summary className="cursor-pointer text-sm font-medium">Marcadores en el copy ({marcadores.length})</summary>
            <ul className="mt-3 space-y-1 text-sm text-neutral-700">
              {marcadores.map((m, i) => (
                <li key={i}>
                  {m.pagina} › {m.seccion}: <code className="text-amber-800">{m.marcador}</code>
                </li>
              ))}
            </ul>
          </details>
        </Bloque>

        <Bloque id="fuentes" titulo="Fuentes">
          <ul className="list-disc space-y-1 pl-5 text-sm">
            {fuentes.map((f) => (
              <li key={f.url}>
                <a href={f.url} className="underline underline-offset-4">
                  {f.titulo}
                </a>
              </li>
            ))}
          </ul>
        </Bloque>
      </main>
    </div>
  );
}
