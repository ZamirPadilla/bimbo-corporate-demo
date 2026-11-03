// Escena three.js del globo de presencia. La tierra está hecha de granos (un guiño a la infografía del
// Informe Anual 2025 con el mapa de trigo sobre el mantel); los países donde operamos se pintan con el
// color de su región de reporte y "leudan" cuando su región entra en foco. El océano lleva un mantel de
// cuadros muy tenue. Todo se dibuja con dos InstancedMesh/Mesh y sombreadores propios: sin texturas.
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { globo } from "@/tailwind.config";
import { GRANOS, type TipoGrano } from "./granos";

export type Vista = { lat: number; lon: number; dist: number };
export type Parada = { region: number; desde: Vista; hasta: Vista; giro?: number };
export type PaisGlobo = { nombre: string; region: number; lat: number; lon: number; granos: number };
export type Paleta = "azul" | "natural";

const RAD = Math.PI / 180;
const COLORES = [globo.tierra, globo.norteamerica, globo.mexico, globo.latinoamerica, globo.eaa].map((c) => new THREE.Color(c));
const ORIGEN = 2; // México: de ahí salen los arcos (la panadería de 1945)
// Multigrano: proporción de cada grano en la mezcla.
const MEZCLA: [Exclude<TipoGrano, "multigrano" | "punto">, number][] = [
  ["trigo", 0.45],
  ["avena", 0.2],
  ["ajonjoli", 0.2],
  ["maiz", 0.15],
];

function normal(lat: number, lon: number, r = 1) {
  const la = lat * RAD;
  const lo = lon * RAD;
  return new THREE.Vector3(Math.cos(la) * Math.sin(lo) * r, Math.sin(la) * r, Math.cos(la) * Math.cos(lo) * r);
}

const amortigua = (actual: number, meta: number, k: number, dt: number) => actual + (meta - actual) * (1 - Math.exp(-k * dt));
const angulo = (a: number) => ((((a + 180) % 360) + 360) % 360) - 180;

