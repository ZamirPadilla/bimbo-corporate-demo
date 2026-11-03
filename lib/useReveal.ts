"use client";

import { useEffect, useRef } from "react";

/**
 * Agrega la clase `is-visible` a un elemento cuando llega al viewport.
 * Combina con `.reveal` o `.reveal-blur` del CSS global.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      options,
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return ref;
}
