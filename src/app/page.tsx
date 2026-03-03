"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import RecentlyViewed from "@/components/RecentlyViewed";

const heroSlides = [
  {
    title: "New Season Drops",
    cta: "Shop Now",
    link: "/shop",
    bg: "bg-gradient-to-r from-red-600 to-red-500",
  },
  {
    title: "Watches from $12",
    cta: "Shop Watches",
    link: "/shop?category=watches",
    bg: "bg-gradient-to-r from-amber-600 to-orange-500",
  },
  {
    title: "Premium Wigs",
    cta: "Shop Wigs",
    link: "/shop?category=wigs",
    bg: "bg-gradient-to-r from-rose-600 to-pink-500",
  },
  {
    title: "Same-Day Delivery",
    cta: "Learn More",
    link: "/delivery",
    bg: "bg-gradient-to-r from-emerald-600 to-green-500",
  },
];

const categoryIcons = [
  { label: "Skincare", slug: "skincare", emoji: "🧴" },
  { label: "Haircare", slug: "haircare", emoji: "💇" },
  { label: "Makeup", slug: "makeup", emoji: "💄" },
  { label: "Body Care", slug: "body-care", emoji: "🧖" },
  { label: "Accessories", slug: "accessories", emoji: "💎" },
  { label: "Watches", slug: "watches", emoji: "⌚" },
  { label: "Wigs", slug: "wigs", emoji: "👩" },
  { label: "Shoes", slug: "shoes", emoji: "👠" },
  { label: "Clothes", slug: "clothes", emoji: "👗" },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [countdown, setCountdown] = useState({ hours: 5, minutes: 42, seconds: 18 });
  const flashScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dealProducts = products.filter((p) => p.originalPrice).slice(0, 10);
  const newProducts = products.filter((p) => p.isNew).slice(0, 10);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 10);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div>
      {/* 1. Coupon Banner */}
      <div className="bg-red-600 text-white text-center text-[10px] sm:text-xs md:text-sm py-1.5 sm:py-2 px-3 font-bold tracking-wide">
        NEW USER? Get 15% Off | Code: <span className="underline">WELCOME15</span>
      </div>

      {/* 2. Hero Carousel - shorter */}
      <section className="relative overflow-hidden">
        <Link href={heroSlides[currentSlide].link}>
          <div className={`${heroSlides[currentSlide].bg} transition-all duration-500`}>
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-14">
              <div key={currentSlide} className="animate-fade-in">
                <h1 className="text-xl sm:text-3xl lg:text-5xl font-bold text-white leading-tight mb-2 sm:mb-3">
                  {heroSlides[currentSlide].title}
                </h1>
                <span className="inline-block px-4 sm:px-6 py-1.5 sm:py-2 bg-white text-black font-bold text-xs sm:text-sm hover:bg-gray-100 transition-colors">
                  {heroSlides[currentSlide].cta}
                </span>
              </div>
            </div>
          </div>
        </Link>
        <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
                i === currentSlide ? "bg-white w-4 sm:w-5" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 3. Circular category icons */}
      <section className="py-3 sm:py-4 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="flex items-center gap-4 sm:gap-5 overflow-x-auto scrollbar-hide pb-1 px-1">
            {categoryIcons.map((cat) => (
              <Link
                key={cat.slug}
                href={`/shop?category=${cat.slug}`}
                className="flex flex-col items-center gap-1 flex-shrink-0 active:opacity-70"
              >
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gray-100 flex items-center justify-center text-xl sm:text-2xl hover:bg-red-50 active:bg-red-100 transition-colors" style={{ width: '52px', height: '52px' }}>
                  {cat.emoji}
                </div>
                <span className="text-[10px] sm:text-[11px] text-gray-600 font-medium whitespace-nowrap">{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Flash Deals */}
      <section className="py-3 sm:py-4 bg-white">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <h2 className="text-sm sm:text-base lg:text-lg font-bold">Flash Sale</h2>
              <div className="flex items-center gap-0.5 sm:gap-1 animate-countdown-pulse">
                <span className="bg-black text-white text-[10px] sm:text-xs font-mono font-bold px-1 sm:px-1.5 py-0.5">{pad(countdown.hours)}</span>
                <span className="text-[10px] sm:text-xs font-bold">:</span>
                <span className="bg-black text-white text-[10px] sm:text-xs font-mono font-bold px-1 sm:px-1.5 py-0.5">{pad(countdown.minutes)}</span>
                <span className="text-[10px] sm:text-xs font-bold">:</span>
                <span className="bg-black text-white text-[10px] sm:text-xs font-mono font-bold px-1 sm:px-1.5 py-0.5">{pad(countdown.seconds)}</span>
              </div>
            </div>
            <Link href="/shop?sort=price-low" className="text-[10px] sm:text-xs text-red-600 font-semibold hover:underline">
              View All &gt;
            </Link>
          </div>
          <div
            ref={flashScrollRef}
            className="flex gap-1.5 sm:gap-2 overflow-x-auto scrollbar-hide pb-2"
          >
            {dealProducts.map((product) => {
              const claimed = Math.floor(Math.random() * 60) + 30;
              return (
                <div key={product.id} className="flex-shrink-0 w-32 sm:w-36 md:w-40">
                  <ProductCard product={product} />
                  <div className="px-1.5 sm:px-2 pb-1.5 sm:pb-2">
                    <div className="w-full bg-red-100 rounded-full h-1 sm:h-1.5 mt-0.5 sm:mt-1">
                      <div
                        className="bg-red-600 h-1 sm:h-1.5 rounded-full"
                        style={{ width: `${claimed}%` }}
                      />
                    </div>
                    <p className="text-[8px] sm:text-[9px] text-red-600 mt-0.5">{claimed}% claimed</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. New Arrivals Grid */}
      <section className="py-3 sm:py-4 bg-gray-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <h2 className="text-sm sm:text-base lg:text-lg font-bold">New In</h2>
            <Link href="/shop?sort=newest" className="text-[10px] sm:text-xs text-red-600 font-semibold hover:underline">
              View All &gt;
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0.5 sm:gap-1 md:gap-2">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Category Banners */}
      <section className="py-3 sm:py-4 bg-white">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            <Link
              href="/shop?category=watches"
              className="relative aspect-[2/1] bg-gradient-to-r from-amber-500 to-orange-400 overflow-hidden"
            >
              <div className="absolute inset-0 flex flex-col justify-center p-3 sm:p-4">
                <span className="text-white text-[8px] sm:text-[10px] font-bold uppercase tracking-wider">New Collection</span>
                <h3 className="text-white text-sm sm:text-lg lg:text-xl font-bold">Watches</h3>
                <span className="text-white/80 text-[10px] sm:text-xs">From $12</span>
              </div>
            </Link>
            <Link
              href="/shop?category=wigs"
              className="relative aspect-[2/1] bg-gradient-to-r from-rose-500 to-pink-400 overflow-hidden"
            >
              <div className="absolute inset-0 flex flex-col justify-center p-3 sm:p-4">
                <span className="text-white text-[8px] sm:text-[10px] font-bold uppercase tracking-wider">Just Dropped</span>
                <h3 className="text-white text-sm sm:text-lg lg:text-xl font-bold">Wigs</h3>
                <span className="text-white/80 text-[10px] sm:text-xs">Premium quality</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Best Sellers Grid */}
      <section className="py-3 sm:py-4 bg-gray-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <h2 className="text-sm sm:text-base lg:text-lg font-bold">Best Sellers</h2>
            <Link href="/shop?sort=popular" className="text-[10px] sm:text-xs text-red-600 font-semibold hover:underline">
              View All &gt;
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0.5 sm:gap-1 md:gap-2">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Recently Viewed */}
      <section className="py-3 sm:py-4 bg-white">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <RecentlyViewed />
        </div>
      </section>

      {/* 8. Bottom Promo Strip */}
      <section className="bg-white border-t border-gray-100 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {[
              { icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", label: "Free Shipping $50+" },
              { icon: "M13 10V3L4 14h7v7l9-11h-7z", label: "Same-Day Delivery" },
              { icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15", label: "Easy Returns" },
              { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", label: "Secure Payment" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5 sm:gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                <span className="text-[10px] sm:text-xs text-gray-600 font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
