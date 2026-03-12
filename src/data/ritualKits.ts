// Product type reference for IDE documentation only

export interface RitualKit {
    id: string;
    slug: string;
    name: string;
    description: string;
    originalTotal: number;
    discountedPrice: number;
    discountPercent: number;
    items: { productId: string; name: string; quantity: number }[];
    image: string;
    badge?: string;
}

export const ritualKits: RitualKit[] = [
    {
        id: "kit-1",
        slug: "ganesh-puja-starter",
        name: "Ganesh Puja Starter Kit",
        description:
            "Everything you need to begin your daily Ganesh Puja — a beautiful brass idol, a set of diyas, premium agarbatti, and a traditional brass Lota. Start your spiritual journey with the blessings of the Vighnaharta.",
        originalTotal: 5296,
        discountedPrice: 4499,
        discountPercent: 15,
        items: [
            { productId: "1", name: "Ganesh Ji Brass Idol (6\")", quantity: 1 },
            { productId: "12", name: "Brass Diya Set (Pack of 6)", quantity: 1 },
            { productId: "4", name: "Sattva Premium Agarbatti (50 Sticks)", quantity: 1 },
            { productId: "3", name: "Brass Pooja Lota", quantity: 1 },
        ],
        image: "/images/kits/ganesh-kit.jpg",
        badge: "Most Popular",
    },
    {
        id: "kit-2",
        slug: "daily-sandhya-kit",
        name: "Daily Sandhya Pooja Kit",
        description:
            "A curated kit for the daily evening Aarti ritual. Includes a copper puja thali set, camphor tablets, dhoop cones, and premium agarbatti. Transform your evening routine into a sacred practice.",
        originalTotal: 2246,
        discountedPrice: 1899,
        discountPercent: 15,
        items: [
            { productId: "7", name: "Copper Puja Thali Set", quantity: 1 },
            { productId: "9", name: "Pure Camphor Tablets", quantity: 1 },
            { productId: "5", name: "Guggul Dhoop Cones", quantity: 1 },
            { productId: "4", name: "Sattva Premium Agarbatti (50 Sticks)", quantity: 1 },
        ],
        image: "/images/kits/sandhya-kit.jpg",
        badge: "Daily Essentials",
    },
    {
        id: "kit-3",
        slug: "meditation-essentials",
        name: "Meditation & Japa Essentials",
        description:
            "For the seeker within. A Tulsi mala for Japa meditation, a certified Rudraksha, and calming Sandalwood agarbatti. Begin or deepen your meditation practice with tools blessed by tradition.",
        originalTotal: 1897,
        discountedPrice: 1599,
        discountPercent: 16,
        items: [
            { productId: "10", name: "Tulsi Mala (108 Beads)", quantity: 1 },
            { productId: "11", name: "Panchmukhi Rudraksha", quantity: 1 },
            { productId: "4", name: "Sandalwood Agarbatti (50 Sticks)", quantity: 1 },
        ],
        image: "/images/kits/meditation-kit.jpg",
        badge: "Spiritual Journey",
    },
    {
        id: "kit-4",
        slug: "housewarming-blessing",
        name: "Griha Pravesh Blessing Kit",
        description:
            "The perfect gift for a new home. Includes Lakshmi Ji marble murti, brass diyas, camphor, and dhoop — everything needed for the auspicious Griha Pravesh ceremony.",
        originalTotal: 7146,
        discountedPrice: 5999,
        discountPercent: 16,
        items: [
            { productId: "2", name: "Lakshmi Ji Marble Murti (8\")", quantity: 1 },
            { productId: "12", name: "Brass Diya Set (Pack of 12)", quantity: 1 },
            { productId: "9", name: "Pure Camphor Tablets", quantity: 1 },
            { productId: "5", name: "Guggul Dhoop Cones", quantity: 1 },
        ],
        image: "/images/kits/griha-kit.jpg",
        badge: "Gift Choice",
    },
];
