import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All Products | Denvan Beauty",
  description:
    "Browse our full collection of skincare, haircare, makeup, body care, and accessories. Filter by category, price, and popularity.",
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
