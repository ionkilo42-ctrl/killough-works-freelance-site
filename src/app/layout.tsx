import type { Metadata } from "next";
import { Instrument_Sans, Space_Grotesk } from "next/font/google";

import "./globals.css";

const sans = Instrument_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Killough Works | Small Useful Builds for Messy Business Problems",
  description:
    "Small coded tools, offer visuals, lead flows, and starter builds for local businesses, creators, and service owners.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${display.variable}`}>{children}</body>
    </html>
  );
}
