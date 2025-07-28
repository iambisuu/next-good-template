import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: "Intellirite - AI-Powered Research Platform",
  description: "Generate complete, human-quality research papers section-by-section with AI-powered tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/SF-Pro.ttf" as="font" type="font/truetype" crossOrigin="anonymous" />
      </head>
      <body style={{ fontFamily: "'SF Pro Display', system-ui, sans-serif" }}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}