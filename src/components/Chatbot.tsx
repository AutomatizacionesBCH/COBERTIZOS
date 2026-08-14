"use client";

import { useState } from "react";
import { useQuotePrefill } from "@/context/QuotePrefillContext";
import type { TipoCubierta, UsoCobertizo } from "@/context/QuotePrefillContext";

type Step = 0 | 1 | 2 | 3 | 4;

interface Answers {
  tipoUso: UsoCobertizo | null;
  medidas: string;
  cubierta: TipoCubierta | null;
  fechaInicio: string;
}

const emptyAnswers: Answers = {
  tipoUso: null,
  medidas: "",
  cubierta: null,
  fechaInicio: "",
};

const usoOptions: UsoCobertizo[] = ["Terraza", "Estacionamiento", "Quincho", "Otro"];
const cubiertaOptions: TipoCubierta[] = ["Transparente", "Opaca", "Mixta"];

export default function Chatbot() {
  const { setPrefill } = useQuotePrefill();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>(0);
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [medidasInput, setMedidasInput] = useState("");

  function reset() {
    setStep(0);
    setAnswers(emptyAnswers);
    setMedidasInput("");
  }

  function selectUso(uso: UsoCobertizo) {
    setAnswers((prev) => ({ ...prev, tipoUso: uso }));
    setStep(1);
  }

  function submitMedidas(value: string) {
    setAnswers((prev) => ({ ...prev, medidas: value }));
    setStep(2);
  }

  function selectCubierta(cubierta: TipoCubierta) {
    setAnswers((prev) => ({ ...prev, cubierta }));
    setStep(3);
  }

  function submitFecha(value: string) {
    const finalAnswers = { ...answers, fechaInicio: value };
    setAnswers(finalAnswers);
    setStep(4);
    fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalAnswers),
    }).catch(() => {});
  }

  function goToQuote() {
    setPrefill({
      tipoUso: answers.tipoUso ?? undefined,
      medidas: answers.medidas || undefined,
      cubierta: answers.cubierta ?? undefined,
      fechaInicio: answers.fechaInicio || undefined,
    });
    setOpen(false);
    reset();
    document.getElementById("cotizador")?.scrollIntoView({ behavior: "smooth" });
  }

  const questionClass = "text-[15px] leading-relaxed text-charcoal";
  const optionButtonClass =
    "min-h-11 rounded-sm border border-charcoal/20 px-4 py-2 text-left text-sm font-medium text-charcoal transition-colors hover:border-accent hover:text-accent";

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div
          role="dialog"
          aria-label="Chat de calificación de proyecto"
          className="mb-4 flex h-[28rem] w-[20rem] flex-col overflow-hidden rounded-sm border border-charcoal/10 bg-cream shadow-xl sm:w-[22rem]"
        >
          <div className="flex items-center justify-between bg-charcoal px-4 py-3">
            <p className="font-serif text-base font-medium text-cream">
              Cuéntanos tu proyecto
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar chat"
              className="flex h-8 w-8 items-center justify-center text-cream/80 hover:text-cream"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="flex-1 space-y-5 overflow-y-auto p-5">
            {step === 0 && (
              <div className="space-y-4">
                <p className={questionClass}>
                  ¿Qué uso principal tendrá el cobertizo?
                </p>
                <div className="flex flex-col gap-2">
                  {usoOptions.map((uso) => (
                    <button
                      key={uso}
                      type="button"
                      className={optionButtonClass}
                      onClick={() => selectUso(uso)}
                    >
                      {uso}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <p className={questionClass}>¿Cuentas con medidas aproximadas?</p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    submitMedidas(medidasInput.trim() || "No lo sé aún");
                  }}
                  className="flex flex-col gap-2"
                >
                  <input
                    type="text"
                    placeholder="Ej: 4 x 3 metros"
                    value={medidasInput}
                    onChange={(e) => setMedidasInput(e.target.value)}
                    className="h-11 w-full rounded-sm border border-charcoal/20 bg-cream px-3 text-sm text-charcoal placeholder:text-charcoal-soft/60 focus:border-accent"
                  />
                  <button
                    type="submit"
                    className="min-h-11 rounded-sm bg-accent px-4 text-sm font-semibold text-cream hover:bg-[#a5431f]"
                  >
                    Continuar
                  </button>
                  <button
                    type="button"
                    onClick={() => submitMedidas("No lo sé aún")}
                    className={optionButtonClass}
                  >
                    No lo sé aún
                  </button>
                </form>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <p className={questionClass}>¿Qué tipo de cubierta prefieres?</p>
                <div className="flex flex-col gap-2">
                  {cubiertaOptions.map((cubierta) => (
                    <button
                      key={cubierta}
                      type="button"
                      className={optionButtonClass}
                      onClick={() => selectCubierta(cubierta)}
                    >
                      {cubierta}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <p className={questionClass}>
                  ¿Para qué fecha te gustaría iniciar la obra?
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const value = new FormData(e.currentTarget).get("fecha")?.toString();
                    if (value) submitFecha(value);
                  }}
                  className="flex flex-col gap-2"
                >
                  <input
                    type="month"
                    name="fecha"
                    required
                    className="h-11 w-full rounded-sm border border-charcoal/20 bg-cream px-3 text-sm text-charcoal focus:border-accent"
                  />
                  <button
                    type="submit"
                    className="min-h-11 rounded-sm bg-accent px-4 text-sm font-semibold text-cream hover:bg-[#a5431f]"
                  >
                    Continuar
                  </button>
                </form>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <p className={questionClass}>Este es el resumen de tu proyecto:</p>
                <ul className="space-y-1 text-sm text-charcoal-soft">
                  <li>
                    <span className="font-semibold text-charcoal">Uso:</span> {answers.tipoUso}
                  </li>
                  <li>
                    <span className="font-semibold text-charcoal">Medidas:</span> {answers.medidas}
                  </li>
                  <li>
                    <span className="font-semibold text-charcoal">Cubierta:</span> {answers.cubierta}
                  </li>
                  <li>
                    <span className="font-semibold text-charcoal">Inicio estimado:</span> {answers.fechaInicio}
                  </li>
                </ul>
                <button
                  type="button"
                  onClick={goToQuote}
                  className="min-h-11 w-full rounded-sm bg-accent px-4 text-sm font-semibold text-cream hover:bg-[#a5431f]"
                >
                  Enviar a cotización
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="min-h-11 w-full rounded-sm border border-charcoal/20 px-4 text-sm font-medium text-charcoal-soft hover:text-accent"
                >
                  Empezar de nuevo
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Cerrar chat de calificación" : "Abrir chat de calificación"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-charcoal text-cream shadow-lg transition-transform hover:scale-105"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 5h16v11H8l-4 4V5z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
