"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Product } from "@/types";
import { useCart } from "@/lib/CartContext";
import { useWishlist } from "@/lib/WishlistContext";
import QuickView from "./QuickView";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [imgError, setImgError] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Deterministic "stock" based on product id hash
  const idHash = product.id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const stockLeft = (idHash % 8) + 2; // 2-9
  const showLowStock = product.isBestSeller && stockLeft <= 5;

  return (
    <div className="relative bg-white border-b border-gray-100 overflow-hidden group">
      {/* Image */}
      <Link
        href={`/product/${product.slug}`}
        className="block relative aspect-square bg-gray-100 overflow-hidden"
      >
        {!imgError ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-2">
            <span className="text-gray-500 text-[10px] sm:text-xs font-medium text-center bg-white/70 px-2 py-1">
              {product.name}
            </span>
          </div>
        )}

        {/* Discount badge */}
        {discount > 0 && (
          <span className="absolute top-1.5 left-1.5 sm:top-1 sm:left-1 bg-red-600 text-white text-[9px] sm:text-[10px] font-bold px-1 py-0.5 sm:px-1.5 z-10">
            -{discount}%
          </span>
        )}

        {/* New badge */}
        {product.isNew && !discount && (
          <span className="absolute top-1.5 left-1.5 sm:top-1 sm:left-1 bg-black text-white text-[9px] sm:text-[10px] font-bold px-1 py-0.5 sm:px-1.5 z-10">
            NEW
          </span>
        )}
      </Link>

      {/* Wishlist heart - 44px touch target */}
      <button
        onClick={() => toggleWishlist(product.id)}
        className="absolute top-1 right-1 z-10 w-8 h-8 sm:w-7 sm:h-7 flex items-center justify-center bg-white/80 rounded-full"
        aria-label="Add to wishlist"
      >
        <svg
          className={`w-4 h-4 sm:w-3.5 sm:h-3.5 ${wishlisted ? "text-red-500 fill-red-500" : "text-gray-400"}`}
          fill={wishlisted ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      {/* Quick view button - visible on hover (desktop) / always on mobile */}
      <button
        onClick={() => setShowQuickView(true)}
        className="absolute bottom-[96px] sm:bottom-[90px] right-1.5 z-10 w-7 h-7 sm:w-6 sm:h-6 bg-white/90 text-gray-600 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
        aria-label="Quick view"
      >
        <svg className="w-3.5 h-3.5 sm:w-3 sm:h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      </button>

      {/* Add to cart button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          addToCart(product);
        }}
        className="absolute bottom-[68px] sm:bottom-[64px] right-1.5 z-10 w-7 h-7 sm:w-6 sm:h-6 bg-black text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
        aria-label="Add to cart"
      >
        <svg className="w-3.5 h-3.5 sm:w-3 sm:h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {/* Details */}
      <div className="px-1.5 py-1.5 sm:px-2 sm:py-2">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-[11px] sm:text-xs text-gray-700 line-clamp-2 leading-tight hover:text-red-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating text */}
        <p className="text-[9px] sm:text-[10px] text-gray-400 mt-0.5">
          {product.rating} | {product.reviewCount} sold
        </p>

        {/* Price */}
        <div className="flex items-center gap-1 sm:gap-1.5 mt-0.5 sm:mt-1">
          <span className="text-xs sm:text-sm font-bold text-red-600">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-[9px] sm:text-[10px] text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Urgency indicators */}
        {showLowStock && (
          <p className="text-[8px] sm:text-[9px] text-orange-600 font-medium mt-0.5">
            Only {stockLeft} left
          </p>
        )}
        {product.isBestSeller && !showLowStock && (
          <p className="text-[8px] sm:text-[9px] text-red-500 font-medium mt-0.5">
            Selling fast
          </p>
        )}
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <QuickView product={product} onClose={() => setShowQuickView(false)} />
      )}
    </div>
  );
}
