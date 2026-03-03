"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Product } from "@/types";
import { useCart } from "@/lib/CartContext";

interface QuickViewProps {
  product: Product;
  onClose: () => void;
}

export default function QuickView({ product, onClose }: QuickViewProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [imgError, setImgError] = useState(false);
  const [added, setAdded] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-[60]" onClick={onClose} />
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 pointer-events-none">
        <div className="bg-white w-full max-w-lg sm:max-w-2xl pointer-events-auto relative animate-fade-in max-h-[90vh] overflow-y-auto">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black z-10 bg-white rounded-full"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-square bg-gray-100">
              {!imgError ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 320px"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-500 text-sm font-medium bg-white/70 px-3 py-1">{product.name}</span>
                </div>
              )}
              {discount > 0 && (
                <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5">
                  -{discount}%
                </span>
              )}
            </div>

            {/* Info */}
            <div className="p-4 sm:p-6 flex flex-col">
              <h2 className="text-sm sm:text-base font-bold text-gray-900 mb-1">
                {product.name}
              </h2>

              <p className="text-[10px] sm:text-xs text-gray-400 mb-2">
                {product.rating} | {product.reviewCount} sold
              </p>

              {/* Price */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg sm:text-xl font-bold text-red-600">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <p className="text-xs text-gray-500 line-clamp-2 mb-4">
                {product.description}
              </p>

              {/* Quantity */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs text-gray-500">Qty:</span>
                <div className="flex items-center border border-gray-200">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 text-sm"
                  >
                    -
                  </button>
                  <span className="w-8 h-8 flex items-center justify-center font-semibold border-x border-gray-200 text-sm">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 text-sm"
                    disabled={quantity >= 10}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className={`w-full py-3 font-bold text-sm transition-colors ${
                  added
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                {added ? "Added!" : `Add to Cart — $${(product.price * quantity).toFixed(2)}`}
              </button>

              {/* View full details */}
              <Link
                href={`/product/${product.slug}`}
                onClick={onClose}
                className="block text-center text-xs text-gray-500 hover:text-red-600 mt-3 underline"
              >
                View Full Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
