"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { useWishlist } from "@/lib/WishlistContext";
import { products } from "@/data/products";

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
      <h1 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6">
        My Wishlist ({wishlistedProducts.length})
      </h1>

      {wishlistedProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-0.5 sm:gap-1 md:gap-2">
          {wishlistedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 sm:py-20">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <h3 className="text-base sm:text-lg font-semibold mb-2">Your wishlist is empty</h3>
          <p className="text-gray-500 text-sm mb-4">
            Tap the heart on products you love to save them here.
          </p>
          <Link
            href="/shop"
            className="inline-block px-6 py-3 bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
