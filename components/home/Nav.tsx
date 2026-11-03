"use client";

import { useEffect, useState } from "react";
import { LogoBimbo } from "@/components/branding/LogoBimbo";

const enlaces = [
  { href: "#nosotros", label: "Nosotros" },
  { href: "#marcas", label: "Marcas" },
  { href: "#sustentabilidad", label: "Sustentabilidad" },
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
          ? "bg-papel/85 backdrop-blur-xl border-b border-tinta/5 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-8">
        <a href="#" className="flex items-center gap-3 group">
          <LogoBimbo size={72} className="transition-transform group-hover:scale-105" />
          <span className="hidden sm:block font-display font-black uppercase text-xs tracking-widest text-tinta/60">
            Grupo
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-1 bg-hueso border border-tinta/5 rounded-full px-2 py-1.5">
          {enlaces.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="block px-4 py-1.5 text-sm font-sans font-medium text-tinta/70 hover:text-tinta hover:bg-papel rounded-full transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contacto"
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-tinta text-papel text-sm font-sans font-semibold px-5 py-2.5 hover:bg-azul-noche transition-colors"
        >
          Escríbenos
          <span aria-hidden>→</span>
        </a>
      </nav>
    </header>
  );
}
