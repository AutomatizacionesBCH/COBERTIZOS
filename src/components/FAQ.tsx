const faqs = [
  {
    question: "¿Hacen cobertizos a medida?",
    answer:
      "Sí, cada proyecto se diseña según el espacio y las necesidades del cliente.",
  },
  {
    question: "¿Incluyen instalación?",
    answer:
      "Todos nuestros proyectos incluyen fabricación e instalación por nuestro equipo.",
  },
  {
    question: "¿Cuánto demora un proyecto?",
    answer:
      "Depende del tamaño y complejidad; te entregamos un plazo estimado en la visita técnica.",
  },
  {
    question: "¿Trabajan fuera de Santiago?",
    answer: "Sí, coordinamos proyectos en distintas regiones del país.",
  },
];

export default function FAQ() {
  return (
    <section className="bg-cream-alt py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-wood">
            Preguntas frecuentes
          </p>
          <h2 className="font-serif text-3xl font-medium text-charcoal sm:text-4xl">
            Resolvemos tus dudas
          </h2>
        </div>

        <div className="divide-y divide-charcoal/10 border-y border-charcoal/10">
          {faqs.map((faq) => (
            <details key={faq.question} className="group py-5">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4">
                <span className="font-serif text-lg font-medium text-charcoal">
                  {faq.question}
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="shrink-0 text-wood transition-transform duration-200 group-open:rotate-45"
                >
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </summary>
              <p className="mt-3 pr-8 text-[15px] leading-relaxed text-charcoal-soft">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
