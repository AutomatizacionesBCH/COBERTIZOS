import Image from "next/image";

const testimonials = [
  {
    quote:
      "El cobertizo quedó exactamente como lo imaginamos, con una terminación impecable.",
    name: "María Elena Rojas",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
  },
  {
    quote: "Muy buena asesoría, respetaron los plazos y el presupuesto.",
    name: "Jorge Fuentes",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-cream py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-wood">
            Testimonios
          </p>
          <h2 className="font-serif text-3xl font-medium text-charcoal sm:text-4xl">
            Lo que dicen nuestros clientes
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="rounded-sm bg-cream-alt p-8"
            >
              <blockquote>
                <p className="font-serif text-xl italic leading-relaxed text-charcoal">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={t.avatar}
                    alt={`Retrato de ${t.name}`}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <span className="text-sm font-semibold text-charcoal">
                  {t.name}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
