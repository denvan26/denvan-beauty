"use client";

import { useState } from "react";

const sections = [
  {
    id: "shipping",
    title: "Shipping & Delivery",
    content: [
      {
        q: "What are your shipping options?",
        a: "We offer three shipping methods: Same-Day Delivery ($9.99, 2-4 hours in select areas), Express Shipping ($12.99, 1-2 business days), and Standard Shipping ($5.99 or FREE on orders over $50, 3-5 business days).",
      },
      {
        q: "How does same-day delivery work?",
        a: "Same-day delivery is available in select areas through our DoorDash partnership. Place your order before 2 PM and receive your products within 2-4 hours. Available Monday through Saturday.",
      },
      {
        q: "Do you ship internationally?",
        a: "Currently, we ship within the United States and Canada. International shipping is coming soon. Sign up for our newsletter to be notified when we expand.",
      },
      {
        q: "How can I track my order?",
        a: "Once your order ships, you'll receive a confirmation email with a tracking number and link. For same-day delivery orders, you'll receive real-time tracking through DoorDash.",
      },
    ],
  },
  {
    id: "returns",
    title: "Returns & Refunds",
    content: [
      {
        q: "What is your return policy?",
        a: "We accept returns within 30 days of purchase for unused, unopened products in their original packaging. Please contact our support team to initiate a return.",
      },
      {
        q: "How do I initiate a return?",
        a: "Email us at returns@denvanbeauty.com with your order number and reason for return. We'll provide a prepaid return label within 24 hours.",
      },
      {
        q: "When will I receive my refund?",
        a: "Refunds are processed within 5-7 business days after we receive and inspect the returned item. The refund will be applied to your original payment method.",
      },
      {
        q: "Can I exchange a product?",
        a: "Yes! If you'd like to exchange a product, contact our support team. We'll arrange the exchange and cover shipping costs for the new item.",
      },
      {
        q: "What if my product arrives damaged?",
        a: "If your product arrives damaged, please contact us within 48 hours with photos of the damage. We'll send a replacement at no additional cost.",
      },
    ],
  },
  {
    id: "payment",
    title: "Payment & Safety",
    content: [
      {
        q: "What payment methods do you accept?",
        a: "We accept Visa, Mastercard, American Express, PayPal, Apple Pay, Google Pay, and Zelle. All payments are processed securely through 256-bit SSL encryption.",
      },
      {
        q: "Is my payment information secure?",
        a: "Absolutely. We use industry-standard SSL encryption and PCI-compliant payment processing. We never store your full credit card information on our servers.",
      },
      {
        q: "Do you offer payment plans?",
        a: "We're working on integrating buy-now-pay-later options through services like Afterpay and Klarna. Stay tuned for updates!",
      },
      {
        q: "How do I pay with Zelle?",
        a: "Select Zelle at checkout and send payment to pay@denvanbeauty.com. Include your order number in the memo field. Your order will be processed once payment is confirmed.",
      },
    ],
  },
];

export default function PoliciesPage() {
  const [activeSection, setActiveSection] = useState("shipping");

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Policies & FAQ
          </h1>
          <p className="text-lg text-gray-600">
            Everything you need to know about shopping with Denvan Beauty.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-gray-200 pb-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                activeSection === section.id
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>

        {/* Content */}
        {sections.map(
          (section) =>
            activeSection === section.id && (
              <div key={section.id} className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">{section.title}</h2>
                {section.content.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-sm transition-shadow"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {item.q}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            )
        )}

        {/* Still need help? */}
        <div className="mt-16 text-center bg-gray-50 rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
          <p className="text-gray-600 mb-6">
            Our support team is here to help you.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-black text-white font-semibold rounded-full hover:bg-gray-900 transition-colors text-sm"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
