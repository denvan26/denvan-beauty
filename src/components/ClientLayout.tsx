"use client";

import { CartProvider } from "@/lib/CartContext";
import Header from "./Header";
import Footer from "./Footer";
import BottomNav from "./BottomNav";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Header />
      <main className="min-h-screen pb-14 lg:pb-0">{children}</main>
      <Footer />
      <BottomNav />
    </CartProvider>
  );
}
