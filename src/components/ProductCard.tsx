"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Product } from "@/types";
import { useCart } from "@/lib/CartContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [imgError, setImgError] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="relative bg-white border-b border-gray-100 overflow-hidden">
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
            <span className="text-gray-500 text-xs font-medium text-center bg-white/70 px-3 py-1.5">
              {product.name}
            </span>
          </div>
        )}

        {/* Discount badge */}
        {discount > 0 && (
          <span className="absolute top-1 left-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 z-10">
            -{discount}%
          </span>
        )}

        {/* New badge */}
        {product.isNew && !discount && (
          <span className="absolute top-1 left-1 bg-black text-white text-[10px] font-bold px-1.5 py-0.5 z-10">
            NEW
          </span>
        )}
      </Link>

      {/* Wishlist heart */}
      <button
        onClick={() => setWishlisted(!wishlisted)}
        className="absolute top-1.5 right-1.5 z-10 w-7 h-7 flex items-center justify-center bg-white/80 rounded-full"
        aria-label="Add to wishlist"
      >
        <svg
          className={`w-4 h-4 ${wishlisted ? "text-red-500 fill-red-500" : "text-gray-400"}`}
          fill={wishlisted ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      {/* Add to cart button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          addToCart(product);
        }}
        className="absolute bottom-[72px] right-2 z-10 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
        aria-label="Add to cart"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {/* Details */}
      <div className="px-2 py-2">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-xs text-gray-700 line-clamp-2 leading-tight hover:text-red-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating text */}
        <p className="text-[10px] text-gray-400 mt-0.5">
          {product.rating} | {product.reviewCount} sold
        </p>

        {/* Price */}
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-sm font-bold text-red-600">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-[10px] text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
