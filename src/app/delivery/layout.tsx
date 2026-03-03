import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delivery Options | Denvan Beauty",
  description:
    "Same-day delivery, express, and standard shipping options. Powered by DoorDash in select areas. Free shipping on orders over $50.",
};

export default function DeliveryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
