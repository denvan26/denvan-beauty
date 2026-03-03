"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || "";
  const sortParam = searchParams.get("sort") || "";
  const searchParam = searchParams.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [sortBy, setSortBy] = useState(sortParam || "featured");
  const [quickFilter, setQuickFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState(searchParam);

  // Sync state with URL params when they change
  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    if (sortParam) setSortBy(sortParam);
  }, [sortParam]);

  useEffect(() => {
    setSearchQuery(searchParam);
  }, [searchParam]);

  const priceFilters = [
    { label: "All", range: [0, 100] as [number, number] },
    { label: "<$10", range: [0, 10] as [number, number] },
    { label: "$10-20", range: [10, 20] as [number, number] },
    { label: "$20-30", range: [20, 30] as [number, number] },
    { label: "$30+", range: [30, 100] as [number, number] },
  ];

  const filtered = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (quickFilter === "sale") {
      result = result.filter((p) => p.originalPrice);
    }
    if (quickFilter === "new") {
      result = result.filter((p) => p.isNew);
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        result.sort(
          (a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0)
        );
    }

    return result;
  }, [selectedCategory, priceRange, sortBy, quickFilter, searchQuery]);

  const clearAll = () => {
    setSelectedCategory("");
    setPriceRange([0, 100]);
    setSortBy("featured");
    setQuickFilter("");
  };

  return (
    <div>
      {/* Horizontal filter bar - not sticky to avoid overlap issues */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          {/* Category chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-2 sm:py-2.5">
            <button
              onClick={() => setSelectedCategory("")}
              className={`flex-shrink-0 px-3 py-2 text-xs sm:text-sm font-medium rounded-full transition-colors active:scale-95 ${
                !selectedCategory
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 active:bg-gray-300"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`flex-shrink-0 px-3 py-2 text-xs sm:text-sm font-medium rounded-full transition-colors active:scale-95 ${
                  selectedCategory === cat.slug
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 active:bg-gray-300"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center justify-end pb-2 sm:pb-2.5">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-shrink-0 text-xs border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-red-500 bg-white"
            >
              <option value="featured">Featured</option>
              <option value="popular">Popular</option>
              <option value="rating">Top Rated</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low</option>
              <option value="price-high">Price: High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 pt-2 sm:pt-3 pb-1">
        <p className="text-[10px] sm:text-xs text-gray-500">
          {searchQuery && (
            <span>Results for &ldquo;{searchQuery}&rdquo; &middot; </span>
          )}
          <span className="font-semibold text-gray-900">{filtered.length}</span> products
        </p>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 pb-8 pt-1 sm:pt-2">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-0.5 sm:gap-1 md:gap-2">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 sm:py-20">
            <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-300 mb-3 sm:mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-base sm:text-lg font-semibold mb-2">No products found</h3>
            <p className="text-gray-500 text-sm mb-4">
              Try adjusting your filters.
            </p>
            <button
              onClick={clearAll}
              className="text-red-600 font-semibold hover:text-red-700 text-sm"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-sm text-gray-400">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
