"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-gray-950 text-white">
      {/* Newsletter */}
      <div className="bg-red-600">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-10 text-center">
          <h3 className="text-lg sm:text-2xl font-bold mb-1.5 sm:mb-2">
            Get 15% Off Your First Order
          </h3>
          <p className="text-red-100 mb-4 sm:mb-6 max-w-md mx-auto text-xs sm:text-sm">
            Subscribe for exclusive deals, beauty tips, and new product launches.
          </p>
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-2 sm:gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white text-sm"
              required
            />
            <button
              type="submit"
              className="px-5 sm:px-6 py-2.5 sm:py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors text-sm"
            >
              {subscribed ? "Subscribed!" : "Subscribe"}
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
              DENVAN<span className="text-red-500">.</span>
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Premium beauty products at affordable prices. Cruelty-free, clean ingredients, and same-day delivery.
            </p>
            <div className="flex space-x-3 sm:space-x-4 mt-4 sm:mt-6">
              <a href="https://instagram.com/denvanbeauty" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a href="https://tiktok.com/@denvanbeauty" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors" aria-label="TikTok">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13a8.28 8.28 0 005.58 2.14v-3.44a4.85 4.85 0 01-3.58-1.59 4.82 4.82 0 01-1.24-3.42h3.45V6.7h-3.45l4.82-.01z" />
                </svg>
              </a>
              <a href="https://facebook.com/denvanbeauty" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="https://x.com/denvanbeauty" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors" aria-label="X (Twitter)">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">
              Shop
            </h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {["Skincare", "Haircare", "Makeup", "Body Care", "Accessories", "Watches", "Wigs", "Shoes", "Clothes"].map(
                (cat) => (
                  <li key={cat}>
                    <Link
                      href={`/shop?category=${cat.toLowerCase().replace(" ", "-")}`}
                      className="text-gray-400 hover:text-red-500 text-xs sm:text-sm transition-colors"
                    >
                      {cat}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">
              Company
            </h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-red-500 text-xs sm:text-sm transition-colors">About Us</Link></li>
              <li><Link href="/delivery" className="text-gray-400 hover:text-red-500 text-xs sm:text-sm transition-colors">Delivery</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-red-500 text-xs sm:text-sm transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-red-500 text-xs sm:text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">
              Help
            </h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li><Link href="/policies" className="text-gray-400 hover:text-red-500 text-xs sm:text-sm transition-colors">Shipping Policy</Link></li>
              <li><Link href="/policies" className="text-gray-400 hover:text-red-500 text-xs sm:text-sm transition-colors">Returns & Refunds</Link></li>
              <li><Link href="/policies" className="text-gray-400 hover:text-red-500 text-xs sm:text-sm transition-colors">Payment & Safety</Link></li>
              <li><Link href="/policies" className="text-gray-400 hover:text-red-500 text-xs sm:text-sm transition-colors">FAQ</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-gray-500 text-xs sm:text-sm">
            &copy; 2026 Denvan Beauty. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {[
              { name: "Visa", color: "bg-blue-600" },
              { name: "MC", color: "bg-red-500" },
              { name: "PayPal", color: "bg-blue-500" },
              { name: "Apple", color: "bg-gray-800" },
              { name: "GPay", color: "bg-green-500" },
            ].map((pay) => (
              <span
                key={pay.name}
                className={`${pay.color} text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded`}
                title={pay.name}
              >
                {pay.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
