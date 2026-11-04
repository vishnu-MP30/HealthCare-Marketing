import type { Metadata } from "next";
import { Archivo, Bodoni_Moda, DM_Sans, JetBrains_Mono, Syne, Figtree, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/hero/SmoothScrollProvider";

const plusJakarta = Plus_Jakarta_Sans({
  weight: ["600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const figtree = Figtree({
  weight: ["400", "600", "800"],
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-grotesque",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-hud",
  display: "swap",
});

const bodoniModa = Bodoni_Moda({
  weight: ["400", "600", "700", "900"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const syne = Syne({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LifeCare Hospital | Advanced Specialist Care & Emergency Medicine",
  description:
    "Care that puts people first, every step of the way. LifeCare brings expert doctors, modern technology and a calm, welcoming environment together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${figtree.variable} ${archivo.variable} ${jetbrainsMono.variable} ${syne.variable} ${dmSans.variable} ${bodoniModa.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-arch-grid text-[#000000]">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
