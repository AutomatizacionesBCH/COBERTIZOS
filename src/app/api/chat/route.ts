import { NextRequest, NextResponse } from "next/server";

interface ChatAnswers {
  tipoUso: string | null;
  medidas: string;
  cubierta: string | null;
  fechaInicio: string;
}

export async function POST(req: NextRequest) {
  const answers = (await req.json()) as ChatAnswers;

  // TODO: Conectar con un servicio de email (ej. Resend, SendGrid) o un CRM
  // real para recibir estos leads calificados. Por ahora solo se registra en
  // el log del servidor.
  console.log("[chat] Lead calificado desde el chatbot:", answers);

  return NextResponse.json({ ok: true });
}
