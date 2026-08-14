import Image from "next/image";
import { whatsappHref } from "@/lib/site-config";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[88vh] items-center overflow-hidden"
    >
      <Image
        src="/images/hero-cobertizo.jpeg"
        alt="Cobertizo curvo de acero y madera con estacionamiento techado"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
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
