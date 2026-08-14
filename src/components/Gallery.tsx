import Image from "next/image";

const photos = [
  {
    src: "https://images.pexels.com/photos/33287940/pexels-photo-33287940.jpeg",
    alt: "Terraza cubierta con pérgola de madera y acero",
  },
  {
    src: "/images/estacionamiento-detalle.jpeg",
    alt: "Detalle de estacionamiento techado con estructura de acero y madera",
  },
  {
    src: "https://images.pexels.com/photos/8583822/pexels-photo-8583822.jpeg",
    alt: "Quincho con patio y zona de mesas al aire libre",
  },
  {
    src: "https://images.pexels.com/photos/34169602/pexels-photo-34169602.jpeg",
    alt: "Detalle de estructura de cobertizo en madera y acero",
  },
  {
    src: "https://images.pexels.com/photos/38451960/pexels-photo-38451960.jpeg",
    alt: "Terraza techada integrada a la fachada de una vivienda",
  },
  {
    src: "https://images.pexels.com/photos/36723152/pexels-photo-36723152.jpeg",
    alt: "Cobertizo terminado con iluminación cálida al atardecer",
  },
];

export default function Gallery() {
  return (
    <section id="proyectos" className="bg-cream-alt py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-wood">
            Portafolio
          </p>
          <h2 className="font-serif text-3xl font-medium text-charcoal sm:text-4xl">
            Proyectos recientes
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
          {photos.map((photo, i) => (
            <div
              key={photo.src}
              className="relative aspect-square overflow-hidden rounded-sm"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
                loading={i < 3 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
