const fs = require("fs");
const path = require("path");

const productsDir = path.join(__dirname, "../public/images/products");
const categoriesDir = path.join(__dirname, "../public/images/categories");
const heroDir = path.join(__dirname, "../public/images/hero");

function createProductSVG(text, bgFrom, bgTo) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${bgFrom}"/>
      <stop offset="100%" style="stop-color:${bgTo}"/>
    </linearGradient>
  </defs>
  <rect width="600" height="600" fill="url(#bg)"/>
  <circle cx="300" cy="260" r="80" fill="white" opacity="0.3"/>
  <circle cx="300" cy="260" r="50" fill="white" opacity="0.2"/>
  <text x="300" y="380" font-family="system-ui, -apple-system, sans-serif" font-size="22" fill="#555" text-anchor="middle" font-weight="600">${text}</text>
  <text x="300" y="415" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="#888" text-anchor="middle" letter-spacing="3">DENVAN BEAUTY</text>
</svg>`;
}

function createCategorySVG(text, bgFrom, bgTo) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${bgFrom}"/>
      <stop offset="100%" style="stop-color:${bgTo}"/>
    </linearGradient>
  </defs>
  <rect width="600" height="800" fill="url(#bg)"/>
  <circle cx="300" cy="340" r="120" fill="white" opacity="0.15"/>
  <circle cx="300" cy="340" r="70" fill="white" opacity="0.1"/>
  <text x="300" y="500" font-family="system-ui, -apple-system, sans-serif" font-size="32" fill="white" text-anchor="middle" font-weight="700" letter-spacing="2">${text}</text>
  <text x="300" y="540" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="white" text-anchor="middle" opacity="0.8" letter-spacing="3">SHOP NOW</text>
</svg>`;
}

function createHeroSVG(text, bgFrom, bgTo) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${bgFrom}"/>
      <stop offset="100%" style="stop-color:${bgTo}"/>
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#bg)"/>
  <circle cx="400" cy="220" r="80" fill="white" opacity="0.2"/>
  <text x="400" y="310" font-family="system-ui, -apple-system, sans-serif" font-size="24" fill="#555" text-anchor="middle" font-weight="600">${text}</text>
  <text x="400" y="345" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="#888" text-anchor="middle" letter-spacing="3">DENVAN BEAUTY</text>
