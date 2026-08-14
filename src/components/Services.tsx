import Image from "next/image";

const services = [
  {
    title: "Terrazas",
    text: "Espacios cubiertos para disfrutar el exterior todo el año.",
    image: "https://images.pexels.com/photos/34164217/pexels-photo-34164217.jpeg",
    alt: "Terraza con pérgola de madera y estructura de acero",
  },
  {
    title: "Estacionamientos",
    text: "Protección durable para vehículos, integrada al diseño de tu casa.",
    image: "/images/estacionamiento-carport.jpeg",
    alt: "Estacionamiento techado de acero y madera integrado a la fachada de una vivienda",
  },
  {
    title: "Quinchos",
    text: "El punto de encuentro familiar, techado con estilo.",
    image: "/images/quincho-patio.jpeg",
    alt: "Quincho techado con estructura de acero junto a un patio con pasto",
  },
];

export default function Services() {
  return (
    <section id="servicios" className="bg-cream-alt py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-wood">
            Servicios
          </p>
          <h2 className="font-serif text-3xl font-medium text-charcoal sm:text-4xl">
            Nuestros cobertizos
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="group overflow-hidden rounded-sm bg-cream"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 font-serif text-xl font-medium text-charcoal">
                  {service.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-charcoal-soft">
                  {service.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
