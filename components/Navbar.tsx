export default function Navbar() {
  const links = [
    { href: "#nosotros", label: "Nosotros" },
    { href: "#marcas", label: "Marcas" },
    { href: "#sostenibilidad", label: "Sostenibilidad" },
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <span className="inline-block w-8 h-8 rounded-full bg-bimbo-red" />
          <span className="font-bold text-bimbo-dark tracking-tight">
            Grupo Bimbo
          </span>
          <span className="ml-2 text-xs uppercase tracking-widest text-gray-400">
            Demo
          </span>
        </a>
        <ul className="hidden md:flex items-center gap-8 text-sm text-gray-700">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="hover:text-bimbo-red transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contacto"
          className="hidden md:inline-flex items-center rounded-full bg-bimbo-red text-white text-sm font-medium px-4 py-2 hover:bg-red-700 transition-colors"
        >
          Hablemos
        </a>
      </nav>
    </header>
  );
}
