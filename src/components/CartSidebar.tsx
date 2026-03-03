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
      <div className="fixed right-0 top-0 h-full w-full sm:max-w-96 bg-white z-50 shadow-xl flex flex-col">
        {/* Coupon banner */}
        <div className="bg-red-600 text-white text-center text-[10px] sm:text-xs py-1.5 sm:py-2 px-3 font-medium">
          Use code <span className="font-bold">WELCOME15</span> for 15% off
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b">
          <h2 className="text-base sm:text-lg font-bold">
            Cart ({totalItems})
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
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-3 sm:py-4">
          {items.length === 0 ? (
            <div className="text-center py-10 sm:py-12">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-300 mb-3 sm:mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-gray-500 mb-3 sm:mb-4 text-sm">Your cart is empty</p>
              <button
                onClick={onClose}
                className="text-red-600 font-semibold hover:text-red-700 text-sm"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3 sm:gap-4 py-2 sm:py-3 border-b border-gray-100">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 flex-shrink-0 overflow-hidden">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-red-600 mt-0.5 sm:mt-1">
                      ${item.product.price.toFixed(2)}
                    </p>
                    <div className="flex items-center mt-1.5 sm:mt-2 space-x-1.5 sm:space-x-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="w-7 h-7 sm:w-7 sm:h-7 rounded border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 text-xs"
                      >
                        -
                      </button>
                      <span className="text-xs sm:text-sm font-medium w-6 sm:w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="w-7 h-7 sm:w-7 sm:h-7 rounded border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed text-xs"
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
          <div className="border-t px-4 sm:px-6 py-3 sm:py-4 space-y-2.5 sm:space-y-3">
            <div className="flex justify-between text-sm sm:text-base font-bold">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <Link
              href="/cart"
              onClick={onClose}
              className="block w-full text-center py-2.5 sm:py-3 border-2 border-black text-black font-semibold rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm"
            >
              View Cart
            </Link>
            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full text-center py-2.5 sm:py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors text-xs sm:text-sm"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
