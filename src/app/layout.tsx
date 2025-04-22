import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://vertical-performance-development.vercel.app'),
  title: "VDP - Vertical Development Program",
  description: "Elevate your vertical jump with personalized week-to-week training plans tailored to your specific needs and goals.",
  openGraph: {
    title: "Vertical Development Program",
    description: "Transform your vertical jump with personalized training plans.",
    url: "https://vertical-performance-development.vercel.app/",
    siteName: "VDP Training",
    images: [
      {
        url: "/images/VDP transparent.png", // Updated to match the logo being used in the site
        width: 1200,
        height: 630,
        alt: "VDP - Enhance Your Vertical Jump",
      },
    ],
    locale: "en_US",
    type: "website",
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
        <Analytics />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
