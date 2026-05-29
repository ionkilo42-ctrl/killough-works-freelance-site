import type { Metadata } from "next";
import { Cormorant_Garamond, Instrument_Sans } from "next/font/google";

import "./globals.css";
import "./mobile-signal.css";

const sans = Instrument_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Killough Works | Small coded tools for messy business moments",
  description:
    "Killough Works builds small practical web fixes, intake flows, and lightweight tools for messy business moments.",
  icons: {
    icon: [
      { url: "/icon", type: "image/png", sizes: "512x512" },
      { url: "/favicon.ico", type: "image/svg+xml", sizes: "64x64" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${display.variable}`}>{children}</body>
    </html>
  );
}
