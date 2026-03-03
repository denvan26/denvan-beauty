"use client";

import { useState, useEffect } from "react";

export default function PromoPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("denvan-promo-dismissed");
    if (!dismissed) {
      const timer = setTimeout(() => setShow(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setShow(false);
    localStorage.setItem("denvan-promo-dismissed", "1");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      localStorage.setItem("denvan-promo-dismissed", "1");
      setTimeout(() => setShow(false), 2000);
    }
  };

  if (!show) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-[70]" onClick={handleDismiss} />
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-white w-full max-w-sm pointer-events-auto relative animate-fade-in">
          <button
            onClick={handleDismiss}
            className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black z-10"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="bg-red-600 text-white text-center py-8 px-6">
            <p className="text-xs font-bold tracking-widest uppercase mb-2">Welcome to Denvan</p>
            <p className="text-4xl font-black mb-1">15% OFF</p>
            <p className="text-sm text-red-100">Your First Order</p>
          </div>

          <div className="p-6">
            {!submitted ? (
              <>
                <p className="text-center text-xs text-gray-500 mb-4">
                  Sign up for exclusive deals and new arrivals
                </p>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full py-3 bg-red-600 text-white font-bold text-sm hover:bg-red-700 transition-colors"
                  >
                    GET 15% OFF
                  </button>
                </form>
                <p className="text-center text-[10px] text-gray-400 mt-3">
                  Use code <span className="font-bold text-gray-600">WELCOME15</span> at checkout
                </p>
              </>
            ) : (
              <div className="text-center py-4">
                <svg className="w-12 h-12 mx-auto text-green-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm font-bold">You&apos;re in!</p>
                <p className="text-xs text-gray-500 mt-1">Code: WELCOME15</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
