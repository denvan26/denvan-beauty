import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | Denvan Beauty",
  description: "Complete your order securely at Denvan Beauty. Multiple payment options available.",
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
