"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/CartContext";

interface CartSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function CartSidebar({ open, onClose }: CartSidebarProps) {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white z-50 shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-bold">
            Your Cart ({totalItems})
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-black"
            aria-label="Close cart"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <button
                onClick={onClose}
                className="text-pink-500 font-semibold hover:text-pink-600"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4 py-3 border-b border-gray-100">
                  <div className="relative w-20 h-20 bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg flex-shrink-0 overflow-hidden">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-sm font-bold text-pink-500 mt-1">
                      ${item.product.price.toFixed(2)}
                    </p>
                    <div className="flex items-center mt-2 space-x-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="w-7 h-7 rounded border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="text-sm font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="w-7 h-7 rounded border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                        disabled={item.quantity >= 10}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-gray-400 hover:text-red-500 self-start p-1"
                    aria-label="Remove item"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t px-6 py-4 space-y-3">
            <div className="flex justify-between text-base font-bold">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <Link
              href="/cart"
              onClick={onClose}
              className="block w-full text-center py-3 border-2 border-black text-black font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              View Cart
            </Link>
            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full text-center py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
