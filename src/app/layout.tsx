import type { Metadata } from "next";
import "./globals.css";

// Font loading note:
// We load fonts via <link> here to mirror the prototype exactly and to
// avoid build-time issues if the exact font names aren't in next/font/google.
// Once the fonts are confirmed working, you can migrate to next/font for
// better performance (eliminates the runtime request, removes CLS).
// See README.md for the upgrade snippet.

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Asta+Sans:wght@100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
