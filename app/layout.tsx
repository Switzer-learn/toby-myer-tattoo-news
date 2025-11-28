import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Commandos18 Tattoo News | Bali Ink Culture",
  description: "Insights on ink, artists, culture, and trends from Bali's tattoo scene. Discover the best artists, studios, and tattoo styles in Bali.",
  keywords: ["Bali Tattoo", "Tattoo News", "Bali Ink", "Tattoo Artists Bali", "Commandos18"],
  openGraph: {
    title: "Commandos18 Tattoo News | Bali Ink Culture",
    description: "Insights on ink, artists, culture, and trends from Bali's tattoo scene.",
    type: "website",
    locale: "en_US",
    siteName: "Commandos18 Tattoo News",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
