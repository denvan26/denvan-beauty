"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/CartContext";
import CartSidebar from "./CartSidebar";

const dealTexts = [
  "Flash Sale Ends Soon!",
  "Free Shipping on Orders $50+",
  "New Users: Code WELCOME15 for 15% Off",
  "Same-Day Delivery Available",
];

const categoryLinks = [
  { label: "ALL", href: "/shop" },
  { label: "Skincare", href: "/shop?category=skincare" },
  { label: "Haircare", href: "/shop?category=haircare" },
  { label: "Makeup", href: "/shop?category=makeup" },
  { label: "Body Care", href: "/shop?category=body-care" },
  { label: "Accessories", href: "/shop?category=accessories" },
  { label: "Watches", href: "/shop?category=watches" },
  { label: "Wigs", href: "/shop?category=wigs" },
  { label: "Shoes", href: "/shop?category=shoes" },
  { label: "Clothes", href: "/shop?category=clothes" },
  { label: "SALE", href: "/shop?sort=price-low" },
];

export default function Header() {
  const { totalItems, isCartOpen, setIsCartOpen } = useCart();
  const [dealIndex, setDealIndex] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setDealIndex((prev) => (prev + 1) % dealTexts.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      {/* Tier 1: Deal text rotation - NOT sticky */}
      <div className="bg-gray-900 text-white text-center text-[10px] sm:text-[11px] py-1 sm:py-1.5 px-3 font-medium tracking-wide">
        <span key={dealIndex} className="animate-fade-in inline-block">
          {dealTexts[dealIndex]}
        </span>
      </div>

      {/* Tier 2 + 3: Sticky header block */}
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        {/* Main bar */}
        <div className="border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
            <div className="flex items-center justify-between h-11 sm:h-12 gap-2 sm:gap-3">
              {/* Logo */}
              <Link href="/" className="flex-shrink-0">
                <span className="text-base sm:text-lg font-bold tracking-tight text-black">
                  DENVAN<span className="text-red-500">.</span>
                </span>
              </Link>

              {/* Desktop search bar */}
              <form
                onSubmit={handleSearch}
                className="hidden sm:flex flex-1 max-w-xl mx-4"
              >
                <div className="relative w-full">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-4 pr-10 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white border border-transparent focus:border-red-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 text-gray-500 hover:text-black"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </form>

              {/* Right actions */}
              <div className="flex items-center gap-0">
                {/* Mobile search icon */}
                <button
                  onClick={() => setSearchOpen(true)}
                  className="sm:hidden p-2.5 text-gray-700 hover:text-black"
                  aria-label="Search"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>

                {/* Cart */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2.5 text-gray-700 hover:text-black"
                  aria-label="Cart"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {totalItems > 0 && (
                    <span className="absolute top-0.5 right-0.5 bg-red-600 text-white text-[9px] font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-0.5">
                      {totalItems}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Category nav - inside sticky header */}
        <div className="border-b border-gray-100 bg-white">
          <div className="max-w-7xl mx-auto px-1 sm:px-4 lg:px-8">
            <div className="flex items-center overflow-x-auto scrollbar-hide -mx-1">
              {categoryLinks.map((cat) => (
                <Link
                  key={cat.label}
                  href={cat.href}
                  className={`flex-shrink-0 px-2.5 sm:px-3 py-2.5 sm:py-2 text-[11px] sm:text-xs font-medium transition-colors whitespace-nowrap active:bg-gray-100 hover:text-red-600 ${
                    cat.label === "SALE" ? "text-red-600 font-bold" : "text-gray-600"
                  }`}
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 bg-white z-[60] sm:hidden">
          <div className="flex items-center gap-2 px-3 py-3 border-b border-gray-200">
            <button
              onClick={() => setSearchOpen(false)}
              className="p-2 text-gray-500"
              aria-label="Close search"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <form onSubmit={handleSearch} className="flex-1">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-3 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none"
              />
            </form>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      <CartSidebar open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
