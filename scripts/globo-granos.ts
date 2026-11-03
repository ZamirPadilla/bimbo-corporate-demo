// Genera los "granos" del globo de presencia: puntos repartidos sobre la tierra firme, marcados con la
// región de reporte del país donde operamos (Marcas › Dónde operamos en content/paginas.ts).
// Uso: npm run globo:granos  →  public/globo/granos.bin y public/globo/paises.json
// Geometría: Natural Earth 1:50m vía world-atlas (dominio público).
import { mkdirSync, writeFileSync } from "node:fs";
import { geoBounds, geoCentroid, geoContains, geoArea } from "d3-geo";
import type { Feature, MultiPolygon, Polygon } from "geojson";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import mundo from "world-atlas/countries-50m.json";
import { paginas } from "../content/paginas";

// Nombre en el copy → código ISO 3166-1 numérico de world-atlas.
const ISO: Record<string, string> = {
  Canadá: "124", "Estados Unidos": "840", México: "484", Argentina: "032", Brasil: "076", Chile: "152",
  Colombia: "170", "Costa Rica": "188", Ecuador: "218", "El Salvador": "222", Guatemala: "320", Honduras: "340",
  Nicaragua: "558", Panamá: "591", Paraguay: "600", Perú: "604", Uruguay: "858", Venezuela: "862", China: "156",
  "Corea del Sur": "410", Croacia: "191", Eslovenia: "705", España: "724", Francia: "250", India: "356",
  Italia: "380", Kazajistán: "398", Marruecos: "504", Montenegro: "499", Portugal: "620", "Reino Unido": "826",
  Rumanía: "642", Rusia: "643", Serbia: "688", Sudáfrica: "710", Suiza: "756", Túnez: "788", Turquía: "792",
  Ucrania: "804",
};

const N = 90_000; // puntos de Fibonacci en toda la esfera: ~0.68° entre granos
const MINIMO = 8; // granos mínimos por país donde operamos (Montenegro, Eslovenia, El Salvador…)

type Pais = Feature<Polygon | MultiPolygon, { name: string }>;

const seccion = paginas.flatMap((p) => p.secciones).find((s) => s.tipo === "regiones");
if (!seccion || seccion.tipo !== "regiones") throw new Error("No encontré la sección «regiones» en content/paginas.ts");

const topo = mundo as unknown as Topology<{ countries: GeometryCollection<{ name: string }> }>;
const todos = (feature(topo, topo.objects.countries) as unknown as { features: Pais[] }).features.filter((f) => f.geometry);

// Francia opera en Europa: fuera la Guayana Francesa y las islas de ultramar.
const soloEuropa = (lat: number, lon: number) => lon > -20 && lat > 30;

const operados = seccion.regiones.flatMap((r, i) =>
  r.paises.map((nombre) => {
    const iso = ISO[nombre];
    const f = todos.find((t) => t.id === iso);
    if (!f) throw new Error(`Sin geometría para ${nombre} (${iso})`);
    return { nombre, iso, region: i + 1, f };
  }),
);
const indicePorIso = new Map(operados.map((o, i) => [o.iso, i]));

const cajas = todos.map((f) => ({ f, b: geoBounds(f) }));
function dentro(b: [[number, number], [number, number]], lon: number, lat: number) {
  const [[x0, y0], [x1, y1]] = b;
  if (lat < y0 || lat > y1) return false;
  return x0 <= x1 ? lon >= x0 && lon <= x1 : lon >= x0 || lon <= x1; // cajas que cruzan el antimeridiano
}
function paisEn(lon: number, lat: number) {
  for (const { f, b } of cajas) if (dentro(b, lon, lat) && geoContains(f, [lon, lat])) return f;
  return null;
}

// Generador determinista para que el archivo no cambie entre corridas.
let semilla = 1945;
const azar = () => ((semilla = (semilla * 1103515245 + 12345) % 2147483648) / 2147483648);

