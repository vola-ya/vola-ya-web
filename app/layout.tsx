import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vola Ya — Alertas de vuelos baratos para Sudamérica",
  description:
    "Recibí en tu email las mejores ofertas de vuelos desde y hacia Sudamérica. Gratis para siempre, sin spam.",
  openGraph: {
    title: "Vola Ya — Alertas de vuelos baratos",
    description:
      "Las mejores ofertas de vuelos de Sudamérica, directo a tu bandeja de entrada.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${plusJakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[#111111]">
        {children}
      </body>
    </html>
  );
}
