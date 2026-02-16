import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bussresa.ai - Boka din skidresa",
  description:
    "Vi samlar Sveriges populäraste skidbussar på ett och samma ställe. Boka tryggt, enkelt och hållbart.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className="light">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background-light dark:bg-background-dark font-display text-slate-800 dark:text-slate-200 antialiased">
        {children}
      </body>
    </html>
  );
}
