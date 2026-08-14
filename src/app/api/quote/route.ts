import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const quote = {
    nombre: formData.get("nombre")?.toString() ?? "",
    telefono: formData.get("telefono")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    largo: formData.get("largo")?.toString() ?? "",
    ancho: formData.get("ancho")?.toString() ?? "",
    tipoUso: formData.get("tipoUso")?.toString() ?? "",
    estructura: formData.get("estructura")?.toString() ?? "",
    cubierta: formData.get("cubierta")?.toString() ?? "",
    terminaciones: formData.get("terminaciones")?.toString() ?? "",
    notas: formData.get("notas")?.toString() ?? "",
  };

  if (!quote.nombre || !quote.telefono || !quote.email || !quote.tipoUso) {
    return NextResponse.json(
      { ok: false, error: "Faltan campos requeridos." },
      { status: 400 }
    );
  }

  const foto = formData.get("foto");
  const fotoInfo =
    foto instanceof File && foto.size > 0
      ? { nombre: foto.name, tipo: foto.type, tamanoBytes: foto.size }
      : null;

  // TODO: Conectar con un servicio de email (ej. Resend, SendGrid) o un CRM
  // real para recibir estas solicitudes. Por ahora solo se registra en el
  // log del servidor.
  console.log("[quote] Nueva solicitud de cotización:", { ...quote, foto: fotoInfo });

  return NextResponse.json({ ok: true });
}