</svg>`;
}

const productImages = {
  "cleanser.svg": ["Facial Cleanser", "#fce4ec", "#f8bbd0"],
  "micellar.svg": ["Micellar Water", "#f3e5f5", "#e1bee7"],
  "vitamin-c-serum.svg": ["Vitamin C Serum", "#fff3e0", "#ffe0b2"],
  "ha-serum.svg": ["HA Serum", "#e8eaf6", "#c5cae9"],
  "moisturizer.svg": ["Moisturizer", "#e0f2f1", "#b2dfdb"],
  "eye-cream.svg": ["Eye Cream", "#fce4ec", "#f48fb1"],
  "clay-mask.svg": ["Clay Mask", "#efebe9", "#d7ccc8"],
  "sheet-mask.svg": ["Sheet Mask", "#f3e5f5", "#ce93d8"],
  "sunscreen.svg": ["Sunscreen SPF 50", "#fff8e1", "#ffe082"],
  "lip-balm.svg": ["Lip Balm", "#fce4ec", "#f48fb1"],
  "shampoo.svg": ["Shampoo", "#e8eaf6", "#9fa8da"],
  "conditioner.svg": ["Conditioner", "#ede7f6", "#b39ddb"],
  "hair-oil.svg": ["Hair Growth Oil", "#fff3e0", "#ffb74d"],
  "edge-control.svg": ["Edge Control", "#e0f2f1", "#80cbc4"],
  "braid-spray.svg": ["Braid Spray", "#f3e5f5", "#ba68c8"],
  "detangling-spray.svg": ["Detangling Spray", "#e8eaf6", "#7986cb"],
  "satin-bonnet.svg": ["Satin Bonnet", "#fce4ec", "#f06292"],
  "hair-brush.svg": ["Hair Brush", "#efebe9", "#a1887f"],
  "hair-extensions.svg": ["Hair Extensions", "#f3e5f5", "#ab47bc"],
  "crochet-hair.svg": ["Crochet Hair", "#ede7f6", "#9575cd"],
  "foundation.svg": ["Foundation", "#fce4ec", "#f48fb1"],
  "concealer.svg": ["Concealer", "#fff3e0", "#ffcc80"],
  "powder.svg": ["Setting Powder", "#fbe9e7", "#ffab91"],
  "eyeshadow.svg": ["Eyeshadow Palette", "#f3e5f5", "#ce93d8"],
  "eyeliner.svg": ["Eyeliner", "#e8eaf6", "#7986cb"],
  "mascara.svg": ["Mascara", "#fce4ec", "#ec407a"],
  "lipstick.svg": ["Lipstick", "#fce4ec", "#e91e63"],
  "lip-gloss.svg": ["Lip Gloss", "#f8bbd0", "#f06292"],
  "brush-set.svg": ["Brush Set", "#efebe9", "#a1887f"],
  "cosmetic-bag.svg": ["Cosmetic Bag", "#fce4ec", "#f48fb1"],
  "body-lotion.svg": ["Body Lotion", "#e0f2f1", "#4db6ac"],
  "shower-gel.svg": ["Shower Gel", "#e0f7fa", "#4dd0e1"],
  "body-scrub.svg": ["Body Scrub", "#efebe9", "#bcaaa4"],
  "hand-cream.svg": ["Hand Cream", "#fce4ec", "#f48fb1"],
  "deodorant.svg": ["Deodorant", "#e8eaf6", "#7986cb"],
  "body-mist.svg": ["Body Mist", "#f3e5f5", "#ba68c8"],
  "mirror.svg": ["LED Mirror", "#fff8e1", "#ffd54f"],
  "organizer.svg": ["Organizer", "#e0f2f1", "#4db6ac"],
  "mask-brush.svg": ["Mask Brush", "#fce4ec", "#f48fb1"],
  "hair-clips.svg": ["Hair Clips", "#fff3e0", "#ffb74d"],
  "hair-ties.svg": ["Hair Ties", "#f3e5f5", "#ba68c8"],
  "beauty-sponge.svg": ["Beauty Sponge", "#fce4ec", "#ec407a"],
};

const categoryImages = {
  "skincare.svg": ["SKINCARE", "#ec407a", "#ad1457"],
  "haircare.svg": ["HAIRCARE", "#7b1fa2", "#4a148c"],
  "makeup.svg": ["MAKEUP", "#e91e63", "#880e4f"],
  "bodycare.svg": ["BODY CARE", "#00897b", "#004d40"],
  "accessories.svg": ["ACCESSORIES", "#ff8f00", "#e65100"],
};

const heroImages = {
  "skincare-routine.svg": ["Skincare Routine", "#fce4ec", "#f8bbd0"],
  "protective-styles.svg": ["Protective Styles", "#e8eaf6", "#c5cae9"],
  "makeup-trends.svg": ["Makeup Trends", "#f3e5f5", "#e1bee7"],
  "self-care.svg": ["Self-Care", "#e0f2f1", "#b2dfdb"],
};

function generate(dir, images, creator) {
  fs.mkdirSync(dir, { recursive: true });
  for (const [filename, [text, c1, c2]] of Object.entries(images)) {
    fs.writeFileSync(path.join(dir, filename), creator(text, c1, c2));
    console.log(`Created: ${filename}`);
  }
}

generate(productsDir, productImages, createProductSVG);
generate(categoriesDir, categoryImages, createCategorySVG);
generate(heroDir, heroImages, createHeroSVG);

console.log("\nAll placeholder images generated!");
