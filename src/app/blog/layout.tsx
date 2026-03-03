import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beauty Tips & Guides | Denvan Beauty",
  description:
    "Expert skincare routines, makeup tutorials, haircare tips, and seasonal product guides from the Denvan Beauty team.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
