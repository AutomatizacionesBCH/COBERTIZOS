import { whatsappHref } from "@/lib/site-config";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[88vh] items-center overflow-hidden"
    >
      {/*
        Dirección de arte: en mobile se muestra otra foto que en desktop, así
        que se usa <picture> en vez de next/image para que el navegador
        descargue solo la imagen del breakpoint activo (no ambas).
      */}
      <picture>
        <source media="(max-width: 639px)" srcSet="/images/banner-principal-movil.jpeg" />
        <source media="(min-width: 640px)" srcSet="/images/principal-web-pc.jpeg" />
        <img
          src="/images/principal-web-pc.jpeg"
          alt="Cobertizo de acero y madera con estacionamiento techado"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>
      <div
        className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/55 to-charcoal/20"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-28 sm:px-8">
        <div className="max-w-2xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-cream/80">
            Terrazas · Estacionamientos · Quinchos
          </p>
          <h1 className="font-serif text-4xl italic font-medium leading-[1.1] text-cream sm:text-5xl lg:text-6xl">
            Acero con la calidez de la madera
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/90">
            Diseñamos y construimos cobertizos a medida para terrazas,
            estacionamientos y quinchos, con precisión técnica y estética
            arquitectónica.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#cotizador"
              className="inline-flex h-13 items-center justify-center rounded-sm bg-accent px-8 text-base font-semibold text-cream transition-colors hover:bg-[#a5431f]"
            >
              Pedir cotización
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-13 items-center justify-center gap-2 rounded-sm border border-cream/50 bg-cream/5 px-8 text-base font-semibold text-cream backdrop-blur-sm transition-colors hover:bg-cream/15"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
