// Genera los documentos de copy a partir de content/ (la fuente única).
// Uso: npm run copy:docs
import { writeFileSync } from "node:fs";
import { cifras, porConfirmar, type Cifra } from "../content/cifras";
import { paginas } from "../content/paginas";
import { plano } from "../content/resolver";
import type { Seccion } from "../content/tipos";

const AVISO = "> Generado por `npm run copy:docs` desde `content/`. No editar a mano: editar `content/paginas.ts` o `content/cifras.ts`.\n";

function cifrasMd() {
  const filas = (Object.values(cifras) as Cifra[]).map((c) => {
    const fuentes = c.fuentes.map((f) => `[${f.pagina}](${f.url}): «${f.dice}»`).join("<br>");
    return `| ${c.etiqueta} | **${c.valor}**${c.corte ? ` (${c.corte})` : ""} | ${c.estado === "confirmada" ? "Confirmada" : "**Por confirmar**"} | ${fuentes} | ${c.nota ?? ""} |`;
  });
  return [
    "# Fuente única de cifras",
    "",
    AVISO,
    `${Object.keys(cifras).length} cifras; ${porConfirmar.length} por confirmar. Fuente: sitio público grupobimbo.com, leído el 2 de noviembre de 2026.`,
    "",
    "| Cifra | Valor propuesto | Estado | Dónde aparece hoy | Nota |",
    "|---|---|---|---|---|",
    ...filas,
    "",
  ].join("\n");
}

function seccionMd(s: Seccion): string[] {
  const p = (t: string) => plano(t, true);
  const out = [`### ${s.id} · ${s.tipo}`, ""];
  switch (s.tipo) {
    case "hero":
      if (s.rotulo) out.push(`**Rótulo:** ${p(s.rotulo)}  `);
      out.push(`**Titular:** ${p(s.titular)}  `, `**Bajada:** ${p(s.bajada)}  `);
      if (s.ctas) out.push(`**Botones:** ${s.ctas.map((c) => p(c.texto)).join(" · ")}  `);
      if (s.medio) out.push(`**Visual:** ${s.medio}  `);
      break;
    case "texto":
      if (s.rotulo) out.push(`**Rótulo:** ${p(s.rotulo)}  `);
      out.push(`**Título:** ${p(s.titulo)}`, "", ...s.parrafos.map(p));
      if (s.cta) out.push("", `**Botón:** ${p(s.cta.texto)}`);
      break;
    case "cifras":
      if (s.titulo) out.push(`**Título:** ${s.titulo}`, "");
      out.push(...s.ids.map((id) => `- ${cifras[id].etiqueta}: ${p(`{${id}}`)}`));
      break;
    case "tarjetas":
      if (s.rotulo) out.push(`**Rótulo:** ${p(s.rotulo)}  `);
      out.push(`**Título:** ${p(s.titulo)}`);
      if (s.intro) out.push("", p(s.intro));
      out.push("", ...s.items.map((i) => `- **${p(i.titulo)}.** ${p(i.texto)}${i.cta ? ` → *${p(i.cta.texto)}*` : ""}`));
      break;
    case "lista":
      out.push(`**Título:** ${p(s.titulo)}`);
      if (s.intro) out.push("", p(s.intro));
      out.push("", ...s.items.map((i) => `- ${p(i)}`));
      break;
    case "etapas":
      out.push(`**Título:** ${p(s.titulo)}`);
      if (s.intro) out.push("", p(s.intro));
      out.push("", ...s.items.map((i, n) => `${n + 1}. **${p(i.titulo)}.** ${p(i.texto)}`));
      break;
    case "eras":
      out.push(`**Título:** ${p(s.titulo)}`, "", ...s.items.map((i) => `- **${i.periodo} · ${p(i.titulo)}.** ${p(i.texto)}`));
      break;
    case "directorio":
      out.push(`**Título:** ${p(s.titulo)}`, "", p(s.intro), "", `Filtros: ${s.filtros.join(", ")}. Muestra: ${s.muestra.join(", ")}.`);
      break;
    case "regiones":
      out.push(`**Título:** ${p(s.titulo)}`, "", p(s.intro), "", ...s.regiones.map((r) => `- **${r.nombre} (${r.paises.length}):** ${r.paises.join(", ")}`));
      break;
    case "noticias":
      out.push(`**Título:** ${p(s.titulo)} · ${s.cantidad} notas del CMS · Botón: ${p(s.cta.texto)}`);
      break;
    case "distribuidor":
      out.push(`**Título:** ${p(s.titulo)}`);
      if (s.intro) out.push("", p(s.intro));
      out.push("", "| Para | Texto | Botón |", "|---|---|---|", ...s.rutas.map((r) => `| ${r.audiencia} | ${p(r.texto)} | ${p(r.cta.texto)} |`));
      break;
    case "descargas":
      out.push(`**Título:** ${p(s.titulo)}`, "", ...s.items.map((d) => `- ${p(d.titulo)} · ${p(d.detalle)}`));
      break;
    case "preguntas":
      out.push(`**Título:** ${p(s.titulo)}`, "", ...s.items.map((q) => `- **${p(q.pregunta)}** ${p(q.respuesta)}`));
      break;
    case "aviso":
      out.push(`**Título:** ${p(s.titulo)}`, "", p(s.texto));
      break;
    case "cta":
      out.push(`**Titular:** ${p(s.titular)}  `, `**Texto:** ${p(s.texto)}  `, `**Botones:** ${s.ctas.map((c) => p(c.texto)).join(" · ")}`);
      break;
  }
  if (s.nota) out.push("", `> Nota de diseño: ${s.nota}`);
  out.push("");
  return out;
}

function deckMd() {
  const out = ["# Copy deck (ES)", "", AVISO, "Wireframes navegables: `npm run dev` y abrir `/wireframes`.", ""];
  for (const pg of paginas) {
    const t = plano(pg.meta.title);
    const d = plano(pg.meta.description);
    out.push(`## ${pg.nombre} · \`${pg.ruta}\``, "", `- **title** (${t.length} car.): ${t}`, `- **description** (${d.length} car.): ${d}`, `- **Audiencias:** ${pg.audiencias.join(", ")}`, "");
    for (const s of pg.secciones) out.push(...seccionMd(s));
  }
  return out.join("\n");
}

writeFileSync("docs/copy/02-fuente-unica-de-cifras.md", cifrasMd());
writeFileSync("docs/copy/04-copy-deck.md", deckMd());
console.log("docs/copy/02-fuente-unica-de-cifras.md y docs/copy/04-copy-deck.md generados");
