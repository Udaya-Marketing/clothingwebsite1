import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hanken_Grotesk, Instrument_Serif } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { absoluteUrl } from "@/lib/seo";
import "./globals.css";

const SmoothScroll = dynamic(() =>
  import("@/components/layout/smooth-scroll").then((module) => module.SmoothScroll),
);

const displayFont = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

const bodyFont = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://sereinstudio.com"),
  title: {
    default: "Serein Studio — Considered clothing for everyday",
    template: "%s — Serein Studio",
  },
  description:
    "Serein Studio makes thoughtful, enduring clothing in natural textures and quiet tones. Discover a considered wardrobe designed to feel like your own every day.",
  alternates: {
    canonical: absoluteUrl("/"),
    languages: {
      "en-US": absoluteUrl("/"),
      "x-default": absoluteUrl("/"),
    },
  },
  openGraph: {
    type: "website",
    siteName: "Serein Studio",
    title: "Serein Studio — Considered clothing for everyday",
    description:
      "Serein Studio makes thoughtful, enduring clothing in natural textures and quiet tones. Discover a considered wardrobe designed to feel like your own every day.",
    url: absoluteUrl("/"),
    images: [{ url: absoluteUrl("/opengraph-image"), width: 1200, height: 630, alt: "Serein Studio — thoughtful clothes for the everyday" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Serein Studio — Considered clothing for everyday",
    description:
      "Serein Studio makes thoughtful, enduring clothing in natural textures and quiet tones. Discover a considered wardrobe designed to feel like your own every day.",
    images: [absoluteUrl("/opengraph-image")],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <SmoothScroll />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
