import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bussresa.ai - Jämför bussresor till Alperna",
  description:
    "Hitta och jämför bussresor till Alperna från hela Sverige. Sök efter avgångsort, destination, vecka och pris.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
