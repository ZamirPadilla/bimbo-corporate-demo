export default function Footer() {
  const sections = [
    {
      title: "Empresa",
      links: ["Historia", "Liderazgo", "Carreras", "Prensa"],
    },
    {
      title: "Inversionistas",
      links: ["Reportes", "Gobierno corporativo", "Acción BIMBOA", "Eventos"],
    },
    {
      title: "Legal",
      links: ["Privacidad", "Términos", "Código de ética", "Transparencia"],
    },
  ];

  return (
    <footer id="contacto" className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="inline-block w-8 h-8 rounded-full bg-bimbo-red" />
              <span className="font-bold text-bimbo-dark">Grupo Bimbo</span>
            </div>
            <p className="mt-4 text-sm text-gray-600 leading-relaxed">
              Nuestra misión: alimentar un mundo mejor.
            </p>
            <p className="mt-4 text-xs text-gray-400">
              Prolongación Paseo de la Reforma 1000
              <br />
              Ciudad de México, México
            </p>
          </div>
          {sections.map((s) => (
            <div key={s.title}>
              <h4 className="font-semibold text-bimbo-dark text-sm">
                {s.title}
              </h4>
              <ul className="mt-4 space-y-2">
                {s.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-600 hover:text-bimbo-red transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between gap-4 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} Grupo Bimbo, S.A.B. de C.V. — Demo
            pública con fines educativos. Este proyecto no está afiliado
            oficialmente con Grupo Bimbo.
          </p>
          <p>
            Hecho con ♥ por la comunidad. Contribuye en{" "}
            <a
              href="https://github.com/ZamirPadilla/bimbo-corporate-demo"
              className="underline hover:text-bimbo-red"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
