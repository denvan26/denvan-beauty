"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/CartContext";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  const shipping = totalPrice >= 50 ? 0 : 5.99;
  const tax = totalPrice * 0.08;
  const orderTotal = totalPrice + shipping + tax;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <svg className="w-20 h-20 mx-auto text-gray-300 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center px-8 py-3 bg-black text-white font-semibold rounded-full hover:bg-gray-900 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Header */}
            <div className="hidden sm:grid grid-cols-12 gap-4 text-xs font-bold uppercase tracking-wider text-gray-500 pb-4 border-b">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            {items.map((item) => (
              <div
                key={item.product.id}
                className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center py-4 border-b border-gray-100"
              >
                {/* Product */}
                <div className="sm:col-span-6 flex gap-4">
                  <div className="relative w-24 h-24 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <div>
                    <Link
                      href={`/product/${item.product.slug}`}
                      className="font-medium text-gray-900 hover:text-pink-500 transition-colors"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-xs text-gray-500 capitalize mt-1">
                      {item.product.category.replace("-", " ")}
                    </p>
                    {item.product.sameDayDelivery && (
                      <span className="inline-block text-[10px] text-green-600 font-medium mt-1">
                        Same-Day Delivery
                      </span>
                    )}
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-xs text-red-500 hover:text-red-600 mt-2 block sm:hidden"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="sm:col-span-2 text-center">
                  <span className="sm:hidden text-xs text-gray-500 mr-2">Price:</span>
                  <span className="font-medium">${item.product.price.toFixed(2)}</span>
                </div>

                {/* Quantity */}
                <div className="sm:col-span-2 flex items-center justify-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                {/* Total */}
                <div className="sm:col-span-2 flex items-center justify-between sm:justify-end">
                  <span className="sm:hidden text-xs text-gray-500">Total:</span>
                  <div className="flex items-center gap-3">
                    <span className="font-bold">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="hidden sm:block text-gray-400 hover:text-red-500"
                      aria-label="Remove item"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black mt-4"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>

              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (est.)</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-pink-500">
                    Add ${(50 - totalPrice).toFixed(2)} more for free shipping!
                  </p>
                )}
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 font-medium text-sm rounded-lg hover:bg-gray-300 transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold mb-6 pt-4 border-t border-gray-200">
                <span>Total</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>

              <Link
                href="/checkout"
                className="block w-full text-center py-3.5 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition-colors"
              >
                Proceed to Checkout
              </Link>

              <div className="mt-4 flex items-center justify-center gap-4 text-gray-400 text-xs">
                <span>Visa</span>
                <span>Mastercard</span>
                <span>PayPal</span>
                <span>Apple Pay</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
