import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart | Denvan Beauty",
  description: "Review your cart and proceed to checkout at Denvan Beauty.",
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
