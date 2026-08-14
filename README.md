# Cobertizos Alba — Sitio web

Landing page de marketing para un negocio de cobertizos a medida (acero +
madera), con cotizador y chatbot de calificación de clientes.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Salida `standalone` para Docker

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Datos del negocio

Edita [src/lib/site-config.ts](src/lib/site-config.ts) para cambiar el
nombre del negocio, teléfono, WhatsApp, dirección y horario.

## API routes

- `POST /api/quote` — recibe el formulario de cotización (incluye foto
  opcional). Actualmente solo registra la solicitud en el log del servidor;
  ver TODO en [src/app/api/quote/route.ts](src/app/api/quote/route.ts) para
  conectar a email/CRM.
- `POST /api/chat` — recibe las respuestas del chatbot de calificación. Ver
  TODO en [src/app/api/chat/route.ts](src/app/api/chat/route.ts).

## Build y Docker

```bash
npm run build
docker build -t cobertizos-alba .
docker run -p 3000:3000 cobertizos-alba
```

El contenedor escucha en `0.0.0.0:3000` y respeta la variable `PORT` si se
define. Listo para desplegar en EasyPanel vía build automático desde GitHub;
el dominio se apunta desde Hostinger hacia el servidor de EasyPanel.
