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

  const categoryGradients: Record<string, string> = {
    skincare: "from-pink-100 to-rose-50",
    haircare: "from-indigo-100 to-purple-50",
    makeup: "from-fuchsia-100 to-pink-50",
    "body-care": "from-teal-100 to-emerald-50",
    accessories: "from-amber-100 to-orange-50",
    watches: "from-amber-100 to-yellow-50",
    wigs: "from-rose-100 to-orange-50",
    shoes: "from-sky-100 to-blue-50",
    clothes: "from-violet-100 to-purple-50",
  };

  const gradient = categoryGradients[product.category] || "from-pink-50 to-purple-50";

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <Link
        href={`/product/${product.slug}`}
        className={`block relative aspect-square bg-gradient-to-br ${gradient} overflow-hidden`}
      >
        {!imgError ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <span className="text-gray-500 text-sm font-medium text-center bg-white/70 px-4 py-2 rounded-xl">
              {product.name}
            </span>
          </div>
        )}

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-black text-white text-xs font-bold px-3 py-1 rounded-full z-10">
            {product.badge}
          </span>
        )}
        {product.isNew && !product.badge && (
          <span className="absolute top-3 left-3 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
            NEW
          </span>
        )}

        {/* Same Day badge */}
        {product.sameDayDelivery && (
          <span className="absolute top-3 right-3 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full z-10">
            SAME-DAY
          </span>
        )}

        {/* Quick Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="w-full py-2.5 bg-white text-black text-sm font-bold rounded-lg hover:bg-pink-500 hover:text-white transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </Link>

      {/* Details */}
      <div className="p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-sm font-medium text-gray-900 truncate hover:text-pink-500 transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center mt-1">
          <div className="flex text-yellow-400 text-xs">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-200"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-400 ml-1.5">
            ({product.reviewCount})
          </span>
        </div>
        <div className="flex items-center mt-2 space-x-2">
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
            {product.priceMax && ` - $${product.priceMax.toFixed(2)}`}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
          {product.originalPrice && (
            <span className="text-xs font-semibold text-red-500">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
