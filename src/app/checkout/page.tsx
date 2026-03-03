"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState<{ code: string; discount: number } | null>(null);
  const [promoError, setPromoError] = useState("");

  const promoCodes: Record<string, { discount: number; label: string }> = {
    WELCOME15: { discount: 0.15, label: "15% off" },
    GLOW10: { discount: 0.10, label: "10% off" },
    BEAUTY20: { discount: 0.20, label: "20% off" },
  };

  const handlePromoApply = () => {
    const code = promoCode.trim().toUpperCase();
    if (promoCodes[code]) {
      setPromoApplied({ code, discount: promoCodes[code].discount });
      setPromoError("");
    } else {
      setPromoError("Invalid promo code");
      setPromoApplied(null);
    }
  };

  const discountAmount = promoApplied ? totalPrice * promoApplied.discount : 0;
  const subtotalAfterDiscount = totalPrice - discountAmount;
  const shipping = subtotalAfterDiscount >= 50 ? 0 : 5.99;
  const tax = subtotalAfterDiscount * 0.08;
  const orderTotal = subtotalAfterDiscount + shipping + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-3">Order Confirmed!</h1>
        <p className="text-gray-600 mb-2">
          Thank you for shopping with Denvan Beauty.
        </p>
        <p className="text-gray-500 text-sm mb-8">
          You&apos;ll receive an email confirmation shortly with your order details and tracking information.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center px-8 py-3 bg-black text-white font-semibold rounded-full hover:bg-gray-900 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link
          href="/shop"
          className="text-pink-500 font-semibold hover:text-pink-600"
        >
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                    placeholder="Jane"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                    placeholder="Doe"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                    placeholder="jane@example.com"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-4">Delivery Address</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                    placeholder="123 Beauty Lane"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Apartment, Suite, etc. (optional)
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                    placeholder="Apt 4B"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                    placeholder="Los Angeles"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                    placeholder="CA"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                    placeholder="90001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm bg-white">
                    <option>United States</option>
                    <option>Canada</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-4">Payment Method</h2>

              <div className="space-y-3 mb-6">
                {[
                  { id: "card", label: "Credit / Debit Card", sub: "Visa, Mastercard, AMEX" },
                  { id: "paypal", label: "PayPal", sub: "Pay with your PayPal account" },
                  { id: "apple", label: "Apple Pay / Google Pay", sub: "Quick, secure mobile payment" },
                  { id: "zelle", label: "Zelle", sub: "Send payment directly" },
                ].map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${
                      paymentMethod === method.id
                        ? "border-pink-500 bg-pink-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-pink-500 focus:ring-pink-500"
                    />
                    <div>
                      <span className="text-sm font-medium">{method.label}</span>
                      <p className="text-xs text-gray-500">{method.sub}</p>
                    </div>
                  </label>
                ))}
              </div>

              {paymentMethod === "card" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                      placeholder="4242 4242 4242 4242"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVC
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "zelle" && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-sm text-blue-800">
                    Send payment to <strong>pay@denvanbeauty.com</strong> via Zelle. Include your order number in the memo.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{item.product.name}</p>
                      <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-medium ml-4">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Promo Code */}
              <div className="mb-4 pb-4 border-b border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => { setPromoCode(e.target.value); setPromoError(""); }}
                    placeholder="Promo code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                    disabled={!!promoApplied}
                  />
                  {promoApplied ? (
                    <button
                      type="button"
                      onClick={() => { setPromoApplied(null); setPromoCode(""); }}
                      className="px-4 py-2 bg-red-100 text-red-600 font-medium text-sm rounded-lg hover:bg-red-200 transition-colors"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handlePromoApply}
                      className="px-4 py-2 bg-gray-200 text-gray-700 font-medium text-sm rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Apply
                    </button>
                  )}
                </div>
                {promoError && (
                  <p className="text-xs text-red-500 mt-1.5">{promoError}</p>
                )}
                {promoApplied && (
                  <p className="text-xs text-green-600 mt-1.5 font-medium">
                    {promoCodes[promoApplied.code].label} applied — you save ${discountAmount.toFixed(2)}!
                  </p>
                )}
              </div>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({promoCodes[promoApplied.code].label})</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>{shipping === 0 ? <span className="text-green-600">FREE</span> : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (est.)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold mb-6 pt-4 border-t border-gray-200">
                <span>Total</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition-colors"
              >
                Place Order — ${orderTotal.toFixed(2)}
              </button>

              <p className="text-xs text-gray-400 text-center mt-4">
                By placing your order, you agree to our Terms of Service and Privacy Policy.
              </p>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secure 256-bit SSL encryption
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