type Grano = { lat: number; lon: number; region: number; pais: number };
const granos: Grano[] = [];
const porPais = new Map<string, number>();
const dorado = Math.PI * (3 - Math.sqrt(5));
for (let i = 0; i < N; i++) {
  const y = 1 - (2 * (i + 0.5)) / N;
  const r = Math.sqrt(1 - y * y);
  const th = dorado * i;
  let lat = (Math.asin(y) * 180) / Math.PI;
  let lon = (((Math.atan2(r * Math.sin(th), r * Math.cos(th)) * 180) / Math.PI + 540) % 360) - 180;
  lat += (azar() - 0.5) * 0.25;
  lon += ((azar() - 0.5) * 0.25) / Math.max(0.2, Math.cos((lat * Math.PI) / 180));
  const f = paisEn(lon, lat);
  if (!f) continue;
  let pais = indicePorIso.get(String(f.id)) ?? 255;
  if (f.id === "250" && !soloEuropa(lat, lon)) pais = 255;
  granos.push({ lat, lon, region: pais === 255 ? 0 : operados[pais].region, pais });
  if (pais !== 255) porPais.set(operados[pais].iso, (porPais.get(operados[pais].iso) ?? 0) + 1);
}

// Países pequeños: rejilla fina dentro de su caja hasta llegar al mínimo.
for (const [i, o] of operados.entries()) {
  const faltan = MINIMO - (porPais.get(o.iso) ?? 0);
  if (faltan <= 0) continue;
  const [[x0, y0], [x1, y1]] = geoBounds(o.f);
  const paso = Math.max(0.12, Math.sqrt(((x1 - x0) * (y1 - y0)) / (MINIMO * 3)));
  const extra: Grano[] = [];
  for (let lat = y0 + paso / 2; lat < y1; lat += paso)
    for (let lon = x0 + paso / 2; lon < x1; lon += paso)
      if (geoContains(o.f, [lon, lat])) extra.push({ lat, lon, region: o.region, pais: i });
  extra.sort(() => azar() - 0.5);
  granos.push(...extra.slice(0, faltan));
  porPais.set(o.iso, (porPais.get(o.iso) ?? 0) + Math.min(faltan, extra.length));
}

// Etiqueta en el centro del polígono más grande (Estados Unidos sin Alaska, Francia sin ultramar…).
function etiqueta(f: Pais): [number, number] {
  if (f.geometry.type === "Polygon") return geoCentroid(f) as [number, number];
  const partes = f.geometry.coordinates.map((c) => ({ type: "Feature", properties: {}, geometry: { type: "Polygon", coordinates: c } }) as Feature<Polygon>);
  partes.sort((a, b) => geoArea(b) - geoArea(a));
  return geoCentroid(partes[0]) as [number, number];
}

const lat = new Int16Array(granos.length);
const lon = new Int16Array(granos.length);
const region = new Uint8Array(granos.length);
const pais = new Uint8Array(granos.length);
granos.forEach((g, i) => {
  lat[i] = Math.round(g.lat * 100);
  lon[i] = Math.round(g.lon * 100);
  region[i] = g.region;
  pais[i] = g.pais;
});

mkdirSync("public/globo", { recursive: true });
writeFileSync("public/globo/granos.bin", Buffer.concat([lat, lon, region, pais].map((a) => Buffer.from(a.buffer))));
writeFileSync(
  "public/globo/paises.json",
  JSON.stringify(
    {
      fuente: "Natural Earth 1:50m (world-atlas 2.0.2). Generado por scripts/globo-granos.ts; no editar a mano.",
      granos: granos.length,
      paises: operados.map((o) => {
        const [x, y] = etiqueta(o.f);
        return { nombre: o.nombre, region: o.region, lat: +y.toFixed(2), lon: +x.toFixed(2), granos: porPais.get(o.iso) ?? 0 };
      }),
    },
    null,
    1,
  ) + "\n",
);
console.log(`${granos.length} granos, ${granos.filter((g) => g.region).length} en países donde operamos`);
