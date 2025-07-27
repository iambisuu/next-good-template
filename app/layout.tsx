import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nubien - AI-Driven Success",
  description: "Creating latest solutions that redefine innovation. Stay ahead with AI-powered technology for the future.",
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
      </body>
    </html>
  );
}