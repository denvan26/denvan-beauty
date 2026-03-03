import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Policies & FAQ | Denvan Beauty",
  description:
    "Shipping, returns, refunds, and payment policies for Denvan Beauty. Everything you need to know about shopping with us.",
};

export default function PoliciesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
