import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Denvan Beauty | Premium Skincare, Haircare & Makeup",
  description:
    "Shop affordable, cruelty-free beauty products at Denvan Beauty. Skincare, haircare, makeup, body care & accessories with same-day delivery available.",
  keywords:
    "beauty, skincare, haircare, makeup, body care, accessories, cruelty-free, affordable, same-day delivery",
  openGraph: {
    title: "Denvan Beauty | Premium Skincare, Haircare & Makeup",
    description:
      "Shop affordable, cruelty-free beauty products with same-day delivery.",
    type: "website",
    locale: "en_US",
    siteName: "Denvan Beauty",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-white text-gray-900`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
