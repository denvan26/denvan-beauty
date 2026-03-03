"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { categories, reviews } from "@/data/products";

const heroSlides = [
  {
    title: "Your Beauty, Your Rules",
    subtitle: "300+ premium products across skincare, haircare, makeup, watches & wigs — all at prices you'll love",
    cta: "Shop Now",
    link: "/shop",
    bg: "from-pink-100 via-pink-50 to-white",
  },
  {
    title: "New: Women's Watches",
    subtitle: "50 elegant timepieces from $12 — classic, smart, luxury & fashion watches for every occasion",
    cta: "Shop Watches",
    link: "/shop?category=watches",
    bg: "from-amber-100 via-yellow-50 to-white",
  },
  {
    title: "Premium Wigs & Hair",
    subtitle: "Lace fronts, bobs, braided wigs & more — instant style transformations starting at $22",
    cta: "Shop Wigs",
    link: "/shop?category=wigs",
    bg: "from-orange-100 via-rose-50 to-white",
  },
  {
    title: "Same-Day Delivery",
    subtitle: "Order before 2 PM and get your beauty essentials delivered to your door today",
    cta: "Learn More",
    link: "/delivery",
    bg: "from-green-100 via-green-50 to-white",
  },
];

const marqueeItems = [
  "FREE SHIPPING ON ORDERS $50+",
  "SAME-DAY DELIVERY AVAILABLE",
  "NEW: 50 WOMEN'S WATCHES JUST DROPPED",
  "NEW: PREMIUM WIGS COLLECTION",
  "300+ PRODUCTS & COUNTING",
  "CRUELTY-FREE & CLEAN BEAUTY",
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* Marquee Announcement Bar */}
      <div className="bg-black text-white overflow-hidden whitespace-nowrap">
        <div className="animate-marquee inline-flex py-2">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="mx-8 text-xs font-semibold tracking-widest">
              {item} <span className="mx-4 text-pink-400">★</span>
            </span>
          ))}
        </div>
      </div>

      {/* Hero Carousel */}
      <section className="relative overflow-hidden">
        <div
          className={`bg-gradient-to-br ${heroSlides[currentSlide].bg} transition-all duration-700`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
            <div className="max-w-2xl" key={currentSlide}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-8">
                {heroSlides[currentSlide].subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={heroSlides[currentSlide].link}
                  className="inline-flex items-center px-8 py-3.5 bg-black text-white font-semibold rounded-full hover:bg-gray-900 transition-colors text-sm"
                >
                  {heroSlides[currentSlide].cta}
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/shop"
                  className="inline-flex items-center px-8 py-3.5 border-2 border-black text-black font-semibold rounded-full hover:bg-black hover:text-white transition-colors text-sm"
                >
                  Shop All
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === currentSlide ? "bg-black w-8" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-y border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: "M5 13l4 4L19 7", label: "Cruelty-Free" },
              { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", label: "Same-Day Delivery" },
              { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "Secure Payment" },
              { icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", label: "Clean Ingredients" },
            ].map((badge) => (
              <div key={badge.label} className="flex flex-col items-center gap-2">
                <svg className="w-6 h-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={badge.icon} />
                </svg>
                <span className="text-sm font-medium text-gray-700">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Categories Strip */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { label: "All Products", href: "/shop", color: "bg-black text-white" },
              { label: "Skincare", href: "/shop?category=skincare", color: "bg-pink-50 text-pink-700 hover:bg-pink-100" },
              { label: "Haircare", href: "/shop?category=haircare", color: "bg-purple-50 text-purple-700 hover:bg-purple-100" },
              { label: "Makeup", href: "/shop?category=makeup", color: "bg-fuchsia-50 text-fuchsia-700 hover:bg-fuchsia-100" },
              { label: "Body Care", href: "/shop?category=body-care", color: "bg-teal-50 text-teal-700 hover:bg-teal-100" },
              { label: "Accessories", href: "/shop?category=accessories", color: "bg-amber-50 text-amber-700 hover:bg-amber-100" },
              { label: "Watches", href: "/shop?category=watches", color: "bg-yellow-50 text-yellow-700 hover:bg-yellow-100" },
              { label: "Wigs", href: "/shop?category=wigs", color: "bg-rose-50 text-rose-700 hover:bg-rose-100" },
            ].map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${cat.color}`}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Shop by Category</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Find everything you need for your beauty routine
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.slug}`}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-gradient-to-br from-pink-50 to-purple-50"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-lg font-bold">{cat.name}</h3>
                  <p className="text-xs text-white/80 mt-1">{cat.description}</p>
                  <span className="text-xs text-white/60 mt-1 block">{cat.productCount} products</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection Banners */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Watches Banner */}
            <Link
              href="/shop?category=watches"
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-amber-200 via-yellow-100 to-orange-100"
            >
              <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/50 to-transparent">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-widest mb-1">New Collection</span>
                <h3 className="text-2xl font-bold text-white mb-1">Women&apos;s Watches</h3>
                <p className="text-sm text-white/80">50 elegant timepieces from $12</p>
              </div>
              <div className="absolute top-4 right-4 bg-white/90 text-black text-xs font-bold px-3 py-1.5 rounded-full group-hover:bg-pink-500 group-hover:text-white transition-colors">
                Shop Now
              </div>
            </Link>

            {/* Wigs Banner */}
            <Link
              href="/shop?category=wigs"
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-rose-200 via-pink-100 to-orange-100"
            >
              <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/50 to-transparent">
                <span className="text-xs font-bold text-rose-300 uppercase tracking-widest mb-1">Just Dropped</span>
                <h3 className="text-2xl font-bold text-white mb-1">Premium Wigs</h3>
                <p className="text-sm text-white/80">Lace fronts, bobs & braided wigs</p>
              </div>
              <div className="absolute top-4 right-4 bg-white/90 text-black text-xs font-bold px-3 py-1.5 rounded-full group-hover:bg-pink-500 group-hover:text-white transition-colors">
                Shop Now
              </div>
            </Link>

            {/* Trending Banner */}
            <Link
              href="/shop?sort=popular"
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-purple-200 via-pink-100 to-fuchsia-100 md:col-span-2 lg:col-span-1"
            >
              <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/50 to-transparent">
                <span className="text-xs font-bold text-purple-300 uppercase tracking-widest mb-1">Trending Now</span>
                <h3 className="text-2xl font-bold text-white mb-1">Viral Beauty Picks</h3>
                <p className="text-sm text-white/80">TikTok-famous products everyone loves</p>
              </div>
              <div className="absolute top-4 right-4 bg-white/90 text-black text-xs font-bold px-3 py-1.5 rounded-full group-hover:bg-pink-500 group-hover:text-white transition-colors">
                Shop Now
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-black to-gray-800 rounded-3xl overflow-hidden">
            <div className="px-8 sm:px-12 py-12 sm:py-16 text-white text-center sm:text-left">
              <div className="max-w-2xl mx-auto sm:mx-0">
                <span className="inline-block bg-pink-500 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
                  Limited Time
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Same-Day Delivery Now Available
                </h2>
                <p className="text-gray-300 mb-8 max-w-lg">
                  Order before 2 PM and get your beauty essentials delivered right to your door today. Available in select areas.
                </p>
                <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                  <Link
                    href="/shop"
                    className="px-8 py-3.5 bg-pink-500 text-white font-semibold rounded-full hover:bg-pink-600 transition-colors text-sm"
                  >
                    Shop Now
                  </Link>
                  <Link
                    href="/delivery"
                    className="px-8 py-3.5 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition-colors text-sm"
                  >
                    Delivery Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Denvan */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Why Choose Denvan Beauty</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              We&apos;re on a mission to make premium beauty accessible to everyone
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Affordable Prices",
                desc: "Premium quality beauty starting at just $5. No markups, no middlemen.",
              },
              {
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                title: "Clean & Cruelty-Free",
                desc: "Ingredients you can trust. Never tested on animals. Beauty with a conscience.",
              },
              {
                icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Same-Day Delivery",
                desc: "Order by 2 PM for same-day delivery via DoorDash in select areas.",
              },
              {
                icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064",
                title: "Inclusive Beauty",
                desc: "Products for all skin tones, hair types, and textures. Everyone belongs here.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors">
                <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="py-16 bg-gradient-to-r from-pink-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "300+", label: "Products" },
              { num: "15K+", label: "Happy Customers" },
              { num: "4.8", label: "Avg Rating" },
              { num: "2-4hr", label: "Same-Day Delivery" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                  {stat.num}
                </div>
                <div className="text-sm text-gray-500 mt-2 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Strip */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Loved by Thousands</h2>
            <p className="text-gray-500">Real reviews from real beauty lovers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((review) => (
              <div
                key={review.id}
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? "text-yellow-400" : "text-gray-200"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  {review.verified && (
                    <span className="ml-2 text-xs text-green-600 font-medium flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Verified
                    </span>
                  )}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  &ldquo;{review.comment}&rdquo;
                </p>
                <span className="text-sm font-semibold text-gray-900">{review.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Follow Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Follow @denvanbeauty</h2>
          <p className="text-gray-500 mb-8 max-w-lg mx-auto">
            Join our community for beauty tips, new drops, and exclusive deals
          </p>
          <div className="flex justify-center gap-6">
            {[
              { name: "Instagram", icon: "M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4zm-4 11a3 3 0 110-6 3 3 0 010 6zm3.5-6.5a1 1 0 110-2 1 1 0 010 2z" },
              { name: "TikTok", icon: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9a6.33 6.33 0 00-.79-.05A6.34 6.34 0 003 15.29a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.95a8.27 8.27 0 004.91 1.62V7.12a4.83 4.83 0 01-1-.43z" },
              { name: "Twitter", icon: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
            ].map((social) => (
              <div
                key={social.name}
                className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer"
              >
                <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d={social.icon} />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-pink-500 to-purple-500 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Glow?
          </h2>
          <p className="text-pink-100 text-lg mb-8 max-w-xl mx-auto">
            Discover 300+ affordable, cruelty-free beauty products that actually work. Free shipping on orders over $50.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-colors text-sm"
            >
              Shop All Products
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center px-10 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-black transition-colors text-sm"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
