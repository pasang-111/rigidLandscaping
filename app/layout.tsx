import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GrainOverlay from "@/components/ui/GrainOverlay";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://rigidlandscaping.com"),
  title: {
    default: "Rigid Landscaping — Landscapes Engineered to Last",
    template: "%s — Rigid Landscaping",
  },
  description:
    "Experts in landscaping across Sydney. Creative design, precision construction, and lasting maintenance. Transforming outdoor spaces into dream landscapes.",
  openGraph: {
    title: "Rigid Landscaping",
    description: "Landscapes engineered to last. Sydney design, construction & maintenance.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#16302A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${cormorant.variable} ${inter.variable}`}
    >
      <head>
        <link rel="preload" href="/hero-1.webp" as="image" type="image/webp" fetchPriority="high" />
        <link rel="preload" href="/hero-2.webp" as="image" type="image/webp" />
      </head>
      <body className="bg-cream font-sans text-forest-deep antialiased">

        <Navbar />
        <main>{children}</main>
        <Footer />
        <GrainOverlay />
      </body>
    </html>
  );
}
