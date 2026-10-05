import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ExitLinkProvider } from "@/components/ExitLink";
import SplashScreen from "@/components/SplashScreen";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ê-Sistemas — Software, integrações e produtos digitais",
  description:
    "Desenvolvemos software sob medida, integrações, automações e produtos digitais para conectar processos e resolver desafios reais de operação.",
  openGraph: {
    title: "Ê-Sistemas — Software, integrações e produtos digitais",
    description:
      "Tecnologia sob medida e produtos próprios para conectar pessoas, dados e processos.",
    type: "website",
    locale: "pt_BR",
  },
  icons: [{ url: "/logo-esistemas.webp", type: "image/webp" }],
};

export const viewport: Viewport = {
  themeColor: "#f6f8f5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body>
        <ExitLinkProvider>{children}</ExitLinkProvider>
        <SplashScreen />
      </body>
    </html>
  );
}
