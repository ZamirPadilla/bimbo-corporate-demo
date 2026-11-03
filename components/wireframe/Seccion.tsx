import Link from "next/link";
import { cifras } from "@/content/cifras";
import type { Cta, Seccion as TSeccion } from "@/content/tipos";
import Texto from "./Texto";

// Wireframe de baja fidelidad: grises, cajas de imagen tachadas y notas de diseño.
// El copy es el definitivo propuesto; el diseño visual se decide después.

function Imagen({ etiqueta, alto = "h-48" }: { etiqueta: string; alto?: string }) {
  return (
    <div className={`relative ${alto} w-full overflow-hidden rounded-lg border border-neutral-300 bg-neutral-100`} role="img" aria-label={`Espacio para imagen: ${etiqueta}`}>
      <svg className="absolute inset-0 h-full w-full text-neutral-300" preserveAspectRatio="none" aria-hidden="true">
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" />
      </svg>
      <span className="absolute inset-x-3 bottom-3 text-xs text-neutral-500">{etiqueta}</span>
    </div>
  );
}

function Boton({ cta, secundario = false }: { cta: Cta; secundario?: boolean }) {
  const clase = secundario
    ? "border border-neutral-400 text-neutral-800 hover:border-neutral-800"
    : "bg-neutral-800 text-white hover:bg-neutral-950";
  const contenido = <Texto>{cta.texto}</Texto>;
  if (cta.destino.startsWith("/")) {
    return (
      <Link href={cta.destino} className={`inline-flex rounded-full px-5 py-2.5 text-sm font-medium ${clase}`}>
        {contenido}
      </Link>
    );
  }
  return (
    <a href={cta.destino.startsWith("[") ? "#" : cta.destino} className={`inline-flex rounded-full px-5 py-2.5 text-sm font-medium ${clase}`}>
      {contenido}
    </a>
  );
}

function Rotulo({ children }: { children?: string }) {
  if (!children) return null;
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
      <Texto>{children}</Texto>
    </p>
  );
}

function Titulo({ children, nivel = 2 }: { children: string; nivel?: 1 | 2 }) {
  const clase = nivel === 1 ? "text-4xl md:text-6xl font-extrabold leading-tight" : "text-2xl md:text-4xl font-bold";
  const Tag = nivel === 1 ? "h1" : "h2";
  return (
    <Tag className={`mt-2 tracking-tight text-neutral-900 ${clase}`}>
      <Texto>{children}</Texto>
    </Tag>
  );
}

export function Nota({ children }: { children?: string }) {
  if (!children) return null;
  return (
    <aside className="mt-6 rounded-md border border-dashed border-sky-500 bg-sky-50 px-4 py-3 text-xs leading-relaxed text-sky-900">
      <span className="font-semibold">Nota de diseño · </span>
      {children}
    </aside>
  );
}

