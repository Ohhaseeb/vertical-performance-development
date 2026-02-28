import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
        url: "/images/vdp trans.png",
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
        className={`${barlow.variable} ${barlowCondensed.variable} antialiased`}
      >
        {children}
        <Analytics />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
