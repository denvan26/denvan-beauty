"use client";

import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/data/products";

export default function BlogPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-pink-50 to-purple-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Beauty Tips & Guides
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expert skincare routines, makeup tutorials, haircare tips, and seasonal product guides from the Denvan Beauty team.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Post */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative aspect-[4/3] md:aspect-auto bg-gradient-to-br from-pink-100 to-purple-100">
                <Image
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="text-xs font-bold text-pink-500 uppercase tracking-wider mb-2">
                  {blogPosts[0].category}
                </span>
                <h2 className="text-2xl font-bold mb-3">{blogPosts[0].title}</h2>
                <p className="text-gray-600 mb-4">{blogPosts[0].excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{blogPosts[0].date}</span>
                  <span className="text-sm font-semibold text-pink-500 hover:text-pink-600 cursor-pointer">
                    Read More &rarr;
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-[16/10] bg-gradient-to-br from-pink-50 to-purple-50">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-bold text-pink-500 uppercase tracking-wider">
                  {post.category}
                </span>
                <h3 className="text-lg font-bold mt-2 mb-2 group-hover:text-pink-500 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{post.date}</span>
                  <span className="text-sm font-semibold text-pink-500 group-hover:text-pink-600">
                    Read More &rarr;
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-16 text-center bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-2">Want More Beauty Tips?</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Subscribe to our newsletter for weekly beauty tips, exclusive deals, and new product drops.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center px-8 py-3 bg-black text-white font-semibold rounded-full hover:bg-gray-900 transition-colors text-sm"
          >
            Shop Our Products
          </Link>
        </div>
      </div>
    </div>
  );
}