const granoVS = /* glsl */ `
  attribute vec2 aLatLon;
  attribute float aRegion;
  attribute float aPais;
  attribute float aAzar;
  uniform float uRegion;
  uniform float uPop;
  uniform float uFoco;
  uniform float uTiempo;
  uniform float uEscala;
  uniform vec3 uColores[5];
  uniform vec3 uTam;
  uniform float uNatural;
  uniform float uForma;
  uniform vec3 uGrano;
  uniform vec3 uGranoTostado;
  uniform vec3 uTierraNatural;
  varying vec3 vNormal;
  varying vec3 vColor;
  varying vec3 vLocal;
  void main() {
    vec3 n = vec3(cos(aLatLon.x) * sin(aLatLon.y), sin(aLatLon.x), cos(aLatLon.x) * cos(aLatLon.y));
    vec3 este = normalize(cross(vec3(0.0, 1.0, 0.0), n) + vec3(1e-5, 0.0, 0.0));
    vec3 norte = cross(n, este);
    float a = aAzar * 6.2831853;
    vec3 t = cos(a) * este + sin(a) * norte;
    vec3 b = cross(n, t);

    bool opera = aRegion > 0.5;
    bool activo = opera && (uRegion < 0.5 || abs(aRegion - uRegion) < 0.5);
    float foco = abs(aPais - uFoco) < 0.5 ? 1.0 : 0.0;
    // Leudado: cada grano brinca con su propio retraso y se queda un poco alzado.
    float d = clamp((uPop - aAzar * 0.55) / 0.45, 0.0, 1.0);
    float salto = activo ? sin(d * 3.14159) * 0.05 + d * 0.004 : 0.0;
    float latido = foco * (0.012 + 0.008 * sin(uTiempo * 7.0 + aAzar * 6.0));
    // Tamaño por tipo de grano, con variación por grano para que no se vean de molde.
    vec3 s = uTam * uEscala * (0.88 + 0.24 * fract(aAzar * 7.0)) * (activo ? 1.0 + 0.2 * d : (opera ? 1.0 : 0.8));
    s.y *= mix(1.0, 0.88 + 0.24 * fract(aAzar * 13.0), uForma);
    vLocal = position;
    float h = s.z + salto + latido;

    vec3 p = n * (1.0 + h) + t * position.x * s.x + b * position.y * s.y + n * position.z * s.z;
    vNormal = normalize(normalMatrix * normalize(t * normal.x / s.x + b * normal.y / s.y + n * normal.z / s.z));

    vec3 c;
    if (uNatural < 0.5) {
      c = uColores[int(aRegion + 0.5)];
      if (opera && !activo) c = mix(uColores[0], c, 0.35);
      if (activo && uRegion > 0.5) c = mix(c, vec3(1.0), 0.12 * d);
      c *= 0.85 + 0.25 * aAzar;
    } else {
      // Grano natural: dorado donde operamos, apagado donde no; la región en foco se tuesta un poco.
      c = mix(uGrano, uGranoTostado, 0.75 * fract(aAzar * 5.0));
      if (!opera) c = mix(uTierraNatural, c, 0.22);
      else if (!activo) c = mix(uTierraNatural, c, 0.5);
      if (activo && uRegion > 0.5) c = mix(c, c * 1.12 + 0.04, d);
    }
    c = mix(c, vec3(1.0), foco * 0.6);
    vColor = c;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const granoFS = /* glsl */ `
  uniform float uBrillo;
  uniform float uPunta;
  uniform float uForma;
  varying vec3 vNormal;
  varying vec3 vColor;
  varying vec3 vLocal;
  void main() {
    vec3 n = normalize(vNormal);
    vec3 luz = normalize(vec3(-0.45, 0.6, 0.75));
    float dif = max(dot(n, luz), 0.0);
    float esp = pow(max(dot(n, normalize(luz + vec3(0.0, 0.0, 1.0))), 0.0), 28.0) * uBrillo;
    float sombra = mix(1.0, 0.72 + 0.28 * smoothstep(-1.0, 0.5, vLocal.z), uForma); // la panza del grano, más oscura
    vec3 c = mix(vColor, vColor * 1.2 + 0.1, uPunta * smoothstep(0.35, 0.95, -vLocal.x)); // corona clara del maíz
    gl_FragColor = vec4(c * (0.38 + 0.68 * dif) * sombra + esp, 1.0);
    #include <colorspace_fragment>
  }
