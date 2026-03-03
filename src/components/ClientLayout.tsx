"use client";

import { CartProvider } from "@/lib/CartContext";
import { WishlistProvider } from "@/lib/WishlistContext";
import Header from "./Header";
import Footer from "./Footer";
import BottomNav from "./BottomNav";
import PromoPopup from "./PromoPopup";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>
        <Header />
        <main className="min-h-screen pb-14 lg:pb-0">{children}</main>
        <Footer />
        <BottomNav />
        <PromoPopup />
      </WishlistProvider>
    </CartProvider>
  );
}
