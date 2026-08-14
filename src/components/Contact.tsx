import { siteConfig, whatsappHref } from "@/lib/site-config";

export default function Contact() {
  return (
    <section id="contacto" className="bg-cream py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-wood">
            Contacto
          </p>
          <h2 className="font-serif text-3xl font-medium text-charcoal sm:text-4xl">
            Visita nuestro showroom
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-sm">
            <iframe
              src={siteConfig.mapsEmbedSrc}
              title="Ubicación del showroom en el mapa"
              className="h-80 w-full border-0 lg:h-full lg:min-h-96"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="flex flex-col justify-center gap-8">
            <div>
              <h3 className="mb-1 font-serif text-lg font-medium text-charcoal">
                Dirección
              </h3>
              <p className="text-[15px] leading-relaxed text-charcoal-soft">
                {siteConfig.address}
              </p>
            </div>
            <div>
              <h3 className="mb-1 font-serif text-lg font-medium text-charcoal">
                Horario de atención
              </h3>
              <p className="text-[15px] leading-relaxed text-charcoal-soft">
                {siteConfig.schedule}
              </p>
            </div>
            <div>
              <h3 className="mb-1 font-serif text-lg font-medium text-charcoal">
                Teléfono
              </h3>
              <a
                href={siteConfig.phoneHref}
                className="text-[15px] leading-relaxed text-charcoal-soft transition-colors hover:text-accent"
              >
                {siteConfig.phoneDisplay}
              </a>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-sm bg-accent px-6 text-sm font-semibold text-cream transition-colors hover:bg-[#a5431f]"
              >
                Escribir por WhatsApp
              </a>
              <a
                href="#cotizador"
                className="inline-flex h-11 items-center justify-center rounded-sm border border-charcoal/20 px-6 text-sm font-semibold text-charcoal transition-colors hover:border-accent hover:text-accent"
              >
                Pedir cotización
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
