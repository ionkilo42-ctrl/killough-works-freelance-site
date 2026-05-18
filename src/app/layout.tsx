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
  title: "Killough Works | AI-Powered Systems Builder",
  description:
    "Freelance AI website, automation, lead capture, and MVP build services for creators, local businesses, and modern service brands.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${display.variable}`}>{children}</body>
    </html>
  );
}
