import type { Metadata } from "next";
import { Newsreader, Work_Sans } from "next/font/google";
import "./globals.css";
import { QuotePrefillProvider } from "@/context/QuotePrefillContext";
import Chatbot from "@/components/Chatbot";
import WhatsAppButton from "@/components/WhatsAppButton";
import { siteConfig } from "@/lib/site-config";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["500"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-work-sans",
  display: "swap",
});

const siteUrl = "https://cobertizosalba.cl";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${siteConfig.businessName} | Cobertizos a medida en acero y madera`,
  description:
    "Diseñamos y construimos cobertizos a medida para terrazas, estacionamientos y quinchos, con precisión técnica y estética arquitectónica. Cotiza tu proyecto sin costo.",
  openGraph: {
    title: `${siteConfig.businessName} | Cobertizos a medida en acero y madera`,
    description:
      "Diseñamos y construimos cobertizos a medida para terrazas, estacionamientos y quinchos, con precisión técnica y estética arquitectónica.",
    url: siteUrl,
    siteName: siteConfig.businessName,
    locale: "es_CL",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${newsreader.variable} ${workSans.variable} antialiased`}
      >
        <QuotePrefillProvider>
          {children}
          <Chatbot />
          <WhatsAppButton />
        </QuotePrefillProvider>
      </body>
    </html>
  );
}
