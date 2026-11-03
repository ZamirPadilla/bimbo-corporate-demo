import { segmentar } from "@/content/resolver";

const MARCADOR = /(\[[^\]]+\])/;
const ES_MARCADOR = /^\[[^\]]+\]$/;
const pendiente = "rounded-sm px-1 outline outline-1 outline-dashed outline-amber-600 text-amber-800";

// Pinta un texto del guion: las cifras por confirmar quedan subrayadas y los
// marcadores [por confirmar], [enlace pendiente], [por migrar] quedan enmarcados.
export default function Texto({ children }: { children: string }) {
  return (
    <>
      {segmentar(children).map((s, i) => {
        if (s.cifra?.estado === "por-confirmar") {
          return (
            <mark
              key={i}
              title={s.cifra.nota ?? "Cifra por confirmar"}
              className="bg-transparent text-inherit underline decoration-dashed decoration-2 underline-offset-4 decoration-amber-600"
            >
              {s.texto}
              <span className="sr-only"> (cifra por confirmar)</span>
            </mark>
          );
        }
        return s.texto.split(MARCADOR).map((parte, j) =>
          ES_MARCADOR.test(parte) ? (
            <span key={`${i}-${j}`} className={pendiente}>
              {parte}
            </span>
          ) : (
            <span key={`${i}-${j}`}>{parte}</span>
          ),
        );
      })}
    </>
  );
}
