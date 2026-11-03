// Empaqueta el globo de presencia para la página estática de Inicio (public/design/Inicio.dc.html).
// Uso: npx tsx scripts/globo-estatico.ts  →  public/design/globo/bimbo-globo.js y bimbo-globo.css
// Volver a correrlo cada vez que cambie components/globo/ o las cifras de content/.
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { build } from "esbuild";
import postcss from "postcss";
import tailwindcss from "tailwindcss";
import config from "../tailwind.config";

const raiz = path.resolve(__dirname, "..");
const salida = path.join(raiz, "public/design/globo");
async function main() {
  mkdirSync(salida, { recursive: true });

  await build({
    entryPoints: [path.join(raiz, "components/globo/montar.tsx")],
    outfile: path.join(salida, "bimbo-globo.js"),
    bundle: true,
    minify: true,
    format: "iife",
    target: "es2020",
    jsx: "automatic",
    alias: { "@": raiz },
    define: { "process.env.NODE_ENV": '"production"' },
    legalComments: "eof",
    logLevel: "info",
  });

  // Utilidades de Tailwind solo para el globo, sin el reset global (preflight) y con selector propio para no
  // tocar los estilos de la página. El reset mínimo que el componente necesita va acotado a [data-globo].
  const base = `
  [data-globo], [data-globo] *, [data-globo] ::before, [data-globo] ::after { box-sizing: border-box; border: 0 solid currentColor; }
  [data-globo] { --font-display: Outfit; line-height: 1.5; }
  [data-globo] :is(h1, h2, p, dl, dd, ul) { margin: 0; padding: 0; }
  [data-globo] ul { list-style: none; }
  [data-globo] button { font: inherit; color: inherit; background: transparent; padding: 0; margin: 0; cursor: pointer; text-transform: inherit; }
  [data-globo] canvas { display: block; }
  @media (min-width: 768px) { html:has([data-globo]) { font-size: clamp(12px, calc(min(1vw, 1.6vh) * 1.111), 32px); } }
  @keyframes globo-avance { from { transform: scaleX(0); } to { transform: scaleX(1); } }
  @keyframes globo-entra { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
  `;
  const css = await postcss([
    tailwindcss({
      ...config,
      content: [path.join(raiz, "components/globo/GloboPresencia.tsx")],
      corePlugins: { preflight: false },
      important: "[data-globo-raiz]",
    }),
  ]).process(`${base}\n@tailwind utilities;`, { from: undefined });
  writeFileSync(path.join(salida, "bimbo-globo.css"), css.css);
  console.log(`bimbo-globo.css  ${(css.css.length / 1024).toFixed(1)}kb`);
}

main();
