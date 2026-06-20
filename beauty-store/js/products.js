/**
 * ============================================
 * VELORA BEAUTY - Product Data
 * ============================================
 * All product data for the e-commerce store
 */

const products = [
    {
        id: 1,
        name: "Velvet Matte Lipstick",
        category: "Lipstick",
        price: 24.99,
        rating: 4.8,
        description: "A luxurious velvet matte lipstick that delivers intense color payoff with a weightless, comfortable feel. Infused with nourishing oils to keep lips hydrated all day. Available in 12 stunning shades from nude to bold burgundy.",
        image: "images/6_4_643_Velvet_Lipstick_Royalty_Free.png"
    },
    {
        id: 2,
        name: "Nude Glow Foundation",
        category: "Foundation",
        price: 42.00,
        rating: 4.6,
        description: "Achieve a flawless, natural-looking glow with our lightweight serum foundation. Buildable coverage that blends seamlessly into skin while providing vitamin C benefits for a radiant complexion. Suitable for all skin types.",
        image: "images/1_Mamaearth_Nude_Glow_Serum_Foundation.png"
    },
    {
        id: 3,
        name: "Rose Gold Highlighter",
        category: "Blush",
        price: 32.50,
        rating: 4.9,
        description: "Illuminate your features with our stunning rose gold highlighter. The buttery-soft formula melts into skin for a luminous, lit-from-within glow. Perfect for cheekbones, brow bones, and cupid's bow.",
        image: "images/2_Private_Label_Cosmetic_Manufacturer.png"
    },
    {
        id: 4,
        name: "Burgundy Blush",
        category: "Blush",
        price: 28.00,
        rating: 4.7,
        description: "A rich, velvety burgundy blush that adds a sophisticated flush of color to your cheeks. The finely-milled powder blends effortlessly and lasts all day without fading. Perfect for creating a bold, romantic look.",
        image: "images/5_Burgundy_Blush_Nordstrom.png"
    },
    {
        id: 5,
        name: "Hydrating Primer",
        category: "Primer",
        price: 35.00,
        rating: 4.5,
        description: "Prep your skin with our hydrating primer that creates a smooth canvas for flawless makeup application. Infused with hyaluronic acid and botanical extracts to lock in moisture and extend makeup wear.",
        image: "images/9_base_tape_hydrating_primer_Tarte.png"
    },
    {
        id: 6,
        name: "Luxury Brush Set",
        category: "Tools",
        price: 65.00,
        rating: 4.9,
        description: "A complete 15-piece brush set featuring ultra-soft synthetic bristles with elegant rose gold handles. Includes every brush you need for face, eyes, and brows. Comes in a chic travel case.",
        image: "images/8_LUXE_BRUSH_SET_ROSE_GOLD_Pink_Star.png"
    },
    {
        id: 7,
        name: "Lash Luxe Mascara",
        category: "Mascara",
        price: 26.00,
        rating: 4.7,
        description: "Get dramatic, voluminous lashes with our Lash Luxe Mascara. The innovative wand separates and coats each lash for maximum impact. Smudge-proof and long-lasting formula for all-day wear.",
        image: "images/3_Cylinder_Cosmetic_Container_Black.png"
    },
    {
        id: 8,
        name: "Perfect Cover Concealer",
        category: "Foundation",
        price: 22.00,
        rating: 4.6,
        description: "Our full-coverage concealer hides dark circles, blemishes, and imperfections with a natural finish. The creamy, blendable formula doesn't crease or settle into fine lines. Available in 20 inclusive shades.",
        image: "images/3_6_807_Concealer_Tube_Royalty_Free.png"
    },
    {
        id: 9,
        name: "Silk Finish Compact Powder",
        category: "Foundation",
        price: 29.99,
        rating: 4.4,
        description: "Set your makeup with our silky-smooth compact powder. Controls shine while maintaining a natural, skin-like finish. The lightweight formula won't cake or feel heavy, perfect for touch-ups on the go.",
        image: "images/8_Buy_Snow_White_Compact_Powder_Online.png"
    },
    {
        id: 10,
        name: "Sunset Dreams Eyeshadow Palette",
        category: "Eyeshadow",
        price: 48.00,
        rating: 4.8,
        description: "A stunning 12-shade eyeshadow palette featuring warm sunset tones from soft golds to deep burgundies. Highly pigmented, blendable shades with both matte and shimmer finishes. Perfect for day-to-night looks.",
        image: "images/7_Flat_lay_collection_of_beauty_products.png"
    },
    {
        id: 11,
        name: "Brow Perfection Kit",
        category: "Brows",
        price: 34.00,
        rating: 4.7,
        description: "Everything you need for perfect brows in one elegant kit. Includes brow powder, pomade, dual-ended brush, and setting gel. Create natural, defined, or bold brows with professional results.",
        image: "images/1_Best_brow_products_11_eyebrow_pencils.png"
    },
    {
        id: 12,
        name: "Velour Beauty Blender",
        category: "Tools",
        price: 18.00,
        rating: 4.5,
        description: "The ultimate makeup sponge for flawless application. The unique teardrop shape reaches every contour of your face. Use damp for a dewy finish or dry for full coverage. Latex-free and reusable.",
        image: "images/9_Pac_Cosmetics_Classic_Sponge_Pink.png"
    }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { products };
}