const columnas = { 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" } as const;

function Contenido({ s, primera }: { s: TSeccion; primera: boolean }) {
  switch (s.tipo) {
    case "hero":
      return (
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <Rotulo>{s.rotulo}</Rotulo>
            <Titulo nivel={primera ? 1 : 2}>{s.titular}</Titulo>
            <p className="mt-5 max-w-xl text-lg text-neutral-600">
              <Texto>{s.bajada}</Texto>
            </p>
            {s.ctas && (
              <div className="mt-8 flex flex-wrap gap-3">
                {s.ctas.map((c, i) => (
                  <Boton key={c.texto} cta={c} secundario={i > 0} />
                ))}
              </div>
            )}
          </div>
          <Imagen etiqueta={s.medio ?? "Foto o video de la sección"} alto="h-64 md:h-96" />
        </div>
      );
    case "texto":
      return (
        <div className="max-w-3xl">
          <Rotulo>{s.rotulo}</Rotulo>
          <Titulo>{s.titulo}</Titulo>
          {s.parrafos.map((p) => (
            <p key={p} className="mt-4 text-lg leading-relaxed text-neutral-600">
              <Texto>{p}</Texto>
            </p>
          ))}
          {s.cta && (
            <div className="mt-6">
              <Boton cta={s.cta} secundario />
            </div>
          )}
        </div>
      );
    case "cifras":
      return (
        <div>
          {s.titulo && <Titulo>{s.titulo}</Titulo>}
          <dl className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {s.ids.map((id) => {
              const c = cifras[id];
              return (
                <div key={id} className="border-t border-neutral-300 pt-4">
                  <dt className="text-xs text-neutral-500">{c.etiqueta}</dt>
                  <dd className="mt-1 text-2xl font-bold text-neutral-900">
                    <Texto>{`{${id}}`}</Texto>
                  </dd>
                  {"corte" in c && c.corte && <dd className="mt-1 text-[11px] text-neutral-400">Corte: {c.corte}</dd>}
                </div>
              );
            })}
          </dl>
        </div>
      );
    case "tarjetas":
      return (
        <div>
          <Rotulo>{s.rotulo}</Rotulo>
          <Titulo>{s.titulo}</Titulo>
          {s.intro && (
            <p className="mt-3 max-w-2xl text-neutral-600">
              <Texto>{s.intro}</Texto>
            </p>
          )}
          <div className={`mt-8 grid grid-cols-1 gap-4 ${columnas[s.columnas ?? 3]}`}>
            {s.items.map((it) => (
              <article key={it.titulo} className="rounded-xl border border-neutral-300 bg-white p-5">
                <div className="mb-4 h-10 w-10 rounded-md bg-neutral-200" aria-hidden="true" />
                <h3 className="font-semibold text-neutral-900">
                  <Texto>{it.titulo}</Texto>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  <Texto>{it.texto}</Texto>
                </p>
                {it.cta && (
                  <p className="mt-4 text-sm font-medium text-neutral-900 underline underline-offset-4">
                    <Texto>{it.cta.texto}</Texto>
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      );
    case "lista":
      return (
        <div>
          <Titulo>{s.titulo}</Titulo>
          {s.intro && <p className="mt-3 text-neutral-600"><Texto>{s.intro}</Texto></p>}
          <ul className="mt-6 flex flex-wrap gap-2">
            {s.items.map((it) => (
              <li key={it} className="rounded-full border border-neutral-300 px-4 py-2 text-sm text-neutral-700">
                <Texto>{it}</Texto>
              </li>
            ))}
          </ul>
        </div>
      );
    case "etapas":
      return (
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
          <div>
            <Titulo>{s.titulo}</Titulo>
            {s.intro && <p className="mt-3 text-neutral-600"><Texto>{s.intro}</Texto></p>}
            <ol className="mt-8 space-y-4">
              {s.items.map((it, i) => (
                <li key={it.titulo} className={`border-l-2 pl-4 ${i === 0 ? "border-neutral-900" : "border-neutral-200"}`}>
                  <p className="font-semibold text-neutral-900">
                    {i + 1}. <Texto>{it.titulo}</Texto>
                  </p>
                  <p className="text-sm text-neutral-600"><Texto>{it.texto}</Texto></p>
                </li>
              ))}
            </ol>
            <button type="button" className="mt-6 rounded-full border border-neutral-400 px-4 py-1.5 text-xs text-neutral-700">
              Pausar
            </button>
          </div>
          <Imagen etiqueta="Ilustración de la etapa activa" alto="h-72 md:h-full min-h-72" />
        </div>
      );
    case "eras":
      return (
        <div>
          <Titulo>{s.titulo}</Titulo>
          <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {s.items.map((it) => (
              <li key={it.periodo} className="rounded-xl border border-neutral-300 p-5">
                <p className="text-xs font-semibold text-neutral-500">{it.periodo}</p>
                <h3 className="mt-2 font-semibold text-neutral-900"><Texto>{it.titulo}</Texto></h3>
                <p className="mt-2 text-sm text-neutral-600"><Texto>{it.texto}</Texto></p>
              </li>
            ))}
          </ol>
        </div>
      );
    case "directorio":
      return (
        <div>
          <Titulo>{s.titulo}</Titulo>
          <p className="mt-3 text-neutral-600"><Texto>{s.intro}</Texto></p>
          <div className="mt-6 flex flex-col gap-3 md:flex-row">
            <label className="flex-1">
              <span className="sr-only">Buscar marca</span>
              <input type="search" placeholder="Buscar una marca, p. ej. Takis" className="w-full rounded-full border border-neutral-300 px-5 py-2.5 text-sm" />
            </label>
            {s.filtros.map((f) => (
              <span key={f} className="rounded-full border border-neutral-300 px-4 py-2.5 text-sm text-neutral-600">
                {f} ▾
              </span>
            ))}
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {s.muestra.map((m) => (
              <li key={m} className="flex aspect-square flex-col items-center justify-center rounded-xl border border-neutral-300 p-3 text-center">
                <span className="mb-2 h-8 w-16 rounded bg-neutral-200" aria-hidden="true" />
                <span className="text-sm font-semibold text-neutral-800">{m}</span>
                <span className="text-[11px] text-neutral-400">países · categoría</span>
              </li>
            ))}
          </ul>
        </div>
      );
    case "regiones": {
      const total = s.regiones.reduce((n, r) => n + r.paises.length, 0);
      return (
        <div>
          <Titulo>{s.titulo}</Titulo>
          <p className="mt-3 text-neutral-600"><Texto>{s.intro}</Texto></p>
          <Imagen etiqueta={`Mapa de presencia en relieve · ${total} países`} alto="h-56 mt-6" />
          <div className="mt-6 grid gap-6 md:grid-cols-4">
            {s.regiones.map((r) => (
              <div key={r.nombre}>
                <h3 className="font-semibold text-neutral-900">
                  {r.nombre} <span className="text-xs font-normal text-neutral-500">({r.paises.length})</span>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{r.paises.join(" · ")}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }
    case "noticias":
      return (
        <div>
          <Titulo>{s.titulo}</Titulo>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {Array.from({ length: s.cantidad }, (_, i) => (
              <article key={i} className="rounded-xl border border-neutral-300 p-4">
                <Imagen etiqueta="Foto de la nota (con texto alternativo)" alto="h-36" />
                <p className="mt-3 text-[11px] uppercase tracking-wider text-neutral-500">Categoría · Fecha</p>
                <div className="mt-2 h-4 w-11/12 rounded bg-neutral-200" />
                <div className="mt-2 h-4 w-8/12 rounded bg-neutral-200" />
              </article>
            ))}
          </div>
          <div className="mt-8">
            <Boton cta={s.cta} secundario />
          </div>
        </div>
      );
    case "distribuidor":
      return (
        <div>
          <Titulo>{s.titulo}</Titulo>
          {s.intro && <p className="mt-3 text-neutral-600"><Texto>{s.intro}</Texto></p>}
          <ul className="mt-8 grid gap-px overflow-hidden rounded-xl border border-neutral-300 bg-neutral-300 md:grid-cols-2 lg:grid-cols-3">
            {s.rutas.map((r) => (
              <li key={r.audiencia} className="bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">{r.audiencia}</p>
                <p className="mt-2 text-sm text-neutral-700"><Texto>{r.texto}</Texto></p>
                <p className="mt-3 text-sm font-medium text-neutral-900 underline underline-offset-4">
                  <Texto>{r.cta.texto}</Texto>
                </p>
              </li>
            ))}
          </ul>
        </div>
      );
    case "descargas":
      return (
        <div>
          <Titulo>{s.titulo}</Titulo>
          <ul className="mt-6 divide-y divide-neutral-200 border-y border-neutral-200">
            {s.items.map((d) => (
              <li key={d.titulo} className="flex items-center justify-between gap-4 py-4">
                <span className="font-medium text-neutral-900"><Texto>{d.titulo}</Texto></span>
                <span className="text-sm text-neutral-500"><Texto>{d.detalle}</Texto> ↓</span>
              </li>
            ))}
          </ul>
        </div>
      );
    case "preguntas":
      return (
        <div>
          <Titulo>{s.titulo}</Titulo>
          <div className="mt-6 divide-y divide-neutral-200">
            {s.items.map((q) => (
              <details key={q.pregunta} className="py-4">
                <summary className="cursor-pointer font-medium text-neutral-900"><Texto>{q.pregunta}</Texto></summary>
                <p className="mt-2 text-neutral-600"><Texto>{q.respuesta}</Texto></p>
              </details>
            ))}
          </div>
        </div>
      );
    case "aviso":
      return (
        <div role="note" className="rounded-xl border-2 border-neutral-800 p-6">
          <h2 className="text-lg font-bold text-neutral-900"><Texto>{s.titulo}</Texto></h2>
          <p className="mt-2 text-neutral-700"><Texto>{s.texto}</Texto></p>
        </div>
      );
    case "cta":
      return (
        <div className="rounded-2xl bg-neutral-900 px-8 py-14 text-center text-white">
          <h2 className="text-3xl font-bold"><Texto>{s.titular}</Texto></h2>
          <p className="mt-3 text-neutral-300"><Texto>{s.texto}</Texto></p>
          <div className="mt-6 flex justify-center gap-3">
            {s.ctas.map((c) => (
              <a key={c.texto} href={c.destino} className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-neutral-900">
                <Texto>{c.texto}</Texto>
              </a>
            ))}
          </div>
        </div>
      );
  }
}

export default function Seccion({ s, primera }: { s: TSeccion; primera: boolean }) {
  return (
    <section id={s.id} className="border-b border-neutral-200 py-14 md:py-20" data-seccion={s.id} data-tipo={s.tipo}>
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="mb-4 font-mono text-[11px] text-neutral-400">
          § {s.id} · {s.tipo}
        </p>
        <Contenido s={s} primera={primera} />
        <Nota>{s.nota}</Nota>
      </div>
    </section>
  );
}
