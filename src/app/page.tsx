"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { categories, reviews, getBestSellers, getNewArrivals } from "@/data/products";

const heroSlides = [
  {
    title: "Glow Up Your Skincare Routine",
    subtitle: "Premium serums, cleansers & moisturizers starting at $5",
    cta: "Shop Skincare",
    link: "/shop?category=skincare",
    bg: "from-pink-100 via-pink-50 to-white",
  },
  {
    title: "Healthy Hair Starts Here",
    subtitle: "Growth oils, edge control & protective styling essentials",
    cta: "Shop Haircare",
    link: "/shop?category=haircare",
    bg: "from-purple-100 via-purple-50 to-white",
  },
  {
    title: "Same-Day Delivery Available",
    subtitle: "Get your beauty essentials delivered to your door today",
    cta: "Learn More",
    link: "/delivery",
    bg: "from-green-100 via-green-50 to-white",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const bestSellers = getBestSellers();
  const newArrivals = getNewArrivals();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* Hero Carousel */}
      <section className="relative overflow-hidden">
        <div
          className={`bg-gradient-to-br ${heroSlides[currentSlide].bg} transition-all duration-700`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
            <div className="max-w-2xl animate-fade-in" key={currentSlide}>
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

      {/* Categories */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Shop by Category</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Find everything you need for your beauty routine
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
                  sizes="(max-width: 640px) 50vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-lg font-bold">{cat.name}</h3>
                  <p className="text-xs text-white/80 mt-1">{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold">Best Sellers</h2>
              <p className="text-gray-500 mt-2">Our most loved products</p>
            </div>
            <Link
              href="/shop?sort=popular"
              className="text-sm font-semibold text-pink-500 hover:text-pink-600 flex items-center gap-1"
            >
              View All
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {bestSellers.slice(0, 10).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
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

      {/* New Arrivals */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold">New Arrivals</h2>
              <p className="text-gray-500 mt-2">Just dropped — fresh additions to our collection</p>
            </div>
            <Link
              href="/shop?sort=newest"
              className="text-sm font-semibold text-pink-500 hover:text-pink-600 flex items-center gap-1"
            >
              View All
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">What Our Customers Say</h2>
            <p className="text-gray-500">Real reviews from real beauty lovers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, 6).map((review) => (
              <div
                key={review.id}
                className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow"
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
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-900">
                    {review.name}
                  </span>
                  <span className="text-xs text-gray-400">{review.date}</span>
                </div>
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
            Discover affordable, cruelty-free beauty products that actually work. Free shipping on orders over $50.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-colors text-sm"
          >
            Shop Now
            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
