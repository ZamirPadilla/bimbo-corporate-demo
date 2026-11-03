export default function Footer() {
  const columnas = [
    {
      titulo: "Empresa",
      enlaces: ["Nosotros", "Historia", "Liderazgo", "Presencia global"],
    },
    {
      titulo: "Inversionistas",
      enlaces: ["Reportes trimestrales", "Informe anual", "Gobierno corporativo", "ADR BMBOY"],
    },
    {
      titulo: "Carreras",
      enlaces: ["Vida en Bimbo", "Vacantes", "Beneficios", "Diversidad e inclusión"],
    },
    {
      titulo: "Legal",
      enlaces: ["Privacidad", "Términos", "Código de ética", "Línea Comenta"],
    },
  ];

  return (
    <footer id="contacto" className="relative bg-tinta text-harina pt-20 pb-10 overflow-hidden">
      {/* Franja de colores de marca estilo Henrietta */}
      <div className="absolute top-0 inset-x-0 h-1 franja-marcas" aria-hidden />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-[1.4fr_repeat(4,1fr)] gap-10 md:gap-12 pb-16 border-b border-harina/10">
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <span className="relative inline-block w-10 h-10">
                <span className="absolute inset-0 rounded-full bg-accion-rojoBimbo" />
                <span className="absolute inset-[25%] rounded-full bg-tinta" />
              </span>
              <span className="font-display font-black uppercase text-xl tracking-tight">
                Grupo Bimbo
              </span>
            </div>
            <p className="font-serif text-lg leading-snug mb-4 max-w-xs">
              Alimentamos un mundo mejor desde 1945.
            </p>
            <p className="font-sans text-sm text-harina/60 leading-relaxed">
              Prolongación Paseo de la Reforma 1000
              <br />
              col. Peña Blanca Santa Fe
              <br />
              Álvaro Obregón, CDMX, C.P. 01210
            </p>
          </div>
          {columnas.map((col) => (
            <div key={col.titulo}>
              <h4 className="font-sans font-semibold text-xs uppercase tracking-[0.2em] text-trigo-200 mb-4">
                {col.titulo}
              </h4>
              <ul className="space-y-2.5">
                {col.enlaces.map((e) => (
                  <li key={e}>
                    <a
                      href="#"
                      className="font-sans text-sm text-harina/70 hover:text-harina transition-colors"
                    >
                      {e}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Aviso de fraude como banda discreta (reemplaza el popup actual) */}
        <div className="py-6 border-b border-harina/10 flex items-start gap-3">
          <span className="mt-0.5 inline-block w-2 h-2 rounded-full bg-trigo-200 flex-shrink-0" />
          <p className="font-sans text-xs text-harina/60 leading-relaxed">
            <strong className="text-harina/80">Aviso de fraudes:</strong> Grupo Bimbo no cobra en procesos de selección
            ni vende automóviles por internet fuera de la casa de subastas MORTON. Verifica siempre en canales
            oficiales.{" "}
            <a href="#" className="underline hover:text-harina">
              Más información
            </a>
            .
          </p>
        </div>

        <div className="pt-6 flex flex-col md:flex-row justify-between gap-4 text-xs font-sans text-harina/40">
          <p>© {new Date().getFullYear()} Grupo Bimbo, S.A.B. de C.V. — Demo con fines ilustrativos.</p>
          <div className="flex items-center gap-4">
            <span>BMV: BIMBO · ADR: BMBOY</span>
            <span className="text-harina/20">·</span>
            <a
              href="https://github.com/ZamirPadilla/bimbo-corporate-demo"
              className="hover:text-harina/80 transition-colors"
            >
              Código en GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
