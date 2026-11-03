"use client";

import { useEffect, useState } from "react";

const enlaces = [
  { href: "#nosotros", label: "Nosotros" },
  { href: "#marcas", label: "Marcas" },
  { href: "#sostenibilidad", label: "Sustentabilidad" },
  { href: "#inversionistas", label: "Inversionistas" },
  { href: "#carreras", label: "Carreras" },
  { href: "#prensa", label: "Prensa" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-harina/80 backdrop-blur-xl border-b border-tinta/5 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <span className="relative inline-block w-9 h-9">
            <span className="absolute inset-0 rounded-full bg-accion-rojoBimbo transition-transform duration-500 group-hover:scale-110" />
            <span className="absolute inset-[25%] rounded-full bg-harina" />
          </span>
          <span className="font-display font-bold text-tinta tracking-tight text-lg uppercase">
            Grupo Bimbo
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-1 bg-migaja/60 backdrop-blur border border-tinta/5 rounded-full px-2 py-1.5">
          {enlaces.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="px-4 py-1.5 text-sm font-medium text-tinta/70 hover:text-tinta hover:bg-harina rounded-full transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contacto"
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-tinta text-harina text-sm font-semibold font-sans px-5 py-2.5 hover:bg-azul-700 transition-colors"
        >
          Hablemos
          <span aria-hidden>→</span>
        </a>
      </nav>
    </header>
  );
}
