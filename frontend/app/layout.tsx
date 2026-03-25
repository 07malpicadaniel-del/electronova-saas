import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Inyectamos la fuente Inter (súper limpia y corporativa)
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ElectroNova Analytics | LAE Dashboard",
  description: "Panel estratégico de análisis de ventas e inventario impulsado por IA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}