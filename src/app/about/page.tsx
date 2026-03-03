import Link from "next/link";

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-pink-50 to-purple-50 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            About Denvan Beauty
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Making premium beauty accessible to everyone. Clean ingredients, cruelty-free products, and same-day delivery.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-8">
            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-3">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To become the #1 destination for affordable, inclusive beauty — where everyone can discover premium quality products that celebrate their unique beauty, without compromise on price, quality, or values.
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              Empowering everyone to look and feel their best by curating and delivering high-quality beauty products at honest prices. We believe beauty is for all — every skin tone, hair type, and budget deserves access to the best.
            </p>
          </div>
        </div>

        {/* Brand Story */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="prose max-w-none text-gray-600 space-y-4">
            <p className="text-lg leading-relaxed">
              Denvan Beauty was born from a simple belief: everyone deserves access to high-quality beauty products without breaking the bank. We noticed a gap in the market — premium beauty at affordable prices, delivered with care and speed.
            </p>
            <p className="text-lg leading-relaxed">
              Founded with a passion for clean, effective beauty, we curate and develop products that actually work. From skincare serums packed with active ingredients to haircare essentials for every texture, plus our newest collections of elegant women&apos;s watches and premium wigs — our growing catalog of 450+ products is designed to celebrate and enhance your natural beauty.
            </p>
            <p className="text-lg leading-relaxed">
              What sets us apart? Our commitment to same-day delivery in select areas means you don&apos;t have to wait to feel your best. We partner with DoorDash to bring your beauty essentials right to your door — often within hours.
            </p>
          </div>
        </div>

        {/* Our Promise */}
        <div className="bg-gradient-to-r from-black to-gray-800 rounded-2xl p-8 sm:p-10 mb-16 text-white">
          <h2 className="text-2xl font-bold mb-6">Our Promise to You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "Quality First", desc: "Every product is tested and vetted before it reaches our shelves. If it doesn't meet our standards, we don't sell it." },
              { title: "Honest Pricing", desc: "No hidden fees, no inflated markups. We price our products fairly so premium beauty is accessible to everyone." },
              { title: "Fast Delivery", desc: "Same-day delivery in select areas. Standard orders ship within 24 hours because you shouldn't have to wait to feel beautiful." },
              { title: "Satisfaction Guaranteed", desc: "Not happy? We'll make it right. Our customer support team is here to ensure you love every purchase." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
                title: "Cruelty-Free",
                desc: "We never test on animals. All of our products are cruelty-free and many are vegan. Beauty should never come at the cost of animal welfare.",
              },
              {
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                title: "Clean Ingredients",
                desc: "We formulate with ingredients you can trust. No harmful parabens, sulfates, or harsh chemicals. Just clean, effective beauty that works.",
              },
              {
                icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Affordable Luxury",
                desc: "Premium quality doesn't have to mean premium prices. We keep our products affordable so everyone can access the best in beauty.",
              },
              {
                icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Same-Day Delivery",
                desc: "In select areas, order by 2 PM and get your beauty essentials delivered the same day through our DoorDash partnership.",
              },
              {
                icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064",
                title: "Inclusive Beauty",
                desc: "Beauty has no boundaries. Our products are formulated for all skin tones, hair types, and textures. Everyone is welcome here.",
              },
              {
                icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
                title: "Sustainability",
                desc: "We're committed to reducing our environmental impact with recyclable packaging, responsible sourcing, and eco-conscious practices.",
              },
            ].map((value) => (
              <div key={value.title} className="text-center p-6">
                <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={value.icon} />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hygiene */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-4">Our Hygiene Standards</h2>
          <p className="text-gray-600 mb-6">
            Your safety is our priority. We maintain the highest hygiene standards throughout our supply chain:
          </p>
          <ul className="space-y-3">
            {[
              "All products are sealed and tamper-proof for your protection",
              "Temperature-controlled storage for sensitive skincare products",
              "Regular quality checks on every batch before shipping",
              "Sanitized packaging and fulfillment environment",
              "Compliant with FDA cosmetic regulations and guidelines",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 text-center">
          {[
            { num: "450+", label: "Products" },
            { num: "15K+", label: "Happy Customers" },
            { num: "4.8", label: "Avg Rating" },
            { num: "2-4hr", label: "Same-Day Delivery" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl sm:text-4xl font-bold text-pink-500">{stat.num}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Experience Denvan Beauty?
          </h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            Join thousands of beauty lovers who trust Denvan Beauty for their skincare, haircare, makeup, watches, and wig needs.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center px-8 py-3.5 bg-black text-white font-bold rounded-full hover:bg-gray-900 transition-colors"
          >
            Shop Our Collection
          </Link>
        </div>
      </div>
    </div>
  );
}
