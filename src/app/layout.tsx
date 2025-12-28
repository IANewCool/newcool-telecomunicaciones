import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Telecomunicaciones Chile - SUBTEL | NewCooltura Informada",
  description: "Oficinas SUBTEL, operadores, calculadora de costo por GB y reclamos",
  keywords: ["telecomunicaciones", "SUBTEL", "operadores moviles", "internet Chile", "reclamos telecom"],
  openGraph: {
    title: "Telecomunicaciones Chile - NewCooltura Informada",
    description: "SUBTEL, operadores y reclamos",
    type: "website",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
