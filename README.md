# Denvan Beauty - E-Commerce Website

A modern, Shein-style beauty e-commerce website built with Next.js 16, Tailwind CSS, and TypeScript. Features skincare, haircare, makeup, body care, and accessories with same-day delivery support.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
denvan-beauty/
├── public/
│   └── images/
│       ├── products/       # Product placeholder images
│       ├── categories/     # Category images
│       └── hero/           # Blog/hero images
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── page.tsx        # Home page
│   │   ├── shop/           # Shop/catalog with filters
│   │   ├── product/[slug]/ # Product detail pages
│   │   ├── cart/           # Shopping cart
│   │   ├── checkout/       # Checkout with payment options
│   │   ├── delivery/       # Delivery info & DoorDash
│   │   ├── about/          # Brand story & values
│   │   ├── policies/       # Shipping, returns, payments
│   │   ├── contact/        # Contact form
│   │   └── blog/           # Beauty tips & guides
│   ├── components/         # Reusable UI components
│   │   ├── Header.tsx      # Sticky nav with mobile menu
│   │   ├── Footer.tsx      # Footer with newsletter
│   │   ├── ProductCard.tsx  # Product card with hover effects
│   │   ├── CartSidebar.tsx  # Slide-out cart drawer
│   │   └── ClientLayout.tsx # Cart provider wrapper
│   ├── data/
│   │   └── products.ts     # Full product catalog (42 items)
│   ├── lib/
│   │   └── CartContext.tsx  # Cart state with localStorage
│   └── types/
│       └── index.ts        # TypeScript interfaces
└── scripts/
    └── generate-placeholders.js  # SVG placeholder generator
```

## Features

- **42 products** across 5 categories with prices, descriptions, ingredients, and benefits
- **Shopping cart** with localStorage persistence and slide-out sidebar
- **Product filtering** by category, price range, and sort order
- **Product detail pages** with tabbed info, related products, and reviews
- **Checkout flow** with address form and payment method selection (Stripe, PayPal, Apple Pay, Google Pay, Zelle)
- **Same-day delivery** badges and dedicated delivery info page
- **Mobile-first** responsive design
- **Sticky navigation** with cart icon and item count
- **Hero carousel** with auto-rotating promotional slides
- **Newsletter signup** in footer
- **Blog/tips page** with beauty content
- **SEO-optimized** with meta tags, semantic HTML, and static export

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero carousel, categories, best sellers, new arrivals, reviews |
| Shop | `/shop` | Full catalog with category/price/sort filters |
| Product | `/product/[slug]` | Product detail with images, info, reviews |
| Cart | `/cart` | Cart summary with quantity controls |
| Checkout | `/checkout` | Address, payment, order summary |
| Delivery | `/delivery` | Delivery options, DoorDash, coverage map |
| About | `/about` | Brand story, values, hygiene standards |
| Policies | `/policies` | Shipping, returns, payment FAQ |
| Contact | `/contact` | Contact form with email, phone, socials |
| Blog | `/blog` | Beauty tips and product guides |

## Product Catalog

- **Skincare** (10 items): Cleansers, serums, moisturizers, masks, sunscreen — $5-$28
- **Haircare** (10 items): Shampoo, conditioner, growth oil, edge control, extensions — $7-$18
- **Makeup** (10 items): Foundation, concealer, eyeshadow, lipstick, brushes — $8-$25
- **Body Care** (6 items): Lotion, shower gel, scrub, body mist — $6-$18
- **Accessories** (6 items): Mirror, organizer, clips, sponge — $5-$15

## Adding New Products

Edit `src/data/products.ts` and add a new product object:

```ts
{
  id: "sk-011",
  name: "New Product Name",
  slug: "new-product-name",
  category: "skincare",  // skincare | haircare | makeup | body-care | accessories
  price: 20,
  originalPrice: 28,     // optional, shows strikethrough price
  description: "Product description...",
  ingredients: "Ingredient list...",
  benefits: ["Benefit 1", "Benefit 2"],
  images: ["/images/products/new-product.jpg"],
  rating: 4.5,
  reviewCount: 0,
  badge: "NEW",           // optional: "Best Seller", "Top Rated", etc.
  sameDayDelivery: true,
  isNew: true,
  isBestSeller: false,
  inStock: true,
}
```

Add a placeholder image by running: `node scripts/generate-placeholders.js` (or add your own image to `public/images/products/`).

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Click "Deploy" — Vercel auto-detects Next.js settings

### Netlify

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com) and import the repository
3. Build command: `npm run build`
4. Publish directory: `out`

### GitHub Pages

1. Push code to GitHub
2. Run `npm run build` to generate the `out/` directory
3. Deploy the `out/` folder to GitHub Pages using `gh-pages` or GitHub Actions

### Static Export

The site is configured for static export (`output: "export"` in `next.config.ts`). After `npm run build`, the `out/` directory contains all static files ready for any hosting provider.

## Updating Prices

All prices are in `src/data/products.ts`. Find the product by name or ID and update the `price` field. If there's an `originalPrice`, update that too for correct discount display.

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **State**: React Context + localStorage
- **Deployment**: Static export (works on any host)