`;

// Océano: mantel de cuadros (gingham) de 10° muy tenue, más oscuro hacia el borde.
const oceanoVS = /* glsl */ `
  varying vec3 vPos;
  varying vec3 vNormalVista;
  void main() {
    vPos = position;
    vNormalVista = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const oceanoFS = /* glsl */ `
  uniform vec3 uOceano;
  uniform vec3 uBorde;
  uniform float uCuadro;
  varying vec3 vPos;
  varying vec3 vNormalVista;
  void main() {
    vec3 n = normalize(vPos);
    float lat = asin(n.y) * 57.29578;
    float lon = atan(n.x, n.z) * 57.29578;
    float a = step(0.5, fract(lon / 10.0));
    float b = step(0.5, fract(lat / 10.0));
    float cuadro = (a + b) * 0.5;
    float frente = clamp(vNormalVista.z, 0.0, 1.0);
    vec3 c = uOceano * (1.0 - uCuadro * 0.8 + uCuadro * cuadro);
    c = mix(uBorde, c, smoothstep(0.0, 0.55, frente));
    float luz = max(dot(vNormalVista, normalize(vec3(-0.45, 0.6, 0.75))), 0.0);
    gl_FragColor = vec4(c * (0.75 + 0.4 * luz), 1.0);
    #include <colorspace_fragment>
  }
`;

const haloVS = /* glsl */ `
  varying vec3 vMundo;
  void main() {
    vMundo = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * viewMatrix * vec4(vMundo, 1.0);
  }
`;
const haloFS = /* glsl */ `
  uniform vec3 uColor;
  varying vec3 vMundo;
  void main() {
    // Distancia del rayo de vista al centro del globo: 1 en el borde, se apaga hacia 1.12.
    vec3 rayo = normalize(vMundo - cameraPosition);
    float d = length(cross(rayo, -cameraPosition));
    float f = pow(clamp(1.0 - (d - 1.0) / 0.12, 0.0, 1.0), 2.5);
    gl_FragColor = vec4(uColor, f * 0.6);
    #include <colorspace_fragment>
  }
`;

const arcoVS = /* glsl */ `
  attribute float aRetraso;
  varying float vT;
  varying float vRetraso;
  void main() {
    vT = uv.x;
    vRetraso = aRetraso;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const arcoFS = /* glsl */ `
  uniform float uProgreso;
  uniform float uOpacidad;
  uniform vec3 uColor;
  varying float vT;
  varying float vRetraso;
  void main() {
    float p = clamp((uProgreso - vRetraso) / 1.2, 0.0, 1.0);
    if (vT > p || uOpacidad <= 0.0) discard;
    float cabeza = smoothstep(p - 0.12, p, vT) * step(p, 0.999);
    // Son decenas de arcos: casi transparentes para que se entiendan sin hacer ruido; la cabeza brilla al trazarse.
    gl_FragColor = vec4(uColor, uOpacidad * mix(0.2, 0.55, cabeza));
    #include <colorspace_fragment>
  }
`;

export class EscenaGlobo {
  private renderer: THREE.WebGLRenderer;
  private escena = new THREE.Scene();
  private camara = new THREE.PerspectiveCamera(30, 1, 0.05, 50);
  private globo = new THREE.Group();
  private granos: THREE.Mesh<THREE.InstancedBufferGeometry, THREE.ShaderMaterial>[] = [];
  // Uniformes que comparten todas las mallas de granos (en multigrano hay una por tipo).
  private comunes = {
    uRegion: { value: 0 },
    uPop: { value: 0 },
    uFoco: { value: -1 },
    uTiempo: { value: 0 },
    uEscala: { value: 1 },
    uColores: { value: COLORES },
    uNatural: { value: 0 },
    uTierraNatural: { value: new THREE.Color(globo.tierraNatural) },
  };
  private cargado = false;
  private oceano?: THREE.Mesh<THREE.SphereGeometry, THREE.ShaderMaterial>;
  private instancias: Record<string, THREE.InstancedBufferAttribute> = {};
  private tipo?: TipoGrano = "punto";
  private paleta: Paleta = "azul";
  private arcos?: THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>;
  private etiquetas: { i: number; pais: PaisGlobo; el: HTMLElement; pos: THREE.Vector3 }[] = [];
  private gestos = new AbortController();
  private actual: Vista = { lat: 15, lon: -60, dist: 9 };
  private parada: Parada = { region: 0, desde: { lat: 15, lon: -60, dist: 4.4 }, hasta: { lat: 15, lon: -60, dist: 4.4 } };
  private tParada = 0;
  private duracion = 8;
  private desfase = { lat: 0, lon: 0 };
  private zoom = 1;
  private pop = 0;
  private progresoArcos = 0;
  private foco = -1;
  private tiempo = 0;
  private reloj = new THREE.Clock();
  private visible = true;
  private cuadro = 0;
  private arrastre?: { x: number; y: number; id: number };
  private pellizco = new Map<number, { x: number; y: number }>();
  private distPellizco = 0;
  private quietud = false;
  private desplazamiento = { x: 0, y: 0 };
  onInteraccion?: () => void;

  constructor(
    private lienzo: HTMLCanvasElement,
    private capa: HTMLElement,
    private paises: PaisGlobo[],
  ) {
    this.renderer = new THREE.WebGLRenderer({ canvas: lienzo, antialias: true, alpha: true, powerPreference: "high-performance" });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.quietud = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.escena.add(this.globo);
    this.camara.position.set(0, 0, this.actual.dist);

    const oceano = new THREE.Mesh(
      new THREE.SphereGeometry(1, 96, 64),
      new THREE.ShaderMaterial({
        vertexShader: oceanoVS,
        fragmentShader: oceanoFS,
        uniforms: { uOceano: { value: new THREE.Color(globo.oceano) }, uBorde: { value: new THREE.Color(globo.noche) }, uCuadro: { value: 0.12 } },
      }),
    );
    this.oceano = oceano;
    this.globo.add(oceano);

    const brillo = new THREE.Mesh(
      new THREE.SphereGeometry(1.12, 64, 48),
      new THREE.ShaderMaterial({
        vertexShader: haloVS,
        fragmentShader: haloFS,
        uniforms: { uColor: { value: new THREE.Color(globo.norteamerica) } },
        transparent: true,
        side: THREE.BackSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    this.escena.add(brillo);

    this.crearEtiquetas();
    this.crearArcos();
    this.enlazarGestos();
    this.renderer.setAnimationLoop(() => this.dibujar());
  }

  async cargar(url: string) {
    const datos = await (await fetch(url)).arrayBuffer();
    const n = datos.byteLength / 6;
    const lat = new Int16Array(datos, 0, n);
    const lon = new Int16Array(datos, n * 2, n);
    const region = new Uint8Array(datos, n * 4, n);
    const pais = new Uint8Array(datos, n * 5, n);

    const latLon = new Float32Array(n * 2);
    const azar = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      latLon[i * 2] = (lat[i] / 100) * RAD;
      latLon[i * 2 + 1] = (lon[i] / 100) * RAD;
      const x = Math.sin(i * 12.9898) * 43758.5453;
      azar[i] = x - Math.floor(x);
    }
    this.instancias = {
      aLatLon: new THREE.InstancedBufferAttribute(latLon, 2),
      aRegion: new THREE.InstancedBufferAttribute(Float32Array.from(region), 1),
      aPais: new THREE.InstancedBufferAttribute(Float32Array.from(pais), 1),
      aAzar: new THREE.InstancedBufferAttribute(azar, 1),
    };
    this.cargado = true;
    const tipo = this.tipo;
    this.tipo = undefined;
    this.setGrano(tipo ?? "punto", this.paleta);
  }

  /** Geometría instanciada de un tipo de grano, con todas las instancias o solo las indicadas. */
  private geometriaGrano(tipo: Exclude<TipoGrano, "multigrano">, indices?: number[]) {
    const base = GRANOS[tipo].geometria();
    const geo = new THREE.InstancedBufferGeometry();
    geo.index = base.index;
    geo.setAttribute("position", base.getAttribute("position"));
    geo.setAttribute("normal", base.getAttribute("normal"));
    for (const [nombre, a] of Object.entries(this.instancias)) {
      if (!indices) geo.setAttribute(nombre, a);
      else {
        const sub = new Float32Array(indices.length * a.itemSize);
        indices.forEach((i, k) => sub.set(a.array.subarray(i * a.itemSize, (i + 1) * a.itemSize), k * a.itemSize));
        geo.setAttribute(nombre, new THREE.InstancedBufferAttribute(sub, a.itemSize));
      }
    }
    geo.instanceCount = indices ? indices.length : this.instancias.aAzar.count;
    return geo;
  }

  private mallaGrano(tipo: Exclude<TipoGrano, "multigrano">, indices?: number[]) {
    const g = GRANOS[tipo];
    const malla = new THREE.Mesh(
      this.geometriaGrano(tipo, indices),
      new THREE.ShaderMaterial({
        vertexShader: granoVS,
        fragmentShader: granoFS,
        uniforms: {
          ...this.comunes,
          uForma: { value: tipo === "punto" ? 0 : 1 },
          uTam: { value: new THREE.Vector3(...g.tam) },
          uGrano: { value: new THREE.Color(g.color[0]) },
          uGranoTostado: { value: new THREE.Color(g.color[1]) },
          uBrillo: { value: g.brillo },
          uPunta: { value: g.punta },
        },
      }),
    );
    malla.frustumCulled = false;
    return malla;
  }

  /** Cambia la forma del grano y la paleta (azul por región o color natural del grano) sin recargar. */
  setGrano(tipo: TipoGrano, paleta: Paleta) {
    this.paleta = paleta;
    const natural = paleta === "natural" && tipo !== "punto";
    this.comunes.uNatural.value = natural ? 1 : 0;
    if (this.oceano) this.oceano.material.uniforms.uCuadro.value = natural ? 0.28 : 0.12;
    if (tipo === this.tipo) return;
    this.tipo = tipo;
    if (!this.cargado) return;
    for (const m of this.granos) {
      this.globo.remove(m);
      m.geometry.dispose();
      m.material.dispose();
    }
    if (tipo !== "multigrano") this.granos = [this.mallaGrano(tipo)];
    else {
      // Pan multigrano: cada punto toma uno de los cuatro granos según su propio azar.
      const grupos: number[][] = MEZCLA.map(() => []);
      const azar = this.instancias.aAzar.array;
      for (let i = 0; i < azar.length; i++) {
        const x = (azar[i] * 31.7) % 1;
        let k = 0;
        for (let acum = MEZCLA[0][1]; x > acum && k < MEZCLA.length - 1; acum += MEZCLA[++k][1]);
        grupos[k].push(i);
      }
      this.granos = MEZCLA.map(([t], k) => this.mallaGrano(t, grupos[k]));
    }
    for (const m of this.granos) this.globo.add(m);
  }

  private crearEtiquetas() {
    this.capa.replaceChildren();
    this.etiquetas = this.paises.map((pais, i) => {
      const el = document.createElement("div");
      el.className =
        "pointer-events-none absolute left-0 top-0 flex items-center gap-1.5 whitespace-nowrap font-display text-[11px] font-semibold uppercase tracking-wide text-white opacity-0 transition-opacity duration-300 md:text-xs";
      el.innerHTML = `<span class="h-1.5 w-1.5 rounded-full bg-white ring-[3px] ring-white/25"></span><span class="rounded-full bg-globo-noche/70 px-2 py-0.5 backdrop-blur-sm">${pais.nombre}</span>`;
      this.capa.appendChild(el);
      return { i, pais, el, pos: normal(pais.lat, pais.lon, 1.012) };
    });
  }

  private crearArcos() {
    const origen = this.paises.find((p) => p.region === ORIGEN);
    if (!origen) return;
    const a = normal(origen.lat, origen.lon);
    const destinos = this.paises.filter((p) => p !== origen);
    const piezas = destinos.map((p, i) => {
      const b = normal(p.lat, p.lon);
      const ang = a.angleTo(b);
      const alto = 0.03 + 0.2 * (ang / Math.PI);
      const q = new THREE.Quaternion().setFromUnitVectors(a, b);
      const puntos = Array.from({ length: 48 }, (_, k) => {
        const t = k / 47;
        const v = a.clone().applyQuaternion(new THREE.Quaternion().slerp(q, t));
        return v.multiplyScalar(1.003 + Math.sin(Math.PI * t) * alto);
      });
      const tubo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(puntos), 48, 0.0028, 5, false);
      const cuenta = tubo.getAttribute("position").count;
      tubo.setAttribute("aRetraso", new THREE.BufferAttribute(new Float32Array(cuenta).fill((i / destinos.length) * 1.6), 1));
      return tubo;
    });
    const geo = mergeGeometries(piezas);
    if (!geo) return;
    this.arcos = new THREE.Mesh(
      geo,
      new THREE.ShaderMaterial({
        vertexShader: arcoVS,
        fragmentShader: arcoFS,
        uniforms: { uProgreso: { value: 0 }, uOpacidad: { value: 0 }, uColor: { value: new THREE.Color("#FFFFFF") } },
        transparent: true,
        depthWrite: false,
      }),
    );
    this.globo.add(this.arcos);
  }

  private enlazarGestos() {
    const c = this.lienzo;
    const { signal } = this.gestos;
    c.addEventListener("pointerdown", (e) => {
      this.pellizco.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (this.pellizco.size === 1) this.arrastre = { x: e.clientX, y: e.clientY, id: e.pointerId };
      if (this.pellizco.size === 2) {
        const [p, q] = [...this.pellizco.values()];
        this.distPellizco = Math.hypot(p.x - q.x, p.y - q.y);
      }
    }, { signal });
    window.addEventListener("pointermove", (e) => {
      if (this.pellizco.has(e.pointerId)) this.pellizco.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (this.pellizco.size === 2) {
        const [p, q] = [...this.pellizco.values()];
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (this.distPellizco > 0) this.acercar(this.distPellizco / d);
        this.distPellizco = d;
        return;
      }
      if (!this.arrastre || this.arrastre.id !== e.pointerId) return;
      const dx = e.clientX - this.arrastre.x;
      const dy = e.clientY - this.arrastre.y;
      if (Math.abs(dx) + Math.abs(dy) < 2) return;
      const k = (40 * this.actual.dist) / Math.max(320, this.lienzo.clientHeight);
      this.desfase.lon -= dx * k;
      this.desfase.lat = Math.max(-60, Math.min(60, this.desfase.lat + dy * k));
      this.arrastre.x = e.clientX;
      this.arrastre.y = e.clientY;
      this.onInteraccion?.();
    }, { signal });
    const soltar = (e: PointerEvent) => {
      this.pellizco.delete(e.pointerId);
      if (this.arrastre?.id === e.pointerId) this.arrastre = undefined;
      if (this.pellizco.size < 2) this.distPellizco = 0;
    };
    window.addEventListener("pointerup", soltar, { signal });
    window.addEventListener("pointercancel", soltar, { signal });
    // El pellizco del trackpad llega como rueda con ctrl; la rueda normal deja desplazar la página.
    c.addEventListener(
      "wheel",
      (e) => {
        if (!e.ctrlKey) return;
        e.preventDefault();
        this.acercar(Math.exp(e.deltaY * 0.01));
      },
      { passive: false, signal },
    );
  }

  /** factor < 1 acerca, > 1 aleja. */
  acercar(factor: number) {
    this.zoom = Math.max(0.5, Math.min(1.7, this.zoom * factor));
    this.onInteraccion?.();
  }

  irA(parada: Parada, duracion: number) {
    this.parada = parada;
    this.duracion = duracion;
    this.tParada = 0;
    this.desfase = { lat: 0, lon: 0 };
    this.zoom = 1;
    this.pop = 0;
    if (parada.region === 0) this.progresoArcos = 0;
    this.comunes.uRegion.value = parada.region;
  }

  enfocar(pais: number) {
    this.foco = pais;
  }

  setVisible(v: boolean) {
    this.visible = v;
  }

  /** Desplaza el centro del globo en fracciones del lienzo (escritorio: a la derecha del texto). */
  ajustar(desplazamiento: { x: number; y: number }) {
    this.desplazamiento = desplazamiento;
  }

  private dibujar() {
    const dt = Math.min(this.reloj.getDelta(), 0.05);
    if (!this.visible) return;
    const w = this.lienzo.clientWidth;
    const h = this.lienzo.clientHeight;
    if (!w || !h) return;
    if (this.lienzo.width !== Math.round(w * this.renderer.getPixelRatio()) || this.lienzo.height !== Math.round(h * this.renderer.getPixelRatio())) {
      this.renderer.setSize(w, h, false);
    }
    this.camara.aspect = w / h;
    this.camara.setViewOffset(w, h, -this.desplazamiento.x * w, -this.desplazamiento.y * h, w, h);

    const quieto = this.quietud;
    this.tiempo += dt;
    this.tParada += dt;
    const t = quieto ? 1 : Math.min(1, this.tParada / this.duracion);
    const s = t * t * (3 - 2 * t);
    const { desde, hasta, giro = 0 } = this.parada;
    const meta: Vista = {
      lat: desde.lat + (hasta.lat - desde.lat) * s + this.desfase.lat,
      lon: desde.lon + angulo(hasta.lon - desde.lon) * s + (quieto ? 0 : giro * this.tParada) + this.desfase.lon,
      dist: (desde.dist + (hasta.dist - desde.dist) * s) * this.zoom,
    };
    // En vertical (teléfono) el globo se aleja para que quepa a lo ancho.
    if (w < h) meta.dist *= Math.pow(h / w, 0.75);
    // Escritorio angosto (4:3, 16:10): un poco más lejos para no meterse bajo el texto.
    else meta.dist *= Math.pow(Math.max(1, 1.6 / (w / h)), 0.6);
    meta.dist = Math.max(1.32, Math.min(8, meta.dist));
    // Al señalar un país en la lista, el globo gira hacia él.
    const foco = this.paises[this.foco];
    if (foco) {
      meta.lat = foco.lat;
      meta.lon = foco.lon;
    }
    meta.lat = Math.max(-75, Math.min(75, meta.lat));
    if (quieto) this.actual = meta;
    else {
      const k = this.arrastre ? 14 : 2.4;
      this.actual.lat = amortigua(this.actual.lat, meta.lat, k, dt);
      this.actual.lon += angulo(meta.lon - this.actual.lon) * (1 - Math.exp(-k * dt));
      this.actual.dist = amortigua(this.actual.dist, meta.dist, this.arrastre ? 8 : 1.8, dt);
    }

    this.globo.rotation.set(this.actual.lat * RAD, -this.actual.lon * RAD, 0, "XYZ");
    this.camara.position.set(0, 0, this.actual.dist);
    this.camara.lookAt(0, 0, 0);
    this.camara.updateProjectionMatrix();

    this.pop = quieto ? 1 : Math.min(1, this.pop + dt / 1.6);
    const u = this.comunes;
    u.uPop.value = this.pop;
    u.uTiempo.value = this.tiempo;
    u.uFoco.value = this.foco;
    // Granos un poco más grandes cuando la cámara se aleja, para que la tierra no se vea rala.
    u.uEscala.value = 0.5 + 0.13 * this.actual.dist;
    if (this.arcos) {
      const u = this.arcos.material.uniforms;
      const mundo = this.parada.region === 0;
      this.progresoArcos = quieto ? 3 : this.progresoArcos + dt * 0.9;
      u.uProgreso.value = this.progresoArcos;
      u.uOpacidad.value = amortigua(u.uOpacidad.value, mundo ? 1 : 0, 4, dt);
    }

    this.renderer.render(this.escena, this.camara);
    if (this.cuadro++ % 2 === 0 || this.arrastre) this.moverEtiquetas(w, h);
  }

  private moverEtiquetas(w: number, h: number) {
    this.globo.updateMatrixWorld();
    const ojo = this.camara.position;
    const ocupadas: { x0: number; y0: number; x1: number; y1: number }[] = [];
    const peso = (e: (typeof this.etiquetas)[number]) => (e.i === this.foco ? 1e6 : e.pais.granos);
    const orden = [...this.etiquetas].sort((a, b) => peso(b) - peso(a));
    const p = new THREE.Vector3();
    for (const e of orden) {
      const i = e.i;
      const enRegion = this.parada.region !== 0 && e.pais.region === this.parada.region;
      const mostrar = enRegion || i === this.foco || (this.parada.region === 0 && e.pais.region === ORIGEN);
      p.copy(e.pos).applyMatrix4(this.globo.matrixWorld);
      const frente = p.clone().normalize().dot(ojo.clone().sub(p).normalize());
      p.project(this.camara);
      const x = (p.x * 0.5 + 0.5) * w;
      const y = (-p.y * 0.5 + 0.5) * h;
      const ancho = e.el.offsetWidth || 80;
      const caja = { x0: x - 6, y0: y - 12, x1: x + ancho, y1: y + 12 };
      const choca = ocupadas.some((o) => caja.x0 < o.x1 && caja.x1 > o.x0 && caja.y0 < o.y1 && caja.y1 > o.y0);
      const ok = mostrar && frente > 0.18 && x > 0 && x + ancho < w - 8 && y > 10 && y < h - 10 && (!choca || i === this.foco);
      if (ok) ocupadas.push(caja);
      e.el.style.opacity = ok ? "1" : "0";
      e.el.style.transform = `translate3d(${x - 3}px, ${y - 9}px, 0)`;
    }
  }

  destruir() {
    this.renderer.setAnimationLoop(null);
    this.gestos.abort();
    this.renderer.dispose();
    this.escena.traverse((o) => {
      if (o instanceof THREE.Mesh) {
        o.geometry.dispose();
        (o.material as THREE.Material).dispose();
      }
    });
    this.capa.replaceChildren();
  }
}
