export type TipoUso = "Terraza" | "Estacionamiento" | "Quincho" | "Otro";
export type TipoEstructura = "Acero" | "Madera" | "Mixta";
export type TipoCubierta = "Transparente" | "Opaca" | "Mixta";

export interface QuoteFormFields {
  nombre: string;
  telefono: string;
  email: string;
  largo: string;
  ancho: string;
  tipoUso: TipoUso | "";
  estructura: TipoEstructura | "";
  cubierta: TipoCubierta | "";
  terminaciones: string;
  notas: string;
}

export const emptyQuoteForm: QuoteFormFields = {
  nombre: "",
  telefono: "",
  email: "",
  largo: "",
  ancho: "",
  tipoUso: "",
  estructura: "",
  cubierta: "",
  terminaciones: "",
  notas: "",
};
