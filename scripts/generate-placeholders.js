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
  // Original products
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

  // New Skincare products
  "retinol-serum.svg": ["Retinol Serum", "#fce4ec", "#f48fb1"],
  "sa-cleanser.svg": ["SA Cleanser", "#f3e5f5", "#e1bee7"],
  "niacinamide.svg": ["Niacinamide", "#fff3e0", "#ffe0b2"],
  "glycolic-toner.svg": ["Glycolic Toner", "#e8eaf6", "#c5cae9"],
  "rosehip-oil.svg": ["Rosehip Oil", "#fff3e0", "#ffcc80"],
  "collagen-cream.svg": ["Collagen Cream", "#fce4ec", "#f8bbd0"],
  "pore-primer.svg": ["Pore Primer", "#fbe9e7", "#ffab91"],
  "charcoal-mask.svg": ["Charcoal Mask", "#efebe9", "#d7ccc8"],
  "snail-essence.svg": ["Snail Essence", "#e0f2f1", "#b2dfdb"],
  "aloe-gel.svg": ["Aloe Vera Gel", "#e8f5e9", "#a5d6a7"],
  "dark-spot.svg": ["Dark Spot Corrector", "#fff3e0", "#ffe0b2"],
  "eye-patches.svg": ["Eye Patches", "#e8eaf6", "#c5cae9"],
  "oil-free-moisturizer.svg": ["Oil-Free Moisturizer", "#e0f7fa", "#80deea"],
  "turmeric-mask.svg": ["Turmeric Mask", "#fff8e1", "#ffe082"],
  "bakuchiol.svg": ["Bakuchiol Serum", "#f3e5f5", "#ce93d8"],
  "centella-cream.svg": ["Centella Cream", "#e8f5e9", "#81c784"],
  "exfoliating-pads.svg": ["Exfoliating Pads", "#fce4ec", "#f48fb1"],
  "vit-e-cream.svg": ["Vitamin E Cream", "#fff3e0", "#ffb74d"],
  "pimple-patches.svg": ["Pimple Patches", "#fce4ec", "#f8bbd0"],
  "rice-toner.svg": ["Rice Toner", "#fff8e1", "#fff176"],
  "cleansing-balm.svg": ["Cleansing Balm", "#fce4ec", "#f48fb1"],
  "gua-sha.svg": ["Gua Sha Tool", "#e8eaf6", "#9fa8da"],
  "tinted-spf.svg": ["Tinted SPF", "#fff8e1", "#ffe082"],
  "lip-mask.svg": ["Lip Mask", "#fce4ec", "#ec407a"],
  "azelaic-acid.svg": ["Azelaic Acid", "#f3e5f5", "#ba68c8"],
  "face-mist.svg": ["Face Mist", "#e0f7fa", "#4dd0e1"],
  "neck-cream.svg": ["Neck Cream", "#fce4ec", "#f8bbd0"],
  "spot-treatment.svg": ["Spot Treatment", "#fbe9e7", "#ffab91"],
  "enzyme-wash.svg": ["Enzyme Wash", "#e8f5e9", "#a5d6a7"],
  "probiotic-mist.svg": ["Probiotic Mist", "#f3e5f5", "#e1bee7"],
  "peptide-eye-cream.svg": ["Peptide Eye Cream", "#fce4ec", "#f48fb1"],
  "mandelic-toner.svg": ["Mandelic Toner", "#f3e5f5", "#ce93d8"],
  "sheet-mask-pack.svg": ["Sheet Mask Pack", "#e8eaf6", "#c5cae9"],
  "aloe-moisturizer.svg": ["Aloe Moisturizer", "#e8f5e9", "#a5d6a7"],
  "glycolic-body-lotion.svg": ["Glycolic Lotion", "#fce4ec", "#f8bbd0"],
  "rice-essence.svg": ["Rice Essence", "#fff8e1", "#fff176"],
  "bp-spot-gel.svg": ["BP Spot Gel", "#fbe9e7", "#ffab91"],
  "snail-moisturizer.svg": ["Snail Moisturizer", "#e0f2f1", "#b2dfdb"],
  "green-tea-oil.svg": ["Green Tea Oil", "#e8f5e9", "#81c784"],
  "tranexamic-serum.svg": ["Tranexamic Serum", "#f3e5f5", "#ba68c8"],
  "watermelon-mist.svg": ["Watermelon Mist", "#fce4ec", "#ef9a9a"],
  "mushroom-serum.svg": ["Mushroom Serum", "#efebe9", "#bcaaa4"],

  // New Haircare products
  "curl-cream.svg": ["Curl Cream", "#ede7f6", "#b39ddb"],
  "leave-in.svg": ["Leave-In Conditioner", "#e8eaf6", "#9fa8da"],
  "deep-mask.svg": ["Deep Conditioning", "#f3e5f5", "#ce93d8"],
  "anti-dandruff.svg": ["Anti-Dandruff", "#e0f2f1", "#80cbc4"],
  "scalp-scrub.svg": ["Scalp Scrub", "#efebe9", "#bcaaa4"],
  "heat-protectant.svg": ["Heat Protectant", "#fbe9e7", "#ffab91"],
  "hair-vitamins.svg": ["Hair Vitamins", "#e8f5e9", "#81c784"],
  "breakage-serum.svg": ["Breakage Serum", "#fff3e0", "#ffb74d"],
  "dry-shampoo.svg": ["Dry Shampoo", "#e8eaf6", "#7986cb"],
  "jbco.svg": ["JBCO Oil", "#fff3e0", "#ffcc80"],
  "twist-butter.svg": ["Twist Butter", "#ede7f6", "#9575cd"],
  "silk-press.svg": ["Silk Press Spray", "#fce4ec", "#f06292"],
  "loc-spray.svg": ["Loc Spray", "#e0f2f1", "#4db6ac"],
  "protein-treatment.svg": ["Protein Treatment", "#fff3e0", "#ffe0b2"],
  "wig-cap.svg": ["Wig Cap", "#efebe9", "#a1887f"],
  "hair-gel.svg": ["Hair Gel", "#e8eaf6", "#7986cb"],
  "silk-pillowcase.svg": ["Silk Pillowcase", "#f3e5f5", "#ba68c8"],
  "rosemary-oil.svg": ["Rosemary Oil", "#e8f5e9", "#81c784"],
  "mousse.svg": ["Hair Mousse", "#ede7f6", "#b39ddb"],
  "wide-comb.svg": ["Wide-Tooth Comb", "#efebe9", "#d7ccc8"],
  "rice-rinse.svg": ["Rice Water Rinse", "#fff8e1", "#fff176"],
  "scrunchies.svg": ["Scrunchies", "#fce4ec", "#f48fb1"],
  "sheen-spray.svg": ["Sheen Spray", "#fff3e0", "#ffb74d"],
  "clarifying-shampoo.svg": ["Clarifying Shampoo", "#e0f7fa", "#4dd0e1"],
  "loc-gel.svg": ["Loc Gel", "#e0f2f1", "#80cbc4"],
  "hair-glue.svg": ["Bonding Glue", "#efebe9", "#a1887f"],
  "edge-brush.svg": ["Edge Brush", "#fce4ec", "#f06292"],
  "hot-oil.svg": ["Hot Oil Treatment", "#fff3e0", "#ffcc80"],
  "wig-grip.svg": ["Wig Grip Band", "#ede7f6", "#9575cd"],
  "coconut-conditioner.svg": ["Coconut Conditioner", "#efebe9", "#bcaaa4"],
  "keratin-treatment.svg": ["Keratin Treatment", "#f3e5f5", "#ce93d8"],
  "tea-tree-scalp.svg": ["Tea Tree Scalp", "#e8f5e9", "#a5d6a7"],
  "bamboo-strengthener.svg": ["Bamboo Strengthener", "#e8f5e9", "#81c784"],
  "kids-detangler.svg": ["Kids Detangler", "#e0f7fa", "#80deea"],
  "braiding-gel.svg": ["Braiding Gel", "#e8eaf6", "#9fa8da"],
  "purple-shampoo.svg": ["Purple Shampoo", "#ede7f6", "#b39ddb"],
  "chebe-butter.svg": ["Chebe Butter", "#efebe9", "#a1887f"],
  "swim-protector.svg": ["Swim Protector", "#e0f7fa", "#4dd0e1"],
  "growth-drops.svg": ["Growth Drops", "#e8f5e9", "#81c784"],
  "flaxseed-gel.svg": ["Flaxseed Gel", "#fff8e1", "#ffe082"],
  "scalp-massager.svg": ["Scalp Massager", "#f3e5f5", "#ba68c8"],
  "overnight-mask.svg": ["Overnight Mask", "#ede7f6", "#9575cd"],

  // New Makeup products
  "bb-cream.svg": ["BB Cream", "#fce4ec", "#f48fb1"],
  "contour-stick.svg": ["Contour Stick", "#efebe9", "#a1887f"],
  "highlighter.svg": ["Highlighter", "#fff8e1", "#ffd54f"],
  "bronzer.svg": ["Bronzer", "#fff3e0", "#ffb74d"],
  "blush-palette.svg": ["Blush Palette", "#fce4ec", "#f06292"],
  "liquid-blush.svg": ["Liquid Blush", "#fce4ec", "#ec407a"],
  "brow-pencil.svg": ["Brow Pencil", "#efebe9", "#8d6e63"],
  "brow-gel.svg": ["Brow Gel", "#efebe9", "#a1887f"],
  "liquid-lipstick.svg": ["Liquid Lipstick", "#fce4ec", "#e91e63"],
  "lip-liner-set.svg": ["Lip Liner Set", "#fce4ec", "#f48fb1"],
  "setting-spray.svg": ["Setting Spray", "#e0f7fa", "#4dd0e1"],
  "lash-glue.svg": ["Lash Glue", "#e8eaf6", "#c5cae9"],
  "lashes-natural.svg": ["Natural Lashes", "#fce4ec", "#f8bbd0"],
  "lashes-dramatic.svg": ["Dramatic Lashes", "#e8eaf6", "#7986cb"],
  "color-corrector.svg": ["Color Corrector", "#fff3e0", "#ffcc80"],
  "gel-liner.svg": ["Gel Eyeliner", "#e8eaf6", "#5c6bc0"],
  "glitter-shadow.svg": ["Glitter Shadow", "#f3e5f5", "#ce93d8"],
  "nude-palette.svg": ["Nude Palette", "#efebe9", "#d7ccc8"],
  "wp-mascara.svg": ["WP Mascara", "#fce4ec", "#ec407a"],
  "lip-oil.svg": ["Lip Oil", "#fce4ec", "#f48fb1"],
  "makeup-wipes.svg": ["Makeup Wipes", "#e0f7fa", "#80deea"],
  "pressed-powder.svg": ["Pressed Powder", "#fbe9e7", "#ffab91"],
  "cream-blush.svg": ["Cream Blush", "#fce4ec", "#f06292"],
  "lash-curler.svg": ["Lash Curler", "#e8eaf6", "#9fa8da"],
  "concealer-brush.svg": ["Concealer Brush", "#efebe9", "#a1887f"],
  "hydrating-primer.svg": ["Hydrating Primer", "#e0f2f1", "#b2dfdb"],
  "eye-primer.svg": ["Eye Primer", "#fbe9e7", "#ffab91"],
  "kabuki-brush.svg": ["Kabuki Brush", "#efebe9", "#8d6e63"],
  "smoky-kit.svg": ["Smoky Eye Kit", "#e8eaf6", "#5c6bc0"],
  "tinted-balm.svg": ["Tinted Lip Balm", "#fce4ec", "#f48fb1"],
  "glass-foundation.svg": ["Glass Foundation", "#fce4ec", "#f8bbd0"],
  "brow-stamp.svg": ["Brow Stamp Kit", "#efebe9", "#a1887f"],
  "cream-contour.svg": ["Cream Contour", "#efebe9", "#8d6e63"],
  "lip-mask-balm.svg": ["Lip Mask Balm", "#fce4ec", "#ec407a"],
  "tubing-mascara.svg": ["Tubing Mascara", "#fce4ec", "#f48fb1"],
  "skin-tint-spf.svg": ["Skin Tint SPF", "#fff8e1", "#ffe082"],
  "velvet-lip-kit.svg": ["Velvet Lip Kit", "#fce4ec", "#e91e63"],
  "shadow-stick.svg": ["Shadow Stick", "#f3e5f5", "#ce93d8"],
  "dewy-setting-spray.svg": ["Dewy Setting Spray", "#e0f7fa", "#4dd0e1"],
  "freckle-pen.svg": ["Freckle Pen", "#efebe9", "#bcaaa4"],
  "color-change-balm.svg": ["Color Change Balm", "#e8f5e9", "#a5d6a7"],
  "undereye-concealer.svg": ["Undereye Concealer", "#fff3e0", "#ffcc80"],

  // New Body Care products
  "body-butter.svg": ["Body Butter", "#e0f2f1", "#80cbc4"],
  "exf-body-wash.svg": ["Body Wash", "#e0f7fa", "#4dd0e1"],
  "stretch-mark.svg": ["Stretch Mark Cream", "#fce4ec", "#f8bbd0"],
  "intimate-wash.svg": ["Intimate Wash", "#f3e5f5", "#e1bee7"],
  "foot-cream.svg": ["Foot Cream", "#e0f2f1", "#4db6ac"],
  "lip-scrub.svg": ["Lip Scrub", "#fce4ec", "#ec407a"],
  "body-oil-rose.svg": ["Rose Body Oil", "#fce4ec", "#f48fb1"],
  "bath-bombs.svg": ["Bath Bombs", "#f3e5f5", "#ce93d8"],
  "coconut-oil.svg": ["Coconut Oil", "#efebe9", "#d7ccc8"],
  "charcoal-wash.svg": ["Charcoal Wash", "#efebe9", "#9e9e9e"],
  "cuticle-oil.svg": ["Cuticle Oil", "#fff3e0", "#ffcc80"],
  "shaving-cream.svg": ["Shaving Cream", "#e0f7fa", "#80deea"],
  "shimmer-lotion.svg": ["Shimmer Lotion", "#fff8e1", "#ffd54f"],
  "vitc-body-wash.svg": ["Vit C Body Wash", "#fff3e0", "#ffe0b2"],
  "black-soap.svg": ["Black Soap", "#efebe9", "#8d6e63"],
  "bath-salts.svg": ["Bath Salts", "#f3e5f5", "#ba68c8"],
  "kojic-soap.svg": ["Kojic Soap", "#fff8e1", "#ffe082"],
  "perfume-set.svg": ["Perfume Set", "#fce4ec", "#f06292"],
  "razor-set.svg": ["Razor Set", "#e8eaf6", "#9fa8da"],
  "ingrown-serum.svg": ["Ingrown Serum", "#e0f2f1", "#80cbc4"],
  "vanilla-mist.svg": ["Vanilla Mist", "#fff8e1", "#ffe082"],
  "coffee-scrub.svg": ["Coffee Scrub", "#efebe9", "#8d6e63"],
  "turmeric-soap.svg": ["Turmeric Soap", "#fff8e1", "#ffd54f"],
  "oatmeal-wash.svg": ["Oatmeal Wash", "#efebe9", "#d7ccc8"],
  "mango-butter.svg": ["Mango Butter", "#fff3e0", "#ffb74d"],
  "natural-deodorant.svg": ["Natural Deodorant", "#e8f5e9", "#a5d6a7"],
  "body-serum.svg": ["Body Serum", "#fff3e0", "#ffe0b2"],
  "sugar-wax.svg": ["Sugar Wax Kit", "#fff8e1", "#ffe082"],
  "hemp-oil.svg": ["Hemp Body Oil", "#e8f5e9", "#81c784"],
  "bath-bomb-set.svg": ["Bath Bomb Set", "#f3e5f5", "#ce93d8"],
  "exfo-gloves.svg": ["Exfo Gloves", "#e0f2f1", "#80cbc4"],
  "belly-butter.svg": ["Belly Butter", "#fce4ec", "#f8bbd0"],
  "hand-cream-trio.svg": ["Hand Cream Trio", "#fce4ec", "#f48fb1"],

  // New Accessories products
  "lighted-mirror.svg": ["Lighted Mirror", "#fff8e1", "#ffd54f"],
  "jade-roller.svg": ["Jade Roller", "#e8f5e9", "#81c784"],
  "brush-mat.svg": ["Brush Mat", "#f3e5f5", "#ba68c8"],
  "travel-bag.svg": ["Travel Bag", "#fce4ec", "#f48fb1"],
  "ice-roller.svg": ["Ice Roller", "#e0f7fa", "#4dd0e1"],
  "lash-tool.svg": ["Lash Tool", "#e8eaf6", "#9fa8da"],
  "spa-headband.svg": ["Spa Headband", "#fce4ec", "#f06292"],
  "dermaplaning.svg": ["Dermaplaning Set", "#e8eaf6", "#c5cae9"],
  "drying-rack.svg": ["Drying Rack", "#efebe9", "#a1887f"],
  "face-scrubber.svg": ["Face Scrubber", "#fce4ec", "#f48fb1"],
  "claw-clips.svg": ["Claw Clips", "#f3e5f5", "#ce93d8"],
  "palette-organizer.svg": ["Palette Organizer", "#e0f2f1", "#4db6ac"],
  "facial-steamer.svg": ["Facial Steamer", "#e0f7fa", "#80deea"],
  "bobby-pins.svg": ["Bobby Pins", "#fff8e1", "#ffd54f"],
  "hair-towel.svg": ["Hair Towel", "#ede7f6", "#b39ddb"],
  "blackhead-kit.svg": ["Blackhead Kit", "#efebe9", "#9e9e9e"],
  "nail-files.svg": ["Nail Files", "#fce4ec", "#f48fb1"],
  "shower-cap.svg": ["Shower Cap", "#f3e5f5", "#ba68c8"],
  "tweezers.svg": ["Tweezers", "#e8eaf6", "#7986cb"],
  "sleep-mask.svg": ["Sleep Mask", "#ede7f6", "#9575cd"],
  "brush-spray.svg": ["Brush Cleaner", "#e0f7fa", "#4dd0e1"],
  "magnetic-lashes.svg": ["Magnetic Lashes", "#fce4ec", "#ec407a"],
  "vanity-tray.svg": ["Vanity Tray", "#fff8e1", "#ffd54f"],
  "compact-mirror.svg": ["Compact Mirror", "#e8eaf6", "#c5cae9"],
  "cotton-rounds.svg": ["Cotton Rounds", "#e8f5e9", "#a5d6a7"],
  "heat-glove.svg": ["Heat Glove", "#fbe9e7", "#ffab91"],
  "lip-brushes.svg": ["Lip Brushes", "#fce4ec", "#f48fb1"],
  "loofah-set.svg": ["Loofah Set", "#e0f2f1", "#80cbc4"],
  "velvet-pouch.svg": ["Velvet Pouch", "#ede7f6", "#b39ddb"],
  "minimalist-clips.svg": ["Minimalist Clips", "#fff8e1", "#ffd54f"],
  "led-mask.svg": ["LED Mask", "#e0f7fa", "#4dd0e1"],
  "brush-roll.svg": ["Brush Roll", "#fce4ec", "#f48fb1"],
  "beauty-blender-set.svg": ["Blender Set", "#fce4ec", "#ec407a"],
  "diy-lash-kit.svg": ["DIY Lash Kit", "#e8eaf6", "#9fa8da"],
  "star-patches.svg": ["Star Patches", "#fff8e1", "#ffd54f"],
  "nail-stickers.svg": ["Nail Stickers", "#f3e5f5", "#ce93d8"],
  "makeup-fan.svg": ["Makeup Fan", "#e0f7fa", "#80deea"],
  "silk-scrunchies.svg": ["Silk Scrunchies", "#fce4ec", "#f06292"],
  "makeup-fridge.svg": ["Makeup Fridge", "#e0f7fa", "#4dd0e1"],
  "press-on-nails.svg": ["Press-On Nails", "#fce4ec", "#f48fb1"],
  "large-claw-clip.svg": ["Large Claw Clip", "#efebe9", "#a1887f"],
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
