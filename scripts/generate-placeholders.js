const fs = require("fs");
const path = require("path");

const productsDir = path.join(__dirname, "../public/images/products");
const categoriesDir = path.join(__dirname, "../public/images/categories");
const heroDir = path.join(__dirname, "../public/images/hero");

function createSVG(text, bgColor, textColor = "#666") {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
  <rect width="600" height="600" fill="${bgColor}"/>
  <text x="300" y="280" font-family="Arial, sans-serif" font-size="20" fill="${textColor}" text-anchor="middle" font-weight="bold">${text}</text>
  <text x="300" y="320" font-family="Arial, sans-serif" font-size="14" fill="${textColor}" text-anchor="middle" opacity="0.7">Denvan Beauty</text>
</svg>`;
}

// Product placeholders
const productImages = {
  "cleanser.jpg": ["Facial Cleanser", "#fce4ec"],
  "micellar.jpg": ["Micellar Water", "#f3e5f5"],
  "vitamin-c-serum.jpg": ["Vitamin C Serum", "#fff3e0"],
  "ha-serum.jpg": ["HA Serum", "#e8eaf6"],
  "moisturizer.jpg": ["Moisturizer", "#e0f2f1"],
  "eye-cream.jpg": ["Eye Cream", "#fce4ec"],
  "clay-mask.jpg": ["Clay Mask", "#efebe9"],
  "sheet-mask.jpg": ["Sheet Mask", "#f3e5f5"],
  "sunscreen.jpg": ["Sunscreen SPF 50", "#fff8e1"],
  "lip-balm.jpg": ["Lip Balm", "#fce4ec"],
  "shampoo.jpg": ["Shampoo", "#e8eaf6"],
  "conditioner.jpg": ["Conditioner", "#ede7f6"],
  "hair-oil.jpg": ["Hair Growth Oil", "#fff3e0"],
  "edge-control.jpg": ["Edge Control", "#e0f2f1"],
  "braid-spray.jpg": ["Braid Spray", "#f3e5f5"],
  "detangling-spray.jpg": ["Detangling Spray", "#e8eaf6"],
  "satin-bonnet.jpg": ["Satin Bonnet", "#fce4ec"],
  "hair-brush.jpg": ["Hair Brush", "#efebe9"],
  "hair-extensions.jpg": ["Hair Extensions", "#f3e5f5"],
  "crochet-hair.jpg": ["Crochet Hair", "#ede7f6"],
  "foundation.jpg": ["Foundation", "#fce4ec"],
  "concealer.jpg": ["Concealer", "#fff3e0"],
  "powder.jpg": ["Setting Powder", "#fbe9e7"],
  "eyeshadow.jpg": ["Eyeshadow Palette", "#f3e5f5"],
  "eyeliner.jpg": ["Eyeliner", "#e8eaf6"],
  "mascara.jpg": ["Mascara", "#fce4ec"],
  "lipstick.jpg": ["Lipstick", "#fce4ec"],
  "lip-gloss.jpg": ["Lip Gloss", "#f8bbd0"],
  "brush-set.jpg": ["Brush Set", "#efebe9"],
  "cosmetic-bag.jpg": ["Cosmetic Bag", "#fce4ec"],
  "body-lotion.jpg": ["Body Lotion", "#e0f2f1"],
  "shower-gel.jpg": ["Shower Gel", "#e0f7fa"],
  "body-scrub.jpg": ["Body Scrub", "#efebe9"],
  "hand-cream.jpg": ["Hand Cream", "#fce4ec"],
  "deodorant.jpg": ["Deodorant", "#e8eaf6"],
  "body-mist.jpg": ["Body Mist", "#f3e5f5"],
  "mirror.jpg": ["LED Mirror", "#fff8e1"],
  "organizer.jpg": ["Organizer", "#e0f2f1"],
  "mask-brush.jpg": ["Mask Brush", "#fce4ec"],
  "hair-clips.jpg": ["Hair Clips", "#fff3e0"],
  "hair-ties.jpg": ["Hair Ties", "#f3e5f5"],
  "beauty-sponge.jpg": ["Beauty Sponge", "#fce4ec"],
};

// Category placeholders
const categoryImages = {
  "skincare.jpg": ["SKINCARE", "#fce4ec"],
  "haircare.jpg": ["HAIRCARE", "#e8eaf6"],
  "makeup.jpg": ["MAKEUP", "#f3e5f5"],
  "bodycare.jpg": ["BODY CARE", "#e0f2f1"],
  "accessories.jpg": ["ACCESSORIES", "#fff3e0"],
};

// Hero placeholders
const heroImages = {
  "skincare-routine.jpg": ["Skincare Routine", "#fce4ec"],
  "protective-styles.jpg": ["Protective Styles", "#e8eaf6"],
  "makeup-trends.jpg": ["Makeup Trends", "#f3e5f5"],
  "self-care.jpg": ["Self-Care", "#e0f2f1"],
};

// Generate all
function generate(dir, images) {
  fs.mkdirSync(dir, { recursive: true });
  for (const [filename, [text, color]] of Object.entries(images)) {
    const svgFilename = filename.replace(".jpg", ".svg");
    const svgPath = path.join(dir, svgFilename);
    fs.writeFileSync(svgPath, createSVG(text, color));
    // Also create as .jpg (just copy the SVG for now - browsers render SVG fine)
    fs.writeFileSync(path.join(dir, filename), createSVG(text, color));
    console.log(`Created: ${filename}`);
  }
}

generate(productsDir, productImages);
generate(categoriesDir, categoryImages);
generate(heroDir, heroImages);

console.log("\nAll placeholder images generated!");
