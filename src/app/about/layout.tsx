import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Denvan Beauty",
  description:
    "Learn about Denvan Beauty's mission to make premium, cruelty-free beauty products accessible to everyone with same-day delivery.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
