import { siteConfig } from "@/lib/site-config";

const navLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

export default function Footer() {
  return (
    <footer className="bg-footer text-cream">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-serif text-2xl font-medium">
              {siteConfig.businessName}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/70">
              Cobertizos a medida en acero y madera para terrazas,
              estacionamientos y quinchos.
            </p>
          </div>

          <nav aria-label="Navegación de pie de página" className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-cream/80 transition-colors hover:text-cream"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <a
              href={siteConfig.phoneHref}
              className="text-sm text-cream/80 transition-colors hover:text-cream"
            >
              {siteConfig.phoneDisplay}
            </a>
            <div className="flex gap-4">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-sm border border-cream/20 text-cream/80 transition-colors hover:border-cream hover:text-cream"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
                </svg>
              </a>
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-sm border border-cream/20 text-cream/80 transition-colors hover:border-cream hover:text-cream"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M14 9h2V6h-2c-1.7 0-3 1.3-3 3v2H9v3h2v6h3v-6h2l1-3h-3v-2c0-.6.4-1 1-1z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <p className="mt-14 border-t border-cream/10 pt-8 text-xs text-cream/50">
          © 2026 {siteConfig.businessName}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
