"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useQuotePrefill } from "@/context/QuotePrefillContext";
import type { QuotePrefill } from "@/context/QuotePrefillContext";
import { emptyQuoteForm, type QuoteFormFields } from "@/lib/types";

type Status = "idle" | "submitting" | "success" | "error";

const medidasPattern = /^\s*(\d+(?:[.,]\d+)?)\s*[x×]\s*(\d+(?:[.,]\d+)?)\s*$/i;

export default function QuoteForm() {
  const { prefill, clearPrefill } = useQuotePrefill();
  const [fields, setFields] = useState<QuoteFormFields>(emptyQuoteForm);
  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormFields, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sincroniza las respuestas del chatbot al formulario. Se ajusta durante
  // el render (en vez de un efecto) siguiendo el patrón recomendado por
  // React para adaptar estado a partir de una prop/contexto que cambia.
  const [appliedPrefill, setAppliedPrefill] = useState<QuotePrefill | null>(null);
  if (prefill && prefill !== appliedPrefill) {
    setAppliedPrefill(prefill);
    setFields((prev) => {
      const next = { ...prev };
      if (prefill.tipoUso) next.tipoUso = prefill.tipoUso;
      if (prefill.cubierta) next.cubierta = prefill.cubierta;

      const notes: string[] = [];
      if (prefill.medidas) {
        const match = prefill.medidas.match(medidasPattern);
        if (match) {
          next.largo = match[1].replace(",", ".");
          next.ancho = match[2].replace(",", ".");
        } else {
          notes.push(`Medidas aproximadas: ${prefill.medidas}`);
        }
      }
      if (prefill.fechaInicio) {
        notes.push(`Fecha estimada de inicio: ${prefill.fechaInicio}`);
      }
      if (notes.length > 0) {
        next.notas = [prev.notas, ...notes].filter(Boolean).join(" · ");
      }
      return next;
    });
  }

  // Notifica al proveedor de contexto (un componente externo) que el
  // prefill ya fue consumido. No es estado local de este componente.
  useEffect(() => {
    if (prefill) clearPrefill();
  }, [prefill, clearPrefill]);

  function updateField<K extends keyof QuoteFormFields>(key: K, value: QuoteFormFields[K]) {
    setFields((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setPhoto(file);
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoPreview(file ? URL.createObjectURL(file) : null);
  }

  function removePhoto() {
    setPhoto(null);
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function validate(): boolean {
    const nextErrors: Partial<Record<keyof QuoteFormFields, string>> = {};
    if (!fields.nombre.trim()) nextErrors.nombre = "Ingresa tu nombre.";
    if (!fields.telefono.trim()) nextErrors.telefono = "Ingresa un teléfono de contacto.";
    if (!fields.email.trim()) {
      nextErrors.email = "Ingresa tu correo electrónico.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      nextErrors.email = "Ingresa un correo electrónico válido.";
    }
    if (!fields.largo.trim()) nextErrors.largo = "Indica el largo aproximado.";
    if (!fields.ancho.trim()) nextErrors.ancho = "Indica el ancho aproximado.";
    if (!fields.tipoUso) nextErrors.tipoUso = "Selecciona el tipo de uso.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    try {
      const formData = new FormData();
      Object.entries(fields).forEach(([key, value]) => formData.append(key, value));
      if (photo) formData.append("foto", photo);

      const res = await fetch("/api/quote", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Respuesta no exitosa");

      setStatus("success");
      setFields(emptyQuoteForm);
      removePhoto();
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "h-11 w-full rounded-sm border border-charcoal/20 bg-cream px-4 text-[15px] text-charcoal placeholder:text-charcoal-soft/60 focus:border-accent";
  const labelClass = "mb-2 block text-sm font-medium text-charcoal";
  const errorClass = "mt-1 text-xs text-accent";

  return (
    <section id="cotizador" className="bg-cream-alt py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-wood">
            Cotizador
          </p>
          <h2 className="font-serif text-3xl font-medium text-charcoal sm:text-4xl">
            Solicita tu cotización
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-charcoal-soft">
            Cuéntanos sobre tu proyecto y te contactaremos con una propuesta a
            medida.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-10">
          <fieldset className="space-y-5">
            <legend className="mb-1 font-serif text-lg font-medium text-charcoal">
              Datos de contacto
            </legend>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="nombre" className={labelClass}>
                  Nombre completo
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  className={inputClass}
                  value={fields.nombre}
                  onChange={(e) => updateField("nombre", e.target.value)}
                  aria-invalid={!!errors.nombre}
                  aria-describedby={errors.nombre ? "nombre-error" : undefined}
                />
                {errors.nombre && (
                  <p id="nombre-error" className={errorClass}>
                    {errors.nombre}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="telefono" className={labelClass}>
                  Teléfono
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  placeholder="+56 9 1234 5678"
                  className={inputClass}
                  value={fields.telefono}
                  onChange={(e) => updateField("telefono", e.target.value)}
                  aria-invalid={!!errors.telefono}
                  aria-describedby={errors.telefono ? "telefono-error" : undefined}
                />
                {errors.telefono && (
                  <p id="telefono-error" className={errorClass}>
                    {errors.telefono}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={inputClass}
                value={fields.email}
                onChange={(e) => updateField("email", e.target.value)}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className={errorClass}>
                  {errors.email}
                </p>
              )}
            </div>
          </fieldset>

          <fieldset className="space-y-5">
            <legend className="mb-1 font-serif text-lg font-medium text-charcoal">
              Dimensiones y uso
            </legend>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="largo" className={labelClass}>
                  Largo (m)
                </label>
                <input
                  id="largo"
                  name="largo"
                  type="number"
                  min="0"
                  step="0.1"
                  inputMode="decimal"
                  className={inputClass}
                  value={fields.largo}
                  onChange={(e) => updateField("largo", e.target.value)}
                  aria-invalid={!!errors.largo}
                  aria-describedby={errors.largo ? "largo-error" : undefined}
                />
                {errors.largo && (
                  <p id="largo-error" className={errorClass}>
                    {errors.largo}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="ancho" className={labelClass}>
                  Ancho (m)
                </label>
                <input
                  id="ancho"
                  name="ancho"
                  type="number"
                  min="0"
                  step="0.1"
                  inputMode="decimal"
                  className={inputClass}
                  value={fields.ancho}
                  onChange={(e) => updateField("ancho", e.target.value)}
                  aria-invalid={!!errors.ancho}
                  aria-describedby={errors.ancho ? "ancho-error" : undefined}
                />
                {errors.ancho && (
                  <p id="ancho-error" className={errorClass}>
                    {errors.ancho}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="tipoUso" className={labelClass}>
                Tipo de uso
              </label>
              <select
                id="tipoUso"
                name="tipoUso"
                className={inputClass}
                value={fields.tipoUso}
                onChange={(e) => updateField("tipoUso", e.target.value as QuoteFormFields["tipoUso"])}
                aria-invalid={!!errors.tipoUso}
                aria-describedby={errors.tipoUso ? "tipoUso-error" : undefined}
              >
                <option value="">Selecciona una opción</option>
                <option value="Terraza">Terraza</option>
                <option value="Estacionamiento">Estacionamiento</option>
                <option value="Quincho">Quincho</option>
                <option value="Otro">Otro</option>
              </select>
              {errors.tipoUso && (
                <p id="tipoUso-error" className={errorClass}>
                  {errors.tipoUso}
                </p>
              )}
            </div>
          </fieldset>

          <fieldset className="space-y-5">
            <legend className="mb-1 font-serif text-lg font-medium text-charcoal">
              Preferencias de materiales
            </legend>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="estructura" className={labelClass}>
                  Estructura
                </label>
                <select
                  id="estructura"
                  name="estructura"
                  className={inputClass}
                  value={fields.estructura}
                  onChange={(e) => updateField("estructura", e.target.value as QuoteFormFields["estructura"])}
                >
                  <option value="">Sin preferencia</option>
                  <option value="Acero">Acero</option>
                  <option value="Madera">Madera</option>
                  <option value="Mixta">Mixta</option>
                </select>
              </div>
              <div>
                <label htmlFor="cubierta" className={labelClass}>
                  Cubierta
                </label>
                <select
                  id="cubierta"
                  name="cubierta"
                  className={inputClass}
                  value={fields.cubierta}
                  onChange={(e) => updateField("cubierta", e.target.value as QuoteFormFields["cubierta"])}
                >
                  <option value="">Sin preferencia</option>
                  <option value="Transparente">Transparente</option>
                  <option value="Opaca">Opaca</option>
                  <option value="Mixta">Mixta</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="terminaciones" className={labelClass}>
                Terminaciones deseadas
              </label>
              <textarea
                id="terminaciones"
                name="terminaciones"
                rows={3}
                placeholder="Ej: tono nogal, herrajes negro mate, barandas incluidas..."
                className="w-full rounded-sm border border-charcoal/20 bg-cream px-4 py-3 text-[15px] text-charcoal placeholder:text-charcoal-soft/60 focus:border-accent"
                value={fields.terminaciones}
                onChange={(e) => updateField("terminaciones", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="notas" className={labelClass}>
                Notas adicionales
              </label>
              <textarea
                id="notas"
                name="notas"
                rows={2}
                placeholder="Cualquier detalle adicional sobre tu proyecto"
                className="w-full rounded-sm border border-charcoal/20 bg-cream px-4 py-3 text-[15px] text-charcoal placeholder:text-charcoal-soft/60 focus:border-accent"
                value={fields.notas}
                onChange={(e) => updateField("notas", e.target.value)}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-2 font-serif text-lg font-medium text-charcoal">
              Foto del espacio (opcional)
            </legend>
            <div className="flex flex-wrap items-center gap-4">
              <label
                htmlFor="foto"
                className="inline-flex h-11 cursor-pointer items-center justify-center rounded-sm border border-charcoal/20 px-6 text-sm font-semibold text-charcoal transition-colors hover:border-accent hover:text-accent"
              >
                {photo ? "Cambiar foto" : "Subir foto"}
              </label>
              <input
                ref={fileInputRef}
                id="foto"
                name="foto"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="sr-only"
              />
              {photoPreview && (
                <div className="relative h-16 w-16 overflow-hidden rounded-sm border border-charcoal/20">
                  <Image
                    src={photoPreview}
                    alt="Vista previa de la foto del espacio"
                    fill
                    sizes="64px"
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}
              {photo && (
                <button
                  type="button"
                  onClick={removePhoto}
                  className="text-sm font-medium text-charcoal-soft underline underline-offset-2 hover:text-accent"
                >
                  Quitar
                </button>
              )}
            </div>
          </fieldset>

          <div className="flex flex-col items-start gap-4">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex h-13 items-center justify-center rounded-sm bg-accent px-8 text-base font-semibold text-cream transition-colors hover:bg-[#a5431f] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? "Enviando..." : "Enviar solicitud"}
            </button>

            <div role="status" aria-live="polite">
              {status === "success" && (
                <p className="text-sm font-medium text-[#3d7a3d]">
                  ¡Gracias! Recibimos tu solicitud y te contactaremos pronto.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm font-medium text-accent">
                  Ocurrió un error al enviar. Por favor intenta nuevamente.
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
