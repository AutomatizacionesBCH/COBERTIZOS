const items = [
  {
    title: "Precisión técnica",
    text: "Estructuras calculadas al milímetro para cada proyecto.",
    icon: (
      <path
        d="M4 20l7-14 4 8 3-5 2 4M4 20h16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Estética arquitectónica",
    text: "Diseños que dialogan con la arquitectura de tu hogar.",
    icon: (
      <path
        d="M4 21V10l8-6 8 6v11M9 21v-7h6v7M4 10h16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Soluciones a medida",
    text: "Terrazas, estacionamientos y quinchos personalizados.",
    icon: (
      <path
        d="M3 7h18M3 12h18M3 17h12M17 15l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Acero + madera",
    text: "Robustez estructural con calidez natural.",
    icon: (
      <path
        d="M4 6h16M4 12h16M4 18h16M4 6v12M20 6v12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

export default function WhyUs() {
  return (
    <section id="nosotros" className="bg-cream py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-wood">
            Por qué elegirnos
          </p>
          <h2 className="font-serif text-3xl font-medium text-charcoal sm:text-4xl">
            Cada detalle, pensado para durar
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.title}>
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="mb-5 text-wood"
              >
                {item.icon}
              </svg>
              <h3 className="mb-2 font-serif text-xl font-medium text-charcoal">
                {item.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-charcoal-soft">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
