import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Denvan Beauty",
  description:
    "Get in touch with Denvan Beauty. Questions about orders, products, or partnerships? We're here to help.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
