export interface Product {
    id: string;
    slug: string;
    name: string;
    price: number;
    originalPrice?: number;
    description: string;
    shortDescription: string;
    category: string;
    material?: string;
    weight?: number;
    height?: number;
    images: string[];
    mainImage: string;
    model3dUrl?: string;
    modelUsdzUrl?: string;
    vastuDirection?: string;
    careInstructions?: string;
    isSubscribable?: boolean;
    rating: number;
    reviewCount: number;
    badge?: "New" | "Bestseller" | "Limited";
    variants?: { name: string; options: string[] }[];
}

export const products: Product[] = [
    {
        id: "1",
        slug: "ganesh-ji-brass-idol",
        name: "Ganesh Ji Brass Idol",
        price: 3499,
        originalPrice: 4299,
        description:
            "Hand-crafted brass idol of Lord Ganesh, the remover of obstacles. This exquisite piece features intricate detailing on the crown, ornaments, and the sacred Modak in the lower-left hand. Each idol is uniquely finished by master artisans from Moradabad, India's 'Brass City.'",
        shortDescription: "Hand-crafted brass idol with intricate detailing",
        category: "Brass Idols",
        material: "Pure Brass",
        weight: 1.2,
        height: 8,
        images: [
            "/images/products/ganesh-1.jpg",
            "/images/products/ganesh-2.jpg",
            "/images/products/ganesh-3.jpg",
        ],
        mainImage: "/images/products/ganesh-1.jpg",
        model3dUrl: "/models/ganesh.glb",
        modelUsdzUrl: "/models/ganesh.usdz",
        vastuDirection: "North-East",
        careInstructions:
            "Clean with Pitambari powder or a mix of lemon juice and salt. Avoid harsh chemicals. Wipe dry after cleaning to maintain the lustrous brass finish.",
        rating: 4.8,
        reviewCount: 142,
        badge: "Bestseller",
        variants: [
            { name: "Size", options: ['6"', '8"', '12"'] },
            { name: "Finish", options: ["Antique", "Polished", "Matt"] },
        ],
    },
    {
        id: "2",
        slug: "lakshmi-ji-marble-murti",
        name: "Lakshmi Ji Marble Murti",
        price: 5999,
        originalPrice: 7499,
        description:
            "Carved from premium Makrana marble, this Lakshmi Ji murti radiates divine grace. The delicate lotus base and the gold-painted accents bring an aura of prosperity to any mandir. Ideal for Diwali gifting and new home blessings.",
        shortDescription: "Premium Makrana marble murti with gold accents",
        category: "Marble Murtis",
        material: "Makrana Marble",
        weight: 2.5,
        height: 10,
        images: [
            "/images/products/lakshmi-1.jpg",
            "/images/products/lakshmi-2.jpg",
        ],
        mainImage: "/images/products/lakshmi-1.jpg",
        vastuDirection: "East",
        careInstructions:
            "Wipe gently with a soft damp cloth. Avoid placing in direct sunlight to prevent discoloration. The gold accents are hand-painted and should not be scrubbed.",
        rating: 4.9,
        reviewCount: 89,
        badge: "New",
        variants: [
            { name: "Size", options: ['8"', '12"', '18"'] },
        ],
    },
    {
        id: "3",
        slug: "aarti-stand",
        name: "Aarti Stand",
        price: 799,
        description:
            "Traditional brass Aarti Stand for daily pooja rituals. Handmade with a perfectly balanced shape for easy handling during Aarti.",
        shortDescription: "Traditional handmade Aarti Stand for daily pooja",
        category: "Pooja Essentials",
        material: "Pure Brass",
        weight: 0.4,
        height: 5,
        images: ["/images/products/aarti-1.jpg"],
        mainImage: "/images/products/aarti-1.jpg",
        vastuDirection: "North-East",
        careInstructions:
            "Regular cleaning with tamarind paste or Pitambari keeps the brass shining. Avoid using abrasive scrubbers.",
        rating: 4.6,
        reviewCount: 234,
        badge: "Bestseller",
    },
    {
        id: "4",
        slug: "premium-agarbatti-collection",
        name: "Sattva Premium Agarbatti",
        price: 499,
        description:
            "Hand-rolled incense sticks using natural ingredients — sandalwood, rose, and vetiver. Each stick burns for 45 minutes, filling your space with a calming, uplifting fragrance. Crafted by artisan families in Mysore who have perfected the art over five generations.",
        shortDescription: "Hand-rolled natural incense, 45-minute burn time",
        category: "Incense & Dhoop",
        isSubscribable: true,
        images: ["/images/products/agarbatti-1.jpg"],
        mainImage: "/images/products/agarbatti-1.jpg",
        rating: 4.7,
        reviewCount: 567,
        variants: [
            { name: "Fragrance", options: ["Sandalwood", "Rose", "Nag Champa", "Kesar"] },
            { name: "Pack", options: ["50 Sticks", "100 Sticks", "200 Sticks"] },
        ],
    },
    {
        id: "5",
        slug: "dhoop-cone-set",
        name: "Guggul Dhoop Cones",
        price: 349,
        originalPrice: 449,
        description:
            "Pure Guggul dhoop cones that release an aromatic, purifying smoke. Each cone burns for 20 minutes, ideal for evening Sandhya Aarti. The natural resin creates a thick, fragrant plume that cleanses and sanctifies the mandir space.",
        shortDescription: "Pure Guggul cones for aromatic, purifying smoke",
        category: "Incense & Dhoop",
        isSubscribable: true,
        images: ["/images/products/dhoop-1.jpg"],
        mainImage: "/images/products/dhoop-1.jpg",
        rating: 4.5,
        reviewCount: 321,
    },
    {
        id: "6",
        slug: "shiva-nataraja-brass",
        name: "Shiva Nataraja Bronze",
        price: 8999,
        originalPrice: 11999,
        description:
            "A majestic Nataraja statue depicting Lord Shiva's cosmic dance. Cast using the ancient lost-wax (Cire Perdue) technique by Thanjavur artisans. The ring of fire symbolizes the eternal cycle of creation and destruction.",
        shortDescription: "Ancient lost-wax cast Nataraja statue",
        category: "Brass Idols",
        material: "Bronze",
        weight: 3.8,
        height: 14,
        images: ["/images/products/nataraja-1.jpg"],
        mainImage: "/images/products/nataraja-1.jpg",
        model3dUrl: "/models/nataraja.glb",
        vastuDirection: "North",
        careInstructions:
            "Bronze develops a natural patina over time. To maintain the original finish, apply a thin layer of coconut oil monthly. Avoid exposure to moisture.",
        rating: 4.9,
        reviewCount: 56,
        badge: "Limited",
        variants: [
            { name: "Size", options: ['10"', '14"', '18"'] },
        ],
    },
    {
        id: "7",
        slug: "copper-puja-thali-set",
        name: "Copper Puja Thali Set",
        price: 1299,
        description:
            "Complete copper puja thali set including thali, small diyas, incense holder, kumkum container, and bell. Copper is revered in Vedic tradition for its ability to conduct spiritual energy during rituals.",
        shortDescription: "Complete 7-piece copper puja set",
        category: "Pooja Essentials",
        material: "Pure Copper",
        weight: 0.8,
        images: ["/images/products/thali-1.jpg"],
        mainImage: "/images/products/thali-1.jpg",
        rating: 4.7,
        reviewCount: 189,
        badge: "Bestseller",
    },
    {
        id: "8",
        slug: "hanuman-ji-sindhoor-idol",
        name: "Hanuman Ji Sindhoor Idol",
        price: 2799,
        description:
            "A powerful Hanuman Ji idol coated with sacred sindhoor (vermillion). This murti is specially consecrated and ready for mandir installation. Lord Hanuman is worshipped for strength, courage, and protection from negative energies.",
        shortDescription: "Sindhoor-coated Hanuman murti for protection",
        category: "Brass Idols",
        material: "Brass with Sindhoor",
        weight: 1.5,
        height: 9,
        images: ["/images/products/hanuman-1.jpg"],
        mainImage: "/images/products/hanuman-1.jpg",
        vastuDirection: "South",
        rating: 4.8,
        reviewCount: 211,
    },
    {
        id: "9",
        slug: "camphor-tablets-pure",
        name: "Pure Camphor Tablets",
        price: 199,
        description:
            "100% pure, food-grade camphor tablets for daily aarti and pooja. Burns clean without leaving residue. The naturally cooling fragrance purifies the air and is known to repel insects.",
        shortDescription: "100% pure camphor for daily aarti",
        category: "Pooja Essentials",
        isSubscribable: true,
        images: ["/images/products/camphor-1.jpg"],
        mainImage: "/images/products/camphor-1.jpg",
        rating: 4.4,
        reviewCount: 890,
    },
    {
        id: "10",
        slug: "tulsi-mala-wooden",
        name: "Tulsi Mala (108 Beads)",
        price: 399,
        description:
            "Authentic Tulsi wood mala with 108 hand-carved beads. Used for Japa meditation and chanting. Tulsi (Holy Basil) is sacred to Lord Vishnu and wearing it is believed to bring peace, protection, and devotion.",
        shortDescription: "Authentic 108-bead Tulsi mala for Japa",
        category: "Spiritual Accessories",
        material: "Tulsi Wood",
        images: ["/images/products/mala-1.jpg"],
        mainImage: "/images/products/mala-1.jpg",
        rating: 4.6,
        reviewCount: 445,
    },
    {
        id: "11",
        slug: "panchmukhi-rudraksha",
        name: "Panchmukhi Rudraksha",
        price: 999,
        originalPrice: 1299,
        description:
            "Certified 5-Mukhi (five-faced) Rudraksha bead from Nepal. Lab-tested for authenticity. The Panchmukhi Rudraksha represents Lord Shiva and is considered the most versatile bead — suitable for everyone, regardless of Rashi or age.",
        shortDescription: "Certified 5-Mukhi Rudraksha from Nepal",
        category: "Spiritual Accessories",
        images: ["/images/products/rudraksha-1.jpg"],
        mainImage: "/images/products/rudraksha-1.jpg",
        rating: 4.9,
        reviewCount: 178,
        badge: "Bestseller",
    },
    {
        id: "12",
        slug: "brass-diya-set",
        name: "Brass Diya Set (Pack of 6)",
        price: 599,
        description:
            "Set of 6 traditional brass diyas for daily lighting and festival decoration. Each diya features a classic lotus petal design with a wide rim to prevent oil spillage. Perfect for Diwali, Navratri, and daily Sandhya Pooja.",
        shortDescription: "Set of 6 classic brass diyas with lotus design",
        category: "Pooja Essentials",
        material: "Pure Brass",
        images: ["/images/products/diya-1.jpg"],
        mainImage: "/images/products/diya-1.jpg",
        rating: 4.5,
        reviewCount: 312,
        variants: [
            { name: "Pack", options: ["Pack of 6", "Pack of 12"] },
        ],
    },
];

export const categories = [
    { name: "Brass Idols", slug: "brass-idols", count: 24 },
    { name: "Marble Murtis", slug: "marble-murtis", count: 12 },
    { name: "Pooja Essentials", slug: "pooja-essentials", count: 36 },
    { name: "Incense & Dhoop", slug: "incense-dhoop", count: 18 },
    { name: "Spiritual Accessories", slug: "spiritual-accessories", count: 15 },
    { name: "Ritual Kits", slug: "ritual-kits", count: 8 },
];
