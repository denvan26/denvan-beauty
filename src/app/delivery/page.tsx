import Link from "next/link";

export default function DeliveryPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block bg-green-100 text-green-800 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
            Fast & Reliable
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Delivery Options
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We offer multiple delivery options including same-day delivery to get your beauty essentials to you as fast as possible.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Delivery Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: "Same-Day Delivery",
              time: "2-4 hours",
              price: "$9.99",
              desc: "Order before 2 PM and receive your order the same day. Powered by DoorDash for reliable, tracked delivery.",
              icon: "M13 10V3L4 14h7v7l9-11h-7z",
              highlight: true,
            },
            {
              title: "Standard Delivery",
              time: "3-5 business days",
              price: "$5.99 / Free over $50",
              desc: "Reliable standard shipping for all orders. Free on orders over $50. Tracking included with every shipment.",
              icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
              highlight: false,
            },
            {
              title: "Express Delivery",
              time: "1-2 business days",
              price: "$12.99",
              desc: "Need it fast? Express delivery gets your order to your doorstep in just 1-2 business days.",
              icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
              highlight: false,
            },
          ].map((option) => (
            <div
              key={option.title}
              className={`rounded-2xl p-6 ${
                option.highlight
                  ? "bg-green-50 border-2 border-green-500 relative"
                  : "bg-white border border-gray-200"
              }`}
            >
              {option.highlight && (
                <span className="absolute -top-3 left-6 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <svg className={`w-8 h-8 mb-4 ${option.highlight ? "text-green-600" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={option.icon} />
              </svg>
              <h3 className="text-lg font-bold mb-1">{option.title}</h3>
              <p className="text-sm text-gray-500 mb-1">{option.time}</p>
              <p className="text-lg font-bold text-pink-500 mb-3">{option.price}</p>
              <p className="text-sm text-gray-600">{option.desc}</p>
            </div>
          ))}
        </div>

        {/* How Same-Day Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10">
            How Same-Day Delivery Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Shop & Order", desc: "Browse our collection and add items to your cart. Place your order before 2 PM." },
              { step: "2", title: "We Prepare", desc: "Our team carefully packs your order with love and care within 30 minutes." },
              { step: "3", title: "DoorDash Picks Up", desc: "A DoorDash driver picks up your order and heads to your location." },
              { step: "4", title: "Delivered!", desc: "Receive your beauty essentials at your doorstep in 2-4 hours." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Coverage Area */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-4">Coverage Area</h2>
          <p className="text-gray-600 mb-6">
            Same-day delivery is currently available in the following areas. We&apos;re expanding rapidly — check back for updates!
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              "Los Angeles, CA",
              "Orange County, CA",
              "San Diego, CA",
              "San Francisco, CA",
              "Houston, TX",
              "Dallas, TX",
              "Atlanta, GA",
              "Miami, FL",
            ].map((area) => (
              <div key={area} className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {area}
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Fees */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Delivery Fees & Times</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 font-bold">Method</th>
                  <th className="text-left py-3 font-bold">Estimated Time</th>
                  <th className="text-left py-3 font-bold">Fee</th>
                  <th className="text-left py-3 font-bold">Availability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-3">Same-Day</td>
                  <td className="py-3">2-4 hours</td>
                  <td className="py-3">$9.99</td>
                  <td className="py-3">Select areas, Mon-Sat</td>
                </tr>
                <tr>
                  <td className="py-3">Express</td>
                  <td className="py-3">1-2 business days</td>
                  <td className="py-3">$12.99</td>
                  <td className="py-3">Nationwide</td>
                </tr>
                <tr>
                  <td className="py-3">Standard</td>
                  <td className="py-3">3-5 business days</td>
                  <td className="py-3">$5.99 / Free over $50</td>
                  <td className="py-3">Nationwide</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl py-12 px-8 text-white">
          <h2 className="text-3xl font-bold mb-3">Ready to Try Same-Day Delivery?</h2>
          <p className="text-pink-100 mb-6 max-w-lg mx-auto">
            Shop now and get your beauty essentials delivered right to your door today.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center px-8 py-3.5 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}
