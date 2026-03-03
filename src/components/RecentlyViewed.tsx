"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { products } from "@/data/products";
import { Product } from "@/types";

interface RecentlyViewedProps {
  excludeId?: string;
}

export default function RecentlyViewed({ excludeId }: RecentlyViewedProps) {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("denvan-recently-viewed") || "[]");
      const ids: string[] = excludeId ? stored.filter((id: string) => id !== excludeId) : stored;
      const found = ids
        .map((id: string) => products.find((p) => p.id === id))
        .filter(Boolean) as Product[];
      setRecentProducts(found.slice(0, 10));
    } catch { /* ignore */ }
  }, [excludeId]);

  if (recentProducts.length === 0) return null;

  return (
    <section className="py-3 sm:py-4">
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <h2 className="text-sm sm:text-base lg:text-lg font-bold">Recently Viewed</h2>
      </div>
      <div className="flex gap-1.5 sm:gap-2 overflow-x-auto scrollbar-hide pb-2">
        {recentProducts.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-32 sm:w-36 md:w-40">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
