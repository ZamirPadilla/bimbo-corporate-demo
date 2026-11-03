import { LogoBimbo } from "@/components/branding/LogoBimbo";
import { Apilado } from "@/components/branding/Apilado";

export default function Footer() {
  const columnas = [
    {
      titulo: "Empresa",
      enlaces: ["Nosotros", "Historia", "Liderazgo", "Presencia global"],
    },
    {
      titulo: "Inversionistas",
      enlaces: [
        "Reportes trimestrales",
        "Informe anual 2025",
        "Gobierno corporativo",
        "ADR BMBOY",
      ],
    },
    {
      titulo: "Carreras",
      enlaces: [
        "Vida en Bimbo",
        "Vacantes por país",
        "Beneficios",
        "Diversidad e inclusión",
      ],
    },
    {
      titulo: "Legal",
      enlaces: ["Privacidad", "Términos", "Código de ética", "Línea Comenta"],
    },
  ];

  return (
    <footer id="contacto" className="relative bg-azul-noche text-papel pt-24 pb-10 overflow-hidden">
      {/* Franja de pilares arriba */}
      <div className="absolute top-0 inset-x-0 h-1.5 franja-pilares" aria-hidden />
      <div className="absolute inset-0 mantel-azul opacity-30" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Cierre narrativo */}
        <div className="mb-20 max-w-3xl">
          <Apilado silabas={["CELE", "BRA", "MOS"]} tamano="sm" variante="mixto" className="text-cimientos-arena" />
          <p className="mt-6 font-sans text-xl md:text-2xl text-papel/90 leading-relaxed">
            lo que nos une: 80 años horneando, +153 mil colaboradores y una misión que seguimos cumpliendo cada día.
          </p>
        </div>

        {/* Columnas */}
        <div className="grid md:grid-cols-[1.4fr_repeat(4,1fr)] gap-10 md:gap-12 pb-16 border-b border-papel/10">
          <div>
            <LogoBimbo size={80} variante="sobre-oscuro" />
            <p className="mt-6 font-sans text-sm text-papel/70 leading-relaxed">
              Prolongación Paseo de la Reforma 1000
              <br />
              col. Peña Blanca Santa Fe
              <br />
              Álvaro Obregón, CDMX, C.P. 01210
            </p>
            <p className="mt-6 font-mono text-xs text-papel/40 uppercase tracking-widest">
              BMV: BIMBO · ADR: BMBOY
            </p>
          </div>
          {columnas.map((col) => (
            <div key={col.titulo}>
              <h4 className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-cimientos-arena mb-5">
                {col.titulo}
              </h4>
              <ul className="space-y-2.5">
                {col.enlaces.map((e) => (
                  <li key={e}>
                    <a
                      href="#"
                      className="font-sans text-sm text-papel/70 hover:text-papel transition-colors"
                    >
                      {e}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Aviso de fraude como banda discreta (reemplaza el modal del sitio actual) */}
        <div className="py-6 border-b border-papel/10 flex items-start gap-3">
          <span className="mt-0.5 inline-block w-2 h-2 rounded-full bg-cimientos-arena flex-shrink-0" />
          <p className="font-sans text-xs text-papel/60 leading-relaxed">
            <strong className="text-papel/85">Aviso de fraudes.</strong> Grupo Bimbo no cobra en procesos de selección
            ni vende automóviles por internet fuera de la casa de subastas MORTON. Verifica siempre en canales
            oficiales.{" "}
            <a href="#" className="underline hover:text-papel">
              Más información
            </a>
            .
          </p>
        </div>

        {/* Comenta como link, no botón destacado */}
        <div className="py-6 border-b border-papel/10 flex items-start gap-3">
          <span className="mt-0.5 inline-block w-2 h-2 rounded-full bg-rojo flex-shrink-0" />
          <p className="font-sans text-xs text-papel/60 leading-relaxed">
            <strong className="text-papel/85">Comenta · línea ética.</strong> Para colaboradores y proveedores que
            quieran reportar una posible falta al Código de Ética.{" "}
            <a href="#" className="underline hover:text-papel">
              Reportar en Comenta
            </a>
            .
          </p>
        </div>

        <div className="pt-6 flex flex-col md:flex-row justify-between gap-4 text-xs font-sans text-papel/40">
          <p>
            © {new Date().getFullYear()} Grupo Bimbo, S.A.B. de C.V. — Demo con fines ilustrativos. No afiliada
            oficialmente a Grupo Bimbo.
          </p>
          <a
            href="https://github.com/ZamirPadilla/bimbo-corporate-demo"
            className="hover:text-papel/70 transition-colors"
          >
            Código en GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
