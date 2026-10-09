import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alquileres · San Juan",
  description: "Gestión de alquileres y contratos para inmobiliarias y administradores de San Juan",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR">
      <body>{children}</body>
    </html>
  );
}
