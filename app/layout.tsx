import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kalpa — Their story. Your choices.",
  description: "Interactive stories where your choices are remembered. Season 1: Meera.",
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "Kalpa — Meera",
    description: "Twenty-one days to her wedding. One message just changed everything.",
    type: "website"
  }
};

export const viewport: Viewport = {
  themeColor: "#181126",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
