import type { Metadata, Viewport } from "next";
import { Fraunces, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "600", "700"],
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://marble-does-not-yield.vercel.app"),
  title: "The Marble Does Not Yield",
  description: "A story of pain, vulnerability, and the refusal to yield.",
  openGraph: {
    title: "The Marble Does Not Yield",
    description: "A story of pain, vulnerability, and the refusal to yield.",
    type: "article",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Marble Does Not Yield",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Marble Does Not Yield",
    description: "A story of pain, vulnerability, and the refusal to yield.",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://marble-does-not-yield.vercel.app",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${sourceSerif.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="overflow-x-hidden">{children}</body>
    </html>
  );
}
