import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://huddlesurety.co"),
  title: {
    default: "Huddle | AI-Powered Surety Bond Solutions",
    template: "%s | Huddle",
  },
  description:
    "Huddle streamlines the entire surety bond request-to-execution journey, freeing brokers to focus on high-value advisory and client relationships.",
  keywords: [
    "surety bonds",
    "bond automation",
    "insurance technology",
    "construction bonds",
    "bid bonds",
    "performance bonds",
    "AI for insurance",
  ],
  openGraph: {
    type: "website",
    title: "Huddle | AI-Powered Surety Bond Solutions",
    description:
      "Move beyond antiquated systems. Modern AI and seamless collaboration for the world of surety.",
    siteName: "Huddle",
  },
  twitter: {
    card: "summary_large_image",
    title: "Huddle | AI-Powered Surety Bond Solutions",
    description:
      "Move beyond antiquated systems. Modern AI and seamless collaboration for the world of surety.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "https://brand.huddlesurety.co/logo/md-light.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
