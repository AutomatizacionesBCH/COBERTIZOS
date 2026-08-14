"use client";

import { useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

const navLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
        <a href="#inicio" className="flex items-center gap-3">
          <Image
            src="/images/logo-mark-white.png"
            alt=""
            width={35}
            height={44}
            priority
            className="h-10 w-auto sm:h-11"
          />
          <span className="font-serif text-2xl font-medium tracking-tight text-cream">
            {siteConfig.businessName}
          </span>
        </a>

        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-9 md:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[15px] font-medium text-cream/80 transition-colors hover:text-[#e2794f]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <a
            href={siteConfig.phoneHref}
            className="text-[15px] font-medium text-cream/80 transition-colors hover:text-[#e2794f]"
          >
            {siteConfig.phoneDisplay}
          </a>
          <a
            href="#cotizador"
            className="inline-flex h-11 items-center justify-center rounded-sm bg-accent px-6 text-sm font-semibold text-cream transition-colors hover:bg-[#a5431f]"
          >
            Cotizar
          </a>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-sm text-cream md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {open ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Navegación móvil"
          className="flex flex-col border-t border-white/10 bg-black px-5 pb-6 pt-2 md:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center border-b border-cream/10 text-base font-medium text-cream"
            >
              {link.label}
            </a>
          ))}
          <a
            href={siteConfig.phoneHref}
            className="flex min-h-11 items-center border-b border-cream/10 text-base font-medium text-cream"
          >
            {siteConfig.phoneDisplay}
          </a>
          <a
            href="#cotizador"
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex h-11 items-center justify-center rounded-sm bg-accent px-6 text-sm font-semibold text-cream"
          >
            Cotizar
          </a>
        </nav>
      )}
    </header>
  );
}
