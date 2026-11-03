// Globo de presencia para páginas estáticas (Inicio de Claude Design en public/design). No lo importa ninguna
// ruta de Next: scripts/globo-estatico.ts lo empaqueta en public/design/globo/ y la página llama
// window.BimboGlobo.montar(elemento). Las paradas repiten las de PaginaGlobo.tsx, que no se puede empaquetar
// fuera de Next porque usa next/font.
import { createRoot } from "react-dom/client";
import { cifras, type Cifra, type IdCifra } from "@/content/cifras";
import { paginas } from "@/content/paginas";
import { plano } from "@/content/resolver";
import type { Seccion } from "@/content/tipos";
import GloboPresencia, { type DatoGlobo, type ParadaGlobo } from "./GloboPresencia";
import type { Paleta } from "./escena";
import type { TipoGrano } from "./granos";

const dato = (id: IdCifra, etiqueta?: string): DatoGlobo => {
  const c: Cifra = cifras[id];
  return { valor: c.valor, etiqueta: etiqueta ?? c.etiqueta, corte: c.corte ?? null };
};

function seccion<T extends Seccion["tipo"]>(id: string, tipo: T) {
  const s = paginas.flatMap((p) => p.secciones).find((x) => x.id === id);
  if (s?.tipo !== tipo) throw new Error(`Falta la sección «${id}» (${tipo}) en content/paginas.ts`);
  return s as Extract<Seccion, { tipo: T }>;
}
const presencia = seccion("presencia", "texto");
const regiones = seccion("regiones", "regiones");

const porRegion: [IdCifra, IdCifra][] = [
  ["norteamericaPlantas", "norteamericaColaboradores"],
  ["mexicoPlantas", "mexicoColaboradores"],
  ["latamPlantas", "latamColaboradores"],
  ["eaaPlantas", "eaaColaboradores"],
];

const paradas: ParadaGlobo[] = [
  {
    id: "mundo",
    nombre: "El mundo",
    region: 0,
    destacados: [dato("paisesPresencia"), dato("paisesOperacion")],
    datos: [dato("panaderias"), dato("colaboradores"), dato("rutas"), dato("centrosVenta"), dato("marcas"), dato("productos")],
    paises: [],
  },
  ...regiones.regiones.map((r, i): ParadaGlobo => {
    const [nombre, detalle] = r.nombre.replace(")", "").split(" (");
    const [plantas, colaboradores] = porRegion[i];
    return {
      id: `region-${i + 1}`,
      nombre,
      detalle: detalle ?? null,
      region: i + 1,
      destacados: [dato(plantas, "Panaderías y plantas"), dato(colaboradores, "Colaboradores")],
      datos: [],
      paises: r.paises,
    };
  }),
];

/** Monta el globo (v2: multigrano en color natural) dentro de `el` y devuelve la función que lo desmonta. */
function montar(el: HTMLElement, { grano = "multigrano", paleta = "natural" }: { grano?: TipoGrano; paleta?: Paleta } = {}) {
  const raiz = createRoot(el);
  raiz.render(
    <GloboPresencia
      rotulo={presencia.rotulo ?? "Presencia"}
      titulo={plano(presencia.titulo)}
      bajada={plano(presencia.parrafos[0])}
      paradas={paradas}
      grano={grano}
      paleta={paleta}
    />,
  );
  return () => raiz.unmount();
}

declare global {
  interface Window {
    BimboGlobo?: { montar: typeof montar };
  }
}
window.BimboGlobo = { montar };
