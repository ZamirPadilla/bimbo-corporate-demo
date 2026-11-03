// Tipos de grano para el globo de presencia (v2). Cada uno parte de una esfera deformada para que se lea
// como el grano real y no como una cápsula lisa: el trigo lleva su surco, la avena es una hojuela
// irregular y delgada, el ajonjolí una gota plana y el maíz la corona redondeada del grano en la mazorca.
// `tam` es el tamaño en radios del globo (los puntos están a ~0.012 entre sí).
import * as THREE from "three";
import { globo } from "@/tailwind.config";

export type TipoGrano = "trigo" | "avena" | "ajonjoli" | "maiz" | "multigrano" | "punto";

type Grano = {
  nombre: string;
  tam: [number, number, number];
  color: [string, string];
  brillo: number;
  punta: number;
  geometria: () => THREE.BufferGeometry;
};

function deformar(geo: THREE.BufferGeometry, f: (v: THREE.Vector3) => void) {
  const p = geo.getAttribute("position");
  const v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    f(v);
    p.setXYZ(i, v.x, v.y, v.z);
  }
  geo.computeVertexNormals();
  return geo;
}

export const GRANOS: Record<Exclude<TipoGrano, "multigrano">, Grano> = {
  trigo: {
    nombre: "Trigo",
    tam: [0.0058, 0.0036, 0.003],
    color: [globo.trigo, globo.trigoTostado],
    brillo: 0.18,
    punta: 0,
    geometria: () =>
      deformar(new THREE.SphereGeometry(1, 14, 10), (v) => {
        const x = v.x;
        v.y *= 1 - 0.16 * x; // el extremo del germen es más angosto
        v.z *= 1 - 0.1 * x;
        if (v.z > 0) v.z -= 0.42 * Math.exp(-(v.y * v.y) / 0.03) * v.z * (1 - 0.6 * x * x); // surco
        v.x *= 1 + 0.08 * (1 - Math.abs(v.y));
      }),
  },
  avena: {
    nombre: "Avena",
    tam: [0.0068, 0.0058, 0.0016],
    color: [globo.avena, globo.avenaTostada],
    brillo: 0.08,
    punta: 0,
    geometria: () =>
      deformar(new THREE.SphereGeometry(1, 32, 12), (v) => {
        const th = Math.atan2(v.y, v.x);
        const r = 1 + 0.07 * Math.sin(2 * th + 0.6) + 0.05 * Math.sin(3 * th + 1.7) + 0.025 * Math.sin(5 * th);
        v.x *= r;
        v.y *= r;
        v.z = v.z * 0.22 + 0.2 * (v.x * v.x + v.y * v.y) - 0.1; // hojuela delgada y un poco cóncava
        v.z += 0.09 * Math.sin(v.x * 7 + v.y * 1.5); // ondas del grano aplastado
      }),
  },
  ajonjoli: {
    nombre: "Ajonjolí",
    tam: [0.0062, 0.0042, 0.0018],
    color: [globo.ajonjoli, globo.ajonjoliTostado],
    brillo: 0.22,
    punta: 0,
    geometria: () =>
      deformar(new THREE.SphereGeometry(1, 14, 8), (v) => {
        const t = (v.x + 1) / 2;
        v.y *= 1 - 0.6 * Math.pow(t, 1.6); // gota: ancha atrás, punta adelante
        v.x *= 1 + 0.15 * Math.max(0, v.x);
        v.z *= 0.45;
        if (v.z > 0) v.z += 0.1 * Math.exp(-(v.y * v.y) / 0.02);
      }),
  },
  maiz: {
    nombre: "Maíz",
    tam: [0.0052, 0.0048, 0.003],
    color: [globo.maiz, globo.maizTostado],
    brillo: 0.3,
    punta: 1,
    geometria: () =>
      deformar(new THREE.SphereGeometry(1, 14, 10), (v) => {
        const r = Math.hypot(v.x, v.y);
        if (r > 1e-6) {
          const dx = v.x / r;
          const dy = v.y / r;
          const R = Math.min(1.3, Math.pow(Math.pow(Math.abs(dx), 3.2) + Math.pow(Math.abs(dy), 3.2), -1 / 3.2));
          v.x = dx * r * R;
          v.y = dy * r * R;
        }
        v.y *= 1 - 0.16 * v.x; // cuña: más angosto hacia el olote
        v.z *= 0.6;
        if (v.z > 0) v.z -= 0.12 * Math.exp(-(v.x * v.x + v.y * v.y) / 0.15); // hoyuelo de la corona
      }),
  },
  punto: {
    nombre: "Punto (v1)",
    tam: [0.0046, 0.004, 0.0017],
    color: [globo.tierra, globo.tierra],
    brillo: 0,
    punta: 0,
    geometria: () => new THREE.SphereGeometry(1, 8, 6),
  },
};

export const TIPOS_GRANO: TipoGrano[] = ["trigo", "avena", "ajonjoli", "maiz", "multigrano", "punto"];
export const NOMBRE_GRANO: Record<TipoGrano, string> = { ...Object.fromEntries(Object.entries(GRANOS).map(([k, g]) => [k, g.nombre])), multigrano: "Multigrano" } as Record<TipoGrano, string>;
