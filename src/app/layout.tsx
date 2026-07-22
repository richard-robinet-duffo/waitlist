import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

const geist = GeistSans;

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Gini | Women's health should not take years to understand",
  description:
    "Gini is the comprehensive layer for women's health. Cycle-aware bloodwork, connected biomarkers, and one living picture of your hormones, energy, and longevity.",
  icons: {
    icon: "/ginitabicon.png?v=3",
    apple: "/ginitabicon.png?v=3",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} ${cormorant.variable}`}>
      <body className="bg-gini-surface font-sans antialiased text-neutral-950">
        {children}
      </body>
    </html>
  );
}
