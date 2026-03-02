"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || "";
  const sortParam = searchParams.get("sort") || "";

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [sortBy, setSortBy] = useState(sortParam || "featured");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

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
  }, [selectedCategory, priceRange, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <span className="hover:text-black cursor-pointer">Home</span>
        <span className="mx-2">/</span>
        <span className="text-black font-medium">Shop</span>
        {selectedCategory && (
          <>
            <span className="mx-2">/</span>
            <span className="text-black font-medium capitalize">
              {selectedCategory.replace("-", " ")}
            </span>
          </>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile filter toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters
        </button>

        {/* Sidebar Filters */}
        <aside
          className={`lg:w-64 flex-shrink-0 space-y-6 ${
            showFilters ? "block" : "hidden lg:block"
          }`}
        >
          {/* Categories */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3">
              Categories
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedCategory("")}
                className={`block text-sm w-full text-left py-1.5 px-3 rounded-lg transition-colors ${
                  !selectedCategory
                    ? "bg-black text-white font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                All Products ({products.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`block text-sm w-full text-left py-1.5 px-3 rounded-lg transition-colors ${
                    selectedCategory === cat.slug
                      ? "bg-black text-white font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {cat.name} ({cat.productCount})
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3">
              Price Range
            </h3>
            <div className="space-y-2">
              {[
                { label: "All Prices", range: [0, 50] as [number, number] },
                { label: "Under $10", range: [0, 10] as [number, number] },
                { label: "$10 - $20", range: [10, 20] as [number, number] },
                { label: "$20 - $30", range: [20, 30] as [number, number] },
                { label: "Over $30", range: [30, 50] as [number, number] },
              ].map((option) => (
                <button
                  key={option.label}
                  onClick={() => setPriceRange(option.range)}
                  className={`block text-sm w-full text-left py-1.5 px-3 rounded-lg transition-colors ${
                    priceRange[0] === option.range[0] &&
                    priceRange[1] === option.range[1]
                      ? "bg-black text-white font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Same-Day Delivery */}
          <div className="bg-green-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-semibold text-green-800">
                Same-Day Delivery
              </span>
            </div>
            <p className="text-xs text-green-700">
              All products are eligible for same-day delivery. Order by 2 PM!
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Sort & Results Bar */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-900">{filtered.length}</span>{" "}
              products
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
            >
              <option value="featured">Featured</option>
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Product Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-lg font-semibold mb-2">No products found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your filters to find what you&apos;re looking for.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("");
                  setPriceRange([0, 50]);
                  setSortBy("featured");
                }}
                className="text-pink-500 font-semibold hover:text-pink-600"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
