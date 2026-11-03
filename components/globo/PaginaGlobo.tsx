// Página del globo de presencia (v1 en /demo/globo, laboratorio de granos v2 en /demo/globo/v2).
import { Outfit } from "next/font/google";
import { cifras, type Cifra, type IdCifra } from "@/content/cifras";
import { paginas } from "@/content/paginas";
import { plano } from "@/content/resolver";
import type { Seccion } from "@/content/tipos";
import GloboPresencia, { type DatoGlobo, type ParadaGlobo } from "./GloboPresencia";
import type { Paleta } from "./escena";
import type { TipoGrano } from "./granos";

const display = Outfit({ subsets: ["latin"], weight: ["400", "600", "800", "900"], variable: "--font-display" });

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

// Cifras por región del Informe Anual 2025, en el orden de content/paginas.ts.
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

export function PaginaGlobo({ grano, paleta, laboratorio }: { grano?: TipoGrano; paleta?: Paleta; laboratorio?: boolean }) {
  return (
    <div className={`${display.variable} min-h-screen bg-globo-noche`}>
      <div className="bg-neutral-950 px-4 py-2 text-center text-xs text-neutral-300">
        Demo · propuesta de sitio corporativo · no es el sitio oficial de Grupo Bimbo ni está afiliada a la empresa
      </div>
      <GloboPresencia
        rotulo={presencia.rotulo ?? "Presencia"}
        titulo={plano(presencia.titulo)}
        bajada={plano(presencia.parrafos[0])}
        paradas={paradas}
        grano={grano}
        paleta={paleta}
        laboratorio={laboratorio}
      />
    </div>
  );
}
