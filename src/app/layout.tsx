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
  title: "Killough Works | Build. Explore. Collaborate.",
  description:
    "Jonathan Killough's portfolio — Feltabout, interactive prototypes, and design studies. Seeking product, AI, software, and workflow-focused opportunities.",
  icons: {
    icon: [{ url: "/brand/killough-works-mark.png", type: "image/png", sizes: "512x512" }],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${display.variable}`}>{children}</body>
    </html>
  );
}
