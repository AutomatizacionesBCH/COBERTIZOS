const steps = [
  {
    number: "01",
    title: "Visita y medición",
    text: "Evaluamos el espacio y tus necesidades en terreno.",
  },
  {
    number: "02",
    title: "Diseño a medida",
    text: "Propuesta técnica y estética adaptada a tu proyecto.",
  },
  {
    number: "03",
    title: "Fabricación",
    text: "Estructuras fabricadas con acero y madera seleccionada.",
  },
  {
    number: "04",
    title: "Instalación",
    text: "Montaje profesional, listo para disfrutar.",
  },
];

export default function Process() {
  return (
    <section className="bg-cream py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-wood">
            Nuestro proceso
          </p>
          <h2 className="font-serif text-3xl font-medium text-charcoal sm:text-4xl">
            Cómo trabajamos
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.number} className="border-t-2 border-accent pt-6">
              <span className="font-serif text-4xl font-medium text-accent">
                {step.number}
              </span>
              <h3 className="mt-4 mb-2 font-serif text-xl font-medium text-charcoal">
                {step.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-charcoal-soft">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
