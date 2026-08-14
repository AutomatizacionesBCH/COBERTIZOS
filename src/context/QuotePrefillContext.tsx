"use client";

import { createContext, useContext, useState, useCallback } from "react";

export type UsoCobertizo = "Terraza" | "Estacionamiento" | "Quincho" | "Otro";
export type TipoCubierta = "Transparente" | "Opaca" | "Mixta";

export interface QuotePrefill {
  tipoUso?: UsoCobertizo;
  medidas?: string;
  cubierta?: TipoCubierta;
  fechaInicio?: string;
}

interface QuotePrefillContextValue {
  prefill: QuotePrefill | null;
  setPrefill: (data: QuotePrefill) => void;
  clearPrefill: () => void;
}

const QuotePrefillContext = createContext<QuotePrefillContextValue | null>(
  null
);

export function QuotePrefillProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [prefill, setPrefillState] = useState<QuotePrefill | null>(null);

  const setPrefill = useCallback((data: QuotePrefill) => {
    setPrefillState(data);
  }, []);

  const clearPrefill = useCallback(() => {
    setPrefillState(null);
  }, []);

  return (
    <QuotePrefillContext.Provider value={{ prefill, setPrefill, clearPrefill }}>
      {children}
    </QuotePrefillContext.Provider>
  );
}

export function useQuotePrefill() {
  const ctx = useContext(QuotePrefillContext);
  if (!ctx) {
    throw new Error("useQuotePrefill must be used within QuotePrefillProvider");
  }
  return ctx;
}
